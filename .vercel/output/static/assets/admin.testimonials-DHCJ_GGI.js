import { a as e, n as t, r as n, t as r } from "./createLucideIcon-Cwt3h4uJ.js";
import { a as i, c as a, i as o, n as s, s as c, t as l } from "./TestimonialStars-D52H3YQZ.js";
var u = r(`refresh-cw`, [
    [`path`, { d: `M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`, key: `v9h5vc` }],
    [`path`, { d: `M21 3v5h-5`, key: `1q7to0` }],
    [`path`, { d: `M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`, key: `3uifl3` }],
    [`path`, { d: `M8 16H3v5`, key: `1cv678` }],
  ]),
  d = r(`rotate-ccw`, [
    [`path`, { d: `M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`, key: `1357e3` }],
    [`path`, { d: `M3 3v5h5`, key: `1xhq8a` }],
  ]),
  f = r(`trash-2`, [
    [`path`, { d: `M10 11v6`, key: `nco0om` }],
    [`path`, { d: `M14 11v6`, key: `outv1u` }],
    [`path`, { d: `M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`, key: `miytrc` }],
    [`path`, { d: `M3 6h18`, key: `d0wm0j` }],
    [`path`, { d: `M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`, key: `e791ji` }],
  ]),
  p = e(n()),
  m = t();
