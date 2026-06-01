/**
 * Global Jest setup for Ahavah frontend tests.
 *
 * Imported via `package.json -> jest.setupFilesAfterEach`. Mocks the
 * native-side Expo modules that aren't available under jest-expo by default.
 *
 * Per Phase 0 Task 0.4: provides global mocks for expo-camera,
 * expo-image-picker, expo-secure-store, AsyncStorage. Component-level
 * tests (Phase 6 Task 6.1's atom snapshot tests) opt into more specific
 * mocks at the test file.
 */

import '@testing-library/jest-native/extend-expect';

// expo-camera ------------------------------------------------------------
jest.mock('expo-camera', () => ({
  Camera: 'Camera',
  CameraType: { front: 'front', back: 'back' },
  useCameraPermissions: jest.fn(() => [{ status: 'granted', granted: true }, jest.fn()]),
  requestCameraPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted', granted: true })),
}));

// expo-image-picker ------------------------------------------------------
jest.mock('expo-image-picker', () => ({
  launchCameraAsync: jest.fn(() => Promise.resolve({ canceled: false, assets: [] })),
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ canceled: false, assets: [] })),
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted', granted: true })),
  requestCameraPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted', granted: true })),
  MediaTypeOptions: { Images: 'Images', Videos: 'Videos', All: 'All' },
}));

// expo-secure-store ------------------------------------------------------
const _secureStore: Record<string, string> = {};
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn((k: string, v: string) => {
    _secureStore[k] = v;
    return Promise.resolve();
  }),
  getItemAsync: jest.fn((k: string) => Promise.resolve(_secureStore[k] ?? null)),
  deleteItemAsync: jest.fn((k: string) => {
    delete _secureStore[k];
    return Promise.resolve();
  }),
}));

// @react-native-async-storage/async-storage ------------------------------
const _asyncStorage: Record<string, string> = {};
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn((k: string, v: string) => {
      _asyncStorage[k] = v;
      return Promise.resolve();
    }),
    getItem: jest.fn((k: string) => Promise.resolve(_asyncStorage[k] ?? null)),
    removeItem: jest.fn((k: string) => {
      delete _asyncStorage[k];
      return Promise.resolve();
    }),
    multiGet: jest.fn((keys: string[]) =>
      Promise.resolve(keys.map((k) => [k, _asyncStorage[k] ?? null]))),
    clear: jest.fn(() => {
      Object.keys(_asyncStorage).forEach((k) => delete _asyncStorage[k]);
      return Promise.resolve();
    }),
  },
}));

// expo-haptics — silent no-op so HapticTrigger atoms (Phase 6) work in tests
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
  NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
}));

// expo-localization mock will be added by Task 0.6 (i18n bootstrap)
// when the module is actually installed.

// expo-notifications — minimal mock so notification-listener code runs
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  getLastNotificationResponseAsync: jest.fn(() => Promise.resolve(null)),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
}));

// Suppress noisy NativeWind warnings under jsdom
beforeEach(() => {
  // eslint-disable-next-line no-console
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  // eslint-disable-next-line no-console
  (console.warn as jest.Mock).mockRestore?.();
});
