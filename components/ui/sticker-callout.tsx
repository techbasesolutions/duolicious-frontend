/**
 * Phase 6 Task 6.1 — StickerCallout.
 *
 * Per Dateasy image 9 + image 5: lime/lavender sticker pill with dark text
 * and slight drop shadow ("Awesome", "coffee?"). 8 preset stickers + a
 * pick-more "+" affordance.
 *
 * Used inside chat to render quick reactions/stickers without typing.
 */

import { Pressable, Text, View } from 'react-native';

export type StickerCalloutVariant =
  | 'awesome'
  | 'coffee'
  | 'lol'
  | 'love'
  | 'wow'
  | 'sad'
  | 'fire'
  | 'thanks';

const PRESETS: Record<StickerCalloutVariant, { label: string; bg: string }> = {
  awesome: { label: 'Awesome', bg: '#D7FF81' },
  coffee:  { label: 'coffee?', bg: '#D7FF81' },
  lol:     { label: 'LOL',     bg: '#BC96FF' },
  love:    { label: 'L.O.V.E', bg: '#BC96FF' },
  wow:     { label: 'wow',     bg: '#FFD24A' },
  sad:     { label: 'sad',     bg: '#FF4566' },
  fire:    { label: '🔥',      bg: '#FFD24A' },
  thanks:  { label: 'thanks!', bg: '#BC96FF' },
};

type Props = {
  variant: StickerCalloutVariant;
  onPress?: () => void;
};

export function StickerCallout({ variant, onPress }: Props) {
  const preset = PRESETS[variant];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={preset.label}
      hitSlop={8}
      style={{
        alignSelf: 'flex-start',
        backgroundColor: preset.bg,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 9999,
        // Subtle drop shadow per kit
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text
        style={{
          color: '#000000',
          fontFamily: 'PlusJakartaSans_700Bold',
          fontSize: 14,
        }}
      >
        {preset.label}
      </Text>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// StickerCalloutPicker — horizontal scroll of all presets + "+" affordance
// ---------------------------------------------------------------------------

type PickerProps = {
  onPick: (variant: StickerCalloutVariant) => void;
  onPickMore?: () => void;
};

const ALL: StickerCalloutVariant[] = [
  'awesome', 'coffee', 'lol', 'love', 'wow', 'sad', 'fire', 'thanks',
];

export function StickerCalloutPicker({ onPick, onPickMore }: PickerProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {ALL.map((v) => (
        <StickerCallout key={v} variant={v} onPress={() => onPick(v)} />
      ))}
      {onPickMore && (
        <Pressable
          onPress={onPickMore}
          accessibilityRole="button"
          accessibilityLabel="Pick more"
          style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: '#1A1340',
            alignItems: 'center', justifyContent: 'center',
            borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <Text style={{ color: '#BC96FF', fontSize: 18 }}>+</Text>
        </Pressable>
      )}
    </View>
  );
}
