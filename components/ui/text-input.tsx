/**
 * Phase 6 Task 6.1 — TextInput + Textarea (filled-indigo treatment).
 *
 * Per Dateasy UI kit (image 9 Forms panel) and brand-signoff: 11px label
 * above, 14px white value inside dark indigo container, NO border, soft
 * inner shadow. Replaces duolicious's `DefaultTextInput` (white pill).
 */

import { useRef, useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import type { TextInputProps as RNTextInputProps } from 'react-native';
import type { ReactNode } from 'react';

import { Body, Caption } from './typography';

type Props = Omit<RNTextInputProps, 'style' | 'placeholderTextColor'> & {
  label?: string;
  error?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function TextInput({
  label,
  error,
  leadingIcon,
  trailingIcon,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      {!!label && (
        <Caption style={{ marginBottom: 4 }}>
          {label}
        </Caption>
      )}
      <View
        className={[
          'flex-row items-center',
          'bg-bg-card rounded-xl px-4',
          'h-14',
          error
            ? 'border border-pink-500'
            : focused
              ? 'border border-lime-500'
              : 'border border-border',
        ].join(' ')}
      >
        {leadingIcon ? <View style={{ marginRight: 8 }}>{leadingIcon}</View> : null}
        <RNTextInput
          {...rest}
          placeholderTextColor="#7A7596"
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          style={{
            flex: 1,
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'PlusJakartaSans_400Regular',
            paddingVertical: 0,   // RN default 0 cross-platform sanity
          }}
        />
        {trailingIcon ? <View style={{ marginLeft: 8 }}>{trailingIcon}</View> : null}
      </View>
      {!!error && (
        <Body size="xs" tone="muted" style={{ color: '#FF4566', marginTop: 4 }}>
          {error}
        </Body>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Textarea — multi-line variant
// ---------------------------------------------------------------------------

type TextareaProps = Omit<Props, 'multiline'> & {
  maxLength?: number;
  showCounter?: boolean;
};

export function Textarea({
  label,
  error,
  maxLength,
  showCounter = !!maxLength,
  onFocus,
  onBlur,
  value,
  ...rest
}: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const charCount = (value ?? '').length;

  return (
    <View>
      {!!label && <Caption style={{ marginBottom: 4 }}>{label}</Caption>}
      <View
        className={[
          'bg-bg-card rounded-xl p-4',
          error
            ? 'border border-pink-500'
            : focused
              ? 'border border-lime-500'
              : 'border border-border',
        ].join(' ')}
        style={{ minHeight: 96 }}
      >
        <RNTextInput
          {...rest}
          value={value}
          maxLength={maxLength}
          multiline
          placeholderTextColor="#7A7596"
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'PlusJakartaSans_400Regular',
            textAlignVertical: 'top',
            minHeight: 64,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
        {!!error
          ? <Body size="xs" style={{ color: '#FF4566' }}>{error}</Body>
          : <View />}
        {showCounter && maxLength != null && (
          <Caption>{charCount}/{maxLength}</Caption>
        )}
      </View>
    </View>
  );
}
