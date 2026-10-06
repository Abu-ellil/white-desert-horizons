import { useEffect, useMemo, useState } from "react";
import { Instagram, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { siteConfig } from "@/config/site";
import { galleryUrl } from "@/lib/gallery-url";

/**
 * Landing-page gallery preview — an Instagram-profile style strip: ONE row of
 * four square thumbnails plus a link into the full social page (/social).
 *
 * Deliberately tiny: the homepage must never carry the photo archive. Four
 * 640px thumbs (~40-90KB each, lazy) is the entire cost, whether the library
 * holds 10 photos or 10,000 — the server page-size cap forbids anything more,
 * and the full browsing experience lives on /social.
 */

type Post = {
  publicId: string;
  url: string;
  caption: string;
};

/** Four empty slots keep the grid shape before any photo exists. */
const PLACEHOLDER_SLOTS: Post[] = [0, 1, 2, 3].map((i) => ({
  publicId: `slot-${i}`,
  url: "",
  caption: "",
}));

export function SocialWall() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    let alive = true;
    import("@/lib/social-wall")
      .then(({ getWallFeed }) => getWallFeed({ data: { page: 1, pageSize: 4 } }))
      .then((res) => {
        if (alive) setPosts((res as unknown as { posts: Post[] }).posts ?? []);
      })
      .catch(() => {
        if (alive) setPosts([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  const display = useMemo<Post[]>(() => {
    if (posts && posts.length > 0) return posts.slice(0, 4);
    return PLACEHOLDER_SLOTS;
  }, [posts]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-hero-background py-24 text-hero-foreground sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="reveal flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker text-primary">From the desert</p>
            <h2 className="editorial-title mt-5 text-5xl sm:text-7xl">Posted by travelers.</h2>
          </div>
          <Link
            to="/social"
            className="group inline-flex items-center gap-3 self-start border border-primary/40 px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:self-auto"
          >
            <Instagram className="h-4 w-4" />
            Open the social page
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="reveal mt-12 grid grid-cols-2 gap-1 sm:grid-cols-4">
          {display.map((post) => (
            <Link
              key={post.publicId}
              to="/social"
              aria-label={post.caption || "Open the social page"}
              className="group relative aspect-square overflow-hidden bg-black/30"
            >
              {post.url ? (
                <img
                  src={galleryUrl(post.url, 640)}
                  alt={post.caption || "White Desert moment"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <span className="grid h-full w-full place-items-center text-[0.6rem] uppercase tracking-[0.2em] text-hero-foreground/25">
                  soon
                </span>
              )}
              <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-white" />
              </span>
            </Link>
          ))}
        </div>

        <p className="reveal mt-6 text-center text-[0.62rem] uppercase tracking-[0.14em] text-hero-foreground/35">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Instagram className="h-3 w-3" />
            {siteConfig.instagramUrl.split("/").filter(Boolean).pop()} on Instagram
          </a>
        </p>
      </div>
    </section>
  );
}
