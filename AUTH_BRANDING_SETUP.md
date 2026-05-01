# Auth Branding Setup — IBLens Sign-In Flow

**Date:** May 1, 2026  
**Status:** Implemented

---

## Problem

When users click "Sign in" on iblens.com, they are redirected to `manus.im` with a `manus.space` subdomain visible in the URL bar. For non-technical users (parents and IB students evaluating a paid product), this looks like a phishing redirect and kills conversion on paid traffic.

---

## Solution Implemented: Branded Interstitial Page

Since the Manus platform does **not** support:
- Custom OAuth domains (e.g., `auth.iblens.com` → Manus)
- Branding parameters (logo, colors, copy) in the OAuth URL
- Any white-label configuration

We implemented the **best available option**: a branded interstitial page at `/auth/signin` on iblens.com that:

1. **Shows IBLens branding prominently** — users see the IBLens logo, name, and colors
2. **Explains the redirect** — "You'll be redirected to our secure authentication partner"
3. **Provides trust indicators** — "Encrypted", "No password stored", shield icon
4. **Auto-redirects after 3 seconds** — with a visible countdown and cancel option
5. **Has a manual "Continue to Sign In" button** — for users who want to proceed immediately

### How it works

| Step | What the user sees |
|------|-------------------|
| 1. Click "Sign in" anywhere on iblens.com | Navigates to `/auth/signin` (stays on iblens.com) |
| 2. Branded interstitial page | IBLens logo, explanation of redirect, countdown timer |
| 3. Auto-redirect (3s) or manual click | Redirected to Manus OAuth portal |
| 4. Sign in on Manus | Standard OAuth flow (unchanged) |
| 5. Redirect back | Returns to iblens.com with session cookie |

### Key architectural change

- `getLoginUrl()` in `client/src/const.ts` now returns `/auth/signin` (the interstitial)
- `getManusOAuthUrl()` (new export) returns the raw Manus OAuth URL
- Only the SignIn interstitial page calls `getManusOAuthUrl()` directly
- All other components continue using `getLoginUrl()` unchanged

---

## Owner Actions Required

**None.** This solution requires no DNS changes, no external service configuration, and no Manus platform settings. It works immediately on deploy.

---

## Future Improvements (if Manus adds support)

If the Manus platform ever adds branding support:

1. **Custom OAuth domain** — Point `auth.iblens.com` CNAME to Manus OAuth portal. This would eliminate the `manus.im` URL entirely.
2. **Branding parameters** — Pass `?logo=...&primaryColor=...&appName=IBLens` in the OAuth URL to customize the Manus login page.
3. **Consent screen text** — Configure "IBLens" as the requesting app name with iblens.com support links.

To request these features from Manus: submit at https://help.manus.im

---

## Files Modified

| File | Change |
|------|--------|
| `client/src/const.ts` | Split into `getLoginUrl()` (interstitial) and `getManusOAuthUrl()` (raw Manus URL) |
| `client/src/pages/SignIn.tsx` | New branded interstitial page |
| `client/src/App.tsx` | Added `/auth/signin` route |

---

## Decisions Made

1. **3-second auto-redirect** chosen as a balance between giving users time to read the explanation and not adding unnecessary friction. Users can cancel or click immediately.
2. **No "Sign in with Apple/Google" buttons** — owner explicitly requested keeping Manus as the sole auth backend.
3. **Interstitial approach over iframe/proxy** — proxying Manus portal HTML would violate ToS and break on updates. The interstitial is stable and maintainable.
