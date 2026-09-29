import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, RefreshCw, Trash2 } from "lucide-react";

import { getBookingRequests, removeBooking, type BookingRow } from "@/lib/bookings";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({
    meta: [{ title: "Booking requests · Admin | WHITE DESERT HORIZONS" }],
  }),
  component: AdminBookings,
});

/** Shared "you shall not pass" screen — links to the login at /admin. */
function AccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm border border-border bg-card p-8 text-center">
        <p className="section-kicker">Admin only</p>
        <h1 className="editorial-title mt-3 text-3xl">
          Sign in <em>required.</em>
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Booking requests are protected. Sign in with the admin password to continue.
        </p>
        <Link
          to="/admin"
          className="mt-6 inline-flex items-center justify-center bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Go to sign in
        </Link>
      </div>
    </main>
  );
}

function AdminBookings() {
  const [authError, setAuthError] = useState(false);
  const [rows, setRows] = useState<BookingRow[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setError("");
    try {
      const data = await getBookingRequests();
      setRows(data as unknown as BookingRow[]);
    } catch (err) {
      if (err instanceof Error && /Not authorized/.test(err.message)) {
        setAuthError(true);
        return;
      }
      setError("Could not load booking requests. Check MONGODB_URI and the connection.");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function remove(id: string) {
    setBusyId(id);
    setError("");
    try {
      await removeBooking({ data: { id } });
      await refresh();
    } catch {
      setError("Delete failed. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  if (authError) return <AccessDenied />;

  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Admin</p>
            <h1 className="editorial-title mt-3 text-4xl sm:text-5xl">
              Booking <em>requests.</em>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Every submission from the “Plan your journey” form — newest first, stored even when
              the WhatsApp window failed to open.
            </p>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex shrink-0 items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        {error && (
          <p className="mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        {rows === null && !error && <p className="mt-10 text-sm text-muted-foreground">Loading…</p>}

        {rows !== null && rows.length === 0 && (
          <p className="mt-10 border border-border bg-card p-6 text-sm text-muted-foreground">
            No booking requests yet. They land here the moment someone submits the form.
          </p>
        )}

        {rows !== null && rows.length > 0 && (
          <div className="mt-8 space-y-4">
            {rows.map((r) => (
              <article key={r.id} className="border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-serif text-xl">
                    {r.name || "Unnamed"}{" "}
                    <span className="text-sm text-muted-foreground">
                      · {r.travelers || "?"} pax
                    </span>
                  </h2>
                  <time className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {r.createdAt}
                  </time>
                </div>

                <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Experience</dt>
                    <dd className="font-medium">{r.experience || "—"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Travel date</dt>
                    <dd className="font-medium">{r.date || "Flexible"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="font-medium">
                      {r.email ? (
                        <a className="underline hover:text-primary" href={`mailto:${r.email}`}>
                          {r.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">WhatsApp</dt>
                    <dd className="font-medium">
                      {r.whatsapp ? (
                        <a
                          className="underline hover:text-primary"
                          href={`https://wa.me/${r.whatsapp.replace(/[^\d]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {r.whatsapp}
                        </a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                </dl>

                {r.message && (
                  <p className="mt-3 border-t border-border pt-3 text-sm leading-6 text-muted-foreground">
                    “{r.message}”
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {r.whatsapp && (
                    <a
                      href={`https://wa.me/${r.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                        `Hello ${r.name || ""}, thank you for your interest in ${r.experience || "our journeys"}!`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> Reply
                    </a>
                  )}
                  <button
                    type="button"
                    disabled={busyId === r.id}
                    onClick={() => remove(r.id)}
                    className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
