/**
 * Phase 6 Task 6.1 — SwipeCard (visual cell only — no gesture).
 *
 * Per Dateasy image 12 left phone: photo fills, gradient bottom-40% for
 * caption legibility, CompatPill top-right at 12 inset, name+age caption
 * + location at bottom-left padded 24, white text + drop shadow over the
 * photo.
 *
 * SwipeDeck (next file) handles gesture + stack composition. SwipeCard
 * is the dumb cell — render whatever the deck hands it.
 */

import { ImageBackground, Text, View } from 'react-native';

import { CompatibilityPill } from './compatibility-pill';

type Props = {
  photoUri: string;
  name: string;
  age?: number;
  location?: string;
  compatScore?: number | null;
  width?: number;
  height?: number;
};

export function SwipeCard({
  photoUri, name, age, location, compatScore, width, height,
}: Props) {
  return (
    <View
      style={{
        width,
        height,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#1A1340',
      }}
    >
      <ImageBackground
        source={{ uri: photoUri }}
        style={{ flex: 1, justifyContent: 'flex-end' }}
        imageStyle={{ borderRadius: 24 }}
      >
        {/* CompatibilityPill top-right at 12 inset */}
        {compatScore != null && (
          <View style={{ position: 'absolute', top: 12, right: 12 }}>
            <CompatibilityPill score={compatScore} size="md" />
          </View>
        )}

        {/* Caption (name + age + location), bottom-left padded 24, gradient backdrop */}
        <View
          style={{
            padding: 24,
            // Gradient simulated with stacked semi-transparent View;
            // expo-linear-gradient swap is a polish-pass enhancement.
            backgroundColor: 'rgba(0,0,0,0.55)',
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 24,
              fontFamily: 'PlusJakartaSans_700Bold',
              textShadowColor: 'rgba(0,0,0,0.4)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          >
            {name}{age ? `, ${age}` : ''}
          </Text>
          {!!location && (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                marginTop: 4,
                opacity: 0.85,
              }}
            >
              📍 {location}
            </Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
