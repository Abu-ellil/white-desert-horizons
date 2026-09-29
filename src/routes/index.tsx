import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/travel/LandingPage";
import { faqs } from "@/components/travel/faq-content";
import { siteConfig } from "@/config/site";

const ORIGIN = "https://www.whitedeserthorizons.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "White Desert Egypt Tours | WHITE DESERT HORIZONS" },
      {
        name: "description",
        content:
          "Private White Desert Egypt tours, overnight camping and custom journeys through the White and Black Deserts.",
      },
      { property: "og:title", content: "White Desert Egypt Tours | WHITE DESERT HORIZONS" },
      {
        property: "og:description",
        content:
          "Private journeys into Egypt's White Desert, from sunset camping to tailored expeditions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "https://www.whitedeserthorizons.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.whitedeserthorizons.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: siteConfig.name,
          description:
            "Boutique private travel agency specializing in White Desert Egypt journeys and camping experiences.",
          areaServed: {
            "@type": "Country",
            name: "Egypt",
          },
          knowsAbout: [
            "White Desert Egypt",
            "White Desert tours",
            "White Desert camping",
            "Black Desert Egypt",
            "Egypt desert safari",
          ],
          email: siteConfig.email,
          telephone: siteConfig.whatsappDisplay,
          address: {
            "@type": "PostalAddress",
            addressCountry: "EG",
            addressLocality: "[BUSINESS CITY TO BE CONFIRMED]",
          },
          url: "/",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
