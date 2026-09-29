/**
 * Analytics consent gate — one localStorage flag consulted before any
 * tracking ping leaves the browser (visits in __root, conversion events).
 * The banner lives in CookieConsent.tsx; this module is the single source
 * of truth for "did the visitor allow analytics".
 *
 * "essential" (or nothing chosen yet) = no tracking. GDPR-friendly default.
 */
const KEY = "wdh-consent";

export type ConsentChoice = "all" | "essential";

export function getConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    // private mode — treat as essential-only, banner will re-ask next visit
  }
  window.dispatchEvent(new Event("wdh-consent-changed"));
}

/** True only when the visitor explicitly accepted analytics cookies. */
export function analyticsAllowed(): boolean {
  return getConsent() === "all";
}
