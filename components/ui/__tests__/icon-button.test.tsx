/**
 * Phase 6 Task 6.1 — IconButton tests.
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { IconButton } from '../icon-button';

describe('IconButton', () => {
  it('renders children + fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <IconButton accessibilityLabel="Pass" onPress={onPress}>×</IconButton>,
    );
    fireEvent.press(getByLabelText('Pass'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('honours size by setting width/height/borderRadius', () => {
    const { getByLabelText } = render(
      <IconButton accessibilityLabel="Play" size={64}>▶</IconButton>,
    );
    const node = getByLabelText('Play');
    expect(node.props.style.width).toBe(64);
    expect(node.props.style.height).toBe(64);
    expect(node.props.style.borderRadius).toBe(32);
  });

  it('defaults to filled-lime variant', () => {
    const { getByLabelText } = render(
      <IconButton accessibilityLabel="Like">✦</IconButton>,
    );
    expect(getByLabelText('Like').props.className).toContain('bg-lime-500');
  });

  it('honours variant=filled-pink', () => {
    const { getByLabelText } = render(
      <IconButton accessibilityLabel="Heart" variant="filled-pink">♥</IconButton>,
    );
    expect(getByLabelText('Heart').props.className).toContain('bg-pink-500');
  });

  it('honours variant=outline-indigo', () => {
    const { getByLabelText } = render(
      <IconButton accessibilityLabel="Settings" variant="outline-indigo">⚙</IconButton>,
    );
    const cls = getByLabelText('Settings').props.className;
    expect(cls).toContain('border');
    expect(cls).toContain('border-indigo-500');
  });

  it('disabled state does not fire onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <IconButton accessibilityLabel="X" onPress={onPress} disabled>×</IconButton>,
    );
    fireEvent.press(getByLabelText('X'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
