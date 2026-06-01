# Asset pipeline + image rules — Ahavah

**Phase D Task D.6 deliverable.** Defines the pipeline for user-uploaded photos, app-bundled assets, sticker SVGs, app icons, splash, and adaptive icons.

---

## User-uploaded photo pipeline

### Size matrix

| Slot | Resolution | Format priority | Use |
|------|------------|-----------------|-----|
| `thumb` | 150×150 | AVIF → WebP → JPEG | chat-list avatars, story-ring avatars, search-result thumbnails |
| `card` | 800×1200 | AVIF → WebP → JPEG | swipe deck, profile-detail header, match screen |
| `full` | 1080×1620 | AVIF → WebP → JPEG | photo gallery (PhotoGallery atom), full-screen viewer |

### Server-side processing

On upload, the server:

1. Runs `antiabuse/antiporn/predict_nsfw` (Phase 4 ONNX). Tier verdict via `service/photo_moderation/_verdict_from_score`.
2. If `rejected` → reject the upload synchronously, return 422 with reason.
3. If `manual_review` → store with `moderation_status='manual_review'`, surface in admin queue (Phase 4.3).
4. If `approved` → continue.
5. Generates `thumb`, `card`, `full` AVIF + WebP + JPEG (9 files per upload).
6. Computes a blurhash placeholder (used by `expo-image` while loading).
7. Stores files at `s3://ahavah-photos/<person_uuid>/<photo_uuid>.{avif,webp,jpg}`.
8. Returns to the client: `{ photo_uuid, blurhash, moderation_status }`.

### CDN choice

**Cloudflare R2 + Image Transformations** — recommended.

- $0.015/GB storage, $0 egress (R2 is the cost-saver vs. S3+CloudFront).
- Image Transformations: $0.50 per 1000 unique transforms. The 9-variant matrix per photo means we pre-generate at upload (no on-the-fly transform cost).
- Blur-hash placeholders generated server-side at upload time using the `blurhash` Python package (already in `ahavah-api/requirements.txt`).

**Cloudinary** — fallback if R2 setup gets blocked.

- Easier integration (one library handles transform + delivery + storage).
- More expensive at scale ($89/mo for the 25GB tier).

### Client-side rendering

- Use `expo-image` (NOT `Image`) — supports blurhash placeholder, AVIF, prefers caching layer.
- Pass `cachePolicy="memory-disk"` for swipe-deck photos so re-renders don't re-fetch.
- Provide `placeholder={{ blurhash }}` so cards never show a blank rectangle while loading.

---

## App-bundled asset budget

Total app size goal: **< 60 MB on first install.**

| Category | Budget | Current |
|----------|--------|---------|
| Plus Jakarta Sans (4 weights) | ~600 KB | ~600 KB ✓ |
| StickerBadge SVGs (12 variants × ~2 KB) | ~24 KB | TBD (built in this batch) |
| App icon assets | ~500 KB total | TBD |
| Splash screen assets | ~200 KB | TBD |
| Sound assets (3 × ~50 KB) | ~150 KB | TBD (post Phase D) |
| RN + Expo + native deps | ~45 MB | ~45 MB |
| Phosphor icon set (when added) | ~3 MB | not yet bundled |
| **Total** | **~50 MB** | **~46 MB** |

Headroom ~10 MB for ads. Lazy-load via OTA updates anything that pushes us over budget.

---

## Sticker SVG pipeline

Each `StickerBadge` variant ships as one SVG asset, optimized via SVGO, < 2 KB each. Stored at `assets/stickers/<variant>.svg`.

**Rendering strategy:**

- React Native: use `react-native-svg` (already a dep) — inline SVG mounted as a component. Avoids the asset-loading overhead for sub-2KB shapes.
- Web (RNW): same SVG renders as DOM `<svg>` via `react-native-svg-web`.
- Initial implementation: render the shapes as inline JSX in `<StickerBadge />` (no SVG file), since 12 shapes × ~30 lines of path data each = ~360 lines total. Extracting to per-file SVG is a perf optimization for later.

**Color customization:** all stroke + fill values set via props (defaults from the rules table in `dateasy-rules.md`); no hardcoded color in the SVG path data.

---

## App icon + splash + adaptive icon

### iOS

Generated from a single 1024×1024 master via Expo's icon set. Sizes:

- 20pt × 1/2/3 (40 / 60 / 80 px) — settings, spotlight
- 29pt × 1/2/3 (58 / 87 / 116 px) — notification
- 40pt × 1/2/3 (80 / 120 / 160 px) — spotlight
- 60pt × 2/3 (120 / 180 px) — home screen
- 76pt × 1/2 (76 / 152 px) — iPad home
- 83.5pt × 2 (167 px) — iPad Pro home
- 1024pt × 1 (1024 px) — App Store

**Master design:** lime sparkle on dark indigo (`#1A1340`) rounded-rect — matches BrandMark icon-only mode, scaled to 1024.

### Android

- Adaptive icon (foreground + background separately): 108×108 dp, with 72×72 dp safe zone.
  - Foreground: lime sparkle on transparent
  - Background: solid indigo `#1A1340`
- Legacy icon (square, for Android 7 and below): 192×192.
- Round icon: 192×192 with circular crop.

### Web

- Favicon: 32×32 PNG of the sparkle on indigo.
- Apple touch icon: 180×180.
- Android Chrome 192×192 + 512×512.

### Splash screen

- Master: 2048×2048 PNG.
- Composition: lime sparkle centered on dark indigo. Wordmark below at ~80% of canvas width.
- Background color (for the area outside the image when device aspect ratios differ): `#000000`.
- Generated via Expo's splash-screen plugin from the master.

**Tooling:** `npx @bam.tech/react-native-make set-icon` OR Expo's `expo prebuild` with `expo-icon-set`. Plan: run the Expo path in a one-shot `pnpm gen:assets` script (added in this batch's deliverables list).

---

## Marketing / web assets

For `ahavah-web` landing (Phase 6 Task 6.6):

| Asset | Source | Size | Notes |
|-------|--------|------|-------|
| App-store screenshot 1 (chat translation) | `084e77…` left phone, recreated with Ahavah brand | 1290×2796 (iPhone 15 Pro Max) | Phase 6 Task 6.6 |
| App-store screenshot 2 (match) | `084e77…` middle phone | same | |
| App-store screenshot 3 (find people) | `084e77…` right phone | same | |
| Web hero composition | `c8ce3e…` recreated | 1920×1080 | Sparkle + wordmark + phone mockup |
| OG image (social sharing) | derived from hero | 1200×630 | |
| Favicon set | sparkle | 16/32/180/192/512 | |

Generation timing: end of Phase 6 (Task 6.6 store-submission dry run). Until then, placeholder assets are fine for dev.

---

## Sign-off

Implementer (Pattern 3, autonomous mode), 2026-05-09. Phase D exit gate next.
