/**
 * Phase 6 Task 6.1 — BottomNavBar.
 *
 * Per Dateasy reference (image 12 left phone): floating ROUNDED-RECT bar
 * (NOT full-pill), indigo background, 4 circular icon slots. The active
 * glyph sits inside a LIME CIRCLE (40px); inactive glyphs are lavender on
 * transparent.
 *
 * Tab shape — locked post-Q&A-strip per Task 0.0 audit:
 *   Discover  (sparkle ✦)  swipe deck
 *   Matches   (heart ♥)    mutual likes list
 *   Inbox     (chat ✉)     active conversations
 *   Profile   (person ☻)   own profile + settings
 *
 * This atom is navigator-agnostic: accepts a list of tabs + an active key
 * + an `onTabPress` callback. Wiring into React Navigation lives in
 * `navigation/tab-bar.tsx` (it does
 *   `tabBar={(props) => <BottomNavBar … />}`).
 *
 * Glyphs use the same approach as VerifiedBadge: small Unicode pictographs
 * as Text rather than pulling in a vector-icon library. Phase D Task D.1
 * swap to a tuned icon set (Phosphor) is a one-line change here.
 */

import { View, Pressable, Text } from 'react-native';
import type { ViewProps } from 'react-native';

export type NavTabKey = string;

export type NavTab = {
  key: NavTabKey;
  label: string;       // accessibility label
  glyph: string;       // unicode glyph
};

export const DEFAULT_NAV_TABS: NavTab[] = [
  { key: 'discover', label: 'Discover', glyph: '✦' },
  { key: 'matches',  label: 'Matches',  glyph: '♥' },
  { key: 'inbox',    label: 'Inbox',    glyph: '✉' },
  { key: 'profile',  label: 'Profile',  glyph: '☻' },
];

type Props = ViewProps & {
  tabs?: NavTab[];
  activeKey: NavTabKey;
  onTabPress: (key: NavTabKey) => void;
  bottomInset?: number;
};

export function BottomNavBar({
  tabs = DEFAULT_NAV_TABS,
  activeKey,
  onTabPress,
  bottomInset = 0,
  className,
  ...rest
}: Props) {
  return (
    <View
      pointerEvents="box-none"
      style={{ paddingBottom: bottomInset }}
      className={[
        'w-full items-center px-4 pb-3',
        className as string | undefined,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      <View
        className={[
          // Per kit: rounded-RECT (radius 28) bar, indigo bg, height 64,
          // contents centered with equal spacing across tabs.
          'flex-row items-center justify-around',
          'bg-bg-indigo border border-border rounded-3xl',
          'h-16 px-2',
        ].join(' ')}
        style={{ minWidth: 280 }}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onTabPress(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.label}
              hitSlop={8}
              // Per kit: each tab slot is a generous tap target;
              // the active visual is a 40px lime CIRCLE behind the glyph.
              className="flex-1 h-12 items-center justify-center"
            >
              <View
                className={[
                  'w-10 h-10 items-center justify-center rounded-full',
                  isActive ? 'bg-lime-500' : 'bg-transparent',
                ].join(' ')}
              >
                <Text
                  style={{
                    fontSize: 20,
                    lineHeight: 22,
                    textAlign: 'center',
                    color: isActive ? '#000000' : '#BC96FF',  // dark on lime / lavender otherwise
                  }}
                >
                  {tab.glyph}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
