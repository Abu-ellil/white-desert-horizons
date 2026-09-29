import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Loader2,
  MessageCircle,
  X,
} from "lucide-react";

import {
  addGalleryComment,
  getGalleryLikes,
  getPublicGallery,
  likeGalleryPhoto,
  listGalleryComments,
  type GalleryComment,
  type GalleryPhoto,
} from "@/lib/gallery";
import { galleryUrl } from "@/lib/gallery-url";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [{ title: "Gallery | WHITE DESERT HORIZONS" }],
  }),
  component: GalleryPage,
});

/** One like per photo per browser — same guard as the landing gallery. */
function hasLiked(publicId: string): boolean {
  try {
    return localStorage.getItem(`wdh-liked-${publicId}`) === "1";
  } catch {
    return false;
  }
}

function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[] | null>(null);
  const [album, setAlbum] = useState("All");
  const [error, setError] = useState("");
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [openPhoto, setOpenPhoto] = useState<GalleryPhoto | null>(null);

  const refresh = useCallback(async () => {
    setError("");
    try {
      const data = (await getPublicGallery({
        data: { album: album === "All" ? null : album },
      })) as unknown as GalleryPhoto[];
      setPhotos(data);
      if (data.length > 0) {
        try {
          const counts = (await getGalleryLikes({
            data: { publicIds: data.map((p) => p.publicId) },
          })) as unknown as Record<string, number>;
          setLikes(counts ?? {});
        } catch {
          /* likes are decorative — page works without them */
        }
      }
    } catch (err) {
      setError(
        err instanceof Error && /MONGODB/.test(err.message)
          ? err.message
          : "Could not load the gallery. Please try again later.",
      );
    }
  }, [album]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const albums = useMemo(() => {
    const set = [...new Set((photos ?? []).map((p) => p.album))].sort((a, b) => a.localeCompare(b));
    return ["All", ...set];
  }, [photos]);

  const shown = useMemo(
    () => (photos ?? []).filter((p) => album === "All" || p.album === album),
    [photos, album],
  );

  async function like(photo: GalleryPhoto) {
    if (hasLiked(photo.publicId)) return;
    try {
      localStorage.setItem(`wdh-liked-${photo.publicId}`, "1");
    } catch {
      /* private mode — allow, server just counts it */
    }
    setLikes((prev) => ({ ...prev, [photo.publicId]: (prev[photo.publicId] ?? 0) + 1 }));
    try {
      const res = (await likeGalleryPhoto({ data: { publicId: photo.publicId } })) as unknown as {
        count: number;
      };
      if (res && typeof res.count === "number")
        setLikes((prev) => ({ ...prev, [photo.publicId]: res.count }));
    } catch {
      /* silent — like is best-effort */
    }
  }

  return (
    <main className="min-h-screen bg-surface-dark px-5 py-12 text-surface-dark-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-kicker">Field notes</p>
            <h1 className="editorial-title mt-3 text-4xl sm:text-5xl">
              Light, form, <em>silence.</em>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-surface-dark-foreground/60">
              Fragments from the White Desert and its contrasting volcanic edge — photographed on
              our journeys. Like a photo or leave a note; we read everything.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-surface-dark-foreground/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </div>

        {error && (
          <p
            className="mt-6 border border-red-400/40 bg-red-950/40 p-4 text-sm text-red-200"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {albums.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAlbum(a)}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                album === a
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-surface-dark-foreground/25 text-surface-dark-foreground/60 hover:border-primary hover:text-primary"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {photos === null && !error && (
          <p className="mt-10 text-sm text-surface-dark-foreground/50">Loading…</p>
        )}

        {photos !== null && shown.length === 0 && (
          <p className="mt-10 text-sm text-surface-dark-foreground/50">
            No photographs in this album yet — check back soon.
          </p>
        )}

        <div className="mt-8 columns-2 gap-4 md:columns-3 xl:columns-4 [&>*]:mb-4">
          {shown.map((photo) => {
            const liked = hasLiked(photo.publicId);
            const count = likes[photo.publicId];
            return (
              <figure
                key={photo.id}
                className="group relative break-inside-avoid cursor-pointer overflow-hidden bg-black/20"
                onClick={() => setOpenPhoto(photo)}
              >
                <img
                  src={galleryUrl(photo.url, 720)}
                  alt={photo.title || photo.album}
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-white/90">
                  {photo.title || photo.album}
                </figcaption>
                <button
                  type="button"
                  aria-label={liked ? "Liked" : "Like this photo"}
                  onClick={(e) => {
                    e.stopPropagation();
                    void like(photo);
                  }}
                  className={`absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.68rem] backdrop-blur-sm transition-all ${
                    liked
                      ? "border-red-400/60 bg-red-500/25 text-red-200"
                      : "border-white/30 bg-black/30 text-white/90 hover:border-red-300/60 hover:text-red-200"
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
                  {count !== undefined && count > 0 ? count : ""}
                </button>
              </figure>
            );
          })}
        </div>
      </div>

      {openPhoto !== null && (
        <Lightbox
          photos={shown}
          index={shown.findIndex((p) => p.id === openPhoto.id)}
          onClose={() => setOpenPhoto(null)}
          onNavigate={(next) => setOpenPhoto(shown[next] ?? null)}
        />
      )}
    </main>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const photo = photos[index];
  const [comments, setComments] = useState<GalleryComment[] | null>(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [commentError, setCommentError] = useState("");

  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  // Touch swipe (mobile): track a horizontal drag and flip photos on release.
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const dx = e.changedTouches[0]?.clientX - start;
    if (dx === undefined || Math.abs(dx) < 50) return; // ignore tiny drags
    if (dx < 0)
      goNext(); // swipe left → next
    else goPrev(); // swipe right → previous
  };

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1);
  }, [hasPrev, index, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1);
  }, [hasNext, index, onNavigate]);

  useEffect(() => {
    if (!photo) return;
    listGalleryComments({ data: { publicId: photo.publicId } })
      .then((rows) => setComments(rows as unknown as GalleryComment[]))
      .catch(() => setComments([]));
  }, [photo?.publicId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goNext(); // LTR: left arrow = next photo
      if (e.key === "ArrowRight") goPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  if (!photo) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setCommentError("");
    try {
      const row = (await addGalleryComment({
        data: { publicId: photo.publicId, name, text },
      })) as unknown as GalleryComment;
      setComments((prev) => [row, ...(prev ?? [])]);
      setText("");
    } catch (err) {
      setCommentError(
        err instanceof Error && /characters/.test(err.message)
          ? err.message
          : "Could not post the comment — try again.",
      );
    } finally {
      setSending(false);
    }
  }

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev / next arrows */}
      {hasPrev && (
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white sm:left-6"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white sm:right-6"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
      )}

      {/* Counter */}
      <p className="absolute left-1/2 top-5 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        {index + 1} / {photos.length}
      </p>
      <div className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden border border-white/10 bg-surface-dark lg:flex-row">
        <div className="flex min-h-0 flex-1 items-center justify-center bg-black/40">
          <img
            src={galleryUrl(photo.url, 1400)}
            alt={photo.album}
            className="max-h-[70vh] w-full object-contain"
          />
        </div>
        <aside className="flex w-full flex-col border-t border-white/10 lg:w-80 lg:border-l lg:border-t-0">
          <div className="border-b border-white/10 p-5">
            <p className="section-kicker">{photo.album}</p>
            {photo.title && (
              <h2 className="mt-2 text-sm font-bold text-surface-dark-foreground/95">
                {photo.title}
              </h2>
            )}
            {photo.description && (
              <p className="mt-1 text-xs leading-6 text-surface-dark-foreground/65">
                {photo.description}
              </p>
            )}
            <p className="mt-2 text-xs text-surface-dark-foreground/50">
              {new Date(photo.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}{" "}
              · {photo.width}×{photo.height}
            </p>
          </div>
          <div className="min-h-24 flex-1 overflow-y-auto p-5">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-surface-dark-foreground/70">
              <MessageCircle className="h-3.5 w-3.5" /> Comments
            </h3>
            {comments === null && (
              <p className="mt-4 flex items-center gap-2 text-xs text-surface-dark-foreground/50">
                <Loader2 className="h-3 w-3 animate-spin" /> Loading…
              </p>
            )}
            {comments !== null && comments.length === 0 && (
              <p className="mt-4 text-xs leading-6 text-surface-dark-foreground/50">
                No comments yet — be the first.
              </p>
            )}
            {comments?.map((c) => (
              <div key={c.id} className="mt-4 border-b border-white/5 pb-3">
                <p className="text-xs font-bold text-surface-dark-foreground/90">{c.name}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-surface-dark-foreground/75">
                  {c.text}
                </p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-surface-dark-foreground/40">
                  {c.created_at}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="border-t border-white/10 p-5">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={60}
              className="mb-2 w-full border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-primary focus:outline-none"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment…"
              maxLength={500}
              rows={3}
              className="w-full resize-none border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-primary focus:outline-none"
            />
            {commentError && <p className="mt-2 text-xs text-red-300">{commentError}</p>}
            <button
              type="submit"
              disabled={sending || name.trim().length < 2 || text.trim().length < 2}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              Post comment
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
