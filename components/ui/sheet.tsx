/**
 * Phase 6 Task 6.1 — Sheet (bottom sheet).
 *
 * Used by CountryPicker, LanguagePicker, filters drawer. Slides up from
 * bottom over an indigo backdrop. Swipe-down dismiss is gesture-driven —
 * for now the dismiss is a tap on the backdrop or X close (gesture is a
 * polish-pass enhancement once react-native-gesture-handler is wired).
 *
 * Closes via `onClose` callback. Caller controls `visible` state.
 */

import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal as RNModal,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import type { ReactNode } from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Sheet snaps to this fraction of screen height (0..1). Default 0.6 */
  snap?: number;
};

export function Sheet({ visible, onClose, children, snap = 0.6 }: Props) {
  const { height } = useWindowDimensions();
  const sheetH = Math.round(height * snap);
  const ty = useRef(new Animated.Value(sheetH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(ty, {
        toValue: visible ? 0 : sheetH,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: visible ? 0.55 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, sheetH]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        {/* Backdrop */}
        <Animated.View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            opacity: backdropOpacity,
          }}
        >
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close sheet"
            style={{ flex: 1 }}
          />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: sheetH,
            backgroundColor: '#0F0B1F',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            overflow: 'hidden',
            transform: [{ translateY: ty }],
          }}
        >
          {/* Drag handle */}
          <View style={{ alignItems: 'center', paddingTop: 8 }}>
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.25)',
              }}
            />
          </View>
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
}
