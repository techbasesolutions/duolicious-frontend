# Design System — Ahavah

**Phase D Task D.2 deliverable.** This document IS the Figma file in text form. It defines every atom from Phase 6 Task 6.1 with all states, props, and edge cases. Pair with the live `<DesignSystemShowcase />` screen at [`screens/design-system-showcase.tsx`](../screens/design-system-showcase.tsx) for the visual rendition.

Pattern 3 explicitly rejected licensed Figma templates — the implementer (me) IS the designer. Where a designer would draw frames in Figma, I write components + a showcase screen that renders every variant. The showcase IS the prototype; the components ARE the library.

---

## Token layer (mapped to Figma variables)

### Color (semantic naming for future light-mode survival)

| Figma name | Token | Hex |
|------------|-------|-----|
| `surface/canvas` | `bg.DEFAULT` | `#000000` |
| `surface/in-app` | `bg.indigo` (NEW) | `#1A1340` |
| `surface/elevated` | `bg.elevated` | `#0F0B1F` |
| `surface/card` | `bg.card` | `#1A1340` |
| `text/primary` | `text.primary` | `#FFFFFF` |
| `text/secondary` | `text.secondary` | `#B5B0CC` |
| `text/muted` | `text.muted` | `#7A7596` |
| `accent/primary` | `lime-500` | `#D7FF81` |
| `accent/secondary` | `lavender-500` | `#BC96FF` |
| `accent/brand` | `indigo-500` | `#5524F5` |
| `semantic/like` | `pink-500` | `#FF4566` |
| `semantic/success` | `success` | `#9FE870` |
| `semantic/warning` | `warning` | `#FFC857` |
| `semantic/danger` | `danger` | `#FF4566` |
| `border/default` | `border` | `rgba(255,255,255,0.08)` |

### Spacing (4-based)

`0 / 4 / 8 / 12 / 16 / 18 / 20 / 24 / 32 / 40 / 48 / 52 / 56 / 64 / 72 / 80 / 96`

### Radius

| Token | Value | Use |
|-------|-------|-----|
| `sm` | 8 | Inline tags, badges |
| `md` | 14 | Pills (chips) |
| `lg` | 18 | Buttons, PillButton |
| `xl` | 20 | Form fields, IconButton circles |
| `2xl` | 24 | Cards |
| `3xl` | 28 | BottomNavBar bar |
| `pill` | 9999 | Voice bubbles, story rings only |

### Shadow (4 elevation levels)

| Level | shadow value | Use |
|-------|--------------|-----|
| 0 | none | Flat surfaces |
| 1 | `0 1px 4px rgba(0,0,0,0.18)` | Card resting state |
| 2 | `0 4px 12px rgba(0,0,0,0.30)` | Sticker drop shadow, BottomNavBar float |
| 3 | `0 8px 24px rgba(0,0,0,0.40)` | Match-screen card stack, modals |

### Motion (timing + easing — full spec in D.3)

`instant 0ms / fast 150ms / base 250ms / slow 400ms`. Springs: `snappy {damping:18, stiffness:250}`, `smooth {damping:26, stiffness:180}`.

---

## Component library

For each atom: purpose, props, states, edge cases. The matching live render is in `<DesignSystemShowcase />`.

### Identity & branding

#### `BrandMark`
- **Purpose:** universal brand expression (header, splash, marketing).
- **Props:** `mode: 'full' | 'icon-only' | 'monochrome'` (default `full`); `size: 'sm' | 'md' | 'lg' | 'xl'` (default `md`).
- **States:** static.
- **Edge cases:** `mode="icon-only"` renders a square tile of the size — caller controls margins; `monochrome` collapses lime accent to white.
- **Reference:** image 14 (full hero), image 9 bottom-left (icon tile).

#### `StickerBadge` (NEW per D.1)
- **Purpose:** decorative geometric shape vocabulary.
- **Props:** `variant: 'sparkle-4pt' | 'heart' | 'quad-star' | 'pent-star' | 'flower' | 'blob' | 'triangle' | 'wavy' | 'dot' | 'circle-large' | 'pentagon' | 'cross-target'`; `size` (default 32); `color`; `rotation` (degrees); `flip: 'h'|'v'|'none'`.
- **States:** static.
- **Edge cases:** `size < 16` drops the 2px outline (would dominate the shape); over 96px the drop-shadow scales proportionally.
- **Reference:** images 5, 6, 8, 16.

