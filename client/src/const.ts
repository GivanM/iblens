export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const getLoginUrl = () => {
  return `${window.location.origin}/auth/signin`;
};

export const getGoogleOAuthUrl = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  // The server compares this with the value it receives on the callback. Without
  // that comparison anyone could complete a sign-in into their own account in
  // someone else's browser, and the purchases on that device would follow it.
  const state = crypto.randomUUID();
  document.cookie = `iblens_oauth_state=${state}; Path=/api/oauth; Max-Age=600; SameSite=Lax; Secure`;

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("access_type", "online");

  return url.toString();
};
