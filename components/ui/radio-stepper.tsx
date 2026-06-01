/**
 * Phase 6 Task 6.1 — RadioStepper.
 *
 * Per Dateasy reference image 5 (personality-test screen): 5 hollow
 * circles in a horizontal row. Selected = lime-filled center disc;
 * unselected = 1.5px indigo outline. Used in onboarding A16 personality
 * stepper, one question per screen.
 *
 * Caller controls labels (e.g. "Disagree" / "Neutral" / "Agree" anchors)
 * via the `labels` prop; the component renders the dots only.
 */

import { Pressable, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { Caption } from './typography';

type Props = {
  positions?: number;          // default 5
  value: number | null;        // 0-indexed; null = nothing selected
  onChange: (idx: number) => void;
  disabled?: boolean;
  /** Optional labels under positions, e.g. ['Disagree', '', '', '', 'Agree'] */
  labels?: string[];
};

export function RadioStepper({
  positions = 5,
  value,
  onChange,
  disabled = false,
  labels,
}: Props) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        {Array.from({ length: positions }).map((_, i) => (
          <RadioStepperDot
            key={i}
            active={value === i}
            onPress={() => !disabled && onChange(i)}
            disabled={disabled}
            index={i}
            total={positions}
          />
        ))}
      </View>
      {labels && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          {labels.slice(0, positions).map((l, i) => (
            <Caption key={i} style={{ flex: 1, textAlign: i === 0 ? 'left' : i === positions - 1 ? 'right' : 'center' }}>
              {l}
            </Caption>
          ))}
        </View>
      )}
    </View>
  );
}

function RadioStepperDot({
  active, onPress, disabled, index, total,
}: { active: boolean; onPress: () => void; disabled: boolean; index: number; total: number }) {
  const fill = useRef(new Animated.Value(active ? 1 : 0)).current;
  // Ends are larger (anchors), middle smaller — matches Dateasy reference.
  const isEnd = index === 0 || index === total - 1;
  const outerSize = isEnd ? 36 : 28;
  const innerSize = isEnd ? 18 : 14;

  useEffect(() => {
    Animated.timing(fill, {
      toValue: active ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={`Position ${index + 1} of ${total}`}
      accessibilityState={{ selected: active, disabled }}
      disabled={disabled}
      hitSlop={8}
      style={{
        width: outerSize,
        height: outerSize,
        borderRadius: outerSize / 2,
        borderWidth: 1.5,
        borderColor: active ? '#D7FF81' : '#5524F5',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Animated.View
        style={{
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize / 2,
          backgroundColor: '#D7FF81',
          opacity: fill,
          transform: [{ scale: fill }],
        }}
      />
    </Pressable>
  );
}