#### `MatchConfetti`
- **Purpose:** composes 8-12 StickerBadge instances into staged-entry layouts.
- **Props:** `variant: 'match' | 'splash' | 'empty-state'`; `seed?` for deterministic layout in tests.
- **States:** entering (reanimated worklet) / settled / exiting.
- **Edge cases:** `reduce-motion` disables stagger and renders all stickers at final position with a fade.

### Typography

#### `Heading`
- **Props:** `level: 'h1' | 'h2' | 'h3'` (default h1).
- **States:** static; supports caller-provided `numberOfLines` for truncation.
- **Edge case:** very long names in `h1` truncate at 2 lines via caller.

#### `Body`
- **Props:** `size: 'xs' | 'sm' | 'base' | 'lg'` (default base); `tone: 'primary' | 'secondary' | 'muted'`.
- **Edge case:** `tone="muted"` is illegal at sizes < `lg` — WCAG AA contrast fails. Test enforces.

#### `Caption`
- **Props:** none beyond Text. Always `xs / muted`.

#### `Numeric`
- **Props:** same as Body, plus inline `fontVariant: ['tabular-nums']` style.
- **Use:** ages, prices, distances, percent values.

### Buttons + actions

#### `Button` (existing — to be expanded per kit)
- **Variants:** `primary` (lime fill, dark text), `secondary` (lavender fill, dark text), `outline` (indigo border 1.5px), `ghost` (transparent + indigo text), `destructive` (pink-red fill, white text).
- **Sizes:** `sm` (h-10), `md` (h-12), `lg` (h-14).
- **States:** default, pressed (active state), focused (web outline), disabled (opacity 40%), loading (spinner replaces label).
- **Edge case:** loading state hides label and disables press.
- **Radius (CORRECTED):** **18** (was `pill`). All variants.

#### `IconButton` (NEW per kit)
- **Purpose:** circular tertiary action button.
- **Variants:** `filled-lime`, `filled-lavender`, `filled-pink`, `filled-indigo`, `outline-indigo`, `ghost`.
- **Sizes:** `32 / 40 / 48 / 64`.
- **States:** default, pressed, disabled.
- **Use:** action row under SwipeCard (X 48 / play 64 / heart 48), HeaderBarButton (40 ghost), tertiary actions in cards (Forms panel: 👁 + ❤ ×).

#### `PillButton` (CORRECTED)
- **Variants:** `primary-lime`, `secondary-lavender`.
- **Sizes:** `md` (h-12), `lg` (h-14).
- **Default:** `primary-lime`, `lg`, `fullWidth=true`.
- **States:** default, pressed, disabled, loading.
- **Radius (CORRECTED):** **18** (was `pill`).
- **Use:** primary screen-bottom CTA. `secondary-lavender` for "Apply filters" / sub-flow confirms.

#### `Pill` (CORRECTED)
- **Purpose:** toggleable chip for filters / interests / tags.
- **Props:** `selected`, `size: 'sm' | 'md'`, `disabled`, `leadingIcon?` (for the `94%` chat-bubble glyph case).
- **States:** unselected (lavender outline + lavender text), selected (lime fill + dark text), disabled (40% opacity).
- **Radius (CORRECTED):** **14** (was `pill`).

### Form inputs

#### `TextInput` (NEW per kit — replaces duolicious DefaultTextInput)
- **Purpose:** filled-indigo single-line input.
- **Props:** `label`, `value`, `onChangeText`, `placeholder`, `leadingIcon?`, `trailingIcon?`, `error?`, `keyboardType`, etc.
- **Layout:** label 11px secondary tone above; input 14px white inside indigo container; no border; soft inner-top shadow.
- **States:** default, focused (lime border underline), error (pink-red label + danger underline), disabled (40% opacity).
- **Radius:** 16.
- **Edge case:** when both `leadingIcon` and `trailingIcon` set, label collapses height to single-line.

#### `Textarea`
- **Props:** same as TextInput minus `keyboardType`; `maxLength` shows char counter; auto-grows up to 5 lines then scrolls.
- **Edge case:** `maxLength` reached blocks new chars + flashes counter pink-red briefly.

#### `PhoneInput`
- **Purpose:** country-code picker (uses CountryPicker) + masked numeric input.
- **Validates:** E.164 format on blur.

