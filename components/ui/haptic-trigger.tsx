/**
 * Phase 6 Task 6.1 + Phase D Task D.4 — HapticTrigger.
 *
 * Invisible utility wrapper. Wraps any pressable child and fires the
 * configured haptic on press. Centralizing haptic dispatch in this atom
 * keeps business-logic code free of `Haptics.impactAsync(...)` calls and
 * lets us swap the underlying lib (expo-haptics → react-native-haptic-feedback)
 * in one place.
 *
 * Usage:
 *   <HapticTrigger type="impactMedium">
 *     <PillButton>Continue</PillButton>
 *   </HapticTrigger>
 *
 * Per docs/haptic-sound-spec.md mapping. The `type` prop is a thin enum
 * over expo-haptics' API; web is a no-op.
 */

import { Platform, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import type { ReactElement } from 'react';
import { cloneElement, isValidElement } from 'react';

export type HapticType =
  | 'selection'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError';

type Props = {
  type: HapticType;
  children: ReactElement;
  disabled?: boolean;
};

export function HapticTrigger({ type, children, disabled }: Props) {
  if (!isValidElement(children)) return children;

  const fire = () => {
    if (disabled) return;
    if (Platform.OS === 'web') return;   // expo-haptics is a no-op on web; skip the call
    switch (type) {
      case 'selection':
        Haptics.selectionAsync();
        return;
      case 'impactLight':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        return;
      case 'impactMedium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        return;
      case 'impactHeavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        return;
      case 'notificationSuccess':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return;
      case 'notificationWarning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        return;
      case 'notificationError':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        return;
    }
  };

  // Compose: chain to the child's existing onPress if any.
  const childProps = (children.props as { onPress?: (...a: any[]) => void });
  const wrappedOnPress = (...args: any[]) => {
    fire();
    childProps?.onPress?.(...args);
  };

  return cloneElement(children, { onPress: wrappedOnPress } as any);
}
