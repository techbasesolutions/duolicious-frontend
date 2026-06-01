/**
 * Phase D Task D.2 + Phase 6 Task 6.2 — design system + kit reproductions.
 *
 * Two tabs:
 *   Reproductions  — full screen-sized reconstructions of the Dateasy kit
 *                    images. Default tab. Open d:/Antigravity/docs/specs/
 *                    look-and-feel/ side-by-side and judge fidelity.
 *   Atoms          — every atom in every variant + state. Engineering
 *                    reference; used during atom development.
 *
 * Reachable at http://localhost:8081/design-system.
 */

import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Body, Caption, Heading, Numeric } from '../components/ui/typography';
import { InScreenTabs } from '../components/ui/in-screen-tabs';

// Reproduction sub-screens (Phase 6 Task 6.2)
import { Image9UiKit }            from './reproductions/image-9-ui-kit';
import { Image12SwipeAndFilters } from './reproductions/image-12-swipe-and-filters';
import { Image3Chat }             from './reproductions/image-3-chat';
import { Image6Match }            from './reproductions/image-6-match';
import { Image14MarketingHero }   from './reproductions/image-14-marketing-hero';
import { Image8About }            from './reproductions/image-8-about';

// Atom imports (kept for the secondary tab)
import { BrandMark } from '../components/ui/brand-mark';
import { Pill, PillButton } from '../components/ui/pill';
import { IconButton } from '../components/ui/icon-button';
import { VerifiedBadge } from '../components/ui/verified-badge';
import { Card } from '../components/ui/card';
import { EmptyState } from '../components/ui/empty-state';
import { HeaderBar, HeaderBarButton } from '../components/ui/header-bar';
import { BottomNavBar, DEFAULT_NAV_TABS } from '../components/ui/bottom-nav-bar';
import { StickerBadge, type StickerVariant } from '../components/ui/sticker-badge';
import { TextInput, Textarea } from '../components/ui/text-input';
import { PasswordInput } from '../components/ui/password-input';
import { SearchInput } from '../components/ui/search-input';
import { PhoneInput } from '../components/ui/phone-input';
import { CodeInput } from '../components/ui/code-input';
import { SegmentedControl } from '../components/ui/segmented-control';
import { Switch } from '../components/ui/switch';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup } from '../components/ui/radio-group';
import { RadioStepper } from '../components/ui/radio-stepper';
import { Select } from '../components/ui/select';
import { Slider, RangeSlider } from '../components/ui/slider';
import { Avatar } from '../components/ui/avatar';
import { StoryRing } from '../components/ui/story-ring';
import { CompatibilityPill } from '../components/ui/compatibility-pill';
import { CountryFlag } from '../components/ui/country-flag';
import { Spinner } from '../components/ui/spinner';
import { ProgressBar, ProgressDots } from '../components/ui/progress';
import { Banner } from '../components/ui/banner';
import { showToast } from '../components/ui/toast';

const ALL_STICKERS: StickerVariant[] = [
  'sparkle-4pt', 'heart', 'quad-star', 'pent-star', 'flower', 'blob',
  'triangle', 'wavy', 'dot', 'circle-large', 'pentagon', 'cross-target',
];

type Tab = 'reproductions' | 'atoms';

