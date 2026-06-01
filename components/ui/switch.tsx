/**
 * Phase 6 Task 6.1 — Switch.
 *
 * Pill-shaped on/off toggle. On = lime track + dark thumb pushed right;
 * Off = bg.card track + lavender thumb left. 56×32 standard size.
 */

import { Pressable, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type Props = {
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function Switch({
  value,
  onValueChange,
  disabled = false,
  accessibilityLabel,
}: Props) {
  const x = useRef(new Animated.Value(value ? 24 : 0)).current;

  useEffect(() => {
    Animated.spring(x, {
      toValue: value ? 24 : 0,
      damping: 18,
      stiffness: 250,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      style={{
        width: 56,
        height: 32,
        borderRadius: 16,
        backgroundColor: value ? '#D7FF81' : '#1A1340',
        borderWidth: 1,
        borderColor: value ? '#D7FF81' : 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Animated.View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: value ? '#000000' : '#BC96FF',
          marginLeft: 4,
          transform: [{ translateX: x }],
        }}
      />
    </Pressable>
  );
}
