/**
 * Reproduction of Dateasy reference image 14 — marketing hero.
 *
 * Three-zone composition:
 *   LEFT  — huge lavender 4-point sparkle + super-large "ahavah" wordmark
 *   CENTER — phone mockup showing swipe deck (re-uses image-12 LEFT phone)
 *   RIGHT — "Find your match easy and fun" tagline with `easy` in lime
 *           pill + `fun` in lavender pill (or another accent)
 *   BOTTOM-LEFT body copy small
 */

import { Text, View } from 'react-native';

import { Body, Caption } from '../../components/ui/typography';
import { StickerBadge } from '../../components/ui/sticker-badge';
import { PhoneFrame } from '../../components/ui/phone-frame';

// Reuse the swipe-card composition from the image-12 reproduction.
// We keep this file self-contained though — quick re-implementation
// avoids import cycling for showcase use.
function HeroPhone() {
  return (
    <PhoneFrame width={240} height={500} canvasColor="#3018A8">
      <View style={{ flex: 1, alignItems: 'center', padding: 12 }}>
        <View
          style={{
            width: 200,
            height: 280,
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: '#FF8B5A',
            position: 'relative',
            marginTop: 20,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            marginTop: 16,
          }}
        >
          <View
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: '#BC96FF',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#000', fontWeight: '700' }}>×</Text>
          </View>
          <View
            style={{
              width: 44, height: 44, borderRadius: 22,
              backgroundColor: '#D7FF81',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#000', fontWeight: '700' }}>▶</Text>
          </View>
          <View
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: '#FF4566',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: '700' }}>♥</Text>
          </View>
        </View>
      </View>
    </PhoneFrame>
  );
}

export function Image14MarketingHero() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 20,
        padding: 16,
      }}
    >
      {/* LEFT — sparkle + huge wordmark */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <StickerBadge variant="sparkle-4pt" size={120} color="#BC96FF" />
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 96,
            fontFamily: 'PlusJakartaSans_700Bold',
            letterSpacing: -3,
            lineHeight: 100,
          }}
        >
          ahavah
        </Text>
      </View>

      {/* CENTER — phone */}
      <HeroPhone />

      {/* RIGHT — tagline */}
      <View style={{ alignItems: 'flex-start', gap: 8, maxWidth: 200 }}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 28,
            fontFamily: 'PlusJakartaSans_700Bold',
            lineHeight: 32,
          }}
        >
          Find your{'\n'}match
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <View
            style={{
              backgroundColor: '#D7FF81',
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: '#000', fontSize: 22, fontFamily: 'PlusJakartaSans_700Bold' }}>easy</Text>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: 22, fontFamily: 'PlusJakartaSans_700Bold' }}>
            and
          </Text>
          <View
            style={{
              backgroundColor: '#BC96FF',
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 6,
            }}
          >
            <Text style={{ color: '#000', fontSize: 22, fontFamily: 'PlusJakartaSans_700Bold' }}>fun</Text>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Caption>UI/UX design · Dating app</Caption>
          <Caption>Mobile app design · 2026</Caption>
        </View>
      </View>
    </View>
  );
}
