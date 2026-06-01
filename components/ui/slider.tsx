/**
 * Phase 6 Task 6.1 — Slider + RangeSlider.
 *
 * Per Dateasy filters drawer (image 12 right phone): single-thumb Slider
 * with lavender track + lime thumb (e.g. "Preferred distance 1 km"); and
 * RangeSlider with two thumbs + lime track BETWEEN (e.g. "Preferred age
 * 18-23").
 *
 * Pure-RN gesture handling (no third-party slider lib for now). Web/iOS/
 * Android share the same PanResponder pipeline.
 */

import { useRef, useState } from 'react';
import {
  PanResponder,
  View,
  type ViewProps,
} from 'react-native';

const TRACK_HEIGHT = 6;
const THUMB_SIZE = 24;

type SliderProps = Omit<ViewProps, 'onLayout'> & {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  disabled?: boolean;
};

export function Slider({
  min,
  max,
  value,
  onChange,
  step = 1,
  disabled = false,
  style,
  ...rest
}: SliderProps) {
  const [width, setWidth] = useState(0);
  const valueRef = useRef(value);
  valueRef.current = value;

  const fromX = (x: number): number => {
    if (width === 0) return min;
    const clamped = Math.max(0, Math.min(width, x));
    const raw = min + (clamped / width) * (max - min);
    const stepped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, stepped));
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (_e, g) => {
        const x = g.x0 - g.moveX + g.dx;
        // For onPress-on-track: locationX comes from gesture; we use moveX
        // relative to layout in onPanResponderMove. On grant we still pin.
        const next = fromX(g.dx);
        if (next !== valueRef.current) onChange(next);
      },
      onPanResponderMove: (_e, g) => {
        const next = fromX(g.moveX);
        if (next !== valueRef.current) onChange(next);
      },
    }),
  ).current;

  const pct = width === 0 ? 0 : ((value - min) / (max - min)) * width;

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      {...responder.panHandlers}
      style={[{ height: 40, justifyContent: 'center', opacity: disabled ? 0.4 : 1 }, style]}
      {...rest}
    >
      {/* Track */}
      <View
        style={{
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: '#1A1340',
        }}
      />
      {/* Filled portion */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          width: pct,
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: '#BC96FF',
        }}
      />
      {/* Thumb */}
      <View
        style={{
          position: 'absolute',
          left: pct - THUMB_SIZE / 2,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
          backgroundColor: '#D7FF81',
          borderWidth: 2,
          borderColor: '#000000',
        }}
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// RangeSlider (two thumbs)
// ---------------------------------------------------------------------------

type RangeSliderProps = Omit<ViewProps, 'onLayout'> & {
  min: number;
  max: number;
  value: [number, number];           // [low, high]
  onChange: (value: [number, number]) => void;
  step?: number;
  minDistance?: number;              // min gap between thumbs
  disabled?: boolean;
};

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  minDistance = 1,
  disabled = false,
  style,
  ...rest
}: RangeSliderProps) {
  const [width, setWidth] = useState(0);
  const valueRef = useRef(value);
  valueRef.current = value;
  const draggingRef = useRef<'low' | 'high' | null>(null);

  const fromX = (x: number): number => {
    if (width === 0) return min;
    const clamped = Math.max(0, Math.min(width, x));
    const raw = min + (clamped / width) * (max - min);
    const stepped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, stepped));
  };

  const pickThumb = (x: number): 'low' | 'high' => {
    const lowX = ((value[0] - min) / (max - min)) * width;
    const highX = ((value[1] - min) / (max - min)) * width;
    return Math.abs(x - lowX) <= Math.abs(x - highX) ? 'low' : 'high';
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (_e, g) => {
        draggingRef.current = pickThumb(g.x0 - 0);
      },
      onPanResponderMove: (_e, g) => {
        const next = fromX(g.moveX);
        const which = draggingRef.current;
        if (!which) return;
        if (which === 'low') {
          const newLow = Math.min(next, valueRef.current[1] - minDistance);
          if (newLow !== valueRef.current[0]) {
            onChange([newLow, valueRef.current[1]]);
          }
        } else {
          const newHigh = Math.max(next, valueRef.current[0] + minDistance);
          if (newHigh !== valueRef.current[1]) {
            onChange([valueRef.current[0], newHigh]);
          }
        }
      },
      onPanResponderRelease: () => { draggingRef.current = null; },
    }),
  ).current;

  const lowPct = width === 0 ? 0 : ((value[0] - min) / (max - min)) * width;
  const highPct = width === 0 ? 0 : ((value[1] - min) / (max - min)) * width;

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      {...responder.panHandlers}
      style={[{ height: 40, justifyContent: 'center', opacity: disabled ? 0.4 : 1 }, style]}
      {...rest}
    >
      {/* Track */}
      <View
        style={{
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: '#1A1340',
        }}
      />
      {/* Filled between thumbs (lime per Dateasy filters drawer) */}
      <View
        style={{
          position: 'absolute',
          left: lowPct,
          width: highPct - lowPct,
          height: TRACK_HEIGHT,
          backgroundColor: '#D7FF81',
        }}
      />
      {/* Low thumb */}
      <View
        style={{
          position: 'absolute',
          left: lowPct - THUMB_SIZE / 2,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
          backgroundColor: '#D7FF81',
          borderWidth: 2,
          borderColor: '#000000',
        }}
      />
      {/* High thumb */}
      <View
        style={{
          position: 'absolute',
          left: highPct - THUMB_SIZE / 2,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
          backgroundColor: '#D7FF81',
          borderWidth: 2,
          borderColor: '#000000',
        }}
      />
    </View>
  );
}
