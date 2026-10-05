import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/start-server-core";

/**
 * Public photo submissions — visitors upload a photo, it waits for the owner's
 * approval before appearing anywhere on the site.
 *
 * Same lifecycle as testimonials: submit → pending → approved | rejected. The
 * admin studio gets the approve/reject controls; nothing public reads
 * unapproved rows.
 *
 * SECURITY MODEL (this is the part that matters):
 *   1. The Cloudinary upload signature is issued WITHOUT requireAdmin — that is
 *      the whole point, visitors can't sign in. So it is deliberately narrow:
 *        - one hardcoded folder (`wall/submissions`), never a caller-supplied
 *          album, so a visitor cannot write into the owner's album tree;
 *        - a per-IP rate limit, because the signature is a public capability.
 *      Everything else about that signature is identical to the admin one in
 *      @/lib/studio.
 *   2. Nothing is trusted from the browser after the upload: publicId, url,
 *      width and height are re-validated here. A visitor can post any
 *      publicId they like, so it must be constrained to the submissions folder
 *      or they could impersonate an approved photo.
 *   3. Rows land as `status: "pending"` and every public read filters on that.
 *
 * If you ever remove the folder restriction, this becomes a write primitive
 * into the owner's media library. Keep it.
 */

/** Cloudinary public_ids: letters/digits/slash/dash/underscore. */
const PUBLIC_ID_RE = /^[\w\-/]{1,200}$/;

/** Submissions always live here — never interpolated from user input. */
export const SUBMISSIONS_FOLDER = "white-desert/wall/submissions";

/** Cloudinary delivery URL prefix — the only host an upload may report. */
const CLOUDINARY_URL_RE = /^https:\/\/res\.cloudinary\.com\//;

const NAME_MAX = 60;
const CAPTION_MAX = 220;

// ---- rate limit (in-memory, per cold start — same convention as lib/auth) ----
const UPLOAD_LIMIT = 5; // photos
const UPLOAD_WINDOW_MS = 60 * 60 * 1000; // per hour

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalStore = globalThis as any;

/**
 * The client IP, used as the rate-limit bucket.
 *
 * `getRequestIP()` reads the platform's own resolution (x-forwarded-for behind a
 * proxy) instead of us parsing headers by hand. If it throws — no request
 * context, e.g. a prerender — the upload still works; only the throttle
 * degrades to a shared bucket. A shared bucket is strictly safer than none.
 */
function rateKey(): string {
  try {
    const ip = getRequestIP();
    if (ip) return ip.trim();
  } catch {
    /* no request context — fall through to the shared bucket */
  }
  return "unknown";
}

function checkRateLimit(): { ok: boolean; retryInMinutes: number } {
  const attempts: Map<string, { count: number; windowStart: number }> =
    globalStore.__wdhUploadAttempts ?? new Map();
  globalStore.__wdhUploadAttempts = attempts;
  const key = rateKey();
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now - entry.windowStart > UPLOAD_WINDOW_MS) {
    attempts.set(key, { count: 1, windowStart: now });
    return { ok: true, retryInMinutes: 0 };
  }
  entry.count += 1;
  if (entry.count > UPLOAD_LIMIT) {
    return {
      ok: false,
      retryInMinutes: Math.ceil((UPLOAD_WINDOW_MS - (now - entry.windowStart)) / 60000),
    };
  }
  return { ok: true, retryInMinutes: 0 };
}

/** Signed params for a visitor upload into the submissions folder only. */
export const getSubmissionUploadSignature = createServerFn({ method: "POST" }).handler(
  async (): Promise<{
    cloudName: string;
    apiKey: string;
    timestamp: number;
    signature: string;
    folder: string;
  }> => {
    const limit = checkRateLimit();
    if (!limit.ok)
      throw new Error(
        `Upload limit reached — you can submit ${UPLOAD_LIMIT} photos per hour. Try again in ${limit.retryInMinutes} minutes.`,
      );
    const { signUploadParams } = await import("@/lib/cloudinary");
    return signUploadParams(SUBMISSIONS_FOLDER);
  },
);

