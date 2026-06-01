/**
 * Phase 6 Task 6.1 — ChatInput.
 *
 * Per Dateasy image 3 right phone: bottom-fixed indigo bar with paperclip
 * leading, multi-line text input middle, send/record icon trailing. The
 * record icon swaps to a send icon when text is non-empty.
 *
 * Multi-line auto-grows up to 5 lines then scrolls.
 */

import { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native';

type Props = {
  value?: string;
  onChangeText?: (v: string) => void;
  onSend?: (v: string) => void;
  onAttach?: () => void;
  onRecordStart?: () => void;
  placeholder?: string;
};

export function ChatInput({
  value, onChangeText, onSend, onAttach, onRecordStart,
  placeholder = 'Type something…',
}: Props) {
  const [internal, setInternal] = useState('');
  const text = value ?? internal;
  const hasText = text.trim().length > 0;

  const setText = (v: string) => {
    if (value === undefined) setInternal(v);
    onChangeText?.(v);
  };

  const handleSend = () => {
    if (!hasText) return;
    onSend?.(text);
    if (value === undefined) setInternal('');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#1A1340',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Attach */}
      <Pressable
        onPress={onAttach}
        accessibilityRole="button"
        accessibilityLabel="Attach photo"
        hitSlop={8}
        style={{
          width: 36, height: 36, borderRadius: 18,
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#BC96FF', fontSize: 18 }}>📎</Text>
      </Pressable>

      {/* Text input — auto-grows up to ~5 lines */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#0F0B1F',
          borderRadius: 22,
          paddingHorizontal: 14,
          paddingVertical: 8,
          maxHeight: 130,
        }}
      >
        <RNTextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder={placeholder}
          placeholderTextColor="#7A7596"
          style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontFamily: 'PlusJakartaSans_400Regular',
            paddingTop: 4,
          }}
        />
      </View>

      {/* Send / Record */}
      <Pressable
        onPress={hasText ? handleSend : onRecordStart}
        onLongPress={!hasText ? onRecordStart : undefined}
        accessibilityRole="button"
        accessibilityLabel={hasText ? 'Send message' : 'Hold to record voice'}
        hitSlop={8}
        style={{
          width: 36, height: 36, borderRadius: 18,
          backgroundColor: hasText ? '#D7FF81' : 'transparent',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Text style={{ color: hasText ? '#000000' : '#BC96FF', fontSize: 18 }}>
          {hasText ? '➤' : '🎤'}
        </Text>
      </Pressable>
    </View>
  );
}
