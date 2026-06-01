/**
 * Phase 6 Task 6.1 — PaywallCard.
 *
 * Per docs/dateasy-rules.md image 5 (Premium card pattern): indigo→lavender
 * gradient bg (placeholder solid lavender until expo-linear-gradient lands),
 * feature checklist with lime checks, price-tier pills, restore-purchases
 * footer, terms links.
 */

import { Pressable, Text, View } from 'react-native';
import { Body, Caption, Heading } from './typography';
import { PillButton } from './pill';

type PriceTier = {
  key: string;
  label: string;        // e.g. "1 month"
  price: string;        // e.g. "$14.99"
  perMonth?: string;    // e.g. "$14.99/mo"
  badge?: 'popular' | 'best_value';
};

type Props = {
  title?: string;
  subtitle?: string;
  features: string[];
  tiers: PriceTier[];
  selectedTierKey: string;
  onSelectTier: (key: string) => void;
  onPurchase: (tier: PriceTier) => void;
  onRestore?: () => void;
  loading?: boolean;
};

export function PaywallCard({
  title = 'Ahavah Premium',
  subtitle = 'Match more. Worry less.',
  features,
  tiers,
  selectedTierKey,
  onSelectTier,
  onPurchase,
  onRestore,
  loading = false,
}: Props) {
  const selected = tiers.find((t) => t.key === selectedTierKey);
  return (
    <View
      style={{
        backgroundColor: '#5524F5',
        borderRadius: 24,
        padding: 24,
        gap: 16,
      }}
    >
      <View>
        <Heading level="h1">{title}</Heading>
        <Body tone="secondary" style={{ marginTop: 4 }}>{subtitle}</Body>
      </View>

      {/* Features */}
      <View style={{ gap: 8 }}>
        {features.map((f, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ color: '#D7FF81', fontSize: 14, fontWeight: '700' }}>✓</Text>
            <Body size="sm">{f}</Body>
          </View>
        ))}
      </View>

      {/* Price tiers */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {tiers.map((t) => {
          const isActive = t.key === selectedTierKey;
          return (
            <Pressable
              key={t.key}
              onPress={() => onSelectTier(t.key)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${t.label} ${t.price}`}
              style={{
                flex: 1,
                borderRadius: 14,
                paddingVertical: 12,
                paddingHorizontal: 12,
                alignItems: 'center',
                backgroundColor: isActive ? '#D7FF81' : 'rgba(255,255,255,0.08)',
                borderWidth: 1.5,
                borderColor: isActive ? '#D7FF81' : 'rgba(255,255,255,0.16)',
                gap: 4,
              }}
            >
              {!!t.badge && (
                <Text
                  style={{
                    color: isActive ? '#000000' : '#D7FF81',
                    fontSize: 10,
                    fontFamily: 'PlusJakartaSans_700Bold',
                  }}
                >
                  {t.badge === 'popular' ? 'POPULAR' : 'BEST VALUE'}
                </Text>
              )}
              <Text
                style={{
                  color: isActive ? '#000000' : '#FFFFFF',
                  fontSize: 14,
                  fontFamily: 'PlusJakartaSans_500Medium',
                }}
              >
                {t.label}
              </Text>
              <Text
                style={{
                  color: isActive ? '#000000' : '#FFFFFF',
                  fontSize: 18,
                  fontFamily: 'PlusJakartaSans_700Bold',
                }}
              >
                {t.price}
              </Text>
              {!!t.perMonth && (
                <Caption style={{ color: isActive ? 'rgba(0,0,0,0.6)' : '#B5B0CC' }}>
                  {t.perMonth}
                </Caption>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Purchase CTA */}
      <PillButton
        loading={loading}
        onPress={() => selected && onPurchase(selected)}
      >
        {selected ? `Continue ${selected.price}` : 'Continue'}
      </PillButton>

      {!!onRestore && (
        <Pressable onPress={onRestore} accessibilityRole="button">
          <Caption style={{ textAlign: 'center', color: '#FFFFFF' }}>
            Restore purchases
          </Caption>
        </Pressable>
      )}
    </View>
  );
}
