import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Image as ImageIcon,
  KeyRound,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquareQuote,
  ShieldCheck,
} from "lucide-react";

import { adminLogin, adminLogout, changeAdminPassword, getAdminSession } from "@/lib/auth";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin | WHITE DESERT HORIZONS" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<"checking" | "in" | "out">("checking");

  useEffect(() => {
    getAdminSession()
      .then((s) => setSession(s.signedIn ? "in" : "out"))
      .catch(() => setSession("out"));
  }, []);

  if (session === "checking")
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </main>
    );

  return session === "in" ? (
    <Panel onSignOut={() => setSession("out")} />
  ) : (
    <Login onDone={() => setSession("in")} />
  );
}

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await adminLogin({ data: { password } });
      if (res.ok) onDone();
      else setError(res.error ?? "Wrong password.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed — check ADMIN_PASSWORD in the environment.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm border border-border bg-card p-8 shadow-sm"
      >
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="editorial-title mt-4 text-3xl">
          Admin <em>access.</em>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the admin password to manage photos and reviews.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          autoComplete="current-password"
          className="mt-6 w-full border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy || password.length === 0}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <KeyRound className="h-3.5 w-3.5" />
          )}
          Sign in
        </button>
        <Link
          to="/"
          className="mt-4 block text-center text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
        >
          Back to site
        </Link>
      </form>
    </main>
  );
}

function Panel({ onSignOut }: { onSignOut: () => void }) {
  const [showChange, setShowChange] = useState(false);

  async function signOut() {
    try {
      await adminLogout();
    } finally {
      onSignOut();
    }
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="section-kicker">Signed in</p>
            <h1 className="editorial-title mt-3 text-4xl sm:text-5xl">
              Admin <em>panel.</em>
            </h1>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <AdminCard
            to="/studio"
            icon={<ImageIcon className="h-5 w-5" />}
            title="Media Studio"
            desc="Upload photographs to Cloudinary, organize albums, favorites and deletion."
          />
          <AdminCard
            to="/admin/testimonials"
            icon={<MessageSquareQuote className="h-5 w-5" />}
            title="Traveler reviews"
            desc="Approve, reject or delete guest reviews before they appear on the site."
          />
          <AdminCard
            to="/gallery"
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Public gallery"
            desc="What visitors see — the photos you publish with their likes and comments."
          />
        </div>

        <section className="mt-10 border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em]">Password</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Changing it signs out every other device immediately.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowChange((v) => !v)}
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
            >
              <KeyRound className="h-3.5 w-3.5" /> {showChange ? "Close" : "Change"}
            </button>
          </div>
          {showChange && <ChangePassword onDone={() => setShowChange(false)} />}
          <p className="mt-4 border-t border-border pt-3 text-[0.68rem] leading-5 text-muted-foreground">
            Note: a password changed here updates the running server only. Persist it in your host's
            environment settings (ADMIN_PASSWORD) so it survives the next deploy.
          </p>
        </section>
      </div>
    </main>
  );
}

function AdminCard({
  to,
  icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group border border-border bg-card p-6 transition-colors hover:border-primary"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary">
        {icon}
      </span>
      <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.12em]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
    </Link>
  );
}

function ChangePassword({ onDone }: { onDone: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (next !== confirm) {
      setError("The two new passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await changeAdminPassword({ data: { current, next } });
      if (res.ok) {
        setDone(true);
        setTimeout(onDone, 1600);
      } else setError(res.error ?? "Could not change the password.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change the password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
      <input
        type="password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder="Current password"
        autoComplete="current-password"
        className="border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
      <input
        type="password"
        value={next}
        onChange={(e) => setNext(e.target.value)}
        placeholder="New password (min 8)"
        autoComplete="new-password"
        className="border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Repeat new password"
        autoComplete="new-password"
        className="border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
      {error && <p className="text-sm text-red-600 sm:col-span-3">{error}</p>}
      {done && (
        <p className="inline-flex items-center gap-2 text-sm text-primary sm:col-span-3">
          <Check className="h-4 w-4" /> Password changed — other devices signed out.
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !current || next.length < 8}
        className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 sm:col-span-3 sm:w-48"
      >
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
        Update password
      </button>
    </form>
  );
}
