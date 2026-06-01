/**
 * Phase 6 Task 6.1 — Toast.
 *
 * Top-anchored under HeaderBar. Variants: success / info / warning / error.
 * Auto-dismiss 3s for non-error, 5s for error. Swipe-up to dismiss.
 *
 * Usage: render <ToastHost/> at the App root; call `showToast(...)` from
 * anywhere. State is held in module-level event-target.
 */

import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

type ToastSpec = {
  id: number;
  message: string;
  variant: ToastVariant;
};

const VARIANT: Record<ToastVariant, { bg: string; fg: string }> = {
  success: { bg: '#9FE870', fg: '#000000' },
  info:    { bg: '#1A1340', fg: '#FFFFFF' },
  warning: { bg: '#FFC857', fg: '#000000' },
  error:   { bg: '#FF4566', fg: '#FFFFFF' },
};

// Tiny module-scope event bus
type Listener = (t: ToastSpec) => void;
const listeners: Set<Listener> = new Set();
let nextId = 1;

export function showToast(message: string, variant: ToastVariant = 'info') {
  const t: ToastSpec = { id: nextId++, message, variant };
  listeners.forEach((l) => l(t));
}

export function ToastHost() {
  const [current, setCurrent] = useState<ToastSpec | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(-40)).current;

  useEffect(() => {
    const listener: Listener = (t) => setCurrent(t);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  useEffect(() => {
    if (!current) return undefined;
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.timing(ty, { toValue: 0, duration: 250, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
    const dismissAfter = current.variant === 'error' ? 5000 : 3000;
    const t = setTimeout(() => dismiss(), dismissAfter);
    return () => clearTimeout(t);
  }, [current]);

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(ty, { toValue: -40, duration: 150, useNativeDriver: true }),
    ]).start(() => setCurrent(null));
  };

  if (!current) return null;
  const v = VARIANT[current.variant];

  return (
    <SafeAreaView
      edges={['top']}
      pointerEvents="box-none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center' }}
    >
      <Animated.View
        style={{
          marginTop: 8,
          marginHorizontal: 16,
          opacity,
          transform: [{ translateY: ty }],
        }}
      >
        <Pressable
          onPress={dismiss}
          accessibilityRole="alert"
          accessibilityLabel={current.message}
          style={{
            backgroundColor: v.bg,
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Text
            style={{
              color: v.fg,
              fontFamily: 'PlusJakartaSans_500Medium',
              fontSize: 14,
            }}
          >
            {current.message}
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
