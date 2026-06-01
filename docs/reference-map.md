# Reference image map — which Dateasy image pins each atom + each screen

**Phase D Task D.0 Steps 3+4 deliverable.** Per the plan, each Phase 6 atom and screen gets a reference image pinned at the source. Mid-session SVG cropping is brittle, so this doc is the single source of truth — it specifies exactly which source image (and which crop region) pins each component. When physical cropping happens (an automated step we can wire later), it reads from this file.

Source images live at `d:/Antigravity/docs/specs/look-and-feel/`.

---

## Per-atom references (D.0 Step 3)

For each atom, **source image** + **crop hint** (region within the image) + **dest path** (where the cropped reference belongs in the repo).

| Atom | Source image | Crop hint | Dest path |
|------|--------------|-----------|-----------|
| `BrandMark` (full lockup) | `c8ce3e…` | full hero (sparkle + "dateasy" wordmark) | `components/ui/brand-mark.reference.png` |
| `BrandMark` (icon-only on tile) | `523365…` | bottom-left UI-kit panel: lime-square + black-bordered logo tiles | `components/ui/brand-mark.icon.reference.png` |
| `Heading` / `Body` / `Caption` / `Numeric` | `a393f0…` | bottom-left "Cabinet Grotesk" panel | `components/ui/typography.reference.png` |
| `Button` (primary lime) | `523365…` | top-right Buttons panel, "Find out your personality type" row | `components/ui/button.primary.reference.png` |
| `Button` (secondary lavender) | `523365…` | top-right Buttons panel, "Confirm" row | `components/ui/button.secondary.reference.png` |
| `Button` (outline) | `523365…` | top-right Buttons panel, "Edit profile info" row | `components/ui/button.outline.reference.png` |
| `IconButton` (filled) | `523365…` | top-right Buttons panel, bottom row of 4 colored circles (👁 + ❤ ×) | `components/ui/icon-button.filled.reference.png` |
| `IconButton` (outline) | `85a576…` | left phone, top-right own-avatar circle (with notification dot) | `components/ui/icon-button.outline.reference.png` |
| `PillButton` (lime) | `4c75b8…` | bottom interest-tag grid + image 9 button row | `components/ui/pill-button.lime.reference.png` |
| `PillButton` (lavender) | `85a576…` | right phone, "Apply filters" CTA at bottom | `components/ui/pill-button.lavender.reference.png` |
| `Pill` (selected lime) | `523365…` | middle Tags panel, "94%" + "Cooking" pills | `components/ui/pill.selected.reference.png` |
| `Pill` (unselected lavender outline) | `523365…` | middle Tags panel, "Knitting" + "Friendship" pills | `components/ui/pill.unselected.reference.png` |
| `Pill` (interest grid lime fill) | `4c75b8…` | bottom interest tag grid (Cooking / Art / Development / …) | `components/ui/pill.interest.reference.png` |
| `RadioStepper` | `3ae963…` | left phone "I'm comfortable making new acquaintances" — 5 hollow circles below | `components/ui/radio-stepper.reference.png` |
| `Sheet` / `HeaderBar` (transparent over photo) | `48837f…` | left phone, top-of-photo with back arrow + dots | `components/ui/header-bar.transparent.reference.png` |
| `HeaderBar` (default) | `23a18a…` | middle phone, "Chat" title + search-glass | `components/ui/header-bar.default.reference.png` |
| `BottomNavBar` | `85a576…` | left phone, bottom floating nav bar with 4 circular icons (active = sparkle in lime circle) | `components/ui/bottom-nav-bar.reference.png` |
| `BottomNavBar` (Chat tab active) | `23a18a…` | middle phone, bottom nav with chat-bubble in lime circle | `components/ui/bottom-nav-bar.chat.reference.png` |
| `Card` (flat) | `23a18a…` | middle phone, individual chat-list rows (Lucy 22 / Margareth 21) | `components/ui/card.flat.reference.png` |
| `Card` (elevated) | `523365…` | bottom-right Forms panel | `components/ui/card.elevated.reference.png` |
| `Card` (gradient/premium) | `3ae963…` | bottom-right phone "Premium / 50 stories" gradient card | `components/ui/card.gradient.reference.png` |
| `SwipeCard` | `85a576…` | left phone, full Jessica-Maple photo card with Compat pill + caption | `components/ui/swipe-card.reference.png` |
| `CompatibilityPill` | `85a576…` | left phone, top-right of swipe card "94%" lime pill | `components/ui/compatibility-pill.reference.png` |
| `Avatar` (circular) | `23a18a…` | middle phone, chat-list avatars | `components/ui/avatar.reference.png` |
| `StoryRing` | `23a18a…` | middle phone, story-row above chat list | `components/ui/story-ring.reference.png` |
| `VerifiedBadge` | (no Dateasy reference — Ahavah-specific extension; current tier-coloured-disc design stands) | — | `components/ui/verified-badge.reference.png` (own design ref) |
| `TextInput` (filled indigo, single-line) | `523365…` | bottom-right Forms panel, "First name / Michael" + "Say hi" rows | `components/ui/text-input.reference.png` |
| `TextInput` (multi-line / textarea) | `523365…` | bottom-right Forms panel, "About me / I believe in embracing…" multi-line | `components/ui/text-input.multiline.reference.png` |
| `ChatInput` | `23a18a…` | right phone, bottom "Type something…" with paperclip + send | `components/ui/chat-input.reference.png` |
| `Bubble` (me lime) | `23a18a…` | right phone, lime bubbles on right | `components/ui/bubble.me.reference.png` |
| `Bubble` (them lavender) | `23a18a…` | right phone, lavender bubbles on left | `components/ui/bubble.them.reference.png` |
| `Bubble` (image grid) | `23a18a…` | right phone, 2×2 photo grid bubble | `components/ui/bubble.image.reference.png` |
| `Bubble` (voice) | `23a18a…` | right phone, voice waveform bubble | `components/ui/bubble.voice.reference.png` |
| `StickerCallout` ("Awesome") | `523365…` | top-middle Stickers panel, "Awesome" lime+lavender pill | `components/ui/sticker-callout.reference.png` |
| `StickerBadge variant="sparkle-4pt"` | `523365…` | bottom-left logo tile sparkle | `components/ui/sticker-badge/sparkle-4pt.reference.png` |
| `StickerBadge variant="heart"` | `5df395…` | top of phone-in-hand image, red heart with "how you doing?" | `components/ui/sticker-badge/heart.reference.png` |
| `StickerBadge variant="quad-star"` | `5df395…` | top of phone-in-hand image, lime quad-star at center | `components/ui/sticker-badge/quad-star.reference.png` |
| `StickerBadge variant="pent-star"` | `5df395…` | top of phone-in-hand image, "L.O.V.E" yellow 5-point star | `components/ui/sticker-badge/pent-star.reference.png` |
| `StickerBadge variant="flower"` | `5df395…` | top of phone-in-hand image, lavender 5-petal flower with "hello!" | `components/ui/sticker-badge/flower.reference.png` |
| `StickerBadge variant="blob"` | `5df395…` | top of phone-in-hand image, lavender squiggle/blob | `components/ui/sticker-badge/blob.reference.png` |
| `StickerBadge variant="triangle"` | `5df395…` | top of phone-in-hand image, yellow triangle | `components/ui/sticker-badge/triangle.reference.png` |
| `StickerBadge variant="wavy"` | `5df395…` | top of phone-in-hand image, red wavy line | `components/ui/sticker-badge/wavy.reference.png` |
| `StickerBadge variant="dot"` | `5df395…` | top of phone-in-hand image, small lavender dot | `components/ui/sticker-badge/dot.reference.png` |
| `StickerBadge variant="circle-large"` | `41958b…` | "It's a match!" mockup, large lime + indigo discs | `components/ui/sticker-badge/circle-large.reference.png` |
| `StickerBadge variant="pentagon"` | `4c75b8…` | hero text composition, lavender pentagon behind "dating" | `components/ui/sticker-badge/pentagon.reference.png` |
| `StickerBadge variant="cross-target"` | `f5fcfc…` | indigo word card, concentric ring shapes | `components/ui/sticker-badge/cross-target.reference.png` |
| `MatchConfetti variant="match"` | `41958b…` | full mockup composition (8-12 stickers scattered around match scene) | `components/ui/match-confetti.match.reference.png` |
| `MatchConfetti variant="splash"` | `c8ce3e…` | sparser sparkle floating left of wordmark | `components/ui/match-confetti.splash.reference.png` |
| `MatchConfetti variant="empty-state"` | `5df395…` | sticker arrangement above the phone (low-saturation feel) | `components/ui/match-confetti.empty.reference.png` |
| `EmptyState` | (no direct Dateasy reference — extrapolated from sticker-confetti vocabulary; uses MatchConfetti splash variant + Heading + Body + lime CTA) | — | `components/ui/empty-state.reference.png` (own design ref) |
| `Toast` / `Banner` | (no Dateasy reference — extrapolated using `bg-card` + lime/lavender accent strip per variant) | — | `components/ui/toast.reference.png` (own design ref) |
| `Skeleton` | (no Dateasy reference — extrapolated as low-opacity `bg-card` rectangles matching destination atom shape) | — | `components/ui/skeleton.reference.png` (own design ref) |