#### `CodeInput`
- **Purpose:** 6-box OTP entry.
- **Behavior:** auto-advance on each digit; paste-aware (pasting "123456" splits across boxes); auto-submit on full entry.

#### `SegmentedControl`
- **Purpose:** binary/ternary single-select pill row.
- **Props:** `options: [{key, label}]`, `value`, `onChange`.
- **Per kit:** matches "Show me: Men/Women/All" pattern from filters drawer (image 12).

#### `RangeSlider`
- **Purpose:** two-thumb age range.
- **Per kit:** lime track between thumbs, value display right-aligned (e.g. "18-23").

#### `Slider`
- **Purpose:** single-thumb distance.
- **Per kit:** lime thumb, lavender track, value display ("1 km").

#### `RadioStepper` (NEW per kit)
- **Purpose:** 5-position personality-test radio.
- **Props:** `options: 5 entries`, `value`, `onChange`.
- **Per kit:** 5 hollow circles, selected = lime fill (animates 200ms expansion), others = 1.5px indigo outline.

### Avatars + identity

#### `Avatar`
- **Sizes:** `xs 24 / sm 32 / md 48 / lg 64 / xl 96`.
- **Props:** `uri?`, `fallback` (initials).

#### `StoryRing`
- **Wraps:** Avatar.
- **Variants:** `none` (no ring), `unread` (lime→lavender gradient ring), `online` (solid lime ring).

#### `VerifiedBadge`
- **Per Phase 3.** Tier-coloured disc with check glyph. No Dateasy reference; Ahavah extension.

#### `CompatibilityPill`
- **Purpose:** "94%" lime pill with leading chat-bubble icon (per kit image 9 + image 12 swipe card).
- **Props:** `score: 0-100`, `size`.
- **Edge case:** caller must NOT invent score client-side; render only when `match.compatibility_score` is present, hide otherwise.

#### `CountryFlag`
- **Wraps:** emoji flag with platform-specific fallback to a labeled CC chip.

### Cards + lists

#### `Card` (CORRECTED radius)
- **Variants:** `flat` (bg.card, no border), `elevated` (bg.card + 1px border + level-1 shadow), `gradient` (indigo→lavender for premium surfaces).
- **Padding:** `none / sm 12 / md 16 / lg 24`.
- **Radius (CORRECTED):** **24** (was 16).

#### `SwipeCard`
- **Purpose:** image-fill profile card with overlay caption.
- **Props:** `photoUri`, `name`, `age`, `location`, `compatScore?`, `onLike`, `onPass`.
- **Layout (per image 12):** photo fills, gradient bottom-40% for caption legibility, CompatPill top-right at 12 inset, name+age (Heading + Numeric) bottom-left padded 24, Caption with location pin below.

#### `PhotoGallery`
- **Purpose:** profile photo carousel with tap-zones (left third = prev, right two-thirds = next).
- **Indicators:** dots top-edge, fade through when active changes.
- **Dismiss:** swipe-down to close fullscreen.

#### `ListItem`
- **Slots:** leading (Avatar / icon), title (Body), subtitle (Caption), trailing (chevron / badge / Switch).
- **States:** default, pressed (bg.elevated flash 80ms).

#### `ChatListRow` (specialized ListItem)
- **Per kit:** StoryRing avatar, name+age Heading, last-message-preview Body with optional translation indicator, timestamp Caption, unread Badge (lime pill).
- **Long-press:** action menu (mute / archive / report).

### Chat-specific

#### `Bubble`
- **Variants:** `me` (lime), `them` (lavender), `voice`, `image`, `sticker`.
- **Per kit:** `me` rounded with bottom-right tail-lite; `them` rounded with bottom-left tail-lite + leading avatar (only on first of consecutive group).

#### `VoiceMessage`
- **Composition:** lime play/pause IconButton + Skia-rendered waveform + duration Numeric.

#### `ChatHeader`
- **Slots:** back IconButton + Avatar + name+age + online indicator + kebab menu.
- **Auto-translate toggle:** accessible via kebab.

#### `ChatInput`
- **Per kit:** indigo bar with paperclip leading, text input middle (multi-line auto-grow up to 5), record/send trailing (icon swaps when text is non-empty).

#### `TypingIndicator`
- **Visual:** three lavender dots with staggered bounce (reanimated worklet).

