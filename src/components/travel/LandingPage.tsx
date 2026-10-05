import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { trackEvent } from "@/lib/events";
import { analyticsAllowed } from "@/lib/consent";
import { faqs } from "@/components/travel/faq-content";
import { TrustStrip } from "@/components/travel/TrustStrip";
import { CookieConsent } from "@/components/travel/CookieConsent";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  X,
} from "lucide-react";

import heroImage from "@/assets/white-desert-hero.jpg";
import campImage from "@/assets/white-desert-camp.jpg";
import formsImage from "@/assets/white-desert-forms.jpg";
import contrastImage from "@/assets/black-white-desert.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { navigation, siteConfig } from "@/config/site";
import { getApprovedTestimonials, submitTestimonial } from "@/lib/testimonials";
import { getFeaturedPhotos, type FeaturedPhoto } from "@/lib/gallery";
import { Stars } from "@/components/travel/TestimonialStars";
import { InstagramStrip } from "@/components/travel/InstagramStrip";
import { SocialWall } from "@/components/travel/SocialWall";

const experienceLinks: Record<string, string> = {
  "White Desert Overnight": "/programs/white-desert-overnight",
  "White Desert Day Trip": "/programs/white-desert-overnight",
  "White + Black Desert Expedition": "/programs/bahariya-expedition",
  "Private Custom Journey": "/programs/fayoum-safari",
};

const experiences = [
  {
    number: "01",
    title: "White Desert Overnight",
    duration: "2 days · 1 night",
    description:
      "Cross the chalk wilderness at golden hour, dine by firelight, and sleep beneath an unbroken sky.",
    image: campImage,
    alt: "Private lantern-lit camp among White Desert limestone formations beneath the stars",
    featured: true,
  },
  {
    number: "02",
    title: "White Desert Day Trip",
    duration: "Full day",
    description:
      "A focused private journey through the White Desert's most remarkable formations and open horizons.",
    image: formsImage,
    alt: "Sunlit mushroom-shaped limestone formations in Egypt's White Desert",
    featured: false,
  },
  {
    number: "03",
    title: "White + Black Desert Expedition",
    duration: "3 days · 2 nights",
    description:
      "A deeper passage from volcanic ridges to the luminous chalk landscapes of the White Desert.",
    image: contrastImage,
    alt: "Dark volcanic ridges meeting pale formations between Egypt's Black and White Deserts",
    featured: false,
  },
  {
    number: "04",
    title: "Private Custom Journey",
    duration: "Tailored to you",
    description:
      "A considered Egypt desert safari shaped around your pace, interests, and time in the country.",
    image: heroImage,
    alt: "Wide White Desert landscape illuminated by the final light of day",
    featured: false,
  },
] as const;

