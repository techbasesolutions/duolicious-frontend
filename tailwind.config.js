/** @type {import('tailwindcss').Config} */
// Task 0.9 — Tailwind config consumed by NativeWind v4.
// Pulls the shared preset from `ahavah-design-tokens` so a single hex change
// propagates to mobile + admin + web.

const preset = require('../ahavah-design-tokens/tailwind.preset').default;

module.exports = {
  content: [
    './App.tsx',
    './**/*.{ts,tsx,js,jsx}',
    '!./node_modules/**',
    '!./playwright-hars/**',
    '!./playwright-tests/**',
  ],
  presets: [require('nativewind/preset'), preset],
  theme: {},
  plugins: [],
};
