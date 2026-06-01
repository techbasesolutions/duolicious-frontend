/**
 * Phase 6 Task 6.1 — SwipeDeck.
 *
 * Stack of SwipeCards with pan-gesture-driven swipe + spring-back per
 * docs/motion-spec.md "Swipe gesture spec". The Reanimated-worklet rewrite
 * for true 60fps gesture-tracked rotation is a polish pass; this base
 * implementation uses RN Animated + PanResponder which is good enough
 * for substrate validation but doesn't hit the 60fps bar by itself.
 *
 * Card stack visual (per spec):
 *   active card  scale 1.0 / offset 0   / opacity 1
 *   2nd card     scale 0.94 / +8 y      / opacity 0.7
 *   3rd card     scale 0.88 / +16 y     / opacity 0.4
 *   4+ not rendered
 */

import { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  motionDuration,
  swipeGesture,
} from '../../../ahavah-design-tokens/motion';
import { SwipeCard } from './swipe-card';

export type Candidate = {
  id: string;
  photoUri: string;
  name: string;
  age?: number;
  location?: string;
  compatScore?: number | null;
};

type Props = {
  candidates: Candidate[];
  onLike?: (c: Candidate) => void;
  onPass?: (c: Candidate) => void;
  /** Fired when queue length drops below this threshold; caller pre-fetches more */
  prefetchAtRemaining?: number;
  onPrefetch?: () => void;
};

export function SwipeDeck({
  candidates,
  onLike,
  onPass,
  prefetchAtRemaining = 4,
  onPrefetch,
}: Props) {
  const [topIndex, setTopIndex] = useState(0);
  const { width: winW } = useWindowDimensions();
  const cardW = Math.min(winW - 32, 380);
  const cardH = Math.round(cardW * 1.4);

  const tx = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(0)).current;

  const top = candidates[topIndex];
  const second = candidates[topIndex + 1];
  const third = candidates[topIndex + 2];

  const commit = (direction: 'like' | 'pass') => {
    const flyX = direction === 'like' ? winW * 1.5 : -winW * 1.5;
    Animated.timing(tx, {
      toValue: flyX,
      duration: swipeGesture.flyOffDurationMs,
      useNativeDriver: true,
    }).start(() => {
      if (top) (direction === 'like' ? onLike : onPass)?.(top);
      tx.setValue(0); ty.setValue(0);
      const newIdx = topIndex + 1;
      setTopIndex(newIdx);
      const remaining = candidates.length - newIdx;
      if (remaining <= prefetchAtRemaining) onPrefetch?.();
    });
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > 5 || Math.abs(g.dy) > 5,
      onPanResponderMove: Animated.event([null, { dx: tx, dy: ty }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_e, g) => {
        const past = Math.abs(g.dx) > winW * swipeGesture.commitDistancePct;
        const fast = Math.abs(g.vx) * 1000 > swipeGesture.commitVelocityPxs;
        if (past || fast) {
          commit(g.dx > 0 ? 'like' : 'pass');
        } else {
          Animated.parallel([
            Animated.spring(tx, { toValue: 0, useNativeDriver: true, damping: 18, stiffness: 250, mass: 1 }),
            Animated.spring(ty, { toValue: 0, useNativeDriver: true, damping: 18, stiffness: 250, mass: 1 }),
          ]).start();
        }
      },
    }),
  ).current;

  if (!top) return <View />;

  // rotation: max 15° at 50% width
  const rotate = tx.interpolate({
    inputRange: [-winW / 2, 0, winW / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  // LIKE / NOPE overlay opacity ramps
  const likeOverlayOpacity = tx.interpolate({
    inputRange: [winW * swipeGesture.overlayStartPct, winW * swipeGesture.overlayFullPct],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOverlayOpacity = tx.interpolate({
    inputRange: [-winW * swipeGesture.overlayFullPct, -winW * swipeGesture.overlayStartPct],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={{ width: cardW, height: cardH, alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Third (back-most) */}
      {third && (
        <View
          style={{
            position: 'absolute',
            transform: [{ scale: 0.88 }, { translateY: 16 }],
            opacity: 0.4,
          }}
        >
          <SwipeCard {...third} width={cardW} height={cardH} />
        </View>
      )}
      {/* Second */}
      {second && (
        <View
          style={{
            position: 'absolute',
            transform: [{ scale: 0.94 }, { translateY: 8 }],
            opacity: 0.7,
          }}
        >
          <SwipeCard {...second} width={cardW} height={cardH} />
        </View>
      )}
      {/* Active (gesture-tracked) */}
      <Animated.View
        {...responder.panHandlers}
        style={{
          transform: [{ translateX: tx }, { translateY: ty }, { rotate }],
        }}
      >
        <SwipeCard {...top} width={cardW} height={cardH} />
        {/* LIKE overlay (green-ish lime, top-right anchored) */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            opacity: likeOverlayOpacity,
            transform: [{ rotate: '-15deg' }],
            borderWidth: 4,
            borderColor: '#D7FF81',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 6,
          }}
        >
          <Animated.Text
            style={{ color: '#D7FF81', fontFamily: 'PlusJakartaSans_700Bold', fontSize: 32 }}
          >
            LIKE
          </Animated.Text>
        </Animated.View>
        {/* NOPE overlay (pink, top-left anchored) */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            opacity: nopeOverlayOpacity,
            transform: [{ rotate: '15deg' }],
            borderWidth: 4,
            borderColor: '#FF4566',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 6,
          }}
        >
          <Animated.Text
            style={{ color: '#FF4566', fontFamily: 'PlusJakartaSans_700Bold', fontSize: 32 }}
          >
            NOPE
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
