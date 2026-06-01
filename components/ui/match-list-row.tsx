/**
 * Phase 6 Task 6.1 — MatchListRow.
 *
 * Variant of ChatListRow for the matches/inbox tab when separate from
 * active chats. Photo-card row (avatar+name+age+optional CompatibilityPill);
 * no last-message line. Used in B2/Matches tab as the cell type.
 */

import { Pressable, View } from 'react-native';

import { Avatar } from './avatar';
import { CompatibilityPill } from './compatibility-pill';
import { Body, Caption } from './typography';

type Props = {
  name: string;
  age?: number;
  location?: string;
  avatarUri?: string | null;
  avatarFallback?: string;
  blurhash?: string;
  compatScore?: number | null;
  isNew?: boolean;
  onPress?: () => void;
};

export function MatchListRow({
  name, age, location, avatarUri, avatarFallback, blurhash, compatScore, isNew, onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Match ${name}`}
      className="flex-row items-center gap-3 px-4 py-3 active:bg-bg-elevated"
    >
      <Avatar
        size="lg"
        uri={avatarUri}
        fallback={avatarFallback ?? name[0]}
        blurhash={blurhash}
      />
      <View style={{ flex: 1 }}>
        <Body numberOfLines={1}>{name}{age ? `, ${age}` : ''}</Body>
        {!!location && (
          <Caption numberOfLines={1} style={{ marginTop: 2 }}>📍 {location}</Caption>
        )}
      </View>
      {compatScore != null && <CompatibilityPill score={compatScore} size="sm" />}
      {isNew && (
        <View
          style={{
            marginLeft: 8,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: '#D7FF81',
            borderRadius: 10,
          }}
        >
          <Caption style={{ color: '#000', fontSize: 10 }}>NEW</Caption>
        </View>
      )}
    </Pressable>
  );
}
