import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

import { analyticsAllowed, getConsent, setConsent } from "@/lib/consent";

/**
 * Minimal, GDPR-friendly cookie notice. Nothing but the visitor's own choice
 * in localStorage — no third-party banner scripts. Until "Accept" is chosen,
 * every tracking ping (visit log, conversion events) is suppressed in the
 * browser, so the default is fully passive.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (getConsent() !== null) return;
    // Let the page paint first — the banner is not the reason we're here.
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  function choose(choice: "all" | "essential") {
    setConsent(choice);
    setShow(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-20 z-50 border border-border bg-card p-5 shadow-lg sm:left-auto sm:bottom-6 sm:right-6 sm:max-w-sm md:bottom-6"
    >
      <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em]">
        <Cookie className="h-4 w-4 text-primary" /> Cookies
      </p>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        We use a small analytics cookie to understand which journeys interest visitors — no ads, no
        third-party trackers, nothing sold. Choose “essential only” and the site works exactly the
        same, just without the anonymous visit log.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("all")}
          className="flex-1 bg-primary px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("essential")}
          className="flex-1 border border-border px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
