import { o as __toESM } from "../_runtime.mjs";
import {
  a as Trigger2,
  i as Root2,
  n as Header$1,
  r as Item,
  t as Content2,
  v as require_jsx_runtime,
} from "../_libs/@radix-ui/react-accordion+[...].mjs";
import {
  o as submitTestimonial,
  r as getApprovedTestimonials,
  t as Stars,
} from "./TestimonialStars-DpiDiJig.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import {
  a as Plus,
  c as Menu,
  d as ChevronDown,
  f as Check,
  g as ArrowDown,
  l as Instagram,
  m as ArrowRight,
  o as Minus,
  p as CalendarDays,
  s as MessageCircle,
  t as X,
  u as ChevronUp,
} from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as siteConfig, n as cn, r as navigation, t as Button } from "./button-DhT6g4Hn.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import {
  a as SelectItemIndicator,
  c as SelectPortal,
  d as SelectSeparator$1,
  f as SelectTrigger$1,
  i as SelectItem$1,
  l as SelectScrollDownButton$1,
  m as SelectViewport,
  n as SelectContent$1,
  o as SelectItemText,
  p as SelectValue$1,
  r as SelectIcon,
  s as SelectLabel$1,
  t as Select$1,
  u as SelectScrollUpButton$1,
} from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-qCTq8LtJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var white_desert_hero_default = "/assets/white-desert-hero-DBaZIc2U.jpg";
var white_desert_camp_default = "/assets/white-desert-camp-BxTq80wx.jpg";
var white_desert_forms_default = "/assets/white-desert-forms-DySxsymw.jpg";
var black_white_desert_default = "/assets/black-white-desert-EpEJZ9sb.jpg";
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
    ref,
    className: cn("border-b", className),
    ...props,
  }),
);
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$1, {
    className: "flex",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
      ref,
      className: cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className,
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
          className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
        }),
      ],
    }),
  }),
);
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
    ref,
    className:
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      className: cn("pb-4 pt-0", className),
      children,
    }),
  }),
);
AccordionContent.displayName = Content2.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
    type,
    className: cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    ),
    ref,
    ...props,
  });
});
Input.displayName = "Input";
var labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);
var Label = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
    ref,
    className: cn(labelVariants(), className),
    ...props,
  }),
);
Label.displayName = Root.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
        asChild: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
          className: "h-4 w-4 opacity-50",
        }),
      }),
    ],
  }),
);
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" }),
  }),
);
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" }),
  }),
);
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(
  ({ className, children, position = "popper", ...props }, ref) =>
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
        ref,
        className: cn(
          "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        ),
        position,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
            className: cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
            ),
            children,
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {}),
        ],
      }),
    }),
);
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props,
  }),
);
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children }),
    ],
  }),
);
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props,
  }),
);
SelectSeparator.displayName = SelectSeparator$1.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
    className: cn(
      "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    ),
    ref,
    ...props,
  });
});
Textarea.displayName = "Textarea";
var experienceLinks = {
  "White Desert Overnight": "/programs/white-desert-overnight",
  "White Desert Day Trip": "/programs/white-desert-overnight",
  "White + Black Desert Expedition": "/programs/bahariya-expedition",
  "Private Custom Journey": "/programs/fayoum-safari",
};
var experiences = [
  {
    number: "01",
    title: "White Desert Overnight",
    duration: "2 days · 1 night",
    description:
      "Cross the chalk wilderness at golden hour, dine by firelight, and sleep beneath an unbroken sky.",
    image: white_desert_camp_default,
    alt: "Private lantern-lit camp among White Desert limestone formations beneath the stars",
    featured: true,
  },
  {
    number: "02",
    title: "White Desert Day Trip",
    duration: "Full day",
    description:
      "A focused private journey through the White Desert's most remarkable formations and open horizons.",
    image: white_desert_forms_default,
    alt: "Sunlit mushroom-shaped limestone formations in Egypt's White Desert",
    featured: false,
  },
  {
    number: "03",
    title: "White + Black Desert Expedition",
    duration: "3 days · 2 nights",
    description:
      "A deeper passage from volcanic ridges to the luminous chalk landscapes of the White Desert.",
    image: black_white_desert_default,
    alt: "Dark volcanic ridges meeting pale formations between Egypt's Black and White Deserts",
    featured: false,
  },
  {
    number: "04",
    title: "Private Custom Journey",
    duration: "Tailored to you",
    description:
      "A considered Egypt desert safari shaped around your pace, interests, and time in the country.",
    image: white_desert_hero_default,
    alt: "Wide White Desert landscape illuminated by the final light of day",
    featured: false,
  },
];
var values = [
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
];
var faqs = [
  [
    "How do I reach the White Desert from Cairo?",
    "Most journeys begin with a road transfer from Cairo to Bahariya Oasis, the gateway to the protected White Desert landscape. We coordinate the journey details around your arrival and preferred itinerary.",
  ],
  [
    "What is the best season for White Desert Egypt?",
    "October through April generally brings the most comfortable daytime temperatures and cool desert nights. Winter evenings can be cold, so warm layers are important.",
  ],
  [
    "What is included in a White Desert tour?",
    "Inclusions depend on the itinerary, but private transport in the desert, meals, water, camping equipment, and local guidance can all be arranged. Your proposal will list every inclusion clearly.",
  ],
  [
    "What is overnight camping like?",
    "White Desert camping is simple, comfortable, and deeply atmospheric. After dinner by the fire, the camp settles into silence beneath a remarkably clear night sky. We share a practical packing list before departure.",
  ],
  [
    "Are journeys private or group tours?",
    "Our focus is private journeys. This gives you a quieter experience, a flexible pace, and more freedom to spend time where the landscape moves you.",
  ],
  [
    "Can I add the Black Desert to my journey?",
    "Yes. Black Desert Egypt makes a striking counterpoint to the White Desert and works naturally within a longer expedition. We can also include selected Bahariya landscapes without shifting focus from the White Desert.",
  ],
];
function useReveal() {
  (0, import_react.useEffect)(() => {
    const nodes = document.querySelectorAll(".reveal");
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
function Brand({ light = false }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
    href: "#top",
    "aria-label": "White Desert Horizons home",
    className: light ? "text-hero-foreground" : "text-foreground",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: "block font-serif text-[1.15rem] font-medium leading-none sm:text-[1.28rem]",
        children: "WHITE DESERT",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className:
          "mt-1 block text-[0.54rem] font-semibold uppercase tracking-[0.36em] text-primary",
        children: "Horizons",
      }),
    ],
  });
}
function Header() {
  const [open, setOpen] = (0, import_react.useState)(false);
  const close = () => setOpen(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
    className:
      "absolute inset-x-0 top-0 z-50 border-b border-hero-foreground/20 text-hero-foreground",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className:
          "mx-auto grid h-24 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-12",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { light: true }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex shrink-0 items-center gap-8",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
                "aria-label": "Primary navigation",
                className: "hidden items-center gap-8 lg:flex",
                children: navigation.map((item) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "a",
                    {
                      href: item.href,
                      className:
                        "text-[0.67rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-primary",
                      children: item.label,
                    },
                    item.href,
                  ),
                ),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                asChild: true,
                variant: "goldOutline",
                size: "journey",
                className: "hidden md:inline-flex",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                  href: "#plan",
                  children: "Book your journey",
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                variant: "ghost",
                size: "icon",
                className:
                  "text-hero-foreground hover:bg-hero-foreground/10 hover:text-primary lg:hidden",
                onClick: () => setOpen((value) => !value),
                "aria-expanded": open,
                "aria-controls": "mobile-menu",
                "aria-label": open ? "Close menu" : "Open menu",
                children: open
                  ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
                  : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {}),
              }),
            ],
          }),
        ],
      }),
      open &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
          id: "mobile-menu",
          "aria-label": "Mobile navigation",
          className:
            "border-t border-line-dark bg-surface-dark px-5 py-6 text-surface-dark-foreground lg:hidden",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "mx-auto flex max-w-[1440px] flex-col",
            children: [
              navigation.map((item) =>
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "a",
                  {
                    href: item.href,
                    onClick: close,
                    className: "border-b border-line-dark py-4 font-serif text-2xl",
                    children: item.label,
                  },
                  item.href,
                ),
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                asChild: true,
                variant: "gold",
                size: "journey",
                className: "mt-6",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                  href: "#plan",
                  onClick: close,
                  children: "Book your journey",
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function Hero() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
    id: "top",
    className: "relative min-h-[92svh] overflow-hidden bg-hero-background text-hero-foreground",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
        src: white_desert_hero_default,
        alt: "White Desert Egypt limestone formations glowing at sunset",
        width: 1920,
        height: 1280,
        fetchPriority: "high",
        className: "absolute inset-0 h-full w-full object-cover object-[57%_center]",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "cinematic-overlay absolute inset-0",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className:
          "relative z-10 mx-auto flex min-h-[92svh] max-w-[1440px] items-end px-5 pb-24 pt-40 sm:px-8 sm:pb-28 lg:px-12 lg:pb-24",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "max-w-4xl",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className:
                "mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary",
              children: "White Desert · Egypt",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
              className: "editorial-title text-[4.25rem] sm:text-8xl lg:text-[8.8rem]",
              children: [
                "Beyond the",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
                  className: "font-normal",
                  children: "Horizon.",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className:
                "mt-7 flex max-w-2xl flex-col gap-7 border-l border-primary pl-5 sm:mt-9 sm:flex-row sm:items-end sm:justify-between sm:pl-7",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "max-w-md text-base leading-7 text-hero-foreground/80 sm:text-lg",
                  children:
                    "Private journeys into Egypt’s White Desert—shaped by open horizons, sculpted chalk, and silence.",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-wrap gap-3",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                      asChild: true,
                      variant: "gold",
                      size: "journey",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
                        href: "#experiences",
                        children: [
                          "Explore the White Desert ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {}),
                        ],
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                      asChild: true,
                      variant: "ivoryOutline",
                      size: "journey",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                        href: "#plan",
                        children: "Plan your journey",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
        href: "#introduction",
        "aria-label": "Scroll to introduction",
        className:
          "soft-pulse absolute bottom-6 right-6 z-10 grid h-11 w-11 place-items-center rounded-full border border-hero-foreground/40 text-hero-foreground sm:right-10",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-4 w-4" }),
      }),
    ],
  });
}
function Introduction() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
    id: "introduction",
    className: "px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "reveal mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "section-kicker",
              children: "The signature journey",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              className: "mt-10 block font-serif text-7xl text-primary/50",
              children: "01",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
              className: "editorial-title max-w-4xl text-5xl sm:text-7xl lg:text-[6.2rem]",
              children: [
                "A different kind",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                "of ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "desert." }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 sm:gap-12",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-base leading-8 text-muted-foreground",
                  children:
                    "The White Desert is our defining experience: a surreal expanse of chalk formations shaped by wind into forms that feel almost imagined.",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-base leading-8 text-muted-foreground",
                  children:
                    "Here, sunset warms the limestone, stars overtake the sky, and Egypt reveals itself through openness, quiet, and time.",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Experiences() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
    id: "experiences",
    className: "bg-surface-dark px-5 py-24 text-surface-dark-foreground sm:px-8 sm:py-32 lg:px-12",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto max-w-[1440px]",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className:
            "reveal flex flex-col justify-between gap-8 border-b border-line-dark pb-10 sm:flex-row sm:items-end",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "section-kicker",
                  children: "Choose your passage",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                  className: "editorial-title mt-5 text-5xl sm:text-7xl",
                  children: "Desert experiences",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "max-w-md text-sm leading-7 text-surface-dark-foreground/60",
              children:
                "From a single luminous day to nights beneath the stars, every White Desert tour is privately considered.",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4",
          children: experiences.map((experience, index) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "article",
              {
                className: `reveal group relative min-h-[520px] overflow-hidden rounded-sm ${experience.featured ? "md:col-span-2 xl:col-span-1 xl:min-h-[610px]" : "xl:mt-16"}`,
                style: { transitionDelay: `${index * 80}ms` },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                    src: experience.image,
                    alt: experience.alt,
                    width: experience.featured ? 1440 : 1600,
                    height: experience.featured ? 1808 : 1200,
                    loading: "lazy",
                    className:
                      "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "image-shade absolute inset-0",
                  }),
                  experience.featured &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className:
                        "absolute right-4 top-4 rounded-full bg-primary px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary-foreground",
                      children: "Signature",
                    }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "absolute inset-x-0 bottom-0 p-6 sm:p-7",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "mb-6 flex items-center justify-between border-b border-hero-foreground/30 pb-3 text-[0.63rem] uppercase tracking-[0.18em] text-hero-foreground/70",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: experience.number,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: experience.duration,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                        className: "font-serif text-3xl leading-tight text-hero-foreground",
                        children: experience.title,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className: "mt-3 text-sm leading-6 text-hero-foreground/70",
                        children: experience.description,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
                        href: experienceLinks[experience.title] ?? "/programs",
                        className:
                          "mt-6 inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary",
                        children: [
                          "Discover ",
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                            className: "h-4 w-4 transition-transform group-hover:translate-x-1",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              experience.title,
            ),
          ),
        }),
      ],
    }),
  });
}
function AfterSunset() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
    className: "grid bg-surface-warm lg:grid-cols-2",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "relative min-h-[620px] lg:min-h-[820px]",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
          src: white_desert_camp_default,
          alt: "Lantern-lit White Desert camping beneath a star-filled Egyptian sky",
          width: 1440,
          height: 1808,
          loading: "lazy",
          className: "absolute inset-0 h-full w-full object-cover",
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "reveal flex items-center px-6 py-24 sm:px-12 lg:px-20 xl:px-28",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "max-w-xl",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "section-kicker",
              children: "Night in the wilderness",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
              className: "editorial-title mt-7 text-5xl sm:text-7xl",
              children: [
                "The White Desert,",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "after sunset." }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-10 text-lg leading-8 text-muted-foreground",
              children:
                "As the last warmth leaves the limestone, the desert becomes quieter still. Firelight gathers the evening close; beyond it, the stars seem almost within reach.",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-6 text-base leading-8 text-muted-foreground",
              children:
                "White Desert camping is not about excess. It is about comfort placed carefully within a rare landscape—and the privilege of waking where the horizon has no edge.",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
              asChild: true,
              variant: "goldOutline",
              size: "journey",
              className: "mt-10",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
                href: "#plan",
                children: [
                  "Enquire about camping ",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {}),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
