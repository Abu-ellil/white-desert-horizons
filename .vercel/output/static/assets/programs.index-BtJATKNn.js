import { a as e, n as t, r as n } from "./createLucideIcon-Cwt3h4uJ.js";
import { n as r } from "./index-CATXV9D_.js";
var i = e(n()),
  a = t();
function o() {
  let [e, t] = (0, i.useState)(`en`),
    n = e === `ar`;
  return (0, a.jsx)(`main`, {
    className: `bg-background px-5 pb-24 pt-32 sm:px-8 sm:pt-40 lg:px-12`,
    dir: n ? `rtl` : `ltr`,
    children: (0, a.jsxs)(`div`, {
      className: `mx-auto max-w-[1260px]`,
      children: [
        (0, a.jsxs)(`div`, {
          className: `flex items-center justify-between`,
          children: [
            (0, a.jsx)(`p`, {
              className: `section-kicker`,
              children: n ? `البرامج الرسمية` : `Official tour programs`,
            }),
            (0, a.jsx)(`div`, {
              className: `inline-flex overflow-hidden rounded-full border border-border`,
              role: `group`,
              "aria-label": `Language / اللغة`,
              children: [`en`, `ar`].map((n) =>
                (0, a.jsx)(
                  `button`,
                  {
                    type: `button`,
                    onClick: () => t(n),
                    "aria-pressed": e === n,
                    className: `px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors ${e === n ? `bg-primary text-primary-foreground` : `bg-transparent text-muted-foreground hover:text-primary`}`,
                    children: n === `en` ? `EN` : `عربي`,
                  },
                  n,
                ),
              ),
            }),
          ],
        }),
        (0, a.jsx)(`h1`, {
          className: `editorial-title mt-5 text-5xl sm:text-7xl`,
          children: n
            ? (0, a.jsxs)(a.Fragment, {
                children: [`الـ `, (0, a.jsx)(`em`, { children: `برامج.` })],
              })
            : (0, a.jsxs)(a.Fragment, {
                children: [`The `, (0, a.jsx)(`em`, { children: `programs.` })],
              }),
        }),
        (0, a.jsx)(`div`, {
          className: `mt-16 grid gap-px border border-border bg-border sm:grid-cols-2`,
          children: r.map((e) =>
            (0, a.jsxs)(
              `a`,
              {
                href: `/programs/${e.slug}`,
                className: `group bg-background p-8 transition-colors hover:bg-surface-warm/60`,
                children: [
                  (0, a.jsxs)(`div`, {
                    className: `flex items-baseline justify-between border-b border-border pb-4 text-[0.63rem] uppercase tracking-[0.18em] text-muted-foreground`,
                    children: [
                      (0, a.jsx)(`span`, { children: e.number }),
                      (0, a.jsx)(`span`, { children: e.duration }),
                    ],
                  }),
                  (0, a.jsx)(`h2`, {
                    className: `mt-6 font-serif text-3xl`,
                    children: n ? e.titleAr : e.titleEn,
                  }),
                  (0, a.jsx)(`p`, {
                    className: `mt-4 text-sm leading-7 text-muted-foreground`,
                    children: e.subtitle,
                  }),
                ],
              },
              e.slug,
            ),
          ),
        }),
      ],
    }),
  });
}
export { o as component };
