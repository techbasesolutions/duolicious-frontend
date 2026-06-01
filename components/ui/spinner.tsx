/**
 * Phase 6 Task 6.1 — Spinner.
 *
 * Lime by default; indigo for inverse contexts (e.g. on a lime button).
 * Wraps RN ActivityIndicator with size mapping + color tokens.
 */

import { ActivityIndicator } from 'react-native';

type Size = 'sm' | 'md' | 'lg';
type Tone = 'lime' | 'lavender' | 'indigo' | 'inverse';

const SIZE: Record<Size, number> = { sm: 16, md: 24, lg: 36 };
const COLOR: Record<Tone, string> = {
  lime:     '#D7FF81',
  lavender: '#BC96FF',
  indigo:   '#5524F5',
  inverse:  '#000000',
};

type Props = { size?: Size; tone?: Tone };

export function Spinner({ size = 'md', tone = 'lime' }: Props) {
  // RN ActivityIndicator only accepts 'small' | 'large' on iOS, ignored
  // size in dp on Android. Render the proper RN size + use color token.
  return (
    <ActivityIndicator
      size={size === 'lg' ? 'large' : 'small'}
      color={COLOR[tone]}
      style={{ width: SIZE[size], height: SIZE[size] }}
      accessibilityLabel="Loading"
    />
  );
}
