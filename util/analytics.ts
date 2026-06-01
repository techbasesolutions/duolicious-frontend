/**
 * Frontend telemetry — typed event taxonomy.
 *
 * Phase 0 Task 0.5. The `Event` discriminated union is the SOLE source of
 * truth for what can be tracked from the client. New event types must be
 * added here first; this prevents free-form payloads + makes funnel queries
 * deterministic.
 *
 * Backend mirrors a subset of these names in `util/analytics.py` so PostHog
 * funnel queries don't have to deduplicate.
 *
 * SDK wiring: the `track()` and `identify()` functions are no-ops until
 * `EXPO_PUBLIC_POSTHOG_KEY` is provided AND `posthog-react-native` is
 * installed (deferred to when the user provides keys). The typed contract
 * holds even when the SDK is absent — call sites compile against `track()`
 * regardless of telemetry state.
 */

// ---------------------------------------------------------------------------
// Event taxonomy
// ---------------------------------------------------------------------------

export type Event =
  // Auth + onboarding (Phase 0 + Phase 1)
  | { name: 'signup_started' }
  | { name: 'signup_completed'; props: { country: string; primary_language: string } }
  | { name: 'profile_completed' }
  | { name: 'phone_verification_started' }
  | { name: 'phone_verification_completed'; props: { fallback_used: 'whatsapp' | 'sms' | null } }

  // Verification (Phase 3)
  | { name: 'verification_started'; props: { tier: 'bronze' | 'silver' | 'gold' } }
  | { name: 'verification_succeeded'; props: { tier: 'bronze' | 'silver' | 'gold' } }
  | { name: 'verification_failed'; props: { tier: 'bronze' | 'silver' | 'gold'; reason: string } }

  // Discovery + matching (Phase 1 + Phase 6)
  | { name: 'swipe'; props: { direction: 'like' | 'pass' | 'super'; target_country: string } }
  | { name: 'swipe_deck_empty' }
  | { name: 'match_created' }
  | { name: 'filters_applied'; props: { countries_count: number; languages_count: number; verified_only: boolean } }

  // Chat + translation (Phase 2)
  | { name: 'message_sent'; props: { thread_id: string; translated: boolean; voice: boolean } }
  | { name: 'message_received'; props: { thread_id: string } }
  | { name: 'translation_used'; props: { source: string; target: string; cached: boolean } }
  | { name: 'translation_toggle'; props: { showing_original: boolean } }

  // Safety (Phase 4)
  | { name: 'safety_banner_shown'; props: { trigger: 'money_mention' | 'off_platform' | 'first_chat' } }
  | { name: 'report_submitted'; props: { category: string; thread_id?: string } }
  | { name: 'block_user' }

  // Monetization (Phase 5)
  | { name: 'paywall_shown'; props: { trigger: string } }
  | { name: 'paywall_purchase'; props: { sku: string; tier: 'monthly' | '3-month' | 'annual' | 'boost' } }
  | { name: 'paywall_dismissed'; props: { trigger: string } }
  | { name: 'restore_purchases' };

// ---------------------------------------------------------------------------
// Track / identify (env-var-gated; no-op when telemetry disabled)
// ---------------------------------------------------------------------------

const POSTHOG_KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

let _posthog: any = null;

const initPosthog = (): any => {
  if (_posthog !== null) return _posthog;
  if (!POSTHOG_KEY) return null;
  try {
    // Lazy require avoids the SDK dependency until the user actually wires it.
    // When `posthog-react-native` isn't installed, this throws, we cache null,
    // and `track()` becomes a no-op.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PostHog } = require('posthog-react-native');
    _posthog = new PostHog(POSTHOG_KEY, { host: POSTHOG_HOST });
    return _posthog;
  } catch {
    _posthog = null;
    return null;
  }
};

/**
 * Emit a typed product event. Compile-time safe: TypeScript enforces every
 * event has the exact shape declared in the `Event` union.
 *
 * Telemetry state:
 *   - `EXPO_PUBLIC_POSTHOG_KEY` unset → no-op (silent)
 *   - `posthog-react-native` not installed → no-op (silent)
 *   - both present → fires the event
 */
export function track(event: Event): void {
  const ph = initPosthog();
  if (!ph) return;
  try {
    if ('props' in event) {
      ph.capture(event.name, event.props);
    } else {
      ph.capture(event.name);
    }
  } catch (e) {
    // Telemetry must never break the user-facing path.
    if (__DEV__) console.warn(`[analytics] track(${event.name}) failed:`, e);
  }
}

/**
 * Associate the current PostHog session with a person UUID. Call once on
 * sign-in. `setUserAttributes` are optional; pass commonly-queried fields
 * (country, language) to enable user-cohort funnels in PostHog.
 */
export function identify(personUuid: string,
                         attrs?: { country?: string; primary_language?: string }): void {
  const ph = initPosthog();
  if (!ph) return;
  try {
    ph.identify(personUuid, attrs);
  } catch (e) {
    if (__DEV__) console.warn('[analytics] identify failed:', e);
  }
}

/**
 * Reset on sign-out so the next anonymous user gets a fresh distinct_id.
 */
export function reset(): void {
  const ph = initPosthog();
  if (!ph) return;
  try {
    ph.reset();
  } catch (e) {
    if (__DEV__) console.warn('[analytics] reset failed:', e);
  }
}
