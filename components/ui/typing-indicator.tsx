/**
 * Phase 6 Task 6.1 — TypingIndicator.
 *
 * Three lavender dots, staggered bounce. Shown inside a Bubble shell
 * when the other party is typing (caller mounts/unmounts based on
 * presence events from the chat WS).
 */

import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const DOT_SIZE = 8;

export function TypingIndicator() {
  const dots = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  useEffect(() => {
    const animations = dots.map((d, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(d, { toValue: -4, duration: 250, useNativeDriver: true }),
          Animated.timing(d, { toValue: 0, duration: 250, useNativeDriver: true }),
          Animated.delay(450 - i * 150),
        ]),
      ),
    );
    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, []);

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        marginVertical: 4,
        marginHorizontal: 12 + 32 + 8,   // align with them-bubbles past avatar gutter
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 18,
        borderBottomLeftRadius: 4,
        backgroundColor: '#BC96FF',
        flexDirection: 'row',
        gap: 4,
      }}
      accessibilityLabel="Typing"
    >
      {dots.map((d, i) => (
        <Animated.View
          key={i}
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: DOT_SIZE / 2,
            backgroundColor: '#000000',
            transform: [{ translateY: d }],
          }}
        />
      ))}
    </View>
  );
}
