/**
 * Phase 6 Task 6.1 — ErrorState.
 *
 * Full-screen fatal-error placeholder. Wavy red sticker + Heading + Body
 * + Retry CTA. Used for auth-lost / app-update-required / network down >30s.
 */

import { Pressable, Text, View } from 'react-native';
import type { ViewProps } from 'react-native';

import { Body, Heading } from './typography';
import { StickerBadge } from './sticker-badge';

type Props = ViewProps & {
  title?: string;
  body?: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
};

export function ErrorState({
  title = 'Something went wrong',
  body = 'We hit an unexpected problem. Tap retry to try again.',
  ctaLabel = 'Retry',
  onCtaPress,
  className,
  ...rest
}: Props) {
  return (
    <View
      {...rest}
      className={[
        'items-center justify-center px-8 py-12',
        className as string | undefined,
      ].filter(Boolean).join(' ')}
    >
      <StickerBadge variant="wavy" size={80} />
      <Heading level="h2" style={{ marginTop: 24, textAlign: 'center' }}>
        {title}
      </Heading>
      <Body tone="secondary" style={{ textAlign: 'center', marginTop: 8, maxWidth: 320 }}>
        {body}
      </Body>
      {onCtaPress && (
        <Pressable
          onPress={onCtaPress}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel}
          className="mt-6 px-6 h-12 rounded-lg bg-lime-500 active:bg-lime-600 items-center justify-center"
        >
          <Text className="font-display text-base text-black">{ctaLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