#### `StickerCallout`
- **Per kit:** lime/lavender sticker bubbles ("Awesome", "coffee?"). 8 preset stickers + a "+" pick-more affordance.

### Navigation + chrome

#### `BottomNavBar` (CORRECTED)
- **Per kit:** floating rounded-rect bar (radius 28-32, NOT pill), indigo bg, 4 circular icon slots, **active glyph in lime CIRCLE 40px**.
- **Props:** `tabs: NavTab[]`, `activeKey`, `onTabPress`, `bottomInset`.
- **Locked tab shape:** Discover / Matches / Inbox / Profile.

#### `HeaderBar`
- **Variants:** `default` (bg-elevated + bottom border), `transparent` (over-photo), `elevated` (with shadow).
- **Slots:** leading 40 / title centered / trailing 40.

#### `HeaderBarButton`
- **Default:** 40px ghost circle with hit-slop 8px.

#### `InScreenTabs`
- **Wraps:** reusables Tabs for sub-section nav (Settings → Notifications/Privacy/Safety).

#### `Sheet`
- **Bottom sheet** for CountryPicker, LanguagePicker, filters drawer.

#### `Modal`
- **Full-screen** for paywall, match-screen, photo-viewer.

### Feedback + state

#### `Toast`
- **Variants:** success / info / warning / error.
- **Top-anchored** (under HeaderBar) — bottom-anchored would collide with BottomNavBar.
- **Auto-dismiss:** 3s for non-error, 5s for error, dismissable via swipe-up.

#### `Banner`
- **Inline alert** (e.g. anti-scam money-mention banner).
- **Always actionable:** at least one CTA (Learn / Report / Dismiss).

#### `Skeleton`
- **6 pre-composed layouts:** chat-list-row / swipe-card / profile-detail / chat-message / settings-row / paywall-card.
- **Match the bones** of the destination atom so transition is seamless.

#### `Spinner`
- **Sizes:** sm / md / lg. Lime by default; indigo for inverse contexts.

#### `EmptyState`
- **Variants:** no-matches / no-messages / no-search-results / filter-too-narrow / you-blocked-everyone / no-internet.
- **Composition:** StickerBadge or MatchConfetti(splash) illustration + Heading + Body + optional CTA.

#### `ErrorState`
- **Full-screen error:** `StickerBadge variant="wavy"` (red) + Heading + Body + Retry CTA.

#### `ProgressBar`
- **Wraps:** reusables Progress.

#### `ProgressDots`
- **Onboarding multi-step:** N dots, current = lime.

### Specialty

#### `PaywallCard`
- **Background:** Card variant=gradient (indigo→lavender).
- **Composition:** feature checklist (lime checks) + price tier pills + restore-purchases footer + terms links.

#### `PermissionPrompt`
- **Pre-OS prompt** explaining the permission ask before the system dialog fires.
- **Variants:** notifications / camera / photo-library / location.

#### `HapticTrigger`
- **Invisible utility wrapper.** `<HapticTrigger type="impactMedium">{children}</HapticTrigger>` fires haptic on press.

---

## Per-atom build discipline (Phase 6 Task 6.1 procedure)

For every atom:
1. Failing snapshot test first (Jest + RN Testing Library).
2. Reference image source defined in `reference-map.md`.
3. Build until snapshot test passes + every state has a render in `<DesignSystemShowcase />`.
4. Run on iOS simulator + Android emulator + web before marking done. Three-way render confirmation.
5. Commit per-atom (when commits are authorized).

---

## Light-mode survival audit (D.2 last bullet)

Even though we ship dark-only, the token names above (`surface/canvas`, `text/primary`, `accent/primary`) survive a light-mode addition without rename. The implementation values would change but the tokens stay. The 3 risks if light mode is added later:
1. `text-text-muted` would need a darker hex (current `#7A7596` is for dark canvas; on white it'd be near-illegible).
2. `border` (`rgba(255,255,255,0.08)`) would need to flip to `rgba(0,0,0,0.08)` — easy.
3. `bg.card` (`#1A1340`) would need a light counterpart — pick a light lavender tint.

---

## Sign-off

Implementer (Pattern 3, autonomous mode), 2026-05-09. Live render at `<DesignSystemShowcase />` (next deliverable in this batch). D.3-D.6 unblocked.
