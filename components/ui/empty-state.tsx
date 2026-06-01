/**
 * Phase 6 Task 6.1 — EmptyState.
 *
 * Composable: callers pick a `variant` for default copy + glyph, OR pass
 * their own title/body/cta to override. The 6 pre-composed variants from
 * the plan:
 *   no-matches           swipe deck has caught up to the user
 *   no-messages          inbox is empty
 *   no-search-results    discovery has no candidates after filters
 *   filter-too-narrow    same as no-search-results but with "expand filters" CTA
 *   you-blocked-everyone privacy-driven empty state
 *   no-internet          offline / connectivity loss
 *
 * The illustration slot is a `StickerBadge`-style glyph for now — Phase D
 * Task D.1 will deliver bespoke per-variant SVG art and we'll swap.
 *
 * Auto-centered in its parent. Wrap in a `View` with flex-1 to fill a
 * full screen.
 */

import { View, Pressable, Text } from 'react-native';
import type { ViewProps } from 'react-native';
import type { ReactNode } from 'react';

import { Heading, Body } from './typography';

export type EmptyStateVariant =
  | 'no-matches'
  | 'no-messages'
  | 'no-search-results'
  | 'filter-too-narrow'
  | 'you-blocked-everyone'
  | 'no-internet';

type VariantPreset = {
  glyph: string;
  title: string;
  body: string;
  ctaLabel?: string;
};

const VARIANTS: Record<EmptyStateVariant, VariantPreset> = {
  'no-matches': {
    glyph: '✦',
    title: 'You’re all caught up',
    body:  'Check back later for new people in your area.',
  },
  'no-messages': {
    glyph: '✉',
    title: 'No messages yet',
    body:  'When you match with someone, your conversations will appear here.',
  },
  'no-search-results': {
    glyph: '◇',
    title: 'No one matches your filters',
    body:  'Try expanding your search to see more people.',
    ctaLabel: 'Adjust filters',
  },
  'filter-too-narrow': {
    glyph: '◇',
    title: 'Your filters are very specific',
    body:  'Try widening your country, language, or age range to discover more profiles.',
    ctaLabel: 'Expand filters',
  },
  'you-blocked-everyone': {
    glyph: '∅',
    title: 'Nothing to show',
    body:  'You’ve blocked or hidden everyone matching your filters. You can manage blocks in Settings.',
  },
  'no-internet': {
    glyph: '⚠',
    title: 'No connection',
    body:  'Check your internet connection and try again.',
    ctaLabel: 'Retry',
  },
};

type Props = ViewProps & {
  variant?: EmptyStateVariant;
  title?: string;        // override
  body?: string;         // override
  ctaLabel?: string;     // override; null to suppress
  onCtaPress?: () => void;
  children?: ReactNode;  // optional bottom slot for a secondary CTA
};

export function EmptyState({
  variant = 'no-matches',
  title,
  body,
  ctaLabel,
  onCtaPress,
  children,
  className,
  ...rest
}: Props) {
  const preset = VARIANTS[variant];
  const finalTitle = title ?? preset.title;
  const finalBody = body ?? preset.body;
  const finalCta = ctaLabel ?? preset.ctaLabel;

  return (
    <View
      {...rest}
      className={[
        'items-center justify-center px-8 py-12',
        className as string | undefined,
      ].filter(Boolean).join(' ')}
    >
      {/* Glyph slot — bespoke art lands in Phase D */}
      <View className="w-20 h-20 rounded-full bg-bg-card items-center justify-center mb-6">
        <Text style={{ fontSize: 36, color: '#BC96FF' /* lavender-500 */ }}>
          {preset.glyph}
        </Text>
      </View>

      <Heading level="h2" className="text-center mb-2">
        {finalTitle}
      </Heading>

      <Body tone="secondary" className="text-center max-w-xs">
        {finalBody}
      </Body>

      {finalCta && onCtaPress ? (
        <Pressable
          onPress={onCtaPress}
          accessibilityRole="button"
          accessibilityLabel={finalCta}
          className="mt-6 px-6 h-12 rounded-full bg-lime-500 active:bg-lime-600 items-center justify-center"
        >
          <Text className="font-display text-base text-black">{finalCta}</Text>
        </Pressable>
      ) : null}

      {children}
    </View>
  );
}
