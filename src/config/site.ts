export const siteConfig = {
  name: "WHITE DESERT HORIZONS",
  shortName: "WDH",
  location: "Egypt",
  email: "journeys@example.com",
  whatsappNumber: "201000000000",
  whatsappDisplay: "+20 100 000 0000",
  instagramUrl: "#",
  facebookUrl: "#",
  experiences: [
    "White Desert Overnight",
    "White Desert Day Trip",
    "White + Black Desert Expedition",
    "Private Custom Journey",
  ],
} as const;

export const navigation = [
  { label: "Experiences", href: "/#experiences" },
  { label: "Programs", href: "/programs" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Gallery", href: "/#gallery" },
  { label: "FAQ", href: "/#faq" },
] as const;
