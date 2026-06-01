# Dateasy reference rules — visual ground truth for Ahavah

**Phase D Task D.0 deliverable.** Source: 16 case-study images at `d:/Antigravity/docs/specs/look-and-feel/`. This document is the rubric every Phase 6 atom and screen is measured against. Where a Dateasy image and an Ahavah requirement conflict, the resolution is captured inline.

**Conventions:**
- Hex values: Ahavah token names (`indigo-500`, `lime-500`, `lavender-500`, `pink-500`, `bg-card`, `bg-elevated`) per [`ahavah-design-tokens/colors.ts`](../../ahavah-design-tokens/colors.ts).
- Radius: rem-equivalent pixel values; the Tailwind preset uses pixel literals.
- Pattern 3 lock: implementer is the designer. Cabinet Grotesk substituted with **Plus Jakarta Sans** by user direction; do not re-litigate.

---

## Image-to-rule table (all 16 covered)

| # | File prefix | Surface depicted | Concrete design rules |
|---|---|---|---|
| 1  | `084e77…` | App-store screenshot trio (chat translation, "It's a match!", marketing line) | (Marketing only — used for App Store assets in Task 6.6.) Three diagonal phones over dark canvas with indigo bleed glow behind each phone. Marketing line in white display Bold ≈ 5% of poster height. Match-screen sticker uses lavender quad-star/blob with "It's a match!" in dark text inside. **Corner of phones shows the chat translation feature** — confirms the lazy-translate UX in Phase 2 surfaces here as the primary marketing pitch. |
| 2  | `0bfd35…` | Competitor matrix (Tinder/Badoo/Hinge) | Case-study presentation only. **Skip.** |
| 3  | `23a18a…` | Chat module: list + thread + voice + sticker | (a) **Chat-list row:** circular avatar 48, two text lines (`name+age` Heading 16 + `last-message-preview` Body 14 muted), trailing column = timestamp small + unread `Badge` (lime pill, dark text). (b) **Story-row above chat list:** 5-7 avatar circles in a horizontal scroll, lime gradient ring around unread; "+" button left for own story. (c) **Chat thread bubbles:** `me` = lime fill / dark text / bottom-right tail; `them` = lavender or indigo / white text / bottom-left tail. (d) **Voice message:** lime circular play button left, Skia waveform middle, duration right. (e) **Photo grid in chat:** max 2×2, 12px gap, radius 16. (f) **Sticker callout** ("Awesome"): lime/lavender bg, dark text, full-radius pill, light drop shadow. (g) **ChatInput:** indigo-on-indigo filled bar, attach (paperclip) left, multi-line text middle, send icon right. |
| 4  | `39f090…` | Process Venn diagram | Case-study presentation only. **Skip.** |
| 5  | `3ae963…` | Onboarding personality test + premium subscription | (a) **RadioStepper:** 5 hollow circles in a row. Current state filled with lime; others 1.5px indigo outline; selection animates fill expansion (200ms). (b) **Personality question card:** full-screen indigo bg, Heading "I'm comfortable making new acquaintances" centered, RadioStepper centered below at 60% screen height, `Confirm` PillButton (lavender) full-width at bottom-padding-24. **Skip** affordance top-right. (c) **Premium card:** indigo-to-lavender gradient bg, "50 stories" stat in tabular Numeric large, "Change subscription" lime PillButton. **Profile-edit row pattern:** dark indigo cards with field name on top (11px muted) + value below (14px white) + chevron right. |
| 6  | `41958b…` | Match screen on night-street composite | (a) **Match screen confetti placement:** heart top-left at ~20% from edge, lime sparkle top-right at ~15%, lavender blob bottom-left at ~25%, additional shapes scattered along the cardinal directions; total of 8-12 shapes per scene. (b) **Two profile-card thumbnails overlap by ~15% horizontally**, top card slightly offset right + rotated +3° (use as `MatchConfetti variant="match"` ground truth in 6.1). (c) **"It's a match!"** in display Bold, slightly oversized (~32px), dark text on lime/lavender pill bg. (d) **"You and Jessica liked each other"** in 14px secondary tone. (e) **Inline ChatInput at bottom** with placeholder "Say hi" + send icon. (f) **Close X** at very bottom centered. |
| 7  | `48837f…` | User profile detail + match screen pair | (a) **Profile detail layout:** full-width photo header (60% screen height), name+age in Heading + Numeric, distance Caption with 📍 leading icon, three interest Pills in a row (lime selected / lavender outline alternating), bio in Body Regular, action row over translucent blur at bottom. (b) **CompatibilityPill** at top-right of photo at 16/16 inset (lime fill, dark text, leading chat-bubble icon, value e.g. "92%"). (c) **Action row buttons** (X / sparkle pause / heart) at bottom over translucent blur, sizes 48 / 64 / 48 with 24px gap, colors lavender / lime / pink-red. |
| 8  | `4c75b8…` | Editorial about page + interest tag grid | (a) **Hero text** (display Bold) on dark canvas, ~80% width, with sticker shapes inset in select words (e.g. lavender pentagon behind "dating", small sparkle floating right). (b) **Interest tag grid** at bottom: 4-column wrap, 8px gap, all lime fill on dark with dark text. Tags shown: `Cooking` `Art` `Development` `Guitar` `Piano` `Board games` `Anime` `Gaming`. (c) **Body copy** in Body Regular, secondary tone, max-width ~50ch. (d) Sticker palette confirmed: heart pink-red, sparkle lime, blob lavender, pentagon lavender. |
| 9  | `523365…` | **UI kit** (icons, mark, buttons, tags, forms, stickers) | **THE foundation reference.** See per-element rules below; this row would be 20 pages alone. Key locks: brand mark = 4-point sparkle on a square tile (lime-on-indigo PRIMARY, white-on-indigo ALT). Buttons three flavors: lime fill (primary), lavender fill (secondary/apply), 40px circular icon (tertiary). Tags rounded-rect ~14 radius (NOT full-pill); selected = lime fill, unselected = lavender outline + lavender text. Form fields = filled indigo-on-indigo with 11px label above, no border, soft inner shadow at top. |
| 10 | `5df395…` | Phone-in-hand chat with floating sticker confetti | **Sticker library confirmed (12+ shapes):** heart (pink-red), 4-point sparkle (lime), 5-point star (lime + lavender mix), flower (lavender, 5+ petals), blob/squiggle (lavender), wavy line (red), small dot (lavender), triangle (yellow/lime), large quad-star (indigo center, lime border). All have **2px black outline stroke** and slight drop shadow. Each becomes one `<StickerBadge variant="…" />` SVG asset in Phase D Task D.6. **Sticker callout in-chat:** "Awesome" lime/lavender pill with dark text, hangs in bottom-right of recipient bubble row. |
| 11 | `765247…` | Overview montage (~40 screens) | **Validates Phase 6 Task 6.2 screen count of ~40.** Confirms color consistency across the entire app: every screen sits on dark canvas with indigo card-blocks (NOT pure black inside cards), lime as CTA, lavender as accent / secondary action / decorative shapes, pink-red as semantic-only (hearts / match / like). **No screen drifts off-palette.** Use as a global lint reference. |
| 12 | `85a576…` | **Swipe deck + filters drawer** | (a) **Swipe deck layout:** BrandMark top-left at 16/16 inset, own-avatar circular small top-right with notification dot in lime, status bar visible. SwipeCard 90% screen width centered vertically. CompatibilityPill at top-right of card at 12/12 card-inset. Name+age caption + location at bottom-left of card, padded 24, with white text + drop shadow over photo. Three action buttons under card sized 48 / 64 / 48 with 24px gap, colors lavender / lime / pink. **BottomNavBar:** floating rounded-rect bar (NOT full-pill), radius ~28-32, indigo bg, contains 4 circular icon slots; **active glyph sits inside a lime CIRCLE 40px**, inactive glyphs are lavender on transparent. (b) **Filters drawer:** full-screen Sheet on top of deck. Title "Filters" + close X top-right. "Looking for:" row of Pills (Relationship / Friendship — multi-select). "Show me:" segmented row of 3 Pills (Men / Women / All — single select, Women lime-selected). "Preferred age 18-23" RangeSlider with two thumbs + lime track between. "Preferred distance 1 km" Slider single thumb. **"Apply filters"** lavender PillButton full-width bottom. |
| 13 | `a393f0…` | **Font + colors page** | **Brand foundation lock.** Palette: Pinkish Red `#FF4566` (heart shape), White `#FFFFFF` (triangle), Mindaro lime `#D7FF81` (pentagon), Persian Indigo `#5524F5` (circle), Lavender `#BC96FF` (4-point sparkle). Editorial dark canvas `#000000`. Typography: **Cabinet Grotesk Regular / Medium / Bold** per case study; **Plus Jakarta Sans substituted by user direction** — sizes/weights map: Cabinet Grotesk Bold → PlusJakartaSans_700Bold, Medium → PlusJakartaSans_500Medium, Regular → PlusJakartaSans_400Regular. **No light mode.** This image IS the source-of-truth `ahavah-design-tokens/colors.ts` — verify alignment. Note: hex `#D7FF81` shown next to Pinkish Red label is a typo in the source image (lime hex paired with pink); the actual Pinkish Red is `#FF4566` per the heart shape rendering. |
| 14 | `c8ce3e…` | Hero/cover ("dateasy" wordmark + phone + tagline) | **Marketing hero composition for `ahavah-web` landing.** Wordmark super-large (~30% canvas height) left-aligned in display Bold white, with a huge lavender 4-point sparkle floating LEFT of the wordmark at scale-matched height. iPhone mockup centered showing swipe deck. Tagline right-aligned with "easy" in lime pill + "fun" in lavender pill embedded inline ("Find your match easy and fun"). Body copy bottom-left small. **Phone mockup background canvas inside the device is INDIGO `#5524F5`, not pure black** — confirms in-app surface is indigo, not black. |
| 15 | `e01936…` | Feature mind-map | **Validates the screen + nav inventory.** Bottom-nav locks 4 destinations: **Discover** (main page) / **Matches** ("People liked you") / **Messages** (Chat) / **Profile**. Auth flow: Sign In → Phone number → Confirmation code → Enable location services → Onboarding (Set name → Set birth date → Set gender → Set preferences → Personality test → Set interests). Profile sub-screens: View / Edit / Payment methods / Notification settings / Change subscription / Set email / Set phone number / Logout. Chat sub-screens: View list / View stories / Search chats / Send messages / Send voice / Block user. **Stories appear at both Main Page and Chat surfaces** — confirm we want stories pre-launch (currently scoped post-launch in Phase 7). |
| 16 | `f5fcfc…` | Marketing collage (people photos + word cloud) | **`ahavah-web` "Why us" composition.** Single-word concept tags in alternating colors (`date / chatting / connect / discussing / friendship / love / parties`) on a tall indigo card; some words have inline sticker shapes (sparkle, target rings, triangle) as accents. People-photo composition: rounded-16 photos at varied sizes, slight rotation (±3°), candid + warm-toned (NOT stock-corporate). Word arcs in lime overlap photo edges — for the web landing only. |

