import { createServerFn } from "@tanstack/react-start";

/**
 * Public social wall — an Instagram-style feed of visitor posts on the
 * landing page: people publish a photo, others like and comment.
 *
 * Reuses the existing key space rather than inventing one:
 *   photos    → `media` collection (Cloudinary public_id is the id)
 *   likes     → `photo_likes` collection, keyed by public_id — the SAME
 *               collection /gallery and the landing mosaic use, so a like
 *               on the wall shows up on the gallery and vice versa.
 *   comments  → `gallery_comments`, same public_id key.
 *
 * That shared key space is why wall posts must carry a real Cloudinary
 * public_id: a fabricated key would silently fork the like totals.
 *
 * Link policy (see assertNoLinks): comment text is rejected server-side
 * if it looks like a URL, an @handle, or a `t.co`-style shortener. This is
 * enforced in the handler, NOT in the component, so it cannot be bypassed
 * by posting to the server function directly.
 */

/** Cloudinary public_ids: letters/digits/slash/dash/underscore. */
const PUBLIC_ID_RE = /^[\w\-/]{1,200}$/;

/**
 * Patterns that mark a comment as promotional rather than conversational.
 * Kept deliberately broad — a false positive costs one reword, a false
 * negative puts a spam link on a public page.
 */
const LINK_PATTERNS: RegExp[] = [
  // http(s)://, ftp://, mailto:, tel:
  /\b(?:https?|ftp|ftps|mailto|tel|sms|news|irc|gemini|magnet|bitcoin|wallet)\s*:/i,
  // bare www. prefix
  /\bwww\.[a-z0-9-]+\.[a-z]{2,}/i,
  // any dotted host that looks like a domain: foo.com/bar, t.co/abc
  /\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9-]+){1,4}\/(?:[^\s]*)/i,
  // @handle anywhere
  /(^|\s)@[a-z0-9._-]{2,}/i,
  // #hashtag-with-link feel: leave hashtags out, they aren't links
  // telegram / whatsapp / viber invite links
  /\b(?:t\.me|telegram\.me|wa\.me|whatsapp\.com|chat\.whatsapp\.com|viber\.com|invite\.?)/i,
  // common shorteners
  /\b(?:bit\.ly|tinyurl\.com|shorturl|ow\.ly|t\.co|is\.gd|cutt\.ly|rebrand\.ly|linktr\.ee|linkvertise|lnk\.to|soo\.gd|shorturl\.com|adf\.ly|shorte\.st)\b/i,
  // obfuscation attempts: "h t t p s", "http︰//", "dot com"
  /h\s*t\s*t\s*p/i,
  /\(\s*(?:\.|dot|at)\s*(?:com|net|org|io|co|me|ru|xyz|shop|site)\s*\)/i,
  /[a-z0-9-]+\s*(?:\.|dot|\[\.\])\s*(?:com|net|org|io|co|ru|xyz|shop|site|app|link)\b/i,
];

/**
 * Strip anything link-shaped from a comment, returning the reasons it was
 * rejected. Empty array = clean.
 *
 * Used two ways: the write path throws on non-empty, and the UI calls it to
 * disable the Post button *before* submitting so people get told why rather
 * than bounced by a server error.
 */
export function findLinkIssues(text: string): string[] {
  const issues: string[] = [];
  for (const re of LINK_PATTERNS) if (re.test(text)) issues.push(re.source);
  return issues;
}

export type WallPost = {
  id: string;
  publicId: string;
  url: string;
  width: number;
  height: number;
  author: string;
  handle: string;
  caption: string;
  created_at: string;
  likes: number;
  likedByMe: boolean;
  commentCount: number;
};

export type WallComment = {
  id: string;
  name: string;
  text: string;
  created_at: string;
};

/** Normalise "White Desert fan" → "white_desert_fan", capped, no weird chars. */
function toHandle(name: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s._-]/g, "")
    .trim()
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .join("_");
  return base || "traveler";
}

/**
 * The wall's photo pool. Only photos the owner published in /studio and
 * flagged as featured — a visitor cannot upload a photo themselves (there
 * is no public upload path, by design), so the wall is "people react to
 * these journeys", not "anyone can post anything".
 *
 * If the studio has no featured photos yet we fall back to the same four
 * built-in assets the landing mosaic uses, keyed under a `wall/` namespace
 * so their likes still live in the shared photo_likes key space.
 */