---

## Per-screen references (D.0 Step 4)

For each Phase 6 Task 6.2 screen, **primary source image** that pins the layout. Where Dateasy doesn't have a 1:1 (e.g. our chat list has stories + search Dateasy doesn't show), the primary image is the closest stylistic anchor and the extension is documented as a derivative below the table.

### Group A — Auth & onboarding

| Screen | Primary reference | Notes |
|--------|-------------------|-------|
| A1 Splash | `c8ce3e…` | Hero composition: sparkle + wordmark; current splash already lime-on-black, needs sparkle |
| A2 Sign-in | (extrapolated from kit) | 4 stacked auth options on dark canvas with BrandMark hero. Extension: option rows = outline buttons, reuses Button atom |
| A3 Sign-up | (same as A2) | shared layout pattern |
| A4 Email verification | (extrapolated) | indigo card with email icon + status |
| A5 Phone verification (CodeInput) | (extrapolated) | 6-box OTP, indigo input wells |
| A6 Onboarding intro | `f5fcfc…` | 3 swipeable slides over photo+sticker compositions |
| A7 Name | `3ae963…` | personality-test screen pattern adapted: filled-indigo TextInput |
| A8 DOB | (extrapolated) | wheel picker on indigo, lime PillButton |
| A9 Gender | `85a576…` (filters drawer "Show me:" segmented control) | SegmentedControl pattern |
| A10 Looking-for | `85a576…` (filters drawer "Looking for:" multi-select pills) | Pill multi-select |
| A11 Photos | `48837f…` (profile carousel pattern) | 6 photo slots, drag-to-reorder |
| A12 Country | (extrapolated, uses CountryPicker Sheet) | Sheet over indigo |
| A13 Languages | (extrapolated, uses LanguagePicker Sheet) | Sheet over indigo |
| A14 Primary language | (extrapolated) | single-select Sheet |
| A15 Bio | `523365…` (Forms panel "About me" multi-line) | filled-indigo textarea |
| A16 Personality stepper | `3ae963…` | RadioStepper, one-question-per-screen |
| A17-A19 Permission prompts | (extrapolated) | indigo card with icon + value-prop + lime CTA |
| A20 Onboarding complete | `41958b…` | confetti celebration |

