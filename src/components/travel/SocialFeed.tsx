import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Camera, Heart, MessageCircle, Send, ShieldCheck, Loader2 } from "lucide-react";

import heroImage from "@/assets/white-desert-hero.jpg";
import campImage from "@/assets/white-desert-camp.jpg";
import formsImage from "@/assets/white-desert-forms.jpg";
import contrastImage from "@/assets/black-white-desert.jpg";
import { galleryUrl } from "@/lib/gallery-url";
import { SubmitPhoto } from "@/components/travel/SubmitPhoto";

/**
 * Social page feed (/social) — the Instagram-shaped experience: posts with
 * author, likes, comments and share. Loaded strictly page-by-page from the
 * server so the archive can grow to thousands of photos without slowing
 * anything down; the browser only ever holds the pages it has opened.
 *
 * Likes share the `photo_likes` key space with /gallery, comments share
 * `gallery_comments` — a like here is the same like there.
 *
 * Nothing here is trusted on the client: the server re-validates every write
 * and rejects link-shaped text. The client-side `findLinkIssues` only exists
 * to disable the button early and explain why.
 */

type Post = {
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

type Comment = { id: string; name: string; text: string; created_at: string };

/** Built-in photos keyed the same way the fallback server rows are. */
const FALLBACK_IMAGES: Record<string, { src: string; alt: string }> = {
  "wdh/forms": {
    src: formsImage,
    alt: "Sunlit mushroom-shaped limestone formations in Egypt's White Desert",
  },
  "wdh/camp": {
    src: campImage,
    alt: "Warm lanterns at a private White Desert night camp",
  },
  "wdh/horizon": {
    src: heroImage,
    alt: "Expansive White Desert Egypt horizon at blue hour",
  },
  "wdh/black-edge": {
    src: contrastImage,
    alt: "Black Desert Egypt volcanic hills overlooking pale chalk terrain",
  },
};

/**
 * Client mirror of the server's link rule. Kept intentionally in sync with
 * `findLinkIssues` in @/lib/social-wall — the server remains authoritative,
 * this only avoids a pointless round-trip and gives instant feedback.
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
  /[a-z0-9-]+\s*(?:\.|dot|\[\. \])\s*(?:com|net|org|io|co|ru|xyz|shop|site|app|link)\b/i,
];

function hasLink(text: string): boolean {
  return LINK_PATTERNS.some((re) => re.test(text));
}

/** "3m ago" — relative for the feed, absolute as a title attribute. */
function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const secs = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function compact(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}k`;
  return `${(n / 1_000_000).toFixed(1)}m`;
}

/**
 * Stable per-browser identity for likes. Random, stored in localStorage — it
 * carries no user data; the server only uses it to make like/unlike symmetric
 * (the same id reverts the same like) and to stop one browser inflating a
 * counter. The feed's likedByMe is derived from this id server-side.
 */
function getClientId(): string {
  const KEY = "wdh-client-id";
  try {
    const existing = localStorage.getItem(KEY);
    if (existing && /^[\w-]{8,64}$/.test(existing)) return existing;
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 32)
        : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem(KEY, fresh);
    return fresh;
  } catch {
    // Private mode without storage — ephemeral id, likes still work per page load.
    return `ephemeral${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  }
}

/** Page size for the social feed — server caps at 24. */
const PAGE_SIZE = 12;

