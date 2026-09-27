import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-llCiSe62.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TestimonialStars-DpiDiJig.js
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId, { origin: "server" }))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true,
  });
};
/**
 * Server functions for the testimonial system.
 *
 * IMPORTANT: the database module (`@/lib/db`) is imported DYNAMICALLY
 * inside each handler — the TanStack Start compiler strips handler bodies
 * from the client bundle, so this keeps node-only code (mongodb driver)
 * out of the browser entirely.
 *
 * Workflow: submit → pending → admin approves (visible on site) or
 * rejects (hidden, kept in admin with restore/delete).
 *
 * Approve/reject/delete is NOT gated behind a login in this first version —
 * the admin page URL is unlisted. Add real auth before any public launch.
 */
var getApprovedTestimonials = createServerFn({ method: "GET" }).handler(
  createSsrRpc("b003252863dd5c71e661fd7fb564c05efa911c027043cf006b8d6e79d9429765"),
);
var getAllTestimonials = createServerFn({ method: "GET" }).handler(
  createSsrRpc("2ba0a30d231fa2221615fd2370f15ee1ffc959e94eb6db6b75b67b54fc2e46b9"),
);
var submitTestimonial = createServerFn({ method: "POST" })
  .validator((input) => {
    const name = String(input?.name ?? "").trim();
    const quote = String(input?.quote ?? "").trim();
    const rating = Math.round(Number(input?.rating));
    if (name.length < 2 || name.length > 80) throw new Error("Name must be 2-80 characters");
    if (quote.length < 10 || quote.length > 1e3)
      throw new Error("Review must be 10-1000 characters");
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) throw new Error("Rating must be 1-5");
    return {
      name,
      country: input?.country ? String(input.country).trim().slice(0, 80) : null,
      program: input?.program ? String(input.program).trim().slice(0, 120) : null,
      rating,
      quote,
    };
  })
  .handler(createSsrRpc("d846a6db1979ca2a3be6badc82c399723d957576fdf4c47409b44026a886aaf6"));
function parseId(input) {
  const id = String(input?.id ?? "");
  if (!/^[a-f\d]{24}$/i.test(id)) throw new Error("Invalid id");
  return { id };
}
var setTestimonialReview = createServerFn({ method: "POST" })
  .validator((input) => {
    const id = String(input?.id ?? "");
    const status = String(input?.status ?? "");
    if (!/^[a-f\d]{24}$/i.test(id)) throw new Error("Invalid id");
    if (status !== "approved" && status !== "rejected" && status !== "pending")
      throw new Error("Invalid status");
    return {
      id,
      status,
    };
  })
  .handler(createSsrRpc("05c1f851fccc17141bace1ce0804041300162ec5081dac7c41edec722eaef5e5"));
var removeTestimonial = createServerFn({ method: "POST" })
  .validator(parseId)
  .handler(createSsrRpc("a418129df8fa7e37a48960e6f429a8984de5a9ca842cb20d524c48ba87425110"));
function Stars({ value, size = "h-4 w-4" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    className: "flex gap-0.5 text-primary",
    role: "img",
    "aria-label": `${value} out of 5 stars`,
    children: [1, 2, 3, 4, 5].map((n) =>
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "svg",
        {
          viewBox: "0 0 24 24",
          className: `${size} ${n <= value ? "fill-current" : "fill-none stroke-current stroke-[1.5] opacity-40"}`,
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
            d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
          }),
        },
        n,
      ),
    ),
  });
}
//#endregion
export {
  setTestimonialReview as a,
  removeTestimonial as i,
  getAllTestimonials as n,
  submitTestimonial as o,
  getApprovedTestimonials as r,
  Stars as t,
};
