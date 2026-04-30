import { useEffect, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trackLogin, trackSignUp } from "@/lib/analytics/track";

/**
 * Fires trackLogin or trackSignUp once when user auth state transitions
 * from unauthenticated → authenticated.
 *
 * Heuristic for sign_up: if user.createdAt is within last 60 seconds.
 * Otherwise fires login.
 *
 * Place this hook once in the App component.
 */
export function useAuthTracking() {
  const { user, isAuthenticated, loading } = useAuth();
  const trackedRef = useRef(false);

  useEffect(() => {
    // Only fire once per session, after auth resolves
    if (loading || trackedRef.current) return;
    if (!isAuthenticated || !user) return;

    trackedRef.current = true;

    const now = Date.now();
    const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;
    const isNewUser = now - createdAt < 60_000; // within last 60 seconds

    if (isNewUser) {
      trackSignUp("manus_oauth", user.openId || user.id?.toString() || "");
    } else {
      trackLogin("manus_oauth", user.openId || user.id?.toString() || "");
    }
  }, [user, isAuthenticated, loading]);
}
