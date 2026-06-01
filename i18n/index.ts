/**
 * i18n bootstrap.
 *
 * Phase 0 Task 0.6. Wires i18next + react-i18next with the device's
 * detected locale (via expo-localization), falling back to English.
 *
 * Key conventions: `screen.action.outcome`. Examples:
 *   onboarding.country_picker.title
 *   verification.id.success_toast
 *   chat.translation.see_original
 *
 * Adding a new locale = duplicate `en.json` → translate → import here.
 * The CI string-lint (configured in Phase 0 Task 0.6 Step 5, future) will
 * fail merges that introduce hardcoded English in user-facing surfaces.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';
import ja from './locales/ja.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import ar from './locales/ar.json';

// expo-localization 55+ exposes `getLocales()` returning `[{ languageCode, ... }]`.
// Fall back to legacy `locale` for older runtimes / web.
const detectLanguage = (): string => {
  try {
    const locales = (Localization as any).getLocales?.();
    if (Array.isArray(locales) && locales.length > 0 && locales[0]?.languageCode) {
      return locales[0].languageCode;
    }
  } catch {
    // intentional fall-through to legacy
  }
  const legacy = (Localization as any).locale ?? 'en';
  return String(legacy).split('-')[0];
};

i18n.use(initReactI18next).init({
  lng: detectLanguage(),
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    es: { translation: es },
    ja: { translation: ja },
    fr: { translation: fr },
    pt: { translation: pt },
    ar: { translation: ar },
  },
  interpolation: { escapeValue: false },
  // Don't crash on missing keys — fall through to the key string itself
  // so a missing translation is visible in the UI but doesn't blow up.
  returnNull: false,
  returnEmptyString: false,
  saveMissing: __DEV__,
  missingKeyHandler: __DEV__
    ? (lngs, ns, key) => console.warn(`[i18n] missing translation: ${key} (${lngs.join(',')})`)
    : undefined,
});

export default i18n;
