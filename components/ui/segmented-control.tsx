/**
 * Phase 6 Task 6.1 — SegmentedControl.
 *
 * Per Dateasy image 12 filters drawer "Show me: Men / Women / All" — pill
 * row with one segment lime-filled (single-select). Used for binary/ternary
 * choices.
 */

import { Pressable, Text, View } from 'react-native';
import type { ViewProps } from 'react-native';

export type SegmentOption<T extends string = string> = {
  key: T;
  label: string;
};

type Props<T extends string> = ViewProps & {
  options: SegmentOption<T>[];
  value: T;
  onChange: (key: T) => void;
  disabled?: boolean;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  disabled = false,
  className,
  ...rest
}: Props<T>) {
  return (
    <View
      {...rest}
      className={[
        'flex-row gap-2',
        className as string | undefined,
      ].filter(Boolean).join(' ')}
    >
      {options.map((opt) => {
        const isActive = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            onPress={() => !disabled && onChange(opt.key)}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ selected: isActive, disabled }}
            disabled={disabled}
            className={[
              'flex-1 flex-row items-center justify-center',
              'h-10 px-4 rounded-md',
              isActive
                ? 'bg-lime-500 border border-lime-500'
                : 'bg-transparent border border-lavender-500',
              disabled ? 'opacity-40' : '',
            ].filter(Boolean).join(' ')}
          >
            <Text
              className={[
                'font-sans text-sm',
                isActive ? 'text-black' : 'text-lavender-500',
              ].join(' ')}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
