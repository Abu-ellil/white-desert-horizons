import { g as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as programs, t as ProgramPage } from "./ProgramPage-BOpxMXUr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programs._slug-D61efOos.js
var import_jsx_runtime = require_jsx_runtime();
function ProgramRoute() {
	const { slug } = useParams({ from: "/programs/$slug" });
	const program = programs.find((p) => p.slug === slug);
	if (!program) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "bg-background px-6 py-40 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "editorial-title text-5xl",
			children: "Program not found."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/",
			className: "mt-8 inline-block text-sm uppercase tracking-[0.18em] text-primary underline",
			children: "Back to all journeys"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramPage, { program });
}
//#endregion
export { ProgramRoute as component };
