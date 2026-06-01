/**
 * Phase 6 Task 6.1 — StickerBadge.
 *
 * Decorative geometric shape vocabulary per Dateasy references (image 5
 * floating-confetti, image 6 match scene, image 8 hero stickers, image 16
 * indigo word-card concentric rings). Twelve variants total — all SVG
 * paths inside a single component file (under 360 lines for simplicity;
 * extract to per-variant SVG files later if asset budget needs trimming).
 *
 * All variants:
 *   - 2px black outline stroke (stroke-width adjusts proportionally to size)
 *   - Soft drop shadow (rendered via a Shadow filter element)
 *   - Caller-overridable color via `color` prop
 *   - Rotation + horizontal/vertical flip props for compositional variation
 *     in MatchConfetti
 */

import { View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  FeDropShadow,
  Filter,
  G,
  Path,
  Polygon,
} from 'react-native-svg';
import type { ViewProps } from 'react-native';

export type StickerVariant =
  | 'sparkle-4pt'
  | 'heart'
  | 'quad-star'
  | 'pent-star'
  | 'flower'
  | 'blob'
  | 'triangle'
  | 'wavy'
  | 'dot'
  | 'circle-large'
  | 'pentagon'
  | 'cross-target';

const DEFAULT_COLOR: Record<StickerVariant, string> = {
  'sparkle-4pt':  '#D7FF81',  // lime
  'heart':        '#FF4566',  // pink-red
  'quad-star':    '#D7FF81',
  'pent-star':    '#FFD24A',  // yellow-lime
  'flower':       '#BC96FF',  // lavender
  'blob':         '#BC96FF',
  'triangle':     '#FFD24A',
  'wavy':         '#FF4566',
  'dot':          '#BC96FF',
  'circle-large': '#5524F5',  // indigo
  'pentagon':     '#BC96FF',
  'cross-target': '#D7FF81',
};

type Flip = 'none' | 'h' | 'v';

type Props = ViewProps & {
  variant: StickerVariant;
  size?: number;          // px, default 32
  color?: string;         // overrides default per variant
  rotation?: number;      // degrees, default 0
  flip?: Flip;
};

export function StickerBadge({
  variant,
  size = 32,
  color,
  rotation = 0,
  flip = 'none',
  style,
  ...rest
}: Props) {
  const fill = color ?? DEFAULT_COLOR[variant];
  const stroke = '#000000';
  // Stroke width scales: 2px at 32 → ~0.0625 of size
  const strokeWidth = Math.max(1, size * 0.06);

  const flipScale = flip === 'h' ? [-1, 1] : flip === 'v' ? [1, -1] : [1, 1];
  const transform = `rotate(${rotation} 50 50) scale(${flipScale[0]} ${flipScale[1]}) translate(${flip === 'h' ? -100 : 0} ${flip === 'v' ? -100 : 0})`;

  return (
    <View
      style={[{ width: size, height: size }, style]}
      accessibilityRole="image"
      {...rest}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          {/* Shadow filter — soft drop shadow on every sticker */}
          <Filter id="sticker-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <FeDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
          </Filter>
        </Defs>
        <G transform={transform} filter="url(#sticker-shadow)">
          {renderShape(variant, fill, stroke, strokeWidth)}
        </G>
      </Svg>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Shape renderers
// ---------------------------------------------------------------------------

function renderShape(
  variant: StickerVariant,
  fill: string,
  stroke: string,
  sw: number,
) {
  switch (variant) {
    case 'sparkle-4pt':
      return (
        <Path
          d="M50 5 C50 30 70 50 95 50 C70 50 50 70 50 95 C50 70 30 50 5 50 C30 50 50 30 50 5 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      );
    case 'heart':
      return (
        <Path
          d="M50 88 C30 70 10 55 10 35 C10 22 20 12 32 12 C40 12 46 16 50 22 C54 16 60 12 68 12 C80 12 90 22 90 35 C90 55 70 70 50 88 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      );
    case 'quad-star':
      // Squared 4-point star (sharper than sparkle-4pt; straight edges)
      return (
        <Polygon
          points="50,5 60,40 95,50 60,60 50,95 40,60 5,50 40,40"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      );
    case 'pent-star':
      return (
        <Polygon
          points="50,5 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      );
    case 'flower':
      // 5-petal flower
      return (
        <G>
          {[0, 72, 144, 216, 288].map((angle) => (
            <Circle
              key={angle}
              cx={50 + 24 * Math.cos((angle - 90) * Math.PI / 180)}
              cy={50 + 24 * Math.sin((angle - 90) * Math.PI / 180)}
              r="22"
              fill={fill}
              stroke={stroke}
              strokeWidth={sw}
            />
          ))}
          <Circle cx="50" cy="50" r="14" fill="#FFD24A" stroke={stroke} strokeWidth={sw} />
        </G>
      );
    case 'blob':
      // Organic squiggle / amoeba
      return (
        <Path
          d="M30 20 C50 10 80 18 88 40 C95 58 80 78 60 85 C40 92 18 80 12 60 C8 42 14 28 30 20 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      );
    case 'triangle':
      return (
        <Polygon
          points="50,8 92,88 8,88"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      );
    case 'wavy':
      // Sine-wave line (stroke only, no fill)
      return (
        <Path
          d="M5 50 Q 25 20, 45 50 T 85 50 T 95 50"
          fill="none"
          stroke={fill}
          strokeWidth={sw * 4}
          strokeLinecap="round"
        />
      );
    case 'dot':
      return (
        <Circle cx="50" cy="50" r="20" fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case 'circle-large':
      return (
        <Circle cx="50" cy="50" r="42" fill={fill} stroke={stroke} strokeWidth={sw} />
      );
    case 'pentagon':
      return (
        <Polygon
          points="50,5 95,38 78,92 22,92 5,38"
          fill={fill}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      );
    case 'cross-target':
      // Concentric rings (per image 16 indigo word-card)
      return (
        <G>
          <Circle cx="50" cy="50" r="42" fill="none" stroke={fill} strokeWidth={sw * 2} />
          <Circle cx="50" cy="50" r="28" fill="none" stroke={fill} strokeWidth={sw * 2} />
          <Circle cx="50" cy="50" r="14" fill={fill} stroke={stroke} strokeWidth={sw} />
        </G>
      );
  }
}
