import {
  Animated,
  Keyboard,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultText } from './default-text';
import { DefaultTextInput } from './default-text-input';
import { ButtonWithCenteredText } from './button/centered-text';
import { createAccountOptionGroups } from '../data/option-groups';
import { OptionScreen } from './option-screen';
import { japi } from '../api/api';
import { sessionToken } from '../kv-storage/session-token';
import { Logo16 } from './logo';
import { KeyboardDismissingView } from './keyboard-dismissing-view';
import { otpDestination } from '../App';
import { useSignedInUser } from '../events/signed-in-user';
import { joinClub } from '../club/club';
import { isMobile } from '../util/util';
import { setOptionScreenPayload } from '../navigation/option-screen-store';

// Phase 6 Task 6.1 atoms — ahavah brand chrome on welcome screen.
import { BrandMark } from './ui/brand-mark';
import { Heading, Body } from './ui/typography';
import { PillButton, Pill } from './ui/pill';

const activeMembersText = (
  numActiveMembers: number,
  minActiveMembers: number,
  minText: string,
) => {
  if (numActiveMembers < minActiveMembers) {
    return minText;
  } else {
    return (
      `${numActiveMembers.toLocaleString()} active member` +
      (numActiveMembers === 1 ? '' : 's')
    );
  }
};

const ActiveMembers = ({
  numActiveMembers,
  minActiveMembers,
  color,
  minText = 'on the Ahavah dating app',
}: {
  numActiveMembers: number,
  minActiveMembers: number
  color: string,
  minText?: string,
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  const [displayText, setDisplayText] = useState(
    activeMembersText(numActiveMembers, minActiveMembers, minText));

  const [nextDisplayText, setNextDisplayText] = useState(displayText);

  const isFirstRender = useRef(true);

  useEffect(() => {
    setNextDisplayText(
      activeMembersText(numActiveMembers, minActiveMembers, minText));
  }, [numActiveMembers, minActiveMembers]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Mark as not first render anymore
      return; // Skip animation on first render
    }

    // Fade out, change text, and fade in sequence
    Animated.sequence([
      // Fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      })
    ]).start(() => {
      setDisplayText(nextDisplayText);

      // Fade in
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }).start();
    });
  }, [nextDisplayText]);

  return (
    <Animated.Text
      style={{
        textAlign: 'center',
        color,
        opacity,
        fontFamily: 'MontserratRegular',
      }}
    >
      {displayText}
    </Animated.Text>
  );
};

const Stack = createNativeStackNavigator();

