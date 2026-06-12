"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [193],
  {
    193: function (e, a, l) {
      (l.r(a),
        l.d(a, {
          default: function () {
            return o;
          },
        }));
      var t = l(7437),
        s = l(2265),
        n = l(6902),
        r = l(319);
      let i = (e) => {
        var a, l, t, s, n;
        return {
          ...e,
          id:
            (null === (a = e.id) || void 0 === a ? void 0 : a.toString()) || "",
          name: e.name || "".concat(e.firstName, " ").concat(e.lastName),
          sport:
            e.sport ||
            (null === (s = e.categories) || void 0 === s
              ? void 0
              : null === (t = s[0]) || void 0 === t
                ? void 0
                : null === (l = t.category) || void 0 === l
                  ? void 0
                  : l.name) ||
            "Professional Speaker",
          image: e.image || e.headshotUrl || "/images/default-picture.svg",
          feeRange: e.feeRange || "Available Upon Request",
          location: e.location || "Available Nationwide",
          bio: e.bio || e.description,
          description: e.description,
          topics: e.topics || [],
          sections: e.sections || [],
          rating: e.rating || 5,
          bookings: e.bookings || 0,
          featured: e.featured || !1,
          trending: e.trending || !1,
          slug:
            e.slug ||
            "".concat(
              null === (n = e.name) || void 0 === n
                ? void 0
                : n.toLowerCase().replace(/\s+/g, "-"),
              "-speaker-booking",
            ),
        };
      };
      function o(e) {
        let { similarSpeakers: a, onShowConversionModal: l } = e,
          [, o] = (0, s.useState)(null);
        if (!(null == a ? void 0 : a.length)) return null;
        let d = (e) => {
          (o(null), l());
        };
        return (0, t.jsxs)("div", {
          className:
            "relative overflow-hidden bg-neutral-950 border-t border-white/5",
          children: [
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-amber-400/10 blur-[120px]",
            }),
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute -left-10 -bottom-16 h-80 w-80 rounded-full bg-amber-300/[0.08] blur-[150px]",
            }),
            (0, t.jsx)("div", {
              className:
                "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]",
            }),
            (0, t.jsx)("div", {
              className: "relative container-custom py-8 lg:py-12",
              children: (0, t.jsxs)("div", {
                className: "max-w-6xl mx-auto",
                children: [
                  (0, t.jsx)("h2", {
                    className: "text-xl lg:text-2xl font-bold text-white mb-6",
                    children: "Similar Speakers You Might Like",
                  }),
                  (0, t.jsxs)(n.lr, {
                    opts: {
                      align: "start",
                      containScroll: "trimSnaps",
                      loop: !0,
                    },
                    className: "relative",
                    children: [
                      (0, t.jsx)(n.KI, {
                        children: a.map((e, a) =>
                          (0, t.jsx)(
                            n.d$,
                            {
                              className: "basis-1/2 sm:basis-1/3 lg:basis-1/4",
                              children: (0, t.jsx)("div", {
                                className: "h-full",
                                children: (0, t.jsx)(r.Z, {
                                  speaker: i(e),
                                  index: a,
                                  variant: "default",
                                  onBookClick: d,
                                }),
                              }),
                            },
                            e.slug || e.id,
                          ),
                        ),
                      }),
                      (0, t.jsx)(n.A0, {}),
                      (0, t.jsx)(n.am, { className: "-left-6 hidden md:flex" }),
                      (0, t.jsx)(n.Pz, {
                        className: "-right-6 hidden md:flex",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
      }
    },
    319: function (e, a, l) {
      var t = l(7437),
        s = l(6070),
        n = l(2869),
        r = l(5974),
        i = l(2023),
        o = l(6595),
        d = l(5252),
        c = l(3774),
        u = l(6858),
        m = l(7648),
        x = l(3145),
        f = l(5922);
      a.Z = (e) => {
        var a, l, g, p, h, v;
        let {
            speaker: b,
            index: N = 0,
            showAnimation: j = !1,
            variant: w = "default",
            onBookClick: k,
          } = e,
          { theme: y } = (0, f.F)(),
          C = "dark" === y,
          R = C ? "#F9CC3D" : "#0a0a0a",
          S = C ? "#e8bd2f" : "#1a1a1a";
        b.name = b.name || "".concat(b.firstName, " ").concat(b.lastName);
        let L =
            b.slug ||
            b.firstName.toLowerCase().replace(/\s+/g, "-") + "-speaker-booking",
          Z = b.categories;
        ((b.image = b.image || b.headshotUrl || "/images/default-picture.svg"),
          (b.image = b.image.includes("blank")
            ? "/images/default-picture.svg"
            : b.image));
        let q = (null == b ? void 0 : b.image)
            ? b.image
            : "/images/default-picture.svg",
          F = "Available Upon Request";
        if (
          (null === (a = b.feeRange) || void 0 === a ? void 0 : a.min) !==
            void 0 &&
          (null === (l = b.feeRange) || void 0 === l ? void 0 : l.max) !==
            void 0 &&
          (null === (g = b.feeRange) || void 0 === g ? void 0 : g.min) !== 0 &&
          (null === (p = b.feeRange) || void 0 === p ? void 0 : p.max) !== 0
        ) {
          let e = b.feeRange.min.toLocaleString(),
            a = b.feeRange.max.toLocaleString();
          F = "$".concat(e, " - $").concat(a);
        } else
          (null === (h = b.feeRange) || void 0 === h ? void 0 : h.label) &&
            "$100K+" === (F = b.feeRange.label) &&
            (F = "$100,000 or more");
        F.toLowerCase().includes("request") ||
          F.toLowerCase().includes("contact") ||
          F.toLowerCase().includes("available");
        let A =
            "string" == typeof b.location &&
            b.location.toLowerCase().includes("available upon request")
              ? "On Request"
              : b.location || "On Request",
          z = (e) =>
            e
              ? e
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")
              : null,
          T = (Z && Z.length ? Z : b.topics || [])
            .map((e) => {
              var a, l, t;
              return {
                name:
                  "string" == typeof e
                    ? e
                    : null == e
                      ? void 0
                      : null === (a = e.category) || void 0 === a
                        ? void 0
                        : a.name,
                slug:
                  "string" == typeof e
                    ? z(e)
                    : (null == e
                        ? void 0
                        : null === (l = e.category) || void 0 === l
                          ? void 0
                          : l.slug) ||
                      z(
                        null == e
                          ? void 0
                          : null === (t = e.category) || void 0 === t
                            ? void 0
                            : t.name,
                      ),
              };
            })
            .filter((e) => e.name)
            .slice(0, 3);
        return (0, t.jsx)("article", {
          className: "h-full ".concat(j ? "animate-fade-in-up" : ""),
          style: j ? { animationDelay: "".concat(100 * N, "ms") } : void 0,
          children: (0, t.jsxs)(s.Zb, {
            className:
              "group relative h-full w-full max-w-[16rem] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium active:scale-[0.98] active:opacity-90 dark:shadow-none mx-0",
            children: [
              (b.featured || b.trending) &&
                (0, t.jsxs)("div", {
                  className: "absolute left-4 top-4 flex gap-2 z-10",
                  children: [
                    b.featured &&
                      (0, t.jsxs)(r.C, {
                        className:
                          "bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-semibold",
                        children: [
                          (0, t.jsx)(i.Z, { className: "h-3 w-3 mr-1" }),
                          "Featured",
                        ],
                      }),
                    b.trending &&
                      (0, t.jsxs)(r.C, {
                        className:
                          "bg-orange-100 text-orange-800 border border-orange-200 text-[11px] font-semibold",
                        children: [
                          (0, t.jsx)(o.Z, { className: "h-3 w-3 mr-1" }),
                          "Trending",
                        ],
                      }),
                  ],
                }),
              (0, t.jsxs)("div", {
                className: "flex h-full flex-col",
                children: [
                  (0, t.jsx)("div", {
                    className:
                      "relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800",
                    children: (0, t.jsx)(x.default, {
                      src: q,
                      alt: "".concat(
                        b.name,
                        " - Professional Speakers Booking",
                      ),
                      fill: !0,
                      sizes: "(min-width: 1024px) 280px, 100vw",
                      className:
                        "object-cover transition duration-200 group-hover:scale-105",
                      priority: N < 3,
                      quality: 95,
                    }),
                  }),
                  (0, t.jsxs)(s.aY, {
                    className:
                      "flex flex-1 flex-col gap-1.5 px-2.5 py-2.5 text-left",
                    children: [
                      (0, t.jsxs)("div", {
                        className: "space-y-0.5",
                        children: [
                          (0, t.jsx)(m.default, {
                            href: "/talent/".concat(L),
                            children: (0, t.jsx)("h3", {
                              className:
                                "text-base font-bold uppercase tracking-[0.04em] text-foreground dark:text-white",
                              children: b.name,
                            }),
                          }),
                          b.title &&
                            (0, t.jsx)("p", {
                              className:
                                "text-[13px] font-semibold text-neutral-700 dark:text-neutral-200 leading-snug line-clamp-2",
                              children: b.title,
                            }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        className:
                          "space-y-1 text-[11px] sm:text-[12px] text-neutral-700 dark:text-neutral-200 pt-1",
                        children: [
                          T.length > 0 &&
                            (0, t.jsx)("div", {
                              className:
                                "flex flex-wrap gap-1 text-[11px] text-primary-700 dark:text-primary-300 leading-tight",
                              children: T.map((e, a) =>
                                (0, t.jsxs)(
                                  "span",
                                  {
                                    children: [
                                      e.slug
                                        ? (0, t.jsx)(m.default, {
                                            href: "/category/".concat(e.slug),
                                            className: "hover:underline",
                                            children: e.name,
                                          })
                                        : e.name,
                                      a < T.length - 1 &&
                                        (0, t.jsx)("span", {
                                          className: "mx-1 text-neutral-400",
                                          children: "|",
                                        }),
                                    ],
                                  },
                                  e.name,
                                ),
                              ),
                            }),
                          (0, t.jsxs)("div", {
                            className: "flex items-center gap-1.5 sm:gap-2",
                            children: [
                              (0, t.jsx)(d.Z, {
                                className:
                                  "h-3.5 w-3.5 text-neutral-800 dark:text-neutral-100",
                              }),
                              (0, t.jsxs)("span", {
                                className: "font-semibold",
                                children: [
                                  (0, t.jsx)("span", {
                                    className: "hidden sm:inline",
                                    children: "Speaking Fee:",
                                  }),
                                  (0, t.jsx)("span", {
                                    className: "sm:hidden inline",
                                    children: "Fee:",
                                  }),
                                ],
                              }),
                              (0, t.jsx)("span", {
                                className:
                                  "underline text-primary-700 dark:text-primary-300",
                                children:
                                  (null === (v = b.feeRange) || void 0 === v
                                    ? void 0
                                    : v.label) || "Available Upon Request",
                              }),
                            ],
                          }),
                          A &&
                            (0, t.jsxs)("div", {
                              className: "flex items-center gap-1.5 sm:gap-2",
                              children: [
                                (0, t.jsx)(c.Z, {
                                  className:
                                    "h-3.5 w-3.5 text-neutral-800 dark:text-neutral-100",
                                }),
                                (0, t.jsxs)("span", {
                                  className: "font-semibold",
                                  children: [
                                    (0, t.jsx)("span", {
                                      className: "hidden sm:inline",
                                      children: "Travels From:",
                                    }),
                                    (0, t.jsx)("span", {
                                      className: "sm:hidden inline",
                                      children: "Travels:",
                                    }),
                                  ],
                                }),
                                (0, t.jsx)("span", {
                                  className:
                                    "text-neutral-700 dark:text-neutral-200",
                                  children: A,
                                }),
                              ],
                            }),
                        ],
                      }),
                      (0, t.jsxs)("div", {
                        className: "mt-auto flex flex-col gap-1.5 pt-1.5",
                        children: [
                          (0, t.jsx)(m.default, {
                            href: "/talent/".concat(b.slug || L),
                            className: "w-full",
                            children: (0, t.jsx)(n.z, {
                              variant: "outline",
                              className:
                                "w-full justify-center rounded-full text-sm font-semibold h-10 text-black bg-[#EBAC2B] hover:bg-primary-600",
                              children: "View Profile",
                            }),
                          }),
                          (0, t.jsxs)(n.z, {
                            className:
                              "w-full justify-center rounded-full font-semibold h-10",
                            style: {
                              backgroundColor: R,
                              color: C ? "#0F1A32" : "#ffffff",
                              boxShadow: C
                                ? "0 4px 12px rgba(249,204,61,0.25)"
                                : "0 4px 12px rgba(235,172,43,0.25)",
                            },
                            onMouseEnter: (e) =>
                              (e.currentTarget.style.backgroundColor = S),
                            onMouseLeave: (e) =>
                              (e.currentTarget.style.backgroundColor = R),
                            onClick: () => {
                              k && k(b);
                            },
                            children: [
                              "Book Now",
                              (0, t.jsx)(u.Z, { className: "ml-2 h-4 w-4" }),
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
        });
      };
    },
    6070: function (e, a, l) {
      l.d(a, {
        Zb: function () {
          return r;
        },
        aY: function () {
          return i;
        },
      });
      var t = l(7437),
        s = l(2265),
        n = l(4508);
      let r = s.forwardRef((e, a) => {
        let { className: l, ...s } = e;
        return (0, t.jsx)("div", {
          ref: a,
          className: (0, n.cn)(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            l,
          ),
          ...s,
        });
      });
      ((r.displayName = "Card"),
        (s.forwardRef((e, a) => {
          let { className: l, ...s } = e;
          return (0, t.jsx)("div", {
            ref: a,
            className: (0, n.cn)("flex flex-col space-y-1.5 p-6", l),
            ...s,
          });
        }).displayName = "CardHeader"),
        (s.forwardRef((e, a) => {
          let { className: l, ...s } = e;
          return (0, t.jsx)("h3", {
            ref: a,
            className: (0, n.cn)(
              "text-2xl font-semibold leading-none tracking-tight",
              l,
            ),
            ...s,
          });
        }).displayName = "CardTitle"),
        (s.forwardRef((e, a) => {
          let { className: l, ...s } = e;
          return (0, t.jsx)("p", {
            ref: a,
            className: (0, n.cn)("text-sm text-muted-foreground", l),
            ...s,
          });
        }).displayName = "CardDescription"));
      let i = s.forwardRef((e, a) => {
        let { className: l, ...s } = e;
        return (0, t.jsx)("div", {
          ref: a,
          className: (0, n.cn)("p-6 pt-0", l),
          ...s,
        });
      });
      ((i.displayName = "CardContent"),
        (s.forwardRef((e, a) => {
          let { className: l, ...s } = e;
          return (0, t.jsx)("div", {
            ref: a,
            className: (0, n.cn)("flex items-center p-6 pt-0", l),
            ...s,
          });
        }).displayName = "CardFooter"));
    },
    6595: function (e, a, l) {
      l.d(a, {
        Z: function () {
          return t;
        },
      });
      let t = (0, l(9205).Z)("Star", [
        [
          "polygon",
          {
            points:
              "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
            key: "8f66p6",
          },
        ],
      ]);
    },
  },
]);
