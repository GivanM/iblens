import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getAnonFingerprint } from "@/lib/fingerprint";

/**
 * Whether this visitor has already used their free preview. Pages that invite people
 * to "get a free preview" read it, so a device that has used it is not promised one
 * again. Until the answer arrives (and for crawlers) it is false.
 */
export function usePreviewUsed(): boolean {
  const { isAuthenticated } = useAuth();
  const [fingerprint] = useState(() => {
    try { return getAnonFingerprint(); } catch { return ""; }
  });
  const anon = trpc.essay.canAnalyzeAnonymous.useQuery(
    { clientFingerprint: fingerprint },
    { enabled: !isAuthenticated && !!fingerprint, staleTime: 60_000 }
  );
  const credits = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated, staleTime: 60_000 });
  if (isAuthenticated) return credits.data ? credits.data.freeEssayAvailable === false : false;
  return anon.data ? anon.data.canAnalyze === false : false;
}
