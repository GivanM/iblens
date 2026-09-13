import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { trackPurchase } from "@/lib/analytics/track";
import type { ProductSlug } from "@/lib/analytics/config";

/** The order id a checkout sent the buyer back with, when the return says it was paid. */
export function returnedOrderId(): string | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search);
  const id = q.get("order");
  return q.get("payment") === "success" && id && /^[0-9a-f-]{36}$/i.test(id) ? id : null;
}

/**
 * Report a completed purchase once, on whichever page the checkout returned to, and
 * only when the server says the order is paid. The product and amount used to come
 * from the address bar, so anyone could record a sale by typing one in. The webhook
 * lands a few seconds after the return, so the status is asked for again for up to
 * two minutes.
 */
export function usePurchaseTracking() {
  const [orderId] = useState(returnedOrderId);
  const [startedAt] = useState(() => Date.now());
  const status = trpc.payment.orderStatus.useQuery(
    { orderId: orderId ?? "00000000-0000-0000-0000-000000000000" },
    {
      enabled: !!orderId,
      refetchInterval: (q: any) => {
        const d = q?.state?.data ?? q;
        return (d as any)?.paid || Date.now() - startedAt > 120000 ? false : 4000;
      },
    },
  );
  useEffect(() => {
    const d: any = status.data;
    if (!orderId || !d?.paid) return;
    const key = `iblens_purchase_reported_${orderId}`;
    try {
      if (localStorage.getItem(key) === "1") return;
      localStorage.setItem(key, "1");
    } catch { /* no storage: report once per page load */ }
    const product = (d.sku === "university_single" ? "university_strategy" : d.sku) as ProductSlug;
    // The privacy policy says Google receives the order without the buyer's identity.
    trackPurchase(orderId, product, Number(d.valueUsd) || 0, "lemonsqueezy", "", "");
  }, [status.data, orderId]);
  return { paid: (status.data as any)?.paid === true, waitingForOrder: !!orderId && !(status.data as any)?.paid && Date.now() - startedAt <= 120000, orderId };
}
