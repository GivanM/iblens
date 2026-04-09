/**
 * Lightweight analytics helper for tracking conversion events.
 * Uses Umami (already configured in index.html) for event tracking.
 * Also supports Google Analytics 4 if gtag is loaded.
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number>) => void;
    };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
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

  // Google Analytics 4 tracking (if configured)
  try {
    if (window.gtag) {
      window.gtag("event", eventName, data);
    }
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
