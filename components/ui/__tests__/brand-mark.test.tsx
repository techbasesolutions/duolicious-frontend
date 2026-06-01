/**
 * Phase 6 Task 6.1 — BrandMark tests.
 */

import React from 'react';
import { render } from '@testing-library/react-native';

import { BrandMark } from '../brand-mark';

describe('BrandMark', () => {
  it('renders the wordmark "ahavah" in full mode', () => {
    const { getByText } = render(<BrandMark />);
    expect(getByText('ahavah')).toBeTruthy();
  });

  it('renders the sparkle tile (no wordmark) in icon-only mode', () => {
    const { queryByText, getByLabelText } = render(<BrandMark mode="icon-only" />);
    expect(queryByText('ahavah')).toBeNull();
    expect(getByLabelText('Ahavah')).toBeTruthy();
  });

  it('renders monochrome with black wordmark for paper/dark-on-light contexts', () => {
    const { getByText } = render(<BrandMark mode="monochrome" />);
    expect(getByText('ahavah').props.style.color).toBe('#000000');
  });

  it('honours size prop on the wordmark', () => {
    const { getByText } = render(<BrandMark size="lg" />);
    expect(getByText('ahavah').props.style.fontSize).toBe(44);
  });

  it('renders an SVG element for the sparkle (per Dateasy UI kit reference)', () => {
    const { UNSAFE_root } = render(<BrandMark mode="icon-only" />);
    // Find the Svg in the tree — react-native-svg renders it as a host
    // element named 'RNSVGSvgView' (native) or 'svg' (web). Either way,
    // there must be at least one descendant whose props include `viewBox`.
    const tree = UNSAFE_root.findAll((n: any) => n.props && n.props.viewBox);
    expect(tree.length).toBeGreaterThan(0);
  });
});
