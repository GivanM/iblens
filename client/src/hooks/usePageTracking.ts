import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics/track";

/**
 * Fires a page_view event to dataLayer on every route change.
 * Place this hook once in the App component.
 */
export function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView(location, document.title);
  }, [location]);
}
