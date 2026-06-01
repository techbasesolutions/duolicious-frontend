/**
 * Phase 6 Task 6.1 — PhoneInput.
 *
 * Country-code selector + masked numeric input. E.164 validation on blur.
 * Country-code picker uses the existing CountryPicker Sheet; for now the
 * dial-code list is a small inline map covering the launch wedge — full
 * E.164 dial-code library is a Phase 6 polish-pass extraction.
 */

import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { TextInput } from './text-input';
import { Caption } from './typography';

// Caribbean diaspora launch wedge first; common Western markets after.
// Full dial-code list extraction is a separate task (D.6 asset pipeline
// covers the larger libphonenumber asset budget).
const DIAL_CODES: { cc: string; code: string; flag: string }[] = [
  { cc: 'BB', code: '+1246', flag: '🇧🇧' },
  { cc: 'TT', code: '+1868', flag: '🇹🇹' },
  { cc: 'JM', code: '+1876', flag: '🇯🇲' },
  { cc: 'GY', code: '+592',  flag: '🇬🇾' },
  { cc: 'US', code: '+1',    flag: '🇺🇸' },
  { cc: 'CA', code: '+1',    flag: '🇨🇦' },
  { cc: 'GB', code: '+44',   flag: '🇬🇧' },
  { cc: 'IL', code: '+972',  flag: '🇮🇱' },
];

type Props = {
  value?: string;                 // E.164 (e.g. +12465551234)
  onChange?: (e164: string) => void;
  defaultCountry?: string;        // ISO-2
  label?: string;
  error?: string;
};

export function PhoneInput({
  value,
  onChange,
  defaultCountry = 'BB',
  label,
  error,
}: Props) {
  const initialDial = DIAL_CODES.find((d) => d.cc === defaultCountry) ?? DIAL_CODES[0];
  const [dial, setDial] = useState(initialDial);
  const [local, setLocal] = useState(stripDial(value, initialDial.code));
  const [pickerOpen, setPickerOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  const e164 = `${dial.code}${local.replace(/\D/g, '')}`;
  const valid = isValidE164(e164);

  const setLocalAndEmit = (v: string) => {
    setLocal(v);
    onChange?.(`${dial.code}${v.replace(/\D/g, '')}`);
  };

  const setDialAndEmit = (next: typeof dial) => {
    setDial(next);
    setPickerOpen(false);
    onChange?.(`${next.code}${local.replace(/\D/g, '')}`);
  };

  return (
    <View>
      {!!label && <Caption style={{ marginBottom: 4 }}>{label}</Caption>}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {/* Dial-code selector */}
        <Pressable
          onPress={() => setPickerOpen((o) => !o)}
          accessibilityRole="button"
          accessibilityLabel={`Country code ${dial.cc}`}
          className={[
            'flex-row items-center gap-2 px-3',
            'bg-bg-card rounded-xl h-14 border border-border',
          ].join(' ')}
        >
          <Text style={{ fontSize: 18 }}>{dial.flag}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 14 }}>{dial.code}</Text>
          <Text style={{ color: '#B5B0CC', fontSize: 12 }}>▾</Text>
        </Pressable>

        {/* Number input */}
        <View style={{ flex: 1 }}>
          <TextInput
            value={local}
            onChangeText={setLocalAndEmit}
            onBlur={() => setTouched(true)}
            keyboardType="phone-pad"
            placeholder="555 123 4567"
            error={touched && !valid && local.length > 0 ? 'Phone number doesn’t look valid' : error}
          />
        </View>
      </View>

      {/* Inline picker dropdown — ultra-minimal, no Sheet for dev */}
      {pickerOpen && (
        <View
          className="bg-bg-card rounded-xl mt-2 p-2 border border-border"
        >
          {DIAL_CODES.map((d) => (
            <Pressable
              key={d.cc + d.code}
              onPress={() => setDialAndEmit(d)}
              accessibilityRole="button"
              className="flex-row items-center gap-2 p-2 active:bg-bg-elevated rounded-lg"
            >
              <Text style={{ fontSize: 18 }}>{d.flag}</Text>
              <Text style={{ color: '#FFFFFF', fontSize: 14, flex: 1 }}>{d.cc}</Text>
              <Text style={{ color: '#B5B0CC', fontSize: 14 }}>{d.code}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

function stripDial(e164: string | undefined, dialCode: string): string {
  if (!e164) return '';
  return e164.startsWith(dialCode) ? e164.slice(dialCode.length) : '';
}

function isValidE164(e164: string): boolean {
  // Loose: + then 8-15 digits per E.164.
  return /^\+\d{8,15}$/.test(e164);
}
