var E = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var l = E((m, d) => {
  var w = function(r) {
    var e, t = [];
    return r instanceof RegExp ? e = r : e = p(r, t), {
      re: e,
      src: r.toString(),
      keys: t
    };
  }, p = function(r, e) {
    return r = r.concat("/?").replace(/\/\(/g, "(?:/").replace(
      /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g,
      function(t, o, u, s, c, a) {
        return t === "*" ? (e.push(void 0), t) : (e.push(s), o = o || "", "" + (a ? "" : o) + "(?:" + (a ? o : "") + (u || "") + (c || "([^/]+?)") + ")" + (a || ""));
      }
    ).replace(/([\/.])/g, "\\$1").replace(/\*/g, "(.*)"), new RegExp("^" + r + "$", "i");
  }, R = function(r, e, t) {
    for (var o, u = t || 0, s = r.length; u < s; ++u) {
      var c = r[u], a = c.re, x = c.keys, f = [], h = {};
      if (o = e.match(a)) {
        for (var n = 1, s = o.length; n < s; ++n) {
          var v = x[n - 1], g = typeof o[n] == "string" ? unescape(o[n]) : o[n];
          v ? h[v] = g : f.push(g);
        }
        return {
          params: h,
          splats: f,
          route: c.src,
          next: u + 1
        };
      }
    }
  }, i = function() {
    return {
      routes: [],
      routeMap: {},
      addRoute: function(r, e) {
        if (!r) throw new Error(" route requires a path");
        if (!e)
          throw new Error(" route " + r.toString() + " requires a callback");
        if (this.routeMap[r])
          throw new Error("path is already defined: " + r);
        var t = w(r);
        t.fn = e, this.routes.push(t), this.routeMap[r] = e;
      },
      removeRoute: function(r) {
        if (!r) throw new Error(" route requires a path");
        if (!this.routeMap[r])
          throw new Error("path does not exist: " + r);
        for (var e = [], t = 0; t < this.routes.length; t++) {
          var o = this.routes[t];
          o.src !== r && e.push(o);
        }
        this.routes = e, delete this.routeMap[r];
      },
      match: function(r, e) {
        var t = R(this.routes, r, e);
        return t && (t.fn = this.routeMap[t.route], t.next = this.match.bind(this, r, t.next)), t;
      }
    };
  };
  i.Route = w;
  i.pathToRegExp = p;
  i.match = R;
  i.Router = i;
  d.exports = i;
});
export default l();
//# sourceMappingURL=index.es.js.map
