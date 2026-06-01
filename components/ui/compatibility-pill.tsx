/**
 * Phase 6 Task 6.1 — CompatibilityPill.
 *
 * Per Dateasy reference image 9 + image 12 swipe card: lime fill + leading
 * chat-bubble glyph + percent number. Hard requirement: never invent a
 * score client-side; render only when `score` is present, hide otherwise.
 */

import { Text, View } from 'react-native';

type Size = 'sm' | 'md' | 'lg';

const SIZE_HEIGHT: Record<Size, number> = { sm: 24, md: 28, lg: 36 };
const SIZE_FONT: Record<Size, number>   = { sm: 11, md: 13, lg: 15 };

type Props = {
  score?: number | null;       // 0-100; null/undefined → render nothing
  size?: Size;
};

export function CompatibilityPill({ score, size = 'md' }: Props) {
  if (score == null) return null;
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const h = SIZE_HEIGHT[size];

  return (
    <View
      accessibilityLabel={`${clamped}% compatible`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D7FF81',
        borderRadius: 14,
        height: h,
        paddingHorizontal: 10,
        gap: 4,
      }}
    >
      <Text style={{ fontSize: SIZE_FONT[size], color: '#000', fontWeight: '700' }}>
        ◗
      </Text>
      <Text
        style={{
          fontSize: SIZE_FONT[size],
          color: '#000000',
          fontFamily: 'PlusJakartaSans_700Bold',
          fontVariant: ['tabular-nums'],
        }}
      >
        {clamped}%
      </Text>
    </View>
  );
}
