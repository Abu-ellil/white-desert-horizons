import { n as e, t } from "./createLucideIcon-Cwt3h4uJ.js";
import { f as n, g as r, h as i, m as a, p as o } from "./index-CATXV9D_.js";
function s(e) {
  if (Array.isArray(e)) return e.flatMap((e) => s(e));
  if (typeof e != `string`) return [];
  let t = [],
    n = 0,
    r,
    i,
    a,
    o,
    c,
    l = () => {
      for (; n < e.length && /\s/.test(e.charAt(n));) n += 1;
      return n < e.length;
    },
    u = () => ((i = e.charAt(n)), i !== `=` && i !== `;` && i !== `,`);
  for (; n < e.length;) {
    for (r = n, c = !1; l();)
      if (((i = e.charAt(n)), i === `,`)) {
        for (a = n, n += 1, l(), o = n; n < e.length && u();) n += 1;
        n < e.length && e.charAt(n) === `=`
          ? ((c = !0), (n = o), t.push(e.slice(r, a)), (r = n))
          : (n = a + 1);
      } else n += 1;
    (!c || n >= e.length) && t.push(e.slice(r));
  }
  return t;
}
function c(e) {
  return e instanceof Headers
    ? e
    : Array.isArray(e) || typeof e == `object`
      ? new Headers(e)
      : null;
}
function l(...e) {
  return e.reduce((e, t) => {
    let n = c(t);
    if (!n) return e;
    for (let [t, r] of n.entries())
      t === `set-cookie` ? s(r).forEach((t) => e.append(`set-cookie`, t)) : e.set(t, r);
    return e;
  }, new Headers());
}
function u(e) {
  return e !== `__proto__` && e !== `constructor` && e !== `prototype`;
}
function d(e, t) {
  let n = Object.create(null);
  if (e) for (let t of Object.keys(e)) u(t) && (n[t] = e[t]);
  if (t && typeof t == `object`) for (let e of Object.keys(t)) u(e) && (n[e] = t[e]);
  return n;
}
function f(e) {
  if (!e) return Object.create(null);
  let t = Object.create(null);
  for (let n of Object.keys(e)) u(n) && (t[n] = e[n]);
  return t;
}
var p = () => {
    throw Error(`createServerOnlyFn() functions can only be called on the server!`);
  },
  m = (e, t) => {
    let n = t || e || {};
    n.method === void 0 && (n.method = `GET`);
    let i = (e) => m(void 0, { ...n, validator: e, inputValidator: e });
    return Object.assign((e) => m(void 0, { ...n, ...e }), {
      options: n,
      middleware: (e) => {
        let t = [...(n.middleware || [])];
        e.map((e) => {
          r in e ? e.options.middleware && t.push(...e.options.middleware) : t.push(e);
        });
        let i = m(void 0, { ...n, middleware: t });
        return ((i[r] = !0), i);
      },
      validator: i,
      inputValidator: i,
      handler: (...e) => {
        let [t, r] = e,
          i = { ...n, extractedFn: t, serverFn: r },
          o = [...(i.middleware || []), v(i)];
        return (
          (t.method = n.method),
          Object.assign(
            async (e) => {
              let n = await h(o, `client`, {
                  ...t,
                  ...i,
                  data: e?.data,
                  headers: e?.headers,
                  signal: e?.signal,
                  fetch: e?.fetch,
                  context: f(),
                }),
                r = a(n.error);
              if (r) throw r;
              if (n.error) throw n.error;
              return n.result;
            },
            {
              ...t,
              method: n.method,
              __executeServer: async (e) => {
                let n = p(),
                  r = n.contextAfterGlobalMiddlewares;
                return await h(o, `server`, {
                  ...t,
                  ...e,
                  serverFnMeta: t.serverFnMeta,
                  context: d(e.context, r),
                  request: n.request,
                }).then((e) => ({ result: e.result, error: e.error, context: e.sendContext }));
              },
            },
          )
        );
      },
    });
  };