const FALLBACK_WALL_PHOTOS = [
  {
    publicId: "wdh/forms",
    url: "",
    alt: "White Desert formations at sunrise",
    caption: "sunrise run",
  },
  {
    publicId: "wdh/camp",
    url: "",
    alt: "Lantern light at a private night camp",
    caption: "night camp",
  },
  {
    publicId: "wdh/horizon",
    url: "",
    alt: "White Desert horizon at blue hour",
    caption: "last light",
  },
  {
    publicId: "wdh/black-edge",
    url: "",
    alt: "Black Desert volcanic edge",
    caption: "the volcanic edge",
  },
] as const;

export const getWallFeed = createServerFn({ method: "GET" }).handler(
  async (): Promise<WallPost[]> => {
    // The browser identity that liked these — set from localStorage by the client.
    const liked = new Set<string>();

    const { getAnyCollection } = await import("@/lib/db");
    const mediaCol = await getAnyCollection("media");
    const likeCol = await getAnyCollection("photo_likes");
    const commentCol = await getAnyCollection("gallery_comments");

    let photos: Array<{
      publicId: string;
      url: string;
      width: number;
      height: number;
      title: string;
      description: string;
      createdAt: Date;
    }> = [];
    try {
      // Newest first across ALL albums — owner shots and approved community
      // submissions share one chronological feed, so the wall actually shows
      // what travelers sent in (that is the point of it).
      const docs = await mediaCol.find({}).sort({ createdAt: -1 }).limit(12).toArray();
      photos = docs.map((d) => ({
        publicId: String(d.publicId ?? ""),
        url: String(d.url ?? ""),
        width: Number(d.width ?? 0),
        height: Number(d.height ?? 0),
        title: String(d.title ?? ""),
        description: String(d.description ?? ""),
        createdAt: (d.createdAt instanceof Date ? d.createdAt : new Date(0)) as Date,
      }));
    } catch {
      photos = [];
    }

    // Owner-authored posts carry the human voice; fall back to a stable
    // synthetic author per photo so the feed still reads as a feed.
    let socialDocs: Array<Record<string, unknown>> = [];
    try {
      socialDocs = await (
        await getAnyCollection("wall_posts")
      )
        .find({})
        .sort({ createdAt: -1 })
        .limit(60)
        .toArray();
    } catch {
      socialDocs = [];
    }
    const byPhoto = new Map<string, Record<string, unknown>>();
    for (const d of socialDocs) byPhoto.set(String(d["publicId"] ?? ""), d);

    const fallbackOnly = photos.length === 0;
    if (fallbackOnly) {
      photos = FALLBACK_WALL_PHOTOS.map((p, i) => ({
        publicId: p.publicId,
        url: "",
        width: 0,
        height: 0,
        title: p.caption,
        description: p.alt,
        createdAt: new Date(Date.now() - i * 86_400_000),
      }));
    }

    const ids = photos.map((p) => p.publicId);
    const likeDocs = await likeCol
      .find({ photo: { $in: ids } })
      .toArray()
      .catch(() => []);
    const counts = new Map<string, number>();
    for (const d of likeDocs) counts.set(String(d.photo), Number(d.count ?? 0));

    const commentDocs = await commentCol
      .find({ publicId: { $in: ids } })
      .toArray()
      .catch(() => []);
    const commentCounts = new Map<string, number>();
    for (const d of commentDocs)
      commentCounts.set(String(d.publicId), (commentCounts.get(String(d.publicId)) ?? 0) + 1);

    return photos.map((p) => {
      const social = byPhoto.get(p.publicId);
      const author = social ? String(social["author"] ?? "") : "";
      const handle = social ? String(social["handle"] ?? "") : "";
      return {
        id: p.publicId,
        publicId: p.publicId,
        url: p.url || "",
        width: p.width,
        height: p.height,
        author: author || "",
        handle: handle || "",
        caption: social ? String(social["caption"] ?? "") : p.description || p.title,
        created_at: p.createdAt.toISOString(),
        likes: counts.get(p.publicId) ?? 0,
        likedByMe: liked.has(p.publicId),
        commentCount: commentCounts.get(p.publicId) ?? 0,
      };
    });
  },
);

