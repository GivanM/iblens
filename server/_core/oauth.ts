import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import { ENV } from "./env";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

function getRedirectUri(req: Request): string {
  const proto = req.headers["x-forwarded-proto"] ?? req.protocol;
  const host = req.headers["x-forwarded-host"] ?? req.get("host");
  return `${proto}://${host}/api/oauth/callback`;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const error = getQueryParam(req, "error");
    const cookieHeader = String(req.headers.cookie || "");
    // Where the reader was when they chose to sign in. Only a path on this site.
    const rawReturn = (() => {
      try {
        return decodeURIComponent(cookieHeader.split(";").map((c) => c.trim())
          .find((c) => c.startsWith("iblens_return_to="))?.slice("iblens_return_to=".length) || "");
      } catch {
        return "";
      }
    })();
    const returnTo = /^\/(?!\/)[^\\\s]*$/.test(rawReturn) && !rawReturn.startsWith("/api/") ? rawReturn : "/";
    // Back to the sign-in page, which says what happened and still knows where to return.
    const signInAgain = () => `/auth/signin?auth_error=1&returnTo=${encodeURIComponent(returnTo)}`;

    if (error) {
      console.error("[OAuth] Google returned error:", error);
      res.clearCookie("iblens_return_to", { path: "/api/oauth" });
      res.redirect(signInAgain());
      return;
    }

    // Every way this can fail lands on the sign-in page, which says so, instead of JSON.
    if (!code) {
      res.redirect(signInAgain());
      return;
    }

    // Reject a callback whose state does not match the one this browser started
    // with. This is what stops a sign-in being completed on someone else's behalf.
    const returnedState = getQueryParam(req, "state") || "";
    const expectedState = cookieHeader.split(";").map((c) => c.trim())
      .find((c) => c.startsWith("iblens_oauth_state="))?.slice("iblens_oauth_state=".length) || "";
    res.clearCookie("iblens_oauth_state", { path: "/api/oauth" });
    res.clearCookie("iblens_return_to", { path: "/api/oauth" });
    if (!returnedState || !expectedState || returnedState !== expectedState) {
      console.warn("[OAuth] State mismatch, sign-in refused");
      res.redirect(signInAgain());
      return;
    }

    try {
      const redirectUri = getRedirectUri(req);
      const userInfo = await sdk.exchangeCodeForToken(code, redirectUri);

      if (!userInfo.id) {
        res.redirect(signInAgain());
        return;
      }

      // An address Google has not verified proves nothing about who owns it, and the
      // e-mail is what hands over purchases made as a guest.
      const verifiedEmail = userInfo.verified_email === false ? null : (userInfo.email ?? null);
      await db.upsertUser({
        openId: userInfo.id,
        name: userInfo.name || null,
        email: verifiedEmail,
        loginMethod: "google",
        lastSignedIn: new Date(),
      });

      // Anything bought as a guest with this email belongs to this person.
      if (verifiedEmail) {
        try {
          const signedIn = await db.getUserByOpenId(userInfo.id);
          if (signedIn?.id) await db.absorbGuestAccount(verifiedEmail, signedIn.id);
        } catch (mergeErr) {
          console.warn("[OAuth] Guest merge failed (non-fatal)", mergeErr);
        }
      }

      // The session check requires a non-empty name, and some Google accounts
      // have none: those users were signed in, bounced, and signed in again for
      // ever. Fall back to the e-mail.
      const sessionToken = await sdk.createSessionToken(userInfo.id, {
        name: userInfo.name || verifiedEmail || "IBLens user",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, returnTo);
    } catch (err) {
      console.error("[OAuth] Callback failed", err);
      res.redirect(signInAgain());
    }
  });
}
