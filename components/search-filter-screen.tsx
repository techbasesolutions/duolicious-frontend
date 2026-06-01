import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { DefaultText } from './default-text';
import { TopNavBar } from './top-nav-bar';
import { ButtonForOption } from './button/option';
import { Title } from './title';
import {
  OptionGroup,
  OptionGroupInputs,
  searchTwoWayBasicsOptionGroups,
  searchOtherBasicsOptionGroups,
  searchInteractionsOptionGroups,
  getCurrentValue,
  isOptionGroupCheckChips,
  isOptionGroupRangeSlider,
  isOptionGroupSlider,
} from '../data/option-groups';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OptionScreen } from './option-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DefaultTextInput } from './default-text-input';
import { api } from '../api/api';
import * as _ from "lodash";
import { useSignedInUser, getSignedInUser } from '../events/signed-in-user';
import { cmToFeetInchesStr, kmToMilesStr } from '../units/units';
import { TopNavBarButton } from './top-nav-bar-button';
import { useAppTheme } from '../app-theme/app-theme';
import { listen, notify } from '../events/events';
import {
  SearchFilterAnswer,
  setSearchFilterAnswers,
  getSearchFilterAnswers,
} from '../navigation/search-filter-state';
import {
  patchSearchFilters,
  setSearchFilters,
  useSearchFilters,
} from '../events/search-filters';

const getCurrentValueAsLabel = (og: OptionGroup<OptionGroupInputs> | undefined) => {
  if (!og) return undefined;

  const currentValue = getCurrentValue(og.input);
  const signedInUser = getSignedInUser();

  if (
    isOptionGroupCheckChips(og.input) &&
    _.isArray(currentValue) &&
    _.every(currentValue, _.isString)
  ) {
    if (currentValue.length === og.input.checkChips.values.length) {
      return undefined;
    } else {
      return currentValue.join(', ');
    }
  } else if (isOptionGroupSlider(og.input)) {
    const currentValue = og.input.slider.currentValue;

    if (currentValue === undefined) {
      return undefined;
    } else if (og.title === 'Furthest Distance') {
      return _.isNil(currentValue) ? undefined :
        signedInUser?.units === 'Imperial' ?
        `${kmToMilesStr(currentValue)} mi.` :
        `${currentValue} km`;
    } else {
      return `${currentValue}`;
    }
  } else if (
    isOptionGroupRangeSlider(og.input) &&
    typeof currentValue === 'object' &&
    'sliderMin' in currentValue &&
    'sliderMax' in currentValue
  ) {
    const currentMin = og.input.rangeSlider.currentMin;
    const currentMax = og.input.rangeSlider.currentMax;

    if (_.isNil(currentMin) && _.isNil(currentMax)) {
      return undefined;
    } else if (og.title === 'Age') {
      return `${currentMin ?? 'any'}–${currentMax ?? 'any'} years`;
    } else if (og.title === 'Height') {
      const _currentMin = _.isNil(currentMin) ? 'any' :
        signedInUser?.units === 'Imperial' ?
        cmToFeetInchesStr(currentMin) :
        `${currentMin} cm`;

      const _currentMax = _.isNil(currentMax) ? 'any' :
        signedInUser?.units === 'Imperial' ?
        cmToFeetInchesStr(currentMax) :
        `${currentMax} cm`;

      return `${_currentMin}–${_currentMax}`;
    } else {
      return `${currentMin ?? 'any'}–${currentMax ?? 'any'}`;
    }
  } else {
    return currentValue;
  }
};

const optionGroupToDataKey = (og: OptionGroup<OptionGroupInputs>) =>
  og.title.toLowerCase().replaceAll(' ', '_');

// AnswerItem type alias + fetchQuestionSearch removed in Task 0.3b — Q&A subsystem strip.

const Stack = createNativeStackNavigator();

const SearchFilterScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Search Filter Tab"
        component={SearchFilterScreen_}
        options={{ title: 'Search filters' }}
      />
      <Stack.Screen
        name="Search Filter Option Screen"
        component={OptionScreen}
        options={{ title: 'Edit search filter' }}
      />
      {/* Q&A Filter Screen registration removed in Task 0.3b. */}
    </Stack.Navigator>
  );
};