---

## Per-element rules — extracted from image 9 (the UI kit)

### Brand mark (4-point sparkle on tile)

- **Shape:** 4-point sparkle/diamond with concave inner sides (a `+` rotated 45° with star-like negative space), centered in a rounded-rect tile at radius ~24% of tile size.
- **Primary lockup:** lime sparkle on dark indigo tile (`#5524F5` or `#1A1340`).
- **Alternate:** white sparkle on indigo tile.
- **Hero variant** (per image 14): mark sized to wordmark height, lavender, sits LEFT of the wordmark with a small gap (~mark-width × 0.3).
- **Wordmark:** Plus Jakarta Sans Bold (substituted), tight letter-spacing (~-0.02em), lowercase, white on dark canvas.
- **Lockup composition:** mark on the LEFT of the wordmark; mark right-edge to wordmark-baseline gap = 0.4× tile size.

### Buttons

| Variant | Fill | Text | Border | Radius | Use |
|---|---|---|---|---|---|
| Primary | lime `#D7FF81` | dark | none | **18** | "Find out your personality type" / "Continue" — commits |
| Secondary (apply) | lavender `#BC96FF` | dark | none | **18** | "Apply filters" / "Confirm" — modifies/applies |
| Outline | transparent | white | indigo 1.5px | **18** | "Edit profile info" — navigation |
| Icon-circle (filled) | colored 40 | white glyph | none | **20 (=full circle)** | tertiary actions: 👁 / + / ❤ / × |
| Icon-circle (outline) | transparent 40 | indigo glyph | indigo 1.5px | **20** | toolbar slots |
| Tag/Pill (selected) | lime | dark | none | **14** | "Cooking" / `94%` |
| Tag/Pill (unselected) | transparent | lavender | lavender 1.5px | **14** | "Knitting" / "Friendship" |

