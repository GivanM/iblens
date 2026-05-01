# SEO Setup Guide — IBLens

**Date:** May 1, 2026  
**Timeline expectation:** Organic ranking for a new domain with no backlinks takes 3–6 months even with perfect technical SEO. This document lays the foundation so indexing and ranking can begin immediately.

---

## 1. Google Search Console Verification

You have two options. Choose whichever is easier for your DNS setup.

### Option A: DNS TXT Record (recommended)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property" → choose "Domain" → enter `iblens.com`
3. Google will give you a TXT record value like `google-site-verification=XXXXXXXX`
4. Add this TXT record to your DNS provider (wherever iblens.com is registered):
   - **Type:** TXT
   - **Host/Name:** `@` (or leave blank)
   - **Value:** the string Google provides
   - **TTL:** 3600 (or default)
5. Click "Verify" in Search Console (may take up to 48 hours for DNS propagation)

### Option B: HTML Meta Tag (already done)

A `<meta name="google-site-verification" content="4rU7fvy5d8iJvWzECcezliwRoMba2VyZ">` tag is already present in `client/index.html`. If this verification code matches your Search Console property, you're already verified.

To check:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property" → "URL prefix" → enter `https://iblens.com`
3. Under "HTML tag" verification method, confirm the code matches `4rU7fvy5d8iJvWzECcezliwRoMba2VyZ`
4. Click "Verify"

---

## 2. Submit Sitemap

Once verified in Search Console:

1. Go to Search Console → select `iblens.com` property
2. Left sidebar → "Sitemaps"
3. Enter `sitemap.xml` in the "Add a new sitemap" field
4. Click "Submit"

The sitemap at `https://iblens.com/sitemap.xml` includes these pages:
- `/` (homepage) — priority 1.0
- `/essay` (essay analyzer) — priority 0.9
- `/university` (university strategy) — priority 0.8
- `/pricing` (pricing page) — priority 0.8
- `/refund-policy` — priority 0.4

The sitemap is also referenced in `robots.txt`.

---

## 3. Request Indexing for Top Pages

After sitemap submission, manually request indexing for your most important pages:

1. In Search Console, use the URL Inspection tool (top search bar)
2. Enter each URL and click "Request Indexing":
   - `https://iblens.com/`
   - `https://iblens.com/essay`
   - `https://iblens.com/university`
   - `https://iblens.com/pricing`

This tells Google to prioritize crawling these pages. Indexing typically happens within 1–7 days after requesting.

---

## 4. Bing Webmaster Tools

Bing drives ~5–8% of search traffic and indexes faster than Google for new sites.

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in with a Microsoft account
3. Click "Add your site" → enter `https://iblens.com`
4. Choose verification method:
   - **Option 1:** Import from Google Search Console (fastest if already verified there)
   - **Option 2:** Add a CNAME record or meta tag
5. Once verified, go to "Sitemaps" → submit `https://iblens.com/sitemap.xml`

---

## 5. What's Already Implemented (Technical SEO)

These are already live on iblens.com:

| Item | Status | Location |
|------|--------|----------|
| Title tag with target keywords | Done | `index.html` |
| Meta description (under 160 chars) | Done | `index.html` |
| Meta keywords | Done | `index.html` |
| Canonical URL | Done | `index.html` |
| Open Graph tags | Done | `index.html` |
| Twitter Card tags | Done | `index.html` |
| JSON-LD: SoftwareApplication | Done | `index.html` |
| JSON-LD: FAQPage | Done | `index.html` |
| JSON-LD: Organization | Done | `index.html` |
| Google Site Verification meta tag | Done | `index.html` |
| robots.txt (blocks /api/, /dashboard) | Done | `public/robots.txt` |
| sitemap.xml (5 pages) | Done | `public/sitemap.xml` |
| Mobile-responsive design | Done | Tailwind CSS |
| HTTPS | Done | Manus hosting |
| Fast load time (SPA with code splitting) | Done | Vite build |

---

## 6. Ongoing SEO Actions (Monthly)

After initial setup, do these monthly:

1. **Check Search Console for errors** — fix any crawl errors, mobile usability issues, or Core Web Vitals warnings
2. **Update sitemap lastmod dates** — when page content changes significantly
3. **Monitor keyword rankings** — track positions for target keywords (see below)
4. **Build backlinks** — guest posts on IB-related blogs, Reddit/Quora answers, IB student forums

---

## 7. Target Keywords

These are the keywords iblens.com should rank for:

| Keyword | Monthly Search Volume (est.) | Competition |
|---------|------------------------------|-------------|
| IB essay analyzer | Low–Medium | Low |
| IB IA feedback tool | Low | Low |
| IB predicted score calculator | Medium | Medium |
| IB extended essay help | High | High |
| TOK essay checker | Low | Low |
| IB exam preparation tools | Medium | Medium |
| IB university strategy | Low | Low |

Focus on low-competition long-tail keywords first. The homepage title already targets "IB Essay Analyzer" and "Score Your IA, EE & TOK."

---

## 8. Timeline Expectations

| Milestone | Expected Timeline |
|-----------|-------------------|
| Indexed by Google | 1–2 weeks |
| Appearing in search results (page 5+) | 2–4 weeks |
| Ranking on page 2–3 for long-tail keywords | 2–3 months |
| Ranking on page 1 for low-competition keywords | 3–6 months |
| Ranking for medium-competition keywords | 6–12 months |

This is a marathon, not a sprint. Consistent content quality, user engagement signals, and gradual backlink building are what move the needle.
