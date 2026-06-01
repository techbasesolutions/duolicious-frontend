# Haptic + sound spec — Ahavah

**Phase D Task D.4 deliverable.** Haptics fire via `expo-haptics`. Sound is opt-in (off by default, settings toggle under Notifications). Use the `<HapticTrigger />` atom (D.2) to wire haptics consistently — never call `Haptics.impactAsync(...)` directly inside business logic.

---

## Haptic mapping

| Interaction | Haptic | Notes |
|-------------|--------|-------|
| List scroll past section header | `selection` | Subtle — only on chat-list section dividers + filters drawer sections |
| CountryPicker / LanguagePicker selection | `selection` | Confirms a tap inside the sheet |
| SegmentedControl change | `selection` | Confirms which segment is now active |
| Pill toggle (interest, filter) | `selection` | Confirms add/remove from set |
| Switch toggle | `selection` | Standard |
| Like swipe commit | `impactLight` | Fires when card crosses commit threshold OR auto-commits via velocity |
| Pass swipe commit | `impactLight` | Same threshold logic |
| Match | `impactMedium` + `notificationSuccess` | Fires both — the impact is felt during the choreography start, the success notification fires once "It's a match!" text appears |
| Boost activation | `impactHeavy` | Major paid action; deserves the strongest haptic |
| Super-like (post-launch) | `impactHeavy` | Premium signal |
| Message sent | `notificationSuccess` | Fires when send confirms (not when tapped) |
| Photo uploaded successfully | `notificationSuccess` | Includes moderation pass |
| Verification pass | `notificationSuccess` | Bronze/Silver/Gold tier promotion |
| Money-mention banner appears | `notificationWarning` | Anti-scam Phase 4 banner |
| Suspicious profile flag | `notificationWarning` | When detection model flags a profile |
| Auth failure | `notificationError` | Bad OTP, invalid email |
| Photo rejected | `notificationError` | Moderation failure |
| Payment declined | `notificationError` | RevenueCat failure |
| Network connection lost | `notificationError` | Once, on transition online → offline |

### Haptic-prevention rules

- **Don't fire during list scroll** outside section-header crossings — would feel buzzy.
- **Don't fire on every keystroke** — only on programmatic state changes (Pill toggle, Switch flip).
- **Debounce the `selection` haptic to 80ms** — back-to-back taps on a SegmentedControl shouldn't fire 5 selections in 400ms.
- **No haptic on web** — fallback to no-op.

---

## Sound design

Three sounds, all under 1 second, opt-in via Settings → Notifications → "Play sounds" toggle. Off by default (per the audit-style discipline of not surprising users).

| Event | Sound | Volume | Notes |
|-------|-------|--------|-------|
| Match celebration | `match-chime.m4a` | 0.6 | Fires once at t=200ms in match choreography (synced with confetti entry) |
| Message sent | `send-whoosh.m4a` | 0.3 | Subtle outbound puff |
| Notification receive (in-app, app foregrounded) | `receive-ping.m4a` | 0.4 | New incoming message while app is open; not played for push when backgrounded |

### Sourcing

- **Soundsnap** subscription ($249/yr individual) — wide library, royalty-free.
- **Pond5** as alternative — single-clip purchase $5-15 each.
- **NEVER lift from competitor apps** — copyright + brand-confusion risk.

### Mixing

- All sounds normalized to -16 LUFS so the volume between events feels consistent.
- 200ms fade-in/out applied at the file level (not at runtime) to avoid clicks.
- 16-bit / 44.1kHz mono `.m4a` for cross-platform compatibility (iOS prefers `.m4a` AAC; Android also).

### File budget

3 files × ~50KB each = 150KB. Within app-bundle budget (D.6 says < 60MB total). Bundled with the app, NOT lazy-loaded — the latency of loading on first match would be felt.

---

## Settings surface

Settings → Notifications:

```
Push notifications              ◉ on
   New matches                  ◉ on
   New messages                 ◉ on
   Profile views (premium)      ◯ off
   Translation previews (prem)  ◯ off
Sounds                          ◯ off          [opt-in]
Haptics                         ◉ on
   System default               (read-only — respects iOS/Android setting)
```

Haptics toggle defaults ON because expo-haptics defers to OS-level haptic-disable settings anyway; the in-app toggle is for users who want haptics elsewhere but not in Ahavah specifically.

---

## Sign-off

Implementer (Pattern 3, autonomous mode), 2026-05-09. D.5 unblocked.
