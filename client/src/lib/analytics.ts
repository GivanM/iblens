/**
 * Legacy analytics helper — kept for backward compatibility.
 * New code should import from "@/lib/analytics/track" directly.
 *
 * Uses Umami (already configured in index.html) for event tracking.
 * GTM/GA4 events now flow through dataLayer via the new analytics module.
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number>) => void;
    };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __iblens_geo_country?: string;
    __iblens_consent_granted?: boolean;
    __iblens_show_banner?: boolean;
  }
}

export function trackEvent(eventName: string, data?: Record<string, string | number>) {
  // Umami tracking (already integrated)
  try {
    if (window.umami) {
      window.umami.track(eventName, data);
    }
  } catch {
    // silently fail
  }

  // Push to dataLayer for GTM
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...data });
  } catch {
    // silently fail
  }
}

// Pre-defined conversion events
export const analytics = {
  /** User views the landing page */
  viewLanding: () => trackEvent("view_landing"),

  /** User clicks "Analyze My Essay" CTA */
  clickAnalyzeEssay: () => trackEvent("click_analyze_essay"),

  /** User clicks "University Strategy" CTA */
  clickUniversityStrategy: () => trackEvent("click_university_strategy"),

  /** User starts essay analysis (submits form) */
  startEssayAnalysis: (subject: string) => trackEvent("start_essay_analysis", { subject }),

  /** User completes essay analysis (receives results) */
  completeEssayAnalysis: (subject: string, score: string) =>
    trackEvent("complete_essay_analysis", { subject, score }),

  /** User starts university strategy */
  startUniversityStrategy: () => trackEvent("start_university_strategy"),

  /** User completes university strategy */
  completeUniversityStrategy: () => trackEvent("complete_university_strategy"),

  /** User clicks Buy Now / checkout */
  clickCheckout: (product: string, price: number) =>
    trackEvent("click_checkout", { product, price }),

  /** User signs in */
  signIn: () => trackEvent("sign_in"),

  /** User views pricing section */
  viewPricing: () => trackEvent("view_pricing"),

  /** User views FAQ */
  viewFAQ: () => trackEvent("view_faq"),
};
