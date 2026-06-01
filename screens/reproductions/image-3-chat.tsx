/**
 * Reproduction of Dateasy reference image 3 — chat module.
 *
 * Three phone mockups side-by-side:
 *   LEFT  — chat list (StoryRing carousel + ChatListRow stack + BottomNavBar)
 *   RIGHT — chat thread (ChatHeader + bubble exchange + photo grid + voice
 *           message + ChatInput)
 */

import { Pressable, Text, View } from 'react-native';

import { Avatar } from '../../components/ui/avatar';
import { StoryRing } from '../../components/ui/story-ring';
import { ChatListRow } from '../../components/ui/chat-list-row';
import { Bubble, ImageBubble } from '../../components/ui/bubble';
import { VoiceMessage } from '../../components/ui/voice-message';
import { Body, Caption, Heading } from '../../components/ui/typography';
import { BottomNavBar, DEFAULT_NAV_TABS } from '../../components/ui/bottom-nav-bar';
import { PhoneFrame } from '../../components/ui/phone-frame';

export function Image3Chat() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}
    >
      <ChatListPhone />
      <ChatThreadPhone />
    </View>
  );
}

function ChatListPhone() {
  return (
    <PhoneFrame width={280} height={600} canvasColor="#3018A8">
      <View style={{ paddingHorizontal: 12, paddingTop: 8 }}>
        <Heading level="h2" style={{ color: '#FFF' }}>Chat</Heading>
      </View>

      {/* Story row */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: 44, height: 44,
              borderRadius: 22,
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: '#BC96FF',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#BC96FF', fontSize: 22 }}>+</Text>
          </View>
        </View>
        <StoryRing variant="unread" size="sm" fallback="A" />
        <StoryRing variant="online" size="sm" fallback="B" />
        <StoryRing variant="unread" size="sm" fallback="C" />
        <StoryRing variant="none"   size="sm" fallback="D" />
        <StoryRing variant="none"   size="sm" fallback="E" />
      </View>

      {/* Chat list */}
      <View style={{ flex: 1 }}>
        <ChatListRow
          name="Lucy" age={22}
          lastMessage="Say hi!"
          timestamp="9:41"
          unread={2}
          ringVariant="unread"
        />
        <ChatListRow
          name="Margareth" age={21}
          lastMessage="Photo"
          timestamp="9:30"
          ringVariant="online"
        />
        <ChatListRow
          name="Emily" age={27}
          lastMessage="Hey, how are you?"
          timestamp="Yest."
        />
        <ChatListRow
          name="Alissia" age={20}
          lastMessage="is typing…"
          timestamp="Yest."
          ringVariant="online"
        />
        <ChatListRow
          name="Stephanie" age={19}
          lastMessage="It's me with my friends"
          timestamp="2d"
        />
      </View>

      {/* Bottom nav */}
      <View style={{ paddingBottom: 4 }}>
        <View style={{ alignSelf: 'center' }}>
          <BottomNavBar
            tabs={DEFAULT_NAV_TABS}
            activeKey="inbox"
            onTabPress={() => {}}
          />
        </View>
      </View>
    </PhoneFrame>
  );
}

function ChatThreadPhone() {
  return (
    <PhoneFrame width={280} height={600} canvasColor="#3018A8">
      {/* Header — back / avatar / name+age / kebab */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 8,
          gap: 8,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <Pressable hitSlop={8}>
          <Text style={{ color: '#FFF', fontSize: 20 }}>‹</Text>
        </Pressable>
        <Avatar size="sm" fallback="M" />
        <View style={{ flex: 1 }}>
          <Body style={{ color: '#FFF', fontSize: 13 }}>Mary, 23</Body>
          <Caption style={{ color: '#9FE870', fontSize: 10 }}>Online</Caption>
        </View>
        <Text style={{ color: '#FFF', fontSize: 18 }}>⋯</Text>
      </View>

      {/* Bubbles */}
      <View style={{ flex: 1, paddingVertical: 8 }}>
        <Bubble
          variant="them"
          showAvatar
          avatarFallback="M"
          text="Hi! How's everything with you? Did you get home safely yesterday?"
        />
        <Bubble
          variant="me"
          text="Yeah, absolutely, thanks for asking! I was thinking, it would be great to catch up at some point next week 😊 Here are some photos we took yesterday."
        />
        <ImageBubble
          variant="me"
          uris={[
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=70',
            'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=200&q=70',
          ]}
        />
        <VoiceMessage durationSec={13} variant="them" />
      </View>

      {/* Input */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 8,
          paddingVertical: 6,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <Text style={{ color: '#BC96FF', fontSize: 14 }}>📎</Text>
        <View
          style={{
            flex: 1,
            backgroundColor: '#1A1340',
            borderRadius: 16,
            paddingHorizontal: 10,
            paddingVertical: 6,
          }}
        >
          <Caption style={{ color: '#7A7596', fontSize: 11 }}>Type something…</Caption>
        </View>
        <Text style={{ color: '#BC96FF', fontSize: 16 }}>➤</Text>
      </View>
    </PhoneFrame>
  );
}
