import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

/**
 * Cloudinary server-side configuration.
 *
 * Accepts either format in the environment (or local .env):
 *   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
 * or the three explicit variables:
 *   CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
 *
 * Secrets never reach the browser — the client only receives a short-lived
 * upload signature (SHA-1 of the signed params + secret), so direct browser
 * uploads to Cloudinary stay authenticated without exposing the key.
 */

export type CloudinarySettings = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

/** Tiny .env fallback (same pattern as @/lib/db) for any missing Cloudinary or MongoDB var. */
function loadEnvFallback(): void {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return;
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[1] && m[2] !== undefined && !process.env[m[1]])
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    // ignore — a missing configuration surfaces as a clear error below
  }
}

export function getCloudinarySettings(): CloudinarySettings {
  loadEnvFallback();
  const url = process.env["CLOUDINARY_URL"];
  if (url) {
    const m = url.match(/^cloudinary:\/\/([^:\s]+):([^@\s]+)@([^\s]+)$/);
    if (m && m[1] && m[2] && m[3]) return { apiKey: m[1], apiSecret: m[2], cloudName: m[3] };
  }
  const cloudName = process.env["CLOUDINARY_CLOUD_NAME"];
  const apiKey = process.env["CLOUDINARY_API_KEY"];
  const apiSecret = process.env["CLOUDINARY_API_SECRET"];
  if (cloudName && apiKey && apiSecret) return { cloudName, apiKey, apiSecret };
  throw new Error(
    "Cloudinary is not configured — add CLOUDINARY_URL (cloudinary://key:secret@cloud_name) " +
      "or CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET to .env.",
  );
}

/** Signed, short-lived params for a direct browser upload into `folder`. */
export function signUploadParams(folder: string): {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
} {
  const { cloudName, apiKey, apiSecret } = getCloudinarySettings();
  const timestamp = Math.round(Date.now() / 1000);
  // Cloudinary signature = SHA-1(sorted params + api_secret); params sorted alphabetically.
  const signature = crypto
    .createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
  return { cloudName, apiKey, timestamp, signature, folder };
}

/** Permanently destroy an asset on Cloudinary (used before removing the DB row). */
export async function destroyCloudinaryAsset(publicId: string): Promise<void> {
  const { cloudName, apiKey, apiSecret } = getCloudinarySettings();
  const timestamp = Math.round(Date.now() / 1000);
  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    signature,
    api_key: apiKey,
  });
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: "POST",
    body,
  });
  const json = (await res.json().catch(() => null)) as {
    result?: string;
    error?: { message?: string };
  } | null;
  if (!res.ok || json?.error)
    throw new Error(json?.error?.message ?? `Cloudinary destroy failed (${res.status})`);
}
