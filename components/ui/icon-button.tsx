/**
 * Phase 6 Task 6.1 — IconButton.
 *
 * Per Dateasy reference (image 9 UI kit Buttons panel + image 12 swipe
 * deck action row): circular icon buttons with five fill variants. The
 * canonical action-row trio (X / play / heart) under SwipeCard uses
 * sizes 48 / 64 / 48 with a 24px gap, colors lavender / lime / pink-red.
 *
 * Glyph slot accepts any ReactNode (text, FontAwesome icon, custom SVG).
 * For now consumers pass small Unicode glyphs; the Phosphor swap is
 * per-call-site, not per-atom.
 */

import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';
import type { ReactNode } from 'react';

type Variant =
  | 'filled-lime'
  | 'filled-lavender'
  | 'filled-pink'
  | 'filled-indigo'
  | 'outline-indigo'
  | 'ghost';

type Size = 32 | 40 | 48 | 64;

const VARIANT: Record<Variant, { bg: string; glyph: string }> = {
  'filled-lime':     { bg: 'bg-lime-500 active:bg-lime-600',         glyph: '#000000' },
  'filled-lavender': { bg: 'bg-lavender-500 active:bg-lavender-600', glyph: '#000000' },
  'filled-pink':     { bg: 'bg-pink-500 active:bg-pink-600',         glyph: '#FFFFFF' },
  'filled-indigo':   { bg: 'bg-indigo-500 active:bg-indigo-600',     glyph: '#FFFFFF' },
  'outline-indigo':  { bg: 'bg-transparent border border-indigo-500 active:bg-indigo-500/10', glyph: '#5524F5' },
  'ghost':           { bg: 'bg-transparent active:bg-bg-card',       glyph: '#FFFFFF' },
};

type Props = Omit<PressableProps, 'children' | 'style'> & {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  accessibilityLabel: string;     // required — every icon-only button needs it
  children?: ReactNode;            // glyph slot (text, icon component)
  glyphColorOverride?: string;
};

export function IconButton({
  variant = 'filled-lime',
  size = 48,
  disabled = false,
  accessibilityLabel,
  children,
  glyphColorOverride,
  ...rest
}: Props) {
  const v = VARIANT[variant];
  const glyphColor = glyphColorOverride ?? v.glyph;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={8}
      {...rest}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className={[
        'items-center justify-center',
        v.bg,
        disabled ? 'opacity-40' : '',
      ].filter(Boolean).join(' ')}
    >
      {/* If glyph is a string, render it as Text with the variant's color.
          If glyph is a ReactNode (e.g. FontAwesome <Icon />), render as-is. */}
      {typeof children === 'string' ? (
        <Text
          style={{
            color: glyphColor,
            fontSize: Math.round(size * 0.42),
            lineHeight: Math.round(size * 0.5),
            textAlign: 'center',
            fontWeight: '700',
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
