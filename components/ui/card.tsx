/**
 * Phase 6 Task 6.1 — Card.
 *
 * Three variants:
 *   flat       bg-card, no border, no shadow — the default content surface
 *   elevated   bg-card + border + subtle elevation — for "this is a discrete
 *              chunk of data" feel (filter sheet rows, settings groups)
 *   gradient   used for paywall + premium upsell surfaces
 *
 * Padding default is 16 (p-4); pass `padding="none"` for media-edge-to-edge
 * cards (e.g. SwipeCard wraps the photo without inner padding).
 */

import { View } from 'react-native';
import type { ViewProps } from 'react-native';
import type { ReactNode } from 'react';

type Variant = 'flat' | 'elevated' | 'gradient';
type Padding = 'none' | 'sm' | 'md' | 'lg';

// Per Dateasy reference (image 8 hero card stack + image 3 chat-list rows):
// cards use radius 24 (2xl token = 24 in our scale), NOT 16. The earlier
// `rounded-2xl` mapped to 16 in the default Tailwind preset; we now own the
// scale and 2xl = 24.
const VARIANT_CLASS: Record<Variant, string> = {
  flat:     'bg-bg-card rounded-2xl',
  elevated: 'bg-bg-card rounded-2xl border border-border',
  // For now gradient = solid lavender; Phase D Task D.6 swap to a real
  // expo-linear-gradient backing for indigo→lavender premium surfaces.
  gradient: 'bg-lavender-500 rounded-2xl',
};

const PAD_CLASS: Record<Padding, string> = {
  none: '',
  sm:   'p-3',
  md:   'p-4',
  lg:   'p-6',
};

type Props = ViewProps & {
  variant?: Variant;
  padding?: Padding;
  children?: ReactNode;
};

export function Card({
  variant = 'flat',
  padding = 'md',
  children,
  className,
  ...rest
}: Props) {
  return (
    <View
      {...rest}
      className={[
        VARIANT_CLASS[variant],
        PAD_CLASS[padding],
        className as string | undefined,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </View>
  );
}