export const submitPhoto = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = (input ?? {}) as Record<string, unknown>;
    const publicId = String(v["publicId"] ?? "").trim();
    const url = String(v["url"] ?? "").trim();
    const author = String(v["author"] ?? "").trim();
    const caption = String(v["caption"] ?? "").trim();

    if (!publicId || publicId.length > 200) throw new Error("Missing photo");
    if (!PUBLIC_ID_RE.test(publicId)) throw new Error("Invalid photo id");
    // The publicId must live in the submissions folder. Without this a visitor
    // could claim to have uploaded `white-desert/hero` and pass off someone
    // else's photo as their own.
    if (!publicId.startsWith(`${SUBMISSIONS_FOLDER}/`))
      throw new Error("Photo must be uploaded through the submission form.");
    if (!CLOUDINARY_URL_RE.test(url)) throw new Error("Invalid photo url");
    if (author.length < 2 || author.length > NAME_MAX)
      throw new Error(`Name must be 2-${NAME_MAX} characters`);

    // The no-link rule from the social wall applies here too — a caption is
    // still text a stranger wrote, and it renders on a public page.
    if (findLinkIssues(author).length > 0 || findLinkIssues(caption).length > 0)
      throw new Error("Links aren't allowed here — keep it about the journey.");

    return {
      publicId,
      url,
      author,
      caption: caption.slice(0, CAPTION_MAX),
      width: Math.max(0, Math.min(20_000, Math.round(Number(v["width"]) || 0))),
      height: Math.max(0, Math.min(20_000, Math.round(Number(v["height"]) || 0))),
      format: String(v["format"] ?? "jpg").slice(0, 8),
      bytes: Math.max(0, Math.min(50_000_000, Math.round(Number(v["bytes"]) || 0))),
    };
  })
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("photo_submissions");
    const doc = {
      publicId: data.publicId,
      url: data.url,
      author: data.author,
      caption: data.caption,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes,
      status: "pending" as const,
      createdAt: new Date(),
    };
    const res = await col.insertOne(doc);
    try {
      const { notify } = await import("@/lib/notify");
      notify("submission", `📷 New photo from ${data.author}\n${data.caption.slice(0, 100)}`);
    } catch {
      /* ignore */
    }
    return { ok: true, id: String(res.insertedId), status: doc.status };
  });

export type SubmissionRow = {
  id: string;
  publicId: string;
  url: string;
  author: string;
  caption: string;
  width: number;
  height: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

function toRow(doc: Record<string, unknown>): SubmissionRow {
  const status =
    doc["status"] === "approved" || doc["status"] === "rejected" ? doc["status"] : "pending";
  return {
    id: String(doc["_id"]),
    publicId: String(doc["publicId"] ?? ""),
    url: String(doc["url"] ?? ""),
    author: String(doc["author"] ?? ""),
    caption: String(doc["caption"] ?? ""),
    width: Number(doc["width"] ?? 0),
    height: Number(doc["height"] ?? 0),
    status: status as SubmissionRow["status"],
    created_at:
      doc["createdAt"] instanceof Date
        ? (doc["createdAt"] as Date).toISOString().slice(0, 19).replace("T", " ")
        : String(doc["createdAt"] ?? ""),
  };
}

/** Admin: every submission, newest first. */
export const listSubmissions = createServerFn({ method: "GET" }).handler(
  async (): Promise<SubmissionRow[]> => {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("photo_submissions");
    const docs = await col.find({}).sort({ createdAt: -1 }).limit(200).toArray();
    return docs.map(toRow);
  },
);

/** Admin: approve or reject. Approving also publishes the photo to /gallery. */
export const reviewSubmission = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = (input ?? {}) as Record<string, unknown>;
    const id = String(v["id"] ?? "");
    const status = String(v["status"] ?? "");
    if (!/^[a-f\d]{24}$/i.test(id)) throw new Error("Invalid id");
    if (status !== "approved" && status !== "rejected" && status !== "pending") {
      throw new Error("Invalid status");
    }
    return { id, status: status as SubmissionRow["status"] };
  })
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("photo_submissions");
    const doc = await col.findOneAndUpdate(
      { _id: new (await import("mongodb")).ObjectId(data.id) },
      { $set: { status: data.status, reviewedAt: new Date() } },
      { returnDocument: "after" },
    );
    if (!doc) throw new Error("Submission not found");

    // Publishing to the gallery is a side effect of approval only — a rejected
    // or still-pending photo must never enter the public media library.
    if (data.status === "approved") {
      try {
        const { createMedia } = await import("@/lib/media");
        await createMedia({
          publicId: String(doc.publicId ?? ""),
          url: String(doc.url ?? ""),
          width: Number(doc.width ?? 0),
          height: Number(doc.height ?? 0),
          format: String(doc.format ?? "jpg"),
          bytes: Number(doc.bytes ?? 0),
          album: "Community",
          tags: [],
          title: String(doc.author ?? ""),
          description: String(doc.caption ?? ""),
        });
      } catch (err) {
        console.warn(
          "[submissions] approved but not published:",
          err instanceof Error ? err.message : err,
        );
      }
    }
    return toRow(doc as Record<string, unknown>);
  });

