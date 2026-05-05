import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics/config";

/**
 * Cookie consent banner implementing Google Consent Mode v2.
 * 
 * Geo-targeted behavior:
 * - EU/EEA/UK/CH visitors: Shows Accept/Reject banner (GDPR compliance)
 * - Non-EU visitors: Banner is NEVER shown; consent is granted by default
 *   via the inline script in index.html (geo detection via /cdn-cgi/trace)
 * 
 * The inline script in index.html sets:
 *   window.__iblens_show_banner = true  (EU)
 *   window.__iblens_show_banner = false (non-EU)
 *   window.__iblens_consent_granted = true (non-EU)
 * 
 * This component checks __iblens_show_banner and returns null for non-EU.
 */

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Non-EU: never show banner. The inline script already granted consent.
    if ((window as any).__iblens_consent_granted === true) {
      localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
      return;
    }

    // If geo script explicitly says don't show banner, bail out
    if ((window as any).__iblens_show_banner === false) {
      localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
      return;
    }

    // Check localStorage — user already made a choice previously
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      pushConsentUpdate(stored === "granted");
      return;
    }

    // EU or geo not yet resolved: show banner after short delay
    // (wait for geo script to finish — it has 700ms timeout + 800ms wait_for_update)
    const timer = setTimeout(() => {
      // Re-check after delay in case geo resolved during the wait
      if ((window as any).__iblens_show_banner === false || (window as any).__iblens_consent_granted === true) {
        localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
        return;
      }
      setVisible(true);
    }, 1000);
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