const values = [
  ["Private & curated", "Your journey is shaped around your party, not a fixed crowd."],
  [
    "Local desert expertise",
    "Routes are guided by people who understand the terrain and its rhythms.",
  ],
  [
    "Flexible itineraries",
    "We adapt the pace and details to how you want to experience the desert.",
  ],
  [
    "Authentic experiences",
    "Quiet, landscape, firelight, and generous Egyptian hospitality remain at the center.",
  ],
] as const;

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="White Desert Horizons home"
      className={light ? "text-hero-foreground" : "text-foreground"}
    >
      <span className="block font-serif text-[1.15rem] font-medium leading-none sm:text-[1.28rem]">
        WHITE DESERT
      </span>
      <span className="mt-1 block text-[0.54rem] font-semibold uppercase tracking-[0.36em] text-primary">
        Horizons
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-hero-foreground/20 text-hero-foreground">
      <div className="mx-auto grid h-24 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-12">
        <Brand light />
        <div className="flex shrink-0 items-center gap-8">
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.67rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild variant="goldOutline" size="journey" className="hidden md:inline-flex">
            <a href="#plan">Book your journey</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-hero-foreground hover:bg-hero-foreground/10 hover:text-primary lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-line-dark bg-surface-dark px-5 py-6 text-surface-dark-foreground lg:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b border-line-dark py-4 font-serif text-2xl"
              >
                {item.label}
              </a>
            ))}
            <Button asChild variant="gold" size="journey" className="mt-6">
              <a href="#plan" onClick={close}>
                Book your journey
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92svh] overflow-hidden bg-hero-background text-hero-foreground"
    >
      <img
        src={heroImage}
        alt="White Desert Egypt limestone formations glowing at sunset"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="hero-kenburns absolute inset-0 h-full w-full object-cover object-[57%_center]"
      />
      <div className="cinematic-overlay absolute inset-0" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="hero-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <Header />
      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1440px] items-end px-5 pb-24 pt-40 sm:px-8 sm:pb-28 lg:px-12 lg:pb-24">
        <div className="max-w-4xl">
          <p
            className="hero-line mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary"
            style={{ animationDelay: "150ms" }}
          >
            White Desert · Egypt
          </p>
          <h1
            className="hero-line editorial-title text-[4.25rem] sm:text-8xl lg:text-[8.8rem]"
            style={{ animationDelay: "300ms" }}
          >
            Beyond the
            <br />
            <em className="font-normal">Horizon.</em>
          </h1>
          <div
            className="hero-line mt-7 flex max-w-2xl flex-col gap-7 border-l border-primary pl-5 sm:mt-9 sm:flex-row sm:items-end sm:justify-between sm:pl-7"
            style={{ animationDelay: "520ms" }}
          >
            <p className="max-w-md text-base leading-7 text-hero-foreground/80 sm:text-lg">
              Private journeys into Egypt’s White Desert—shaped by open horizons, sculpted chalk,
              and silence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" size="journey">
                <a href="#experiences">
                  Explore the White Desert <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="ivoryOutline" size="journey">
                <a href="#plan">Plan your journey</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#introduction"
        aria-label="Scroll to introduction"
        className="soft-pulse absolute bottom-6 right-6 z-10 grid h-11 w-11 place-items-center rounded-full border border-hero-foreground/40 text-hero-foreground sm:right-10"
      >
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
}