**Critical:** all Pills + PillButton are **rounded-rect at radius 14-18**, NOT `rounded-full`. The current build uses `rounded-full` and is wrong.

### Form fields (filled indigo treatment)

- **Container:** dark indigo `#1A1340` (`bg-card`), no border, soft inner shadow at top inside (4px ~12% opacity)
- **Label:** 11px, secondary tone, sits ABOVE the input
- **Value:** 14px white, single-line OR multi-line for textarea
- **Multi-line variant ("About me"):** identical container with optional pencil/edit icon at top-right when editable
- **Radius:** 16 (slightly less than buttons; visual "input ≠ action")
- **Height:** single-line 56, multi-line auto-grow up to 5 lines

### Icons

- **Style:** outline, 1.5px stroke, 24px box, square corners on icons (not rounded line caps)
- **Family:** Phosphor Outline OR Tabler Outline (lock in Phase D Task D.1)
- **Don't mix families.** ~80 icons total app-wide.

### Stickers (decorative shapes)

12 variants from images 9 + 10:

1. `sparkle-4pt` — 4-point lime/lavender sparkle (also brand mark shape)
2. `heart` — pink-red rounded heart
3. `quad-star` — 4-pointed star (lime/lavender)
4. `pent-star` — 5-pointed star (lavender)
5. `flower` — 5-petal lavender
6. `blob` — organic lavender squiggle
7. `triangle` — yellow/lime
8. `wavy` — red wavy line
9. `dot` — small lavender circle
10. `circle-large` — indigo solid disc with white text overlay capability
11. `pentagon` — lavender 5-sided shape
12. `cross-target` — concentric rings (used in image 16)

