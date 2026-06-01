/**
 * Phase 6 Task 6.1 — PasswordInput.
 * Wraps TextInput with show/hide eye toggle. Strength meter optional.
 */

import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { TextInputProps as RNTextInputProps } from 'react-native';

import { TextInput } from './text-input';
import { Caption } from './typography';

type Props = Omit<RNTextInputProps, 'style' | 'placeholderTextColor' | 'secureTextEntry'> & {
  label?: string;
  error?: string;
  showStrengthMeter?: boolean;
};

export function PasswordInput({
  label,
  error,
  showStrengthMeter = false,
  value,
  ...rest
}: Props) {
  const [revealed, setRevealed] = useState(false);
  const strength = scorePassword(value ?? '');

  return (
    <View>
      <TextInput
        {...rest}
        label={label}
        error={error}
        value={value}
        secureTextEntry={!revealed}
        autoCapitalize="none"
        autoCorrect={false}
        trailingIcon={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={revealed ? 'Hide password' : 'Show password'}
            onPress={() => setRevealed((r) => !r)}
            hitSlop={8}
          >
            <Text style={{ color: '#B5B0CC', fontSize: 18 }}>{revealed ? '◉' : '○'}</Text>
          </Pressable>
        }
      />
      {showStrengthMeter && (value ?? '').length > 0 && (
        <View style={{ marginTop: 6 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: i < strength.score
                    ? strength.color
                    : 'rgba(255,255,255,0.08)',
                }}
              />
            ))}
          </View>
          <Caption style={{ marginTop: 4 }}>{strength.label}</Caption>
        </View>
      )}
    </View>
  );
}

function scorePassword(p: string): { score: 0 | 1 | 2 | 3 | 4; label: string; color: string } {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^a-zA-Z0-9]/.test(p)) s++;
  const labels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  const colors = ['#FF4566', '#FF4566', '#FFC857', '#9FE870', '#9FE870'];
  return { score: s as 0|1|2|3|4, label: labels[s], color: colors[s] };
}
