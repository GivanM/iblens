import { useEffect } from "react";
import { trackPurchase } from "@/lib/analytics/track";
import type { ProductSlug, PaymentMethod } from "@/lib/analytics/config";

/**
 * Report a completed purchase once, on whichever page the checkout returned to.
 * Guests come back to the grader or the UCAS page and signed-in buyers of a report
 * to that report, and only the dashboard used to report conversions at all.
 */
export function usePurchaseTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search);
    if (q.get("payment") !== "success") return;
    const orderId = q.get("order");
    const product = q.get("product") as ProductSlug | null;
    const value = Number(q.get("value") || 0);
    if (!orderId || !product || !(value > 0)) return;
    const key = `iblens_purchase_reported_${orderId}`;
    try {
      if (localStorage.getItem(key) === "1") return;
      localStorage.setItem(key, "1");
    } catch { /* no storage: report once per page load */ }
    trackPurchase(orderId, product, value, (q.get("method") || "lemonsqueezy") as PaymentMethod, "", "");
  }, []);
}
