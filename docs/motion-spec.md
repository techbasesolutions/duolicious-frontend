# Motion + interaction spec — Ahavah

**Phase D Task D.3 deliverable.** "Tinder feels Tinder because of the spring curves, not the colors." This document defines motion primitives + per-screen transitions + the swipe gesture spec + match choreography + microinteractions + reduce-motion compliance.

---

## Motion tokens

### Durations

| Token | Value | Use |
|-------|-------|-----|
| `instant` | 0ms | Tap-state color flips, immediate visual response |
| `fast` | 150ms | Press states, hover (web), small fades |
| `base` | 250ms | Default — modal open/close, sheet slide, opacity changes |
| `slow` | 400ms | Page transitions, hero animations |

### Easings

| Token | curve | Use |
|-------|-------|-----|
| `ease-out-quint` | cubic-bezier(0.22, 1, 0.36, 1) | Default — natural deceleration; opens, slide-ins |
| `ease-in-out-cubic` | cubic-bezier(0.65, 0, 0.35, 1) | Symmetric in/out; toggles, accordions |
| `ease-out-back` | overshoots slightly | Match-screen hero text "It's a match!" stretch-in |

### Spring presets (reanimated)

| Preset | Config | Use |
|--------|--------|-----|
| `snappy` | `{damping: 18, stiffness: 250, mass: 1}` | Swipe spring-back, pill press feedback |
| `smooth` | `{damping: 26, stiffness: 180, mass: 1}` | Sheet slide, modal entry, BottomNavBar tab switch |
| `bouncy` | `{damping: 12, stiffness: 200, mass: 1}` | Match-confetti entry, like-pulse |

These tokens live in `ahavah-design-tokens/motion.ts` (NEW — to be added with the radius update batch).

---

## Per-screen transitions

| Surface | Default | Override |
|---------|---------|----------|
| Native stack push | slide-from-right, `slow / ease-out-quint` | iOS home/discover ↔ profile-detail uses `hero-image` shared-element transition |
| Modal up (paywall, match) | slide-from-bottom, `base / ease-out-quint` | match screen uses scale-up with confetti choreography |
| Sheet (filters, country picker) | slide-from-bottom, `base / smooth` spring | swipe-down to dismiss; gesture-driven follows finger |
| Tab switch (BottomNavBar) | crossfade, `fast / linear` | active tab indicator springs into place with `smooth` |
| Photo gallery dismiss | gesture-driven scale + fade | finger drag down 1:1, completion-snap with `snappy` |

---

## Swipe gesture spec (the critical one)

### Card rotation curve

- **Max rotation:** ±15° at 50% screen width drag.
- **Linear mapping:** `rotation = (translationX / screenWidth) * 30deg` (so 50% = 15°).
- **Pivot point:** card horizontal center, vertical bottom (~60% down from top edge).

### Opacity ramp on LIKE / NOPE overlays

- **Threshold to start showing:** 5% drag.
- **Full opacity at:** 30% drag.
- **Ramp curve:** linear interpolation between thresholds.
- **LIKE overlay:** lime color, top-right anchored, rotated -15°.
- **NOPE overlay:** pink-red color, top-left anchored, rotated +15°.

### Velocity threshold for auto-commit

- **Threshold:** 1200 px/s in direction of swipe.
- **Below threshold + < 30% drag:** spring-back to center using `snappy`.
- **Above threshold OR > 30% drag:** auto-fly card off-screen at current velocity, complete in 150ms.

### Card-stack visual

- **Active card:** scale 1.0, offset 0, opacity 1.
- **Card behind active:** scale 0.94, offset y +8, opacity 0.7.
- **Card behind that:** scale 0.88, offset y +16, opacity 0.4.
- **Cards 4+:** not rendered (perf).

### Pre-fetch trigger

When candidate queue length < 4, fire `GET /search?cursor=<last>` in background.

### Reduce-motion mode

When OS reduce-motion is on:
- Disable rotation entirely (card moves linear, no rotate).
- LIKE/NOPE overlays still appear (state communication is essential) but at full opacity from 5% drag (no ramp).
- Spring-back becomes linear `base / ease-in-out-cubic`.
- Card-stack scale offset removed (just opacity stack).

**Pin a 60fps reference video** — TODO when first build runs on real hardware. Until then: developer must verify on iPhone 13 simulator + a mid-tier Android (e.g. Pixel 6) that the swipe runs at 60fps via Reanimated's frame-drop logger.

---

## Match-screen choreography

Total scene under 1.2s.

```
t=0ms     Two profile cards fade in + scale up from 0.8 → 1.0 (smooth spring)
t=200ms   Cards settle, "It's a match!" text begins
t=200ms   Confetti staggered entry (heart, sparkle, blob, star, pent-star, …)
            - heart   t=200ms   from top-left   bouncy spring 80% scale-up
            - sparkle t=260ms   from top-right
            - blob    t=320ms   from bottom-left
            - star    t=380ms   from bottom-right
            - … each 60ms after the previous
t=600ms   "It's a match!" text stretch-in (ease-out-back, 200ms)
t=800ms   ChatInput fades in from below + 12px slide
t=1000ms  Close X fades in
t=1200ms  Scene at rest
```

### Reduce-motion variant

Total scene 300ms. All elements fade in simultaneously, no stagger, no spring, no scale animation. Static positioning only.

---

## Microinteractions

| Interaction | Behavior |
|-------------|----------|
| Like-button pulse on press | Scale 1.0 → 1.15 → 1.0 over 200ms, bouncy spring |
| Pass-button press | Scale 1.0 → 0.92 → 1.0 over 150ms, ease-out |
| Pill press | Background flashes elevated for 80ms |
| List row press | Background flashes bg.elevated for 80ms |
| Message-send icon sequence | sending (spinner) → sent (single check 150ms) → delivered (double check 150ms) → read (double check turns lime, 100ms) |
| Unread badge pop-in | Scale 0 → 1.2 → 1.0 over 250ms, bouncy |
| Story-ring gradient sweep on unread | 360° rotation of gradient over 3s, infinite, paused on tap |
| Text input focus | Border glow lime 150ms ease-out |
| Toast entry | Slide-from-top + fade, base / smooth spring |
| Toast exit | Fade out + slide-up, fast / ease-out-quint |
| Tab switch on BottomNavBar | Active lime circle scales 0 → 1.0 on new tab, scale 1.0 → 0 on previous tab; both 200ms, bouncy |
| Sheet swipe-down dismiss | Follows finger 1:1; release < 50% with low velocity → snap back; otherwise dismiss with `snappy` |
| Modal close gesture | Fades opacity proportional to drag; release > 40% closes with `smooth` |

---

## Reduce-motion compliance (D.3 last bullet)

Honoring `AccessibilityInfo.isReduceMotionEnabled()`:

| Affected behavior | Reduce-motion alternative |
|-------------------|---------------------------|
| Swipe rotation | Linear translation only |
| LIKE/NOPE opacity ramp | Threshold flip (visible/invisible at 5% drag) |
| Match confetti staggered entry | Single fade-in, all stickers at final positions |
| Card-stack scale offset | Opacity-only stack |
| Like-button pulse | Color flash only, no scale |
| Story-ring gradient sweep | Static (no rotation) |
| Page slide transitions | Crossfade only |
| Spring physics | Linear ease-out duration-matched |

A single hook `useReducedMotion()` reads the AccessibilityInfo state once at mount + listens to changes; every animation reads from this hook to pick its variant. No per-component opt-in.

---

## Sign-off

Implementer (Pattern 3, autonomous mode), 2026-05-09. D.4 unblocked.