### Group B — Discovery & matching

| Screen | Primary reference | Notes |
|--------|-------------------|-------|
| B1 Swipe deck | `85a576…` (left phone) | the canonical reference |
| B2 Profile detail | `48837f…` (left phone) | photo header + interest pills + bio + action row |
| B3 Match screen | `41958b…` + `c8ce3e…` (match scene + confetti choreography) | 8-12 stickers + 2 cards + ChatInput |
| B4 Filters drawer | `85a576…` (right phone) | the canonical filter reference |
| B5 Empty deck | (extrapolated, uses EmptyState atom) | filter-too-narrow variant |
| B6 Recently swiped (premium) | `765247…` (premium card visible in overview) | premium-gated list |

### Group C — Chat

| Screen | Primary reference | Notes |
|--------|-------------------|-------|
| C1 Chat list | `23a18a…` (middle phone) | StoryRing carousel + ChatListRow scroll |
| C2 Chat thread | `23a18a…` (right phone) | Bubbles + ChatInput |
| C3 Voice recording overlay | `23a18a…` (voice bubble extracted) | hold-to-record waveform |
| C4 Image picker (in-chat) | (extrapolated, photo grid pattern from `23a18a…` right phone) | sheet with grid |
| C5 Block / report flow | (extrapolated, Sheet from kebab menu) | category list |
| C6 Conversation safety tip | (extrapolated, uses Banner atom) | first-time-only modal |