async function h(e, t, n) {
  let r = g([...(i()?.functionMiddleware || []), ...e]);
  if (t === `server`) {
    let e = p({ throwIfNotFound: !1 });
    e?.executedRequestMiddlewares && (r = r.filter((t) => !e.executedRequestMiddlewares.has(t)));
  }
  let a = async (e) => {
    let n = r.shift();
    if (!n) return e;
    try {
      let r = `validator` in n.options ? n.options.validator : void 0;
      (!r && `inputValidator` in n.options && (r = n.options.inputValidator),
        r && t === `server` && (e.data = await _(r, e.data)));
      let i;
      if (
        (t === `client`
          ? `client` in n.options && (i = n.options.client)
          : `server` in n.options && (i = n.options.server),
        i)
      ) {
        let t = async (t = {}) => {
            let n = await a({
              ...e,
              ...t,
              context: d(e.context, t.context),
              sendContext: d(e.sendContext, t.sendContext),
              headers: l(e.headers, t.headers),
              _callSiteFetch: e._callSiteFetch,
              fetch: e._callSiteFetch ?? t.fetch ?? e.fetch,
              result: t.result === void 0 ? (t instanceof Response ? t : e.result) : t.result,
              error: t.error ?? e.error,
            });
            if (n.error) throw n.error;
            return n;
          },
          n = await i({ ...e, next: t });
        if (o(n)) return { ...e, error: n };
        if (n instanceof Response) return { ...e, result: n };
        if (!n)
          throw Error(
            `User middleware returned undefined. You must call next() or return a result in your middlewares.`,
          );
        return n;
      }
      return a(e);
    } catch (t) {
      return { ...e, error: t };
    }
  };
  return a({
    ...n,
    headers: n.headers || {},
    sendContext: n.sendContext || {},
    context: n.context || f(),
    _callSiteFetch: n.fetch,
  });
}
function g(e, t = 100) {
  let n = new Set(),
    r = [],
    i = (e, a) => {
      if (a > t)
        throw Error(
          `Middleware nesting depth exceeded maximum of ${t}. Check for circular references.`,
        );
      e.forEach((e) => {
        (e.options.middleware && i(e.options.middleware, a + 1), n.has(e) || (n.add(e), r.push(e)));
      });
    };
  return (i(e, 0), r);
}
async function _(e, t) {
  if (e == null) return {};
  if (`~standard` in e) {
    let n = await e[`~standard`].validate(t);
    if (n.issues) throw Error(JSON.stringify(n.issues, void 0, 2));
    return n.value;
  }
  if (`parse` in e) return e.parse(t);
  if (typeof e == `function`) return e(t);
  throw Error(`Invalid validator type!`);
}
function v(e) {
  return {
    "~types": void 0,
    options: {
      inputValidator: e.validator ?? e.inputValidator,
      client: async ({ next: t, sendContext: n, fetch: r, ...i }) => {
        let a = { ...i, context: n, fetch: r };
        return t(await e.extractedFn?.(a));
      },
      server: async ({ next: t, ...n }) => {
        let r = await e.serverFn?.(n);
        return t({ ...n, result: r });
      },
    },
  };
}
var y = t(`check`, [[`path`, { d: `M20 6 9 17l-5-5`, key: `1gmf2c` }]]),
  b = t(`x`, [
    [`path`, { d: `M18 6 6 18`, key: `1bl5f8` }],
    [`path`, { d: `m6 6 12 12`, key: `d8bk6v` }],
  ]),
  x = m({ method: `GET` }).handler(
    n(`b003252863dd5c71e661fd7fb564c05efa911c027043cf006b8d6e79d9429765`),
  ),
  S = m({ method: `GET` }).handler(
    n(`2ba0a30d231fa2221615fd2370f15ee1ffc959e94eb6db6b75b67b54fc2e46b9`),
  ),
  C = m({ method: `POST` }).handler(
    n(`d846a6db1979ca2a3be6badc82c399723d957576fdf4c47409b44026a886aaf6`),
  ),
  w = m({ method: `POST` }).handler(
    n(`05c1f851fccc17141bace1ce0804041300162ec5081dac7c41edec722eaef5e5`),
  ),
  T = m({ method: `POST` }).handler(
    n(`a418129df8fa7e37a48960e6f429a8984de5a9ca842cb20d524c48ba87425110`),
  ),
  E = e();
function D({ value: e, size: t = `h-4 w-4` }) {
  return (0, E.jsx)(`span`, {
    className: `flex gap-0.5 text-primary`,
    role: `img`,
    "aria-label": `${e} out of 5 stars`,
    children: [1, 2, 3, 4, 5].map((n) =>
      (0, E.jsx)(
        `svg`,
        {
          viewBox: `0 0 24 24`,
          className: `${t} ${n <= e ? `fill-current` : `fill-none stroke-current stroke-[1.5] opacity-40`}`,
          "aria-hidden": `true`,
          children: (0, E.jsx)(`path`, {
            d: `M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z`,
          }),
        },
        n,
      ),
    ),
  });
}
export { w as a, y as c, T as i, S as n, C as o, x as r, b as s, D as t };
