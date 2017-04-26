window.app = window.app || {};

$(function() {
    var dataLineDynamicsExtCallsOld30Days = ko.observableArray(),
        dataLineDynamicsRedFirstCallsOld30Days = ko.observableArray(),
        dataBarLinesLoad = ko.observableArray(),
        dataBarLinesLoadOptions = ko.observableArray(),
        dataGaugeMissedIncomingCalls = ko.observableArray(),
        dataGaugeMissedOutcomingCalls = ko.observableArray(),
        dataBarAverageWaitingTimeNow = ko.observableArray(),
        dataGaugeAverageCountCallsOneEmployee = ko.observableArray(),
        dataPaeWeekDaysCalls = ko.observableArray(),
        dataPaeLinesLoadTime = ko.observableArray(),
        dataPaeSubdivisionCalls = ko.observableArray();
 
    function parseDataZip() {
        var _zip = JSZip();

        _zip.loadAsync(dataZip, {
            base64: true,
            optimizedBinaryString: true
        }).then(function(dataZip) {
            _zip.file(new RegExp(".json"))[0].async("string")
                .then(function(jsonData) {
                    window.app = JSON.parse(jsonData);
                    dataLineDynamicsExtCallsOld30Days(window.app.data.dataLineDynamicsExtCallsOld30Days);
                    dataLineDynamicsRedFirstCallsOld30Days(window.app.data.dataLineDynamicsRedFirstCallsOld30Days);
                    dataBarLinesLoad(function() {
                        var _chartBar = $("#barLinesLoad").dxChart("instance"),
                            _series = [],
                            _result = [],
                            _nameHours = [],
                            _nameLines = [],
                            _obj = {};

                        for (var i = 0; i < window.app.data.dataBarLinesLoad.length; i++) {
                            if ($.inArray(window.app.data.dataBarLinesLoad[i].b, _nameHours) == -1) {
                                _obj = {};

                                _obj.b = window.app.data.dataBarLinesLoad[i].b;
                                if (_obj.c === undefined) _obj.c = 0;
                                if (_obj.d === undefined) _obj.d = 0;
                                if (_obj.e === undefined) _obj.e = 0;
                                _result.push(_obj);
                                _nameHours.push(window.app.data.dataBarLinesLoad[i].b);
                            }

                            if ($.inArray(window.app.data.dataBarLinesLoad[i].a, _nameLines) == -1) {
                                _nameLines.push(window.app.data.dataBarLinesLoad[i].a);
                            }
                        }

                        for (var i = 0; i < _nameHours.length; i++) {
                            var _x = 0;

                            _masbuf = $.grep(window.app.data.dataBarLinesLoad, function(n) {
                                return n.b === _nameHours[i];
                            })
                            $.grep(_result, function(n) {
                                if (n.b === _nameHours[i]) {
                                    for (var j = 0; j < _masbuf.length; j++) {
                                        _result[_x].c = _result[_x].c + _masbuf[j].c;
                                        _result[_x].d = _result[_x].d + _masbuf[j].d;
                                        _result[_x].e = _result[_x].e + _masbuf[j].e;
                                    }
                                    return true;
                                }
                                ++_x;
                            })
                        }

                        $("#barLinesLoad").attr("style", "min-height:" + (400 + (2 * _nameLines.length)).toString() + "px");

                        _series.push({ valueField: 'c', name: 'Максимум', color: "#9ab57e", label: { visible: false } });
                        _series.push({ valueField: 'd', name: 'Среднее', color: "#e8c267", label: { visible: false } });
                        _series.push({ valueField: 'e', name: 'Минимум', color: "#e55253", label: { visible: false } });

                        $.each(_nameLines, function(inx, el) {
                            _series.push({ valueField: el, name: el, label: { visible: false } });
                        })

                        _chartBar.option("series", _series);
                        _chartBar.option("valueAxis", [{
                            visible: true,
                            grid: {
                                visible: true
                            },
                            constantLines: [{
                            label: {
                                text: "Предел загруженности (% от макс.:" + window.app.data.dataBarLinesLoadOptions[0].b + " %/ макс.:" + window.app.data.dataBarLinesLoadOptions[0].a + ")",
                                horizontalAlignment: "right"
                            },
                            width: 2,
                            value: window.app.data.dataBarLinesLoadOptions[0].b / 100 * window.app.data.dataBarLinesLoadOptions[0].a,
                            color: "#e55253",
                            dashStyle: "dash",
                        }, {
                            label: {
                                text: ""
                            },
                            width: 2,
                            value: window.app.data.dataBarLinesLoadOptions[0].a,
                            color: "#e55253",
                            dashStyle: "dash"
                                }]
                        }]);
                        _chartBar.render();

                        return _result;
                    }());
                    dataBarLinesLoadOptions(window.app.data.dataBarLinesLoadOptions);
                    dataGaugeMissedIncomingCalls(function() {
                        var _gaugeChart = $("#gaugeMissedIncomingCalls").dxCircularGauge("instance");

                        _gaugeChart.option("valueIndicator", {
                            type: "TextCloud",
                            text: {
                                customizeText: function() {
                                    return this.valueText + " % (" + window.app.data.dataLineDynamicsExtCallsOld30Days[window.app.data.dataLineDynamicsExtCallsOld30Days.length - 1].d.toFixed() + ")";
                                }
                            }
                        });
                        _gaugeChart.option("value", window.app.data.dataGaugeMissedIncomingCalls[0].a);
                        _gaugeChart.option("subvalues", window.app.data.dataGaugeMissedIncomingCalls[0].a);
                        _gaugeChart.render();

                        return window.app.data.dataGaugeMissedIncomingCalls;
                    }());
                    dataGaugeMissedOutcomingCalls(function() {
                        var _gaugeChart = $("#gaugeMissedOutcomingCalls").dxCircularGauge("instance");

                        _gaugeChart.option("valueIndicator", {
                            type: "TextCloud",
                            text: {
                                customizeText: function() {
                                    return this.valueText + " % (" + window.app.data.dataLineDynamicsExtCallsOld30Days[window.app.data.dataLineDynamicsExtCallsOld30Days.length - 1].e.toFixed() + ")";
                                }
                            }
                        });
                        _gaugeChart.option("value", [window.app.data.dataGaugeMissedOutcomingCalls[0].a]);
                        _gaugeChart.option("subvalues", [window.app.data.dataGaugeMissedOutcomingCalls[0].a]);
                        _gaugeChart.render();

                        return window.app.data.dataGaugeMissedIncomingCalls;
                    }());
                    dataBarAverageWaitingTimeNow(function() {
                        return [{
                            "a": "время ожидания",
                            "b": window.app.data.dataBarAverageWaitingTimeNow[0].a
                            }, {
                            "a": "время разговора",
                            "b": ((window.app.data.dataBarAverageWaitingTimeNow[0].b % 3600) / 60).toFixed(1)
                        }]
                    }());
                    dataGaugeAverageCountCallsOneEmployee(function() {
                        var _gaugeChart = $("#gaugeAverageCountCallsOneEmployee").dxLinearGauge("instance");

                        _gaugeChart.option("scale", {
                            startValue: 0,
                            endValue: window.app.data.dataGaugeAverageCountCallsOneEmployee + 20,
                            tickInterval: 10,
                            label: {
                                customizeText: function(arg) {
                                    return arg.valueText;
                                }
                            }
                        });
                        _gaugeChart.option("value", window.app.data.dataGaugeAverageCountCallsOneEmployee[0].a);
                        _gaugeChart.render();

                        return window.app.data.dataGaugeAverageCountCallsOneEmployee;
                    }());
                    dataPaeWeekDaysCalls(window.app.data.dataPaeWeekDaysCalls);
                    dataPaeLinesLoadTime(window.app.data.dataPaeLinesLoadTime);
                    dataPaeSubdivisionCalls(function() {
                        var _paeChart = $("#paeSubdivisionCalls").dxPieChart("instance");

                        $("#paeSubdivisionCalls").attr("style", "min-height:" + (400 + (11 * window.app.data.dataPaeSubdivisionCalls.length)).toString() + "px");
                        _paeChart.render();

                        return window.app.data.dataPaeSubdivisionCalls;
                    }());
                })
        });
    };

    parseDataZip();

    $.when(
        $.getJSON("js/devextreme/js/unicode-cldr/ca-gregorian.json"),
        $.getJSON("js/devextreme/js/unicode-cldr/numbers.json"),
        $.getJSON("js/devextreme/js/unicode-cldr/currencies.json"),
        $.getJSON("js/devextreme/js/unicode-cldr/likelySubtags.json"),
        $.getJSON("js/devextreme/js/unicode-cldr/timeData.json"),
        $.getJSON("js/devextreme/js/unicode-cldr/weekData.json"),
        $.getJSON("js/devextreme/js/unicode-cldr/currencyData.json"),
        $.getJSON("js/devextreme/js/unicode-cldr/numberingSystems.json")
    ).then(function() {
        return [].slice.apply(arguments, [0]).map(function(result) {
            return result[0];
        });
    }).then(
        Globalize.load
        ).then(function() {
            Globalize.locale("ru");

            var lightPalette = ["#e55253", "#cbc87b", "#9ab57e", "#7e4452", "#e8c267", "#565077", "#6babac", "#ad6082"],
                greenColor = "#9ab57e",
                redColor = "#e55253",
                blueColor = "#565077",
                yellowColor = "#e8c267",
                labelColor = "#43474b",
                gridColor = "#e9e9e9",
                fontColor = "#7f7f7f",
                labelTextColor = "black",
                viewModel = {
                    dataLineDynamicsExtCallsOld30Days: dataLineDynamicsExtCallsOld30Days,
                    dataLineDynamicsRedFirstCallsOld30Days: dataLineDynamicsRedFirstCallsOld30Days,
                    dataBarLinesLoad: dataBarLinesLoad,
                    dataBarLinesLoadOptions: dataBarLinesLoadOptions,
                    dataGaugeMissedIncomingCalls: dataGaugeMissedIncomingCalls,
                    dataGaugeMissedOutcomingCalls: dataGaugeMissedOutcomingCalls,
                    dataBarAverageWaitingTimeNow: dataBarAverageWaitingTimeNow,
                    dataGaugeAverageCountCallsOneEmployee: dataGaugeAverageCountCallsOneEmployee,
                    dataPaeWeekDaysCalls: dataPaeWeekDaysCalls,
                    dataPaeLinesLoadTime: dataPaeLinesLoadTime,
                    dataPaeSubdivisionCalls: dataPaeSubdivisionCalls,
                    lineDynamicsExtCallsOld30DaysOptions: {
                        title: {
                            text: "Внешние звонки за последние 30 дней",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        palette: lightPalette,
                        equalBarWidth: false,
                        loadingIndicator: {
                            text: "Загрузка данных..."
                        },
                        size: {
                            //height: 400,
                        },
                        margin: {
                            top: 0
                        },
                        legend: {
                            visible: true,
                            rowCount: 2,
                            orientation: "horizontal",
                            itemTextPosition: "right",
                            horizontalAlignment: "center",
                            verticalAlignment: "bottom",
                            font: {
                                color: labelTextColor,
                                size: 12,
                                weight: 400,
                            }
                        },
                        dataSource: dataLineDynamicsExtCallsOld30Days,
                        series: [
                            { valueField: "b", name: "Общее кол-во входящих звонков", color: greenColor },
                            { valueField: "c", name: "Общее кол-во исходящих звонков", color: blueColor },
                            { valueField: "d", name: "Общее кол-во входящих неотвеченных звонков", color: redColor },
                            { valueField: "e", name: "Общее кол-во исходящих неотвеченных звонков", color: yellowColor },
                        ],
                        argumentAxis: {
                            valueMarginsEnabled: false,
                            discreteAxisDivisionMode: "crossLabels",
                            grid: {
                                visible: true
                            },
                            argumentType: "datetime",
                            label: {
                                format: "monthAndDay"
                            }
                        },
                        valueAxis: {
                            title: {
                                text: "Количество звонков"
                            },
                            position: "left"
                        },
                        crosshair: {
                            enabled: true,
                            color: "#949494",
                            width: 3,
                            dashStyle: "dot",
                            label: {
                                visible: true,
                                backgroundColor: "#949494",
                                font: {
                                    color: "#fff",
                                    size: 12,
                                }
                            }
                        },
                        tooltip: {
                            enabled: true,
                            customizeTooltip: function() {
                                return this.seriesName + ": " + this.valueText;
                            }
                        },
                        commonAxisSettings: {
                            grid: {
                                color: gridColor,
                                opacity: 1
                            },
                            label: {
                                font: {
                                    size: 12,
                                    color: fontColor
                                }
                            }
                        },
                        commonSeriesSettings: {
                            argumentField: "a",
                            type: "line",
                            label: {
                                visible: true,
                                backgroundColor: "none",
                                font: {
                                    color: labelTextColor,
                                    size: 12,
                                    weight: 400,
                                },
                                customizeText: function(seriesInfo) {
                                    return seriesInfo.value;
                                }
                            }
                        },
                        onPointClick: function(e) {
                            e.target.select();
                        },
                        onLegendClick: function(e) {
                            var series = e.target;
                            series.isVisible() ? series.hide() : series.show();
                        },
                        rtlEnabled: false
                    },
                    lineDynamicsRedFirstCallsOld30DaysOptions: {
                        title: {
                            text: "Звонки от новых клиентов за последние 30 дней",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        palette: lightPalette,
                        equalBarWidth: false,
                        loadingIndicator: {
                            text: "Загрузка данных..."
                        },
                        size: {
                            //height: 400,
                        },
                        margin: {
                            top: 0
                        },
                        legend: {
                            visible: true,
                            rowCount: 2,
                            orientation: "horizontal",
                            itemTextPosition: "right",
                            horizontalAlignment: "center",
                            verticalAlignment: "bottom",
                            font: {
                                color: labelTextColor,
                                size: 12,
                                weight: 400,
                            }
                        },
                        dataSource: dataLineDynamicsRedFirstCallsOld30Days,
                        series: [
                            { valueField: "b", name: "Общее кол-во отвеченных звонков (с новых номеров)", color: yellowColor },
                            { valueField: "c", name: "Общее кол-во не отвеченных звонков (с новых номеров)", color: blueColor },
                            { valueField: "d", name: "Общее кол-во отвеченных звонков (красным группам)", color: greenColor },
                            { valueField: "e", name: "Общее кол-во не отвеченных звонков (красным группам)", color: redColor },
                        ],
                        argumentAxis: {
                            valueMarginsEnabled: false,
                            discreteAxisDivisionMode: "crossLabels",
                            grid: {
                                visible: true
                            },
                            argumentType: "datetime",
                            label: {
                                format: "monthAndDay"
                            }
                        },
                        valueAxis: {
                            title: {
                                text: "Количество звонков"
                            },
                            position: "left"
                        },
                        crosshair: {
                            enabled: true,
                            color: "#949494",
                            width: 3,
                            dashStyle: "dot",
                            label: {
                                visible: true,
                                backgroundColor: "#949494",
                                font: {
                                    color: "#fff",
                                    size: 12,
                                }
                            }
                        },
                        tooltip: {
                            enabled: true,
                            customizeTooltip: function() {
                                return this.seriesName + ": " + this.valueText;
                            }
                        },
                        commonAxisSettings: {
                            grid: {
                                color: gridColor,
                                opacity: 1
                            },
                            label: {
                                font: {
                                    size: 12,
                                    color: fontColor
                                }
                            }
                        },
                        commonSeriesSettings: {
                            argumentField: "a",
                            type: "line",
                            label: {
                                visible: true,
                                backgroundColor: "none",
                                font: {
                                    color: labelTextColor,
                                    size: 12,
                                    weight: 400,
                                },
                                customizeText: function(seriesInfo) {
                                    return seriesInfo.value;
                                }
                            }
                        },
                        onPointClick: function(e) {
                            e.target.select();
                        },
                        onLegendClick: function(e) {
                            var series = e.target;
                            series.isVisible() ? series.hide() : series.show();
                        },
                        rtlEnabled: false
                    },
                    barLinesLoadOptions: {
                        dataSource: dataBarLinesLoad,
                        commonSeriesSettings: {
                            argumentField: "b",
                            type: 'steparea',
                            label: {
                                visible: true,
                                format: "fixedPoint",
                                font: {
                                    size: 11
                                },
                                border: {
                                    visible: false,
                                    width: 0
                                }
                            }
                        },
                        argumentAxis: {
                            valueMarginsEnabled: false,
                            discreteAxisDivisionMode: "crossLabels",
                            grid: {
                                visible: true
                            },
                            categories: ["9 час", "10 час", "11 час", "12 час", "13 час", "14 час", "15 час", "16 час", "17 час", "18 час", "19 час", "20 час", "21 час"]
                        },
                        valueAxis: [{
                            visible: true,
                            grid: {
                                visible: true
                            }
                        }],
                        commonAxisSettings: {
                            grid: {
                                color: gridColor,
                                opacity: 1
                            },
                            label: {
                                font: {
                                    size: 14,
                                    color: fontColor
                                }
                            }
                        },
                        legend: {
                            verticalAlignment: 'bottom',
                            horizontalAlignment: 'center',
                            itemTextPosition: 'right',
                            font: {
                                color: labelTextColor,
                                size: 12,
                                weight: 400,
                            },
                            columnCount: 9
                        },
                        loadingIndicator: {
                            show: false,
                            text: "Загрузка..."
                        },
                        title: {
                            text: "Загруженность телефонных линий",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        scrollBar: {
                            visible: false
                        },
                        zoomingMode: "none",
                        onLegendClick: function(e) {
                            var _chartBar = $("#barLinesLoad").dxChart("instance"),
                                _currentData = dataBarLinesLoad(),
                                _nameHours = [],
                                _currentSeries = [];

                            for (var i = 0; i < window.app.data.dataBarLinesLoad.length; i++) {
                                if ($.inArray(window.app.data.dataBarLinesLoad[i].b, _nameHours) == -1) {
                                    _nameHours.push(window.app.data.dataBarLinesLoad[i].b);
                                }
                            }

                            e.target.isVisible() ? e.target.hide() : e.target.show();

                            if (e.target.name === "e" || e.target.name === "d" || e.target.name === "c") return false;

                            $.each(_chartBar.getAllSeries(), function(inx, el) {
                                _currentSeries.push({ "name": el.name, "isVisible": el.isVisible() })
                            });

                            for (var i = 0; i < _nameHours.length; i++) {
                                var _x = 0,
                                    _masbuf = [];

                                _masbuf = $.grep(window.app.data.dataBarLinesLoad, function(n) {
                                    isHiddenLine = $.grep(_currentSeries, function(m) {
                                        return n.a === m.name && m.isVisible != true;
                                    })
                                    return n.b === _nameHours[i] && isHiddenLine.length == 0;
                                })
                                $.grep(_currentData, function(n) {
                                    if (n.b === _nameHours[i]) {
                                        _currentData[_x].c = 0;
                                        _currentData[_x].d = 0;
                                        _currentData[_x].e = 0;

                                        for (var j = 0; j < _masbuf.length; j++) {
                                            _currentData[_x].c = _currentData[_x].c + _masbuf[j].c;
                                            _currentData[_x].d = _currentData[_x].d + _masbuf[j].d;
                                            _currentData[_x].e = _currentData[_x].e + _masbuf[j].e;
                                        }
                                        return true;
                                    }
                                    ++_x;
                                })
                            }

                            _chartBar.option("dataSource", _currentData);
                            _chartBar.render();
                        },
                        onSeriesHoverChanged: function(e) {
                            var points = e.target.getAllPoints();
                            for (var i = 0; i < points.length; i++) {
                                points[i].getLabel()[e.target.isHovered() ? "show" : "hide"]();
                            }
                        }
                    },
                    gaugeMissedIncomingCallsOptions: {
                        title: {
                            text: "Процент неотвеченных входящих вызовов",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        scale: {
                            startValue: 0,
                            endValue: 100,
                            tickInterval: 10,
                            label: {
                                useRangeColors: true,
                                customizeText: function(arg) {
                                    return arg.valueText + " %";
                                }
                            }
                        },
                        rangeContainer: {
                            ranges: [
                                { startValue: 0, endValue: 10, color: greenColor },
                                { startValue: 10, endValue: 20, color: yellowColor },
                                { startValue: 20, endValue: 100, color: redColor }
                            ]
                        },
                        subvalueIndicator: {
                            type: "rectangleNeedle"
                        },
                    },
                    gaugeMissedOutcomingCallsOptions: {
                        title: {
                            text: "Процент неотвеченных исходящих вызовов",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        scale: {
                            startValue: 0,
                            endValue: 100,
                            tickInterval: 10,
                            label: {
                                useRangeColors: true,
                                customizeText: function(arg) {
                                    return arg.valueText + " %";
                                }
                            }
                        },
                        rangeContainer: {
                            ranges: [
                                { startValue: 0, endValue: 10, color: greenColor },
                                { startValue: 10, endValue: 20, color: yellowColor },
                                { startValue: 20, endValue: 100, color: redColor }
                            ]
                        },
                        subvalueIndicator: {
                            type: "rectangleNeedle"
                        },

                    },
                    gaugeAverageCountCallsOneEmployeeOptions: {
                        title: {
                            text: "Среднее количество звонков на 1-го сотрудника в день",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        geometry: { orientation: "vertical" },
                        valueIndicator: {
                            type: "textCloud",
                            color: greenColor
                        },
                        value: dataGaugeAverageCountCallsOneEmployee
                    },
                    gaugeAverageQualityRatingOptions: {
                        title: {
                            text: "Среднее оценка качества",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        geometry: { orientation: "vertical" },
                        scale: {
                            startValue: 0,
                            endValue: 0 + 10,
                            tickInterval: 2,
                            label: {
                                customizeText: function(arg) {
                                    return arg.valueText;
                                }
                            }
                        },
                        valueIndicator: {
                            type: "textCloud",
                            color: greenColor
                        }
                    },
                    barAverageWaitingTimeNowOptions: {
                        title: {
                            text: "Среднее время разговора и ожидания",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        palette: lightPalette,
                        equalBarWidth: false,
                        rotated: true,
                        loadingIndicator: {
                            text: "Загрузка данных..."
                        },
                        size: {
                            //height: 210,
                        },
                        margin: {
                            top: 0
                        },
                        legend: {
                            visible: false
                        },   
                        dataSource: dataBarAverageWaitingTimeNow,
                        valueAxis: {
                            label: {
                                visible: false,
                                customizeText: function() {
                                    return this.valueText + " сек.";
                                }
                            },
                        },
                        commonAxisSettings: {
                            grid: {
                                color: gridColor,
                                opacity: 1
                            },
                            label: {
                                font: {
                                    size: 14,
                                    color: fontColor
                                }
                            }
                        },
                        commonSeriesSettings: {
                            argumentField: "a",
                            type: "bar",
                            label: {
                                visible: true,
                                showForZeroValues: true,
                                backgroundColor: "none",
                                horizontalOffset: -500,
                                font: {
                                    color: labelTextColor,
                                    size: 14,
                                    weight: 400,
                                },
                                customizeText: function(seriesInfo) {
                                    return seriesInfo.value + (seriesInfo.argumentText == "время ожидания" ? " сек." : " мин.").toString();
                                }
                            },
                            point: {
                                color: greenColor,
                                visible: true
                            },
                            customizePoint: function(pointInfo) {
                                return pointInfo.value > 5 && pointInfo.argument == "время ожидания" ? { color: redColor } : { color: greenColor };
                            }
                        },
                        series: [
                            { valueField: "b", name: "" }
                        ],
                        rtlEnabled: false
                    },
                    paeWeekDaysCallsOptions: {
                        title: {
                            text: "Доля объема звонков по дням недели за текущий месяц",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        palette: lightPalette,
                        dataSource: dataPaeWeekDaysCalls,
                        legend: {
                            visible: true,
                            rowCount: 1,
                            orientation: "horizontal",
                            itemTextPosition: "right",
                            horizontalAlignment: "center",
                            verticalAlignment: "bottom",
                            font: {
                                color: labelTextColor,
                                size: 12,
                                weight: 400,
                            },
                            customizeText: function() {
                                var paeInstance = $("#paeWeekDaysCalls").dxPieChart('instance'),
                                    fixedValue = paeInstance.getAllSeries()[0].getAllPoints()[this.pointIndex].originalValue,
                                    percentValue = (paeInstance.getAllSeries()[0].getAllPoints()[this.pointIndex].percent * 100).toFixed(2);
                                return this.pointName + ":   " + fixedValue + "(" + percentValue + " %)";
                            }
                        },
                        tooltip: {
                            enabled: true,
                            format: "currency",
                            customizeTooltip: function() {
                                return { text: this.argumentText + "<br>" + this.value + "(" + this.percentText + ")" }
                            }
                        },
                        series: [
                            {
                                argumentField: "a",
                                valueField: "b",
                                label: {
                                    visible: false,
                                    connector: {
                                        visible: true,
                                        width: 1
                                    },
                                    customizeText: function(arg) {
                                        return arg.valueText + " (" + arg.percentText + ")";
                                    }
                                }
                            }
                        ],
                        rtlEnabled: false
                    },
                    paeLinesLoadTimeOptions: {
                        title: {
                            text: "Доля отвеченных звонков от времени разговора",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        palette: lightPalette,
                        dataSource: dataPaeLinesLoadTime,
                        legend: {
                            visible: true,
                            rowCount: 2,
                            orientation: "horizontal",
                            itemTextPosition: "right",
                            horizontalAlignment: "center",
                            verticalAlignment: "bottom",
                            font: {
                                color: labelTextColor,
                                size: 12,
                                weight: 400,
                            },
                            customizeText: function() {
                                var paeInstance = $("#paeLinesLoadTime").dxPieChart('instance'),
                                    fixedValue = paeInstance.getAllSeries()[0].getAllPoints()[this.pointIndex].originalValue,
                                    percentValue = (paeInstance.getAllSeries()[0].getAllPoints()[this.pointIndex].percent * 100).toFixed(2);
                                return this.pointName + ":   " + fixedValue + "(" + percentValue + " %)";
                            }
                        },
                        tooltip: {
                            enabled: true,
                            format: "currency",
                            customizeTooltip: function() {
                                return { text: this.argumentText + "<br>" + this.value + "(" + this.percentText + ")" }
                            }
                        },
                        series: [
                            {
                                argumentField: "a",
                                valueField: "b",
                                label: {
                                    visible: false,
                                    connector: {
                                        visible: true,
                                        width: 1
                                    },
                                    customizeText: function(arg) {
                                        return arg.valueText + " (" + arg.percentText + ")";
                                    }
                                }
                            }
                        ]
                    },
                    paeSubdivisionCallsOptions: {
                        title: {
                            text: "Доля объема звонков подразделений за период",
                            font: {
                                family: "'Segoe UI', Helvetica, 'Droid Sans', Tahoma, Geneva, sans-serif;",
                                size: 16,
                                color: labelColor,
                                weight: 400
                            }
                        },
                        adaptiveLayout: {
                            keepLabels: false,
                            height: 0
                        },
                        palette: lightPalette,
                        dataSource: dataPaeSubdivisionCalls,
                        legend: {
                            visible: true,
                            orientation: "horizontal",
                            itemTextPosition: "right",
                            horizontalAlignment: "center",
                            verticalAlignment: "bottom",
                            font: {
                                color: labelTextColor,
                                size: 12,
                                weight: 400,
                            },
                            columnCount: 3,
                            customizeText: function() {
                                var paeInstance = $("#paeSubdivisionCalls").dxPieChart('instance'),
                                    fixedValue = paeInstance.getAllSeries()[0].getAllPoints()[this.pointIndex].originalValue,
                                    percentValue = (paeInstance.getAllSeries()[0].getAllPoints()[this.pointIndex].percent * 100).toFixed(2);
                                return this.pointName + ": " + fixedValue + "(" + percentValue + " %)";
                            }
                        },
                        tooltip: {
                            enabled: true,
                            format: "currency",
                            customizeTooltip: function() {
                                return { text: this.argumentText + "<br>" + this.value + "(" + this.percentText + ")" }
                            }
                        },
                        series: [
                            {
                                argumentField: "a",
                                valueField: "b",
                                label: {
                                    visible: false,
                                    connector: {
                                        visible: false,
                                        width: 1
                                    },
                                    //customizeText: function (arg) {
                                    //    return arg.valueText + " (" + arg.percentText + ")";
                                    //}
                                }
                            }
                        ]
                    }
                };
            ko.applyBindings(viewModel, document.getElementById("page"));

        });
});