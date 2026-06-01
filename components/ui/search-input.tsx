/**
 * Phase 6 Task 6.1 — SearchInput.
 * TextInput with leading magnifier + trailing clear button + debounced onChange.
 */

import { useEffect, useRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { TextInputProps as RNTextInputProps } from 'react-native';

import { TextInput } from './text-input';

type Props = Omit<RNTextInputProps, 'style' | 'placeholderTextColor' | 'value' | 'onChangeText'> & {
  value?: string;
  onChangeText?: (v: string) => void;
  debounceMs?: number;
};

export function SearchInput({
  value: controlledValue,
  onChangeText,
  debounceMs = 300,
  placeholder = 'Search…',
  ...rest
}: Props) {
  const [internal, setInternal] = useState(controlledValue ?? '');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep internal in sync if controlled value changes externally.
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== internal) {
      setInternal(controlledValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledValue]);

  const handleChange = (v: string) => {
    setInternal(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChangeText?.(v);
    }, debounceMs);
  };

  const handleClear = () => {
    setInternal('');
    if (timer.current) clearTimeout(timer.current);
    onChangeText?.('');
  };

  return (
    <TextInput
      {...rest}
      placeholder={placeholder}
      value={internal}
      onChangeText={handleChange}
      autoCapitalize="none"
      autoCorrect={false}
      leadingIcon={<Text style={{ color: '#B5B0CC', fontSize: 16 }}>⌕</Text>}
      trailingIcon={
        internal.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={handleClear}
            hitSlop={8}
          >
            <Text style={{ color: '#B5B0CC', fontSize: 16 }}>✕</Text>
          </Pressable>
        ) : null
      }
    />
  );
}