export function SocialFeed() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [failed, setFailed] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(async () => {
    try {
      const { getWallFeed } = await import("@/lib/social-wall");
      const res = (await getWallFeed({
        data: { page: 1, pageSize: PAGE_SIZE, clientId: getClientId() },
      })) as unknown as { posts: Post[]; hasMore: boolean };
      setPosts(res.posts);
      setHasMore(res.hasMore);
      setCounts(Object.fromEntries(res.posts.map((r) => [r.publicId, r.likes])));
      setLiked(Object.fromEntries(res.posts.map((r) => [r.publicId, r.likedByMe])));
      setFailed(false);
    } catch {
      // Mongo unreachable → the feed still renders from the built-in photos.
      setPosts([]);
      setFailed(true);
    }
  }, []);

  // Instagram-style feed: the first page renders, "load more" appends the next
  // page — the browser never downloads the whole archive at once.
  const loadMore = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const { getWallFeed } = await import("@/lib/social-wall");
      const next = Math.floor((posts?.length ?? 0) / PAGE_SIZE) + 1;
      const res = (await getWallFeed({
        data: { page: next, pageSize: PAGE_SIZE, clientId: getClientId() },
      })) as unknown as { posts: Post[]; hasMore: boolean };
      setPosts((cur) => {
        const seen = new Set((cur ?? []).map((p) => p.publicId));
        return [...(cur ?? []), ...res.posts.filter((p) => !seen.has(p.publicId))];
      });
      setCounts((c) => ({
        ...c,
        ...Object.fromEntries(res.posts.map((r) => [r.publicId, r.likes])),
      }));
      setLiked((l) => ({
        ...l,
        ...Object.fromEntries(res.posts.map((r) => [r.publicId, r.likedByMe])),
      }));
      setHasMore(res.hasMore);
    } catch {
      /* keep the current page on failure */
    } finally {
      setLoadingMore(false);
    }
  }, [posts, loadingMore]);

  useEffect(() => {
    load();
  }, [load]);

  const persistLiked = (next: Record<string, boolean>) => {
    setLiked(next);
  };

  // With no DB the feed is empty; fall back to the built-in set so the page
  // still shows the four studio photos with working like counts.
  const display = useMemo<Post[]>(() => {
    if (posts && posts.length > 0) return posts;
    return Object.entries(FALLBACK_IMAGES).map(([publicId, img], i) => ({
      id: publicId,
      publicId,
      url: "",
      width: 0,
      height: 0,
      author: "",
      handle: "",
      caption: img.alt,
      created_at: new Date(Date.now() - i * 86_400_000).toISOString(),
      likes: counts[publicId] ?? 0,
      likedByMe: Boolean(liked[publicId]),
      commentCount: 0,
    }));
  }, [posts, counts, liked]);

  async function like(post: Post) {
    const wasLiked = Boolean(liked[post.publicId]);
    // Optimistic toggle — the server is the source of truth and its answer
    // (liked + count) overwrites this, so a flaky connection cannot desync.
    const next = { ...liked, [post.publicId]: !wasLiked };
    persistLiked(next);
    setCounts((c) => ({
      ...c,
      [post.publicId]: Math.max(0, (c[post.publicId] ?? 0) + (wasLiked ? -1 : 1)),
    }));
    try {
      const { likeWallPost } = await import("@/lib/social-wall");
      const res = (await likeWallPost({
        data: { publicId: post.publicId, clientId: getClientId() },
      })) as { liked?: boolean; count?: number };
      if (typeof res?.count === "number")
        setCounts((c) => ({ ...c, [post.publicId]: res.count as number }));
      if (typeof res?.liked === "boolean")
        setLiked((l) => ({ ...l, [post.publicId]: res.liked as boolean }));
    } catch {
      // Roll the optimistic change back — the click did not register.
      persistLiked({ ...liked, [post.publicId]: wasLiked });
      setCounts((c) => ({
        ...c,
        [post.publicId]: Math.max(0, (c[post.publicId] ?? 0) + (wasLiked ? 1 : -1)),
      }));
    }
  }

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="min-h-screen bg-hero-background text-hero-foreground">
      {/* Profile header — Instagram profile shape */}
      <header className="border-b border-white/10 px-5 pb-10 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[935px] items-center gap-8 sm:gap-12">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-primary to-primary/40 p-[3px] sm:h-24 sm:w-24">
            <span className="grid h-full w-full place-items-center rounded-full bg-hero-background">
              <Camera className="h-7 w-7 text-primary" />
            </span>
          </span>
          <div className="min-w-0">
            <h1 className="editorial-title text-3xl sm:text-4xl">white desert · egypt</h1>
            <p className="mt-2 text-sm text-hero-foreground/60">
              Moments from travelers and our journeys — liked and commented in real time.
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-hero-foreground/45">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              No links, ever
            </p>
          </div>
        </div>
      </header>

      {/* Feed — single column, Instagram post shape */}
      <div className="mx-auto max-w-[470px] px-4 py-10">
        {failed && (
          <p className="mb-6 text-xs text-hero-foreground/45">
            Showing studio picks — live likes will resume once the connection is back.
          </p>
        )}

        {posts === null && !failed && (
          <p className="py-16 text-center text-sm text-hero-foreground/40">Loading…</p>
        )}

        <div className="space-y-10">
          {display.map((post) => (
            <WallCard
              key={post.publicId}
              post={post}
              liked={Boolean(liked[post.publicId])}
              likeCount={counts[post.publicId] ?? 0}
              expanded={openId === post.publicId}
              onToggle={() => setOpenId((cur) => (cur === post.publicId ? null : post.publicId))}
              onLike={() => like(post)}
            />
          ))}
        </div>

        {/* Sentinel + button pagination: one server page at a time. */}
        <div ref={sentinelRef} />
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 border border-primary/40 px-8 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading
                </>
              ) : (
                "Load more"
              )}
            </button>
          </div>
        )}

        {!hasMore && posts !== null && posts.length > 0 && (
          <p className="mt-12 text-center text-[0.62rem] uppercase tracking-[0.14em] text-hero-foreground/30">
            You&apos;re all caught up
          </p>
        )}

        {/* Visitors submit their own photo; it waits for the owner's approval. */}
        <div className="mt-16 flex justify-center">
          <SubmitPhoto />
        </div>
      </div>
    </main>
  );
}

