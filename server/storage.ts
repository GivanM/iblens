import fs from "node:fs/promises";
import path from "node:path";
import { ENV } from "./_core/env";

function getUploadsDir(): string {
  return ENV.uploadsDir;
}

function getBaseUrl(): string {
  const base = ENV.uploadsBaseUrl.replace(/\/+$/, "");
  return base || "";
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  _contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  const filePath = path.join(getUploadsDir(), key);

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, data as Buffer);

  const url = `${getBaseUrl()}/uploads/${key}`;
  return { key, url };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  const url = `${getBaseUrl()}/uploads/${key}`;
  return { key, url };
}