All have **2px black outline stroke**, soft drop shadow `(0 2 8 rgba(0,0,0,0.25))`. Sized via `size` prop (default 32).

### Spacing scale (locked, matches `ahavah-design-tokens/spacing.ts`)

`4 / 8 / 12 / 16 / 18 / 20 / 24 / 32 / 40 / 48 / 52 / 56 / 64 / 72 / 80 / 96`

### Radius scale (corrected)

| Token | Value | Use |
|---|---|---|
| `sm` | 8 | inline tags, badges |
| `md` | 14 | Pills (chips) |
| `lg` | 18 | Buttons + PillButtons |
| `xl` | 20 | Form fields, action-icon circles, lime active tab indicator |
| `2xl` | 24 | Cards |
| `3xl` | 28-32 | BottomNavBar bar |
| `pill` | 9999 | RESERVED — voice message bubbles + story rings only |

**Audit gap:** I used `rounded-full` (= `pill`) for Pills, PillButton, BottomNavBar bar — wrong per references. Corrections in atom-corrections section below.

---

## Per-screen layout rules — from images 5, 6, 7, 12, 14

### Discover / Swipe deck (image 12 left phone)

```
┌──────────────────────────────────┐  status bar (system)
│ [Mark]              [Avatar•]    │  16/16 insets
│                                   │
│      ┌──────────────────┐        │
│      │ [Compat 94%]     │        │  card 90% width, top inset 12 left/right 12 from card-edge
│      │                  │        │
│      │      photo       │        │  photo fills, gradient bottom-40%
│      │                  │        │
│      │  Jessica Maple, 25│       │  bottom-left padded 24
│      │  📍 3 km away     │       │
│      └──────────────────┘        │
│                                   │
│   (X)    (▶ play)    (♥)         │  48 / 64 / 48 with 24 gap
│  lavender   lime     pink-red    │
│                                   │
│  ┌─[✦]─[♥]─[✉]─[☻]─┐             │  BottomNavBar — rounded-rect 28, indigo bg
│  └────────────────┘              │  active glyph in lime CIRCLE 40
└──────────────────────────────────┘  bottom safe-area
```

### Filters drawer (image 12 right phone)

```
┌──────────────────────────────────┐
│ Filters                       [×]│  HeaderBar transparent
│                                   │
│ Looking for:                      │  section label, 14 secondary
│ [Relationship][Friendship]        │  Pills (multi-select), gap 8
│                                   │
│ Show me:                          │
│ [Men] [Women] [All]              │  Pills (single-select, Women lime)
│                                   │
│ Preferred age           18-23     │
│ ●━━━━━━━━━━━━━━●━━━━━            │  RangeSlider, lime track
│                                   │
│ Preferred distance      1 km     │
│ ●━━━━━━━━━━━━━━━━━━━━━           │  Slider single thumb
│                                   │
│ ┌───────────────────────────┐    │
│ │      Apply filters         │   │  PillButton (LAVENDER) full-width
│ └───────────────────────────┘    │
└──────────────────────────────────┘
```

### Profile detail (image 7)

```
┌──────────────────────────────────┐
│ ◀                            ⋯   │  HeaderBar transparent
│                                   │
│         ████████████              │  photo fills 60% screen height
│         █  full-bleed █           │
│         █    photo    █           │
│         ████████████              │
│ Jessica Maple, 25                 │  Heading, padded 24
│ 📍 3 km away                      │  Caption
│                                   │
│ [Cooking][Music][Hiking]          │  Interest Pills, mixed lime/lavender
│                                   │
│ Bio paragraph in Body Regular...  │
│                                   │
│  (X)    (♥)        (✉)           │  action row over translucent blur
└──────────────────────────────────┘
```

