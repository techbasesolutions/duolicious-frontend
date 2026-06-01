/**
 * Phase 6 Task 6.1 — Avatar.
 *
 * 5 sizes: xs 24 / sm 32 / md 48 / lg 64 / xl 96.
 * Uses expo-image for caching + AVIF/WebP support + blurhash placeholder
 * (per docs/asset-pipeline.md). Fallback to initials disc when no uri.
 */

import { Image } from 'expo-image';
import { Text, View } from 'react-native';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_PX: Record<Size, number> = { xs: 24, sm: 32, md: 48, lg: 64, xl: 96 };
const FONT_PX: Record<Size, number> = { xs: 10, sm: 12, md: 18, lg: 24, xl: 36 };

type Props = {
  uri?: string | null;
  fallback?: string;     // initials, e.g. "JM"
  size?: Size;
  blurhash?: string;
};

export function Avatar({ uri, fallback = '?', size = 'md', blurhash }: Props) {
  const px = SIZE_PX[size];

  if (uri) {
    return (
      <Image
        source={{ uri }}
        placeholder={blurhash ? { blurhash } : undefined}
        cachePolicy="memory-disk"
        contentFit="cover"
        style={{
          width: px,
          height: px,
          borderRadius: px / 2,
        }}
        accessibilityLabel="Avatar"
      />
    );
  }

  // Fallback: indigo disc with initials
  return (
    <View
      style={{
        width: px,
        height: px,
        borderRadius: px / 2,
        backgroundColor: '#1A1340',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      accessibilityLabel="Avatar fallback"
    >
      <Text
        style={{
          color: '#D7FF81',
          fontSize: FONT_PX[size],
          fontFamily: 'PlusJakartaSans_700Bold',
        }}
      >
        {fallback.slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}
