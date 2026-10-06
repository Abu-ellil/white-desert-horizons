import { createFileRoute } from "@tanstack/react-router";

import { SocialFeed } from "@/components/travel/SocialFeed";

/**
 * The full social experience — Instagram-shaped feed of traveler and owner
 * photos with likes, comments, share and visitor submissions. The homepage
 * strip links here; this page paginates server-side so the archive can grow
 * to thousands of photos without slowing anything down.
 */

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Social | WHITE DESERT HORIZONS" },
      {
        name: "description",
        content:
          "The traveler wall — photos from the White Desert community, liked and commented in real time.",
      },
      { property: "og:title", content: "Social | WHITE DESERT HORIZONS" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.whitedeserthorizons.com/social" },
    ],
    links: [{ rel: "canonical", href: "https://www.whitedeserthorizons.com/social" }],
  }),
  component: SocialFeed,
});