const WelcomeScreen = () => {
  const { width: windowWidth } = useWindowDimensions();

  // Note: the "logged-in user lands on Welcome" redirect is handled centrally
  // by App.tsx's post-login effect (which runs on `signedInUser` changes and
  // also covers the deep-link-then-sign-in case). Doing it here too would
  // race with that effect.

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',  // Task 0.9 — bg.DEFAULT from ahavah-design-tokens (was duolicious '#000000')
        overflow: 'hidden',
      }}
    >
      {/* ahavah.app/assets/landing/{left,right}.svg references removed in
          Task 0.9. Phase 6 Task 6.2 Step 1 will replace with MatchConfetti +
          a proper Ahavah landing composition. */}
      <View
        style={{
          height: '100%',
          width: '100%',
          maxWidth: 600,
          alignSelf: 'center',
          overflow: 'visible',
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Welcome Screen" component={WelcomeScreen_} />
          <Stack.Screen
            name="Create Account Or Sign In Screen"
            component={OptionScreen}
            options={{ title: 'Sign in' }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

const InviteScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [signedInUser] = useSignedInUser();

  const clubName = route.params?.clubName as string | undefined;
  const [numUsers, setNumUsers] = useState<number | undefined>(undefined);

  if (typeof clubName !== 'string') {
    throw new Error('clubName should be a string');
  }

  const submit = async () => {
    if (signedInUser) {
      setLoading(true);

      await joinClub(clubName, numUsers ?? 0, true);

      setLoading(false);

      navigation.reset({
        routes: [
          {
            name: "Home",
            state: {
              routes: [
                {
                  name: "Search"
                }
              ]
            }
          }
        ]
      });
    } else {
      navigation.reset({
        routes: [
          {
            name: 'Welcome',
            state: {
              routes: [
                {
                  name: 'Welcome Screen',
                  params: { clubName, numUsers }
                },
              ]
            },
          },
        ],
      });
    }
  };

  useEffect(() => {
    const updateNumUsers = async () => {
      const response = await japi(
          'GET',
          '/stats?club-name=' + encodeURIComponent(clubName));

      if (!response.ok)
        return;

      setNumUsers(response.json.num_active_users);
    };

    if (numUsers === undefined) {
      updateNumUsers();
    }
  }, [clubName, numUsers]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#000000',
        width: '100%',
        height: '100%',
      }}
    >
      <KeyboardDismissingView
        style={{
          width: '100%',
          height: '100%',
          maxWidth: 600,
          alignSelf: 'center',
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            marginTop: 10 + (Platform.OS === 'web' ? 0 : StatusBar.currentHeight ?? 0),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Logo16 size={32} rectSize={0.3} />
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontFamily: 'TruenoBold',
              fontSize: 20,
            }}
            selectable={false}
          >
            Ahavah
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              elevation: 3,
              paddingTop: 20,
              width: '100%',
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                width: '100%',
                paddingHorizontal: 10,
              }}
            >
              <DefaultText
                style={{
                  textAlign: 'center',
                  color: '#555',
                }}
              >
                You’re invited to join
              </DefaultText>
              <DefaultText
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 26,
                  fontFamily: 'MontserratBlack',
                  flexShrink: 1,
                  width: '100%',
                }}
              >
                {clubName}
              </DefaultText>
              <ActiveMembers
                numActiveMembers={numUsers ?? -1}
                minActiveMembers={10}
                color="#555"
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                padding: 20,
                paddingTop: 40,
                alignSelf: 'flex-start',
                width: '100%',
              }}
            >
              <ButtonWithCenteredText
                onPress={submit}
                borderWidth={0}
                loading={loading}
              >
                <DefaultText disableTheme style={{fontWeight: '700'}}>
                  Accept Invite
                </DefaultText>
              </ButtonWithCenteredText>
              <DefaultText
                style={{
                  color: '#777',
                  textAlign: 'center',
                  alignSelf: 'center',
                  lineHeight: 28,
                }}
              >
                By joining you agree to our {}
                <DefaultText
                  disableTheme
                  style={{
                    fontWeight: '600',
                  }}
                  onPress={() => Linking.openURL('https://ahavah.app/terms')}
                >
                  Terms
                </DefaultText>
                {}, {}
                <DefaultText
                  disableTheme
                  style={{ fontWeight: '600' }}
                  onPress={() => Linking.openURL('https://ahavah.app/privacy')}
                >
                  Privacy Policy
                </DefaultText>
                {} and {}
                <DefaultText
                  disableTheme
                  style={{ fontWeight: '600' }}
                  onPress={() => Linking.openURL('https://ahavah.app/guidelines')}
                >
                  Community Guidelines
                </DefaultText>
              </DefaultText>
            </View>
          </View>
        </View>
      </KeyboardDismissingView>
    </SafeAreaView>
  );
};

