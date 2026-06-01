/**
 * LanguagePicker — modal-based ISO-639 picker.
 *
 * Phase 1 Task 1.2 minimal implementation. Multi-select by default since the
 * `languages_spoken` profile field is array-typed. For single-select (e.g.,
 * primary translation language), pass mode="single".
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
import { LANGUAGES, type Language } from '../../constants/languages';

type SingleProps = {
  mode: 'single';
  value: string | null;
  onChange: (code: string) => void;
  visible: boolean;
  onClose: () => void;
};

type MultiProps = {
  mode?: 'multi';
  selectedCodes: string[];
  onMultiChange: (codes: string[]) => void;
  visible: boolean;
  onClose: () => void;
};

type Props = SingleProps | MultiProps;

export function LanguagePicker(props: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase() === q,
    );
  }, [query]);

  const isSelected = (l: Language): boolean => {
    if (props.mode === 'single') return props.value === l.code;
    return props.selectedCodes.includes(l.code);
  };

  const handleSelect = (l: Language) => {
    if (props.mode === 'single') {
      props.onChange(l.code);
      props.onClose();
    } else {
      const next = props.selectedCodes.includes(l.code)
        ? props.selectedCodes.filter((x) => x !== l.code)
        : [...props.selectedCodes, l.code];
      props.onMultiChange(next);
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
              {props.mode === 'single' ? 'Cancel' : 'Done'}
            </Text>
          </Pressable>
          <TextInput
            placeholder="Search languages…"
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
          keyExtractor={(l) => l.code}
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
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ color: '#7A7596', fontSize: 12, marginTop: 2 }}>
                    {item.nativeName}
                  </Text>
                </View>
                {selected && (
                  <Text style={{ color: '#D7FF81', fontSize: 18 }}>✓</Text>
                )}
              </Pressable>
            );
          }}
          initialNumToRender={25}
          maxToRenderPerBatch={25}
          windowSize={10}
        />
      </SafeAreaView>
    </Modal>
  );
}
