/**
 * Phase 6 Task 6.1 — Card tests.
 *
 * We use testID + getByTestId to grab the outer View directly. Text's
 * .parent in RN test renderer doesn't reliably surface the wrapping
 * View's className because Text wraps its children in an internal node.
 */

import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Card } from '../card';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Card><Text>contents</Text></Card>,
    );
    expect(getByText('contents')).toBeTruthy();
  });

  it('defaults to flat variant + md padding', () => {
    const { getByTestId } = render(
      <Card testID="card"><Text>x</Text></Card>,
    );
    const cls = getByTestId('card').props.className ?? '';
    expect(cls).toContain('bg-bg-card');
    expect(cls).toContain('rounded-2xl');
    expect(cls).toContain('p-4');
  });

  it('honours variant=elevated', () => {
    const { getByTestId } = render(
      <Card variant="elevated" testID="card"><Text>x</Text></Card>,
    );
    expect(getByTestId('card').props.className).toContain('border');
  });

  it('honours padding=none', () => {
    const { getByTestId } = render(
      <Card padding="none" testID="card"><Text>x</Text></Card>,
    );
    const cls = getByTestId('card').props.className ?? '';
    expect(cls).not.toMatch(/\bp-\d/);
  });

  it('honours variant=gradient', () => {
    const { getByTestId } = render(
      <Card variant="gradient" testID="card"><Text>x</Text></Card>,
    );
    expect(getByTestId('card').props.className).toContain('bg-lavender-500');
  });
});
