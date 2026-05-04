import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics/config";

/**
 * Cookie consent banner implementing Google Consent Mode v2.
 * 
 * Geo-targeted behavior:
 * - EU/EEA/UK/CH visitors: Shows Accept/Reject banner (GDPR compliance)
 * - Non-EU visitors: Banner is NOT shown; consent is granted by default
 *   via the inline script in index.html (geo detection via /cdn-cgi/trace)
 * 
 * Consent state is persisted in localStorage and pushed to dataLayer.
 */

// EU/EEA/UK/CH country codes (must match the list in index.html)
const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
  "GB", "CH",
]);

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If consent was already granted by geo-detection (non-EU), skip banner entirely
    if ((window as any).__iblens_consent_granted) {
      // Also persist in localStorage so future visits don't re-check
      localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
      return;
    }

    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      // Already consented/rejected previously — push stored state
      pushConsentUpdate(stored === "granted");
      return;
    }

    // Check geo country (set by inline script in index.html)
    const country = (window as any).__iblens_geo_country as string | undefined;
    if (country && !EU_COUNTRIES.has(country)) {
      // Non-EU: auto-grant, no banner needed
      localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
      pushConsentUpdate(true);
      return;
    }

    // EU or unknown country: show consent banner after short delay
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    pushConsentUpdate(true);
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    pushConsentUpdate(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container max-w-4xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
          We use cookies to measure site performance and improve your experience.
          By clicking "Accept", you consent to analytics and advertising cookies.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="text-xs"
          >
            Reject
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

function pushConsentUpdate(granted: boolean) {
  window.dataLayer = window.dataLayer || [];
  // Push consent update via gtag command (GTM reads this)
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args as unknown as Record<string, unknown>);
  }
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}
