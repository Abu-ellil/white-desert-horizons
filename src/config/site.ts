export const siteConfig = {
  name: "WHITE DESERT HORIZONS",
  shortName: "WDH",
  location: "Egypt",
  email: "journeys@example.com",
  whatsappNumber: "201508731922",
  whatsappDisplay: "+20 150 873 1922",
  instagramUrl: "https://www.instagram.com/white_desert_horizons/",
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
