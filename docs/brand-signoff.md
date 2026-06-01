# Visual brand sign-off — Ahavah

**Phase D Task D.1 deliverable.** Locks the brand decisions every other Phase D task and Phase 6 build consume. Pattern 3 sign-off (implementer is reviewer). Date: 2026-05-09.

---

## 1. App name — LOCKED

**Ahavah** (Hebrew אהבה — "love"). Locked week 1 per brainstorming output.

Affects:
- Bundle IDs: `com.techbase.ahavah` (iOS), `app.techbase.ahavah` (Android)
- Domain: `ahavah.app` (already referenced in welcome-screen Linking URLs)
- Store listings: "Ahavah — international dating, no language barriers"
- Brand mark: lowercase `ahavah` wordmark

---

## 2. Brand mark + wordmark — DEFINED

**Mark:** 4-point sparkle (per Dateasy UI kit image 9 lockup; substituted from "dateasy" mark to avoid passing off).

**Wordmark:** lowercase `ahavah` in Plus Jakarta Sans Bold, tight letter-spacing (-0.02em). Lowercase intentional — matches the warmth + approachability of the Hebrew root word; aligns with the Dateasy idiom (image 14 shows "dateasy" lowercase).

**Variants:**
- **Full lockup:** sparkle + wordmark (welcome screen, marketing)
- **Icon-only:** sparkle on rounded-rect tile (app icon, favicons, BrandMark prop `mode="icon-only"`)
- **Monochrome:** white sparkle + white wordmark on black; OR black sparkle + black wordmark on white (paper / receipts / press)

**SVG sources:** initially rendered programmatically inside `<BrandMark />` atom (see D.6 asset pipeline for SVG export plan).

---

## 3. Color palette — LOCKED (matches Dateasy image 13)

| Role | Token | Hex | WCAG AA notes |
|------|-------|-----|---------------|
| Primary brand surface | `indigo-500` | `#5524F5` | passes AA against white text only; do NOT pair with secondary text |
| Primary CTA | `lime-500` (Mindaro) | `#D7FF81` | passes AA against `#000` and `#1A1340` for ≥14pt |
| Accent / secondary CTA | `lavender-500` | `#BC96FF` | passes AA against `#000` and `#1A1340` |
| Semantic — like / heart / match | `pink-500` (Pinkish Red) | `#FF4566` | use for hearts/likes ONLY, never as a CTA color |
| Canvas (marketing surfaces) | `bg.DEFAULT` | `#000000` | true black — splash, welcome, landing |
| Canvas (in-app) | `bg.indigo` (NEW) | `#1A1340` | dark indigo — post-login screens, BottomNavBar bg |
| Surface elevated | `bg.elevated` | `#0F0B1F` | sheets, drawers, secondary surfaces |
| Surface card | `bg.card` | `#1A1340` | card panels, filled-input wells |
| Text primary | `text.primary` | `#FFFFFF` | passes AA on all dark surfaces |
| Text secondary | `text.secondary` | `#B5B0CC` | passes AA on `#000` and `#1A1340` for ≥14pt |
| Text muted | `text.muted` | `#7A7596` | passes AA only at ≥18pt — use only for ≥18pt or non-essential UI |
| Success | `success` | `#9FE870` | use for confirmations, photo approvals |
| Warning | `warning` | `#FFC857` | use for billing-issue / pending states |
| Danger | `danger` | `#FF4566` | use for destructive actions, errors |
| Border | `border` | `rgba(255,255,255,0.08)` | universal divider |

**Locked decisions:**
- **Dark-only.** No light mode. Re-deriving the contrast relationships against a white canvas would mean re-doing the entire palette; not in scope. Token names (`bg.DEFAULT` / `text.primary`) survive a future light-mode addition.
- **`pink-500` is semantic-only.** It is NEVER a button fill or surface tint — only hearts, like glyph, match-pulse, and `danger` aliases.
- **Lime is for `commit` / continue**; **lavender is for `apply` / modify** — see Conflict Resolutions in [`dateasy-rules.md`](./dateasy-rules.md).

**Accessibility audit:** built into the table above. The two combinations to handle carefully:
- `text-text-muted` on dark — only legal at ≥18pt. Don't use it for body copy.
- `text-text-secondary` on `bg.indigo` — passes AA at 14pt. Use freely for body/caption.

---

## 4. Typography — LOCKED with substitution

**Display + body:** Plus Jakarta Sans (substituted from Cabinet Grotesk per user direction).

| Weight | Plus Jakarta Sans face | Maps from CG | Used for |
|--------|------------------------|--------------|----------|
| 700 Bold | `PlusJakartaSans_700Bold` | Cabinet Grotesk Bold | Headings, BrandMark wordmark, CTA labels |
| 500 Medium | `PlusJakartaSans_500Medium` | Cabinet Grotesk Medium | Sub-headings, emphasized body |
| 400 Regular | `PlusJakartaSans_400Regular` | Cabinet Grotesk Regular | Body, Caption, Numeric |

**Tabular numerics:** the `Numeric` atom applies `fontVariant: ['tabular-nums']` so ages/prices/distances align across rows. Critical for the `94%` compatibility pill, the `25` next to "Jessica Maple", and any list of distances/prices.

**Scale (locked, matches `ahavah-design-tokens/typography.ts`):**

