/**
 * ISO-3166-1 alpha-2 countries used by Ahavah's discovery filter.
 *
 * Phase 1 Task 1.2 starter set: launch-wedge countries (Caribbean diaspora +
 * UK / US / Canada) listed first, then a curated list of major countries
 * covering most of the global market. Phase 6+ should expand this to the
 * full ISO-3166 list (~250 entries) via a generation script reading from
 * https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes.
 */

export type Country = {
  code: string;        // ISO-3166-1 alpha-2
  name: string;        // English name
  flag: string;        // emoji flag
  diaspora?: boolean;  // surface near top of picker (Caribbean diaspora wedge)
};

export const COUNTRIES: Country[] = [
  // --- Caribbean diaspora wedge (sorted to top in the picker) ---
  { code: 'BB', name: 'Barbados',                          flag: '🇧🇧', diaspora: true },
  { code: 'JM', name: 'Jamaica',                           flag: '🇯🇲', diaspora: true },
  { code: 'TT', name: 'Trinidad and Tobago',               flag: '🇹🇹', diaspora: true },
  { code: 'GY', name: 'Guyana',                            flag: '🇬🇾', diaspora: true },
  { code: 'BS', name: 'Bahamas',                           flag: '🇧🇸', diaspora: true },
  { code: 'GD', name: 'Grenada',                           flag: '🇬🇩', diaspora: true },
  { code: 'KN', name: 'Saint Kitts and Nevis',             flag: '🇰🇳', diaspora: true },
  { code: 'LC', name: 'Saint Lucia',                       flag: '🇱🇨', diaspora: true },
  { code: 'VC', name: 'Saint Vincent and the Grenadines',  flag: '🇻🇨', diaspora: true },
  { code: 'AG', name: 'Antigua and Barbuda',               flag: '🇦🇬', diaspora: true },
  { code: 'DM', name: 'Dominica',                          flag: '🇩🇲', diaspora: true },
  { code: 'GB', name: 'United Kingdom',                    flag: '🇬🇧', diaspora: true },
  { code: 'US', name: 'United States',                     flag: '🇺🇸', diaspora: true },
  { code: 'CA', name: 'Canada',                            flag: '🇨🇦', diaspora: true },

  // --- Rest of the world (alphabetical) ---
  { code: 'AE', name: 'United Arab Emirates',  flag: '🇦🇪' },
  { code: 'AR', name: 'Argentina',             flag: '🇦🇷' },
  { code: 'AU', name: 'Australia',             flag: '🇦🇺' },
  { code: 'AT', name: 'Austria',               flag: '🇦🇹' },
  { code: 'BD', name: 'Bangladesh',            flag: '🇧🇩' },
  { code: 'BE', name: 'Belgium',               flag: '🇧🇪' },
  { code: 'BR', name: 'Brazil',                flag: '🇧🇷' },
  { code: 'CL', name: 'Chile',                 flag: '🇨🇱' },
  { code: 'CN', name: 'China',                 flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia',              flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica',            flag: '🇨🇷' },
  { code: 'CZ', name: 'Czechia',               flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark',               flag: '🇩🇰' },
  { code: 'EG', name: 'Egypt',                 flag: '🇪🇬' },
  { code: 'ET', name: 'Ethiopia',              flag: '🇪🇹' },
  { code: 'FI', name: 'Finland',               flag: '🇫🇮' },
  { code: 'FR', name: 'France',                flag: '🇫🇷' },
  { code: 'DE', name: 'Germany',               flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana',                 flag: '🇬🇭' },
  { code: 'GR', name: 'Greece',                flag: '🇬🇷' },
  { code: 'HK', name: 'Hong Kong',             flag: '🇭🇰' },
  { code: 'HU', name: 'Hungary',               flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland',               flag: '🇮🇸' },
  { code: 'IN', name: 'India',                 flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia',             flag: '🇮🇩' },
  { code: 'IE', name: 'Ireland',               flag: '🇮🇪' },
  { code: 'IL', name: 'Israel',                flag: '🇮🇱' },
  { code: 'IT', name: 'Italy',                 flag: '🇮🇹' },
  { code: 'JP', name: 'Japan',                 flag: '🇯🇵' },
  { code: 'KE', name: 'Kenya',                 flag: '🇰🇪' },
  { code: 'KR', name: 'South Korea',           flag: '🇰🇷' },
  { code: 'MY', name: 'Malaysia',              flag: '🇲🇾' },
  { code: 'MX', name: 'Mexico',                flag: '🇲🇽' },
  { code: 'MA', name: 'Morocco',               flag: '🇲🇦' },
  { code: 'NL', name: 'Netherlands',           flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand',           flag: '🇳🇿' },
  { code: 'NG', name: 'Nigeria',               flag: '🇳🇬' },
  { code: 'NO', name: 'Norway',                flag: '🇳🇴' },
  { code: 'PK', name: 'Pakistan',              flag: '🇵🇰' },
  { code: 'PE', name: 'Peru',                  flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines',           flag: '🇵🇭' },
  { code: 'PL', name: 'Poland',                flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal',              flag: '🇵🇹' },
  { code: 'RO', name: 'Romania',               flag: '🇷🇴' },
  { code: 'RU', name: 'Russia',                flag: '🇷🇺' },
  { code: 'SA', name: 'Saudi Arabia',          flag: '🇸🇦' },
  { code: 'SG', name: 'Singapore',             flag: '🇸🇬' },
  { code: 'ZA', name: 'South Africa',          flag: '🇿🇦' },
  { code: 'ES', name: 'Spain',                 flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka',             flag: '🇱🇰' },
  { code: 'SE', name: 'Sweden',                flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland',           flag: '🇨🇭' },
  { code: 'TW', name: 'Taiwan',                flag: '🇹🇼' },
  { code: 'TH', name: 'Thailand',              flag: '🇹🇭' },
  { code: 'TR', name: 'Türkiye',               flag: '🇹🇷' },
  { code: 'UA', name: 'Ukraine',               flag: '🇺🇦' },
  { code: 'VN', name: 'Vietnam',               flag: '🇻🇳' },
];

export const COUNTRY_BY_CODE: Record<string, Country> =
  Object.fromEntries(COUNTRIES.map((c) => [c.code, c]));
