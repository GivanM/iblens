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

    if (error) {
      console.error("[OAuth] Google returned error:", error);
      res.redirect("/?auth_error=" + encodeURIComponent(error));
      return;
    }

    if (!code) {
      res.status(400).json({ error: "code is required" });
      return;
    }

    // Reject a callback whose state does not match the one this browser started
    // with. This is what stops a sign-in being completed on someone else's behalf.
    const returnedState = getQueryParam(req, "state") || "";
    const cookieHeader = String(req.headers.cookie || "");
    const expectedState = cookieHeader.split(";").map((c) => c.trim())
      .find((c) => c.startsWith("iblens_oauth_state="))?.slice("iblens_oauth_state=".length) || "";
    res.clearCookie("iblens_oauth_state", { path: "/api/oauth" });
    if (!returnedState || !expectedState || returnedState !== expectedState) {
      console.warn("[OAuth] State mismatch, sign-in refused");
      res.redirect("/auth/signin?auth_error=state");
      return;
    }

    try {
      const redirectUri = getRedirectUri(req);
      const userInfo = await sdk.exchangeCodeForToken(code, redirectUri);

      if (!userInfo.id) {
        res.status(400).json({ error: "id missing from Google user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.id,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: "google",
        lastSignedIn: new Date(),
      });

      // Anything bought as a guest with this email belongs to this person.
      if (userInfo.email) {
        try {
          const signedIn = await db.getUserByOpenId(userInfo.id);
          if (signedIn?.id) await db.absorbGuestAccount(userInfo.email, signedIn.id);
        } catch (mergeErr) {
          console.warn("[OAuth] Guest merge failed (non-fatal)", mergeErr);
        }
      }

      // The session check requires a non-empty name, and some Google accounts
      // have none: those users were signed in, bounced, and signed in again for
      // ever. Fall back to the e-mail.
      const sessionToken = await sdk.createSessionToken(userInfo.id, {
        name: userInfo.name || userInfo.email || "IBLens user",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (err) {
      console.error("[OAuth] Callback failed", err);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
