/**
 * Phase 6 Task 6.1 — HapticTrigger tests.
 */

import React from 'react';
import { Pressable, Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

// Mock expo-haptics so we can assert it was called with the right type
jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(),
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
  NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
}));

const Haptics = require('expo-haptics');

import { HapticTrigger } from '../haptic-trigger';

describe('HapticTrigger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fires selectionAsync on press for type=selection', () => {
    const { getByText } = render(
      <HapticTrigger type="selection">
        <Pressable><Text>tap</Text></Pressable>
      </HapticTrigger>,
    );
    fireEvent.press(getByText('tap'));
    expect(Haptics.selectionAsync).toHaveBeenCalledTimes(1);
  });

  it('fires impactAsync(Medium) for type=impactMedium', () => {
    const { getByText } = render(
      <HapticTrigger type="impactMedium">
        <Pressable><Text>tap</Text></Pressable>
      </HapticTrigger>,
    );
    fireEvent.press(getByText('tap'));
    expect(Haptics.impactAsync).toHaveBeenCalledWith('medium');
  });

  it('fires notificationAsync(Success) for type=notificationSuccess', () => {
    const { getByText } = render(
      <HapticTrigger type="notificationSuccess">
        <Pressable><Text>tap</Text></Pressable>
      </HapticTrigger>,
    );
    fireEvent.press(getByText('tap'));
    expect(Haptics.notificationAsync).toHaveBeenCalledWith('success');
  });

  it('chains to child onPress', () => {
    const childOnPress = jest.fn();
    const { getByText } = render(
      <HapticTrigger type="selection">
        <Pressable onPress={childOnPress}><Text>tap</Text></Pressable>
      </HapticTrigger>,
    );
    fireEvent.press(getByText('tap'));
    expect(childOnPress).toHaveBeenCalledTimes(1);
    expect(Haptics.selectionAsync).toHaveBeenCalledTimes(1);
  });

  it('disabled=true skips the haptic but still chains onPress', () => {
    const childOnPress = jest.fn();
    const { getByText } = render(
      <HapticTrigger type="selection" disabled>
        <Pressable onPress={childOnPress}><Text>tap</Text></Pressable>
      </HapticTrigger>,
    );
    fireEvent.press(getByText('tap'));
    expect(Haptics.selectionAsync).not.toHaveBeenCalled();
    expect(childOnPress).toHaveBeenCalled();
  });
});