function WhyUs() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
    id: "why-us",
    className: "px-5 py-24 sm:px-8 sm:py-32 lg:px-12",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto max-w-[1260px]",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "reveal grid gap-8 lg:grid-cols-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "section-kicker",
                  children: "Our approach",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
                  className: "editorial-title mt-6 text-5xl sm:text-7xl",
                  children: [
                    "Space to travel",
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "differently." }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "max-w-md self-end text-base leading-8 text-muted-foreground",
              children:
                "Thoughtful journeys need room to breathe. We keep the experience personal, adaptable, and grounded in the character of the desert.",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "mt-16 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4",
          children: values.map(([title, body], index) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "article",
              {
                className:
                  "reveal border-b border-border py-8 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                    className: "font-serif text-2xl text-primary",
                    children: ["0", index + 1],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                    className: "mt-8 font-serif text-2xl",
                    children: title,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                    className: "mt-4 text-sm leading-7 text-muted-foreground",
                    children: body,
                  }),
                ],
              },
              title,
            ),
          ),
        }),
      ],
    }),
  });
}
function Gallery() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
    id: "gallery",
    className: "bg-surface-dark py-24 text-surface-dark-foreground sm:py-32",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className:
          "reveal mx-auto mb-12 flex max-w-[1440px] flex-col justify-between gap-7 px-5 sm:flex-row sm:items-end sm:px-8 lg:px-12",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "section-kicker",
                children: "Field notes",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                className: "editorial-title mt-5 text-5xl sm:text-7xl",
                children: "Light, form, silence.",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            className: "max-w-sm text-sm leading-7 text-surface-dark-foreground/60",
            children: "Fragments from the White Desert and its contrasting volcanic edge.",
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "grid h-[1150px] grid-cols-2 gap-1 sm:h-[900px] sm:grid-cols-4 sm:grid-rows-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
            className: "relative col-span-2 overflow-hidden sm:row-span-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                src: white_desert_forms_default,
                alt: "Golden sunrise across mushroom-shaped White Desert formations",
                width: 1600,
                height: 1200,
                loading: "lazy",
                className:
                  "h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
                className:
                  "absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground",
                children: "Dawn · White Desert",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
            className: "relative overflow-hidden sm:col-span-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                src: white_desert_hero_default,
                alt: "Expansive White Desert Egypt horizon at blue hour",
                width: 1920,
                height: 1280,
                loading: "lazy",
                className:
                  "h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
                className:
                  "absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground",
                children: "Last light",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
            className: "relative overflow-hidden",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                src: white_desert_camp_default,
                alt: "Warm lanterns at a private White Desert night camp",
                width: 1440,
                height: 1808,
                loading: "lazy",
                className:
                  "h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
                className:
                  "absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground",
                children: "Night camp",
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
            className: "relative overflow-hidden",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                src: black_white_desert_default,
                alt: "Black Desert Egypt volcanic hills overlooking pale chalk terrain",
                width: 1600,
                height: 1200,
                loading: "lazy",
                className:
                  "h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
                className:
                  "absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground",
                children: "Black Desert edge",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var fallbackTestimonials = [
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
];
function StarInput({ value, onChange }) {
  const [hover, setHover] = (0, import_react.useState)(0);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "flex gap-1",
    role: "radiogroup",
    "aria-label": "Your rating",
    children: [1, 2, 3, 4, 5].map((n) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": value === n,
          "aria-label": `${n} star${n > 1 ? "s" : ""}`,
          onClick: () => onChange(n),
          onMouseEnter: () => setHover(n),
          onMouseLeave: () => setHover(0),
          className: "text-primary transition-transform hover:scale-110",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
            viewBox: "0 0 24 24",
            className: `h-7 w-7 ${(hover || value) >= n ? "fill-current" : "fill-none stroke-current stroke-[1.5] opacity-40"}`,
            "aria-hidden": "true",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
              d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
            }),
          }),
        },
        n,
      ),
    ),
  });
}
function ReviewForm() {
  const [rating, setRating] = (0, import_react.useState)(0);
  const [status, setStatus] = (0, import_react.useState)("idle");
  const [error, setError] = (0, import_react.useState)("");
  async function submit(event) {
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
  if (status === "success")
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "reveal mt-16 border border-primary/40 bg-primary/5 p-10 text-center",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "section-kicker",
          children: "Thank you",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
          className: "editorial-title mt-4 text-3xl sm:text-4xl",
          children: [
            "Your review is ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "on its way." }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground",
          children: "It will appear here shortly, once we've had a chance to read it.",
        }),
      ],
    });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
    onSubmit: submit,
    className: "reveal mt-16 border-t border-border pt-12",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "section-kicker",
                children: "Share your experience",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
                className: "editorial-title mt-4 text-3xl sm:text-5xl",
                children: [
                  "Traveled with us?",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
                    children: "Tell the story.",
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex items-center gap-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                className:
                  "text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
                children: "Your rating",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarInput, {
                value: rating,
                onChange: setRating,
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "grid gap-x-6 gap-y-7 sm:grid-cols-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
            label: "Name",
            htmlFor: "review-name",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
              id: "review-name",
              name: "name",
              required: true,
              autoComplete: "name",
              placeholder: "Your name",
              className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
            label: "Country (optional)",
            htmlFor: "review-country",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
              id: "review-country",
              name: "country",
              placeholder: "e.g. Germany",
              className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
            label: "Journey (optional)",
            htmlFor: "review-program",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
              name: "program",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                  id: "review-program",
                  className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                    placeholder: "Which journey was it?",
                  }),
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                  children: siteConfig.experiences.map((item) =>
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      SelectItem,
                      {
                        value: item,
                        children: item,
                      },
                      item,
                    ),
                  ),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "sm:col-span-2",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
              label: "Your review",
              htmlFor: "review-quote",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                id: "review-quote",
                name: "quote",
                required: true,
                rows: 4,
                minLength: 10,
                maxLength: 1e3,
                placeholder: "What did the desert feel like? What should other travelers know?",
                className: "mt-2 rounded-sm",
              }),
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "sm:col-span-2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                type: "submit",
                variant: "gold",
                size: "journey",
                disabled: status === "submitting",
                children: [
                  status === "submitting" ? "Sending…" : "Share your review",
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {}),
                ],
              }),
              status === "error" &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "mt-4 text-sm text-red-600",
                  role: "alert",
                  children: error,
                }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className: "mt-4 text-xs leading-5 text-muted-foreground",
                children:
                  "Reviews are read by our team before appearing on this page — no account needed.",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Testimonials() {
  const [live, setLive] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    let cancelled = false;
    getApprovedTestimonials()
      .then((rows) => {
        if (!cancelled) setLive(rows);
      })
      .catch(() => {
        if (!cancelled) setLive([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const items =
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
    id: "testimonials",
    className: "bg-surface-warm px-5 py-24 sm:px-8 sm:py-32 lg:px-12",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto max-w-[1260px]",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "reveal flex flex-col justify-between gap-8 sm:flex-row sm:items-end",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "section-kicker",
                  children: "Traveler stories",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
                  className: "editorial-title mt-5 text-5xl sm:text-7xl",
                  children: [
                    "Words from",
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "the desert." }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "max-w-md text-sm leading-7 text-muted-foreground",
              children: "Notes from travelers who crossed the White Desert with us.",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "mt-14 grid gap-px border border-border bg-border md:grid-cols-3",
          children: items.map((t) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "figure",
              {
                className: "reveal flex flex-col bg-surface-warm p-8 sm:p-10",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "flex items-start justify-between",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        "aria-hidden": "true",
                        className: "font-serif text-5xl leading-none text-primary/40",
                        children: '"',
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: t.rating }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
                    className: "mt-6 flex-1 font-serif text-xl leading-8",
                    children: t.quote,
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
                    className: "mt-8 border-t border-border pt-5",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className: "text-sm font-semibold",
                        children: t.name,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className:
                          "mt-1 text-[0.63rem] uppercase tracking-[0.18em] text-muted-foreground",
                        children: [t.origin, t.trip].filter(Boolean).join(" · "),
                      }),
                    ],
                  }),
                ],
              },
              t.key,
            ),
          ),
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewForm, {}),
      ],
    }),
  });
}
function PlanningForm() {
  const [experience, setExperience] = (0, import_react.useState)("");
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      `Hello ${siteConfig.name},`,
      "",
      "I would like to plan a desert journey.",
      `Name: ${form.get("name") ?? ""}`,
      `Email: ${form.get("email") ?? ""}`,
      `Preferred experience: ${experience || "Not selected"}`,
      `Travel date: ${form.get("date") ?? "Flexible"}`,
      `Travelers: ${form.get("travelers") ?? ""}`,
      `Message: ${form.get("message") ?? ""}`,
    ].join("\n");
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
    id: "plan",
    className: "bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto grid max-w-[1260px] gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "reveal",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "section-kicker",
              children: "Begin a conversation",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
              className: "editorial-title mt-6 text-5xl sm:text-7xl",
              children: [
                "Plan your",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "journey." }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "mt-8 max-w-md text-base leading-8 text-muted-foreground",
              children:
                "Tell us how you imagine your time in Egypt. We’ll use your details to begin shaping a private White Desert itinerary.",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "mt-10 border-t border-border pt-8",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className:
                    "text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
                  children: "Prefer WhatsApp?",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                  asChild: true,
                  variant: "goldOutline",
                  size: "journey",
                  className: "mt-4",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
                    href: `https://wa.me/${siteConfig.whatsappNumber}`,
                    target: "_blank",
                    rel: "noreferrer",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}),
                      " ",
                      siteConfig.whatsappDisplay,
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
          onSubmit: submit,
          className: "reveal grid gap-x-6 gap-y-7 sm:grid-cols-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
              label: "Name",
              htmlFor: "name",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                id: "name",
                name: "name",
                required: true,
                autoComplete: "name",
                placeholder: "Your name",
                className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
              label: "Email",
              htmlFor: "email",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                id: "email",
                name: "email",
                type: "email",
                required: true,
                autoComplete: "email",
                placeholder: "you@example.com",
                className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
              label: "WhatsApp",
              htmlFor: "whatsapp",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                id: "whatsapp",
                name: "whatsapp",
                type: "tel",
                autoComplete: "tel",
                placeholder: "Country code + number",
                className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
              label: "Preferred experience",
              htmlFor: "experience",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
                value: experience,
                onValueChange: setExperience,
                required: true,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
                    id: "experience",
                    className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {
                      placeholder: "Select a journey",
                    }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
                    children: siteConfig.experiences.map((item) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        SelectItem,
                        {
                          value: item,
                          children: item,
                        },
                        item,
                      ),
                    ),
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
              label: "Travel date",
              htmlFor: "date",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "relative",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                    id: "date",
                    name: "date",
                    type: "date",
                    className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
                    className:
                      "pointer-events-none absolute right-0 top-4 h-4 w-4 text-muted-foreground",
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
              label: "Travelers",
              htmlFor: "travelers",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
                id: "travelers",
                name: "travelers",
                type: "number",
                min: "1",
                max: "20",
                required: true,
                placeholder: "2",
                className: "h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none",
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "sm:col-span-2",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
                label: "Message",
                htmlFor: "message",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
                  id: "message",
                  name: "message",
                  rows: 4,
                  placeholder: "Tell us what would make this journey yours...",
                  className: "mt-2 rounded-sm",
                }),
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "sm:col-span-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                  type: "submit",
                  variant: "gold",
                  size: "journey",
                  className: "w-full sm:w-auto",
                  children: [
                    "Start planning ",
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {}),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "mt-4 text-xs leading-5 text-muted-foreground",
                  children:
                    "Submitting opens WhatsApp with your inquiry ready to send. No details are stored on this website.",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Field({ label, htmlFor, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
        htmlFor,
        className: "text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
        children: label,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "mt-2",
        children,
      }),
    ],
  });
}
function FAQ() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
    id: "faq",
    className: "bg-surface-warm px-5 py-24 sm:px-8 sm:py-32 lg:px-12",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "reveal",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "section-kicker",
              children: "Before you travel",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
              className: "editorial-title mt-6 text-5xl sm:text-7xl",
              children: [
                "Questions,",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "answered." }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
          type: "single",
          collapsible: true,
          className: "reveal border-t border-border",
          children: faqs.map(([question, answer], index) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              AccordionItem,
              {
                value: `item-${index}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger, {
                    className:
                      "group py-6 text-left font-serif text-xl font-normal no-underline hover:no-underline sm:text-2xl [&>svg]:hidden",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                        className: "pr-6",
                        children: question,
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                        className: "relative h-5 w-5 shrink-0 text-primary",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
                            className: "absolute inset-0 h-5 w-5 group-data-[state=open]:hidden",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
                            className:
                              "absolute inset-0 hidden h-5 w-5 group-data-[state=open]:block",
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
                    className:
                      "max-w-2xl pb-7 text-sm leading-7 text-muted-foreground sm:text-base",
                    children: answer,
                  }),
                ],
              },
              question,
            ),
          ),
        }),
      ],
    }),
  });
}
function FinalCTA() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
    className: "relative min-h-[680px] overflow-hidden bg-hero-background text-hero-foreground",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
        src: white_desert_hero_default,
        alt: "White Desert formations extending toward the Egyptian horizon",
        width: 1920,
        height: 1280,
        loading: "lazy",
        className: "absolute inset-0 h-full w-full object-cover",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "absolute inset-0 bg-hero-background/60",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className:
          "relative z-10 mx-auto flex min-h-[680px] max-w-[1260px] flex-col items-center justify-center px-5 py-24 text-center",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            className: "section-kicker",
            children: "White Desert Egypt",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
            className: "editorial-title mt-7 text-6xl sm:text-8xl lg:text-[8rem]",
            children: [
              "Your horizon",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "is waiting." }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
            className: "mt-7 text-lg text-hero-foreground/75",
            children: "Explore Egypt’s White Desert, privately.",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            asChild: true,
            variant: "gold",
            size: "journey",
            className: "mt-9",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
              href: "#plan",
              children: [
                "Plan your journey ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {}),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
    className:
      "bg-surface-dark px-5 pb-24 pt-16 text-surface-dark-foreground sm:px-8 sm:pb-10 lg:px-12",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto max-w-[1440px]",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "grid gap-12 border-b border-line-dark pb-12 sm:grid-cols-3",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { light: true }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "section-kicker",
                  children: "Explore",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                  className: "mt-5 flex flex-col gap-3",
                  children: navigation.map((item) =>
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "a",
                      {
                        href: item.href,
                        className:
                          "text-sm text-surface-dark-foreground/65 transition-colors hover:text-primary",
                        children: item.label,
                      },
                      item.href,
                    ),
                  ),
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "section-kicker",
                  children: "Find us",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "mt-5 text-sm text-surface-dark-foreground/65",
                  children: "Egypt",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "mt-4 flex gap-3",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                      href: siteConfig.instagramUrl,
                      target: "_blank",
                      rel: "noreferrer",
                      "aria-label": "Instagram",
                      className:
                        "grid h-9 w-9 place-items-center rounded-full border border-line-dark hover:border-primary hover:text-primary",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {
                        className: "h-4 w-4",
                      }),
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                      href: siteConfig.facebookUrl,
                      "aria-label": "Social placeholder",
                      className:
                        "grid h-9 w-9 place-items-center rounded-full border border-line-dark text-xs font-bold hover:border-primary hover:text-primary",
                      children: "f",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className:
            "flex flex-col justify-between gap-3 pt-7 text-[0.62rem] uppercase tracking-[0.14em] text-surface-dark-foreground/45 sm:flex-row",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
              children: ["© ", /* @__PURE__ */ new Date().getFullYear(), " ", siteConfig.name],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              children: "Private desert journeys · Egypt",
            }),
          ],
        }),
      ],
    }),
  });
}
function LandingPage() {
  useReveal();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Introduction, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experiences, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AfterSunset, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyUs, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanningForm, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {}),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
        asChild: true,
        variant: "gold",
        size: "journey",
        className: "fixed inset-x-4 bottom-4 z-40 shadow-lg md:hidden",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
          href: "#plan",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}),
            " Plan your journey",
          ],
        }),
      }),
    ],
  });
}
function Index() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { Index as component };
