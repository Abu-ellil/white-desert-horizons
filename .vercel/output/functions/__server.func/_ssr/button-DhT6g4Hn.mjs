import { o as __toESM } from "../_runtime.mjs";
import { h as Slot, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DhT6g4Hn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var siteConfig = {
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
		"Private Custom Journey"
	]
};
var navigation = [
	{
		label: "Experiences",
		href: "/#experiences"
	},
	{
		label: "Programs",
		href: "/programs"
	},
	{
		label: "Why Us",
		href: "/#why-us"
	},
	{
		label: "Gallery",
		href: "/#gallery"
	},
	{
		label: "FAQ",
		href: "/#faq"
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			gold: "bg-primary text-primary-foreground shadow-none hover:bg-primary/88",
			goldOutline: "border border-primary bg-transparent text-primary shadow-none hover:bg-primary hover:text-primary-foreground",
			ivoryOutline: "border border-hero-foreground/50 bg-transparent text-hero-foreground shadow-none hover:border-hero-foreground hover:bg-hero-foreground hover:text-hero-background"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9",
			journey: "h-12 rounded-sm px-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { siteConfig as i, cn as n, navigation as r, Button as t };
