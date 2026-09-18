import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, EyeOff, RefreshCw, Trash2 } from "lucide-react";

import {
  getAllTestimonials,
  approveTestimonial,
  hideTestimonial,
  removeTestimonial,
} from "@/lib/testimonials";
import { Stars } from "@/components/travel/TestimonialStars";

type Row = {
  id: number;
  name: string;
  country: string | null;
  program: string | null;
  rating: number;
  quote: string;
  approved: number;
  created_at: string;
};

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({
    meta: [{ title: "Reviews · Admin | WHITE DESERT HORIZONS" }],
  }),
  component: AdminTestimonials,
});

function AdminTestimonials() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setError("");
    try {
      const data = await getAllTestimonials();
      setRows(data as unknown as Row[]);
    } catch {
      setError("Could not load reviews. Is the dev server running?");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function act(id: number, fn: (opts: { data: number }) => Promise<unknown>) {
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

  const pending = rows?.filter((r) => !r.approved) ?? [];
  const published = rows?.filter((r) => r.approved) ?? [];

  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-kicker">Admin</p>
            <h1 className="editorial-title mt-3 text-4xl sm:text-5xl">Traveler <em>reviews.</em></h1>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        {error && <p className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>}

        {rows === null && !error && <p className="mt-10 text-sm text-muted-foreground">Loading…</p>}

        {rows !== null && (
          <>
            <Section title={`Pending review (${pending.length})`} note="New submissions appear here. Approve to publish on the landing page.">
              {pending.length === 0 && <p className="py-6 text-sm text-muted-foreground">Nothing waiting — all caught up.</p>}
              {pending.map((r) => (
                <ReviewCard key={r.id} row={r} busy={busyId === r.id}>
                  <button type="button" disabled={busyId === r.id} onClick={() => act(r.id, approveTestimonial)} className="inline-flex items-center gap-2 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button type="button" disabled={busyId === r.id} onClick={() => act(r.id, removeTestimonial)} className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </ReviewCard>
              ))}
            </Section>

            <Section title={`Published (${published.length})`} note="Visible on the landing page.">
              {published.length === 0 && <p className="py-6 text-sm text-muted-foreground">No published reviews yet.</p>}
              {published.map((r) => (
                <ReviewCard key={r.id} row={r} busy={busyId === r.id}>
                  <button type="button" disabled={busyId === r.id} onClick={() => act(r.id, hideTestimonial)} className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50">
                    <EyeOff className="h-3.5 w-3.5" /> Unpublish
                  </button>
                  <button type="button" disabled={busyId === r.id} onClick={() => act(r.id, removeTestimonial)} className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </ReviewCard>
              ))}
            </Section>
          </>
        )}
      </div>
    </main>
  );
}

function Section({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
        <h2 className="font-serif text-2xl">{title}</h2>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </section>
  );
}

function ReviewCard({ row, busy, children }: { row: Row; busy: boolean; children: React.ReactNode }) {
  return (
    <article className={`py-6 ${busy ? "opacity-50" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold">{row.name}{row.country ? <span className="font-normal text-muted-foreground"> · {row.country}</span> : null}</p>
          <p className="mt-0.5 text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
            {row.program ?? "No journey selected"} · {new Date(row.created_at + "Z").toLocaleString()}
          </p>
        </div>
        <Stars value={row.rating} />
      </div>
      <blockquote className="mt-4 max-w-3xl border-l-2 border-primary/40 pl-4 font-serif text-lg leading-8">{row.quote}</blockquote>
      <div className="mt-4 flex gap-3">{children}</div>
    </article>
  );
}
