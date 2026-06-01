/**
 * Phase 6 Task 6.1 — StickerBadge tests.
 */

import React from 'react';
import { render } from '@testing-library/react-native';

import { StickerBadge, type StickerVariant } from '../sticker-badge';

const ALL_VARIANTS: StickerVariant[] = [
  'sparkle-4pt', 'heart', 'quad-star', 'pent-star', 'flower', 'blob',
  'triangle', 'wavy', 'dot', 'circle-large', 'pentagon', 'cross-target',
];

describe('StickerBadge', () => {
  it.each(ALL_VARIANTS)('renders variant=%s without crashing', (variant) => {
    const { toJSON } = render(<StickerBadge variant={variant} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders the outer wrapper at the requested size', () => {
    const { toJSON } = render(
      <StickerBadge variant="sparkle-4pt" size={64} testID="sticker" />,
    );
    const tree: any = toJSON();
    expect(tree.props.style[0].width).toBe(64);
    expect(tree.props.style[0].height).toBe(64);
  });

  it('defaults size to 32', () => {
    const { toJSON } = render(<StickerBadge variant="heart" />);
    const tree: any = toJSON();
    expect(tree.props.style[0].width).toBe(32);
  });

  it('exposes accessibilityRole="image" on the root wrapper', () => {
    const { UNSAFE_root } = render(<StickerBadge variant="sparkle-4pt" />);
    // Find any element whose accessibilityRole is image
    const matches = UNSAFE_root.findAll(
      (n: any) => n.props && n.props.accessibilityRole === 'image',
    );
    expect(matches.length).toBeGreaterThan(0);
  });

  it('renders an Svg element (per kit reference)', () => {
    const { UNSAFE_root } = render(<StickerBadge variant="sparkle-4pt" />);
    const svgEls = UNSAFE_root.findAll(
      (n: any) => n.props && n.props.viewBox === '0 0 100 100',
    );
    expect(svgEls.length).toBeGreaterThan(0);
  });
});
