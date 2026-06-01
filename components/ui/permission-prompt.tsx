/**
 * Phase 6 Task 6.1 — PermissionPrompt.
 *
 * Pre-OS-prompt screen that explains the permission ask in human language
 * before the iOS/Android system dialog fires (improves grant rate ~30%).
 *
 * Variants: notifications / camera / photo-library / location.
 *
 * Composes Card + Heading + Body + lime CTA + skip ghost. Per docs/design-system.md.
 */

import { Pressable, Text, View } from 'react-native';
import type { ViewProps } from 'react-native';

import { StickerBadge, type StickerVariant } from './sticker-badge';
import { Body, Heading } from './typography';
import { PillButton } from './pill';

type Variant = 'notifications' | 'camera' | 'photo-library' | 'location';

const PRESETS: Record<Variant, { title: string; body: string; sticker: StickerVariant; ctaLabel: string }> = {
  notifications: {
    title: 'Get notified when matches happen',
    body:  "We'll let you know about new matches, messages, and likes. You can change this anytime.",
    sticker: 'sparkle-4pt',
    ctaLabel: 'Enable notifications',
  },
  camera: {
    title: 'Take great profile photos',
    body:  "We'll use your camera for verification and profile photos. Photos stay private until you publish them.",
    sticker: 'circle-large',
    ctaLabel: 'Allow camera',
  },
  'photo-library': {
    title: 'Pick photos from your library',
    body:  'We need access to your photo library so you can add profile pictures.',
    sticker: 'circle-large',
    ctaLabel: 'Allow photos',
  },
  location: {
    title: 'Show people nearby',
    body:  'We use your location to show profiles closer to you. Approximate location is enough.',
    sticker: 'pent-star',
    ctaLabel: 'Share location',
  },
};

type Props = ViewProps & {
  variant: Variant;
  onAllow: () => void;
  onSkip?: () => void;
  loading?: boolean;
};

export function PermissionPrompt({
  variant, onAllow, onSkip, loading, style, ...rest
}: Props) {
  const preset = PRESETS[variant];

  return (
    <View
      {...rest}
      style={[{ alignItems: 'center', padding: 24, gap: 16 }, style]}
    >
      <View
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          backgroundColor: '#1A1340',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        <StickerBadge variant={preset.sticker} size={48} />
      </View>

      <Heading level="h2" style={{ textAlign: 'center', maxWidth: 320 }}>
        {preset.title}
      </Heading>
      <Body tone="secondary" style={{ textAlign: 'center', maxWidth: 320 }}>
        {preset.body}
      </Body>

      <PillButton onPress={onAllow} loading={loading} style={{ marginTop: 16 }}>
        {preset.ctaLabel}
      </PillButton>

      {!!onSkip && (
        <Pressable
          onPress={onSkip}
          accessibilityRole="button"
          accessibilityLabel="Maybe later"
          style={{ marginTop: 4, paddingVertical: 8 }}
        >
          <Text
            style={{
              color: '#B5B0CC',
              fontSize: 14,
              fontFamily: 'PlusJakartaSans_500Medium',
            }}
          >
            Maybe later
          </Text>
        </Pressable>
      )}
    </View>
  );
}
