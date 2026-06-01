/**
 * Phase 6 Task 6.1 — CountryFlag.
 *
 * Wraps the emoji flag for consistency. Some platforms render flag emoji
 * poorly (Windows web in particular); we fall back to a labeled CC chip
 * on those.
 */

import { Platform, Text, View } from 'react-native';

type Size = 'sm' | 'md' | 'lg';

const FONT_PX: Record<Size, number> = { sm: 14, md: 18, lg: 28 };

type Props = {
  /** ISO-3166-1 alpha-2 country code, e.g. "BB", "US" */
  cc: string;
  size?: Size;
};

export function CountryFlag({ cc, size = 'md' }: Props) {
  const upper = cc.toUpperCase();
  const fontSize = FONT_PX[size];

  // Windows/web Chrome doesn't render flag emoji by default — fall back
  // to a small dark chip with the CC text.
  const useFallback =
    Platform.OS === 'web' && typeof navigator !== 'undefined' && /Win/i.test(navigator.platform);

  if (useFallback) {
    return (
      <View
        accessibilityLabel={`Country ${upper}`}
        style={{
          backgroundColor: '#1A1340',
          borderRadius: 4,
          paddingHorizontal: 6,
          paddingVertical: 2,
          minWidth: fontSize + 8,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: fontSize - 4,
            fontFamily: 'PlusJakartaSans_700Bold',
          }}
        >
          {upper}
        </Text>
      </View>
    );
  }

  // Convert CC to regional-indicator emoji pair (🇧🇧 etc.)
  const flag = upper
    .split('')
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join('');

  return (
    <Text
      accessibilityLabel={`Country ${upper}`}
      style={{ fontSize }}
    >
      {flag}
    </Text>
  );
}