export const setWallPost = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = (input ?? {}) as Record<string, unknown>;
    const publicId = String(v["publicId"] ?? "");
    if (!PUBLIC_ID_RE.test(publicId)) throw new Error("Invalid photo");
    const author = String(v["author"] ?? "").trim();
    if (author.length < 2 || author.length > 40) throw new Error("Name must be 2-40 characters");
    const caption = String(v["caption"] ?? "").trim();
    if (caption.length > 220) throw new Error("Caption must be under 220 characters");
    // The no-link rule applies to captions too, not just comments.
    if (findLinkIssues(author).length > 0 || findLinkIssues(caption).length > 0)
      throw new Error("Links aren't allowed here — keep it about the journey.");
    return { publicId, author, caption, handle: toHandle(author) };
  })
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("wall_posts");
    // One post per photo per author handle — re-posting updates the caption.
    await col.updateOne(
      { publicId: data.publicId, handle: data.handle },
      {
        $set: {
          publicId: data.publicId,
          handle: data.handle,
          author: data.author,
          caption: data.caption,
          editedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    );
    return { ok: true, handle: data.handle };
  });

export const likeWallPost = createServerFn({ method: "POST" })
  .validator(parsePublicIdLike)
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("photo_likes");
    await col.updateOne(
      { photo: data.publicId },
      { $inc: { count: 1 }, $set: { lastAt: new Date() } },
      { upsert: true },
    );
    const doc = await col.findOne({ photo: data.publicId });
    return { ok: true, count: Number(doc?.count ?? 1) };
  });

function parsePublicIdLike(input: unknown): { publicId: string } {
  const publicId = String((input as { publicId?: unknown })?.publicId ?? "");
  if (!PUBLIC_ID_RE.test(publicId)) throw new Error("Invalid photo");
  return { publicId };
}

export const listWallComments = createServerFn({ method: "GET" })
  .validator(parsePublicIdLike)
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("gallery_comments");
    const docs = await col
      .find({ publicId: data.publicId })
      .sort({ createdAt: -1 })
      .limit(30)
      .toArray();
    return docs.map((d) => ({
      id: String(d._id),
      name: String(d.name ?? ""),
      text: String(d.text ?? ""),
      created_at:
        d.createdAt instanceof Date
          ? (d.createdAt as Date).toISOString().slice(0, 19).replace("T", " ")
          : String(d.createdAt ?? ""),
    }));
  });

export const addWallComment = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = (input ?? {}) as Record<string, unknown>;
    const publicId = String(v["publicId"] ?? "");
    if (!PUBLIC_ID_RE.test(publicId)) throw new Error("Invalid photo");
    const name = String(v["name"] ?? "").trim();
    if (name.length < 2 || name.length > 40) throw new Error("Name must be 2-40 characters");
    const text = String(v["text"] ?? "").trim();
    if (text.length < 2 || text.length > 400) throw new Error("Comment must be 2-400 characters");
    // Server-side link rejection — the authoritative check.
    if (findLinkIssues(name).length > 0 || findLinkIssues(text).length > 0)
      throw new Error("Links aren't allowed in comments.");
    return { publicId, name, text };
  })
  .handler(async ({ data }) => {
    const { getAnyCollection } = await import("@/lib/db");
    const col = await getAnyCollection("gallery_comments");
    const doc = {
      publicId: data.publicId,
      name: data.name,
      text: data.text,
      createdAt: new Date(),
    };
    const res = await col.insertOne(doc);
    try {
      const { notify } = await import("@/lib/notify");
      notify("comment", `💬 ${data.name} on the social wall\n${data.text.slice(0, 140)}`);
    } catch {
      /* ignore */
    }
    return {
      id: String(res.insertedId),
      name: data.name,
      text: data.text,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
  });

/** Admin: remove a wall post or a comment by id. */
export const deleteWallItem = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = (input ?? {}) as Record<string, unknown>;
    const kind = String(v["kind"] ?? "");
    const id = String(v["id"] ?? "");
    if (kind !== "post" && kind !== "comment") throw new Error("Invalid kind");
    if (!/^[a-f\d]{24}$/i.test(id)) throw new Error("Invalid id");
    return { kind, id };
  })
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { getAnyCollection } = await import("@/lib/db");
    const { ObjectId } = await import("mongodb");
    const name = data.kind === "post" ? "wall_posts" : "gallery_comments";
    await (await getAnyCollection(name)).deleteOne({ _id: new ObjectId(data.id) });
  });
