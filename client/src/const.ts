export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Returns the URL for the branded sign-in interstitial page.
 * All sign-in buttons across the app point here instead of directly to Manus.
 * The interstitial page (/auth/signin) then redirects to the actual Manus OAuth URL.
 */
export const getLoginUrl = () => {
  return `${window.location.origin}/auth/signin`;
};

/**
 * Returns the actual Manus OAuth URL (used only by the SignIn interstitial page).
 * This is the raw redirect URL that goes to manus.im.
 */
export const getManusOAuthUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
