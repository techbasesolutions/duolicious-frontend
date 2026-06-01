/**
 * Phone-frame mockup wrapper.
 *
 * Used by Phase 6 Task 6.2 reproductions of kit images 12, 3, 6, 14, 5
 * etc. — wraps screen-sized content in an iPhone-style bezel + notch +
 * faux status bar so the in-app surfaces visually read as "phone screens"
 * rather than full-bleed sections.
 *
 * Sized 280×600 by default (matches the kit's editorial phone mockups).
 */

import { Text, View } from 'react-native';
import type { ReactNode } from 'react';

type Props = {
  width?: number;
  height?: number;
  /** Content rendered inside the device bezel. Uses the device width. */
  children: ReactNode;
  /** Optional fake time displayed in the status bar */
  time?: string;
  /** Color of the inside-screen canvas surrounding children */
  canvasColor?: string;
};

export function PhoneFrame({
  width = 280,
  height = 600,
  time = '9:41',
  canvasColor = '#1A1340',
  children,
}: Props) {
  const bezelW = 6;
  const innerW = width - bezelW * 2;
  const innerH = height - bezelW * 2;

  return (
    <View
      style={{
        width,
        height,
        borderRadius: 36,
        backgroundColor: '#000000',
        padding: bezelW,
        // outer ring (silver bezel highlight)
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.10)',
        // soft shadow underneath
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <View
        style={{
          width: innerW,
          height: innerH,
          borderRadius: 30,
          overflow: 'hidden',
          backgroundColor: canvasColor,
        }}
      >
        {/* Status bar */}
        <View
          style={{
            height: 28,
            paddingHorizontal: 16,
            paddingTop: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: canvasColor,
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 11,
              fontFamily: 'PlusJakartaSans_700Bold',
              fontVariant: ['tabular-nums'],
            }}
          >
            {time}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 9 }}>●●●</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 9 }}>📶</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 9 }}>🔋</Text>
          </View>
        </View>
        {/* Notch */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 4,
            alignSelf: 'center',
            left: '32%',
            right: '32%',
            height: 18,
            backgroundColor: '#000000',
            borderRadius: 12,
          }}
        />

        {/* Content */}
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </View>
  );
}
