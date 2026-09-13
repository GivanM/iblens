import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getAnonFingerprint } from "@/lib/fingerprint";
import { usePreviewUsed } from "@/hooks/usePreviewUsed";

/**
 * What a "mark my work" button can honestly say: a free preview while it is unused, then
 * a paid report the visitor already holds, and only then the price. Showing $9.99 to
 * someone with paid reports left told them to pay again.
 */
export function useMarkingCta() {
  const { isAuthenticated } = useAuth();
  const previewUsed = usePreviewUsed();
  const [fingerprint] = useState(() => {
    try { return getAnonFingerprint(); } catch { return ""; }
  });
  const credits = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated, staleTime: 60_000 });
  const device = trpc.essay.deviceCredits.useQuery({ fingerprint }, { enabled: !isAuthenticated && !!fingerprint, staleTime: 60_000 });
  const paidLeft = isAuthenticated ? (credits.data?.essayCredits ?? 0) : (device.data?.credits ?? 0);
  const paidLabel = paidLeft > 0 ? "Mark my work (uses 1 paid report)" : "Mark my work ($9.99)";
  return { previewUsed, paidLeft, paidLabel, isAuthenticated };
}
