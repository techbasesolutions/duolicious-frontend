/**
 * Phase 6 Task 6.1 — Banner.
 *
 * Inline alert (e.g. anti-scam money-mention banner above a suspicious
 * message). Always actionable: at least one CTA (Learn / Report / Dismiss).
 *
 * Variants:
 *   info       lavender accent strip
 *   warning    yellow accent strip
 *   danger     pink-red accent strip
 */

import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';

import { Body } from './typography';

type Variant = 'info' | 'warning' | 'danger';

const ACCENT: Record<Variant, string> = {
  info:    '#BC96FF',
  warning: '#FFC857',
  danger:  '#FF4566',
};

const ICON: Record<Variant, string> = {
  info: 'ⓘ', warning: '⚠', danger: '⚠',
};

type CtaSpec = {
  label: string;
  onPress: () => void;
  /** Visual emphasis: 'primary' = filled, 'ghost' = text-only */
  emphasis?: 'primary' | 'ghost';
};

type Props = {
  variant?: Variant;
  title?: string;
  body: string;
  ctas?: CtaSpec[];
  leading?: ReactNode;
};

export function Banner({
  variant = 'info', title, body, ctas, leading,
}: Props) {
  const accent = ACCENT[variant];
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        backgroundColor: '#1A1340',
        borderRadius: 14,
        padding: 12,
        borderLeftWidth: 4,
        borderLeftColor: accent,
      }}
      accessibilityRole="alert"
    >
      <View style={{ width: 24, alignItems: 'center', paddingTop: 2 }}>
        {leading ?? <Text style={{ color: accent, fontSize: 18 }}>{ICON[variant]}</Text>}
      </View>
      <View style={{ flex: 1 }}>
        {!!title && (
          <Body
            size="sm"
            style={{ color: accent, fontFamily: 'PlusJakartaSans_700Bold' }}
          >
            {title}
          </Body>
        )}
        <Body size="sm" style={{ color: '#FFFFFF', marginTop: title ? 2 : 0 }}>
          {body}
        </Body>
        {!!ctas?.length && (
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {ctas.map((cta) => (
              <Pressable
                key={cta.label}
                onPress={cta.onPress}
                accessibilityRole="button"
                accessibilityLabel={cta.label}
                style={{
                  backgroundColor: cta.emphasis === 'primary' ? accent : 'transparent',
                  borderColor: accent,
                  borderWidth: cta.emphasis === 'primary' ? 0 : 1,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 9999,
                }}
              >
                <Text
                  style={{
                    color: cta.emphasis === 'primary' ? '#000000' : accent,
                    fontSize: 12,
                    fontFamily: 'PlusJakartaSans_700Bold',
                  }}
                >
                  {cta.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
