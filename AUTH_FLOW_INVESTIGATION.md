# Auth Flow Investigation: White-Labeling & Alternatives

**Date:** April 30, 2026  
**Status:** Investigation only — no implementation changes made  

---

## Current State

The IBLens sign-in flow works as follows:

1. Frontend calls `getLoginUrl()` in `client/src/const.ts`, which builds a URL to `${VITE_OAUTH_PORTAL_URL}/app-auth?appId=...&redirectUri=...&state=...&type=signIn`.
2. The user is redirected to `manus.im` (the Manus OAuth portal) — a generic login page with Manus branding.
3. After authentication, Manus redirects back to `${origin}/api/oauth/callback` with a `code` and `state`.
4. The server (`server/_core/oauth.ts`) exchanges the code for a token via `OAUTH_SERVER_URL`, fetches user info, upserts the user in our DB, creates a local JWT session cookie, and redirects to `/`.

**Trust problem:** Users arriving from Google Ads see a redirect to `manus.im` with a `manus.space` subdomain visible in the URL bar. For non-technical users (IB students and parents considering a $4.99–$34.99 purchase), this looks like a phishing redirect and erodes trust significantly.

---

## Option A: White-Label the Manus OAuth Portal

### Feasibility

The Manus OAuth portal (`VITE_OAUTH_PORTAL_URL`) is a hosted service managed by the Manus platform. Based on code inspection:

- `getLoginUrl()` passes `appId`, `redirectUri`, `state`, and `type` as query params — there is no `branding`, `logo`, or `theme` parameter available.
- The OAuth server URL (`OAUTH_SERVER_URL`) is an API endpoint for token exchange only — it does not serve UI.
- There is no documented API or configuration surface (in env vars, SDK, or project settings) to customize the login page appearance.

### Options within Manus platform

| Approach | Feasibility | Notes |
|----------|-------------|-------|
| Custom domain (e.g., `auth.iblens.com`) pointing to Manus portal | **Not available** | Manus does not expose CNAME/proxy configuration for the OAuth portal |
| Branding params (logo, colors, copy) in the login URL | **Not available** | No such query params exist in the current SDK |
| Custom login page hosted on iblens.com that proxies to Manus | **Partially possible** | Would require reverse-proxying the Manus portal HTML, which violates ToS and breaks on updates |

### Engineering effort

- If Manus adds a branding API in the future: **1–2 hours** (pass logo URL + colors in query params)
- Reverse-proxy approach (fragile, ToS risk): **8–12 hours** initial + ongoing maintenance

### Verdict

