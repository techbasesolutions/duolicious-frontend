/**
 * Reproduction of Dateasy reference image 6 — "It's a match!" scene.
 *
 * Single phone mockup composing:
 *  - 8-12 sticker shapes scattered around the canvas (heart, sparkle, blob,
 *    star, pent-star, flower, triangle, dot)
 *  - Two profile thumbnails overlapping by ~15% (top one offset right + +3°)
 *  - "It's a match!" big display Bold, dark text on lavender/lime pill bg
 *  - "You and Jessica liked each other" body text
 *  - Inline "Say hi" ChatInput
 *  - Close X at bottom
 */

import { Image as ExpoImage } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { Body, Heading } from '../../components/ui/typography';
import { StickerBadge } from '../../components/ui/sticker-badge';
import { PhoneFrame } from '../../components/ui/phone-frame';

export function Image6Match() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <PhoneFrame width={280} height={600} canvasColor="#3018A8">
        <View style={{ flex: 1, padding: 16 }}>
          {/* Confetti shapes positioned absolutely */}
          <Confetti />

          {/* Profile thumbnails — overlapping */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 96,
              gap: -20,
              zIndex: 5,
            }}
          >
            <ProfileThumb
              uri="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=70"
            />
            <View style={{ transform: [{ rotate: '4deg' }, { translateY: -8 }] }}>
              <ProfileThumb
                uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=70"
              />
            </View>
          </View>

          {/* "It's a match!" pill */}
          <View
            style={{
              alignSelf: 'center',
              marginTop: 24,
              backgroundColor: '#D7FF81',
              borderRadius: 14,
              paddingHorizontal: 16,
              paddingVertical: 8,
              transform: [{ rotate: '-3deg' }],
              zIndex: 5,
            }}
          >
            <Text
              style={{
                color: '#000000',
                fontSize: 22,
                fontFamily: 'PlusJakartaSans_700Bold',
              }}
            >
              It's a match!
            </Text>
          </View>

          <Body
            tone="secondary"
            style={{
              textAlign: 'center',
              marginTop: 12,
              color: '#FFF',
              opacity: 0.85,
              zIndex: 5,
            }}
          >
            You and Jessica liked each other.
          </Body>

          <View style={{ flex: 1 }} />

          {/* Inline ChatInput "Say hi" */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#1A1340',
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 10,
              zIndex: 5,
            }}
          >
            <Text style={{ color: '#7A7596', flex: 1, fontSize: 13 }}>Say hi 👋</Text>
            <Text style={{ color: '#D7FF81', fontSize: 16 }}>➤</Text>
          </View>

          {/* Close X */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={{
              alignSelf: 'center',
              marginTop: 12,
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center', justifyContent: 'center',
              zIndex: 5,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 18 }}>×</Text>
          </Pressable>
        </View>
      </PhoneFrame>
    </View>
  );
}

function ProfileThumb({ uri }: { uri: string }) {
  return (
    <View
      style={{
        width: 96,
        height: 124,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#0F0B1F',
        borderWidth: 3,
        borderColor: '#FFFFFF',
      }}
    >
      <ExpoImage source={{ uri }} contentFit="cover" style={{ flex: 1 }} />
    </View>
  );
}

function Confetti() {
  return (
    <>
      {/* Top-left heart */}
      <View style={{ position: 'absolute', top: 16, left: 24 }}>
        <StickerBadge variant="heart" size={36} rotation={-15} />
      </View>
      {/* Top-right sparkle */}
      <View style={{ position: 'absolute', top: 16, right: 32 }}>
        <StickerBadge variant="sparkle-4pt" size={36} rotation={20} />
      </View>
      {/* Top-mid pent-star */}
      <View style={{ position: 'absolute', top: 56, left: 96 }}>
        <StickerBadge variant="pent-star" size={28} rotation={10} />
      </View>
      {/* Mid-right triangle */}
      <View style={{ position: 'absolute', top: 80, right: 32 }}>
        <StickerBadge variant="triangle" size={22} rotation={-25} color="#FFD24A" />
      </View>
      {/* Mid-left blob */}
      <View style={{ position: 'absolute', top: 156, left: 16 }}>
        <StickerBadge variant="blob" size={56} rotation={20} />
      </View>
      {/* Bottom-mid quad-star */}
      <View style={{ position: 'absolute', bottom: 100, left: 16 }}>
        <StickerBadge variant="quad-star" size={32} rotation={5} />
      </View>
      {/* Bottom-right flower */}
      <View style={{ position: 'absolute', bottom: 136, right: 24 }}>
        <StickerBadge variant="flower" size={36} rotation={-10} />
      </View>
      {/* Mid-left dot */}
      <View style={{ position: 'absolute', top: 96, left: 88 }}>
        <StickerBadge variant="dot" size={14} />
      </View>
    </>
  );
}
