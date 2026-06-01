/**
 * Phase 6 Task 6.1 — Select.
 *
 * Single-select dropdown for less-common cases where a Sheet picker is
 * overkill (e.g. settings → "Language for translation"). Filled-indigo
 * trigger styled like TextInput; opens an inline list below.
 *
 * For long lists or sheets-with-search, use CountryPicker / LanguagePicker
 * (Sheet-driven) instead.
 */

import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Body, Caption } from './typography';

type Option<T extends string = string> = { key: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T | null;
  onChange: (key: T) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function Select<T extends string>({
  options,
  value,
  onChange,
  label,
  placeholder = 'Choose…',
  disabled = false,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.key === value) ?? null;

  return (
    <View>
      {!!label && <Caption style={{ marginBottom: 4 }}>{label}</Caption>}

      <Pressable
        onPress={() => !disabled && setOpen((o) => !o)}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        accessibilityState={{ expanded: open, disabled }}
        disabled={disabled}
        className={[
          'flex-row items-center bg-bg-card rounded-xl border border-border',
          'h-14 px-4',
          disabled ? 'opacity-40' : '',
        ].filter(Boolean).join(' ')}
      >
        <View style={{ flex: 1 }}>
          {current
            ? <Body>{current.label}</Body>
            : <Body tone="muted">{placeholder}</Body>}
        </View>
        <Text style={{ color: '#B5B0CC', fontSize: 14 }}>{open ? '▴' : '▾'}</Text>
      </Pressable>

      {open && (
        <View
          className="bg-bg-card rounded-xl mt-2 border border-border"
          style={{ overflow: 'hidden' }}
        >
          {options.map((opt) => (
            <Pressable
              key={opt.key}
              onPress={() => { onChange(opt.key); setOpen(false); }}
              accessibilityRole="button"
              className={[
                'px-4 py-3 active:bg-bg-elevated',
                opt.key === value ? 'bg-bg-elevated' : '',
              ].filter(Boolean).join(' ')}
            >
              <Body>{opt.label}</Body>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
