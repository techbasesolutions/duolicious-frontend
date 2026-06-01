/**
 * Phase 6 Task 6.1 — BrandMark.
 *
 * Per Dateasy reference (image 9 UI kit + image 14 hero), the brand mark
 * is a 4-point SPARKLE on a rounded-rect tile, NOT a circle dot.
 *
 * Three modes:
 *   full        sparkle-tile + wordmark to the right (welcome, marketing)
 *   icon-only   sparkle-tile only (header bars, app-icon contexts)
 *   monochrome  white sparkle on indigo OR black sparkle on white tile
 *
 * Sparkle path: a 4-pointed concave star drawn at 100×100 viewBox, centered.
 * Caller controls overall size; the SVG scales.
 *
 * Phase D Task D.1 sign-off: app name "ahavah" lowercase, intentionally
 * matches the Dateasy idiom (image 14 shows lowercase "dateasy").
 */

import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { ViewProps } from 'react-native';

type Mode = 'full' | 'icon-only' | 'monochrome';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_PX: Record<Size, { tile: number; word: number; gap: number }> = {
  sm: { tile: 24, word: 18, gap: 6 },
  md: { tile: 36, word: 28, gap: 10 },
  lg: { tile: 56, word: 44, gap: 14 },
  xl: { tile: 96, word: 72, gap: 22 },
};

// 4-point sparkle path. Constructed from a square with concave inner curves
// pulling each side toward the center — the "diamond with curved sides" silhouette
// matching the Dateasy mark.
const SPARKLE_PATH =
  'M50 0 ' +
  'C50 30 70 50 100 50 ' +
  'C70 50 50 70 50 100 ' +
  'C50 70 30 50 0 50 ' +
  'C30 50 50 30 50 0 Z';

type Props = ViewProps & {
  mode?: Mode;
  size?: Size;
};

export function BrandMark({ mode = 'full', size = 'md', style, ...rest }: Props) {
  const px = SIZE_PX[size];

  // Color resolution per mode
  const tileBg = mode === 'monochrome' ? '#FFFFFF' : '#1A1340';   // bg.indigo OR white
  const sparkleColor = mode === 'monochrome' ? '#000000' : '#D7FF81';  // black OR lime
  const wordColor = mode === 'monochrome' ? '#000000' : '#FFFFFF';

  const SparkleTile = (
    <View
      style={{
        width: px.tile,
        height: px.tile,
        backgroundColor: tileBg,
        borderRadius: Math.round(px.tile * 0.22),
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg
        width={Math.round(px.tile * 0.62)}
        height={Math.round(px.tile * 0.62)}
        viewBox="0 0 100 100"
      >
        <Path d={SPARKLE_PATH} fill={sparkleColor} />
      </Svg>
    </View>
  );

  if (mode === 'icon-only') {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel="Ahavah"
        style={style}
        {...rest}
      >
        {SparkleTile}
      </View>
    );
  }

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel="Ahavah"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: px.gap,
        },
        style,
      ]}
      {...rest}
    >
      {SparkleTile}
      <Text
        style={{
          fontFamily: 'PlusJakartaSans_700Bold',
          fontSize: px.word,
          color: wordColor,
          lineHeight: px.word * 1.05,
          letterSpacing: -0.5,
        }}
      >
        ahavah
      </Text>
    </View>
  );
}
