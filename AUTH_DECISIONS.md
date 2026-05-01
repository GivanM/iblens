# Auth Decisions Log

Decisions made autonomously where the prompt was ambiguous or required judgment calls.

---

## Decision 1: Interstitial vs. Proxy vs. iframe

**Context:** The owner asked to "hide manus.im/manus.space visibility during sign-in" while keeping Manus as the auth backend.

**Options considered:**
- (A) Reverse-proxy Manus portal HTML through iblens.com — hides URL completely but violates ToS, fragile, high maintenance
- (B) iframe embedding — blocked by X-Frame-Options on Manus portal
- (C) Branded interstitial page with explanation + auto-redirect — stable, no ToS risk, reduces confusion

**Decision:** Option C (interstitial). It doesn't fully hide the manus.im URL (users still see it briefly during OAuth), but it sets expectations and provides trust context. This is the only viable option without Manus platform changes.

---

## Decision 2: Auto-redirect timing (3 seconds)

**Context:** How long should the interstitial show before auto-redirecting?

**Reasoning:** 
- 0s = no benefit, users don't read anything
- 5s+ = too much friction, users get impatient
- 3s = enough to scan the headline and trust indicators, not enough to feel stuck

**Decision:** 3 seconds with cancel button and immediate "Continue" button.

---

## Decision 3: Global redirect behavior for unauthorized API errors

**Context:** `main.tsx` has a global error handler that redirects to `getLoginUrl()` on any UNAUTHORIZED tRPC error. Should this go through the interstitial too?

**Decision:** Yes — `getLoginUrl()` now returns the interstitial URL globally. This means even background auth failures route through the branded page. The alternative (direct Manus redirect for background errors) would expose the raw URL to users who weren't expecting a redirect at all, which is worse.

---

## Decision 4: No Google OAuth or alternative auth providers

**Context:** The AUTH_FLOW_INVESTIGATION.md recommended Google OAuth as the best solution. The owner explicitly cancelled this and requested branding-only fixes.

**Decision:** Implemented branding interstitial only. No new auth providers added. Manus remains the sole auth backend.
