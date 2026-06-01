/**
 * Phase 6 Task 6.1 — Skeleton.
 *
 * Pulsing placeholder rectangles that match the bones of the destination
 * atom. Six pre-composed layouts per docs/design-system.md:
 *   chat-list-row / swipe-card / profile-detail / chat-message / settings-row / paywall-card
 *
 * Each layout matches the actual component's dimensions so the load →
 * loaded transition doesn't shift any element.
 */

import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import type { ViewStyle } from 'react-native';

export function SkeletonBlock({ style }: { style?: ViewStyle }) {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderRadius: 8,
          opacity,
        },
        style,
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Pre-composed layouts
// ---------------------------------------------------------------------------

export function SkeletonChatListRow() {
  return (
    <View style={{ flexDirection: 'row', gap: 12, padding: 12 }}>
      <SkeletonBlock style={{ width: 48, height: 48, borderRadius: 24 }} />
      <View style={{ flex: 1, gap: 8 }}>
        <SkeletonBlock style={{ width: '60%', height: 14 }} />
        <SkeletonBlock style={{ width: '90%', height: 12 }} />
      </View>
    </View>
  );
}

export function SkeletonSwipeCard({ width = 360, height = 504 }: { width?: number; height?: number }) {
  return <SkeletonBlock style={{ width, height, borderRadius: 24 }} />;
}

export function SkeletonProfileDetail() {
  return (
    <View style={{ gap: 12 }}>
      <SkeletonBlock style={{ width: '100%', height: 360, borderRadius: 24 }} />
      <SkeletonBlock style={{ width: '60%', height: 24 }} />
      <SkeletonBlock style={{ width: '40%', height: 14 }} />
      <SkeletonBlock style={{ width: '100%', height: 80 }} />
    </View>
  );
}

export function SkeletonChatMessage({ side = 'them' }: { side?: 'me' | 'them' }) {
  return (
    <View
      style={{
        alignSelf: side === 'me' ? 'flex-end' : 'flex-start',
        marginVertical: 4,
        paddingHorizontal: 12,
      }}
    >
      <SkeletonBlock style={{ width: 180, height: 36, borderRadius: 18 }} />
    </View>
  );
}

export function SkeletonSettingsRow() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12 }}>
      <SkeletonBlock style={{ width: 24, height: 24, borderRadius: 6 }} />
      <SkeletonBlock style={{ flex: 1, height: 14 }} />
      <SkeletonBlock style={{ width: 16, height: 16, borderRadius: 8 }} />
    </View>
  );
}

export function SkeletonPaywallCard() {
  return (
    <View style={{ padding: 16, gap: 8, backgroundColor: '#1A1340', borderRadius: 24 }}>
      <SkeletonBlock style={{ width: '50%', height: 18 }} />
      <SkeletonBlock style={{ width: '80%', height: 12 }} />
      <SkeletonBlock style={{ width: '90%', height: 12 }} />
      <SkeletonBlock style={{ width: '90%', height: 12 }} />
      <SkeletonBlock style={{ width: '40%', height: 32, borderRadius: 16, marginTop: 8 }} />
    </View>
  );
}
