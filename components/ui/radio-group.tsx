/**
 * Phase 6 Task 6.1 — RadioGroup.
 *
 * Vertical or horizontal stack of radio rows. Selected = lime-filled
 * inner disc; unselected = lavender outline ring. Single-select.
 */

import { Pressable, View } from 'react-native';
import type { ViewProps } from 'react-native';

import { Body } from './typography';

type Option<T extends string = string> = {
  key: T;
  label: string;
  description?: string;
};

type Props<T extends string> = ViewProps & {
  options: Option<T>[];
  value: T | null;
  onChange: (key: T) => void;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
};

export function RadioGroup<T extends string>({
  options,
  value,
  onChange,
  direction = 'vertical',
  disabled = false,
  className,
  ...rest
}: Props<T>) {
  return (
    <View
      {...rest}
      accessibilityRole="radiogroup"
      className={[
        direction === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-3',
        className as string | undefined,
      ].filter(Boolean).join(' ')}
    >
      {options.map((opt) => {
        const isActive = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            onPress={() => !disabled && onChange(opt.key)}
            accessibilityRole="radio"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected: isActive, disabled }}
            disabled={disabled}
            className={[
              'flex-row items-center gap-3 px-3 py-3 rounded-xl',
              'bg-bg-card border border-border',
              isActive ? 'border-lime-500' : '',
              disabled ? 'opacity-40' : '',
            ].filter(Boolean).join(' ')}
            style={{ flex: direction === 'horizontal' ? 1 : undefined }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 1.5,
                borderColor: isActive ? '#D7FF81' : '#BC96FF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isActive && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: '#D7FF81',
                  }}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Body>{opt.label}</Body>
              {!!opt.description && (
                <Body size="xs" tone="secondary" style={{ marginTop: 2 }}>
                  {opt.description}
                </Body>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
