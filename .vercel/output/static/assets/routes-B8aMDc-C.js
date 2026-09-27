import { a as e, n as t, r as n, t as r } from "./createLucideIcon-Cwt3h4uJ.js";
import { c as i, o as a, r as o, s, t as c } from "./TestimonialStars-D52H3YQZ.js";
import {
  _ as l,
  a as u,
  c as d,
  i as f,
  l as p,
  o as m,
  r as h,
  s as g,
  u as _,
} from "./index-CATXV9D_.js";
var v = r(`arrow-down`, [
    [`path`, { d: `M12 5v14`, key: `s699le` }],
    [`path`, { d: `m19 12-7 7-7-7`, key: `1idqje` }],
  ]),
  y = r(`calendar-days`, [
    [`path`, { d: `M8 2v4`, key: `1cmpym` }],
    [`path`, { d: `M16 2v4`, key: `4m81vk` }],
    [`rect`, { width: `18`, height: `18`, x: `3`, y: `4`, rx: `2`, key: `1hopcy` }],
    [`path`, { d: `M3 10h18`, key: `8toen8` }],
    [`path`, { d: `M8 14h.01`, key: `6423bh` }],
    [`path`, { d: `M12 14h.01`, key: `1etili` }],
    [`path`, { d: `M16 14h.01`, key: `1gbofw` }],
    [`path`, { d: `M8 18h.01`, key: `lrp35t` }],
    [`path`, { d: `M12 18h.01`, key: `mhygvu` }],
    [`path`, { d: `M16 18h.01`, key: `kzsmim` }],
  ]),
  b = r(`chevron-down`, [[`path`, { d: `m6 9 6 6 6-6`, key: `qrunsl` }]]),
  x = r(`chevron-up`, [[`path`, { d: `m18 15-6-6-6 6`, key: `153udz` }]]),
  S = r(`instagram`, [
    [`rect`, { width: `20`, height: `20`, x: `2`, y: `2`, rx: `5`, ry: `5`, key: `2e1cvw` }],
    [`path`, { d: `M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z`, key: `9exkf1` }],
    [`line`, { x1: `17.5`, x2: `17.51`, y1: `6.5`, y2: `6.5`, key: `r4j83e` }],
  ]),
  C = r(`menu`, [
    [`path`, { d: `M4 5h16`, key: `1tepv9` }],
    [`path`, { d: `M4 12h16`, key: `1lakjw` }],
    [`path`, { d: `M4 19h16`, key: `1djgab` }],
  ]),
  w = r(`message-circle`, [
    [
      `path`,
      {
        d: `M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719`,
        key: `1sd12s`,
      },
    ],
  ]),
  T = r(`minus`, [[`path`, { d: `M5 12h14`, key: `1ays0h` }]]),
  E = r(`plus`, [
    [`path`, { d: `M5 12h14`, key: `1ays0h` }],
    [`path`, { d: `M12 5v14`, key: `s699le` }],
  ]),
  D = e(n(), 1),
  O = `/assets/white-desert-hero-DBaZIc2U.jpg`,
  k = `/assets/white-desert-camp-BxTq80wx.jpg`,
  A = `/assets/white-desert-forms-DySxsymw.jpg`,
  j = `/assets/black-white-desert-EpEJZ9sb.jpg`,
  M = t(),
  N = Object.defineProperty,
  P = (e, t) => N(e, `name`, { value: t, configurable: !0 });
function ee(e, t) {
  let n = D.createContext(t);
  n.displayName = e + `Context`;
  let r = P((e) => {
    let { children: t, ...r } = e,
      i = D.useMemo(() => r, Object.values(r));
    return (0, M.jsx)(n.Provider, { value: i, children: t });
  }, `Provider`);
  r.displayName = e + `Provider`;
  function i(r, i = {}) {
    let { optional: a = !1 } = i,
      o = D.useContext(n);
    if (o) return o;
    if (t !== void 0) return t;
    if (!a) throw Error(`\`${r}\` must be used within \`${e}\``);
  }
  return (P(i, `useContext`), [r, i]);
}
P(ee, `createContext`);
function F(e, t = []) {
  let n = [];
  function r(t, r) {
    let i = D.createContext(r);
    i.displayName = t + `Context`;
    let a = n.length;
    n = [...n, r];
    let o = P((t) => {
      let { scope: n, children: r, ...o } = t,
        s = n?.[e]?.[a] || i,
        c = D.useMemo(() => o, Object.values(o));
      return (0, M.jsx)(s.Provider, { value: c, children: r });
    }, `Provider`);
    o.displayName = t + `Provider`;
    function s(n, o, s = {}) {
      let { optional: c = !1 } = s,
        l = o?.[e]?.[a] || i,
        u = D.useContext(l);
      if (u) return u;
      if (r !== void 0) return r;
      if (!c) throw Error(`\`${n}\` must be used within \`${t}\``);
    }
    return (P(s, `useContext`), [o, s]);
  }
  P(r, `createContext`);
  let i = P(() => {
    let t = n.map((e) => D.createContext(e));
    return P(function (n) {
      let r = n?.[e] || t;
      return D.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: r } }), [n, r]);
    }, `useScope`);
  }, `createScope`);
  return ((i.scopeName = e), [r, I(i, ...t)]);
}
P(F, `createContextScope`);
function I(...e) {
  let t = e[0];
  if (e.length === 1) return t;
  let n = P(() => {
    let n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
    return P(function (e) {
      let r = n.reduce((t, { useScope: n, scopeName: r }) => {
        let i = n(e)[`__scope${r}`];
        return { ...t, ...i };
      }, {});
      return D.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
    }, `useComposedScopes`);
  }, `createScope`);
  return ((n.scopeName = t.scopeName), n);
}
P(I, `composeContextScopes`);
var L = Object.defineProperty,
  R = (e, t) => L(e, `name`, { value: t, configurable: !0 });
