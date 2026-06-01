/**
 * Phase 6 Task 6.1 — Pill + PillButton tests.
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Pill, PillButton } from '../pill';

describe('Pill', () => {
  it('renders children and is selectable=false by default', () => {
    const { getByText, getByRole } = render(<Pill>Tokyo</Pill>);
    expect(getByText('Tokyo')).toBeTruthy();
    const node = getByRole('button');
    expect(node.props.accessibilityState.selected).toBe(false);
  });

  it('reflects selected state in accessibilityState + className', () => {
    const { getByRole, getByText } = render(<Pill selected>Tokyo</Pill>);
    expect(getByRole('button').props.accessibilityState.selected).toBe(true);
    // selected pill has lime fill on its outer Pressable
    expect(getByRole('button').props.className).toContain('bg-lime-500');
    // text on selected pill is dark
    expect(getByText('Tokyo').props.className).toContain('text-black');
  });

  it('uses rounded-md (radius 14) per Dateasy UI kit, NOT rounded-full', () => {
    const { getByRole } = render(<Pill>Tokyo</Pill>);
    const cls = getByRole('button').props.className;
    expect(cls).toContain('rounded-md');
    expect(cls).not.toContain('rounded-full');
  });

  it('unselected uses lavender outline + lavender text per kit', () => {
    const { getByRole, getByText } = render(<Pill>Tokyo</Pill>);
    expect(getByRole('button').props.className).toContain('border-lavender-500');
    expect(getByText('Tokyo').props.className).toContain('text-lavender-500');
  });

  it('fires onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Pill onPress={onPress}>Tokyo</Pill>);
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('honours disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Pill onPress={onPress} disabled>Tokyo</Pill>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('PillButton', () => {
  it('uses rounded-lg (radius 18) per Dateasy UI kit, NOT rounded-full', () => {
    const { getByRole } = render(<PillButton>Continue</PillButton>);
    const cls = getByRole('button').props.className;
    expect(cls).toContain('rounded-lg');
    expect(cls).not.toContain('rounded-full');
  });

  it('defaults to primary lime variant', () => {
    const { getByRole } = render(<PillButton>Continue</PillButton>);
    expect(getByRole('button').props.className).toContain('bg-lime-500');
  });

  it('honours variant=secondary (lavender)', () => {
    const { getByRole } = render(<PillButton variant="secondary">Apply</PillButton>);
    expect(getByRole('button').props.className).toContain('bg-lavender-500');
  });

  it('renders children + fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByRole } = render(
      <PillButton onPress={onPress}>Continue</PillButton>,
    );
    expect(getByText('Continue')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders an ActivityIndicator when loading', () => {
    const { queryByText, UNSAFE_queryByType } = render(
      <PillButton loading>Continue</PillButton>,
    );
    expect(queryByText('Continue')).toBeNull();
    // ActivityIndicator is the only element when loading
    const ActivityIndicator = require('react-native').ActivityIndicator;
    expect(UNSAFE_queryByType(ActivityIndicator)).toBeTruthy();
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <PillButton onPress={onPress} disabled>Continue</PillButton>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not fire onPress when loading', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <PillButton onPress={onPress} loading>Continue</PillButton>,
    );
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
