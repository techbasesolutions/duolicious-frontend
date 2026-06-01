/**
 * Phase 6 Task 6.1 — Modal (full-screen).
 *
 * Used for paywall, match-screen, photo-viewer. Fades in over a dark
 * backdrop. Caller controls `visible`.
 */

import { useEffect, useRef } from 'react';
import {
  Animated,
  Modal as RNModal,
  Pressable,
  View,
} from 'react-native';
import type { ReactNode } from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Tap-on-backdrop closes (default true). Disable for critical-action modals. */
  closeOnBackdrop?: boolean;
};

export function Modal({
  visible,
  onClose,
  children,
  closeOnBackdrop = true,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity,
          backgroundColor: 'rgba(0,0,0,0.85)',
        }}
      >
        {closeOnBackdrop && (
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={{ position: 'absolute', inset: 0 }}
          />
        )}
        <View style={{ flex: 1 }} pointerEvents="box-none">
          {children}
        </View>
      </Animated.View>
    </RNModal>
  );
}