function te(e) {
  let t = e + `CollectionProvider`,
    [n, r] = F(t),
    [i, a] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    o = R((e) => {
      let { scope: t, children: n } = e,
        r = D.useRef(null),
        a = D.useRef(new Map()).current;
      return (0, M.jsx)(i, { scope: t, itemMap: a, collectionRef: r, children: n });
    }, `CollectionProvider`);
  o.displayName = t;
  let s = e + `CollectionSlot`,
    c = m(s),
    l = D.forwardRef((e, t) => {
      let { scope: n, children: r } = e,
        i = a(s, n),
        o = g(t, i.collectionRef);
      return (0, M.jsx)(c, { ref: o, children: r });
    });
  l.displayName = s;
  let u = e + `CollectionItemSlot`,
    d = `data-radix-collection-item`,
    f = m(u),
    p = D.forwardRef((e, t) => {
      let { scope: n, children: r, ...i } = e,
        o = D.useRef(null),
        s = g(t, o),
        c = a(u, n);
      return (
        D.useEffect(() => (c.itemMap.set(o, { ref: o, ...i }), () => void c.itemMap.delete(o))),
        (0, M.jsx)(f, { [d]: ``, ref: s, children: r })
      );
    });
  p.displayName = u;
  function h(t) {
    let n = a(e + `CollectionConsumer`, t);
    return D.useCallback(() => {
      let e = n.collectionRef.current;
      if (!e) return [];
      let t = Array.from(e.querySelectorAll(`[${d}]`));
      return Array.from(n.itemMap.values()).sort(
        (e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current),
      );
    }, [n.collectionRef, n.itemMap]);
  }
  return (R(h, `useCollection`), [{ Provider: o, Slot: l, ItemSlot: p }, h, r]);
}
R(te, `createCollection`);
var ne = new WeakMap(),
  re = class e extends Map {
    static {
      R(this, `OrderedDict`);
    }
    #e;
    constructor(e) {
      (super(e), (this.#e = [...super.keys()]), ne.set(this, !0));
    }
    set(e, t) {
      return (
        ne.get(this) && (this.has(e) ? (this.#e[this.#e.indexOf(e)] = e) : this.#e.push(e)),
        super.set(e, t),
        this
      );
    }
    insert(e, t, n) {
      let r = this.has(t),
        i = this.#e.length,
        a = oe(e),
        o = a >= 0 ? a : i + a,
        s = o < 0 || o >= i ? -1 : o;
      if (s === this.size || (r && s === this.size - 1) || s === -1) return (this.set(t, n), this);
      let c = this.size + +!r;
      a < 0 && o++;
      let l = [...this.#e],
        u,
        d = !1;
      for (let e = o; e < c; e++)
        if (o === e) {
          let i = l[e];
          (l[e] === t && (i = l[e + 1]), r && this.delete(t), (u = this.get(i)), this.set(t, n));
        } else {
          !d && l[e - 1] === t && (d = !0);
          let n = l[d ? e : e - 1],
            r = u;
          ((u = this.get(n)), this.delete(n), this.set(n, r));
        }
      return this;
    }
    with(t, n, r) {
      let i = new e(this);
      return (i.insert(t, n, r), i);
    }
    before(e) {
      let t = this.#e.indexOf(e) - 1;
      if (!(t < 0)) return this.entryAt(t);
    }
    setBefore(e, t, n) {
      let r = this.#e.indexOf(e);
      return r === -1 ? this : this.insert(r, t, n);
    }
    after(e) {
      let t = this.#e.indexOf(e);
      if (((t = t === -1 || t === this.size - 1 ? -1 : t + 1), t !== -1)) return this.entryAt(t);
    }
    setAfter(e, t, n) {
      let r = this.#e.indexOf(e);
      return r === -1 ? this : this.insert(r + 1, t, n);
    }
    first() {
      return this.entryAt(0);
    }
    last() {
      return this.entryAt(-1);
    }
    clear() {
      return ((this.#e = []), super.clear());
    }
    delete(e) {
      let t = super.delete(e);
      return (t && this.#e.splice(this.#e.indexOf(e), 1), t);
    }
    deleteAt(e) {
      let t = this.keyAt(e);
      return t !== void 0 && this.delete(t);
    }
    at(e) {
      let t = ie(this.#e, e);
      if (t !== void 0) return this.get(t);
    }
    entryAt(e) {
      let t = ie(this.#e, e);
      if (t !== void 0) return [t, this.get(t)];
    }
    indexOf(e) {
      return this.#e.indexOf(e);
    }
    keyAt(e) {
      return ie(this.#e, e);
    }
    from(e, t) {
      let n = this.indexOf(e);
      if (n === -1) return;
      let r = n + t;
      return (r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r));
    }
    keyFrom(e, t) {
      let n = this.indexOf(e);
      if (n === -1) return;
      let r = n + t;
      return (r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r));
    }
    find(e, t) {
      let n = 0;
      for (let r of this) {
        if (Reflect.apply(e, t, [r, n, this])) return r;
        n++;
      }
    }
    findIndex(e, t) {
      let n = 0;
      for (let r of this) {
        if (Reflect.apply(e, t, [r, n, this])) return n;
        n++;
      }
      return -1;
    }
    filter(t, n) {
      let r = [],
        i = 0;
      for (let e of this) (Reflect.apply(t, n, [e, i, this]) && r.push(e), i++);
      return new e(r);
    }
    map(t, n) {
      let r = [],
        i = 0;
      for (let e of this) (r.push([e[0], Reflect.apply(t, n, [e, i, this])]), i++);
      return new e(r);
    }
    reduce(...e) {
      let [t, n] = e,
        r = 0,
        i = n ?? this.at(0);
      for (let n of this)
        ((i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [i, n, r, this])), r++);
      return i;
    }
    reduceRight(...e) {
      let [t, n] = e,
        r = n ?? this.at(-1);
      for (let n = this.size - 1; n >= 0; n--) {
        let i = this.at(n);
        r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [r, i, n, this]);
      }
      return r;
    }
    toSorted(t) {
      let n = [...this.entries()].sort(t);
      return new e(n);
    }
    toReversed() {
      let t = new e();
      for (let e = this.size - 1; e >= 0; e--) {
        let n = this.keyAt(e),
          r = this.get(n);
        t.set(n, r);
      }
      return t;
    }
    toSpliced(...t) {
      let n = [...this.entries()];
      return (n.splice(...t), new e(n));
    }
    slice(t, n) {
      let r = new e(),
        i = this.size - 1;
      if (t === void 0) return r;
      (t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1));
      for (let e = t; e <= i; e++) {
        let t = this.keyAt(e),
          n = this.get(t);
        r.set(t, n);
      }
      return r;
    }
    every(e, t) {
      let n = 0;
      for (let r of this) {
        if (!Reflect.apply(e, t, [r, n, this])) return !1;
        n++;
      }
      return !0;
    }
    some(e, t) {
      let n = 0;
      for (let r of this) {
        if (Reflect.apply(e, t, [r, n, this])) return !0;
        n++;
      }
      return !1;
    }
  };
function ie(e, t) {
  if (`at` in Array.prototype) return Array.prototype.at.call(e, t);
  let n = ae(e, t);
  return n === -1 ? void 0 : e[n];
}
R(ie, `at`);
function ae(e, t) {
  let n = e.length,
    r = oe(t),
    i = r >= 0 ? r : n + r;
  return i < 0 || i >= n ? -1 : i;
}
R(ae, `toSafeIndex`);
function oe(e) {
  return e !== e || e === 0 ? 0 : Math.trunc(e);
}
R(oe, `toSafeInteger`);
function se(e) {
  let t = e + `CollectionProvider`,
    [n, r] = F(t),
    [i, a] = n(t, {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new re(),
      setItemMap: R(() => void 0, `setItemMap`),
    }),
    o = R(
      ({ state: e, ...t }) => (e ? (0, M.jsx)(c, { ...t, state: e }) : (0, M.jsx)(s, { ...t })),
      `CollectionProvider`,
    );
  o.displayName = t;
  let s = R((e) => {
    let t = _();
    return (0, M.jsx)(c, { ...e, state: t });
  }, `CollectionInit`);
  s.displayName = t + `Init`;
  let c = R((e) => {
    let { scope: t, children: n, state: r } = e,
      a = D.useRef(null),
      [o, s] = D.useState(null),
      c = g(a, s),
      [l, u] = r;
    return (
      D.useEffect(() => {
        if (!o) return;
        let e = de(() => {});
        return (
          e.observe(o, { childList: !0, subtree: !0 }),
          () => {
            e.disconnect();
          }
        );
      }, [o]),
      (0, M.jsx)(i, {
        scope: t,
        itemMap: l,
        setItemMap: u,
        collectionRef: c,
        collectionRefObject: a,
        collectionElement: o,
        children: n,
      })
    );
  }, `CollectionProviderImpl`);
  c.displayName = t + `Impl`;
  let l = e + `CollectionSlot`,
    u = m(l),
    d = D.forwardRef((e, t) => {
      let { scope: n, children: r } = e,
        i = a(l, n),
        o = g(t, i.collectionRef);
      return (0, M.jsx)(u, { ref: o, children: r });
    });
  d.displayName = l;
  let f = e + `CollectionItemSlot`,
    p = m(f),
    h = D.forwardRef((e, t) => {
      let { scope: n, children: r, ...i } = e,
        o = D.useRef(null),
        [s, c] = D.useState(null),
        l = g(t, o, c),
        { setItemMap: u } = a(f, n),
        d = D.useRef(i);
      ce(d.current, i) || (d.current = i);
      let m = d.current;
      return (
        D.useEffect(() => {
          let e = m;
          return (
            u((t) =>
              s
                ? t.has(s)
                  ? t.set(s, { ...e, element: s }).toSorted(ue)
                  : (t.set(s, { ...e, element: s }), t.toSorted(ue))
                : t,
            ),
            () => {
              u((e) => (!s || !e.has(s) ? e : (e.delete(s), new re(e))));
            }
          );
        }, [s, m, u]),
        (0, M.jsx)(p, { "data-radix-collection-item": ``, ref: l, children: r })
      );
    });
  h.displayName = f;
  function _() {
    return D.useState(new re());
  }
  R(_, `useInitCollection`);
  function v(t) {
    let { itemMap: n } = a(e + `CollectionConsumer`, t);
    return n;
  }
  return (
    R(v, `useCollection`),
    [
      { Provider: o, Slot: d, ItemSlot: h },
      { createCollectionScope: r, useCollection: v, useInitCollection: _ },
    ]
  );
}
R(se, `createCollection`);
function ce(e, t) {
  if (e === t) return !0;
  if (typeof e != `object` || typeof t != `object` || e == null || t == null) return !1;
  let n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
  return !0;
}
R(ce, `shallowEqual`);
function le(e, t) {
  return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
R(le, `isElementPreceding`);
function ue(e, t) {
  return !e[1].element || !t[1].element ? 0 : le(e[1].element, t[1].element) ? -1 : 1;
}
R(ue, `sortByDocumentPosition`);
function de(e) {
  return new MutationObserver((t) => {
    for (let n of t)
      if (n.type === `childList`) {
        e();
        return;
      }
  });
}
R(de, `getChildListObserver`);
var fe = Object.defineProperty,
  pe = (e, t) => fe(e, `name`, { value: t, configurable: !0 }),
  me = !!(typeof window < `u` && window.document && window.document.createElement);
function z(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return pe(function (r) {
    if ((e?.(r), n === !1 || !r || !r.defaultPrevented)) return t?.(r);
  }, `handleEvent`);
}
pe(z, `composeEventHandlers`);
function he(e) {
  if (!me) throw Error(`Cannot access window outside of the DOM`);
  return e?.ownerDocument?.defaultView ?? window;
}
pe(he, `getOwnerWindow`);
function ge(e) {
  if (!me) throw Error(`Cannot access document outside of the DOM`);
  return e?.ownerDocument ?? document;
}
pe(ge, `getOwnerDocument`);
function _e(e, t = !1) {
  let { activeElement: n } = ge(e);
  if (!n?.nodeName) return null;
  if (ve(n) && n.contentDocument) return _e(n.contentDocument.body, t);
  if (t) {
    let e = n.getAttribute(`aria-activedescendant`);
    if (e) {
      let t = ge(n).getElementById(e);
      if (t) return t;
    }
  }
  return n;
}
pe(_e, `getActiveElement`);
function ve(e) {
  return e.tagName === `IFRAME`;
}
pe(ve, `isFrame`);
var B = globalThis?.document ? D.useLayoutEffect : () => {},
  ye = Object.defineProperty,
  be = (e, t) => ye(e, `name`, { value: t, configurable: !0 }),
  xe = D.useEffectEvent,
  Se = D.useInsertionEffect;
function Ce(e) {
  if (typeof xe == `function`) return xe(e);
  let t = D.useRef(() => {
    throw Error(`Cannot call an event handler while rendering.`);
  });
  return (
    typeof Se == `function`
      ? Se(() => {
          t.current = e;
        })
      : B(() => {
          t.current = e;
        }),
    D.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
be(Ce, `useEffectEvent`);
var we = Object.defineProperty,
  Te = (e, t) => we(e, `name`, { value: t, configurable: !0 }),
  Ee = D.useInsertionEffect || B;
function De({ prop: e, defaultProp: t, onChange: n = Te(() => {}, `onChange`), caller: r }) {
  let [i, a, o] = Oe({ defaultProp: t, onChange: n }),
    s = e !== void 0;
  return [
    s ? e : i,
    D.useCallback(
      (t) => {
        if (s) {
          let n = ke(t) ? t(e) : t;
          n !== e && o.current?.(n);
        } else a(t);
      },
      [s, e, a, o],
    ),
  ];
}
Te(De, `useControllableState`);
function Oe({ defaultProp: e, onChange: t }) {
  let [n, r] = D.useState(e),
    i = D.useRef(n),
    a = D.useRef(t);
  return (
    Ee(() => {
      a.current = t;
    }, [t]),
    D.useEffect(() => {
      i.current !== n && (a.current?.(n), (i.current = n));
    }, [n, i]),
    [n, r, a]
  );
}
Te(Oe, `useUncontrolledState`);
function ke(e) {
  return typeof e == `function`;
}
Te(ke, `isFunction`);
var Ae = Symbol(`RADIX:SYNC_STATE`);
function je(e, t, n, r) {
  let { prop: i, defaultProp: a, onChange: o, caller: s } = t,
    c = i !== void 0,
    l = Ce(o),
    u = [{ ...n, state: a }];
  r && u.push(r);
  let [d, f] = D.useReducer(
      (t, n) => {
        if (n.type === Ae) return { ...t, state: n.state };
        let r = e(t, n);
        return (c && !Object.is(r.state, t.state) && l(r.state), r);
      },
      ...u,
    ),
    p = d.state,
    m = D.useRef(p);
  D.useEffect(() => {
    m.current !== p && ((m.current = p), c || l(p));
  }, [p, m, c]);
  let h = D.useMemo(() => (i === void 0 ? d : { ...d, state: i }), [d, i]);
  return (
    D.useEffect(() => {
      c && !Object.is(i, d.state) && f({ type: Ae, state: i });
    }, [i, d.state, c]),
    [h, f]
  );
}
Te(je, `useControllableStateReducer`);
var Me = e(l(), 1),
  Ne = Object.defineProperty,
  Pe = (e, t) => Ne(e, `name`, { value: t, configurable: !0 }),
  V = [
    `a`,
    `button`,
    `div`,
    `form`,
    `h2`,
    `h3`,
    `img`,
    `input`,
    `label`,
    `li`,
    `nav`,
    `ol`,
    `p`,
    `select`,
    `span`,
    `svg`,
    `ul`,
  ].reduce((e, t) => {
    let n = m(`Primitive.${t}`),
      r = D.forwardRef((e, r) => {
        let { asChild: i, ...a } = e,
          o = i ? n : t;
        return (
          typeof window < `u` && (window[Symbol.for(`radix-ui`)] = !0),
          (0, M.jsx)(o, { ...a, ref: r })
        );
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function Fe(e, t) {
  e && Me.flushSync(() => e.dispatchEvent(t));
}
Pe(Fe, `dispatchDiscreteCustomEvent`);
var Ie = Object.defineProperty,
  Le = (e, t) => Ie(e, `name`, { value: t, configurable: !0 });
function Re(e, t) {
  return D.useReducer((e, n) => t[e][n] ?? e, e);
}
Le(Re, `useStateMachine`);
var ze = Le((e) => {
  let { present: t, children: n } = e,
    r = Be(t),
    i = typeof n == `function` ? n({ present: r.isPresent }) : D.Children.only(n),
    a = He(r.ref, We(i));
  return typeof n == `function` || r.isPresent ? D.cloneElement(i, { ref: a }) : null;
}, `Presence`);
function Be(e) {
  let [t, n] = D.useState(),
    r = D.useRef(null),
    i = D.useRef(e),
    a = D.useRef(`none`),
    o = D.useRef(void 0),
    [s, c] = Re(e ? `mounted` : `unmounted`, {
      mounted: { UNMOUNT: `unmounted`, ANIMATION_OUT: `unmountSuspended` },
      unmountSuspended: { MOUNT: `mounted`, ANIMATION_END: `unmounted` },
      unmounted: { MOUNT: `mounted` },
    });
  return (
    D.useEffect(() => {
      s === `mounted`
        ? ((a.current = o.current ?? Ue(r.current)), (o.current = void 0))
        : (a.current = `none`);
    }, [s]),
    B(() => {
      let t = r.current,
        n = i.current;
      if (n !== e) {
        let r = a.current,
          s = Ue(t);
        (e
          ? ((o.current = s), c(`MOUNT`))
          : s === `none` || t?.display === `none`
            ? c(`UNMOUNT`)
            : c(n && r !== s ? `ANIMATION_OUT` : `UNMOUNT`),
          (i.current = e));
      }
    }, [e, c]),
    B(() => {
      if (t) {
        let e,
          n = t.ownerDocument.defaultView ?? window,
          o = Le((a) => {
            let o = Ue(r.current).includes(CSS.escape(a.animationName));
            if (a.target === t && o && (c(`ANIMATION_END`), !i.current)) {
              let r = t.style.animationFillMode;
              ((t.style.animationFillMode = `forwards`),
                (e = n.setTimeout(() => {
                  t.style.animationFillMode === `forwards` && (t.style.animationFillMode = r);
                })));
            }
          }, `handleAnimationEnd`),
          s = Le((e) => {
            e.target === t && (a.current = Ue(r.current));
          }, `handleAnimationStart`);
        return (
          t.addEventListener(`animationstart`, s),
          t.addEventListener(`animationcancel`, o),
          t.addEventListener(`animationend`, o),
          () => {
            (n.clearTimeout(e),
              t.removeEventListener(`animationstart`, s),
              t.removeEventListener(`animationcancel`, o),
              t.removeEventListener(`animationend`, o));
          }
        );
      }
      c(`ANIMATION_END`);
    }, [t, c]),
    {
      isPresent: [`mounted`, `unmountSuspended`].includes(s),
      ref: D.useCallback((e) => {
        if (e) {
          let t = getComputedStyle(e);
          ((r.current = t), (o.current = Ue(t)));
        } else r.current = null;
        n(e);
      }, []),
    }
  );
}
Le(Be, `usePresence`);
function Ve(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
Le(Ve, `setRef`);
function He(...e) {
  let t = D.useRef(e);
  return (
    (t.current = e),
    D.useCallback((e) => {
      let n = t.current,
        r = !1,
        i = n.map((t) => {
          let n = Ve(t, e);
          return (!r && typeof n == `function` && (r = !0), n);
        });
      if (r)
        return () => {
          for (let e = 0; e < i.length; e++) {
            let t = i[e];
            typeof t == `function` ? t() : Ve(n[e], null);
          }
        };
    }, [])
  );
}
Le(He, `useStableComposedRefs`);
function Ue(e) {
  return e?.animationName || `none`;
}
Le(Ue, `getAnimationName`);
function We(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
Le(We, `getElementRef`);
var Ge = Object.defineProperty,
  Ke = (e, t) => Ge(e, `name`, { value: t, configurable: !0 }),
  qe = D.useId || (() => void 0),
  Je = 0;
function Ye(e) {
  let [t, n] = D.useState(qe());
  return (
    B(() => {
      e || n((e) => e ?? String(Je++));
    }, [e]),
    e || (t ? `radix-${t}` : ``)
  );
}
Ke(Ye, `useId`);
var Xe = Object.defineProperty,
  Ze = (e, t) => Xe(e, `name`, { value: t, configurable: !0 }),
  Qe = `Collapsible`,
  [$e, et] = F(Qe),
  [tt, nt] = $e(Qe),
  rt = D.forwardRef(
    Ze(function (e, t) {
      let {
          __scopeCollapsible: n,
          open: r,
          defaultOpen: i,
          disabled: a,
          onOpenChange: o,
          ...s
        } = e,
        [c, l] = De({ prop: r, defaultProp: i ?? !1, onChange: o, caller: Qe });
      return (0, M.jsx)(tt, {
        scope: n,
        disabled: a,
        contentId: Ye(),
        open: c,
        onOpenToggle: D.useCallback(() => l((e) => !e), [l]),
        children: (0, M.jsx)(V.div, {
          "data-state": lt(c),
          "data-disabled": a ? `` : void 0,
          ...s,
          ref: t,
        }),
      });
    }, `Collapsible`),
  ),
  it = `CollapsibleTrigger`,
  at = D.forwardRef(
    Ze(function (e, t) {
      let { __scopeCollapsible: n, ...r } = e,
        i = nt(it, n);
      return (0, M.jsx)(V.button, {
        type: `button`,
        "aria-controls": i.open ? i.contentId : void 0,
        "aria-expanded": i.open || !1,
        "data-state": lt(i.open),
        "data-disabled": i.disabled ? `` : void 0,
        disabled: i.disabled,
        ...r,
        ref: t,
        onClick: z(e.onClick, i.onOpenToggle),
      });
    }, `CollapsibleTrigger`),
  ),
  ot = `CollapsibleContent`,
  st = D.forwardRef(
    Ze(function (e, t) {
      let { forceMount: n, ...r } = e,
        i = nt(ot, e.__scopeCollapsible);
      return (0, M.jsx)(ze, {
        present: n || i.open,
        children: ({ present: e }) => (0, M.jsx)(ct, { ...r, ref: t, present: e }),
      });
    }, `CollapsibleContent`),
  ),
  ct = D.forwardRef(
    Ze(function (e, t) {
      let { __scopeCollapsible: n, present: r, children: i, ...a } = e,
        o = nt(ot, n),
        [s, c] = D.useState(r),
        l = D.useRef(null),
        u = g(t, l),
        d = D.useRef(0),
        f = d.current,
        p = D.useRef(0),
        m = p.current,
        h = o.open || s,
        _ = D.useRef(h),
        v = D.useRef(void 0);
      return (
        D.useEffect(() => {
          let e = requestAnimationFrame(() => (_.current = !1));
          return () => cancelAnimationFrame(e);
        }, []),
        B(() => {
          let e = l.current;
          if (e) {
            ((v.current = v.current || {
              transitionDuration: e.style.transitionDuration,
              animationName: e.style.animationName,
            }),
              (e.style.transitionDuration = `0s`),
              (e.style.animationName = `none`));
            let t = e.getBoundingClientRect();
            ((d.current = t.height),
              (p.current = t.width),
              _.current ||
                ((e.style.transitionDuration = v.current.transitionDuration),
                (e.style.animationName = v.current.animationName)),
              c(r));
          }
        }, [o.open, r]),
        (0, M.jsx)(V.div, {
          "data-state": lt(o.open),
          "data-disabled": o.disabled ? `` : void 0,
          id: o.contentId,
          hidden: !h,
          ...a,
          ref: u,
          style: {
            "--radix-collapsible-content-height": f ? `${f}px` : void 0,
            "--radix-collapsible-content-width": m ? `${m}px` : void 0,
            ...e.style,
          },
          children: h && i,
        })
      );
    }, `CollapsibleContentImpl`),
  );
function lt(e) {
  return e ? `open` : `closed`;
}
Ze(lt, `getState`);
var ut = rt,
  dt = at,
  ft = st,
  pt = Object.defineProperty,
  mt = (e, t) => pt(e, `name`, { value: t, configurable: !0 }),
  ht = D.createContext(void 0);
function gt(e) {
  let t = D.useContext(ht);
  return e || t || `ltr`;
}
mt(gt, `useDirection`);
var _t = Object.defineProperty,
  H = (e, t) => _t(e, `name`, { value: t, configurable: !0 }),
  U = `Accordion`,
  vt = [`Home`, `End`, `ArrowDown`, `ArrowUp`, `ArrowLeft`, `ArrowRight`],
  [yt, bt, xt] = te(U),
  [St, Ct] = F(U, [xt, et]),
  wt = et(),
  Tt = D.forwardRef(
    H(function (e, t) {
      let { type: n, ...r } = e,
        i = r,
        a = r;
      return (0, M.jsx)(yt.Provider, {
        scope: e.__scopeAccordion,
        children:
          n === `multiple` ? (0, M.jsx)(jt, { ...a, ref: t }) : (0, M.jsx)(At, { ...i, ref: t }),
      });
    }, `Accordion`),
  ),
  [Et, Dt] = St(U),
  [Ot, kt] = St(U, { collapsible: !1 }),
  At = D.forwardRef(
    H(function (e, t) {
      let {
          value: n,
          defaultValue: r,
          onValueChange: i = H(() => {}, `onValueChange`),
          collapsible: a = !1,
          ...o
        } = e,
        [s, c] = De({ prop: n, defaultProp: r ?? ``, onChange: i, caller: U });
      return (0, M.jsx)(Et, {
        scope: e.__scopeAccordion,
        value: D.useMemo(() => (s ? [s] : []), [s]),
        onItemOpen: c,
        onItemClose: D.useCallback(() => a && c(``), [a, c]),
        children: (0, M.jsx)(Ot, {
          scope: e.__scopeAccordion,
          collapsible: a,
          children: (0, M.jsx)(Pt, { ...o, ref: t }),
        }),
      });
    }, `AccordionImplSingle`),
  ),
  jt = D.forwardRef(
    H(function (e, t) {
      let { value: n, defaultValue: r, onValueChange: i = H(() => {}, `onValueChange`), ...a } = e,
        [o, s] = De({ prop: n, defaultProp: r ?? [], onChange: i, caller: U }),
        c = D.useCallback((e) => s((t = []) => [...t, e]), [s]),
        l = D.useCallback((e) => s((t = []) => t.filter((t) => t !== e)), [s]);
      return (0, M.jsx)(Et, {
        scope: e.__scopeAccordion,
        value: o,
        onItemOpen: c,
        onItemClose: l,
        children: (0, M.jsx)(Ot, {
          scope: e.__scopeAccordion,
          collapsible: !0,
          children: (0, M.jsx)(Pt, { ...a, ref: t }),
        }),
      });
    }, `AccordionImplMultiple`),
  ),
  [Mt, Nt] = St(U),
  Pt = D.forwardRef(
    H(function (e, t) {
      let { __scopeAccordion: n, disabled: r, dir: i, orientation: a = `vertical`, ...o } = e,
        s = D.useRef(null),
        c = g(s, t),
        l = bt(n),
        u = gt(i) === `ltr`,
        d = z(e.onKeyDown, (e) => {
          if (!vt.includes(e.key)) return;
          let t = e.target,
            n = l().filter((e) => !e.ref.current?.disabled),
            r = n.findIndex((e) => e.ref.current === t),
            i = n.length;
          if (r === -1) return;
          e.preventDefault();
          let o = r,
            s = i - 1,
            c = H(() => {
              ((o = r + 1), o > s && (o = 0));
            }, `moveNext`),
            d = H(() => {
              ((o = r - 1), o < 0 && (o = s));
            }, `movePrev`);
          switch (e.key) {
            case `Home`:
              o = 0;
              break;
            case `End`:
              o = s;
              break;
            case `ArrowRight`:
              a === `horizontal` && (u ? c() : d());
              break;
            case `ArrowDown`:
              a === `vertical` && c();
              break;
            case `ArrowLeft`:
              a === `horizontal` && (u ? d() : c());
              break;
            case `ArrowUp`:
              a === `vertical` && d();
          }
          n[o % i].ref.current?.focus();
        });
      return (0, M.jsx)(Mt, {
        scope: n,
        disabled: r,
        direction: i,
        orientation: a,
        children: (0, M.jsx)(yt.Slot, {
          scope: n,
          children: (0, M.jsx)(V.div, {
            ...o,
            "data-orientation": a,
            ref: c,
            onKeyDown: r ? void 0 : d,
          }),
        }),
      });
    }, `AccordionImpl`),
  ),
  Ft = `AccordionItem`,
  [It, Lt] = St(Ft),
  Rt = D.forwardRef(
    H(function (e, t) {
      let { __scopeAccordion: n, value: r, ...i } = e,
        a = Nt(Ft, n),
        o = Dt(Ft, n),
        s = wt(n),
        c = Ye(),
        l = (r && o.value.includes(r)) || !1,
        u = a.disabled || e.disabled;
      return (0, M.jsx)(It, {
        scope: n,
        open: l,
        disabled: u,
        triggerId: c,
        children: (0, M.jsx)(ut, {
          "data-orientation": a.orientation,
          "data-state": Gt(l),
          ...s,
          ...i,
          ref: t,
          disabled: u,
          open: l,
          onOpenChange: (e) => {
            e ? o.onItemOpen(r) : o.onItemClose(r);
          },
        }),
      });
    }, `AccordionItem`),
  ),
  zt = `AccordionHeader`,
  Bt = D.forwardRef(
    H(function (e, t) {
      let { __scopeAccordion: n, ...r } = e,
        i = Nt(U, n),
        a = Lt(zt, n);
      return (0, M.jsx)(V.h3, {
        "data-orientation": i.orientation,
        "data-state": Gt(a.open),
        "data-disabled": a.disabled ? `` : void 0,
        ...r,
        ref: t,
      });
    }, `AccordionHeader`),
  ),
  Vt = `AccordionTrigger`,
  Ht = D.forwardRef(
    H(function (e, t) {
      let { __scopeAccordion: n, ...r } = e,
        i = Nt(U, n),
        a = Lt(Vt, n),
        o = kt(Vt, n),
        s = wt(n);
      return (0, M.jsx)(yt.ItemSlot, {
        scope: n,
        children: (0, M.jsx)(dt, {
          "aria-disabled": (a.open && !o.collapsible) || void 0,
          "data-orientation": i.orientation,
          id: a.triggerId,
          ...s,
          ...r,
          ref: t,
        }),
      });
    }, `AccordionTrigger`),
  ),
  Ut = `AccordionContent`,
  Wt = D.forwardRef(
    H(function (e, t) {
      let { __scopeAccordion: n, ...r } = e,
        i = Nt(U, n),
        a = Lt(Ut, n),
        o = wt(n);
      return (0, M.jsx)(ft, {
        role: `region`,
        "aria-labelledby": a.triggerId,
        "data-orientation": i.orientation,
        ...o,
        ...r,
        ref: t,
        style: {
          "--radix-accordion-content-height": `var(--radix-collapsible-content-height)`,
          "--radix-accordion-content-width": `var(--radix-collapsible-content-width)`,
          ...e.style,
        },
      });
    }, `AccordionContent`),
  );
function Gt(e) {
  return e ? `open` : `closed`;
}
H(Gt, `getState`);
var Kt = Tt,
  qt = Rt,
  Jt = Bt,
  Yt = Ht,
  Xt = Wt,
  Zt = Kt,
  Qt = D.forwardRef(({ className: e, ...t }, n) =>
    (0, M.jsx)(qt, { ref: n, className: f(`border-b`, e), ...t }),
  );
Qt.displayName = `AccordionItem`;
var $t = D.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, M.jsx)(Jt, {
    className: `flex`,
    children: (0, M.jsxs)(Yt, {
      ref: r,
      className: f(
        `flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180`,
        e,
      ),
      ...n,
      children: [
        t,
        (0, M.jsx)(b, {
          className: `h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200`,
        }),
      ],
    }),
  }),
);
$t.displayName = Yt.displayName;
var en = D.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, M.jsx)(Xt, {
    ref: r,
    className: `overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down`,
    ...n,
    children: (0, M.jsx)(`div`, { className: f(`pb-4 pt-0`, e), children: t }),
  }),
);
en.displayName = Xt.displayName;
var tn = D.forwardRef(({ className: e, type: t, ...n }, r) =>
  (0, M.jsx)(`input`, {
    type: t,
    className: f(
      `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
      e,
    ),
    ref: r,
    ...n,
  }),
);
tn.displayName = `Input`;
var nn = Object.defineProperty,
  rn = D.forwardRef(
    ((e, t) => nn(e, `name`, { value: t, configurable: !0 }))(function (e, t) {
      return (0, M.jsx)(V.label, {
        ...e,
        ref: t,
        onMouseDown: (t) => {
          t.target.closest(`button, input, select, textarea`) ||
            (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
        },
      });
    }, `Label`),
  ),
  an = u(
    `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
  ),
  on = D.forwardRef(({ className: e, ...t }, n) =>
    (0, M.jsx)(rn, { ref: n, className: f(an(), e), ...t }),
  );
on.displayName = rn.displayName;
var sn = Object.defineProperty,
  cn = (e, t) => sn(e, `name`, { value: t, configurable: !0 });
function ln(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
cn(ln, `clamp`);
var un = Object.defineProperty,
  dn = (e, t) => un(e, `name`, { value: t, configurable: !0 });
function W(e) {
  let t = D.useRef(e);
  return (
    D.useEffect(() => {
      t.current = e;
    }),
    D.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
dn(W, `useCallbackRef`);
var fn = Object.defineProperty,
  G = (e, t) => fn(e, `name`, { value: t, configurable: !0 }),
  pn = `dismissableLayer.update`,
  mn = `dismissableLayer.pointerDownOutside`,
  hn = `dismissableLayer.focusOutside`,
  gn,
  _n = D.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
    dismissableSurfaces: new Set(),
  }),
  vn = D.forwardRef(
    G(function (e, t) {
      let {
          disableOutsidePointerEvents: n = !1,
          deferPointerDownOutside: r = !1,
          onEscapeKeyDown: i,
          onPointerDownOutside: a,
          onFocusOutside: o,
          onInteractOutside: s,
          onDismiss: c,
          ...l
        } = e,
        u = D.useContext(_n),
        [d, f] = D.useState(null),
        p = d?.ownerDocument ?? globalThis?.document,
        [, m] = D.useState({}),
        h = g(t, f),
        _ = Array.from(u.layers),
        [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
        y = v ? _.indexOf(v) : -1,
        b = d ? _.indexOf(d) : -1,
        x = u.layersWithOutsidePointerEventsDisabled.size > 0,
        S = b >= y,
        C = D.useRef(!1),
        w = xn(
          (e) => {
            (a?.(e), s?.(e), e.defaultPrevented || c?.());
          },
          {
            ownerDocument: p,
            deferPointerDownOutside: r,
            isDeferredPointerDownOutsideRef: C,
            dismissableSurfaces: u.dismissableSurfaces,
            shouldHandlePointerDownOutside: D.useCallback(
              (e) => {
                if (!(e instanceof Node)) return !1;
                let t = [...u.branches].some((t) => t.contains(e));
                return S && !t;
              },
              [u.branches, S],
            ),
          },
        ),
        T = Sn((e) => {
          if (r && C.current) return;
          let t = e.target;
          [...u.branches].some((e) => e.contains(t)) ||
            (o?.(e), s?.(e), e.defaultPrevented || c?.());
        }, p),
        E = d ? b === _.length - 1 : !1,
        O = W((e) => {
          e.key === `Escape` && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
        });
      return (
        D.useEffect(() => {
          if (E)
            return (
              p.addEventListener(`keydown`, O, { capture: !0 }),
              () => p.removeEventListener(`keydown`, O, { capture: !0 })
            );
        }, [p, E, O]),
        D.useEffect(() => {
          if (d)
            return (
              n &&
                (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                  ((gn = p.body.style.pointerEvents), (p.body.style.pointerEvents = `none`)),
                u.layersWithOutsidePointerEventsDisabled.add(d)),
              u.layers.add(d),
              Cn(),
              () => {
                n &&
                  (u.layersWithOutsidePointerEventsDisabled.delete(d),
                  u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                    (p.body.style.pointerEvents = gn));
              }
            );
        }, [d, p, n, u]),
        D.useEffect(
          () => () => {
            d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Cn());
          },
          [d, u],
        ),
        D.useEffect(() => {
          let e = G(() => m({}), `handleUpdate`);
          return (document.addEventListener(pn, e), () => document.removeEventListener(pn, e));
        }, []),
        (0, M.jsx)(V.div, {
          ...l,
          ref: h,
          style: { pointerEvents: x ? (S ? `auto` : `none`) : void 0, ...e.style },
          onFocusCapture: z(e.onFocusCapture, T.onFocusCapture),
          onBlurCapture: z(e.onBlurCapture, T.onBlurCapture),
          onPointerDownCapture: z(e.onPointerDownCapture, w.onPointerDownCapture),
        })
      );
    }, `DismissableLayer`),
  );
function yn() {
  let e = D.useContext(_n),
    [t, n] = D.useState(null);
  return (
    D.useEffect(() => {
      if (t)
        return (
          e.dismissableSurfaces.add(t),
          () => {
            e.dismissableSurfaces.delete(t);
          }
        );
    }, [t, e.dismissableSurfaces]),
    n
  );
}
G(yn, `useDismissableLayerSurface`);
var bn = G(() => !0, `IS_TRUE`);
function xn(e, t) {
  let {
      ownerDocument: n = globalThis?.document,
      deferPointerDownOutside: r = !1,
      isDeferredPointerDownOutsideRef: i,
      dismissableSurfaces: a,
      shouldHandlePointerDownOutside: o = bn,
    } = t,
    s = W(e),
    c = D.useRef(!1),
    l = D.useRef(!1),
    u = D.useRef(new Map()),
    d = D.useRef(() => {});
  return (
    D.useEffect(() => {
      function e() {
        ((l.current = !1), (i.current = !1), u.current.clear());
      }
      G(e, `resetOutsideInteraction`);
      function t() {
        return Array.from(u.current.values()).some(Boolean);
      }
      G(t, `isOutsideInteractionIntercepted`);
      function f(e) {
        if (!l.current) return;
        let t = e.target;
        ((t instanceof Node && [...a].some((e) => e.contains(t))) || u.current.set(e.type, !0),
          e.type === `click` &&
            window.setTimeout(() => {
              l.current && d.current();
            }, 0));
      }
      G(f, `handleInteractionCapture`);
      function p(e) {
        l.current && u.current.set(e.type, !1);
      }
      G(p, `handleInteractionBubble`);
      let m = G((a) => {
          if (a.target && !c.current) {
            let f = function () {
              n.removeEventListener(`click`, d.current);
              let r = t();
              (e(), r || wn(mn, s, p, { discrete: !0 }));
            };
            if ((G(f, `handleAndDispatchPointerDownOutsideEvent`), !o(a.target))) {
              (n.removeEventListener(`click`, d.current), e(), (c.current = !1));
              return;
            }
            let p = { originalEvent: a };
            ((l.current = !0),
              (i.current = r && a.button === 0),
              u.current.clear(),
              !r || a.button !== 0
                ? f()
                : (n.removeEventListener(`click`, d.current),
                  (d.current = f),
                  n.addEventListener(`click`, d.current, { once: !0 })));
          } else (n.removeEventListener(`click`, d.current), e());
          c.current = !1;
        }, `handlePointerDown`),
        h = [`pointerup`, `mousedown`, `mouseup`, `touchstart`, `touchend`, `click`];
      for (let e of h) (n.addEventListener(e, f, !0), n.addEventListener(e, p));
      let g = window.setTimeout(() => {
        n.addEventListener(`pointerdown`, m);
      }, 0);
      return () => {
        (window.clearTimeout(g),
          n.removeEventListener(`pointerdown`, m),
          n.removeEventListener(`click`, d.current));
        for (let e of h) (n.removeEventListener(e, f, !0), n.removeEventListener(e, p));
      };
    }, [n, s, r, i, a, o]),
    { onPointerDownCapture: G(() => (c.current = !0), `onPointerDownCapture`) }
  );
}
G(xn, `usePointerDownOutside`);
function Sn(e, t = globalThis?.document) {
  let n = W(e),
    r = D.useRef(!1);
  return (
    D.useEffect(() => {
      let e = G((e) => {
        e.target && !r.current && wn(hn, n, { originalEvent: e }, { discrete: !1 });
      }, `handleFocus`);
      return (t.addEventListener(`focusin`, e), () => t.removeEventListener(`focusin`, e));
    }, [t, n]),
    {
      onFocusCapture: G(() => (r.current = !0), `onFocusCapture`),
      onBlurCapture: G(() => (r.current = !1), `onBlurCapture`),
    }
  );
}
G(Sn, `useFocusOutside`);
function Cn() {
  let e = new CustomEvent(pn);
  document.dispatchEvent(e);
}
G(Cn, `dispatchUpdate`);
function wn(e, t, n, { discrete: r }) {
  let i = n.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && i.addEventListener(e, t, { once: !0 }), r ? Fe(i, a) : i.dispatchEvent(a));
}
G(wn, `handleAndDispatchCustomEvent`);
var Tn = Object.defineProperty,
  En = (e, t) => Tn(e, `name`, { value: t, configurable: !0 }),
  Dn = 0,
  On = null;
function kn(e) {
  return (An(), e.children);
}
En(kn, `FocusGuards`);
function An() {
  D.useEffect(() => {
    On ||= { start: jn(), end: jn() };
    let { start: e, end: t } = On;
    return (
      document.body.firstElementChild !== e && document.body.insertAdjacentElement(`afterbegin`, e),
      document.body.lastElementChild !== t && document.body.insertAdjacentElement(`beforeend`, t),
      Dn++,
      () => {
        (Dn === 1 && (On?.start.remove(), On?.end.remove(), (On = null)),
          (Dn = Math.max(0, Dn - 1)));
      }
    );
  }, []);
}
En(An, `useFocusGuards`);
function jn() {
  let e = document.createElement(`span`);
  return (
    e.setAttribute(`data-radix-focus-guard`, ``),
    (e.tabIndex = 0),
    (e.style.outline = `none`),
    (e.style.opacity = `0`),
    (e.style.position = `fixed`),
    (e.style.pointerEvents = `none`),
    e
  );
}
En(jn, `createFocusGuard`);
var Mn = Object.defineProperty,
  K = (e, t) => Mn(e, `name`, { value: t, configurable: !0 }),
  Nn = `focusScope.autoFocusOnMount`,
  Pn = `focusScope.autoFocusOnUnmount`,
  Fn = { bubbles: !1, cancelable: !0 },
  In = D.forwardRef(
    K(function (e, t) {
      let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e,
        [s, c] = D.useState(null),
        l = W(i),
        u = W(a),
        d = D.useRef(null),
        f = g(t, c),
        p = D.useRef({
          paused: !1,
          pause() {
            this.paused = !0;
          },
          resume() {
            this.paused = !1;
          },
        }).current;
      (D.useEffect(() => {
        if (r) {
          let e = function (e) {
              if (p.paused || !s) return;
              let t = e.target;
              s.contains(t) ? (d.current = t) : Un(d.current, { select: !0 });
            },
            t = function (e) {
              if (p.paused || !s) return;
              let t = e.relatedTarget;
              t !== null && (s.contains(t) || Un(d.current, { select: !0 }));
            },
            n = function (e) {
              if (document.activeElement === document.body)
                for (let t of e) t.removedNodes.length > 0 && Un(s);
            };
          (K(e, `handleFocusIn`),
            K(t, `handleFocusOut`),
            K(n, `handleMutations`),
            document.addEventListener(`focusin`, e),
            document.addEventListener(`focusout`, t));
          let r = new MutationObserver(n);
          return (
            s && r.observe(s, { childList: !0, subtree: !0 }),
            () => {
              (document.removeEventListener(`focusin`, e),
                document.removeEventListener(`focusout`, t),
                r.disconnect());
            }
          );
        }
      }, [r, s, p.paused]),
        D.useEffect(() => {
          if (s) {
            Wn.add(p);
            let e = document.activeElement;
            if (!s.contains(e)) {
              let t = new CustomEvent(Nn, Fn);
              (s.addEventListener(Nn, l),
                s.dispatchEvent(t),
                t.defaultPrevented ||
                  (Ln(qn(zn(s)), { select: !0 }), document.activeElement === e && Un(s)));
            }
            return () => {
              (s.removeEventListener(Nn, l),
                setTimeout(() => {
                  let t = new CustomEvent(Pn, Fn);
                  (s.addEventListener(Pn, u),
                    s.dispatchEvent(t),
                    t.defaultPrevented || Un(e ?? document.body, { select: !0 }),
                    s.removeEventListener(Pn, u),
                    Wn.remove(p));
                }, 0));
            };
          }
        }, [s, l, u, p]));
      let m = D.useCallback(
        (e) => {
          if ((!n && !r) || p.paused) return;
          let t = e.key === `Tab` && !e.altKey && !e.ctrlKey && !e.metaKey,
            i = document.activeElement;
          if (t && i) {
            let t = e.currentTarget,
              [r, a] = Rn(t);
            r && a
              ? !e.shiftKey && i === a
                ? (e.preventDefault(), n && Un(r, { select: !0 }))
                : e.shiftKey && i === r && (e.preventDefault(), n && Un(a, { select: !0 }))
              : i === t && e.preventDefault();
          }
        },
        [n, r, p.paused],
      );
      return (0, M.jsx)(V.div, { tabIndex: -1, ...o, ref: f, onKeyDown: m });
    }, `FocusScope`),
  );
function Ln(e, { select: t = !1 } = {}) {
  let n = document.activeElement;
  for (let r of e) if ((Un(r, { select: t }), document.activeElement !== n)) return;
}
K(Ln, `focusFirst`);
function Rn(e) {
  let t = zn(e);
  return [Bn(t, e), Bn(t.reverse(), e)];
}
K(Rn, `getTabbableEdges`);
function zn(e) {
  let t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: K((e) => {
        let t = e.tagName === `INPUT` && e.type === `hidden`;
        return e.disabled || e.hidden || t
          ? NodeFilter.FILTER_SKIP
          : e.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      }, `acceptNode`),
    });
  for (; n.nextNode();) t.push(n.currentNode);
  return t;
}
K(zn, `getTabbableCandidates`);
function Bn(e, t) {
  let n = typeof t.checkVisibility == `function` && t.checkVisibility({ checkVisibilityCSS: !0 });
  for (let r of e)
    if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Vn(r, { upTo: t }))) return r;
}
K(Bn, `findVisible`);
function Vn(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === `hidden`) return !0;
  for (; e;) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === `none`) return !0;
    e = e.parentElement;
  }
  return !1;
}
K(Vn, `isHidden`);
function Hn(e) {
  return e instanceof HTMLInputElement && `select` in e;
}
K(Hn, `isSelectableInput`);
function Un(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    let n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && Hn(e) && t && e.select());
  }
}
K(Un, `focus`);
var Wn = Gn();
function Gn() {
  let e = [];
  return {
    add(t) {
      let n = e[0];
      (t !== n && n?.pause(), (e = Kn(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = Kn(e, t)), e[0]?.resume());
    },
  };
}
K(Gn, `createFocusScopesStack`);
function Kn(e, t) {
  let n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
K(Kn, `arrayRemove`);
function qn(e) {
  return e.filter((e) => e.tagName !== `A`);
}
K(qn, `removeLinks`);
var Jn = [`top`, `right`, `bottom`, `left`],
  Yn = Math.min,
  Xn = Math.max,
  Zn = Math.round,
  Qn = Math.floor,
  $n = (e) => ({ x: e, y: e }),
  er = { left: `right`, right: `left`, bottom: `top`, top: `bottom` };
function tr(e, t, n) {
  return Xn(e, Yn(t, n));
}
function nr(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function rr(e) {
  return e.split(`-`)[0];
}
function ir(e) {
  return e.split(`-`)[1];
}
function ar(e) {
  return e === `x` ? `y` : `x`;
}
function or(e) {
  return e === `y` ? `height` : `width`;
}
function q(e) {
  let t = e[0];
  return t === `t` || t === `b` ? `y` : `x`;
}
function sr(e) {
  return ar(q(e));
}
function cr(e, t, n) {
  n === void 0 && (n = !1);
  let r = ir(e),
    i = sr(e),
    a = or(i),
    o =
      i === `x`
        ? r === (n ? `end` : `start`)
          ? `right`
          : `left`
        : r === `start`
          ? `bottom`
          : `top`;
  return (t.reference[a] > t.floating[a] && (o = _r(o)), [o, _r(o)]);
}
function lr(e) {
  let t = _r(e);
  return [ur(e), t, ur(t)];
}
function ur(e) {
  return e.includes(`start`) ? e.replace(`start`, `end`) : e.replace(`end`, `start`);
}
var dr = [`left`, `right`],
  fr = [`right`, `left`],
  pr = [`top`, `bottom`],
  mr = [`bottom`, `top`];
function hr(e, t, n) {
  switch (e) {
    case `top`:
    case `bottom`:
      return n ? (t ? fr : dr) : t ? dr : fr;
    case `left`:
    case `right`:
      return t ? pr : mr;
    default:
      return [];
  }
}
function gr(e, t, n, r) {
  let i = ir(e),
    a = hr(rr(e), n === `start`, r);
  return (i && ((a = a.map((e) => e + `-` + i)), t && (a = a.concat(a.map(ur)))), a);
}
function _r(e) {
  let t = rr(e);
  return er[t] + e.slice(t.length);
}
function vr(e) {
  return { top: e.top ?? 0, right: e.right ?? 0, bottom: e.bottom ?? 0, left: e.left ?? 0 };
}
function yr(e) {
  return typeof e == `number` ? { top: e, right: e, bottom: e, left: e } : vr(e);
}
function br(e) {
  let { x: t, y: n, width: r, height: i } = e;
  return { width: r, height: i, top: n, left: t, right: t + r, bottom: n + i, x: t, y: n };
}
function xr(e, t, n) {
  let { reference: r, floating: i } = e,
    a = q(t),
    o = sr(t),
    s = or(o),
    c = rr(t),
    l = a === `y`,
    u = r.x + r.width / 2 - i.width / 2,
    d = r.y + r.height / 2 - i.height / 2,
    f = r[s] / 2 - i[s] / 2,
    p;
  switch (c) {
    case `top`:
      p = { x: u, y: r.y - i.height };
      break;
    case `bottom`:
      p = { x: u, y: r.y + r.height };
      break;
    case `right`:
      p = { x: r.x + r.width, y: d };
      break;
    case `left`:
      p = { x: r.x - i.width, y: d };
      break;
    default:
      p = { x: r.x, y: r.y };
  }
  let m = ir(t);
  return (m && (p[o] += f * (m === `end` ? 1 : -1) * (n && l ? -1 : 1)), p);
}
async function Sr(e, t) {
  t === void 0 && (t = {});
  let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e,
    {
      boundary: c = `clippingAncestors`,
      rootBoundary: l = `viewport`,
      elementContext: u = `floating`,
      altBoundary: d = !1,
      padding: f = 0,
    } = nr(t, e),
    p = yr(f),
    m = o[d ? (u === `floating` ? `reference` : `floating`) : u],
    h = br(
      await i.getClippingRect({
        element:
          ((await (i.isElement == null ? void 0 : i.isElement(m))) ?? !0)
            ? m
            : m.contextElement ||
              (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating))),
        boundary: c,
        rootBoundary: l,
        strategy: s,
      }),
    ),
    g =
      u === `floating`
        ? { x: n, y: r, width: a.floating.width, height: a.floating.height }
        : a.reference,
    _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)),
    v = ((await (i.isElement == null ? void 0 : i.isElement(_))) &&
      (await (i.getScale == null ? void 0 : i.getScale(_)))) || { x: 1, y: 1 },
    y = br(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: o,
            rect: g,
            offsetParent: _,
            strategy: s,
          })
        : g,
    );
  return {
    top: (h.top - y.top + p.top) / v.y,
    bottom: (y.bottom - h.bottom + p.bottom) / v.y,
    left: (h.left - y.left + p.left) / v.x,
    right: (y.right - h.right + p.right) / v.x,
  };
}
var Cr = 50,
  wr = async (e, t, n) => {
    let { placement: r = `bottom`, strategy: i = `absolute`, middleware: a = [], platform: o } = n,
      s = o.detectOverflow ? o : { ...o, detectOverflow: Sr },
      c = await (o.isRTL == null ? void 0 : o.isRTL(t)),
      l = await o.getElementRects({ reference: e, floating: t, strategy: i }),
      { x: u, y: d } = xr(l, r, c),
      f = r,
      p = 0,
      m = {};
    for (let n = 0; n < a.length; n++) {
      let h = a[n];
      if (!h) continue;
      let { name: g, fn: _ } = h,
        {
          x: v,
          y,
          data: b,
          reset: x,
        } = await _({
          x: u,
          y: d,
          initialPlacement: r,
          placement: f,
          strategy: i,
          middlewareData: m,
          rects: l,
          platform: s,
          elements: { reference: e, floating: t },
        });
      ((u = v ?? u),
        (d = y ?? d),
        (m[g] = { ...m[g], ...b }),
        x &&
          p < Cr &&
          (p++,
          typeof x == `object` &&
            (x.placement && (f = x.placement),
            x.rects &&
              (l =
                x.rects === !0
                  ? await o.getElementRects({ reference: e, floating: t, strategy: i })
                  : x.rects),
            ({ x: u, y: d } = xr(l, f, c))),
          (n = -1)));
    }
    return { x: u, y: d, placement: f, strategy: i, middlewareData: m };
  },
  Tr = (e) => ({
    name: `arrow`,
    options: e,
    async fn(t) {
      let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t,
        { element: l, padding: u = 0 } = nr(e, t) || {};
      if (l == null) return {};
      let d = yr(u),
        f = { x: n, y: r },
        p = sr(i),
        m = or(p),
        h = await o.getDimensions(l),
        g = p === `y`,
        _ = g ? `top` : `left`,
        v = g ? `bottom` : `right`,
        y = g ? `clientHeight` : `clientWidth`,
        b = a.reference[m] + a.reference[p] - f[p] - a.floating[m],
        x = f[p] - a.reference[p],
        S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)),
        C = S ? S[y] : 0;
      (!C || !(await (o.isElement == null ? void 0 : o.isElement(S)))) &&
        (C = s.floating[y] || a.floating[m]);
      let w = b / 2 - x / 2,
        T = C / 2 - h[m] / 2 - 1,
        E = Yn(d[_], T),
        D = Yn(d[v], T),
        O = C - h[m] - D,
        k = C / 2 - h[m] / 2 + w,
        A = tr(E, k, O),
        j =
          !c.arrow &&
          ir(i) != null &&
          k !== A &&
          a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0,
        M = j ? (k < E ? k - E : k - O) : 0;
      return {
        [p]: f[p] + M,
        data: { [p]: A, centerOffset: k - A - M, ...(j && { alignmentOffset: M }) },
        reset: j,
      };
    },
  }),
  Er = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `flip`,
        options: e,
        async fn(t) {
          var n;
          let {
              placement: r,
              middlewareData: i,
              rects: a,
              initialPlacement: o,
              platform: s,
              elements: c,
            } = t,
            {
              mainAxis: l = !0,
              crossAxis: u = !0,
              fallbackPlacements: d,
              fallbackStrategy: f = `bestFit`,
              fallbackAxisSideDirection: p = `none`,
              flipAlignment: m = !0,
              ...h
            } = nr(e, t);
          if ((n = i.arrow) != null && n.alignmentOffset) return {};
          let g = rr(r),
            _ = q(o),
            v = rr(o) === o,
            y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)),
            b = d || (v || !m ? [_r(o)] : lr(o)),
            x = p !== `none`;
          !d && x && b.push(...gr(o, m, p, y));
          let S = [o, ...b],
            C = await s.detectOverflow(t, h),
            w = [],
            T = i.flip?.overflows || [];
          if ((l && w.push(C[g]), u)) {
            let e = cr(r, a, y);
            w.push(C[e[0]], C[e[1]]);
          }
          if (((T = [...T, { placement: r, overflows: w }]), !w.every((e) => e <= 0))) {
            let e = (i.flip?.index || 0) + 1,
              t = S[e];
            if (
              t &&
              (u !== `alignment` ||
                _ === q(t) ||
                T.every((e) => q(e.placement) !== _ || e.overflows[0] > 0))
            )
              return { data: { index: e, overflows: T }, reset: { placement: t } };
            let n = T.filter((e) => e.overflows[0] <= 0).sort(
              (e, t) => e.overflows[1] - t.overflows[1],
            )[0]?.placement;
            if (!n)
              switch (f) {
                case `bestFit`: {
                  let e = T.filter((e) => {
                    if (x) {
                      let t = q(e.placement);
                      return t === _ || t === `y`;
                    }
                    return !0;
                  })
                    .map((e) => [
                      e.placement,
                      e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0),
                    ])
                    .sort((e, t) => e[1] - t[1])[0]?.[0];
                  e && (n = e);
                  break;
                }
                case `initialPlacement`:
                  n = o;
              }
            if (r !== n) return { reset: { placement: n } };
          }
          return {};
        },
      }
    );
  };