function WallCard({
  post,
  liked,
  likeCount,
  expanded,
  onToggle,
  onLike,
}: {
  post: Post;
  liked: boolean;
  likeCount: number;
  expanded: boolean;
  onToggle: () => void;
  onLike: () => void;
}) {
  const fallback = FALLBACK_IMAGES[post.publicId];
  // Card-sized thumbnail from Cloudinary (f_auto/q_auto + 640w) — the raw
  // stored original can be several MB and was what made the wall slow.
  const rawSrc = post.url || fallback?.src || "";
  const src = rawSrc ? galleryUrl(rawSrc, 640) : "";
  const alt = fallback?.alt ?? post.caption ?? "White Desert moment";
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // A caption mentioning a link can only have come from before the rule, or
  // from the DB written by an older deploy. Render it as inert text.
  const nameSafe = !hasLink(post.author);
  const captionSafe = !hasLink(post.caption);
  const handleSafe = !hasLink(post.handle);

  // Block submission client-side for instant feedback; the server re-checks.
  const linkInInput = hasLink(text) || hasLink(name);
  const tooLong = text.trim().length > 400;
  const canSend = name.trim().length >= 2 && text.trim().length >= 2 && !linkInInput && !tooLong;

  const panelId = `wall-panel-${post.publicId.replace(/[^\w-]/g, "-")}`;

  const loadComments = useCallback(async () => {
    try {
      const { listWallComments } = await import("@/lib/social-wall");
      const rows = (await listWallComments({
        data: { publicId: post.publicId },
      })) as unknown as Comment[];
      setComments(rows);
    } catch {
      setComments([]);
    }
  }, [post.publicId]);

  useEffect(() => {
    if (expanded) loadComments();
  }, [expanded, loadComments]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || sending) return;
    setSending(true);
    setError("");
    try {
      const { addWallComment } = await import("@/lib/social-wall");
      const row = (await addWallComment({
        data: { publicId: post.publicId, name: name.trim(), text: text.trim() },
      })) as unknown as Comment;
      setComments((prev) => [row, ...(prev ?? [])]);
      setText("");
    } catch (err) {
      setError(
        err instanceof Error && /link/i.test(err.message)
          ? err.message
          : "Could not post the comment — try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <article className="flex flex-col overflow-hidden border border-white/10 bg-black/25 backdrop-blur-sm">
      {/* Author header */}
      <header className="flex items-center gap-3 px-4 py-3.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-[0.7rem] font-semibold uppercase text-primary">
          {(nameSafe && post.author.trim().charAt(0)) || <Camera className="h-4 w-4" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.82rem] font-semibold leading-tight">
            {nameSafe ? post.author : "Traveler"}
          </p>
          <p className="truncate text-[0.68rem] leading-tight text-hero-foreground/45">
            {handleSafe && post.handle ? `@${post.handle}` : "white desert · egypt"}
          </p>
        </div>
        <time
          className="shrink-0 text-[0.62rem] uppercase tracking-[0.1em] text-hero-foreground/35"
          dateTime={post.created_at}
          title={new Date(post.created_at).toLocaleString()}
        >
          {timeAgo(post.created_at)}
        </time>
      </header>

      {/* Photo */}
      <div className="relative aspect-square overflow-hidden bg-black/40">
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-hero-foreground/25">
            <Camera className="h-8 w-8" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-2 py-2">
        <button
          type="button"
          onClick={onLike}
          aria-pressed={liked}
          aria-label={liked ? "Unlike this post" : "Like this post"}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] transition-colors ${
            liked ? "text-red-300" : "text-hero-foreground/75 hover:bg-white/5 hover:text-red-300"
          }`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          {likeCount > 0 ? compact(likeCount) : "Like"}
        </button>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] text-hero-foreground/75 transition-colors hover:bg-white/5"
        >
          <MessageCircle className="h-4 w-4" />
          {post.commentCount > 0 ? compact(post.commentCount) : "Comment"}
        </button>

        <button
          type="button"
          onClick={() => {
            const url = `${window.location.origin}/social?photo=${encodeURIComponent(post.publicId)}`;
            if (navigator.share) {
              navigator.share({ title: "White Desert Horizons", url }).catch(() => {});
            } else {
              navigator.clipboard.writeText(url).catch(() => {});
            }
          }}
          aria-label="Share this post"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] text-hero-foreground/75 transition-colors hover:bg-white/5"
        >
          <Send className="h-4 w-4" />
          Share
        </button>
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="px-4 pb-2 text-[0.8rem] leading-relaxed text-hero-foreground/85">
          {captionSafe ? (
            <>
              <span className="font-semibold">{nameSafe ? post.author : "traveler"}</span>{" "}
              {post.caption}
            </>
          ) : (
            <span className="text-hero-foreground/40">Caption withheld — it contained a link.</span>
          )}
        </p>
      )}

      {/* Comment panel */}
      {expanded && (
        <div id={panelId} className="border-t border-white/10 px-4 pb-4 pt-3">
          {comments === null && (
            <p className="flex items-center gap-2 py-2 text-[0.72rem] text-hero-foreground/40">
              <Loader2 className="h-3 w-3 animate-spin" /> Loading comments…
            </p>
          )}
          {comments !== null && comments.length === 0 && (
            <p className="py-2 text-[0.72rem] text-hero-foreground/40">
              No comments yet — be the first.
            </p>
          )}
          {comments?.map((c) => (
            <p key={c.id} className="py-1.5 text-[0.78rem] leading-relaxed">
              <span className="font-semibold">{hasLink(c.name) ? "Traveler" : c.name}</span>{" "}
              <span className="text-hero-foreground/80">{c.text}</span>
            </p>
          ))}

          <form onSubmit={submit} className="mt-3 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={40}
              aria-label="Your name"
              className="w-full border border-white/12 bg-black/25 px-3 py-2 text-[0.78rem] outline-none transition-colors placeholder:text-hero-foreground/30 focus:border-primary"
            />
            <div className="flex items-end gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment… no links"
                rows={2}
                maxLength={400}
                aria-label="Your comment"
                aria-invalid={linkInInput}
                className={`w-full resize-none border bg-black/25 px-3 py-2 text-[0.78rem] leading-relaxed outline-none transition-colors placeholder:text-hero-foreground/30 ${
                  linkInInput ? "border-red-400/60" : "border-white/12 focus:border-primary"
                }`}
              />
              <button
                type="submit"
                disabled={!canSend || sending}
                aria-label="Post comment"
                className="grid h-9 w-9 shrink-0 place-items-center border border-primary/40 text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-35"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            {linkInInput && (
              <p className="text-[0.7rem] text-red-300">
                Links aren't allowed — keep it about the journey.
              </p>
            )}
            {tooLong && <p className="text-[0.7rem] text-red-300">Max 400 characters.</p>}
            {error && <p className="text-[0.7rem] text-red-300">{error}</p>}
          </form>
        </div>
      )}
    </article>
  );
}
