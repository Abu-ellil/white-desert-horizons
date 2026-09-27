import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/testimonials-DBsboKbT.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
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
var getApprovedTestimonials_createServerFn_handler = createServerRpc(
  {
    id: "b003252863dd5c71e661fd7fb564c05efa911c027043cf006b8d6e79d9429765",
    name: "getApprovedTestimonials",
    filename: "src/lib/testimonials.ts",
  },
  (opts) => getApprovedTestimonials.__executeServer(opts),
);
var getApprovedTestimonials = createServerFn({ method: "GET" }).handler(
  getApprovedTestimonials_createServerFn_handler,
  async () => {
    const { listTestimonials } = await import("./db-BGao4qRl.mjs");
    return listTestimonials(true);
  },
);
var getAllTestimonials_createServerFn_handler = createServerRpc(
  {
    id: "2ba0a30d231fa2221615fd2370f15ee1ffc959e94eb6db6b75b67b54fc2e46b9",
    name: "getAllTestimonials",
    filename: "src/lib/testimonials.ts",
  },
  (opts) => getAllTestimonials.__executeServer(opts),
);
var getAllTestimonials = createServerFn({ method: "GET" }).handler(
  getAllTestimonials_createServerFn_handler,
  async () => {
    const { listTestimonials } = await import("./db-BGao4qRl.mjs");
    return listTestimonials(false);
  },
);
var submitTestimonial_createServerFn_handler = createServerRpc(
  {
    id: "d846a6db1979ca2a3be6badc82c399723d957576fdf4c47409b44026a886aaf6",
    name: "submitTestimonial",
    filename: "src/lib/testimonials.ts",
  },
  (opts) => submitTestimonial.__executeServer(opts),
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
  .handler(submitTestimonial_createServerFn_handler, async ({ data }) => {
    const { createTestimonial } = await import("./db-BGao4qRl.mjs");
    return createTestimonial(data);
  });
function parseId(input) {
  const id = String(input?.id ?? "");
  if (!/^[a-f\d]{24}$/i.test(id)) throw new Error("Invalid id");
  return { id };
}
var setTestimonialReview_createServerFn_handler = createServerRpc(
  {
    id: "05c1f851fccc17141bace1ce0804041300162ec5081dac7c41edec722eaef5e5",
    name: "setTestimonialReview",
    filename: "src/lib/testimonials.ts",
  },
  (opts) => setTestimonialReview.__executeServer(opts),
);
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
  .handler(setTestimonialReview_createServerFn_handler, async ({ data }) => {
    const { setTestimonialStatus } = await import("./db-BGao4qRl.mjs");
    await setTestimonialStatus(data.id, data.status);
  });
var removeTestimonial_createServerFn_handler = createServerRpc(
  {
    id: "a418129df8fa7e37a48960e6f429a8984de5a9ca842cb20d524c48ba87425110",
    name: "removeTestimonial",
    filename: "src/lib/testimonials.ts",
  },
  (opts) => removeTestimonial.__executeServer(opts),
);
var removeTestimonial = createServerFn({ method: "POST" })
  .validator(parseId)
  .handler(removeTestimonial_createServerFn_handler, async ({ data }) => {
    const { deleteTestimonial } = await import("./db-BGao4qRl.mjs");
    await deleteTestimonial(data.id);
  });
//#endregion
export {
  getAllTestimonials_createServerFn_handler,
  getApprovedTestimonials_createServerFn_handler,
  removeTestimonial_createServerFn_handler,
  setTestimonialReview_createServerFn_handler,
  submitTestimonial_createServerFn_handler,
};