function Dr(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function Or(e) {
  return Jn.some((t) => e[t] >= 0);
}
var kr = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `hide`,
        options: e,
        async fn(t) {
          let { rects: n, platform: r } = t,
            { strategy: i = `referenceHidden`, ...a } = nr(e, t);
          switch (i) {
            case `referenceHidden`: {
              let e = Dr(
                await r.detectOverflow(t, { ...a, elementContext: `reference` }),
                n.reference,
              );
              return { data: { referenceHiddenOffsets: e, referenceHidden: Or(e) } };
            }
            case `escaped`: {
              let e = Dr(await r.detectOverflow(t, { ...a, altBoundary: !0 }), n.floating);
              return { data: { escapedOffsets: e, escaped: Or(e) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  Ar = new Set([`left`, `top`]);
async function jr(e, t) {
  let { placement: n, platform: r, elements: i } = e,
    a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    o = rr(n),
    s = ir(n),
    c = q(n) === `y`,
    l = Ar.has(o) ? -1 : 1,
    u = a && c ? -1 : 1,
    d = nr(t, e),
    {
      mainAxis: f,
      crossAxis: p,
      alignmentAxis: m,
    } = typeof d == `number`
      ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
      : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis };
  return (
    s && typeof m == `number` && (p = s === `end` ? m * -1 : m),
    c ? { x: p * u, y: f * l } : { x: f * l, y: p * u }
  );
}
var Mr = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: `offset`,
        options: e,
        async fn(t) {
          var n;
          let { x: r, y: i, placement: a, middlewareData: o } = t,
            s = await jr(t, e);
          return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset
            ? {}
            : { x: r + s.x, y: i + s.y, data: { ...s, placement: a } };
        },
      }
    );
  },
  Nr = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `shift`,
        options: e,
        async fn(t) {
          let { x: n, y: r, placement: i, platform: a } = t,
            {
              mainAxis: o = !0,
              crossAxis: s = !1,
              limiter: c = {
                fn: (e) => {
                  let { x: t, y: n } = e;
                  return { x: t, y: n };
                },
              },
              ...l
            } = nr(e, t),
            u = { x: n, y: r },
            d = await a.detectOverflow(t, l),
            f = q(i),
            p = ar(f),
            m = u[p],
            h = u[f],
            g = (e, t) =>
              tr(t + d[e === `y` ? `top` : `left`], t, t - d[e === `y` ? `bottom` : `right`]);
          (o && (m = g(p, m)), s && (h = g(f, h)));
          let _ = c.fn({ ...t, [p]: m, [f]: h });
          return { ..._, data: { x: _.x - n, y: _.y - r, enabled: { [p]: o, [f]: s } } };
        },
      }
    );
  },
  Pr = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t,
            { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = nr(e, t),
            u = { x: n, y: r },
            d = q(i),
            f = ar(d),
            p = u[f],
            m = u[d],
            h = nr(s, t),
            g =
              typeof h == `number`
                ? { mainAxis: h, crossAxis: 0 }
                : { mainAxis: h.mainAxis ?? 0, crossAxis: h.crossAxis ?? 0 };
          if (c) {
            let e = f === `y` ? `height` : `width`,
              t = a.reference[f] - a.floating[e] + g.mainAxis,
              n = a.reference[f] + a.reference[e] - g.mainAxis;
            p < t ? (p = t) : p > n && (p = n);
          }
          if (l) {
            let e = f === `y` ? `width` : `height`,
              t = Ar.has(rr(i)),
              n =
                a.reference[d] -
                a.floating[e] +
                ((t && o.offset?.[d]) || 0) +
                (t ? 0 : g.crossAxis),
              r =
                a.reference[d] +
                a.reference[e] +
                (t ? 0 : o.offset?.[d] || 0) -
                (t ? g.crossAxis : 0);
            m < n ? (m = n) : m > r && (m = r);
          }
          return { [f]: p, [d]: m };
        },
      }
    );
  },
  Fr = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `size`,
        options: e,
        async fn(t) {
          let { placement: n, rects: r, platform: i, elements: a } = t,
            { apply: o = () => {}, ...s } = nr(e, t),
            c = await i.detectOverflow(t, s),
            l = rr(n),
            u = ir(n),
            d = q(n) === `y`,
            { width: f, height: p } = r.floating,
            m,
            h;
          l === `top` || l === `bottom`
            ? ((m = l),
              (h =
                u === ((await (i.isRTL == null ? void 0 : i.isRTL(a.floating))) ? `start` : `end`)
                  ? `left`
                  : `right`))
            : ((h = l), (m = u === `end` ? `top` : `bottom`));
          let g = p - c.top - c.bottom,
            _ = f - c.left - c.right,
            v = Yn(p - c[m], g),
            y = Yn(f - c[h], _),
            b = t.middlewareData.shift,
            x = !b,
            S = v,
            C = y;
          (b != null && b.enabled.x && (C = _),
            b != null && b.enabled.y && (S = g),
            x && !u && (d ? (C = f - 2 * Xn(c.left, c.right)) : (S = p - 2 * Xn(c.top, c.bottom))),
            await o({ ...t, availableWidth: C, availableHeight: S }));
          let w = await i.getDimensions(a.floating);
          return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  };