function Introduction() {
  return (
    <section id="introduction" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44">
      <div className="reveal mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="section-kicker">The signature journey</p>
          <span className="mt-10 block font-serif text-7xl text-primary/50">01</span>
        </div>
        <div>
          <h2 className="editorial-title max-w-4xl text-5xl sm:text-7xl lg:text-[6.2rem]">
            A different kind
            <br />
            of <em>desert.</em>
          </h2>
          <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 sm:gap-12">
            <p className="text-base leading-8 text-muted-foreground">
              The White Desert is our defining experience: a surreal expanse of chalk formations
              shaped by wind into forms that feel almost imagined.
            </p>
            <p className="text-base leading-8 text-muted-foreground">
              Here, sunset warms the limestone, stars overtake the sky, and Egypt reveals itself
              through openness, quiet, and time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section
      id="experiences"
      className="bg-surface-dark px-5 py-24 text-surface-dark-foreground sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="reveal flex flex-col justify-between gap-8 border-b border-line-dark pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">Choose your passage</p>
            <h2 className="editorial-title mt-5 text-5xl sm:text-7xl">Desert experiences</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-surface-dark-foreground/60">
            From a single luminous day to nights beneath the stars, every White Desert tour is
            privately considered.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {experiences.map((experience, index) => (
            <article
              key={experience.title}
              className={`reveal group relative min-h-[520px] overflow-hidden rounded-sm ${experience.featured ? "md:col-span-2 xl:col-span-1 xl:min-h-[610px]" : "xl:mt-16"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <img
                src={experience.image}
                alt={experience.alt}
                width={experience.featured ? 1440 : 1600}
                height={experience.featured ? 1808 : 1200}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="image-shade absolute inset-0" />
              {experience.featured && (
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                  Signature
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="mb-6 flex items-center justify-between border-b border-hero-foreground/30 pb-3 text-[0.63rem] uppercase tracking-[0.18em] text-hero-foreground/70">
                  <span>{experience.number}</span>
                  <span>{experience.duration}</span>
                </div>
                <h3 className="font-serif text-3xl leading-tight text-hero-foreground">
                  {experience.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-hero-foreground/70">
                  {experience.description}
                </p>
                <a
                  href={experienceLinks[experience.title] ?? "/programs"}
                  className="mt-6 inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary"
                >
                  Discover{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AfterSunset() {
  return (
    <section className="grid bg-surface-warm lg:grid-cols-2">
      <div className="relative min-h-[620px] lg:min-h-[820px]">
        <img
          src={campImage}
          alt="Lantern-lit White Desert camping beneath a star-filled Egyptian sky"
          width={1440}
          height={1808}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="reveal flex items-center px-6 py-24 sm:px-12 lg:px-20 xl:px-28">
        <div className="max-w-xl">
          <p className="section-kicker">Night in the wilderness</p>
          <h2 className="editorial-title mt-7 text-5xl sm:text-7xl">
            The White Desert,
            <br />
            <em>after sunset.</em>
          </h2>
          <p className="mt-10 text-lg leading-8 text-muted-foreground">
            As the last warmth leaves the limestone, the desert becomes quieter still. Firelight
            gathers the evening close; beyond it, the stars seem almost within reach.
          </p>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            White Desert camping is not about excess. It is about comfort placed carefully within a
            rare landscape—and the privilege of waking where the horizon has no edge.
          </p>
          <Button asChild variant="goldOutline" size="journey" className="mt-10">
            <a href="#plan">
              Enquire about camping <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1260px]">
        <div className="reveal grid gap-8 lg:grid-cols-2">
          <div>
            <p className="section-kicker">Our approach</p>
            <h2 className="editorial-title mt-6 text-5xl sm:text-7xl">
              Space to travel
              <br />
              <em>differently.</em>
            </h2>
          </div>
          <p className="max-w-md self-end text-base leading-8 text-muted-foreground">
            Thoughtful journeys need room to breathe. We keep the experience personal, adaptable,
            and grounded in the character of the desert.
          </p>
        </div>
        <div className="mt-16 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([title, body], index) => (
            <article
              key={title}
              className="reveal border-b border-border py-8 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0"
            >
              <span className="font-serif text-2xl text-primary">0{index + 1}</span>
              <h3 className="mt-8 font-serif text-2xl">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Gallery image with a like (heart) button → server fn → Telegram + Mongo. */
function GalleryImage({
  photo,
  src,
  alt,
  width,
  height,
  caption,
  className = "",
  initialCount,
}: {
  /** Cloudinary public_id — the ONLY likeable key. Null = fallback tile, no heart. */
  photo: string | null;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  className?: string;
  initialCount?: number | undefined;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState<number | null>(initialCount ?? null);
  const likeable = photo !== null;

  // A late-arriving batch count wins only if the visitor hasn't already liked
  // in this session (their +1 optimistic increment would otherwise be lost).
  useEffect(() => {
    if (initialCount !== undefined && !liked)
      setCount((c) => (c === null ? initialCount : Math.max(c, initialCount)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCount]);

  async function like() {
    if (!likeable || liked) return;
    const key = `wdh-liked-${photo}`;
    if (typeof localStorage !== "undefined" && localStorage.getItem(key)) return;
    setLiked(true);
    if (typeof localStorage !== "undefined") localStorage.setItem(key, "1");
    setCount((c) => (c ?? 0) + 1);
    try {
      const { likePhoto } = await import("@/lib/likes");
      const res = await likePhoto({ data: { photo } });
      if (res && typeof res === "object" && "count" in res && typeof res.count === "number")
        setCount(res.count);
    } catch {
      /* silent — like is best-effort */
    }
  }

  return (
    <figure className={`group relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
      />
      <figcaption className="absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground">
        {caption}
      </figcaption>
      {likeable && (
        <button
          type="button"
          onClick={like}
          aria-label={liked ? "Liked" : "Like this photo"}
          className={`absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.68rem] backdrop-blur-sm transition-all ${
            liked
              ? "border-red-400/60 bg-red-500/25 text-red-200"
              : "border-white/30 bg-black/30 text-white/90 hover:border-red-300/60 hover:text-red-200"
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
          {count !== null && count > 0 ? count : ""}
        </button>
      )}
    </figure>
  );
}

/** A slot in the 2×2 landing mosaic: source photo key + layout class. */
type MosaicSlot = {
  key: string;
  fallbackSrc: string;
  fallbackAlt: string;
  caption: string;
  className: string;
  width: number;
  height: number;
};

/** Fixed mosaic geometry — the 4 featured photos fill these slots in order. */
const MOSAIC: MosaicSlot[] = [
  {
    key: "forms",
    fallbackSrc: formsImage,
    fallbackAlt: "Golden sunrise across mushroom-shaped White Desert formations",
    caption: "Dawn · White Desert",
    className: "col-span-2 sm:row-span-2",
    width: 1600,
    height: 1200,
  },
  {
    key: "hero",
    fallbackSrc: heroImage,
    fallbackAlt: "Expansive White Desert Egypt horizon at blue hour",
    caption: "Last light",
    className: "sm:col-span-2",
    width: 1920,
    height: 1280,
  },
  {
    key: "camp",
    fallbackSrc: campImage,
    fallbackAlt: "Warm lanterns at a private White Desert night camp",
    caption: "Night camp",
    className: "",
    width: 1440,
    height: 1808,
  },
  {
    key: "contrast",
    fallbackSrc: contrastImage,
    fallbackAlt: "Black Desert Egypt volcanic hills overlooking pale chalk terrain",
    caption: "Black Desert edge",
    className: "",
    width: 1600,
    height: 1200,
  },
];

function Gallery() {
  // Hydrate real counts from photo_likes once on mount (decorative on failure).
  const [likes, setLikes] = useState<Record<string, number>>({});
  // Hand-picked photos from the studio; empty until you feature some.
  const [featured, setFeatured] = useState<FeaturedPhoto[] | null>(null);
  useEffect(() => {
    import("@/lib/gallery")
      .then(({ getFeaturedPhotos }) => getFeaturedPhotos())
      .then((rows) => setFeatured(rows ?? []))
      .catch(() => setFeatured([]));
    import("@/lib/likes")
      .then(({ getLandingLikes }) => getLandingLikes())
      .then((counts) => setLikes(counts ?? {}))
      .catch(() => {});
  }, []);

  // Featured photos fill the fixed slots in order; any shortfall falls back
  // to the built-in photo for that slot, so the layout never breaks.
  // Fallback tiles carry NO like key: likes live in one key space (Cloudinary
  // public_ids). A fake key (`forms`) would silently split the like counts —
  // likes on the fallback would never show on /gallery and vice versa.
  const slots = MOSAIC.map((slot, i) => {
    const pick = featured?.[i];
    if (!pick || !pick.url)
      return { ...slot, photo: null, src: slot.fallbackSrc, alt: slot.fallbackAlt };
    return {
      ...slot,
      photo: pick.publicId,
      src: pick.url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/"),
      alt: pick.title || slot.fallbackAlt,
      caption: pick.title || slot.caption,
    };
  });

  return (
    <section id="gallery" className="bg-surface-dark py-24 text-surface-dark-foreground sm:py-32">
      <div className="reveal mx-auto mb-12 flex max-w-[1440px] flex-col justify-between gap-7 px-5 sm:flex-row sm:items-end sm:px-8 lg:px-12">
        <div>
          <p className="section-kicker">Field notes</p>
          <h2 className="editorial-title mt-5 text-5xl sm:text-7xl">Light, form, silence.</h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-surface-dark-foreground/60">
          Fragments from the White Desert and its contrasting volcanic edge.
        </p>
      </div>
      <div className="grid h-[1150px] grid-cols-2 gap-1 sm:h-[900px] sm:grid-cols-4 sm:grid-rows-2">
        {slots.map((slot) => (
          <GalleryImage
            key={slot.key}
            photo={slot.photo}
            src={slot.src}
            alt={slot.alt}
            width={slot.width}
            height={slot.height}
            caption={slot.caption}
            className={slot.className}
            initialCount={slot.photo === null ? undefined : likes[slot.photo]}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 border border-surface-dark-foreground/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
        >
          See more <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

const fallbackTestimonials = [
  {
    quote:
      "The night sky over the White Desert is something I will never forget. Everything was private, calm, and perfectly arranged.",
    name: "Sarah M.",
    origin: "United Kingdom",
    trip: "White Desert Overnight",
    rating: 5,
  },
  {
    quote:
      "From Cairo to camp, every detail was handled. Sunrise over the chalk formations was worth every minute of the drive.",
    name: "Karim A.",
    origin: "Egypt",
    trip: "White + Black Desert Expedition",
    rating: 5,
  },
  {
    quote:
      "Quiet, vast, and beautifully organized. Our guide knew exactly where to be for the best light.",
    name: "Elena R.",
    origin: "Italy",
    trip: "Private Custom Journey",
    rating: 4,
  },
] as const;

type LiveTestimonial = {
  id: number;
  name: string;
  country: string | null;
  program: string | null;
  rating: number;
  quote: string;
};

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="text-primary transition-transform hover:scale-110"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-7 w-7 ${(hover || value) >= n ? "fill-current" : "fill-none stroke-current stroke-[1.5] opacity-40"}`}
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (rating < 1) {
      setStatus("error");
      setError("Please choose a star rating.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      await submitTestimonial({
        data: {
          name: String(form.get("name") ?? ""),
          country: String(form.get("country") ?? ""),
          program: String(form.get("program") ?? ""),
          rating,
          quote: String(form.get("quote") ?? ""),
        },
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="reveal mt-16 border border-primary/40 bg-primary/5 p-10 text-center">
        <p className="section-kicker">Thank you</p>
        <h3 className="editorial-title mt-4 text-3xl sm:text-4xl">
          Your review is <em>on its way.</em>
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
          It will appear here shortly, once we&apos;ve had a chance to read it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="reveal mt-16 border-t border-border pt-12">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="section-kicker">Share your experience</p>
          <h3 className="editorial-title mt-4 text-3xl sm:text-5xl">
            Traveled with us?
            <br />
            <em>Tell the story.</em>
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Your rating
          </span>
          <StarInput value={rating} onChange={setRating} />
        </div>
      </div>
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field label="Name" htmlFor="review-name">
          <Input
            id="review-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
          />
        </Field>
        <Field label="Country (optional)" htmlFor="review-country">
          <Input
            id="review-country"
            name="country"
            placeholder="e.g. Germany"
            className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
          />
        </Field>
        <Field label="Journey (optional)" htmlFor="review-program">
          <Select name="program">
            <SelectTrigger
              id="review-program"
              className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
            >
              <SelectValue placeholder="Which journey was it?" />
            </SelectTrigger>
            <SelectContent>
              {siteConfig.experiences.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Your review" htmlFor="review-quote">
            <Textarea
              id="review-quote"
              name="quote"
              required
              rows={4}
              minLength={10}
              maxLength={1000}
              placeholder="What did the desert feel like? What should other travelers know?"
              className="mt-2 rounded-sm"
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" variant="gold" size="journey" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Share your review"} <ArrowRight />
          </Button>
          {status === "error" && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Reviews are read by our team before appearing on this page — no account needed.
          </p>
        </div>
      </div>
    </form>
  );
}

function Testimonials() {
  const [live, setLive] = useState<LiveTestimonial[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    getApprovedTestimonials()
      .then((rows) => {
        if (!cancelled) setLive(rows as unknown as LiveTestimonial[]);
      })
      .catch(() => {
        if (!cancelled) setLive([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const items: {
    key: string;
    quote: string;
    name: string;
    origin: string;
    trip: string;
    rating: number;
  }[] =
    live && live.length > 0
      ? live.map((t) => ({
          key: `db-${t.id}`,
          quote: t.quote,
          name: t.name,
          origin: t.country ?? "",
          trip: t.program ?? "",
          rating: t.rating,
        }))
      : fallbackTestimonials.map((t) => ({
          key: `fb-${t.name}`,
          quote: t.quote,
          name: t.name,
          origin: t.origin,
          trip: t.trip,
          rating: t.rating,
        }));

  return (
    <section id="testimonials" className="bg-surface-warm px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1260px]">
        <div className="reveal flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">Traveler stories</p>
            <h2 className="editorial-title mt-5 text-5xl sm:text-7xl">
              Words from
              <br />
              <em>the desert.</em>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Notes from travelers who crossed the White Desert with us.
          </p>
        </div>
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.key} className="reveal flex flex-col bg-surface-warm p-8 sm:p-10">
              <div className="flex items-start justify-between">
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl leading-none text-primary/40"
                >
                  "
                </span>
                <Stars value={t.rating} />
              </div>
              <blockquote className="mt-6 flex-1 font-serif text-xl leading-8">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="mt-1 text-[0.63rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {[t.origin, t.trip].filter(Boolean).join(" · ")}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <ReviewForm />
      </div>
    </section>
  );
}

function PlanningForm() {
  const [experience, setExperience] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const date = String(form.get("date") ?? "");
    const travelers = String(form.get("travelers") ?? "");
    const message = String(form.get("message") ?? "");
    // Notify + persist booking request (fire-and-forget), then open WhatsApp.
    if (analyticsAllowed())
      trackEvent({ data: { kind: "form_submit", label: experience || "plan" } }).catch(() => {});
    try {
      const { recordBooking } = await import("@/lib/bookings");
      recordBooking({
        data: {
          name,
          email,
          whatsapp: String(form.get("whatsapp") ?? ""),
          experience,
          date,
          travelers,
          message,
        },
      }).catch(() => {});
    } catch {
      // never block the WhatsApp handoff
    }
    const waMessage = [
      `Hello ${siteConfig.name},`,
      "",
      "I would like to plan a desert journey.",
      `Name: ${name}`,
      `Email: ${email}`,
      `Preferred experience: ${experience || "Not selected"}`,
      `Travel date: ${date || "Flexible"}`,
      `Travelers: ${travelers}`,
      `Message: ${message}`,
    ].join("\n");
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(waMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }
  return (
    <section id="plan" className="bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto grid max-w-[1260px] gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div className="reveal">
          <p className="section-kicker">Begin a conversation</p>
          <h2 className="editorial-title mt-6 text-5xl sm:text-7xl">
            Plan your
            <br />
            <em>journey.</em>
          </h2>
          <p className="mt-8 max-w-md text-base leading-8 text-muted-foreground">
            Tell us how you imagine your time in Egypt. We’ll use your details to begin shaping a
            private White Desert itinerary.
          </p>
          <div className="mt-10 border-t border-border pt-8">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Prefer WhatsApp?
            </p>
            <Button asChild variant="goldOutline" size="journey" className="mt-4">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  if (analyticsAllowed())
                    trackEvent({
                      data: { kind: "whatsapp_click", label: "plan-direct" },
                    }).catch(() => {});
                }}
              >
                <MessageCircle /> {siteConfig.whatsappDisplay}
              </a>
            </Button>
          </div>
        </div>
        <form onSubmit={submit} className="reveal grid gap-x-6 gap-y-7 sm:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <Input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
            />
          </Field>
          <Field label="WhatsApp" htmlFor="whatsapp">
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              placeholder="Country code + number"
              className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
            />
          </Field>
          <Field label="Preferred experience" htmlFor="experience">
            <Select value={experience} onValueChange={setExperience} required>
              <SelectTrigger
                id="experience"
                className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
              >
                <SelectValue placeholder="Select a journey" />
              </SelectTrigger>
              <SelectContent>
                {siteConfig.experiences.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Travel date" htmlFor="date">
            <div className="relative">
              <Input
                id="date"
                name="date"
                type="date"
                className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
              />
              <CalendarDays className="pointer-events-none absolute right-0 top-4 h-4 w-4 text-muted-foreground" />
            </div>
          </Field>
          <Field label="Travelers" htmlFor="travelers">
            <Input
              id="travelers"
              name="travelers"
              type="number"
              min="1"
              max="20"
              required
              placeholder="2"
              className="h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Message" htmlFor="message">
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us what would make this journey yours..."
                className="mt-2 rounded-sm"
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" variant="gold" size="journey" className="w-full sm:w-auto">
              Start planning <ArrowRight />
            </Button>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Submitting opens WhatsApp with your inquiry ready to send. No details are stored on
              this website.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label
        htmlFor={htmlFor}
        className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="bg-surface-warm px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <div className="reveal">
          <p className="section-kicker">Before you travel</p>
          <h2 className="editorial-title mt-6 text-5xl sm:text-7xl">
            Questions,
            <br />
            <em>answered.</em>
          </h2>
        </div>
        <Accordion type="single" collapsible className="reveal border-t border-border">
          {faqs.map(([question, answer], index) => (
            <AccordionItem key={question} value={`item-${index}`}>
              <AccordionTrigger className="group py-6 text-left font-serif text-xl font-normal no-underline hover:no-underline sm:text-2xl [&>svg]:hidden">
                <span className="pr-6">{question}</span>
                <span className="relative h-5 w-5 shrink-0 text-primary">
                  <Plus className="absolute inset-0 h-5 w-5 group-data-[state=open]:hidden" />
                  <Minus className="absolute inset-0 hidden h-5 w-5 group-data-[state=open]:block" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-7 text-sm leading-7 text-muted-foreground sm:text-base">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative min-h-[680px] overflow-hidden bg-hero-background text-hero-foreground">
      <img
        src={heroImage}
        alt="White Desert formations extending toward the Egyptian horizon"
        width={1920}
        height={1280}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-hero-background/60" />
      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1260px] flex-col items-center justify-center px-5 py-24 text-center">
        <p className="section-kicker">White Desert Egypt</p>
        <h2 className="editorial-title mt-7 text-6xl sm:text-8xl lg:text-[8rem]">
          Your horizon
          <br />
          <em>is waiting.</em>
        </h2>
        <p className="mt-7 text-lg text-hero-foreground/75">
          Explore Egypt’s White Desert, privately.
        </p>
        <Button asChild variant="gold" size="journey" className="mt-9">
          <a href="#plan">
            Plan your journey <ArrowRight />
          </a>
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-dark px-5 pb-24 pt-16 text-surface-dark-foreground sm:px-8 sm:pb-10 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 border-b border-line-dark pb-12 sm:grid-cols-3">
          <Brand light />
          <div>
            <p className="section-kicker">Explore</p>
            <div className="mt-5 flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-surface-dark-foreground/65 transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="section-kicker">Find us</p>
            <p className="mt-5 text-sm text-surface-dark-foreground/65">Egypt</p>
            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-line-dark hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.facebookUrl}
                aria-label="Social placeholder"
                className="grid h-9 w-9 place-items-center rounded-full border border-line-dark text-xs font-bold hover:border-primary hover:text-primary"
              >
                f
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-7 text-[0.62rem] uppercase tracking-[0.14em] text-surface-dark-foreground/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Private desert journeys · Egypt</p>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  useReveal();
  return (
    <>
      <main>
        <Hero />
        <Introduction />
        <TrustStrip />
        <Experiences />
        <AfterSunset />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <SocialWall />
        <PlanningForm />
        <FAQ />
        <FinalCTA />
      </main>
      <InstagramStrip />
      <Footer />
      <CookieConsent />
      <Button
        asChild
        variant="gold"
        size="journey"
        className="fixed inset-x-4 bottom-4 z-40 shadow-lg md:hidden"
      >
        <a
          href="#plan"
          onClick={() => {
            if (analyticsAllowed())
              trackEvent({ data: { kind: "whatsapp_click", label: "mobile-bar" } }).catch(() => {});
          }}
        >
          <MessageCircle /> Plan your journey
        </a>
      </Button>
    </>
  );
}