### Match screen (image 6)

Choreography per Task D.3 below. Static composition:

```
┌──────────────────────────────────┐
│  ✦                  ❤            │  scattered confetti
│                                   │
│       ╲ ╱                         │
│      ┌────┐ ┌────┐               │  two profile thumbnails, top offset right + rotated +3°
│      │ M  │ │ J  │               │
│      └────┘ └────┘               │
│       ╱ ╲                         │
│                                   │
│      It's a match!                │  display Bold ~32, lavender pill bg
│   You and Jessica liked           │  body 14 secondary
│        each other                 │
│                                   │
│ ┌───────────────────────────┐    │
│ │ Say hi                  ➤ │    │  ChatInput
│ └───────────────────────────┘    │
│                                   │
│              ×                    │
└──────────────────────────────────┘
```

### Chat thread (image 3)

```
┌──────────────────────────────────┐
│ ◀ [Avatar] Mary, 23  Online   ⋯  │  HeaderBar default
│                                   │
│  [them lavender bubble]           │  avatar shown for first of each run
│                                   │
│            [me lime bubble]      │
│                                   │
│  [them lavender + photo grid 2x2] │
│                                   │
│  [voice message: ▶ ▁▂▃▆▃▁ 0:13]  │  voice bubble, lime play button
│                                   │
│                       [sticker]   │  optional sticker callout
│                                   │
│ ┌─────────────────────────────┐  │
│ │📎 Type something…         ➤│  │  ChatInput
│ └─────────────────────────────┘  │
└──────────────────────────────────┘
```

---

## Conflict resolutions (D.0 Step 5)

| Conflict | Source images | Resolution |
|---|---|---|
| Lime CTA vs lavender CTA | 9 (lime "Find out…") vs 12 (lavender "Apply filters") | **Lime = primary action ("commit/continue")**; **lavender = modifier action ("apply settings / confirm choice within a sub-flow")**. Sign-up CTA is lime; "Apply filters" is lavender; "Confirm" personality-test is lavender (it's confirming a sub-step). |
| Pill radius full vs rounded-rect | 9 ("UI kit" white pill in top-left) vs 9 (tag pills) | **The white "UI kit" pill is a Behance section-label, NOT an app component.** App tags / pills always rounded-rect 14. |
| Card border dashed vs solid | 9 (dashed strokes around UI kit cards) vs 12 (solid card surfaces in app screens) | **Dashed strokes are Behance presentation chrome, NOT in-app.** App cards have NO dashed borders; use solid `bg-bg-card` background with optional 1px solid `border-border`. |
| Pure black vs indigo canvas | 13 (pure black palette canvas) vs 14 (indigo phone canvas) | **Pure black = editorial / marketing surface only** (welcome, splash, brand-stage). **Indigo `#5524F5` or `#1A1340` = in-app screens** (post-login). The dark token (`bg.DEFAULT='#000000'`) stays for marketing surfaces; in-app screens use `bg.elevated='#0F0B1F'` or a new `bg.indigo='#1A1340'` token. |
| Cabinet Grotesk vs Plus Jakarta Sans | 13 (specifies Cabinet Grotesk) vs user direction | **Plus Jakarta Sans wins** by user direction. Don't re-litigate. Weight mapping: CG Bold → PJS_700Bold, CG Medium → PJS_500Medium, CG Regular → PJS_400Regular. |
| Stories present vs scoped post-launch | 15 (mindmap shows stories on Main + Chat) vs current Phase 6/7 split | **Stories are post-launch (Phase 7).** Pre-launch surface in Discover is the SwipeCard only; Chat list shows new-matches StoryRing carousel WITHOUT story content (taps just open the chat). |
| BottomNavBar 5 tabs vs 4 tabs | Current navigator (5: Search/Feed/Inbox/Visitors/Profile) vs locked spec (4: Discover/Matches/Inbox/Profile per image 15) | **4-tab shape locked.** Existing 5-route navigator is duolicious-inherited; renaming to the 4-tab shape is a separate Phase 6 task. The atom (BottomNavBar) accepts both via the `tabs` prop; the navigator rename happens alongside the screen rewires in Phase 6 Task 6.2. |

---

## Sign-off (D.0 Step 6)

Signed: **implementer (Pattern 3, autonomous mode)**, date 2026-05-09. Phase D Tasks D.1–D.6 are unblocked.