const WelcomeScreen_ = ({navigation, route}) => {
  const clubName_ = (route.params?.clubName) as string | undefined;
  const [numUsers, setNumUsers] = useState<number | undefined>(route.params?.numUsers);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("")

  const { height: windowHeight } = useWindowDimensions();

  const setEmailSafely = (e: string) => {
    const sanitizedText = e.replace(/\s/g, '');
    setEmail(sanitizedText);
  };

  const submit = async (suffix?: string) => {
    const suffix_ = suffix ?? '';
    const email_ = email + (email.endsWith(suffix_) ? '': suffix_);

    setLoginStatus("");
    setIsLoading(true);
    setEmailSafely(email_);
    otpDestination.value = email_;

    Keyboard.dismiss();

    const response = await japi(
      'post',
      '/request-otp',
      {
        email: email_,
        ...(clubName_ && { pending_club_name: clubName_ }),
      },
      { timeout: 9999 * 1000 },
    );

    setIsLoading(false);

    if (response.ok) {
      await sessionToken(response.json.session_token);

      setOptionScreenPayload('Create Account Or Sign In Screen', {
        optionGroups: createAccountOptionGroups,
        showSkipButton: false,
        showCloseButton: false,
        showBackButton: true,
        // Task 0.9 — backgroundColor is now Ahavah indigo (was duolicious '#5524F5')
        backgroundColor: '#5524F5',
        color: '#ffffff',
      });
      navigation.navigate('Create Account Or Sign In Screen');
    } else {
      setLoginStatus(
        response.status === 400 ? 'We don’t support that email provider' :
        response.status === 429 ? 'You’re doing that too much' :
        response.status === 460 ? 'Network blocked. Are you using a VPN?' :
        response.status === 461 ? 'Your account is banned' :
        'We couldn’t connect to Ahavah'
      );
    }
  };

  useEffect(() => {
    const updateNumUsers = async () => {
      const response = await japi('GET', '/stats');

      if (!response.ok)
        return;

      setNumUsers(response.json.num_active_users);
    };

    if (numUsers === undefined) {
      updateNumUsers();
    }
  }, [numUsers]);

  const EmailSuffixPill = ({ suffix }: { suffix: string }) => (
    <Pill
      onPress={() => !isLoading && submit(suffix)}
      size="sm"
      disabled={isLoading}
    >
      {suffix}
    </Pill>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#000000',     // bg.DEFAULT (Ahavah dark canvas)
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <KeyboardDismissingView
        style={{
          width: '100%',
          height: '100%',
          maxWidth: 600,
          alignSelf: 'center',
          flexDirection: 'column',
          paddingHorizontal: 20,
        }}
      >
        {/* Brand mark — replaces Logo16 + Trueno wordmark */}
        <View
          style={{
            marginTop: 16 + (Platform.OS === 'web' ? 0 : StatusBar.currentHeight ?? 0),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BrandMark mode="full" size="md" />
        </View>

        {/* Hero — Plus Jakarta Sans Bold via Heading atom */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <Heading
            level="h1"
            style={{ textAlign: 'center', maxWidth: 360 }}
          >
            {clubName_
              ? `Join ${clubName_} on Ahavah`
              : 'Find love across borders.'}
          </Heading>
          <Body tone="secondary" style={{ textAlign: 'center', maxWidth: 320 }}>
            Connect with people from anywhere, in any language.
          </Body>
          {windowHeight > 500 && (
            <ActiveMembers
              numActiveMembers={numUsers ?? -1}
              minActiveMembers={0}
              color="#B5B0CC"  /* text.secondary */
              minText={'\xa0'}
            />
          )}
        </View>

        {/* Email input + suffix pills + status */}
        <View style={{ width: '100%', gap: 8 }}>
          <DefaultTextInput
            placeholder="Enter your email to begin"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            autoCapitalize="none"
            inputMode="email"
            value={email}
            onChangeText={setEmailSafely}
            onSubmitEditing={isMobile() ? undefined : () => submit()}
            autoFocus={Platform.OS !== 'ios'}
          />
          {!!loginStatus && (
            <Body tone="secondary" style={{ textAlign: 'center', marginTop: 4 }}>
              {loginStatus}
            </Body>
          )}
          {windowHeight > 500 && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 4,
              }}
            >
              <EmailSuffixPill suffix="@gmail.com" />
              <EmailSuffixPill suffix="@proton.me" />
              <EmailSuffixPill suffix="@yahoo.com" />
              <EmailSuffixPill suffix="@hotmail.com" />
              <EmailSuffixPill suffix="@outlook.com" />
            </View>
          )}
        </View>

        {/* Primary CTA + terms */}
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 16,
            width: '100%',
            gap: 12,
          }}
        >
          <PillButton onPress={() => submit()} loading={isLoading} fullWidth size="lg">
            Sign Up or Sign In
          </PillButton>
          <Body
            tone="muted"
            size="xs"
            style={{ textAlign: 'center', lineHeight: 18 }}
          >
            By signing up you agree to our{' '}
            <Text
              style={{ color: '#B5B0CC', fontWeight: '600' }}
              onPress={() => Linking.openURL('https://ahavah.app/terms')}
            >
              Terms
            </Text>
            ,{' '}
            <Text
              style={{ color: '#B5B0CC', fontWeight: '600' }}
              onPress={() => Linking.openURL('https://ahavah.app/privacy')}
            >
              Privacy Policy
            </Text>
            {' '}and{' '}
            <Text
              style={{ color: '#B5B0CC', fontWeight: '600' }}
              onPress={() => Linking.openURL('https://ahavah.app/guidelines')}
            >
              Community Guidelines
            </Text>
          </Body>
        </View>
      </KeyboardDismissingView>
    </SafeAreaView>
  );
};

export {
  InviteScreen,
  WelcomeScreen,
};
