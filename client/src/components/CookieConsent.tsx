import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics/config";

/**
 * Cookie consent banner implementing Google Consent Mode v2.
 *
 * Every visitor sees it until they make a choice, and consent stays denied until
 * they accept. The site once granted consent without asking wherever a cached
 * country was outside the EU; that path is gone, and choices recorded under the old
 * storage key are asked again, because some of them were never made by a person.
 */

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(CONSENT_STORAGE_KEY); } catch { /* storage blocked: ask */ }
    if (stored === "granted" || stored === "denied") {
      pushConsentUpdate(stored === "granted");
      return;
    }
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  function handleAccept() {
    try { localStorage.setItem(CONSENT_STORAGE_KEY, "granted"); } catch { /* choice holds for this page */ }
    pushConsentUpdate(true);
    setVisible(false);
  }

  function handleReject() {
    try { localStorage.setItem(CONSENT_STORAGE_KEY, "denied"); } catch { /* choice holds for this page */ }
    pushConsentUpdate(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container max-w-4xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
          We use cookies to measure site performance and improve your experience.
          By clicking "Accept", you consent to analytics and advertising cookies. What we collect and who
          receives it is set out in our <a href="/privacy" className="underline">privacy notice</a>.
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
