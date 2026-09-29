import { BadgeCheck, Compass, ShieldCheck, Star } from "lucide-react";

/**
 * Trust strip — the credibility signals foreign travelers look for before
 * contacting an Egyptian tour operator. Sits between the Introduction and the
 * Experiences grid. Keep claims factual: nothing here that the operator
 * (Mohamed Aboshanab) hasn't confirmed. Update the years figure as it grows.
 */
const signals = [
  {
    icon: ShieldCheck,
    title: "Licensed operator",
    body: "Registered Egyptian tour operator with licensed desert guides and permitted 4×4 vehicles.",
  },
  {
    icon: BadgeCheck,
    title: "Protected-area permits",
    body: "White Desert National Park entry and desert camping permissions arranged for every journey.",
  },
  {
    icon: Compass,
    title: "Born in the desert",
    body: "Bahariya-based team — the Western Desert is home terrain, not a map reference.",
  },
  {
    icon: Star,
    title: "Private by design",
    body: "Every journey is built for one party at a time — your pace, your stops, your silence.",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why travelers trust us"
      className="border-y border-border bg-surface-warm px-5 py-14 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-[1260px] gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {signals.map(({ icon: Icon, title, body }) => (
          <div key={title} className="reveal flex gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center border border-primary/40 text-primary">
              <Icon className="h-4.5 w-4.5" />
            </span>
            <div>
              <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.16em]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
