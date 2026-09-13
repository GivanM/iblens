import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "node:path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { purgeOldAnonymousAnalyses, purgeExpiredRevokedSessions } from "../db";
import { registerLemonsqueezyWebhook } from "../lemonsqueezy/lemonsqueezy";
import { ENV } from "./env";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Payment webhooks must be registered BEFORE body parsers
  registerLemonsqueezyWebhook(app);
  // Configure body parser with larger size limit for file uploads
  // Nothing here accepts a file. The largest legitimate body is an essay plus a
  // reflective statement, which is well under a megabyte.
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ limit: "2mb", extended: true }));
  // Serve uploaded files
  app.use("/uploads", express.static(path.resolve(ENV.uploadsDir)));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // A cheap ceiling on the expensive procedures. The free-run gate is a browser
  // id, so anyone willing to rotate it could spend our model budget in a loop.
  // This is per address and deliberately generous for a school behind one NAT.
  const analysisHits = new Map<string, number[]>();
  app.use("/api/trpc", (req, res, next) => {
    // Express leaves req.path percent-encoded and tRPC decodes it, so
    // /essay%2EanalyzeAnonymous reached the model without being counted here.
    let path = String(req.path || "");
    try {
      path = decodeURIComponent(path);
    } catch {
      // A malformed escape: tRPC cannot route it either, so nothing runs.
    }
    // Only the calls that actually run a model. canAnalyzeAnonymous is a status
    // check made on every page load and must not count against the budget.
    const EXPENSIVE = /(^|\.|,)(analyze|analyzeAnonymous|analyzeUcasAnonymous|rerunAnalysis|rerunAnonymous|analyzeUniversity)(,|$)/i;
    if (!EXPENSIVE.test(path)) return next();
    const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
    const now = Date.now();
    const windowMs = 60 * 60 * 1000;
    // tRPC batches several calls into one request, so counting requests let a
    // single HTTP call run as many analyses as it liked.
    const calls = path.replace(/^\//, "").split(",").filter((p) => EXPENSIVE.test(p)).length || 1;
    const hits = (analysisHits.get(ip) || []).filter((t) => now - t < windowMs);
    if (hits.length + calls > 30) {
      // In tRPC's own error shape, so the page shows this sentence instead of a
      // parsing failure.
      res.status(429).json({
        error: { json: { message: "Too many analyses from this network in the last hour. Try again later.", code: -32029, data: { code: "TOO_MANY_REQUESTS", httpStatus: 429 } } },
      });
      return;
    }
    for (let i = 0; i < calls; i++) hits.push(now);
    analysisHits.set(ip, hits);
    if (analysisHits.size > 5000) {
      analysisHits.forEach((v: number[], k: string) => {
        if (v.every((t: number) => now - t >= windowMs)) analysisHits.delete(k);
      });
    }
    next();
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    // Caddy proxies to the configured port only. Starting on another one leaves
    // systemd green and the site down, which is the worst of both.
    console.error(`Port ${preferredPort} is busy. Refusing to start on ${port}: the proxy only forwards to ${preferredPort}.`);
    process.exit(1);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });

  // Retention. The privacy page says anonymous reports are not kept indefinitely,
  // so something has to actually delete them. Runs at boot and once a day after.
  const runRetention = () => {
    purgeOldAnonymousAnalyses().catch((err) => console.warn("[Retention] failed:", err));
    purgeExpiredRevokedSessions().catch((err) => console.warn("[Retention] revoked sessions failed:", err));
  };
  runRetention();
  setInterval(runRetention, 24 * 60 * 60 * 1000).unref();
}

startServer().catch(console.error);
