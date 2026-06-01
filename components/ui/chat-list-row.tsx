/**
 * Phase 6 Task 6.1 — ChatListRow.
 *
 * Per Dateasy image 3 (chat list): StoryRing avatar, name+age Heading,
 * last-message preview Body, timestamp Caption, unread Badge as small
 * lime pill. Long-press → action menu (mute/archive/report) — wired by
 * caller via onLongPress.
 */

import { Pressable, Text, View } from 'react-native';

import { StoryRing } from './story-ring';
import { Body, Caption } from './typography';

type Props = {
  name: string;
  age?: number;
  lastMessage: string;
  timestamp?: string;
  unread?: number;            // count of unread messages, 0 → no badge
  ringVariant?: 'none' | 'unread' | 'online';
  avatarUri?: string | null;
  avatarFallback?: string;
  blurhash?: string;
  /** Show small ⇄ glyph indicating the message was translated */
  translated?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

export function ChatListRow({
  name, age, lastMessage, timestamp, unread = 0,
  ringVariant = 'none',
  avatarUri, avatarFallback, blurhash,
  translated, onPress, onLongPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`Chat with ${name}`}
      className="flex-row items-center gap-3 px-4 py-3 active:bg-bg-elevated"
    >
      <StoryRing
        size="md"
        variant={ringVariant}
        uri={avatarUri}
        fallback={avatarFallback ?? name[0]}
        blurhash={blurhash}
      />
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Body numberOfLines={1} style={{ flex: 1 }}>
            {name}{age ? `, ${age}` : ''}
          </Body>
          {!!timestamp && (
            <Caption style={{ marginLeft: 8 }}>{timestamp}</Caption>
          )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          {translated && (
            <Text style={{ color: '#BC96FF', fontSize: 12, marginRight: 4 }}>⇄</Text>
          )}
          <Body
            size="sm"
            tone={unread > 0 ? 'primary' : 'secondary'}
            style={{ flex: 1 }}
            numberOfLines={1}
          >
            {lastMessage}
          </Body>
          {unread > 0 && (
            <View
              style={{
                marginLeft: 8,
                minWidth: 20,
                height: 20,
                borderRadius: 10,
                paddingHorizontal: 6,
                backgroundColor: '#D7FF81',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: '#000000',
                  fontSize: 11,
                  fontFamily: 'PlusJakartaSans_700Bold',
                  fontVariant: ['tabular-nums'],
                }}
              >
                {unread > 99 ? '99+' : unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
