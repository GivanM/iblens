import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectSeoMeta } from "../seo-prerender";

// Valid HTML routes (keep in sync with client/src/App.tsx). Unknown paths -> 404 (no soft-404).
const VALID_ROUTES = new Set(["/","/essay","/essay/biology-ia","/essay/chemistry-ia","/essay/physics-ia","/essay/math-ia","/essay/economics-ia","/essay/history-ia","/essay/psychology-ia","/essay/english-essay","/essay/extended-essay","/essay/tok-essay","/essay/business-management-ia","/essay/computer-science-ia","/essay/tok-exhibition","/essay/maths-aa-ia","/essay/maths-ai-ia","/university","/dashboard","/pricing","/refund-policy","/auth/signin","/grade","/remark","/resources/academic-integrity","/resources/sample-reports","/resources","/resources/ib-extended-essay-guide","/resources/ib-internal-assessment-guide","/resources/tok-essay-guide","/resources/ib-grade-boundaries","/resources/ib-essay-criteria-explained","/resources/how-iblens-works","/resources/ib-university-admissions","/resources/ib-extended-essay-examples","/resources/ib-ia-score-predictor","/resources/ib-score-calculator","/resources/ib-university-admissions-strategy","/resources/ib-math-ia-examples","/resources/ib-biology-ia-examples","/resources/ib-economics-ia","/resources/ib-extended-essay-word-count","/resources/ib-extended-essay-help","/resources/ib-chemistry-ia-examples","/resources/ib-physics-ia-examples","/resources/ib-psychology-ia","/resources/ib-history-ia","/resources/ib-ee-examples-by-subject","/resources/ib-ia-grader","/resources/tok-essay-format","/resources/tok-essay-structure","/resources/ib-university-consultant-cost","/resources/ib-university-chances","/resources/ib-biology-extended-essay","/resources/ib-chemistry-extended-essay","/resources/ib-history-extended-essay","/resources/ib-english-extended-essay","/resources/ib-economics-extended-essay","/resources/ib-psychology-extended-essay"]);


export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      let page = await vite.transformIndexHtml(url, template);
      const userAgent = req.headers["user-agent"] || "";
      page = injectSeoMeta(page, url, userAgent);
      res.status(200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache, no-store, must-revalidate", "CDN-Cache-Control": "no-store", "Surrogate-Control": "no-store" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve non-HTML static assets (JS, CSS, images, fonts) with default caching
  // HTML files are excluded (index:false) so they go through injectSeoMeta below
  app.use(express.static(distPath, { index: false, redirect: false }));

  // Serve all HTML routes with SEO meta injection.
  // Tries route-specific pre-rendered HTML first, falls back to index.html (SPA).
  app.use("*", (req, res) => {
    const noCache = { "Cache-Control": "no-cache, no-store, must-revalidate", "CDN-Cache-Control": "no-store", "Surrogate-Control": "no-store" };
    const cleanPath = req.originalUrl.split("?")[0].replace(/\/+$/, "") || "/";
    const isValid = VALID_ROUTES.has(cleanPath);
    const status = isValid ? 200 : 404;
    const routeHtml = path.resolve(distPath, cleanPath.slice(1), "index.html");
    const indexHtml = path.resolve(distPath, "index.html");
    const htmlPath = (isValid && fs.existsSync(routeHtml)) ? routeHtml : indexHtml;
    let html = fs.readFileSync(htmlPath, "utf-8");
    const userAgent = req.headers["user-agent"] || "";
    html = injectSeoMeta(html, req.originalUrl, userAgent);
    res.status(status).set({ "Content-Type": "text/html", ...noCache }).end(html);
  });
}
