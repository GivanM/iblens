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
  const [current, setCurrent] = useState<"granted" | "denied" | null>(null);

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

  // "Cookie settings" in the footer reopens the choice at any time.
  useEffect(() => {
    const open = () => {
      try {
        const v = localStorage.getItem(CONSENT_STORAGE_KEY);
        setCurrent(v === "granted" || v === "denied" ? v : null);
      } catch { setCurrent(null); }
      setVisible(true);
    };
    window.addEventListener("iblens:cookie-settings", open);
    return () => window.removeEventListener("iblens:cookie-settings", open);
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
    <div role="region" aria-label="Cookie choice" className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 md:p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container max-w-4xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex-1">
          {current === "granted"
            ? "You have accepted analytics and advertising cookies. You can withdraw that here at any time."
            : current === "denied"
              ? "You have rejected analytics and advertising cookies, so they are off. You can change that here."
              : "Analytics and advertising cookies stay off unless you accept them. You can change this later under \"Cookie settings\" at the bottom of every page."}{" "}
          <a href="/privacy" className="underline">Privacy Policy</a>
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" onClick={handleReject} className="min-h-11 min-w-24 flex-1 sm:flex-none">
            Reject
          </Button>
          <Button variant="outline" onClick={handleAccept} className="min-h-11 min-w-24 flex-1 sm:flex-none">
            Accept
          </Button>
          {current && (
            <Button variant="ghost" onClick={() => setVisible(false)} className="min-h-11" aria-label="Close cookie settings">
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function pushConsentUpdate(granted: boolean) {
  window.dataLayer = window.dataLayer || [];
  // gtag.js only acts on a real Arguments object. Pushing a plain array, as this did,
  // is read as a data-layer command and the consent update is silently dropped.
  // eslint-disable-next-line prefer-rest-params
  const gtag: (...args: unknown[]) => void = (window as any).gtag || function () { (window as any).dataLayer.push(arguments); };
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}
