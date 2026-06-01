/**
 * CountryPicker — modal-based ISO-3166 picker.
 *
 * Phase 1 Task 1.2 minimal implementation. Phase 6 Task 6.1 wraps this in
 * the Dateasy bottom-sheet pattern using react-native-reusables Sheet, with
 * StoryRing-style flag treatment + the diaspora wedge sort baked in.
 *
 * Usage:
 *   <CountryPicker
 *     value={selectedCode}
 *     onChange={(iso) => setSelectedCode(iso)}
 *     mode="single"      // or "multi" for filter screens
 *     selectedCodes={[]} // when mode="multi"
 *     onMultiChange={(codes) => ...}
 *   />
 */

import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COUNTRIES, type Country } from '../../constants/countries';

type SingleProps = {
  mode?: 'single';
  value: string | null;
  onChange: (iso: string) => void;
  visible: boolean;
  onClose: () => void;
};

type MultiProps = {
  mode: 'multi';
  selectedCodes: string[];
  onMultiChange: (codes: string[]) => void;
  visible: boolean;
  onClose: () => void;
};

type Props = SingleProps | MultiProps;

export function CountryPicker(props: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q.length === 0
      ? COUNTRIES
      : COUNTRIES.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.code.toLowerCase() === q,
        );
    // Surface diaspora-wedge countries first when no search.
    if (q.length === 0) {
      const wedge = list.filter((c) => c.diaspora);
      const rest = list.filter((c) => !c.diaspora);
      return [...wedge, ...rest];
    }
    return list;
  }, [query]);

  const isSelected = (c: Country): boolean => {
    if (props.mode === 'multi') return props.selectedCodes.includes(c.code);
    return props.value === c.code;
  };

  const handleSelect = (c: Country) => {
    if (props.mode === 'multi') {
      const next = props.selectedCodes.includes(c.code)
        ? props.selectedCodes.filter((x) => x !== c.code)
        : [...props.selectedCodes, c.code];
      props.onMultiChange(next);
    } else {
      props.onChange(c.code);
      props.onClose();
    }
  };

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      onRequestClose={props.onClose}
      transparent={false}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0B1F' }}>
        <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={props.onClose} style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
            <Text style={{ color: '#BC96FF', fontSize: 16, fontWeight: '600' }}>
              {props.mode === 'multi' ? 'Done' : 'Cancel'}
            </Text>
          </Pressable>
          <TextInput
            placeholder="Search countries…"
            placeholderTextColor="#7A7596"
            value={query}
            onChangeText={setQuery}
            style={{
              flex: 1,
              backgroundColor: '#1A1340',
              color: '#FFFFFF',
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 16,
              fontSize: 16,
            }}
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(c) => c.code}
          renderItem={({ item }) => {
            const selected = isSelected(item);
            return (
              <Pressable
                onPress={() => handleSelect(item)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  backgroundColor: selected
                    ? 'rgba(85, 36, 245, 0.25)'
                    : pressed
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'transparent',
                })}
              >
                <Text style={{ fontSize: 28, marginRight: 16 }}>{item.flag}</Text>
                <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 16 }}>{item.name}</Text>
                {selected && (
                  <Text style={{ color: '#D7FF81', fontSize: 18 }}>✓</Text>
                )}
              </Pressable>
            );
          }}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      </SafeAreaView>
    </Modal>
  );
}
