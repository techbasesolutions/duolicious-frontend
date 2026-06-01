/**
 * Phase 6 Task 6.1 — StoryRing.
 *
 * Avatar + conditional ring (`unread` lime→lavender gradient, `online`
 * solid lime, `none` no ring). Used in chat-list stories row (image 3).
 * Stories themselves are post-launch (Phase 7); pre-launch the ring still
 * functions as a visual treatment for new-match avatars.
 */

import { View } from 'react-native';

import { Avatar } from './avatar';

type Variant = 'none' | 'unread' | 'online';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const PADDING: Record<Size, number> = { xs: 2, sm: 2, md: 3, lg: 4, xl: 5 };
const SIZE_PX: Record<Size, number> = { xs: 24, sm: 32, md: 48, lg: 64, xl: 96 };

type Props = {
  uri?: string | null;
  fallback?: string;
  size?: Size;
  variant?: Variant;
  blurhash?: string;
};

export function StoryRing({
  uri, fallback, size = 'md', variant = 'none', blurhash,
}: Props) {
  const innerSize = SIZE_PX[size];
  const ringPad = PADDING[size];
  const outerSize = innerSize + ringPad * 2 + (variant === 'none' ? 0 : 4);

  const ringColor =
    variant === 'unread'  ? '#D7FF81' :    // lime (gradient simplified to solid until expo-linear-gradient added)
    variant === 'online'  ? '#9FE870' :    // success-lime solid
    'transparent';

  return (
    <View
      style={{
        width: outerSize,
        height: outerSize,
        borderRadius: outerSize / 2,
        borderWidth: variant === 'none' ? 0 : 2,
        borderColor: ringColor,
        padding: variant === 'none' ? 0 : ringPad,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar uri={uri} fallback={fallback} size={size} blurhash={blurhash} />
    </View>
  );
}
