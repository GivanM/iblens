# IBLens Project TODO

- [x] Database schema (analyses table, subscriptions table, usage_limits table)
- [x] Backend LLM proxy API (secure Claude API calls from server)
- [x] Essay Analyzer tRPC procedure (IA/EE/TOK analysis with structured JSON response)
- [x] University Strategy tRPC procedure (personalized university recommendations)
- [x] Usage tracking and limits enforcement (free: 1 analysis, pro: unlimited)
- [x] XSS protection (sanitize AI-generated content before rendering)
- [x] Landing page with hero, features, pricing sections
- [x] Essay Analyzer page (form + results visualization)
- [x] University Strategy page (form + results visualization)
- [x] User Dashboard (analysis history, subscription status, usage stats)
- [x] Stripe payment integration (checkout, webhooks, subscription management)
- [x] Responsive design (mobile + desktop)
- [x] Navigation and layout (header, auth flow, protected routes)
- [x] Vitest tests for backend procedures (12 tests passing)
- [x] LemonSqueezy API integration (backend: checkout session creation, webhook handling)
- [x] LemonSqueezy subscription management (upgrade/downgrade user tier on payment events)
- [x] Frontend: add LemonSqueezy as payment option alongside Stripe
- [x] Tests for LemonSqueezy integration (14 tests total passing)
