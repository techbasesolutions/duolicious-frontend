/**
 * Phase 6 Task 6.1 — Typography atoms.
 *
 *   Heading   display font (Plus Jakarta Sans Bold), 3 levels (h1/h2/h3)
 *   Body      paragraph, sm/base/lg sizes, secondary-color tint optional
 *   Caption   micro text for distance / timestamp / metadata
 *   Numeric   tabular-figures for ages, prices, distances (RN: variant style)
 *
 * All four wrap react-native's `Text` and accept its props, so existing call
 * sites that use `<Text style={...} />` can be incrementally migrated by
 * swapping the component name without restructuring children. The
 * distinguishing concern is *consistency* — heading sizes/weights/spacing
 * match across screens because they go through one of these four atoms,
 * never through inline styles.
 */

import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Heading
// ---------------------------------------------------------------------------

type HeadingLevel = 'h1' | 'h2' | 'h3';

const HEADING_CLASS: Record<HeadingLevel, string> = {
  // The leading- values are picked for compact heading rhythm; on screens
  // with more breathing room (Onboarding A20), wrap in a View with my-6.
  h1: 'font-display text-4xl text-text-primary leading-tight',
  h2: 'font-display text-2xl text-text-primary leading-tight',
  h3: 'font-display text-xl text-text-primary leading-snug',
};

type HeadingProps = Omit<TextProps, 'children'> & {
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
};

export function Heading({
  level = 'h1',
  children,
  className,
  ...rest
}: HeadingProps) {
  return (
    <Text
      accessibilityRole="header"
      {...rest}
      className={[HEADING_CLASS[level], className].filter(Boolean).join(' ')}
    >
      {children}
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

type BodySize = 'xs' | 'sm' | 'base' | 'lg';
type BodyTone = 'primary' | 'secondary' | 'muted';

const BODY_SIZE_CLASS: Record<BodySize, string> = {
  xs:   'text-xs',
  sm:   'text-sm',
  base: 'text-base',
  lg:   'text-lg',
};

const BODY_TONE_CLASS: Record<BodyTone, string> = {
  primary:   'text-text-primary',
  secondary: 'text-text-secondary',
  muted:     'text-text-muted',
};

type BodyProps = Omit<TextProps, 'children'> & {
  size?: BodySize;
  tone?: BodyTone;
  children: ReactNode;
  className?: string;
};

export function Body({
  size = 'base',
  tone = 'primary',
  children,
  className,
  ...rest
}: BodyProps) {
  return (
    <Text
      {...rest}
      className={[
        'font-body',
        BODY_SIZE_CLASS[size],
        BODY_TONE_CLASS[tone],
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Caption
// ---------------------------------------------------------------------------

type CaptionProps = Omit<TextProps, 'children'> & {
  children: ReactNode;
  className?: string;
};

export function Caption({ children, className, ...rest }: CaptionProps) {
  return (
    <Text
      {...rest}
      className={[
        'font-body text-xs text-text-muted',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Numeric — tabular figures
// ---------------------------------------------------------------------------
//
// React Native doesn't expose CSS `font-variant-numeric` directly, but iOS
// honours `fontVariant: ['tabular-nums']` on `<Text>` style; Android picks
// it up via the `fontFeatureSettings: 'tnum'` style. Web (NativeWind →
// HTML) goes through the actual CSS property.

type NumericProps = Omit<TextProps, 'children'> & {
  size?: BodySize;
  tone?: BodyTone;
  children: ReactNode;
  className?: string;
};

export function Numeric({
  size = 'base',
  tone = 'primary',
  children,
  className,
  style,
  ...rest
}: NumericProps) {
  return (
    <Text
      {...rest}
      style={[{ fontVariant: ['tabular-nums'] }, style]}
      className={[
        'font-body',
        BODY_SIZE_CLASS[size],
        BODY_TONE_CLASS[tone],
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Text>
  );
}