function Ir() {
  return typeof window < `u`;
}
function Lr(e) {
  return zr(e) ? (e.nodeName || ``).toLowerCase() : `#document`;
}
function J(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Rr(e) {
  return ((zr(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function zr(e) {
  return Ir() ? e instanceof Node || e instanceof J(e).Node : !1;
}
function Y(e) {
  return Ir() ? e instanceof Element || e instanceof J(e).Element : !1;
}
function Br(e) {
  return Ir() ? e instanceof HTMLElement || e instanceof J(e).HTMLElement : !1;
}
function Vr(e) {
  return !Ir() || typeof ShadowRoot > `u`
    ? !1
    : e instanceof ShadowRoot || e instanceof J(e).ShadowRoot;
}
function Hr(e) {
  let { overflow: t, overflowX: n, overflowY: r, display: i } = X(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== `inline` && i !== `contents`;
}
function Ur(e) {
  return /^(table|td|th)$/.test(Lr(e));
}
function Wr(e) {
  try {
    if (e.matches(`:popover-open`)) return !0;
  } catch {}
  try {
    return e.matches(`:modal`);
  } catch {
    return !1;
  }
}
var Gr = /transform|translate|scale|rotate|perspective|filter/,
  Kr = /paint|layout|strict|content/,
  qr = (e) => !!e && e !== `none`,
  Jr;
function Yr(e) {
  let t = Y(e) ? X(e) : e;
  return (
    qr(t.transform) ||
    qr(t.translate) ||
    qr(t.scale) ||
    qr(t.rotate) ||
    qr(t.perspective) ||
    (!Zr() && (qr(t.backdropFilter) || qr(t.filter))) ||
    Gr.test(t.willChange || ``) ||
    Kr.test(t.contain || ``)
  );
}
function Xr(e) {
  let t = ei(e);
  for (; Br(t) && !Qr(t);) {
    if (Yr(t)) return t;
    if (Wr(t)) return null;
    t = ei(t);
  }
  return null;
}
function Zr() {
  return (
    (Jr ??= typeof CSS < `u` && CSS.supports && CSS.supports(`-webkit-backdrop-filter`, `none`)),
    Jr
  );
}
function Qr(e) {
  return /^(html|body|#document)$/.test(Lr(e));
}
function X(e) {
  return J(e).getComputedStyle(e);
}
function $r(e) {
  return Y(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function ei(e) {
  if (Lr(e) === `html`) return e;
  let t = e.assignedSlot || e.parentNode || (Vr(e) && e.host) || Rr(e);
  return Vr(t) ? t.host : t;
}
function ti(e) {
  let t = ei(e);
  return Qr(t) ? (e.ownerDocument || e).body : Br(t) && Hr(t) ? t : ti(t);
}
function ni(e, t, n) {
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  let r = ti(e),
    i = r === e.ownerDocument?.body,
    a = J(r);
  if (i) {
    let e = ri(a);
    return t.concat(a, a.visualViewport || [], Hr(r) ? r : [], e && n ? ni(e) : []);
  }
  return t.concat(r, ni(r, [], n));
}
function ri(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ii(e) {
  let t = X(e),
    n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0,
    i = Br(e),
    a = i ? e.offsetWidth : n,
    o = i ? e.offsetHeight : r,
    s = Zn(n) !== a || Zn(r) !== o;
  return (s && ((n = a), (r = o)), { width: n, height: r, $: s });
}
function ai(e) {
  return Y(e) ? e : e.contextElement;
}
function oi(e) {
  let t = ai(e);
  if (!Br(t)) return $n(1);
  let n = t.getBoundingClientRect(),
    { width: r, height: i, $: a } = ii(t),
    o = (a ? Zn(n.width) : n.width) / r,
    s = (a ? Zn(n.height) : n.height) / i;
  return (
    (!o || !Number.isFinite(o)) && (o = 1),
    (!s || !Number.isFinite(s)) && (s = 1),
    { x: o, y: s }
  );
}
var si = $n(0);
function ci(e) {
  let t = J(e);
  return !Zr() || !t.visualViewport
    ? si
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function li(e, t, n) {
  return (t === void 0 && (t = !1), !!n && t && n === J(e));
}
function ui(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  let i = e.getBoundingClientRect(),
    a = ai(e),
    o = $n(1);
  t && (r ? Y(r) && (o = oi(r)) : (o = oi(e)));
  let s = li(a, n, r) ? ci(a) : $n(0),
    c = (i.left + s.x) / o.x,
    l = (i.top + s.y) / o.y,
    u = i.width / o.x,
    d = i.height / o.y;
  if (a && r) {
    let e = J(a),
      t = Y(r) ? J(r) : r,
      n = e,
      i = ri(n);
    for (; i && t !== n;) {
      let e = oi(i),
        t = i.getBoundingClientRect(),
        r = X(i),
        a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
        o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
      ((c *= e.x), (l *= e.y), (u *= e.x), (d *= e.y), (c += a), (l += o), (n = J(i)), (i = ri(n)));
    }
  }
  return br({ width: u, height: d, x: c, y: l });
}
function di(e, t) {
  let n = $r(e).scrollLeft;
  return t ? t.left + n : ui(Rr(e)).left + n;
}
function fi(e, t) {
  let n = e.getBoundingClientRect();
  return { x: n.left + t.scrollLeft - di(e, n), y: n.top + t.scrollTop };
}
function pi(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e,
    a = i === `fixed`,
    o = Rr(r),
    s = t ? Wr(t.floating) : !1;
  if (r === o || (s && a)) return n;
  let c = { scrollLeft: 0, scrollTop: 0 },
    l = $n(1),
    u = $n(0),
    d = Br(r);
  if ((d || !a) && ((Lr(r) !== `body` || Hr(o)) && (c = $r(r)), d)) {
    let e = ui(r);
    ((l = oi(r)), (u.x = e.x + r.clientLeft), (u.y = e.y + r.clientTop));
  }
  let f = o && !d && !a ? fi(o, c) : $n(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y,
  };
}
function mi(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function hi(e) {
  let t = $r(e),
    n = e.ownerDocument.body,
    r = Xn(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth),
    i = Xn(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight),
    a = -t.scrollLeft + di(e),
    o = -t.scrollTop;
  return (
    X(n).direction === `rtl` && (a += Xn(e.clientWidth, n.clientWidth) - r),
    { width: r, height: i, x: a, y: o }
  );
}
var gi = 25;
function _i(e, t, n) {
  n === void 0 && (n = `viewport`);
  let r = n === `layoutViewport`,
    i = J(e),
    a = Rr(e),
    o = i.visualViewport,
    s = a.clientWidth,
    c = a.clientHeight,
    l = 0,
    u = 0;
  if (o) {
    let e = !Zr() || t === `fixed`;
    r
      ? e || ((l = -o.offsetLeft), (u = -o.offsetTop))
      : ((s = o.width), (c = o.height), e && ((l = o.offsetLeft), (u = o.offsetTop)));
  }
  if (di(a) <= 0) {
    let e = a.ownerDocument,
      t = e.body,
      n = getComputedStyle(t),
      r =
        (e.compatMode === `CSS1Compat` && parseFloat(n.marginLeft) + parseFloat(n.marginRight)) ||
        0,
      i = Math.abs(a.clientWidth - t.clientWidth - r),
      o = getComputedStyle(a).scrollbarGutter === `stable both-edges` ? i / 2 : i;
    o <= gi && (s -= o);
  }
  return { width: s, height: c, x: l, y: u };
}
function vi(e, t) {
  let n = ui(e, !0, t === `fixed`),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    a = oi(e);
  return { width: e.clientWidth * a.x, height: e.clientHeight * a.y, x: i * a.x, y: r * a.y };
}
function yi(e, t, n) {
  let r;
  if (t === `viewport` || t === `layoutViewport`) r = _i(e, n, t);
  else if (t === `document`) r = hi(Rr(e));
  else if (Y(t)) r = vi(t, n);
  else {
    let n = ci(e);
    r = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
  }
  return br(r);
}
function bi(e, t) {
  let n = t.get(e);
  if (n) return n;
  let r = ni(e, [], !1).filter((e) => Y(e) && Lr(e) !== `body`),
    i = null,
    a = X(e).position === `fixed`,
    o = a ? ei(e) : e;
  for (; Y(o) && !Qr(o);) {
    let e = X(o),
      t = Yr(o),
      n = i ? i.position : a ? `fixed` : ``;
    (!t && (n === `fixed` || (n === `absolute` && e.position === `static`))
      ? (r = r.filter((e) => e !== o))
      : (i = e),
      (o = ei(o)));
  }
  return (t.set(e, r), r);
}
function xi(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e,
    a = [...(n === `clippingAncestors` ? (Wr(t) ? [] : bi(t, this._c)) : [].concat(n)), r],
    o = yi(t, a[0], i),
    s = o.top,
    c = o.right,
    l = o.bottom,
    u = o.left;
  for (let e = 1; e < a.length; e++) {
    let n = yi(t, a[e], i);
    ((s = Xn(n.top, s)), (c = Yn(n.right, c)), (l = Yn(n.bottom, l)), (u = Xn(n.left, u)));
  }
  return { width: c - u, height: l - s, x: u, y: s };
}
function Si(e) {
  let { width: t, height: n } = ii(e);
  return { width: t, height: n };
}
function Ci(e, t, n) {
  let r = Br(t),
    i = Rr(t),
    a = n === `fixed`,
    o = ui(e, !0, a, t),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = $n(0);
  if ((r || !a) && ((Lr(t) !== `body` || Hr(i)) && (s = $r(t)), r)) {
    let e = ui(t, !0, a, t);
    ((c.x = e.x + t.clientLeft), (c.y = e.y + t.clientTop));
  }
  !r && i && (c.x = di(i));
  let l = i && !r && !a ? fi(i, s) : $n(0);
  return {
    x: o.left + s.scrollLeft - c.x - l.x,
    y: o.top + s.scrollTop - c.y - l.y,
    width: o.width,
    height: o.height,
  };
}
function wi(e) {
  return X(e).position === `static`;
}
function Ti(e, t) {
  if (!Br(e) || X(e).position === `fixed`) return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (Rr(e) === n && (n = n.ownerDocument.body), n);
}
function Ei(e, t) {
  let n = J(e);
  if (Wr(e)) return n;
  if (!Br(e)) {
    let t = ei(e);
    for (; t && !Qr(t);) {
      if (Y(t) && !wi(t)) return t;
      t = ei(t);
    }
    return n;
  }
  let r = Ti(e, t);
  for (; r && Ur(r) && wi(r);) r = Ti(r, t);
  return r && Qr(r) && wi(r) && !Yr(r) ? n : r || Xr(e) || n;
}
var Di = async function (e) {
  let t = this.getOffsetParent || Ei,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: Ci(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function Oi(e) {
  return X(e).direction === `rtl`;
}
var ki = {
  convertOffsetParentRelativeRectToViewportRelativeRect: pi,
  getDocumentElement: Rr,
  getClippingRect: xi,
  getOffsetParent: Ei,
  getElementRects: Di,
  getClientRects: mi,
  getDimensions: Si,
  getScale: oi,
  isElement: Y,
  isRTL: Oi,
};
function Ai(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ji(e, t, n) {
  let r = null,
    i,
    a = Rr(e);
  function o() {
    var e;
    (clearTimeout(i), (e = r) == null || e.disconnect(), (r = null));
  }
  function s(n, c) {
    (n === void 0 && (n = !1), c === void 0 && (c = 1), o());
    let l = e.getBoundingClientRect(),
      { left: u, top: d, width: f, height: p } = l;
    if ((n || t(), !f || !p)) return;
    let m = Qn(d),
      h = Qn(a.clientWidth - (u + f)),
      g = Qn(a.clientHeight - (d + p)),
      _ = Qn(u),
      v = {
        rootMargin: -m + `px ` + -h + `px ` + -g + `px ` + -_ + `px`,
        threshold: Xn(0, Yn(1, c)) || 1,
      },
      y = !0;
    function b(t) {
      let n = t[0].intersectionRatio;
      if (!Ai(l, e.getBoundingClientRect())) return s();
      if (n !== c) {
        if (!y) return s();
        n
          ? s(!1, n)
          : (i = setTimeout(() => {
              s(!1, 1e-7);
            }, 1e3));
      }
      y = !1;
    }
    try {
      r = new IntersectionObserver(b, { ...v, root: a.ownerDocument });
    } catch {
      r = new IntersectionObserver(b, v);
    }
    r.observe(e);
  }
  let c = J(e),
    l = () => s(n);
  return (
    c.addEventListener(`resize`, l),
    s(!0),
    () => {
      (c.removeEventListener(`resize`, l), o());
    }
  );
}
function Mi(e, t, n, r) {
  r === void 0 && (r = {});
  let {
      ancestorScroll: i = !0,
      ancestorResize: a = !0,
      elementResize: o = typeof ResizeObserver == `function`,
      layoutShift: s = typeof IntersectionObserver == `function`,
      animationFrame: c = !1,
    } = r,
    l = ai(e),
    u = i || a ? [...(l ? ni(l) : []), ...(t ? ni(t) : [])] : [];
  u.forEach((e) => {
    (i && e.addEventListener(`scroll`, n), a && e.addEventListener(`resize`, n));
  });
  let d = l && s ? ji(l, n, a) : null,
    f = -1,
    p = null;
  o &&
    ((p = new ResizeObserver((e) => {
      let [r] = e;
      (r &&
        r.target === l &&
        p &&
        t &&
        (p.unobserve(t),
        cancelAnimationFrame(f),
        (f = requestAnimationFrame(() => {
          var e;
          (e = p) == null || e.observe(t);
        }))),
        n());
    })),
    l && !c && p.observe(l),
    t && p.observe(t));
  let m,
    h = c ? ui(e) : null;
  c && g();
  function g() {
    let t = ui(e);
    (h && !Ai(h, t) && n(), (h = t), (m = requestAnimationFrame(g)));
  }
  return (
    n(),
    () => {
      var e;
      (u.forEach((e) => {
        (i && e.removeEventListener(`scroll`, n), a && e.removeEventListener(`resize`, n));
      }),
        d?.(),
        (e = p) == null || e.disconnect(),
        (p = null),
        c && cancelAnimationFrame(m));
    }
  );
}
var Ni = Mr,
  Pi = Nr,
  Fi = Er,
  Ii = Fr,
  Li = kr,
  Ri = Tr,
  zi = Pr,
  Bi = (e, t, n) => {
    let r = new Map(),
      i = n ?? {},
      a = { ...ki, ...i.platform, _c: r };
    return wr(e, t, { ...i, platform: a });
  },
  Vi = typeof document < `u` ? D.useLayoutEffect : function () {};
function Hi(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == `function` && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && typeof e == `object`) {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0;) if (!Hi(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; r-- !== 0;) {
      let n = i[r];
      if (!(n === `_owner` && e.$$typeof) && !Hi(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ui(e) {
  return typeof window > `u` ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Wi(e, t) {
  let n = Ui(e);
  return Math.round(t * n) / n;
}
function Gi(e) {
  let t = D.useRef(e);
  return (
    Vi(() => {
      t.current = e;
    }),
    t
  );
}
function Ki(e) {
  e === void 0 && (e = {});
  let {
      placement: t = `bottom`,
      strategy: n = `absolute`,
      middleware: r = [],
      platform: i,
      elements: { reference: a, floating: o } = {},
      transform: s = !0,
      whileElementsMounted: c,
      open: l,
    } = e,
    [u, d] = D.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [f, p] = D.useState(r);
  Hi(f, r) || p(r);
  let [m, h] = D.useState(null),
    [g, _] = D.useState(null),
    v = D.useCallback((e) => {
      e !== S.current && ((S.current = e), h(e));
    }, []),
    y = D.useCallback((e) => {
      e !== C.current && ((C.current = e), _(e));
    }, []),
    b = a || m,
    x = o || g,
    S = D.useRef(null),
    C = D.useRef(null),
    w = D.useRef(u),
    T = c != null,
    E = Gi(c),
    O = Gi(i),
    k = Gi(l),
    A = D.useCallback(() => {
      if (!S.current || !C.current) return;
      let e = { placement: t, strategy: n, middleware: f };
      (O.current && (e.platform = O.current),
        Bi(S.current, C.current, e).then((e) => {
          let t = { ...e, isPositioned: k.current !== !1 };
          j.current &&
            !Hi(w.current, t) &&
            ((w.current = t),
            Me.flushSync(() => {
              d(t);
            }));
        }));
    }, [f, t, n, O, k]);
  Vi(() => {
    l === !1 &&
      w.current.isPositioned &&
      ((w.current.isPositioned = !1), d((e) => ({ ...e, isPositioned: !1 })));
  }, [l]);
  let j = D.useRef(!1);
  (Vi(
    () => (
      (j.current = !0),
      () => {
        j.current = !1;
      }
    ),
    [],
  ),
    Vi(() => {
      if ((b && (S.current = b), x && (C.current = x), b && x)) {
        if (E.current) return E.current(b, x, A);
        A();
      }
    }, [b, x, A, E, T]));
  let M = D.useMemo(() => ({ reference: S, floating: C, setReference: v, setFloating: y }), [v, y]),
    N = D.useMemo(() => ({ reference: b, floating: x }), [b, x]),
    P = D.useMemo(() => {
      let e = { position: n, left: 0, top: 0 };
      if (!N.floating) return e;
      let t = Wi(N.floating, u.x),
        r = Wi(N.floating, u.y);
      return s
        ? {
            ...e,
            transform: `translate(` + t + `px, ` + r + `px)`,
            ...(Ui(N.floating) >= 1.5 && { willChange: `transform` }),
          }
        : { position: n, left: t, top: r };
    }, [n, s, N.floating, u.x, u.y]);
  return D.useMemo(
    () => ({ ...u, update: A, refs: M, elements: N, floatingStyles: P }),
    [u, A, M, N, P],
  );
}
var qi = (e) => {
    function t(e) {
      return {}.hasOwnProperty.call(e, `current`);
    }
    return {
      name: `arrow`,
      options: e,
      fn(n) {
        let { element: r, padding: i } = typeof e == `function` ? e(n) : e;
        return r && t(r)
          ? r.current == null
            ? {}
            : Ri({ element: r.current, padding: i }).fn(n)
          : r
            ? Ri({ element: r, padding: i }).fn(n)
            : {};
      },
    };
  },
  Ji = (e, t) => {
    let n = Ni(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  Yi = (e, t) => {
    let n = Pi(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  Xi = (e, t) => ({ fn: zi(e).fn, options: [e, t] }),
  Zi = (e, t) => {
    let n = Fi(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  Qi = (e, t) => {
    let n = Ii(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  $i = (e, t) => {
    let n = Li(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  ea = (e, t) => {
    let n = qi(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  ta = Object.defineProperty,
  na = (e, t) => ta(e, `name`, { value: t, configurable: !0 });
function ra(e) {
  let [t, n] = D.useState(void 0);
  return (
    B(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        let t = new ResizeObserver((t) => {
          if (!Array.isArray(t) || !t.length) return;
          let r = t[0],
            i,
            a;
          if (`borderBoxSize` in r) {
            let e = r.borderBoxSize,
              t = Array.isArray(e) ? e[0] : e;
            ((i = t.inlineSize), (a = t.blockSize));
          } else ((i = e.offsetWidth), (a = e.offsetHeight));
          n({ width: i, height: a });
        });
        return (t.observe(e, { box: `border-box` }), () => t.unobserve(e));
      }
      n(void 0);
    }, [e]),
    t
  );
}
na(ra, `useSize`);
var ia = Object.defineProperty,
  aa = (e, t) => ia(e, `name`, { value: t, configurable: !0 }),
  oa = `Popper`,
  [sa, ca] = F(oa),
  [la, ua] = sa(oa),
  da = aa((e) => {
    let { __scopePopper: t, children: n } = e,
      [r, i] = D.useState(null),
      [a, o] = D.useState(void 0);
    return (0, M.jsx)(la, {
      scope: t,
      anchor: r,
      onAnchorChange: i,
      placementState: a,
      setPlacementState: o,
      children: n,
    });
  }, `Popper`),
  fa = `PopperAnchor`,
  pa = D.forwardRef(
    aa(function (e, t) {
      let { __scopePopper: n, virtualRef: r, ...i } = e,
        a = ua(fa, n),
        o = D.useRef(null),
        s = a.onAnchorChange,
        c = D.useCallback(
          (e) => {
            ((o.current = e), e && s(e));
          },
          [s],
        ),
        l = g(t, c),
        u = D.useRef(null);
      D.useEffect(() => {
        if (!r) return;
        let e = u.current;
        ((u.current = r.current), e !== u.current && s(u.current));
      });
      let d = a.placementState && ba(a.placementState),
        f = d?.[0],
        p = d?.[1];
      return r
        ? null
        : (0, M.jsx)(V.div, {
            "data-radix-popper-side": f,
            "data-radix-popper-align": p,
            ...i,
            ref: l,
          });
    }, `PopperAnchor`),
  ),
  ma = `PopperContent`,
  [ha, ga] = sa(ma),
  _a = D.forwardRef(
    aa(function (e, t) {
      let {
          __scopePopper: n,
          side: r = `bottom`,
          sideOffset: i = 0,
          align: a = `center`,
          alignOffset: o = 0,
          arrowPadding: s = 0,
          avoidCollisions: c = !0,
          collisionBoundary: l = [],
          collisionPadding: u = 0,
          sticky: d = `partial`,
          hideWhenDetached: f = !1,
          updatePositionStrategy: p = `optimized`,
          onPlaced: m,
          ...h
        } = e,
        _ = ua(ma, n),
        [v, y] = D.useState(null),
        b = g(t, y),
        [x, S] = D.useState(null),
        C = ra(x),
        w = C?.width ?? 0,
        T = C?.height ?? 0,
        E = r + (a === `center` ? `` : `-` + a),
        O = typeof u == `number` ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u },
        k = Array.isArray(l) ? l : [l],
        A = k.length > 0,
        j = { padding: O, boundary: k.filter(va), altBoundary: A },
        {
          refs: N,
          floatingStyles: P,
          placement: ee,
          isPositioned: F,
          middlewareData: I,
        } = Ki({
          strategy: `fixed`,
          placement: E,
          whileElementsMounted: aa(
            (...e) => Mi(...e, { animationFrame: p === `always` }),
            `whileElementsMounted`,
          ),
          elements: { reference: _.anchor },
          middleware: [
            Ji({ mainAxis: i + T, alignmentAxis: o }),
            c &&
              Yi({ mainAxis: !0, crossAxis: !1, limiter: d === `partial` ? Xi() : void 0, ...j }),
            c && Zi({ ...j }),
            Qi({
              ...j,
              apply: aa(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
                let { width: i, height: a } = t.reference,
                  o = e.floating.style;
                (o.setProperty(`--radix-popper-available-width`, `${n}px`),
                  o.setProperty(`--radix-popper-available-height`, `${r}px`),
                  o.setProperty(`--radix-popper-anchor-width`, `${i}px`),
                  o.setProperty(`--radix-popper-anchor-height`, `${a}px`));
              }, `apply`),
            }),
            x && ea({ element: x, padding: s }),
            ya({ arrowWidth: w, arrowHeight: T }),
            f && $i({ strategy: `referenceHidden`, ...j, boundary: A ? j.boundary : void 0 }),
          ],
        }),
        L = _.setPlacementState;
      B(
        () => (
          L(ee),
          () => {
            L(void 0);
          }
        ),
        [ee, L],
      );
      let [R, te] = ba(ee),
        ne = W(m);
      B(() => {
        F && ne?.();
      }, [F, ne]);
      let re = I.arrow?.x,
        ie = I.arrow?.y,
        ae = I.arrow?.centerOffset !== 0,
        [oe, se] = D.useState();
      return (
        B(() => {
          v && se(window.getComputedStyle(v).zIndex);
        }, [v]),
        (0, M.jsx)(`div`, {
          ref: N.setFloating,
          "data-radix-popper-content-wrapper": ``,
          style: {
            ...P,
            transform: F ? P.transform : `translate(0, -200%)`,
            minWidth: `max-content`,
            zIndex: oe,
            "--radix-popper-transform-origin": [I.transformOrigin?.x, I.transformOrigin?.y].join(
              ` `,
            ),
            ...(I.hide?.referenceHidden && { visibility: `hidden`, pointerEvents: `none` }),
          },
          dir: e.dir,
          children: (0, M.jsx)(ha, {
            scope: n,
            placedSide: R,
            placedAlign: te,
            onArrowChange: S,
            arrowX: re,
            arrowY: ie,
            shouldHideArrow: ae,
            children: (0, M.jsx)(V.div, {
              "data-side": R,
              "data-align": te,
              ...h,
              ref: b,
              style: { ...h.style, animation: F ? h.style?.animation : `none` },
            }),
          }),
        })
      );
    }, `PopperContent`),
  );
function va(e) {
  return e !== null;
}
aa(va, `isNotNull`);
var ya = aa(
  (e) => ({
    name: `transformOrigin`,
    options: e,
    fn(t) {
      let { placement: n, rects: r, middlewareData: i } = t,
        a = i.arrow?.centerOffset !== 0,
        o = a ? 0 : e.arrowWidth,
        s = a ? 0 : e.arrowHeight,
        [c, l] = ba(n),
        u = { start: `0%`, center: `50%`, end: `100%` }[l],
        d = (i.arrow?.x ?? 0) + o / 2,
        f = (i.arrow?.y ?? 0) + s / 2,
        p = ``,
        m = ``;
      return (
        c === `bottom`
          ? ((p = a ? u : `${d}px`), (m = `${-s}px`))
          : c === `top`
            ? ((p = a ? u : `${d}px`), (m = `${r.floating.height + s}px`))
            : c === `right`
              ? ((p = `${-s}px`), (m = a ? u : `${f}px`))
              : c === `left` && ((p = `${r.floating.width + s}px`), (m = a ? u : `${f}px`)),
        { data: { x: p, y: m } }
      );
    },
  }),
  `transformOrigin`,
);
function ba(e) {
  let [t, n = `center`] = e.split(`-`);
  return [t, n];
}
aa(ba, `getSideAndAlignFromPlacement`);
var xa = da,
  Sa = pa,
  Ca = _a,
  wa = Object.defineProperty,
  Ta = D.forwardRef(
    ((e, t) => wa(e, `name`, { value: t, configurable: !0 }))(function (e, t) {
      let { container: n, ...r } = e,
        [i, a] = D.useState(!1);
      B(() => a(!0), []);
      let o = n || (i && globalThis?.document?.body);
      return o ? Me.createPortal((0, M.jsx)(V.div, { ...r, ref: t }), o) : null;
    }, `Portal`),
  ),
  Ea = Object.defineProperty,
  Da = (e, t) => Ea(e, `name`, { value: t, configurable: !0 });
function Oa(e) {
  let t = D.useRef({ value: e, previous: e });
  return D.useMemo(
    () => (
      t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)),
      t.current.previous
    ),
    [e],
  );
}
Da(Oa, `usePrevious`);
var ka = Object.freeze({
    position: `absolute`,
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: `hidden`,
    clip: `rect(0, 0, 0, 0)`,
    whiteSpace: `nowrap`,
    wordWrap: `normal`,
  }),
  Aa = function (e) {
    return typeof document > `u` ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
  },
  ja = new WeakMap(),
  Ma = new WeakMap(),
  Na = {},
  Pa = 0,
  Fa = function (e) {
    return e && (e.host || Fa(e.parentNode));
  },
  Ia = function (e, t) {
    return t
      .map(function (t) {
        if (e.contains(t)) return t;
        var n = Fa(t);
        return n && e.contains(n)
          ? n
          : (console.error(`aria-hidden`, t, `in not contained inside`, e, `. Doing nothing`),
            null);
      })
      .filter(function (e) {
        return !!e;
      });
  },
  La = function (e, t, n, r) {
    var i = Ia(t, Array.isArray(e) ? e : [e]);
    Na[n] || (Na[n] = new WeakMap());
    var a = Na[n],
      o = [],
      s = new Set(),
      c = new Set(i),
      l = function (e) {
        !e || s.has(e) || (s.add(e), l(e.parentNode));
      };
    i.forEach(l);
    var u = function (e) {
      !e ||
        c.has(e) ||
        Array.prototype.forEach.call(e.children, function (e) {
          if (s.has(e)) u(e);
          else
            try {
              var t = e.getAttribute(r),
                i = t !== null && t !== `false`,
                c = (ja.get(e) || 0) + 1,
                l = (a.get(e) || 0) + 1;
              (ja.set(e, c),
                a.set(e, l),
                o.push(e),
                c === 1 && i && Ma.set(e, !0),
                l === 1 && e.setAttribute(n, `true`),
                i || e.setAttribute(r, `true`));
            } catch (t) {
              console.error(`aria-hidden: cannot operate on `, e, t);
            }
        });
    };
    return (
      u(t),
      s.clear(),
      Pa++,
      function () {
        (o.forEach(function (e) {
          var t = ja.get(e) - 1,
            i = a.get(e) - 1;
          (ja.set(e, t),
            a.set(e, i),
            t || (Ma.has(e) || e.removeAttribute(r), Ma.delete(e)),
            i || e.removeAttribute(n));
        }),
          Pa--,
          Pa || ((ja = new WeakMap()), (ja = new WeakMap()), (Ma = new WeakMap()), (Na = {})));
      }
    );
  },
  Ra = function (e, t, n) {
    n === void 0 && (n = `data-aria-hidden`);
    var r = Array.from(Array.isArray(e) ? e : [e]),
      i = t || Aa(e);
    return i
      ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))),
        La(r, i, n, `aria-hidden`))
      : function () {
          return null;
        };
  },
  za = function () {
    return (
      (za =
        Object.assign ||
        function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        }),
      za.apply(this, arguments)
    );
  };
function Ba(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == `function`)
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function Va(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && ((a ||= Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
  return e.concat(a || Array.prototype.slice.call(t));
}
var Ha = `right-scroll-bar-position`,
  Ua = `width-before-scroll-bar`,
  Wa = `with-scroll-bars-hidden`,
  Ga = `--removed-body-scroll-bar-size`;
function Ka(e, t) {
  return (typeof e == `function` ? e(t) : e && (e.current = t), e);
}
function qa(e, t) {
  var n = (0, D.useState)(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(e) {
          var t = n.value;
          t !== e && ((n.value = e), n.callback(e, t));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var Ja = typeof window < `u` ? D.useLayoutEffect : D.useEffect,
  Ya = new WeakMap();
function Xa(e, t) {
  var n = qa(t || null, function (t) {
    return e.forEach(function (e) {
      return Ka(e, t);
    });
  });
  return (
    Ja(
      function () {
        var t = Ya.get(n);
        if (t) {
          var r = new Set(t),
            i = new Set(e),
            a = n.current;
          (r.forEach(function (e) {
            i.has(e) || Ka(e, null);
          }),
            i.forEach(function (e) {
              r.has(e) || Ka(e, a);
            }));
        }
        Ya.set(n, e);
      },
      [e],
    ),
    n
  );
}
function Za(e) {
  return e;
}
function Qa(e, t) {
  t === void 0 && (t = Za);
  var n = [],
    r = !1;
  return {
    read: function () {
      if (r)
        throw Error(
          "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
        );
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function (e) {
      var i = t(e, r);
      return (
        n.push(i),
        function () {
          n = n.filter(function (e) {
            return e !== i;
          });
        }
      );
    },
    assignSyncMedium: function (e) {
      for (r = !0; n.length;) {
        var t = n;
        ((n = []), t.forEach(e));
      }
      n = {
        push: function (t) {
          return e(t);
        },
        filter: function () {
          return n;
        },
      };
    },
    assignMedium: function (e) {
      r = !0;
      var t = [];
      if (n.length) {
        var i = n;
        ((n = []), i.forEach(e), (t = n));
      }
      var a = function () {
          var n = t;
          ((t = []), n.forEach(e));
        },
        o = function () {
          return Promise.resolve().then(a);
        };
      (o(),
        (n = {
          push: function (e) {
            (t.push(e), o());
          },
          filter: function (e) {
            return ((t = t.filter(e)), n);
          },
        }));
    },
  };
}
function $a(e) {
  e === void 0 && (e = {});
  var t = Qa(null);
  return ((t.options = za({ async: !0, ssr: !1 }, e)), t);
}
var eo = function (e) {
  var t = e.sideCar,
    n = Ba(e, [`sideCar`]);
  if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r) throw Error(`Sidecar medium not found`);
  return D.createElement(r, za({}, n));
};
eo.isSideCarExport = !0;
function to(e, t) {
  return (e.useMedium(t), eo);
}
var no = $a(),
  ro = function () {},
  io = D.forwardRef(function (e, t) {
    var n = D.useRef(null),
      r = D.useState({ onScrollCapture: ro, onWheelCapture: ro, onTouchMoveCapture: ro }),
      i = r[0],
      a = r[1],
      o = e.forwardProps,
      s = e.children,
      c = e.className,
      l = e.removeScrollBar,
      u = e.enabled,
      d = e.shards,
      f = e.sideCar,
      p = e.noRelative,
      m = e.noIsolation,
      h = e.inert,
      g = e.allowPinchZoom,
      _ = e.as,
      v = _ === void 0 ? `div` : _,
      y = e.gapMode,
      b = Ba(e, [
        `forwardProps`,
        `children`,
        `className`,
        `removeScrollBar`,
        `enabled`,
        `shards`,
        `sideCar`,
        `noRelative`,
        `noIsolation`,
        `inert`,
        `allowPinchZoom`,
        `as`,
        `gapMode`,
      ]),
      x = f,
      S = Xa([n, t]),
      C = za(za({}, b), i);
    return D.createElement(
      D.Fragment,
      null,
      u &&
        D.createElement(x, {
          sideCar: no,
          removeScrollBar: l,
          shards: d,
          noRelative: p,
          noIsolation: m,
          inert: h,
          setCallbacks: a,
          allowPinchZoom: !!g,
          lockRef: n,
          gapMode: y,
        }),
      o
        ? D.cloneElement(D.Children.only(s), za(za({}, C), { ref: S }))
        : D.createElement(v, za({}, C, { className: c, ref: S }), s),
    );
  });
((io.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
  (io.classNames = { fullWidth: Ua, zeroRight: Ha }));
var ao,
  oo = function () {
    if (ao) return ao;
    if (typeof __webpack_nonce__ < `u`) return __webpack_nonce__;
  };
function so() {
  if (!document) return null;
  var e = document.createElement(`style`);
  e.type = `text/css`;
  var t = oo();
  return (t && e.setAttribute(`nonce`, t), e);
}
function co(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function lo(e) {
  (document.head || document.getElementsByTagName(`head`)[0]).appendChild(e);
}
var uo = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = so()) && (co(t, n), lo(t)), e++);
      },
      remove: function () {
        (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  fo = function () {
    var e = uo();
    return function (t, n) {
      D.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  po = function () {
    var e = fo();
    return function (t) {
      var n = t.styles,
        r = t.dynamic;
      return (e(n, r), null);
    };
  },
  mo = { left: 0, top: 0, right: 0, gap: 0 },
  ho = function (e) {
    return parseInt(e || ``, 10) || 0;
  },
  go = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === `padding` ? `paddingLeft` : `marginLeft`],
      r = t[e === `padding` ? `paddingTop` : `marginTop`],
      i = t[e === `padding` ? `paddingRight` : `marginRight`];
    return [ho(n), ho(r), ho(i)];
  },
  _o = function (e) {
    if ((e === void 0 && (e = `margin`), typeof window > `u`)) return mo;
    var t = go(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
  },
  vo = po(),
  yo = `data-scroll-locked`,
  bo = function (e, t, n, r) {
    var i = e.left,
      a = e.top,
      o = e.right,
      s = e.gap;
    return (
      n === void 0 && (n = `margin`),
      `
  .${Wa} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${yo}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
      t && `position: relative ${r};`,
      n === `margin` &&
        `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
      n === `padding` && `padding-right: ${s}px ${r};`,
    ]
      .filter(Boolean)
      .join(``)}
  }
  
  .${Ha} {
    right: ${s}px ${r};
  }
  
  .${Ua} {
    margin-right: ${s}px ${r};
  }
  
  .${Ha} .${Ha} {
    right: 0 ${r};
  }
  
  .${Ua} .${Ua} {
    margin-right: 0 ${r};
  }
  
  body[${yo}] {
    ${Ga}: ${s}px;
  }
`
    );
  },
  xo = function () {
    var e = parseInt(document.body.getAttribute(`data-scroll-locked`) || `0`, 10);
    return isFinite(e) ? e : 0;
  },
  So = function () {
    D.useEffect(function () {
      return (
        document.body.setAttribute(yo, (xo() + 1).toString()),
        function () {
          var e = xo() - 1;
          e <= 0 ? document.body.removeAttribute(yo) : document.body.setAttribute(yo, e.toString());
        }
      );
    }, []);
  },
  Co = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      i = r === void 0 ? `margin` : r;
    So();
    var a = D.useMemo(
      function () {
        return _o(i);
      },
      [i],
    );
    return D.createElement(vo, { styles: bo(a, !t, i, n ? `` : `!important`) });
  },
  wo = !1;
if (typeof window < `u`)
  try {
    var To = Object.defineProperty({}, "passive", {
      get: function () {
        return ((wo = !0), !0);
      },
    });
    (window.addEventListener(`test`, To, To), window.removeEventListener(`test`, To, To));
  } catch {
    wo = !1;
  }
var Eo = wo ? { passive: !1 } : !1,
  Do = function (e) {
    return e.tagName === `TEXTAREA`;
  },
  Oo = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return n[t] !== `hidden` && !(n.overflowY === n.overflowX && !Do(e) && n[t] === `visible`);
  },
  ko = function (e) {
    return Oo(e, `overflowY`);
  },
  Ao = function (e) {
    return Oo(e, `overflowX`);
  },
  jo = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      if ((typeof ShadowRoot < `u` && r instanceof ShadowRoot && (r = r.host), Po(e, r))) {
        var i = Fo(e, r);
        if (i[1] > i[2]) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  Mo = function (e) {
    return [e.scrollTop, e.scrollHeight, e.clientHeight];
  },
  No = function (e) {
    return [e.scrollLeft, e.scrollWidth, e.clientWidth];
  },
  Po = function (e, t) {
    return e === `v` ? ko(t) : Ao(t);
  },
  Fo = function (e, t) {
    return e === `v` ? Mo(t) : No(t);
  },
  Io = function (e, t) {
    return e === `h` && t === `rtl` ? -1 : 1;
  },
  Lo = function (e, t, n, r, i) {
    var a = Io(e, window.getComputedStyle(t).direction),
      o = a * r,
      s = n.target,
      c = t.contains(s),
      l = !1,
      u = o > 0,
      d = 0,
      f = 0;
    do {
      if (!s) break;
      var p = Fo(e, s),
        m = p[0],
        h = p[1] - p[2] - a * m;
      (m || h) && Po(e, s) && ((d += h), (f += m));
      var g = s.parentNode;
      s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
    } while ((!c && s !== document.body) || (c && (t.contains(s) || t === s)));
    return (
      ((u && ((i && Math.abs(d) < 1) || (!i && o > d))) ||
        (!u && ((i && Math.abs(f) < 1) || (!i && -o > f)))) &&
        (l = !0),
      l
    );
  },
  Ro = function (e) {
    return `changedTouches` in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  zo = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Bo = function (e) {
    return e && `current` in e ? e.current : e;
  },
  Vo = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  Ho = function (e) {
    return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
  },
  Uo = 0,
  Wo = [];
function Go(e) {
  var t = D.useRef([]),
    n = D.useRef([0, 0]),
    r = D.useRef(),
    i = D.useState(Uo++)[0],
    a = D.useState(po)[0],
    o = D.useRef(e);
  (D.useEffect(
    function () {
      o.current = e;
    },
    [e],
  ),
    D.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add(`block-interactivity-${i}`);
          var t = Va([e.lockRef.current], (e.shards || []).map(Bo), !0).filter(Boolean);
          return (
            t.forEach(function (e) {
              return e.classList.add(`allow-interactivity-${i}`);
            }),
            function () {
              (document.body.classList.remove(`block-interactivity-${i}`),
                t.forEach(function (e) {
                  return e.classList.remove(`allow-interactivity-${i}`);
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var s = D.useCallback(function (e, t) {
      if ((`touches` in e && e.touches.length === 2) || (e.type === `wheel` && e.ctrlKey))
        return !o.current.allowPinchZoom;
      var i = Ro(e),
        a = n.current,
        s = `deltaX` in e ? e.deltaX : a[0] - i[0],
        c = `deltaY` in e ? e.deltaY : a[1] - i[1],
        l,
        u = e.target,
        d = Math.abs(s) > Math.abs(c) ? `h` : `v`;
      if (`touches` in e && d === `h` && u.type === `range`) return !1;
      var f = window.getSelection(),
        p = f && f.anchorNode;
      if (p && (p === u || p.contains(u))) return !1;
      var m = jo(d, u);
      if (!m) return !0;
      if ((m ? (l = d) : ((l = d === `v` ? `h` : `v`), (m = jo(d, u))), !m)) return !1;
      if ((!r.current && `changedTouches` in e && (s || c) && (r.current = l), !l)) return !0;
      var h = r.current || l;
      return Lo(h, t, e, h === `h` ? s : c, !0);
    }, []),
    c = D.useCallback(function (e) {
      var n = e;
      if (!(!Wo.length || Wo[Wo.length - 1] !== a)) {
        var r = `deltaY` in n ? zo(n) : Ro(n),
          i = t.current.filter(function (e) {
            return (
              e.name === n.type &&
              (e.target === n.target || n.target === e.shadowParent) &&
              Vo(e.delta, r)
            );
          })[0];
        if (i && i.should) {
          n.cancelable && n.preventDefault();
          return;
        }
        if (!i) {
          var c = (o.current.shards || [])
            .map(Bo)
            .filter(Boolean)
            .filter(function (e) {
              return e.contains(n.target);
            });
          (c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) &&
            n.cancelable &&
            n.preventDefault();
        }
      }
    }, []),
    l = D.useCallback(function (e, n, r, i) {
      var a = { name: e, delta: n, target: r, should: i, shadowParent: Ko(r) };
      (t.current.push(a),
        setTimeout(function () {
          t.current = t.current.filter(function (e) {
            return e !== a;
          });
        }, 1));
    }, []),
    u = D.useCallback(function (e) {
      ((n.current = Ro(e)), (r.current = void 0));
    }, []),
    d = D.useCallback(function (t) {
      l(t.type, zo(t), t.target, s(t, e.lockRef.current));
    }, []),
    f = D.useCallback(function (t) {
      l(t.type, Ro(t), t.target, s(t, e.lockRef.current));
    }, []);
  D.useEffect(function () {
    return (
      Wo.push(a),
      e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: f }),
      document.addEventListener(`wheel`, c, Eo),
      document.addEventListener(`touchmove`, c, Eo),
      document.addEventListener(`touchstart`, u, Eo),
      function () {
        ((Wo = Wo.filter(function (e) {
          return e !== a;
        })),
          document.removeEventListener(`wheel`, c, Eo),
          document.removeEventListener(`touchmove`, c, Eo),
          document.removeEventListener(`touchstart`, u, Eo));
      }
    );
  }, []);
  var p = e.removeScrollBar,
    m = e.inert;
  return D.createElement(
    D.Fragment,
    null,
    m ? D.createElement(a, { styles: Ho(i) }) : null,
    p ? D.createElement(Co, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  );
}
function Ko(e) {
  for (var t = null; e !== null;)
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
var qo = to(no, Go),
  Jo = D.forwardRef(function (e, t) {
    return D.createElement(io, za({}, e, { ref: t, sideCar: qo }));
  });
Jo.classNames = io.classNames;
var Yo = Object.defineProperty,
  Z = (e, t) => Yo(e, `name`, { value: t, configurable: !0 }),
  Xo = [` `, `Enter`, `ArrowUp`, `ArrowDown`],
  Zo = [` `, `Enter`],
  Qo = `Select`,
  [$o, es, ts] = te(Qo),
  [ns, rs] = F(Qo, [ts, ca]),
  is = ca(),
  [as, os] = ns(Qo),
  [ss, cs] = ns(Qo);
function ls(e) {
  let {
      __scopeSelect: t,
      children: n,
      open: r,
      defaultOpen: i,
      onOpenChange: a,
      value: o,
      defaultValue: s,
      onValueChange: c,
      dir: l,
      name: u,
      autoComplete: d,
      disabled: f,
      required: p,
      form: m,
      internal_do_not_use_render: h,
    } = e,
    g = is(t),
    [_, v] = D.useState(null),
    [y, b] = D.useState(null),
    [x, S] = D.useState(!1),
    C = gt(l),
    [w, T] = De({ prop: r, defaultProp: i ?? !1, onChange: a, caller: Qo }),
    [E, O] = De({ prop: o, defaultProp: s, onChange: c, caller: Qo }),
    k = D.useRef(null),
    A = D.useRef(E);
  D.useEffect(() => {
    let e = m ? _?.ownerDocument.getElementById(m) : _?.form;
    if (e instanceof HTMLFormElement) {
      let t = Z(() => O(A.current), `reset`);
      return (e.addEventListener(`reset`, t), () => e.removeEventListener(`reset`, t));
    }
  }, [m, _, O]);
  let j = !_ || !!m || !!_.closest(`form`),
    [N, P] = D.useState(new Set()),
    ee = Ye(),
    F = Array.from(N)
      .map((e) => e.props.value)
      .join(`;`),
    I = D.useCallback((e) => {
      P((t) => new Set(t).add(e));
    }, []),
    L = D.useCallback((e) => {
      P((t) => {
        let n = new Set(t);
        return (n.delete(e), n);
      });
    }, []),
    R = {
      required: p,
      trigger: _,
      onTriggerChange: v,
      valueNode: y,
      onValueNodeChange: b,
      valueNodeHasChildren: x,
      onValueNodeHasChildrenChange: S,
      contentId: ee,
      value: E,
      onValueChange: O,
      open: w,
      onOpenChange: T,
      dir: C,
      triggerPointerDownPosRef: k,
      disabled: f,
      name: u,
      autoComplete: d,
      form: m,
      nativeOptions: N,
      nativeSelectKey: F,
      isFormControl: j,
    };
  return (0, M.jsx)(xa, {
    ...g,
    children: (0, M.jsx)(as, {
      scope: t,
      ...R,
      children: (0, M.jsx)($o.Provider, {
        scope: t,
        children: (0, M.jsx)(ss, {
          scope: t,
          onNativeOptionAdd: I,
          onNativeOptionRemove: L,
          children: Qs(h) ? h(R) : n,
        }),
      }),
    }),
  });
}
Z(ls, `SelectProvider`);
var us = Z((e) => {
    let { __scopeSelect: t, children: n, ...r } = e;
    return (0, M.jsx)(ls, {
      __scopeSelect: t,
      ...r,
      internal_do_not_use_render: ({ isFormControl: e }) =>
        (0, M.jsxs)(M.Fragment, { children: [n, e ? (0, M.jsx)(Zs, { __scopeSelect: t }) : null] }),
    });
  }, `Select`),
  ds = `SelectTrigger`,
  fs = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, disabled: r = !1, ...i } = e,
        a = is(n),
        o = os(ds, n),
        s = o.disabled || r,
        c = g(t, o.onTriggerChange),
        l = es(n),
        u = D.useRef(`touch`),
        [d, f, p] = ec((e) => {
          let t = l().filter((e) => !e.disabled),
            n = tc(
              t,
              e,
              t.find((e) => e.value === o.value),
            );
          n !== void 0 && o.onValueChange(n.value);
        }),
        m = Z((e) => {
          (s || (o.onOpenChange(!0), p()),
            e &&
              (o.triggerPointerDownPosRef.current = {
                x: Math.round(e.pageX),
                y: Math.round(e.pageY),
              }));
        }, `handleOpen`);
      return (0, M.jsx)(Sa, {
        asChild: !0,
        ...a,
        children: (0, M.jsx)(V.button, {
          type: `button`,
          role: `combobox`,
          "aria-controls": o.open ? o.contentId : void 0,
          "aria-expanded": o.open,
          "aria-required": o.required,
          "aria-autocomplete": `none`,
          dir: o.dir,
          "data-state": o.open ? `open` : `closed`,
          disabled: s,
          "data-disabled": s ? `` : void 0,
          "data-placeholder": $s(o.value) ? `` : void 0,
          ...i,
          ref: c,
          onClick: z(i.onClick, (e) => {
            (e.currentTarget.focus(), u.current !== `mouse` && m(e));
          }),
          onPointerDown: z(i.onPointerDown, (e) => {
            u.current = e.pointerType;
            let t = e.target;
            (t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId),
              e.button === 0 &&
                e.ctrlKey === !1 &&
                e.pointerType === `mouse` &&
                (m(e), e.preventDefault()));
          }),
          onKeyDown: z(i.onKeyDown, (e) => {
            let t = d.current !== ``;
            (!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && f(e.key),
              !(t && e.key === ` `) && Xo.includes(e.key) && (m(), e.preventDefault()));
          }),
        }),
      });
    }, `SelectTrigger`),
  ),
  ps = `SelectValue`,
  ms = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = ``, ...s } = e,
        c = os(ps, n),
        { onValueNodeHasChildrenChange: l } = c,
        u = a !== void 0,
        d = g(t, c.onValueNodeChange);
      B(() => {
        l(u);
      }, [l, u]);
      let f = $s(c.value);
      return (0, M.jsx)(V.span, {
        ...s,
        asChild: !f && s.asChild,
        ref: d,
        style: { pointerEvents: `none` },
        children: (0, M.jsx)(D.Fragment, { children: f ? o : a }, f ? `placeholder` : `value`),
      });
    }, `SelectValue`),
  ),
  hs = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, children: r, ...i } = e;
      return (0, M.jsx)(V.span, { "aria-hidden": !0, ...i, ref: t, children: r || `▼` });
    }, `SelectIcon`),
  ),
  [gs, _s] = ns(`SelectPortal`, { forceMount: void 0 }),
  vs = Z((e) => {
    let { __scopeSelect: t, forceMount: n, ...r } = e;
    return (0, M.jsx)(gs, {
      scope: e.__scopeSelect,
      forceMount: n,
      children: (0, M.jsx)(Ta, { asChild: !0, ...r }),
    });
  }, `SelectPortal`),
  ys = `SelectContent`,
  bs = D.forwardRef(
    Z(function (e, t) {
      let n = _s(ys, e.__scopeSelect),
        { forceMount: r = n.forceMount, ...i } = e,
        a = os(ys, e.__scopeSelect),
        [o, s] = D.useState();
      return (
        B(() => {
          s(new DocumentFragment());
        }, []),
        (0, M.jsx)(ze, {
          present: r || a.open,
          children: ({ present: e }) =>
            e ? (0, M.jsx)(Ts, { ...i, ref: t }) : (0, M.jsx)(xs, { ...i, fragment: o }),
        })
      );
    }, `SelectContent`),
  ),
  xs = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, children: r, fragment: i } = e;
      return i
        ? Me.createPortal(
            (0, M.jsx)(Ss, {
              scope: n,
              children: (0, M.jsx)($o.Slot, {
                scope: n,
                children: (0, M.jsx)(`div`, { ref: t, children: r }),
              }),
            }),
            i,
          )
        : null;
    }, `SelectContentFragment`),
  ),
  Q = 10,
  [Ss, Cs] = ns(ys),
  ws = m(`SelectContent.RemoveScroll`),
  Ts = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n } = e,
        {
          position: r = `item-aligned`,
          onCloseAutoFocus: i,
          onEscapeKeyDown: a,
          onPointerDownOutside: o,
          side: s,
          sideOffset: c,
          align: l,
          alignOffset: u,
          arrowPadding: d,
          collisionBoundary: f,
          collisionPadding: p,
          sticky: m,
          hideWhenDetached: h,
          avoidCollisions: _,
          ...v
        } = e,
        y = os(ys, n),
        [b, x] = D.useState(null),
        [S, C] = D.useState(null),
        w = g(t, x),
        [T, E] = D.useState(null),
        [O, k] = D.useState(null),
        A = es(n),
        [j, N] = D.useState(!1),
        P = D.useRef(!1);
      (D.useEffect(() => {
        if (b) return Ra(b);
      }, [b]),
        An());
      let ee = D.useCallback(
          (e) => {
            let [t, ...n] = A().map((e) => e.ref.current),
              [r] = n.slice(-1),
              i = document.activeElement;
            for (let n of e)
              if (
                n === i ||
                (n?.scrollIntoView({ block: `nearest` }),
                n === t && S && (S.scrollTop = 0),
                n === r && S && (S.scrollTop = S.scrollHeight),
                n?.focus(),
                document.activeElement !== i)
              )
                return;
          },
          [A, S],
        ),
        F = D.useCallback(() => ee([T, b]), [ee, T, b]);
      D.useEffect(() => {
        j && F();
      }, [j, F]);
      let { onOpenChange: I, triggerPointerDownPosRef: L } = y;
      (D.useEffect(() => {
        if (b) {
          let e = { x: 0, y: 0 },
            t = Z((t) => {
              e = {
                x: Math.abs(Math.round(t.pageX) - (L.current?.x ?? 0)),
                y: Math.abs(Math.round(t.pageY) - (L.current?.y ?? 0)),
              };
            }, `handlePointerMove`),
            n = Z((n) => {
              (e.x <= 10 && e.y <= 10 ? n.preventDefault() : n.composedPath().includes(b) || I(!1),
                document.removeEventListener(`pointermove`, t),
                (L.current = null));
            }, `handlePointerUp`);
          return (
            L.current !== null &&
              (document.addEventListener(`pointermove`, t),
              document.addEventListener(`pointerup`, n, { capture: !0, once: !0 })),
            () => {
              (document.removeEventListener(`pointermove`, t),
                document.removeEventListener(`pointerup`, n, { capture: !0 }));
            }
          );
        }
      }, [b, I, L]),
        D.useEffect(() => {
          let e = Z(() => I(!1), `close`);
          return (
            window.addEventListener(`blur`, e),
            window.addEventListener(`resize`, e),
            () => {
              (window.removeEventListener(`blur`, e), window.removeEventListener(`resize`, e));
            }
          );
        }, [I]));
      let [R, te] = ec((e) => {
          let t = A().filter((e) => !e.disabled),
            n = tc(
              t,
              e,
              t.find((e) => e.ref.current === document.activeElement),
            );
          n && setTimeout(() => n.ref.current?.focus());
        }),
        ne = D.useCallback(
          (e, t, n) => {
            let r = !P.current && !n;
            ((y.value !== void 0 && y.value === t) || r) && (E(e), r && (P.current = !0));
          },
          [y.value],
        ),
        re = D.useCallback(() => b?.focus(), [b]),
        ie = D.useCallback(
          (e, t, n) => {
            let r = !P.current && !n;
            ((y.value !== void 0 && y.value === t) || r) && k(e);
          },
          [y.value],
        ),
        ae = r === `popper` ? Ds : Es,
        oe =
          ae === Ds
            ? {
                side: s,
                sideOffset: c,
                align: l,
                alignOffset: u,
                arrowPadding: d,
                collisionBoundary: f,
                collisionPadding: p,
                sticky: m,
                hideWhenDetached: h,
                avoidCollisions: _,
              }
            : {};
      return (0, M.jsx)(Ss, {
        scope: n,
        content: b,
        viewport: S,
        onViewportChange: C,
        itemRefCallback: ne,
        selectedItem: T,
        onItemLeave: re,
        itemTextRefCallback: ie,
        focusSelectedItem: F,
        selectedItemText: O,
        position: r,
        isPositioned: j,
        searchRef: R,
        children: (0, M.jsx)(Jo, {
          as: ws,
          allowPinchZoom: !0,
          children: (0, M.jsx)(In, {
            asChild: !0,
            trapped: y.open,
            onMountAutoFocus: (e) => {
              e.preventDefault();
            },
            onUnmountAutoFocus: z(i, (e) => {
              (y.trigger?.focus({ preventScroll: !0 }), e.preventDefault());
            }),
            children: (0, M.jsx)(vn, {
              asChild: !0,
              disableOutsidePointerEvents: !0,
              onEscapeKeyDown: a,
              onPointerDownOutside: o,
              onFocusOutside: (e) => e.preventDefault(),
              onDismiss: () => y.onOpenChange(!1),
              children: (0, M.jsx)(ae, {
                role: `listbox`,
                id: y.contentId,
                "data-state": y.open ? `open` : `closed`,
                dir: y.dir,
                onContextMenu: (e) => e.preventDefault(),
                ...v,
                ...oe,
                onPlaced: () => N(!0),
                ref: w,
                style: { display: `flex`, flexDirection: `column`, outline: `none`, ...v.style },
                onKeyDown: z(v.onKeyDown, (e) => {
                  let t = e.ctrlKey || e.altKey || e.metaKey;
                  if (
                    (e.key === `Tab` && e.preventDefault(),
                    !t && e.key.length === 1 && te(e.key),
                    [`ArrowUp`, `ArrowDown`, `Home`, `End`].includes(e.key))
                  ) {
                    let t = A()
                      .filter((e) => !e.disabled)
                      .map((e) => e.ref.current);
                    if (
                      ([`ArrowUp`, `End`].includes(e.key) && (t = t.slice().reverse()),
                      [`ArrowUp`, `ArrowDown`].includes(e.key))
                    ) {
                      let n = e.target,
                        r = t.indexOf(n);
                      t = t.slice(r + 1);
                    }
                    (setTimeout(() => ee(t)), e.preventDefault());
                  }
                }),
              }),
            }),
          }),
        }),
      });
    }, `SelectContentImpl`),
  ),
  Es = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, onPlaced: r, ...i } = e,
        a = os(ys, n),
        o = Cs(ys, n),
        [s, c] = D.useState(null),
        [l, u] = D.useState(null),
        d = g(t, u),
        f = es(n),
        p = D.useRef(!1),
        m = D.useRef(!0),
        { viewport: h, selectedItem: _, selectedItemText: v, focusSelectedItem: y } = o,
        b = D.useCallback(() => {
          if (a.trigger && a.valueNode && s && l && h && _ && v) {
            let e = a.trigger.getBoundingClientRect(),
              t = l.getBoundingClientRect(),
              n = a.valueNode.getBoundingClientRect(),
              i = v.getBoundingClientRect();
            if (a.dir !== `rtl`) {
              let r = i.left - t.left,
                a = n.left - r,
                o = e.left - a,
                c = e.width + o,
                l = Math.max(c, t.width),
                u = window.innerWidth - Q,
                d = ln(a, [Q, Math.max(Q, u - l)]);
              ((s.style.minWidth = c + `px`), (s.style.left = d + `px`));
            } else {
              let r = t.right - i.right,
                a = window.innerWidth - n.right - r,
                o = window.innerWidth - e.right - a,
                c = e.width + o,
                l = Math.max(c, t.width),
                u = window.innerWidth - Q,
                d = ln(a, [Q, Math.max(Q, u - l)]);
              ((s.style.minWidth = c + `px`), (s.style.right = d + `px`));
            }
            let o = f(),
              c = window.innerHeight - Q * 2,
              u = h.scrollHeight,
              d = window.getComputedStyle(l),
              m = parseInt(d.borderTopWidth, 10),
              g = parseInt(d.paddingTop, 10),
              y = parseInt(d.borderBottomWidth, 10),
              b = parseInt(d.paddingBottom, 10),
              x = m + g + u + b + y,
              S = Math.min(_.offsetHeight * 5, x),
              C = window.getComputedStyle(h),
              w = parseInt(C.paddingTop, 10),
              T = parseInt(C.paddingBottom, 10),
              E = e.top + e.height / 2 - Q,
              D = c - E,
              O = _.offsetHeight / 2,
              k = _.offsetTop + O,
              A = m + g + k,
              j = x - A;
            if (A <= E) {
              let e = o.length > 0 && _ === o[o.length - 1].ref.current;
              s.style.bottom = `0px`;
              let t = l.clientHeight - h.offsetTop - h.offsetHeight,
                n = A + Math.max(D, O + (e ? T : 0) + t + y);
              s.style.height = n + `px`;
            } else {
              let e = o.length > 0 && _ === o[0].ref.current;
              s.style.top = `0px`;
              let t = Math.max(E, m + h.offsetTop + (e ? w : 0) + O) + j;
              ((s.style.height = t + `px`), (h.scrollTop = A - E + h.offsetTop));
            }
            ((s.style.margin = `${Q}px 0`),
              (s.style.minHeight = S + `px`),
              (s.style.maxHeight = c + `px`),
              r?.(),
              requestAnimationFrame(() => (p.current = !0)));
          }
        }, [f, a.trigger, a.valueNode, s, l, h, _, v, a.dir, r]);
      B(() => b(), [b]);
      let [x, S] = D.useState();
      B(() => {
        l && S(window.getComputedStyle(l).zIndex);
      }, [l]);
      let C = D.useCallback(
        (e) => {
          e && m.current === !0 && (b(), y?.(), (m.current = !1));
        },
        [b, y],
      );
      return (0, M.jsx)(Os, {
        scope: n,
        contentWrapper: s,
        shouldExpandOnScrollRef: p,
        onScrollButtonChange: C,
        children: (0, M.jsx)(`div`, {
          ref: c,
          style: { display: `flex`, flexDirection: `column`, position: `fixed`, zIndex: x },
          children: (0, M.jsx)(V.div, {
            ...i,
            ref: d,
            style: { boxSizing: `border-box`, maxHeight: `100%`, ...i.style },
          }),
        }),
      });
    }, `SelectItemAlignedPosition`),
  ),
  Ds = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, align: r = `start`, collisionPadding: i = Q, ...a } = e,
        o = is(n);
      return (0, M.jsx)(Ca, {
        ...o,
        ...a,
        ref: t,
        align: r,
        collisionPadding: i,
        style: {
          boxSizing: `border-box`,
          ...a.style,
          "--radix-select-content-transform-origin": `var(--radix-popper-transform-origin)`,
          "--radix-select-content-available-width": `var(--radix-popper-available-width)`,
          "--radix-select-content-available-height": `var(--radix-popper-available-height)`,
          "--radix-select-trigger-width": `var(--radix-popper-anchor-width)`,
          "--radix-select-trigger-height": `var(--radix-popper-anchor-height)`,
        },
      });
    }, `SelectPopperPosition`),
  ),
  [Os, ks] = ns(ys, {}),
  As = `SelectViewport`,
  js = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, nonce: r, ...i } = e,
        a = Cs(As, n),
        o = ks(As, n),
        s = g(t, a.onViewportChange),
        c = D.useRef(0);
      return (0, M.jsxs)(M.Fragment, {
        children: [
          (0, M.jsx)(`style`, {
            dangerouslySetInnerHTML: {
              __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`,
            },
            nonce: r,
          }),
          (0, M.jsx)($o.Slot, {
            scope: n,
            children: (0, M.jsx)(V.div, {
              "data-radix-select-viewport": ``,
              role: `presentation`,
              ...i,
              ref: s,
              style: { position: `relative`, flex: 1, overflow: `hidden auto`, ...i.style },
              onScroll: z(i.onScroll, (e) => {
                let t = e.currentTarget,
                  { contentWrapper: n, shouldExpandOnScrollRef: r } = o;
                if (r?.current && n) {
                  let e = Math.abs(c.current - t.scrollTop);
                  if (e > 0) {
                    let r = window.innerHeight - Q * 2,
                      i = parseFloat(n.style.minHeight),
                      a = parseFloat(n.style.height),
                      o = Math.max(i, a);
                    if (o < r) {
                      let i = o + e,
                        a = Math.min(r, i),
                        s = i - a;
                      ((n.style.height = a + `px`),
                        n.style.bottom === `0px` &&
                          ((t.scrollTop = s > 0 ? s : 0), (n.style.justifyContent = `flex-end`)));
                    }
                  }
                }
                c.current = t.scrollTop;
              }),
            }),
          }),
        ],
      });
    }, `SelectViewport`),
  ),
  [Ms, Ns] = ns(`SelectGroup`),
  Ps = `SelectLabel`,
  Fs = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, ...r } = e,
        i = Ns(Ps, n);
      return (0, M.jsx)(V.div, { id: i.id, ...r, ref: t });
    }, `SelectLabel`),
  ),
  Is = `SelectItem`,
  [Ls, Rs] = ns(Is),
  zs = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, value: r, disabled: i = !1, textValue: a, ...o } = e,
        s = os(Is, n),
        c = Cs(Is, n),
        l = s.value === r,
        [u, d] = D.useState(a ?? ``),
        [f, p] = D.useState(!1),
        m = W((e) => c.itemRefCallback?.(e, r, i)),
        h = g(t, m),
        _ = Ye(),
        v = D.useRef(`touch`),
        y = Z(() => {
          i || (s.onValueChange(r), s.onOpenChange(!1));
        }, `handleSelect`);
      return (0, M.jsx)(Ls, {
        scope: n,
        value: r,
        disabled: i,
        textId: _,
        isSelected: l,
        onItemTextChange: D.useCallback((e) => {
          d((t) => t || (e?.textContent ?? ``).trim());
        }, []),
        children: (0, M.jsx)($o.ItemSlot, {
          scope: n,
          value: r,
          disabled: i,
          textValue: u,
          children: (0, M.jsx)(V.div, {
            role: `option`,
            "aria-labelledby": _,
            "data-highlighted": f ? `` : void 0,
            "aria-selected": l && f,
            "data-state": l ? `checked` : `unchecked`,
            "aria-disabled": i || void 0,
            "data-disabled": i ? `` : void 0,
            tabIndex: i ? void 0 : -1,
            ...o,
            ref: h,
            onFocus: z(o.onFocus, () => p(!0)),
            onBlur: z(o.onBlur, () => p(!1)),
            onClick: z(o.onClick, () => {
              v.current !== `mouse` && y();
            }),
            onPointerUp: z(o.onPointerUp, () => {
              v.current === `mouse` && y();
            }),
            onPointerDown: z(o.onPointerDown, (e) => {
              v.current = e.pointerType;
            }),
            onPointerMove: z(o.onPointerMove, (e) => {
              ((v.current = e.pointerType),
                i
                  ? c.onItemLeave?.()
                  : v.current === `mouse` && e.currentTarget.focus({ preventScroll: !0 }));
            }),
            onPointerLeave: z(o.onPointerLeave, (e) => {
              e.currentTarget === document.activeElement && c.onItemLeave?.();
            }),
            onKeyDown: z(o.onKeyDown, (e) => {
              i ||
                e.target !== e.currentTarget ||
                ((c.searchRef?.current === `` || e.key !== ` `) &&
                  (Zo.includes(e.key) && y(), e.key === ` ` && e.preventDefault()));
            }),
          }),
        }),
      });
    }, `SelectItem`),
  ),
  Bs = `SelectItemText`,
  Vs = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, className: r, style: i, ...a } = e,
        o = os(Bs, n),
        s = Cs(Bs, n),
        c = Rs(Bs, n),
        l = cs(Bs, n),
        [u, d] = D.useState(null),
        f = W((e) => s.itemTextRefCallback?.(e, c.value, c.disabled)),
        p = g(t, d, c.onItemTextChange, f),
        m = u?.textContent,
        h = D.useMemo(
          () =>
            (0, M.jsx)(`option`, { value: c.value, disabled: c.disabled, children: m }, c.value),
          [c.disabled, c.value, m],
        ),
        { onNativeOptionAdd: _, onNativeOptionRemove: v } = l;
      return (
        B(() => (_(h), () => v(h)), [_, v, h]),
        (0, M.jsxs)(M.Fragment, {
          children: [
            (0, M.jsx)(V.span, { id: c.textId, ...a, ref: p }),
            c.isSelected && o.valueNode && !o.valueNodeHasChildren && !$s(o.value)
              ? Me.createPortal(a.children, o.valueNode)
              : null,
          ],
        })
      );
    }, `SelectItemText`),
  ),
  Hs = `SelectItemIndicator`,
  Us = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, ...r } = e;
      return Rs(Hs, n).isSelected ? (0, M.jsx)(V.span, { "aria-hidden": !0, ...r, ref: t }) : null;
    }, `SelectItemIndicator`),
  ),
  Ws = `SelectScrollUpButton`,
  Gs = D.forwardRef(
    Z(function (e, t) {
      let n = Cs(Ws, e.__scopeSelect),
        r = ks(Ws, e.__scopeSelect),
        [i, a] = D.useState(!1),
        o = g(t, r.onScrollButtonChange);
      return (
        B(() => {
          if (n.viewport && n.isPositioned) {
            let e = function () {
              let e = t.scrollTop > 0;
              a(e);
            };
            Z(e, `handleScroll`);
            let t = n.viewport;
            return (e(), t.addEventListener(`scroll`, e), () => t.removeEventListener(`scroll`, e));
          }
        }, [n.viewport, n.isPositioned]),
        i
          ? (0, M.jsx)(Js, {
              ...e,
              ref: o,
              onAutoScroll: () => {
                let { viewport: e, selectedItem: t } = n;
                e && t && (e.scrollTop -= t.offsetHeight);
              },
            })
          : null
      );
    }, `SelectScrollUpButton`),
  ),
  Ks = `SelectScrollDownButton`,
  qs = D.forwardRef(
    Z(function (e, t) {
      let n = Cs(Ks, e.__scopeSelect),
        r = ks(Ks, e.__scopeSelect),
        [i, a] = D.useState(!1),
        o = g(t, r.onScrollButtonChange);
      return (
        B(() => {
          if (n.viewport && n.isPositioned) {
            let e = function () {
              let e = t.scrollHeight - t.clientHeight,
                n = Math.ceil(t.scrollTop) < e;
              a(n);
            };
            Z(e, `handleScroll`);
            let t = n.viewport;
            return (e(), t.addEventListener(`scroll`, e), () => t.removeEventListener(`scroll`, e));
          }
        }, [n.viewport, n.isPositioned]),
        i
          ? (0, M.jsx)(Js, {
              ...e,
              ref: o,
              onAutoScroll: () => {
                let { viewport: e, selectedItem: t } = n;
                e && t && (e.scrollTop += t.offsetHeight);
              },
            })
          : null
      );
    }, `SelectScrollDownButton`),
  ),
  Js = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, onAutoScroll: r, ...i } = e,
        a = Cs(`SelectScrollButton`, n),
        o = D.useRef(null),
        s = es(n),
        c = D.useCallback(() => {
          o.current !== null && (window.clearInterval(o.current), (o.current = null));
        }, []);
      return (
        D.useEffect(() => () => c(), [c]),
        B(() => {
          s()
            .find((e) => e.ref.current === document.activeElement)
            ?.ref.current?.scrollIntoView({ block: `nearest` });
        }, [s]),
        (0, M.jsx)(V.div, {
          "aria-hidden": !0,
          ...i,
          ref: t,
          style: { flexShrink: 0, ...i.style },
          onPointerDown: z(i.onPointerDown, () => {
            o.current === null && (o.current = window.setInterval(r, 50));
          }),
          onPointerMove: z(i.onPointerMove, () => {
            (a.onItemLeave?.(), o.current === null && (o.current = window.setInterval(r, 50)));
          }),
          onPointerLeave: z(i.onPointerLeave, () => {
            c();
          }),
        })
      );
    }, `SelectScrollButtonImpl`),
  ),
  Ys = D.forwardRef(
    Z(function (e, t) {
      let { __scopeSelect: n, ...r } = e;
      return (0, M.jsx)(V.div, { "aria-hidden": !0, ...r, ref: t });
    }, `SelectSeparator`),
  ),
  Xs = `SelectBubbleInput`,
  Zs = D.forwardRef(
    Z(function ({ __scopeSelect: e, ...t }, n) {
      let r = os(Xs, e),
        {
          value: i,
          onValueChange: a,
          required: o,
          disabled: s,
          name: c,
          autoComplete: l,
          form: u,
        } = r,
        { nativeOptions: d, nativeSelectKey: f } = r,
        p = D.useRef(null),
        m = g(n, p),
        h = i ?? ``,
        _ = Oa(h),
        v = Array.from(d).some((e) => (e.props.value ?? ``) === ``);
      return (
        D.useEffect(() => {
          let e = p.current;
          if (!e) return;
          let t = window.HTMLSelectElement.prototype,
            n = Object.getOwnPropertyDescriptor(t, `value`).set;
          if (_ !== h && n) {
            let t = new Event(`change`, { bubbles: !0 });
            (n.call(e, h), e.dispatchEvent(t));
          }
        }, [_, h]),
        (0, M.jsxs)(
          V.select,
          {
            "aria-hidden": !0,
            required: o,
            tabIndex: -1,
            name: c,
            autoComplete: l,
            disabled: s,
            form: u,
            onChange: (e) => a(e.target.value),
            ...t,
            style: { ...ka, ...t.style },
            ref: m,
            defaultValue: h,
            children: [$s(i) && !v ? (0, M.jsx)(`option`, { value: `` }) : null, Array.from(d)],
          },
          f,
        )
      );
    }, `SelectBubbleInput`),
  );
