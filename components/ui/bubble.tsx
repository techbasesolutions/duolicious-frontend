/**
 * Phase 6 Task 6.1 — Bubble (chat message).
 *
 * Per Dateasy image 3 right phone:
 *   me     lime fill, dark text, bottom-right tail-lite
 *   them   lavender fill, dark text, bottom-left tail-lite, optional avatar
 *   voice  lime play button + waveform + duration  (use VoiceMessage)
 *   image  1-4 image grid with 12px gap, radius 16
 *   sticker callout pill (use StickerCallout)
 *
 * Translation toggle (Phase 2 Task 2.3) lives inside this atom — when
 * `translation` + `detectedSource` are present, render a small "Translated
 * from XX · See original" footer that toggles to the original on tap.
 */

import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Avatar } from './avatar';

type Variant = 'me' | 'them';

type Props = {
  variant: Variant;
  text: string;
  /** When provided + auto-translate is on, render the translated text by default. */
  translation?: string;
  detectedSourceLang?: string | null;
  /** them-only: leading avatar URI + fallback (only on first of run) */
  showAvatar?: boolean;
  avatarUri?: string | null;
  avatarFallback?: string;
};

export function Bubble({
  variant, text, translation, detectedSourceLang,
  showAvatar, avatarUri, avatarFallback,
}: Props) {
  const [showOriginal, setShowOriginal] = useState(false);
  const isMe = variant === 'me';
  const display = (showOriginal || !translation) ? text : translation;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        marginVertical: 4,
        paddingHorizontal: 12,
      }}
    >
      {/* Avatar (them-only, on first of run) */}
      {!isMe && showAvatar && (
        <Avatar
          uri={avatarUri}
          fallback={avatarFallback}
          size="sm"
        />
      )}
      {!isMe && !showAvatar && <View style={{ width: 32, marginRight: 8 }} />}

      <View
        style={{
          maxWidth: '78%',
          marginLeft: isMe ? 0 : 8,
          borderRadius: 18,
          // tail-lite: round one bottom corner less
          borderBottomLeftRadius: isMe ? 18 : 4,
          borderBottomRightRadius: isMe ? 4 : 18,
          paddingHorizontal: 14,
          paddingVertical: 10,
          backgroundColor: isMe ? '#D7FF81' : '#BC96FF',
        }}
      >
        <Text
          style={{
            color: '#000000',
            fontSize: 15,
            fontFamily: 'PlusJakartaSans_400Regular',
          }}
        >
          {display}
        </Text>

        {translation && (
          <Pressable
            onPress={() => setShowOriginal((s) => !s)}
            accessibilityRole="button"
            hitSlop={4}
          >
            <Text
              style={{
                fontSize: 11,
                marginTop: 4,
                color: 'rgba(0,0,0,0.55)',
                fontFamily: 'PlusJakartaSans_400Regular',
              }}
            >
              {showOriginal
                ? 'Show translation'
                : `Translated from ${detectedSourceLang ?? 'auto'} · See original`}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// ImageBubble — variant for 1-4 photo grid
// ---------------------------------------------------------------------------

type ImageBubbleProps = {
  variant: Variant;
  uris: string[];
};

export function ImageBubble({ variant, uris }: ImageBubbleProps) {
  const isMe = variant === 'me';
  const limited = uris.slice(0, 4);
  const isGrid = limited.length > 1;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        marginVertical: 4,
        paddingHorizontal: 12,
      }}
    >
      <View
        style={{
          maxWidth: '78%',
          borderRadius: 18,
          overflow: 'hidden',
          backgroundColor: isMe ? '#D7FF81' : '#BC96FF',
          padding: isGrid ? 4 : 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
            width: isGrid ? 220 : undefined,
          }}
        >
          {limited.map((uri, i) => (
            <Image
              key={i}
              source={{ uri }}
              style={{
                width: isGrid ? 108 : 220,
                height: isGrid ? 108 : 220,
                borderRadius: 12,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