| Token | Size | Line height | Use |
|-------|------|-------------|-----|
| `xs` | 12 | 16 | Caption, micro labels |
| `sm` | 14 | 20 | Body small, secondary copy |
| `base` | 16 | 24 | Body Regular |
| `lg` | 18 | 28 | Body Large, button labels |
| `xl` | 20 | 28 | Heading h3 |
| `2xl` | 24 | 32 | Heading h2 |
| `3xl` | 30 | 36 | Heading h1 (default) |
| `4xl` | 36 | 40 | Hero subtitle |
| `5xl` | 48 | 1.0 | Welcome hero |

**Letter-spacing:**
- BrandMark wordmark: -0.02em
- Headings: default (0)
- Body/Caption: default (0)

---

## 5. Iconography — LOCKED

**Family:** Phosphor Outline. Outline-1.5px stroke, 24px box, square line caps.

Rationale: matches the kit's outline icon style (image 9 top-left Icons panel — clean outline, even stroke, no embellishment). Phosphor has ~1500 icons including all the dating/social/comms glyphs we need (heart, paperplane, search, settings, person, chat-bubble, shield, gift, sparkle). Already partially adopted via `@fortawesome/free-solid-svg-icons` in the duolicious codebase — we'll migrate to Phosphor incrementally as screens are rewritten.

**~80 icons needed:** computed from the Phase 6 screen inventory:
- Auth/onboarding: 12 (Apple/Google logos, eye, lock, mail, phone, calendar, gender symbols, camera, location, language, check)
- Discovery: 8 (heart, X, sparkle, filter, lightning/boost, info, photo-stack, undo)
- Chat: 12 (paperclip, send, mic, image, sticker, smiley, search, mute, archive, flag, video-camera, phone-call)
- Profile: 14 (settings cog, edit-pencil, share, bell, lock, eye, eye-off, gift, crown/premium, sign-out, trash, chevron-right, chevron-left, user)
- Verification: 6 (shield, badge-check, ID-card, camera-circle, fingerprint, check-circle)
- Trust & safety: 8 (warning-triangle, flag, shield-check, eye-slash, hand-stop, megaphone, headset/support, chat-help)
- Status / utility: 20 (wifi-off, refresh, dots-three-vertical, dots-three-horizontal, plus, minus, x-circle, check-circle, info-circle, arrow-right, arrow-left, arrow-up, arrow-down, star, heart-fill, sun, moon, globe, link, copy)

**Glyphs in current atoms** (BottomNavBar, EmptyState) currently use **Unicode pictographs** as a placeholder (`✦ ♥ ✉ ☻`). Migration to real Phosphor icons happens when the icon library install lands (`pnpm add phosphor-react-native`); the atoms accept ReactNode glyph slots so swapping is per-call-site, not per-atom.

---

## 6. Photography / illustration direction — LOCKED

**Wedge-aware sourcing:** Caribbean diaspora is a stated launch wedge per the spec doc. Marketing photography MUST reflect that demographic, NOT generic global stock.

**Sources, in priority order:**
1. **Commissioned photoshoot** of real Caribbean-identifying couples + individuals. Budget: $1.5-3k for ~30 usable shots.
2. **Pexels Plus / Unsplash+** filtered for Caribbean / Black / mixed-heritage subjects. $35/mo, gives commercial rights.
3. **Midjourney v6 with explicit commercial license** as fallback for hero compositions where stock is too generic.

**Style:** candid + warm-toned (NOT corporate / studio / heavily-graded). The reference (image 16) shows young adults in outdoor / casual / festival settings. Match that mood; avoid sunset-couple-on-beach clichés.

**App-internal photos:** all user-uploaded. No pre-bundled "demo" photos.

---

## 7. Sticker / decorative shape library — DEFINED

12 variants, all rendered as SVG inside `<StickerBadge />` atom (D.6 asset pipeline ships them as separate optimized SVG files when the app-bundle budget needs trimming).

| Variant | Shape | Default color | Where seen |
|---------|-------|---------------|------------|
| `sparkle-4pt` | 4-point sparkle (also brand mark) | lime / lavender | Image 9, image 14 |
| `heart` | rounded heart | pink-red | Image 5, 6 |
| `quad-star` | 4-pointed star (squared) | lime | Image 5, 6 |
| `pent-star` | 5-pointed star | lavender / lime | Image 5 |
| `flower` | 5-petal flower | lavender | Image 5 |
| `blob` | organic squiggle | lavender | Image 5, 6, 8 |
| `triangle` | equilateral triangle | lime / lavender | Image 5, 6 |
| `wavy` | sine-wave line | red | Image 5 |
| `dot` | small disc | lavender | Image 5 |
| `circle-large` | filled disc | indigo / lime | Image 6 |
| `pentagon` | 5-sided polygon | lavender | Image 8 |
| `cross-target` | concentric rings | lime | Image 16 |

**Common treatment:** 2px black outline stroke, soft drop shadow `(0 2px 8px rgba(0,0,0,0.25))`. Sized via `size` prop (default 32, range 16-128). Rotation prop for compositional variation in `MatchConfetti`.

**Don't lift Dateasy's specific shapes pixel-for-pixel** — re-render in the same idiom. The shapes above are inspired by but not copied from the case study.

---

## Sign-off

Implementer (Pattern 3, autonomous mode), 2026-05-09. Downstream tasks D.2-D.6 unblocked.
