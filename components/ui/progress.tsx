/**
 * Phase 6 Task 6.1 — ProgressBar + ProgressDots.
 *
 *   ProgressBar  thin horizontal track with lime fill, used for upload
 *                progress, photo moderation pending, etc. Indeterminate
 *                mode wraps a sliding lime bar.
 *   ProgressDots N dots (current = lime, others = bg.card outline) used
 *                for onboarding multi-step.
 */

import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

// ---------------------------------------------------------------------------
// ProgressBar
// ---------------------------------------------------------------------------

type BarProps = {
  /** 0..1 progress; if undefined → indeterminate */
  value?: number;
  height?: number;
};

export function ProgressBar({ value, height = 4 }: BarProps) {
  const indeterminate = value === undefined;
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (indeterminate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(widthAnim, { toValue: 1, duration: 1200, easing: Easing.linear, useNativeDriver: false }),
          Animated.timing(widthAnim, { toValue: 0, duration: 0, useNativeDriver: false }),
        ]),
      ).start();
    } else {
      Animated.timing(widthAnim, {
        toValue: Math.max(0, Math.min(1, value)),
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [value, indeterminate]);

  const widthInterp = widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={indeterminate ? undefined : { now: Math.round(value * 100), min: 0, max: 100 }}
      style={{
        width: '100%',
        height,
        borderRadius: height / 2,
        backgroundColor: '#1A1340',
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          height: '100%',
          width: widthInterp,
          backgroundColor: '#D7FF81',
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// ProgressDots
// ---------------------------------------------------------------------------

type DotsProps = {
  total: number;
  current: number;     // 0-indexed
};

export function ProgressDots({ total, current }: DotsProps) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${current + 1} of ${total}`}
      style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            width: i === current ? 24 : 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: i === current
              ? '#D7FF81'
              : 'rgba(255,255,255,0.15)',
          }}
        />
      ))}
    </View>
  );
}
