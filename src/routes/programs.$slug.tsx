import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ProgramPage, programs } from "@/components/travel/ProgramPage";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/programs/$slug")({
  head: ({ params }) => {
    const program = programs.find((p) => p.slug === params.slug);
    const title = program
      ? `${program.titleEn} | ${siteConfig.name}`
      : `Program | ${siteConfig.name}`;
    const description = program?.subtitle ?? "Private Egypt desert tour program.";
    const url = `https://www.whitedeserthorizons.com/programs/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://www.whitedeserthorizons.com/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "https://www.whitedeserthorizons.com/og-image.jpg" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProgramRoute,
});

function ProgramRoute() {
  const { slug } = useParams({ from: "/programs/$slug" });
  const program = programs.find((p) => p.slug === slug);
  if (!program) {
    return (
      <main className="bg-background px-6 py-40 text-center">
        <h1 className="editorial-title text-5xl">Program not found.</h1>
        <a
          href="/"
          className="mt-8 inline-block text-sm uppercase tracking-[0.18em] text-primary underline"
        >
          Back to all journeys
        </a>
      </main>
    );
  }
  return <ProgramPage program={program} />;
}
