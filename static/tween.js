/* eslint-disable no-undef */
// eslint-disable-next-line prettier/prettier
var TWEEN =
  TWEEN ||
  (function () {
    var n = [];
    return {
      getAll: function () {
        return n;
      },
      removeAll: function () {
        n = [];
      },
      add: function (t) {
        n.push(t);
      },
      remove: function (t) {
        var r = n.indexOf(t);
        -1 !== r && n.splice(r, 1);
      },
      update: function (t, r) {
        if (0 === n.length) return !1;
        var i = 0;
        for (t = void 0 !== t ? t : TWEEN.now(); i < n.length; )
          n[i].update(t) || r ? i++ : n.splice(i, 1);
        return !0;
      },
    };
  })();
!(function () {
  void 0 === this.window && void 0 !== this.process
    ? (TWEEN.now = function () {
        var n = process.hrtime();
        return 1e3 * n[0] + n[1] / 1e3;
      })
    : void 0 !== this.window &&
      void 0 !== window.performance &&
      void 0 !== window.performance.now
    ? (TWEEN.now = window.performance.now.bind(window.performance))
    : void 0 !== Date.now
    ? (TWEEN.now = Date.now)
    : (TWEEN.now = function () {
        return new Date().getTime();
      });
})(),
  (TWEEN.Tween = function (n) {
    var t = n,
      r = {},
      i = {},
      o = {},
      u = 1e3,
      e = 0,
      a = !1,
      f = !1,
      c = !1,
      s = 0,
      h = null,
      l = TWEEN.Easing.Linear.None,
      E = TWEEN.Interpolation.Linear,
      p = [],
      d = null,
      v = !1,
      w = null,
      I = null,
      M = null;
    for (var T in n) r[T] = parseFloat(n[T], 10);
    (this.to = function (n, t) {
      return void 0 !== t && (u = t), (i = n), this;
    }),
      (this.start = function (n) {
        TWEEN.add(this),
          (f = !0),
          (v = !1),
          (h = void 0 !== n ? n : TWEEN.now()),
          (h += s);
        for (var u in i) {
          if (i[u] instanceof Array) {
            if (0 === i[u].length) continue;
            i[u] = [t[u]].concat(i[u]);
          }
          void 0 !== r[u] &&
            ((r[u] = t[u]),
            r[u] instanceof Array == !1 && (r[u] *= 1),
            (o[u] = r[u] || 0));
        }
        return this;
      }),
      (this.stop = function () {
        return f
          ? (TWEEN.remove(this),
            (f = !1),
            null !== M && M.call(t),
            this.stopChainedTweens(),
            this)
          : this;
      }),
      (this.stopChainedTweens = function () {
        for (var n = 0, t = p.length; t > n; n++) p[n].stop();
      }),
      (this.delay = function (n) {
        return (s = n), this;
      }),
      (this.repeat = function (n) {
        return (e = n), this;
      }),
      (this.yoyo = function (n) {
        return (a = n), this;
      }),
      (this.easing = function (n) {
        return (l = n), this;
      }),
      (this.interpolation = function (n) {
        return (E = n), this;
      }),
      (this.chain = function () {
        return (p = arguments), this;
      }),
      (this.onStart = function (n) {
        return (d = n), this;
      }),
      (this.onUpdate = function (n) {
        return (w = n), this;
      }),
      (this.onComplete = function (n) {
        return (I = n), this;
      }),
      (this.onStop = function (n) {
        return (M = n), this;
      }),
      (this.update = function (n) {
        var f, M, T;
        if (h > n) return !0;
        v === !1 && (null !== d && d.call(t), (v = !0)),
          (M = (n - h) / u),
          (M = M > 1 ? 1 : M),
          (T = l(M));
        for (f in i)
          if (void 0 !== r[f]) {
            var N = r[f] || 0,
              W = i[f];
            W instanceof Array
              ? (t[f] = E(W, T))
              : ('string' == typeof W &&
                  (W =
                    '+' === W.charAt(0) || '-' === W.charAt(0)
                      ? N + parseFloat(W, 10)
                      : parseFloat(W, 10)),
                'number' == typeof W && (t[f] = N + (W - N) * T));
          }
        if ((null !== w && w.call(t, T), 1 === M)) {
          if (e > 0) {
            isFinite(e) && e--;
            for (f in o) {
              if (
                ('string' == typeof i[f] &&
                  (o[f] = o[f] + parseFloat(i[f], 10)),
                a)
              ) {
                var O = o[f];
                (o[f] = i[f]), (i[f] = O);
              }
              r[f] = o[f];
            }
            return a && (c = !c), (h = n + s), !0;
          }
          null !== I && I.call(t);
          for (var m = 0, g = p.length; g > m; m++) p[m].start(h + u);
          return !1;
        }
        return !0;
      });
  }),
  (TWEEN.Easing = {
    Linear: {
      None: function (n) {
        return n;
      },
    },
    Quadratic: {
      In: function (n) {
        return n * n;
      },
      Out: function (n) {
        return n * (2 - n);
      },
      InOut: function (n) {
        return (n *= 2) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1);
      },
    },
    Cubic: {
      In: function (n) {
        return n * n * n;
      },
      Out: function (n) {
        return --n * n * n + 1;
      },
      InOut: function (n) {
        return (n *= 2) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2);
      },
    },
    Quartic: {
      In: function (n) {
        return n * n * n * n;
      },
      Out: function (n) {
        return 1 - --n * n * n * n;
      },
      InOut: function (n) {
        return (n *= 2) < 1
          ? 0.5 * n * n * n * n
          : -0.5 * ((n -= 2) * n * n * n - 2);
      },
    },
    Quintic: {
      In: function (n) {
        return n * n * n * n * n;
      },
      Out: function (n) {
        return --n * n * n * n * n + 1;
      },
      InOut: function (n) {
        return (n *= 2) < 1
          ? 0.5 * n * n * n * n * n
          : 0.5 * ((n -= 2) * n * n * n * n + 2);
      },
    },
    Sinusoidal: {
      In: function (n) {
        return 1 - Math.cos((n * Math.PI) / 2);
      },
      Out: function (n) {
        return Math.sin((n * Math.PI) / 2);
      },
      InOut: function (n) {
        return 0.5 * (1 - Math.cos(Math.PI * n));
      },
    },
    Exponential: {
      In: function (n) {
        return 0 === n ? 0 : Math.pow(1024, n - 1);
      },
      Out: function (n) {
        return 1 === n ? 1 : 1 - Math.pow(2, -10 * n);
      },
      InOut: function (n) {
        return 0 === n
          ? 0
          : 1 === n
          ? 1
          : (n *= 2) < 1
          ? 0.5 * Math.pow(1024, n - 1)
          : 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
      },
    },
    Circular: {
      In: function (n) {
        return 1 - Math.sqrt(1 - n * n);
      },
      Out: function (n) {
        return Math.sqrt(1 - --n * n);
      },
      InOut: function (n) {
        return (n *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - n * n) - 1)
          : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
      },
    },
    Elastic: {
      In: function (n) {
        return 0 === n
          ? 0
          : 1 === n
          ? 1
          : -Math.pow(2, 10 * (n - 1)) * Math.sin(5 * (n - 1.1) * Math.PI);
      },
      Out: function (n) {
        return 0 === n
          ? 0
          : 1 === n
          ? 1
          : Math.pow(2, -10 * n) * Math.sin(5 * (n - 0.1) * Math.PI) + 1;
      },
      InOut: function (n) {
        return 0 === n
          ? 0
          : 1 === n
          ? 1
          : ((n *= 2),
            1 > n
              ? -0.5 *
                Math.pow(2, 10 * (n - 1)) *
                Math.sin(5 * (n - 1.1) * Math.PI)
              : 0.5 *
                  Math.pow(2, -10 * (n - 1)) *
                  Math.sin(5 * (n - 1.1) * Math.PI) +
                1);
      },
    },
    Back: {
      In: function (n) {
        var t = 1.70158;
        return n * n * ((t + 1) * n - t);
      },
      Out: function (n) {
        var t = 1.70158;
        return --n * n * ((t + 1) * n + t) + 1;
      },
      InOut: function (n) {
        var t = 2.5949095;
        return (n *= 2) < 1
          ? 0.5 * (n * n * ((t + 1) * n - t))
          : 0.5 * ((n -= 2) * n * ((t + 1) * n + t) + 2);
      },
    },
    Bounce: {
      In: function (n) {
        return 1 - TWEEN.Easing.Bounce.Out(1 - n);
      },
      Out: function (n) {
        return 1 / 2.75 > n
          ? 7.5625 * n * n
          : 2 / 2.75 > n
          ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75
          : 2.5 / 2.75 > n
          ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375
          : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
      },
      InOut: function (n) {
        return 0.5 > n
          ? 0.5 * TWEEN.Easing.Bounce.In(2 * n)
          : 0.5 * TWEEN.Easing.Bounce.Out(2 * n - 1) + 0.5;
      },
    },
  }),
  (TWEEN.Interpolation = {
    Linear: function (n, t) {
      var r = n.length - 1,
        i = r * t,
        o = Math.floor(i),
        u = TWEEN.Interpolation.Utils.Linear;
      return 0 > t
        ? u(n[0], n[1], i)
        : t > 1
        ? u(n[r], n[r - 1], r - i)
        : u(n[o], n[o + 1 > r ? r : o + 1], i - o);
    },
    Bezier: function (n, t) {
      for (
        var r = 0,
          i = n.length - 1,
          o = Math.pow,
          u = TWEEN.Interpolation.Utils.Bernstein,
          e = 0;
        i >= e;
        e++
      )
        r += o(1 - t, i - e) * o(t, e) * n[e] * u(i, e);
      return r;
    },
    CatmullRom: function (n, t) {
      var r = n.length - 1,
        i = r * t,
        o = Math.floor(i),
        u = TWEEN.Interpolation.Utils.CatmullRom;
      return n[0] === n[r]
        ? (0 > t && (o = Math.floor((i = r * (1 + t)))),
          u(n[(o - 1 + r) % r], n[o], n[(o + 1) % r], n[(o + 2) % r], i - o))
        : 0 > t
        ? n[0] - (u(n[0], n[0], n[1], n[1], -i) - n[0])
        : t > 1
        ? n[r] - (u(n[r], n[r], n[r - 1], n[r - 1], i - r) - n[r])
        : u(
            n[o ? o - 1 : 0],
            n[o],
            n[o + 1 > r ? r : o + 1],
            n[o + 2 > r ? r : o + 2],
            i - o
          );
    },
    Utils: {
      Linear: function (n, t, r) {
        return (t - n) * r + n;
      },
      Bernstein: function (n, t) {
        var r = TWEEN.Interpolation.Utils.Factorial;
        return r(n) / r(t) / r(n - t);
      },
      Factorial: (function () {
        var n = [1];
        return function (t) {
          var r = 1;
          if (n[t]) return n[t];
          for (var i = t; i > 1; i--) r *= i;
          return (n[t] = r), r;
        };
      })(),
      CatmullRom: function (n, t, r, i, o) {
        var u = 0.5 * (r - n),
          e = 0.5 * (i - t),
          a = o * o,
          f = o * a;
        return (
          (2 * t - 2 * r + u + e) * f +
          (-3 * t + 3 * r - 2 * u - e) * a +
          u * o +
          t
        );
      },
    },
  }),
  (function (n) {
    'function' == typeof define && define.amd
      ? define([], function () {
          return TWEEN;
        })
      : 'undefined' != typeof module && 'object' == typeof exports
      ? (module.exports = TWEEN)
      : void 0 !== n && (n.TWEEN = TWEEN);
  })(this);
//# sourceMappingURL=Tween.min.js.map
