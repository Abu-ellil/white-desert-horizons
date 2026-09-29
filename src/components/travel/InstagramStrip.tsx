import { Instagram } from "lucide-react";

import heroImage from "@/assets/white-desert-hero.jpg";
import campImage from "@/assets/white-desert-camp.jpg";
import formsImage from "@/assets/white-desert-forms.jpg";
import contrastImage from "@/assets/black-white-desert.jpg";
import { siteConfig } from "@/config/site";

/**
 * "Follow on Instagram" strip above the footer. Instagram blocks anonymous
 * access to profile posts (login wall / 429), so a live feed embed is not
 * possible without an approved API app — this shows a hand-picked mosaic
 * that links to the profile instead.
 */

const IG_POSTS = [
  { src: formsImage, alt: "Sunlit mushroom-shaped limestone formations in Egypt's White Desert" },
  { src: campImage, alt: "Warm lanterns at a private White Desert night camp" },
  { src: heroImage, alt: "Expansive White Desert Egypt horizon at blue hour" },
  { src: contrastImage, alt: "Black Desert Egypt volcanic hills overlooking pale chalk terrain" },
] as const;

export function InstagramStrip() {
  return (
    <section id="instagram" className="bg-surface-warm px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">Follow the journey</p>
            <h2 className="editorial-title mt-5 text-5xl sm:text-6xl">
              Daily moments from the desert.
            </h2>
          </div>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start border border-line px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary sm:self-auto"
          >
            <Instagram className="h-3.5 w-3.5" />@
            {siteConfig.instagramUrl.split("/").filter(Boolean).pop()}
          </a>
        </div>
        <div className="reveal mt-12 grid grid-cols-2 gap-1 sm:grid-cols-4">
          {IG_POSTS.map((post) => (
            <a
              key={post.src}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View on Instagram: ${post.alt}`}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={post.src}
                alt={post.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-white" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