function Qs(e) {
  return typeof e == `function`;
}
Z(Qs, `isFunction`);
function $s(e) {
  return e === `` || e === void 0;
}
Z($s, `shouldShowPlaceholder`);
function ec(e) {
  let t = W(e),
    n = D.useRef(``),
    r = D.useRef(0),
    i = D.useCallback(
      (e) => {
        let i = n.current + e;
        (t(i),
          Z(function e(t) {
            ((n.current = t),
              window.clearTimeout(r.current),
              t !== `` && (r.current = window.setTimeout(() => e(``), 1e3)));
          }, `updateSearch`)(i));
      },
      [t],
    ),
    a = D.useCallback(() => {
      ((n.current = ``), window.clearTimeout(r.current));
    }, []);
  return (D.useEffect(() => () => window.clearTimeout(r.current), []), [n, i, a]);
}
Z(ec, `useTypeaheadSearch`);
function tc(e, t, n) {
  let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1,
    a = nc(e, Math.max(i, 0));
  r.length === 1 && (a = a.filter((e) => e !== n));
  let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
  return o === n ? void 0 : o;
}
Z(tc, `findNextItem`);
function nc(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
Z(nc, `wrapArray`);
var rc = us,
  ic = ms,
  ac = D.forwardRef(({ className: e, children: t, ...n }, r) =>
    (0, M.jsxs)(fs, {
      ref: r,
      className: f(
        `flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        e,
      ),
      ...n,
      children: [
        t,
        (0, M.jsx)(hs, {
          asChild: !0,
          children: (0, M.jsx)(b, { className: `h-4 w-4 opacity-50` }),
        }),
      ],
    }),
  );
ac.displayName = fs.displayName;
var oc = D.forwardRef(({ className: e, ...t }, n) =>
  (0, M.jsx)(Gs, {
    ref: n,
    className: f(`flex cursor-default items-center justify-center py-1`, e),
    ...t,
    children: (0, M.jsx)(x, { className: `h-4 w-4` }),
  }),
);
oc.displayName = Gs.displayName;
var sc = D.forwardRef(({ className: e, ...t }, n) =>
  (0, M.jsx)(qs, {
    ref: n,
    className: f(`flex cursor-default items-center justify-center py-1`, e),
    ...t,
    children: (0, M.jsx)(b, { className: `h-4 w-4` }),
  }),
);
sc.displayName = qs.displayName;
var cc = D.forwardRef(({ className: e, children: t, position: n = `popper`, ...r }, i) =>
  (0, M.jsx)(vs, {
    children: (0, M.jsxs)(bs, {
      ref: i,
      className: f(
        `relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)`,
        n === `popper` &&
          `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
        e,
      ),
      position: n,
      ...r,
      children: [
        (0, M.jsx)(oc, {}),
        (0, M.jsx)(js, {
          className: f(
            `p-1`,
            n === `popper` &&
              `h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]`,
          ),
          children: t,
        }),
        (0, M.jsx)(sc, {}),
      ],
    }),
  }),
);
cc.displayName = bs.displayName;
var lc = D.forwardRef(({ className: e, ...t }, n) =>
  (0, M.jsx)(Fs, { ref: n, className: f(`px-2 py-1.5 text-sm font-semibold`, e), ...t }),
);
lc.displayName = Fs.displayName;
var uc = D.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, M.jsxs)(zs, {
    ref: r,
    className: f(
      `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      e,
    ),
    ...n,
    children: [
      (0, M.jsx)(`span`, {
        className: `absolute right-2 flex h-3.5 w-3.5 items-center justify-center`,
        children: (0, M.jsx)(Us, { children: (0, M.jsx)(i, { className: `h-4 w-4` }) }),
      }),
      (0, M.jsx)(Vs, { children: t }),
    ],
  }),
);
uc.displayName = zs.displayName;
var dc = D.forwardRef(({ className: e, ...t }, n) =>
  (0, M.jsx)(Ys, { ref: n, className: f(`-mx-1 my-1 h-px bg-muted`, e), ...t }),
);
dc.displayName = Ys.displayName;
var fc = D.forwardRef(({ className: e, ...t }, n) =>
  (0, M.jsx)(`textarea`, {
    className: f(
      `flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
      e,
    ),
    ref: n,
    ...t,
  }),
);
fc.displayName = `Textarea`;
var pc = {
    "White Desert Overnight": `/programs/white-desert-overnight`,
    "White Desert Day Trip": `/programs/white-desert-overnight`,
    "White + Black Desert Expedition": `/programs/bahariya-expedition`,
    "Private Custom Journey": `/programs/fayoum-safari`,
  },
  mc = [
    {
      number: `01`,
      title: `White Desert Overnight`,
      duration: `2 days · 1 night`,
      description: `Cross the chalk wilderness at golden hour, dine by firelight, and sleep beneath an unbroken sky.`,
      image: k,
      alt: `Private lantern-lit camp among White Desert limestone formations beneath the stars`,
      featured: !0,
    },
    {
      number: `02`,
      title: `White Desert Day Trip`,
      duration: `Full day`,
      description: `A focused private journey through the White Desert's most remarkable formations and open horizons.`,
      image: A,
      alt: `Sunlit mushroom-shaped limestone formations in Egypt's White Desert`,
      featured: !1,
    },
    {
      number: `03`,
      title: `White + Black Desert Expedition`,
      duration: `3 days · 2 nights`,
      description: `A deeper passage from volcanic ridges to the luminous chalk landscapes of the White Desert.`,
      image: j,
      alt: `Dark volcanic ridges meeting pale formations between Egypt's Black and White Deserts`,
      featured: !1,
    },
    {
      number: `04`,
      title: `Private Custom Journey`,
      duration: `Tailored to you`,
      description: `A considered Egypt desert safari shaped around your pace, interests, and time in the country.`,
      image: O,
      alt: `Wide White Desert landscape illuminated by the final light of day`,
      featured: !1,
    },
  ],
  hc = [
    [`Private & curated`, `Your journey is shaped around your party, not a fixed crowd.`],
    [
      `Local desert expertise`,
      `Routes are guided by people who understand the terrain and its rhythms.`,
    ],
    [
      `Flexible itineraries`,
      `We adapt the pace and details to how you want to experience the desert.`,
    ],
    [
      `Authentic experiences`,
      `Quiet, landscape, firelight, and generous Egyptian hospitality remain at the center.`,
    ],
  ],
  gc = [
    [
      `How do I reach the White Desert from Cairo?`,
      `Most journeys begin with a road transfer from Cairo to Bahariya Oasis, the gateway to the protected White Desert landscape. We coordinate the journey details around your arrival and preferred itinerary.`,
    ],
    [
      `What is the best season for White Desert Egypt?`,
      `October through April generally brings the most comfortable daytime temperatures and cool desert nights. Winter evenings can be cold, so warm layers are important.`,
    ],
    [
      `What is included in a White Desert tour?`,
      `Inclusions depend on the itinerary, but private transport in the desert, meals, water, camping equipment, and local guidance can all be arranged. Your proposal will list every inclusion clearly.`,
    ],
    [
      `What is overnight camping like?`,
      `White Desert camping is simple, comfortable, and deeply atmospheric. After dinner by the fire, the camp settles into silence beneath a remarkably clear night sky. We share a practical packing list before departure.`,
    ],
    [
      `Are journeys private or group tours?`,
      `Our focus is private journeys. This gives you a quieter experience, a flexible pace, and more freedom to spend time where the landscape moves you.`,
    ],
    [
      `Can I add the Black Desert to my journey?`,
      `Yes. Black Desert Egypt makes a striking counterpoint to the White Desert and works naturally within a longer expedition. We can also include selected Bahariya landscapes without shifting focus from the White Desert.`,
    ],
  ];
