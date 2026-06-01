/**
 * Phase 6 Task 6.1 — VerifiedBadge tests.
 */

import React from 'react';
import { render } from '@testing-library/react-native';

import { VerifiedBadge } from '../verified-badge';

describe('VerifiedBadge', () => {
  it('renders nothing for level=none', () => {
    const { toJSON } = render(<VerifiedBadge level="none" />);
    expect(toJSON()).toBeNull();
  });

  it('renders bronze with bronze fill + accessible label', () => {
    const { getByLabelText } = render(<VerifiedBadge level="bronze" />);
    const node = getByLabelText('Profile verified');
    expect(node).toBeTruthy();
    // backgroundColor lives in style; check via flat style
    const style = node.props.style;
    expect(style.backgroundColor).toBe('#CD7F32');
  });

  it('renders silver with silver fill + accessible label', () => {
    const { getByLabelText } = render(<VerifiedBadge level="silver" />);
    expect(getByLabelText('Liveness verified').props.style.backgroundColor).toBe('#C0C0C0');
  });

  it('renders gold with gold fill + accessible label', () => {
    const { getByLabelText } = render(<VerifiedBadge level="gold" />);
    expect(getByLabelText('ID verified').props.style.backgroundColor).toBe('#FFD700');
  });

  it('honours size prop', () => {
    const { getByLabelText } = render(<VerifiedBadge level="gold" size="lg" />);
    const node = getByLabelText('ID verified');
    expect(node.props.style.width).toBe(24);
    expect(node.props.style.height).toBe(24);
  });

  it('renders the check glyph', () => {
    const { getByText } = render(<VerifiedBadge level="gold" />);
    expect(getByText('✓')).toBeTruthy();
  });
});
