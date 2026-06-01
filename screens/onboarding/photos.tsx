/**
 * Phase 6 Task 6.2 A11 — Photos.
 *
 * Up to 6 slots, drag-to-reorder (deferred — uses simple grid for now),
 * tap-to-replace. First slot is required. Photo moderation pending state
 * (Task 4.0) shown inline as "Verifying…" overlay.
 */

import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { Body, Caption, Heading } from '../../components/ui/typography';
import { PillButton } from '../../components/ui/pill';
import { HeaderBar, HeaderBarButton } from '../../components/ui/header-bar';
import { Spinner } from '../../components/ui/spinner';

type Slot = {
  status: 'empty' | 'pending' | 'approved' | 'rejected';
  uri?: string;
};

type Props = {
  slots?: Slot[];
  onAddPhoto?: (slotIndex: number) => void;
  onReplacePhoto?: (slotIndex: number) => void;
  onContinue?: () => void;
  onBack?: () => void;
  loading?: boolean;
};

const DEFAULT_SLOTS: Slot[] = Array.from({ length: 6 }, () => ({ status: 'empty' }));

export function OnboardingPhotos({
  slots = DEFAULT_SLOTS,
  onAddPhoto,
  onReplacePhoto,
  onContinue,
  onBack,
  loading,
}: Props) {
  const filled = slots.filter((s) => s.status === 'approved').length;
  const canContinue = filled >= 1;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <HeaderBar
        title="Photos"
        leading={<HeaderBarButton accessibilityLabel="Back" onPress={onBack}>‹</HeaderBarButton>}
      />
      <View style={{ flex: 1, padding: 20, gap: 16 }}>
        <View style={{ gap: 4 }}>
          <Heading level="h2">Add a few photos</Heading>
          <Body tone="secondary">Your first photo is what people see in the deck.</Body>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'space-between',
          }}
        >
          {slots.map((slot, i) => (
            <PhotoSlot
              key={i}
              slot={slot}
              required={i === 0}
              onPress={() =>
                slot.status === 'empty'
                  ? onAddPhoto?.(i)
                  : onReplacePhoto?.(i)}
            />
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <PillButton
          disabled={!canContinue}
          loading={loading}
          onPress={onContinue}
        >
          Continue
        </PillButton>
      </View>
    </SafeAreaView>
  );
}

function PhotoSlot({
  slot, required, onPress,
}: { slot: Slot; required: boolean; onPress: () => void }) {
  const empty = slot.status === 'empty';
  const pending = slot.status === 'pending';
  const rejected = slot.status === 'rejected';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={empty ? 'Add photo' : 'Replace photo'}
      style={{
        width: '31%',
        aspectRatio: 3 / 4,
        borderRadius: 16,
        backgroundColor: '#1A1340',
        borderWidth: empty ? 1.5 : 0,
        borderStyle: empty ? 'dashed' : 'solid',
        borderColor: rejected ? '#FF4566' : '#BC96FF',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!empty && slot.uri && (
        <Image
          source={{ uri: slot.uri }}
          contentFit="cover"
          style={{ position: 'absolute', inset: 0 }}
        />
      )}
      {empty && (
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Body size="lg" style={{ color: '#BC96FF' }}>+</Body>
          {required && <Caption>Required</Caption>}
        </View>
      )}
      {pending && (
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Spinner size="sm" />
          <Caption>Verifying…</Caption>
        </View>
      )}
      {rejected && (
        <View
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            padding: 6,
            backgroundColor: '#FF4566',
            alignItems: 'center',
          }}
        >
          <Caption style={{ color: '#FFFFFF', fontSize: 10 }}>Rejected</Caption>
        </View>
      )}
    </Pressable>
  );
}
