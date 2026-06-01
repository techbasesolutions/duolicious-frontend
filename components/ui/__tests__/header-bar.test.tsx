/**
 * Phase 6 Task 6.1 — HeaderBar tests.
 */

import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { HeaderBar, HeaderBarButton } from '../header-bar';

describe('HeaderBar', () => {
  it('renders title centered when provided', () => {
    const { getByText } = render(<HeaderBar title="Profile" />);
    expect(getByText('Profile')).toBeTruthy();
    // Heading uses accessibilityRole=header
    expect(getByText('Profile').props.accessibilityRole).toBe('header');
  });

  it('renders empty title slot without crashing', () => {
    const { queryByRole } = render(<HeaderBar />);
    expect(queryByRole('header')).toBeNull();
  });

  it('renders leading + trailing slots', () => {
    const { getByText } = render(
      <HeaderBar
        title="Profile"
        leading={<Text>L</Text>}
        trailing={<Text>R</Text>}
      />,
    );
    expect(getByText('L')).toBeTruthy();
    expect(getByText('R')).toBeTruthy();
  });

  it('honours topInset', () => {
    const { toJSON } = render(<HeaderBar title="X" topInset={48} />);
    // The outer View carries the paddingTop
    const json: any = toJSON();
    expect(json.props.style.paddingTop).toBe(48);
  });
});

describe('HeaderBarButton', () => {
  it('fires onPress with accessibility label', () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <HeaderBarButton onPress={onPress} accessibilityLabel="Back">
        <Text>‹</Text>
      </HeaderBarButton>,
    );
    fireEvent.press(getByLabelText('Back'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <HeaderBarButton onPress={onPress} accessibilityLabel="Back" disabled>
        <Text>‹</Text>
      </HeaderBarButton>,
    );
    fireEvent.press(getByLabelText('Back'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
