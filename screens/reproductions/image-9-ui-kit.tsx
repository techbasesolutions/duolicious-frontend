/**
 * Reproduction of Dateasy reference image 9 — UI kit panel grid.
 *
 * Five panels arranged in a 3-column grid:
 *  Top-left:  Icons (4×4 grid of outline glyphs)
 *  Top-mid:   Stickers (sticker callouts: "Awesome", "Check my stories")
 *  Top-right: Buttons (lime CTA, lavender confirm, outline edit, action row)
 *  Bot-left:  Brand mark (lime sparkle on dark + alt indigo)
 *  Bot-mid:   Tags (94% pill, Cooking, Knitting, Relationship, Friendship)
 *  Bot-right: Forms (First name filled-input, Say hi, About me textarea)
 *
 * The dashed-stroke borders shown in the kit are PRESENTATION-ONLY (Behance
 * art-layout) — see dateasy-rules.md conflict resolutions. We render solid
 * panels here. Section labels above each panel.
 */

import { Pressable, Text, View } from 'react-native';

import { BrandMark } from '../../components/ui/brand-mark';
import { Body, Caption, Heading, Numeric } from '../../components/ui/typography';
import { Button } from '../../components/ui/button';
import { Pill, PillButton } from '../../components/ui/pill';
import { IconButton } from '../../components/ui/icon-button';
import { TextInput, Textarea } from '../../components/ui/text-input';
import { CompatibilityPill } from '../../components/ui/compatibility-pill';
import { StickerBadge } from '../../components/ui/sticker-badge';
import { StickerCallout } from '../../components/ui/sticker-callout';

const ICON_GLYPHS = [
  '☎', '⋯', '×', '💬',
  '◀', '🔍', '🔄', '🔃',
  '📎', '➤', '↗', '🌐',
  '🗺', '◔', '⌄', '⊕',
  '☰', '✏', '⊟', '⌒',
  '♥', '♡', '∰', '+',
];

export function Image9UiKit() {
  return (
    <View style={{ gap: 16 }}>
      {/* Row 1: Icons / Stickers / Buttons */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
        <Panel label="Icons">
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
              width: 168,
            }}
          >
            {ICON_GLYPHS.slice(0, 16).map((g, i) => (
              <View
                key={i}
                style={{
                  width: 32, height: 32,
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#BC96FF', fontSize: 16 }}>{g}</Text>
              </View>
            ))}
          </View>
        </Panel>

        <Panel label="Stickers">
          <View style={{ gap: 12, width: 220, alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <StickerCallout variant="awesome" />
              <View style={{ alignSelf: 'center' }}>
                <StickerBadge variant="quad-star" size={48} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <StickerBadge variant="circle-large" size={56} color="#5524F5" />
              <View
                style={{
                  backgroundColor: '#BC96FF',
                  borderRadius: 14,
                  paddingHorizontal: 12, paddingVertical: 6,
                }}
              >
                <Text style={{ color: '#000', fontSize: 12, fontFamily: 'PlusJakartaSans_700Bold' }}>
                  Check my{'\n'}stories
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <StickerBadge variant="blob"     size={32} />
              <StickerBadge variant="blob"     size={32} flip="h" />
              <StickerBadge variant="triangle" size={32} color="#D7FF81" />
            </View>
          </View>
        </Panel>

        <Panel label="Buttons">
          <View style={{ gap: 12, width: 280 }}>
            <PillButton variant="primary" fullWidth size="md">
              Find out your personality type
            </PillButton>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1 }}>
                <Button variant="outline">Edit profile info</Button>
              </View>
              <CompatibilityPill score={94} size="md" />
            </View>
            <PillButton variant="secondary" fullWidth size="md">
              Confirm
            </PillButton>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <IconButton variant="filled-indigo"   size={40} accessibilityLabel="Eye">👁</IconButton>
              <IconButton variant="filled-indigo"   size={40} accessibilityLabel="Plus">+</IconButton>
              <IconButton variant="filled-pink"     size={40} accessibilityLabel="Heart">♥</IconButton>
              <IconButton variant="filled-indigo"   size={40} accessibilityLabel="X">×</IconButton>
            </View>
          </View>
        </Panel>
      </View>

      {/* Row 2: Brand mark / Tags / Forms */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
        <Panel>
          <View style={{ alignItems: 'center', gap: 16 }}>
            <BrandMark mode="full" size="lg" />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <BrandMark mode="icon-only" size="lg" />
              <View
                style={{
                  width: 72, height: 72,
                  borderRadius: 16,
                  borderWidth: 2, borderColor: '#FFFFFF',
                  alignItems: 'center', justifyContent: 'center',
                  backgroundColor: '#000000',
                }}
              >
                <StickerBadge variant="sparkle-4pt" size={40} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </Panel>

        <Panel label="Tags">
          <View style={{ gap: 8, width: 220 }}>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <CompatibilityPill score={94} size="sm" />
              <Pill size="sm" selected>Cooking</Pill>
              <Pill size="sm">Knitting</Pill>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Pill size="sm">Relationship</Pill>
              <Pill size="sm" selected>Friendship</Pill>
            </View>
          </View>
        </Panel>

        <Panel label="Forms">
          <View style={{ gap: 12, width: 220 }}>
            <TextInput label="First name" value="Michael" onChangeText={() => {}} />
            <TextInput
              placeholder="Say hi!"
              trailingIcon={<Text style={{ color: '#BC96FF', fontSize: 18 }}>➤</Text>}
            />
            <Textarea
              label="About me"
              value="I believe in embracing loving kindness for both myself and others. I'm a person who is naturally inclined to see the glass as half full."
              onChangeText={() => {}}
            />
          </View>
        </Panel>
      </View>
    </View>
  );
}

function Panel({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: '#1A1340',
        borderRadius: 24,
        padding: 16,
        gap: 12,
        // simulate the editorial dashed-rule with a 1px dashed (the kit's
        // dashed strokes are presentation chrome — kept here only because
        // the user asked for the look to match)
        borderWidth: 1,
        borderColor: 'rgba(85, 36, 245, 0.6)',
        borderStyle: 'dashed',
      }}
    >
      {label && <Caption style={{ color: '#FFFFFF' }}>{label}</Caption>}
      {children}
    </View>
  );
}
