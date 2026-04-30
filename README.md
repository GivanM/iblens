# IBLens — IB Performance Analyzer

AI-powered web application for IB students that analyzes essays (IA, EE, TOK) against official IB rubrics and builds personalized university admission strategies.

## Stack

- **Frontend**: React 19 + Tailwind 4 + Wouter + shadcn/ui
- **Backend**: Express 4 + tRPC 11 + Drizzle ORM
- **Database**: MySQL / TiDB
- **Auth**: Manus OAuth
- **Payments**: LemonSqueezy (card) + NOWPayments (crypto)
- **Analytics**: GTM + GA4 + Google Consent Mode v2
- **Testing**: Vitest (122 tests)

## Environment Variables

### Required (System-injected)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MySQL/TiDB connection string |
| `JWT_SECRET` | Session cookie signing secret |
| `VITE_APP_ID` | Manus OAuth application ID |
| `OAUTH_SERVER_URL` | Manus OAuth backend base URL |
| `VITE_OAUTH_PORTAL_URL` | Manus login portal URL (frontend) |
| `OWNER_OPEN_ID` | Owner's Manus Open ID |
| `BUILT_IN_FORGE_API_URL` | Manus built-in APIs URL |
| `BUILT_IN_FORGE_API_KEY` | Bearer token for Manus built-in APIs |

### Payments

| Variable | Description |
|----------|-------------|
| `LEMONSQUEEZY_API_KEY` | LemonSqueezy API key for checkout creation |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | HMAC-SHA256 secret for webhook verification |
| `LEMONSQUEEZY_STORE_ID` | LemonSqueezy store ID |
| `NOWPAYMENTS_API_KEY` | NOWPayments API key for crypto invoices |
| `NOWPAYMENTS_IPN_SECRET` | HMAC-SHA512 secret for IPN webhook verification |

### Analytics & Conversion Tracking

| Variable | Description | Where Used |
|----------|-------------|------------|
| `GA4_MEASUREMENT_ID` | GA4 property ID (default: `G-391DXZEC51`) | Server-side GA4 MP |
| `GA4_API_SECRET` | GA4 Measurement Protocol API secret | Server-side purchase events |
| `GOOGLE_ADS_CONVERSION_ID` | Google Ads conversion ID (placeholder: `AW-PLACEHOLDER`) | GTM config |
| `GOOGLE_ADS_PURCHASE_LABEL` | Google Ads purchase conversion label (placeholder) | GTM config |

### Email

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for transactional emails |

### Frontend (VITE_ prefix)

| Variable | Description |
|----------|-------------|
| `VITE_APP_TITLE` | Application title |
| `VITE_APP_LOGO` | Application logo URL |
| `VITE_ANALYTICS_ENDPOINT` | Umami analytics endpoint |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami website ID |

## Analytics Architecture

### Client-side (GTM + dataLayer)

All client-side tracking flows through Google Tag Manager (GTM-WSLBPQMP):

1. **GTM Container** loads in `index.html` with Consent Mode v2 defaults set to "denied"
2. **Cookie Consent Banner** (`CookieConsent.tsx`) lets users accept/reject, updating consent state
3. **Typed dataLayer helpers** (`client/src/lib/analytics/track.ts`) push structured events:
   - `page_view` — every route change (via `usePageTracking` hook)
   - `sign_up` / `login` — on auth state change (via `useAuthTracking` hook)
   - `essay_upload_started` / `essay_submitted` — essay analysis funnel
   - `view_item` — when PurchaseModal opens
   - `begin_checkout` — when Pay button is clicked
   - `purchase` — on `/dashboard?payment=success` with SHA-256 hashed email for Enhanced Conversions

### Server-side (GA4 Measurement Protocol)

After payment webhooks confirm a successful transaction, the server sends a `purchase` event directly to GA4:

- **File**: `server/ga4mp.ts`
- **Triggered from**: LemonSqueezy webhook (`server/lemonsqueezy/lemonsqueezy.ts`) and NOWPayments webhook (`server/nowpayments/nowpayments.ts`)
- **Requires**: `GA4_API_SECRET` env var (obtain from GA4 Admin > Data Streams > Measurement Protocol API secrets)

### GTM Configuration (done in GTM UI)

- GA4 Configuration tag with Measurement ID `G-391DXZEC51`
- GA4 Event tags for each custom event
- Google Ads Conversion Tracking tag (when IDs are provided)
- Consent Mode v2 initialization

## Testing

```bash
pnpm test
```

122 tests across 7 test files covering:
- Essay analysis (rubrics, scoring, HTML entity handling)
- LemonSqueezy (HMAC, idempotency, credit granting, refunds, redirect URL)
- NOWPayments (HMAC-SHA512, all payment statuses, credit granting)
- Anonymous analysis (fingerprinting, rate limiting)
- GA4 Measurement Protocol (payload structure, error handling, product name mapping)
- Auth logout

## Development

```bash
pnpm install
pnpm dev
```

Dev server runs on `http://localhost:3000`.

## Deployment

The app is deployed via Manus hosting at `iblens.com`. Click the Publish button in the Manus Management UI after saving a checkpoint.
