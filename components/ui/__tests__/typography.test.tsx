/**
 * Phase 6 Task 6.1 — Typography snapshot tests.
 *
 * Per the plan's per-atom build discipline ("Failing snapshot test first").
 * These tests pin behavior, not visual fidelity — visual diffs come from
 * Playwright/Maestro in Task 6.3.
 */

import React from 'react';
import { render } from '@testing-library/react-native';

import { Heading, Body, Caption, Numeric } from '../typography';

describe('Heading', () => {
  it('defaults to h1', () => {
    const { getByText } = render(<Heading>Hi</Heading>);
    const node = getByText('Hi');
    expect(node).toBeTruthy();
    // Heading renders as a Text with accessibilityRole=header
    expect(node.props.accessibilityRole).toBe('header');
  });

  it('honours level=h2', () => {
    const { getByText } = render(<Heading level="h2">Hi</Heading>);
    expect(getByText('Hi').props.className).toContain('text-2xl');
  });

  it('honours level=h3', () => {
    const { getByText } = render(<Heading level="h3">Hi</Heading>);
    expect(getByText('Hi').props.className).toContain('text-xl');
  });

  it('appends a custom className', () => {
    const { getByText } = render(<Heading className="my-4">Hi</Heading>);
    expect(getByText('Hi').props.className).toContain('my-4');
  });
});

describe('Body', () => {
  it('defaults to base size + primary tone', () => {
    const { getByText } = render(<Body>hello</Body>);
    const cls = getByText('hello').props.className;
    expect(cls).toContain('text-base');
    expect(cls).toContain('text-text-primary');
    expect(cls).toContain('font-body');
  });

  it('honours size + tone', () => {
    const { getByText } = render(<Body size="sm" tone="muted">x</Body>);
    const cls = getByText('x').props.className;
    expect(cls).toContain('text-sm');
    expect(cls).toContain('text-text-muted');
  });
});

describe('Caption', () => {
  it('renders with muted tone + xs size', () => {
    const { getByText } = render(<Caption>2 mi away</Caption>);
    const cls = getByText('2 mi away').props.className;
    expect(cls).toContain('text-xs');
    expect(cls).toContain('text-text-muted');
  });
});

describe('Numeric', () => {
  it('applies fontVariant: tabular-nums', () => {
    const { getByText } = render(<Numeric>27</Numeric>);
    const node = getByText('27');
    // Style is an array because we merge with caller-provided style
    const style = node.props.style;
    const flat = Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style;
    expect(flat.fontVariant).toEqual(['tabular-nums']);
  });

  it('preserves caller-provided style', () => {
    const { getByText } = render(<Numeric style={{ marginTop: 4 }}>27</Numeric>);
    const node = getByText('27');
    const style = node.props.style;
    const flat = Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style;
    expect(flat.marginTop).toBe(4);
    expect(flat.fontVariant).toEqual(['tabular-nums']);
  });
});
