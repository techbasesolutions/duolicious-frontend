/**
 * Phase 6 Task 6.1 — TabBar wired to the new BottomNavBar atom.
 *
 * The function signature stays the same (consumed by App.tsx as
 * `tabBar={props => <TabBar {...props} />}`) so no navigator
 * restructuring is needed for the visual swap to land. We map the
 * existing react-navigation `state.routes` into BottomNavBar's
 * `NavTab[]` shape; the locked 4-tab Discover/Matches/Inbox/Profile
 * shape per Task 0.0 audit lands when navigator routes are renamed
 * to match (separate task).
 *
 * Glyph + label per route is held in a small map below; new routes
 * fall back to the route name + a generic glyph.
 */

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavBar, type NavTab } from '../ui/bottom-nav-bar';

// Maps existing React Navigation route names to the icon + label that
// BottomNavBar will render. Until the locked tab-shape rewrite, the
// 5 duolicious-inherited routes are present with Ahavah glyphs.
const ROUTE_TO_TAB: Record<string, { glyph: string; label: string }> = {
  Search:   { glyph: '✦', label: 'Discover' },
  Feed:     { glyph: '◎', label: 'Feed' },
  Inbox:    { glyph: '✉', label: 'Inbox' },
  Visitors: { glyph: '☆', label: 'Visitors' },
  Profile:  { glyph: '☻', label: 'Profile' },
};

const FALLBACK_TAB = { glyph: '•', label: '' };

const TabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();

  const tabs: NavTab[] = state.routes.map((route: any) => {
    const meta = ROUTE_TO_TAB[route.name] ?? { ...FALLBACK_TAB, label: route.name };
    return { key: route.name, label: meta.label, glyph: meta.glyph };
  });

  const activeRoute = state.routes[state.index];
  const activeKey = activeRoute?.name ?? tabs[0]?.key ?? '';

  const onTabPress = (key: string) => {
    const targetIdx = state.routes.findIndex((r: any) => r.name === key);
    if (targetIdx === -1) return;
    const target = state.routes[targetIdx];

    const event = navigation.emit({
      type: 'tabPress',
      target: target.key,
      canPreventDefault: true,
    });

    const isFocused = state.index === targetIdx;
    if (!isFocused && !event.defaultPrevented) {
      // `merge: true` preserves params already on the tab screen
      navigation.navigate({ name: target.name, merge: true });
    }
  };

  return (
    <BottomNavBar
      tabs={tabs}
      activeKey={activeKey}
      onTabPress={onTabPress}
      bottomInset={insets.bottom}
    />
  );
};

export { TabBar };