### Group D — Verification

| Screen | Primary reference | Notes |
|--------|-------------------|-------|
| D1 Verification overview | (extrapolated, Card.gradient pattern from `3ae963…` premium card) | 3 tiers side-by-side |
| D2 Bronze (selfie) flow | (existing duolicious flow restyled) | Camera + indigo HeaderBar |
| D3 Silver (liveness) flow | (Amplify SDK component — its own UI) | wrapped in indigo chrome |
| D4 Gold (ID) flow | (Stripe Identity webview — its own UI) | wrapped in indigo chrome |

### Group E — Profile + settings

| Screen | Primary reference | Notes |
|--------|-------------------|-------|
| E1 Own profile | `48837f…` adapted | edit affordances, settings button |
| E2 Edit profile | `3ae963…` (right phone, profile edit) | row of indigo cards with field labels |
| E3 Settings | `3ae963…` adapted | ListItem pattern |
| E4 Notifications settings | (extrapolated, Switch atom) | row list with switches |
| E5 Privacy settings | (extrapolated) | row list |
| E6 Subscription / billing | `3ae963…` (Premium card, right-bottom phone) | gradient card with stat |
| E7 Block list | (extrapolated, ListItem rows) | trailing unblock button |
| E8 Help / safety center | (extrapolated, Card pattern) | rich content cards |
| E9 Logout / delete account | (extrapolated, destructive Button) | confirmation flow |

---

## Atoms with no Dateasy reference — Ahavah-specific extensions

These are atoms the case study doesn't depict. They're built within Dateasy's idiom (palette, type, sticker/sparkle vocabulary) but their visual is original to Ahavah:

- `VerifiedBadge` — Phase 3 verification tiers
- `EmptyState` — uses sticker-vocabulary illustrations
- `Toast`, `Banner` — uses bg-card + accent strip per variant
- `Skeleton` — opacity-50 versions of destination atom shapes
- `PermissionPrompt` — uses Card + lime CTA
- `PaywallCard` — uses gradient Card variant
- `HapticTrigger` — invisible utility wrapper
- `CountryFlag` — emoji wrapper

These are signed off in this doc as "Pattern 3 extension"; no kit-conformance needed.

---

## How this doc gets used

**Today:** Phase 6 atom builds open this doc, find their row, look at the named source image to inform implementation. Pixel-diff against Figma is gated until Phase D Task D.2 produces the in-code Storybook (showcase screen), but visual conformance can already be eyeballed against the listed source image.

**Later:** an automated step (sharp + ImageMagick + crop hints) can read this file and produce the actual cropped `reference.png` files at the listed dest paths. That's a separate ~1-day lift; not blocking Phase 6.
