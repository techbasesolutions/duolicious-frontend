/**
 * Phase 6 Task 6.1 — InScreenTabs.
 *
 * Sub-section nav (e.g. Settings → Notifications / Privacy / Safety).
 * Different from BottomNavBar — this is for in-screen tab strips at the
 * top of a content area. Active = lime underline + lime text; inactive =
 * secondary text, no underline.
 */

import { Pressable, Text, View } from 'react-native';
import type { ViewProps } from 'react-native';

export type InScreenTab<T extends string = string> = {
  key: T;
  label: string;
};

type Props<T extends string> = ViewProps & {
  tabs: InScreenTab<T>[];
  activeKey: T;
  onChange: (key: T) => void;
};

export function InScreenTabs<T extends string>({
  tabs, activeKey, onChange, className, ...rest
}: Props<T>) {
  return (
    <View
      {...rest}
      className={[
        'flex-row border-b border-border',
        className as string | undefined,
      ].filter(Boolean).join(' ')}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: isActive ? 2 : 0,
              borderBottomColor: '#D7FF81',
            }}
          >
            <Text
              style={{
                color: isActive ? '#D7FF81' : '#B5B0CC',
                fontSize: 14,
                fontFamily: isActive
                  ? 'PlusJakartaSans_700Bold'
                  : 'PlusJakartaSans_400Regular',
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
