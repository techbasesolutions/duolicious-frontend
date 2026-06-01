/**
 * Reproduction of Dateasy reference image 12 — swipe deck + filters drawer.
 *
 * Two phone mockups side-by-side:
 *   LEFT  — main page (BrandMark + own-avatar dot, SwipeCard with caption,
 *           action-row trio X/play/heart, BottomNavBar)
 *   RIGHT — filters drawer (Sheet header, Looking-for pills, Show-me
 *           segmented, age range, distance slider, Apply filters CTA)
 */

import { Image as ExpoImage } from 'expo-image';
import { View } from 'react-native';

import { BrandMark } from '../../components/ui/brand-mark';
import { Body, Caption, Heading } from '../../components/ui/typography';
import { Pill, PillButton } from '../../components/ui/pill';
import { IconButton } from '../../components/ui/icon-button';
import { CompatibilityPill } from '../../components/ui/compatibility-pill';
import { Avatar } from '../../components/ui/avatar';
import { BottomNavBar, DEFAULT_NAV_TABS } from '../../components/ui/bottom-nav-bar';
import { SegmentedControl } from '../../components/ui/segmented-control';
import { Slider, RangeSlider } from '../../components/ui/slider';
import { PhoneFrame } from '../../components/ui/phone-frame';

export function Image12SwipeAndFilters() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}
    >
      <SwipeDeckPhone />
      <FiltersDrawerPhone />
    </View>
  );
}

function SwipeDeckPhone() {
  return (
    <PhoneFrame width={280} height={600} canvasColor="#3018A8">
      {/* Top chrome — BrandMark left, own-avatar right */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <BrandMark mode="full" size="sm" />
        <View style={{ width: 28, height: 28 }}>
          <Avatar size="sm" fallback="JM" />
          <View
            style={{
              position: 'absolute', top: -2, right: -2,
              width: 10, height: 10, borderRadius: 5,
              backgroundColor: '#D7FF81', borderWidth: 2, borderColor: '#3018A8',
            }}
          />
        </View>
      </View>

      {/* Card */}
      <View style={{ alignItems: 'center', flex: 1, paddingTop: 8 }}>
        <View
          style={{
            width: 232,
            height: 326,
            borderRadius: 18,
            overflow: 'hidden',
            backgroundColor: '#0F0B1F',
            position: 'relative',
          }}
        >
          {/* Photo placeholder gradient (until real images go in) */}
          <View
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: '#FF8B5A', // warm portrait tone
            }}
          />
          <ExpoImage
            source={{ uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80' }}
            style={{ position: 'absolute', inset: 0 }}
            contentFit="cover"
          />
          {/* Compatibility pill top-right */}
          <View style={{ position: 'absolute', top: 12, right: 12 }}>
            <CompatibilityPill score={94} size="sm" />
          </View>
          {/* Bottom caption with gradient */}
          <View
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 12,
              backgroundColor: 'rgba(0,0,0,0.45)',
            }}
          >
            <Body style={{ color: '#FFF', fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16 }}>
              Jessica Maple, 25
            </Body>
            <Caption style={{ color: '#FFF', opacity: 0.85, marginTop: 2 }}>📍 3 km away</Caption>
          </View>
        </View>

        {/* Action row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 16 }}>
          <IconButton variant="filled-lavender" size={40} accessibilityLabel="Pass">×</IconButton>
          <IconButton variant="filled-lime"     size={48} accessibilityLabel="Play">▶</IconButton>
          <IconButton variant="filled-pink"     size={40} accessibilityLabel="Like">♥</IconButton>
        </View>
      </View>

      {/* Bottom nav floating */}
      <View style={{ paddingBottom: 8 }}>
        <View style={{ alignSelf: 'center' }}>
          <BottomNavBar
            tabs={DEFAULT_NAV_TABS}
            activeKey="discover"
            onTabPress={() => {}}
          />
        </View>
      </View>
    </PhoneFrame>
  );
}

function FiltersDrawerPhone() {
  return (
    <PhoneFrame width={280} height={600} canvasColor="#3018A8">
      <View style={{ padding: 16, gap: 16, flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <BrandMark mode="full" size="sm" />
          <View style={{ flex: 1 }} />
          <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
            <Caption style={{ color: '#FFF', fontSize: 14 }}>Skip</Caption>
          </View>
        </View>

        <Heading level="h2">Filters</Heading>

        <View style={{ gap: 8 }}>
          <Caption>Looking for:</Caption>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            <Pill selected size="sm">Relationship</Pill>
            <Pill size="sm">Friendship</Pill>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Caption>Show me:</Caption>
          <SegmentedControl<'men' | 'women' | 'all'>
            options={[
              { key: 'men',   label: 'Men' },
              { key: 'women', label: 'Women' },
              { key: 'all',   label: 'All' },
            ]}
            value="women"
            onChange={() => {}}
          />
        </View>

        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Caption>Preferred age</Caption>
            <Caption style={{ color: '#FFF' }}>18-23</Caption>
          </View>
          <RangeSlider min={18} max={60} value={[18, 23]} onChange={() => {}} />
        </View>

        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Caption>Preferred distance</Caption>
            <Caption style={{ color: '#FFF' }}>1 km</Caption>
          </View>
          <Slider min={1} max={500} value={1} onChange={() => {}} />
        </View>

        <View style={{ flex: 1 }} />

        <PillButton variant="secondary" onPress={() => {}}>Apply filters</PillButton>
      </View>
    </PhoneFrame>
  );
}
