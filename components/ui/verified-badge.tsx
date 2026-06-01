/**
 * Phase 6 Task 6.1 + Phase 3 Task 3.2 — VerifiedBadge.
 *
 * Renders the bronze / silver / gold verification tier as a small coloured
 * badge with a check glyph. Consumes the `verification_level` enum from
 * the Phase 3 backend (`'none' | 'bronze' | 'silver' | 'gold'`).
 *
 * Bronze label is "Profile verified" (NOT "Photo verified") because
 * duolicious's existing verification cross-checks photo + gender + age +
 * ethnicity together — see docs/specs/duolicious-audit.md Q7.
 *
 * The badge is purely visual; tier-promotion flows live in
 * `verification/` screens (Phase 3 Task 3.2 D1-D4 — pending).
 */

import { View, Text } from 'react-native';
import type { ViewProps } from 'react-native';

export type VerificationLevel = 'none' | 'bronze' | 'silver' | 'gold';

const TIER_BG: Record<Exclude<VerificationLevel, 'none'>, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold:   '#FFD700',
};

const TIER_LABEL: Record<VerificationLevel, string> = {
  none:   '',
  bronze: 'Profile verified',
  silver: 'Liveness verified',
  gold:   'ID verified',
};

type Size = 'sm' | 'md' | 'lg';

const SIZE_PX: Record<Size, number> = {
  sm: 14,
  md: 18,
  lg: 24,
};

type Props = ViewProps & {
  level: VerificationLevel;
  size?: Size;
};

export function VerifiedBadge({ level, size = 'sm', ...rest }: Props) {
  if (level === 'none') return null;

  const px = SIZE_PX[size];
  const bg = TIER_BG[level];

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={TIER_LABEL[level]}
      style={{
        backgroundColor: bg,
        width: px,
        height: px,
        borderRadius: px / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...rest}
    >
      {/*
       * Render the check glyph as text rather than pulling in a vector-icon
       * dep just for a single 8-pixel checkmark. Plus Jakarta Sans's
       * U+2713 (✓) renders cleanly across iOS / Android / web.
       */}
      <Text
        style={{
          color: 'white',
          fontSize: Math.round(px * 0.7),
          lineHeight: px,
          textAlign: 'center',
          // bold check looks heavier than the surrounding tier-coloured ring
          fontWeight: '700',
        }}
      >
        ✓
      </Text>
    </View>
  );
}