/** Admin: delete the Cloudinary asset and the row. */
export const removeSubmission = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const id = String((input as { id?: unknown })?.id ?? "");
    if (!/^[a-f\d]{24}$/i.test(id)) throw new Error("Invalid id");
    return { id };
  })
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { getAnyCollection } = await import("@/lib/db");
    const { ObjectId } = await import("mongodb");
    const col = await getAnyCollection("photo_submissions");
    const doc = await col.findOne({ _id: new ObjectId(data.id) });
    // Destroy the bytes first: a rejected photo must not linger on the CDN even
    // if the row deletion fails afterwards.
    try {
      const { destroyCloudinaryAsset } = await import("@/lib/cloudinary");
      await destroyCloudinaryAsset(String(doc?.publicId ?? ""));
    } catch (err) {
      console.warn(
        "[submissions] cloudinary destroy failed:",
        err instanceof Error ? err.message : err,
      );
    }
    await col.deleteOne({ _id: new ObjectId(data.id) });
  });

// ---- link detection (mirrors src/lib/social-wall.ts) -----------------------

/**
 * Patterns that mark text as promotional rather than conversational. Kept in
 * sync with the social wall's copy so a caption and a comment are judged by the
 * same rule — a caption is no less public than a comment.
 */
const LINK_PATTERNS: RegExp[] = [
  /\b(?:https?|ftp|ftps|mailto|tel|sms|news|irc|gemini|magnet|bitcoin|wallet)\s*:/i,
  /\bwww\.[a-z0-9-]+\.[a-z]{2,}/i,
  /\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9-]+){1,4}\/(?:[^\s]*)/i,
  /(^|\s)@[a-z0-9._-]{2,}/i,
  /\b(?:t\.me|telegram\.me|wa\.me|whatsapp\.com|chat\.whatsapp\.com|viber\.com|invite\.?)/i,
  /\b(?:bit\.ly|tinyurl\.com|shorturl|ow\.ly|t\.co|is\.gd|cutt\.ly|rebrand\.ly|linktr\.ee|linkvertise|lnk\.to|soo\.gd|shorturl\.com|adf\.ly|shorte\.st)\b/i,
  /h\s*t\s*t\s*p/i,
  /\(\s*(?:\.|dot|at)\s*(?:com|net|org|io|co|me|ru|xyz|shop|site)\s*\)/i,
  /[a-z0-9-]+\s*(?:\.|dot|\[\.\])\s*(?:com|net|org|io|co|ru|xyz|shop|site|app|link)\b/i,
];

export function findLinkIssues(text: string): string[] {
  const issues: string[] = [];
  for (const re of LINK_PATTERNS) if (re.test(text)) issues.push(re.source);
  return issues;
}
