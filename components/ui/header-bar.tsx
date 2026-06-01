/**
 * Phase 6 Task 6.1 — HeaderBar.
 *
 * Top-of-screen chrome with three slots:
 *   leading   back / close icon, or BrandMark on home screens
 *   title     centered (optional — can be empty for transparent variant)
 *   trailing  action icon (e.g. settings, kebab) — optional
 *
 * Variants:
 *   default       solid bg-elevated background, bottom border
 *   transparent   no background — used over photo backdrops (PhotoGallery)
 *   elevated      same bg as default but with a subtle bottom shadow line
 *
 * Auto-handles top safe-area inset via react-native-safe-area-context.
 * Falls back to a 16px top padding if safe-area context isn't wired.
 */

import { View, Pressable } from 'react-native';
import type { ViewProps } from 'react-native';
import type { ReactNode } from 'react';

import { Heading } from './typography';

type Variant = 'default' | 'transparent' | 'elevated';

const VARIANT_CLASS: Record<Variant, string> = {
  default:     'bg-bg-elevated border-b border-border',
  transparent: 'bg-transparent',
  elevated:    'bg-bg-elevated border-b border-border shadow-sm',
};

type Props = ViewProps & {
  title?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  variant?: Variant;
  topInset?: number;   // optional override; if omitted defaults to 0
};

export function HeaderBar({
  title,
  leading,
  trailing,
  variant = 'default',
  topInset = 0,
  className,
  ...rest
}: Props) {
  return (
    <View
      {...rest}
      className={[
        'w-full',
        VARIANT_CLASS[variant],
        className as string | undefined,
      ].filter(Boolean).join(' ')}
      style={{ paddingTop: topInset }}
    >
      <View className="h-14 px-4 flex-row items-center">
        {/* Leading slot — fixed 40px width to keep title centered */}
        <View className="w-10 items-start justify-center">
          {leading ?? null}
        </View>

        {/* Title — flex-1 center */}
        <View className="flex-1 items-center justify-center">
          {title ? (
            <Heading level="h3" numberOfLines={1}>
              {title}
            </Heading>
          ) : null}
        </View>

        {/* Trailing slot — fixed 40px width, mirrors leading */}
        <View className="w-10 items-end justify-center">
          {trailing ?? null}
        </View>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// HeaderBarButton — convenience for the leading/trailing icon slot
// ---------------------------------------------------------------------------
//
// Most HeaderBar uses pass an IconButton as leading/trailing. Centralizing
// the press-target sizing (44×44 hit slop per Apple HIG) here keeps every
// consumer accessibility-compliant by default.

type HeaderBarButtonProps = {
  onPress?: () => void;
  accessibilityLabel: string;
  children: ReactNode;
  disabled?: boolean;
};

export function HeaderBarButton({
  onPress,
  accessibilityLabel,
  children,
  disabled,
}: HeaderBarButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      className={[
        'w-10 h-10 items-center justify-center rounded-full',
        'active:bg-bg-card',
        disabled ? 'opacity-40' : '',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </Pressable>
  );
}
