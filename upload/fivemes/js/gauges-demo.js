var jsGauges = {
    settings: {
        test: {
            gaugeRadius: 120,
            step: 10,
            stepStroke: 1,
            subStep: 5,
            subStepStroke: 2,
            subSubStep: 1,
            font: "14px Arial",
            fontColor: "#CCCCCC",
            fontStroke: 0,
            textMargin: 20,
            max: 10000,
            min: 0,
            scaleDivisionValue: 100,
            textNumRatio: 1000,
            startAngle: 225,
            gradAngle: 270,
            background: "#252525",
            strokeColor: "#cccccc",
            strokeOpacity: 0,
            strokeWidth: 0,
            handColor: "#A01515",
            handStrokeColor: "#A01515",
            handStrokeWidth: 0,
            handOpacity: 1,
            handMaxWidth: 3,
            handMinWidth: 1,
            handLengthTune: 0,
            handHolder: 0,
            handHolderColor: "#fff",
            handHolderStroke: 1,
            handHolderStrkClr: "#636363",
            graduationColor: "#A0A0A0",
            graduationLength: 20,
            graduationMargin: 5,
            redZoneStart: 8000,
            redZoneEnd: 10000,
            redZoneColor: "#980000",
            redZoneOpacity: 1,
            alarmShow: false,
            alarmSignWidth: 30,
            alarmFill: "red",
            alarmStroke: "red",
            alarmStrokeWidth: 3,
            alarmBlink: false,
            alarmGlow: "white",
            alarmFont: "18px Arial",
            alarmFontColor: "#FFF",
            alarmText: "!",
            gaugeText: "RPM",
            gaugeTextX: 0,
            gaugeTextY: -30,
            gaugeTextColor: "#636363",
            gaugeTextFont: "14px Arial"
        },
        load: {
            gaugeRadius: 120,
            step: 5,
            stepStroke: 2,
            subStep: 5,
            subStepStroke: 1,
            subSubStep: 1,
            font: "12px Arial",
            fontColor: "#CCCCCC",
            fontStroke: 0,
            textMargin: 15,
            max: 320,
            min: 0,
            scaleDivisionValue: 4,
            textNumRatio: 1,
            startAngle: 225,
            gradAngle: 270,
            background: "#252525",
            strokeColor: "#cccccc",
            strokeOpacity: 0,
            strokeWidth: 0,
            handColor: "#A01515",
            handStrokeColor: "#A01515",
            handStrokeWidth: 0,
            handOpacity: 1,
            handMaxWidth: 3,
            handMinWidth: 1,
            handLengthTune: 0,
            handHolder: 0,
            handHolderColor: "#fff",
            handHolderStroke: 1,
            handHolderStrkClr: "#636363",
            graduationColor: "#A0A0A0",
            graduationLength: 20,
            graduationMargin: 5,
            redZoneStart: 280,
            redZoneEnd: 320,
            redZoneColor: "#980000",
            redZoneOpacity: 1,
            alarmShow: false,
            alarmSignWidth: 30,
            alarmFill: "red",
            alarmStroke: "red",
            alarmStrokeWidth: 3,
            alarmBlink: false,
            alarmGlow: "white",
            alarmFont: "18px Arial",
            alarmFontColor: "#FFF",
            alarmText: "!",
            gaugeText: "km/h",
            gaugeTextX: 0,
            gaugeTextY: -30,
            gaugeTextColor: "#636363",
            gaugeTextFont: "14px Arial"
        }
    },
    getData: function () {
        function e() {
            jsGauges.json = {
                round: {},
                linear: {}
            };
            jsGauges.json.round.test = (s_rpm * 10000);
            jsGauges.json.round.load = (s_speed * 3.6);
        }
        jsGauges.settings.targetDiv = document.getElementById("jsGauges");
        jsGauges.settings.interval = 50;
        if (!jsGauges.json) {
            e();
            jsGauges.placeDivs()
        } else {
            e();
            jsGauges.update()
        }
    },
    placeDivs: function () {
        var e = document.createDocumentFragment(),
		t,
		n;
        if (jsGauges.json.round) {
            for (var r in jsGauges.json.round) {
                t = document.createElement("div");
                t.id = r;
                t.className = "roundGauge";
                e.appendChild(t)
            }
        }
        if (jsGauges.json.linear) {
            for (var i in jsGauges.json.linear) {
                n = document.createElement("div");
                n.id = i;
                n.className = "linearGauge";
                e.appendChild(n)
            }
        }
        jsGauges.settings.targetDiv.appendChild(e);
        jsGauges.placeGauges()
    },
    placeGauges: function () {
        function e(e, t, n, r) {
            if (!r.alarmShow) {
                return
            }
            var i = jsGauges[e].paper,
			s = t.width,
			o = "0",
			u = "-" + s / 2,
			a = "-" + s,
			f,
			l,
			c,
			h = jsGauges.toUpdate[e].alarmSet = i.set();
            f = i.path("M" + t.startX + "," + t.startY + "l" + s + "," + o + " " + u + "," + a + "z");
            f.attr(t.alarmAttr);
            c = f.glow();
            c.attr({
                stroke: t.alarmGlow
            });
            l = i.text(n.textX, n.textY, n.textData);
            l.attr(n.alarmTextAttr);
            h.push(c, f, l)
        }
        function t(e, t) {
            var n = [],
			r = new RegExp("(^| )" + t + "( |$)"),
			i = e.getElementsByTagName("*");
            for (var s = 0,
			o = i.length; s < o; s += 1) {
                if (r.test(i[s].className)) {
                    n.push(i[s])
                }
            }
            return n
        }
        function n(t, n) {
            var r = (n.gaugeRadius + 1 + n.strokeWidth) * 2;
            jsGauges[t.id] = {};
            jsGauges[t.id].paper = Raphael(t, r, r);
            var i = jsGauges[t.id].paper,
			s = n.gaugeRadius,
			o = n.gaugeRadius + n.strokeWidth / 2,
			u = i.circle(o, o, s),
			a = n.startAngle,
			f = i.set(),
			l = (n.max - n.min) / n.scaleDivisionValue,
			c = n.graduationLength,
			h = n.gradAngle,
			p = h / l,
			d = 360 / p,
			v = n.graduationMargin,
			m = Math.PI * 2 / d,
			g = n.scaleDivisionValue,
			y = s - v,
			b = y - c,
			w = s - v - c / 2,
			E,
			S,
			x,
			T,
			N,
			C,
			k,
			L,
			A,
			O,
			M,
			_,
			D,
			P,
			H,
			B;
            jsGauges.toUpdate[t.id] = {};
            jsGauges.toUpdate[t.id].handLength = s - v - c;
            jsGauges.settings[t.id].circleX = o;
            u.attr({
                fill: n.background,
                stroke: n.strokeColor,
                "stroke-opacity": n.strokeOpacity,
                "stroke-width": n.strokeWidth
            });
            for (var j = 0; j <= l; j += 1) {
                var F = m * (j + a / p) - Math.PI / 2,
				I = Math.cos(F),
				q = Math.sin(F),
				R = (j + n.min / g) * g;
                A = o + y * I;
                M = o + y * q;
                if (n.redZoneStart && R == n.redZoneStart) {
                    S = o + (b + c * .5) * I;
                    x = o + (b + c * .5) * q
                }
                if (n.redZoneStart && R == n.redZoneEnd) {
                    T = o + (b + c * .5) * I;
                    N = o + (b + c * .5) * q;
                    E = i.path([["M", S, x], ["A", w, w, 0, 0, 1, T, N]]);
                    E.attr({
                        fill: "none",
                        stroke: n.redZoneColor,
                        "stroke-opacity": n.redZoneOpacity,
                        "stroke-width": c
                    })
                }
                if (j % n.step === 0) {
                    L = .9;
                    P = o + (b * L - n.textMargin) * I;
                    H = o + (b * L - n.textMargin) * q;
                    B = R / n.textNumRatio;
                    D = n.stepStroke;
                    i.text(P, H, B).attr({
                        "stroke-width": n.fontStroke,
                        font: n.font,
                        fill: n.fontColor
                    })
                } else if (j % n.subStep === 0) {
                    L = .95;
                    D = n.subStepStroke
                } else if (j % n.subSubStep === 0) {
                    L = .99;
                    D = n.subSubStepStroke
                }
                O = o + b * L * I;
                _ = o + b * L * q;
                f.push(i.path([["M", A, M], ["L", O, _]]).attr({
                    "stroke-width": D,
                    stroke: n.graduationColor
                }))
            }
            f.toFront();
            C = {
                width: n.alarmSignWidth,
                startX: o - n.alarmSignWidth / 2,
                startY: o + n.alarmSignWidth / 2,
                alarmAttr: {
                    fill: n.alarmFill,
                    stroke: n.alarmStroke,
                    "stroke-width": n.alarmStrokeWidth
                },
                alarmGlow: n.alarmGlow
            };
            k = {
                textX: C.startX + C.width / 2,
                textY: C.startY + C.width / 5 - parseInt(n.alarmFont),
                alarmTextAttr: {
                    font: n.alarmFont,
                    fill: n.alarmFontColor
                },
                textData: n.alarmText
            };
            e(t.id, C, k, n);
            if (n.gaugeText) {
                i.text(n.gaugeTextX + o, n.gaugeTextY + o, n.gaugeText).attr({
                    fill: n.gaugeTextColor,
                    font: n.gaugeTextFont
                })
            }
        }
        function r(t, n) {
            var r = n.gaugeHeight + n.strokeWidth,
			i = n.gaugeWidth + n.strokeWidth;
            jsGauges[t.id] = {};
            jsGauges[t.id].paper = Raphael(t, i, r);
            var s = jsGauges[t.id].paper,
			o = n.strokeWidth / 2,
			u = s.rect(o, o, n.gaugeWidth, n.gaugeHeight),
			a = (n.max - n.min) / n.scaleDivisionValue,
			f = (n.gaugeHeight - n.columnMarginY * 2) / a,
			l = (n.gaugeWidth - o - n.columnWidth) / 2,
			c = n.gaugeHeight - n.columnMarginY * 2,
			h = o + n.columnMarginY + c,
			p = i / 2 - n.columnWidth / 2,
			d,
			v,
			m,
			g,
			y,
			b,
			w;
            jsGauges.settings[t.id].columnMaxHeight = c;
            jsGauges.settings[t.id].gradAmount = a;
            jsGauges.settings[t.id].columnStartX = p;
            jsGauges.settings[t.id].columnStartY = h;
            jsGauges.toUpdate[t.id] = {};
            u.attr({
                fill: n.background,
                stroke: n.strokeColor,
                "stroke-opacity": n.strokeOpacity,
                "stroke-width": n.strokeWidth
            });
            for (var E = 0; E <= a; E += 1) {
                m = p;
                g = o + n.columnMarginY + c - E * f;
                if (E % n.step === 0) {
                    y = n.min + E * n.scaleDivisionValue;
                    s.text(n.gaugeWidth - n.textMarginRight, g, y / n.textNumRatio).attr({
                        font: n.font,
                        fill: n.fontColor,
                        "stroke-width": 0
                    });
                    m -= l * .1;
                    w = "l -" + l * .9 + ", 0"
                } else if (E % n.subStep === 0) {
                    m -= l * .25;
                    w = "l -" + l * .75 + ", 0"
                } else if (E % n.subSubStep === 0) {
                    m -= l * .5;
                    w = "l -" + l * .5 + ", 0"
                }
                if (n.min + E * n.scaleDivisionValue >= n.redZoneStart && n.min + E * n.scaleDivisionValue <= n.redZoneEnd) {
                    b = n.gradRedZoneColor
                } else {
                    b = n.graduationColor
                }
                s.path("M" + m + "," + g + w).attr({
                    stroke: b
                })
            }
            d = {
                width: n.columnWidth,
                startX: p,
                startY: h - c / 2,
                alarmAttr: {
                    fill: n.alarmFill,
                    stroke: n.alarmStroke,
                    "stroke-width": n.alarmStrokeWidth
                },
                alarmGlow: n.alarmGlow
            };
            v = {
                textX: p + n.columnWidth / 2,
                textY: h - c / 2 - n.columnWidth / 2 + parseInt(n.alarmFont) / 4,
                alarmTextAttr: {
                    font: n.alarmFont,
                    fill: n.alarmFontColor
                },
                textData: n.alarmText
            };
            e(t.id, d, v, n);
            if (n.gaugeText) {
                s.text(n.gaugeTextX + n.gaugeWidth / 2, n.gaugeTextY + n.gaugeHeight / 2, n.gaugeText).attr({
                    fill: n.gaugeTextColor,
                    font: n.gaugeTextFont
                })
            }
        }
        jsGauges.toUpdate = {};
        jsGauges.roundGauges = t(jsGauges.settings.targetDiv, "roundGauge");
        jsGauges.linearGauges = t(jsGauges.settings.targetDiv, "linearGauge");
        for (var i = 0; i < jsGauges.roundGauges.length; i += 1) {
            if (jsGauges.settings[jsGauges.roundGauges[i].id]) {
                n(jsGauges.roundGauges[i], jsGauges.settings[jsGauges.roundGauges[i].id])
            } else {
                alert("You don't have settings for round gauge with ID: " + jsGauges.roundGauges[i].id)
            }
        }
        for (var s = 0; s < jsGauges.linearGauges.length; s += 1) {
            if (jsGauges.settings[jsGauges.linearGauges[s].id]) {
                r(jsGauges.linearGauges[s], jsGauges.settings[jsGauges.linearGauges[s].id])
            } else {
                alert("You don't have settings for linear gauge with ID: " + jsGauges.linearGauges[s].id)
            }
        }
        jsGauges.update();
        setInterval(function () {
            jsGauges.getData()
        },
		jsGauges.settings.interval)
    },
    update: function () {
        function e(e, t, n) {
            var r = jsGauges.json[e][t];
            if (r > n.max) {
                r = n.max * 1.1
            }
            if (r < n.min) {
                r = n.min
            }
            return r
        }
        function t(e, t, n, r) {
            if (!n.alarmShow) {
                return
            }
            if (t >= n.redZoneStart && t <= n.redZoneEnd) {
                e.toFront();
                if (n.alarmBlink) {
                    jsGauges.toUpdate[r].blink = setInterval(function () {
                        e.show();
                        setTimeout(function () {
                            e.hide()
                        },
						500);
                        setTimeout(function () {
                            clearInterval(jsGauges.toUpdate[r].blink)
                        },
						jsGauges.settings.interval)
                    },
					1e3)
                } else {
                    e.show()
                }
            } else {
                e.hide()
            }
        }
        function n(e, t, n) {
            var r = t.circleX,
			i = jsGauges.toUpdate[e].hand,
			s = (t.max - t.min) / t.gradAngle,
			o = t.startAngle - 180;
            i.angle = (n - t.min) / s + o;
            i.animate({
                transform: "r" + i.angle + " " + r + " " + r
            },
			100)
        }
        function r(e, t) {
            var n;
            if (t >= e.greenValueStart && t <= e.greenValueEnd) {
                n = e.columnGreenColor
            } else if (t >= e.yellowValueStart && t <= e.yellowValueEnd) {
                n = e.columnYellowColor
            } else if (t >= e.redValueStart && t <= e.redValueEnd) {
                n = e.columnRedColor
            } else {
                n = "pink"
            }
            return n
        }
        var i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w;
        for (var E = 0; E < jsGauges.roundGauges.length; E += 1) {
            s = jsGauges.roundGauges[E].id;
            o = jsGauges.settings[s];
            w = jsGauges.toUpdate[s].alarmSet;
            b = e("round", s, o);
            if (!jsGauges.toUpdate[s].hand) {
                u = jsGauges[s].paper;
                v = o.circleX;
                f = o.handMaxWidth;
                l = (o.handMaxWidth - o.handMinWidth) / 2;
                p = jsGauges.toUpdate[s].handLength + o.handLengthTune;
                c = o.handMinWidth;
                a = "M" + (v - f / 2) + "," + v + "l" + f + ",0 -" + l + "," + p + " -" + c + ",0z";
                jsGauges.toUpdate[s].hand = u.path(a).attr({
                    fill: o.handColor,
                    stroke: o.handStrokeColor,
                    "stroke-width": o.handStrokeWidth,
                    opacity: o.handOpacity
                });
                n(s, o, b);
                if (o.handHolder) {
                    u.circle(v, v, o.handHolder).attr({
                        fill: o.handHolderColor,
                        stroke: o.handHolderStrkClr,
                        "stroke-width": o.handHolderStroke
                    })
                }
            } else {
                n(s, o, b)
            }
            t(w, b, o, s)
        }
        for (var S = 0; S < jsGauges.linearGauges.length; S += 1) {
            i = jsGauges.linearGauges[S].id;
            o = jsGauges.settings[i];
            w = jsGauges.toUpdate[i].alarmSet;
            b = e("linear", i, o);
            u = jsGauges[i].paper;
            y = o.columnMaxHeight * (b / ((o.max - o.min) / 100) / 100);
            g = r(o, b);
            f = o.columnWidth;
            h = "0";
            l = "0";
            p = "-" + y;
            c = "-" + o.columnWidth;
            d = "0";
            m = "M" + o.columnStartX + "," + o.columnStartY + "l" + f + "," + h + " " + l + "," + p + " " + c + "," + d + "z";
            if (!jsGauges.toUpdate[i].column) {
                jsGauges.toUpdate[i].column = u.path(m).attr({
                    fill: g,
                    stroke: o.columnStroke,
                    "stroke-opacity": o.columnStrokeOpacity,
                    "stroke-width": o.columnStrokeWidth
                })
            } else {
                jsGauges.toUpdate[i].column.animate({
                    path: m
                },
				o.animationTime).attr({
				    fill: g
				})
            }
            t(w, b, o, i)
        }
    },
    onDomReady: function (e) {
        function n() {
            if (t) return;
            t = true;
            e()
        }
        var t = false;
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded",
			function () {
			    n()
			},
			false)
        } else if (document.attachEvent) {
            if (document.documentElement.doScroll && window == window.top) {
                function r() {
                    if (t) return;
                    if (!document.body) return;
                    try {
                        document.documentElement.doScroll("left");
                        n()
                    } catch (e) {
                        setTimeout(r, 0)
                    }
                }
                r()
            }
            document.attachEvent("onreadystatechange",
			function () {
			    if (document.readyState === "complete") {
			        n()
			    }
			})
        }
        if (window.addEventListener) {
            window.addEventListener("load", n, false)
        } else if (window.attachEvent) {
            window.attachEvent("onload", n)
        }
    }
};
jsGauges.onDomReady(jsGauges.getData)