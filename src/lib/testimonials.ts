import { createServerFn } from "@tanstack/react-start";

/**
 * Server functions for the testimonial system.
 *
 * IMPORTANT: the database module (`@/lib/db`, which uses node:sqlite) is
 * imported DYNAMICALLY inside each handler. The TanStack Start compiler
 * strips handler bodies from the client bundle, so this keeps node-only
 * code out of the browser entirely — a static top-level import here would
 * break client hydration.
 *
 * - Anyone can SUBMIT a review (stored unapproved).
 * - Only approved reviews are shown on the landing page.
 * - Approve/hide/delete is NOT gated behind a login in this first version —
 *   the admin page URL is unlisted. Add real auth before any public launch.
 */

export const getApprovedTestimonials = createServerFn({ method: "GET" }).handler(
  async () => {
    const { listTestimonials } = await import("@/lib/db");
    return listTestimonials(true);
  },
);

export const getAllTestimonials = createServerFn({ method: "GET" }).handler(
  async () => {
    const { listTestimonials } = await import("@/lib/db");
    return listTestimonials(false);
  },
);

export const submitTestimonial = createServerFn({ method: "POST" })
  .validator((input: { name?: string; country?: string; program?: string; rating?: number; quote?: string }) => {
    const name = String(input?.name ?? "").trim();
    const quote = String(input?.quote ?? "").trim();
    const rating = Math.round(Number(input?.rating));
    if (name.length < 2 || name.length > 80) throw new Error("Name must be 2-80 characters");
    if (quote.length < 10 || quote.length > 1000) throw new Error("Review must be 10-1000 characters");
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) throw new Error("Rating must be 1-5");
    return {
      name,
      country: input?.country ? String(input.country).trim().slice(0, 80) : null,
      program: input?.program ? String(input.program).trim().slice(0, 120) : null,
      rating,
      quote,
    };
  })
  .handler(async ({ data }) => {
    const { createTestimonial } = await import("@/lib/db");
    return createTestimonial(data);
  });

function parseId(input: unknown): { id: number } {
  const id = Number((input as { id?: unknown })?.id);
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  return { id };
}

export const approveTestimonial = createServerFn({ method: "POST" })
  .validator(parseId)
  .handler(async ({ data }) => {
    const { setTestimonialApproval } = await import("@/lib/db");
    setTestimonialApproval(data.id, true);
  });

export const hideTestimonial = createServerFn({ method: "POST" })
  .validator(parseId)
  .handler(async ({ data }) => {
    const { setTestimonialApproval } = await import("@/lib/db");
    setTestimonialApproval(data.id, false);
  });

export const removeTestimonial = createServerFn({ method: "POST" })
  .validator(parseId)
  .handler(async ({ data }) => {
    const { deleteTestimonial } = await import("@/lib/db");
    deleteTestimonial(data.id);
  });
