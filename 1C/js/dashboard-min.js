﻿window.app = window.app || {}, $(function() { function l() { var l = JSZip(); l.loadAsync(dataZip, { base64: !0, optimizedBinaryString: !0 }).then(function(m) { l.file(new RegExp(".json"))[0].async("string").then(function(l) { window.app = JSON.parse(l), a(window.app.data.dataLineDynamicsExtCallsOld30Days), b(window.app.data.dataLineDynamicsRedFirstCallsOld30Days), c(function() { for (var a = $("#barLinesLoad").dxChart("instance"), b = [], c = [], d = [], e = [], f = {}, g = 0; g < window.app.data.dataBarLinesLoad.length; g++)-1 == $.inArray(window.app.data.dataBarLinesLoad[g].b, d) && (f = {}, f.b = window.app.data.dataBarLinesLoad[g].b, void 0 === f.c && (f.c = 0), void 0 === f.d && (f.d = 0), void 0 === f.e && (f.e = 0), c.push(f), d.push(window.app.data.dataBarLinesLoad[g].b)), -1 == $.inArray(window.app.data.dataBarLinesLoad[g].a, e) && e.push(window.app.data.dataBarLinesLoad[g].a); for (var g = 0; g < d.length; g++) { var h = 0; _masbuf = $.grep(window.app.data.dataBarLinesLoad, function(a) { return a.b === d[g] }), $.grep(c, function(a) { if (a.b === d[g]) { for (var b = 0; b < _masbuf.length; b++)c[h].c = c[h].c + _masbuf[b].c, c[h].d = c[h].d + _masbuf[b].d, c[h].e = c[h].e + _masbuf[b].e; return !0 } ++h }) } return $("#barLinesLoad").attr("style", "min-height:" + (400 + 2 * e.length).toString() + "px"), b.push({ valueField: "c", name: "Максимум", color: "#9ab57e", label: { visible: !1 } }), b.push({ valueField: "d", name: "Среднее", color: "#e8c267", label: { visible: !1 } }), b.push({ valueField: "e", name: "Минимум", color: "#e55253", label: { visible: !1 } }), $.each(e, function(a, c) { b.push({ valueField: c, name: c, label: { visible: !1 } }) }), a.option("series", b), a.option("valueAxis", [{ visible: !0, grid: { visible: !0 }, constantLines: [{ label: { text: "Предел загруженности (% от макс.:" + window.app.data.dataBarLinesLoadOptions[0].b + " %/ макс.:" + window.app.data.dataBarLinesLoadOptions[0].a + ")", horizontalAlignment: "right" }, width: 2, value: window.app.data.dataBarLinesLoadOptions[0].b / 100 * window.app.data.dataBarLinesLoadOptions[0].a, color: "#e55253", dashStyle: "dash" }, { label: { text: "" }, width: 2, value: window.app.data.dataBarLinesLoadOptions[0].a, color: "#e55253", dashStyle: "dash" }] }]), a.render(), c }()), d(window.app.data.dataBarLinesLoadOptions), e(function() { var a = $("#gaugeMissedIncomingCalls").dxCircularGauge("instance"); return a.option("valueIndicator", { type: "TextCloud", text: { customizeText: function() { return this.valueText + " % (" + window.app.data.dataLineDynamicsExtCallsOld30Days[window.app.data.dataLineDynamicsExtCallsOld30Days.length - 1].d.toFixed() + ")" } } }), a.option("value", window.app.data.dataGaugeMissedIncomingCalls[0].a), a.option("subvalues", window.app.data.dataGaugeMissedIncomingCalls[0].a), a.render(), window.app.data.dataGaugeMissedIncomingCalls }()), f(function() { var a = $("#gaugeMissedOutcomingCalls").dxCircularGauge("instance"); return a.option("valueIndicator", { type: "TextCloud", text: { customizeText: function() { return this.valueText + " % (" + window.app.data.dataLineDynamicsExtCallsOld30Days[window.app.data.dataLineDynamicsExtCallsOld30Days.length - 1].e.toFixed() + ")" } } }), a.option("value", [window.app.data.dataGaugeMissedOutcomingCalls[0].a]), a.option("subvalues", [window.app.data.dataGaugeMissedOutcomingCalls[0].a]), a.render(), window.app.data.dataGaugeMissedIncomingCalls }()), g(function() { return [{ a: "время ожидания", b: window.app.data.dataBarAverageWaitingTimeNow[0].a }, { a: "время разговора", b: (window.app.data.dataBarAverageWaitingTimeNow[0].b % 3600 / 60).toFixed(1) }] }()), h(function() { var a = $("#gaugeAverageCountCallsOneEmployee").dxLinearGauge("instance"); return a.option("scale", { startValue: 0, endValue: window.app.data.dataGaugeAverageCountCallsOneEmployee + 20, tickInterval: 10, label: { customizeText: function(a) { return a.valueText } } }), a.option("value", window.app.data.dataGaugeAverageCountCallsOneEmployee[0].a), a.render(), window.app.data.dataGaugeAverageCountCallsOneEmployee }()), i(window.app.data.dataPaeWeekDaysCalls), j(window.app.data.dataPaeLinesLoadTime), k(function() { var a = $("#paeSubdivisionCalls").dxPieChart("instance"); return $("#paeSubdivisionCalls").attr("style", "min-height:" + (400 + 11 * window.app.data.dataPaeSubdivisionCalls.length).toString() + "px"), a.render(), window.app.data.dataPaeSubdivisionCalls }()) }) }) } var a = ko.observableArray(), b = ko.observableArray(), c = ko.observableArray(), d = ko.observableArray(), e = ko.observableArray(), f = ko.observableArray(), g = ko.observableArray(), h = ko.observableArray(), i = ko.observableArray(), j = ko.observableArray(), k = ko.observableArray(); l(), $.when($.getJSON($("base")[0].href + "devextreme/js/unicode-cldr/ca-gregorian.json"), $.getJSON($("base")[0].href + "devextreme/js/unicode-cldr/numbers.json"), $.getJSON($("base")[0].href + "devextreme/js/unicode-cldr/currencies.json"), $.getJSON($("base")[0].href + "devextreme/js/unicode-cldr/likelySubtags.json"), $.getJSON($("base")[0].href + "devextreme/js/unicode-cldr/timeData.json"), $.getJSON($("base")[0].href + "devextreme/js/unicode-cldr/weekData.json"), $.getJSON($("base")[0].href + "devextreme/js/unicode-cldr/currencyData.json"), $.getJSON($("base")[0].href + "devextreme/js/unicode-cldr/numberingSystems.json")).then(function() { return [].slice.apply(arguments, [0]).map(function(a) { return a[0] }) }).then(Globalize.load).then(function() { Globalize.locale("ru"); var l = ["#e55253", "#cbc87b", "#9ab57e", "#7e4452", "#e8c267", "#565077", "#6babac", "#ad6082"], m = "#9ab57e", n = "#e55253", o = "#565077", p = "#e8c267", q = "#43474b", r = "#e9e9e9", s = "#7f7f7f", t = "black", u = { dataLineDynamicsExtCallsOld30Days: a, dataLineDynamicsRedFirstCallsOld30Days: b, dataBarLinesLoad: c, dataBarLinesLoadOptions: d, dataGaugeMissedIncomingCalls: e, dataGaugeMissedOutcomingCalls: f, dataBarAverageWaitingTimeNow: g, dataGaugeAverageCountCallsOneEmployee: h, dataPaeWeekDaysCalls: i, dataPaeLinesLoadTime: j, dataPaeSubdivisionCalls: k, lineDynamicsExtCallsOld30DaysOptions: { title: { text: "Внешние звонки за последние 30 дней", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, palette: l, equalBarWidth: !1, loadingIndicator: { text: "Загрузка данных..." }, size: {}, margin: { top: 0 }, legend: { visible: !0, rowCount: 2, orientation: "horizontal", itemTextPosition: "right", horizontalAlignment: "center", verticalAlignment: "bottom", font: { color: t, size: 12, weight: 400 } }, dataSource: a, series: [{ valueField: "b", name: "Общее кол-во входящих звонков", color: m }, { valueField: "c", name: "Общее кол-во исходящих звонков", color: o }, { valueField: "d", name: "Общее кол-во входящих неотвеченных звонков", color: n }, { valueField: "e", name: "Общее кол-во исходящих неотвеченных звонков", color: p }], argumentAxis: { valueMarginsEnabled: !1, discreteAxisDivisionMode: "crossLabels", grid: { visible: !0 }, argumentType: "datetime", label: { format: "monthAndDay" } }, valueAxis: { title: { text: "Количество звонков" }, position: "left" }, crosshair: { enabled: !0, color: "#949494", width: 3, dashStyle: "dot", label: { visible: !0, backgroundColor: "#949494", font: { color: "#fff", size: 12 } } }, tooltip: { enabled: !0, customizeTooltip: function() { return this.seriesName + ": " + this.valueText } }, commonAxisSettings: { grid: { color: r, opacity: 1 }, label: { font: { size: 12, color: s } } }, commonSeriesSettings: { argumentField: "a", type: "line", label: { visible: !0, backgroundColor: "none", font: { color: t, size: 12, weight: 400 }, customizeText: function(a) { return a.value } } }, onPointClick: function(a) { a.target.select() }, onLegendClick: function(a) { var b = a.target; b.isVisible() ? b.hide() : b.show() }, rtlEnabled: !1 }, lineDynamicsRedFirstCallsOld30DaysOptions: { title: { text: "Звонки от новых клиентов за последние 30 дней", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, palette: l, equalBarWidth: !1, loadingIndicator: { text: "Загрузка данных..." }, size: {}, margin: { top: 0 }, legend: { visible: !0, rowCount: 2, orientation: "horizontal", itemTextPosition: "right", horizontalAlignment: "center", verticalAlignment: "bottom", font: { color: t, size: 12, weight: 400 } }, dataSource: b, series: [{ valueField: "b", name: "Общее кол-во отвеченных звонков (с новых номеров)", color: p }, { valueField: "c", name: "Общее кол-во не отвеченных звонков (с новых номеров)", color: o }, { valueField: "d", name: "Общее кол-во отвеченных звонков (красным группам)", color: m }, { valueField: "e", name: "Общее кол-во не отвеченных звонков (красным группам)", color: n }], argumentAxis: { valueMarginsEnabled: !1, discreteAxisDivisionMode: "crossLabels", grid: { visible: !0 }, argumentType: "datetime", label: { format: "monthAndDay" } }, valueAxis: { title: { text: "Количество звонков" }, position: "left" }, crosshair: { enabled: !0, color: "#949494", width: 3, dashStyle: "dot", label: { visible: !0, backgroundColor: "#949494", font: { color: "#fff", size: 12 } } }, tooltip: { enabled: !0, customizeTooltip: function() { return this.seriesName + ": " + this.valueText } }, commonAxisSettings: { grid: { color: r, opacity: 1 }, label: { font: { size: 12, color: s } } }, commonSeriesSettings: { argumentField: "a", type: "line", label: { visible: !0, backgroundColor: "none", font: { color: t, size: 12, weight: 400 }, customizeText: function(a) { return a.value } } }, onPointClick: function(a) { a.target.select() }, onLegendClick: function(a) { var b = a.target; b.isVisible() ? b.hide() : b.show() }, rtlEnabled: !1 }, barLinesLoadOptions: { dataSource: c, commonSeriesSettings: { argumentField: "b", type: "steparea", label: { visible: !0, format: "fixedPoint", font: { size: 11 }, border: { visible: !1, width: 0 } } }, argumentAxis: { valueMarginsEnabled: !1, discreteAxisDivisionMode: "crossLabels", grid: { visible: !0 }, categories: ["9 час", "10 час", "11 час", "12 час", "13 час", "14 час", "15 час", "16 час", "17 час", "18 час", "19 час", "20 час", "21 час"] }, valueAxis: [{ visible: !0, grid: { visible: !0 } }], commonAxisSettings: { grid: { color: r, opacity: 1 }, label: { font: { size: 14, color: s } } }, legend: { verticalAlignment: "bottom", horizontalAlignment: "center", itemTextPosition: "right", font: { color: t, size: 12, weight: 400 }, columnCount: 9 }, loadingIndicator: { show: !1, text: "Загрузка..." }, title: { text: "Загруженность телефонных линий", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, scrollBar: { visible: !1 }, zoomingMode: "none", onLegendClick: function(a) { for (var b = $("#barLinesLoad").dxChart("instance"), d = c(), e = [], f = [], g = 0; g < window.app.data.dataBarLinesLoad.length; g++)-1 == $.inArray(window.app.data.dataBarLinesLoad[g].b, e) && e.push(window.app.data.dataBarLinesLoad[g].b); if (a.target.isVisible() ? a.target.hide() : a.target.show(), "e" === a.target.name || "d" === a.target.name || "c" === a.target.name) return !1; $.each(b.getAllSeries(), function(a, b) { f.push({ name: b.name, isVisible: b.isVisible() }) }); for (var g = 0; g < e.length; g++) { var h = 0, i = []; i = $.grep(window.app.data.dataBarLinesLoad, function(a) { return isHiddenLine = $.grep(f, function(b) { return a.a === b.name && 1 != b.isVisible }), a.b === e[g] && 0 == isHiddenLine.length }), $.grep(d, function(a) { if (a.b === e[g]) { d[h].c = 0, d[h].d = 0, d[h].e = 0; for (var b = 0; b < i.length; b++)d[h].c = d[h].c + i[b].c, d[h].d = d[h].d + i[b].d, d[h].e = d[h].e + i[b].e; return !0 } ++h }) } b.option("dataSource", d), b.render() }, onSeriesHoverChanged: function(a) { for (var b = a.target.getAllPoints(), c = 0; c < b.length; c++)b[c].getLabel()[a.target.isHovered() ? "show" : "hide"]() } }, gaugeMissedIncomingCallsOptions: { title: { text: "Процент неотвеченных входящих вызовов", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, scale: { startValue: 0, endValue: 100, tickInterval: 10, label: { useRangeColors: !0, customizeText: function(a) { return a.valueText + " %" } } }, rangeContainer: { ranges: [{ startValue: 0, endValue: 10, color: m }, { startValue: 10, endValue: 20, color: p }, { startValue: 20, endValue: 100, color: n }] }, subvalueIndicator: { type: "rectangleNeedle" } }, gaugeMissedOutcomingCallsOptions: { title: { text: "Процент неотвеченных исходящих вызовов", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, scale: { startValue: 0, endValue: 100, tickInterval: 10, label: { useRangeColors: !0, customizeText: function(a) { return a.valueText + " %" } } }, rangeContainer: { ranges: [{ startValue: 0, endValue: 10, color: m }, { startValue: 10, endValue: 20, color: p }, { startValue: 20, endValue: 100, color: n }] }, subvalueIndicator: { type: "rectangleNeedle" } }, gaugeAverageCountCallsOneEmployeeOptions: { title: { text: "Среднее количество звонков на 1-го сотрудника в день", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, geometry: { orientation: "vertical" }, valueIndicator: { type: "textCloud", color: m }, value: h }, gaugeAverageQualityRatingOptions: { title: { text: "Среднее оценка качества", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, geometry: { orientation: "vertical" }, scale: { startValue: 0, endValue: 10, tickInterval: 2, label: { customizeText: function(a) { return a.valueText } } }, valueIndicator: { type: "textCloud", color: m } }, barAverageWaitingTimeNowOptions: { title: { text: "Среднее время разговора и ожидания", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, palette: l, equalBarWidth: !1, rotated: !0, loadingIndicator: { text: "Загрузка данных..." }, size: {}, margin: { top: 0 }, legend: { visible: !1 }, dataSource: g, valueAxis: { label: { visible: !1, customizeText: function() { return this.valueText + " сек." } } }, commonAxisSettings: { grid: { color: r, opacity: 1 }, label: { font: { size: 14, color: s } } }, commonSeriesSettings: { argumentField: "a", type: "bar", label: { visible: !0, showForZeroValues: !0, backgroundColor: "none", horizontalOffset: -500, font: { color: t, size: 14, weight: 400 }, customizeText: function(a) { return a.value + ("время ожидания" == a.argumentText ? " сек." : " мин.").toString() } }, point: { color: m, visible: !0 }, customizePoint: function(a) { return a.value > 5 && "время ожидания" == a.argument ? { color: n } : { color: m } } }, series: [{ valueField: "b", name: "" }], rtlEnabled: !1 }, paeWeekDaysCallsOptions: { title: { text: "Доля объема звонков по дням недели за текущий месяц", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, palette: l, dataSource: i, legend: { visible: !0, rowCount: 1, orientation: "horizontal", itemTextPosition: "right", horizontalAlignment: "center", verticalAlignment: "bottom", font: { color: t, size: 12, weight: 400 }, customizeText: function() { var a = $("#paeWeekDaysCalls").dxPieChart("instance"), b = a.getAllSeries()[0].getAllPoints()[this.pointIndex].originalValue, c = (100 * a.getAllSeries()[0].getAllPoints()[this.pointIndex].percent).toFixed(2); return this.pointName + ":   " + b + "(" + c + " %)" } }, tooltip: { enabled: !0, format: "currency", customizeTooltip: function() { return { text: this.argumentText + "<br>" + this.value + "(" + this.percentText + ")" } } }, series: [{ argumentField: "a", valueField: "b", label: { visible: !1, connector: { visible: !0, width: 1 }, customizeText: function(a) { return a.valueText + " (" + a.percentText + ")" } } }], rtlEnabled: !1 }, paeLinesLoadTimeOptions: { title: { text: "Доля отвеченных звонков от времени разговора", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, palette: l, dataSource: j, legend: { visible: !0, rowCount: 2, orientation: "horizontal", itemTextPosition: "right", horizontalAlignment: "center", verticalAlignment: "bottom", font: { color: t, size: 12, weight: 400 }, customizeText: function() { var a = $("#paeLinesLoadTime").dxPieChart("instance"), b = a.getAllSeries()[0].getAllPoints()[this.pointIndex].originalValue, c = (100 * a.getAllSeries()[0].getAllPoints()[this.pointIndex].percent).toFixed(2); return this.pointName + ":   " + b + "(" + c + " %)" } }, tooltip: { enabled: !0, format: "currency", customizeTooltip: function() { return { text: this.argumentText + "<br>" + this.value + "(" + this.percentText + ")" } } }, series: [{ argumentField: "a", valueField: "b", label: { visible: !1, connector: { visible: !0, width: 1 }, customizeText: function(a) { return a.valueText + " (" + a.percentText + ")" } } }] }, paeSubdivisionCallsOptions: { title: { text: "Доля объема звонков подразделений за период", font: { family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;", size: 16, color: q, weight: 400 } }, adaptiveLayout: { keepLabels: !1, height: 0 }, palette: l, dataSource: k, legend: { visible: !0, orientation: "horizontal", itemTextPosition: "right", horizontalAlignment: "center", verticalAlignment: "bottom", font: { color: t, size: 12, weight: 400 }, columnCount: 3, customizeText: function() { var a = $("#paeSubdivisionCalls").dxPieChart("instance"), b = a.getAllSeries()[0].getAllPoints()[this.pointIndex].originalValue, c = (100 * a.getAllSeries()[0].getAllPoints()[this.pointIndex].percent).toFixed(2); return this.pointName + ": " + b + "(" + c + " %)" } }, tooltip: { enabled: !0, format: "currency", customizeTooltip: function() { return { text: this.argumentText + "<br>" + this.value + "(" + this.percentText + ")" } } }, series: [{ argumentField: "a", valueField: "b", label: { visible: !1, connector: { visible: !1, width: 1 } } }] } }; ko.applyBindings(u, document.getElementById("page")) }) });