/**
 * Phase 6 Task 6.1 — EmptyState tests.
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { EmptyState } from '../empty-state';

describe('EmptyState', () => {
  it('renders the no-matches preset by default', () => {
    const { getByText } = render(<EmptyState />);
    expect(getByText('You’re all caught up')).toBeTruthy();
  });

  it('renders no-messages preset', () => {
    const { getByText } = render(<EmptyState variant="no-messages" />);
    expect(getByText('No messages yet')).toBeTruthy();
  });

  it('renders the filter-too-narrow preset with CTA', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = render(
      <EmptyState variant="filter-too-narrow" onCtaPress={onPress} />,
    );
    expect(getByText('Your filters are very specific')).toBeTruthy();
    fireEvent.press(getByLabelText('Expand filters'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not render CTA when onCtaPress is omitted (preset has CTA label)', () => {
    const { queryByLabelText } = render(<EmptyState variant="filter-too-narrow" />);
    expect(queryByLabelText('Expand filters')).toBeNull();
  });

  it('honours title/body/ctaLabel overrides', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = render(
      <EmptyState
        variant="no-matches"
        title="Custom title"
        body="Custom body"
        ctaLabel="Do it"
        onCtaPress={onPress}
      />,
    );
    expect(getByText('Custom title')).toBeTruthy();
    expect(getByText('Custom body')).toBeTruthy();
    fireEvent.press(getByLabelText('Do it'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders no-internet preset with retry CTA', () => {
    const onRetry = jest.fn();
    const { getByText, getByLabelText } = render(
      <EmptyState variant="no-internet" onCtaPress={onRetry} />,
    );
    expect(getByText('No connection')).toBeTruthy();
    fireEvent.press(getByLabelText('Retry'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
