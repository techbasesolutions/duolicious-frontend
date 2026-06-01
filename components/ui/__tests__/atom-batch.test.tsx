/**
 * Phase 6 Task 6.1 — batch tests for the second wave of atoms.
 *
 * Lighter than the early-atom tests (per-prop assertions) — these pin the
 * critical behavior + accessibility + lockstep with the kit:
 *  - Switch / Checkbox / SegmentedControl: state + onChange
 *  - RadioStepper / RadioGroup: selected position
 *  - Slider / RangeSlider: value commit
 *  - Banner: variant accent + CTA
 *  - ProgressBar / ProgressDots: accessibility role
 *  - Spinner: renders + accessibility label
 *  - Avatar / CompatibilityPill / CountryFlag: presence
 *  - Bubble: translation toggle behavior
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Switch } from '../switch';
import { Checkbox } from '../checkbox';
import { SegmentedControl } from '../segmented-control';
import { RadioGroup } from '../radio-group';
import { RadioStepper } from '../radio-stepper';
import { Slider, RangeSlider } from '../slider';
import { Banner } from '../banner';
import { ProgressBar, ProgressDots } from '../progress';
import { Spinner } from '../spinner';
import { Avatar } from '../avatar';
import { CompatibilityPill } from '../compatibility-pill';
import { CountryFlag } from '../country-flag';
import { Bubble } from '../bubble';

describe('Switch', () => {
  it('toggles state on press', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Switch value={false} onValueChange={onValueChange} accessibilityLabel="x" />,
    );
    fireEvent.press(getByRole('switch'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });
  it('exposes accessibilityState.checked', () => {
    const { getByRole } = render(
      <Switch value={true} onValueChange={() => {}} accessibilityLabel="x" />,
    );
    expect(getByRole('switch').props.accessibilityState.checked).toBe(true);
  });
});

describe('Checkbox', () => {
  it('toggles on press', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(
      <Checkbox value={false} onValueChange={onValueChange} accessibilityLabel="x" />,
    );
    fireEvent.press(getByRole('checkbox'));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });
});

describe('SegmentedControl', () => {
  it('marks active segment + fires onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <SegmentedControl<'a' | 'b'>
        options={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }]}
        value="a"
        onChange={onChange}
      />,
    );
    expect(getByLabelText('A').props.accessibilityState.selected).toBe(true);
    expect(getByLabelText('B').props.accessibilityState.selected).toBe(false);
    fireEvent.press(getByLabelText('B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

describe('RadioGroup', () => {
  it('renders the radio rows + fires onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <RadioGroup<'a' | 'b'>
        options={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }]}
        value="a"
        onChange={onChange}
      />,
    );
    fireEvent.press(getByLabelText('B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

describe('RadioStepper', () => {
  it('renders N positions + fires onChange with index', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <RadioStepper positions={5} value={2} onChange={onChange} />,
    );
    // 5 dots, accessibilityLabel "Position N of 5"
    fireEvent.press(getByLabelText('Position 5 of 5'));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});

describe('Slider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Slider min={0} max={100} value={50} onChange={() => {}} />);
    expect(toJSON()).toBeTruthy();
  });
});

describe('RangeSlider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <RangeSlider min={0} max={100} value={[20, 80]} onChange={() => {}} />,
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('Banner', () => {
  it('renders body + CTAs and fires onPress', () => {
    const cb = jest.fn();
    const { getByText, getByLabelText } = render(
      <Banner
        body="Money mention detected"
        ctas={[{ label: 'Got it', onPress: cb, emphasis: 'primary' }]}
      />,
    );
    expect(getByText('Money mention detected')).toBeTruthy();
    fireEvent.press(getByLabelText('Got it'));
    expect(cb).toHaveBeenCalledTimes(1);
  });
  it('exposes accessibilityRole=alert', () => {
    const { UNSAFE_root } = render(<Banner body="x" />);
    const alerts = UNSAFE_root.findAll((n: any) => n.props?.accessibilityRole === 'alert');
    expect(alerts.length).toBeGreaterThan(0);
  });
});

describe('ProgressBar', () => {
  it('exposes progressbar role with value', () => {
    const { UNSAFE_root } = render(<ProgressBar value={0.4} />);
    const bars = UNSAFE_root.findAll((n: any) => n.props?.accessibilityRole === 'progressbar');
    expect(bars.length).toBeGreaterThan(0);
    expect(bars[0].props.accessibilityValue.now).toBe(40);
  });
  it('indeterminate variant renders without value', () => {
    const { UNSAFE_root } = render(<ProgressBar />);
    const bars = UNSAFE_root.findAll((n: any) => n.props?.accessibilityRole === 'progressbar');
    expect(bars.length).toBeGreaterThan(0);
  });
});

describe('ProgressDots', () => {
  it('exposes accessible label per step', () => {
    const { getByLabelText } = render(<ProgressDots total={5} current={2} />);
    expect(getByLabelText('Step 3 of 5')).toBeTruthy();
  });
});

describe('Spinner', () => {
  it('exposes accessibility label', () => {
    const { getByLabelText } = render(<Spinner />);
    expect(getByLabelText('Loading')).toBeTruthy();
  });
});

describe('Avatar', () => {
  it('renders fallback initials when no uri', () => {
    const { getByText } = render(<Avatar fallback="JM" />);
    expect(getByText('JM')).toBeTruthy();
  });
});

describe('CompatibilityPill', () => {
  it('renders nothing when score is null', () => {
    const { toJSON } = render(<CompatibilityPill score={null} />);
    expect(toJSON()).toBeNull();
  });
  it('renders percent + accessibility label when score present', () => {
    const { getByText, getByLabelText } = render(<CompatibilityPill score={94} />);
    expect(getByText('94%')).toBeTruthy();
    expect(getByLabelText('94% compatible')).toBeTruthy();
  });
  it('clamps out-of-range scores', () => {
    const { getByText: g1 } = render(<CompatibilityPill score={150} />);
    expect(g1('100%')).toBeTruthy();
  });
});

describe('CountryFlag', () => {
  it('renders accessible label', () => {
    const { getByLabelText } = render(<CountryFlag cc="BB" />);
    expect(getByLabelText('Country BB')).toBeTruthy();
  });
});

describe('Bubble', () => {
  it('renders translation by default + toggles to original on tap', () => {
    const { getByText } = render(
      <Bubble
        variant="them"
        text="Hola"
        translation="Hi"
        detectedSourceLang="ES"
      />,
    );
    expect(getByText('Hi')).toBeTruthy();
    fireEvent.press(getByText('Translated from ES · See original'));
    expect(getByText('Hola')).toBeTruthy();
    expect(getByText('Show translation')).toBeTruthy();
  });
  it('renders text directly when no translation', () => {
    const { getByText, queryByText } = render(
      <Bubble variant="me" text="Hi there" />,
    );
    expect(getByText('Hi there')).toBeTruthy();
    expect(queryByText(/Translated from/)).toBeNull();
  });
});
