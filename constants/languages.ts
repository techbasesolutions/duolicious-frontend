/**
 * ISO-639-1 languages used by Ahavah's discovery filter + chat translation
 * targeting.
 *
 * Phase 1 Task 1.2 starter set — covers DeepL Pro's supported pairs plus the
 * launch wedge's primary languages. Phase 6+ should expand to the full
 * ~180 ISO-639-1 list.
 */

export type Language = {
  code: string;        // ISO-639-1
  name: string;        // English name
  nativeName: string;  // language's own name
};

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English',     nativeName: 'English' },
  { code: 'es', name: 'Spanish',     nativeName: 'Español' },
  { code: 'fr', name: 'French',      nativeName: 'Français' },
  { code: 'pt', name: 'Portuguese',  nativeName: 'Português' },
  { code: 'de', name: 'German',      nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian',     nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch',       nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish',      nativeName: 'Polski' },
  { code: 'ru', name: 'Russian',     nativeName: 'Русский' },
  { code: 'uk', name: 'Ukrainian',   nativeName: 'Українська' },
  { code: 'cs', name: 'Czech',       nativeName: 'Čeština' },
  { code: 'sv', name: 'Swedish',     nativeName: 'Svenska' },
  { code: 'da', name: 'Danish',      nativeName: 'Dansk' },
  { code: 'no', name: 'Norwegian',   nativeName: 'Norsk' },
  { code: 'fi', name: 'Finnish',     nativeName: 'Suomi' },
  { code: 'el', name: 'Greek',       nativeName: 'Ελληνικά' },
  { code: 'tr', name: 'Turkish',     nativeName: 'Türkçe' },
  { code: 'ar', name: 'Arabic',      nativeName: 'العربية' },
  { code: 'he', name: 'Hebrew',      nativeName: 'עברית' },
  { code: 'fa', name: 'Persian',     nativeName: 'فارسی' },
  { code: 'ur', name: 'Urdu',        nativeName: 'اردو' },
  { code: 'hi', name: 'Hindi',       nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali',     nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil',       nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu',      nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi',     nativeName: 'मराठी' },
  { code: 'ja', name: 'Japanese',    nativeName: '日本語' },
  { code: 'ko', name: 'Korean',      nativeName: '한국어' },
  { code: 'zh', name: 'Chinese',     nativeName: '中文' },
  { code: 'vi', name: 'Vietnamese',  nativeName: 'Tiếng Việt' },
  { code: 'th', name: 'Thai',        nativeName: 'ไทย' },
  { code: 'id', name: 'Indonesian',  nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay',       nativeName: 'Bahasa Melayu' },
  { code: 'tl', name: 'Filipino',    nativeName: 'Filipino' },
  { code: 'sw', name: 'Swahili',     nativeName: 'Kiswahili' },
  { code: 'ha', name: 'Hausa',       nativeName: 'Hausa' },
  { code: 'am', name: 'Amharic',     nativeName: 'አማርኛ' },
  { code: 'yo', name: 'Yoruba',      nativeName: 'Yorùbá' },
  { code: 'ig', name: 'Igbo',        nativeName: 'Igbo' },
];

export const LANGUAGE_BY_CODE: Record<string, Language> =
  Object.fromEntries(LANGUAGES.map((l) => [l.code, l]));
