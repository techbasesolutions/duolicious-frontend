/**
 * Smoke test for the test harness — exercises:
 *   - that jest + ts-jest pick up TypeScript test files
 *   - that the slider-scales util (Task 0.3a's renamed math) works
 *   - that the global jest-setup mocks load without error
 */

import { LINEAR_SCALE, LOGARITHMIC_SCALE } from '../slider-scales';

describe('slider-scales (Task 0.3a util)', () => {
  it('LINEAR_SCALE is identity', () => {
    expect(LINEAR_SCALE.scaleValue(5, 0, 10)).toBe(5);
    expect(LINEAR_SCALE.descaleValue(5, 0, 10)).toBe(5);
  });

  it('LOGARITHMIC_SCALE round-trips', () => {
    const scaled = LOGARITHMIC_SCALE.scaleValue(50, 1, 100);
    const descaled = LOGARITHMIC_SCALE.descaleValue(scaled, 1, 100);
    expect(descaled).toBeCloseTo(50, 5);
  });
});

describe('jest-setup smoke', () => {
  it('expo-secure-store mock is wired', async () => {
    const SecureStore = require('expo-secure-store');
    await SecureStore.setItemAsync('k', 'v');
    expect(await SecureStore.getItemAsync('k')).toBe('v');
  });

  it('AsyncStorage mock is wired', async () => {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem('a', 'b');
    expect(await AsyncStorage.getItem('a')).toBe('b');
  });
});
