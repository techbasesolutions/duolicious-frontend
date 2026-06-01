/**
 * Phase 6 Task 6.1 — BottomNavBar tests.
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { BottomNavBar, DEFAULT_NAV_TABS } from '../bottom-nav-bar';

describe('BottomNavBar', () => {
  it('renders all 4 default tabs', () => {
    const onTabPress = jest.fn();
    const { getByLabelText } = render(
      <BottomNavBar activeKey="discover" onTabPress={onTabPress} />,
    );
    for (const tab of DEFAULT_NAV_TABS) {
      expect(getByLabelText(tab.label)).toBeTruthy();
    }
  });

  it('marks the active tab with selected=true', () => {
    const { getByLabelText } = render(
      <BottomNavBar activeKey="matches" onTabPress={() => {}} />,
    );
    expect(getByLabelText('Matches').props.accessibilityState.selected).toBe(true);
    expect(getByLabelText('Discover').props.accessibilityState.selected).toBe(false);
  });

  it('fires onTabPress with the right key', () => {
    const onTabPress = jest.fn();
    const { getByLabelText } = render(
      <BottomNavBar activeKey="discover" onTabPress={onTabPress} />,
    );
    fireEvent.press(getByLabelText('Inbox'));
    expect(onTabPress).toHaveBeenCalledWith('inbox');
  });

  it('locks tab shape — exactly 4 default tabs', () => {
    // This guard catches accidental tab additions/removals during refactors.
    expect(DEFAULT_NAV_TABS).toHaveLength(4);
    expect(DEFAULT_NAV_TABS.map(t => t.key)).toEqual([
      'discover', 'matches', 'inbox', 'profile',
    ]);
  });

  it('uses rounded-3xl bar (radius 28) per Dateasy reference, NOT rounded-full', () => {
    // The bar is the inner View; we check via testing-library's
    // findByText approach is brittle here, so render and inspect tree.
    const { UNSAFE_getAllByType } = render(
      <BottomNavBar activeKey="discover" onTabPress={() => {}} />,
    );
    const Views = require('react-native').View;
    // Find the View whose className contains the bar styling
    const allViews = UNSAFE_getAllByType(Views);
    const barView = allViews.find((v: any) =>
      typeof v.props.className === 'string' && v.props.className.includes('h-16'),
    );
    expect(barView).toBeTruthy();
    expect(barView.props.className).toContain('rounded-3xl');
    expect(barView.props.className).not.toMatch(/\brounded-full\b/);
  });

  it('renders active glyph inside a lime CIRCLE (rounded-full + bg-lime)', () => {
    const { UNSAFE_getAllByType } = render(
      <BottomNavBar activeKey="discover" onTabPress={() => {}} />,
    );
    const Views = require('react-native').View;
    const allViews = UNSAFE_getAllByType(Views);
    // The active glyph circle has bg-lime-500 and rounded-full
    const activeCircle = allViews.find((v: any) =>
      typeof v.props.className === 'string' &&
      v.props.className.includes('bg-lime-500') &&
      v.props.className.includes('rounded-full'),
    );
    expect(activeCircle).toBeTruthy();
  });
});
