function getImageType(e, t, n, r) {
    var i = "";
    if (e.naturalHeight != undefined) {
        e.naturalHeight * (t / e.naturalWidth) <= n ? i = "normal": i = "too-height",
        r(i);
        return
    }
    if (CX.browser.IE && parseInt(e.height) == 0) {
        var s = new Image;
        s.onload = function() {
            s.height <= n ? i = "normal": i = "too-height",
            r(i),
            s.parentNode.removeChild(s)
        },
        s.width = e.getAttribute("width") || t,
        s.style.cssText = "position:absolute;top:-9999em;left:-9999em;",
        document.body.appendChild(s),
        s.src = e.src + "?" + (new Date).getTime()
    } else e.getAttribute("width") || (e.width = t),
    e.height <= n ? i = "normal": i = "too-height",
    r(i)
}
function fixImage(e, t, n) {
    e.onload = null,
    CX.browser.IE && e.naturalHeight == undefined ? CX.dom.ready(function() {
        getImageType(e, t, n, 
        function(r) {
            if (r == "normal") return;
            r == "too-height" && clipImage2(e, t, n, "h")
        })
    }) : getImageType(e, t, n, 
    function(r) {
        if (r == "normal") {
            e.width = t;
            return
        }
        r == "too-height" && clipImage2(e, t, n, "h")
    })
}
function clipImage2(e, t, n, r) {
    var i = document.createElement("span"),
    s = document.createElement("i");
    s.className = e.className;
    var o = e.parentNode;
    if (!o) return;
    i.style.cssText = "display:block;zoom:1;overflow:hidden;width:" + t + "px;padding:0;margin:0;background:transparent none;";
    var u = new Image;
    u.onload = function() {
        u.onload = null;
        if (r == "h") {
            var a = u.height * (t / u.width);
            u.height = a,
            u.width = t,
            a > n && (i.style.height = n + "px")
        } else r == "w" && (u.width = u.width * (n / u.height), u.height = n);
        u.style.cssText = "display:block;margin:0 auto;",
        i.appendChild(u),
        s.appendChild(i);
        try {
            o.replaceChild(s, e)
        } catch(f) {
            window.console && console.log && console.log(e.src)
        }
        s.style.cursor = "pointer",
        o.style.textDecoration = "none";
        if (CX.browser.IE) {
            o.style.position = "relative";
            var l = $element("div");
            l.style.cssText = "position:absolute;top:0;left:0;cursor:pointer;width:" + i.style.width + ";height:" + (i.style.height ? i.style.height: n + "px") + ";background:url(about:_blank);",
            o.insertBefore(l, o.firstChild)
        }
    },
    u.src = e.src
}
function clipImage(e) {
    if (!e.getAttribute("width") || !e.getAttribute("height")) return;
    var t = parseInt(e.getAttribute("width")),
    n = parseInt(e.getAttribute("height"));
    if (e.naturalWidth && e.naturalHeight && e.naturalWidth == t && e.naturalHeight == n) return;
    var r = new Image;
    r.onload = function() {
        if (r.width == t && r.height == n) return;
        var i = document.createElement("i"),
        s = e.parentNode;
        if (!s) return;
        s.replaceChild(i, e),
        i.style.width = t + "px",
        i.style.height = n + "px";
        if (!CX.browser.IE) i.style.display = "inline-block",
        i.appendChild(r),
        i.style.overflow = "hidden",
        r.width > t && (r.style.marginLeft = "-" + parseInt((r.width - t) / 2) + "px"),
        r.height > n && (r.style.marginTop = "-" + parseInt((r.height - n) / 2) + "px");
        else {
            i.style.zoom = "1";
            var o = parseInt((r.height - n) / 2);
            i.style.background = "url(" + e.src + ") no-repeat -" + parseInt((r.width - t) / 2) + "px -" + (o > 0 ? o: 0) + "px",
            i.parentNode.tagName == "A" && (i.style.cursor = "pointer")
        }
    },
    r.src = e.src
}
function roundify(e, t) {
    return
}
function showNamecardCondition() {
    return CX.user && CX.user.id ? !0: !1
} (function() {
    function h(i, s, u, f, c, h, p, d, v, m, g, y, b, w, E) {
        if (s || t === -1) {
            e.expressions[++t] = [],
            n = -1;
            if (s) return ""
        }
        if (u || f || n === -1) {
            u = u || " ";
            var S = e.expressions[t];
            r && S[n] && (S[n].reverseCombinator = a(u)),
            S[++n] = {
                combinator: u,
                tag: "*"
            }
        }
        var x = e.expressions[t][n];
        if (c) x.tag = c.replace(o, "");
        else if (h) x.id = h.replace(o, "");
        else if (p) p = p.replace(o, ""),
        x.classList || (x.classList = []),
        x.classes || (x.classes = []),
        x.classList.push(p),
        x.classes.push({
            value: p,
            regexp: new RegExp("(^|\\s)" + l(p) + "(\\s|$)")
        });
        else if (y) E = E || w,
        E = E ? E.replace(o, "") : null,
        x.pseudos || (x.pseudos = []),
        x.pseudos.push({
            key: y.replace(o, ""),
            value: E
        });
        else if (d) {
            d = d.replace(o, ""),
            g = (g || "").replace(o, "");
            var T,
            N;
            switch (v) {
            case "^=":
                N = new RegExp("^" + l(g));
                break;
            case "$=":
                N = new RegExp(l(g) + "$");
                break;
            case "~=":
                N = new RegExp("(^|\\s)" + l(g) + "(\\s|$)");
                break;
            case "|=":
                N = new RegExp("^" + l(g) + "(-|$)");
                break;
            case "=":
                T = function(e) {
                    return g == e
                };
                break;
            case "*=":
                T = function(e) {
                    return e && e.indexOf(g) > -1
                };
                break;
            case "!=":
                T = function(e) {
                    return g != e
                };
                break;
            default:
                T = function(e) {
                    return !! e
                }
            }
            g == "" && /^[*$^]=$/.test(v) && (T = function() {
                return ! 1
            }),
            T || (T = function(e) {
                return e && N.test(e)
            }),
            x.attributes || (x.attributes = []),
            x.attributes.push({
                key: d,
                operator: v,
                value: g,
                test: T
            })
        }
        return ""
    }
    var e,
    t,
    n,
    r,
    i = {},
    s = {},
    o = /\\/g,
    u = function(n, o) {
        if (n == null) return null;
        if (n.Slick === !0) return n;
        n = ("" + n).replace(/^\s+|\s+$/g, ""),
        r = !!o;
        var a = r ? s: i;
        if (a[n]) return a[n];
        e = {
            Slick: !0,
            expressions: [],
            raw: n,
            reverse: function() {
                return u(this.raw, !0)
            }
        },
        t = -1;
        while (n != (n = n.replace(c, h)));
        return e.length = e.expressions.length,
        a[n] = r ? f(e) : e
    },
    a = function(e) {
        return e === "!" ? " ": e === " " ? "!": /^!/.test(e) ? e.replace(/^!/, "") : "!" + e
    },
    f = function(e) {
        var t = e.expressions;
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
            i = {
                parts: [],
                tag: "*",
                combinator: a(r[0].combinator)
            };
            for (var s = 0; s < r.length; s++) {
                var o = r[s];
                o.reverseCombinator || (o.reverseCombinator = " "),
                o.combinator = o.reverseCombinator,
                delete o.reverseCombinator
            }
            r.reverse().push(i)
        }
        return e
    },
    l = function(e) {
        return e.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, "\\$&")
    },
    c = new RegExp("^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|:+(<unicode>+)(?:\\((?:(?:([\"'])([^\\12]*)\\12)|((?:\\([^)]+\\)|[^()]*)+))\\))?)".replace(/<combinator>/, "[" + l(">+~`!@$%^&={}\\;</") + "]").replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")),
    p = this.Slick || {};
    p.parse = function(e) {
        return u(e)
    },
    p.escapeRegExp = l,
    this.Slick || (this.Slick = p)
}).apply(typeof exports != "undefined" ? exports: this),
function() {
    function d(e, t, n, r, i, s) {
        for (var o = 0, u = r.length; o < u; o++) {
            var a = r[o];
            if (a) {
                var f = !1;
                a = a[e];
                while (a) {
                    if (a.sizcache === n) {
                        f = r[a.sizset];
                        break
                    }
                    a.nodeType === 1 && !s && (a.sizcache = n, a.sizset = o);
                    if (a.nodeName.toLowerCase() === t) {
                        f = a;
                        break
                    }
                    a = a[e]
                }
                r[o] = f
            }
        }
    }
    function v(e, t, n, r, i, o) {
        for (var u = 0, a = r.length; u < a; u++) {
            var f = r[u];
            if (f) {
                var l = !1;
                f = f[e];
                while (f) {
                    if (f.sizcache === n) {
                        l = r[f.sizset];
                        break
                    }
                    if (f.nodeType === 1) {
                        o || (f.sizcache = n, f.sizset = u);
                        if (typeof t != "string") {
                            if (f === t) {
                                l = !0;
                                break
                            }
                        } else if (s.filter(t, [f]).length > 0) {
                            l = f;
                            break
                        }
                    }
                    f = f[e]
                }
                r[u] = l
            }
        }
    }
    var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
    t = 0,
    n = Object.prototype.toString,
    r = !1,
    i = !0; [0, 0].sort(function() {
        return i = !1,
        0
    });
    var s = function(t, r, i, a) {
        i = i || [],
        r = r || document;
        var f = r;
        if (r.nodeType !== 1 && r.nodeType !== 9) return [];
        if (!t || typeof t != "string") return i;
        var c,
        h,
        p,
        d,
        v,
        g,
        y,
        b,
        w = !0,
        E = s.isXML(r),
        S = [],
        x = t;
        do {
            e.exec(""),
            c = e.exec(x);
            if (c) {
                x = c[3],
                S.push(c[1]);
                if (c[2]) {
                    d = c[3];
                    break
                }
            }
        }
        while (c);
        if (S.length > 1 && u.exec(t)) if (S.length === 2 && o.relative[S[0]]) h = m(S[0] + S[1], r);
        else {
            h = o.relative[S[0]] ? [r] : s(S.shift(), r);
            while (S.length) t = S.shift(),
            o.relative[t] && (t += S.shift()),
            h = m(t, h)
        } else { ! a && S.length > 1 && r.nodeType === 9 && !E && o.match.ID.test(S[0]) && !o.match.ID.test(S[S.length - 1]) && (v = s.find(S.shift(), r, E), r = v.expr ? s.filter(v.expr, v.set)[0] : v.set[0]);
            if (r) {
                v = a ? {
                    expr: S.pop(),
                    set: l(a)
                }: s.find(S.pop(), S.length !== 1 || S[0] !== "~" && S[0] !== "+" || !r.parentNode ? r: r.parentNode, E),
                h = v.expr ? s.filter(v.expr, v.set) : v.set,
                S.length > 0 ? p = l(h) : w = !1;
                while (S.length) g = S.pop(),
                y = g,
                o.relative[g] ? y = S.pop() : g = "",
                y == null && (y = r),
                o.relative[g](p, y, E)
            } else p = S = []
        }
        p || (p = h),
        p || s.error(g || t);
        if (n.call(p) === "[object Array]") if (!w) i.push.apply(i, p);
        else if (r && r.nodeType === 1) for (b = 0; p[b] != null; b++) p[b] && (p[b] === !0 || p[b].nodeType === 1 && s.contains(r, p[b])) && i.push(h[b]);
        else for (b = 0; p[b] != null; b++) p[b] && p[b].nodeType === 1 && i.push(h[b]);
        else l(p, i);
        return d && (s(d, f, i, a), s.uniqueSort(i)),
        i
    };
    s.uniqueSort = function(e) {
        if (h) {
            r = i,
            e.sort(h);
            if (r) for (var t = 1; t < e.length; t++) e[t] === e[t - 1] && e.splice(t--, 1)
        }
        return e
    },
    s.matches = function(e, t) {
        return s(e, null, null, t)
    },
    s.matchesSelector = function(e, t) {
        return s(t, null, null, [e]).length > 0
    },
    s.find = function(e, t, n) {
        var r;
        if (!e) return [];
        for (var i = 0, s = o.order.length; i < s; i++) {
            var u,
            a = o.order[i];
            if (u = o.leftMatch[a].exec(e)) {
                var f = u[1];
                u.splice(1, 1);
                if (f.substr(f.length - 1) !== "\\") {
                    u[1] = (u[1] || "").replace(/\\/g, ""),
                    r = o.find[a](u, t, n);
                    if (r != null) {
                        e = e.replace(o.match[a], "");
                        break
                    }
                }
            }
        }
        return r || (r = t.getElementsByTagName("*")),
        {
            set: r,
            expr: e
        }
    },
    s.filter = function(e, t, n, r) {
        var i,
        u,
        a = e,
        f = [],
        l = t,
        c = t && t[0] && s.isXML(t[0]);
        while (e && t.length) {
            for (var h in o.filter) if ((i = o.leftMatch[h].exec(e)) != null && i[2]) {
                var p,
                d,
                v = o.filter[h],
                m = i[1];
                u = !1,
                i.splice(1, 1);
                if (m.substr(m.length - 1) === "\\") continue;
                l === f && (f = []);
                if (o.preFilter[h]) {
                    i = o.preFilter[h](i, l, n, f, r, c);
                    if (!i) u = p = !0;
                    else if (i === !0) continue
                }
                if (i) for (var g = 0; (d = l[g]) != null; g++) if (d) {
                    p = v(d, i, g, l);
                    var y = r ^ !!p;
                    n && p != null ? y ? u = !0: l[g] = !1: y && (f.push(d), u = !0)
                }
                if (p !== undefined) {
                    n || (l = f),
                    e = e.replace(o.match[h], "");
                    if (!u) return [];
                    break
                }
            }
            if (e === a) {
                if (u != null) break;
                s.error(e)
            }
            a = e
        }
        return l
    },
    s.error = function(e) {
        throw "Syntax error, unrecognized expression: " + e
    };
    var o = s.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: function(e) {
                return e.getAttribute("href")
            }
        },
        relative: {
            "+": function(e, t) {
                var n = typeof t == "string",
                r = n && !/\W/.test(t),
                i = n && !r;
                r && (t = t.toLowerCase());
                for (var o = 0, u = e.length, a; o < u; o++) if (a = e[o]) {
                    while ((a = a.previousSibling) && a.nodeType !== 1);
                    e[o] = i || a && a.nodeName.toLowerCase() === t ? a || !1: a === t
                }
                i && s.filter(t, e, !0)
            },
            ">": function(e, t) {
                var n,
                r = typeof t == "string",
                i = 0,
                o = e.length;
                if (r && !/\W/.test(t)) {
                    t = t.toLowerCase();
                    for (; i < o; i++) {
                        n = e[i];
                        if (n) {
                            var u = n.parentNode;
                            e[i] = u.nodeName.toLowerCase() === t ? u: !1
                        }
                    }
                } else {
                    for (; i < o; i++) n = e[i],
                    n && (e[i] = r ? n.parentNode: n.parentNode === t);
                    r && s.filter(t, e, !0)
                }
            },
            "": function(e, n, r) {
                var i,
                s = t++,
                o = v;
                typeof n == "string" && !/\W/.test(n) && (n = n.toLowerCase(), i = n, o = d),
                o("parentNode", n, s, e, i, r)
            },
            "~": function(e, n, r) {
                var i,
                s = t++,
                o = v;
                typeof n == "string" && !/\W/.test(n) && (n = n.toLowerCase(), i = n, o = d),
                o("previousSibling", n, s, e, i, r)
            }
        },
        find: {
            ID: function(e, t, n) {
                if (typeof t.getElementById != "undefined" && !n) {
                    var r = t.getElementById(e[1]);
                    return r && r.parentNode ? [r] : []
                }
            },
            NAME: function(e, t) {
                if (typeof t.getElementsByName != "undefined") {
                    var n = [],
                    r = t.getElementsByName(e[1]);
                    for (var i = 0, s = r.length; i < s; i++) r[i].getAttribute("name") === e[1] && n.push(r[i]);
                    return n.length === 0 ? null: n
                }
            },
            TAG: function(e, t) {
                return t.getElementsByTagName(e[1])
            }
        },
        preFilter: {
            CLASS: function(e, t, n, r, i, s) {
                e = " " + e[1].replace(/\\/g, "") + " ";
                if (s) return e;
                for (var o = 0, u; (u = t[o]) != null; o++) u && (i ^ (u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || r.push(u) : n && (t[o] = !1));
                return ! 1
            },
            ID: function(e) {
                return e[1].replace(/\\/g, "")
            },
            TAG: function(e, t) {
                return e[1].toLowerCase()
            },
            CHILD: function(e) {
                if (e[1] === "nth") {
                    e[2] || s.error(e[0]),
                    e[2] = e[2].replace(/^\+|\s*/g, "");
                    var n = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                    e[2] = n[1] + (n[2] || 1) - 0,
                    e[3] = n[3] - 0
                } else e[2] && s.error(e[0]);
                return e[0] = t++,
                e
            },
            ATTR: function(e, t, n, r, i, s) {
                var u = e[1].replace(/\\/g, "");
                return ! s && o.attrMap[u] && (e[1] = o.attrMap[u]),
                e[2] === "~=" && (e[4] = " " + e[4] + " "),
                e
            },
            PSEUDO: function(t, n, r, i, u) {
                if (t[1] === "not") {
                    if (! ((e.exec(t[3]) || "").length > 1 || /^\w/.test(t[3]))) {
                        var a = s.filter(t[3], n, r, !0 ^ u);
                        return r || i.push.apply(i, a),
                        !1
                    }
                    t[3] = s(t[3], null, null, n)
                } else if (o.match.POS.test(t[0]) || o.match.CHILD.test(t[0])) return ! 0;
                return t
            },
            POS: function(e) {
                return e.unshift(!0),
                e
            }
        },
        filters: {
            enabled: function(e) {
                return e.disabled === !1 && e.type !== "hidden"
            },
            disabled: function(e) {
                return e.disabled === !0
            },
            checked: function(e) {
                return e.checked === !0
            },
            selected: function(e) {
                return e.parentNode.selectedIndex,
                e.selected === !0
            },
            parent: function(e) {
                return !! e.firstChild
            },
            empty: function(e) {
                return ! e.firstChild
            },
            has: function(e, t, n) {
                return !! s(n[3], e).length
            },
            header: function(e) {
                return /h\d/i.test(e.nodeName)
            },
            text: function(e) {
                return "text" === e.type
            },
            radio: function(e) {
                return "radio" === e.type
            },
            checkbox: function(e) {
                return "checkbox" === e.type
            },
            file: function(e) {
                return "file" === e.type
            },
            password: function(e) {
                return "password" === e.type
            },
            submit: function(e) {
                return "submit" === e.type
            },
            image: function(e) {
                return "image" === e.type
            },
            reset: function(e) {
                return "reset" === e.type
            },
            button: function(e) {
                return "button" === e.type || e.nodeName.toLowerCase() === "button"
            },
            input: function(e) {
                return /input|select|textarea|button/i.test(e.nodeName)
            }
        },
        setFilters: {
            first: function(e, t) {
                return t === 0
            },
            last: function(e, t, n, r) {
                return t === r.length - 1
            },
            even: function(e, t) {
                return t % 2 === 0
            },
            odd: function(e, t) {
                return t % 2 === 1
            },
            lt: function(e, t, n) {
                return t < n[3] - 0
            },
            gt: function(e, t, n) {
                return t > n[3] - 0
            },
            nth: function(e, t, n) {
                return n[3] - 0 === t
            },
            eq: function(e, t, n) {
                return n[3] - 0 === t
            }
        },
        filter: {
            PSEUDO: function(e, t, n, r) {
                var i = t[1],
                u = o.filters[i];
                if (u) return u(e, n, t, r);
                if (i === "contains") return (e.textContent || e.innerText || s.getText([e]) || "").indexOf(t[3]) >= 0;
                if (i === "not") {
                    var a = t[3];
                    for (var f = 0, l = a.length; f < l; f++) if (a[f] === e) return ! 1;
                    return ! 0
                }
                s.error(i)
            },
            CHILD: function(e, t) {
                var n = t[1],
                r = e;
                switch (n) {
                case "only":
                case "first":
                    while (r = r.previousSibling) if (r.nodeType === 1) return ! 1;
                    if (n === "first") return ! 0;
                    r = e;
                case "last":
                    while (r = r.nextSibling) if (r.nodeType === 1) return ! 1;
                    return ! 0;
                case "nth":
                    var i = t[2],
                    s = t[3];
                    if (i === 1 && s === 0) return ! 0;
                    var o = t[0],
                    u = e.parentNode;
                    if (u && (u.sizcache !== o || !e.nodeIndex)) {
                        var a = 0;
                        for (r = u.firstChild; r; r = r.nextSibling) r.nodeType === 1 && (r.nodeIndex = ++a);
                        u.sizcache = o
                    }
                    var f = e.nodeIndex - s;
                    return i === 0 ? f === 0: f % i === 0 && f / i >= 0
                }
            },
            ID: function(e, t) {
                return e.nodeType === 1 && e.getAttribute("id") === t
            },
            TAG: function(e, t) {
                return t === "*" && e.nodeType === 1 || e.nodeName.toLowerCase() === t
            },
            CLASS: function(e, t) {
                return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
            },
            ATTR: function(e, t) {
                var n = t[1],
                r = o.attrHandle[n] ? o.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n),
                i = r + "",
                s = t[2],
                u = t[4];
                return r == null ? s === "!=": s === "=" ? i === u: s === "*=" ? i.indexOf(u) >= 0: s === "~=" ? (" " + i + " ").indexOf(u) >= 0: u ? s === "!=" ? i !== u: s === "^=" ? i.indexOf(u) === 0: s === "$=" ? i.substr(i.length - u.length) === u: s === "|=" ? i === u || i.substr(0, u.length + 1) === u + "-": !1: i && r !== !1
            },
            POS: function(e, t, n, r) {
                var i = t[2],
                s = o.setFilters[i];
                if (s) return s(e, n, t, r)
            }
        }
    },
    u = o.match.POS,
    a = function(e, t) {
        return "\\" + (t - 0 + 1)
    };
    for (var f in o.match) o.match[f] = new RegExp(o.match[f].source + /(?![^\[]*\])(?![^\(]*\))/.source),
    o.leftMatch[f] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[f].source.replace(/\\(\d+)/g, a));
    var l = function(e, t) {
        return e = Array.prototype.slice.call(e, 0),
        t ? (t.push.apply(t, e), t) : e
    };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
    } catch(c) {
        l = function(e, t) {
            var r = 0,
            i = t || [];
            if (n.call(e) === "[object Array]") Array.prototype.push.apply(i, e);
            else if (typeof e.length == "number") for (var s = e.length; r < s; r++) i.push(e[r]);
            else for (; e[r]; r++) i.push(e[r]);
            return i
        }
    }
    var h,
    p;
    document.documentElement.compareDocumentPosition ? h = function(e, t) {
        return e === t ? (r = !0, 0) : !e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition ? -1: 1: e.compareDocumentPosition(t) & 4 ? -1: 1
    }: (h = function(e, t) {
        var n,
        i,
        s = [],
        o = [],
        u = e.parentNode,
        a = t.parentNode,
        f = u;
        if (e === t) return r = !0,
        0;
        if (u === a) return p(e, t);
        if (!u) return - 1;
        if (!a) return 1;
        while (f) s.unshift(f),
        f = f.parentNode;
        f = a;
        while (f) o.unshift(f),
        f = f.parentNode;
        n = s.length,
        i = o.length;
        for (var l = 0; l < n && l < i; l++) if (s[l] !== o[l]) return p(s[l], o[l]);
        return l === n ? p(e, o[l], -1) : p(s[l], t, 1)
    },
    p = function(e, t, n) {
        if (e === t) return n;
        var r = e.nextSibling;
        while (r) {
            if (r === t) return - 1;
            r = r.nextSibling
        }
        return 1
    }),
    s.getText = function(e) {
        var t = "",
        n;
        for (var r = 0; e[r]; r++) n = e[r],
        n.nodeType === 3 || n.nodeType === 4 ? t += n.nodeValue: n.nodeType !== 8 && (t += s.getText(n.childNodes));
        return t
    },
    function() {
        var e = document.createElement("div"),
        t = "script" + (new Date).getTime(),
        n = document.documentElement;
        e.innerHTML = "<a name='" + t + "'/>",
        n.insertBefore(e, n.firstChild),
        document.getElementById(t) && (o.find.ID = function(e, t, n) {
            if (typeof t.getElementById != "undefined" && !n) {
                var r = t.getElementById(e[1]);
                return r ? r.id === e[1] || typeof r.getAttributeNode != "undefined" && r.getAttributeNode("id").nodeValue === e[1] ? [r] : undefined: []
            }
        },
        o.filter.ID = function(e, t) {
            var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
            return e.nodeType === 1 && n && n.nodeValue === t
        }),
        n.removeChild(e),
        n = e = null
    } (),
    function() {
        var e = document.createElement("div");
        e.appendChild(document.createComment("")),
        e.getElementsByTagName("*").length > 0 && (o.find.TAG = function(e, t) {
            var n = t.getElementsByTagName(e[1]);
            if (e[1] === "*") {
                var r = [];
                for (var i = 0; n[i]; i++) n[i].nodeType === 1 && r.push(n[i]);
                n = r
            }
            return n
        }),
        e.innerHTML = "<a href='#'></a>",
        e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(e) {
            return e.getAttribute("href", 2)
        }),
        e = null
    } (),
    document.querySelectorAll && 
    function() {
        var e = s,
        t = document.createElement("div"),
        n = "__sizzle__";
        t.innerHTML = "<p class='TEST'></p>";
        if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) return;
        s = function(t, r, i, o) {
            r = r || document,
            t = t.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
            if (!o && !s.isXML(r)) if (r.nodeType === 9) try {
                return l(r.querySelectorAll(t), i)
            } catch(u) {} else if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                var a = r.getAttribute("id"),
                f = a || n,
                c = r.parentNode,
                h = /^\s*[+~]/.test(t);
                a ? f = f.replace(/'/g, "\\$&") : r.setAttribute("id", f),
                h && c && (r = r.parentNode);
                try {
                    if (!h || c) return l(r.querySelectorAll("[id='" + f + "'] " + t), i)
                } catch(p) {} finally {
                    a || r.removeAttribute("id")
                }
            }
            return e(t, r, i, o)
        };
        for (var r in e) s[r] = e[r];
        t = null
    } (),
    function() {
        var e = document.documentElement,
        t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector,
        n = !1;
        try {
            t.call(document.documentElement, "[test!='']:sizzle")
        } catch(r) {
            n = !0
        }
        t && (s.matchesSelector = function(e, r) {
            r = r.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
            if (!s.isXML(e)) try {
                if (n || !o.match.PSEUDO.test(r) && !/!=/.test(r)) return t.call(e, r)
            } catch(i) {}
            return s(r, null, null, [e]).length > 0
        })
    } (),
    function() {
        var e = document.createElement("div");
        e.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) return;
        e.lastChild.className = "e";
        if (e.getElementsByClassName("e").length === 1) return;
        o.order.splice(1, 0, "CLASS"),
        o.find.CLASS = function(e, t, n) {
            if (typeof t.getElementsByClassName != "undefined" && !n) return t.getElementsByClassName(e[1])
        },
        e = null
    } (),
    document.documentElement.contains ? s.contains = function(e, t) {
        return e !== t && (e.contains ? e.contains(t) : !0)
    }: document.documentElement.compareDocumentPosition ? s.contains = function(e, t) {
        return !! (e.compareDocumentPosition(t) & 16)
    }: s.contains = function() {
        return ! 1
    },
    s.isXML = function(e) {
        var t = (e ? e.ownerDocument || e: 0).documentElement;
        return t ? t.nodeName !== "HTML": !1
    };
    var m = function(e, t) {
        var n,
        r = [],
        i = "",
        u = t.nodeType ? [t] : t;
        while (n = o.match.PSEUDO.exec(e)) i += n[0],
        e = e.replace(o.match.PSEUDO, "");
        e = o.relative[e] ? e + "*": e;
        for (var a = 0, f = u.length; a < f; a++) s(e, u[a], r);
        return s.filter(i, r)
    };
    window.Sizzle = s
} ();
var Mustache = function() {
    var e = function() {};
    return e.prototype = {
        otag: "{{",
        ctag: "}}",
        pragmas: {},
        buffer: [],
        pragmas_implemented: {
            "IMPLICIT-ITERATOR": !0
        },
        context: {},
        render: function(e, t, n, r) {
            r || (this.context = t, this.buffer = []);
            if (!this.includes("", e)) {
                if (r) return e;
                this.send(e);
                return
            }
            e = this.render_pragmas(e);
            var i = this.render_section(e, t, n);
            if (r) return this.render_tags(i, t, n, r);
            this.render_tags(i, t, n, r)
        },
        send: function(e) {
            e != "" && this.buffer.push(e)
        },
        render_pragmas: function(e) {
            if (!this.includes("%", e)) return e;
            var t = this,
            n = new RegExp(this.otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + this.ctag);
            return e.replace(n, 
            function(e, n, r) {
                if (!t.pragmas_implemented[n]) throw {
                    message: "This implementation of mustache doesn't understand the '" + n + "' pragma"
                };
                t.pragmas[n] = {};
                if (r) {
                    var i = r.split("=");
                    t.pragmas[n][i[0]] = i[1]
                }
                return ""
            })
        },
        render_partial: function(e, t, n) {
            e = this.trim(e);
            if (!n || n[e] === undefined) throw {
                message: "unknown_partial '" + e + "'"
            };
            return typeof t[e] != "object" ? this.render(n[e], t, n, !0) : this.render(n[e], t[e], n, !0)
        },
        render_section: function(e, t, n) {
            if (!this.includes("#", e) && !this.includes("^", e)) return e;
            var r = this,
            i = new RegExp(this.otag + "(\\^|\\#)\\s*(.+)\\s*" + this.ctag + "\n*([\\s\\S]+?)" + this.otag + "\\/\\s*\\2\\s*" + this.ctag + "\\s*", "mg");
            return e.replace(i, 
            function(e, i, s, o) {
                var u = r.find(s, t);
                if (i == "^") return ! u || r.is_array(u) && u.length === 0 ? r.render(o, t, n, !0) : "";
                if (i == "#") return r.is_array(u) ? r.map(u, 
                function(e) {
                    return r.render(o, r.create_context(e), n, !0)
                }).join("") : r.is_object(u) ? r.render(o, r.create_context(u), n, !0) : typeof u == "function" ? u.call(t, o, 
                function(e) {
                    return r.render(e, t, n, !0)
                }) : u ? r.render(o, t, n, !0) : ""
            })
        },
        render_tags: function(e, t, n, r) {
            var i = this,
            s = function() {
                return new RegExp(i.otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" + i.ctag + "+", "g")
            },
            o = s(),
            u = function(e, r, u) {
                switch (r) {
                case "!":
                    return "";
                case "=":
                    return i.set_delimiters(u),
                    o = s(),
                    "";
                case ">":
                    return i.render_partial(u, t, n);
                case "{":
                    return i.find(u, t);
                default:
                    return i.escape(i.find(u, t))
                }
            },
            a = e.split("\n");
            for (var f = 0; f < a.length; f++) a[f] = a[f].replace(o, u, this),
            r || this.send(a[f]);
            if (r) return a.join("\n")
        },
        set_delimiters: function(e) {
            var t = e.split(" ");
            this.otag = this.escape_regex(t[0]),
            this.ctag = this.escape_regex(t[1])
        },
        escape_regex: function(e) {
            if (!arguments.callee.sRE) {
                var t = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
                arguments.callee.sRE = new RegExp("(\\" + t.join("|\\") + ")", "g")
            }
            return e.replace(arguments.callee.sRE, "\\$1")
        },
        find: function(e, t) {
            function n(e) {
                return e === !1 || e === 0 || e
            }
            e = this.trim(e);
            var r;
            return n(t[e]) ? r = t[e] : n(this.context[e]) && (r = this.context[e]),
            typeof r == "function" ? r.apply(t) : r !== undefined ? r: ""
        },
        includes: function(e, t) {
            return t.indexOf(this.otag + e) != -1
        },
        escape: function(e) {
            return e = String(e === null ? "": e),
            e.replace(/&(?!\w+;)|["'<>\\]/g, 
            function(e) {
                switch (e) {
                case "&":
                    return "&amp;";
                case "\\":
                    return "\\\\";
                case '"':
                    return "&quot;";
                case "'":
                    return "&#39;";
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                default:
                    return e
                }
            })
        },
        create_context: function(e) {
            if (this.is_object(e)) return e;
            var t = ".";
            this.pragmas["IMPLICIT-ITERATOR"] && (t = this.pragmas["IMPLICIT-ITERATOR"].iterator);
            var n = {};
            return n[t] = e,
            n
        },
        is_object: function(e) {
            return e && typeof e == "object"
        },
        is_array: function(e) {
            return Object.prototype.toString.call(e) === "[object Array]"
        },
        trim: function(e) {
            return e.replace(/^\s*|\s*$/g, "")
        },
        map: function(e, t) {
            if (typeof e.map == "function") return e.map(t);
            var n = [],
            r = e.length;
            for (var i = 0; i < r; i++) n.push(t(e[i]));
            return n
        }
    },
    {
        name: "mustache.js",
        version: "0.3.1-dev",
        to_html: function(t, n, r, i) {
            var s = new e;
            i && (s.send = i),
            s.render(t, n, r);
            if (!i) return s.buffer.join("\n")
        }
    }
} ();
this.JSON || (this.JSON = {}),
function() {
    "use strict";
    function f(e) {
        return e < 10 ? "0" + e: e
    }
    function quote(e) {
        return escapable.lastIndex = 0,
        escapable.test(e) ? '"' + e.replace(escapable, 
        function(e) {
            var t = meta[e];
            return typeof t == "string" ? t: "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + e + '"'
    }
    function str(e, t) {
        var n,
        r,
        i,
        s,
        o = gap,
        u,
        a = t[e];
        a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)),
        typeof rep == "function" && (a = rep.call(t, e, a));
        switch (typeof a) {
        case "string":
            return quote(a);
        case "number":
            return isFinite(a) ? String(a) : "null";
        case "boolean":
        case "null":
            return String(a);
        case "object":
            if (!a) return "null";
            gap += indent,
            u = [];
            if (Object.prototype.toString.apply(a) === "[object Array]") {
                s = a.length;
                for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                return i = u.length === 0 ? "[]": gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]": "[" + u.join(",") + "]",
                gap = o,
                i
            }
            if (rep && typeof rep == "object") {
                s = rep.length;
                for (n = 0; n < s; n += 1) r = rep[n],
                typeof r == "string" && (i = str(r, a), i && u.push(quote(r) + (gap ? ": ": ":") + i))
            } else for (r in a) Object.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": ": ":") + i));
            return i = u.length === 0 ? "{}": gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}": "{" + u.join(",") + "}",
            gap = o,
            i
        }
    }
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
    },
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
        var r;
        gap = "",
        indent = "";
        if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " ";
        else typeof n == "string" && (indent = n);
        rep = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
            "": e
        });
        throw new Error("JSON.stringify")
    }),
    typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
        function walk(e, t) {
            var n,
            r,
            i = e[t];
            if (i && typeof i == "object") for (n in i) Object.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r: delete i[n]);
            return reviver.call(e, t, i)
        }
        var j;
        text = String(text),
        cx.lastIndex = 0,
        cx.test(text) && (text = text.replace(cx, 
        function(e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
        typeof reviver == "function" ? walk({
            "": j
        },
        "") : j;
        throw new SyntaxError("JSON.parse")
    })
} (),
Object.keys = function(e) {
    var t = [];
    if (e === undefined || e === null) return t;
    for (var n in e) e.hasOwnProperty(n) && t.push(n);
    return e.call !== undefined && e.call !== Function.prototype.call && t.indexOf("call") === -1 && t.push("call"),
    t
},
Array.isArray = Array.isArray || 
function(e) {
    return Object.prototype.toString.call(e) === "[object Array]"
},
Array.prototype.forEach = Array.prototype.forEach || 
function(e, t) {
    for (var n = 0; n < this.length; n++) e.call(t, this[n], n, this)
},
Array.prototype.indexOf = Array.prototype.indexOf || 
function(e) {
    for (var t = 0; t < this.length; t++) if (e === this[t]) return t;
    return - 1
},
Array.prototype.some = Array.prototype.some || 
function(e, t) {
    for (var n = 0, r = this.length; n < r; n++) if (n in this && e.call(t, this[n], n, this)) return ! 0;
    return ! 1
},
Array.prototype.every = Array.prototype.every || 
function(e, t) {
    for (var n = 0, r = this.length; n < r; n++) if (n in this && !e.call(t, this[n], n, this)) return ! 1;
    return ! 0
},
Array.prototype.map = Array.prototype.map || 
function(e, t) {
    var n = [];
    for (var r = 0, i = this.length; r < i; r++) r in this && (n[r] = e.call(t, this[r], r, this));
    return n
},
Array.prototype.filter = Array.prototype.filter || 
function(e, t) {
    var n = [];
    for (var r = 0, i = this.length; r < i; r++) r in this && e.call(t, this[r], r, this) && n.push(this[r]);
    return n
},
Array.prototype.reduce = Array.prototype.reduce || 
function(e) {
    "use strict";
    if (this === undefined || this === null) throw new TypeError;
    var t = Object(this),
    n = t.length >>> 0;
    if (typeof e != "function") throw new TypeError;
    if (n === 0 && arguments.length == 1) throw new TypeError;
    var r = 0,
    i;
    if (arguments.length >= 2) i = arguments[1];
    else do {
        if (r in t) {
            i = t[r++];
            break
        }
        if (++r >= n) throw new TypeError
    }
    while (!0);
    while (r < n) r in t && (i = e.call(undefined, i, t[r], r, t)),
    r++;
    return i
},
Array.prototype.reduceRight = Array.prototype.reduceRight || 
function(e) {
    "use strict";
    if (this === undefined || this === null) throw new TypeError;
    var t = Object(this),
    n = t.length >>> 0;
    if (typeof e != "function") throw new TypeError;
    if (n === 0 && arguments.length === 1) throw new TypeError;
    var r = n - 1,
    i;
    if (arguments.length >= 2) i = arguments[1];
    else do {
        if (r in this) {
            i = this[r--];
            break
        }
        if (--r < 0) throw new TypeError
    }
    while (!0);
    while (r >= 0) r in t && (i = e.call(undefined, i, t[r], r, t)),
    r--;
    return i
},
String.prototype.trim = String.prototype.trim || 
function() {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
};
if (!Function.prototype.bind || Function.prototype.bind === window.__hualuOldBind) Function.prototype.bind = function(e) {
    var t = this,
    n = Array.prototype.slice.call(arguments, 1);
    return function() {
        return t.apply(e, n.concat(Array.prototype.slice.call(arguments)))
    }
};
var object = function(e) {
    var t = function() {};
    if (!
    function() {}.name) {
        var n = /(?:^|\()function ([\w$]+)/;
        Function.__get_name__ = function(e) {
            var t = n.exec(e.toString());
            return t ? t[1] : ""
        }
    } else Function.__get_name__ = function(e) {
        return e.name
    };
    var r = function(e, t, n) {
        return ! (e in t)
    };
    return t.extend = function(e, t, n) {
        var i = null;
        typeof n == "function" ? i = n: n !== !0 && typeof n != "undefined" && (i = r);
        for (var s in t) {
            if (i && !i(s, e, t)) continue;
            try {
                e[s] = t[s]
            } catch(o) {}
        }
        return t && t.hasOwnProperty("call") && (!i || i(e, t, "call")) && (e.call = t.call),
        e
    },
    t.clone = function(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t
    },
    t.bind = function(e) {
        t.extend(e, t)
    },
    t._loader = null,
    t
} (window); (function(e) {
    function h(e, t, n) {
        t === "__name__" && e[t] && e[t] !== n && typeof console != "undefined" && console.warn && console.warn("请不要将同一个方法赋值给多个类成员：" + e[t] + " --> " + n)
    }
    var t = !0;
    for (var n in {
        toString: 1
    }) t = null;
    t && (t = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"]);
    var r = function(e, n) {
        return function(r, i) {
            if (r === null) return this;
            if (n || typeof r != "string") {
                for (var s in r) e.call(this, s, r[s]);
                if (t) for (var o = t.length; o > 0; o--) s = t[o],
                r.hasOwnProperty(s) && e.call(this, s, r[s])
            } else e.call(this, r, i);
            return this
        }
    },
    i = function(e, t) {
        var n = Object.__getattribute__(this, e);
        return t !== !1 && N.isMethod(n) ? (t = t || this, n.bind(t)) : n
    },
    s = r(function(e, t) {
        "__setattr__" in this ? this.__setattr__(e, t) : Object.__setattr__(this, e, t)
    }),
    o = function(e, t) {
        var n = E.__getattribute__(this, e);
        return t !== !1 && N.isMethod(n) ? (t = t || this, n.bind(t)) : n
    },
    u = function(e) {
        e == "@mixins" && (e = "__mixins__");
        var t = this.prototype,
        n = t.__properties__;
        return e in this || e in t || n && e in n
    },
    a = r(function(e, t) {
        "__metaclass__" in this ? E.__getattribute__(this.__metaclass__, "__setattr__").call(this.__metaclass__, this, e, t) : E.__setattr__(this, e, t)
    }),
    f = function(e, t) {
        this[e] = t
    },
    l = function() {
        return this.__subclassesarray__
    },
    c = function(e, t, n) {
        if (!t) throw new Error("can not get function name when this.parent called");
        var r = e;
        while (r && !r.prototype.hasOwnProperty(t)) r = r.__base__;
        var i = r.__base__,
        s = r.__mixins__,
        o,
        u;
        i && i.get && i.has(t) ? (u = i, o = E.__getattribute__(i, t)) : s && s.length && s.some(function(e) {
            return u = e,
            e.has(t)
        }) && (o = E.__getattribute__(u, t));
        if (!o || typeof o != "function") throw new Error("no such method in parent : '" + t + "'");
        return o.apply(u, n)
    },
    p = function(e, t) {
        var n,
        r;
        return t === !1 ? n = function(t) {
            return this.prototype[e.__name__].im_func.apply(this.__this__, arguments)
        }: n = function() {
            var n = [].slice.call(arguments, 0);
            return t === !0 ? typeof this == "function" ? r = this: r = this.__class__: r = this,
            n.unshift(r),
            e.apply(this.__this__, n)
        },
        n.im_self = t,
        n.__class__ = arguments.callee,
        n.im_func = e,
        n.__setattr__ = function(t, n) {
            h(e, t, n),
            this[t] = n
        },
        n
    },
    d = this.staticmethod = function(e) {
        return {
            __class__: arguments.callee,
            im_func: e,
            __setattr__: function(e, t) {
                h(this, e, t),
                this[e] = t
            }
        }
    },
    v = this.classmethod = function(e, t) {
        var n = {
            __class__: arguments.callee,
            im_func: e,
            __setattr__: function(e, t) {
                h(this, e, t),
                this[e] = t
            }
        };
        return n
    },
    m = this.property = function(e, t) {
        var n = {};
        return n.__class__ = arguments.callee,
        n.__setattr__ = function(e, t) {
            h(this, e, t),
            this[e] = t
        },
        n.fget = e,
        n.fset = t,
        n
    },
    g = function(e, t) {
        var n = new N(function() {
            for (var n = 0, r = t.length; n < r; n++) this[t[n]] = function(t) {
                return function() {
                    return e.prototype[t].apply(arguments[0], [].slice.call(arguments, 1))
                }
            } (t[n])
        });
        return n
    },
    y = function() {
        if (!Array.push) return ! 1;
        var e = function() {};
        e.prototype = new Array;
        var t = new e;
        return t.push(null),
        !!t.length
    } (),
    b,
    w;
    Object.__getattribute__ = function(e, t) {
        var n = e.__properties__["prop_" + t] || e.__properties__[t];
        if (n) {
            if (n.fget) return n.fget.call(e.__this__, e);
            throw new Error("get not allowed property " + t)
        }
        return t in e ? e[t] : e.__getattr__ ? e.__getattr__.call(e, t) : undefined
    },
    Object.__setattr__ = e.__setattr__ = function(e, t, n) {
        var r = null;
        e.__properties__ && (r = e.__properties__["prop_" + t] || e.__properties__[t]);
        if (!r) e[t] = n;
        else {
            if (!r.fset) throw "set not allowed property " + t;
            r.fset.call(e.__this__, e, n)
        }
    },
    Object.__new__ = function(e) {
        if (e === Array || e === String) return new e;
        e.__prototyping__ = !0;
        var t = new e;
        return delete e.__prototyping__,
        t
    };
    var E = this.Type = this.type = function() {};
    E.__class__ = E,
    E.__new__ = function(t, n, r, h) {
        var p = function() {
            if (p.__prototyping__) return this;
            if (p.__constructs__) return p.__constructs__(arguments);
            this.__class__ = p,
            N.initMixins(p, this);
            var e = this.initialize ? this.initialize.apply(this, arguments) : null;
            return e
        };
        p.__subclassesarray__ = [],
        p.__subclasses__ = l,
        p.__classbasedmethods__ = [],
        e.runtime ? p.__module__ = e.runtime.stack[e.runtime.stack.length - 1].id: p.__module__ = "",
        p.set = p.__mixin__ = a,
        p.get = o,
        p.has = u,
        p.__metaclass__ = t,
        p.__class__ = t,
        p.__new__ = r.__new__,
        p.__dict__ = h,
        p.__constructs__ = r.__constructs__ || null,
        r !== Object && r !== E && (r.__classbasedmethods__ || []).forEach(function(e) {
            p[e] = r[e],
            p.__classbasedmethods__.push(e)
        }),
        p.__constructing__ = !0,
        p.prototype = Object.__new__(r),
        p.prototype.constructor = p,
        r.__subclassesarray__ && r.__subclassesarray__.push(p);
        var d = p.prototype,
        v = d.__properties__ || {};
        d.__properties__ = e.extend({},
        v),
        E.__setattr__(p, "__setattr__", E.__getattribute__
        (r, "__setattr__")),
        E.__setattr__(p, "__base__", r),
        E.__setattr__(p, "__this__", {
            base: r,
            parent: function() {
                return c(p, arguments.callee.caller.__name__, arguments)
            }
        });
        for (var m in h) E.__setattr__(p, m, h[m]);
        var g = p.__mixins__;
        return g && g.forEach(function(e) {
            N.keys(e).forEach(function(t) {
                if (p.has(t)) return;
                var n = E.__getattribute__(e, t);
                E.__setattr__(p, t, n)
            })
        }),
        p.prototype.get = i,
        p.prototype.set = s,
        p.prototype._set = f,
        delete p.__constructing__,
        p
    };
    var S = ["__mixins__", "__new__", "__this__", "__base__"],
    x = ["__new__", "__metaclass__", "__mixins__"],
    T = ["__this__", "__base__"];
    E.__setattr__ = function(e, t, n) {
        t == "@mixins" && (t = "__mixins__");
        if (S.indexOf(t) != -1) if (!n || typeof n != "object" && typeof n != "function") return;
        var r = e.prototype,
        i = r.__properties__,
        s = e.__subclassesarray__,
        o = e.__constructing__;
        delete e[t],
        delete r[t],
        delete i[t],
        x.indexOf(t) != -1 ? n && (typeof n == "object" || typeof n == "function") && (e[t] = n) : T.indexOf(t) != -1 ? e[t] = r[t] = n: n == null ? r[t] = n: n.__class__ === undefined && typeof n == "function" ? (r[t] = p(n), r[t].__setattr__("__name__", t), n.__name__ = t, t == "initialize" && (e[t] = p(n, !1))) : n.__class__ === m ? (n.__setattr__("__name__", t), i[t] = n, r[t] = undefined) : n.__class__ === p ? (r[t] = p(n.im_func), n.im_self == 1 && (e[t] = n)) : n.__class__ === v ? (n.__setattr__("__name__", t), n.im_func.__name__ = t, e[t] = r[t] = p(n.im_func, !0), e.__classbasedmethods__.push(t)) : n.__class__ === d ? (n.__setattr__("__name__", t), n.im_func.__name__ = t, e[t] = r[t] = n.im_func, e.__classbasedmethods__.push(t)) : N.instanceOf(n, E) ? e[t] = r[t] = n: r[t] = n,
        !o && t in e && s && s.forEach(function(e) {
            t in e || E.__setattr__(e, t, n)
        })
    },
    E.__delattr__ = function(e, t) {
        delete e[t],
        delete e.prototype[t],
        delete e.prototype.__properties__[t]
    },
    E.__getattribute__ = function(e, t) {
        t == "@mixins" && (t = "__mixins__");
        var n = e.prototype,
        r = n.__properties__,
        i = e.__metaclass__,
        s;
        return t in e ? s = e[t] : r && r[t] !== undefined ? s = r[t] : n[t] && n[t].__class__ == p ? e[t] = s = p(n[t].im_func, !1) : i && (s = E.__getattribute__(i, t)) !== undefined ? (s.__class__ === p && (s = p(s.im_func, !0)), e[t] = s) : s = n[t],
        s
    },
    E.__constructs__ = function(e) {
        var t = e.length;
        if (t < 1) throw new Error("bad arguments");
        var n = null,
        r = t > 1 ? e[0] : Object;
        if (typeof r != "function" && typeof r != "object") throw new Error("base is not function or object");
        r && (y || (r === Array ? r = b: r === String && (r = w)));
        var i = e[t - 1],
        s;
        if (typeof i != "function" && typeof i != "object") throw new Error("constructor is not function or object");
        i instanceof Function && (s = i, i = {},
        s.call(i));
        var o;
        this === Object ? o = i.__metaclass__ || r.__metaclass__ || E: o = this;
        var u = o.__new__(o, n, r, i);
        if (!u || typeof u != "function") throw new Error("__new__ method should return cls");
        return E.__getattribute__(o, "initialize").call(o, u, n, r, i),
        u
    },
    E.initialize = function() {},
    Object.__class__ = E;
    var N = this.Class = function() {
        return E.__constructs__.call(Object, arguments)
    };
    N.initMixins = function(e, t) {
        if (!e) return;
        e.__base__ && N.initMixins(e.__base__, t);
        var n = e.__mixins__;
        if (n) {
            t.__this__.mixining = !0;
            for (var r = 0, i = n.length, s; r < i; r++) s = n[r],
            s.prototype && typeof s.prototype.initialize == "function" && s.prototype.initialize.call(t);
            delete t.__this__.mixining
        }
    },
    N.mixin = function(e, t) {
        if (!e || typeof e != "object") return;
        t === Array ? t = b: t === String && (t = w),
        e.__mixins__ = e.__mixins__ || [],
        e.__mixins__.push(t)
    },
    N.hasProperty = function(e, t) {
        return e && e.__properties__ ? t in e.__properties__: !1
    },
    N.hasMember = function(e, t) {
        return e ? t in e.prototype ? !0: !1: !1
    },
    N.isMethod = function(e) {
        if (typeof e == "function") if (!e.__class__ || e.__class__ == p || e.__class__ == d || e.__class__ == v) return ! 0;
        return ! 1
    },
    N.getPropertyNames = function(e) {
        return e && e.__properties__ ? Object.keys(e.__properties__) : []
    },
    N.inject = function(t, n, r, i) {
        if (typeof t != "function") throw new Error("bad arguments.");
        var s = arguments.length,
        o,
        u,
        a;
        s === 2 ? (r = [], i = !0) : s === 3 && (Array.isArray(r) ? i = !0: (i = r, r = [])),
        n.__class__ = t,
        u = t.prototype,
        a = u.initialize,
        n.__properties__ = u.__properties__,
        o = Object.__new__(t),
        e.extend(n, o, i),
        N.initMixins(t, n),
        typeof a == "function" && a.apply(n, r)
    },
    N.instanceOf = function(e, t) {
        if (typeof t != "function") throw new Error("bad arguments.");
        var n;
        if (typeof e != "function") return e instanceof t;
        n = e.__class__;
        if (n) do
        if (n === t) return ! 0;
        while (n = n.__base__);
        return ! 1
    },
    N.getChain = function(e) {
        if (!e) return [];
        var t = [e];
        while (e.__base__) t.push(e.__base__),
        e = e.__base__;
        return t
    },
    N.getAllSubClasses = function(e) {
        if (!e || !e.__subclassesarray__) return [];
        var t = e.__subclassesarray__,
        n = [].concat(t),
        r = n.shift(),
        i;
        while (r != null) i = r.__subclassesarray__,
        i != null && (n = n.concat(i), t = t.concat(i)),
        r = n.shift();
        return t
    },
    N.keys = function(e) {
        if (!e || !e.prototype) return [];
        var t = [];
        for (var n in e.prototype) t.push(n);
        return t = t.filter(function(e) {
            return e.indexOf("__") == 0 && e.slice( - 2) == "__" ? !1: ["get", "set", "_set", "initialize", "constructor"].indexOf(e) != -1 ? !1: !0
        }),
        t
    },
    b = g(Array, ["concat", "indexOf", "join", "lastIndexOf", "pop", "push", "reverse", "shift", "slice", "sort", "splice", "unshift", "valueOf", "forEach", "some", "every", "map", "filter", "reduce", "reduceRight"]),
    b.prototype.length = 0,
    w = g(String, ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "match", "replace", "search", "slice", "split", "substr", "substring", "toLowerCase", "toUpperCase", "valueOf", "trim"]),
    w.prototype.length = 0
})(object),
function(e) {
    function r(e, t, n, r) {
        var i = t.length;
        for (var s = 0, o = t.length; s < o; s++) if (n.indexOf(t.charAt(s)) != -1 && s < i) {
            i = s;
            break
        }
        return e.got = t.substring(0, i),
        e.remained = r ? t.substring(i) : t.substring(i + 1),
        e
    }
    function i(e, n) {
        if (typeof e != "string") return ["", "", "", "", "", ""];
        var i = "",
        s = "",
        o = "",
        u = "",
        a = "",
        f = "",
        l = 0;
        l = e.indexOf(":");
        if (l > 0) if (e.substring(0, l) == "http") i = e.substring(0, l).toLowerCase(),
        e = e.substring(l + 1);
        else {
            for (l = 0, len = e.length; l < len; l++) if (t.indexOf(e.charAt(l)) == -1) break;
            i = e.substring(0, l),
            e = e.substring(l + 1)
        } ! i && n && (i = n);
        var c = {};
        return e.substring(0, 2) == "//" && (r(c, e.substring(2), "/?#", !0), s = c.got, e = c.remained),
        e.indexOf("#") != -1 && (r(c, e, "#"), e = c.got, f = c.remained),
        e.indexOf("?") != -1 && (r(c, e, "?"), e = c.got, a = c.remained),
        e.indexOf(";") != -1 && (r(c, e, ";"), o = c.got, u = c.remained),
        o || (o = e),
        [i, s, o, u, a, f]
    }
    function s(e) {
        if (!e) return "";
        var t = "";
        return e[0] && (t += e[0] + "://" + e[1]),
        e[1] && e[2] && e[2].indexOf("/") != 0 && (t += "/"),
        t += e[2],
        e[3] && (t += ";" + e[3]),
        e[4] && (t += "?" + e[4]),
        e[5] && (t += "#" + e[5]),
        t
    }
    function o(e, t) {
        if (!e) return t;
        if (!t) return e;
        t = String(t),
        e = String(e);
        var r = i(e),
        o = i(t, r[0]);
        if (o[0] != r[0]) return t;
        if (o[1]) return s(o);
        o[1] = r[1];
        if (o[2].charAt(0) == "/") return s(o);
        if (!o[2] && !o[3]) return o[2] = r[2],
        o[3] = r[3],
        o[4] || (o[4] = r[4]),
        s(o);
        var u = r[2].split("/").slice(0, -1).concat(o[2].split("/")),
        a;
        u[u.length - 1] == "." && (u[u.length - 1] = "");
        for (a = 0, l = u.length; a < l; a++) u[a] == "." && (u.splice(a, 1), a--);
        for (;;) {
            a = 1,
            n = u.length - 1;
            while (a < n) {
                if (u[a] == ".." && ["", ".."].indexOf(u[a - 1]) == -1) {
                    u.splice(a - 1, 2);
                    break
                }
                a++
            }
            if (a >= n) break
        }
        return u.length == 2 && u[0] == "" && u[1] == ".." ? u[u.length - 1] = "": u.length >= 2 && u[u.length - 1] == ".." && (u.pop(), u.pop(), u.push("")),
        o[2] = u.join("/"),
        s(o)
    }
    function u() {
        var e = window.location,
        t = e.protocol + "//" + e.host + (e.pathname.charAt(0) !== "/" ? "/": "") + e.pathname;
        t.indexOf("\\") != -1 && (t = t.replace(/\\/g, "/"));
        var n = "./";
        return t.indexOf("/") != -1 && (n = t.substring(0, t.lastIndexOf("/") + 1)),
        n
    }
    function a(e) {
        e = e.replace(/([^:\/])\/+/g, "$1/");
        if (e.indexOf(".") === -1) return e;
        var t = e.split("/"),
        n = [];
        for (var r = 0, i, s = t.length; r < s; r++) {
            i = t[r];
            if (i === "..") {
                if (n.length === 0) throw new Error("invalid path: " + e);
                n.pop()
            } else i !== "." && n.push(i)
        }
        return n.join("/").replace(/#$/, "")
    }
    function f(e) {
        this.__name__ = e
    }
    function c(e) {
        this.message = "no module named " + e
    }
    function h(e, t) {
        this.message = t.id + ": module " + e + " required"
    }
    function p(e, t) {
        this.runStack = e;
        var n = "";
        e.forEach(function(e, t) {
            n += e.module.id + "-->"
        }),
        n += t.id,
        this.message = n + " cyclic dependency."
    }
    function d(e, t, n) {
        m.apply(this, arguments)
    }
    function v(e, t, n) {
        m.apply(this, arguments)
    }
    function m(e, t, n) {
        if (!e) return;
        this.id = e,
        this.factory = n,
        this.dependencies = this.parseDependencies(t)
    }
    function g(e, t, n) {
        if (!e) return;
        this.owner = t,
        this.runtime = n,
        this.name = e
    }
    function y(e, t, n) {
        g.apply(this, arguments);
        var r = n.loader,
        i,
        s,
        u,
        a = r.paths,
        f = this.getType(e);
        f == "absolute" ? s = e: f == "relative" ? (i = r.find(o(o(t.id, "."), e), a), s = i.id, u = i.context) : f == "root" ? s = o(E._pageDir, e) : (i = r.find(e, a), s = i.id, u = i.context),
        this.id = s,
        this.context = u || "",
        this.type = f
    }
    function b(e, t, n) {
        g.apply(this, arguments);
        var r = n.loader,
        i = n.path.concat([n.moduleId]),
        s = !1,
        u = r.find(e.replace(/\./g, "/"), i, t.id),
        a = u.id,
        f = u.context;
        f == "" && (s = !0, f = o(o(t.id, "."), f)),
        this.nameParts = this.name.split("."),
        this.id = a,
        this.context = f,
        this.isRelative = s
    }
    function w(e) {
        this.modules = {},
        this.packages = {},
        this.loadings = {},
        this.stack = [],
        this.members = {},
        this.moduleId = e,
        this.path = [""]
    }
    function E(e) {
        this.useCache = !0,
        this.anonymousModuleCount = 0,
        this.base = e || "/",
        this.lib = {},
        this.paths = [this.base],
        this.scripts = document.getElementsByTagName("script"),
        this.lib.sys = new m("sys")
    }
    var t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.";
    f.prototype.toString = function() {
        return "<module '" + this.__name__ + "'>"
    },
    c.prototype = new Error,
    h.prototype = new Error,
    p.prototype = new Error,
    d.prototype = new m,
    d.prototype.constructor = d,
    d.prototype.make = function(e, t, n, r) {
        var i = new f(e);
        r.modules[e] = i,
        r.packages[e] = this;
        var require = this.createRequire(e, t, n, r),
        s = this.factory.call(i, require, i, this);
        return s && (s.__name__ = i.__name__, i = s),
        r.addModule(e, i),
        i
    },
    d.prototype.execute = function(e, t, n) {
        if (n.getStackItem(e)) return null;
        var r = n.loadings[this.id].deps;
        n.pushStack(e, this);
        var i = this.make(e, t, r, n);
        return e == "__main__" && typeof i.main == "function" && i.main(),
        n.popStack(),
        i
    },
    d.prototype.toDep = function(e, t) {
        var n = this.dependencies[e];
        return n.indexOf("/") == -1 && n.indexOf(".") != -1 ? new b(n, this, t) : new y(n, this, t)
    },
    d.prototype.createRequire = function(e, t, n, r) {
        function require(e) {
            var t = s.dependencies.indexOf(e);
            if (t == -1) throw new h(e, s);
            var a = n[t],
            f = a.execute(o, u);
            if (!f) {
                if (s.dependencies.indexOf(e) != -1) throw new p(r.stack, i.lib[a.id]);
                console.warn("Unknown Error.")
            }
            return f
        }
        var i = r.loader,
        s = this,
        o = e,
        u = t;
        return require.async = function(e, n) {
            r.loader.buildFileLib();
            var i = s.id + "~" + (new Date).getTime() + Math.floor(Math.random() * 100);
            r.loader.defineModule(d, i, e, 
            function(require, e, t) {
                var r = [];
                t.dependencies.forEach(function(e) {
                    r.push(require(e))
                }),
                n.apply(null, r)
            }),
            r.loadModule(i, 
            function() {
                var e = r.loader.lib[i];
                e.execute(e.id, t, r)
            })
        },
        require
    },
    v.prototype = new m,
    v.prototype.constructor = v,
    v.prototype.make = function(e, t, n, r) {
        var i,
        s = [],
        o;
        return n.forEach(function(n) {
            var r = n.execute(e, t);
            s.indexOf(r) == -1 && s.push(r)
        },
        this),
        o = r.modules[e],
        o || (o = new f(e), r.modules[e] = o, r.packages[e] = this),
        s.unshift(o),
        this.factory && (i = this.factory.apply(o, s)),
        i ? (o.__empty_refs__ && o.__empty_refs__.forEach(function(t) {
            typeof console != "undefined" && console.warn(t + "无法正确获得" + e + "模块的引用。因为该模块是通过return返回模块实例的。")
        }), i.__name__ = o.__name__, o = i) : delete o.__empty_refs__,
        r.addModule(e, o),
        o
    },
    v.prototype.execute = function(e, t, n) {
        var r,
        i,
        s;
        return n.getStackItem(e) ? (e in n.modules || (n.addModule(e, new f(e)), n.packages[e] = this), r = n.modules[e], i = n.stack[n.stack.length - 1], r.__empty_refs__ || (r.__empty_refs__ = []), r.__empty_refs__.push(i.module.id)) : (s = n.loadings[this.id].deps, n.pushStack(e, this), r = this.make(e, t, s, n), e == "__main__" && typeof r.main == "function" && r.main(), n.popStack()),
        r
    },
    v.prototype.toDep = function(e, t) {
        var n = this.dependencies[e];
        return n.indexOf("/") != -1 ? new y(n, this, t) : new b(n, this, t)
    },
    m.prototype.load = function(e, t) {
        function s() {
            i++,
            i == r.dependencies.length && t && t()
        }
        var n = [],
        r = this,
        i = -1;
        this.dependencies.forEach(function(t, r) {
            var i = this.toDep(r, e);
            n.push(i),
            i.load(s)
        },
        this),
        e.loadings[this.id].deps = n,
        e.loadings[this.id].callbacks.forEach(function(e) {
            e()
        }),
        e.loadings[this.id].callbacks = [],
        s()
    },
    m.prototype.execute = function(e, t, n) {
        if (n.getStackItem(e)) throw new p(n.stack);
        var r = new f(e);
        return this.id === "sys" && (r.modules = n.modules, r.stack = n.stack, r.getModule = function(e) {
            return n.packages[e]
        }),
        n.addModule(e, r),
        n.packages[e] = this,
        r
    },
    m.prototype.parseDependencies = function(e) {
        return Array.isArray(e) ? e: e ? (e = e.trim().replace(/^,*|,*$/g, "").split(/\s*,\s*/ig), e) : []
    },
    y.prototype = new g,
    y.prototype.getType = function(e) {
        return~e.indexOf("://") || e.indexOf("//") === 0 ? "absolute": e.indexOf("./") === 0 || e.indexOf("../") === 0 ? "relative": e.charAt(0) === "/" && e.charAt(1) !== "/" ? "root": "top-level"
    },
    y.prototype.constructor = y,
    y.prototype.load = function(e) {
        this.runtime.loadModule(this.id, e)
    },
    y.prototype.execute = function(e, t) {
        var n = this.runtime,
        r = n.loader,
        i;
        this.type == "top-level" ? i = this.name: this.type == "relative" ? i = this.id.slice(t.length) : i = this.id,
        i.slice( - 3) == ".js" && (i = i.slice(0, -3));
        var s = n.modules[i],
        o,
        u;
        return s || (o = r.lib[this.id], s = o.execute(i, this.context, n)),
        s
    },
    b.prototype = new g,
    b.prototype.constructor = b,
    b.prototype.load = function(e) {
        function s() {
            i++,
            i == r.length && e && e()
        }
        var t = this.runtime,
        n = t.loader,
        r = this.nameParts,
        i = -1;
        r.forEach(function(e, i) {
            var u,
            a;
            i == r.length - 1 ? u = this.id: (a = n.find(o(this.context, r.slice(0, i + 1).join("/"))), u = a.id, a.found || (u += "/index.js", n.definePrefix(u))),
            t.loadModule(u, s)
        },
        this),
        s()
    },
    b.prototype.execute = function(e, t) {
        var n = this,
        r = this.runtime,
        i = r.loader,
        s = this.context || "",
        u = this.nameParts,
        a,
        f;
        this.isRelative ? (f = e.lastIndexOf("."), f == -1 ? a = "": a = e.slice(0, f)) : a = "";
        var l = a,
        c,
        h = (a ? a + ".": "") + u[0],
        p,
        d,
        v;
        for (var m = 0, g = u.length, y; m < g; m++) y = u[m],
        c = (l ? l + ".": "") + y,
        c in r.modules || (m == u.length - 1 ? p = n.id: p = i.find(o(s, u.slice(0, m + 1).join("/"))).id, d = i.lib[p], v = d.execute(c, s, r), r.setMemberTo(l, y, v)),
        l = c;
        return r.modules[h]
    },
    w.prototype.addModule = function(e, t) {
        t = t || new f(e),
        this.modules[e] = t;
        var n = this.members[e];
        return n && n.forEach(function(t) {
            this.modules[e][t.id] = t.value
        },
        this),
        t
    },
    w.prototype.loadModule = function(e, t) {
        function s() {
            var e = i.id,
            s = i.file;
            i = r.lib[e];
            if (!i || !i.factory) throw new Error(s + " do not add " + e);
            i.load(n, t)
        }
        var n = this,
        r = this.loader;
        if (e in this.loadings) {
            this.loadings[e].deps ? t() : this.loadings[e].callbacks.push(t);
            return
        }
        this.loadings[e] = {
            deps: null,
            callbacks: []
        };
        var i = r.lib[e];
        if (!i) throw new c(e);
        i.file ? E.loadScript(i.file, s, !0) : i.load(this, t)
    },
    w.prototype.getStackItem = function(e) {
        var t;
        return this.stack.some(function(n) {
            if (n.id == e) return t = n,
            !0
        }),
        t
    },
    w.prototype.pushStack = function(e, t) {
        this.stack.push({
            id: e,
            module: t
        })
    },
    w.prototype.popStack = function() {
        this.stack.pop()
    },
    w.prototype.setMemberTo = function(e, t, n) {
        e && (this.modules[e] ? this.modules[e][t] = n: (this.members[e] || (this.members[e] = []), this.members[e].push({
            id: t,
            value: n
        })))
    },
    E._urlNodeMap = {},
    E._pageDir = null,
    E.getAbsolutePath = function(e) {
        return e.indexOf("://") != -1 || e.indexOf("//") === 0 ? a(e) : (E._pageDir || (E._pageDir = u()), a(E._pageDir + e))
    },
    E.prototype.name2id = function(e, t) {
        if (typeof e != "string") return "";
        var n,
        r,
        i;
        return e.indexOf("/") == -1 ? n = e.replace(/\./g, "/") : n = e,
        t && e.lastIndexOf("/") != e.length - 1 && (i = n.lastIndexOf("."), i != -1 ? r = n.slice(i) : r = "", r || (n += ".js")),
        n
    },
    E.prototype.find = function(e, t, n) {
        function a(e) {
            var t;
            if (t = r.lib[e] || r.lib[e + ".js"] || r.lib[e + "/index.js"]) return t.id
        }
        function f(t) {
            var r = a(o(o(n, t), e));
            if (r) return s = r,
            u = t,
            !0
        }
        var r = this,
        i = e.slice(e.lastIndexOf("."));
        t || (t = this.paths);
        var s = null,
        u = null;
        return t.some(f),
        {
            found: !!s,
            id: s || e,
            context: u
        }
    },
    E.prototype.buildFileLib = function() {
        var e = this.scripts;
        for (var t = 0, n, r, i, s = e.length; t < s; t++) {
            n = e[t],
            i = n.getAttribute("data-src"),
            r = n.getAttribute("data-module");
            if (!r || !i) continue;
            r.trim().split(/\s+/ig).forEach(function(e) {
                this.defineFile(o(this.base, this.name2id(e, !0)), i)
            },
            this)
        }
    },
    E.loadScript = function(e, t, n) {
        if (!e || typeof e != "string") throw new Error("bad arguments.");
        e = e.trim();
        var r = E.getAbsolutePath(e);
        if (n) {
            var i = E._urlNodeMap,
            s = i[r];
            if (s) {
                s.loading ? s.callbacks.push(t) : t(s);
                return
            }
        }
        var o = document.createElement("script");
        o.type = "text/javascript",
        o.src = e,
        o.async = !0,
        o.loading = !0,
        o.callbacks = [];
        var u = function() {
            o.loading = null,
            o.callbacks.forEach(function(e) {
                e(o)
            });
            for (var e = 0, t = o.callbacks.length; e < t; e++) o.callbacks[e] = null;
            o.callbacks = null,
            o = null
        };
        o.callbacks.push(t),
        window.ActiveXObject ? o.onreadystatechange = function() {
            var e = this.readyState;
            if ("loaded" === e || "complete" === e) o.onreadystatechange = null,
            u()
        }: o.addEventListener ? (o.addEventListener("load", u, !1), o.addEventListener("error", u, !1)) : o.onload = o.onerror = u,
        document.getElementsByTagName("head")[0].insertBefore(o, null),
        n && (i[r] = o)
    },
    E.prototype.removeScript = function(e) {
        if (!e || typeof e != "string") throw new Error("bad arguments.");
        e = e.trim();
        var t = E.getAbsolutePath(e),
        n = E._urlNodeMap,
        r = n[t];
        r && (delete n[t], r.parentNode && r.parentNode.removeChild(r), r = null)
    },
    E.prototype.createRuntime = function(e) {
        var t = new w(e);
        return t.loader = this,
        t.path = t.path.concat(this.paths),
        t
    },
    E.prototype.definePrefix = function(e) {
        if (!e || typeof e != "string") return;
        if (e in this.lib) return;
        this.lib[e] = new m(e)
    },
    E.prototype.defineFile = function(e, t) {
        if (!e || typeof e != "string") return;
        if (e in this.lib && (this.lib[e].factory || this.lib[e].file)) return;
        var n = new m(e);
        n.file = t,
        this.lib[e] = n
    },
    E.prototype.defineModule = function(e, t, n, r) {
        if (arguments.length < 4) return;
        if (t in this.lib && this.lib[t].factory) return;
        var i = new e(t, n, r);
        this.lib[t] = i
    },
    E.prototype.getModule = function(e) {
        var t = this.find(this.name2id(e)).id;
        return t in this.lib ? this.lib[t] : null
    },
    E.prototype.predefine = function(e, t, n) {
        if (!e || !t) return;
        n = n || "",
        e.trim().split(/\s+/ig).forEach(function(e) {
            e = n + e,
            this.defineFile(o(this.base, this.name2id(e, !0)), t)
        },
        this)
    },
    E.prototype.define = function(e, t, n) {
        if (typeof e != "string") return;
        typeof t == "function" && (n = t, t = []);
        var r = o(this.base, this.name2id(e, !0));
        this.defineModule(d, r, t, n)
    },
    E.prototype.add = function(e, t, n) {
        if (typeof e != "string") return;
        typeof t == "function" && (n = t, t = []);
        var r = o(this.base, this.name2id(e, !0));
        this.defineModule(v, r, t, n)
    },
    E.prototype.remove = function(e, t) {
        var n = o(this.base, this.name2id(e, !0));
        delete this.lib[n],
        t && (e = e.charAt(e.length - 1) == "/" ? e: e + "/", n = o(this.base, this.name2id(e)), Object.keys(this.lib).forEach(function(e) {
            e.indexOf(n) == 0 && delete this.lib[e]
        },
        this))
    },
    E.prototype.clear = function() {
        for (var e in this.lib) e != "sys" && this.remove(e)
    },
    E.prototype.execute = function(t) {
        if (!t || typeof t != "string") return;
        this.buildFileLib();
        var n = this.find(this.name2id(t)),
        r = n.id,
        i = n.context,
        s = this.createRuntime(r, i);
        e.runtime = s,
        s.loadModule(r, 
        function() {
            var e = s.loader.lib[r];
            e.execute("__main__", i, s)
        }),
        e.runtime = null
    },
    E.prototype.use = function(t, n) {
        if (!n || typeof n != "function") return;
        this.buildFileLib();
        var r = "__anonymous_" + this.anonymousModuleCount + "__";
        this.anonymousModuleCount++,
        this.defineModule(d, r, t, 
        function(require, e, t) {
            var r = [];
            t.dependencies.forEach(function(e) {
                dep = require(e),
                r.indexOf(dep) == -1 && r.push(dep)
            }),
            n.length == r.length + 1 && (typeof console != "undefined" && console.warn("object.use即将不再支持第一个exports参数，请尽快删除。"), r.unshift(e)),
            n.apply(null, r)
        });
        var i = this.createRuntime(r);
        e.runtime = i,
        i.loadModule(r, 
        function() {
            var e = i.loader.lib[r];
            e.execute("__main__", "", i)
        }),
        e.runtime = null
    },
    e.Loader = E,
    e.NoModuleError = c,
    e.ModuleRequiredError = h
} (object),
function(e) {
    var t = new e.Loader("http://pub.objectjs.org/object/");
    e._loader = t,
    e.add = t.add.bind(t),
    e.predefine = t.predefine.bind(t),
    e.define = t.define.bind(t),
    e.remove = t.remove.bind(t),
    e.use = t.use.bind(t),
    e.execute = t.execute.bind(t),
    e.addPath = function(e) {
        t.paths.push(e)
    },
    e.define("./window.js", "sys", 
    function(require) {
        var e = require("sys"),
        t = e.modules.dom;
        return t && t.wrap(window),
        window
    }),
    e.define("./loader.js", 
    function(require, t) {
        t.Loader = e.Loader
    })
} (object),
object.add("ua/index.js", 
function(e) {
    function r(e) { ! e && typeof e != "string" && (e = navigator.userAgent);
        var n,
        r,
        i = {},
        s,
        o;
        return e.indexOf("Trident/7.0") > -1 ? (i[s = "ie"] = document.documentMode, i[o = "ieshell"] = 11) : !~e.indexOf("Opera") && (n = e.match(/MSIE\s([^;]*)/)) && n[1] ? (r = e.match(/Trident\/([\d\.]*)/)) && r[1] ? (i[s = "ie"] = document.documentMode, i[o = "ieshell"] = t(r[1]) + 4) : i[o = "ieshell"] = i[s = "ie"] = t(n[1]) : ((n = e.match(/AppleWebKit\/([\d\.]*)/)) && n[1] ? i[s = "webkit"] = t(n[1]) : !~e.indexOf("Opera") && (n = e.match(/Gecko/)) ? (i[s = "gecko"] = 0, (n = e.match(/rv:([\d\.]*)/)) && n[1] && (i[s] = t(n[1]))) : (n = e.match(/Presto\/([\d\.]*)/)) && n[1] && (i[s = "presto"] = t(n[1])), (n = e.match(/Chrome\/([\d\.]*)/)) && n[1] ? i[o = "chrome"] = t(n[1]) : (n = e.match(/\/([\d\.]*)( Mobile\/?[\w]*)? Safari/)) && n[1] ? i[o = "safari"] = t(n[1]) : /\/[\d\.]* \(KHTML, like Gecko\) Safari/.test(e) ? i[o = "safari"] = undefined: !~e.indexOf("Opera") && (n = e.match(/Firefox\/([\d\.]*)/)) && n[1] ? i[o = "firefox"] = t(n[1]) : (n = e.match(/Opera\/([\d\.]*)/)) && n[1] ? (i[o = "opera"] = t(n[1]), (n = e.match(/Opera\/.* Version\/([\d\.]*)/)) && n[1] && (i[o] = t(n[1]))) : (n = e.match(/Opera ([\d\.]*)/)) && n[1] && (s = "presto", i[o = "opera"] = t(n[1]))),
        i.shell = o,
        i.core = s,
        i
    }
    var t = this.numberify = function(e) { ! e || typeof e != "string";
        var t = 0;
        return parseFloat(e.replace(/\./g, 
        function() {
            return t++===0 ? ".": ""
        }))
    };
    this.__detectUA = r,
    this.ua = {};
    var n = r(navigator.userAgent);
    object.extend(this.ua, n)
}),
object.add("./string.js", 
function(e) {
    this.substitute = function() {
        return Mustache.to_html.apply(null, arguments)
    },
    this.camelCase = function(e) {
        return e.replace(/-\D/g, 
        function(e) {
            return e.charAt(1).toUpperCase()
        })
    },
    this.hyphenate = function(e) {
        return e.replace(/[A-Z]/g, 
        function(e) {
            return "-" + e.charAt(0).toLowerCase()
        })
    },
    this.capitalize = function(e) {
        return e.replace(/\b[a-z]/g, 
        function(e) {
            return e.toUpperCase()
        })
    },
    this.trim = function(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    },
    this.ltrim = function(e) {
        return (e || "").replace(/^\s+/, "")
    },
    this.rtrim = function(e) {
        return (e || "").replace(/\s+$/, "")
    },
    this.lengthZh = function(e) {
        return e.length
    },
    this.toQueryString = function(e) {
        var t = [];
        for (var n in e) {
            var r = e[n],
            i;
            if (r && r.constructor === Array) {
                var s = {};
                r.forEach(function(e, t) {
                    s[t] = e
                }),
                i = arguments.callee(s, n)
            } else typeof r == "object" ? i = arguments.callee(r, n) : i = n + "=" + encodeURIComponent(r);
            r !== null && t.push(i)
        }
        return t.join("&")
    }
}),
object.define("./events.js", "ua", 
function(require, e) {
    function r() {}
    function s(e, t) {
        return e.nativeEventNames ? e.nativeEventNames.indexOf(t) != -1: t in i
    }
    var t = require("ua"),
    n = function() {
        if (document.createEvent) {
            var e = document.createEvent("Event");
            return e.initEvent(type, !1, !0),
            e.preventDefault ? (e.preventDefault(), e.getPreventDefault ? !e.getPreventDefault() : !e.defaultPrevented) : !0
        }
        return ! 1
    } ();
    r.prototype.stopPropagation = function() {
        this.cancelBubble = !0
    },
    r.prototype.preventDefault = function() {
        this.returnValue = !1
    },
    r.prototype.getPreventDefault = function() {
        return this.returnValue === !1
    },
    r.prototype.stop = function() {
        this.stopPropagation(),
        this.preventDefault()
    },
    this.fireevent = function(e) {
        var t,
        n,
        r,
        i = function(e) {
            var i = arguments.callee.__name__;
            t || (t = i);
            var s = {},
            o = Array.prototype.slice.call(arguments, 1);
            if (r) for (var u = 0; u < r.length; u++) s[r[u]] = arguments[u + 1];
            s._args = o;
            var a = e.fireEvent(t, s, e),
            f = e[i + "_createEvent"];
            f && (o.unshift(a), f.apply(e, o));
            var l = a.getPreventDefault ? a.getPreventDefault() : a.defaultPrevented;
            if (!l) return n.apply(this, arguments)
        };
        return typeof e == "function" ? (n = e, i) : (Array.isArray(arguments[0]) ? r = arguments[0] : (t = e, arguments[1] && (r = arguments[1])), 
        function(e) {
            return n = e,
            i
        })
    },
    this.HOLD = 2,
    this.CAPTURE = 1,
    this.wrapEvent = function(e) {
        return e.target = e.srcElement,
        e.stopPropagation = r.prototype.stopPropagation,
        e.preventDefault = r.prototype.preventDefault,
        e.getPreventDefault = r.prototype.getPreventDefault,
        e.stop = r.prototype.stop,
        e
    },
    this.wrapPreventDefault = function(e) {
        if (n) {
            var t = e.preventDefault;
            e.preventDefault = function() {
                this.defaultPrevented = !0,
                t.apply(this, arguments)
            }
        }
    };
    var i = {
        click: 2,
        dblclick: 2,
        mouseup: 2,
        mousedown: 2,
        contextmenu: 2,
        mousewheel: 2,
        DOMMouseScroll: 2,
        mouseover: 2,
        mouseout: 2,
        mousemove: 2,
        selectstart: 2,
        selectend: 2,
        keydown: 2,
        keypress: 2,
        keyup: 2,
        orientationchange: 2,
        touchstart: 2,
        touchmove: 2,
        touchend: 2,
        touchcancel: 2,
        gesturestart: 2,
        gesturechange: 2,
        gestureend: 2,
        focus: 2,
        blur: 2,
        change: 2,
        reset: 2,
        select: 2,
        submit: 2,
        paste: 2,
        oninput: 2,
        load: 2,
        unload: 1,
        beforeunload: 2,
        resize: 1,
        move: 1,
        DOMContentLoaded: 1,
        readystatechange: 1,
        error: 1,
        abort: 1,
        scroll: 1
    };
    this.Events = new Class(function() {
        function r(e, t) {
            var n = v(e, t);
            e.__nativeEvents && e.__nativeEvents[t] && (n.removeEventListener(t, e.__nativeEvents[t].run, !1), n.addEventListener(t, e.__nativeEvents[t].run, !1))
        }
        function o(t, n) {
            var r = v(t, n);
            r.attachEvent("on" + n, 
            function(r) {
                r = e.wrapEvent(r || window.event);
                var i = t.__eventListeners ? t.__eventListeners[n] : null;
                i && (i = i.slice(0), i.forEach(function(e) {
                    try {
                        e.call(t, r)
                    } catch(n) {
                        p(n)
                    }
                }), i = null);
                var s = t.__nativeEvents ? t.__nativeEvents[n] : null;
                s && (s = s.slice(0), s.forEach(function(e) {
                    e.call(t, r)
                }), s = null)
            })
        }
        function u(e, t) {
            if (t in i && e.nodeType == 1) return;
            var n = typeof t == "string" ? t.toLowerCase() : t,
            r = v(e, t),
            s = e["on" + n],
            o = r["__on" + n]; ! s && o ? (r.removeEventListener(t, o, !1), r["__on" + n] = null) : s && s != o && (r.removeEventListener(t, o, !1), r.addEventListener(t, s, !1), r["__on" + n] = s)
        }
        function a(e, t) {
            if (e.nodeType == 1 && s(e, t) && f(e)) return;
            var n = typeof t == "string" ? t.toLowerCase() : t;
            e.__eventListeners || (e.__eventListeners = {}),
            e.__eventListeners[t] || (e.__eventListeners[t] = []);
            var r = e.__eventListeners[t],
            i = r.length,
            o = e["on" + n],
            u = e["__on" + n];
            if (!o && u) {
                for (var a = 0; a < i; a++) if (r[a] == u) {
                    r.splice(a, 1);
                    break
                }
                e["__on" + n] = null
            } else if (o && o != u) {
                for (var a = 0; a < i; a++) if (r[a] == u) {
                    r.splice(a, 1);
                    break
                }
                r.push(o),
                e["__on" + n] = o
            }
        }
        function f(e) {
            if (!e) return ! 1;
            var t = e.parentNode,
            n = document.documentElement;
            while (t) {
                if (t == n) return ! 0;
                t = t.parentNode
            }
            return ! 1
        }
        function l(t, n, r) {
            if (!t["__preEventAdded_" + n]) {
                t["__preEventAdded_" + n] = !0,
                t["on" + n] && (t["__on" + n] = t["on" + n], t["on" + n] = null),
                t.addEventListener(n, 
                function(t) {
                    e.wrapPreventDefault(t)
                },
                r);
                if (t["__on" + n]) {
                    t["on" + n] = t["__on" + n],
                    t["__on" + n] = null;
                    try {
                        delete t["__on" + n]
                    } catch(i) {}
                }
            }
        }
        function p(e) {
            if (c) {
                h.length = 0;
                for (var t in e) h.push(t + ":" + e[t]),
                h.push(", ");
                h.length > 0 && h.pop(),
                console.error(e, h.join(""))
            }
        }
        function v(e, n) {
            return t.ua.ie != 9 || e != window ? e.__boss || e: d.indexOf(n) != -1 ? e: e.__boss
        }
        var c = typeof console != "undefined" && console.error,
        h = [];
        this.initialize = function(e) {
            if (!e.addEventListener || e == window && t.ua.ie == 9) e.__eventListeners || (e.__eventListeners = {}),
            e.__nativeEvents || (e.__nativeEvents = {});
            if (!e.addEventListener && !e.attachEvent || e == window && t.ua.ie == 9) e.__boss = document.createElement("div")
        },
        this.addEvent = document.addEventListener ? 
        function(i, s, o, a) {
            var f = v(i, s);
            a === null && (a = !1),
            a = !!(a & e.CAPTURE);
            if (!t.ua.ie && (s == "mouseenter" || s == "mouseleave")) {
                var c = o;
                o = function(e) {
                    if (c.delegating) {
                        c.call(i, e);
                        return
                    }
                    var t = e.relatedTarget;
                    while (t && t != i) try {
                        t = t.parentNode
                    } catch(n) {
                        t = i
                    }
                    t !== i && c && c.call(i, e)
                },
                o.innerFunc = c,
                s = s == "mouseenter" ? "mouseover": "mouseout",
                i.__eventListeners || (i.__eventListeners = {}),
                i.__eventListeners[s] || (i.__eventListeners[s] = []),
                i.__eventListeners[s].push(o)
            }
            n && l(f, s, a),
            u(i, s),
            f.addEventListener(s, o, a),
            r(i, s)
        }: function(e, t, n) {
            var r = v(e, t),
            i;
            e.__eventListeners || (e.__eventListeners = {}),
            e.__eventListeners[t] ? i = e.__eventListeners[t] : (i = [], e.__eventListeners[t] = i, (!e.__nativeEvents || !e.__nativeEvents[t]) && o(e, t));
            if (i.some(function(e) {
                return e === n
            })) return;
            a(e, t),
            i.push(n)
        },
        this.addNativeEvent = document.addEventListener ? 
        function(e, t, i) {
            var s = v(e, t);
            n && l(s, t, !1);
            var o;
            e.__nativeEvents || (e.__nativeEvents = {}),
            e.__nativeEvents[t] ? o = e.__nativeEvents[t] : (o = [], e.__nativeEvents[t] = o, e.__nativeEvents[t].run = function(t) {
                o.forEach(function(n) {
                    n.call(e, t)
                })
            },
            r(e, t)),
            o.push(i)
        }: function(e, t, n) {
            var r = v(e),
            i;
            e.__nativeEvents || (e.__nativeEvents = {}),
            e.__nativeEvents[t] ? i = e.__nativeEvents[t] : (i = [], e.__nativeEvents[t] = i, (!e.__nativeEvents || !e.__eventListeners[t]) && o(e, t));
            if (i.some(function(e) {
                return e === n
            })) return;
            i.push(n)
        },
        this.removeEvent = document.removeEventListener ? 
        function(n, r, i, s) {
            var o = v(n, r);
            s = !!(s & e.CAPTURE);
            if (!t.ua.ie && r == "mouseleave") {
                r = "mouseout";
                if (n.__eventListeners && n.__eventListeners[r]) {
                    var u = n.__eventListeners[r];
                    for (var a = 0, f, l = u.length; a < l; a++) {
                        f = u[a];
                        if (f.innerFunc === i) {
                            o.removeEventListener(r, f, s),
                            u.splice(a, 1);
                            break
                        }
                    }
                }
            } else o.removeEventListener(r, i, s)
        }: function(e, t, n, r) {
            var i = v(e, t);
            e.__eventListeners || (e.__eventListeners = {});
            var s = e.__eventListeners[t];
            if (!s) return;
            for (var o = 0; o < s.length; o++) if (s[o] === n) {
                s.splice(o, 1);
                break
            }
        };
        var d = ["error", "unload", "scroll", "resize", "load", "beforeunload", "blur", "focus", "storage", "popstate", "hashchange", "message", "redo", "undo"];
        this.fireEvent = document.dispatchEvent ? 
        function(n, r, i) {
            t.ua.ie || (r == "mouseleave" ? r = "mouseout": r == "mouseenter" && (r = "mouseover")),
            u(n, r);
            var s = v(n, r),
            o = document.createEvent("Event");
            return o.initEvent(r, !1, !0),
            object.extend(o, i),
            e.wrapPreventDefault(o),
            s.dispatchEvent(o),
            o
        }: function(t, n, r) {
            r || (r = {});
            if (t.nodeType == 1 && s(t, n)) {
                var i = e.wrapEvent(document.createEventObject());
                object.extend(i, r);
                if (f(t)) {
                    var o = t["__on" + n],
                    u = t.__eventListeners[n];
                    if (o && u) {
                        for (var l = 0, c = u.length; l < c; l++) if (u[l] == o) {
                            u.splice(l, 1);
                            break
                        }
                        t["__on" + n] = null
                    }
                    if (t._oldFireEventInIE) return t._oldFireEventInIE("on" + n, i),
                    i;
                    typeof console != "undefined" && console.warn("请使用dom.wrap方法包装对象以添加事件处理函数")
                }
            }
            a(t, n);
            var i = e.wrapEvent(r),
            u = t.__eventListeners[n];
            if (u) {
                u = u.slice(0);
                for (var l = 0, h = u.length; l < h; l++) if (u[l]) try {
                    u[l].call(t, i, !0)
                } catch(d) {
                    p(d)
                }
                u = null
            }
            var v = t.__nativeEvents[n];
            return v && (v = v.slice(0), v.forEach(function(e) {
                e.call(t, i)
            }), v = null),
            i
        }
    })
}),
object.add("./options.js", 
function(e) {
    var t = !0,
    n = Array.prototype.slice;
    for (var r in {
        toString: 1
    }) t = null;
    t && (t = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"]),
    this.overloadsetter = function(e) {
        return function() {
            var r = arguments[e.length - 2] || null,
            i = arguments[e.length - 1],
            s = args = n.call(arguments, 0, e.length - 2);
            if (r === null) return this;
            if (typeof r != "string") {
                for (var o in r) args = s.slice(0),
                args.push(o),
                args.push(r[o]),
                e.apply(this, args);
                if (t) for (var u = t.length; u > 0; u--) o = t[u],
                r.hasOwnProperty(o) && e.call(this, o, r[o])
            } else args.push(r),
            args.push(i),
            e.apply(this, args);
            return this
        }
    },
    this.Arguments = new Class(function() {
        this.initialize = function(e, t, n) {
            n == undefined && (n = {});
            var r = {};
            for (var i in t) r[i] = n[i] != undefined ? n[i] : t[i];
            return r
        }
    }),
    this.Options = new Class({
        initialize: function(e, t) {
            t && (e._provider = t),
            e._options = {}
        },
        setOptions: function(e, t, n) {
            n || (n = e._options);
            for (var r in t) r in n && (n[r] = t[r])
        },
        setOption: function(e, t, n, r) {
            if (r !== undefined) e._options[t] = r;
            else if (e._provider && e._provider.makeOption) {
                r = e._provider.makeOption(t, n);
                if (r === null) return;
                e._options[t] = r
            }
        },
        getOptions: function(e) {
            return e._options
        }
    })
}),
object.define("dom/index.js", "ua, events, string, net", 
function(require, exports, module) {
    function doScrollLeft() {
        if (window.__domLoaded) {
            runHooks();
            return
        }
        if (!document.documentElement || !document.documentElement.doScroll) return;
        try {
            document.documentElement.doScroll("left")
        } catch(e) {
            setTimeout(doScrollLeft, 1);
            return
        }
        doDomReady()
    }
    function doCheckReadyState() {
        var e = null;
        e = setInterval(function() { / loaded | complete / .test(document.readyState) && (clearInterval(e), doDomReady())
        },
        1)
    }
    function doDomReady() {
        window.__domLoaded || (window.__domLoaded = !0),
        runHooks()
    }
    function tryDomReady() {
        if (ua.ua.webkit && ua.ua.webkit < 525) doCheckReadyState();
        else if (ua.ua.ie) {
            var e = !1;
            try {
                e = window.frameElement == null
            } catch(t) {}
            e && doScrollLeft()
        }
    }
    function runHooks() {
        var e = window.__domloadHooks,
        t;
        while (e[0]) try {
            t = e.shift(),
            t()
        } catch(n) {
            if (CX && CX.DEBUG_MODE) throw n
        }
    }
    function getWrapper(e) {
        var t = e.toUpperCase(),
        n = _tagMap[t];
        return n ? n: exports.Element
    }
    function getCommon(e, t) {
        var n;
        for (n = 0, l = e.length; n < l; n++) if (!t[n] || t[n] !== e[n]) break;
        return e.slice(0, n)
    }
    function calculateSelectionPos(e) {
        var t = document.selection.createRange();
        if (t == null || t.parentElement() != e) return {
            start: -1,
            end: -1
        };
        var n = e.createTextRange(),
        r = n.duplicate();
        return n.moveToBookmark(t.getBookmark()),
        r.setEndPoint("EndToStart", n),
        {
            start: r.text.length,
            end: r.text.length + t.text.length
        }
    }
    var ua = require("ua"),
    events = require("events"),
    string = require("string"),
    net = require("net");
    window.UID = 1;
    var storage = {},
    get = function(e) {
        return storage[e] || (storage[e] = {})
    },
    $uid = this.$uid = window.ActiveXObject ? 
    function(e) {
        return e === undefined || e === null ? null: (e.uid || (e.uid = [window.UID++]))[0]
    }: function(e) {
        return e === undefined || e === null ? null: e.uid || (e.uid = window.UID++)
    };
    $uid(window),
    $uid(document),
    !window.__domLoaded && !window.__domreadyAdded && (window.__domreadyAdded = !0, window.__domLoaded = !1, window.__domloadHooks = [], document.addEventListener ? document.addEventListener("DOMContentLoaded", 
    function() {
        document.removeEventListener("DOMContentLoaded", arguments.callee, !1),
        window.__domLoaded = !0
    },
    !1) : window.attachEvent && (document.attachEvent("onreadystatechange", 
    function() {
        document.readyState === "complete" && (document.detachEvent("onreadystatechange", arguments.callee), doDomReady())
    }), window.attachEvent("onload", doDomReady), tryDomReady())),
    this.ready = function(e) {
        if (typeof e != "function") return;
        if (window.__domLoaded == 1) {
            e();
            return
        }
        if (document.readyState == "complete") {
            window.__domLoaded = !0,
            runHooks(),
            e();
            return
        }
        ua.ua.webkit && ua.ua.webkit < 525 || !document.addEventListener ? window.__domloadHooks.push(e) : document.addEventListener && document.addEventListener("DOMContentLoaded", e, !1)
    };
    var WRAPPED = {},
    wrap = this.wrap = function(e) {
        if (!e) return null;
        if (Array.isArray(e)) return new exports.Elements(e);
        if (e._wrapped) return e;
        ua.ua.ie && e.fireEvent && (e._oldFireEventInIE = e.fireEvent);
        var t;
        if (e === window) t = exports.Window;
        else if (e === window.document) t = exports.Document;
        else {
            if (e.nodeType !== 1) return e;
            t = getWrapper(e.tagName)
        }
        return e._wrapped = WRAPPED,
        $uid(e),
        Class.inject(t, e, 
        function(e, t, n) {
            return typeof n[e] != "function" ? !(e in t) : !0
        }),
        e
    };
    this.getElements = function(e, t) {
        if (!e || typeof e != "string") return null;
        t || (t = document);
        return new exports.Elements(Sizzle(e, t));
        var n,
        r,
        i,
        s
    },
    this.getElement = function(
    e, t) {
        if (!e || typeof e != "string") return null;
        t || (t = document);
        var n = Sizzle(e, t)[0];
        return n = wrap(n),
        n
    },
    this.id = function(e) {
        return exports.wrap(document.getElementById(e))
    };
    var eval_inner_JS = this.eval_inner_JS = function(ele) {
        if (!ele) return;
        if (typeof ele == "string") {
            var node = document.createElement("div");
            node.innerHTML = "<div>&nbsp;</div> " + ele,
            ele = node
        }
        var js = [];
        if (ele.nodeType == 11) for (var i = 0, l = ele.childNodes.length, current; i < l; i++) {
            current = ele.childNodes[i];
            if (current.tagName && current.tagName.toUpperCase() == "SCRIPT") js.push(current);
            else if (current.nodeType === 1) {
                var subScripts = current.getElementsByTagName("script");
                for (var j = 0, subLength = subScripts.length; j < subLength; j++) js.push(subScripts[j])
            }
        } else ele.nodeType == 1 && (ele.tagName && ele.tagName.toUpperCase() == "SCRIPT" ? js.push(ele) : js = ele.getElementsByTagName("script"));
        var arr = [];
        for (i = 0; i < js.length; i++) arr.push(js[i]);
        arr.forEach(function(s, i) {
            if (s.src) return;
            var inner_js = "__inner_js_out_put = [];\n";
            inner_js += s.innerHTML.replace(/document\.write/g, "__inner_js_out_put.push"),
            eval(inner_js);
            if (__inner_js_out_put.length !== 0) {
                var tmp = document.createDocumentFragment(),
                div = document.createElement("div");
                div.innerHTML = __inner_js_out_put.join("");
                while (div.firstChild) tmp.appendChild(div.firstChild);
                s.parentNode.insertBefore(tmp, s)
            }
        })
    },
    _supportUnknownTags = function() {
        var e = document.createElement("div");
        return e.innerHTML = "<TEST_TAG></TEST_TAG>",
        e.firstChild !== null
    } (),
    _supportNamedItemSync = function() {
        return ua.ua.ie < 8 ? !1: !0
    } (),
    _supportPlaceholder = "placeholder" in document.createElement("input"),
    _supportNaturalWH = "naturalWidth" in document.createElement("img"),
    _supportHTML5Forms = "checkValidity" in document.createElement("input"),
    _supportHidden = "hidden" in document.createElement("div"),
    _supportMultipleSubmit = "formAction" in document.createElement("input"),
    _supportSelectionStart = "selectionStart" in document.createElement("input"),
    nativeproperty = function() {
        var e = property(function(t) {
            var n = e.__name__;
            return n = n.replace(/^prop_/, ""),
            t[n]
        },
        function(t, n) {
            var r = e.__name__;
            r = r.replace(/^prop_/, ""),
            t._set(r, n)
        });
        return e
    },
    attributeproperty = function(e, t) {
        var n = property(function(r) {
            t || (t = n.__name__.toLowerCase()),
            t = t.replace(/^prop_/, "");
            var i = r.getAttribute(t);
            return i != null && i !== "undefined" ? i: e
        },
        function(e, r) {
            t || (t = n.__name__.toLowerCase()),
            t = t.replace(/^prop_/, ""),
            r || (r = ""),
            e.setAttribute(t, r)
        });
        return n
    };
    this.getDom = function(e) {
        var t = document.createElement("div"),
        n = document.createDocumentFragment();
        _supportUnknownTags || (t.style.display = "none", document.body.appendChild(t)),
        t.innerHTML = e;
        while (t.firstChild) n.appendChild(wrap(t.firstChild));
        return _supportUnknownTags || t.parentNode.removeChild(t),
        n
    },
    this.ElementClassList = new Class(Array, 
    function() {
        this.initialize = function(e, t) {
            e.length = 0,
            e._ele = t,
            e._loadClasses()
        },
        this._loadClasses = function(e) {
            e._classes = e._ele.className.replace(/^\s+|\s+$/g, "").split(/\s+/)
        },
        this.toggle = function(e, t) {
            if (!t) throw new Error("token不能为空");
            if (typeof t != "string") return;
            e.contains(t) ? e.remove(t) : e.add(t)
        },
        this.add = function(e, t) {
            if (!t) throw new Error("token不能为空");
            if (typeof t != "string") return;
            e.contains(t) || (e._ele.className = (e._ele.className + " " + t).trim(), e._loadClasses())
        },
        this.remove = function(e, t) {
            if (!t) throw new Error("token不能为空");
            if (typeof t != "string") return;
            if (!e.contains(t)) return;
            e._ele.className = e._ele.className.replace(new RegExp(t.trim(), "i"), "").trim(),
            e._loadClasses()
        },
        this.contains = function(e, t) {
            if (!t) throw new Error("token不能为空");
            return typeof t != "string" ? !1: (e._loadClasses(), e._classes.indexOf(t) != -1 ? !0: !1)
        },
        this.item = function(e, t) {
            return e._loadClasses(),
            e._classes[t] || null
        },
        this.toString = function(e) {
            return e._ele.className
        }
    });
    var basicNativeEventNames = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup"];
    this.Element = new Class(function() {
        Class.mixin(this, events.Events),
        this.nativeEventNames = basicNativeEventNames,
        this.initialize = function(e, t) {
            t && (e = document.createElement(t), wrap(e)),
            e.__eventListeners || (e.__eventListeners = {}),
            e.__nativeEvents || (e.__nativeEvents = {}),
            e.classList === undefined && e !== document && e !== window && (e.classList = new exports.ElementClassList(e)),
            e.delegates = {}
        },
        this.prop_hidden = _supportHidden ? nativeproperty() : property(function(e) {
            return e.style.display == "none"
        },
        function(e, t) {
            t == 1 ? (e.style.display !== "none" && (e.__oldDisplay = e.style.display), e.style.display = "none") : e.style.display = e.__oldDisplay || ""
        }),
        this.retrieve = function(e, t, n) {
            var r = get(e.uid);
            return ! (t in r) && n !== undefined && (r[t] = n),
            r[t]
        },
        this.store = function(e, t, n) {
            var r = get(e.uid);
            return r[t] = n,
            e
        },
        this.delegate = function(e, t, n, r, i) {
            function s(e) {
                var n = e.srcElement || e.target;
                do n && exports.Element.get("matchesSelector")(n, t) && r.call(wrap(n), e);
                while (n = n.parentNode)
            }
            var o = t + "_" + n;
            e.delegates || (e.delegates = {}),
            o in e.delegates || (e.delegates[o] = []),
            e.delegates[o].push({
                wrapper: s,
                fn: r
            }),
            s.delegating = !0,
            ua.ua.ie && (n == "mouseleave" ? n = "mouseout": n == "mouseenter" && (n = "mouseover")),
            e.addEvent(n, s, i)
        },
        this.undelegate = function(e, t, n, r, i) {
            var s = t + "_" + n;
            e.delegates || (e.delegates = {});
            if (! (s in e.delegates)) return;
            e.delegates[s].forEach(function(t) {
                if (t.fn === r) {
                    e.removeEvent(n, t.wrapper, i);
                    return
                }
            })
        },
        this.matchesSelector = function(e, t) {
            return e != document && !e.parentNode ? !1: Sizzle.matches(t, [e]).length > 0
        },
        this.getData = function(e, t) {
            return e.getAttribute("data-" + t)
        },
        this.setData = function(e, t, n) {
            return e.setAttribute("data-" + t, n)
        },
        this.setHTML = function(e, t) {
            e.set("innerHTML", t)
        },
        this.setContent = function(e, t) {
            e.setHTML(t)
        },
        this.getElement = function(e, t) {
            return exports.getElement(t, e)
        },
        this.getElements = function(e, t) {
            return exports.getElements(t, e)
        };
        var e = {
            before: function(e, t) {
                var n = t.parentNode;
                n && n.insertBefore(e, t)
            },
            after: function(e, t) {
                var n = t.parentNode;
                n && n.insertBefore(e, t.nextSibling)
            },
            bottom: function(e, t) {
                t.appendChild(e)
            },
            top: function(e, t) {
                t.insertBefore(e, t.firstChild)
            }
        };
        e.inside = e.bottom,
        this.grab = function(t, n, r) {
            return e[r || "bottom"](n, t),
            t
        },
        this.inject = function(t, n, r) {
            return e[r || "bottom"](t, n),
            t
        },
        this.getPrevious = function(e, t) {
            var n = t ? exports.Element.get("matchesSelector") : null,
            r = e;
            while (r = r.previousSibling) {
                if (r.nodeType != 1) continue;
                if (!n || n(r, t)) return wrap(r)
            }
            return null
        },
        this.getAllPrevious = function(e, t) {
            var n = t ? exports.Element.get("matchesSelector") : null,
            r = [],
            i = e;
            while (i = i.previousSibling) {
                if (i.nodeType != 1) continue; (!n || n(i, t)) && r.push(wrap(i))
            }
            return r
        },
        this.getNext = function(e, t) {
            var n = t ? exports.Element.get("matchesSelector") : null,
            r = e;
            while (r = r.nextSibling) {
                if (r.nodeType != 1) continue;
                if (!n || n(r, t)) return wrap(r)
            }
            return null
        },
        this.getAllNext = function(e, t) {
            var n = t ? exports.Element.get("matchesSelector") : null,
            r = [],
            i = e;
            while (i = i.nextSibling) {
                if (i.nodeType != 1) continue; (!n || n(i, t)) && r.push(wrap(i))
            }
            return r
        },
        this.getFirst = function(e, t) {
            var n = t ? exports.Element.get("matchesSelector") : null,
            r = e.childNodes,
            i = r.length;
            for (var s = 0, o; s < i; s++) {
                o = r[s];
                if (o.nodeType != 1) continue;
                if (!n || n(o, t)) return wrap(o)
            }
            return null
        },
        this.getLast = function(e, t) {
            var n = t ? exports.Element.get("matchesSelector") : null,
            r = e.childNodes,
            i = r.length;
            for (var s = i - 1, o; s >= 0; s--) {
                o = r[s];
                if (o.nodeType != 1) continue;
                if (!n || n(o, t)) return wrap(o)
            }
            return null
        },
        this.getParent = function(e, t) {
            if (!t) return wrap(e.parentNode);
            var n = exports.Element.get("matchesSelector"),
            r = e;
            do
            if (n(r, t)) return wrap(r);
            while (r = r.parentNode);
            return null
        },
        this.getParents = function(e, t) {
            var n = t ? exports.Element.get("matchesSelector") : null,
            r = [],
            i = e;
            while (i = i.parentNode) {
                if (i.nodeType != 1) continue; (!n || n(i, t)) && r.push(wrap(i))
            }
            return r
        },
        this.getSiblings = function(e, t) {
            return e.getAllPrevious(t).concat(e.getAllNext(t))
        },
        this.getChildren = function(e, t) {
            var n = t ? exports.Element.get("matchesSelector") : null,
            r = e.childNodes,
            i = r.length,
            s = [];
            for (var o = 0, u; o < i; o++) {
                u = r[o];
                if (u.nodeType != 1) continue; (!n || n(u, t)) && s.push(wrap(u))
            }
            return s
        },
        this.addClass = function(e, t) {
            if (!t) return;
            e.classList.add(t)
        },
        this.removeClass = function(e, t) {
            if (!t) return;
            e.classList.remove(t)
        },
        this.toggleClass = function(e, t) {
            if (!t) return;
            e.classList.toggle(t)
        },
        this.hasClass = function(e, t) {
            return t ? e.classList.contains(t) : !1
        };
        var t = document.documentElement,
        n = t.style.cssFloat == null ? "styleFloat": "cssFloat",
        r = !ua.ua.ie && t.style.opacity != null,
        i = t.style.filter != null,
        s = /alpha\(opacity=([\d.]+)\)/i;
        this.prop_opacity = property(function(e) {
            if (r) return e.style.opacity;
            if (i) {
                var t = e.style.filter || e.currentStyle.filter;
                return t && (opacity = t.match(s)),
                opacity == null || t == null ? 1: opacity[1] / 100
            }
            return e.retrieve("opacity")
        },
        function(e, t) {
            if (r) e.style.opacity = t;
            else if (i) {
                if (!e.currentStyle || !e.currentStyle.hasLayout) e.style.zoom = 1;
                t = parseInt(t * 100),
                t > 100 ? t = 100: t < 0 && (t = 0);
                var n = t == 100 ? "": "alpha(opacity=" + t + ")",
                o = e.style.filter || e.currentStyle.filter || "";
                e.style.filter = s.test(o) ? o.replace(s, n) : o + n
            } else e.store("opacity", t),
            e.style.visibility = t > 0 ? "visible": "hidden"
        }),
        this.setStyle = function(e, t, r) {
            switch (t) {
            case "opacity":
                return e.set("opacity", parseFloat(r));
            case "float":
                t = n;
                break;
            default:

            }
            return t = string.camelCase(t),
            e.style[t] = r,
            null
        },
        this.getStyle = function(e, t) {
            if (ua.ua.ie) {
                t = t == "float" || t == "cssFloat" ? "styleFloat": t;
                var n = e.style[t]; ! n && e.currentStyle && (n = e.currentStyle[t]);
                if (t == "opacity") {
                    if (n = (e.style.filter || "").match(/alpha\(opacity=(.*)\)/)) if (n[1]) return parseFloat(n[1]) / 100;
                    return 1
                }
                return n == "auto" ? t != "width" && t != "height" || e.getStyle("display") == "none" ? n: e["offset" + (t == "width" ? "Width": "Height")] + "px": n
            }
            t = t == "float" ? "cssFloat": t;
            var n = e.style[t];
            if (!n) {
                var r = document.defaultView.getComputedStyle(e, null);
                n = r ? r[t] : null
            }
            return t == "opacity" ? n ? parseFloat(n) : 1: n
        },
        this.dispose = function(e) {
            return e.parentNode ? e.parentNode.removeChild(e) : e
        };
        var o = "address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr noframes noscript ol p pre table ul center dir isindex menu".split(" ");
        this.hide = function(e) {
            e.setData("old-display", e.getStyle("display")),
            e.style.display = "none"
        },
        this.show = function(e) {
            if (e.getStyle("display") != "none") return;
            var t = e.getData("old-display");
            if (t && t != "none") {
                e.style.display = t;
                return
            }
            e.style.display = "";
            if (e.getStyle("display") != "none") return;
            o.indexOf(e.get("tagName").toLowerCase()) != -1 ? e.style.display = "block": e.style.display = "inline"
        },
        this.toggle = function(e) {
            e.getStyle("display") == "none" ? e.show() : e.hide()
        },
        this.prop_innerHTML = property(null, 
        function(e, t) {
            if (_supportUnknownTags) e.innerHTML = t;
            else {
                var n = exports.getDom(t);
                e.innerHTML = "";
                while (n.firstChild) e.appendChild(n.firstChild)
            }
        }),
        this.prop_tagName = property(function(e) {
            return e.tagName.toUpperCase()
        }),
        this.fromString = staticmethod(function(e) {
            var t = document.createElement("div");
            _supportUnknownTags || (t.style.display = "none", document.body.appendChild(t)),
            t.innerHTML = e.trim();
            var n = wrap(t.firstChild);
            return _supportUnknownTags || t.parentNode.removeChild(t),
            n
        }),
        this.position = function(e) {
            if (e.parentNode === null || e.style.display == "none") return ! 1;
            var t = null,
            n = [],
            r;
            if (e.getBoundingClientRect) {
                r = e.getBoundingClientRect();
                var i = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                s = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                return {
                    x: r.left + s,
                    y: r.top + i
                }
            }
            if (document.getBoxObjectFor) {
                r = document.getBoxObjectFor(e);
                var o = e.style.borderLeftWidth ? parseInt(e.style.borderLeftWidth) : 0,
                u = e.style.borderTopWidth ? parseInt(e.style.borderTopWidth) : 0;
                n = [r.x - o, r.y - u]
            } else {
                n = [e.offsetLeft, e.offsetTop],
                t = e.offsetParent;
                if (t != e) while (t) n[0] += t.offsetLeft,
                n[1] += t.offsetTop,
                t = t.offsetParent;
                if (ua.ua.opera || ua.ua.safari && e.style.position == "absolute") n[0] -= document.body.offsetLeft,
                n[1] -= document.body.offsetTop
            }
            t = e.parentNode || null;
            while (t && t.tagName != "BODY" && t.tagName != "HTML") n[0] -= t.scrollLeft,
            n[1] -= t.scrollTop,
            t = t.parentNode;
            return {
                x: n[0],
                y: n[1]
            }
        }
    }),
    this.ImageElement = new Class(exports.Element, 
    function() {
        function e(e) {
            var t = new Image;
            return t.src = e.src,
            {
                width: t.width,
                height: t.height
            }
        }
        this.nativeEventNames = basicNativeEventNames.concat(["error", "abort"]),
        this.prop_naturalWidth = property(function(t) {
            return _supportNaturalWH ? t.naturalWidth: e(t).width
        }),
        this.prop_naturalHeight = property(function(t) {
            return _supportNaturalWH ? t.naturalHeight: e(t).height
        })
    }),
    this.FormElement = new Class(exports.Element, 
    function() {
        this.nativeEventNames = basicNativeEventNames.concat(["reset", "submit"]),
        this.initialize = function(e) {
            this.parent(e);
            if (e.elements) for (var t = 0; t < e.elements.length; t++) wrap(e.elements[t]);
            _supportNamedItemSync || (e.elements.namedItem = function(t) {
                return Sizzle("*[name=" + t + "]", e)[0]
            }),
            _supportMultipleSubmit || e.addNativeEvent("submit", 
            function(t) {
                if (!e.__submitButton) return;
                var n = e.__submitButton;
                e.__submitButton = null;
                var r = e.action,
                i = e.method,
                s = e.encoding || e.enctype,
                o = e.noValidate,
                u = e.target,
                a = n.getAttribute("formaction"),
                f = n.getAttribute("formmethod"),
                l = n.getAttribute("formenctype"),
                c = n.getAttribute("formnovalidate"),
                h = n.getAttribute("formtarget");
                a && (e.action = a),
                f && (e.method = f),
                l && (e.enctype = e.encoding = l),
                c && (e.formNoValidate = c),
                h && (e.target = h);
                var p = t.getPreventDefault ? t.getPreventDefault() : t.defaultPrevented;
                p || (t.preventDefault(), e.submit()),
                ua.ua.webkit <= 534.3 ? setTimeout(function() {
                    e.action = r,
                    e.method = i,
                    e.enctype = e.encoding = s,
                    e.formNoValidate = o,
                    e.target = u
                },
                0) : (e.action = r, e.method = i, e.enctype = e.encoding = s, e.formNoValidate = o, e.target = u)
            })
        },
        this.createRequest = function(e, t) {
            t || (t = {}),
            t.method || (t.method = e.method),
            t.url || (t.url = e.action),
            t.data || (t.data = e.toQueryString()),
            t.onsuccess || (t.onsuccess = function(t) {
                e.fireEvent("requestSuccess", {
                    request: t.request
                })
            }),
            t.onerror || (t.onerror = function(t) {
                e.fireEvent("requestError", {
                    request: t.request
                })
            });
            if (!net) throw new object.ModuleRequiredError("net", module);
            return xhr = new net.Request(t),
            xhr
        },
        this.send = function(e, t) {
            var n = e.createRequest();
            return n.send(t),
            n
        },
        this.toQueryString = function(e) {
            function n(e, n) {
                typeof n != "undefined" && t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
            }
            var t = [];
            return e.getElements("input, select, textarea, output").forEach(function(e) {
                var t = e.type;
                if (!e.name || e.disabled || t == "submit" || t == "reset" || t == "file" || t == "image") return;
                e.tagName.toLowerCase() == "select" ? e.getSelected().map(function(t) {
                    var r = wrap(t).get("value");
                    n(e.name, r)
                }) : t == "radio" || t == "checkbox" ? e.checked && n(e.name, e.get("value")) : n(e.name, e.get("value"))
            }),
            t.join("&")
        },
        this.checkValidity = function(e) {
            return e.getElements("input, select, textarea, output").every(function(e) {
                return e.checkValidity()
            })
        }
    }),
    this.FormItemElement = new Class(exports.Element, 
    function() {
        this.nativeEventNames = basicNativeEventNames.concat(["focus", "blur", "change", "select", "paste"]),
        this.required = _supportHTML5Forms ? nativeproperty() : attributeproperty(!1),
        this.pattern = _supportHTML5Forms ? nativeproperty() : attributeproperty(""),
        this.maxlength = nativeproperty(),
        this.type = _supportHTML5Forms ? nativeproperty() : attributeproperty("text"),
        this.min = _supportHTML5Forms ? nativeproperty() : attributeproperty(""),
        this.max = _supportHTML5Forms ? nativeproperty() : attributeproperty(""),
        this.selectionStart = property(function(e) {
            try {
                if (typeof e.selectionStart == "number") return e.selectionStart
            } catch(t) {
                return - 1
            }
            if (document.selection) {
                var n = document.selection.createRange();
                return n == null || n.parentElement() != e ? e.__selectionPos ? e.__selectionPos.start: -1: calculateSelectionPos(e).start
            }
            return - 1
        }),
        this.selectionEnd = property(function(e) {
            try {
                if (typeof e.selectionEnd == "number") return e.selectionEnd
            } catch(t) {
                return - 1
            }
            if (document.selection) {
                var n = document.selection.createRange();
                return n == null || n.parentElement() != e ? e.__selectionPos ? e.__selectionPos.end: -1: calculateSelectionPos(e).end
            }
            return - 1
        }),
        this.getSelected = function(e) {
            e.selectedIndex;
            var t = [];
            for (var n = 0; n < e.options.length; n++) e.options[n].selected && t.push(e.options[n]);
            return t
        },
        this.prop_value = property(function(e) {
            return e.classList.contains("placeholder") ? "": e.value
        },
        function(e, t) {
            e.classList.contains("placeholder") && (e.classList.remove("placeholder"), e.removeAttribute("autocomplete"), e.value = ""),
            e.value = t,
            !_supportPlaceholder && !e.value && e.getAttribute("placeholder") && (e.classList.add("placeholder"), e.value = e.getAttribute("placeholder"), e.setAttribute("autocomplete", "off")),
            e.checkValidity()
        }),
        this.validity = _supportHTML5Forms ? property(function(e) {
            return e.validity
        }) : property(function(e) {
            var t = e.get("value"),
            n = {
                valueMissing: function() {
                    var n = e.getAttribute("required");
                    return n && n != "undefined" ? t ? !1: !0: !1
                } (),
                typeMismatch: function(e) {
                    return e == "url" ? !/^\s*(?:(\w+?)\:\/\/([\w-_.]+(?::\d+)?))(.*?)?(?:;(.*?))?(?:\?(.*?))?(?:\#(\w*))?$/i.test(t) : e == "tel" ? !/[^\r\n]/i.test(t) : e == "email" ? !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(t) : !1
                } (e.getAttribute("type")),
                patternMismatch: function() {
                    var n = e.get("pattern");
                    return n ? !(new RegExp("^" + n + "$")).test(t) : !1
                } (),
                tooLong: function() {
                    var n = e.get("maxlength"),
                    r = Number(n);
                    return r != n ? !1: t.length > r
                } (),
                customError: !!e.__customValidity,
                rangeUnderflow: !1,
                rangeOverflow: !1,
                stepMismatch: !1
            };
            return n.valid = ["valueMissing", "typeMismatch", "patternMismatch", "tooLong", "rangeUnderflow", "rangeOverflow", "stepMismatch", "customError"].every(function(e) {
                return n[e] === !1
            }),
            e.__validationMessage = function() {
                if (n.valid) return "";
                if (n.customError) return e.__customValidity;
                if (n.valueMissing) return "请填写此字段。";
                if (n.typeMismatch) return "请输入一个" + e.getAttribute("type") + "。";
                if (n.patternMismatch) return "请匹配要求的格式。";
                if (n.tooLong) return "请将该文本减少为 " + e.get("maxlength") + " 个字符或更少（您当前使用了" + e.get("value").length + "个字符）。";
                if (n.rangeUnderflow) return "值必须大于或等于" + e.getAttribute("min") + "。";
                if (n.rangeOverflow) return "值必须小于或等于" + e.getAttribute("max") + "。";
                if (n.stepMismatch) return "值无效。"
            } (),
            e._set("validationMessage", e.__validationMessage),
            e._set("validity", n),
            n
        }),
        this.validationMessage = _supportHTML5Forms ? property(function(e) {
            return e.validationMessage
        }) : property(function(e) {
            return e.get("validity"),
            e.__validationMessage
        }),
        _supportHTML5Forms || (this.setCustomValidity = function(e, t) {
            e.__customValidity = t,
            e.get("validity")
        },
        this.checkValidity = function(e) {
            return e.get("validity"),
            e.validity.valid
        }),
        this.focusToPosition = function(e, t) {
            t === undefined && (t = e.get("value").length);
            if (e.setSelectionRange) e.focus(),
            e.setSelectionRange(e.get("value").length, t);
            else if (e.createTextRange) {
                var n = e.createTextRange();
                n.moveStart("character", t),
                n.collapse(!0),
                n.select(),
                e.focus()
            } else e.focus()
        }
    }),
    this.TextBaseElement = new Class(exports.FormItemElement, 
    function() {
        this.initialize = function(e) {
            this.parent(e),
            _supportPlaceholder || e.bindPlaceholder(),
            _supportSelectionStart || e.addEvent("beforedeactivate", 
            function() {
                e.__selectionPos = calculateSelectionPos(e)
            })
        },
        this.prop_placeholder = property(function(e) {
            return e.getAttribute("placeholder")
        },
        function(e, t) {
            e.setAttribute("placeholder", t),
            _supportPlaceholder || (e.bindPlaceholder(), e.get("placeholding") && (e.value = t))
        }),
        this.prop_placeholding = property(function(e) {
            return e.classList.contains("placeholder")
        },
        function(e, t) {
            t ? (e.classList.add("placeholder"), e.setAttribute("autocomplete", "off")) : (e.classList.remove("placeholder"), e.removeAttribute("autocomplete"))
        }),
        this.bindPlaceholder = function(e) {
            function t(t) {
                var n = e.get("placeholder");
                if (!n) return;
                if (e.get("placeholding")) t.type == "focus" && e.value === n && (e.value = ""),
                e.set("placeholding", !1);
                else if (!e.value || (ua.ua.ie == 6 || ua.ua.ie == 7) && !t && e.value == n) e.set("placeholding", !0),
                e.value = n
            }
            if (e._binded) return;
            e._binded = !0,
            e.addNativeEvent("focus", 
            function(e) {
                return t(e)
            }),
            e.addNativeEvent("blur", 
            function(e) {
                return t(e)
            }),
            e.form && wrap(e.form).addNativeEvent("submit", 
            function() {
                e.classList.contains("placeholder") && (e.set("placeholding", !1), e.value = "", setTimeout(function() {
                    t()
                },
                0))
            }),
            t()
        }
    }),
    this.InputElement = new Class(exports.TextBaseElement, 
    function() {
        this.prop_formAction = _supportMultipleSubmit ? nativeproperty() : attributeproperty(""),
        this.prop_formEnctype = _supportMultipleSubmit ? nativeproperty() : attributeproperty("application/x-www-form-urlencoded"),
        this.prop_formMethod = _supportMultipleSubmit ? nativeproperty() : attributeproperty("get"),
        this.prop_formNoValidate = _supportMultipleSubmit ? nativeproperty() : attributeproperty(!1),
        this.prop_formTarget = _supportMultipleSubmit ? nativeproperty() : attributeproperty(""),
        this.initialize = function(e) {
            this.parent(e),
            !_supportMultipleSubmit && e.type == "submit" && e.addNativeEvent("click", 
            function(t) {
                var n = e.getAttribute("formaction");
                n && n != "undefined" && (e.form.__submitButton = e)
            })
        },
        this.send = function(e, t) {
            if (e.type != "submit") return;
            var n = e.getAttribute("formaction"),
            r = e.getAttribute("formmethod"),
            i = e.form.createRequest({
                method: r || e.form.method,
                url: n || e.form.action,
                onsuccess: function(t) {
                    e.fireEvent("requestSuccess", {
                        request: t.request
                    })
                },
                onerror: function(t) {
                    e.fireEvent("requestError", {
                        request: t.request
                    })
                }
            });
            return i.send(t),
            i
        }
    }),
    this.TextAreaElement = new Class(exports.TextBaseElement, 
    function() {}),
    this.Window = new Class(exports.Element, 
    function() {
        this.nativeEventNames = basicNativeEventNames.concat(["load", "unload", "beforeunload", "resize", "move", "DomContentLoaded", "readystatechange", "scroll", "mousewheel", "DOMMouseScroll"])
    }),
    this.Document = new Class(exports.Element, 
    function() {
        this.nativeEventNames = basicNativeEventNames.concat(["load", "unload", "beforeunload", "resize", "move", "DomContentLoaded", "readystatechange", "scroll", "mousewheel", "DOMMouseScroll"])
    }),
    this.Elements = new Class(Array, 
    function() {
        this.initialize = function(e, t, n) {
            for (var r = 0; r < t.length; r++) e.push(wrap(t[r]));
            n = e[0] ? getWrapper(e[0].nodeName) : exports.Element,
            Class.keys(n).forEach(function(t) {
                if (typeof n.get(t) != "function") return;
                e[t] = function() {
                    var n;
                    for (var r = 0; r < e.length; r++) n = e[r],
                    typeof n[t] == "function" && n[t].apply(e[r], [].slice.call(arguments, 0))
                }
            }),
            e.set = function(t, n) {
                for (var r = 0; r < e.length; r++) e[r].set(t, n)
            },
            e.get = function(t) {
                var n = [];
                for (var r = 0; r < e.length; r++) n.push(e[r].get(t));
                return n
            }
        }
    });
    var _tagMap = {
        IMG: exports.ImageElement,
        FORM: exports.FormElement,
        INPUT: exports.InputElement,
        TEXTAREA: exports.TextAreaElement,
        OUTPUT: exports.FormItemElement,
        SELECT: exports.FormItemElement,
        OPTION: exports.FormItemElement,
        BUTTON: exports.FormItemElement
    }
}),
object.add("./net.js", "dom, events", 
function(e, t, n) {
    var r = window.__ajaxProxies;
    r || (r = window.__ajaxProxies = {}),
    this.ajaxRequest = function(e, n) {
        if (!e || typeof e != "string" || e.trim().length == 0) return;
        if (!n || typeof n != "function") n = function() {};
        var i = document.createElement("a");
        i.href = e;
        var s = i.hostname,
        o = i.protocol;
        if (s && s != location.hostname) {
            var u = null;
            if (r[s])(function() {
                r[s].loaded ? n(r[s].contentWindow.getTransport()) : setTimeout(arguments.callee, 100)
            })();
            else {
                var a = document.createElement("iframe"),
                f;
                a.style.display = "none",
                t.ready(function() {
                    r[s] = a,
                    a.loaded = !1,
                    document.body.insertBefore(a, document.body.firstChild),
                    a.src = o + "//" + s + "/ajaxproxy.htm",
                    t.wrap(a).addEvent("load", 
                    function() {
                        if (a.contentWindow.location.href !== a.src) a.contentWindow.location.href = a.src;
                        else {
                            a.loaded = !0;
                            try {
                                f = a.contentWindow.getTransport()
                            } catch(t) {
                                throw new Error("message : " + t.message + " from url : " + e)
                            }
                            n(f)
                        }
                    })
                })
            }
        } else if (window.ActiveXObject) try {
            n(new ActiveXObject("Msxml2.XMLHTTP"))
        } catch(l) {
            n(new ActiveXObject("Microsoft.XMLHTTP"))
        } else n(new XMLHttpRequest)
    },
    this.ping = function(e) {
        var t = "_net_ping_" + (new Date).getTime(),
        n = window[t] = new Image;
        n.onload = n.onerror = function() {
            window[t] = null
        },
        n.src = e,
        n = null
    },
    this.Request = new Class(function() {
        this.__mixins__ = [n.Events],
        this.initialize = function(e, t) {
            if (window._developer_no_ajax) return;
            t = t || {},
            e.url = t.url || "",
            e.method = t.method || "get",
            e.timeout = t.timeout && t.timeout > 0 ? t.timeout: 0,
            e.headers = t.headers || {},
            e.data = t.data || null,
            e._xhr = null,
            e.urlMapper && (e.url = e.urlMapper(e.url, e.method) || e.url),
            e.onSuccess = t.onSuccess,
            e.onsuccess = t.onsuccess,
            e.onerror = t.onerror,
            e.oncomplete = t.oncomplete
        },
        this.send = function(t, n) {
            e.ajaxRequest(t.url, 
            function(e) {
                var r = !1;
                t._xhr = e;
                var i = {
                    request: t
                };
                e.onreadystatechange = function() {
                    var e = t._xhr;
                    if (e.readyState === 4) {
                        if (r) return;
                        t._timer && (clearTimeout(t._timer), t._timer = null),
                        t.responseText = e.responseText,
                        t.responseXML = e.responseXML;
                        if (t.requestBlocker && t.requestBlocker.block && t.requestBlocker.block(e)) {
                            t.requestBlocker.handle(e);
                            return
                        }
                        i.responseText = e.responseText,
                        i.responseXML = e.responseXML,
                        e.status === undefined || e.status === 0 || e.status >= 200 && e.status < 300 ? (t.fireEvent("success", i), t.onSuccess && t.onSuccess(i)) : t.fireEvent("error", i),
                        t.fireEvent("complete", i)
                    }
                };
                var e = t._xhr,
                s = t.url;
                n || (n = t.data),
                n && t.method == "get" && (s += (s.indexOf("?") != -1 ? "&": "?") + n, n = null),
                e.open(t.method, s, !0),
                e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                for (var o in t.headers) e.setRequestHeader(o, t.headers[o]);
                t.headers["X-Requested-With"] || e.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                t.timeout && (t._timer = setTimeout(function() {
                    r = !0,
                    t.abort(),
                    t.fireEvent("timeout", i),
                    t.fireEvent("complete", i)
                },
                t.timeout)),
                t._xhr.send(n)
            })
        },
        this.abort = function(e) {
            e._xhr && e._xhr.abort(),
            e._timer && (clearTimeout(e._timer), e._timer = null)
        },
        this.getResponseHeader = function(e, t) {
            return e._xhr.getResponseHeader(t)
        },
        this.setHeader = function(e, t, n) {
            e.headers[t] = n
        }
    })
}),
object.add("./mvc.js", "events", 
function(e, t) {
    this.Action = new Class(t.Events, 
    function() {
        this.initialize = function(e) {
            t.Events.initialize(e),
            e.view = null
        },
        this.execute = function(e, t) {
            e.view = t,
            t.load(e)
        }
    })
}),
object.add("./urlparse.js", 
function(e) {
    function r(e, t, n, r) {
        var i = t.length;
        for (var s = 0, o = t.length; s < o; s++) if (n.indexOf(t.charAt(s)) != -1 && s < i) {
            i = s;
            break
        }
        return e.got = t.substring(0, i),
        e.remained = r ? t.substring(i) : t.substring(i + 1),
        e
    }
    function i(e, n) {
        if (typeof e != "string") return ["", "", "", "", "", ""];
        var i = "",
        s = "",
        o = "",
        u = "",
        a = "",
        f = "",
        l = 0;
        l = e.indexOf(":");
        if (l > 0) if (e.substring(0, l) == "http") i = e.substring(0, l).toLowerCase(),
        e = e.substring(l + 1);
        else {
            for (var l = 0, c = e.length; l < c; l++) if (t.indexOf(e.charAt(l)) == -1) break;
            i = e.substring(0, l),
            e = e.substring(l + 1)
        } ! i && n && (i = n);
        var h = {};
        return e.substring(0, 2) == "//" && (r(h, e.substring(2), "/?#", !0), s = h.got, e = h.remained),
        e.indexOf("#") != -1 && (r(h, e, "#"), e = h.got, f = h.remained),
        e.indexOf("?") != -1 && (r(h, e, "?"), e = h.got, a = h.remained),
        e.indexOf(";") != -1 && (r(h, e, ";"), o = h.got, u = h.remained),
        o || (o = e),
        [i, s, o, u, a, f]
    }
    function s(e) {
        if (!e) return "";
        var t = "";
        return e[0] && (t += e[0] + "://" + e[1]),
        e[1] && e[2] && e[2].indexOf("/") != 0 && (t += "/"),
        t += e[2],
        e[3] && (t += ";" + e[3]),
        e[4] && (t += "?" + e[4]),
        e[5] && (t += "#" + e[5]),
        t
    }
    function o(e, t) {
        if (!e) return t;
        if (!t) return e;
        t = String(t),
        e = String(e);
        var r = i(e),
        o = i(t, r[0]);
        if (o[0] != r[0]) return t;
        if (o[1]) return s(o);
        o[1] = r[1];
        if (o[2].charAt(0) == "/") return s(o);
        if (!o[2] && !o[3]) return o[2] = r[2],
        o[3] = r[3],
        o[4] || (o[4] = r[4]),
        s(o);
        var u = r[2].split("/").slice(0, -1).concat(o[2].split("/"));
        u[u.length - 1] == "." && (u[u.length - 1] = "");
        for (var a = 0, f = u.length; a < f; a++) u[a] == "." && (u.splice(a, 1), a--);
        var a;
        for (;;) {
            a = 1,
            n = u.length - 1;
            while (a < n) {
                if (u[a] == ".." && ["", ".."].indexOf(u[a - 1]) == -1) {
                    u.splice(a - 1, 2);
                    break
                }
                a++
            }
            if (a >= n) break
        }
        return u.length == 2 && u[0] == "" && u[1] == ".." ? u[u.length - 1] = "": u.length >= 2 && u[u.length - 1] == ".." && (u.pop(), u.pop(), u.push("")),
        o[2] = u.join("/"),
        s(o)
    }
    var t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.";
    e.urlparse = i,
    e.urlunparse = s,
    e.urljoin = o
}),
object.add("./validator.js", 
function(e) {
    this.isUrl = function(e) {
        return /^(?:(\w+?)\:\/\/([\w-_.]+(?::\d+)?))(.*?)?(?:;(.*?))?(?:\?(.*?))?(?:\#(\w*))?$/i.test(e)
    },
    this.isEmail = function(e) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(e)
    },
    this.isIP = function(e) {
        return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.i.test(e)
    }
}),
object.addPath && object.addPath("http://a.xnimg.cn/"),
object.add("ua/extra.js", "sys", 
function(e, t) {
    function i(e) { ! e && typeof e != "string" && (e = navigator.userAgent);
        var t,
        r,
        i = {},
        s = n.numberify,
        o = function(e) {
            try {
                return window.external[e]
            } catch(t) {
                return null
            }
        };
        if (t = e.match(/360SE/) || o("twGetRunPath") && window.external.twGetRunPath().indexOf("360se.exe") != -1) i[r = "se360"] = 3;
        else if (t = e.match(/Maxthon|MAXTHON/) || o("max_version")) {
            r = "maxthon";
            try {
                i[r] = s(window.external.max_version)
            } catch(u) {
                i[r] = 0
            }
        } else if (t = e.match(/TencentTraveler\s([\d\.]*)/)) i[r = "tt"] = t[1] ? s(t[1]) : 0;
        else if (t = e.match(/TheWorld/)) i[r = "theworld"] = 3;
        else if (t = e.match(/SE\s([\d\.]*)/)) i[r = "sogou"] = t[1] ? s(t[1]) : 0;
        else if (t = e.match(/QQBrowser.([\d\.]*)/)) i[r = "qqbrowser"] = t[1] ? s(t[1]) : 0;
        return r && (i.shell = r),
        i
    }
    var n = t.modules.ua;
    if (n) {
        this.__detectUAExtra = i;
        var r = i();
        object.extend(n.ua, r)
    }
}),
object.add("ua/os.js", "sys", 
function(e, t) {
    function s(e, t) {
        return t = t.replace(/\b[a-z]/g, 
        function(e) {
            return e.toUpperCase()
        }),
        Object.prototype.toString.call(e) == "[object " + t + "]"
    }
    function o(e, t) {
        if (!e) throw new Error(t)
    }
    function u(e, t) {
        if (e == null) throw new Error(t)
    }
    function a(e) {
        e = e || navigator.userAgent,
        e = e.toLowerCase();
        var t = [{
            core: "windowsnt",
            match: function(e) {
                return /windows\snt/.test(e) && !/xblwp7/.test(e)
            },
            versionRule: /windows nt\s([\.\d]*)/
        },
        {
            core: "windowsnt",
            match: /windows\sxp/,
            version: 5.1
        },
        {
            core: "windowsnt",
            match: /windows\s2000/,
            version: 5
        },
        {
            core: "windowsnt",
            match: /winnt/,
            version: 4
        },
        {
            core: "windows",
            match: /windows me/,
            version: "me"
        },
        {
            core: "windows",
            match: /windows 98|win98/,
            version: "98"
        },
        {
            core: "windows",
            match: /windows 95|win95/,
            version: "95"
        },
        {
            core: "windows",
            match: /win16/,
            version: "3.1"
        },
        {
            core: "windows/phone",
            match: /windows\sphone/,
            versionRule: /windows phone os ([\d\.]*)/
        },
        {
            core: "windows/phone",
            match: /xblwp7/,
            version: 7
        },
        {
            core: "windows/mobile",
            match: /windows mobile|wce|windows ce|pocket pc|wince/,
            versionRule: /iemobile ([\.\d]*)/
        },
        {
            core: "windows",
            match: /win/,
            version: "unknown"
        },
        {
            core: "android",
            match: /\sandroid/,
            versionRule: /android ([^\s]*);/
        },
        {
            core: "linux/debian",
            match: /debian/,
            versionRule: /debian[\s\/-]([\.\d]*)/
        },
        {
            core: "linux/redhat",
            match: /red\shat/,
            versionRule: /red hat[\s\/-]([\.\d]*)/
        },
        {
            core: "linux/fedora",
            match: /fedora/,
            versionRule: /fedora[\s\/-]([\.\d]*)/
        },
        {
            core: "linux/ubuntu",
            match: /ubuntu/,
            versionRule: /ubuntu[\s\/-]([\.\d]*)/
        },
        {
            core: "linux/suse",
            match: /suse/,
            versionRule: /suse[\s\/-]([\.\d]*)/
        },
        {
            core: "linux/mint",
            match: /mint/,
            versionRule: /mint[\s\/-]([\.\d]*)/
        },
        {
            core: "linux/centos",
            match: /centos/,
            versionRule: /centos[\s\/-]([\.\d]*)/
        },
        {
            core: "linux/gentoo",
            match: /gentoo/,
            version: "unknown"
        },
        {
            core: "linux",
            match: /linux/,
            version: "unknown"
        },
        {
            core: "chromeos",
            match: /cros/,
            version: "unknown"
        },
        {
            core: "unix/sunos",
            match: /sunos/,
            version: "unknown"
        },
        {
            core: "unix/freebsd",
            match: /freebsd/,
            version: "unknown"
        },
        {
            core: "unix/openbsd",
            match: /openbsd/,
            version: "unknown"
        },
        {
            core: "unix/aix",
            match: /aix/,
            version: "unknown"
        },
        {
            core: "unix/hp_ux",
            match: /hp-ux/,
            version: "unknown"
        },
        {
            core: "unix",
            match: /x11/,
            version: "unknown"
        },
        {
            core: "macos",
            match: /mac_powerpc|ppc/,
            version: "ppc"
        },
        {
            core: "macos",
            match: /intel/,
            version: "intel"
        },
        {
            core: "macos",
            match: /mac_68000|68k/,
            version: "68k"
        },
        {
            core: "ios",
            match: function(e) {
                return /applewebkit/.test(e) && / mobile\//.test(e) && /like/.test(e)
            },
            versionRule: /os ([\_\.\d]*)/
        },
        {
            core: "macos",
            match: /mac/,
            version: "unknown"
        },
        {
            core: "os2",
            match: function(e) {
                return /os\/2|ibm-webexplorer/.test(e) || navigator.appVersion.indexOf("os/2") != -1
            },
            version: "unknown"
        },
        {
            core: "symbian",
            match: /symbian|s60|symbos|symbianos|series40|series60|nokian/,
            versionRule: /symbian(?:os)?\/([\d\.]*);/
        },
        {
            core: "blackberry",
            match: /blackberry|rim\stablet\sos/,
            versionRule: /(?:version\/|blackberry[\d]{4}\/)([\d\.]*)/
        },
        {
            core: "webos",
            match: /webos/,
            versionRule: /webos\/([^\s]*);/
        },
        {
            core: "palmos",
            match: /palmos/,
            version: "unknown"
        }],
        n = {};
        for (var i = 0, a = t.length, f, l = !1; i < a; i++) {
            f = t[i];
            var c = f.match;
            o(s(c, "RegExp") || s(c, "Function"), "match rule should be regexp or function"),
            s(c, "RegExp") ? l = c.test(e) : s(c, "Function") && (l = c(e), u(l, "match function must return true/false"));
            if (!l) continue;
            var h = null,
            p = f.core.split("/"),
            d = p.length;
            if (d > 1) {
                n.oscore = p[0],
                h = n;
                for (var v = 0; v < d - 1; v++) h = h[p[v]] = {}
            } else n.oscore = f.core;
            var m = f.version || "unknown";
            f.versionRule && (o(s(f.versionRule, "RegExp"), "version rule should be regexp"), v = e.match(f.versionRule), v && v[1] && (m = r(v[1]))),
            h ? h[p[d - 1]] = m: n[n.oscore] = m;
            break
        }
        n.ios && (v = e.match(/ipad|ipod|iphone/), v && v[0] && (n[v[0]] = n.ios)),
        navigator && navigator.cajaVersion && (n.caja = navigator.cajaVersion),
        l || (n.oscore = "unknown"),
        /wow64|x64|win64|ia64|x86_64|amd64|sparc64|ppc64/.test(e) ? n.processor = 64: n.processor = 32,
        window.devicePixelRatio >= 2 ? n.resolution = {
            width: screen.width * window.devicePixelRatio,
            height: screen.height * window.devicePixelRatio
        }: n.resolution = {
            width: screen.width,
            height: screen.height
        };
        var g = typeof window.orientation != "undefined" ? !0: !1;
        return g ? window.innerWidth != undefined ? n.orientation = window.innerWidth > window.innerHeight ? "landscape": "profile": n.orientation = window.screen.width > window.screen.height ? "landscape": "profile": n.orientation = "unknown",
        n
    }
    var n = t.modules.ua,
    r = function(e) {
        var t = 0;
        return parseFloat(e.replace(/_/g, ".").replace(/\./g, 
        function() {
            return t++===0 ? ".": ""
        }))
    };
    if (n) {
        this._detectOS = a;
        var i = a(navigator.userAgent.toLowerCase());
        object.extend(e, i)
    }
}),
object.add("ua/flashdetect.js", 
function(e) {
    this.getFlashVersion = function() {
        var e = !1;
        if (navigator.plugins && navigator.mimeTypes.length) {
            var t = navigator.plugins["Shockwave Flash"];
            t && t.description && (e = t.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")[0])
        } else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
            var n = 1,
            r = 3;
            while (n) try {
                r++,
                n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + 
                r),
                e = r
            } catch(i) {
                n = null
            }
        } else {
            try {
                var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
            } catch(i) {
                try {
                    var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    e = 6,
                    n.AllowScriptAccess = "always"
                } catch(i) {
                    if (e == 6) return e
                }
                try {
                    n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                } catch(i) {}
            }
            n != null && (e = n.GetVariable("$version").split(" ")[1].split(",")[0])
        }
        return e
    }
}),
object.define("xn.net", "sys, net", 
function(require, e) {
    var t = require("sys"),
    n = require("net"),
    r = n.Request.prototype.send;
    n.Request.set("send", 
    function(e, t) {
        t = t || e.data || "",
        e.method == "post" && CX.get_check && !/[\?|\&]requestToken=/.test(t) && (t += (t ? "&": "") + "requestToken=" + CX.get_check),
        e.method == "post" && CX.get_check_x && !/[\?|\&]_rtk=/.test(t) && (t += (t ? "&": "") + "_rtk=" + CX.get_check_x),
        r.call(e, t)
    }),
    this.Request = n.Request
}),
object.define("jxn", "dom, string, net, xn.net, ua", 
function(require, e) {
    require("xn.net");
    var t = Object.prototype.toString,
    n = Array.prototype.slice,
    r = require("dom"),
    i = require("net"),
    s = require("ua"),
    o = require("string"),
    u = /^<[\w\W]+>/,
    a = /^<([\w]+)>$/,
    f = function() {},
    l = !1,
    c = function() {},
    h = typeof console != "undefined" ? console: {
        log: f,
        error: f,
        warn: f
    },
    p = function(e, t) {
        var n,
        i = null,
        s,
        o,
        u,
        a,
        f;
        if (p.isJxnNode(e)) return e;
        if (p.isString(e)) {
            e = p.trim(e);
            if (p.isHTMLTag(e)) n = document.createElement(RegExp.$1),
            i = [n];
            else if (p.isHTMLString(e)) {
                i = r.getDom(e).childNodes,
                o = [];
                for (u = 0, a = i.length; u < a; u++) p.isDomNode(i[u]) && (o[o.length] = i[u]);
                i = o
            } else e.toLowerCase() == "body" || e.toLowerCase() == "html" ? i = Sizzle(e) : (t = t || document.body, p.isJxnNode(t) && (t = t[0]), i = Sizzle(e, t))
        } else {
            if (p.isFunction(e)) {
                r.ready(e);
                return
            }
            if (p.isAcceptableElement(e)) i = [e];
            else if (p.isArray(e)) {
                i = e;
                for (u = 0, a = i.length; u < a; u++) if (!p.isAcceptableElement(i[u])) {
                    f = "array elements should be all dom nodes",
                    i[u].nodeType == 3 && (f += ", text node(nodeType = 3) is not acceptable"),
                    p.error(f);
                    return
                }
            }
        }
        s = new c;
        var l = i ? i.length: 0;
        s.length = l;
        for (u = 0; u < l; u++) s[u] = i[u];
        return s
    };
    return p.extend = function(e, t) {
        typeof t == "undefined" && (t = e, e = p);
        var n;
        for (n in t) t.hasOwnProperty(n) && (e[n] = t[n])
    },
    p.extend({
        errors: [],
        warns: [],
        logs: [],
        consoleClean: function(e) {
            l = e
        },
        resetLogs: function() {
            p.errors.length = 0,
            p.warns.length = 0,
            p.logs.length = 0
        },
        error: function() {
            var e = n.call(arguments);
            p.errors.push(e.join(",")),
            !l && h.error(e)
        },
        log: function() {
            var e = n.call(arguments);
            p.logs.push(e.join(",")),
            !l && h.log(e)
        },
        warn: function() {
            var e = n.call(arguments);
            p.warns.push(e.join(",")),
            !l && h.warn(e)
        },
        slice: n,
        isInDomTree: function(e) {
            return !! r.wrap(e).getParent("body")
        },
        isDomNode: function(e) {
            return e && e.nodeType == 1
        },
        isAcceptableElement: function(e) {
            return e && (e.nodeType == 1 || e.nodeType == 9 || e == window)
        },
        isFunction: function(e) {
            return t.call(e) == "[object Function]"
        },
        isUndefined: function(e) {
            return typeof e == "undefined"
        },
        isObject: function(e) {
            return e && t.call(e) == "[object Object]"
        },
        isArray: function(e) {
            return t.call(e) == "[object Array]"
        },
        isString: function(e) {
            return typeof e == "string"
        },
        isRegExp: function(e) {
            return t.call(e) == "[object RegExp]"
        },
        isBoolean: function(e) {
            return e && t.call(e) == "[object Boolean]"
        },
        isNumber: function(e) {
            return typeof e == "number"
        },
        trim: function(e) {
            return e ? e.replace(/^\s+|\s+$/g, "") : e
        },
        isHTMLString: function(e) {
            return p.isString(e) && u.test(e)
        },
        isHTMLTag: function(e) {
            return p.isString(e) && a.test(e)
        },
        isDocument: function(e) {
            return e && e.nodeType === 9
        },
        isWindow: function(e) {
            return e && typeof e == "object" && "setInterval" in e && p.isDocument(e.document)
        },
        getNumber: function(e) {
            return parseFloat(e, 10)
        },
        getWindow: function(e) {
            return p.isWindow(e) ? e: e.nodeType === 9 ? e.defaultView || e.parentWindow: !1
        },
        isJxnNode: function(e) {
            return e && e.constructor == c
        },
        forEach: function(e, t) {
            var n,
            r,
            i;
            if (p.isArray(e)) for (n = 0, r = e.length; n < r; n++) t.call(e, e[n], n);
            else if (p.isObject(e)) for (i in e) {
                if (!e.hasOwnProperty(i)) continue;
                t.call(e, i, e[i])
            }
        },
        registerPlugin: function(e, t, n) {
            var r,
            i,
            s;
            c._plugins = c._plugins || {};
            if (c._plugins[e]) {
                p.error("plugin " + e + " already exists!");
                return
            }
            c._plugins[e] = t,
            p._extendAsPlugin(c.prototype, t, e);
            if (p.isArray(n)) for (r = 0, s = n.length; r < s; r++) {
                i = n[r];
                if (!p.isString(i)) {
                    p.error(i + " is not string");
                    continue
                }
                if (p[i]) {
                    p.error(i + " exists in jxn");
                    continue
                }
                p[i] = t[i]
            }
        },
        _extendAsPlugin: function(e, t, n) {
            for (var r in t) {
                if (!t.hasOwnProperty(r)) continue;
                pluginProp = t[r],
                p.isFunction(pluginProp) ? p._appendFnToDest(e, r, pluginProp, n) : e[r] = t[r]
            }
        },
        _appendFnToDest: function(e, t, r, i) {
            t in e && p.warn(t, i, e[t].__by, "重复设置"),
            e[t] = function() {
                var e,
                i,
                s,
                o,
                u = this,
                a,
                f = [],
                l = !1;
                i = u.length;
                if (i == 0) {
                    if (t.indexOf("has") == 0 || t.indexOf("is") == 0) return ! 1;
                    if (t.indexOf("get") == 0) return undefined
                }
                for (e = 0; e < i; e++) a = u[e],
                s = n.call(arguments),
                s.unshift(a),
                o = r.apply(this, s),
                f[f.length] = o,
                o !== undefined && (l = !0);
                return l ? f[0] : this
            },
            e[t].__name = t,
            e[t].__by = i
        },
        tagName: function(e) {
            if (!e || !e.tagName) return "";
            var t = e.tagName;
            return t.toLowerCase()
        }
    }),
    s.ua.ie ? p.forEach(["concat", "indexOf", "join", "lastIndexOf", "pop", "push", "reverse", "shift", "slice", "sort", "splice", "unshift", "valueOf", "forEach", "some", "every", "map", "filter"], 
    function(e) {
        c.prototype[e] = Array.prototype[e]
    }) : (c.prototype = new Array, c.prototype.constructor = c),
    p.extend(c.prototype, {
        each: function(e) {
            var t,
            n = this.length;
            for (t = 0; t < n; t++) e.call(this[t], this[t]);
            return this
        },
        toArray: function() {
            return n.call(this)
        },
        node: function(e) {
            return p(this[e])
        },
        index: function(e) {
            if (!e) return this[0] ? this.prevAll().length: -1;
            p.isJxnNode(e) && (e = e[0]);
            var t,
            n = this.length;
            for (t = 0; t < n; t++) if (e == this[t]) return t;
            return - 1
        },
        eq: function(e) {
            return e == -1 ? this.node(this.length - 1) : this.node(e)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        }
    }),
    function(e, t) {
        function a(t, n) {
            u[t] = function(i, s, o) {
                if (n && !e.isWindow(i)) {
                    e.error(t + " caller should be window");
                    return
                }
                s ? r.wrap(i).addEvent(t, s, o) : r.wrap(i)[t]()
            }
        }
        var n = {},
        i = function(e) {
            return e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            !1
        },
        s = ["error", "unload", "scroll", "resize"],
        o = ["blur", "change", "click", "dblclick", "focus", "select", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup"],
        u = {
            load: function(t, n, i) {
                e.isWindow(t) ? r.wrap(t).addEvent("load", n, i) : e.loadFile.apply(t, arguments)
            },
            delegate: function(t, n, i, s, o) {
                e.forEach(i.split(" "), 
                function(e) {
                    r.wrap(t).delegate(n, e, s, o)
                })
            },
            undelegate: function(t, n, i, s, o) {
                e.forEach(i.split(" "), 
                function(e) {
                    r.wrap(t).undelegate(n, e, s, o)
                })
            },
            trigger: function(e, t, n) {
                r.wrap(e).fireEvent(t, n)
            },
            bind: function(t, n, i, s) {
                if (e.isObject(n)) {
                    for (var o in n) r.wrap(t).addEvent(o, n[o], s);
                    return
                }
                var u = n.split(" ");
                for (var a = 0, f = u.length; a < f; a++) r.wrap(t).addEvent(u[a], i, s)
            },
            unbind: function(t, n, i, s) {
                if (e.isObject(n)) {
                    for (var o in n) r.wrap(t).removeEvent(o, n[o], s);
                    return
                }
                var u = n.split(" ");
                for (var a = 0, f = u.length; a < f; a++) r.wrap(t).removeEvent(u[a], i, s)
            },
            on: function(t, n, i, s) {
                var o = !1;
                e.forEach(e._specialEvents, 
                function(e) {
                    e.likes(n) && (o = !0, e.on(t, n, i, s))
                });
                if (o) return;
                r.wrap(t).addEvent(n, i, s)
            },
            off: function(t, i, s, o) {
                var u = !1;
                e.forEach(e._specialEvents, 
                function(e) {
                    e.likes(i) && (u = !0, e.off(t, i, s, o))
                });
                if (u) return;
                r.wrap(t).removeEvent(i, n[s] || s, o),
                n[s] && (n[s] = null, delete n[s])
            },
            one: function(e, t, i, s) {
                function o() {
                    i.apply(this, arguments),
                    r.wrap(e).removeEvent(t, o, s),
                    n[i] = null,
                    delete n[i]
                }
                n[i] = o,
                r.wrap(e).addEvent(t, o, s)
            },
            hover: function(e, t, n) {
                if (!t) return;
                r.wrap(e).addEvent("mouseenter", t),
                r.wrap(e).addEvent("mouseleave", n || t)
            },
            ready: function(t, n) {
                if (t != document) {
                    e.error("ready should be called for jxn(document)");
                    return
                }
                r.ready(n)
            },
            submit: function(t, n) {
                if (!t || !t.tagName) {
                    e.error("element should have tagName");
                    return
                }
                var s = t.tagName.toLowerCase();
                if (s != "form" && s != "input") {
                    e.error("submit event, element should be form or input");
                    return
                }
                s == "input" && t.type != "submit" && e.error("submit event, type of input should be submit"),
                n === !1 && (n = i),
                r.wrap(t).addEvent("submit", n)
            },
            toggle: function(t) {
                var n = e.slice.call(arguments);
                if (n.length == 1) {
                    e.css(t, "display") == "none" ? e.show(t) : e.hide(t);
                    return
                }
                n.shift(),
                n.currentIndex = 0;
                var i = n.length;
                if (i <= 1) {
                    e.error("two event handlers for toggle at least");
                    return
                }
                r.wrap(t).addEvent("click", 
                function() {
                    var e = n.currentIndex;
                    n[e].apply(this, arguments),
                    e += 1,
                    e == i && (e = 0),
                    n.currentIndex = e
                })
            }
        };
        for (var f = 0, l, c = s.length; f < c; f++) l = s[f],
        a(l, !0);
        for (var f = 0, l, c = o.length; f < c; f++) l = o[f],
        a(l);
        e.registerPlugin("Events", u, ["on"])
    } (p),
    function(e, t) {
        function o(e, t) {
            return e && (e._prevJxnNode = t),
            e
        }
        function u(e) {
            var t = e._prevJxnNode;
            return t && (e._prevJxnNode = null),
            t
        }
        function a(e) {
            var t = document.createElement("div");
            t.innerHTML = "<table><tbody>" + e + "</tbody></table>";
            var n = t.getElementsByTagName("tr");
            return n
        }
        function f(e, t, n) {
            n == "table" ? e.appendChild(document.createElement("tbody")) : e = e.parentNode;
            var r = document.createElement("div");
            r.innerHTML = "<table><tbody>" + t + "</tbody></table>",
            e.replaceChild(r.firstChild.firstChild, e.tBodies[0]),
            r.removeChild(r.firstChild),
            r = null
        }
        function l(e, t, n) {
            var r = document.createElement("div"),
            i,
            s = e.selectedIndex,
            o;
            s == -1 && (s = 0),
            r.innerHTML = "<select>" + t + "</select>",
            i = r.firstChild;
            while (o = i.firstChild) e.appendChild(o);
            r.removeChild(i),
            r = null,
            e.selectedIndex = s
        }
        var n = function() {
            var e = document.createElement("table"),
            t;
            try {
                e.innerHTML = "<tbody><tr><td>1</td></tr></tbody>"
            } catch(n) {
                return ! 1
            }
            return t = e.getElementsByTagName("td").length != 0,
            e.innerHTML = "",
            e = null,
            t
        } (),
        i = function() {
            var e = document.createElement("select"),
            t;
            try {
                e.innerHTML = "<option>1</option>"
            } catch(n) {
                return ! 1
            }
            return t = e.getElementsByTagName("option").length != 0,
            e.innerHTML = "",
            e = null,
            t
        } (),
        s = /^\s*<\s*tr\s*>/,
        c = {
            show: function(e) {
                r.wrap(e).show()
            },
            hide: function(e) {
                r.wrap(e).hide()
            },
            after: function(t, n) {
                t = r.wrap(t);
                var i = n;
                if (e.isString(n)) i = e(n)[0];
                else {
                    if (e.isFunction(n)) {
                        n = n.call(t, null);
                        if (!n) return;
                        e(t).after(n);
                        return
                    }
                    e.isJxnNode(n) && n.each(function(n) {
                        e.after(t, n)
                    })
                }
                e.isDomNode(i) && r.wrap(t).grab(i, "after")
            },
            insertBefore: function(t, n) {
                e(n).before(t)
            },
            append: function(t, n) {
                if (!e.isAcceptableElement(t)) return;
                if (e.isJxnNode(n)) {
                    n.each(function(e) {
                        t.appendChild(e)
                    });
                    return
                }
                var i = !1;
                e.isString(n) && (s.test(n) ? (i = !0, n = a(n)) : n = r.getDom(n));
                if (!i) {
                    t.appendChild(n);
                    return
                }
                var o = e.tagName(t),
                u = o == "table" ? t.getElementsByTagName("tbody")[0] || t.tBodies[0] : t,
                f = n.length;
                for (var l = 0; l < f; l++) u.appendChild(n[l])
            },
            appendTo: function(t, n) {
                n === "body" ? n = document.body: n === "head" && (n = document.head || document.getElementsByTagName("head")[0] || document.documentElement);
                if (!e.isAcceptableElement(t)) return;
                e.isString(n) ? n = Sizzle(n) : !e.isArray(n) && !e.isJxnNode(n) && (n = [n]);
                var r = e.isInDomTree(t);
                for (var i = 0, s, o = n.length; i < o; i++) s = n[i],
                s.appendChild(t),
                r || (t = t.cloneNode(!0))
            },
            before: function(t, n) {
                t = r.wrap(t);
                var i = n;
                if (e.isString(n)) i = e(n)[0];
                else {
                    if (e.isFunction(n)) {
                        n = n.call(t, null);
                        if (!n) return;
                        e.before(t, n);
                        return
                    }
                    e.isJxnNode(n) && n.each(function(n) {
                        e.before(t, n)
                    })
                }
                e.isDomNode(i) && r.wrap(t).grab(i, "before")
            },
            clone: function(e) {
                return e.cloneNode(!0)
            },
            detach: function() {},
            empty: function(e) {
                if (!e) return;
                if (e.nodeType === 1) {
                    var t = e.getElementsByTagName("*");
                    for (var n = 0, r, i = t.length; n < i; n++) {
                        r = t[n];
                        try {
                            if (r.clearAttributes) r.clearAttributes();
                            else for (var s in node) delete node[s]
                        } catch(o) {}
                    }
                }
                while (e.firstChild) e.removeChild(e.firstChild)
            },
            prepend: function(t, n) {
                if (!e.isAcceptableElement(t)) return;
                e.isJxnNode(n) ? n.each(function(e) {
                    t.insertBefore(e, t.firstChild)
                }) : (e.isString(n) && (n = r.getDom(n)), t.insertBefore(n, t.firstChild))
            },
            prependTo: function(t, n) {
                if (!e.isAcceptableElement(t)) return;
                e.isString(n) ? n = Sizzle(n) : !e.isArray(n) && !e.isJxnNode(n) && (n = [n]);
                var r = e.isInDomTree(t);
                for (var i = 0, s, o = n.length; i < o; i++) s = n[i],
                s.firstChild ? s.insertBefore(t, s.firstChild) : s.appendChild(t),
                r || (t = t.cloneNode(!0))
            },
            remove: function(e) {
                r.wrap(e).dispose()
            },
            replaceAll: function(t, n) {
                if (!e.isAcceptableElement(t)) return;
                e.isString(n) ? n = Sizzle(n) : !e.isArray(n) && !e.isJxnNode(n) && (n = [n]);
                var r = e.isInDomTree(t);
                for (var i = 0, s = n.length; i < s; i++) n[i].parentNode.replaceChild(t, n[i]),
                r || (t = t.cloneNode(!0))
            },
            replaceWith: function(t, n) {
                e.isString(n) && (n = r.getDom(n)),
                t.parentNode.replaceChild(n, t)
            },
            text: function(t, n) {
                if (!n || !e.isString(n)) return Sizzle.getText([t]);
                r.wrap(t).setContent(n)
            },
            val: function(t, n) {
                if ( !! e.isUndefined(n)) return t.value;
                t.value = n
            },
            wrap: function(t, n) {
                e.isFunction(n) && (n = n.call(t, null));
                var i = t.parentNode,
                s = r.getDom(e.trim(n)),
                o = s.firstChild;
                i.insertBefore(s, t),
                o.appendChild(t)
            },
            unwrap: function(e) {
                var t = e.parentNode;
                if (t == document.body) return;
                var n = t.parentNode,
                i = r.wrap(t).getChildren();
                for (var s = 0, o = i.length; s < o; s++) n.insertBefore(i[s], t);
                n.removeChild(t)
            },
            wrapAll: function() {
                alert("not implemented")
            },
            wrapInner: function() {
                alert("not implemented")
            },
            html: function(t, s) {
                if (e.isUndefined(s)) return t.innerHTML;
                var o = e.tagName(t);
                e.empty(t);
                if (!n && /table|tbody/.test(o)) {
                    f(t, s, o);
                    return
                }
                if (!i && /select/.test(o)) {
                    l(t, s, o);
                    return
                }
                try {
                    r.wrap(t).setContent(s)
                } catch(u) {
                    e.error(o + " can not set innerHTML")
                }
            },
            prev: function(t, n) {
                return n = n || "*",
                o(e(r.wrap(t).getPrevious(n)), this)
            },
            prevAll: function(t, n) {
                return n = n || "*",
                o(e(r.wrap(t).getAllPrevious(n)), this)
            },
            next: function(t, n) {
                return n = n || "*",
                o(e(r.wrap(t).getNext(n)), this)
            },
            nextAll: function(t, n) {
                return n = n || "*",
                o(e(r.wrap(t).getAllNext(n)), this)
            },
            parent: function(t, n) {
                return o(e(r.wrap(t).getParent(n)), this)
            },
            parents: function(t, n) {
                return o(e(r.wrap(t).getParents(n)), this)
            },
            siblings: function(t, n) {
                return n = n || "*",
                o(e(r.wrap(t).getSiblings(n)), this)
            },
            firstChild: function(t, n) {
                return n = n || "*",
                o(e(r.wrap(t).getFirst(n)), this)
            },
            lastChild: function(t, n) {
                return n = n || "*",
                o(e(r.wrap(t).getLast(n)), this)
            },
            children: function(t, n) {
                return n = n || "*",
                o(e(r.wrap(t).getChildren(n)), this)
            },
            find: function(t, n) {
                return o(e(n, t), this)
            },
            end: function(e) {
                return u(this)
            }
        };
        e.registerPlugin("Dom", c, ["html", "empty", "before", "after", "show", "hide"])
    } (p),
    function(e, t) {
        var n = /^-?\d+(?:px)?$/i,
        i = {
            width: function(e) {
                return n.test(e) && (e = parseFloat(e), e >= 0 && (e += "px")),
                e
            }
        };
        i.width = i.height = i.top = i.left;
        var s = {
            addClass: function(e, t) {
                r.wrap(e).addClass(t)
            },
            removeClass: function(n, i) {
                if (i === t) {
                    var s = e.trim(r.wrap(n).className);
                    if (s == "") return;
                    s = s.split(" "),
                    e.forEach(s, 
                    function(t) {
                        t = e.trim(t),
                        t != "" && r.wrap(n).removeClass(t)
                    })
                } else r.wrap(n).removeClass(i)
            },
            toggleClass: function(e, t) {
                r.wrap(e).toggleClass(t)
            },
            hasClass: function(e, t) {
                return r.wrap(e).hasClass(t)
            },
            css: function(n, s, u) {
                if (!e.isAcceptableElement(n)) {
                    e("css() should be called by dom node");
                    return
                }
                n = r.wrap(n);
                if (e.isObject(s)) e.forEach(s, 
                function(e, t) {
                    e = o.camelCase(e),
                    t = i[e] ? i[e](t) : t,
                    n.setStyle(e, t)
                });
                else if (u !== t) s = o.camelCase(s),
                u = i[s] ? i[s](u) : u,
                n.setStyle(o.camelCase(s), u);
                else {
                    if (!s) return n.style.cssText;
                    if (s.indexOf(":") == -1) {
                        if (s != "width" && s != "height" || n.offsetWidth !== 0) return n.getStyle(o.camelCase(s));
                        var a = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        f = {
                            position: n.getStyle("position"),
                            visibility: n.getStyle("visibility"),
                            display: n.getStyle("display")
                        },
                        u;
                        for (var l in a) n.setStyle(l, a[l]);
                        u = n.getStyle(o.camelCase(s));
                        for (var l in f) n.setStyle(l, f[l]);
                        return u
                    }
                    n.style.cssText += ";" + s
                }
            }
        };
        e.registerPlugin("Css", s, ["css"])
    } (p),
    function(e, t) {
        function u(e, t) {
            e.attachEvent ? e.attachEvent("onload", 
            function() {
                t.call(this, e)
            }) : setTimeout(function() {
                var n = arguments.callee;
                if (t.isCalled) return;
                var r = !1;
                if (s.ua.webkit) e.sheet && (r = !0);
                else if (e.sheet) try {
                    e.sheet.cssRules && (r = !0)
                } catch(i) {
                    if (i.code === 1e3 || i.code == 18) r = !0
                }
                r ? setTimeout(function() {
                    t.call(e, e)
                },
                1) : setTimeout(n, 1)
            },
            0)
        }
        function a(e, t) {
            var n,
            r = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            n = document.createElement("link");
            return n.rel = "stylesheet",
            n.type = "text/css",
            n.href = e,
            r.appendChild(n),
            t ? (u(n, t), n) : n
        }
        function f(n, r) {
            var i,
            s = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            i = document.createElement("script"),
            i.async = "async",
            i.src = n,
            i.onload = i.onreadystatechange = function() {
                if (!i.readyState || /loaded|complete/.test(i.readyState)) i.onload = i.onreadystatechange = null,
                s && i.parentNode && (e.empty(i), s.removeChild(i)),
                i = t,
                r && r.call(this)
            },
            s.insertBefore(i, s.firstChild)
        }
        var n = {
            ajaxComplete: function(e, t) {},
            ajaxSuccess: function(e, t) {},
            ajaxStop: function(e, t) {},
            ajaxStart: function(e, t) {},
            ajaxSend: function(e, t) {},
            ajaxError: function(e, t) {},
            loadFile: function(n, r, i, s) {
                e.isFunction(i) && (s = i, i = t);
                var o = function(t) {
                    e.html(n, t || ""),
                    s && s.call(n, t)
                };
                e.get(r, i, o)
            },
            serialize: function(t) {
                if (!e.isDomNode(t)) return e.error("serialize should be called by form element"),
                "";
                var n = t.tagName.toLowerCase();
                return n != "form" ? (e.error("serialize should be called by form tag, not " + n), "") : r.wrap(t).toQueryString()
            },
            serializeArray: function(e) {}
        },
        l = {
            xml: "application/xml, text/xml",
            html: "text/html",
            text: "text/plain",
            json: "application/json, text/javascript"
        };
        e.extend(e, {
            ajax: function(t, n) {
                e.isObject(t) && (n = t, t = n.url);
                var r = n.dataType;
                n = n || {};
                if (r == "script") {
                    f(t, n.success || n.onsuccess || n.onSuccess);
                    return
                }
                var s = {};
                n.ifModified && (s["If-Modified-Since"] = parseInt(n.ifModified)),
                n.ContentType && (s["Content-Type"] = n.ContentType),
                n.cache && (s["Cache-Control"] = n.cache || "no-cache"),
                r && (l[r] ? s.Accept = l[r] + ", */*;q=0.01": r == "*" && (s.Accept = "*/*"));
                var u = e.isString(n.data) ? n.data: o.toQueryString(n.data),
                a = n.method || n.type || "get",
                c = new i.Request({
                    url: t || n.url,
                    data: a == "post" ? "": u,
                    dataType: n.dataType,
                    method: a,
                    timeout: n.timeout,
                    headers: s,
                    onsuccess: n.success || n.onsuccess || n.onSuccess,
                    onerror: n.error || n.onerror || n.onError,
                    oncomplete: n.complete || n.oncomplete || n.onComplete
                });
                return c.send(a == "post" ? u: ""),
                c
            },
            ajaxSetup: function() {},
            get: function(n, r, i, s) {
                e.isFunction(r) && (s = s || i, i = r, r = t);
                var o = i;
                return s == "json" ? i = function(e) {
                    o && o.call(this, JSON.parse(e.responseText || ""))
                }: i = function(e) {
                    o && o.call(this, e && e.responseText)
                },
                e.ajax({
                    method: "get",
                    url: n,
                    data: r,
                    success: i,
                    dataType: s
                })
            },
            getJSON: function(t, n, r) {
                return e.get(t, n, r, "json")
            },
            getScript: function(n, r) {
                if (e.isString(n)) return e.get(n, t, r, "script");
                if (!e.isArray(n)) return;
                var i = n.length,
                s = 0,
                o = function() {
                    s++,
                    s == i && r && r.call(this)
                };
                e.forEach(n, 
                function(t) {
                    e.getScript(t, o)
                })
            },
            getCSS: function(t, n) {
                if (e.isString(t)) return a(t, n);
                if (!e.isArray(t)) return;
                var r = t.length,
                i = 0,
                s = [],
                o = function() {
                    i++,
                    i == r && n && n.call(this, s)
                };
                e.forEach(t, 
                function(t) {
                    s.push(e.getCSS(t, o))
                })
            },
            post: function(n, r, i, s) {
                return e.isFunction(r) && (s = s || i, i = r, r = t),
                e.ajax({
                    method: "post",
                    url: n,
                    data: r,
                    success: i,
                    dataType: s
                })
            },
            param: function() {}
        }),
        e.registerPlugin("Ajax", n, ["loadFile"])
    } (p),
    function(e, t) {
        function a(e, t) {
            var n = s.exec(e);
            return n ? n[0] : (n = s.exec(t), n ? n[0] : "px")
        }
        function f(t) {
            return e.getNumber(t)
        }
        function l(t, n) {
            return e.isNumber(t) ? t: u.test(e.trim(t)) ? RegExp.$1 == "+" ? n + f(RegExp.$2) : n - f(RegExp.$2) : f(t)
        }
        function h(t, n, r, i, s) {
            var u = [],
            p = {},
            d = {},
            v = {},
            m,
            g,
            y;
            if (e.isFunction(n)) {
                n = n.call(t);
                if (!n || !e.isObject(n)) e.error("function as first param, should return an object"),
                n = {}
            }
            e.isFunction(r) && (s = r, r = n.duration),
            e.isFunction(i) && (s = i, i = "linear");
            if (e.isObject(r)) {
                var b = r;
                r = b.duration,
                i = b.easing,
                s = b.complete,
                y = b.step
            }
            r = e.isNumber(r) ? r: c[r] || 1e3,
            g = t.__jxnMotion;
            var w = g.isNew;
            g.isNew = !1,
            e.forEach(n, 
            function(n, r) {
                n = o.camelCase(n),
                u.push(n),
                m = f(e.css(t, n) || "0"),
                isNaN(m) && (m = 0),
                p[n] = m,
                d[n] = l(r, m),
                v[n] = a(m, r)
            });
            var E = u.length;
            E == 0,
            g.onTweening = function() {
                for (var n = 0, r, i; n < E; n++) r = u[n],
                i = this.equation(p[r], d[r]),
                v[r] && (i += v[r]),
                e.css(t, r, i);
                e.isFunction(y) && y.call(t, this.equation(0, this.frames), this.frames, g)
            },
            g.onComplete = function() {
                for (var n = 0, r, i; n < E; n++) r = u[n],
                i = d[r],
                v[r] && (i += v[r]),
                e.css(t, r) != i && e.css(t, r, i);
                e.isFunction(s) && s.call(t, this.frames, g),
                this.tweening = !1;
                if (t.__motionQueue && t.__motionQueue.length != 0) {
                    var o = t.__motionQueue.shift();
                    h.apply(t, o)
                }
            },
            w || g.reset(i, r),
            g.start(),
            t.__motion = g
        }
        var n = {
            linear: function(e, t, n, r) {
                return n * e / r + t
            },
            easeIn: function(e, t, n, r) {
                return n * (e /= r) * e + t
            },
            easeOut: function(e, t, n, r) {
                return - n * (e /= r) * (e - 2) + t
            },
            easeBoth: function(e, t, n, r) {
                return (e /= r / 2) < 1 ? n / 2 * e * e + t: -n / 2 * (--e * (e - 2) - 1) + t
            },
            backIn: function(e, t, n, r, i) {
                return typeof i == "undefined" && (i = 1.70158),
                n * (e /= r) * e * ((i + 1) * e - i) + t
            },
            backOut: function(e, t, n, r, i) {
                return typeof i == "undefined" && (i = 1.70158),
                n * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + t
            },
            backBoth: function(e, t, n, r, i) {
                return typeof i == "undefined" && (i = 1.70158),
                (e /= r / 2) < 1 ? n / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t: n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t
            },
            bounceIn: function(e, t, r, i) {
                return r - n.bounceOut(i - e, 0, r, i) + t
            },
            bounceOut: function(e, t, n, r) {
                return (e /= r) < 1 / 2.75 ? n * 7.5625 * e * e + t: e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t: e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t: n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
            },
            bounceBoth: function(e, t, r, i) {
                return e < i / 2 ? n.bounceIn(e * 2, 0, r, i) * .5 + t: n.bounceOut(e * 2 - i, 0, r, i) * .5 + r * .5 + t
            }
        },
        r = function() {
            this.onTweening && this.onTweening.apply(this);
            if (this.current >= this.frames) {
                this.stop(),
                this.onComplete && this.onComplete.apply(this),
                this.tweening = !1;
                return
            }
            this.current++
        },
        i = function(t, n) {
            this.tween = t || "linear",
            this.duration = e.isNumber(n) ? n: c[n] || 1e3,
            this.reset(t, this.duration),
            this.tweening = !1
        };
        i.prototype = {
            equation: function(e, t) {
                return this.tweenMethod(this.current / this.frames * this.duration, e, t - e, this.duration)
            },
            reset: function(e, t) {
                this.tweening && this.stop(),
                this.duration = t || 400,
                this.tween = e || "linear",
                this.fps = this.fps || 35,
                this.frames = Math.ceil(this.duration / 1e3 * this.fps),
                this.frames < 1 && (this.frames = 1),
                this.tweenMethod = "function" == typeof this.tween ? this.tween: n[this.tween] || n.linear,
                this.current = 1
            },
            start: function() {
                this.tweening = !0;
                var e = this,
                t = this.duration / this.frames;
                this.timer = setInterval(function() {
                    r.call(e)
                },
                t)
            },
            stop: function() {
                this.timer && (clearInterval(this.timer), this.timer = null),
                this.tweening = !1
            },
            hold: function() {
                this.stop()
            },
            goon: function() {
                this.start()
            }
        };
        var s = /[a-zA-Z]+/,
        u = /^(?:([+\-])=)([\d\.]+)/,
        c = {
            slow: 600,
            fast: 200
        },
        p = {
            animate: function(t, n, r, s, o) {
                if (!n) {
                    e.error("need params for animate");
                    return
                }
                var u,
                a = s,
                f = r;
                e.isFunction(a) && (a = "linear"),
                t.__jxnMotion || (e.isObject(r) && (a = r.easing, f = r.duration), t.__jxnMotion = new i(a, f), t.__jxnMotion.isNew = !0),
                u = t.__jxnMotion;
                if (u.tweening) {
                    t.__motionQueue = t.__motionQueue || [],
                    t.__motionQueue.push(e.slice.call(arguments));
                    return
                }
                h.apply(t, arguments)
            },
            clearQueue: function(e) {
                var t = e.__motionQueue;
                if (!t) return;
                for (var n = 0, r = t.length; n < r; n++) t[n] = null;
                e.__motionQueue = null
            },
            delay: function(t, n, r) {
                e.animate(t, {},
                n, "linear", r)
            },
            dequeue: function() {},
            fadeOut: function(t, n, r) {
                e.animate(t, {
                    opacity: "0"
                },
                n, "easeIn", 
                function() {
                    e.css(t, "opacity", "0"),
                    e.data(t, "display-bak", e.css(t, "display")),
                    e.css(t, "display", "none"),
                    r && r.apply(t, arguments)
                })
            },
            fadeIn: function(t, n, r) {
                var i = function() {
                    return e.css(t, "display", e.data(t, "display-bak") || ""),
                    e.css(t, "opacity", "0"),
                    {
                        opacity: "1"
                    }
                };
                e.animate(t, i, n, "easeOut", 
                function() {
                    e.css(t, "opacity", "1"),
                    e.removeData(t, "display-bak"),
                    r && r.apply(t, arguments)
                })
            },
            fadeTo: function(t, n, r, i) {
                var s = function() {
                    return r != 0 && (e.css(t, "display", e.data(t, "display-bak") || ""), e.removeData(t, "display-bak")),
                    {
                        opacity: r
                    }
                };
                e.animate(t, s, n, "linear", 
                function() {
                    e.css(t, "opacity", r),
                    i && i.apply(t, arguments)
                })
            },
            fadeToggle: function() {},
            fx: {
                interval: function() {},
                off: function() {}
            },
            queue: function() {},
            slideDown: function(t, n, r) {
                var i = function() {
                    var t,
                    n,
                    r,
                    i;
                    return e.data(this, "animate-height-bak") ? (t = e.data(this, "animate-height-bak"), n = e.data(this, "animate-display-bak"), r = e.data(this, "animate-opacity-bak")) : (i = e("<" + this.tagName + ">").appendTo("body"), t = i.css("height"), n = i.css("display"), r = i.css("opacity"), i.remove()),
                    e.css(this, "display", n),
                    e.css(this, "height", "0px"),
                    {
                        height: t,
                        opacity: r
                    }
                };
                e.animate(t, i, n, "easeIn", r)
            },
            slideToggle: function() {},
            slideUp: function(t, n, r) {
                var i = function() {
                    return e.data(this, "animate-height-bak", e.css(this, "height")),
                    e.data(this, "animate-opacity-bak", e.css(this, "opacity")),
                    e.data(this, "animate-display-bak", e.css(this, "display")),
                    {
                        height: "0px",
                        opacity: 0
                    }
                };
                e.animate(t, i, n, "easeIn", 
                function() {
                    e.css(t, "opacity", "0"),
                    e.css(t, "display", "none"),
                    r && r.call(t, arguments)
                })
            },
            start: function(e) {
                e.__jxnMotion && e.__jxnMotion.start()
            },
            stop: function(t, n, r) {
                var i = t.__jxnMotion;
                if (!i) return;
                n && e.clearQueue(t),
                i.stop(),
                r && i.onComplete()
            },
            hold: function(e) {
                e.__jxnMotion && e.__jxnMotion.hold()
            },
            goon: function(e) {
                e.__jxnMotion && e.__jxnMotion.goon()
            }
        };
        e.registerPlugin("Effect", p, ["animate", "clearQueue"])
    } (p),
    function(e, t) {
        var n = /^(?:body|html)$/i,
        r = {
            position: function(t) {
                if (!t) return null;
                var r = e(t),
                i = r.offsetParent(),
                s = r.offset(),
                o = n.test(i[0].nodeName) ? {
                    top: 0,
                    left: 0
                }: i.offset();
                return s.top -= parseFloat(e.css(t, "marginTop")) || 0,
                s.left -= parseFloat(e.css(t, "marginLeft")) || 0,
                o.top += parseFloat(e.css(i[0], "borderTopWidth")) || 0,
                o.left += parseFloat(e.css(i[0], "borderLeftWidth")) || 0,
                {
                    top: s.top - o.top,
                    left: s.left - o.left
                }
            },
            scrollTop: function(n, r) {
                if (r !== t) {
                    var i = e.getWindow(n);
                    i ? i.scrollTo(e(i).scrollLeft(), r) : n.scrollTop = r;
                    return
                }
                var i = e.getWindow(n);
                if (i) {
                    if ("pageYOffset" in i) return i.pageYOffset;
                    var s = i.document.body,
                    o = i.document.documentElement;
                    return o = o.clientWidth ? o: s,
                    o.scrollTop
                }
                return n.scrollTop
            },
            scrollLeft: function(n, r) {
                if (r !== t) {
                    var i = e.getWindow(n);
                    i ? i.scrollTo(r, e.scrollTop(i)) : n.scrollLeft = r;
                    return
                }
                var i = e.getWindow(n);
                if (i) {
                    if ("pageXOffset" in i) return i.pageXOffset;
                    var s = i.document.body,
                    o = i.document.documentElement;
                    return o = o.clientWidth ? o: s,
                    o.scrollLeft
                }
                return n.scrollLeft
            }
        };
        e.registerPlugin("Position", r, ["position", "scrollLeft", "scrollTop"])
    } (p),
    function(e, t) {
        function r(e) {
            if (e.getBoundingClientRect) {
                var t = e.getBoundingClientRect(),
                n = e.ownerDocument.documentElement,
                r = {
                    x: o(e),
                    y: i(e)
                },
                u = e.style.position == "fixed";
                return {
                    left: parseInt(t.left, 10) + (u ? 0: r.x) - n.clientLeft,
                    top: parseInt(t.top, 10) + (u ? 0: r.y) - n.clientTop
                }
            }
            var a = e,
            f = {
                left: 0,
                top: 0
            };
            if (e.tagName == "BODY") return f;
            while (a && a.tagName != "BODY") {
                f.left += a.offsetLeft,
                f.top += a.offsetTop;
                if (s.ua.gecko) {
                    borderBox(a) || (f.left += parseFloat(a.style.borderLeftWidth), f.top += parseFloat(a.style.borderTopWidth));
                    var l = a.parentNode;
                    l && l.style.overflow != "visible" && (f.left += parseFloat(l.style.borderLeftWidth), f.top += parseFloat(l.style.borderTopWidth))
                } else a != e && s.ua.webket && (f.left += parseFloat(a.style.borderLeftWidth), f.top += parseFloat(a.style.borderTopWidth));
                a = a.offsetParent
            }
            return s.ua.gecko && e.style.MozBoxSizing != "border-box" && (f.left -= parseFloat(e.style.borderLeftWidth), f.top -= parseFloat(e.style.borderTopWidth)),
            f
        }
        function i(e) {
            return document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop: document.body.scrollTop
        }
        function o(e) {
            return document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft: document.body.scrollLeft
        }
        function u(n, r, i) {
            var s = r.toLowerCase();
            if (e.isWindow(n)) {
                var o = n.document.documentElement["client" + r],
                u = n.document.body;
                return n.document.compatMode === "CSS1Compat" && o || u && u["client" + r] || o
            }
            if (e.isDocument(n)) return Math.max(n.documentElement["client" + r], n.body["client" + r], n.documentElement["client" + r], n.body["client" + r], n.documentElement["client" + r]);
            if (i !== t) {
                e.isNumber(i) && (i += "px"),
                e.css(n, s, i);
                return
            }
            return parseInt(e.css(n, s))
        }
        var n = /^(?:body|html)$/i,
        a = {
            offsetParent: function(t) {
                var r = t.offsetParent || document.body;
                while (r && !n.test(r.nodeName) && e.css(r, "position") === "static") r = r.offsetParent;
                return e(r)
            },
            offset: function(e) {
                return r(e)
            },
            width: function(e, t) {
                return u(e, "Width", t)
            },
            height: function(e, t) {
                return u(e, "Height", t)
            },
            innerWidth: function(t) {
                return parseFloat(e.css(t, "width")) + parseFloat(e.css(t, "paddingLeft")) + parseFloat(e.css(t, "paddingRight"))
            },
            innerHeight: function(t) {
                return parseFloat(e.css(t, "height")) + parseFloat(e.css(t, "paddingTop")) + parseFloat(e.css(t, "paddingBottom"))
            },
            outerWidth: function(t, n) {
                return e.innerWidth(t) + (parseFloat(e.css(t, "borderLeftWidth")) || 0) + (parseFloat(e.css(t, "borderRightWidth")) || 0) + (n ? parseFloat(e.css(t, "marginLeft")) + parseFloat(e.css(t, "marginRight")) : 0)
            },
            outerHeight: function(t, n) {
                return e.innerHeight(t) + (parseFloat(e.css(t, "borderTopWidth")) || 0) + (parseFloat(e.css(t, "borderBottomWidth")) || 0) + (n ? parseFloat(e.css(t, "marginTop")) + parseFloat(e.css(t, "marginBottom")) : 0)
            }
        };
        e.registerPlugin("Offset", a, ["innerWidth", "innerHeight"])
    } (p),
    function(e, t) {
        function i(e, t) {
            return r.test(t) && t in e
        }
        function s(n, r, o, u) {
            u = u || "";
            if (e.isObject(r)) {
                for (var a in r) {
                    if (!r.hasOwnProperty(a)) continue;
                    s(n, a, r[a], u)
                }
                return
            }
            if (o === t) {
                var f = u + r,
                l = null,
                c,
                o;
                if (i(n, f)) return o = n[f],
                o = !!o && o != "false",
                o;
                l = n.getAttribute(f);
                if (e.isString(l) && e.trim(l).indexOf("{") == 0) try {
                    c = JSON.parse(l)
                } catch(h) {}
                return o = c || l,
                o
            }
            e.isObject(o) ? n.setAttribute(u + r, JSON.stringify(o)) : n.setAttribute(u + r, o);
            var f = u + r;
            i(n, f) && (n[f] = o)
        }
        var n = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        r = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        o = {
            attr: function(e, t, n) {
                return s(e, t, n)
            },
            data: function(e, t, n) {
                return s(e, t, n, "data-")
            },
            removeAttr: function(e, t) {
                if (e.nodeType != 1) return;
                t = n[t] || t,
                e.removeAttribute && (e.setAttribute(t, ""), e.removeAttribute(t), r.test(t) && t in e && (e[t] = !1))
            },
            removeData: function(e, t) {
                t = "data-" + t;
                if (e.removeAttribute) e.removeAttribute(t);
                else {
                    e[t] = null;
                    try {
                        delete e[t]
                    } catch(n) {}
                }
            }
        };
        e.registerPlugin("Data", o, ["attr", "data", "removeData"])
    } (p),
    function(e, t) {
        var n = {};
        for (var r in s.ua) n[r] = s.ua[r];
        n.version = s.ua[s.ua.shell],
        n[s.ua.shell] = !0,
        e.browser = {},
        e.extend(e.browser, n)
    } (p),
    function(e, t) {
        var n = 864e5,
        r = {
            get: function(t) {
                var n = document.cookie,
                r;
                if (!n || n == "") return null;
                if (!t) return n;
                t = e.trim(t),
                r = n.split(";");
                for (var i = 0, s, o, u = r.length; i < u; i++) {
                    o = e.trim(r[i]),
                    s = o.split("=");
                    if (e.trim(s[0]) == t) return decodeURIComponent(e.trim(s[1]))
                }
                return null
            },
            set: function(t, r, i) {
                var s = "",
                o,
                u,
                a,
                f;
                i = i || {},
                r === null && (r = "", i.expires = -1),
                i.expires && (e.isNumber(i.expires) ? (o = new Date, o.setTime(o.getTime() + i.expires * n)) : i.expires.toUTCString && (o = i.expires), s = "; expires=" + o.toUTCString()),
                u = i.path ? "; path=" + i.path: "",
                a = i.domain ? "; domain=" + i.domain: "",
                f = i.secure ? "; secure": "",
                document.cookie = [t, "=", encodeURIComponent(r), s, u, a, f].join("")
            },
            remove: function(t) {
                e.cookie.set(t, null)
            }
        };
        e.cookie = function(t, n, r) {
            if (typeof n == "undefined") return e.cookie.get(t);
            e.cookie.set(t, n, r)
        },
        e.extend(e.cookie, r)
    } (p),
    function(e, t) {
        function n(e, t) {
            var n = document.createElement("div");
            n.style.display = "none",
            n.style.behavior = "url(#default#userData)";
            var r = new Date;
            return r.setDate(r.getDate() + t),
            n.expires = r.toUTCString(),
            (document.body || document.getElementsByTagName("body")[0]).appendChild(n),
            n
        }
        function f() {
            if (u) return;
            u = !0,
            e(function() {
                s = new r,
                e.forEach(o, 
                function(e, t) {
                    s.setItem(e, t),
                    delete o[e]
                }),
                o = null
            })
        }
        var r = new Class(function() {
            this.initialize = function(e, t, r) {
                e.__storageName = t || "ObjectJSLocalStorage",
                e.__expires = r || 36500,
                e.__storageHolder = n(e.__storageName, e.__expires)
            },
            this.setItem = function(e, t, n) {
                var r = e.__storageHolder,
                i = e.__storageName,
                s = e.getItem(t);
                r.load(i),
                r.setAttribute(t, n),
                r.save(i)
            },
            this.getItem = function(e, t) {
                var n = e.__storageHolder,
                r = e.__storageName;
                return n.load(r),
                n.getAttribute(t)
            },
            this.removeItem = function(e, t) {
                var n = e.__storageHolder,
                r = e.__storageName,
                i = e.getItem(t);
                n.load(r),
                n.removeAttribute(t),
                n.save(r)
            },
            this.clear = function(e) {
                var t = e.__storageHolder,
                r = e.__storageName;
                t.load(r);
                var i = new Date;
                i.setDate(i.getDate() - 1),
                t.expires = i.toUTCString(),
                t.save(r),
                document.body.removeChild(e.__storageHolder),
                e.__storageHolder = n(e.__storageName, e.__expires)
            }
        }),
        i = "localStorage" in window,
        s,
        o = {},
        u = !1;
        if (i) try {
            window["localStorage"] != null,
            i = !0
        } catch(a) {
            i = !1
        }
        i && (s = window.localStorage),
        e.storage = function(n, r) {
            if (r === t) return e.storage.get(n);
            e.storage.set(n, r)
        },
        e.storage.set = function(t, n) {
            e.isObject(n) && (n = JSON.stringify(n));
            if (!s) {
                o[t] = n,
                f();
                return
            }
            s.setItem(t, n)
        },
        e.storage.get = function(t) {
            if (!s) return o[t];
            var n = s.getItem(t),
            r;
            if (e.isString(n) && e.trim(n).indexOf("{") == 0) try {
                r = JSON.parse(n)
            } catch(i) {}
            return r || n
        },
        e.storage.remove = function(e) {
            if (!s) {
                delete o[e],
                f();
                return
            }
            s.removeItem(e)
        },
        e.storage.clear = function() {
            if (!s) {
                o = {};
                return
            }
            s.clear()
        }
    } (p),
    function(e, t) {
        function r(t, n) {
            if (t in DELAY_FACTOR) {
                var r = DELAY_FACTOR[t];
                return e.isObject(r) ? r[n] || r.other: r
            }
            return DELAY_FACTOR.other
        }
        var n = 2;
        DELAY_FACTOR = {
            ieshell: {
                6: 3,
                7: 2.5,
                8: 2,
                9: 1.5,
                10: 1.3,
                other: 1.2
            },
            firefox: 1.2,
            chrome: 1,
            other: 1
        },
        cache = {},
        DELAY_GID = 0,
        e.delayDo = function(t, i) {
            t._gid = t._gid || DELAY_GID++;
            var s,
            o;
            if (!t || !e.isFunction(t)) {
                console.error('please use delayDo like "delayDo(function, priority)"');
                return
            }
            t._gid in cache && e.clearDelayDo(t._gid),
            i = i || n,
            s = r(e.browser.shell, e.browser.version),
            o = setTimeout(function() {
                t(),
                e.clearDelayDo(t)
            },
            i * s * 1e3),
            cache[t._gid] = o
        },
        e._getDelayDos = function() {
            return cache
        },
        e.delayDoOrEvent = function(t, r, i, s) {
            e.isNumber(r) || (s = i, i = r, r = n);
            if (!i) {
                e.delayDo(t, r);
                return
            }
            var o = function() {
                u && i.off(s, o),
                e.clearDelayDo(o),
                t()
            },
            u;
            e.delayDo(o, r),
            i == "domready" ? e(o) : (i = e(i), u = !0, i.on(s, o))
        },
        e.clearDelayDo = function(t) {
            e.isFunction(t) && (t = t._gid),
            t in cache && (clearTimeout(cache[t]), cache[t] = null, delete cache[t])
        }
    } (p),
    function(e, t) {
        var n = e(document);
        e.scrollViewportTo = function(t, r) {
            if (!t && t !== 0) return;
            r = r || {};
            var i = r.delta || 0,
            s = n.scrollTop(),
            o = (t === 0 ? 0: e(t).position().top) + i,
            u = o - s,
            a = r.noEffect || !1,
            f = r.easing || "easeOut";
            if (a) {
                n.stop().clearQueue().scrollTop(o);
                return
            }
            n.stop().clearQueue().animate({},
            {
                step: function(e, t) {
                    n.scrollTop(s + Math.floor(u * e / t))
                },
                duration: 500,
                easing
                : f
            })
        }
    } (p),
    function(e, t) {
        function o(t, r) {
            var i = e(document).scrollTop() - r,
            s = i + n + r * 2,
            o = t.position().top,
            u = o + t.innerHeight();
            return i < o && o < s || i < u && u < s
        }
        function u() {
            var e,
            t = document.documentElement;
            return typeof window.innerHeight != "undefined" ? e = window.innerHeight: typeof t != "undefined" && typeof t.clientHeight != "undefined" && t.clientHeight != 0 ? e = t.clientHeight: e = document.getElementsByTagName("body")[0].clientHeight,
            e
        }
        function a(t, n) {
            var r = n.length,
            i = n.delta;
            if (r == 0) return;
            for (var s = 0, u; s < r; s++) {
                u = e(n[s]);
                if (!o(u, i)) continue;
                t == "value" ? u.val(u.data(t)).removeData(t) : u.attr(t, u.data(t)).removeData(t),
                n.splice(s, 1),
                s--,
                r--
            }
        }
        function f() {
            e.forEach(i, 
            function(e, t) {
                a(e, t)
            })
        }
        var n,
        r = !1,
        i = {},
        s = 3;
        e._lazyLoadNodes = function() {
            return i
        },
        e.lazyLoad = function(t, o) {
            o = o || {};
            var a = o.prop || "src",
            l = !!o.fast,
            c = e.isNumber(o.frequency) ? o.frequency: s,
            h = o.delta || 0,
            p = e(o.parent || document.body),
            d;
            i[a] = e(t, p),
            i[a].delta = h;
            if (r) return;
            r = !0,
            d = l === !0 ? "scroll": "scroll/" + c,
            e(window).on("resize", 
            function() {
                n = u(),
                f()
            }).on(d, 
            function() {
                f()
            }),
            n = u(),
            f()
        },
        e.addLazyLoadNodes = function(t, n) {
            n = n || {};
            var r = n.prop || "src",
            s = i[r] = i[r] || [],
            o = n.selector || "[data-" + r + "]";
            for (var u = 0, f, l = t.length; u < l; u++) f = e(t[u]),
            f.data(r) || (f = e(o, f)),
            f.length != 0 && s.push(f);
            a(r, s)
        }
    } (p),
    function(e, t) {
        function a() {
            var t = o[e.browser.shell];
            return t ? e.isNumber(t) ? t: t[e.browser.version] || 1: o.other
        }
        function f(e, t, n, r, i) {
            return function() {
                var s = this,
                o = arguments,
                a = n * 100;
                a > 2e3 && (a = 2e3),
                e == 0 && (t && clearTimeout(t), t = setTimeout(function() {
                    i.apply(s, o),
                    e = 0,
                    t = null,
                    delete u[r]
                },
                a), u[r] = t),
                e++,
                e >= n - 1 && (i.apply(s, o), e = 0, t && (clearTimeout(t), t = null, delete u[r]))
            }
        }
        function l(t, n, o, u) {
            var l = o._scroll_gid = s++,
            c;
            c = parseInt(n.split("/")[1]);
            if (isNaN(c)) {
                e.error("scroll/N, N should be a number");
                return
            }
            times = c * a();
            var h = 0,
            p = null,
            d = f(h, p, times, l, o);
            i[o._scroll_gid] = d,
            r.wrap(t).addEvent("scroll", d, u)
        }
        function c(e, t, n, s) {
            var o = n._scroll_gid,
            a = u[o];
            r.wrap(e).removeEvent("scroll", i[n._scroll_gid], s),
            a && (clearTimeout(a), a = null, delete u[o])
        }
        e._specialEvents = e._specialEvents || [];
        var n = /^scroll\/\d+$/,
        i = {},
        s = 0,
        o = {
            ieshell: {
                6: 20,
                7: 20,
                8: 20,
                9: 1,
                10: 1
            },
            firefox: 10,
            opera: 15,
            safari: 1,
            chrome: 1,
            other: 1
        },
        u = {};
        e._specialEvents.push({
            likes: function(e) {
                return n.test(e)
            },
            on: l,
            off: c
        })
    } (p),
    p
}),
window.jxn || object.use("jxn", 
function(e) {
    window.jxn = e
}),
object.add("CX", "dom, ua", 
function(e, t, n) {
    this.DEBUG_MODE = !1;
    var r = "http://s.xnimg.cn/";
    this.debug = {
        log: function() {},
        on: function() {
            e.DEBUG_MODE = !0,
            window.console && console.log && (e.debug.log = function(e) {
                console.log(e)
            })
        },
        off: function() {
            e.debug.log = function() {}
        }
    },
    this.namespace = function() {
        var t = arguments,
        n = null,
        r,
        i,
        s;
        for (r = 0; r < t.length; r++) {
            s = t[r].split("."),
            n = e;
            for (i = s[0] == "CX" ? 1: 0; i < s.length; i++) n[s[i]] = n[s[i]] || {},
            n = n[s[i]]
        }
        return n
    },
    this.log = function(t) {
        e.debug.log(t)
    },
    this.isUndefined = function(e) {
        return typeof e == "undefined"
    },
    this.isString = function(e) {
        return typeof e == "string"
    },
    this.isElement = function(e) {
        return e && e.nodeType == 1
    },
    this.isFunction = function(e) {
        return typeof e == "function"
    },
    this.isObject = function(e) {
        return typeof e == "object"
    },
    this.isArray = function(e) {
        return Object.prototype.toString.call(e) === "[object Array]"
    },
    this.isNumber = function(e) {
        return typeof e == "number"
    },
    this.$extend = function() {
        var e = arguments[0];
        for (var t = 1; t < arguments.length; t++) if (typeof arguments[t] == "object") for (var n in arguments[t]) e[n] = arguments[t][n];
        return e
    },
    this.namespace("config"),
    this.config.jumpOut = !0,
    function() {
        function o(e) {
            return !! u(e)
        }
        function u(e) {
            return i[encodeURIComponent(e)]
        }
        function a(e) {
            var t = {};
            t.file = e,
            t.isLoad = !0,
            t.isLoaded = !0,
            i[encodeURIComponent(e)] = t
        }
        function f(t) {
            t.addEvent = function(t, n) {
                this._customEventListeners || (this._customEventListeners = {});
                var r = this._customEventListeners;
                return e.isUndefined(r[t]) && (r[t] = []),
                r[t].push(n),
                this
            },
            t.delEvent = function(e, t) {
                var n = this._customEventListeners[e];
                if (n) for (var r = n.length - 1; r >= 0; r--) if (n[r] == t) {
                    n[r] = null;
                    break
                }
                return this
            },
            t.fireEvent = function(t) {
                if (!this._customEventListeners || !this._customEventListeners[t]) return;
                var n = this._customEventListeners[t],
                r = l(arguments);
                r.shift();
                for (var i = 0, s = n.length; i < s; i++) if (n[i]) try {
                    n[i].apply(this, r)
                } catch(o) {
                    if (e.DEBUG_MODE) throw o
                }
            }
        }
        function l(e) {
            var t = [];
            for (var n = 0, r = e.length; n < r; n++) t.push(e[n]);
            return t
        }
        function c(t, r) {
            var s = {};
            s.file = t,
            s.isLoaded = !1,
            f(s),
            s.addEvent("load", 
            function() {
                this.isLoaded = !0
            }),
            r || (i[encodeURIComponent(t)] = s);
            var o = document.createElement("script");
            o.type = "text/javascript",
            o.src = t,
            o.async = !0,
            s.element = o,
            n.ua.shell == "ieshell" && n.ua.ie < 11 ? o.onreadystatechange = function() {
                if ((this.readyState == "loaded" || this.readyState == "complete") && !this.hasLoad) {
                    this.hasLoad = !0;
                    var n = u(t);
                    if (n != null) n.fireEvent("load");
                    else try {
                        e.loadFile(t)
                    } catch(r) {}
                }
            }: o.onerror = o.onload = function() {
                var e = u(t);
                e && e.fireEvent("load")
            },
            Sizzle("head")[0].insertBefore(o, null)
        }
        function h(t, n, r, i) {
            var s = !1,
            f = !1;
            e.isObject(t) && (s = t.type == "js", f = t.type == "css", t = t.file),
            t = p(t);
            if (/\.js(\?|$)/.test(t) || s) { (r || !o(t)) && c(t, i);
                if (!n) return;
                u(t).isLoaded ? n.call(u(t), !0) : (u(t).addEvent("load", 
                function() {
                    n(!0)
                }), u(t).addEvent("error", 
                function() {
                    n(!1)
                }))
            } else if (/\.css(\?|$)/.test(t) || f) {
                if (!r && o(t)) {
                    n && n.call(u(t));
                    return
                }
                a(t);
                var l = document.createElement("link");
                l.rel = "stylesheet",
                l.type = "text/css",
                l.href = t,
                Sizzle("head")[0].insertBefore(l, null),
                n && n.call(u(t))
            }
        }
        function p(e) {
            return y(g),
            s[e] ? s[e].file: e
        }
        function m(e) {
            var t;
            if (t = d.exec(e)) s[t[1] + t[3]] = {
                file: e,
                version: t[2]
            };
            else if (t = v.exec(e)) s[t[1]] = {
                file: e,
                version: t[2]
            }
        }
        function g() {
            l(document.getElementsByTagName("script")).forEach(function(e, t) {
                e.src && (a(e.src), m(e.src)),
                e.getAttribute("vsrc") && m(e.getAttribute("vsrc"))
            }),
            l(document.getElementsByTagName("link")).forEach(function(e, t) {
                e.rel && e.rel == "stylesheet" && (a(e.href), m(e.href)),
                e.getAttribute("vhref") && m(e.getAttribute("vhref"))
            }),
            e.log("load file version:"),
            e.log(s)
        }
        function y(e) {
            return window.runOnceFunc == null && (window.runOnceFunc = {}),
            window.runOnceFunc[e] ? null: (window.runOnceFunc[e] = !0, e())
        }
        var i = {},
        s = {};
        e.getFileVersionNum = function(e) {
            return s[e]
        };
        var d = new RegExp("(" + r + ")" + "(a?\\d+)/([^?]*)"),
        v = new RegExp("(.*)\\?ver=(d+)(..*)");
        e.getFileVersion = function(e) {
            for (var t = e.length - 1; t >= 0; t--) m(e[t])
        },
        e.loadFile = function(e, n, r) {
            t.ready(function() {
                h(e, n, r)
            })
        },
        e.loadFileForever = function(e, n, r) {
            t.ready(function() {
                h(e, n, r, !0)
            })
        },
        e.unloadFile = function(e) {
            e.parentNode && (e.parentNode.removeChild(e), i[encodeURIComponent(e.src)] = null)
        },
        e.clearFiles = function() {
            for (var t in i) i.hasOwnProperty(t) && i[t] && i[t].element && e.unloadFile(i[t].element)
        },
        e.loadFiles = function(t, n) {
            function i() {
                r--,
                r === 0 && n && n()
            }
            var r = t.length;
            t.forEach(function(t, n) {
                e.loadFile(t, i)
            })
        },
        e.getVersion = function(e) {
            m(e)
        },
        e.dynamicLoad = function(t) {
            t.funcs.forEach(function(n, r) {
                window[n] = function() {
                    var r = arguments;
                    window[n] = null,
                    t.file && (t.files = [t.file]),
                    e.loadFiles(t.files, 
                    function() {
                        window[n].apply(null, r),
                        t.callBack && t.callBack.call(null)
                    })
                }
            })
        },
        e.namespace("img"),
        e.img.getVersion = function(e) {
            return y(g),
            s[e] ? s[e].version: ""
        },
        e.img.getFullName = function(e) {
            return p(e)
        }
    } ()
}),
object.add("CX.array", "CX", 
function(e, t) {
    this.toQueryString = function(e, n) {
        var r = [],
        i;
        for (var s in e) {
            i = e[s];
            if (t.isFunction(i)) continue;
            t.isObject(i) ? r.push(arguments.callee(i, s)) : /^\d+$/.test(s) ? r.push((n || s) + "=" + encodeURIComponent(i)) : r.push(s + "=" + encodeURIComponent(i))
        }
        return r.join("&")
    },
    this.each = function(e, n) {
        if (!e) return;
        if (!t.isUndefined(e.length) || !t.isUndefined(e[0])) {
            for (var r = 0, i = e.length; r < i; r++) if (n.call(e, r, e[r]) === !1) break
        } else for (var s in e) if (!t.isFunction(e[s]) && n.call(e, s, e[s]) === !1) break
    },
    this.include = function(t, n) {
        var r = !1;
        return e.each(t, 
        function(e, t) {
            if (t === n) return r = !0,
            !1
        }),
        r
    },
    this.build = function(e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++) t.push(e[n]);
        return t
    }
}),
object.add("CX.func", 
function(e) {
    window.runOnceFunc == null && (window.runOnceFunc = {}),
    this.empty = function() {},
    this.runOnce = function(e) {
        return window.runOnceFunc[e] ? null: (window.runOnceFunc[e] = !0, e())
    }
}),
object.add("CX.string", "CX", 
function(e, t) {
    this.nl2br = function(e) {
        return (e || "").replace(/([^>])\n/g, "$1<br />")
    },
    this.trim = function(e) {
        return (e || "").replace(/^\s+|\s+$/g, "")
    },
    this.ltrim = function(e) {
        return (e || "").replace(/^\s+/, "")
    },
    this.rtrim = function(e) {
        return (e || "").replace(/\s+$/, "")
    },
    this.strip = function(t) {
        return e.trim(t)
    },
    this.stripTags = function(e) {
        return e.replace(/<\/?[^>]+>/igm, "")
    },
    this.escapeHTML = function(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    },
    this.unescapeHTML = function(e) {
        return e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
    },
    this.include = function(e, t) {
        return e.indexOf(t) > -1
    },
    this.startsWith = function(e, t) {
        return e.indexOf(t) === 0
    },
    this.endsWith = function(e, t) {
        var n = e.length - t.length;
        return n >= 0 && e.lastIndexOf(t) === n
    },
    this.isBlank = function(e) {
        return /^\s*$/.test(e)
    },
    this.isEmail = function(e) {
        return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(e)
    },
    this.isMobile = function(e) {
        return /^((\(\d{2,3}\))|(\d{3}\-))?((1[345]\d{9})|(18\d{9}))$/.test(e)
    },
    this.isUrl = function(e) {
        return /^(http:|ftp:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/.test(e)
    },
    this.isIp = function(e) {
        return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.test(e)
    },
    this.isNumber = function(e) {
        return /^\d+$/.test(e)
    },
    this.isZip = function(e) {
        return /^[1-9]\d{5}$/.test(e)
    },
    this.isEN = function(e) {
        return /^[A-Za-z]+$/.test(e)
    },
    this.isJSON = function(e) {
        return ! t.isString(e) || e === "" ? !1: (e = e.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, ""), /^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(e))
    },
    this.getQuery = function(e, t) {
        t = t || window.location.href + "",
        t.indexOf("#") !== -1 && (t = t.substring(0, t.indexOf("#")));
        var n = [],
        r,
        i = new RegExp("(^|\\?|&)" + e + "=([^&]*)(?=&|#|$)", "g");
        while ((r = i.exec(t)) != null) n.push(decodeURIComponent(r[2]));
        return n.length == 0 ? null: n.length == 1 ? n[0] : n
    },
    this.setQuery = function(e, n, r) {
        r = r || window.location.href + "";
        var i = "";
        if (!/^http/.test(r)) return r;
        r.indexOf("#") !== -1 && (i = r.substring(r.indexOf("#"))),
        r = r.replace(i, ""),
        r = r.replace(new RegExp("(^|\\?|&)" + e + "=[^&]*(?=&|#|$)", "g"), ""),
        n = t.isArray(n) ? n: [n];
        for (var s = n.length - 1; s >= 0; s--) n[s] = encodeURIComponent(n[s]);
        var o = e + "=" + n.join("&" + e + "=");
        return r + (/\?/.test(r) ? "&": "?") + o + i
    },
    this.isNum = this.isNumber
}),
object.add("CX.json", 
function(exports) {
    this._PARSE_DATE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/,
    this.dateToString = function(e) {
        function t(e) {
            return e < 10 ? "0" + e: e
        }
        return '"' + e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + 'Z"'
    },
    this.stringToDate = function(e) {
        if (exports._PARSE_DATE.test(e)) {
            var t = new Date;
            return t.setUTCFullYear(RegExp.$1, (RegExp.$2 | 0) - 1, RegExp.$3),
            t.setUTCHours(RegExp.$4, RegExp.$5, RegExp.$6),
            t
        }
    },
    this.parse = function(str) {
        return eval("(" + str + ")")
    },
    this.build = function(e, t, n) {
        return JSON.stringify(e, t, n)
    }
}),
object.add("CX.util", "CX, CX.json, CX.array, CX.event, CX.string", 
function(e, t) { ! window.__timeouts == null && (window.__timeouts = [], window.__intervals = []),
    this.setTimeout = function(e, t) {
        var n = setTimeout(e, t);
        return window.__timeouts.push(n),
        n
    },
    this.setInterval = function(e, t) {
        var n = setInterval(e, t);
        return window.__intervals.push(n),
        n
    },
    this.clearTimeout = function(e) {
        for (var t = 0; t < window.__timeouts.length; t++) window.__timeouts[t] == e && window.__timeouts.slice(t, 1);
        clearTimeout(e)
    },
    this.clearInterval = function(e) {
        for (var t = 0; t < window.__intervals.length; t++) window.__intervals[t] == e && window.__intervals.slice(t, 1);
        clearInterval(e)
    },
    this.clearAllTimer = function() {
        for (var e = 0; e < window.__timeouts.length; e++) clearTimeout(window.__timeouts[e]);
        for (var e = 0; e < window.__intervals.length; e++) clearInterval(window.__intervals[e]);
        window.__timeouts = [],
        window.__intervals = []
    },
    this.cache = function(e) {
        t.$extend(this, e),
        this._cacheData = []
    },
    this.cache.prototype = {
        cacheLength: null,
        _cacheData: null,
        isExist: function(e) {
            return this.get(e)
        },
        add: function(e, n) {
            if (!t.isUndefined(this.isExist(e))) return;
            this.cacheLength && this.cacheLength == this._cacheData.length && this._cacheData.shift(),
            this._cacheData.push({
                key: e,
                value: n
            })
        },
        get: function(e) {
            for (var t = this._cacheData.length - 1; t >= 0; t--) if (this._cacheData[t].key == e) return this._cacheData[t].value
        },
        clear: function() {
            this._cacheData = []
        }
    },
    function() {
        var n = {};
        e.hotKey = {
            add: function(e, r, i) {
                e = String(e).toLowerCase();
                var s = !1,
                o = !1,
                u = !1,
                a = null;
                /^\d+$/.test(e) ? a = parseInt(e) : (s = /ctrl|ctr|c/.test(e), o = /alt|a/.test(e), u = /shift|s/.test(e), /\d+/.test(e) ? a = parseInt(/\d+/.exec(e)[0]) : a = !1),
                n[e] = n[e] || {},
                n[e][r] = function(e) {
                    e = e || window.event,
                    code = e.keyCode;
                    if (s && !e.ctrlKey) return;
                    if (o && !e.altKey) return;
                    if (u && !e.shiftKey) return;
                    if (a && code !== a) return;
                    r.call(i || null),
                    t.event.stop(e)
                },
                t.event.addEvent(document, "keydown", n[e][r])
            },
            del: function(e, r) {
                e = String(e).toLowerCase(),
                t.event.delEvent(document, "keydown", n[e][r]),
                delete n[e][r]
            }
        }
    } (),
    function() {
        var t = 0;
        e.createObjID = function() {
            return t++,
            t
        }
    } ()
}),
object.add("CX.datasource", "CX, CX.json, CX.net, CX.string, CX.array", 
function(e, t) {
    this.DS_JSON = function(e) {
        t.$extend(this, e)
    },
    this.DS_JSON.prototype = {
        DS_TYPE: "JSON",
        url: null,
        queryParam: "query",
        attachParam: "",
        rootKey: null,
        method: "get",
        _request: null,
        query: function(e, n) {
            function s(e) {
                e = e.responseText;
                var i;
                try {
                    var s = t.json.parse(e);
                    r.rootKey && s[r.rootKey] ? i = s[r.rootKey] : i = s
                } catch(o) {
                    i = []
                }
                n(i)
            }
            var r = this;
            try {
                this._request.abort()
            } catch(i) {}
            this._request = new t.net.xmlhttp({
                url: this.url,
                data: this.queryParam + "=" + encodeURIComponent(e) + "&" + this.attachParam,
                method: this.method,
                onSuccess: s
            })
        }
    },
    this.DS_friends = function(n) {
        var r = new e.DS_JSON(n);
        r.queryParam = "p",
        r.rootKey = "candidate",
        r.net = "",
        r.group = "",
        r.page = t.isUndefined(n.page) ? !1: n.page,
        r.param = t.json.build(n.param || {});
        var i = t.isUndefined(n.limit) ? 24: n.limit;
        return r.query = function(n, r) {
            t.log("start query"),
            n = n.replace(/[^a-zA-Z\u0391-\uFFE5]/g, "");
            if (t.string.isBlank(n) && this.group == "" && this.net == "") {
                r([]);
                return
            }
            var s = ['{"init":false,', '"qkey":"' + this.qkey + '",', '"uid":true,', '"uname":true,', '"uhead":true,', '"limit":' + i + ",", '"param":' + this.param + ",", '"query":"' + n + '",', '"group":"' + this.group + '",', '"net":"' + this.net + '",', '"page":"' + this.page + '"', "}"].join("");
            e.DS_JSON.prototype.query.call(this, s, r)
        },
        r
    },
    this.DS_Array = function(e) {
        t.$extend(this, e),
        this.init()
    },
    this.DS_Array.prototype = {
        DS_TYPE: "array",
        data: null,
        searchKey: null,
        init: function() {
            var e = this.searchKey,
            n = this._index = [];
            t.array.each(this.data, 
            function(t, r) {
                n.push(r[e])
            })
        },
        query: function(e, t) {
            t(this._search(e))
        },
        _search: function(e) {
            var n = this._index,
            r = this.data,
            i = [],
            s = new RegExp("^" + e, "i");
            return t.array.each(n, 
            function(e, t) {
                s.test(t) && i.push(r[e])
            }),
            i
        }
    },
    this.DS_XHR = function(e) {
        t.$extend(this, e)
    },
    this.DS_XHR.prototype = {
        url: null,
        queryParam: "query",
        _request: null,
        query: function(e, n) {
            function s(e) {
                function i(e) {
                    var n = {};
                    return t.array.each(e.childNodes, 
                    function(e, t) {
                        n[t.tagName.toLowerCase()] = t.firstChild.nodeValue
                    }),
                    n
                }
                e = e.responseXML;
                var r = [];
                try {
                    var s = e.getElementsByTagName("Result");
                    t.array.each(s, 
                    function(e, t) {
                        r.push(i(t))
                    })
                } catch(o) {
                    r = []
                }
                n(r)
            }
            var r = this;
            try {
                this._request.abort()
            } catch(i) {}
            this._request = new t.net.xmlhttp({
                url: this.url,
                data: this.queryParam + "=" + encodeURIComponent(e),
                onSuccess: s
            })
        }
    }
}),
object.add("CX.browser", "sys, CX", 
function(e, t, n) {
    this.IE = !!window.attachEvent && !window.opera,
    this.IE10 = this.IE && 
    function() {
        "use strict";
        return this === undefined
    } (),
    this.IE9 = navigator.userAgent.indexOf("MSIE 9.0") > -1,
    this.IE8 = !this.IE9 && navigator.userAgent.indexOf("MSIE 8.0") > -1,
    this.IE7 = !this.IE9 && !this.IE8 && navigator.userAgent.indexOf("MSIE 7.0") > -1,
    this.IE6 = !this.IE9 && !this.IE8 && !this.IE7 && navigator.userAgent.indexOf("MSIE 6.0") > -1,
    this.Opera = !!window.opera,
    this.WebKit = navigator.userAgent.indexOf("AppleWebKit/") > -1,
    this.Gecko = navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1,
    this.copy = function(e) {
        function r() {
            n.isElement(e) && e.select()
        }
        var i;
        n.isElement(e) ? i = e.value: i = e;
        var s = t.modules["CX.Do"];
        return ! window.clipboardData || !clipboardData.setData ? (s ? s.alert({
            message: "您的浏览器不支持脚本复制,请尝试手动复制",
            callBack: function() {
                r()
            }
        }) : alert("您的浏览器不支持脚本复制,请尝试手动复制"), !1) : clipboardData.setData("text", i) ? !0: (s ? s.alert({
            message: "您的浏览器设置不允许脚本访问剪切板",
            callBack: function() {
                r()
            }
        }) : alert("您的浏览器设置不允许脚本访问剪切板"), !1)
    }
}),
object.add("CX.cookie", "CX", 
function(e, t) {
    this.get = function(e) {
        var t = e + "=",
        n = document.cookie.split(";");
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            while (i.charAt(0) == " ") i = i.substring(1, i.length);
            if (i.indexOf(t) == 0) return decodeURIComponent(i.substring(t.length, i.length))
        }
        return null
    },
    this.set = function(e, n, r, i, s, o) {
        var u;
        if (t.isNumber(r)) {
            var a = new Date;
            a.setTime(a.getTime() + r * 24 * 60 * 60 * 1e3),
            u = a.toGMTString()
        } else t.isString(r) ? u = r: u = !1;
        document.cookie = e + "=" + encodeURIComponent(n) + (u ? ";expires=" + u: "") + (i ? ";path=" + i: "") + (s ? ";domain=" + s: "") + (o ? ";secure": "")
    },
    this.del = function(t, n, r, i) {
        e.set(t, "", -1, n, r, i)
    }
}),
object.add("CX.net", "CX, CX.form, CX.util, CX.event, CX.func, CX.browser, CX.element", 
function(e, t) {
    window.__ajaxProxies || (window.__ajaxProxies = {}),
    this.sendForm = function(n) {
        return t.log("send form"),
        n.data = t.form.serialize(n.form),
        new e.xmlhttp(n)
    },
    this.sendStats = function(e) {
        var t = "log_" + (new Date).getTime(),
        n = window[t] = new Image;
        n.onload = n.onerror = function() {
            window[t] = null
        },
        n.src = e,
        n = null
    },
    this.xmlhttp = function(n) {
        function s(e) {
            return r.transport = r.getTransport(e),
            r.url && r.send(r.method)
        }
        if (window._developer_no_ajax) return;
        var r = this;
        e.cache || (e.cache = new t.util.cache);
        if (arguments.length > 1) return this.url = arguments[0] || null,
        this.data = arguments[1] || "",
        this.onSuccess = arguments[2],
        extendObject(this, arguments[3]),
        s(window),
        this;
        extendObject(this, n);
        var i;
        if (this.useCache && (i = e.cache.get(this.url + encodeURIComponent(this.data)))) return this.transport = {},
        this.transport.responseText = i,
        setTimeout(function() {
            r._onComplete(),
            r._onSuccess()
        },
        0),
        this;
        var o = t.element.$element("a");
        o.href = this.url;
        var u = o.hostname,
        a = o.protocol;
        if (/^http/.test(this.url) && location.hostname != u) if (window.__ajaxProxies[u])(function() {
            window.__ajaxProxies[u].loaded ? s(window.__ajaxProxies[u].contentWindow) : setTimeout(arguments.callee, 100)
        })();
        else {
            var f = t.element.$element("iframe").hide();
            document.body.insertBefore(f, document.body.firstChild);
            var l = a + "//" + u + "/ajaxproxy.htm";
            if (u.indexOf("notice.") != -1 || u.indexOf("music.") != -1) l += "?v=1";
            f.src = l,
            window.__ajaxProxies[u] = f,
            window.__ajaxProxies[u].loaded = !1,
            t.event.addEvent(f, "load", 
            function() {
                if (f.contentWindow.location.href !== f.src) f.contentWindow.location.href = f.src;
                else try {
                    s(f.contentWindow),
                    window.__ajaxProxies[u] = f,
                    window.__ajaxProxies[u].loaded = !0
                } catch(e) {}
            })
        } else s(window);
        return r
    },
    this.xmlhttp.prototype = {
        url: null,
        data: "",
        onStart: new Function,
        onSuccess: null,
        onFailure: null,
        onError: null,
        fillTo: null,
        method: "post",
        asynchronous: !0,
        transport: null,
        headers: null,
        iAmXmlhttp: !0,
        useCache: !1,
        requestToken: !0,
        binary: !1,
        formData: !1,
        abort: function() {
            this.transport.abort()
        },
        send: function(e) {
            function a(e) {
                var t = "";
                for (var n in e) t = t + "&" + n + "=" + encodeURIComponent(e[n]);
                var r = (new Image).src = "http://123.125.44.44/r/?t=" + (new Date).getTime() + t
            }
            var n;
            e == "get" && this.data !== "" ? n = this.url + (/\?/.test(this.url) ? "&": "?") + this.data: n = this.url,
            this.transport.onreadystatechange = this.onStateChange.bind(this),
            this.transport.open(e, n, this.asynchronous),
            this.formData || this.transport.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if (this.headers !== null) for (var r in this.headers) this.transport.setRequestHeader(r, this.headers[r]); (this.headers == null || !this.headers["X-Requested-With"]) && this.transport.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            var i = null;
            e.toLowerCase() == "post" && (i = this.data, this.requestToken && t.get_check && (i += (i ? "&": "") + "requestToken=" + t.get_check), this.requestToken && t.get_check_x && (i += (i ? "&": "") + "_rtk=" + t.get_check_x));
            try {
                if (window.event && document.body.id == "profile" && e == "get" && /(none|null)\b/.test(this.url) && t.user.id % 10 == 0) {
                    var s = document.createElement("div"),
                    o = event.srcElement;
                    s.appendChild(o);
                    if (o) {
                        var i = {
                            from: "profile",
                            nodeHTML: s.innerHTML
                        };
                        a(i)
                    }
                }
            } catch(u) {}
            this.binary ? this.transport.sendAsBinary(i) : this.transport.send(i)
        },
        _onSuccess: function(e) {
            var n = this.transport;
            if (this.fillTo !== null) {
                try {
                    this.fillTo.stopLoading()
                } catch(r) {}
                this.fillTo.innerHTML = n.responseText
            }
            try {
                this.onSuccess && this.onSuccess.call(null, n)
            } catch(r) {
                if (t.DEBUG_MODE) throw r
            }
        },
        _onComplete: function(e) {
            var n = this.transport;
            try {
                this.onComplete && this.onComplete.call(null, n)
            } catch(r) {
                if (t.DEBUG_MODE) throw r
            }
        },
        onStateChange: function() {
            var n = this.transport;
            n.readyState == 1 && !this.hasRunStart ? (this.onStart(), this.hasRunStart = !0) : n.readyState == 4 && (n.status == undefined || n.status == 0 || n.status >= 200 && n.status < 300 ? (this.useCache && e.cache.add(this.url + encodeURIComponent(this.data), this.transport.responseText), this._onSuccess()) : (this.onError || this.onFailure || t.func.empty).call(null, n), this._onComplete())
        }
    },
    this.xmlhttp.prototype.getTransport = function(e) {
        if (e != window) return e.getTransport();
        if (!t.browser.IE) return new XMLHttpRequest;
        try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch(n) {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
    },
    this.ajax = this.xmlhttp,
    t.$extend(this.xmlhttp.prototype, {
        get: function(e, n, r, i) {
            this.url = e,
            this.data = n,
            this.onSuccess = r,
            t.$extend(this, i),
            this.send("get")
        },
        post: function(e, n, r, i) {
            this.url = e,
            this.data = n,
            this.onSuccess = r,
            t.$extend(this, i),
            this.send("post")
        }
    }),
    typeof Ajax == "undefined" && (Ajax = {},
    Ajax.Request = function(t, n) {
        var r = n.parameters;
        return n.url = t,
        n.data = r,
        delete n.parameters,
        new e.xmlhttp(n)
    })
}),
object.add("CX.env", 
function(e) {
    this.shortSiteName = "人人",
    this.siteName = "车协人平台",
    this.domain = "chexie.org",
    this.domain_reg = this.domain.replace(/\./g, "\\."),
    this.staticRoot = "http://s.xnimg.cn/",
    this.CDNstaticRoot = "http://a.xnimg.cn/",
    this.swfRoot = "http://static.xiaonei.com/",
    this.wwwRoot = "http://" + this.domain + "/"
}),
object.add("CX.event", "CX, CX.browser, CX.array, CX.element, ua", 
function(e, t) {
    var n = t.browser,
    r = [];
    this.ignoreEvent = !1,
    this.logEvents = !1,
    this.isCapsLockOn = function(e) {
        var t = e.keyCode || e.which,
        n = e.shiftKey;
        return t >= 65 && t <= 90 && !n || t >= 97 && t <= 122 && n ? !0: !1
    },
    this.element = function(t) {
        var n = t.target || t.srcElement;
        return e.resolveTextNode(n)
    },
    this.relatedTarget = function(t) {
        var n = t.relatedTarget;
        return n || (t.type == "mouseout" || t.type == "mouseleave" ? n = t.toElement: t.type == "mouseover" && (n = t.fromElement)),
        e.resolveTextNode(n)
    },
    this.resolveTextNode = function(e) {
        try {
            if (e && 3 == e.nodeType) return e.parentNode
        } catch(t) {}
        return e
    },
    this.pointerX = function(e) {
        return e.pageX || e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)
    },
    this.pointerY = function(e) {
        return e.pageY || e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)
    },
    this.isStrictMode = document.compatMode != "BackCompat",
    this.pageHeight = function() {
        return this.isStrictMode ? Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) : Math.max(document.body.scrollHeight, document.body.clientHeight)
    },
    this.pageWidth = function() {
        return this.isStrictMode ? Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) : Math.max(document.body.scrollWidth, document.body.clientWidth)
    },
    this.winWidth = function() {
        return this.isStrictMode ? document.documentElement.clientWidth: document.body.clientWidth
    },
    this.winHeight = function() {
        return this.isStrictMode ? document.documentElement.clientHeight: document.body.clientHeight
    },
    this.scrollTop = function() {
        return t.browser.WebKit ? window.pageYOffset: this.isStrictMode ? document.documentElement.scrollTop: document.body.scrollTop
    },
    this.scrollLeft = function() {
        return t.browser.WebKit ? window.pageXOffset: this.isStrictMode ? document.documentElement.scrollLeft: document.body.scrollLeft
    },
    this.stop = null,
    this.clearEvents = function() {
        for (var t, n = 0; t = r[n]; n++) e.delEvent.apply(e, t);
        r = []
    },
    this.addEvent = function(n, i, s, o) {
        if (e.ignoreEvent) return;
        var u = [];
        return n = t.element.$(n),
        t.isArray(n) ? u = n: u.push(n),
        u.length == 0 ? n: (t.array.each(u, 
        function(t, n) {
            e.logEvents && r.push([n, i, s, o]),
            e._addEvent(n, i, s, o)
        }), n)
    },
    this.delEvent = function(n, r, i, s) {
        var o = [];
        return n = t.element.$(n),
        t.isArray(n) ? o = n: o.push(n),
        o.length == 0 ? n: (t.array.each(o, 
        function(t, n) {
            e._delEvent(n, r, i, s)
        }), n)
    },
    this._addEvent = null,
    this._delEvent = null,
    this.enableCustomEvent = function(e) {
        return t.$extend(e, {
            addEvent: function(e, n) {
                this._customEventListeners || (this._customEventListeners = {});
                var r = this._customEventListeners;
                return t.isUndefined(r[e]) && (r[e] = []),
                r[e].push(n),
                this
            },
            delEvent: function(e, t) {
                var n = this._customEventListeners[e];
                if (n) for (var r = n.length - 1; r >= 0; r--) if (n[r] == t) {
                    n[r] = null;
                    break
                }
                return this
            },
            fireEvent: function(e) {
                if (!this._customEventListeners || !this._customEventListeners[e]) return;
                var n = this._customEventListeners[e],
                r = t.array.build(arguments);
                r.shift();
                for (var i = 0, s = n.length; i < s; i++) if (n[i]) try {
                    n[i].apply(this, r)
                } catch(o) {
                    if (t.DEBUG_MODE) throw o
                }
            }
        }),
        e
    },
    document.addEventListener ? this.stop = function(e) {
        e.preventDefault(),
        e.stopPropagation()
    }: this.stop = function(e) {
        e.returnValue = !1,
        e.cancelBubble = !0
    };
    var i = function(e, t) {
        var n = e.relatedTarget;
        while (n && n != t) try {
            n = n.parentNode
        } catch(r) {
            n = t
        }
        return n !== t
    };
    if (window.attachEvent && !n.Opera) {
        function s(e) {
            return e.stopPropagation = function() {
                this.cancelBubble = !0
            },
            e.preventDefault = function() {
                this.returnValue = !1
            },
            e
        }
        this._addEvent = function(e, n, r) {
            if (!e) return;
            e = t.element.$(e),
            n == "input" && (n = "propertychange"),
            n == "keypress" && (n = "keydown"),
            e._eventListeners || (e._eventListeners = {}),
            e._eventListeners[n] || (e._eventListeners[n] = []);
            var i = function() {
                var t = s(window.event);
                r.call(e, t)
            };
            return i.innerFunc = r,
            e._eventListeners[n].push(i),
            e.attachEvent("on" + n, i),
            e
        },
        this._delEvent = function(e, n, r) {
            e = t.element.$(e),
            n == "input" && (n = "propertychange"),
            n == "keypress" && (n = "keydown");
            if (!e._eventListeners[n]) return;
            for (var i = 0, s; i < e._eventListeners[n].length; i++) {
                s = e._eventListeners[n][i];
                if (s.innerFunc === r) break
            }
            return e.detachEvent("on" + n, s),
            e
        }
    } else window.addEventListener && (this._addEvent = function(e, r, s, o) {
        return e = t.element.$(e),
        r == "mouseleave" ? (e.onmouseleave = function(t) {
            t = t || window.event,
            i(t, e) && s && s.call(e, t)
        },
        e.addEventListener("mouseout", e.onmouseleave, o), e) : (r == "keypress" && n.WebKit && (r = "keydown"), e.addEventListener(r, s, o), e)
    },
    this._delEvent = function(e, r, i, s) {
        return e = t.element.$(e),
        r == "mouseleave" ? (e.removeEventListener("mouseout", e.onmouseleave, s), e) : (r == "keypress" && n.WebKit && (r = "keydown"), e.removeEventListener(r, i, s), e)
    })
}),
object.define("CX.dom", "dom, ua, CX, CX.event, CX.array, CX.browser, CX.element", 
function(require, e) {
    function a(e, t) {
        function i() {
            n.hide(),
            n.style.height = r.event.pageHeight() + "px",
            n.style.width = r.event.pageWidth() + "px",
            n.show()
        }
        e = e || .3,
        t = t || 2e3;
        var n = r.element.$element("div");
        u = n,
        n.style.position = "absolute",
        n.style.top = 0,
        n.style.left = 0,
        n.style.background = "#000",
        n.style.zIndex = t,
        n.style.opacity = e,
        n.style.filter = "alpha(opacity=" + e * 100 + ")",
        n.innerHTML = ['<iframe width="100%" height="100%" frameBorder="0" style="position:absolute;top:0;left:0;z-index:1;"></iframe>', '<div style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000000;z-index:2;height:expression(this.parentNode.offsetHeight);"></div>'].join(""),
        i(),
        r.event.addEvent(window, "resize", 
        function(e) {
            if (u && u.style.display != "none") try {
                i()
            } catch(e) {}
        }),
        document.body.insertBefore(n, document.body.firstChild)
    }
    require("CX.event"),
    require("CX.array"),
    require("CX.browser"),
    require("CX.element");
    var t = require("dom"),
    n = require("ua"),
    r = require("CX"),
    i = r.event,
    s = r.array,
    o = r.browser,
    u = null;
    this.disable = function(e, t) {
        u || a(e, t)
    },
    this.enable = function() {
        u && (u.remove(), u = null)
    },
    this.insertAfter = function(e, t) {
        e = r.element.$(e),
        t = r.element.$(t);
        var n = t.parentNode;
        n.lastChild == t ? n.appendChild(e) : n.insertBefore(e, t.nextSibling)
    },
    this.getElementsByClassName = function(e, t, n) {
        var i = (r.element.$(t) || document).getElementsByTagName(n || "*") || document.all,
        o = [],
        u = new RegExp("(^|\\s)" + e + "(\\s|$)");
        return s.each(i, 
        function(e, t) {
            u.test(t.className) && o.push(t)
        }),
        o
    },
    this.findFirstClass = function(t, n) {
        t = r.element.$(t);
        var i = e.getElementsByClassName(n, t);
        return r.element.$(i[0]) || null
    },
    this.ready = function(e, n) {
        r.isUndefined(n) && (n = !1);
        var i = n ? 
        function() {
            setTimeout(e, 0)
        }: e;
        t.ready(i)
    },
    this.preloadImg = function(e) {
        e = r.isArray(e) ? e: [e],
        s.each(e, 
        function(e, t) { (new Image).src = t
        })
    },
    this.readyDo = this.ready
}),
object.add("CX.element", "sys, CX, CX.browser, CX.env", 
function(exports, sys, CX) {
    function getDom(e) {
        var t = document.createElement("div");
        t.style.display = "none",
        document.body.appendChild(t),
        t.innerHTML = e;
        var n = document.createElement("div");
        while (t.firstChild) n.appendChild(t.firstChild);
        return t.parentNode.removeChild(t),
        n
    }
    var browser = CX.browser,
    _extends = ["clear", "hover", "scrollTo", "visible", "toggleClass", "toggleText", "hasClassName", "addClass", "delClass", "show", "hide", "remove", "setStyle", "getStyle", "addEvent", "delEvent", "_eventListeners", "matchesSelector", "getData", "delegate", "addChild", "delChild", "setContent", "setHTML", "getPosition", "realLeft", "realTop", "appendHTML", "html", "parent", "startLoading", "stopLoading", "eval_inner_JS", "extend", "setOpacity", "findFirstClass"],
    _effect = sys.modules["CX.effect"],
    t = document.createElement("div");
    t.innerHTML = "<TEST_TAG></TEST_TAG>";
    var needGetDom = t.firstChild === null;
    this.clear = function(e) {
        return e = exports.$(e),
        e.innerHTML = "",
        e
    },
    this.hover = function(e, t, n) {
        e = exports.$(e),
        n = n ? exports.$(n) : e;
        var r = sys.modules["CX.event"];
        if (!r) throw new Error("请先导入CX.event模块，再使用CX.event.addEvent");
        return r.addEvent(e, "mouseover", 
        function() {
            n.addClass(t)
        },
        !1),
        r.addEvent(e, "mouseleave", 
        function() {
            n.delClass(t)
        },
        !1),
        e
    },
    this.scrollTo = function(e, t) {
        e = exports.$(e),
        _effect || (t = "normal");
        switch (t) {
        case "slow":
            CX.effect.scrollTo(e);
            break;
        default:
            window.scrollTo(0, e.realTop())
        }
        return e
    },
    this.visible = function(e) {
        return e = exports.$(e),
        e.style.display != "none" && e.style.visibility != "hidden"
    },
    this.toggleClass = function(e, t, n) {
        return CX.isUndefined(n) ? exports.hasClassName(e, t) ? exports.delClass(e, t) : exports.addClass(e, t) : exports.hasClassName(e, t) ? (exports.delClass(e, t), exports.addClass(e, n)) : (exports.addClass(e, t), exports.delClass(e, n)),
        exports.$(e)
    },
    this.toggleText = function(e, t, n) {
        e.innerHTML == t ? e.innerHTML = n: e.innerHTML = t
    },
    this.hasClassName = function(e, t) {
        return (new RegExp("(^|\\s+)" + t + "(\\s+|$)")).test(exports.$(e).className)
    },
    this.addClass = function(e, t) {
        return e = exports.$(e),
        exports.hasClassName(e, t) ? e: (e.className += " " + t, e)
    },
    this.delClass = function(e, t) {
        return e = exports.$(e),
        e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)", "g"), " "),
        e
    },
    this.show = function(e, t) {
        e = exports.$(e);
        if (e.style.display != "none") return;
        if (!_effect || !t) t = "normal";
        switch (t) {
        case "normal":
            e.style.display = "";
            break;
        case "fade":
            CX.effect.fadeIn(e, 
            function(e) {
                e.style.display = ""
            });
            break;
        case "slide":
            CX.effect.slideOpen(e);
            break;
        case "delay":
            setTimeout(function() {
                e.style.display = ""
            },
            2e3)
        }
        return e
    },
    this.hide = function(e, t) {
        e = exports.$(e);
        if (e.style.display == "none") return;
        if (!_effect || !t) t = "normal";
        switch (t) {
        case "normal":
            e.style.display = "none";
            break;
        case "fade":
            CX.effect.fadeOut(e, 
            function(e) {
                e.style.display = "none"
            });
            break;
        case "slide":
            CX.effect.slideClose(e);
            break;
        case "delay":
            setTimeout(function() {
                e.style.display = "none"
            },
            2e3)
        }
        return e
    },
    this.remove = function(e) {
        var e = exports.$(e);
        return e && e.parentNode.removeChild(e),
        e
    },
    this.setStyle = function(e, t) {
        var e = exports.$(e);
        return e.style.cssText += ";" + t,
        e
    },
    this.getStyle = function(e, t) {
        e = exports.$(e),
        t = t == "float" ? "cssFloat": t;
        var n = e.style[t];
        if (!n) {
            var r = document.defaultView.getComputedStyle(e, null);
            n = r ? r[t] : null
        }
        return t == "opacity" ? n ? parseFloat(n) : 1: n == "auto" ? null: n
    },
    this.addEvent = function() {
        var e = sys.modules["CX.event"];
        if (!e) throw new Error("请先导入CX.event模块，再使用CX.event.addEvent");
        return e.addEvent.apply(null, arguments),
        arguments[0]
    },
    this.delEvent = function() {
        var e = sys.modules["CX.event"];
        if (!e) throw new Error("请先导入CX.event模块，再使用CX.event.delEvent");
        return e.delEvent.apply(null, arguments),
        arguments[0]
    },
    this._eventListeners = {},
    this.matchesSelector = function(e, t) {
        return Sizzle.matches(t, [e]).length > 0
    },
    this.getData = function(e, t) {
        return e.getAttribute("data-" + t)
    },
    this.delegate = function(e, t, n, r) {
        exports.$(e).addEvent(n, 
        function(e) {
            var n = exports.$(e.target || e.srcElement);
            do n && n.matchesSelector(t) && r.call(n, e);
            while (n = exports.$(n.parentNode))
        })
    },
    this.addChild = function(e, t) {
        e = exports.$(e);
        if (CX.isString(t) || CX.isNumber(t)) {
            var n = String(t).charAt(0) == "#" ? Sizzle(t)[0] : t;
            CX.isString(t) || CX.isNumber(t) ? e.innerHTML += n: e.appendChild(n)
        } else CX.isElement(t) ? e.appendChild(t) : t.iAmUIelement ? e.appendChild(exports.$(t.frame)) : t.iAmXmlhttp && (t.fillTo = e, e.startLoading());
        return e
    },
    this.delChild = function(e, t) {
        return t = exports.$(t),
        t.remove(),
        exports.$(e)
    },
    this.setContent = function(e, t) {
        return e = exports.$(e),
        e.innerHTML = "",
        e.addChild(t),
        e
    },
    this.setHTML = function(e, t) {
        if (needGetDom) {
            e.innerHTML = "";
            var n = getDom(t);
            while (n.firstChild) e.appendChild(n.firstChild)
        } else e.innerHTML = t
    },
    this.getPosition = function(e, t) {
        t = exports.$(t) || document.body,
        e = exports.$(e);
        var n = 0,
        r = 0,
        i = e;
        try {
            while (i && i != t) n += i.offsetLeft,
            r += i.offsetTop,
            i = i.offsetParent
        } catch(s) {}
        return {
            left: n,
            top: r
        }
    },
    this
    .realLeft = function(e, t) {
        return exports.getPosition(e, t || null).left
    },
    this.realTop = function(e, t) {
        return exports.getPosition(e, t || null).top
    },
    this.appendHTML = function(e, t, n) {
        e = exports.$(e);
        var r = document.createDocumentFragment(),
        i = exports.$element("div");
        i.innerHTML = t;
        while (i.firstChild) r.appendChild(i.firstChild);
        var s = CX.array.build(r.childNodes);
        return e.appendChild(r),
        n ? s: e
    },
    this.html = function(e, t) {
        e.innerHTML = t
    },
    this.parent = function(e, t) {
        while (e) {
            if (!e.parentNode) return null;
            e = exports.$(e.parentNode);
            if (e.matchesSelector(t)) return e
        }
    },
    this.startLoading = function(e, t) {
        return e = exports.$(e),
        e.innerHTML = '<center><img src="' + CX.env.staticRoot + 'img/indicator.gif" />' + (t || "加载中...") + "</center>",
        e
    },
    this.stopLoading = function(e) {
        return e = exports.$(e),
        e
    },
    this.eval_inner_JS = function(el) {
        var js = exports.$(el).getElementsByTagName("script");
        CX.array.each(js, 
        function(i, s) {
            if (s.src) CX.loadFile(s.src);
            else {
                var inner_js = "__inner_js_out_put = [];\n";
                inner_js += s.innerHTML.replace(/document\.write/g, "__inner_js_out_put.push"),
                eval(inner_js);
                if (__inner_js_out_put.length !== 0) {
                    var tmp = document.createDocumentFragment();
                    exports.$(tmp).appendHTML(__inner_js_out_put.join("")),
                    s.parentNode.insertBefore(tmp, s)
                }
            }
        })
    };
    var sign = {},
    build = CX.array.build;
    this.extend = function(e) {
        if (e._extended) return e;
        var t = exports.extend.cache;
        for (var n = 0, r, i = _extends.length; n < i; n++) r = _extends[n],
        exports[r] != null && !(r in e) && (e[r] = t.findOrStore(exports[r]));
        return e._extended = sign,
        e
    },
    this.extend.cache = {
        findOrStore: function(e) {
            return this[e] || (this[e] = function() {
                var t = build(arguments);
                return t.unshift(this),
                e.apply(null, t)
            }),
            this[e]
        }
    },
    browser.IE && (this.getStyle = function(e, t) {
        e = exports.$(e),
        t = t == "float" || t == "cssFloat" ? "styleFloat": t;
        var n = e.style[t]; ! n && e.currentStyle && (n = e.currentStyle[t]);
        if (t == "opacity") {
            if (n = (e.getStyle("filter") || "").match(/alpha\(opacity=(.*)\)/)) if (n[1]) return parseFloat(n[1]) / 100;
            return 1
        }
        return n == "auto" ? t != "width" && t != "height" || e.getStyle("display") == "none" ? null: e["offset" + (t == "width" ? "Width": "Height")] + "px": n
    }),
    document.addEventListener ? this.setOpacity = function(e, t) {
        return e = exports.$(e),
        e.style.opacity = t,
        e
    }: this.setOpacity = function(e, t) {
        return e = exports.$(e),
        e.style.zoom = 1,
        e.style.filter = "Alpha(opacity=" + Math.ceil(t * 100) + ")",
        e
    },
    this.$element = function(e) {
        return exports.$(document.createElement(e))
    },
    this.$ = function(e) {
        var t;
        return e == null ? t = null: CX.isString(e) || CX.isNumber(e) ? t = Sizzle("#" + e)[0] : t = e,
        t && exports.extend(t),
        t || null
    }
}),
object.add("CX.template", "CX.env", 
function(e, t) {
    this.smediaPlayer = function(e) {
        return ['<object classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" width="' + (e.width || "352") + '" height="' + (e.height || "70") + '" >\n', '<param name="autostart" value="' + (e.autostart || "1") + '" >\n', '<param name="showstatusbar" value="' + (e.showstatusbar || "1") + '">\n', '<param name="filename" value="' + e.filename + '">\n', '<embed type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" ', 'flename="mp"', 'autostart="' + (e.autostart || "1") + '" showstatusbar="' + (e.showstatusbar || "1") + '" ', 'src="' + e.filename + '" width="' + (e.width || "352") + '" height="' + (e.height || "70") + '"></embed>'].join("")
    },
    this.flashPlayer = function(e) {
        return '<embed allowScriptAccess="' + (e.allowScriptAccess || "none") + '" src="' + t.env.staticRoot + "/swf/player.swf?url=" + encodeURIComponent(e.filename) + "&Rwid=" + (e.width || "450") + "&Autoplay=" + (e.autostart || "1") + '" wmode="' + (e.wmode || "transparent") + '" loop="false" menu="false" quality="high" scale="noscale" salign="lt" bgcolor="#ffffff" width="' + (e.width || "450") + '" height="' + (e.height || "30") + '" align="middle"  allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
    },
    this.flash = function(e) {
        return '&nbsp;<embed src="' + e.filename + '" type="application/x-shockwave-flash" ' + 'width="' + (e.width || "320") + '" height="' + (e.height || "240") + '" allowFullScreen="true" wmode="' + (e.wmode || "transparent") + '" allowNetworking="' + (e.allowNetworking || "all") + '" allowScriptAccess="' + (e.allowScriptAccess || "sameDomain") + '" flashvars="' + e.flashVars + '"></embed>'
    }
}),
object.add("CX.form", "sys, CX, CX.event, CX.json, CX.array, CX.element, CX.string, CX.env", 
function(e, t, n) {
    this.fillWithJSON = function(t, r) {
        t = n.element.$(t),
        e.fillWithArray(t, n.json.parse(r))
    },
    this.fillWithArray = function(t, r) {
        t = n.element.$(t);
        for (var i in r) e.Element.setValue(i, r[i], t)
    },
    this.setValue = function(t, n) {
        return e.Element.setValue(t, n)
    },
    this.getValue = function(t) {
        return e.Element.getValue(t)
    },
    this.serialize = function(t, n) {
        return e.serializeElements(e.getElements(t), n || "string")
    },
    this.serializeElements = function(t, r, i) {
        r = r || "array",
        n.isUndefined(i) && (i = !1);
        var s = [],
        o,
        u;
        n.array.each(t, 
        function(t, r) { ! r.disabled && r.name && (o = r.name, u = i ? encodeURIComponent(e.Element.getValue(r)) : e.Element.getValue(r), u !== null && (o in s ? (n.isArray(s[o]) || (s[o] = [s[o]]), s[o].push(u)) : s[o] = u))
        });
        if (r == "array") return s;
        if (r == "string") return n.array.toQueryString(s);
        if (r == "hash") {
            var a = {};
            for (var f in s) n.isFunction(s[f]) || (a[f] = s[f]);
            return a
        }
    },
    this.getElements = function(t) {
        t = n.element.$(t);
        var r = [],
        i = t.getElementsByTagName("*");
        return n.array.each(i, 
        function(t, i) {
            n.isUndefined(e.Element.Serializers[i.tagName.toLowerCase()]) || r.push(i)
        }),
        r
    },
    this.Element = {
        getValue: function(t) {
            t = n.element.$(t);
            var r = t.tagName.toLowerCase();
            return e.Element.Serializers[r](t)
        },
        setValue: function(t, r, i) {
            if (i) {
                t = i[t];
                if (n.isElement(t) && t.tagName.toLowerCase() == "select") e.Element.Serializers.select(t, r);
                else if (n.isElement(t)) e.Element.Serializers[t.tagName.toLowerCase()](t, r);
                else if (t[0]) {
                    var s = t[0].tagName.toLowerCase();
                    for (var o = 0, u = t.length; o < u; o++) e.Element.Serializers[s](t[o], r[o] || r || "")
                }
                return t
            }
            t = n.element.$(t);
            var s = t.tagName.toLowerCase();
            return e.Element.Serializers[s](t, r),
            t
        }
    },
    this.Element.Serializers = {
        input: function(t, n) {
            switch (t.type.toLowerCase()) {
            case "checkbox":
            case "radio":
                return e.Element.Serializers.inputSelector(t, n);
            default:
                return e.Element.Serializers.textarea(t, n)
            }
        },
        inputSelector: function(e, t) {
            if (n.isUndefined(t)) return e.checked ? e.value: null;
            e.checked = !!t
        },
        textarea: function(e, t) {
            if (n.isUndefined(t)) return e.value;
            e.value = t
        },
        select: function(e, t) {
            if (n.isUndefined(t)) return this[e.type == "select-one" ? "selectOne": "selectMany"](e);
            var r,
            i,
            s = !n.isArray(t);
            for (var o = 0, u = e.length; o < u; o++) {
                r = e.options[o],
                i = this.optionValue(r);
                if (s) {
                    if (i == t) {
                        r.selected = !0;
                        return
                    }
                } else r.selected = n.array.include(t, i)
            }
        },
        selectOne: function(e) {
            var t = e.selectedIndex;
            return t >= 0 ? this.optionValue(e.options[t]) : null
        },
        selectMany: function(e) {
            var t = [],
            n = e.length;
            if (!n) return null;
            for (var r = 0; r < n; r++) {
                var i = e.options[r];
                i.selected && t.push(this.optionValue(i))
            }
            return t
        },
        optionValue: function(e) {
            return e.value || e.text
        }
    },
    $F = function(t, r) {
        var i = n.element.$(t);
        return i.tagName.toLowerCase() == "form" ? e.serialize(i, r) : e.getValue(i)
    },
    this._helper = function(e) {
        e = n.element.$(e);
        try {
            if (e._helper) return e._helper
        } catch(t) {
            console.log(arguments.callee.caller)
        }
        e._helper = this,
        this.element = e
    },
    this._helper.prototype = {
        maxSize: 9999,
        limit: function(e, t) {
            function s() {
                r.limitCheck()
            }
            var r = this;
            this.maxLength = e,
            n.isUndefined(t) && (t = !0),
            this._limit_cut = t;
            if (this._limit) return this;
            this._limit = !0;
            var i = this.element;
            return n.event.addEvent(i, "focus", s),
            n.event.addEvent(i, "keyup", s),
            this
        },
        limitCheck: function() {
            var e = this,
            t = this.element;
            setTimeout(function() {
                var n = t.value;
                n.length > e.maxLength ? (e._limit_cut && (t.value = n.substr(0, e.maxLength)), e.fireEvent("overmaxLength")) : e.fireEvent("normalLength"),
                e.fireEvent("checkover")
            },
            0)
        },
        count: function(e, t) {
            function s() {
                e.innerHTML = i.value.length + (t ? "/" + r.maxLength: "")
            }
            if (this._count) return this;
            this._count = !0;
            var r = this,
            e = n.element.$(e);
            n.isUndefined(t) && (t = !0),
            this.maxLength || (t = !1);
            var i = this.element;
            return this.addEvent("overmaxLength", 
            function() {
                e.addClass("full")
            }),
            this.addEvent("normalLength", 
            function() {
                e.delClass("full")
            }),
            this.addEvent("checkover", s),
            this
        },
        countSize: function(e, t, n) {
            return this.limit(t).count(e, n)
        },
        getRealValue: function() {
            var e = this.element;
            return e.value == this._defaultValue || e.value == e.getAttribute("placeholder") ? "": e.value
        },
        reloadDefaultValue: function() {
            this.element.value = this._defaultValue,
            this.element.style.color = "#888"
        },
        defaultValue: function(e) {
            var t = this,
            r = this.element;
            return e = e || r.value,
            !n.isUndefined(this._defaultValue) && r.value == this._defaultValue && (r.value = e),
            this._defaultValue = e,
            this._default ? this: (this._default = !0, document.activeElement !== r && (r.value = e), r.style.color = "#888", n.event.addEvent(r, "focus", 
            function() {
                r.value == t._defaultValue && (r.value = "", r.style.color = "#333")
            }), n.event.addEvent(r, "blur", 
            function() {
                r.value == "" && (r.value = t._defaultValue, r.style.color = "#888")
            }), this)
        },
        focus: function(e) {
            var t = this.element;
            n.isUndefined(e) && (e = t.value.length);
            try {
                if (t.setSelectionRange) t.focus(),
                t.setSelectionRange(t.value.length, e);
                else if (t.createTextRange) {
                    var r = t.createTextRange();
                    r.moveStart("character", e),
                    r.collapse(!0),
                    r.select(),
                    t.focus()
                } else t.focus()
            } catch(i) {}
            return this
        },
        onEnter: function(e) {
            var t = this.element,
            r = t.tagName.toLowerCase() == "textarea";
            return n.event.addEvent(t, "keydown", 
            function(i) {
                i = i || window.event;
                if (i.keyCode == 13) return r && !i.ctrlKey ? !1: (n.event.stop(i), e(t), !1)
            },
            !1),
            this
        },
        onEsc: function(e) {
            var t = this.element;
            return n.event.addEvent(t, "keydown", 
            function(r) {
                r = r || window.event;
                if (r.keyCode == 27) return n.event.stop(r),
                e(t),
                !1
            },
            !1),
            this
        },
        autoResize: function(t, r) {
            var i = this,
            s = this.element,
            o;
            this.minSize = t || this.minSize,
            this.maxSize = r || this.maxSize,
            s.tagName.toLowerCase() == "textarea" ? this.resizeType = "height": this.resizeType = "width";
            if (!e.inputShadow) {
                var u = n.element.$element("div");
                u.setStyle("position:absolute;left:-99999px;top:-99999px"),
                document.body.appendChild(u),
                e.inputShadow = u
            }
            return this.shadow = e.inputShadow,
            setTimeout(function() {
                if (t) return;
                i.minSize = o == "width" ? s.offsetWidth: s.offsetHeight
            },
            10),
            s.style.overflow = "hidden",
            n.event.addEvent(s, "focus", 
            function() {
                i.timer = setInterval(i._resize.bind(i), 200)
            }),
            n.event.addEvent(s, "blur", 
            function() {
                clearInterval(i.timer),
                i.timer = null
            }),
            this
        },
        _resize: function() {
            var e = this.element,
            t = this.shadow,
            r,
            i = this.resizeType;
            t.style.fontSize = e.getStyle("fontSize");
            var s = parseInt(e.getStyle("fontSize"), 0);
            t.style.fontFamily = e.getStyle("fontFamily"),
            i == "width" ? t.style.height = e.offsetHeight: t.style.width = e.offsetWidth,
            t.innerHTML = n.string.escapeHTML(e.value).replace(/\r\n/mg, "<br>").replace(/\r/mg, "<br>").replace(/\n/mg, "<br>"),
            i == "width" ? r = t.offsetWidth: r = t.offsetHeight + s + 3,
            r > this.minSize && r < this.maxSize ? e.style[i] = r + "px": r < this.minSize ? e.style[i] = this.minSize + "px": r > this.maxSize && (e.style[i] = this.maxSize + "px")
        },
        cursorPosition: function() {
            var e = this.element,
            t = 0,
            n = 0;
            try {
                if (typeof e.selectionStart == "number") t = e.selectionStart,
                n = e.selectionEnd;
                else if (document.selection) {
                    var r = document.selection.createRange();
                    if (r.parentElement() == e) {
                        var i = document.body.createTextRange();
                        i.moveToElementText(e);
                        for (t = 0; i.compareEndPoints("StartToStart", r) < 0; t++) i.moveStart("character", 1);
                        for (var s = 0; s <= t; s++) e.value.charAt(s) == "\n" && t++;
                        var i = document.body.createTextRange();
                        i.moveToElementText(e);
                        for (n = 0; i.compareEndPoints("StartToEnd", r) < 0; n++) i.moveStart("character", 1);
                        for (var s = 0; s <= n; s++) e.value.charAt(s) == "\n" && n++
                    }
                }
            } catch(o) {}
            return {
                start: t,
                end: n,
                item: [t, n]
            }
        }
    },
    this._helper.prototype.setDefaultValue = this._helper.prototype.defaultValue,
    n.event.enableCustomEvent(this._helper.prototype),
    this.help = function(t) {
        return new e._helper(t)
    },
    this.inputHelper = this.textAreaHelper = this.help,
    $CursorPosition = function(t) {
        return e.help(t).cursorPosition()
    },
    this.userInfoAutoComplete = function(e, n) {
        var r = t.modules["CX.ui"];
        if (r) return r.userInfoAutoComplete(e, n);
        throw new Error("请在use中导入CX.ui模块，才可使用CX.form下的此方法")
    }
}),
object.add("CX.effect", "CX.func, CX.element, CX.event", 
function(e, t) {
    this.fadeIn = function(e, n) {
        if (e.fadetimer) return;
        n = n || t.func.empty;
        var r = 0;
        e.setOpacity(0),
        e.style.display = "",
        e.fadetimer = setInterval(function() {
            t.element.setOpacity(e, r += .2),
            r >= 1 && (clearInterval(e.fadetimer), e.fadetimer = null, n(e))
        },
        60)
    },
    this.fadeOut = function(e, n) {
        if (e.fadetimer) return;
        n = n || t.func.empty;
        var r = 1;
        e.setOpacity(1),
        e.fadetimer = setInterval(function() {
            t.element.setOpacity(e, r -= .2),
            r <= 0 && (clearInterval(e.fadetimer), e.fadetimer = null, n(e), e.setOpacity(1))
        },
        60)
    },
    this.gradient = function(e, n, r, i, s) {
        if (e.gradientTimer) return;
        s = s || t.func.empty,
        e.style.backgroundColor = "#fff",
        e.style.backgroundColor = "rgb(" + n + "," + r + "," + i + ")",
        e.gradientTimer = setInterval(function() {
            i += 10,
            e.style.backgroundColor = "rgb(" + n + "," + r + "," + (i > 255 ? 255: i) + ")",
            i > 255 && (clearInterval(e.gradientTimer), e.gradientTimer = null, s(e))
        },
        60)
    },
    this.slideOpen = function(e) {
        if (e.slidetimer) return;
        if (!e.slideHeight) {
            var t = e.getStyle("position");
            e.setStyle("position:absolute;left:-99999px;top:-99999px;"),
            e.show(),
            e.slideHeight = e.offsetHeight,
            e.hide(),
            e.setStyle("position:" + t + ";left:auto;top:auto;")
        }
        var n = e.slideHeight,
        r = 0,
        i = parseInt(n / 10);
        e.style.height = "0px",
        e.style.display = "",
        e.style.overflow = "hidden",
        e.slidetimer = setInterval(function() {
            e.style.height = (r += i) + "px",
            r >= n && (clearInterval(e.slidetimer), e.slidetimer = null, e.style.height = n, e.style.overflow = e.slideOverflow)
        },
        50)
    },
    this.slideClose = function(e) {
        if (e.slidetimer) return;
        var t = e.offsetHeight,
        n = t;
        e.slideHeight = t,
        e.slideOverflow = e.getStyle("overflow"),
        e.style.overflow = "hidden";
        var r = parseInt(t / 10);
        e.slidetimer = setInterval(function() {
            e.style.height = (n -= r) + "px",
            n <= 0 && (clearInterval(e.slidetimer), e.slidetimer = null, e.style.display = "none", e.style.height = t, e.style.overflow = e.slideOverflow)
        },
        50)
    },
    this.scrollTo = function(e, n, r) {
        if (e.scrolltimer) return;
        n = n || 10,
        r = r || t.func.empty;
        var i = e.realTop(),
        s = t.event.winHeight(),
        o = document.body.scrollHeight,
        u = t.event.scrollTop(),
        a = null;
        if (i > u) {
            if (i + e.offsetHeight < s + u) return;
            e.scrolltimer = setInterval(function() {
                u += Math.ceil((i - u) / n) || 1,
                window.scrollTo(0, u),
                u == i && (clearInterval(e.scrolltimer), e.scrolltimer = null)
            },
            10)
        } else e.scrolltimer = setInterval(function() {
            u += Math.ceil((i - u) / n) || -1,
            window.scrollTo(0, u),
            u == i && (clearInterval(e.scrolltimer), e.scrolltimer = null)
        },
        10)
    },
    function(e) {
        var t = {
            linear: function(e, t, n, r) {
                return n * e / r + t
            },
            easeIn: function(e, t, n, r) {
                return n * (e /= r) * e + t
            },
            easeOut: function(e, t, n, r) {
                return - n * (e /= r) * (e - 2) + t
            },
            easeBoth: function(e, t, n, r) {
                return (e /= r / 2) < 1 ? n / 2 * e * e + t: -n / 2 * (--e * (e - 2) - 1) + t
            },
            easeInStrong: function(e, t, n, r) {
                return n * (e /= r) * e * e * e + t
            },
            easeOutStrong: function(e, t, n, r) {
                return - n * ((e = e / r - 1) * e * e * e - 1) + t
            },
            easeBothStrong: function(e, t, n, r) {
                return (e /= r / 2) < 1 ? n / 2 * e * e * e * e + t: -n / 2 * ((e -= 2) * e * e * e - 2) + t
            },
            backIn: function(e, t, n, r, i) {
                return typeof i == "undefined" && (i = 1.70158),
                n * (e /= r) * e * ((i + 1) * e - i) + t
            },
            backOut: function(e, t, n, r, i) {
                return typeof i == "undefined" && (i = 1.70158),
                n * ((e = e / r - 1) * e * ((i + 1) * e + i) + 1) + t
            },
            backBoth: function(e, t, n, r, i) {
                return typeof i == "undefined" && (i = 1.70158),
                (e /= r / 2) < 1 ? n / 2 * e * e * (((i *= 1.525) + 1) * e - i) + t: n / 2 * ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) + t
            },
            bounceIn: function(e, n, r, i) {
                return r - t.bounceOut(i - e, 0, r, i) + n
            },
            bounceOut: function(e, t, n, r) {
                return (e /= r) < 1 / 2.75 ? n * 7.5625 * e * e + t: e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t: e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t: n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
            },
            bounceBoth: function(e, n, r, i) {
                return e < i / 2 ? t.bounceIn(e * 2, 0, r, i) * .5 + n: t.bounceOut(e * 2 - i, 0, r, i) * .5 + r * .5 + n
            }
        },
        n = function() {
            r(this.onTweening, this);
            if (this.current >= this.frames) {
                this.stop(),
                r(this.onComplete, this),
                this.tweening = !1;
                return
            }
            this.current++
        },
        r = function(e, t) {
            var n = Array.prototype.slice.call(arguments);
            n = n.slice(2);
            if (typeof e == "function") try {
                return e.apply(t || this, n)
            } catch(r) {
                t.errors = t.errors || [],
                t.errors.push(r)
            }
        };
        e.Motion = function(e, t) {
            this.duration = t || 1e3,
            this.tween = e || "linear"
        },
        e.Motion.getTweens = function() {
            return t
        },
        e.Motion.prototype = {
            init: function() {
                r(this.onInit, this),
                this.fps = this.fps || 35,
                this.frames = Math.ceil(this.duration / 1e3 * this.fps),
                this.frames < 1 && (this.frames = 1);
                var e = "function" == typeof this.tween ? this.tween: t[this.tween] || t.linear;
                this.equation = function(t, n) {
                    return e(this.current / this.frames * this.duration, t, n - t, this.duration)
                },
                this.current = this.tweening = 1
            },
            start: function() {
                this.init(),
                r(this.onStart, this);
                var e = this,
                t = this.duration / this.frames;
                this.timer = setInterval(function() {
                    n.call(e)
                },
                t)
            },
            stop: function() {
                this.timer && clearInterval(this.timer),
                this.tweening = !1
            }
        }
    } (e)
}),
object.add("CX.ui", "CX, CX.array, CX.element, CX.event, CX.browser, CX.util, CX.dom, CX.func, CX.string, CX.env, CX.net, CX.json, CX.form, CX.datasource", 
function(e, t) { (function() {
        e.element = {
            frame: null,
            iAmUIelement: !0
        },
        t.array.each(["addClass", "delClass", "show", "hide", "remove"], 
        function(n, r) {
            e.element[r] = function() {
                t.element[r].apply(null, [this.frame].concat(t.array.build(arguments)))
            }
        }),
        e.container = {
            container: null
        },
        t.array.each(["addChild", "delChild", "setContent"], 
        function(n, r) {
            e.container[r] = function() {
                t.element[r].apply(null, [this.container].concat(t.array.build(arguments)))
            }
        }),
        t.$extend(e.container, e.element)
    })(),
    this.Element = this.element,
    this.Content = this.container,
    function(n) {
        function o(e) {
            s && t.log(t.isString(e) ? "xn.ui.button:" + e: e)
        }
        var r = e,
        i = t.event.addEvent,
        s = !0;
        n.button = function(e) {
            t.$extend(this, e),
            this.init()
        },
        n.button.prototype = t.$extend({},
        r.Element),
        n.button.prototype.text = null,
        n.button.prototype.className = "",
        n.button.prototype.disableClassName = "gray",
        n.button.prototype.init = function() {
            var e = this,
            n;
            this.getConfig("el") ? n = t.element.$(this.getConfig("el")) : n = t.element.$element("input"),
            this.frame = n,
            n.type = "button",
            this.addClass("input-submit"),
            this.addClass(this.getConfig("className")),
            this.setText(this.getConfig("text")),
            i(n, "click", 
            function(t) {
                e.onclick && e.onclick(t)
            },
            !1)
        },
        n.button.prototype.getConfig = function(e) {
            return e == "el" ? this.id: this[e]
        },
        n.button.prototype.getEl = function() {
            return this.frame
        },
        n.button.prototype.setText = function(e) {
            this.text = e,
            this.getEl().value = e
        },
        n.button.prototype.disable = function() {
            var e = this.getEl();
            e.blur(),
            e.disabled = !0,
            e.addClass(this.getConfig("disableClassName"))
        },
        n.button.prototype.enable = function() {
            var e = this.getEl();
            e.disabled = !1,
            e.delClass(this.getConfig("disableClassName"))
        },
        n.button.prototype.focus = function() {
            this.getEl().focus()
        },
        n.button.prototype.blur = function() {
            this.getEl().blur()
        }
    } (this),
    function() {
        var t = "realLeft",
        n = "realTop",
        r = "offsetWidth",
        i = "offsetHeight";
        e.fixPositionMethods = {
            "1-1": function(e, r, i, s, o) {
                e.style.left = i + r[t]() - o[t]() + "px",
                e.style.top = s + r[n]() - o[n]() + "px"
            },
            "1-2": function(e, i, s, o, u) {
                e.style.left = s + i[t]() - u[t]() - e[r] + "px",
                e.style.top = o + i[n]() - u[n]() + "px"
            },
            "1-3": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() - e[r] + "px",
                e.style.top = u + s[n]() - a[n]() - e[i] + "px"
            },
            "1-4": function(e, r, s, o, u) {
                e.style.left = s + r[t]() - u[t]() + "px",
                e.style.top = o + r[n]() - u[n]() - e[i] + "px"
            },
            "2-1": function(e, i, s, o, u) {
                e.style.left = s + i[t]() - u[t]() + i[r] + "px",
                e.style.top = o + i[n]() - u[n]() + "px"
            },
            "2-2": function(e, i, s, o, u) {
                e.style.left = s + i[t]() - u[t]() + i[r] - e[r] + "px",
                e.style.top = o + i[n]() - u[n]() + "px"
            },
            "2-3": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() + s[r] - e[r] + "px",
                e.style.top = u + s[n]() - a[n]() - e[i] + "px"
            },
            "2-4": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() + s[r] + "px",
                e.style.top = u + s[n]() - a[n]() - e[i] + "px"
            },
            "3-1": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() + s[r] + "px",
                e.style.top = u + s[n]() - a[n]() + s[i] + "px"
            },
            "3-2": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() + s[r] - e[r] + "px",
                e.style.top = u + s[n]() + s[i] + "px"
            },
            "3-3": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() + s[r] - e[r] + "px",
                e.style.top = u + s[n]() - a[n]() + s[i] - e[i] + "px"
            },
            "3-4": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() + s[r] + "px",
                e.style.top = u + s[n]() - a[n]() + s[i] - e[i] + "px"
            },
            "4-1": function(e, r, s, o, u) {
                e.style.left = s + r[t]() - u[t]() + "px",
                e.style.top = o + r[n]() - u[n]() + r[i] + "px"
            },
            "4-2": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() - e[r] + "px",
                e.style.top = u + s[n]() - a[n]() + s[i] + "px"
            },
            "4-3": function(e, s, o, u, a) {
                e.style.left = o + s[t]() - a[t]() - e[r] + "px",
                e.style.top = u + s[n]() - a[n]() + s[i] - e[i] + "px"
            },
            "4-4": function(e, r, s, o, u) {
                e.style.left = s + r[t]() - u[t]() + "px",
                e.style.top = o + r[n]() - u[n]() + r[i] - e[i] + "px"
            }
        }
    } (),
    this.fixPositionElement = function(e) {
        var n = this;
        this.config = {
            tagName: "div",
            useIframeInIE6: !0
        },
        t.$extend(this.config, e);
        var r,
        i,
        s;
        if (this.getConfig("id")) this.frame = r = t.element.$(this.getConfig("id")),
        i = r.realLeft(),
        s = r.realTop();
        else {
            if (!this.getConfig("tagName")) return;
            this.frame = this.container = r = t.element.$element(this.getConfig("tagName"))
        }
        this.container = t.element.$element("div"),
        this.frame.appendChild(this.container),
        t.array.each(["alignWith", "alignType", "offsetX", "offsetY", "alignParent"], 
        function(e, t) {
            n[t] = n.getConfig(t) || n[t]
        }),
        t.element.setStyle(r, "position:absolute;z-index:10001;left:-9999px;top:-9999px"),
        t.element.$(this.alignParent) || (this.alignParent = t.element.$(document.body)),
        t.element.$(this.alignParent).appendChild(this.frame);
        if (t.browser.IE6 && this.getConfig("useIframeInIE6") || this.getConfig("addIframe")) {
            var o;
            this._iframe = o = t.element.$element("iframe"),
            o.frameBorder = 0,
            o.scrolling = "no",
            o.setStyle("position:absolute;border:0px;left:0px;top:0px;z-index:-1;"),
            t.browser.Gecko && o.setAttribute("style", "position:absolute;border:0px;left:0px;top:0px;z-index:-1;"),
            t.browser.IE && (o.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"),
            this.frame.appendChild(o)
        }
        t.element.visible(r) && this.show(),
        r.style.display = "block"
    },
    this.fixPositionElement.prototype = t.$extend({},
    this.container),
    t.$extend(this.fixPositionElement.prototype, {
        alignWith: null,
        alignType: "4-1",
        offsetX: 0,
        offsetY: 0,
        alignParent: "dropmenuHolder",
        left: null,
        top: null,
        _isShow: !1,
        getConfig: function(e) {
            return this.config[e]
        },
        setOffsetX: function(e) {
            return this.offsetX = e,
            this.refresh(),
            this
        },
        setOffsetY: function(e) {
            return this.offsetY = e,
            this.refresh(),
            this
        },
        setAlignType: function(e) {
            return this.alignType = e,
            this.refresh(),
            this
        },
        setAlignParent: function(e) {
            return this.alignParent = e,
            t.element.$(this.alignParent).appendChild(this.frame),
            this.refresh(),
            this
        },
        refresh: function() {
            return this.visible() ? this.show() : this.hide(),
            this
        },
        visible: function() {
            return this._isShow
        },
        show: function() {
            this._isShow = !0,
            this.frame.show();
            if (this.alignWith) this._moveToElement(this.alignWith);
            else {
                var e = this.left === null ? parseInt((t.element.$(this.alignParent).offsetWidth - this.frame.offsetWidth) / 2, 10) : this.left,
                n = this.top === null ? t.event.scrollTop() + 200: this.top;
                this._moveToPosition(e, n)
            }
            if (this._iframe) try {
                this._iframe.style.height = this.frame.offsetHeight - 2 + "px",
                this._iframe.style.width = this.frame.offsetWidth + "px"
            } catch(r) {}
            return this
        },
        hide: function() {
            this._isShow = !1;
            var e = this.frame;
            return e.style.left = "-9999px",
            e.style.top = "-9999px",
            this
        },
        moveTo: function(e, n) {
            if (!e && !n) return;
            if (t.isNumber(e)) this.left = e,
            this.alignWith = null;
            else if (t.isString(e) || t.isElement(e)) this.alignWith = t.element.$(e);
            return t.isNumber(n) && (this.top = n, this.alignWith = null),
            this.refresh(),
            this
        },
        setX: function(e) {
            return this.moveTo(e),
            this
        },
        setY: function(e) {
            return this.moveTo(null, e),
            this
        },
        setIndex: function(e) {
            return this.frame.style.zIndex = e,
            this
        },
        _moveToElement: function(n) {
            e.fixPositionMethods[this.alignType](this.frame, t.element.$(n), this.offsetX, this.offsetY, t.element.$(this.alignParent))
        },
        _moveToPosition: function(e, t) {
            e && (this.frame.style.left = e + "px"),
            t && (this.frame.style.top = t + "px")
        }
    }),
    function() {
        var n = e.fixPositionElement.prototype,
        r = t.event,
        i = null;
        e.clearDialog = function() {
            i && i.parent && i.remove()
        },
        e.dialog = function(n) {
            var r = this;
            i = this,
            e.fixPositionElement.call(this, n),
            this.container = t.element.$element("div"),
            this.frame.appendChild(this.container),
            this.getConfig("HTML") ? this.setContent(this.getConfig("HTML")) : this.setContent(this.buildHTML()),
            this.dialogContainer = t.element.$("ui_dialog_container"),
            this.header = this.title = t.element.$("ui_dialog_header"),
            this.body = this.msg = this.message = t.element.$("ui_dialog_body"),
            this.footer = t.element.$("ui_dialog_footer"),
            this.closeButton = t.element.$("ui_dialog_close"),
            this.header.addChild = this.body.addChild = this.footer.addChild = function(e) {
                t.element.addChild(this, e),
                setTimeout(function() {
                    r.refresh()
                },
                0)
            },
            this.dialogContainer.removeAttribute("id"),
            this.header.removeAttribute("id"),
            this.body.removeAttribute("id"),
            this.footer.removeAttribute("id"),
            this.closeButton.removeAttribute("id"),
            this.getConfig("showCloseButton") && (this.closeButton.show(), t.event.addEvent(this.closeButton, "click", 
            function(e) {
                r.hide(),
                r.fireEvent("close", e)
            })),
            this.frame.style.zIndex = 1e4,
            this.setWidth(this.getConfig("width") || 400),
            this.getConfig("height") && this.setHeight(this.getConfig("height")),
            t.array.each(["title", "msg", "message", "header", "body", "footer"], 
            function(e, t) {
                r.getConfig(t) && r[t].setContent(r.getConfig(t))
            }),
            this.getConfig("type") && this.setType(this.getConfig("type")),
            this._buttons = [],
            t.event.addEvent(this.footer, "click", 
            function(e) {
                r._parseButtonEvent(e || window.event)
            }),
            t.util.hotKey.add("27", this._hotKeyEvent, this),
            this.getConfig("modal") === !0 && t.dom.disable(),
            this.getConfig("noHeader") && this.header.hide(),
            this.getConfig("noFooter") && this.footer.hide(),
            this.getConfig("noPadding") && this.body.addClass("no_padding")
        },
        e.dialog.prototype = t.$extend({},
        n),
        t.$extend(e.dialog.prototype, {
            header: null,
            body: null,
            footer: null,
            _iframe: null,
            _buttons: null,
            buildHTML: function() {
                return ['<table id="ui_dialog_container" style="width: 100%; height: 100%;" class="pop_dialog_table">', "<tbody>", "<tr>", '<td class="pop_topleft"></td>', '<td class="pop_border"></td>', '<td class="pop_topright"></td>', "</tr>", "<tr>", '<td class="pop_border"></td>', '<td class="pop_content">', '<h2><span id="ui_dialog_header"></span><a style="display:none;" class="close-button" id="ui_dialog_close" href="#nogo" onclick="return false;">关闭</a></h2>', '<div class="dialog_content">', '<div id="ui_dialog_body" class="dialog_body"></div>', '<div id="ui_dialog_footer" class="dialog_buttons"></div>', "</div>", "</td>", '<td class="pop_border"></td>', "</tr>", "<tr>", '<td class="pop_bottomleft"></td>', '<td class="pop_border"></td>', '<td class="pop_bottomright"></td>', "</tr>", "</tbody>", "</table>"].join("")
            },
            getButton: function(e) {
                var t = this._buttons;
                for (var n = t.length - 1; n >= 0; n--) if (t[n].text == e) return t[n];
                return null
            },
            addButton: function(t) {
                var n = {
                    text: t.text,
                    _onclickForDialog: t.onclick
                };
                t.className && (n.className = t.className);
                var r = new e.button(n);
                return r.frame.setAttribute("dialog", "1"),
                this._buttons.push(r),
                this.footer.addChild(r),
                this
            },
            delButton: function(e) {
                return t.isString(e) && (e = this.getButton(e)),
                this.footer.delChild(e),
                this
            },
            _preventHide: !1,
            preventHide: function() {
                return this._preventHide = !0,
                this
            },
            setAutoHide: function(e) {
                return this._preventHide = !e,
                this
            },
            _parseButtonEvent: function(e) {
                var t = r.element(e);
                if (t.tagName.toLowerCase() !== "input" || t.type !== "button") return;
                if (!t.getAttribute("dialog")) return;
                var n = this.getButton(t.value);
                n && n._onclickForDialog && n._onclickForDialog.call(this, e),
                this._preventHide ? this._preventHide = !0: this.hide()
            },
            _hotKeyEvent: function() {
                this.hide()
            },
            setType: function(e) {
                return e == "normal" ? this.frame.delClass("errorDialog") : e == "error" && this.frame.addClass("errorDialog"),
                this
            },
            setWidth: function(e) {
                return e ? (e == "auto" ? (this.frame.style.width = "auto", this.dialogContainer.style.height = "", this.dialogContainer.style.width = "", this.width = this.frame.offsetWidth) : (this.width = e, this.frame.style.width = e + "px", this.dialogContainer.style.height = "100%", this.dialogContainer.style.width = "100%"), this.refresh(), this) : this
            },
            setHeight: function(e) {
                return e ? (this.hegith = e, this.frame.style.height = e + "px", this.refresh(), this) : this
            },
            resizeTo: function(e, t) {
                return this.setWidth(e),
                this.setHeight(t),
                this
            },
            clear: function() {
                return this.header.setContent(""),
                this.body.setContent(""),
                this.footer.setContent(""),
                this._buttons = [],
                this
            },
            setTitle: function(e) {
                return this.header.setContent(e),
                this
            },
            setBody: function(e) {
                return this.body.setContent(e),
                this
            },
            remove: function(n) {
                return t.util.hotKey.del("27", this._hotKeyEvent),
                e.element.remove.call(this),
                n || t.dom.enable(),
                this
            },
            refresh: function() {
                return this.visible() ? n.show.apply(this, arguments) : this.hide(),
                this
            },
            reLocate: function() {
                var e = this.frame,
                n = t.event.scrollTop(),
                r = (t.event.winHeight() - e.offsetHeight) / 2;
                r = r <= 0 ? n: r + n,
                e.style.top = r + "px"
            },
            show: function() {
                return this._clearHideTimer(),
                this.getConfig("modal") === !0 && t.dom.disable(),
                n.show.apply(this, arguments),
                this.fireEvent("show"),
                this
            },
            hide: function() {
                return this._clearHideTimer(),
                n.hide.apply(this, arguments),
                t.dom.enable(),
                this.fireEvent("hide"),
                this
            },
            _hideTimer: null,
            _clearHideTimer: function() {
                this._hideTimer && (clearTimeout(this._hideTimer), this._hideTimer = null)
            },
            autoHide: function(e) {
                var t = this;
                return this._hideTimer = setTimeout(function() {
                    t.hide()
                },
                e * 1e3),
                this
            }
        }),
        t.event.enableCustomEvent(e.dialog.prototype)
    } (),
    this.panel = this.dialog,
    this.dialog.prototype.setHeader = function(e) {
        e && e !== "" ? this.header.addChild(e) : this.header.innerHTML = ""
    },
    this.dialog.prototype.setFooter = function(e) {
        e && e !== "" ? this.footer.addChild(e) : this.footer.innerHTML = ""
    },
    this.menu = function(n) {
        var r = this;
        this.config = {
            alignType: "4-1",
            barOnshowClass: "",
            tagName: "div",
            disalbeButtonClickEvent: !0,
            fireOn: "click",
            keep: .2,
            useIframeInIE6: !0,
            effectTime: 50
        },
        t.$extend(this.config, n);
        var i;
        if (this.getConfig("text")) this.frame = i = t.element.$element(this.getConfig("tagName")),
        i.setContent(this.getConfig("text"));
        else {
            if (!this.getConfig("button")) return ! 1;
            this.frame = i = t.element.$(this.getConfig("button"))
        }
        this._alignType = this.getConfig("alignType");
        if (this.getConfig("menu")) t.element.$(this.getConfig("menu")).hide(),
        this.menu = new e.fixPositionElement({
            id: this.getConfig("menu"),
            alignType: this._alignType,
            alignWith: this.getConfig("alignWith") || this.frame,
            addIframe: this.getConfig("addIframe"),
            useIframeInIE6: this.getConfig("useIframeInIE6")
        }),
        this.container = this.menu.frame,
        this._canAddSubMenu = !1;
        else {
            var s = t.element.$element("div");
            s.hide(),
            this.menu = new e.fixPositionElement({
                id: s,
                alignType: this._alignType,
                alignWith: this.getConfig("alignWith") || this.frame,
                addIframe: this.getConfig("addIframe"),
                useIframeInIE6: this.getConfig("useIframeInIE6")
            }),
            this.container = t.element.$element("div"),
            this._menu.setContent(this.container)
        }
        this.menu.setIndex(10001),
        t.event.addEvent(this.menu.frame, "click", 
        function(e) {
            e = e || window.event,
            r._frameOnClick(e)
        },
        !1),
        this.menu.setOffsetX(this.getConfig("offsetX") || 0),
        this.menu.setOffsetY(this.getConfig("offsetY") || 0);
        var o = this.getConfig("event");
        o == "click" ? (t.event.addEvent(this.frame, "click", 
        function(e) {
            r._buttonClick(e || window.event)
        }), t.event.addEvent(document, "click", 
        function(e) {
            r._documentClick(e || window.event)
        })) : o == "mouseover" ? (t.event.addEvent(this.frame, "mouseover", 
        function(e) {
            r._frameMouseOver(e || window.event)
        }), this.getConfig("disalbeButtonClickEvent") && t.event.addEvent(this.frame, "onclick", 
        function(e) {
            t.event.stop(e || window.event)
        }), t.event.addEvent(this.frame, "mouseleave", 
        function() {
            r._buttonMouseLeave()
        }), t.event.addEvent(this.menu.frame, "mouseleave", 
        function() {
            r._menuMouseLeave()
        }), t.event.addEvent(this.menu.frame, "mouseover", 
        function() {
            r._mouseOverMenu = !0
        })) : o == "manual",
        t.event.addEvent(window, "resize", 
        function() {
            r.menu.refresh()
        }),
        this.hide()
    },
    this.menu.prototype = t.$extend({},
    this.container),
    t.$extend(this.menu.prototype, {
        isShow: !0,
        menu: null,
        _alignType: null,
        _button: null,
        _canAddSubMenu: !0,
        _delayTimer: null,
        _mouseOverMenu: !1,
        _mouseOverButton: !1,
        _clearTimer: function() {
            this._delayTimer && (clearTimeout(this._delayTimer), this._delayTimer = null)
        },
        _buttonClick: function(e) {
            t.event.stop(e),
            this.isShow ? this.hide() : this.show()
        },
        _documentClick: function(e) {
            this.hide()
        },
        _frameOnClick: function(e) {
            var n = this,
            r = t.event.element(e),
            i = r.tagName.toLowerCase();
            if (i == "a") return ! 0;
            if (i == "input" && (r.type == "radio" || r.type == "checkbox") || i == "label") return this.isShow = !1,
            setTimeout(function() {
                n.isShow = !0
            },
            20),
            !0;
            while (r != this.menu.frame && r.tagName && r.tagName.toLowerCase() != "a") r = r.parentNode;
            if (r.tagName.toLowerCase() == "a") return ! 0;
            t.event.stop(e)
        },
        _frameMouseOver: function(e) {
            var n = this;
            this._mouseOverButton = !0,
            this._clearTimer();
            var r = this.getConfig("delay");
            r ? this._delayTimer = setTimeout(function() {
                n._mouseOverButton && n.show()
            },
            r * 1e3) : n.show(),
            this.getConfig("keepDefaultEvent") || t.event.stop(e)
        },
        _buttonMouseLeave: function() {
            var e = this;
            this._mouseOverButton = !1,
            this._clearTimer(),
            setTimeout(function() {
                e._mouseOverMenu || e.hide()
            },
            this.getConfig("effectTime"))
        },
        _menuMouseLeave: function() {
            var e = this;
            this._mouseOverMenu = !1,
            this._clearTimer(),
            setTimeout(function() {
                e._mouseOverButton || e.hide()
            },
            this.getConfig("effectTime"))
        },
        getConfig: function(e) {
            var t = {
                hoverClass: "barOnshowClass",
                event: "fireOn",
                button: "bar",
                delay: "keep"
            };
            return t[e] ? this.config[e] || this.config[t[e]] : this.config[e]
        },
        show: function() {
            if (this.isShow) return this;
            this.menu.show();
            var e = this.getConfig("hoverClass");
            return e != "" && this.frame.addClass(this.getConfig("hoverClass")),
            this.onShow(),
            this.isShow = !0,
            this
        },
        setWidth: function(e) {
            return this.menu.frame.style.width = e + "px",
            this.menu.refresh(),
            this
        },
        hide: function() {
            return this.isShow ? (this.menu.hide(), this.frame.delClass(this.getConfig("hoverClass")), this.isShow = !1, this.onHide(), this) : this
        },
        refresh: function() {
            return this.isShow && this.menu.show(),
            this
        },
        onShow: t.func.empty,
        onHide: t.func.empty
    }),
    t.event.enableCustomEvent(this.menu.prototype),
    this.autoComplete = function(e) {
        var n = 
        this;
        this.config = this.config || {},
        t.$extend(this.config, {
            inputTip: null,
            searchDelay: .2,
            DS: null,
            enableCache: !0,
            maxCache: 10
        }),
        t.$extend(this.config, e),
        this.getConfig("enableCache") && (this.cache = new t.util.cache({
            cacheLength: this.getConfig("maxCache")
        }));
        if (this.getConfig("input")) var r = this.input = t.element.$(this.getConfig("input"));
        else {
            var r = this.input = t.element.$element("input");
            r.type = "text",
            r.addClass("input-text")
        }
        this.frame = r,
        t.event.addEvent(r, "focus", 
        function(e) {
            n._startCheck(),
            n.fireEvent("focus")
        }),
        t.event.addEvent(r, "blur", 
        function(e) {
            n._endCheck(),
            n.fireEvent("blur")
        }),
        this.addEvent("focus", 
        function() {
            var e = this.input.value; (e == "" || e == this.getConfig("inputTip")) && this.fireEvent("noinput")
        }),
        this.addEvent("blur", 
        function() {
            this._lastInput = null
        }),
        t.event.addEvent(r, "click", 
        function(e) {
            t.event.stop(e || window.event)
        }),
        t.event.addEvent(r, "keydown", 
        function(e) {
            n._userInput = !0,
            e = e || window.event,
            e.keyCode == 13 && t.event.stop(e),
            n.fireEvent("keydown", e)
        }),
        r.setAttribute("AutoComplete", "off"),
        this.DS = this.getConfig("DS")
    },
    this.autoComplete.prototype = t.$extend({},
    this.element),
    t.$extend(this.autoComplete.prototype, {
        input: null,
        cache: null,
        _userInput: !1,
        _lastInput: null,
        getConfig: function(e) {
            return e == "input" ? this.config.input || this.config.id: this.config[e]
        },
        _startCheck: function() {
            var e = this;
            this._inputTimer && clearInterval(this._inputTimer),
            this._inputTimer = setInterval(function() {
                if (e._userInput) {
                    e._userInput = !1;
                    return
                }
                e._checkInput()
            },
            this.getConfig("searchDelay") * 1e3)
        },
        _endCheck: function() {
            clearInterval(this._inputTimer),
            this._inputTimer = null
        },
        _checkInput: function() {
            var e = this,
            n = this.input.value;
            if (t.string.isBlank(n)) {
                if (this._lastInput === "") return;
                this._lastInput = "",
                this.fireEvent("noinput");
                return
            }
            if (n == this._lastInput) return;
            this._lastInput = n,
            this.fireEvent("searchbegin");
            if (this.cache) {
                var r = this.cache.get(n);
                if (r) {
                    this.fireEvent("searchover", r);
                    return
                }
            }
            if (!this.DS) {
                t.log("no ds"),
                this.fireEvent("NO_DS");
                return
            }
            this.DS.query(n, 
            function(t) {
                e.cache && e.cache.add(n, t),
                e.fireEvent("searchover", t)
            })
        }
    }),
    t.event.enableCustomEvent(this.autoComplete.prototype),
    function() {
        var n = {};
        getCompleteMenu = function(e) {
            return n[e]
        },
        getParentFromClass = function(e, n) {
            var r = null;
            while (e.parentNode) {
                e = e.parentNode;
                if (t.element.hasClassName(e, n)) {
                    r = e;
                    break
                }
            }
            return r
        },
        e.autoCompleteMenu = function(r) {
            var i = this;
            this._MID = t.util.createObjID(),
            n[this._MID] = this,
            this.config = this.config || {},
            t.$extend(this.config, {
                ulClassName: "",
                liClassName: "",
                liHoverClass: "m-autosug-hover",
                aClassName: "",
                noResult: "没有匹配结果",
                dataLoading: "正在加载数据...",
                noInput: null,
                autoSelectFirst: !1,
                noHighlightClass: "noHighlight"
            }),
            e.autoComplete.call(this, r);
            var s = this.input,
            o = t.element.$element("div");
            o.innerHTML = this.getConfig("wrapper") || this._wrapper(),
            this._menuList = o.firstChild,
            this._ul = this._menuList.getElementsByTagName("ul")[0],
            this.menu = new e.menu({
                button: s,
                menu: this._menuList,
                fireOn: "manual"
            }),
            this.addEvent("keydown", this._inputOnkeydown),
            t.event.addEvent(this._ul, "mousedown", 
            function(e) {
                i._menuOnclick(e || window.event)
            },
            2),
            t.event.addEvent(s, "blur", 
            function() {
                i.menu.hide()
            }),
            this.menu.hide(),
            this.addEvent("noinput", 
            function() {
                var e = this.getConfig("noInput");
                if (!e) {
                    this.menu.hide();
                    return
                }
                this._ul.innerHTML = "<li>" + e + "</li>",
                this.menu.show()
            }),
            this.addEvent("NO_DS", 
            function() {
                this._noDataShow()
            }),
            this.addEvent("searchover", 
            function(e) {
                this._buildMenu(e)
            })
        },
        e.autoCompleteMenu.prototype = t.$extend({},
        e.autoComplete.prototype),
        t.$extend(e.autoCompleteMenu.prototype, {
            menu: null,
            _menuList: null,
            _ul: null,
            _currentLi: null,
            _highlightMenuItem: function(e) {
                if (e == this._currentLi) return;
                var n = this.getConfig("liHoverClass");
                this._currentLi !== null && t.element.delClass(this._currentLi, n),
                t.element.addClass(e, n),
                this._currentLi = e;
                var r = this._currentLi.getAttribute("aid");
                r && this.fireEvent("highlight", this.result[parseInt(r)])
            },
            _checkOnlyOneNoHightlightEl: function() {
                return this._ul.lastChild == this._ul.firstChild && t.element.hasClassName(this._ul.firstChild, this.config.noHighlightClass)
            },
            _inputOnkeydown: function(e) {
                var n;
                if (e.keyCode == 13) {
                    if (this.menu.isShow && this._currentLi) {
                        var r = this._currentLi.getAttribute("aid");
                        r && this._selectMenuItem(parseInt(r))
                    }
                    return ! 1
                }
                if (e.keyCode == 38) {
                    if (this._checkOnlyOneNoHightlightEl()) return;
                    this._currentLi && this._currentLi.previousSibling ? n = this._currentLi.previousSibling: n = this._ul.lastChild;
                    while (t.element.hasClassName(n, this.config.noHighlightClass)) n.previousSibling ? n = n.previousSibling: n = this._ul.lastChild;
                    return this._highlightMenuItem(n),
                    !1
                }
                if (e.keyCode == 40) {
                    if (this._checkOnlyOneNoHightlightEl()) return;
                    this._currentLi && this._currentLi.nextSibling ? n = this._currentLi.nextSibling: n = this._ul.firstChild;
                    while (t.element.hasClassName(n, this.config.noHighlightClass)) n.nextSibling ? n = n.nextSibling: n = this._ul.firstChild;
                    return this._highlightMenuItem(n),
                    !1
                }
                return ! 0
            },
            _menuOnclick: function(e) {
                var n = t.event.element(e);
                while (n && n.tagName && n.tagName.toLowerCase() !== "li") n = n.parentNode;
                return ! n || n.nodeType !== 1 || !n.getAttribute("aid") ? !1: (this._selectMenuItem(parseInt(n.getAttribute("aid"))), !1)
            },
            _menuOnmouseover: function(e) {
                var n = t.event.element(e);
                if (n.parentNode == t.element.$("dropmenuHolder")) return;
                while (n && n.tagName && n.tagName.toLowerCase() !== "li") n = n.parentNode;
                return ! n || n.nodeType !== 1 || !n.getAttribute("aid") ? !1: (this._highlightMenuItem(n), !1)
            },
            _selectMenuItem: function(e) {
                this.menu.hide(),
                getParentFromClass(this._menuList, "feed-comment-attach") || this.input.focus(),
                this.fireEvent("select", this.result[e]),
                this._lastInput = this.input.value
            },
            _buildMenu: function(e) {
                var n = this;
                this.result = e,
                e.length > 0 && this.fireEvent("hasResult");
                if (e.length == 0) {
                    this.fireEvent("noResult");
                    var r = this.getConfig("noResult");
                    t.isFunction(r) && (r = r.call(this)),
                    this._ul.innerHTML = "<li>" + r + "</li>",
                    this.menu.show(),
                    this._currentLi = null;
                    return
                }
                var i = [];
                i.push(this.firstMenuItem());
                var s = e.length - 1;
                t.array.each(e, 
                function(e, t) {
                    i.push('<li onmouseover="getCompleteMenu(' + n._MID + ')._highlightMenuItem(this);" aid="' + e + '">' + n.buildMenu(t) + "</li>")
                }),
                i.push(this.lastMenuItem()),
                this._ul.innerHTML = i.join(""),
                this.getConfig("autoSelectFirst") && this._highlightMenuItem(this._ul.firstChild),
                this.menu.show()
            },
            _noDataShow: function() {
                var e = this.getConfig("dataLoading");
                this._ul.innerHTML = "<li>" + e + "</li>",
                this.menu.show()
            },
            firstMenuItem: function() {
                return ""
            },
            lastMenuItem: function() {
                return ""
            },
            buildMenu: function(e) {
                return "<li>" + e.name + "</li>"
            },
            setMenuWidth: function(e) {
                this.menu.setWidth(e)
            },
            getCurrentItem: function() {
                return this._currentLi
            },
            setCurrentItem: function(e) {
                this._currentLi = e
            }
        }),
        e.autoCompleteMenu.prototype._wrapper = function() {
            return ['<div class="m-autosug">', '<span class="x1">', '<span class="x1a"></span>', "</span>", '<span class="x2">', '<span class="x2a"></span>', "</span>", '<div class="m-autosug-minwidth">', '<div class="m-autosug-content">', "<ul></ul>", "</div>", "</div>", "</div>"].join("")
        }
    } (),
    this.friendSelector = function(n) {
        var r = this;
        this.config = this.config || {},
        
        t.$extend(this.config, n.params),
        t.isUndefined(this.getConfig("page")) && (this.config.page = !1),
        e.autoCompleteMenu.call(this, n),
        this.addEvent("select", 
        function(e) {
            this.input.value = e.name,
            this.onSelectOne && this.onSelectOne(e)
        }),
        this.buildMenu = function(e) {
            return e.name
        },
        this.addEvent("focus", 
        function() {
            if (this._ready) return;
            if (this._isLoading) return;
            this.loadFriends()
        })
    },
    this.friendSelector.prototype = t.$extend({},
    this.autoCompleteMenu.prototype),
    t.$extend(this.friendSelector.prototype, {
        _isLoading: !1,
        _ready: !1,
        isReady: function() {
            return this._ready
        },
        isLoading: function() {
            return this._isLoading
        },
        loadFriends: function(e) {
            if (this.isLoading()) return;
            this._isLoading = !0;
            var n = this,
            r = {};
            r.init = !0,
            r.uid = !1,
            r.uhead = !1,
            r.uname = !1,
            r.group = !1,
            r.net = !1,
            r.param = this.getConfig("param"),
            r.page = this.getConfig("page"),
            new t.net.xmlhttp({
                useCache: !0,
                url: this.getConfig("aurl"),
                method: "get",
                data: "p=" + t.json.build(r),
                onSuccess: function(e) {
                    e = t.json.parse(e.responseText),
                    n._onload(e)
                }
            })
        },
        _onload: function(e) {
            this.isLoading = !1,
            this._ready = !0,
            this.config.qkey = e.qkey,
            this.DS = new t.util.DS_friends({
                url: this.getConfig("url"),
                qkey: this.getConfig("qkey"),
                limit: this.getConfig("limit"),
                page: this.getConfig("page"),
                param: this.getConfig("param")
            }),
            this.DS.query = function(e, n) {
                function s(e) {
                    e = e.responseText;
                    var i;
                    try {
                        var s = t.JSON.parse(e);
                        r.rootKey && s[r.rootKey] ? i = s[r.rootKey] : i = s
                    } catch(o) {
                        i = []
                    }
                    n(i)
                }
                var r = this;
                try {
                    this._request.abort()
                } catch(i) {}
                var o = t.json.parse(this.param);
                o.q = e,
                this.limit && (o.l = this.limit),
                o.friendId && (o.friend = o.friendId);
                var u = [];
                for (var a in o) u.push(a + "=" + encodeURIComponent(o[a]));
                this._request = new t.net.xmlhttp({
                    url: this.url,
                    data: u.join("&"),
                    method: this.method,
                    onSuccess: s
                })
            }
        }
    }),
    this.friendSelectorSynchronous = function(e, n) {
        function r(e, n, r) {
            t.isObject(e) && (e = e.id);
            if (r.isReady()) try {
                r[n](e)
            } catch(i) {} else r.addEvent("load", 
            function() {
                try {
                    r[n](e)
                } catch(t) {}
            }),
            r.loadFriends()
        }
        e.addEvent("select", 
        function(e) {
            r(e, "select", n)
        }),
        e.addEvent("deselect", 
        function(e) {
            r(e, "deselect", n)
        }),
        n.addEvent("select", 
        function(t) {
            r(t, "select", e)
        }),
        n.addEvent("deselect", 
        function(t) {
            r(t, "deselect", e)
        })
    },
    function() {
        e.multiFriendSelector = function(n) {
            var r = this;
            this._ID = t.util.createObjID(),
            this.config = this.config || {},
            
            this.frame = t.element.$element("div");
            var i = t.element.$element("div");
            i.hide(),
            document.body.appendChild(i),
            i.appendChild(this.frame),
            this.frame.innerHTML = ['<div id="' + this.getID("friendsContainer") + '" class="tokenizer friendAutoSelector">', '<span id="' + this.getID("inputContainer") + '" class="tokenizer_input"><input id="' + this.getID("input") + '" type="text" /></span>', "</div>", '<div class="float-right" id="' + this.getID("menu") + '"></div>'].join(""),
            this.input = this.getEl("input"),
            this.menuContainer = this.getEl("menu"),
            t.event.addEvent(this.getEl("friendsContainer"), "click", 
            function(e) {
                r._parseClickEvent(e || window.event)
            }),
            this.autoComplete = new e.friendSelector({
                id: this.input,
                inputTip: "输入好友姓名...",
                autoSelectFirst: !0,
                url: this.getConfig("url"),
                aurl: this.getConfig("aurl"),
                param: this.getConfig("param")
            }),
            this.autoComplete.loadFriends = function(e) {
                if (this.isLoading()) return;
                this._isLoading = !0;
                var n = {};
                n.init = !0,
                n.uid = !0,
                n.uhead = !1,
                n.uname = !0,
                n.group = !1,
                n.net = !1,
                t.$extend(n, r.getConfig("initParam")),
                n.param = this.getConfig("param"),
                new t.net.xmlhttp({
                    useCache: !0,
                    url: this.getConfig("aurl"),
                    method: r.getConfig("loadMethod") || "get",
                    data: "p=" + t.json.build(n),
                    onSuccess: function(e) {
                        e = t.json.parse(e.responseText),
                        r._allFriends = e.candidate,
                        r.fireEvent("load"),
                        r.autoComplete._onload(e)
                    }
                })
            },
            this.autoComplete.buildMenu = function(e) {
                return "<p>" + e.name + "</p>"
            },
            this.autoComplete.setMenuWidth(129),
            this.autoComplete.addEvent("keydown", 
            function(e) {
                r._onInputKeydown(e)
            }),
            this.autoComplete.addEvent("select", 
            function(e) {
                t.log(this.input),
                this.input.value = "",
                r.selectFriend(e)
            }),
            this.getConfig("noInput") && this.input.hide(),
            this.fireEvent("init")
        };
        var n = e.multiFriendSelector.prototype = t.$extend({},
        e.element);
        t.$extend(n, {
            isReady: function() {
                return this.autoComplete.isReady()
            },
            isLoading: function() {
                return this.autoComplete.isLoading()
            },
            loadFriends: function() {
                this.autoComplete.loadFriends()
            },
            getUserByID: function(e) {
                e = String(e);
                var n = null;
                return t.array.each(this._allFriends, 
                function(t, r) {
                    if (String(r.id) == e) return n = r,
                    !1
                }),
                n
            },
            getConfig: function(e) {
                return e == "inputName" ? this.config.idInputName || this.config.inputName: this.config[e]
            },
            getID: function(e) {
                return "mfs_" + this._ID + e
            },
            getFriendID: function(e) {
                return this.getID("friend_" + e)
            },
            getFriendEl: function(e) {
                return t.element.$(this.getFriendID(e))
            },
            getEl: function(e) {
                return t.element.$(this.getID(e))
            },
            getFriendsNum: function() {
                return this.getEl("friendsContainer").getElementsByTagName("a").length
            },
            getSelectedFriends: function() {
                var e = [],
                n = t.array.build(this.getEl("friendsContainer").getElementsByTagName("a"));
                return t.array.each(n, 
                function(t, n) {
                    e.push(n.getAttribute("uid") + "")
                }),
                e
            },
            reset: function() {
                this.deselectAll()
            },
            deselectAll: function() {
                var e = t.array.build(this.getEl("friendsContainer").getElementsByTagName("a"));
                t.array.each(e, 
                function(e, n) {
                    t.element.remove(n)
                }),
                this.fireEvent("deselectAll", this.getIds())
            },
            selectFriends: function(e) {
                var n = this;
                t.array.each(e, 
                function(e, t) {
                    n.select(t)
                })
            },
            deselectFriends: function(e) {
                var n = this;
                t.array.each(e, 
                function(e, t) {
                    n.deselect(t)
                })
            },
            select: function(e) {
                if (t.isUndefined(e)) return;
                t.log("mfs select:"),
                t.log(e);
                var n = this.getConfig("maxNum");
                if (n !== -1 && this.getFriendsNum() == n) {
                    this.fireEvent("overMaxNum", n);
                    return
                }
                if (t.isString(e) || t.isNumber(e)) e = {
                    id: e,
                    name: this.getUserByID(e).name
                };
                if (this.getFriendEl(e.id)) return;
                this.getEl("friendsContainer").insertBefore(this.createFriendHTML(e.id, e.name), this.getEl("inputContainer")),
                this.fireEvent("select", e.id)
            },
            deselect: function(e) {
                if (!this.getFriendEl(e)) return;
                this.getFriendEl(e).remove(),
                this.fireEvent("deselect", e)
            },
            _parseClickEvent: function(e) {
                var n = t.event.element(e);
                t.event.stop(e),
                n && n.getAttribute("action") && this.deselectFriend(n.getAttribute("uid"))
            },
            createFriendHTML: function(e, n) {
                var r = t.element.$element("a");
                return r.id = this.getFriendID(e),
                r.setAttribute("uid", e),
                r.href = "#nogo",
                r.className = "token",
                r.tabindex = "-1",
                r.innerHTML = ['<span>\n<span>\n<span>\n<span>\n<input type="hidden" value="', e, '" name="', this.getConfig("inputName"), '" />\n', '<input type="hidden" value="', n, '" name="', this.getConfig("nameInputName"), '" />\n', n, '<span uid="', e, '" action="x" class="x" onmouseout="this.className=\'x\'" onmouseover="this.className=\'x_hover\'" >\n</span>\n</span>\n</span>\n</span>\n</span>'].join(""),
                r
            },
            _onInputKeydown: function(e) {
                var n = this.getEl("inputContainer"),
                r = n.previousSibling,
                i = n.nextSibling,
                s = this.input,
                o = this.getEl("friendsContainer");
                return e.keyCode == 8 && this.input.value == "" ? (r && this.deselectFriend(r.getAttribute("uid")), !0) : e.keyCode == 37 && this.input.value == "" ? (r && r.tagName.toLowerCase() == "a" && (n.parentNode.removeChild(n), o.insertBefore(n, r), setTimeout(function() {
                    s.focus()
                },
                0)), !0) : e.keyCode == 39 && this.input.value == "" ? (i && i.tagName.toLowerCase() == "a" && (n.parentNode.removeChild(n), t.dom.insertAfter(n, i), setTimeout(function() {
                    s.focus()
                },
                0)), !0) : !1
            }
        }),
        t.event.enableCustomEvent(n),
        n.deSelectAll = n.deselectAll,
        n.deSelectFriend = n.deselectFriend = n.deselect,
        n.selectFriend = n.select,
        n.getSelectedFriendsID = n.getSelectedFriends,
        n.getIds = n.getSelectedFriends
    } (),
    this.friendSelectorWithMenu = function(n) {
        var r = new e.friendSelector(n),
        i = new e.friendSelectorMenu({
            url: r.getConfig("url"),
            aurl: r.getConfig("aurl"),
            param: r.getConfig("param"),
            multi: !1,
            alignType: n.alignType,
            offsetX: n.offsetX,
            offsetY: n.offsetY,
            initParam: n.initParam
        }),
        s = t.element.$element("div");
        return s.addChild(r),
        s.addChild(i),
        r.frame = s,
        r.addEvent("focus", 
        function() {
            i.menu.hide()
        }),
        i.addEvent("select", 
        function(e) {
            var t = this;
            setTimeout(function() {
                t.menu.hide()
            },
            30),
            r.fireEvent("select", this.getUserByID(e))
        }),
        i.menu.menu.setOffsetY(9),
        r
    },
    this.multiFriendSelectorWithMenu = function(t) {
        var n = new e.multiFriendSelector(t),
        r = new e.friendSelectorMenu({
            url: n.getConfig("url"),
            aurl: n.getConfig("aurl"),
            param: n.getConfig("param"),
            multi: !0,
            showSelectAllCheckbox: n.getConfig("showSelectAllCheckbox") || !1
        });
        return r.addEvent("submit", 
        function() {
            r.menu.hide()
        }),
        n.menuContainer.setContent(r),
        e.friendSelectorSynchronous(n, r),
        n
    },
    function(e) {
        var n = !1,
        r = t.event.addEvent,
        i = function(e) {
            return n && t.log(t.isString(e) ? "ui.tabView:" + e: e),
            e
        };
        e.tabView = function(e) {
            this.config = {
                selectedClass: "select",
                event: "click",
                alwaysReload: !1,
                mouseOverDelay: .2
            },
            t.$extend(this.config, e),
            this.init()
        },
        e.tabView.prototype = {
            _tabs: null,
            _currentTab: null,
            _idPre: null,
            _tabIndex: 0,
            init: function() {
                this._idPre = t.util.createObjID(),
                this._tabs = []
            },
            getConfig: function(e) {
                return e == "activeClass" ? this.config.activeClass || this.config.selectedClass: this.config[e]
            },
            _getID: function(e) {
                return e.nodeType && e.nodeType == 1 ? this._setID(e).id: e
            },
            _setID: function(e) {
                return e.id || (this._tabIndex++, e.setAttribute("id", "tabview_" + this._idPre + "_" + this._tabIndex)),
                t.element.$(e)
            },
            _getTab: function(e) {
                i("_getTab start"),
                i("param:id"),
                i(e);
                if (!e) return i(e);
                if (e.label) return i(e);
                var t = this._getID(e);
                i("key:" + t);
                var n = this._tabs;
                i("all tabs"),
                i(n);
                for (var r = n.length - 1; r >= 0; r--) if (n[r].key == t) return i("_getTab end"),
                i(n[r]);
                return i("_getTab end"),
                i(null)
            },
            getCurrentTab: function() {
                return this._getTab(this._currentTab)
            },
            setCurrentTab: function(e, t) {
                i("setCurrentTab start");
                var n = this.getCurrentTab(),
                r = this._getTab(e);
                i("old current:"),
                i(n),
                i("now current:"),
                i(r);
                if (n && n.key == r.key && !t) return;
                return n && this._deactiveTab(n),
                this._activeTab(r),
                this._setCurrentTab(r),
                i("setCurrentTab end"),
                this.fireEvent("change", r),
                this
            },
            reset: function() {
                var e = this.getCurrentTab();
                return e && this._deactiveTab(e),
                this._setCurrentTab(null),
                this
            },
            _activeTab: function(e) {
                i("_activeTab:"),
                i(e),
                e.getEl("label").addClass(this.getConfig("activeClass")),
                e.content && e.getEl("content").show(),
                e.onActive(e),
                i("_activeTab end")
            },
            _deactiveTab: function(e) {
                e.getEl("label") && e.getEl("label").delClass(this.getConfig("activeClass")),
                e.content && e.getEl("content").hide(),
                e.onInactive(e)
            },
            _setCurrentTab: function(e) {
                i("_setCurrentTab start"),
                e = this._getTab(e),
                i("currentTab:"),
                i(e),
                this._currentTab = e ? e.key: null,
                i("this._currentTab"),
                i(this._currentTab),
                i("_setCurrentTab end")
            },
            addTab: function(e) {
                i("addTab start"),
                i("params:"),
                i(e);
                var n = this,
                s = {
                    onActive: t.func.empty,
                    onClick: t.func.empty,
                    onInactive: t.func.empty,
                    onInit: t.func.empty,
                    getEl: function(e) {
                        return t.element.$(this[e])
                    },
                    active: !1
                };
                e.label = this._setID(t.element.$(e.label)),
                e.key = e.key || e.label.id,
                e.content && (e.content = this._getID(e.content), i("get content id:" + e.content)),
                t.$extend(s, e),
                this._tabs.push(s),
                i("all tabs"),
                i(this._tabs),
                s.active && this._currentTab === null ? (s.content && s.getEl("content").show(), s.label.addClass(this.getConfig("activeClass")), this._setCurrentTab(s)) : s.content && s.getEl("content").hide();
                var o = this.getConfig("event");
                if (o == "click") r(s.label, "click", 
                function(e) {
                    e = e || window.event,
                    t.event.stop(e),
                    n._eventHander(e, s.label)
                },
                !1);
                else if (o == "mouseover") {
                    var u = !0,
                    a = null;
                    r(s.label, "mouseover", 
                    function(e) {
                        var t = this;
                        u = !0,
                        a = setTimeout(function() {
                            if (!u) return;
                            e = e || window.event,
                            n._eventHander(e, s.label)
                        },
                        n.getConfig("mouseOverDelay") * 1e3)
                    },
                    !1),
                    r(s.label, "mouseleave", 
                    function(e) {
                        u = !1,
                        a && clearTimeout(a)
                    },
                    !1)
                }
                return s.onInit(s),
                i("addTab end"),
                this
            },
            _eventHander: function(e, t) {
                i("on click,el:"),
                i(t),
                i("get tab form by el:");
                var n = this._getTab(t);
                this.getConfig("alwaysReload") ? this.setCurrentTab(n, !0) : this.setCurrentTab(n),
                n.onClick(e, n)
            },
            refresh: function() {
                return this._activeTab(this.getCurrentTab()),
                this
            },
            showTab: function(e, t) {
                this.setCurrentTab(e, t)
            },
            hideAll: function() {
                this.reset()
            }
        },
        t.event.enableCustomEvent(e.tabView.prototype)
    } (this),
    this.refreshAll = function() {
        document.body.style.zoom = 1.1,
        document.body.style.zoom = 1
    },
    this.getHiddenDiv = function() {
        return this._hiddenDiv || (this._hiddenDiv = t.element.$element("div").hide(), document.body.appendChild(this._hiddenDiv)),
        this._hiddenDiv
    },
    this.friendSearchBar = function(n) {
        var r = t.element.$(n.input),
        i = t.element.$(n.submit || null),
        s = t.element.$(n.form),
        o = n.tip || "找人...",
        u = n.action || 
        function(e) {
            e.type && e.type == "PAGE" ? window.location.href = "http://page." + t.env.domain + "/" + e.id + "?from=opensearch": window.location.href = "http://www." + t.env.domain + "/profile.do?id=" + e.id + "&from=opensearch"
        },
        a = !1; (new t.form.inputHelper(r)).setDefaultValue(o).onEnter(function(e) {
            if (a) return;
            t.string.isBlank(e.value) || s.submit()
        });
        var f = 16,
        l = {
            id: r,
            noResult: function() {
                return '搜索"' + this.input.value + '"'
            },
            limit: f,
            params: n.params
        },
        c = new e.friendSelector(l);
        c.lastMenuItem = function() {
            return this.result.length == f ? '<li><p><a onmousedown="window.location.href=this.href" href="http://friend.' + t.env.domain + "/myfriendlistx.do?qu=" + this.input.value + '">点击查看更多..</a></p></li>': ""
        },
        c.setMenuWidth(r.offsetWidth),
        c.onSelectOne = function(e) {
            a = !0,
            u(e)
        },
        i && (i.onclick = function() {
            if (a) return ! 1;
            var e = r.value;
            return e != o && !t.string.isBlank(e) ? (s.submit(), !1) : i.tagName.toLowerCase() == "a" ? !0: !1
        })
    },
    this.navSearchBar = function(n) {
        var r = t.element.$(n.input),
        i = t.element.$(n.submit || null),
        s = t.element.$(n.form),
        o = n.tip || "找人...",
        u = n.action || 
        function(e) {
            e.type && e.type == "PAGE" ? window.location.href = "http://page." + t.env.domain + "/" + (e.id || e.uid) + "?from=opensearch": window.location.href = "http://www." + t.env.domain + "/profile.do?id=" + (e.id || e.uid) + "&from=opensearch"
        },
        a = !1; (new t.form.inputHelper(r)).setDefaultValue(o).onEnter(function(e) {
            if (a) return;
            t.string.isBlank(e.value) || s.submit()
        });
        var f = 7,
        l = {
            id: r,
            noResult: function() {
                return '<a onmousedown="window.location.href=this.href" href="http://browse.' + t.env.domain + "/searchEx.do?from=opensearchclick&q=" + encodeURIComponent(this.input.value) + '" title="搜索' + this.input.value + '">搜索"' + this.input.value + '"</a>'
            },
            limit: f,
            params: n.params,
            wrapper: ['<div class="">', '<span class="x1">', '<span class="x1a"></span>', "</span>", '<span class="x2">', '<span class="x2a"></span>', "</span>", '<div class="m-autosug-minwidth">', '<div class="m-autosug-content">', '<ul class="search-Result"></ul>', "</div>", "</div>", "</div>"].join(""),
            url: "http://sg." + t.env.domain + "/s/h"
        },
        c = new e.friendSelector(l);
        c.loadFriends = function(e) {
            if (this.isLoading()) return;
            this._isLoading = !0;
            var t = this;
            this._onload()
        },
        c._onload = function() {
            this.isLoading = !1,
            this._ready = !0,
            this.DS = new t.util.DS_friends({
                url: this.getConfig("url"),
                qkey: this.getConfig("qkey"),
                limit: this.getConfig("limit"),
                page: this.getConfig("page"),
                param: this.getConfig("param")
            }),
            this.DS.query = function(e, n) {
                function s(e) {
                    e = e.responseText;
                    var i;
                    try {
                        var s = t.json.parse(e);
                        r.rootKey && s[r.rootKey] ? i = s[r.rootKey] : i = s
                    } catch(o) {
                        i = []
                    }
                    n(i)
                }
                var r = this;
                try {
                    this._request.abort()
                } catch(i) {}
                this._request = new t.net.xmlhttp({
                    url: this.url,
                    data: "q=" + encodeURIComponent(e) + "&l=" + this.limit,
                    method: this.method,
                    onSuccess: s
                })
            }
        },
        c.buildMenu = function(e) {
            return '<img src="' + (e.head || e.uhead) + '" width="50" height="50" alt="' + (e.name || e.uname) + '"/>' + "<strong>" + (e.name || e.uname) + "</strong>"
        },
        c._noDataShow = function() {
            var e = this.getConfig("dataLoading");
            this._ul.innerHTML = '<li class="lookMore">' + e + "</li>",
            this.menu.show()
        },
        c._buildMenu = function(e) {
            var n = this;
            this.result = e;
            if (e.length == 0) {
                var r = this.getConfig("noResult");
                t.isFunction(r) && (r = r.call(this)),
                this._ul.innerHTML = '<li class="lookMore">' + r + "</li>",
                this.menu.show(),
                this._currentLi = null;
                return
            }
            var i = [];
            i.push(this.firstMenuItem());
            var s = e.length - 1;
            t.array.each(e, 
            function(e, t) {
                i.push('<li onmouseover="getCompleteMenu(' + n._MID + ')._highlightMenuItem(this);" aid="' + e + '">' + n.buildMenu(t) + "</li>")
            }),
            i.push(this.lastMenuItem()),
            this._ul.innerHTML = i.join(""),
            this.getConfig("autoSelectFirst") && this._highlightMenuItem(this._ul.firstChild),
            this.menu.show()
        },
        c.lastMenuItem = function() {
            return this.result.length == f ? '<li class="lookMore"><a onmousedown="window.location.href=this.href" href="http://friend.' + t.env.domain + "/myfriendlistx.do?qu=" + this.input.value + '">点击查看更多..</a></li>': ""
        },
        c.setMenuWidth(r.offsetWidth),
        c.onSelectOne = function(e) {
            a = !0,
            u(e)
        },
        i && (i.onclick = function() {
            if (a) return ! 1;
            var e = r.value;
            return e != o && !t.string.isBlank(e) ? (s.submit(), !1) : i.tagName.toLowerCase() == "a" ? !0: !1
        })
    },
    this.userInfoAutoComplete = function(n, r) {
        var i = {
            elementaryschool: "http://www." + t.env.domain + "/autocomplete_elementaryschool.jsp",
            juniorhighschool: "http://www." + t.env.domain + "/autocomplete_juniorhighschool.jsp",
            workplace: "http://www." + t.env.domain + "/autocomplete_workplace.jsp",
            highschool: "http://www." + t.env.domain + "/autocomplete_highschool.jsp",
            allnetwork: "http://www." + t.env.domain + "/autocomplete_all_network.jsp",
            allSchool: "http://www." + t.env.domain + "/autocomplete-school.jsp",
            city: "http://www." + t.env.domain + "/autocomplete-city.jsp",
            college: "http://www." + t.env.domain + "/autocomplete_college.jsp"
        },
        s = new t.datasource.DS_XHR({
            url: i[r]
        }),
        o = new e.autoCompleteMenu({
            DS: s,
            input: n
        });
        return o.buildMenu = function(e) {
            return "<p>" + (e.name || e.Name) + "</p>"
        },
        o.addEvent("select", 
        function(e) {
            this.input.value = e.name || e.Name
        }),
        o
    }
}),
object.add("CX.Do", "CX, CX.func, CX.array, CX.ui", 
function(e, t) {
    this.currentAlert = null,
    this.currentConfirm = null,
    this.alert = function(n, r, i, s, o, u, a, f) {
        var l = {
            type: "normal",
            width: 400,
            button: "确定",
            modal: !1,
            callBack: t.func.empty,
            autoHide: 0,
            addIframe: !0,
            closeFire: !0
        };
        if (!t.isString(n)) extendObject(l, n);
        else if (t.isString(n) || arguments.length > 1) {
            var c = arguments;
            t.array.each(["message", "title", "type", "X", "Y", "width", "height", "callBack"], 
            function(e, t) {
                c[e] && (l[t] = c[e])
            })
        }
        var h = l.params;
        delete l.params,
        l = extendObject({},
        l, h),
        l.callback = l.callback || l.callBack;
        try {
            e.currentAlert.remove(l.modal === !0)
        } catch(p) {}
        var d = (new t.ui.dialog(l)).setType(l.type).setTitle(l.title || (l.type == "error" ? "错误提示": "提示")).setWidth(l.width).setHeight(l.height).setX(l.X).setY(l.Y).addButton({
            text: l.yes || l.button,
            onclick: function(e) {
                return d.setAutoHide(!0),
                l.callback.call(d, e)
            }
        }).show();
        l.closeFire === !0 && d.addEvent("close", 
        function(e) {
            l.callback.call(d, e)
        }),
        e.currentAlert = d;
        try {
            d.getButton(l.button).focus()
        } catch(p) {}
        return l.autoHide && d.autoHide(l.autoHide),
        d
    },
    this.confirm = function(n, r, i, s, o, u, a, f, l) {
        var c = {
            type: "normal",
            width: 400,
            modal: !1,
            yes: "确定",
            no: "取消",
            callBack: t.func.empty,
            focus: null,
            addIframe: !0,
            closeFire: !1
        };
        if (!t.isString(n) && !t.isNumber(n)) extendObject(c, n);
        else if (t.isString(n) || arguments.length > 1) {
            var h = arguments;
            t.array.each(["message", "title", "callBack", "yes", "no", "X", "Y", "w", "h"], 
            function(e, t) {
                h[e] && (c[t] = h[e])
            })
        }
        var p = c.params;
        delete c.params,
        c = extendObject({},
        c, p),
        c.callback = c.callback || c.callBack;
        try {
            e.currentConfirm.remove(c.modal === !0)
        } catch(d) {}
        var v = (new t.ui.dialog(c)).setType(c.type).setTitle(c.title || (c.type == "error" ? "错误提示": "提示")).setBody(c.msg || c.message || "").setWidth(c.width).setHeight(c.height).setX(c.X).setY(c.Y).addButton({
            text: c.submit || c.yes,
            onclick: function() {
                return v.setAutoHide(!0),
                c.callback.call(v, !0)
            }
        }).addButton({
            text: c.cancel || c.no,
            onclick: function() {
                return v.setAutoHide(!0),
                c.callback.call(v, !1)
            }
        }).show();
        return v.getButton(c.cancel || c.no).addClass("gray"),
        c.focus == "submit" ? c.focus = c.submit: c.focus == "cancel" && (c.focus = c.cancel),
        c.closeFire === !0 && v.addEvent("close", 
        function() {
            c.callback.call(v, !1)
        }),
        v.getButton(c.focus || c.submit || c.yes).focus(),
        e.currentConfirm = v,
        v
    },
    this.showMessage = this.showMsg = function(t, n, r) {
        var i = e.alert({
            msg: t,
            title: n || "提示",
            noFooter: !0,
            autoHide: r || 2
        });
        return i
    },
    this.showError = function(t, n, r) {
        var i = e.alert({
            msg: t,
            type: "error",
            title: n || "错误提示",
            noFooter: !0,
            autoHide: r || 2
        });
        return i
    }
}),
object.use(["CX", "CX.array", "CX.browser", "CX.cookie", "CX.Do", "CX.dom", "CX.effect", "CX.element", "CX.env", "CX.event", "CX.form", "CX.func", "CX.json", "CX.net", "CX.string", "CX.template", "CX.ui", "CX.util", "CX.datasource"], 
function(e) {
    $extend = e.$extend;
    if (window.CX == null) window.CX = e;
    else {
        var t = window.CX;
        window.CX = e;
        for (var n in t) window.CX[n] === undefined ? window.CX[n] = t[n] : e.$extend(window.CX[n], t[n])
    }
    isUndefined = e.isUndefined,
    isString = e.isString,
    isElement = e.isElement,
    isFunction = e.isFunction,
    isObject = e.isObject,
    isArray = e.isArray,
    isNumber = e.isNumber,
    $ = e.element.$,
    $element = e.element.$element,
    e.element.findFirstClass = e.dom.findFirstClass,
    extendObject = $extend,
    xn_getEl = ge = getEl = $X = $,
    $xElement = e.element.$element,
    e.DEBUG = e.Debug = e.debug,
    e.debug.On = e.debug.on,
    e.debug.Off = e.debug.off,
    e.namespace("ui"),
    e.namespace("util"),
    e.namespace("app"),
    e.namespace("page"),
    e.APP = e.App = e.app,
    e.PAGE = e.Page = e.page,
    e.CONFIG = e.Config = e.config,
    e.ENV = e.Env = e.env = e.env,
    e.ARRAY = e.Array = e.array = e.array,
    e.String = e.STRING = e.string = e.string,
    e.BROWSER = e.Browser = e.browser = e.browser,
    e.COOKIE = e.Cookie = e.cookie = e.cookie,
    e.EVENT = e.Event = e.event = e.event,
    e.DO = e.Do,
    e.DOM = e.Dom = e.dom = e.dom,
    e.EFFECT = e.Effect = e.effect = e.effect,
    e.ELEMENT = e.Element = e.element = e.element,
    e.FORM = e.Form = e.form = e.form,
    e.FUNC = e.Func = e.func = e.func,
    e.JSON = e.Json = e.json = e.json,
    e.NET = e.Net = e.net,
    e.Template = e.TEMPLATE = e.template = e.template,
    e.UI = e.Ui = e.ui,
    e.UTIL = e.Util = e.util,
    e.ui.DS_JSON = e.util.DS_JSON = e.datasource.DS_JSON,
    e.ui.DS_friends = e.util.DS_friends = e.datasource.DS_friends,
    e.ui.DS_Array = e.util.DS_Array = e.datasource.DS_Array,
    e.ui.DS_XHR = e.util.DS_XHR = e.datasource.DS_XHR;
    try {
        document.domain = String(e.env.domain)
    } catch(r) {}
    window.isJSON == null && (window.isJSON = e.string.isJSON),
    e.events == null && (e.timeLog = {},
    e.events = {},
    e.event.enableCustomEvent(e.events))
}),
"abbr article aside audio canvas command details figcaption figure footer header hgroup mark meter nav output progress section summary time video".replace(/\w+/g, 
function(e) {
    document.createElement(e)
}),
function() {
    function e() {}
    var t = !!window.attachEvent && !window.opera;
    window.Expressions = e;
    if (!t) return;
    e.ie6 = navigator.appVersion.indexOf("MSIE 6.0") != -1,
    e.ie7 = navigator.appVersion.indexOf("MSIE 7.0") != -1,
    e.k = 1,
    e.timer = function() {
        e.k++;
        var t = document.getElementById("expressionsTimer");
        t && (t.innerHTML = e.k)
    },
    e.ele = {},
    e.pseudo = {},
    e.selector = {},
    e.style = {},
    e.addClass = function(e, t) {
        e.className += " " + t
    },
    e.removeClass = function(e, t) {
        e.className = e.className.replace(new RegExp("\\b" + t + "(\\s+|\\b)", "ig"), "")
    },
    e.hasClass = function(e, t) {
        return e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
    },
    e.getPixelValue = function(e, t) {
        if (!/^\d+(px)?$/i.test(t) && /^\d/.test(t)) {
            var n = e.style.left,
            r = e.runtimeStyle.left;
            return e.runtimeStyle.left = e.currentStyle.left,
            e.style.left = t || 0,
            t = e.style.pixelLeft,
            e.style.left = n,
            e.runtimeStyle.left = r,
            t
        }
        return parseInt(t) || 0
    },
    e.pseudo.hover = function(t, n) {
        if (e.ie7) return;
        n || (n = "hover"),
        t.attachEvent("onmouseover", 
        function() {
            t.className += " " + n
        }),
        t.attachEvent("onmouseout", 
        function() {
            t.className = t.className.replace(new RegExp("\\s" + n, "ig"), "")
        }),
        e.timer()
    },
    e.pseudo.focus = function(t, n) {
        n || (n = "focus"),
        t.attachEvent("onfocus", 
        function() {
            t.className += " " + n
        }),
        t.attachEvent("onblur", 
        function() {
            t.className = t.className.replace(new RegExp("\\s" + n, "ig"), "")
        }),
        e.timer()
    },
    e.pseudo.disabled = function(t, n) {
        function r() {
            t.disabled ? e.hasClass(t, n) || e.addClass(t, n) : e.removeClass(t, n)
        }
        n || (n = "disabled"),
        t.attachEvent("onpropertychange", r),
        r(),
        e.timer()
    },
    e.pseudo.enabled = function(t, n) {
        function r() {
            t.disabled ? e.removeClass(t, n) : e.hasClass(t, n) || e.addClass(t, n)
        }
        n || (n = "enabled"),
        t.attachEvent("onpropertychange", r),
        r(),
        e.timer()
    },
    e.pseudo.before = function(t, n) {
        var r = document.createElement("before");
        t.insertBefore(r, t.firstChild),
        e.timer()
    },
    e.pseudo.after = function(t, n) {
        var r = document.createElement("after"),
        i = setInterval(function() {
            try {
                t.appendChild(r),
                clearInterval(i)
            } catch(e) {}
        },
        200);
        e.timer()
    },
    e.style.width = function(e, t) {
        t > 0 && (e.style.width = t + "px")
    },
    e.style.minWidth = function(t, n) {
        function r() { ! t.__oldWidth && document.documentElement.clientWidth < n ? (t.__oldWidth = t.runtimeStyle.width, t.runtimeStyle.width = n + "px") : t.__oldWidth && document.documentElement.clientWidth >= n && (t.__oldWidth = null, t.runtimeStyle.width = t.__oldWidth)
        }
        if (!n.match(/(\d+)px/)) return;
        n = parseInt(RegExp.$1),
        window.attachEvent("onresize", r),
        r(),
        e.timer()
    },
    e.style.outline = function(e, t) {
        t == "0 none" && (e.onfocus = function() {
            e.blur()
        })
    },
    e.style.backgroundOrigin = function(t) {
        t.style.backgroundPosition = t.offsetWidth - 14 + "px center",
        e.timer()
    },
    e.style.boxSizing = {},
    e.style.boxSizing.borderBox = function(t, n, r) {
        var i = function(n) {
            t.runtimeStyle.width = "",
            n || (n = t.currentStyle.width);
            var r = (t.currentStyle["bordeLeftStyle"] == "none" ? 0: parseInt(t.currentStyle.borderLeftWidth)) || 0,
            i = (t.currentStyle["bordeRightStyle"] == "none" ? 0: parseInt(t.currentStyle.borderRightWidth)) || 0,
            s = parseInt(t.currentStyle.paddingLeft) || 0,
            o = parseInt(t.currentStyle.paddingRight) || 0,
            u = r + i + s + o,
            a = (parseInt(t.parentNode.currentStyle.paddingLeft) || 0) + (parseInt(t.parentNode.currentStyle.paddingRight) || 0);
            n = e.getPixelValue(t, n) - a,
            t.runtimeStyle.width = Math.max(0, n - u) + "px"
        },
        s = function(n) {
            t.runtimeStyle.height = "",
            n || (n = t.currentStyle.height);
            var r = (t.currentStyle["bordeTopStyle"] == "none" ? 0: parseInt(t.currentStyle.borderTopWidth)) || 0,
            i = (t.currentStyle["bordeBottomStyle"] == "none" ? 0: parseInt(t.currentStyle.borderBottomWidth)) || 0,
            s = parseInt(t.currentStyle.paddingTop) || 0,
            o = parseInt(t.currentStyle.paddingBottom) || 0,
            u = r + i + s + o,
            a = (parseInt(t.parentNode.currentStyle.paddingTop) || 0) + (parseInt(t.parentNode.currentStyle.paddingBottom) || 0);
            n = e.getPixelValue(t, n) - a,
            t.runtimeStyle.height = Math.max(0, n - u) + "px"
        };
        i(n),
        s(r),
        t.attachEvent("ondetach", 
        function() {
            t.runtimeStyle.width = "",
            t.runtimeStyle.height = ""
        }),
        t.attachEvent("onpropertychange", 
        function() {
            var e = event.propertyName;
            e === "style.boxSizing" && t.style.boxSizing === "" && (t.style.removeAttribute("boxSizing"), t.runtimeStyle.boxSizing = undefined);
            switch (e) {
            case "style.width":
            case "style.borderLeftWidth":
            case "style.borderLeftStyle"
                :
            case "style.borderRightWidth":
            case "style.borderRightStyle":
            case "style.paddingLeft":
            case "style.paddingRight":
                i(n);
                break;
            case "style.height":
            case "style.borderTopWidth":
            case "style.borderTopStyle":
            case "style.borderBottomWidth":
            case "style.borderBottomStyle":
            case "style.paddingTop":
            case "style.paddingBottom":
                s(r);
                break;
            case "className":
            case "style.boxSizing":
                i(n),
                s(r);
                break;
            default:

            }
        }),
        e.timer();
        return
    },
    e.style.content = function(t, n) {
        t.innerText = n,
        e.timer()
    },
    e.style.position = {},
    e.style.position.fixed = function(t) {
        var n;
        window.attachEvent("onscroll", 
        function() {
            var r = 500;
            t.hackStyle && t.hackStyle.IE6fixedPositionDelay && (r = t.hackStyle.IE6fixedPositionDelay),
            t.runtimeStyle.visibility = "hidden",
            e.addClass(t, "IE6_SCROLLING"),
            clearTimeout(n),
            n = setTimeout(function() {
                t.runtimeStyle.visibility = "visible",
                e.removeClass(t, "IE6_SCROLLING")
            },
            r)
        }),
        e.timer()
    },
    e.style.position.fixed.delay = function(t, n) {
        t.hackStyle || (t.hackStyle = {}),
        t.hackStyle.IE6fixedPositionDelay = n,
        e.timer()
    },
    e.style.fixLineHeight = function(t) {
        var n = function(e) {
            e.runtimeStyle.zoom = "1";
            var t = document.createElement("h");
            t.style.zoom = "1",
            e.insertBefore(t, e.children[0])
        };
        for (var r = 0, i = ["IMG", "SELECT", "INPUT", "TEXTAREA"], s; s = i[r]; r++) if (t.tagName.toUpperCase() == s) {
            t.parentNode.currentStyle.lineHeight != "normal" && n(t.parentNode);
            return
        }
        n(t),
        e.timer()
    },
    e.selector = function(t, n) {
        var r = Sizzle(t);
        for (var i = 0; i < r.length; i++) e.addClass(r[i], n);
        e.timer()
    },
    t && 
    function() {
        var e = setInterval(function() {
            try {
                document.body.doScroll("left"),
                clearInterval(e),
                document.getElementsByTagName("title")[0].innerHTML
            } catch(t) {}
        },
        20)
    } (),
    e.hover = e.pseudo.hover,
    e.focus = e.pseudo.focus,
    e.after = e.pseudo.after,
    e.before = e.pseudo.before
} ();
try {
    document.execCommand("BackgroundImageCache", !1, !0)
} catch(e) {}
try {

} catch(e) {}
window.console || (window.console = {
    log: function() {},
    warn: function() {},
    error: function() {}
}),
window.now = new Date,
CX.dom.ready(function() {
    if (CX.config.parentDomain || !CX.config.jumpOut) return;
    try {
        top.location.href.indexOf("x")
    } catch(e) {
        try {
            top.location = self.location
        } catch(e) {}
    }
}),
CX.browser.Gecko && CX.string.getQuery("debug_mode") && CX.debug.on(),
function() {
    var e = !1;
    window.load_jebe_ads = function(t, n, r) {
        if (window._developer_no_ads) return;
        if (!t) return;
        if (e && !r) return;
        e = !0,
        
        CX.dom.ready(function() {
            
        })
    }
} (),
CX.USER = CX.user = currentUser = {},
CX.USER.me = function(e) {},
CX.event.enableCustomEvent(currentUser),
CX.USER.addFriendAction = function(e) {
    
},
CX.user.addFriendAction.prototype = {
    getConfig: function(e) {
        return this.config[e]
    },
    send: function(e, t, n, i, s) {
        var i = i != 1 ? 0: 1,
        s = s || "",
        o = this;
        if (this.getConfig("needComment") && CX.STRING.isBlank(t)) {
            this.fireEvent("checkError", "您输入的信息不能为空");
            return
        }
        if (t.length > this.getConfig("commentLength")) {
            this.fireEvent("checkError", "您输入的信息不能超过" + this.getConfig("commentLength") + "个字符");
            return
        }
        var u = "id=" + e + "&why=" + t + "&codeFlag=" + i + "&code=" + s;
        this.getConfig("matchmaker") && (u = u + "&matchmaker=" + this.getConfig("matchmaker")),
        this.getConfig("groupname") && (u = u + "&groupname=" + this.getConfig("groupname")),
        this.fireEvent("beforePost"),
        new CX.NET.xmlhttp({
            url: this.getConfig("requestURI") + "?from=" + n,
            data: u,
            onSuccess: function(t) {
                t = t.responseText;
                if (!t || !isJSON(t)) {
                    o.fireEvent("error");
                    return
                }
                var r = CX.JSON.parse(t);
                if (r.result == "-1") {
                    o.fireEvent("flagError");
                    return
                }
                o.fireEvent("success", e, t, n);
                if (!window.currentUser) return;
                currentUser.fireEvent && currentUser.fireEvent("addFriendSuccess", e, t, n),
                currentUser.onaddFriendSuccess && currentUser.onaddFriendSuccess(e, t)
            },
            onError: function() {
                o.fireEvent("error", e, n);
                if (!window.currentUser) return;
                currentUser.fireEvent("addFriendError", e, r, n)
            }
        })
    }
},
CX.EVENT.enableCustomEvent(CX.USER.addFriendAction.prototype),
CX.dynamicLoad({
    file: "http://s.xnimg.cn/jspro/xn.app.addFriend.js",
    funcs: ["showRequestFriendDialog"]
}),
CX.DOM.readyDo(function() {
    if (CX.get_check) {
        var e = Sizzle("form");
        for (var t = 0; t < e.length; t++) {
            try {
                var n = document.createElement('<input name="requestToken" type="hidden" value="' + CX.get_check + '"/>')
            } catch(r) {
                var n = document.createElement("input");
                n.type = "hidden",
                n.name = "requestToken",
                n.value = CX.get_check
            }
            e[t].appendChild(n);
            try {
                n = document.createElement('<input name="_rtk" type="hidden" value="' + CX.get_check_x + '"/>')
            } catch(r) {
                n = document.createElement("input"),
                n.type = "hidden",
                n.name = "_rtk",
                n.value = CX.get_check_x
            }
            e[t].appendChild(n)
        }
    }
}),
CX.namespace("widgets"),
CX.WIDGETS = CX.Widgets = CX.widgets,
CX.app.statsMaster = {
    init: function() {
        var e = {
            ID: CX.cookie.get("id"),
            R: encodeURIComponent(location.href)
        },
        t = CX.JSON.build(e);
        this.listener = function(n) {
            var n = n || window.event,
            r = CX.event.pointerX(n),
            i = CX.event.pointerY(n),
            s,
            o,
            u = CX.event.element(n),
            a = $("dropmenuHolder");
            xx = CX.element.realLeft(a);
            if (!u || !u.tagName) return;
            o = u.tagName.toLowerCase(),
            o == "a" && (s = u.href);
            var f = u.getAttribute("stats");
            f && (o = f),
            e.X = r - xx,
            e.Y = i,
            s && (e.U = encodeURIComponent(s)),
            o && (e.T = o),
            t = CX.JSON.build(e),
            (new Image).src = "";//http://dj." + CX.env.domain + "/click?J=" + t + "&t=" + Math.random()
        },
        CX.event.addEvent(document, "mousedown", this.listener),
        window.statisFocusEventAdded || (CX.event.addEvent(window, "focus", 
        function() { (new Image).src = "";//http://dj." + CX.env.domain + "/focus?J=" + t + "&t=" + Math.random()
        }), window.statisFocusEventAdded = !0),
        window.statisBlurEventAdded || (CX.event.addEvent(window, "blur", 
        function() { (new Image).src = "";//http://dj." + CX.env.domain + "/unfocus?J=" + t + "&t=" + Math.random()
        }), window.statisBlurEventAdded = !0),
        window.statisBottomEventAdded || (CX.events.addEvent("scrollbottom", 
        function() { (new Image).src = "";//http://dj." + CX.env.domain + "/scrollbottom?J=" + t + "&t=" + Math.random()
        }), window.statisBottomEventAdded = !0)
    },
    destroy: function() {
        CX.event.delEvent(document, "mousedown", this.listener)
    }
},
CX.dom.ready(function() {
    if (!CX.BROWSER.IE6) {
        if (window._developer_no_dj) return;
        CX.app.statsMaster.init()
    }
}),
CX.dom.ready(function() {
    if (window._developer_no_guide) return;
    var e = !1,
    t = !0;
    CX.event.addEvent(document, "mousedown", 
    function() {
        t = !1
    }),
    CX.event.addEvent(window, "blur", 
    function() {
        t = !0
    }),
    showConfirmDialog = function() {
        var t = CX.DO.alert({
            title: "请领取您的" + CX.env.siteName + "通行证",
            modal: !0,
            message: '<iframe id="frameactive" width="410" height="100%" frameborder="no" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" src="about:blank" ></iframe>',
            width: 454,
            params: {
                showCloseButton: !0
            },
            callBack: function() {
                e = !1,
                showConfirmDialog.fireEvent("close")
            }
        });
        arguments.callee.dialog = t,
        t.footer.hide(),
        $("frameactive").src = "http://channel." + CX.env.domain + "/confirm/show",
        $("frameactive").contentWindow.location.href = "http://channel." + CX.env.domain + "/confirm/show",
        $("frameactive").addEvent("load", 
        function() {
            t.refresh()
        })
    },
    CX.event.enableCustomEvent(showConfirmDialog);
    if (!CX.cookie.get("noconfirm")) return;
    var n = setInterval(function() {
        if (t || window.noConfirmWindow || e || !CX.cookie.get("noconfirm")) return;
        e = !0,
        CX.cookie.del("noconfirm", "/", CX.env.domain),
        CX.cookie.del("noconfirm", "/", window.location.hostname),
        showConfirmDialog()
    },
    1e3);
    CX.log("未激活用户引导初始化over")
}),
object.use("dom, ua", 
function(e, t) {
    e.wrap(window),
    e.wrap(document),
    e.ready(function() {
        document.delegate("a, a span", "click", 
        function(n) {
            if (n.button == 2) return;
            var r = this;
            this.tagName && this.tagName.toLowerCase() == "span" && (r = e.wrap(this).getParent("a"));
            if (!r) return;
            var i = r.getAttribute("href"),
            s;
            if (!i) return;
            if (t.ua.ie >= 9) if (i == "javascript:;" || i.indexOf("javascript:void(0)") != -1) {
                r.setAttribute("href", "#nogo"),
                n.preventDefault();
                return
            }
            s = i.length;
            if (i == "#nogo" || i == "#") {
                n.preventDefault();
                return
            } (s > 1 && i.slice( - 1) == "#" || s > 4 && i.slice( - 5) == "#nogo") && n.preventDefault()
        })
    })
}),
function() {
    if (window._developer_no_webpager) return;
    var e = 0,
    t = !1,
    n = 0,
    r = "l4pager",
    i = null;
    if (CX.browser.IE6 || window.location.host == "apps.chexie.org") t = !0;
    this.checkExpand = function() {
        var n,
        r;
        return document.documentElement && (r = document.documentElement.clientHeight, n = document.documentElement.clientWidth),
        {
            width: n,
            height: r,
            full: n >= 1240 && !t,
            layout: e,
            loading: i
        }
    };
    var s,
    o = 0;
    while (s = document.childNodes[o]) {
        if (s.tagName && s.tagName.toLowerCase() == "html") break;
        o++
    }
    this.frameLayout = function(t) {
        if (t == 1) s.className = (s.className || "") + " marginRightForPager";
        else {
            if (t != 0) return e;
            s.className = s.className.replace("marginRightForPager", "")
        }
        e = t,
        window.fireEvent("changeLayout", {
            layout: t
        })
    },
    this.saveStat = function(e) {
        var t = e ? 1: 0;
        CX.cookie.set(r, t, 365, "/", "chexie.org")
    },
    this.readStat = function() {
        return n
    },
    this.noLoading = function() {
        i && i.parentNode && document.body.removeChild(i),
        i = null
    },
    n = CX.cookie.get(r) == "1" ? 1: 0,
    n && this.checkExpand().full && (this.frameLayout(1), CX.dom.ready(function() {
        i = document.createElement("div"),
        i.id = "wp-buddylist-placeholder",
        document.body.appendChild(i)
    })),
    CX.smartyBuddy = this
} (),
function() {
    if (window.webpager && window.webpager.addEvent) return;
    var e = [];
    window.webpager = {
        addEvent: function() {
            e.push(CX.array.build(arguments))
        }
    },
    window.addEvent("webpagerReady", 
    function() {
        var t;
        while (t = e.shift()) window.webpager.addEvent.apply(window.webpager, t)
    })
} (),
object.use("dom", 
function(e) {
    function t() {
        function s() {
            if (e.id(r) != null) return;
            var t = document.createElement("iframe");
            t.setAttribute("id", r),
            t.setAttribute("name", r),
            t.setAttribute("src", i),
            t.setAttribute("frameBorder", "0"),
            t.style.cssText = "position:absolute;left:-1000pt;top:20pt;width:200pt;height:100pt",
            document.body.appendChild(t),
            n && (clearTimeout(n), n = null)
        }
        var t,
        n,
        r = "imengine",
        i;
        if (e.id("bottombar") == null) return;
        if (/\((iPhone|iPad|iPod)/i.test(navigator.userAgent) || !window.ActiveXObject && !window.XMLHttpRequest) return;
        if (e.id(r) != null) return;
        if (CX.disableWebpager) return;
        i = '';//"http://wpi.chexie.org/wtalk/ime.htm?v=" + (new Date).getTime(),
        t = (CX.browser.IE ? 6: 3) * 1e3,
        n = null,
        window.addEvent("load", 
        function() {
            n != null && (clearTimeout(n), n = null, s())
        }),
        n = setTimeout(s, t)
    }
    if (window._developer_no_webpager) return;
    e.ready(t)
}),
CX.dom.ready(function() {
    if (window._developer_no_backToTop) return;
    var e = jxn("#bottombar"),
    t = jxn("#toolBackTo");
    t.length > 0 && t.bind("click", 
    function(e) {
        var t = Sizzle("#sidebar2 .ready-to-fix")[0];
        return setTimeout(function() {
            window.scrollTo(0, 0)
        },
        0),
        t && jxn(t).removeClass("already-fixed"),
        CX.event.stop(e),
        !1
    });
    var n = function() {
        var t = jxn(window).scrollTop() + jxn(window).height();
        e.css({
            position: "absolute",
            top: t + "px"
        }).show()
    },
    r = function() {
        var e = jxn(window).scrollTop();
        if (e < 30) {
            t.hide();
            return
        }
        var n = e + jxn(window).height(),
        r = 5;
        CX.BROWSER.IE6 && (r = 10);
        if (t.length > 0) {
            var i = !1,
            s = 1120;
            jxn("#friends-panel .actived").length > 0 && (i = !0, s = 1360);
            var o = jxn(window).width(),
            u = 0;
            o > s ? u = (o - (i ? 250: 0) - 980) / 2 + 10 + 980: u = o - 60 - (i ? 250: 0) - r,
            t.css("left", u + "px").show(),
            CX.BROWSER.IE6 && t.css({
                position: "absolute",
                top: n - 98 + "px"
            }).show()
        }
        e == n && CX.events.fireEvent("scrollbottom")
    };
    r();
    var i = !1;
    window.addEvent("changeLayout", 
    function(e) {
        r()
    }),
    jxn(window).bind("resize", 
    function() {
        i || (i = !0, CX.BROWSER.IE6 && e.hide(), t.hide(), setTimeout(function() {
            r(),
            CX.BROWSER.IE6 && n(),
            i = !1
        },
        200))
    });
    var s = !1,
    o = null;
    CX.BROWSER.IE6 ? jxn(window).bind("scroll", 
    function() {
        clearTimeout(o),
        s || (ishided = !0, e.hide(), t.hide()),
        o = setTimeout(function() {
            n(),
            r(),
            ishided = !1
        },
        200)
    }) : jxn(window).bind("scroll", 
    function() {
        clearTimeout(o),
        o = setTimeout(function() {
            r()
        },
        10)
    })
}),
function() {
    CX.ui.positionFixedElement = function(e) {
        return this.config = {
            ele: null,
            holder: "dropmenuHolder",
            alignWith: null,
            alignType: "4-1",
            x: 0,
            y: 0
        },
        CX.$extend(this.config, e),
        this.init(),
        this
    };
    var e = "-9999px",
    t = "px",
    n = "realLeft",
    r = "realTop",
    i = "offsetWidth",
    s = "offsetHeight",
    o = CX.browser.IE6;
    CX.ui.positionFixedElement.prototype = {
        ele: null,
        holder: null,
        alignWith: null,
        alignType: null,
        x: 0,
        y: 0,
        init: function() {
            this.ele = $(this.config.ele),
            this.holder = $(this.config.holder),
            this.alignWith = $(this.config.alignWith),
            this.alignType = this.config.alignType,
            this.x = this.config.x,
            this.y = this.config.y,
            this.ele.style.position = o ? "absolute": "fixed",
            this.ele.style.left = e,
            this.ele.style.top = e,
            this.holder.appendChild(this.ele);
            var t = this;
            CX.event.addEvent(window, "resize", 
            function() {
                t.refresh()
            }),
            o && CX.event.addEvent(window, "scroll", 
            function() {
                t.refresh()
            })
        },
        methods: {
            "1-1": function(e, i, s, u, a) {
                e.style.left = s + i[n]() - (o ? a[n]() : 0) + t,
                e.style.top = u + i[r]() - (o ? a[r]() : 0) + t
            },
            "1-2": function(e, s, u, a, f) {
                e.style.left = u + s[n]() - (o ? f[n]() : 0) - e[i] + t,
                e.style.top = a + s[r]() - (o ? f[r]() : 0) + t
            },
            "1-3": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) - e[i] + t,
                e.style.top = f + u[r]() - (o ? l[r]() : 0) - e[s] + t
            },
            "1-4": function(e, i, u, a, f) {
                e.style.left = u + i[n]() - (o ? f[n]() : 0) + t,
                e.style.top = a + i[r]() - (o ? f[r]() : 0) - e[s] + t
            },
            "2-1": function(e, s, u, a, f) {
                e.style.left = u + s[n]() - (o ? f[n]() : 0) + s[i] + t,
                e.style.top = a + s[r]() - (o ? f[r]() : 0) + t
            },
            "2-2": function(e, s, u, a, f) {
                e.style.left = u + s[n]() - (o ? f[n]() : 0) + s[i] - e[i] + t,
                e.style.top = a + s[r]() - (o ? f[r]() : 0) + t
            },
            "2-3": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) + u[i] - e[i] + t,
                e.style.top = f + u[r]() - (o ? l[r]() : 0) - e[s] + t
            },
            "2-4": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) + u[i] + t,
                e.style.top = f + u[r]() - (o ? l[r]() : 0) - e[s] + t
            },
            "3-1": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) + u[i] + t,
                e.style.top = f + u[r]() - (o ? l[r]() : 0) + u[s] + t
            },
            "3-2": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) + u[i] - e[i] + t,
                e.style.top = f + u[r]() + u[s] + t
            },
            "3-3": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) + u[i] - e[i] + t,
                e.style.top = f + u[r]() - (o ? l[r]() : 0) + u[s] - e[s] + t
            },
            "3-4": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) + u[i] + t,
                e.style.top = f + u[r]() - (o ? l[r]() : 0) + u[s] - e[s] + t
            },
            "4-1": function(e, i, u, a, f) {
                e.style.left = u + i[n]() - (o ? f[n]() : 0) + t,
                e.style.top = a + i[r]() - (o ? f[r]() : 0) + i[s] + t
            },
            "4-2": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) - e[i] + t,
                e.style.top = f + u[r]() - (o ? l[r]() : 0) + u[s] + t
            },
            "4-3": function(e, u, a, f, l) {
                e.style.left = a + u[n]() - (o ? l[n]() : 0) - e[i] + t,
                e.style.top = f + u[r]() - (o ? l[r]() : 0) + u[s] - e[s] + t
            },
            "4-4": function(e, i, u, a, f) {
                e.style.left = u + i[n]() - (o ? f[n]() : 0) + t,
                e.style.top = a + i[r]() - (o ? f[r]() : 0) + i[s] - e[s] + t
            }
        },
        show: function() {
            if (this._isShow) return;
            this._isShow = !0,
            this.methods[this.alignType](this.ele, this.alignWith, this.x, this.y, this.holder)
        },
        hide: function() {
            if (!this._isShow) return;
            this._isShow = !1,
            this.ele.style.top = e,
            this.ele.style.left = e
        },
        refresh: function() {
            this._isShow && (this._isShow = !1, this.show())
        }
    }
} (),
CX.dom.ready(function() {
    if (!$("moreWeb")) return;
    new CX.UI.menu({
        bar: "moreWeb",
        menu: "moredownWeb",
        fireOn: "click",
        alignType: "3-2",
        offsetX: 1
    })
}),
object.define("xn/site-nav/drop-menu-seed", "dom", 
function(require, e, t) {
    if (window._developer_no_dropmenu) return;
    var n = require("dom");
    n.ready(function() {
        var e = n.id("profileMenuActive"),
        t = n.id("showAppMenu"),
        r;
        e && e.addEvent("mouseover", 
        function() {
            e.removeEvent("mouseover", arguments.callee),
            e.topNavhovered = !0,
            e.addEvent("mouseleave", 
            function() {
                e.topNavhovered = !1,
                e.removeEvent("mouseleave", arguments.callee)
            }),
            setTimeout(function() {
                require.async("xn/site-nav/drop-menu-profile", 
                function(e) {
                    e.init()
                })
            },
            200)
        }),
        t && t.addEvent("mouseover", 
        function() {
            var e = arguments.callee;
            t.removeEvent("mouseover", e),
            t.topNavhovered = !0,
            t.addEvent("mouseleave", 
            function() {
                t.topNavhovered = !1,
                t.removeEvent("mouseleave", arguments.callee),
                r && (clearTimeout(r), r = null, t.addEvent("mouseover", e))
            }),
            r = setTimeout(function() {
                r = null,
                require.async("xn/site-nav/drop-menu-app", 
                function(e) {
                    e.init()
                })
            },
            50)
        })
    })
}),
object.execute("xn/site-nav/drop-menu-seed"),
object.use("dom, events", 
function(e, t) {
    function i(e) {
        switch (e) {
        case "remind":
            return 0;
        case "apply":
            return 1;
        case "notice":
            return 2
        }
    }
    function u() {
        Sizzle("#navMessage span").forEach(function(e, t) {
            CX.event.addEvent(e, "click", 
            function(n) {
                o.click(e, t),
                n.stopPropagation()
            }),
            CX.event.addEvent(e, "mouseover", 
            function() {
                o.mouseover(e, t)
            }),
            CX.event.addEvent(e, "mouseout", 
            function() {
                o.mouseout(e, t)
            })
        })
    }
    var n = "v6_header_notify",
    r = ["remind", "apply", "notice"],
    s = {
        setNum: function(t, n) {
            var r = this,
            i = $("navMessage").getElementsByTagName("span");
            n = n >= 100 ? "99": n;
            if (!e.getElement("i", i[t])) {
                var s = document.createElement("i");
                s.style.display = "none",
                s.innerHTML = "<u><b>&nbsp;</b><var>0</var></u><em>&nbsp;</em>",
                i[t].appendChild(s)
            }
            i[t].getElementsByTagName("var")[0].innerHTML = n;
            if (parseInt(n, 10) > 0 && !CX.element.hasClassName(i[t], "click")) {
                var o = i[t].getElementsByTagName("i")[0];
                CX.element.visible(o) || (o.style.display = "block", r.show(t))
            } else i[t].getElementsByTagName("i")[0].style.display = "none"
        },
        set: function(e, t) {
            var n = i(e);
            this.setNum(n, t)
        },
        show: function(t) {
            var n,
            r = this,
            i = $("navMessage").getElementsByTagName("span")[t],
            s = e.getElement("i", i);
            setTimeout(function() {
                s.addClass("t")
            },
            0)
        },
        setUI: function(e) {
            this.set("remind", parseInt(e.remind, 10)),
            this.set("apply", parseInt(e.apply, 10)),
            this.set("notice", parseInt(e.notice, 10))
        },
        reset: function(e) {
            var t = i(e);
            this.setNum(t, 0);
            if (!window.webpager) return;
            var r = CX.json.parse(webpager.getItem(n));
            r && (r[e] = 0),
            webpager.setItem(n, JSON.stringify(r))
        },
        get: function() {
            new CX.net.xmlhttp({
                url: "",//http://notify.chexie.org/rmessage/getunreadcount?t=" + (new Date).getTime(),
                data: "",
                method: "get",
                onSuccess: function(e) {
                    var t = CX.json.parse(e.responseText);
                    t.t = CX.cookie.get("t"),
                    CX.cookie.del("first_login_flag", "/", "chexie.org", "false"),
                    webpager.setItem(n, JSON.stringify(t)),
                    typeof isHome == "boolean" && (isHome = null)
                },
                onError: function() {
                    CX.DO.showError("网络通信失败,请重试")
                }
            })
        }
    },
    o = {
        mouseover: function(t, n) {
            var i = e.getElement("i", t),
            s = r[n];
            i && CX.element.visible(i) ? CX.element.addClass(t, "hover") : CX.element.addClass(t, "on"),
            CX.element.addClass(t, s + "-hover")
        },
        mouseout: function(e, t) {
            var n = r[t];
            CX.element.delClass(e, "on"),
            CX.element.delClass(e, "hover"),
            CX.element.delClass(e, n + "-hover")
        },
        click: function(e, t) {
            var n = r[t];
            CX.loadFile("http://s.xnimg.cn/a56606/n/core/js/message-center-all.js", 
            function() {
                MessageCenter.bubble = s;
                if (CX.element.hasClassName(e, "click")) {
                    CX.element.delClass(e, "click"),
                    $("showMessage").style.display = "none",
                    MessageCenter.setDefault();
                    return
                }
                MessageCenter.setDefault(),
                CX.element.addClass(e, "click"),
                MessageCenter.setIframePosition(e),
                MessageCenter.init(n, s),
                CX.element.addClass(e, n + "-click"),
                s.reset(n)
            })
        }
    };
    e.ready(function() {
        function r() {
            e = setTimeout(function() {
                e && (clearTimeout(e), e = null),
                s.get()
            },
            t)
        }
        u();
        var e,
        t = (CX.browser.IE ? 4: 2) * 1e3;
        if (CX.browser.IE6 || CX.browser.IE7) t = 12e3;
        window.addEvent("webpagerReady", 
        function(e) {
            var t,
            i = webpager.getItem(n),
            o = CX.cookie.get("first_login_flag"),
            u = ["", "remind", "apply", "notice"];
            window.asyncHTMLManager && window.asyncHTMLManager.addEvent("load", 
            function() {
                typeof isHome == "boolean" && r()
            }),
            i && (i = JSON.parse(i), o || (t = i)),
            !t || typeof isHome == "boolean" ? r() : s.setUI(i),
            webpager.addEvent("storage", 
            function(e) {
                if (/v6_header_notify/.test(e.keys)) {
                    var t = webpager.getItem(n);
                    t = JSON.parse(t),
                    s.setUI(t)
                }
            }),
            window.webpager.messager.addEvent("message", 
            function(e) {
                if (e.service == "notify" && e.source == "webpager") {
                    var t = e.data;
                    setTimeout(function() {
                        webpager.isLocalConnect() && window.imengine.imHelper.playSound();
                        var e = JSON.parse(webpager.getItem(n));
                        e[u[t.bigtype]]++,
                        webpager.setItem(n, JSON.stringify(e))
                    },
                    1e3 * Math.random())
                }
            })
        })
    })
}),
object.define("xn/site-nav/switch-account-seed", 
function(require, e, t) {
    window.__logEvents = !1,
    require.async("xn/site-nav/switch-account", 
    function(e) {
        e.accMenu.show(),
        e.fetch(),
        window.__logEvents = !0
    })
}),
CX.dom.ready(function() {
    if (window._developer_no_account) return;
    var e = $("accountMenu");
    if (!e) return;
    e.addEvent("mouseover", 
    function() {
        e.delEvent("mouseover", arguments.callee),
        object.execute("xn/site-nav/switch-account-seed")
    })
}),
object.define("xn/site-nav/search-seed", 
function(require, e, t) {
    window.__logEvents = !1,
    require.async("xn/site-nav/search", 
    function() {
        var e = $("navSearchInput");
        e.blur(),
        e.focus(),
        window.__logEvents = !0
    })
}),
CX.dom.ready(function() {
}),
object.add("xn", "./net", 
function(e) {}),
object.define("xn.net", "sys, net", 
function(require, e) {
    var t = require("sys"),
    n = require("net"),
    r = n.Request.prototype.send;
    n.Request.set("send", 
    function(e, t) {
        t = t || e.data || "",
        e.method == "post" && CX.get_check && !/[\?|\&]requestToken=/.test(t) && (t += (t ? "&": "") + "requestToken=" + CX.get_check),
        e.method == "post" && CX.get_check_x && !/[\?|\&]_rtk=/.test(t) && (t += (t ? "&": "") + "_rtk=" + CX.get_check_x),
        r.call(e, t)
    }),
    this.Request = n.Request
}),
function() {
    function e(t) {
        var n = $(CX.event.element(t || window.event));
        if (!n) return ! 1;
        if (!n.hasClassName("share_new")) return ! 1;
        window.CXShareObject || setTimeout(function() {
            CX.loadFile("http://s.xnimg.cn/jspro/xn.app.share.js", 
            function() {
                CX.event.delEvent(document, "mouseover", e),
                CXShareObject._register({
                    autoRegister: !1,
                    floatMode: !0
                }),
                CXShareObject.forceShowFloat(n)
            })
        },
        0)
    }
    CX.event.addEvent(document, "mouseover", e)
} (),
object.define("xn.mention", "dom", 
function(require, e, t) {
    function s(e) {
        var t = e.obj;
        if (t.mention) return;
        t = $(t),
        t.addEvent("focus", 
        function() {
            r(t, e, 
            function() {
                e.initCallback && e.initCallback(t)
            })
        }),
        e.button && CX.event.addEvent(e.button, "click", 
        function(n) {
            t.mention ? i(t, n) : r(t, e, 
            function() {
                i(t, n),
                e.initCallback && e.initCallback(t)
            })
        })
    }
    var n = require("dom"),
    r = this.initMain = function(e, t, n) {
        if (e.mentionInited) return;
        e.mentionInited = !0,
        require.async("xn/mentionMain", 
        function(e) {
            e.Mention.init({
                obj: t.obj,
                ugcId: t.ugcId || "",
                ugcType: t.ugcType || "",
                ownerId: t.ownerId || "",
                scrollable: t.scrollable,
                popTop: t.popTop,
                whisper: t.whisper === !1 ? !1: !0,
                button: t.button || null,
                limit: t.limit || 10,
                recentLimit: t.recentLimit || 6
            }),
            n && n()
        })
    },
    i = function(e, t) {
        t && CX.event.stop(t),
        n.wrap(e),
        CX.browser.WebKit && (e.focus(), e.blur()),
        e.focusToPosition(e.get("selectionStart"));
        var r = function() {
            var t = "@",
            n = CX.form.help(e).getRealValue(),
            r = e.get("selectionStart");
            n.slice(r - 1, r) == "@" && (t = ""),
            e.value = n.slice(0, r) + t + n.slice(r),
            e.focusToPosition(r + t.length),
            e.mention.check()
        };
        CX.browser.IE ? setTimeout(r, 0) : r()
    };
    this.Mention = {
        init: function(e) {
            if (isArray(e)) for (var t = 0, n = e.length; t < n; t++) s(e[t]);
            else isObject(e) && s(e)
        }
    }
}),
object.use("xn.mention", 
function(e) {
    window.Mention = e.mention.Mention
}),
CX.dom.ready(function() {
    showNamecardCondition() && !window.nx && object.use("xn/namecard/seed", 
    function(e) {
        e.loadNamecardMatrix()
    })
}),
object.define("xn/namecard/seed", "dom", 
function(require, e) {
    e.loadNamecardMatrix = function() {
        var e = require("dom");
        window.globalNamecard = {
            additionalY: 0,
            delRcd: !1
        },
        window.globalNamecard.addFriendCallback = function(e) {
            if (!window.globalNamecard.delRcd) return;
            var t = window.globalNamecard.delRcd.id.substring(16),
            n = window.globalNamecard.delRcd.getAttribute("data-type");
            e ? logRcd({
                action: "RecFcard_addFriend",
                guest_id: t,
                type: n
            }) : (logRcd({
                action: "RecFcard_addFriendEnd",
                guest_id: t,
                type: n
            }), window.globalNamecard.delRcd.parentNode.removeChild(window.globalNamecard.delRcd))
        },
        e.wrap(document.body).delegate("*[namecard]", "mouseover", 
        function(t) {
            e.wrap(document.body).undelegate("*[namecard]", "mouseover", arguments.callee),
            require.async("xn/namecard, xn/showShareFriend", 
            function(e) {
                window.globalNamecard.namecard = new e.Namecard(window.globalNamecard.additionalY, t)
            })
        })
    }
});