**White-labeling the Manus OAuth portal is not currently possible** without platform-level support from the Manus team. We should request this feature from Manus (submit at https://help.manus.im).

---

## Option B: Email + Magic-Link Auth via Resend

### Architecture

Replace Manus OAuth entirely with a passwordless email flow:

1. User enters email on a login form hosted on `iblens.com`.
2. Server generates a short-lived token, stores it in DB, and sends a magic link via Resend (`RESEND_API_KEY` is already configured).
3. User clicks the link → server validates token → creates local JWT session → redirects to dashboard.

### Advantages

- **Full brand control** — login UI is 100% on iblens.com, no external redirects.
- **No third-party branding visible** — users never leave the IBLens domain.
- **Simple UX** — email-based auth is familiar to students and parents.
- **Resend already configured** — `RESEND_API_KEY` is in env, email sending infrastructure exists.

### Disadvantages

- **Loses social login** (Google, Apple, etc.) unless implemented separately.
- **Email deliverability** — magic links can land in spam; requires proper DKIM/SPF on the sending domain.
- **Session management** — must handle token expiry, replay attacks, rate limiting.
- **User migration** — existing users authenticated via Manus `openId` would need a migration path (match by email).

### Engineering effort

| Task | Hours |
|------|-------|
| Login/signup UI (email input + "check your inbox" screen) | 3 |
| Server: magic link generation, storage, validation | 4 |
| Server: local session creation (reuse existing JWT logic) | 2 |
| Email template via Resend | 1 |
| User migration (match existing openId users by email) | 2 |
| Rate limiting + security hardening | 2 |
| Testing | 2 |
| **Total** | **~16 hours** |

---

## Option C: Direct Google OAuth (without Manus)

### Architecture

Implement Google OAuth 2.0 directly using Google's APIs:

1. User clicks "Sign in with Google" on iblens.com.
2. Redirect to `accounts.google.com/o/oauth2/v2/auth` with our own Google OAuth client credentials.
3. Google redirects back to `iblens.com/api/auth/google/callback` with an auth code.
4. Server exchanges code for tokens, fetches user profile, creates local session.

### Advantages

- **Trusted redirect** — users see `accounts.google.com`, which is universally trusted.
- **One-click sign-in** — no email typing needed.
- **No Manus branding** — Google's consent screen can be branded with IBLens logo.
- **Fast** — Google OAuth is well-documented with mature libraries.

### Disadvantages

- **Requires Google Cloud Console setup** — create OAuth 2.0 credentials, configure consent screen, verify domain.
- **Google verification** — if requesting sensitive scopes, Google requires app verification (but `email` + `profile` scopes are unverified-OK).
- **Loses email-only users** — some users may not have Google accounts (rare for IB students, but possible).
- **User migration** — same as Option B (match by email).

### Engineering effort

| Task | Hours |
|------|-------|
| Google Cloud Console: OAuth credentials + consent screen | 1 |
| Server: Google OAuth callback handler | 3 |
| Frontend: "Sign in with Google" button | 1 |
| User migration (match existing openId users by email) | 2 |
| Testing | 2 |
| **Total** | **~9 hours** |

---

## Option D: Hybrid — Google OAuth + Email Magic Link

### Architecture

Offer both Google OAuth (primary, one-click) and email magic link (fallback):

- Primary CTA: "Continue with Google" (trusted, fast)
- Secondary: "Or sign in with email" → magic link flow

### Engineering effort

**~22 hours** (sum of Options B + C minus shared work like migration and session logic)

---

## Recommendation

| Priority | Option | Effort | Trust Impact |
|----------|--------|--------|--------------|
| 1 | **Option C: Direct Google OAuth** | ~9 hours | High — Google is universally trusted |
| 2 | **Option D: Hybrid (Google + Magic Link)** | ~22 hours | Highest — covers all users |
| 3 | **Option B: Magic Link only** | ~16 hours | Medium — no external redirect but slower UX |
| 4 | **Option A: White-label Manus** | Blocked | N/A — not currently possible |

**Short-term recommendation:** Implement Option C (Direct Google OAuth) as the fastest path to eliminating the trust-breaking redirect. Most IB students have Google accounts (school email or personal Gmail). This can be done in ~9 hours of engineering work.

**Medium-term:** Add email magic link as a fallback (Option D) for users without Google accounts.

**Immediate mitigation (0 hours):** While the OAuth redirect cannot be eliminated today, we can add a small interstitial message before redirect: "You'll be redirected to our secure sign-in page. This is normal." — though this is a band-aid, not a fix.

---

## Dependencies & Blockers

- **Google OAuth:** Requires a Google Cloud project with OAuth 2.0 credentials. Domain verification for the consent screen branding (shows IBLens logo instead of "unverified app" warning).
- **Magic Link:** Requires a verified sending domain for Resend (check if `iblens.com` SPF/DKIM is configured).
- **User Migration:** Both options require a one-time migration script to link existing Manus `openId` users to their email addresses in the local DB. The `email` field already exists in the user table, so this should be straightforward.
- **Manus Platform:** The current Manus OAuth can remain as a fallback during transition. It does not need to be removed immediately — just deprioritized in the UI.

---

## Files Examined

- `client/src/const.ts` — `getLoginUrl()` builds the Manus OAuth URL
- `server/_core/oauth.ts` — OAuth callback handler (code exchange + session creation)
- `server/_core/sdk.ts` — Manus SDK wrapper (token exchange, user info, JWT signing)
- `server/_core/cookies.ts` — Session cookie configuration
- `server/_core/types/manusTypes.ts` — Manus auth RPC type definitions
