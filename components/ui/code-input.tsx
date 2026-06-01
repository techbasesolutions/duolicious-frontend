/**
 * Phase 6 Task 6.1 — CodeInput.
 *
 * 6-box OTP entry. Auto-advance per digit. Paste-aware ("123456" splits
 * across boxes). Auto-submit on full entry via onComplete.
 */

import { useEffect, useRef, useState } from 'react';
import {
  TextInput as RNTextInput,
  View,
} from 'react-native';
import type { TextInput as RNTextInputType } from 'react-native';

type Props = {
  length?: number;             // default 6
  value?: string;
  onChange?: (v: string) => void;
  onComplete?: (v: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
};

export function CodeInput({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  autoFocus = true,
  disabled = false,
}: Props) {
  const [internal, setInternal] = useState(controlledValue ?? '');
  const refs = useRef<Array<RNTextInputType | null>>([]);

  // Keep internal in sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== internal) {
      setInternal(controlledValue.slice(0, length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledValue, length]);

  useEffect(() => {
    if (autoFocus) {
      const t = setTimeout(() => refs.current[0]?.focus(), 50);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [autoFocus]);

  const updateAt = (i: number, raw: string) => {
    // Strip non-digits and handle paste of multiple chars at once.
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 0) {
      // Backspace: clear current cell + focus previous
      const next = internal.slice(0, i) + internal.slice(i + 1);
      const padded = pad(next, length);
      setInternal(padded);
      onChange?.(padded.replace(/_/g, ''));
      if (i > 0) refs.current[i - 1]?.focus();
      return;
    }

    const filled = (internal + digits).replace(/_/g, '').slice(0, length);
    const padded = pad(filled, length);
    setInternal(padded);
    onChange?.(filled);

    // Move focus to next-empty cell
    const nextIndex = Math.min(filled.length, length - 1);
    refs.current[nextIndex]?.focus();

    if (filled.length === length) {
      onComplete?.(filled);
    }
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
      {Array.from({ length }).map((_, i) => {
        const ch = (internal[i] ?? '_').replace('_', '');
        return (
          <RNTextInput
            key={i}
            ref={(r) => { refs.current[i] = r; }}
            editable={!disabled}
            value={ch}
            onChangeText={(v) => updateAt(i, v)}
            keyboardType="number-pad"
            maxLength={length /* allow paste */}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            placeholder="•"
            placeholderTextColor="#7A7596"
            style={{
              width: 44,
              height: 56,
              borderRadius: 12,
              backgroundColor: '#1A1340',
              color: '#FFFFFF',
              fontSize: 22,
              fontFamily: 'PlusJakartaSans_700Bold',
              textAlign: 'center',
              borderWidth: ch ? 1 : 0,
              borderColor: '#D7FF81',
            }}
          />
        );
      })}
    </View>
  );
}

function pad(s: string, n: number): string {
  return (s + '_'.repeat(n)).slice(0, n);
}
