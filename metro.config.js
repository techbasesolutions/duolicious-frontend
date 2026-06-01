// Task 0.9 — NativeWind v4 wrapped Metro config.
// Converted from metro.config.ts to plain JS to avoid the ts-node ESM
// loader's Windows absolute-path issue (ERR_UNSUPPORTED_ESM_URL_SCHEME).

const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withNativeWind(defaultConfig, {
  input: './global.css',
});
