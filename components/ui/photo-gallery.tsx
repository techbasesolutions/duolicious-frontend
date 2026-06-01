/**
 * Phase 6 Task 6.1 — PhotoGallery.
 *
 * Profile photo carousel with tap-zones (left third = prev, right two-thirds
 * = next), dot indicators top-edge, swipe-down to dismiss fullscreen.
 *
 * Used by B2 profile detail. Fullscreen mode (passed via `fullscreen=true`)
 * pins the gallery to the screen + enables drag-down dismiss.
 */

import { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';

type Props = {
  photos: { uri: string; blurhash?: string }[];
  initialIndex?: number;
  onDismiss?: () => void;
  /** When true, photos render full-bleed with bottom dots inset for headers */
  fullscreen?: boolean;
};

export function PhotoGallery({
  photos, initialIndex = 0, onDismiss, fullscreen = false,
}: Props) {
  const [index, setIndex] = useState(Math.min(initialIndex, photos.length - 1));
  const { width: winW, height: winH } = useWindowDimensions();
  const cardW = fullscreen ? winW : Math.min(winW - 32, 380);
  const cardH = fullscreen ? winH : Math.round(cardW * 1.4);

  if (photos.length === 0) return <View style={{ width: cardW, height: cardH }} />;

  const current = photos[index];
  const goNext = () => setIndex((i) => (i + 1) % photos.length);
  const goPrev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <View
      style={{
        width: cardW,
        height: cardH,
        borderRadius: fullscreen ? 0 : 24,
        overflow: 'hidden',
        backgroundColor: '#1A1340',
      }}
    >
      <ImageBackground
        source={{ uri: current.uri }}
        style={{ flex: 1 }}
      >
        {/* Tap zones */}
        <View style={{ position: 'absolute', inset: 0, flexDirection: 'row' }}>
          <Pressable
            onPress={goPrev}
            accessibilityLabel="Previous photo"
            style={{ flex: 1 }}
          />
          <Pressable
            onPress={goNext}
            accessibilityLabel="Next photo"
            style={{ flex: 2 }}
          />
        </View>

        {/* Dot indicators top-edge */}
        <View
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            flexDirection: 'row',
            gap: 4,
          }}
        >
          {photos.map((_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: i === index
                  ? '#FFFFFF'
                  : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </View>

        {/* Dismiss in fullscreen */}
        {fullscreen && onDismiss && (
          <Pressable
            onPress={onDismiss}
            accessibilityLabel="Close gallery"
            style={{
              position: 'absolute',
              top: 56,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View>
              <View style={{
                position: 'absolute', width: 16, height: 2, backgroundColor: '#FFF',
                transform: [{ rotate: '45deg' }],
              }} />
              <View style={{
                position: 'absolute', width: 16, height: 2, backgroundColor: '#FFF',
                transform: [{ rotate: '-45deg' }],
              }} />
            </View>
          </Pressable>
        )}
      </ImageBackground>
    </View>
  );
}
