export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * The sign-in page, remembering where the reader was. Sign-in used to land everyone on
 * the homepage, so "sign in and this report is saved" left them looking for the report.
 */
export const getLoginUrl = (returnTo?: string) => {
  const here = returnTo ?? (window.location.pathname.startsWith("/auth") ? "/" : window.location.pathname + window.location.search);
  return `${window.location.origin}/auth/signin?returnTo=${encodeURIComponent(here)}`;
};

/** A same-site path only: anything else could send a fresh sign-in to another site. */
export const safeReturnPath = (value: string | null | undefined) =>
  value && /^\/(?!\/)[^\\\s]*$/.test(value) ? value : "/";

export const getGoogleOAuthUrl = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  // The server compares this with the value it receives on the callback. Without
  // that comparison anyone could complete a sign-in into their own account in
  // someone else's browser, and the purchases on that device would follow it.
  const state = crypto.randomUUID();
  document.cookie = `iblens_oauth_state=${state}; Path=/api/oauth; Max-Age=600; SameSite=Lax; Secure`;
  const returnTo = safeReturnPath(new URLSearchParams(window.location.search).get("returnTo"));
  document.cookie = `iblens_return_to=${encodeURIComponent(returnTo)}; Path=/api/oauth; Max-Age=600; SameSite=Lax; Secure`;

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("access_type", "online");

  return url.toString();
};