function _c() {
  (0, D.useEffect)(() => {
    let e = document.querySelectorAll(`.reveal`),
      t = new IntersectionObserver(
        (e) => e.forEach((e) => e.isIntersecting && e.target.classList.add(`is-visible`)),
        { threshold: 0.12 },
      );
    return (e.forEach((e) => t.observe(e)), () => t.disconnect());
  }, []);
}
function vc({ light: e = !1 }) {
  return (0, M.jsxs)(`a`, {
    href: `#top`,
    "aria-label": `White Desert Horizons home`,
    className: e ? `text-hero-foreground` : `text-foreground`,
    children: [
      (0, M.jsx)(`span`, {
        className: `block font-serif text-[1.15rem] font-medium leading-none sm:text-[1.28rem]`,
        children: `WHITE DESERT`,
      }),
      (0, M.jsx)(`span`, {
        className: `mt-1 block text-[0.54rem] font-semibold uppercase tracking-[0.36em] text-primary`,
        children: `Horizons`,
      }),
    ],
  });
}
function yc() {
  let [e, t] = (0, D.useState)(!1),
    n = () => t(!1);
  return (0, M.jsxs)(`header`, {
    className: `absolute inset-x-0 top-0 z-50 border-b border-hero-foreground/20 text-hero-foreground`,
    children: [
      (0, M.jsxs)(`div`, {
        className: `mx-auto grid h-24 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-12`,
        children: [
          (0, M.jsx)(vc, { light: !0 }),
          (0, M.jsxs)(`div`, {
            className: `flex shrink-0 items-center gap-8`,
            children: [
              (0, M.jsx)(`nav`, {
                "aria-label": `Primary navigation`,
                className: `hidden items-center gap-8 lg:flex`,
                children: p.map((e) =>
                  (0, M.jsx)(
                    `a`,
                    {
                      href: e.href,
                      className: `text-[0.67rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-primary`,
                      children: e.label,
                    },
                    e.href,
                  ),
                ),
              }),
              (0, M.jsx)(h, {
                asChild: !0,
                variant: `goldOutline`,
                size: `journey`,
                className: `hidden md:inline-flex`,
                children: (0, M.jsx)(`a`, { href: `#plan`, children: `Book your journey` }),
              }),
              (0, M.jsx)(h, {
                variant: `ghost`,
                size: `icon`,
                className: `text-hero-foreground hover:bg-hero-foreground/10 hover:text-primary lg:hidden`,
                onClick: () => t((e) => !e),
                "aria-expanded": e,
                "aria-controls": `mobile-menu`,
                "aria-label": e ? `Close menu` : `Open menu`,
                children: e ? (0, M.jsx)(s, {}) : (0, M.jsx)(C, {}),
              }),
            ],
          }),
        ],
      }),
      e &&
        (0, M.jsx)(`nav`, {
          id: `mobile-menu`,
          "aria-label": `Mobile navigation`,
          className: `border-t border-line-dark bg-surface-dark px-5 py-6 text-surface-dark-foreground lg:hidden`,
          children: (0, M.jsxs)(`div`, {
            className: `mx-auto flex max-w-[1440px] flex-col`,
            children: [
              p.map((e) =>
                (0, M.jsx)(
                  `a`,
                  {
                    href: e.href,
                    onClick: n,
                    className: `border-b border-line-dark py-4 font-serif text-2xl`,
                    children: e.label,
                  },
                  e.href,
                ),
              ),
              (0, M.jsx)(h, {
                asChild: !0,
                variant: `gold`,
                size: `journey`,
                className: `mt-6`,
                children: (0, M.jsx)(`a`, {
                  href: `#plan`,
                  onClick: n,
                  children: `Book your journey`,
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function bc() {
  return (0, M.jsxs)(`section`, {
    id: `top`,
    className: `relative min-h-[92svh] overflow-hidden bg-hero-background text-hero-foreground`,
    children: [
      (0, M.jsx)(`img`, {
        src: O,
        alt: `White Desert Egypt limestone formations glowing at sunset`,
        width: 1920,
        height: 1280,
        fetchPriority: `high`,
        className: `absolute inset-0 h-full w-full object-cover object-[57%_center]`,
      }),
      (0, M.jsx)(`div`, { className: `cinematic-overlay absolute inset-0` }),
      (0, M.jsx)(yc, {}),
      (0, M.jsx)(`div`, {
        className: `relative z-10 mx-auto flex min-h-[92svh] max-w-[1440px] items-end px-5 pb-24 pt-40 sm:px-8 sm:pb-28 lg:px-12 lg:pb-24`,
        children: (0, M.jsxs)(`div`, {
          className: `max-w-4xl`,
          children: [
            (0, M.jsx)(`p`, {
              className: `mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary`,
              children: `White Desert · Egypt`,
            }),
            (0, M.jsxs)(`h1`, {
              className: `editorial-title text-[4.25rem] sm:text-8xl lg:text-[8.8rem]`,
              children: [
                `Beyond the`,
                (0, M.jsx)(`br`, {}),
                (0, M.jsx)(`em`, { className: `font-normal`, children: `Horizon.` }),
              ],
            }),
            (0, M.jsxs)(`div`, {
              className: `mt-7 flex max-w-2xl flex-col gap-7 border-l border-primary pl-5 sm:mt-9 sm:flex-row sm:items-end sm:justify-between sm:pl-7`,
              children: [
                (0, M.jsx)(`p`, {
                  className: `max-w-md text-base leading-7 text-hero-foreground/80 sm:text-lg`,
                  children: `Private journeys into Egypt’s White Desert—shaped by open horizons, sculpted chalk, and silence.`,
                }),
                (0, M.jsxs)(`div`, {
                  className: `flex flex-wrap gap-3`,
                  children: [
                    (0, M.jsx)(h, {
                      asChild: !0,
                      variant: `gold`,
                      size: `journey`,
                      children: (0, M.jsxs)(`a`, {
                        href: `#experiences`,
                        children: [`Explore the White Desert `, (0, M.jsx)(d, {})],
                      }),
                    }),
                    (0, M.jsx)(h, {
                      asChild: !0,
                      variant: `ivoryOutline`,
                      size: `journey`,
                      children: (0, M.jsx)(`a`, { href: `#plan`, children: `Plan your journey` }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      (0, M.jsx)(`a`, {
        href: `#introduction`,
        "aria-label": `Scroll to introduction`,
        className: `soft-pulse absolute bottom-6 right-6 z-10 grid h-11 w-11 place-items-center rounded-full border border-hero-foreground/40 text-hero-foreground sm:right-10`,
        children: (0, M.jsx)(v, { className: `h-4 w-4` }),
      }),
    ],
  });
}
function xc() {
  return (0, M.jsx)(`section`, {
    id: `introduction`,
    className: `px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-44`,
    children: (0, M.jsxs)(`div`, {
      className: `reveal mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24`,
      children: [
        (0, M.jsxs)(`div`, {
          children: [
            (0, M.jsx)(`p`, { className: `section-kicker`, children: `The signature journey` }),
            (0, M.jsx)(`span`, {
              className: `mt-10 block font-serif text-7xl text-primary/50`,
              children: `01`,
            }),
          ],
        }),
        (0, M.jsxs)(`div`, {
          children: [
            (0, M.jsxs)(`h2`, {
              className: `editorial-title max-w-4xl text-5xl sm:text-7xl lg:text-[6.2rem]`,
              children: [
                `A different kind`,
                (0, M.jsx)(`br`, {}),
                `of `,
                (0, M.jsx)(`em`, { children: `desert.` }),
              ],
            }),
            (0, M.jsxs)(`div`, {
              className: `mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 sm:gap-12`,
              children: [
                (0, M.jsx)(`p`, {
                  className: `text-base leading-8 text-muted-foreground`,
                  children: `The White Desert is our defining experience: a surreal expanse of chalk formations shaped by wind into forms that feel almost imagined.`,
                }),
                (0, M.jsx)(`p`, {
                  className: `text-base leading-8 text-muted-foreground`,
                  children: `Here, sunset warms the limestone, stars overtake the sky, and Egypt reveals itself through openness, quiet, and time.`,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Sc() {
  return (0, M.jsx)(`section`, {
    id: `experiences`,
    className: `bg-surface-dark px-5 py-24 text-surface-dark-foreground sm:px-8 sm:py-32 lg:px-12`,
    children: (0, M.jsxs)(`div`, {
      className: `mx-auto max-w-[1440px]`,
      children: [
        (0, M.jsxs)(`div`, {
          className: `reveal flex flex-col justify-between gap-8 border-b border-line-dark pb-10 sm:flex-row sm:items-end`,
          children: [
            (0, M.jsxs)(`div`, {
              children: [
                (0, M.jsx)(`p`, { className: `section-kicker`, children: `Choose your passage` }),
                (0, M.jsx)(`h2`, {
                  className: `editorial-title mt-5 text-5xl sm:text-7xl`,
                  children: `Desert experiences`,
                }),
              ],
            }),
            (0, M.jsx)(`p`, {
              className: `max-w-md text-sm leading-7 text-surface-dark-foreground/60`,
              children: `From a single luminous day to nights beneath the stars, every White Desert tour is privately considered.`,
            }),
          ],
        }),
        (0, M.jsx)(`div`, {
          className: `mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4`,
          children: mc.map((e, t) =>
            (0, M.jsxs)(
              `article`,
              {
                className: `reveal group relative min-h-[520px] overflow-hidden rounded-sm ${e.featured ? `md:col-span-2 xl:col-span-1 xl:min-h-[610px]` : `xl:mt-16`}`,
                style: { transitionDelay: `${t * 80}ms` },
                children: [
                  (0, M.jsx)(`img`, {
                    src: e.image,
                    alt: e.alt,
                    width: e.featured ? 1440 : 1600,
                    height: e.featured ? 1808 : 1200,
                    loading: `lazy`,
                    className: `absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]`,
                  }),
                  (0, M.jsx)(`div`, { className: `image-shade absolute inset-0` }),
                  e.featured &&
                    (0, M.jsx)(`span`, {
                      className: `absolute right-4 top-4 rounded-full bg-primary px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary-foreground`,
                      children: `Signature`,
                    }),
                  (0, M.jsxs)(`div`, {
                    className: `absolute inset-x-0 bottom-0 p-6 sm:p-7`,
                    children: [
                      (0, M.jsxs)(`div`, {
                        className: `mb-6 flex items-center justify-between border-b border-hero-foreground/30 pb-3 text-[0.63rem] uppercase tracking-[0.18em] text-hero-foreground/70`,
                        children: [
                          (0, M.jsx)(`span`, { children: e.number }),
                          (0, M.jsx)(`span`, { children: e.duration }),
                        ],
                      }),
                      (0, M.jsx)(`h3`, {
                        className: `font-serif text-3xl leading-tight text-hero-foreground`,
                        children: e.title,
                      }),
                      (0, M.jsx)(`p`, {
                        className: `mt-3 text-sm leading-6 text-hero-foreground/70`,
                        children: e.description,
                      }),
                      (0, M.jsxs)(`a`, {
                        href: pc[e.title] ?? `/programs`,
                        className: `mt-6 inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary`,
                        children: [
                          `Discover `,
                          (0, M.jsx)(d, {
                            className: `h-4 w-4 transition-transform group-hover:translate-x-1`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              e.title,
            ),
          ),
        }),
      ],
    }),
  });
}
function Cc() {
  return (0, M.jsxs)(`section`, {
    className: `grid bg-surface-warm lg:grid-cols-2`,
    children: [
      (0, M.jsx)(`div`, {
        className: `relative min-h-[620px] lg:min-h-[820px]`,
        children: (0, M.jsx)(`img`, {
          src: k,
          alt: `Lantern-lit White Desert camping beneath a star-filled Egyptian sky`,
          width: 1440,
          height: 1808,
          loading: `lazy`,
          className: `absolute inset-0 h-full w-full object-cover`,
        }),
      }),
      (0, M.jsx)(`div`, {
        className: `reveal flex items-center px-6 py-24 sm:px-12 lg:px-20 xl:px-28`,
        children: (0, M.jsxs)(`div`, {
          className: `max-w-xl`,
          children: [
            (0, M.jsx)(`p`, { className: `section-kicker`, children: `Night in the wilderness` }),
            (0, M.jsxs)(`h2`, {
              className: `editorial-title mt-7 text-5xl sm:text-7xl`,
              children: [
                `The White Desert,`,
                (0, M.jsx)(`br`, {}),
                (0, M.jsx)(`em`, { children: `after sunset.` }),
              ],
            }),
            (0, M.jsx)(`p`, {
              className: `mt-10 text-lg leading-8 text-muted-foreground`,
              children: `As the last warmth leaves the limestone, the desert becomes quieter still. Firelight gathers the evening close; beyond it, the stars seem almost within reach.`,
            }),
            (0, M.jsx)(`p`, {
              className: `mt-6 text-base leading-8 text-muted-foreground`,
              children: `White Desert camping is not about excess. It is about comfort placed carefully within a rare landscape—and the privilege of waking where the horizon has no edge.`,
            }),
            (0, M.jsx)(h, {
              asChild: !0,
              variant: `goldOutline`,
              size: `journey`,
              className: `mt-10`,
              children: (0, M.jsxs)(`a`, {
                href: `#plan`,
                children: [`Enquire about camping `, (0, M.jsx)(d, {})],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
function wc() {
  return (0, M.jsx)(`section`, {
    id: `why-us`,
    className: `px-5 py-24 sm:px-8 sm:py-32 lg:px-12`,
    children: (0, M.jsxs)(`div`, {
      className: `mx-auto max-w-[1260px]`,
      children: [
        (0, M.jsxs)(`div`, {
          className: `reveal grid gap-8 lg:grid-cols-2`,
          children: [
            (0, M.jsxs)(`div`, {
              children: [
                (0, M.jsx)(`p`, { className: `section-kicker`, children: `Our approach` }),
                (0, M.jsxs)(`h2`, {
                  className: `editorial-title mt-6 text-5xl sm:text-7xl`,
                  children: [
                    `Space to travel`,
                    (0, M.jsx)(`br`, {}),
                    (0, M.jsx)(`em`, { children: `differently.` }),
                  ],
                }),
              ],
            }),
            (0, M.jsx)(`p`, {
              className: `max-w-md self-end text-base leading-8 text-muted-foreground`,
              children: `Thoughtful journeys need room to breathe. We keep the experience personal, adaptable, and grounded in the character of the desert.`,
            }),
          ],
        }),
        (0, M.jsx)(`div`, {
          className: `mt-16 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4`,
          children: hc.map(([e, t], n) =>
            (0, M.jsxs)(
              `article`,
              {
                className: `reveal border-b border-border py-8 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0`,
                children: [
                  (0, M.jsxs)(`span`, {
                    className: `font-serif text-2xl text-primary`,
                    children: [`0`, n + 1],
                  }),
                  (0, M.jsx)(`h3`, { className: `mt-8 font-serif text-2xl`, children: e }),
                  (0, M.jsx)(`p`, {
                    className: `mt-4 text-sm leading-7 text-muted-foreground`,
                    children: t,
                  }),
                ],
              },
              e,
            ),
          ),
        }),
      ],
    }),
  });
}
function Tc() {
  return (0, M.jsxs)(`section`, {
    id: `gallery`,
    className: `bg-surface-dark py-24 text-surface-dark-foreground sm:py-32`,
    children: [
      (0, M.jsxs)(`div`, {
        className: `reveal mx-auto mb-12 flex max-w-[1440px] flex-col justify-between gap-7 px-5 sm:flex-row sm:items-end sm:px-8 lg:px-12`,
        children: [
          (0, M.jsxs)(`div`, {
            children: [
              (0, M.jsx)(`p`, { className: `section-kicker`, children: `Field notes` }),
              (0, M.jsx)(`h2`, {
                className: `editorial-title mt-5 text-5xl sm:text-7xl`,
                children: `Light, form, silence.`,
              }),
            ],
          }),
          (0, M.jsx)(`p`, {
            className: `max-w-sm text-sm leading-7 text-surface-dark-foreground/60`,
            children: `Fragments from the White Desert and its contrasting volcanic edge.`,
          }),
        ],
      }),
      (0, M.jsxs)(`div`, {
        className: `grid h-[1150px] grid-cols-2 gap-1 sm:h-[900px] sm:grid-cols-4 sm:grid-rows-2`,
        children: [
          (0, M.jsxs)(`figure`, {
            className: `relative col-span-2 overflow-hidden sm:row-span-2`,
            children: [
              (0, M.jsx)(`img`, {
                src: A,
                alt: `Golden sunrise across mushroom-shaped White Desert formations`,
                width: 1600,
                height: 1200,
                loading: `lazy`,
                className: `h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]`,
              }),
              (0, M.jsx)(`figcaption`, {
                className: `absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground`,
                children: `Dawn · White Desert`,
              }),
            ],
          }),
          (0, M.jsxs)(`figure`, {
            className: `relative overflow-hidden sm:col-span-2`,
            children: [
              (0, M.jsx)(`img`, {
                src: O,
                alt: `Expansive White Desert Egypt horizon at blue hour`,
                width: 1920,
                height: 1280,
                loading: `lazy`,
                className: `h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]`,
              }),
              (0, M.jsx)(`figcaption`, {
                className: `absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground`,
                children: `Last light`,
              }),
            ],
          }),
          (0, M.jsxs)(`figure`, {
            className: `relative overflow-hidden`,
            children: [
              (0, M.jsx)(`img`, {
                src: k,
                alt: `Warm lanterns at a private White Desert night camp`,
                width: 1440,
                height: 1808,
                loading: `lazy`,
                className: `h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]`,
              }),
              (0, M.jsx)(`figcaption`, {
                className: `absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground`,
                children: `Night camp`,
              }),
            ],
          }),
          (0, M.jsxs)(`figure`, {
            className: `relative overflow-hidden`,
            children: [
              (0, M.jsx)(`img`, {
                src: j,
                alt: `Black Desert Egypt volcanic hills overlooking pale chalk terrain`,
                width: 1600,
                height: 1200,
                loading: `lazy`,
                className: `h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]`,
              }),
              (0, M.jsx)(`figcaption`, {
                className: `absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.18em] text-hero-foreground`,
                children: `Black Desert edge`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var Ec = [
  {
    quote: `The night sky over the White Desert is something I will never forget. Everything was private, calm, and perfectly arranged.`,
    name: `Sarah M.`,
    origin: `United Kingdom`,
    trip: `White Desert Overnight`,
    rating: 5,
  },
  {
    quote: `From Cairo to camp, every detail was handled. Sunrise over the chalk formations was worth every minute of the drive.`,
    name: `Karim A.`,
    origin: `Egypt`,
    trip: `White + Black Desert Expedition`,
    rating: 5,
  },
  {
    quote: `Quiet, vast, and beautifully organized. Our guide knew exactly where to be for the best light.`,
    name: `Elena R.`,
    origin: `Italy`,
    trip: `Private Custom Journey`,
    rating: 4,
  },
];
function Dc({ value: e, onChange: t }) {
  let [n, r] = (0, D.useState)(0);
  return (0, M.jsx)(`div`, {
    className: `flex gap-1`,
    role: `radiogroup`,
    "aria-label": `Your rating`,
    children: [1, 2, 3, 4, 5].map((i) =>
      (0, M.jsx)(
        `button`,
        {
          type: `button`,
          role: `radio`,
          "aria-checked": e === i,
          "aria-label": `${i} star${i > 1 ? `s` : ``}`,
          onClick: () => t(i),
          onMouseEnter: () => r(i),
          onMouseLeave: () => r(0),
          className: `text-primary transition-transform hover:scale-110`,
          children: (0, M.jsx)(`svg`, {
            viewBox: `0 0 24 24`,
            className: `h-7 w-7 ${(n || e) >= i ? `fill-current` : `fill-none stroke-current stroke-[1.5] opacity-40`}`,
            "aria-hidden": `true`,
            children: (0, M.jsx)(`path`, {
              d: `M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z`,
            }),
          }),
        },
        i,
      ),
    ),
  });
}
function Oc() {
  let [e, t] = (0, D.useState)(0),
    [n, r] = (0, D.useState)(`idle`),
    [i, o] = (0, D.useState)(``);
  async function s(t) {
    t.preventDefault();
    let n = new FormData(t.currentTarget);
    if (e < 1) {
      (r(`error`), o(`Please choose a star rating.`));
      return;
    }
    (r(`submitting`), o(``));
    try {
      (await a({
        data: {
          name: String(n.get(`name`) ?? ``),
          country: String(n.get(`country`) ?? ``),
          program: String(n.get(`program`) ?? ``),
          rating: e,
          quote: String(n.get(`quote`) ?? ``),
        },
      }),
        r(`success`));
    } catch (e) {
      (r(`error`), o(e instanceof Error ? e.message : `Something went wrong. Please try again.`));
    }
  }
  return n === `success`
    ? (0, M.jsxs)(`div`, {
        className: `reveal mt-16 border border-primary/40 bg-primary/5 p-10 text-center`,
        children: [
          (0, M.jsx)(`p`, { className: `section-kicker`, children: `Thank you` }),
          (0, M.jsxs)(`h3`, {
            className: `editorial-title mt-4 text-3xl sm:text-4xl`,
            children: [`Your review is `, (0, M.jsx)(`em`, { children: `on its way.` })],
          }),
          (0, M.jsx)(`p`, {
            className: `mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground`,
            children: `It will appear here shortly, once we've had a chance to read it.`,
          }),
        ],
      })
    : (0, M.jsxs)(`form`, {
        onSubmit: s,
        className: `reveal mt-16 border-t border-border pt-12`,
        children: [
          (0, M.jsxs)(`div`, {
            className: `mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end`,
            children: [
              (0, M.jsxs)(`div`, {
                children: [
                  (0, M.jsx)(`p`, {
                    className: `section-kicker`,
                    children: `Share your experience`,
                  }),
                  (0, M.jsxs)(`h3`, {
                    className: `editorial-title mt-4 text-3xl sm:text-5xl`,
                    children: [
                      `Traveled with us?`,
                      (0, M.jsx)(`br`, {}),
                      (0, M.jsx)(`em`, { children: `Tell the story.` }),
                    ],
                  }),
                ],
              }),
              (0, M.jsxs)(`div`, {
                className: `flex items-center gap-4`,
                children: [
                  (0, M.jsx)(`span`, {
                    className: `text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground`,
                    children: `Your rating`,
                  }),
                  (0, M.jsx)(Dc, { value: e, onChange: t }),
                ],
              }),
            ],
          }),
          (0, M.jsxs)(`div`, {
            className: `grid gap-x-6 gap-y-7 sm:grid-cols-2`,
            children: [
              (0, M.jsx)($, {
                label: `Name`,
                htmlFor: `review-name`,
                children: (0, M.jsx)(tn, {
                  id: `review-name`,
                  name: `name`,
                  required: !0,
                  autoComplete: `name`,
                  placeholder: `Your name`,
                  className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
                }),
              }),
              (0, M.jsx)($, {
                label: `Country (optional)`,
                htmlFor: `review-country`,
                children: (0, M.jsx)(tn, {
                  id: `review-country`,
                  name: `country`,
                  placeholder: `e.g. Germany`,
                  className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
                }),
              }),
              (0, M.jsx)($, {
                label: `Journey (optional)`,
                htmlFor: `review-program`,
                children: (0, M.jsxs)(rc, {
                  name: `program`,
                  children: [
                    (0, M.jsx)(ac, {
                      id: `review-program`,
                      className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
                      children: (0, M.jsx)(ic, { placeholder: `Which journey was it?` }),
                    }),
                    (0, M.jsx)(cc, {
                      children: _.experiences.map((e) =>
                        (0, M.jsx)(uc, { value: e, children: e }, e),
                      ),
                    }),
                  ],
                }),
              }),
              (0, M.jsx)(`div`, {
                className: `sm:col-span-2`,
                children: (0, M.jsx)($, {
                  label: `Your review`,
                  htmlFor: `review-quote`,
                  children: (0, M.jsx)(fc, {
                    id: `review-quote`,
                    name: `quote`,
                    required: !0,
                    rows: 4,
                    minLength: 10,
                    maxLength: 1e3,
                    placeholder: `What did the desert feel like? What should other travelers know?`,
                    className: `mt-2 rounded-sm`,
                  }),
                }),
              }),
              (0, M.jsxs)(`div`, {
                className: `sm:col-span-2`,
                children: [
                  (0, M.jsxs)(h, {
                    type: `submit`,
                    variant: `gold`,
                    size: `journey`,
                    disabled: n === `submitting`,
                    children: [
                      n === `submitting` ? `Sending…` : `Share your review`,
                      ` `,
                      (0, M.jsx)(d, {}),
                    ],
                  }),
                  n === `error` &&
                    (0, M.jsx)(`p`, {
                      className: `mt-4 text-sm text-red-600`,
                      role: `alert`,
                      children: i,
                    }),
                  (0, M.jsx)(`p`, {
                    className: `mt-4 text-xs leading-5 text-muted-foreground`,
                    children: `Reviews are read by our team before appearing on this page — no account needed.`,
                  }),
                ],
              }),
            ],
          }),
        ],
      });
}
function kc() {
  let [e, t] = (0, D.useState)(null);
  (0, D.useEffect)(() => {
    let e = !1;
    return (
      o()
        .then((n) => {
          e || t(n);
        })
        .catch(() => {
          e || t([]);
        }),
      () => {
        e = !0;
      }
    );
  }, []);
  let n =
    e && e.length > 0
      ? e.map((e) => ({
          key: `db-${e.id}`,
          quote: e.quote,
          name: e.name,
          origin: e.country ?? ``,
          trip: e.program ?? ``,
          rating: e.rating,
        }))
      : Ec.map((e) => ({
          key: `fb-${e.name}`,
          quote: e.quote,
          name: e.name,
          origin: e.origin,
          trip: e.trip,
          rating: e.rating,
        }));
  return (0, M.jsx)(`section`, {
    id: `testimonials`,
    className: `bg-surface-warm px-5 py-24 sm:px-8 sm:py-32 lg:px-12`,
    children: (0, M.jsxs)(`div`, {
      className: `mx-auto max-w-[1260px]`,
      children: [
        (0, M.jsxs)(`div`, {
          className: `reveal flex flex-col justify-between gap-8 sm:flex-row sm:items-end`,
          children: [
            (0, M.jsxs)(`div`, {
              children: [
                (0, M.jsx)(`p`, { className: `section-kicker`, children: `Traveler stories` }),
                (0, M.jsxs)(`h2`, {
                  className: `editorial-title mt-5 text-5xl sm:text-7xl`,
                  children: [
                    `Words from`,
                    (0, M.jsx)(`br`, {}),
                    (0, M.jsx)(`em`, { children: `the desert.` }),
                  ],
                }),
              ],
            }),
            (0, M.jsx)(`p`, {
              className: `max-w-md text-sm leading-7 text-muted-foreground`,
              children: `Notes from travelers who crossed the White Desert with us.`,
            }),
          ],
        }),
        (0, M.jsx)(`div`, {
          className: `mt-14 grid gap-px border border-border bg-border md:grid-cols-3`,
          children: n.map((e) =>
            (0, M.jsxs)(
              `figure`,
              {
                className: `reveal flex flex-col bg-surface-warm p-8 sm:p-10`,
                children: [
                  (0, M.jsxs)(`div`, {
                    className: `flex items-start justify-between`,
                    children: [
                      (0, M.jsx)(`span`, {
                        "aria-hidden": `true`,
                        className: `font-serif text-5xl leading-none text-primary/40`,
                        children: `"`,
                      }),
                      (0, M.jsx)(c, { value: e.rating }),
                    ],
                  }),
                  (0, M.jsx)(`blockquote`, {
                    className: `mt-6 flex-1 font-serif text-xl leading-8`,
                    children: e.quote,
                  }),
                  (0, M.jsxs)(`figcaption`, {
                    className: `mt-8 border-t border-border pt-5`,
                    children: [
                      (0, M.jsx)(`p`, { className: `text-sm font-semibold`, children: e.name }),
                      (0, M.jsx)(`p`, {
                        className: `mt-1 text-[0.63rem] uppercase tracking-[0.18em] text-muted-foreground`,
                        children: [e.origin, e.trip].filter(Boolean).join(` · `),
                      }),
                    ],
                  }),
                ],
              },
              e.key,
            ),
          ),
        }),
        (0, M.jsx)(Oc, {}),
      ],
    }),
  });
}
function Ac() {
  let [e, t] = (0, D.useState)(``);
  function n(t) {
    t.preventDefault();
    let n = new FormData(t.currentTarget),
      r = [
        `Hello ${_.name},`,
        ``,
        `I would like to plan a desert journey.`,
        `Name: ${n.get(`name`) ?? ``}`,
        `Email: ${n.get(`email`) ?? ``}`,
        `Preferred experience: ${e || `Not selected`}`,
        `Travel date: ${n.get(`date`) ?? `Flexible`}`,
        `Travelers: ${n.get(`travelers`) ?? ``}`,
        `Message: ${n.get(`message`) ?? ``}`,
      ].join(`
`);
    window.open(
      `https://wa.me/${_.whatsappNumber}?text=${encodeURIComponent(r)}`,
      `_blank`,
      `noopener,noreferrer`,
    );
  }
  return (0, M.jsx)(`section`, {
    id: `plan`,
    className: `bg-background px-5 py-24 sm:px-8 sm:py-32 lg:px-12`,
    children: (0, M.jsxs)(`div`, {
      className: `mx-auto grid max-w-[1260px] gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24`,
      children: [
        (0, M.jsxs)(`div`, {
          className: `reveal`,
          children: [
            (0, M.jsx)(`p`, { className: `section-kicker`, children: `Begin a conversation` }),
            (0, M.jsxs)(`h2`, {
              className: `editorial-title mt-6 text-5xl sm:text-7xl`,
              children: [
                `Plan your`,
                (0, M.jsx)(`br`, {}),
                (0, M.jsx)(`em`, { children: `journey.` }),
              ],
            }),
            (0, M.jsx)(`p`, {
              className: `mt-8 max-w-md text-base leading-8 text-muted-foreground`,
              children: `Tell us how you imagine your time in Egypt. We’ll use your details to begin shaping a private White Desert itinerary.`,
            }),
            (0, M.jsxs)(`div`, {
              className: `mt-10 border-t border-border pt-8`,
              children: [
                (0, M.jsx)(`p`, {
                  className: `text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground`,
                  children: `Prefer WhatsApp?`,
                }),
                (0, M.jsx)(h, {
                  asChild: !0,
                  variant: `goldOutline`,
                  size: `journey`,
                  className: `mt-4`,
                  children: (0, M.jsxs)(`a`, {
                    href: `https://wa.me/${_.whatsappNumber}`,
                    target: `_blank`,
                    rel: `noreferrer`,
                    children: [(0, M.jsx)(w, {}), ` `, _.whatsappDisplay],
                  }),
                }),
              ],
            }),
          ],
        }),
        (0, M.jsxs)(`form`, {
          onSubmit: n,
          className: `reveal grid gap-x-6 gap-y-7 sm:grid-cols-2`,
          children: [
            (0, M.jsx)($, {
              label: `Name`,
              htmlFor: `name`,
              children: (0, M.jsx)(tn, {
                id: `name`,
                name: `name`,
                required: !0,
                autoComplete: `name`,
                placeholder: `Your name`,
                className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
              }),
            }),
            (0, M.jsx)($, {
              label: `Email`,
              htmlFor: `email`,
              children: (0, M.jsx)(tn, {
                id: `email`,
                name: `email`,
                type: `email`,
                required: !0,
                autoComplete: `email`,
                placeholder: `you@example.com`,
                className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
              }),
            }),
            (0, M.jsx)($, {
              label: `WhatsApp`,
              htmlFor: `whatsapp`,
              children: (0, M.jsx)(tn, {
                id: `whatsapp`,
                name: `whatsapp`,
                type: `tel`,
                autoComplete: `tel`,
                placeholder: `Country code + number`,
                className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
              }),
            }),
            (0, M.jsx)($, {
              label: `Preferred experience`,
              htmlFor: `experience`,
              children: (0, M.jsxs)(rc, {
                value: e,
                onValueChange: t,
                required: !0,
                children: [
                  (0, M.jsx)(ac, {
                    id: `experience`,
                    className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
                    children: (0, M.jsx)(ic, { placeholder: `Select a journey` }),
                  }),
                  (0, M.jsx)(cc, {
                    children: _.experiences.map((e) =>
                      (0, M.jsx)(uc, { value: e, children: e }, e),
                    ),
                  }),
                ],
              }),
            }),
            (0, M.jsx)($, {
              label: `Travel date`,
              htmlFor: `date`,
              children: (0, M.jsxs)(`div`, {
                className: `relative`,
                children: [
                  (0, M.jsx)(tn, {
                    id: `date`,
                    name: `date`,
                    type: `date`,
                    className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
                  }),
                  (0, M.jsx)(y, {
                    className: `pointer-events-none absolute right-0 top-4 h-4 w-4 text-muted-foreground`,
                  }),
                ],
              }),
            }),
            (0, M.jsx)($, {
              label: `Travelers`,
              htmlFor: `travelers`,
              children: (0, M.jsx)(tn, {
                id: `travelers`,
                name: `travelers`,
                type: `number`,
                min: `1`,
                max: `20`,
                required: !0,
                placeholder: `2`,
                className: `h-12 rounded-none border-x-0 border-t-0 px-0 shadow-none`,
              }),
            }),
            (0, M.jsx)(`div`, {
              className: `sm:col-span-2`,
              children: (0, M.jsx)($, {
                label: `Message`,
                htmlFor: `message`,
                children: (0, M.jsx)(fc, {
                  id: `message`,
                  name: `message`,
                  rows: 4,
                  placeholder: `Tell us what would make this journey yours...`,
                  className: `mt-2 rounded-sm`,
                }),
              }),
            }),
            (0, M.jsxs)(`div`, {
              className: `sm:col-span-2`,
              children: [
                (0, M.jsxs)(h, {
                  type: `submit`,
                  variant: `gold`,
                  size: `journey`,
                  className: `w-full sm:w-auto`,
                  children: [`Start planning `, (0, M.jsx)(d, {})],
                }),
                (0, M.jsx)(`p`, {
                  className: `mt-4 text-xs leading-5 text-muted-foreground`,
                  children: `Submitting opens WhatsApp with your inquiry ready to send. No details are stored on this website.`,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function $({ label: e, htmlFor: t, children: n }) {
  return (0, M.jsxs)(`div`, {
    children: [
      (0, M.jsx)(on, {
        htmlFor: t,
        className: `text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground`,
        children: e,
      }),
      (0, M.jsx)(`div`, { className: `mt-2`, children: n }),
    ],
  });
}
function jc() {
  return (0, M.jsx)(`section`, {
    id: `faq`,
    className: `bg-surface-warm px-5 py-24 sm:px-8 sm:py-32 lg:px-12`,
    children: (0, M.jsxs)(`div`, {
      className: `mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24`,
      children: [
        (0, M.jsxs)(`div`, {
          className: `reveal`,
          children: [
            (0, M.jsx)(`p`, { className: `section-kicker`, children: `Before you travel` }),
            (0, M.jsxs)(`h2`, {
              className: `editorial-title mt-6 text-5xl sm:text-7xl`,
              children: [
                `Questions,`,
                (0, M.jsx)(`br`, {}),
                (0, M.jsx)(`em`, { children: `answered.` }),
              ],
            }),
          ],
        }),
        (0, M.jsx)(Zt, {
          type: `single`,
          collapsible: !0,
          className: `reveal border-t border-border`,
          children: gc.map(([e, t], n) =>
            (0, M.jsxs)(
              Qt,
              {
                value: `item-${n}`,
                children: [
                  (0, M.jsxs)($t, {
                    className: `group py-6 text-left font-serif text-xl font-normal no-underline hover:no-underline sm:text-2xl [&>svg]:hidden`,
                    children: [
                      (0, M.jsx)(`span`, { className: `pr-6`, children: e }),
                      (0, M.jsxs)(`span`, {
                        className: `relative h-5 w-5 shrink-0 text-primary`,
                        children: [
                          (0, M.jsx)(E, {
                            className: `absolute inset-0 h-5 w-5 group-data-[state=open]:hidden`,
                          }),
                          (0, M.jsx)(T, {
                            className: `absolute inset-0 hidden h-5 w-5 group-data-[state=open]:block`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, M.jsx)(en, {
                    className: `max-w-2xl pb-7 text-sm leading-7 text-muted-foreground sm:text-base`,
                    children: t,
                  }),
                ],
              },
              e,
            ),
          ),
        }),
      ],
    }),
  });
}
function Mc() {
  return (0, M.jsxs)(`section`, {
    className: `relative min-h-[680px] overflow-hidden bg-hero-background text-hero-foreground`,
    children: [
      (0, M.jsx)(`img`, {
        src: O,
        alt: `White Desert formations extending toward the Egyptian horizon`,
        width: 1920,
        height: 1280,
        loading: `lazy`,
        className: `absolute inset-0 h-full w-full object-cover`,
      }),
      (0, M.jsx)(`div`, { className: `absolute inset-0 bg-hero-background/60` }),
      (0, M.jsxs)(`div`, {
        className: `relative z-10 mx-auto flex min-h-[680px] max-w-[1260px] flex-col items-center justify-center px-5 py-24 text-center`,
        children: [
          (0, M.jsx)(`p`, { className: `section-kicker`, children: `White Desert Egypt` }),
          (0, M.jsxs)(`h2`, {
            className: `editorial-title mt-7 text-6xl sm:text-8xl lg:text-[8rem]`,
            children: [
              `Your horizon`,
              (0, M.jsx)(`br`, {}),
              (0, M.jsx)(`em`, { children: `is waiting.` }),
            ],
          }),
          (0, M.jsx)(`p`, {
            className: `mt-7 text-lg text-hero-foreground/75`,
            children: `Explore Egypt’s White Desert, privately.`,
          }),
          (0, M.jsx)(h, {
            asChild: !0,
            variant: `gold`,
            size: `journey`,
            className: `mt-9`,
            children: (0, M.jsxs)(`a`, {
              href: `#plan`,
              children: [`Plan your journey `, (0, M.jsx)(d, {})],
            }),
          }),
        ],
      }),
    ],
  });
}
function Nc() {
  return (0, M.jsx)(`footer`, {
    className: `bg-surface-dark px-5 pb-24 pt-16 text-surface-dark-foreground sm:px-8 sm:pb-10 lg:px-12`,
    children: (0, M.jsxs)(`div`, {
      className: `mx-auto max-w-[1440px]`,
      children: [
        (0, M.jsxs)(`div`, {
          className: `grid gap-12 border-b border-line-dark pb-12 sm:grid-cols-3`,
          children: [
            (0, M.jsx)(vc, { light: !0 }),
            (0, M.jsxs)(`div`, {
              children: [
                (0, M.jsx)(`p`, { className: `section-kicker`, children: `Explore` }),
                (0, M.jsx)(`div`, {
                  className: `mt-5 flex flex-col gap-3`,
                  children: p.map((e) =>
                    (0, M.jsx)(
                      `a`,
                      {
                        href: e.href,
                        className: `text-sm text-surface-dark-foreground/65 transition-colors hover:text-primary`,
                        children: e.label,
                      },
                      e.href,
                    ),
                  ),
                }),
              ],
            }),
            (0, M.jsxs)(`div`, {
              children: [
                (0, M.jsx)(`p`, { className: `section-kicker`, children: `Find us` }),
                (0, M.jsx)(`p`, {
                  className: `mt-5 text-sm text-surface-dark-foreground/65`,
                  children: `Egypt`,
                }),
                (0, M.jsxs)(`div`, {
                  className: `mt-4 flex gap-3`,
                  children: [
                    (0, M.jsx)(`a`, {
                      href: _.instagramUrl,
                      target: `_blank`,
                      rel: `noreferrer`,
                      "aria-label": `Instagram`,
                      className: `grid h-9 w-9 place-items-center rounded-full border border-line-dark hover:border-primary hover:text-primary`,
                      children: (0, M.jsx)(S, { className: `h-4 w-4` }),
                    }),
                    (0, M.jsx)(`a`, {
                      href: _.facebookUrl,
                      "aria-label": `Social placeholder`,
                      className: `grid h-9 w-9 place-items-center rounded-full border border-line-dark text-xs font-bold hover:border-primary hover:text-primary`,
                      children: `f`,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, M.jsxs)(`div`, {
          className: `flex flex-col justify-between gap-3 pt-7 text-[0.62rem] uppercase tracking-[0.14em] text-surface-dark-foreground/45 sm:flex-row`,
          children: [
            (0, M.jsxs)(`p`, { children: [`© `, new Date().getFullYear(), ` `, _.name] }),
            (0, M.jsx)(`p`, { children: `Private desert journeys · Egypt` }),
          ],
        }),
      ],
    }),
  });
}
function Pc() {
  return (
    _c(),
    (0, M.jsxs)(M.Fragment, {
      children: [
        (0, M.jsxs)(`main`, {
          children: [
            (0, M.jsx)(bc, {}),
            (0, M.jsx)(xc, {}),
            (0, M.jsx)(Sc, {}),
            (0, M.jsx)(Cc, {}),
            (0, M.jsx)(wc, {}),
            (0, M.jsx)(Tc, {}),
            (0, M.jsx)(kc, {}),
            (0, M.jsx)(Ac, {}),
            (0, M.jsx)(jc, {}),
            (0, M.jsx)(Mc, {}),
          ],
        }),
        (0, M.jsx)(Nc, {}),
        (0, M.jsx)(h, {
          asChild: !0,
          variant: `gold`,
          size: `journey`,
          className: `fixed inset-x-4 bottom-4 z-40 shadow-lg md:hidden`,
          children: (0, M.jsxs)(`a`, {
            href: `#plan`,
            children: [(0, M.jsx)(w, {}), ` Plan your journey`],
          }),
        }),
      ],
    })
  );
}
function Fc() {
  return (0, M.jsx)(Pc, {});
}
export { Fc as component };
