/**
 * Phase 6 Task 6.1 — ListItem.
 *
 * Generic row used everywhere in settings + lists.
 *   leading element (Avatar / icon)
 *   title (Body)
 *   subtitle (Caption)
 *   trailing element (chevron / badge / Switch)
 *
 * Pressed state = bg.elevated flash.
 */

import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';

import { Body, Caption } from './typography';

type Props = {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
};

export function ListItem({
  title, subtitle, leading, trailing, onPress, disabled, destructive,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={disabled || !onPress}
      className={[
        'flex-row items-center px-4 py-3 gap-3',
        onPress ? 'active:bg-bg-elevated' : '',
        disabled ? 'opacity-40' : '',
      ].filter(Boolean).join(' ')}
      style={{ minHeight: 56 }}
    >
      {leading != null && <View>{leading}</View>}
      <View style={{ flex: 1 }}>
        <Body
          style={destructive ? { color: '#FF4566' } : undefined}
          numberOfLines={1}
        >
          {title}
        </Body>
        {!!subtitle && (
          <Caption numberOfLines={1} style={{ marginTop: 2 }}>
            {subtitle}
          </Caption>
        )}
      </View>
      {trailing != null
        ? <View>{trailing}</View>
        : onPress
          ? <Text style={{ color: '#7A7596', fontSize: 20 }}>›</Text>
          : null}
    </Pressable>
  );
}
