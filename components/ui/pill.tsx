/**
 * Phase 6 Task 6.1 — Pill + PillButton.
 *
 *   Pill         interactive tag chip (filter selection, interest selection,
 *                country pills). Toggleable via `selected`. Sm / md sizes.
 *   PillButton   the Dateasy primary CTA: full-width lime fill, dark text,
 *                pill-shaped corners. Used for "Continue" / "Apply filters" /
 *                "Confirm" CTAs across onboarding + filter sheets.
 *
 * Pill is split from Button because the visual treatment for "select me from
 * a row of options" diverges from CTAs enough to warrant its own atom (per
 * Phase 6 Task 6.1 plan note for `Pill`).
 */

import { Pressable, Text, ActivityIndicator } from 'react-native';
import type { PressableProps } from 'react-native';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Pill — toggleable chip
// ---------------------------------------------------------------------------

type PillSize = 'sm' | 'md';

// Per Dateasy UI kit (image 9 Tags panel): pills are rounded-RECT at radius
// ~14, NOT full-pill. Earlier `rounded-full` produced the wrong silhouette.
const PILL_SIZE: Record<PillSize, string> = {
  sm: 'h-8 px-3 rounded-md',     // radius 14 (md token)
  md: 'h-10 px-4 rounded-md',
};

const PILL_TEXT_SIZE: Record<PillSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

type PillProps = Omit<PressableProps, 'children' | 'style'> & {
  selected?: boolean;
  size?: PillSize;
  disabled?: boolean;
  children: ReactNode;
};

export function Pill({
  selected = false,
  size = 'md',
  disabled = false,
  children,
  ...rest
}: PillProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      {...rest}
      className={[
        'flex-row items-center justify-center self-start',
        PILL_SIZE[size],
        // Selected = lime fill with dark text; unselected = lavender outline
        // on dark canvas (per Dateasy image 9 tags panel: "Knitting" /
        // "Friendship" use lavender outline + lavender text).
        selected
          ? 'bg-lime-500 border border-lime-500'
          : 'bg-transparent border border-lavender-500',
        disabled ? 'opacity-40' : '',
      ].filter(Boolean).join(' ')}
    >
      <Text
        className={[
          'font-sans',
          PILL_TEXT_SIZE[size],
          // Per kit: selected = dark text on lime; unselected = lavender text
          selected ? 'text-black' : 'text-lavender-500',
        ].join(' ')}
      >
        {children}
      </Text>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// PillButton — primary CTA
// ---------------------------------------------------------------------------

type PillButtonSize = 'md' | 'lg';
type PillButtonVariant = 'primary' | 'secondary';

// Per Dateasy UI kit (image 9 + image 12 "Apply filters"): PillButton is
// rounded-RECT at radius 18 (lg token), NOT full-pill. Two variants visible
// in the kit: primary lime (commit/continue) and secondary lavender (apply).
const BTN_SIZE: Record<PillButtonSize, string> = {
  md: 'h-12 px-4 rounded-lg',     // radius 18
  lg: 'h-14 px-8 rounded-lg',
};

const BTN_VARIANT: Record<PillButtonVariant, string> = {
  primary:   'bg-lime-500 active:bg-lime-600',
  secondary: 'bg-lavender-500 active:bg-lavender-600',
};

const BTN_TEXT: Record<PillButtonSize, string> = {
  md: 'text-base',
  lg: 'text-lg',
};

type PillButtonProps = Omit<PressableProps, 'children'> & {
  size?: PillButtonSize;
  variant?: PillButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
};

export function PillButton({
  size = 'lg',
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  children,
  style,
  ...rest
}: PillButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={style}
      {...rest}
      className={[
        'flex-row items-center justify-center',
        BTN_VARIANT[variant],
        BTN_SIZE[size],
        fullWidth ? 'w-full' : 'self-start',
        isDisabled ? 'opacity-40' : '',
      ].filter(Boolean).join(' ')}
    >
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <Text className={['font-display text-black', BTN_TEXT[size]].join(' ')}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
