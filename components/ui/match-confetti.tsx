/**
 * Phase 6 Task 6.1 — MatchConfetti.
 *
 * Composes 8-12 StickerBadge instances into staged-entry layouts via
 * Animated worklets. Three variants per docs/dateasy-rules.md image 6 +
 * docs/motion-spec.md "Match-screen choreography":
 *
 *   match       full celebration: 8-12 stickers scattered around a center,
 *               staggered entry per motion spec.
 *   splash      sparser ambient (4-5 stickers), slow drift, low saturation.
 *   empty-state gentle low-saturation (3-4 stickers), no animation.
 *
 * Reduce-motion mode renders all stickers at final position with a fade.
 *
 * The atom is layout-only — caller wraps in a positioned container
 * (e.g. absolute fill behind the match-screen card stack).
 */

import { useEffect, useRef } from 'react';
import { Animated, Easing, View, useWindowDimensions } from 'react-native';
import type { ViewProps } from 'react-native';

import { StickerBadge, type StickerVariant } from './sticker-badge';
import { motionDuration, motionEasing } from '../../../ahavah-design-tokens/motion';

type Variant = 'match' | 'splash' | 'empty-state';

type StickerSpec = {
  variant: StickerVariant;
  size: number;
  // Position as fractions of container (0..1). Computed at layout time.
  xPct: number;
  yPct: number;
  rotation: number;
  delayMs: number;
  // Optional color override
  color?: string;
};

// Layouts derived from images 6, 14, and 5 respectively.
const LAYOUTS: Record<Variant, StickerSpec[]> = {
  match: [
    { variant: 'heart',        size: 56, xPct: 0.15, yPct: 0.10, rotation: -10, delayMs: 0   },
    { variant: 'sparkle-4pt',  size: 48, xPct: 0.85, yPct: 0.12, rotation:  15, delayMs: 60  },
    { variant: 'blob',         size: 64, xPct: 0.10, yPct: 0.78, rotation:  20, delayMs: 120 },
    { variant: 'quad-star',    size: 44, xPct: 0.88, yPct: 0.80, rotation: -15, delayMs: 180 },
    { variant: 'pent-star',    size: 40, xPct: 0.50, yPct: 0.05, rotation:   0, delayMs: 240 },
    { variant: 'flower',       size: 48, xPct: 0.30, yPct: 0.92, rotation:  10, delayMs: 300 },
    { variant: 'triangle',     size: 36, xPct: 0.72, yPct: 0.92, rotation: -25, delayMs: 360 },
    { variant: 'wavy',         size: 56, xPct: 0.05, yPct: 0.45, rotation:  90, delayMs: 420 },
    { variant: 'dot',          size: 24, xPct: 0.95, yPct: 0.45, rotation:   0, delayMs: 480 },
    { variant: 'pentagon',     size: 40, xPct: 0.20, yPct: 0.50, rotation:  30, delayMs: 540 },
  ],
  splash: [
    { variant: 'sparkle-4pt',  size: 64, xPct: 0.20, yPct: 0.20, rotation:   0, delayMs: 0,   color: '#BC96FF' },
    { variant: 'sparkle-4pt',  size: 32, xPct: 0.85, yPct: 0.30, rotation:  20, delayMs: 80,  color: '#BC96FF' },
    { variant: 'dot',          size: 20, xPct: 0.65, yPct: 0.18, rotation:   0, delayMs: 160, color: '#BC96FF' },
    { variant: 'blob',         size: 56, xPct: 0.78, yPct: 0.78, rotation:  10, delayMs: 240, color: '#BC96FF' },
    { variant: 'pent-star',    size: 36, xPct: 0.18, yPct: 0.85, rotation: -15, delayMs: 320 },
  ],
  'empty-state': [
    { variant: 'sparkle-4pt',  size: 32, xPct: 0.30, yPct: 0.30, rotation:   0, delayMs: 0,   color: '#7A7596' },
    { variant: 'dot',          size: 16, xPct: 0.70, yPct: 0.40, rotation:   0, delayMs: 0,   color: '#7A7596' },
    { variant: 'blob',         size: 40, xPct: 0.60, yPct: 0.75, rotation:  20, delayMs: 0,   color: '#7A7596' },
  ],
};

type Props = ViewProps & {
  variant: Variant;
  width?: number;       // optional override; defaults to window width
  height?: number;      // optional override; defaults to window height
  reduceMotion?: boolean;
};

export function MatchConfetti({
  variant,
  width,
  height,
  reduceMotion = false,
  style,
  ...rest
}: Props) {
  const { width: winW, height: winH } = useWindowDimensions();
  const w = width ?? winW;
  const h = height ?? winH;
  const stickers = LAYOUTS[variant];

  return (
    <View
      pointerEvents="none"
      style={[
        { position: 'absolute', top: 0, left: 0, width: w, height: h },
        style,
      ]}
      {...rest}
    >
      {stickers.map((s, i) => (
        <ConfettiSticker
          key={i}
          spec={s}
          containerW={w}
          containerH={h}
          reduceMotion={reduceMotion}
        />
      ))}
    </View>
  );
}

function ConfettiSticker({
  spec,
  containerW,
  containerH,
  reduceMotion,
}: {
  spec: StickerSpec;
  containerW: number;
  containerH: number;
  reduceMotion: boolean;
}) {
  const opacity = useRef(new Animated.Value(reduceMotion ? 1 : 0)).current;
  const scale = useRef(new Animated.Value(reduceMotion ? 1 : 0.5)).current;

  useEffect(() => {
    if (reduceMotion) {
      // Fade-only entry, no scale
      Animated.timing(opacity, {
        toValue: 1,
        duration: motionDuration.fast,
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: motionDuration.base,
        delay: spec.delayMs,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay: spec.delayMs,
        damping: 12,
        stiffness: 200,
        mass: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [spec.delayMs, reduceMotion]);

  const x = containerW * spec.xPct - spec.size / 2;
  const y = containerH * spec.yPct - spec.size / 2;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: [{ scale }],
      }}
    >
      <StickerBadge
        variant={spec.variant}
        size={spec.size}
        color={spec.color}
        rotation={spec.rotation}
      />
    </Animated.View>
  );
}
