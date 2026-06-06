(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1931],
  {
    1581: function (e, a, s) {
      (Promise.resolve().then(s.bind(s, 4540)),
        Promise.resolve().then(s.bind(s, 5539)),
        Promise.resolve().then(s.bind(s, 1257)),
        Promise.resolve().then(s.bind(s, 3157)),
        Promise.resolve().then(s.bind(s, 2101)),
        Promise.resolve().then(s.t.bind(s, 5878, 23)),
        Promise.resolve().then(s.t.bind(s, 2972, 23)),
        Promise.resolve().then(s.bind(s, 1523)),
        Promise.resolve().then(s.bind(s, 49)));
    },
    4540: function (e, a, s) {
      "use strict";
      s.r(a);
      var t = s(7437),
        r = s(2265),
        i = s(7648),
        o = s(2451),
        n = s(407),
        l = s(6858),
        d = s(9600),
        c = s(2869),
        m = s(5974),
        h = s(3145);
      let p = (e) =>
        e
          ? new Date(e).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "";
      a.default = function () {
        let { initialPosts: e } =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          { posts: a, loading: s } = (0, d.EZ)(
            { limit: 10, sort: "publishedAt", order: "desc" },
            { initialPosts: e },
          ),
          u = (!s && (null == a ? void 0 : a.length) ? a : []).slice(0, 6),
          [g, x] = (0, r.useState)(1),
          [f, b] = (0, r.useState)(0),
          v = (0, r.useRef)(null);
        (0, r.useEffect)(() => {
          let e = () => {
            let e = window.innerWidth;
            e >= 1200 ? x(3) : e >= 768 ? x(2) : x(1);
          };
          return (
            e(),
            window.addEventListener("resize", e),
            () => window.removeEventListener("resize", e)
          );
        }, []);
        let k = (0, r.useMemo)(() => {
          let e = s ? Array.from({ length: 3 }).map(() => null) : u,
            a = [];
          for (let s = 0; s < e.length; s += g) a.push(e.slice(s, s + g));
          return a.length ? a : [e];
        }, [g, s, u]);
        (0, r.useEffect)(() => {
          f > Math.max(0, k.length - 1) && b(0);
        }, [k.length, f]);
        let w = (e) => {
            b((a) => {
              let s = Math.max(0, k.length - 1);
              return "next" === e ? (a >= s ? 0 : a + 1) : a <= 0 ? s : a - 1;
            });
          },
          y = (0, r.useRef)(null),
          N = (0, r.useRef)(0);
        return (0, t.jsxs)("div", {
          className:
            "relative py-8 md:py-12 bg-white text-neutral-900 dark:bg-[#0C0F14] dark:text-white transition-colors duration-300 overflow-hidden",
          children: [
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute inset-0 hidden dark:block bg-gradient-to-b from-white/5 via-transparent to-white/5",
            }),
            (0, t.jsxs)("div", {
              className: "container-custom relative",
              children: [
                (0, t.jsxs)("div", {
                  className:
                    "flex flex-col items-start text-left mb-6 lg:mb-8 space-y-2.5",
                  children: [
                    (0, t.jsx)("div", {
                      className:
                        "inline-flex items-center gap-2 rounded-full border border-[#ebac2b33] bg-[#111] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#EBAC2B] shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
                      children: "Blog",
                    }),
                    (0, t.jsx)("h2", {
                      className:
                        "text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-neutral-900 dark:text-[#EBAC2B]",
                      children: "Latest Insights & Success Stories",
                    }),
                    (0, t.jsx)("p", {
                      className:
                        "text-sm md:text-[15px] text-neutral-600 dark:text-white/80 max-w-2xl leading-snug",
                      children:
                        "Stay updated with the latest trends in securing world class speakers, event planning tips, and inspiring success stories. ",
                    }),
                  ],
                }),
                (0, t.jsxs)("div", {
                  className: "relative",
                  children: [
                    (0, t.jsxs)("div", {
                      className:
                        "absolute inset-y-0 left-0 right-0 hidden md:flex items-center justify-between px-2 z-10 pointer-events-none",
                      children: [
                        (0, t.jsx)(c.z, {
                          variant: "outline",
                          size: "icon",
                          className:
                            "h-10 w-10 rounded-full border-gray-300 text-gray-800 bg-white hover:bg-gray-100 shadow-sm pointer-events-auto",
                          onClick: () => w("prev"),
                          children: (0, t.jsx)(o.Z, { className: "h-5 w-5" }),
                        }),
                        (0, t.jsx)(c.z, {
                          variant: "outline",
                          size: "icon",
                          className:
                            "h-10 w-10 rounded-full border-gray-300 text-gray-800 bg-white hover:bg-gray-100 shadow-sm pointer-events-auto",
                          onClick: () => w("next"),
                          children: (0, t.jsx)(n.Z, { className: "h-5 w-5" }),
                        }),
                      ],
                    }),
                    (0, t.jsx)("div", {
                      className: "overflow-hidden",
                      onTouchStart: (e) => {
                        ((y.current = e.touches[0].clientX), (N.current = 0));
                      },
                      onTouchMove: (e) => {
                        null !== y.current &&
                          (N.current = e.touches[0].clientX - y.current);
                      },
                      onTouchEnd: () => {
                        null !== y.current &&
                          (N.current > 50
                            ? w("prev")
                            : N.current < -50 && w("next"),
                          (y.current = null),
                          (N.current = 0));
                      },
                      children: (0, t.jsx)("div", {
                        ref: v,
                        className:
                          "flex transition-transform duration-500 ease-out",
                        style: {
                          transform: "translateX(-".concat(100 * f, "%)"),
                        },
                        children: k.map((e, a) =>
                          (0, t.jsx)(
                            "div",
                            {
                              className:
                                "min-w-full grid gap-6 lg:gap-7 ".concat(
                                  1 === g
                                    ? "grid-cols-1"
                                    : 2 === g
                                      ? "grid-cols-2"
                                      : "grid-cols-3",
                                ),
                              children: e.map((e, s) => {
                                var r;
                                if (!e)
                                  return (0, t.jsxs)(
                                    "div",
                                    {
                                      className: "space-y-4 animate-pulse",
                                      children: [
                                        (0, t.jsx)("div", {
                                          className:
                                            "aspect-video rounded-2xl bg-neutral-200 dark:bg-[#111]",
                                        }),
                                        (0, t.jsx)("div", {
                                          className:
                                            "h-3 w-24 rounded bg-neutral-200 dark:bg-[#1a1a1a]",
                                        }),
                                        (0, t.jsx)("div", {
                                          className:
                                            "h-5 w-3/4 rounded bg-neutral-200 dark:bg-[#1a1a1a]",
                                        }),
                                        (0, t.jsx)("div", {
                                          className:
                                            "h-5 w-5/6 rounded bg-neutral-200 dark:bg-[#1a1a1a]",
                                        }),
                                        (0, t.jsx)("div", {
                                          className:
                                            "h-4 w-full rounded bg-neutral-200 dark:bg-[#1a1a1a]",
                                        }),
                                        (0, t.jsx)("div", {
                                          className:
                                            "h-4 w-2/3 rounded bg-neutral-200 dark:bg-[#1a1a1a]",
                                        }),
                                      ],
                                    },
                                    "skeleton-".concat(a, "-").concat(s),
                                  );
                                let o =
                                    e.image ||
                                    e.coverImage ||
                                    "/images/blog-placeholder.jpg",
                                  n =
                                    e.slug ||
                                    e.id ||
                                    "post-".concat(a, "-").concat(s),
                                  d = e.publishedAt || e.date || e.createdAt;
                                return (0, t.jsxs)(
                                  "article",
                                  {
                                    className:
                                      "group relative flex flex-col bg-white dark:bg-[#0f0f0f] rounded-2xl border border-neutral-200 dark:border-[#1f1f1f] shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden hover:border-[#EBAC2B66] transition-colors duration-200 h-full",
                                    children: [
                                      (0, t.jsx)(i.default, {
                                        href: "/".concat(n),
                                        children: (0, t.jsxs)("div", {
                                          className: "relative overflow-hidden",
                                          children: [
                                            (0, t.jsx)(h.default, {
                                              src: o,
                                              alt: e.title,
                                              width: 800,
                                              height: 450,
                                              className:
                                                "w-full aspect-video object-cover transition-transform duration-500 hover:scale-105",
                                              sizes:
                                                "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                                              unoptimized: !0,
                                            }),
                                            (0, t.jsx)("div", {
                                              className:
                                                "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent",
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, t.jsx)("div", {
                                        className:
                                          "absolute top-4 left-4 right-4 flex justify-between items-start",
                                        children: (0, t.jsx)(m.C, {
                                          className:
                                            "bg-[#EBAC2B] text-black font-semibold text-xs border-0 shadow",
                                          children:
                                            (null === (r = e.blogType) ||
                                            void 0 === r
                                              ? void 0
                                              : r.toString()) === "Insight"
                                              ? "Success Story"
                                              : e.blogType,
                                        }),
                                      }),
                                      (0, t.jsxs)("div", {
                                        className:
                                          "px-5 pb-5 pt-4 space-y-1.5 flex flex-col flex-1",
                                        children: [
                                          (0, t.jsx)("p", {
                                            className:
                                              "text-[10px] font-semibold uppercase tracking-[0.14em] text-[#EBAC2B] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-2",
                                            children: p(d),
                                          }),
                                          (0, t.jsx)(i.default, {
                                            href: "/".concat(n),
                                            className: "group",
                                            children: (0, t.jsx)("h3", {
                                              className:
                                                "text-lg font-semibold leading-snug text-neutral-900 dark:text-[#EBAC2B] hover:text-primary-600 group-hover:text-primary-600 transition-colors line-clamp-2",
                                              children: e.title,
                                            }),
                                          }),
                                          (0, t.jsx)("p", {
                                            className:
                                              "text-[13px] text-neutral-700 dark:text-white/80 leading-snug line-clamp-2 flex-1",
                                            children: e.excerpt,
                                          }),
                                          (0, t.jsxs)(i.default, {
                                            href: "/".concat(n),
                                            className:
                                              "inline-flex items-center gap-1.5 text-[12px] font-semibold text-black bg-[#EBAC2B] hover:bg-primary-600 rounded-full px-3 py-1 transition-all duration-200 shadow-[0_6px_18px_rgba(235,172,43,0.3)] self-end mt-auto",
                                            children: [
                                              "Read more",
                                              (0, t.jsx)(l.Z, {
                                                className: "h-3.5 w-3.5",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  n,
                                );
                              }),
                            },
                            "slide-".concat(a),
                          ),
                        ),
                      }),
                    }),
                    (0, t.jsx)("div", {
                      className: "mt-4 flex justify-center gap-2 md:hidden",
                      children: k.map((e, a) =>
                        (0, t.jsx)(
                          "button",
                          {
                            onClick: () => b(a),
                            className:
                              "h-2 rounded-full transition-all duration-300 ".concat(
                                a === f
                                  ? "w-6 bg-[#EBAC2B] shadow-[0_0_10px_rgba(235,172,43,0.6)]"
                                  : "w-2 bg-gray-300 dark:bg-gray-600",
                              ),
                            "aria-label": "Go to slide ".concat(a + 1),
                          },
                          a,
                        ),
                      ),
                    }),
                  ],
                }),
                (0, t.jsx)("div", {
                  className: "mt-12 flex justify-center",
                  children: (0, t.jsx)(i.default, {
                    href: "/blog",
                    children: (0, t.jsxs)(c.z, {
                      className:
                        "h-10 sm:h-12 rounded-full bg-[#EBAC2B] px-6 sm:px-8 text-sm sm:text-base font-semibold text-[#0F1A32] shadow-[0_5px_20px_rgba(0,0,0,0.32)] hover:bg-primary-600",
                      children: [
                        "Read More Articles",
                        (0, t.jsx)(l.Z, {
                          className: "ml-2 h-3 w-3 sm:h-4 sm:w-4",
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          ],
        });
      };
    },
    5539: function (e, a, s) {
      "use strict";
      s.r(a);
      var t = s(7437),
        r = s(2265),
        i = s(7648),
        o = s(6858),
        n = s(6902),
        l = s(2869),
        d = s(3869),
        c = s(6070),
        m = s(3145);
      let h =
          "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        p = (e) => {
          if (!(null == e ? void 0 : e.metaImage)) return h;
          if (e.metaImage.startsWith("http")) return e.metaImage;
          let a = e.metaImage.replace(/^\/+/, ""),
            s = a.includes("/") ? a : "speaker-lists/".concat(a);
          return ""
            .concat(
              "https://speakerbooking-assets.s3.us-west-2.amazonaws.com",
              "/",
            )
            .concat(s);
        };
      a.default = function () {
        let { initialLists: e } =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          { speakerLists: a, loading: s, error: u } = (0, d.kx)(9, e),
          [g, x] = (0, r.useState)(null),
          [f, b] = (0, r.useState)(0),
          [v, k] = (0, r.useState)(!1);
        if (
          ((0, r.useEffect)(() => {
            if (!g || v) return;
            let e = setInterval(() => {
              g.canScrollNext() ? g.scrollNext() : g.scrollTo(0);
            }, 4e3);
            return () => clearInterval(e);
          }, [g, v]),
          (0, r.useEffect)(() => {
            if (!g) return;
            let e = () => b(g.selectedScrollSnap() || 0);
            return (
              e(),
              g.on("select", e),
              () => {
                g.off("select", e);
              }
            );
          }, [g]),
          !s && (u || 0 === a.length))
        )
          return null;
        let w =
          (null == g ? void 0 : g.scrollSnapList().length) || a.length || 1;
        return (0, t.jsx)("section", {
          className: "relative py-8 md:py-12 bg-background",
          children: (0, t.jsx)("div", {
            className: "container-custom relative",
            children: (0, t.jsxs)("div", {
              className:
                "relative overflow-hidden rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-50 via-yellow-50/80 to-orange-50/60 px-5 py-6 md:px-8 md:py-8 shadow-[0_0_30px_rgba(235,172,43,0.1)] dark:border-amber-400/20 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-neutral-950 dark:shadow-[0_0_30px_rgba(235,172,43,0.08)]",
              children: [
                (0, t.jsx)("div", {
                  className:
                    "pointer-events-none absolute -left-10 top-8 h-48 w-48 rounded-full bg-amber-300/25 blur-[120px] dark:bg-amber-400/15",
                }),
                (0, t.jsx)("div", {
                  className:
                    "pointer-events-none absolute -right-16 -bottom-20 h-72 w-72 rounded-full bg-amber-200/20 blur-[140px] dark:bg-amber-500/15",
                }),
                (0, t.jsx)("div", {
                  className:
                    "pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_18%_25%,rgba(255,214,120,0.1),transparent_36%),radial-gradient(circle_at_80%_8%,rgba(255,184,80,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_18%_25%,rgba(255,214,120,0.08),transparent_36%),radial-gradient(circle_at_80%_8%,rgba(255,184,80,0.09),transparent_30%)]",
                }),
                (0, t.jsxs)("div", {
                  className: "relative",
                  children: [
                    (0, t.jsx)("div", {
                      className:
                        "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-start",
                      children: (0, t.jsxs)("div", {
                        className: "w-full max-w-none space-y-1.5 text-left",
                        children: [
                          (0, t.jsx)("h2", {
                            className:
                              "text-2xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-amber-300",
                            children: "Speaker Lists & Collections",
                          }),
                          (0, t.jsx)("p", {
                            className:
                              "text-sm text-gray-700 md:text-base dark:text-neutral-200",
                            children:
                              "A curated lineup of keynote speakers, panelists and guests for your next event.",
                          }),
                        ],
                      }),
                    }),
                    s
                      ? (0, t.jsx)("div", {
                          className:
                            "mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
                          children: [void 0, void 0, void 0].map((e, a) =>
                            (0, t.jsxs)(
                              "div",
                              {
                                className:
                                  "h-full rounded-xl bg-white/5 p-3 shadow-xl backdrop-blur animate-pulse",
                                children: [
                                  (0, t.jsx)("div", {
                                    className:
                                      "mb-3 h-36 w-full rounded-lg bg-white/10",
                                  }),
                                  (0, t.jsx)("div", {
                                    className: "h-4 w-32 rounded bg-white/15",
                                  }),
                                ],
                              },
                              a,
                            ),
                          ),
                        })
                      : (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsxs)("div", {
                              className: "relative mt-6 md:mt-8",
                              children: [
                                (0, t.jsxs)(n.lr, {
                                  opts: { align: "start", loop: a.length > 3 },
                                  className: "pb-4",
                                  setApi: x,
                                  onMouseEnter: () => k(!0),
                                  onMouseLeave: () => k(!1),
                                  children: [
                                    (0, t.jsx)(n.KI, {
                                      className: "py-2",
                                      children: a.map((e) => {
                                        let a = p(e);
                                        return (0, t.jsx)(
                                          n.d$,
                                          {
                                            className:
                                              "basis-[92%] sm:basis-[68%] md:basis-[52%] lg:basis-[34%] xl:basis-[28%] pl-5",
                                            children: (0, t.jsx)(i.default, {
                                              href: "/speaker-list/".concat(
                                                e.slug,
                                              ),
                                              className: "block h-full",
                                              children: (0, t.jsx)(c.Zb, {
                                                className:
                                                  "group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white shadow-[0_0_2px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-primary-300/40 hover:shadow-[0_0_8px_rgba(0,0,0,0.45)]",
                                                children: (0, t.jsxs)(c.aY, {
                                                  className:
                                                    "flex h-full flex-col p-0",
                                                  children: [
                                                    (0, t.jsx)("div", {
                                                      className:
                                                        "relative overflow-hidden",
                                                      style: {
                                                        aspectRatio: "16 / 9",
                                                      },
                                                      children: (0, t.jsx)(
                                                        m.default,
                                                        {
                                                          src: a,
                                                          alt: "".concat(
                                                            e.name,
                                                            " speaker list",
                                                          ),
                                                          fill: !0,
                                                          className:
                                                            "z-10 object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105",
                                                          sizes:
                                                            "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                                                          unoptimized: !0,
                                                          onError: (e) => {
                                                            e.currentTarget
                                                              .src !== h &&
                                                              (e.currentTarget.src =
                                                                h);
                                                          },
                                                        },
                                                      ),
                                                    }),
                                                    (0, t.jsxs)("div", {
                                                      className:
                                                        "flex flex-1 flex-col gap-3 p-5 sm:p-6",
                                                      children: [
                                                        (0, t.jsx)("div", {
                                                          className:
                                                            "flex items-start justify-between gap-3",
                                                          children: (0, t.jsx)(
                                                            "h3",
                                                            {
                                                              className:
                                                                "text-lg font-semibold leading-tight md:text-xl text-black dark:text-white",
                                                              children: e.name,
                                                            },
                                                          ),
                                                        }),
                                                        (0, t.jsx)("p", {
                                                          className:
                                                            "text-sm text-black dark:text-white/50 line-clamp-2",
                                                          children:
                                                            e.description ||
                                                            "Explore our curated set of speakers perfect for your next program.",
                                                        }),
                                                        (0, t.jsx)("div", {
                                                          className:
                                                            "mt-auto flex items-center justify-between pt-1 text-sm text-blue-100",
                                                          children: (0, t.jsxs)(
                                                            "div",
                                                            {
                                                              className:
                                                                "inline-flex items-center gap-1 font-semibold text-[#EBAC2B] group-hover:text-black dark:group-hover:text-[#EBAC2B] text-[0.6rem] sm:text-[0.7rem]",
                                                              children: [
                                                                "View list",
                                                                (0, t.jsx)(
                                                                  o.Z,
                                                                  {
                                                                    className:
                                                                      "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",
                                                                  },
                                                                ),
                                                              ],
                                                            },
                                                          ),
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                          },
                                          e.id,
                                        );
                                      }),
                                    }),
                                    (0, t.jsx)(n.am, {
                                      className:
                                        "hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg backdrop-blur hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50 md:flex left-2 sm:left-4 md:-left-10 dark:border-amber-200/40 dark:bg-amber-100/10 dark:text-white dark:hover:border-amber-200/70 dark:hover:bg-amber-200/30",
                                    }),
                                    (0, t.jsx)(n.Pz, {
                                      className:
                                        "hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg backdrop-blur hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50 md:flex right-2 sm:right-4 md:-right-10 dark:border-amber-200/40 dark:bg-amber-100/10 dark:text-white dark:hover:border-amber-200/70 dark:hover:bg-amber-200/30",
                                    }),
                                  ],
                                }),
                                w > 1 &&
                                  (0, t.jsx)("div", {
                                    className:
                                      "mt-4 flex items-center justify-center gap-2",
                                    children: Array.from({ length: w }).map(
                                      (e, a) =>
                                        (0, t.jsx)(
                                          "button",
                                          {
                                            onClick: () =>
                                              null == g
                                                ? void 0
                                                : g.scrollTo(a),
                                            className:
                                              "h-2 rounded-full transition-all duration-300 ".concat(
                                                a === f
                                                  ? "w-10 bg-amber-300 shadow-[0_0_12px_rgba(255,193,7,0.65)]"
                                                  : "w-2 bg-gray-400 hover:bg-white/40",
                                              ),
                                            "aria-label":
                                              "Go to featured list slide ".concat(
                                                a + 1,
                                              ),
                                          },
                                          a,
                                        ),
                                    ),
                                  }),
                              ],
                            }),
                            (0, t.jsx)("div", {
                              className: "mt-6 flex justify-center",
                              children: (0, t.jsx)(i.default, {
                                href: "/speaker-list",
                                children: (0, t.jsx)(l.z, {
                                  className:
                                    "h-10 rounded-full bg-[#EBAC2B] px-5 py-2 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(255,193,7,0.35)] hover:bg-primary-600",
                                  children: "View More Recommendations",
                                }),
                              }),
                            }),
                          ],
                        }),
                  ],
                }),
              ],
            }),
          }),
        });
      };
    },
    3157: function (e, a, s) {
      "use strict";
      (s.r(a),
        s.d(a, {
          default: function () {
            return f;
          },
        }));
      var t = s(7437),
        r = s(2265),
        i = s(3145),
        o = s(7648),
        n = s(2135),
        l = s(875),
        d = s(6858),
        c = s(2869),
        m = JSON.parse(
          '{"a":[{"id":12,"name":"Best Professional Speakers","slug":"professional-speakers","description":"<p>Professional speakers have devoted their lives to motivating and informing audiences. Since speaking is their primary occupation, your group or organization is guaranteed to receive a high-end presentation. These individuals earn Hall of Fame and Certified Speaking Professional designations. This is just further affirmation of their abilities on stage.\xa0</p>","bottomDescription":null,"metaTitle":"Best Professional Public Keynote Speakers Bureau","metaDesc":"Professional speakers have devoted their lives to motivating and informing audiences.book Certified Speaking Professional designations from our bureau<br>","metaImage":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/root-categories/9c790a0f608d7379a94732737a7c3f92_1557346284.jpg","isActive":true,"createdAt":"2025-12-17T22:19:05.179Z","updatedAt":"2025-12-17T22:19:05.179Z","topSpeakers":[{"id":36954,"firstName":"Carey","lastName":"Lohrenz","title":"Leadership Expert, Former Fighter Pilot, Keynote Speaker","slug":"carey-lohrenz","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1547514280_carey-lohrenz.jpg","location":"Minneapolis, MN"},{"id":30383,"firstName":"Vernice","lastName":"\\"FlyGirl\\" Armour","title":"America’s First Black Female Combat Pilot, Former Marine & Cop, Author of Zero to Breakthrough","slug":"vernice-flygirl-armour","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1549315701_Vernice .jpg","location":"Atlanta, GA"},{"id":30069,"firstName":"Mike","lastName":"Abrashoff","title":"Leadership Expert, Former Naval Commander, Keynote Speaker","slug":"mike-abrashoff","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715787835_Abrashoff.Mike_.Promo_.Photo_.jpg","location":"Washington, D.C."},{"id":78996,"firstName":"James","lastName":"Lawrence","title":"Endurance Athlete and Motivational Speaker Best Known as the \\"Iron Cowboy\\"","slug":"james-lawrence","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1658830880_james-lawrence.jpg","location":"Salt Lake City, UT"},{"id":29410,"firstName":"Noah","lastName":"Galloway","title":"Inspirational Speaker, Overcoming Adversity Advocate, Keynote Speaker","slug":"noah-galloway","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715880482_noahgalloway.png","location":"Birmingham, AL"},{"id":63601,"firstName":"Amelia","lastName":"Rose Earhart","title":"Aviation Pioneer, Inspirational Speaker, Keynote Speaker","slug":"amelia-rose-earhart","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715788221_Amelia-Rose-Earhart-image.jpg","location":"Denver, CO"},{"id":66471,"firstName":"Richard","lastName":"Montanez","title":"Innovator, Entrepreneur, Keynote Speaker","slug":"richard-montanez","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715787437_GH2EnbIWQAAOfOA.jpg","location":"Los Angeles, CA"},{"id":52853,"firstName":"Damon","lastName":"West","title":"Transformation Expert, Resilience Advocate, Keynote Speaker","slug":"damon-west","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1657987335_IMG_2306.jpg","location":"Beaumont, TX"}]},{"id":1,"name":"Business Speakers","slug":"business","description":"<p>Business speakers help companies and organizations in enhancing their performance and driving a \\r\\npositive change. The importance of business keynote speaker becomes vital to lead successful \\r\\nventures, inspire audiences and put forward insightful strategies. Inspirational business speakers \\r\\nmotivate audiences around the world by sharing meaningful insights that empower the audience \\r\\nand drives success.</p>\\r\\n\\r\\n<p>Speaker Booking Agency excels when it comes to helping organizations to choose the best business \\r\\nspeakers for their event. Whether you are hosting a corporate conference, a leadership summit or a \\r\\nglobal event, our network of top business speakers can help you conveying a successful event \\r\\nthrough effective storytelling and proven strategies. Book one of our top business speakers to create \\r\\nan everlasting impact and enhance your value.</p>\\r\\n\\r\\n<p>Contact us today to begin the booking process of the business speaker of your choice.</p>","bottomDescription":"<p>At SpeakerBookingAgency, we understand the vital role that Business Motivational Speakers play in fostering a motivated and high-performing workforce. Our speakers inspire teams to overcome challenges, embrace change, and embrace a culture of success that propels businesses forward. If you seek game-changing strategies and expert advice to unlock your organization\'s potential, our Business Keynote Speakers are at your service. They bring cutting-edge insights and industry-specific knowledge that stimulate discussions, spark innovation, and yield impactful results. Experience the power of influence and collaboration as our Business Speakers create memorable experiences that resonate with diverse audiences, empowering them to lead with purpose and passion.<br></p>","metaTitle":"Top Business Speakers for Events | Book Industry Leaders & Experts","metaDesc":"Discover top Business Speakers at Speaker Booking agency to speak at your next event. Whether you are looking for corporate motivational speakers or business keynote speakers, SBA provides a wide range, Book your next event now.","metaImage":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/root-categories/42b7743c81a793b281ed23a311596b95_1557409412.jpg","isActive":true,"createdAt":"2025-12-17T22:19:05.157Z","updatedAt":"2025-12-17T22:19:05.157Z","topSpeakers":[{"id":28930,"firstName":"Kevin","lastName":"Surace","title":"Named Innovator of the Decade by CNBC and Former Inc. Entrepreneur of the Year","slug":"kevin-surace","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715787663_Kevin-Surace.jpg","location":"San Francisco, CA"},{"id":31845,"firstName":"Erica","lastName":"Dhawan","title":"Connectional Intelligence Expert, Leadership Speaker, Keynote Speaker","slug":"erica-dhawan","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1661356065_Screenshot 2022-08-24 114719.png","location":"Tampa, FL"},{"id":28561,"firstName":"Lori","lastName":"Greiner","title":"Entrepreneur, Inventor, QVC and Shark Tank Personality","slug":"lori-greiner","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1547512130_lori-greiner.jpg","location":"Chicago, IL"},{"id":30855,"firstName":"Bethenny","lastName":"Frankel","title":"Founder of Skinny Girl, TV Personality and Best-Selling Author","slug":"bethenny-frankel","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1724164942_headshot_2.jpg","location":"New York, NY"},{"id":30443,"firstName":"Peter","lastName":"Diamandis","title":"Futurist, Entrepreneur, and Founder of the X Prize Foundation","slug":"peter-diamandis","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1697033606_Peter_Diamandis.jpg","location":"Available Upon Request"},{"id":54486,"firstName":"Jesse","lastName":"Itzler","title":"Entrepreneur, Motivational Speaker, Keynote Speaker","slug":"jesse-itzler","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1646935693_Jesse-Itzler.jpg","location":"Atlanta, GA"},{"id":33777,"firstName":"Mick","lastName":"Ebeling","title":"Innovator, Entrepreneur, Keynote Speaker","slug":"mick-ebeling","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1705273333_ebeling-m.jpg","location":"Los Angeles, CA"},{"id":34652,"firstName":"Seth","lastName":"Godin","title":"Marketing Innovator, Author, Keynote Speaker","slug":"seth-godin","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715788377_Godin-headshot-e1660867999899.jpg","location":"New York, NY"}]},{"id":3,"name":"Diversity & Inclusion Speakers","slug":"diversity-inclusion","description":"<p>Diversity & inclusion speakers are known for shaping inclusive workplace cultures through equity and representation. They foster an open dialogue and educate audiences to embrace the diverse perspectives of life by inspiration and self-empowerment. These powerful voices promote unity and respect and challenge individuals by bringing real life insights on stage, Whether it is a corporate training event, leadership summit or a global conference, they always tailor their unique insights to audience needs. Our Diversity and inclusion speakers deliver impactful keynote speeches that influence a meaningful and broad change.</p>\\r\\n<p>Speaker Booking Agency helps organizations and companies to book diversity and inclusion speakers who align with their goals and values. From top diversity and inclusion speakers to dynamic diversity speakers for schools and companies, we offer a wide selection of experienced professionals who bring real-world insights to your stage. Explore our diversity and inclusion speakers to find the ideal voice for your upcoming event.</p>","bottomDescription":null,"metaTitle":"Top Diversity and Inclusion Speakers for Your Event","metaDesc":"Hire top diversity and inclusion speakers for companies and dynamic diversity speakers who promote inclusion and inspire change. Find experts to empower your audience at your event.","metaImage":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/root-categories/8fb94f5aa64901679ba773d14a779742_1557346935.jpg","isActive":true,"createdAt":"2025-12-17T22:19:05.164Z","updatedAt":"2025-12-17T22:19:05.164Z","topSpeakers":[{"id":53173,"firstName":"Ijeoma","lastName":"Oluo","title":"Racial Justice Advocate, Author, Keynote Speaker","slug":"ijeoma-oluo","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715879276_Oluo_0.jpg","location":"Seattle, WA"},{"id":30321,"firstName":"Temple","lastName":"Grandin","title":"Autism Advocate, Animal Scientist, and Keynote Speaker","slug":"temple-grandin","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715266207_npr.brightspotcdn.jpg","location":"Colorado-CO"},{"id":39073,"firstName":"Jose","lastName":"Hernandez","title":"Astronaut Who Was the Child of Migrant Workers","slug":"jose-hernandez","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1566313950_1200px-Jose_Hernandez_astronaut.jpg","location":"San Francisco, CA"},{"id":28953,"firstName":"Lisa","lastName":"Ling","title":"Journalist, Author, Keynote Speaker","slug":"lisa-ling","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1547512162_lisa-ling.jpg","location":"Los Angeles, CA"},{"id":54046,"firstName":"Linda","lastName":"Sarsour","title":"Activist, Author, Keynote Speaker","slug":"linda-sarsour","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715784183_Linda_Sarsour_806448d333.jpg","location":"New York, NY"},{"id":30022,"firstName":"Mark","lastName":"Anthony Neal","title":"African American Studies Scholar, Social Justice Advocate, Keynote Speaker","slug":"mark-anthony-neal","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1547512254_mark-anthony-neal.jpeg","location":"Raleigh, NC"},{"id":29227,"firstName":"Angela","lastName":"Davis","title":"Professor Emerita, Activist, Author, Advocate for Social Justice","slug":"angela-davis","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1699903390_Screenshot 2023-11-13 142241.png","location":"Santa Cruz, CA"},{"id":29557,"firstName":"Dr.","lastName":"Cornel West","title":"Provocative Public Intellectual & Groundbreaking Author","slug":"dr-cornel-west","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1547512216_dr-cornel-west.jpg","location":"Princeton, NJ"}]},{"id":13,"name":"Science and Technology Speakers","slug":"science-technology","description":"<p>Science and Technology speakers are innovators who explore breakthroughs shaping the future of industries, research and everyday life. These experts include scientists, tech entrepreneurs, researchers and futurists who share valuable insights on innovation, discovery, and emerging trends.</p>\\r\\n\\r\\n<p>Whether you’re hosting a corporate summit, academic conference or tech forum, our science speakers and technology speakers deliver engaging keynotes that highlight advancements in AI, space exploration, healthcare and digital transformation. Their expertise helps audiences understand complex concepts, embrace innovation and prepare for tomorrow’s opportunities.</p>\\r\\n\\r\\n<p>Partner with Speaker Booking Agency to find the ideal science speakers and technology speakers who will inspire your audience and spark forward-thinking conversations about the future of our world.</p>","bottomDescription":"<p>Whether you\'re organizing a technology conference, scientific symposium, or corporate event, our Science and Technology Speakers deliver thought-provoking presentations that inspire audiences to embrace the latest trends and innovations. With a diverse range of expertise in cutting-edge research and groundbreaking technology, they captivate audiences, leaving a lasting impact on every attendee. Explore our list of Science and Technology Speakers and elevate your event with their passion for the ever-evolving world of science and technology.<br></p>","metaTitle":"Science Speakers and Technology Speakers","metaDesc":"Book science speakers and technology speakers to share insights on trends shaping industries and everyday life.","metaImage":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/root-categories/2c03a5b0bb95b3f89571f782415cbbfd_1559244406.jpg","isActive":true,"createdAt":"2025-12-17T22:19:05.180Z","updatedAt":"2025-12-17T22:19:05.180Z","topSpeakers":[{"id":31848,"firstName":"Erik","lastName":"Qualman","title":"Digital Leadership Expert, Author, Keynote Speaker","slug":"erik-qualman","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715783081_EQualmanHeadshot.jpg","location":"Austin, TX"},{"id":39106,"firstName":"Adam","lastName":"Cheyer","title":"Co-Founder of Siri and Viv Labs, AI Expert, Innovator, Keynote Speaker","slug":"adam-cheyer","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1566849956_cheyer_adam.jpg","location":"San Francisco, CA"},{"id":79930,"firstName":"Zack","lastName":"Kass","title":"AI Futurist • Former Head of Go-To-Market at OpenAI • Founder, ZK.AI Advisory","slug":"zack-kass","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1754406427_Zack Kass_y2NbTbHr.jpg","location":"Santa Barbara, CA"},{"id":31255,"firstName":"Clara","lastName":"Shih","title":"Head of Business AI at Meta and Founder of Hearsay Social","slug":"clara-shih","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1718739080_EUJ00ICp_400x400.png","location":"San Francisco, CA"},{"id":79678,"firstName":"Tia","lastName":"White","title":"Amazon Web Services GM of AI and Machine Learning","slug":"tia-white","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1716404514_tia-white.jpg","location":"Washington, D.C."},{"id":75087,"firstName":"Cassie","lastName":"Kozyrkov","title":"Chief Decision Scientist at Google | Expert in AI and Data-Driven Decision-Making","slug":"cassie-kozyrkov","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1722886191_Cassie_Kozyrkov_Headshot.png","location":"New York, NY"},{"id":33835,"firstName":"Mike","lastName":"Walsh","title":"Futurist, CEO of Tomorrow, Author, Innovation Expert","slug":"mike-walsh","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715782437_Mike-Walsh-WWSG-Photo.jpg","location":"New York, NY"}]},{"id":14,"name":"Sports Speakers","slug":"sports","description":"<p>Step into the captivating world of sports with <a href=\\"https://www.speakerbookingagency.com/\\" target=\\"_blank\\">SpeakerBookingAgency\'s (SBA)</a> Sports Speakers. Our curated roster showcases renowned athletes, coaches, and sports analysts who have made indelible marks in the world of sports. Whether you\'re planning a sports-themed event, team-building workshop, or corporate gathering, our Sports Speakers bring inspiring stories of triumph, dedication, and perseverance that resonate with sports enthusiasts and corporate audiences alike.</p>","bottomDescription":"<p>From heart-pounding tales of victory to invaluable lessons learned on the field, our Sports Speakers share their experiences that transcend the boundaries of sports. They inspire audiences to push their limits, embrace teamwork, and strive for excellence in every aspect of life. Discover the perfect Sports Speaker for your event and elevate your audience\'s experience with captivating narratives from the world of sports.<br></p>","metaTitle":"Sports Speakers | Renowned Athletes, Coaches & Sports Analysts | SpeakerBookingAgency","metaDesc":"Immerse your audience in the world of sports with our diverse selection of Sports Speakers. SpeakerBookingAgency (SBA) presents renowned athletes, coaches, and sports analysts who share inspiring stories of triumph, dedication, and perseverance that resonate with both sports enthusiasts and corporate audiences alike.<br>","metaImage":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/root-categories/7a7d58f343429b4c0a639b9472ce244e_1557344786.jpg","isActive":true,"createdAt":"2025-12-17T22:19:05.181Z","updatedAt":"2025-12-17T22:19:05.181Z","topSpeakers":[{"id":38680,"firstName":"Emmitt","lastName":"Smith","title":"Professional Athlete, Author, Keynote Speaker","slug":"emmitt-smith","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1554299507_emmitt-smith-5.jpg","location":"Dallas, TX"},{"id":42117,"firstName":"Mike","lastName":"Eruzione","title":"Captain of the Miracle on Ice 1980 U.S. Olympic Hockey Team","slug":"mike-eruzione","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/speakers/headshots/5e6ba576-ec2a-471c-8b30-9dcaa77b9673-eruzione_mike.jpg","location":"Boston, MA"},{"id":38787,"firstName":"Tim","lastName":"Tebow","title":"Former Heisman Trophy Winner and Leading Christian Speaker","slug":"tim-tebow","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1560447163_landscape-1449078614-tebow-lead.jpg","location":"Jacksonville, FL"},{"id":38678,"firstName":"Magic","lastName":"Johnson","title":"NBA Legend, Entrepreneur, Keynote Speaker","slug":"magic-johnson","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1661355018_magicjohnsonheadshot_1200xx1819-1819-0-0.jpg","location":"Los Angeles, CA"},{"id":29378,"firstName":"Bethany","lastName":"Hamilton","title":"Professional Surfer | Shark Attack Survivor | Motivational Speaker","slug":"bethany-hamilton","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1547512202_bethany-hamilton.jpeg","location":"Kauai, HI"},{"id":42032,"firstName":"Lisa","lastName":"Leslie","title":"Basketball Hall of Famer and WNBA Legend","slug":"lisa-leslie","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1572272775_lisa-leslie.png","location":"Boca Raton, FL"},{"id":42035,"firstName":"Dominique","lastName":"Dawes","title":"Olympic Gold Medal-Winning Gymnast and Former Co-Chair of President Obama\'s Council on Fitness Sports & Nutrition","slug":"dominique-dawes","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1572272777_dominique-dawes.jpg","location":"Washington D.C."}]},{"id":11,"name":"Politics & World Issues Speakers","slug":"politics-world-issues","description":"<p>Political speakers and World Issues speakers are thought leaders who provide critical perspectives on global affairs, governance and social change. These experts include policymakers, diplomats, journalists and academics who share deep insights on political movements, international relations and pressing global challenges.</p>\\r\\n\\r\\n<p>Whether you’re organizing a leadership summit, policy forum or educational conference, our political and world issues speakers deliver engaging keynotes that explore current events, geopolitical trends and strategies for building a more informed and connected world. Their expertise equips audiences to better understand complex issues, foster dialogue and take meaningful action.</p>\\r\\n\\r\\n<p>Partner with Speaker Booking Agency to find the ideal political speakers and world issues speakers who will enlighten your audience and inspire impactful conversations about the future of our world.</p>","bottomDescription":"<p>Our Politics & World Issues Speakers encompass a broad spectrum of expertise, including government officials, diplomats, human rights advocates, journalists, and scholars. They address vital issues such as climate change, global security, humanitarian efforts, and economic policies, providing in-depth analyses that drive informed decision-making and foster positive change. These influential speakers bring a wealth of experience and knowledge to your event, captivating audiences with their passionate storytelling and thought-provoking ideas. With their powerful messages and calls to action, they inspire audiences to become informed global citizens and actively participate in shaping a better future for all.</p><p>At\xa0<a href=\\"https://www.speakerbookingagency.com/\\" target=\\"_blank\\">SpeakerBookingAgency (SBA)</a>, we understand the significance of global engagement in addressing the world\'s most pressing challenges. Our Politics & World Issues Speakers have shared their expertise on prestigious stages worldwide, from conferences and summits to academic institutions and corporate events. They have navigated complex geopolitical landscapes and offered diplomatic solutions, making them ideal choices for your event\'s keynote presentations, panel discussions, and interactive workshops. By collaborating with us, you gain access to a network of thought leaders who can enlighten, engage, and motivate your audience, sparking meaningful dialogues and inspiring positive actions to tackle global issues.</p><p>As you plan your event to address Politics & World Issues,\xa0<a href=\\"https://www.speakerbookingagency.com/\\" target=\\"_blank\\">SpeakerBookingAgency (SBA)</a>\xa0is your gateway to securing influential speakers who possess the experience, knowledge, and passion to drive transformative change. Browse our extensive roster of Politics & World Issues Speakers and find the perfect match to elevate your event\'s impact and foster a deeper understanding of the pressing global challenges we face.</p>","metaTitle":"Political Speakers and World Issues Speakers","metaDesc":"Book political speakers and world issues speakers to deliver insights on global affairs, governance, and today’s pressing challenges.","metaImage":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/root-categories/ebe5911dab6628a4b9b0e2752c2046c0_1557345695.jpg","isActive":true,"createdAt":"2025-12-17T22:19:05.178Z","updatedAt":"2025-12-17T22:19:05.178Z","topSpeakers":[{"id":53525,"firstName":"Mike","lastName":"Pompeo","title":"Former U.S. Secretary of State, National Security Expert, Keynote Speaker","slug":"mike-pompeo","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715786603_secretary_pompeo.png","location":"Washington D.C."},{"id":61893,"firstName":"Susan","lastName":"Rice","title":"Former National Security Advisor and Head of White House Domestic Policy Council","slug":"susan-rice","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1583354307_nPyhCl9o_400x400.png","location":"Washington D.C."},{"id":38970,"firstName":"Tucker","lastName":"Carlson","title":"Leading Conservative Media Personality and Keynote Speaker Formerly of Fox News","slug":"tucker-carlson","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1563908507_os-et-trump-tucker-carlson-interview-20170313.jpg","location":"Tampa, FL"},{"id":29234,"firstName":"Donna","lastName":"Brazile","title":"Political Strategist, Author, Keynote Speaker","slug":"donna-brazile","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715786913_08242023_Donna_Brazile_AAE_Headshot-scaled.jpg","location":"Washington, D.C."},{"id":33791,"firstName":"Mike","lastName":"Huckabee","title":"Political Leader, Media Personality, Keynote Speaker","slug":"mike-huckabee","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715785929_Mike-Huckabee-Portrait.jpg","location":"Little Rock, AR"},{"id":29365,"firstName":"Bakari","lastName":"Sellers","title":"Political Commentator, Social Justice Advocate, Keynote Speaker","slug":"bakari-sellers","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1715786739_Bakari-Sellers-scaled-1.jpg","location":"Columbia, SC"},{"id":79933,"firstName":"Scott","lastName":"Jennings","title":"Conservative Political Strategist & Commentator","slug":"scott-jennings","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/celebrities/1760030174_Jennings.png","location":"Kentucky-KY"},{"id":29253,"firstName":"Van","lastName":"Jones","title":"Social Justice Advocate, Environmental Activist, Keynote Speaker","slug":"van-jones","headshotUrl":"https://speakerbooking-assets.s3.us-west-2.amazonaws.com/speakers/headshots/43e26be6-d032-43a3-858f-40714f1c2512-van-jones-headshot.jpg","location":"Los Angeles, CA, USA"}]}]}',
        );
      let h =
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
        p = [
          {
            id: 1,
            firstName: "Patty",
            lastName: "McCord",
            slug: "patty-mccord",
            headshotUrl: h,
            title: "Workplace Innovator, Keynote Speaker",
          },
          {
            id: 2,
            firstName: "Aisha",
            lastName: "Harris",
            slug: "aisha-harris",
            headshotUrl: h,
            title: "Author & Culture Commentator",
          },
          {
            id: 3,
            firstName: "Shabnam",
            lastName: "Mogharabi",
            slug: "shabnam-mogharabi",
            headshotUrl: h,
            title: "Entertainment Executive",
          },
          {
            id: 4,
            firstName: "Anna Maria",
            lastName: "Chavez",
            slug: "anna-maria-chavez",
            headshotUrl: h,
            title: "Leadership & Nonprofit Executive",
          },
          {
            id: 5,
            firstName: "Natalie",
            lastName: "Nixon",
            slug: "natalie-nixon",
            headshotUrl: h,
            title: "President, Figure 8 Thinking",
          },
          {
            id: 6,
            firstName: "Sophia",
            lastName: "Chang",
            slug: "sophia-chang",
            headshotUrl: h,
            title: "Author & Speaker",
          },
          {
            id: 7,
            firstName: "Jordan",
            lastName: "Matthews",
            slug: "jordan-matthews",
            headshotUrl: h,
            title: "Leadership Coach & Pro Speaker",
          },
          {
            id: 8,
            firstName: "Alexis",
            lastName: "Reed",
            slug: "alexis-reed",
            headshotUrl: h,
            title: "Innovation Strategist & Keynote Speaker",
          },
        ],
        u = [
          {
            id: 1,
            name: "Professional Speakers",
            slug: "professional-speakers",
            metaImage: h,
            description:
              "Book the best professional speakers to inspire and engage your audience with tailored, high-impact keynotes that elevate any event.",
            topSpeakers: p,
          },
          {
            id: 2,
            name: "Business Speakers",
            slug: "business-and-corporate",
            metaImage: h,
            description:
              "Secure top business speakers who deliver motivational, results-driven presentations designed to empower teams and drive organizational success.",
            topSpeakers: p,
          },
          {
            id: 3,
            name: "Diversity Speakers",
            slug: "diversity-inclusion-speakers",
            metaImage: h,
            description:
              "Bring leading diversity and inclusion speakers to your event for insightful, customized keynotes that promote belonging and inspire positive change.",
            topSpeakers: p,
          },
          {
            id: 4,
            name: "Technology Speakers",
            slug: "technology",
            metaImage: h,
            description:
              "Book renowned technology speakers who provide cutting-edge insights and motivational talks on innovation, digital trends, and the future of tech.",
            topSpeakers: p,
          },
          {
            id: 5,
            name: "Sports Motivational Speakers",
            slug: "sports-motivational-speakers",
            metaImage: h,
            description:
              "Invite the best sports motivational speakers to energize your audience with powerful stories of resilience, teamwork, and peak performance.",
            topSpeakers: p,
          },
          {
            id: 6,
            name: "Politics/World Issue Speakers",
            slug: "politics-world-issue-speakers",
            metaImage: h,
            description:
              "Engage your audience with top politics and world issue speakers who offer thought-provoking, motivational keynotes on global affairs and current events.",
            topSpeakers: p,
          },
        ],
        g = (e) => (e ? e.replace(/<[^>]*>/g, "").trim() : void 0),
        x = [
          {
            originalSlug: "professional-speakers",
            newName: "Professional Speakers",
            newDescription:
              "Book the best professional speakers to inspire and engage your audience with tailored, high-impact keynotes that elevate any event.",
          },
          {
            originalSlug: "business",
            newName: "Business Speakers",
            newDescription:
              "Secure top business speakers who deliver motivational, results-driven presentations designed to empower teams and drive organizational success.",
          },
          {
            originalSlug: "diversity-inclusion",
            newName: "Diversity Speakers",
            newDescription:
              "Bring leading diversity and inclusion speakers to your event for insightful, customized keynotes that promote belonging and inspire positive change.",
          },
          {
            originalSlug: "science-technology",
            newName: "Technology Speakers",
            newDescription:
              "Book renowned technology speakers who provide cutting-edge insights and motivational talks on innovation, digital trends, and the future of tech.",
          },
          {
            originalSlug: "sports",
            newName: "Sports Motivational Speakers",
            newDescription:
              "Invite the best sports motivational speakers to energize your audience with powerful stories of resilience, teamwork, and peak performance.",
          },
          {
            originalSlug: "politics-world-issues",
            newName: "Politics/World Issue Speakers",
            newDescription:
              "Engage your audience with top politics and world issue speakers who offer thought-provoking, motivational keynotes on global affairs and current events.",
          },
        ];
      var f = () => {
        var e, a;
        let [s, f] = (0, r.useState)([]),
          [b, v] = (0, r.useState)([]),
          [k, w] = (0, r.useState)(null),
          [y, N] = (0, r.useState)(null),
          [j, S] = (0, r.useState)(!1),
          [_, A] = (0, r.useState)(0),
          [C, z] = (0, r.useState)(null),
          [B, E] = (0, r.useState)(0),
          [I, T] = (0, r.useState)(!1),
          P = b.length ? b : u,
          U =
            k || (null === (e = P[0]) || void 0 === e ? void 0 : e.slug) || "",
          [M, D] = (0, r.useState)(0),
          [F, L] = (0, r.useState)(!1);
        ((0, r.useEffect)(() => {
          (async () => {
            S(!0);
            try {
              let a = m.a || [];
              if (a.length) {
                f(a);
                let s = x
                  .map((e) => {
                    let s = a.find((a) => a.slug === e.originalSlug);
                    return s
                      ? { ...s, name: e.newName, description: e.newDescription }
                      : null;
                  })
                  .filter(Boolean);
                if ((v(s), s.length)) {
                  var e;
                  w(
                    (null === (e = s[0]) || void 0 === e ? void 0 : e.slug) ||
                      null,
                  );
                } else w(u[0].slug);
              } else (f([]), v([]), w(u[0].slug));
            } catch (e) {
              (console.error("Failed to load root categories top speakers", e),
                f([]),
                v([]),
                w(u[0].slug));
            } finally {
              S(!1);
            }
          })();
        }, []),
          (0, r.useEffect)(() => {
            !k && P.length && w(P[0].slug);
          }, [P, k]),
          (0, r.useEffect)(() => {
            if (P.length <= 1 || F) return;
            let e = setInterval(() => {
              D((e) => {
                let a = (e + 1) % P.length;
                return (w(P[a].slug), a);
              });
            }, 4e3);
            return () => clearInterval(e);
          }, [P, F]),
          (0, r.useEffect)(() => {
            if (!U) return;
            let e = 0 === s.length,
              a = P.find((e) => e.slug === U);
            if (a) {
              var t;
              let s = g(a.description) || a.description,
                r = (
                  null === (t = a.topSpeakers) || void 0 === t
                    ? void 0
                    : t.length
                )
                  ? a.topSpeakers
                  : e
                    ? p
                    : [];
              N({ name: a.name, slug: a.slug, description: s, speakers: r });
              return;
            }
            if (e) {
              N({
                name: U || "Featured Topic",
                slug: U || "",
                description: "Explore leading voices tailored to this topic.",
                speakers: p,
              });
              return;
            }
            N(null);
          }, [U, P, s.length]));
        let Z = (0, r.useMemo)(
            () =>
              (null == y ? void 0 : y.speakers)
                ? y.speakers.filter(Boolean).slice(0, 8)
                : [],
            [y],
          ),
          K = (0, r.useMemo)(() => {
            let e = [];
            for (let a = 0; a < Z.length; a += 2) e.push(Z.slice(a, a + 2));
            return e;
          }, [Z]);
        (0, r.useEffect)(() => {
          A(0);
        }, [U, Z.length]);
        let W = K.length || 1,
          R = (e) => {
            A(Math.max(0, Math.min(e, W - 1)));
          },
          G = () => {
            A((e) => (e + 1) % W);
          },
          O = () => {
            A((e) => (e - 1 + W) % W);
          },
          H = {
            title: (null == y ? void 0 : y.name) || "Featured Topic",
            description:
              (null == y ? void 0 : y.description) ||
              "Explore leading voices tailored to this topic. These speakers bring credibility, expertise, and compelling delivery to every event.",
          },
          J = [
            { type: "info" },
            ...Z.map((e) => ({ type: "speaker", speaker: e })),
          ],
          q = (e, a) => {
            (w(e), D(a), T(!1));
          };
        return (0, t.jsxs)("section", {
          className:
            "relative overflow-hidden bg-neutral-950 text-white py-8 md:py-12",
          children: [
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-amber-400/10 blur-[120px]",
            }),
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute -right-10 -bottom-16 h-80 w-80 rounded-full bg-amber-300/8 blur-[150px]",
            }),
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]",
            }),
            (0, t.jsxs)("div", {
              className: "container-custom",
              children: [
                (0, t.jsx)("div", {
                  className: "mb-6 space-y-3",
                  children: (0, t.jsx)("h2", {
                    className:
                      "text-[2rem] md:text-[2.2rem] font-bold leading-tight tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
                    children: (0, t.jsx)("span", {
                      className: "text-[#EBAC2B]",
                      children: "Popular Speaking Topics",
                    }),
                  }),
                }),
                (0, t.jsx)("div", {
                  className: "mb-0",
                  children: (0, t.jsxs)("div", {
                    className: "relative border-b border-white/10",
                    children: [
                      (0, t.jsxs)("div", {
                        className: "sm:hidden",
                        children: [
                          (0, t.jsxs)("button", {
                            onClick: () => T(!I),
                            className:
                              "flex w-full items-center justify-between rounded-t-md border border-white/15 bg-white/8 px-4 py-3 text-left font-semibold text-white/90 transition-all hover:bg-white/12",
                            "aria-expanded": I,
                            "aria-label": I
                              ? "Close categories menu"
                              : "Open categories menu",
                            children: [
                              (0, t.jsx)("span", {
                                className: "truncate",
                                children:
                                  (null === (a = P.find((e) => e.slug === U)) ||
                                  void 0 === a
                                    ? void 0
                                    : a.name) || "Select Category",
                              }),
                              I
                                ? (0, t.jsx)(n.Z, {
                                    className: "h-4 w-4 flex-shrink-0 ml-2",
                                  })
                                : (0, t.jsx)(l.Z, {
                                    className: "h-4 w-4 flex-shrink-0 ml-2",
                                  }),
                            ],
                          }),
                          (0, t.jsx)("div", {
                            className:
                              "overflow-hidden transition-all duration-300 ease-in-out ".concat(
                                I ? "max-h-96" : "max-h-0",
                              ),
                            children: (0, t.jsx)("div", {
                              className:
                                "flex flex-col gap-1 border-x border-b border-white/15 bg-white/8 rounded-b-md p-1",
                              children: P.map((e, a) => {
                                let s = U === e.slug;
                                return (0, t.jsx)(
                                  "button",
                                  {
                                    onClick: () => q(e.slug, a),
                                    onMouseEnter: () => L(!0),
                                    onMouseLeave: () => L(!1),
                                    onTouchStart: () => L(!0),
                                    onTouchEnd: () =>
                                      setTimeout(() => L(!1), 1e3),
                                    className:
                                      "w-full rounded-md px-4 py-3 text-left text-sm font-semibold transition-all ".concat(
                                        s
                                          ? "bg-[#EBAC2B]/15 text-[#EBAC2B]"
                                          : "text-white/70 hover:bg-white/8 hover:text-white/90",
                                      ),
                                    "aria-pressed": s,
                                    children: e.name,
                                  },
                                  e.id,
                                );
                              }),
                            }),
                          }),
                        ],
                      }),
                      (0, t.jsx)("div", {
                        className: "hidden sm:flex flex-wrap gap-1",
                        role: "tablist",
                        children: P.map((e, a) => {
                          let s = U === e.slug;
                          return (0, t.jsx)(
                            "button",
                            {
                              onClick: () => {
                                (w(e.slug), D(a));
                              },
                              onMouseEnter: () => L(!0),
                              onMouseLeave: () => L(!1),
                              className:
                                "flex-1 min-w-0 max-w-[16.666%] rounded-t-md border px-2 py-3 text-center text-sm font-semibold transition-all ".concat(
                                  s
                                    ? "border-[#EBAC2B] bg-[#EBAC2B]/15 text-[#EBAC2B] shadow-[0_0_20px_rgba(235,172,43,0.15)] border-b-2"
                                    : "border-white/12 bg-white/6 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white/90",
                                ),
                              "aria-pressed": s,
                              children: (0, t.jsx)("span", {
                                className: "truncate block text-xs",
                                children: e.name,
                              }),
                            },
                            e.id,
                          );
                        }),
                      }),
                    ],
                  }),
                }),
                (0, t.jsxs)("div", {
                  className:
                    "rounded-b-2xl bg-white/[0.04] p-5 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-sm",
                  children: [
                    (0, t.jsx)("div", {
                      className:
                        "pointer-events-none absolute -top-12 right-6 h-32 w-32 rotate-12 rounded-full bg-[#EBAC2B]/8 blur-3xl",
                    }),
                    j
                      ? (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsx)("div", {
                              className:
                                "hidden sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4",
                              children: Array.from({ length: 9 }).map((e, a) =>
                                (0, t.jsxs)(
                                  "div",
                                  {
                                    className:
                                      "relative flex min-h-[140px] items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 shadow-[0_10px_26px_rgba(0,0,0,0.2)]",
                                    children: [
                                      (0, t.jsx)("div", {
                                        className:
                                          "absolute inset-0 backdrop-blur-[2px]",
                                      }),
                                      (0, t.jsx)("div", {
                                        className:
                                          "relative h-24 w-24 shrink-0 rounded-lg bg-white/10 blur-[1px]",
                                      }),
                                      (0, t.jsxs)("div", {
                                        className:
                                          "relative flex-1 space-y-3 px-2",
                                        children: [
                                          (0, t.jsx)("div", {
                                            className:
                                              "h-4 w-3/5 rounded-full bg-white/15 blur-[0.5px]",
                                          }),
                                          (0, t.jsx)("div", {
                                            className:
                                              "h-3 w-4/5 rounded-full bg-white/10 blur-[0.5px]",
                                          }),
                                          (0, t.jsx)("div", {
                                            className:
                                              "h-3 w-2/3 rounded-full bg-white/10 blur-[0.5px]",
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  a,
                                ),
                              ),
                            }),
                            (0, t.jsxs)("div", {
                              className: "sm:hidden space-y-4",
                              children: [
                                (0, t.jsxs)("div", {
                                  className:
                                    "flex min-h-[130px] flex-col justify-between rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.2)]",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      className: "space-y-3",
                                      children: [
                                        (0, t.jsx)("div", {
                                          className:
                                            "h-4 w-2/3 rounded-full bg-white/15 blur-[0.5px]",
                                        }),
                                        (0, t.jsx)("div", {
                                          className:
                                            "h-3 w-full rounded-full bg-white/10 blur-[0.5px]",
                                        }),
                                        (0, t.jsx)("div", {
                                          className:
                                            "h-3 w-4/5 rounded-full bg-white/10 blur-[0.5px]",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsx)("div", {
                                      className:
                                        "mt-4 h-9 w-36 rounded-full bg-white/15 blur-[0.5px]",
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("div", {
                                  className: "space-y-3",
                                  children: Array.from({ length: 3 }).map(
                                    (e, a) =>
                                      (0, t.jsxs)(
                                        "div",
                                        {
                                          className:
                                            "relative flex min-h-[120px] items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 px-3 py-2 shadow-[0_10px_22px_rgba(0,0,0,0.2)]",
                                          children: [
                                            (0, t.jsx)("div", {
                                              className:
                                                "absolute inset-0 backdrop-blur-[2px]",
                                            }),
                                            (0, t.jsx)("div", {
                                              className:
                                                "relative h-20 w-20 shrink-0 rounded-lg bg-white/10 blur-[1px]",
                                            }),
                                            (0, t.jsxs)("div", {
                                              className:
                                                "relative flex-1 space-y-3",
                                              children: [
                                                (0, t.jsx)("div", {
                                                  className:
                                                    "h-4 w-3/4 rounded-full bg-white/15 blur-[0.5px]",
                                                }),
                                                (0, t.jsx)("div", {
                                                  className:
                                                    "h-3 w-full rounded-full bg-white/10 blur-[0.5px]",
                                                }),
                                                (0, t.jsx)("div", {
                                                  className:
                                                    "h-3 w-2/3 rounded-full bg-white/10 blur-[0.5px]",
                                                }),
                                              ],
                                            }),
                                          ],
                                        },
                                        a,
                                      ),
                                  ),
                                }),
                              ],
                            }),
                          ],
                        })
                      : (0, t.jsxs)(t.Fragment, {
                          children: [
                            (0, t.jsxs)("div", {
                              className:
                                "hidden sm:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4",
                              children: [
                                J.map((e, a) => {
                                  if ("info" === e.type)
                                    return (0, t.jsxs)(
                                      "div",
                                      {
                                        className:
                                          "group relative flex h-full min-h-[150px] flex-col justify-between overflow-hidden rounded-xl bg-white/10 px-4 py-3 shadow-[0_12px_28px_rgba(0,0,0,0.25)] border border-white/15",
                                        children: [
                                          (0, t.jsx)("div", {
                                            className:
                                              "pointer-events-none absolute inset-0 bg-white/5",
                                          }),
                                          (0, t.jsxs)("div", {
                                            children: [
                                              (0, t.jsx)("h3", {
                                                className:
                                                  "mb-2 text-xl font-bold text-white line-clamp-2",
                                                children: H.title,
                                              }),
                                              (0, t.jsx)("p", {
                                                className:
                                                  "text-sm md:text-sm text-white/75 line-clamp-3 min-h-[60px]",
                                                children: H.description,
                                              }),
                                            ],
                                          }),
                                          (0, t.jsx)(o.default, {
                                            href: "/category/".concat(
                                              U || u[0].slug,
                                            ),
                                            children: (0, t.jsxs)(c.z, {
                                              className:
                                                "mt-4 ml-auto justify-center rounded-full px-4 text-[0.6rem] md:text-sm font-semibold text-black bg-[#EBAC2B] shadow-[0_12px_30px_rgba(235,172,43,0.3)] hover:bg-primary-600",
                                              children: [
                                                "Explore ",
                                                H.title,
                                                (0, t.jsx)(d.Z, {
                                                  className: "ml-2 h-4 w-4",
                                                }),
                                              ],
                                            }),
                                          }),
                                        ],
                                      },
                                      "info-".concat(a),
                                    );
                                  let s = e.speaker,
                                    r = ""
                                      .concat(s.firstName, " ")
                                      .concat(s.lastName),
                                    n = s.title || s.bio || s.location || "";
                                  return (0, t.jsxs)(
                                    o.default,
                                    {
                                      href: "/talent/".concat(s.slug),
                                      className:
                                        "group relative flex min-h-[150px] items-center gap-3 overflow-hidden rounded-xl bg-white px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-[3px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-gray-200",
                                      children: [
                                        (0, t.jsx)("div", {
                                          className:
                                            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-amber-50/40",
                                        }),
                                        (0, t.jsx)("div", {
                                          className:
                                            "relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-200 shadow-inner shadow-black/10",
                                          children: (0, t.jsx)(i.default, {
                                            src: s.headshotUrl || h,
                                            alt: r,
                                            fill: !0,
                                            sizes: "112px",
                                            className: "object-cover",
                                            unoptimized: !0,
                                          }),
                                        }),
                                        (0, t.jsxs)("div", {
                                          className: "flex-1",
                                          children: [
                                            (0, t.jsx)("p", {
                                              className:
                                                "text-lg font-semibold text-gray-900 group-hover:text-amber-600",
                                              children: r,
                                            }),
                                            n &&
                                              (0, t.jsx)("p", {
                                                className:
                                                  "mt-1 text-sm font-medium leading-relaxed text-gray-700 line-clamp-3",
                                                children: n,
                                              }),
                                          ],
                                        }),
                                      ],
                                    },
                                    s.id,
                                  );
                                }),
                                1 === J.length &&
                                  (0, t.jsx)("p", {
                                    className: "text-sm text-neutral-300",
                                    children:
                                      "No speakers found for this list.",
                                  }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "sm:hidden space-y-4",
                              children: [
                                (0, t.jsxs)("div", {
                                  className:
                                    "flex h-full min-h-[150px] flex-col justify-between rounded-xl bg-white/10 px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.25)] border border-white/15",
                                  children: [
                                    (0, t.jsxs)("div", {
                                      children: [
                                        (0, t.jsx)("h3", {
                                          className:
                                            "mb-2 text-xl font-bold text-white line-clamp-2",
                                          children: H.title,
                                        }),
                                        (0, t.jsx)("p", {
                                          className:
                                            "text-xs text-white/75 line-clamp-3 min-h-[60px]",
                                          children: H.description,
                                        }),
                                      ],
                                    }),
                                    (0, t.jsx)(o.default, {
                                      href: "/category/".concat(U || u[0].slug),
                                      className: "flex justify-center",
                                      children: (0, t.jsxs)(c.z, {
                                        className:
                                          "mt-4 rounded-full bg-[#EBAC2B] px-4 text-[0.6rem] sm:text-sm font-semibold text-black shadow-[0_12px_30px_rgba(235,172,43,0.3)] hover:bg-primary-600",
                                        children: [
                                          "Explore ",
                                          H.title,
                                          (0, t.jsx)(d.Z, {
                                            className: "ml-2 h-4 w-4",
                                          }),
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)("div", {
                                  className: "relative overflow-hidden",
                                  onTouchStart: (e) => {
                                    W <= 1 || (z(e.touches[0].clientX), E(0));
                                  },
                                  onTouchMove: (e) => {
                                    null === C ||
                                      W <= 1 ||
                                      E(e.touches[0].clientX - C);
                                  },
                                  onTouchEnd: () => {
                                    if (null === C || W <= 1) {
                                      (z(null), E(0));
                                      return;
                                    }
                                    (B > 50 ? O() : B < -50 && G(),
                                      z(null),
                                      E(0));
                                  },
                                  children: [
                                    (0, t.jsx)("div", {
                                      className:
                                        "flex transition-transform duration-500 ease-in-out",
                                      style: {
                                        transform: "translateX(calc(-"
                                          .concat(100 * _, "% + ")
                                          .concat(B, "px))"),
                                      },
                                      children: K.map((e, a) =>
                                        (0, t.jsx)(
                                          "div",
                                          {
                                            className:
                                              "w-full flex-shrink-0 space-y-3 px-1",
                                            children: e.map((e) => {
                                              let a = ""
                                                  .concat(e.firstName, " ")
                                                  .concat(e.lastName),
                                                s =
                                                  e.title ||
                                                  e.bio ||
                                                  e.location ||
                                                  "";
                                              return (0, t.jsxs)(
                                                o.default,
                                                {
                                                  href: "/talent/".concat(
                                                    e.slug,
                                                  ),
                                                  className:
                                                    "group relative flex min-h-[150px] items-center gap-3 rounded-xl bg-white px-3 py-0 shadow-[0_10px_22px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-[2px] hover:shadow-[0_18px_32px_rgba(0,0,0,0.25)] border border-gray-200",
                                                  children: [
                                                    (0, t.jsx)("div", {
                                                      className:
                                                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-amber-50/40",
                                                    }),
                                                    (0, t.jsx)("div", {
                                                      className:
                                                        "relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-200 shadow-inner shadow-black/10",
                                                      children: (0, t.jsx)(
                                                        i.default,
                                                        {
                                                          src:
                                                            e.headshotUrl || h,
                                                          alt: a,
                                                          fill: !0,
                                                          sizes: "96px",
                                                          className:
                                                            "object-cover",
                                                          unoptimized: !0,
                                                        },
                                                      ),
                                                    }),
                                                    (0, t.jsxs)("div", {
                                                      className: "flex-1",
                                                      children: [
                                                        (0, t.jsx)("p", {
                                                          className:
                                                            "text-base font-semibold text-gray-900 group-hover:text-amber-600",
                                                          children: a,
                                                        }),
                                                        s &&
                                                          (0, t.jsx)("p", {
                                                            className:
                                                              "mt-1 text-sm font-medium leading-relaxed text-gray-700 line-clamp-3",
                                                            children: s,
                                                          }),
                                                      ],
                                                    }),
                                                  ],
                                                },
                                                e.id,
                                              );
                                            }),
                                          },
                                          a,
                                        ),
                                      ),
                                    }),
                                    K.length > 1 &&
                                      (0, t.jsxs)("div", {
                                        className:
                                          "mt-3 flex items-center justify-between gap-3",
                                        children: [
                                          (0, t.jsx)(c.z, {
                                            variant: "outline",
                                            size: "icon",
                                            onClick: O,
                                            className:
                                              "h-10 w-10 rounded-full border-white/20 text-white bg-white/10 hover:border-amber-300 hover:text-amber-200 shadow-lg shadow-black/20",
                                            "aria-label": "Previous speakers",
                                            children: (0, t.jsx)(d.Z, {
                                              className: "h-4 w-4 rotate-180",
                                            }),
                                          }),
                                          (0, t.jsx)("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: K.map((e, a) =>
                                              (0, t.jsx)(
                                                "button",
                                                {
                                                  onClick: () => R(a),
                                                  className:
                                                    "h-2 rounded-full transition-all duration-300 ".concat(
                                                      a === _
                                                        ? "w-6 bg-[#EBAC2B] shadow-[0_0_12px_rgba(235,172,43,0.65)]"
                                                        : "w-2 bg-white/30",
                                                    ),
                                                  "aria-label":
                                                    "Go to slide ".concat(
                                                      a + 1,
                                                    ),
                                                },
                                                a,
                                              ),
                                            ),
                                          }),
                                          (0, t.jsx)(c.z, {
                                            variant: "outline",
                                            size: "icon",
                                            onClick: G,
                                            className:
                                              "h-10 w-10 rounded-full border-white/20 text-white bg-white/10 hover:border-amber-300 hover:text-amber-200 shadow-lg shadow-black/20",
                                            "aria-label": "Next speakers",
                                            children: (0, t.jsx)(d.Z, {
                                              className: "h-4 w-4",
                                            }),
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                  ],
                }),
                (0, t.jsx)("div", {
                  className: "mt-12 flex justify-center",
                  children: (0, t.jsx)(o.default, {
                    href: "/speaker-list",
                    children: (0, t.jsxs)(c.z, {
                      className:
                        "h-10 sm:h-12 rounded-full bg-[#EBAC2B] px-6 sm:px-8 text-sm sm:text-base font-semibold text-[#0F1A32] shadow-[0_16px_40px_rgba(235,172,43,0.3)] hover:bg-primary-600",
                      children: [
                        "More Speaker Recommendations",
                        (0, t.jsx)(d.Z, {
                          className: "ml-2 h-3 w-3 sm:h-4 sm:w-4",
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          ],
        });
      };
    },
    1257: function (e, a, s) {
      "use strict";
      (s.r(a),
        s.d(a, {
          default: function () {
            return g;
          },
        }));
      var t = s(7437),
        r = s(3145),
        i = s(7648),
        o = s(2265),
        n = s(2869);
      let l = (0, s(9205).Z)("CalendarClock", [
        [
          "path",
          {
            d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",
            key: "1osxxc",
          },
        ],
        ["path", { d: "M16 2v4", key: "4m81vk" }],
        ["path", { d: "M8 2v4", key: "1cmpym" }],
        ["path", { d: "M3 10h5", key: "r794hk" }],
        ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
        ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }],
      ]);
      var d = s(2208),
        c = s(6858),
        m = (e) => {
          var a, s, m;
          let { speaker: h, onBookClick: p } = e,
            [u, g] = (0, o.useState)(!1),
            x =
              h.name ||
              ""
                .concat(h.firstName || "", " ")
                .concat(h.lastName || "")
                .trim(),
            f =
              h.slug ||
              "".concat(
                (h.firstName || x || "speaker")
                  .toLowerCase()
                  .replace(/\s+/g, "-"),
                "-speaker-booking",
              ),
            b = h.image || h.headshotUrl || "/images/default-picture.svg",
            v = h.title || h.subtitle || "",
            k = h.description || h.bio || "",
            w =
              (null === (a = h.categories) || void 0 === a
                ? void 0
                : a.map((e) => {
                    var a;
                    return "string" == typeof e
                      ? e
                      : (null == e
                          ? void 0
                          : null === (a = e.category) || void 0 === a
                            ? void 0
                            : a.name) || (null == e ? void 0 : e.name);
                  })) || [],
            y = (e) => e.toLowerCase().replace(/\s+/g, "-"),
            N = u ? w.slice(0, 1) : w.slice(0, 2);
          (null === (s = h.feeRange) || void 0 === s || s.label,
            (0, o.useEffect)(() => {
              let e = window.matchMedia("(max-width: 640px)"),
                a = (e) => g(e.matches);
              return (
                g(e.matches),
                e.addEventListener("change", a),
                () => {
                  e.removeEventListener("change", a);
                }
              );
            }, []));
          let j =
              "group relative flex h-full w-full flex-col gap-3 sm:gap-4 overflow-hidden rounded-xl bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform duration-200 active:scale-[0.98] active:opacity-90 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(0,0,0,0.12)] dark:bg-[#0f0f0f] dark:border-gray-800",
            S = (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)("div", {
                  className: "relative block",
                  children: (0, t.jsx)("div", {
                    className: "relative aspect-square w-full",
                    children: (0, t.jsx)(r.default, {
                      src: b,
                      alt: x || "Speaker",
                      fill: !0,
                      sizes: "(max-width: 768px) 60vw, 25vw",
                      className:
                        "object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]",
                      quality: 95,
                      priority: !0,
                      unoptimized: !0,
                    }),
                  }),
                }),
                !u &&
                  (0, t.jsxs)("div", {
                    className:
                      "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ".concat(
                        "opacity-0 group-hover:opacity-100",
                      ),
                    children: [
                      (0, t.jsx)("div", {
                        className:
                          "absolute inset-0 bg-neutral-900/75 z-0 dark:bg-neutral-900/80",
                      }),
                      (0, t.jsx)("div", {
                        className: "absolute inset-0 backdrop-blur-md z-0",
                      }),
                      (0, t.jsxs)("div", {
                        className:
                          "pointer-events-auto relative z-10 flex w-full max-w-[220px] flex-col items-stretch gap-2 px-3",
                        children: [
                          (0, t.jsxs)(n.z, {
                            size: "sm",
                            className:
                              "h-10 rounded-md bg-primary-500 text-xs font-semibold text-neutral-900 shadow-md hover:bg-primary-600 dark:text-neutral-900",
                            onClick: (e) => {
                              (e.stopPropagation(), null == p || p(h));
                            },
                            children: [
                              (0, t.jsx)(l, { className: "mr-2 h-4 w-4" }),
                              "Check Availability",
                            ],
                          }),
                          (0, t.jsx)(i.default, {
                            href: "/talent/".concat(f),
                            className: "w-full",
                            onClick: (e) => e.stopPropagation(),
                            children: (0, t.jsxs)(n.z, {
                              size: "sm",
                              variant: "secondary",
                              className:
                                "h-10 w-full rounded-md bg-white/95 text-xs font-semibold text-neutral-900 shadow-md hover:bg-white dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-100",
                              children: [
                                (0, t.jsx)(d.Z, { className: "mr-2 h-4 w-4" }),
                                "View Profile",
                              ],
                            }),
                          }),
                          (0, t.jsx)(i.default, {
                            href: "/booking-request/".concat(f),
                            className: "w-full",
                            onClick: (e) => e.stopPropagation(),
                            children: (0, t.jsxs)(n.z, {
                              size: "sm",
                              variant: "outline",
                              className:
                                "h-10 w-full rounded-md border border-white/80 bg-white/90 text-xs font-semibold text-neutral-900 shadow-md hover:bg-white dark:border-neutral-200 dark:bg-neutral-100 dark:text-neutral-900",
                              children: [
                                (0, t.jsx)(c.Z, { className: "mr-2 h-4 w-4" }),
                                "Book Now",
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                (0, t.jsxs)("div", {
                  className:
                    "flex flex-col gap-1 sm:gap-1.5 text-left px-3 sm:px-4",
                  children: [
                    (0, t.jsx)(i.default, {
                      href: "/talent/".concat(f),
                      className:
                        "text-base font-semibold text-neutral-900 dark:text-white",
                      children: x || "Speaker Name",
                    }),
                    (0, t.jsx)("div", {
                      className: "h-0.5 w-10 rounded-full",
                      style: { backgroundColor: "#EBAC2B" },
                    }),
                    v &&
                      (0, t.jsx)("p", {
                        className:
                          "text-[0.72rem] sm:text-[0.8rem] leading-snug font-semibold text-[#EBAC2B] dark:text-primary-300",
                        children: v,
                      }),
                    !v &&
                      k &&
                      (0, t.jsx)("p", {
                        className:
                          "text-[0.72rem] sm:text-[0.8rem] leading-snug font-semibold text-[#EBAC2B] dark:text-primary-300",
                        children: k,
                      }),
                    N.length > 0 &&
                      (0, t.jsx)("ul", {
                        className:
                          "mt-0.5 sm:mt-1 space-y-0.5 list-disc pl-4 marker:text-primary-500 text-[0.64rem] sm:text-[0.85rem] text-neutral-700 dark:text-neutral-200 leading-tight sm:leading-snug",
                        children: N.map((e, a) =>
                          (0, t.jsx)(
                            "li",
                            {
                              className: "leading-snug",
                              children: (0, t.jsx)(i.default, {
                                href: "/category/".concat(y(e || "")),
                                className:
                                  "transition-colors hover:text-primary-600 dark:hover:text-primary-300",
                                children: e,
                              }),
                            },
                            "".concat(e, "-").concat(a),
                          ),
                        ),
                      }),
                  ],
                }),
                (0, t.jsx)("div", {
                  className:
                    "mt-auto flex flex-col items-start gap-1 px-4 pb-4",
                  children: (0, t.jsxs)("div", {
                    className:
                      "inline-flex items-center gap-2 text-[0.72rem] sm:text-[0.78rem] text-neutral-700 dark:text-neutral-300",
                    children: [
                      (0, t.jsx)("span", {
                        className: "h-1.5 w-1.5 rounded-full",
                        style: { backgroundColor: "#EBAC2B" },
                      }),
                      (0, t.jsxs)("span", {
                        children: [
                          "Fee: ",
                          (null === (m = h.feeRange) || void 0 === m
                            ? void 0
                            : m.label) || "Contact for Details",
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            });
          return u
            ? (0, t.jsx)(i.default, {
                href: "/talent/".concat(f),
                className: j,
                children: S,
              })
            : (0, t.jsx)("article", { className: j, children: S });
        },
        h = s(6902),
        p = s(9600);
      let u = (0, s(166).default)(
        () =>
          Promise.all([s.e(1317), s.e(8556), s.e(6769)]).then(s.bind(s, 8556)),
        { loadableGenerated: { webpack: () => [8556] }, ssr: !1 },
      );
      var g = function () {
        var e;
        let { initialSpeakers: a } =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          { speakers: s, loading: r, error: i } = (0, p.LG)(void 0, a),
          [n, l] = (0, o.useState)(!1),
          [d, c] = (0, o.useState)(null),
          g = (e) => {
            (console.log("Book speaker:", e.name), c(e), l(!0));
          };
        return r
          ? (0, t.jsx)("div", {
              className:
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12 lg:py-16",
              children: [...Array(6)].map((e, a) =>
                (0, t.jsxs)(
                  "div",
                  {
                    className:
                      "animate-pulse bg-gray-100 rounded-xl p-6 flex flex-col gap-4",
                    children: [
                      (0, t.jsx)("div", {
                        className: "h-40 bg-gray-300 rounded-lg mb-4",
                      }),
                      (0, t.jsx)("div", {
                        className: "h-6 bg-gray-300 rounded w-2/3 mb-2",
                      }),
                      (0, t.jsx)("div", {
                        className: "h-4 bg-gray-200 rounded w-1/2 mb-2",
                      }),
                      (0, t.jsx)("div", {
                        className: "h-4 bg-gray-200 rounded w-1/3",
                      }),
                      (0, t.jsxs)("div", {
                        className: "flex gap-2 mt-4",
                        children: [
                          (0, t.jsx)("div", {
                            className: "h-10 w-24 bg-gray-300 rounded",
                          }),
                          (0, t.jsx)("div", {
                            className: "h-10 w-10 bg-gray-200 rounded",
                          }),
                        ],
                      }),
                    ],
                  },
                  a,
                ),
              ),
            })
          : i
            ? (0, t.jsx)("div", { children: "Error loading featured speakers" })
            : (0, t.jsxs)("div", {
                className:
                  "py-6 md:py-10 bg-background text-foreground transition-colors duration-300",
                children: [
                  (0, t.jsx)(u, {
                    speakerId: (null == d ? void 0 : d.id) || "",
                    speakerName:
                      (null == d ? void 0 : d.name) ||
                      (null == d ? void 0 : d.firstName) +
                        " " +
                        (null == d ? void 0 : d.lastName) ||
                      "",
                    speakerImage:
                      (null == d ? void 0 : d.image) ||
                      (null == d ? void 0 : d.headshotUrl) ||
                      "",
                    feeRange:
                      (null == d
                        ? void 0
                        : null === (e = d.feeRange) || void 0 === e
                          ? void 0
                          : e.label) || "",
                    isOpen: n,
                    onClose: () => l(!1),
                  }),
                  (0, t.jsx)("div", {
                    className: "container-custom",
                    children: (0, t.jsxs)("div", {
                      className:
                        "relative overflow-hidden rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-50 via-yellow-50/80 to-orange-50/60 px-5 py-6 md:px-8 md:py-8 shadow-[0_0_30px_rgba(235,172,43,0.1)] dark:border-amber-400/20 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-neutral-950 dark:shadow-[0_0_30px_rgba(235,172,43,0.08)]",
                      children: [
                        (0, t.jsx)("div", {
                          className:
                            "pointer-events-none absolute -left-10 top-8 h-48 w-48 rounded-full bg-amber-300/25 blur-[120px] dark:bg-amber-400/15",
                        }),
                        (0, t.jsx)("div", {
                          className:
                            "pointer-events-none absolute -right-16 -bottom-20 h-72 w-72 rounded-full bg-amber-200/20 blur-[140px] dark:bg-amber-500/15",
                        }),
                        (0, t.jsx)("header", {
                          className:
                            "flex flex-col lg:flex-row lg:items-center lg:justify-between mb-0",
                          children: (0, t.jsxs)("div", {
                            className: "text-left mb-0",
                            children: [
                              (0, t.jsx)("h2", {
                                className:
                                  "text-[2rem] font-bold leading-tight tracking-tight mb-2 dark:text-white text-[#EBAC2B]",
                                children: (0, t.jsx)("span", {
                                  className: "dark:text-primary-400",
                                  children:
                                    "Your Guide to the World’s Greatest Speakers",
                                }),
                              }),
                              (0, t.jsx)("h3", {
                                className:
                                  "text-[1rem] font-medium text-neutral-700 dark:text-neutral-300",
                                children:
                                  "For over 25 years, Speaker Booking Agency has helped craft thousands of successful events and helped organizations find the right voices for their audiences. Our speaker network includes thought leaders, authors, celebrities, and business experts who elevate any occasion. ",
                              }),
                            ],
                          }),
                        }),
                        (0, t.jsx)("div", {
                          className: "relative block sm:hidden",
                          children: (0, t.jsxs)(h.lr, {
                            opts: { align: "start", loop: !0 },
                            children: [
                              (0, t.jsx)(h.KI, {
                                className: "py-6 px-4",
                                children:
                                  null == s
                                    ? void 0
                                    : s.map((e, a) =>
                                        (0, t.jsx)(
                                          h.d$,
                                          {
                                            className: "basis-1/2 pl-4 pt-4",
                                            children: (0, t.jsx)(m, {
                                              speaker: e,
                                              onBookClick: g,
                                            }),
                                          },
                                          "mobile-speaker-".concat(a),
                                        ),
                                      ),
                              }),
                              (0, t.jsx)("div", {
                                className:
                                  "flex items-center justify-center gap-2 pb-4",
                                children:
                                  null == s
                                    ? void 0
                                    : s.map((e, a) =>
                                        (0, t.jsx)(
                                          "div",
                                          {
                                            className:
                                              "h-2 w-2 rounded-full bg-neutral-300",
                                          },
                                          a,
                                        ),
                                      ),
                              }),
                            ],
                          }),
                        }),
                        (0, t.jsx)("div", {
                          className: "relative hidden sm:block",
                          children: (0, t.jsxs)(h.lr, {
                            opts: { align: "start", loop: !0 },
                            children: [
                              (0, t.jsx)(h.KI, {
                                className: "py-6 sm:py-8 px-3 sm:px-4",
                                children:
                                  null == s
                                    ? void 0
                                    : s.map((e) =>
                                        (0, t.jsx)(
                                          h.d$,
                                          {
                                            className:
                                              "basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4 pr-2 pt-6",
                                            children: (0, t.jsx)(m, {
                                              speaker: e,
                                              onBookClick: g,
                                            }),
                                          },
                                          e.id,
                                        ),
                                      ),
                              }),
                              (0, t.jsx)(h.am, {
                                className:
                                  "flex left-2 sm:left-4 md:-left-6 lg:-left-10 top-[46%] bg-card text-foreground border-border shadow-soft dark:bg-[#161616] dark:text-white dark:border-[#2c2c2c]",
                              }),
                              (0, t.jsx)(h.Pz, {
                                className:
                                  "flex right-2 sm:right-4 md:-right-6 lg:-right-10 top-[46%] bg-card text-foreground border-border shadow-soft dark:bg-[#161616] dark:text-white dark:border-[#2c2c2c]",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              });
      };
    },
    2101: function (e, a, s) {
      "use strict";
      s.d(a, {
        default: function () {
          return x;
        },
      });
      var t = s(7437),
        r = s(29),
        i = s.n(r),
        o = s(2265),
        n = s(3145),
        l = s(7648),
        d = s(166),
        c = s(3247),
        m = s(407),
        h = s(3041);
      let p = (0, d.default)(
          () =>
            Promise.all([
              s.e(7514),
              s.e(9027),
              s.e(9784),
              s.e(3358),
              s.e(1411),
            ]).then(s.bind(s, 3358)),
          { loadableGenerated: { webpack: () => [3358] }, ssr: !1 },
        ),
        u = () => {
          let [e, a] = (0, o.useState)(!1);
          return (0, t.jsxs)(t.Fragment, {
            children: [
              (0, t.jsxs)("button", {
                onClick: () => a(!0),
                className:
                  "group flex w-full items-center rounded-xl bg-white p-1.5 shadow-lg transition-all hover:shadow-xl lg:rounded-2xl lg:p-2",
                children: [
                  (0, t.jsxs)("div", {
                    className: "flex flex-1 items-center gap-3 px-3",
                    children: [
                      (0, t.jsx)(c.Z, {
                        className:
                          "h-4 w-4 shrink-0 text-neutral-400 lg:h-5 lg:w-5",
                      }),
                      (0, t.jsx)("span", {
                        className:
                          "truncate text-left text-sm text-neutral-500",
                        children:
                          "Search by name, topic, sport, or expertise...",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className:
                      "shrink-0 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors group-hover:bg-primary-600",
                    children: "SEARCH",
                  }),
                ],
              }),
              e && (0, t.jsx)(p, { isOpen: e, onClose: () => a(!1) }),
            ],
          });
        },
        g = (0, d.default)(
          () =>
            Promise.all([
              s.e(7514),
              s.e(9027),
              s.e(9784),
              s.e(3358),
              s.e(1411),
            ]).then(s.bind(s, 3358)),
          { loadableGenerated: { webpack: () => [3358] }, ssr: !1 },
        );
      var x = () => {
        let [e, a] = (0, o.useState)(0),
          [s, r] = (0, o.useState)(!1),
          d = [
            {
              id: 1,
              images: [
                "/_next/Charlie_Hunnam_(53619946303).jpg",
                "/_next/Kacey-Musgraves-grammy-feb-2025-a-billboard-1548.jpg",
                "/_next/avJFARzEPaB24rKQUYLinGQqilL.jpg",
                "/_next/WhatsApp%20Image%202026-03-17%20at%202.58.38%20PM.jpeg",
              ],
            },
            {
              id: 2,
              images: [
                "/_next/Kacey-Musgraves-grammy-feb-2025-a-billboard-1548.jpg",
                "/_next/avJFARzEPaB24rKQUYLinGQqilL.jpg",
                "/_next/WhatsApp%20Image%202026-03-17%20at%202.58.38%20PM.jpeg",
                "/_next/Charlie_Hunnam_(53619946303).jpg",
              ],
            },
            {
              id: 3,
              images: [
                "/_next/avJFARzEPaB24rKQUYLinGQqilL.jpg",
                "/_next/WhatsApp%20Image%202026-03-17%20at%202.58.38%20PM.jpeg",
                "/_next/Charlie_Hunnam_(53619946303).jpg",
                "/_next/Kacey-Musgraves-grammy-feb-2025-a-billboard-1548.jpg",
              ],
            },
          ];
        return (
          (0, o.useEffect)(() => {
            let e = setInterval(() => {
              a((e) => (e + 1) % d.length);
            }, 8e3);
            return () => clearInterval(e);
          }, []),
          (0, t.jsxs)("section", {
            className: "bg-neutral-900 dark:bg-neutral-950",
            children: [
              (0, t.jsxs)("div", {
                className: "lg:hidden relative",
                children: [
                  (0, t.jsxs)("div", {
                    className: "relative w-full",
                    children: [
                      (0, t.jsx)(n.default, {
                        src: "/_next/Charlie_Hunnam_(53619946303).jpg",
                        alt: "World-class speakers ready to inspire your audience",
                        width: 750,
                        height: 500,
                        sizes: "100vw",
                        priority: !0,
                        quality: 95,
                        className: "w-full h-auto object-contain",
                        unoptimized: !0,
                      }),
                      (0, t.jsx)("div", {
                        className:
                          "absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-neutral-900 via-neutral-900/90 to-transparent z-[1]",
                      }),
                      (0, t.jsx)("div", {
                        className:
                          "absolute top-1 inset-x-0 z-10 text-center px-4",
                        children: (0, t.jsxs)("h1", {
                          className:
                            "text-2xl font-bold text-white leading-snug drop-shadow-lg",
                          children: [
                            "Find Your ",
                            (0, t.jsx)("span", {
                              className: "text-[#EBAC2B]",
                              children: "Perfect Speaker",
                            }),
                          ],
                        }),
                      }),
                      (0, t.jsx)("div", {
                        className: "absolute bottom-0 inset-x-0 z-10 px-5 pb-1",
                        children: (0, t.jsx)("p", {
                          className:
                            "text-sm text-white/80 text-center uppercase tracking-wide",
                          children:
                            "Book world-class speakers for your next event",
                        }),
                      }),
                    ],
                  }),
                  (0, t.jsxs)("div", {
                    className: "px-5 pb-5 pt-3 space-y-2.5",
                    children: [
                      (0, t.jsxs)("button", {
                        onClick: () => r(!0),
                        className:
                          "w-full flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3",
                        children: [
                          (0, t.jsx)(c.Z, {
                            className:
                              "w-4 h-4 text-white/50 mr-3 flex-shrink-0",
                          }),
                          (0, t.jsx)("span", {
                            className: "text-white/50 text-sm flex-1 text-left",
                            children: "Search speakers...",
                          }),
                        ],
                      }),
                      (0, t.jsxs)(l.default, {
                        href: "/talent",
                        className:
                          "w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-colors",
                        style: { backgroundColor: "#EBAC2B", color: "#111" },
                        children: [
                          "Browse All Speakers",
                          (0, t.jsx)(m.Z, { className: "w-4 h-4" }),
                        ],
                      }),
                      (0, t.jsxs)("a", {
                        href: "tel:+44-7351-271379",
                        className:
                          "w-full flex items-center justify-center gap-2 border border-[#EBAC2B]/60 text-[#EBAC2B] font-semibold rounded-xl py-3 text-sm transition-colors hover:bg-[#EBAC2B]/10",
                        children: [
                          (0, t.jsx)(h.Z, { className: "w-4 h-4" }),
                          "Call +44 7351271379",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, t.jsxs)("div", {
                className:
                  "jsx-a5e2b4c6fe05409c hidden lg:block relative min-h-[600px] h-[78vh] max-h-[820px] overflow-hidden",
                children: [
                  (0, t.jsxs)("div", {
                    className: "jsx-a5e2b4c6fe05409c absolute inset-0",
                    children: [
                      (0, t.jsx)("div", {
                        className:
                          "jsx-a5e2b4c6fe05409c relative w-full h-full",
                        children: d.map((a, s) =>
                          (0, t.jsx)(
                            "div",
                            {
                              className:
                                "jsx-a5e2b4c6fe05409c " +
                                "absolute inset-0 transition-all duration-1000 ease-in-out ".concat(
                                  s === e
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-105",
                                ),
                              children: (0, t.jsx)("div", {
                                className:
                                  "jsx-a5e2b4c6fe05409c grid grid-cols-4 h-full",
                                children: a.images.map((a, r) =>
                                  (0, t.jsx)(
                                    "div",
                                    {
                                      style: {
                                        animationDelay: "".concat(0.2 * r, "s"),
                                      },
                                      className:
                                        "jsx-a5e2b4c6fe05409c relative overflow-hidden",
                                      children: (0, t.jsx)("div", {
                                        className:
                                          "jsx-a5e2b4c6fe05409c " +
                                          "h-full transition-all duration-[2000ms] ease-in-out ".concat(
                                            s === e
                                              ? r % 2 == 0
                                                ? "animate-slide-down"
                                                : "animate-slide-up"
                                              : "translate-y-full opacity-0",
                                          ),
                                        children: (0, t.jsx)(n.default, {
                                          src: a,
                                          alt: "Speaker ".concat(r + 1),
                                          fill: !0,
                                          sizes: "25vw",
                                          quality: 95,
                                          priority: 0 === s,
                                          className: "object-cover",
                                          unoptimized: !0,
                                        }),
                                      }),
                                    },
                                    r,
                                  ),
                                ),
                              }),
                            },
                            a.id,
                          ),
                        ),
                      }),
                      (0, t.jsx)("div", {
                        className:
                          "jsx-a5e2b4c6fe05409c absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.10)_100%)] z-10",
                      }),
                      (0, t.jsx)("div", {
                        className:
                          "jsx-a5e2b4c6fe05409c absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent z-10",
                      }),
                    ],
                  }),
                  (0, t.jsx)("div", {
                    className:
                      "jsx-a5e2b4c6fe05409c absolute inset-x-0 bottom-0 z-20 pb-10",
                    children: (0, t.jsxs)("div", {
                      className:
                        "jsx-a5e2b4c6fe05409c max-w-3xl mx-auto text-center px-8",
                      children: [
                        (0, t.jsxs)("div", {
                          className:
                            "jsx-a5e2b4c6fe05409c flex items-center justify-center gap-3 mb-5",
                          children: [
                            (0, t.jsx)("div", {
                              className:
                                "jsx-a5e2b4c6fe05409c h-px w-8 bg-[#EBAC2B]/60",
                            }),
                            (0, t.jsx)("span", {
                              className:
                                "jsx-a5e2b4c6fe05409c text-[#EBAC2B] text-xs font-semibold tracking-[0.2em] uppercase",
                              children: "Speaker Booking Agency",
                            }),
                            (0, t.jsx)("div", {
                              className:
                                "jsx-a5e2b4c6fe05409c h-px w-8 bg-[#EBAC2B]/60",
                            }),
                          ],
                        }),
                        (0, t.jsx)("h1", {
                          className:
                            "jsx-a5e2b4c6fe05409c text-5xl xl:text-6xl font-extrabold text-white mb-4 leading-[1.08] tracking-tight",
                          children: "Book a Keynote Speaker",
                        }),
                        (0, t.jsx)("p", {
                          className:
                            "jsx-a5e2b4c6fe05409c text-lg text-white/70 mb-8 max-w-xl mx-auto leading-relaxed font-light",
                          children:
                            "Book world-class speakers for corporate events, conferences & galas",
                        }),
                        (0, t.jsx)("div", {
                          className:
                            "jsx-a5e2b4c6fe05409c max-w-xl mx-auto mb-6",
                          children: (0, t.jsx)(u, {}),
                        }),
                        (0, t.jsxs)("div", {
                          className:
                            "jsx-a5e2b4c6fe05409c flex items-center justify-center gap-2 text-white/50 text-sm",
                          children: [
                            (0, t.jsx)(h.Z, {
                              className: "w-4 h-4 text-[#EBAC2B]",
                            }),
                            (0, t.jsx)("a", {
                              href: "tel:+44-7351-271379",
                              className:
                                "jsx-a5e2b4c6fe05409c hover:text-white/80 transition-colors",
                              children: "+44 7351271379",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, t.jsx)("div", {
                    className:
                      "jsx-a5e2b4c6fe05409c absolute top-6 right-6 z-20 flex items-center gap-1.5",
                    children: d.map((s, r) =>
                      (0, t.jsx)(
                        "button",
                        {
                          onClick: () => a(r),
                          className:
                            "jsx-a5e2b4c6fe05409c " +
                            "rounded-full transition-all duration-500 ".concat(
                              r === e
                                ? "bg-[#EBAC2B] w-6 h-1.5"
                                : "bg-white/30 hover:bg-white/60 w-1.5 h-1.5",
                            ),
                        },
                        r,
                      ),
                    ),
                  }),
                  (0, t.jsx)(i(), {
                    id: "a5e2b4c6fe05409c",
                    children:
                      "@-webkit-keyframes slide-down{0%{-webkit-transform:translatey(-100%);transform:translatey(-100%);opacity:0}100%{-webkit-transform:translatey(0);transform:translatey(0);opacity:1}}@-moz-keyframes slide-down{0%{-moz-transform:translatey(-100%);transform:translatey(-100%);opacity:0}100%{-moz-transform:translatey(0);transform:translatey(0);opacity:1}}@-o-keyframes slide-down{0%{-o-transform:translatey(-100%);transform:translatey(-100%);opacity:0}100%{-o-transform:translatey(0);transform:translatey(0);opacity:1}}@keyframes slide-down{0%{-webkit-transform:translatey(-100%);-moz-transform:translatey(-100%);-o-transform:translatey(-100%);transform:translatey(-100%);opacity:0}100%{-webkit-transform:translatey(0);-moz-transform:translatey(0);-o-transform:translatey(0);transform:translatey(0);opacity:1}}@-webkit-keyframes slide-up{0%{-webkit-transform:translatey(100%);transform:translatey(100%);opacity:0}100%{-webkit-transform:translatey(0);transform:translatey(0);opacity:1}}@-moz-keyframes slide-up{0%{-moz-transform:translatey(100%);transform:translatey(100%);opacity:0}100%{-moz-transform:translatey(0);transform:translatey(0);opacity:1}}@-o-keyframes slide-up{0%{-o-transform:translatey(100%);transform:translatey(100%);opacity:0}100%{-o-transform:translatey(0);transform:translatey(0);opacity:1}}@keyframes slide-up{0%{-webkit-transform:translatey(100%);-moz-transform:translatey(100%);-o-transform:translatey(100%);transform:translatey(100%);opacity:0}100%{-webkit-transform:translatey(0);-moz-transform:translatey(0);-o-transform:translatey(0);transform:translatey(0);opacity:1}}.animate-slide-down.jsx-a5e2b4c6fe05409c{-webkit-animation:slide-down 2s ease-out forwards;-moz-animation:slide-down 2s ease-out forwards;-o-animation:slide-down 2s ease-out forwards;animation:slide-down 2s ease-out forwards}.animate-slide-up.jsx-a5e2b4c6fe05409c{-webkit-animation:slide-up 2s ease-out forwards;-moz-animation:slide-up 2s ease-out forwards;-o-animation:slide-up 2s ease-out forwards;animation:slide-up 2s ease-out forwards}",
                  }),
                ],
              }),
              (0, t.jsx)(g, { isOpen: s, onClose: () => r(!1) }),
            ],
          })
        );
      };
    },
    6902: function (e, a, s) {
      "use strict";
      s.d(a, {
        A0: function () {
          return f;
        },
        KI: function () {
          return p;
        },
        Pz: function () {
          return x;
        },
        am: function () {
          return g;
        },
        d$: function () {
          return u;
        },
        lr: function () {
          return h;
        },
      });
      var t = s(7437),
        r = s(2265),
        i = s(9467),
        o = s(2660),
        n = s(6858),
        l = s(4508),
        d = s(2869);
      let c = r.createContext(null);
      function m() {
        let e = r.useContext(c);
        if (!e) throw Error("useCarousel must be used within a <Carousel />");
        return e;
      }
      let h = r.forwardRef((e, a) => {
        let {
            orientation: s = "horizontal",
            opts: o,
            setApi: n,
            plugins: d,
            className: m,
            children: h,
            ...p
          } = e,
          [u, g] = (0, i.Z)({ ...o, axis: "horizontal" === s ? "x" : "y" }, d),
          [x, f] = r.useState(!1),
          [b, v] = r.useState(!1),
          k = r.useCallback((e) => {
            e && (f(e.canScrollPrev()), v(e.canScrollNext()));
          }, []),
          w = r.useCallback(() => {
            null == g || g.scrollPrev();
          }, [g]),
          y = r.useCallback(() => {
            null == g || g.scrollNext();
          }, [g]),
          N = r.useCallback(
            (e) => {
              "ArrowLeft" === e.key
                ? (e.preventDefault(), w())
                : "ArrowRight" === e.key && (e.preventDefault(), y());
            },
            [w, y],
          );
        return (
          r.useEffect(() => {
            g && n && n(g);
          }, [g, n]),
          r.useEffect(() => {
            if (g)
              return (
                k(g),
                g.on("reInit", k),
                g.on("select", k),
                () => {
                  null == g || g.off("select", k);
                }
              );
          }, [g, k]),
          (0, t.jsx)(c.Provider, {
            value: {
              carouselRef: u,
              api: g,
              opts: o,
              orientation:
                s ||
                ((null == o ? void 0 : o.axis) === "y"
                  ? "vertical"
                  : "horizontal"),
              scrollPrev: w,
              scrollNext: y,
              canScrollPrev: x,
              canScrollNext: b,
            },
            children: (0, t.jsx)("div", {
              ref: a,
              onKeyDownCapture: N,
              className: (0, l.cn)("relative", m),
              role: "region",
              "aria-roledescription": "carousel",
              ...p,
              children: h,
            }),
          })
        );
      });
      h.displayName = "Carousel";
      let p = r.forwardRef((e, a) => {
        let { className: s, ...r } = e,
          { carouselRef: i, orientation: o } = m();
        return (0, t.jsx)("div", {
          ref: i,
          className: "overflow-hidden",
          children: (0, t.jsx)("div", {
            ref: a,
            className: (0, l.cn)(
              "flex",
              "horizontal" === o ? "-ml-4" : "-mt-4 flex-col",
              s,
            ),
            ...r,
          }),
        });
      });
      p.displayName = "CarouselContent";
      let u = r.forwardRef((e, a) => {
        let { className: s, ...r } = e,
          { orientation: i } = m();
        return (0, t.jsx)("div", {
          ref: a,
          role: "group",
          "aria-roledescription": "slide",
          className: (0, l.cn)(
            "min-w-0 shrink-0 grow-0 basis-full",
            "horizontal" === i ? "pl-4" : "pt-4",
            s,
          ),
          ...r,
        });
      });
      u.displayName = "CarouselItem";
      let g = r.forwardRef((e, a) => {
        let {
            className: s,
            variant: r = "outline",
            size: i = "icon",
            ...n
          } = e,
          { orientation: c, scrollPrev: h, canScrollPrev: p } = m();
        return (0, t.jsxs)(d.z, {
          ref: a,
          variant: r,
          size: i,
          className: (0, l.cn)(
            "absolute  h-8 w-8 rounded-full",
            "horizontal" === c
              ? "-left-12 top-1/2 -translate-y-1/2"
              : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
            s,
          ),
          disabled: !p,
          onClick: h,
          ...n,
          children: [
            (0, t.jsx)(o.Z, { className: "h-4 w-4" }),
            (0, t.jsx)("span", {
              className: "sr-only",
              children: "Previous slide",
            }),
          ],
        });
      });
      g.displayName = "CarouselPrevious";
      let x = r.forwardRef((e, a) => {
        let {
            className: s,
            variant: r = "outline",
            size: i = "icon",
            ...o
          } = e,
          { orientation: c, scrollNext: h, canScrollNext: p } = m();
        return (0, t.jsxs)(d.z, {
          ref: a,
          variant: r,
          size: i,
          className: (0, l.cn)(
            "absolute h-8 w-8 rounded-full",
            "horizontal" === c
              ? "-right-12 top-1/2 -translate-y-1/2"
              : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
            s,
          ),
          disabled: !p,
          onClick: h,
          ...o,
          children: [
            (0, t.jsx)(n.Z, { className: "h-4 w-4" }),
            (0, t.jsx)("span", {
              className: "sr-only",
              children: "Next slide",
            }),
          ],
        });
      });
      x.displayName = "CarouselNext";
      let f = r.forwardRef((e, a) => {
        let { className: s, ...i } = e,
          { api: o } = m(),
          [n, d] = r.useState(0),
          [c, h] = r.useState([]);
        return (r.useEffect(() => {
          if (!o) return;
          (h(o.scrollSnapList()), d(o.selectedScrollSnap()));
          let e = () => d(o.selectedScrollSnap());
          return (
            o.on("select", e),
            o.on("reInit", () => {
              (h(o.scrollSnapList()), e());
            }),
            () => {
              o.off("select", e);
            }
          );
        }, [o]),
        c.length <= 1)
          ? null
          : (0, t.jsx)("div", {
              ref: a,
              className: (0, l.cn)(
                "flex justify-center gap-1.5 pt-3 md:hidden",
                s,
              ),
              ...i,
              children: c.map((e, a) =>
                (0, t.jsx)(
                  "button",
                  {
                    type: "button",
                    className: (0, l.cn)(
                      "h-1.5 rounded-full transition-all duration-200",
                      a === n
                        ? "w-4 bg-[#EBAC2B]"
                        : "w-1.5 bg-gray-300 hover:bg-gray-400",
                    ),
                    onClick: () => (null == o ? void 0 : o.scrollTo(a)),
                    "aria-label": "Go to slide ".concat(a + 1),
                  },
                  a,
                ),
              ),
            });
      });
      f.displayName = "CarouselDots";
    },
    2451: function (e, a, s) {
      "use strict";
      s.d(a, {
        Z: function () {
          return t;
        },
      });
      let t = (0, s(9205).Z)("ChevronLeft", [
        ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }],
      ]);
    },
    407: function (e, a, s) {
      "use strict";
      s.d(a, {
        Z: function () {
          return t;
        },
      });
      let t = (0, s(9205).Z)("ChevronRight", [
        ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
      ]);
    },
    2135: function (e, a, s) {
      "use strict";
      s.d(a, {
        Z: function () {
          return t;
        },
      });
      let t = (0, s(9205).Z)("ChevronUp", [
        ["path", { d: "m18 15-6-6-6 6", key: "153udz" }],
      ]);
    },
    2208: function (e, a, s) {
      "use strict";
      s.d(a, {
        Z: function () {
          return t;
        },
      });
      let t = (0, s(9205).Z)("Eye", [
        [
          "path",
          {
            d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
            key: "1nclc0",
          },
        ],
        ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
      ]);
    },
    3247: function (e, a, s) {
      "use strict";
      s.d(a, {
        Z: function () {
          return t;
        },
      });
      let t = (0, s(9205).Z)("Search", [
        ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
        ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
      ]);
    },
  },
  function (e) {
    (e.O(
      0,
      [5878, 2972, 8590, 1089, 8869, 8416, 8773, 2971, 2117, 1744],
      function () {
        return e((e.s = 1581));
      },
    ),
      (_N_E = e.O()));
  },
]);
