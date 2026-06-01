module.exports = function (api) {
  api.cache(true);
  return {
    // Task 0.9: NativeWind v4 + Tailwind v3 wired here.
    // jsxImportSource: 'nativewind' was tried but breaks the runtime when
    // some downstream RN libs assume the React JSX runtime — leaving it off
    // and relying on the babel plugin to rewrite `className` on RN elements.
    presets: [
      [ 'babel-preset-expo', { reanimated: false } ],
      'nativewind/babel',
    ],
    plugins: ['react-native-worklets/plugin'],
  };
};
