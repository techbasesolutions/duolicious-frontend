/**
 * Phase 6 Task 6.2 A6 — Onboarding intro (3-slide carousel).
 *
 * Per plan: "3-slide swipeable carousel selling the value prop (international
 * / verified / translated). Skip CTA at top-right."
 *
 * Composes: BrandMark, Heading, Body, ProgressDots, PillButton, StickerBadge.
 */

import { useState } from 'react';
import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '../../components/ui/brand-mark';
import { Body, Caption, Heading } from '../../components/ui/typography';
import { PillButton } from '../../components/ui/pill';
import { ProgressDots } from '../../components/ui/progress';
import { StickerBadge, type StickerVariant } from '../../components/ui/sticker-badge';

type Slide = {
  sticker: StickerVariant;
  stickerColor?: string;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    sticker: 'sparkle-4pt',
    stickerColor: '#D7FF81',
    title: 'Match without borders',
    body:  'People from anywhere, in any language.',
  },
  {
    sticker: 'circle-large',
    stickerColor: '#BC96FF',
    title: 'Built for trust',
    body:  'Verified profiles. Anti-scam protection.',
  },
  {
    sticker: 'flower',
    stickerColor: '#BC96FF',
    title: 'Translated for you',
    body:  'Chat in your language. We translate in real time.',
  },
];

type Props = {
  onSkip?: () => void;
  onComplete?: () => void;
};

export function OnboardingIntroCarousel({ onSkip, onComplete }: Props) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const handleScroll = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / width);
    if (next !== index) setIndex(next);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      {/* Top bar: brand mark + skip */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 12,
        }}
      >
        <BrandMark mode="full" size="sm" />
        <Pressable
          onPress={onSkip}
          accessibilityRole="button"
          accessibilityLabel="Skip"
          hitSlop={8}
        >
          <Caption style={{ color: '#B5B0CC', fontSize: 14 }}>Skip</Caption>
        </Pressable>
      </View>

      {/* Slides */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {SLIDES.map((slide, i) => (
          <View
            key={i}
            style={{
              width,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 32,
              gap: 24,
            }}
          >
            <View
              style={{
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: '#0F0B1F',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StickerBadge
                variant={slide.sticker}
                size={96}
                color={slide.stickerColor}
              />
            </View>
            <Heading level="h1" style={{ textAlign: 'center', maxWidth: 320 }}>
              {slide.title}
            </Heading>
            <Body tone="secondary" style={{ textAlign: 'center', maxWidth: 320 }}>
              {slide.body}
            </Body>
          </View>
        ))}
      </ScrollView>

      {/* Bottom: dots + CTA */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 24, gap: 24 }}>
        <ProgressDots total={SLIDES.length} current={index} />
        <PillButton
          onPress={index < SLIDES.length - 1 ? () => setIndex(index + 1) : onComplete}
        >
          {index < SLIDES.length - 1 ? 'Next' : 'Get started'}
        </PillButton>
      </View>
    </SafeAreaView>
  );
}
