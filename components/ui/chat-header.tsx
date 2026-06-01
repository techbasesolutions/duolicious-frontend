/**
 * Phase 6 Task 6.1 — ChatHeader.
 *
 * Per Dateasy image 3 right phone: back arrow / leading avatar / name+age /
 * online indicator / kebab menu. Auto-translate toggle accessible via the
 * kebab (caller wires the menu).
 */

import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from './avatar';
import { Body, Caption } from './typography';

type Props = {
  name: string;
  age?: number;
  online?: boolean;
  avatarUri?: string | null;
  avatarFallback?: string;
  onBack?: () => void;
  onMenu?: () => void;
};

export function ChatHeader({
  name, age, online, avatarUri, avatarFallback, onBack, onMenu,
}: Props) {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#1A1340' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255,255,255,0.08)',
          gap: 10,
        }}
      >
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          style={{
            width: 36, height: 36, borderRadius: 18,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 24, lineHeight: 28 }}>‹</Text>
        </Pressable>

        <Avatar size="sm" uri={avatarUri} fallback={avatarFallback ?? name[0]} />

        <View style={{ flex: 1 }}>
          <Body numberOfLines={1}>
            {name}{age ? `, ${age}` : ''}
          </Body>
          <Caption numberOfLines={1}>
            {online ? 'Online' : 'Last seen recently'}
          </Caption>
        </View>

        <Pressable
          onPress={onMenu}
          accessibilityRole="button"
          accessibilityLabel="More"
          hitSlop={8}
          style={{
            width: 36, height: 36, borderRadius: 18,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>⋯</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
