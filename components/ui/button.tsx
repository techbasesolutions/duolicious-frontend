/**
 * Ahavah Button atom — minimal Task 0.9 smoke implementation.
 *
 * Variants and sizes are deliberately limited to what the welcome screen
 * needs for the smoke gate. Phase 6 Task 6.1 replaces this with the full
 * react-native-reusables-derived Button featuring all Dateasy variants
 * (lime / lavender / outline / destructive / ghost + sm/md/lg/pill/icon
 * sizes), pressed states, focus rings, etc.
 */

import { Pressable, Text, View, ActivityIndicator } from 'react-native';
import type { PressableProps } from 'react-native';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'md' | 'lg' | 'pill';

const variantClasses: Record<Variant, string> = {
  primary:    'bg-lime-500 active:bg-lime-600',
  secondary:  'bg-lavender-500 active:bg-lavender-600',
  outline:    'bg-transparent border border-indigo-500 active:bg-indigo-500/10',
  ghost:      'bg-transparent active:bg-bg-elevated',
};

const variantTextClasses: Record<Variant, string> = {
  primary:    'text-text-primary',  // dark text on lime
  secondary:  'text-text-primary',  // dark text on lavender
  outline:    'text-text-primary',
  ghost:      'text-text-primary',
};

const sizeClasses: Record<Size, string> = {
  md:   'h-11 px-6 rounded-md',
  lg:   'h-14 px-8 rounded-lg',
  pill: 'h-12 px-8 rounded-pill',
};

type Props = Omit<PressableProps, 'children' | 'style'> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'pill',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      className={[
        'flex-row items-center justify-center',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-40' : '',
      ].filter(Boolean).join(' ')}
    >
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <Text
          className={[
            'font-display text-base',
            variant === 'primary' ? 'text-black' : variantTextClasses[variant],
          ].join(' ')}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