export function DesignSystemShowcase() {
  const [tab, setTab] = useState<Tab>('reproductions');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      {/* Top bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <Heading level="h1">Design System</Heading>
        <Body tone="secondary" style={{ marginTop: 4 }}>
          Side-by-side with d:/Antigravity/docs/specs/look-and-feel/ to judge fidelity.
        </Body>
      </View>

      <InScreenTabs<Tab>
        tabs={[
          { key: 'reproductions', label: 'Reproductions' },
          { key: 'atoms',         label: 'Atoms' },
        ]}
        activeKey={tab}
        onChange={setTab}
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
        style={{ flex: 1 }}
      >
        {tab === 'reproductions' ? <Reproductions /> : <Atoms />}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Reproductions tab
// ---------------------------------------------------------------------------

function Reproductions() {
  return (
    <View style={{ gap: 32 }}>
      <Repro
        imageNumber={9}
        title="UI kit"
        sourceImage="523365…"
      >
        <Image9UiKit />
      </Repro>

      <Repro
        imageNumber={12}
        title="Swipe deck + Filters drawer"
        sourceImage="85a576…"
      >
        <Image12SwipeAndFilters />
      </Repro>

      <Repro
        imageNumber={3}
        title="Chat module"
        sourceImage="23a18a…"
      >
        <Image3Chat />
      </Repro>

      <Repro
        imageNumber={6}
        title="Match scene"
        sourceImage="41958b…"
      >
        <Image6Match />
      </Repro>

      <Repro
        imageNumber={14}
        title="Marketing hero"
        sourceImage="c8ce3e…"
      >
        <Image14MarketingHero />
      </Repro>

      <Repro
        imageNumber={8}
        title="About / hero with interest pills"
        sourceImage="4c75b8…"
      >
        <Image8About />
      </Repro>
    </View>
  );
}

function Repro({
  imageNumber, title, sourceImage, children,
}: { imageNumber: number; title: string; sourceImage: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
        <Numeric tone="secondary" size="lg">#{imageNumber}</Numeric>
        <Heading level="h2">{title}</Heading>
      </View>
      <Caption>Source: docs/specs/look-and-feel/{sourceImage}</Caption>
      <View
        style={{
          backgroundColor: '#000000',
          borderRadius: 24,
          padding: 16,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        {children}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Atoms tab — engineering reference
// ---------------------------------------------------------------------------

function Atoms() {
  const [seg, setSeg] = useState<'men' | 'women' | 'all'>('women');
  const [sw, setSw]   = useState(true);
  const [chk, setChk] = useState(false);
  const [radio, setRadio] = useState<string | null>('long_term');
  const [stepper, setStepper] = useState<number | null>(2);
  const [select, setSelect] = useState<string | null>('en');
  const [slider, setSlider] = useState(25);
  const [range, setRange] = useState<[number, number]>([20, 32]);

  return (
    <View style={{ gap: 32 }}>
      <Section title="Typography">
        <Heading level="h1">Heading h1</Heading>
        <Heading level="h2">Heading h2</Heading>
        <Heading level="h3">Heading h3</Heading>
        <Body>Body base — paragraph default</Body>
        <Body size="sm" tone="secondary">Body sm secondary</Body>
        <Caption>Caption · 2 km away · 5 min ago</Caption>
        <Numeric>27 · 94% · $14.99</Numeric>
      </Section>

      <Section title="Brand mark + sticker library">
        <Row>
          <BrandMark mode="full" size="md" />
        </Row>
        <Row gap={8}>
          {ALL_STICKERS.map((variant) => (
            <View key={variant} style={{ alignItems: 'center', width: 60 }}>
              <StickerBadge variant={variant} size={40} />
              <Caption style={{ textAlign: 'center', marginTop: 4 }}>{variant}</Caption>
            </View>
          ))}
        </Row>
      </Section>

      <Section title="Buttons + pills">
        <Row>
          <Pill selected>Cooking</Pill>
          <Pill>Knitting</Pill>
        </Row>
        <PillButton variant="primary">Sign Up or Sign In</PillButton>
        <PillButton variant="secondary">Apply filters</PillButton>
        <Row gap={20}>
          <IconButton variant="filled-lavender" size={40} accessibilityLabel="Pass">×</IconButton>
          <IconButton variant="filled-lime"     size={64} accessibilityLabel="Play">▶</IconButton>
          <IconButton variant="filled-pink"     size={40} accessibilityLabel="Like">♥</IconButton>
        </Row>
      </Section>

      <Section title="Form atoms">
        <TextInput label="Name" placeholder="First name" />
        <Textarea label="About me" placeholder="I love…" maxLength={500} />
        <SearchInput onChangeText={() => {}} />
        <PasswordInput label="Password" value="" onChangeText={() => {}} showStrengthMeter />
        <PhoneInput label="Phone" value="" onChange={() => {}} />
        <CodeInput onChange={() => {}} autoFocus={false} />
        <SegmentedControl<'men' | 'women' | 'all'>
          options={[{ key: 'men', label: 'Men' }, { key: 'women', label: 'Women' }, { key: 'all', label: 'All' }]}
          value={seg}
          onChange={setSeg}
        />
        <Row gap={20}>
          <Switch value={sw} onValueChange={setSw} accessibilityLabel="x" />
          <Checkbox value={chk} onValueChange={setChk} />
        </Row>
        <RadioGroup<string>
          options={[
            { key: 'long_term', label: 'Long-term partner' },
            { key: 'casual', label: 'Something casual' },
            { key: 'friendship', label: 'Friendship' },
          ]}
          value={radio}
          onChange={setRadio}
        />
        <RadioStepper value={stepper} onChange={setStepper} labels={['Disagree', '', '', '', 'Agree']} />
        <Select<string>
          label="Translate into"
          options={[{ key: 'en', label: 'English' }, { key: 'es', label: 'Spanish' }, { key: 'ja', label: 'Japanese' }]}
          value={select}
          onChange={setSelect}
        />
        <Body tone="secondary" size="sm">Distance: {slider} km</Body>
        <Slider min={1} max={100} value={slider} onChange={setSlider} />
        <Body tone="secondary" size="sm">Age range: {range[0]} – {range[1]}</Body>
        <RangeSlider min={18} max={60} value={range} onChange={setRange} />
      </Section>

      <Section title="Avatars + identity">
        <Row gap={12}>
          <Avatar size="xs" fallback="JM" />
          <Avatar size="sm" fallback="JM" />
          <Avatar size="md" fallback="JM" />
          <Avatar size="lg" fallback="JM" />
          <Avatar size="xl" fallback="JM" />
        </Row>
        <Row gap={12}>
          <StoryRing variant="none" size="md" fallback="JM" />
          <StoryRing variant="online" size="md" fallback="JM" />
          <StoryRing variant="unread" size="md" fallback="JM" />
        </Row>
        <Row gap={12}>
          <CompatibilityPill score={94} size="sm" />
          <VerifiedBadge level="bronze" size="md" />
          <VerifiedBadge level="silver" size="md" />
          <VerifiedBadge level="gold"   size="md" />
          <CountryFlag cc="BB" size="md" />
        </Row>
      </Section>

      <Section title="Cards / chrome / feedback">
        <Card variant="flat"><Body>Flat card</Body></Card>
        <Card variant="elevated"><Body>Elevated card</Body></Card>
        <Card variant="gradient"><Body>Gradient card</Body></Card>
        <HeaderBar title="Profile" leading={<HeaderBarButton accessibilityLabel="Back">‹</HeaderBarButton>} />
        <View style={{ backgroundColor: '#000000' }}>
          <BottomNavBar tabs={DEFAULT_NAV_TABS} activeKey="discover" onTabPress={() => {}} />
        </View>
        <Banner
          variant="warning"
          title="Money mention detected"
          body="Ahavah users should never send money to someone they haven't met in person."
          ctas={[{ label: 'Got it', onPress: () => {}, emphasis: 'primary' }]}
        />
        <Row gap={20}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Row>
        <ProgressBar value={0.4} />
        <ProgressDots total={5} current={2} />
        <PillButton variant="primary" fullWidth={false} onPress={() => showToast('Saved', 'success')}>
          Trigger toast
        </PillButton>
      </Section>

      <Section title="Empty states">
        <View style={{ backgroundColor: '#0F0B1F', borderRadius: 24 }}>
          <EmptyState variant="filter-too-narrow" onCtaPress={() => {}} />
        </View>
      </Section>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 12 }}>
      <Heading level="h2">{title}</Heading>
      <View style={{ gap: 12 }}>{children}</View>
    </View>
  );
}

function Row({ children, gap = 12 }: { children: React.ReactNode; gap?: number }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap }}>
      {children}
    </View>
  );
}
