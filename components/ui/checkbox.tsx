/**
 * Phase 6 Task 6.1 — Checkbox.
 *
 * Square check (radius 6). Checked = lime fill + dark check; unchecked =
 * lavender outline. Used for terms acceptance, multi-select with no Sheet.
 */

import { Pressable, Text } from 'react-native';

type Props = {
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  size?: 18 | 22 | 28;
};

export function Checkbox({
  value,
  onValueChange,
  disabled = false,
  accessibilityLabel,
  size = 22,
}: Props) {
  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      hitSlop={8}
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        backgroundColor: value ? '#D7FF81' : 'transparent',
        borderWidth: 1.5,
        borderColor: value ? '#D7FF81' : '#BC96FF',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {value && (
        <Text
          style={{
            color: '#000000',
            fontSize: Math.round(size * 0.65),
            lineHeight: size,
            fontWeight: '700',
          }}
        >
          ✓
        </Text>
      )}
    </Pressable>
  );
}
