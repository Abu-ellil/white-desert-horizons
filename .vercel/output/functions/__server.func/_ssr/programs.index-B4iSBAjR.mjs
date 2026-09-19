import { o as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as programs } from "./ProgramPage-BOpxMXUr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programs.index-B4iSBAjR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProgramsIndex() {
	const [lang, setLang] = (0, import_react.useState)("en");
	const rtl = lang === "ar";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "bg-background px-5 pb-24 pt-32 sm:px-8 sm:pt-40 lg:px-12",
		dir: rtl ? "rtl" : "ltr",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1260px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-kicker",
						children: rtl ? "البرامج الرسمية" : "Official tour programs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex overflow-hidden rounded-full border border-border",
						role: "group",
						"aria-label": "Language / اللغة",
						children: ["en", "ar"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLang(l),
							"aria-pressed": lang === l,
							className: `px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:text-primary"}`,
							children: l === "en" ? "EN" : "عربي"
						}, l))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "editorial-title mt-5 text-5xl sm:text-7xl",
					children: rtl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["الـ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "برامج." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["The ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "programs." })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 grid gap-px border border-border bg-border sm:grid-cols-2",
					children: programs.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `/programs/${program.slug}`,
						className: "group bg-background p-8 transition-colors hover:bg-surface-warm/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between border-b border-border pb-4 text-[0.63rem] uppercase tracking-[0.18em] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: program.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: program.duration })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 font-serif text-3xl",
								children: rtl ? program.titleAr : program.titleEn
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-7 text-muted-foreground",
								children: program.subtitle
							})
						]
					}, program.slug))
				})
			]
		})
	});
}
//#endregion
export { ProgramsIndex as component };
