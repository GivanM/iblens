import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectSeoMeta } from "../seo-prerender";

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

  // Serve static assets (JS/CSS with hashed names) with long-term cache
  // but serve index.html with no-cache so CDN always fetches the latest version
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("CDN-Cache-Control", "no-store");
        res.setHeader("Surrogate-Control", "no-store");
      }
    },
  }));

  // fall through to index.html if the file doesn't exist (with SEO injection)
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    let html = fs.readFileSync(indexPath, "utf-8");
    const userAgent = req.headers["user-agent"] || "";
    html = injectSeoMeta(html, req.originalUrl, userAgent);
    res.status(200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache, no-store, must-revalidate", "CDN-Cache-Control": "no-store", "Surrogate-Control": "no-store" }).end(html);
  });
}
