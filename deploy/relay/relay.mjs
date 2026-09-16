import http from "node:http";
import crypto from "node:crypto";
import zlib from "node:zlib";

// In-memory job store: submit fast, poll fast; the long Anthropic call runs here in Helsinki.
const jobs = new Map();
// Uploads arriving in parts. The route from the RU app server freezes any single connection
// after roughly 20 KB sent, so a request is gzipped and sent as small parts, one per connection.
const uploads = new Map();

setInterval(() => {
  const cutoff = Date.now() - 15 * 60 * 1000;
  for (const [id, j] of jobs) if (j.ts < cutoff) jobs.delete(id);
  for (const [id, u] of uploads) if (u.ts < cutoff) uploads.delete(id);
}, 60_000);

async function readBody(req, limit) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error("body too large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function startJob({ apiKey, anthropicVersion, anthropicBeta, payload }) {
  payload.stream = false; // relay buffers the full response locally
  const id = crypto.randomUUID();
  jobs.set(id, { status: "pending", ts: Date.now() });
  (async () => {
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": anthropicVersion || "2023-06-01", ...(anthropicBeta ? { "anthropic-beta": anthropicBeta } : {}) },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(240_000),
      });
      const text = await r.text();
      jobs.set(id, { status: "done", code: r.status, body: text, ts: Date.now() });
    } catch (e) {
      jobs.set(id, { status: "error", body: String(e && e.message || e), ts: Date.now() });
    }
  })();
  return id;
}

const server = http.createServer(async (req, res) => {
  const send = (code, obj) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(obj)); };
  try {
    if (req.method === "POST" && req.url === "/submit") {
      const { apiKey, anthropicVersion, anthropicBeta, payload } = JSON.parse((await readBody(req, 4 * 1024 * 1024)).toString("utf8"));
      if (!apiKey || !payload) return send(400, { error: "apiKey and payload required" });
      return send(200, { id: startJob({ apiKey, anthropicVersion, anthropicBeta, payload }) });
    }
    const part = req.url.match(/^\/part\/([a-f0-9-]{36})\/(\d{1,4})$/);
    if (req.method === "POST" && part) {
      const buf = await readBody(req, 64 * 1024);
      let u = uploads.get(part[1]);
      if (!u) { u = { parts: [], ts: Date.now() }; uploads.set(part[1], u); }
      u.parts[Number(part[2])] = buf;
      u.ts = Date.now();
      return send(200, { ok: true });
    }
    const commit = req.url.match(/^\/commit\/([a-f0-9-]{36})$/);
    if (req.method === "POST" && commit) {
      const { count } = JSON.parse((await readBody(req, 4096)).toString("utf8"));
      const u = uploads.get(commit[1]);
      if (!u) return send(404, { error: "unknown upload" });
      for (let i = 0; i < count; i++) if (!u.parts[i]) return send(409, { error: "missing part " + i });
      const { apiKey, anthropicVersion, anthropicBeta, payload } = JSON.parse(zlib.gunzipSync(Buffer.concat(u.parts.slice(0, count))).toString("utf8"));
      uploads.delete(commit[1]);
      if (!apiKey || !payload) return send(400, { error: "apiKey and payload required" });
      return send(200, { id: startJob({ apiKey, anthropicVersion, anthropicBeta, payload }) });
    }
    const m = req.url.match(/^\/result\/([a-f0-9-]+)$/);
    if (req.method === "GET" && m) {
      const j = jobs.get(m[1]);
      if (!j) return send(404, { error: "unknown job" });
      if (j.status === "pending") return send(202, { status: "pending" });
      if (j.status === "error") return send(502, { error: j.body });
      return send(200, { status: "done", code: j.code, body: j.body });
    }
    send(404, { error: "not found" });
  } catch (e) { send(500, { error: String(e && e.message || e) }); }
});
server.listen(8090, "127.0.0.1", () => console.log("anthropic-relay listening on 127.0.0.1:8090"));