const SearchFilterScreen_ = ({navigation}) => {
  const { appTheme } = useAppTheme();
  const [signedInUser] = useSignedInUser();

  const data = useSearchFilters();

  // answers / onPressQAndAAnswers / search-filter-answers-updated listener
  // removed in Task 0.3b (Q&A subsystem strip).

  const Button_ = useCallback((props) => {
    return <ButtonForOption
      navigation={navigation}
      navigationScreen="Search Filter Option Screen"
      showSkipButton={false}
      noSettingText="Any"
      {...props}
    />;
  }, []);

  const withCurrent = (
    og: OptionGroup<OptionGroupInputs>,
  ): OptionGroup<OptionGroupInputs> => {
    const value = data?.[optionGroupToDataKey(og)];
    const isImperial = signedInUser?.units === 'Imperial';

    if (isOptionGroupCheckChips(og.input)) {
      const checked: string[] = value ?? [];
      return _.merge({}, og, { input: { checkChips: {
        values: og.input.checkChips.values.map((v) => ({
          ...v,
          checked: checked.includes(v.label),
        })),
      } } });
    }
    if (og.title === 'Furthest Distance' && isOptionGroupSlider(og.input)) {
      return _.merge({}, og, { input: { slider: {
        currentValue: value,
        unitsLabel: isImperial ? "mi." : 'km',
        valueRewriter: isImperial ? kmToMilesStr : undefined,
      } } });
    }
    if (og.title === 'Age' && isOptionGroupRangeSlider(og.input)) {
      return _.merge({}, og, { input: { rangeSlider: {
        currentMin: value?.min_age,
        currentMax: value?.max_age,
      } } });
    }
    if (og.title === 'Height' && isOptionGroupRangeSlider(og.input)) {
      return _.merge({}, og, { input: { rangeSlider: {
        currentMin: value?.min_height_cm,
        currentMax: value?.max_height_cm,
        unitsLabel: isImperial ? "ft'in\"" : 'cm',
        valueRewriter: isImperial ? cmToFeetInchesStr : undefined,
      } } });
    }
    if (value === undefined) return og;
    const inputKey = Object.keys(og.input)[0];
    return _.merge({}, og, { input: { [inputKey]: { currentValue: value } } });
  };

  useEffect(() => {
    (async () => {
      const response = await api('get', '/search-filters');
      if (response.json) {
        setSearchFilters(response.json);
      }
    })();
  }, []);

  const _searchTwoWayBasicsOptionGroups = searchTwoWayBasicsOptionGroups.map(withCurrent);
  const _searchOtherBasicsOptionGroups = searchOtherBasicsOptionGroups.map(withCurrent);
  const _searchInteractionsOptionGroups = searchInteractionsOptionGroups.map(withCurrent);

  const goBack = useCallback(() => {
    notify('search-refresh-requested');
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TopNavBar
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TopNavBarButton
          onPress={goBack}
          iconName="arrow-back"
          position="left"
          secondary={true}
        />
        <DefaultText
          style={{
            fontWeight: '700',
            fontSize: 20,
          }}
        >
          Search Filters
        </DefaultText>
      </TopNavBar>

      {data &&
        <ScrollView
          contentContainerStyle={{
            maxWidth: 600,
            width: '100%',
            alignSelf: 'center',
            alignItems: 'stretch',
            padding: 10,
            paddingBottom: 50,
          }}
        >
          {/* Q&A Answers filter section removed in Task 0.3b. */}
          <Title>Basics (Two-way Filters)</Title>
          {
            _searchTwoWayBasicsOptionGroups.map((og, i) =>
              <Button_
                key={i}
                setting={getCurrentValueAsLabel(og)}
                optionGroups={_searchTwoWayBasicsOptionGroups.slice(i)}
              />
            )
          }
          <DefaultText
            style={{
              color: '#999',
              textAlign: 'center',
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            Anyone you filter with your two-way search settings won’t see you in
            their searches either, unless searching a mutual club
          </DefaultText>

          <Title style={{marginTop: 40}}>Basics (Other Filters)</Title>
          {
            _searchOtherBasicsOptionGroups.map((og, i) =>
              <Button_
                key={i}
                setting={getCurrentValueAsLabel(og)}
                optionGroups={_searchOtherBasicsOptionGroups.slice(i)}
              />
            )
          }
          <Title style={{marginTop: 40}}>Interactions</Title>
          {
            _searchInteractionsOptionGroups.map((og, i) =>
              <Button_
                key={i}
                setting={getCurrentValueAsLabel(og)}
                optionGroups={_searchInteractionsOptionGroups.slice(i)}
              />
            )
          }
        </ScrollView>
      }
      {!data &&
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <ActivityIndicator size="large" color={appTheme.brandColor} />
        </View>
      }
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  }
});

export {
  SearchFilterScreen,
}
