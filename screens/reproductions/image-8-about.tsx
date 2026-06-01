/**
 * Reproduction of Dateasy reference image 8 — about/hero composition.
 *
 * Editorial layout for the about page:
 *  - Hero text with embedded sticker shapes between words
 *  - Body copy paragraph
 *  - 4-column interest tag grid at the bottom (all lime fill)
 */

import { Text, View } from 'react-native';

import { Body, Caption } from '../../components/ui/typography';
import { Pill } from '../../components/ui/pill';
import { StickerBadge } from '../../components/ui/sticker-badge';

export function Image8About() {
  return (
    <View style={{ padding: 16, gap: 24 }}>
      {/* Hero text with inline stickers */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <Hero>Ahavah is a</Hero>
        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ position: 'absolute', zIndex: 0 }}>
            <StickerBadge variant="pentagon" size={68} color="#BC96FF" rotation={-15} />
          </View>
          <Hero style={{ zIndex: 5 }}>dating</Hero>
        </View>
        <Hero>app design concept that represents the idea of a comfortable and joyful search for communication, love,</Hero>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <StickerBadge variant="sparkle-4pt" size={36} color="#BC96FF" rotation={20} />
        </View>
        <Hero>or friendship.</Hero>
      </View>

      {/* Body copy */}
      <View style={{ gap: 12 }}>
        <Body tone="secondary" style={{ maxWidth: 520 }}>
          The app helps in finding individuals with similar interests, facilitated
          by a compatibility percentage feature.
        </Body>
        <Body tone="secondary" style={{ maxWidth: 520 }}>
          Our aim was to foster a sense of effortless and engaging connection
          between like-minded individuals.
        </Body>
      </View>

      {/* Interest tag grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {['Cooking','Art','Development','Guitar','Piano','Board games','Anime','Gaming']
          .map((label) => (
            <Pill key={label} selected size="sm">{label}</Pill>
          ))}
      </View>
    </View>
  );
}

function Hero({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <Text
      style={[{
        color: '#FFFFFF',
        fontSize: 28,
        lineHeight: 36,
        fontFamily: 'PlusJakartaSans_700Bold',
        letterSpacing: -0.5,
      }, style]}
    >
      {children}
    </Text>
  );
}