function h() {
  let [e, t] = (0, p.useState)(null),
    [n, r] = (0, p.useState)(null),
    [l, h] = (0, p.useState)(``),
    v = (0, p.useCallback)(async () => {
      h(``);
      try {
        let e = await s();
        t(e);
      } catch {
        h(`Could not load reviews. Check MONGODB_URI and the connection.`);
      }
    }, []);
  (0, p.useEffect)(() => {
    v();
  }, [v]);
  async function y(e, t) {
    (r(e), h(``));
    try {
      (await t({ data: e }), await v());
    } catch {
      h(`Action failed. Please try again.`);
    } finally {
      r(null);
    }
  }
  function b(e, t) {
    return y(e, (e) => i({ data: { id: e.data, status: t } }));
  }
  let x = e?.filter((e) => e.status === `pending`) ?? [],
    S = e?.filter((e) => e.status === `approved`) ?? [],
    C = e?.filter((e) => e.status === `rejected`) ?? [];
  return (0, m.jsx)(`main`, {
    className: `min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12`,
    children: (0, m.jsxs)(`div`, {
      className: `mx-auto max-w-[1000px]`,
      children: [
        (0, m.jsxs)(`div`, {
          className: `flex items-end justify-between`,
          children: [
            (0, m.jsxs)(`div`, {
              children: [
                (0, m.jsx)(`p`, { className: `section-kicker`, children: `Admin` }),
                (0, m.jsxs)(`h1`, {
                  className: `editorial-title mt-3 text-4xl sm:text-5xl`,
                  children: [`Traveler `, (0, m.jsx)(`em`, { children: `reviews.` })],
                }),
              ],
            }),
            (0, m.jsxs)(`button`, {
              type: `button`,
              onClick: v,
              className: `inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary`,
              children: [(0, m.jsx)(u, { className: `h-3.5 w-3.5` }), ` Refresh`],
            }),
          ],
        }),
        l &&
          (0, m.jsx)(`p`, {
            className: `mt-6 border border-red-300 bg-red-50 p-4 text-sm text-red-700`,
            role: `alert`,
            children: l,
          }),
        e === null &&
          !l &&
          (0, m.jsx)(`p`, {
            className: `mt-10 text-sm text-muted-foreground`,
            children: `Loading…`,
          }),
        e !== null &&
          (0, m.jsxs)(m.Fragment, {
            children: [
              (0, m.jsxs)(g, {
                title: `Pending review (${x.length})`,
                note: `New submissions. Approve to publish, or reject to hide.`,
                children: [
                  x.length === 0 &&
                    (0, m.jsx)(`p`, {
                      className: `py-6 text-sm text-muted-foreground`,
                      children: `Nothing waiting — all caught up.`,
                    }),
                  x.map((e) =>
                    (0, m.jsxs)(
                      _,
                      {
                        row: e,
                        busy: n === e.id,
                        children: [
                          (0, m.jsxs)(`button`, {
                            type: `button`,
                            disabled: n === e.id,
                            onClick: () => b(e.id, `approved`),
                            className: `inline-flex items-center gap-2 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50`,
                            children: [(0, m.jsx)(a, { className: `h-3.5 w-3.5` }), ` Accept`],
                          }),
                          (0, m.jsxs)(`button`, {
                            type: `button`,
                            disabled: n === e.id,
                            onClick: () => b(e.id, `rejected`),
                            className: `inline-flex items-center gap-2 border border-red-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50`,
                            children: [(0, m.jsx)(c, { className: `h-3.5 w-3.5` }), ` Reject`],
                          }),
                          (0, m.jsxs)(`button`, {
                            type: `button`,
                            disabled: n === e.id,
                            onClick: () => y(e.id, o),
                            className: `inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50`,
                            children: [(0, m.jsx)(f, { className: `h-3.5 w-3.5` }), ` Delete`],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                ],
              }),
              (0, m.jsxs)(g, {
                title: `Published (${S.length})`,
                note: `Visible on the landing page.`,
                children: [
                  S.length === 0 &&
                    (0, m.jsx)(`p`, {
                      className: `py-6 text-sm text-muted-foreground`,
                      children: `No published reviews yet.`,
                    }),
                  S.map((e) =>
                    (0, m.jsxs)(
                      _,
                      {
                        row: e,
                        busy: n === e.id,
                        children: [
                          (0, m.jsxs)(`button`, {
                            type: `button`,
                            disabled: n === e.id,
                            onClick: () => b(e.id, `rejected`),
                            className: `inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-50`,
                            children: [(0, m.jsx)(c, { className: `h-3.5 w-3.5` }), ` Unpublish`],
                          }),
                          (0, m.jsxs)(`button`, {
                            type: `button`,
                            disabled: n === e.id,
                            onClick: () => y(e.id, o),
                            className: `inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50`,
                            children: [(0, m.jsx)(f, { className: `h-3.5 w-3.5` }), ` Delete`],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                ],
              }),
              (0, m.jsxs)(g, {
                title: `Rejected (${C.length})`,
                note: `Hidden from the site. Restore any time or delete for good.`,
                children: [
                  C.length === 0 &&
                    (0, m.jsx)(`p`, {
                      className: `py-6 text-sm text-muted-foreground`,
                      children: `No rejected reviews.`,
                    }),
                  C.map((e) =>
                    (0, m.jsxs)(
                      _,
                      {
                        row: e,
                        busy: n === e.id,
                        muted: !0,
                        children: [
                          (0, m.jsxs)(`button`, {
                            type: `button`,
                            disabled: n === e.id,
                            onClick: () => b(e.id, `approved`),
                            className: `inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50`,
                            children: [
                              (0, m.jsx)(d, { className: `h-3.5 w-3.5` }),
                              ` Restore & publish`,
                            ],
                          }),
                          (0, m.jsxs)(`button`, {
                            type: `button`,
                            disabled: n === e.id,
                            onClick: () => y(e.id, o),
                            className: `inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-50`,
                            children: [
                              (0, m.jsx)(f, { className: `h-3.5 w-3.5` }),
                              ` Delete forever`,
                            ],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                ],
              }),
            ],
          }),
      ],
    }),
  });
}
function g({ title: e, note: t, children: n }) {
  return (0, m.jsxs)(`section`, {
    className: `mt-12`,
    children: [
      (0, m.jsxs)(`div`, {
        className: `flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3`,
        children: [
          (0, m.jsx)(`h2`, { className: `font-serif text-2xl`, children: e }),
          (0, m.jsx)(`p`, { className: `text-xs text-muted-foreground`, children: t }),
        ],
      }),
      (0, m.jsx)(`div`, { className: `divide-y divide-border`, children: n }),
    ],
  });
}
function _({ row: e, busy: t, muted: n = !1, children: r }) {
  return (0, m.jsxs)(`article`, {
    className: `py-6 ${t ? `opacity-50` : ``} ${n ? `opacity-60` : ``}`,
    children: [
      (0, m.jsxs)(`div`, {
        className: `flex flex-wrap items-center justify-between gap-3`,
        children: [
          (0, m.jsxs)(`div`, {
            children: [
              (0, m.jsxs)(`p`, {
                className: `font-semibold`,
                children: [
                  e.name,
                  e.country
                    ? (0, m.jsxs)(`span`, {
                        className: `font-normal text-muted-foreground`,
                        children: [` · `, e.country],
                      })
                    : null,
                ],
              }),
              (0, m.jsxs)(`p`, {
                className: `mt-0.5 text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground`,
                children: [e.program ?? `No journey selected`, ` · `, e.created_at],
              }),
            ],
          }),
          (0, m.jsx)(l, { value: e.rating }),
        ],
      }),
      (0, m.jsx)(`blockquote`, {
        className: `mt-4 max-w-3xl border-l-2 border-primary/40 pl-4 font-serif text-lg leading-8`,
        children: e.quote,
      }),
      (0, m.jsx)(`div`, { className: `mt-4 flex flex-wrap gap-3`, children: r }),
    ],
  });
}
export { h as component };
