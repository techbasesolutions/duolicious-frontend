/**
 * Phase 6 Task 6.1 — VoiceMessage.
 *
 * Sub-component used by Bubble's voice variant. Lime play button + waveform
 * + duration. Real waveform rendering uses Skia (already a dep
 * @shopify/react-native-skia in package.json) — for now we render a
 * static stylized waveform of bars with caller-provided heights.
 */

import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';

import { Numeric } from './typography';

type Props = {
  /** 0-1 normalized heights, recommended 24-48 samples */
  waveform?: number[];
  /** Total duration in seconds */
  durationSec: number;
  /** Variant of bubble — me=lime bg, them=lavender bg */
  variant?: 'me' | 'them';
  onPlay?: () => void;
  onPause?: () => void;
};

export function VoiceMessage({
  waveform, durationSec, variant = 'them', onPlay, onPause,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const isMe = variant === 'me';
  const bg = isMe ? '#D7FF81' : '#BC96FF';
  const accent = '#000000';

  const bars = waveform ?? defaultWaveform();

  const togglePlay = () => {
    setPlaying((p) => {
      if (p) onPause?.(); else onPlay?.();
      return !p;
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        marginVertical: 4,
        paddingHorizontal: 12,
      }}
    >
      {!isMe && <View style={{ width: 32, marginRight: 8 }} />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 18,
          borderBottomLeftRadius: isMe ? 18 : 4,
          borderBottomRightRadius: isMe ? 4 : 18,
          backgroundColor: bg,
        }}
      >
        {/* Play / pause button */}
        <Pressable
          onPress={togglePlay}
          accessibilityRole="button"
          accessibilityLabel={playing ? 'Pause voice message' : 'Play voice message'}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#000000',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: bg, fontSize: 14, fontWeight: '700' }}>
            {playing ? '❚❚' : '▶'}
          </Text>
        </Pressable>
        {/* Waveform */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, height: 24 }}>
          {bars.map((h, i) => (
            <View
              key={i}
              style={{
                width: 2,
                height: Math.max(4, Math.round(h * 24)),
                borderRadius: 1,
                backgroundColor: accent,
              }}
            />
          ))}
        </View>
        {/* Duration */}
        <Numeric size="sm" tone="primary" style={{ color: '#000000' }}>
          {formatDuration(durationSec)}
        </Numeric>
      </View>
    </View>
  );
}

function defaultWaveform(): number[] {
  // Generic stylized pattern — used when caller didn't capture real samples.
  return [0.2, 0.4, 0.7, 0.5, 0.9, 0.6, 0.3, 0.5, 0.8, 0.4, 0.6, 0.3, 0.5, 0.7, 0.4, 0.2];
}

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
