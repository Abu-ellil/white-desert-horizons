import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { programs } from "@/components/travel/ProgramPage";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: `Official Tour Programs | ${siteConfig.name}` },
      {
        name: "description",
        content:
          "All official private programs: White Desert Overnight, Bahariya & White Desert Expedition, Siwa Oasis and Fayoum Desert Safari.",
      },
      { property: "og:title", content: `Official Tour Programs | ${siteConfig.name}` },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.whitedeserthorizons.com/programs" },
      { property: "og:image", content: "https://www.whitedeserthorizons.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.whitedeserthorizons.com/programs" }],
  }),
  component: ProgramsIndex,
});

function ProgramsIndex() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const rtl = lang === "ar";
  return (
    <main
      className="bg-background px-5 pb-24 pt-32 sm:px-8 sm:pt-40 lg:px-12"
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1260px]">
        <div className="flex items-center justify-between">
          <p className="section-kicker">{rtl ? "البرامج الرسمية" : "Official tour programs"}</p>
          <div
            className="inline-flex overflow-hidden rounded-full border border-border"
            role="group"
            aria-label="Language / اللغة"
          >
            {(["en", "ar"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-primary"
                }`}
              >
                {l === "en" ? "EN" : "عربي"}
              </button>
            ))}
          </div>
        </div>
        <h1 className="editorial-title mt-5 text-5xl sm:text-7xl">
          {rtl ? (
            <>
              الـ <em>برامج.</em>
            </>
          ) : (
            <>
              The <em>programs.</em>
            </>
          )}
        </h1>
        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
          {programs.map((program) => (
            <a
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group bg-background p-8 transition-colors hover:bg-surface-warm/60"
            >
              <div className="flex items-baseline justify-between border-b border-border pb-4 text-[0.63rem] uppercase tracking-[0.18em] text-muted-foreground">
                <span>{program.number}</span>
                <span>{program.duration}</span>
              </div>
              <h2 className="mt-6 font-serif text-3xl">
                {rtl ? program.titleAr : program.titleEn}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{program.subtitle}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
