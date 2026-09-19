import { o as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as setTestimonialReview, i as removeTestimonial, n as getAllTestimonials, t as Stars } from "./TestimonialStars-DpiDiJig.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as Check, i as RefreshCw, n as Trash2, r as RotateCcw, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.testimonials-D0TzQc08.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminTestimonials() {
	const [rows, setRows] = (0, import_react.useState)(null);
	const [busyId, setBusyId] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const refresh = (0, import_react.useCallback)(async () => {
		setError("");
		try {
			const data = await getAllTestimonials();
			setRows(data);
		} catch {
			setError("Could not load reviews. Check MONGODB_URI and the connection.");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	async function act(id, fn) {
		setBusyId(id);
		setError("");
		try {
			await fn({ data: id });
			await refresh();
		} catch {
			setError("Action failed. Please try again.");
		} finally {
			setBusyId(null);
		}
	}
	function review(id, status) {
		return act(id, (opts) => setTestimonialReview({ data: {
			id: opts.data,
			status
		} }));
	}
	const pending = rows?.filter((r) => r.status === "pending") ?? [];
	const published = rows?.filter((r) => r.status === "approved") ?? [];
	const rejected = rows?.filter((r) => r.status === "rejected") ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1000px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-kicker",
						children: "Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "editorial-title mt-3 text-4xl sm:text-5xl",
						children: ["Traveler ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "reviews." })]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: refresh,
						className: "inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), " Refresh"]
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-700",
					role: "alert",
					children: error
				}),
				rows === null && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-sm text-muted-foreground",
					children: "Loading…"
				}),
				rows !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: `Pending review (${pending.length})`,
						note: "New submissions. Approve to publish, or reject to hide.",
						children: [pending.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-sm text-muted-foreground",
							children: "Nothing waiting — all caught up."
						}), pending.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReviewCard, {
							row: r,
							busy: busyId === r.id,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busyId === r.id,
									onClick: () => review(r.id, "approved"),
									className: "inline-flex items-center gap-2 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Accept"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busyId === r.id,
									onClick: () => review(r.id, "rejected"),
									className: "inline-flex items-center gap-2 border border-red-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), " Reject"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busyId === r.id,
									onClick: () => act(r.id, removeTestimonial),
									className: "inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Delete"]
								})
							]
						}, r.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: `Published (${published.length})`,
						note: "Visible on the landing page.",
						children: [published.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-sm text-muted-foreground",
							children: "No published reviews yet."
						}), published.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReviewCard, {
							row: r,
							busy: busyId === r.id,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busyId === r.id,
								onClick: () => review(r.id, "rejected"),
								className: "inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), " Unpublish"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busyId === r.id,
								onClick: () => act(r.id, removeTestimonial),
								className: "inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Delete"]
							})]
						}, r.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
						title: `Rejected (${rejected.length})`,
						note: "Hidden from the site. Restore any time or delete for good.",
						children: [rejected.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-sm text-muted-foreground",
							children: "No rejected reviews."
						}), rejected.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReviewCard, {
							row: r,
							busy: busyId === r.id,
							muted: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busyId === r.id,
								onClick: () => review(r.id, "approved"),
								className: "inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Restore & publish"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busyId === r.id,
								onClick: () => act(r.id, removeTestimonial),
								className: "inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Delete forever"]
							})]
						}, r.id))]
					})
				] })
			]
		})
	});
}
function Section({ title, note, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: note
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-border",
			children
		})]
	});
}
function ReviewCard({ row, busy, muted = false, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `py-6 ${busy ? "opacity-50" : ""} ${muted ? "opacity-60" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [row.name, row.country ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-normal text-muted-foreground",
						children: [" · ", row.country]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground",
					children: [
						row.program ?? "No journey selected",
						" · ",
						row.created_at
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: row.rating })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "mt-4 max-w-3xl border-l-2 border-primary/40 pl-4 font-serif text-lg leading-8",
				children: row.quote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-3",
				children
			})
		]
	});
}
//#endregion
export { AdminTestimonials as component };
