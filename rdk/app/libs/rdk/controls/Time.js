define(['rd.services.Utils', 'css!rd.styles.Time', 'rd.core', 'jquery', 'bootstrap',
        'bootstrap-select', 'bootstrap-datepicker-i18', 'angular'
    ],
    function() {
        var timeApp = angular.module('rd.controls.Time', ['rd.core']);

        timeApp.service('TimeUtilService', [function() {
            return {
                dateFormate: function(date, formatStr) {
                    var str = formatStr;
                    var Week = ['日', '一', '二', '三', '四', '五', '六'];
                    str = str.replace(/yyyy|YYYY/, date.getFullYear());
                    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
                    str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
                    str = str.replace(/M/g, date.getMonth() + 1);
                    str = str.replace(/w|W/g, Week[date.getDay()]);
                    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
                    str = str.replace(/d|D/g, date.getDate());
                    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
                    str = str.replace(/h|H/g, date.getHours());
                    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
                    str = str.replace(/m/g, date.getMinutes());
                    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
                    str = str.replace(/s|S/g, date.getSeconds());
                    return str;
                },
                dateAdd: function(date, strInterval, Number) {
                    switch (strInterval) {
                        case 's':
                            return new Date(Date.parse(date) + (1000 * Number));
                        case 'n':
                            return new Date(Date.parse(date) + (60000 * Number));
                        case 'h':
                            return new Date(Date.parse(date) + (3600000 * Number));
                        case 'd':
                            return new Date(Date.parse(date) + (86400000 * Number));
                        case 'w':
                            return new Date(Date.parse(date) + ((86400000 * 7) * Number));
                        case 'q':
                            return new Date(date.getFullYear(), (date.getMonth()) + Number * 3, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                        case 'm':
                            return new Date(date.getFullYear(), (date.getMonth()) + Number * 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                        case 'y':
                            return new Date((date.getFullYear() + Number * 1), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                    }
                },
                getWeekOfYear: function(date, weekStart) {
                    // weekStart：每周开始于周几：周日：0，周一：1，周二：2 ...，默认为周日  
                    weekStart = (weekStart || 0) - 0;
                    if (isNaN(weekStart) || weekStart > 6)
                        weekStart = 0;
                    var year = date.getFullYear();
                    var firstDay = new Date(year, 0, 1);
                    var firstWeekDays = 7 - firstDay.getDay() + weekStart;
                    var dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / 86400000) + 1;
                    return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
                }
            };
        }]);
        //考虑单独拎出来
        timeApp.directive('selectpicker', ['$timeout', function($timeout) {
                return {
                    restrict: 'A',
                    priority: 1000,
                    link: function(scope, elem, attrs) {
                        $timeout(function() {
                            $(elem).selectpicker({
                                style: 'btn',
                                size: 5
                            });
                        }, 0);
                    }
                };
            }])
            .directive('datetimepicker', ['TimeUtilService', '$timeout', function(TimeUtilService, $timeout) {
                return {
                    restrict: 'A',
                    require: '?ngModel',
                    scope: {
                        option: '='
                    },
                    link: function(scope, element, attrs, ngModel) {
                        if (!ngModel) return;

                        if (scope.option == undefined) {
                            scope.option = {};
                        }

                        scope.visible = false;

                        $(element).click(function() {
                            scope.visible = !scope.visible;
                            scope.visible ? $(this).datetimepicker('show') : $(this).datetimepicker('hide');
                        });

                        $(element).blur(function() {
                            scope.visible = false;
                        });

                        $timeout(function() {
                            _init();

                            scope.$watchGroup(["option.granularity", "option.startDate", "option.endDate"], function(newVal, oldVal) {
                                $(element).datetimepicker('remove');
                                _init();
                            }, false);

                            scope.$watch('option.realValue', function(newVal, oldVal) {
                                if (!newVal && oldVal) {
                                    scope.option.realValue = oldVal;
                                }
                            });
                            ngModel.$render = function() {
                                scope.option.realValue = ngModel.$viewValue;
                                $(element).datetimepicker('remove');
                                _init();
                            };
                        }, 0);

                        function _getWeekFormat(date) {
                            date = new Date(date);
                            var week = TimeUtilService.getWeekOfYear(date, scope.option.weekStart);
                            if (scope.option.language === 'zh_cn') {
                                return date.getFullYear() + '第' + (week < 10 ? '0' : '') + week + '周';
                            } else {
                                return date.getFullYear() + 'Week' + (week < 10 ? '0' : '') + week;
                            }
                        }

                        function _weekHandle(date) {
                            var formatValue = date;
                            if (scope.option.granularity == "week") {
                                var formatValue = _getWeekFormat(date);
                            }
                            ngModel.$setViewValue(formatValue);
                            $(element).val(formatValue);
                        }

                        function _init() {
                            if (scope.option.realFormat) {
                                if (!scope.option.realValue) {
                                    scope.option.realValue = TimeUtilService.dateFormate(new Date($(element).val()), scope.option.realFormat);
                                }
                                scope.option.realValue = TimeUtilService.dateFormate(new Date(scope.option.realValue), scope.option.realFormat);
                                $(element).val(scope.option.realValue);
                                ngModel.$setViewValue(scope.option.realValue);
                                scope.option.format = scope.option.realFormat.replace(/mm/, "ii");
                                scope.option.format = scope.option.format.replace(/MM/, "mm");
                            }

                            $(element).datetimepicker(scope.option);
                            _weekHandle(scope.option.realValue);
                            $(element).datetimepicker().on('changeDate', function(ev) {
                                scope.$apply(function() {
                                    scope.option.realValue = TimeUtilService.dateFormate(new Date(ev.date.valueOf()), scope.option.realFormat);
                                    _weekHandle(scope.option.realValue);
                                    scope.visible = false;
                                });
                            });
                        }
                    }
                };
            }]);

        timeApp.directive('rdkTime', ['PickerConstant', 'TimeMacro', 'TimeFormate', 'TimeUnit', 'Utils', 'TimeUtilService', '$timeout', function(PickerConstant, TimeMacro, TimeFormate, TimeUnit, Utils, TimeUtilService, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="rdk-time-module">\
                            <span>{{label}}</span>\
                            <div class="time-content">\
                                <input class="form-control startTime" ng-model="condition.startTime" type="text" \
                                 readonly datetimepicker option="startTimeOption">\
                                <span class="timeSpan" ng-if="range">-</span>\
                                <input class="form-control endTime" ng-model="condition.endTime" type="text" \
                                ng-if="range" readonly datetimepicker option="endTimeOption">\
                                <span ng-show="setting.selectGranularity == true" class="granularity" \
                                    ng-bind="selectedGranularity.label" ng-click="focusSelect()"></span>\
                                <select selectpicker class="selectpicker" ng-model="selectedGranularity" \
                                    ng-options="granularity.label for granularity in granularityList" \
                                    ng-show="setting.selectGranularity == true">\
                                </select>\
                            </div>\
                        </div>',
                scope: {
                    setting: "=?",
                    label: "=?",
                    refreshTimeout: "@?"
                },
                compile: function(tElement, tAttrs) {

                    return function link(scope, iElement, iAttrs) {
                        var initValue = [];
                        var initStartDate = "";
                        var initEndDate = "";
                        scope.range = Utils.isTrue(iAttrs.range);

                        function getInitValue() {
                            if (angular.isUndefined(scope.setting)) {
                                scope.setting = {};
                            }
                            if (typeof(scope.setting.value) != 'undefined') {
                                if (scope.range) {
                                    initValue[0] = scope.setting.value[0];
                                    initValue[1] = scope.setting.value[1];
                                } else {
                                    initValue = scope.setting.value;
                                }
                            }
                            initStartDate = scope.setting.startDate;
                            initStartDate = scope.setting.endDate;
                        }
                        getInitValue();
                        _init();

                        scope.$watch('setting.value', function(newVal, oldVal) {
                            if (!!newVal && newVal !== oldVal) {
                                _init();
                            }
                        })
                        var timer;
                        var updateValue = function() {
                                var value=scope.setting.value.toString();
                                var endDate=scope.setting.endDate.toString();
                                var startDate=scope.setting.startDate.toString();
                                if (value.indexOf("now") >= 0 || 
                                    startDate.indexOf("now") >= 0 ||
                                    endDate.toString().indexOf("now") >= 0 || 
                                    initValue.toString().indexOf("now") >= 0 ||
                                    initStartDate.indexOf("now") >= 0 || 
                                    initEndDate.indexOf("now") >= 0) {

                                    if (initValue.toString().indexOf("now") >= 0) {
                                        if (scope.range) {
                                            scope.setting.value[0] = TimeUtilService.dateFormate(_timeMacroCalculate(initValue[0]), scope.timeFormat);
                                            scope.setting.value[1] = TimeUtilService.dateFormate(_timeMacroCalculate(initValue[1]), scope.timeFormat);
                                        } else {

                                            scope.setting.value = TimeUtilService.dateFormate(_timeMacroCalculate(initValue), scope.timeFormat);
                                        }
                                    }
                                    if (initStartDate.indexOf("now") >= 0) {
                                        scope.setting.startDate = Utils.getValue(TimeUtilService.dateFormate(_timeMacroCalculate(initStartDate), scope.timeFormat), undefined, null);

                                    }
                                    if (initEndDate.indexOf("now") >= 0) {
                                        scope.setting.endDate = Utils.getValue(TimeUtilService.dateFormate(_timeMacroCalculate(initEndDate), scope.timeFormat), undefined, null);
                                    }

                                    _init();
                                    // $('#datetimepicker').datetimepicker('setEndDate', scope.setting.endDate);
                                }
                                timer = $timeout(updateValue, scope.refreshTimeout);
                        };
                        if (!!eval(scope.refreshTimeout)) {
                            $timeout(updateValue, scope.refreshTimeout);
                        }
                        scope.$on('$destroy', function() {
                            //console.log("timer destroy");
                            $timeout.cancel(timer);
                        });


                        function _init() {
                            scope.range = Utils.isTrue(iAttrs.range);
                            scope.label = Utils.getValue(scope.label, iAttrs.label, "时间");
                            if (angular.isUndefined(scope.setting)) {
                                scope.setting = {};
                            }
                            scope.setting.selectGranularity = Utils.getValue(scope.setting.selectGranularity, undefined, false);
                            scope.setting.granularity = Utils.getValue(scope.setting.granularity, undefined, TimeUnit.DAY);
                            //默认周日为一周开始
                            scope.setting.weekStart = Utils.getValue(scope.setting.weekStart, undefined, 0);
                            scope.timeFormat = TimeFormate[_getValueFromKey(TimeUnit, scope.setting.granularity)];
                            if (angular.isUndefined(scope.setting.value)) {
                                if (scope.range) {
                                    scope.setting.value = [];
                                    scope.setting.value[0] = TimeUtilService.dateFormate(_timeMacroCalculate('now - 1d'), scope.timeFormat);
                                    scope.setting.value[1] = TimeUtilService.dateFormate(_timeMacroCalculate('now'), scope.timeFormat);
                                } else {
                                    scope.setting.value = TimeUtilService.dateFormate(new Date(), scope.timeFormat);
                                }
                            } else {
                                if (scope.range) {
                                    scope.setting.value[0] = TimeUtilService.dateFormate(_timeMacroCalculate(scope.setting.value[0]), scope.timeFormat);
                                    scope.setting.value[1] = TimeUtilService.dateFormate(_timeMacroCalculate(scope.setting.value[1]), scope.timeFormat);
                                } else {
                                    scope.setting.value = TimeUtilService.dateFormate(_timeMacroCalculate(scope.setting.value), scope.timeFormat);
                                }
                            }
                            if (angular.isUndefined(scope.setting.startDate) || !scope.setting.startDate) {
                                scope.setting.startDate = Utils.getValue(_timeMacroCalculate(scope.setting.startDate), undefined, null);
                            } else {
                                scope.setting.startDate = Utils.getValue(TimeUtilService.dateFormate(_timeMacroCalculate(scope.setting.startDate), scope.timeFormat), undefined, null);
                            }
                            if (angular.isUndefined(scope.setting.endDate) || !scope.setting.endDate) {
                                scope.setting.endDate = Utils.getValue(_timeMacroCalculate(scope.setting.endDate), undefined, null);
                            } else {
                                scope.setting.endDate = Utils.getValue(TimeUtilService.dateFormate(_timeMacroCalculate(scope.setting.endDate), scope.timeFormat), undefined, null);
                            }

                            scope.granularityList = Utils.getValue(scope.setting.granularityItems, undefined, undefined);

                            if (scope.granularityList) {
                                for (var i = 0; i < scope.granularityList.length; i++) {
                                    var item = scope.granularityList[i];
                                    if (item.value == scope.setting.granularity) {
                                        scope.selectedGranularity = item;
                                        break;
                                    }
                                }
                                if (!scope.selectedGranularity && scope.granularityList.length > 0) {
                                    scope.selectedGranularity = scope.granularityList[0];
                                }
                            } else {
                                scope.selectedGranularity = {
                                    "value": scope.setting.granularity
                                };
                            }

                            _handleOption();
                            scope.condition = {};

                            if (scope.range && scope.setting.value.length != 0) {
                                scope.condition.startTime = scope.setting.value[0];
                                scope.condition.endTime = scope.setting.value[1];
                            } else {
                                scope.condition.startTime = scope.setting.value;
                            }

                            if (scope.setting.selectGranularity === true) {
                                scope.$watch('selectedGranularity', function(newVal, oldVal) {
                                    if (newVal != oldVal && newVal != null) {
                                        scope.setting.granularity = scope.selectedGranularity.value;
                                        scope.timeFormat = TimeFormate[_getValueFromKey(TimeUnit, scope.setting.granularity)];
                                        _handleOption();
                                    }
                                }, true);
                            };

                            scope.$watch('condition.startTime', function(newVal, oldVal) {
                                if (scope.range) {
                                    scope.setting.value[0] = newVal;
                                    if (scope.selectedGranularity.gap) {
                                        _handlerGap(newVal, scope.selectedGranularity.gap);
                                    }
                                    if (scope.selectedGranularity.value == "week") {
                                        scope.endTimeOption.startDate = scope.startTimeOption.realValue;
                                    } else {
                                        scope.endTimeOption.startDate = newVal;
                                    }
                                    if (scope.condition.endTime < scope.endTimeOption.startDate) {
                                        scope.condition.endTime = scope.endTimeOption.startDate;
                                    }
                                } else {
                                    scope.setting.value = newVal;
                                }
                                handleWeekValue();
                            });

                            if (scope.range) {
                                scope.$watch('condition.endTime', function(newVal, oldVal) {
                                    scope.setting.value[1] = newVal;
                                    handleWeekValue();
                                });

                            }

                            if (scope.range) {
                                if (scope.setting.selectGranularity === true) {
                                    iElement[0].getElementsByTagName("div")[0].style.minWidth = "407px";
                                } else {
                                    iElement[0].getElementsByTagName("div")[0].style.minWidth = "287px";
                                }
                            } else {
                                if (scope.setting.selectGranularity === true) {
                                    iElement[0].getElementsByTagName("div")[0].style.minWidth = "262px";
                                } else {
                                    iElement[0].getElementsByTagName("div")[0].style.minWidth = "142px";
                                }
                            }
                        }

                        function handleWeekValue() {
                            function formatWeekValue(str) {
                                if (angular.isString(str)) {
                                    var match = str.match(/(\d+).+?(\d+)/);
                                    var obj = {};
                                    obj.label = str;
                                    obj.year = match[1];
                                    obj.week = match[2];
                                    return obj;
                                }
                                return str;

                            }
                            if (scope.selectedGranularity.value != "week")
                                return;
                            if (angular.isArray(scope.setting.value)) {
                                for (var i = 0; i < scope.setting.value.length; i++) {
                                    scope.setting.value[i] = formatWeekValue(scope.setting.value[i]);
                                };
                            } else {
                                scope.setting.value = formatWeekValue(scope.setting.value);
                            }
                        }

                        function _handlerGap(beginTime, gap) {
                            if (scope.selectedGranularity.value == "week") {
                                var realTime = beginTime.match(/(\d+).+?(\d+)/);
                                beginTime = TimeUtilService.dateAdd(new Date(realTime[1] + "-01-01"), 'w', realTime[2] - 1);
                            }
                            var endTime = new Date(beginTime);
                            endTime.setHours(23);
                            endTime.setMinutes(59);
                            endTime.setSeconds(59);
                            var limitTime = new Date();
                            switch (gap) {
                                case "inday":
                                    break;
                                case "inweek":
                                    endTime.setDate(endTime.getDate() + 6 - endTime.getDay());
                                    break;
                                case "inmonth":
                                    endTime.setMonth(endTime.getMonth() + 1);
                                    endTime.setDate(1);
                                    endTime.setDate(endTime.getDate() - 1);
                                    break;
                                case "inyear":
                                    endTime.setMonth(11);
                                    endTime.setDate(31);
                                    break;
                                default:
                                    var gapReg = /([\d]+)([a-z]+)?/i;
                                    gap = gap.replace(/\s+/g, "");
                                    var gapArr = gapReg.exec(gap);
                                    endTime = TimeUtilService.dateAdd(endTime, gapArr[2].toLowerCase(), gapArr[1]);
                                    switch (gapArr[2]) {
                                        case "d":
                                        case "D":
                                            break;
                                        case "w":
                                        case "W":
                                            endTime.setDate(endTime.getDate() - 1 - endTime.getDay());
                                            break;
                                        case "m":
                                        case "M":
                                            endTime.setDate(1);
                                            endTime.setDate(endTime.getDate() - 1);
                                            break;
                                        case "y":
                                        case "Y":
                                            endTime.setMonth(0);
                                            endTime.setDate(1);
                                            endTime.setDate(endTime.getDate() - 1);
                                            break;
                                    }
                            }
                            if (limitTime < endTime) {
                                endTime = limitTime;
                            }
                            scope.endTimeOption.endDate = endTime;

                            scope.condition.endTime = endTime;

                        }


                        function _handleOption() {
                            if (scope.range) {
                                scope.startTimeOption = _generateOption();
                                scope.endTimeOption = _generateOption();
                            } else {
                                scope.startTimeOption = _generateOption();
                            }
                        }

                        function _generateOption() {
                            var option = {};
                            option.minuteStep = null;
                            option.realFormat = scope.timeFormat;
                            option.autoclose = 1;
                            option.forceParse = 0;
                            option.weekStart = scope.setting.weekStart;
                            option.language = Utils.getLocale(scope);
                            option.granularity = scope.selectedGranularity.value;
                            if (scope.setting.endDate) {
                                option.endDate = scope.setting.endDate;
                            } else {
                                option.endDate = new Date();
                            }
                            if (scope.setting.startDate) {
                                option.startDate = scope.setting.startDate;
                            }
                            switch (scope.selectedGranularity.value) {
                                case TimeUnit.QUARTER:
                                    option.startView = PickerConstant.HOUR;
                                    option.minView = PickerConstant.HOUR;
                                    option.minuteStep = 15;
                                    break;
                                case TimeUnit.HOUR:
                                    option.startView = PickerConstant.DAY;
                                    option.minView = PickerConstant.DAY;
                                    break;
                                case TimeUnit.DAY:
                                    option.startView = PickerConstant.MONTH;
                                    option.minView = PickerConstant.MONTH;
                                    break;
                                case TimeUnit.WEEK:
                                    option.startView = PickerConstant.MONTH;
                                    option.minView = PickerConstant.MONTH;
                                    break;
                                case TimeUnit.MONTH:
                                    option.startView = PickerConstant.YEAR;
                                    option.minView = PickerConstant.YEAR;
                                    break;
                                default:
                                    option.startView = PickerConstant.DAY;
                                    option.minView = PickerConstant.DAY;
                                    break;
                            }
                            return option;
                        }

                        function _getValueFromKey(obj, value) {
                            var propertyNames = Object.getOwnPropertyNames(obj);
                            for (var i = 0; i < propertyNames.length; i++) {
                                var property = propertyNames[i];
                                if (obj[property] == value) break;
                            };
                            return propertyNames[i];
                        }


                        function _timeMacroCalculate(timeMacro) {
                            if (timeMacro != undefined) {
                                var isLetter = /^[a-z]/i;
                                timeMacro = timeMacro.toLowerCase();
                                if (isLetter.test(timeMacro)) {
                                    timeMacro = timeMacro.replace(/\s+/g, "");
                                    var fullPara = /([a-z]+)(\+|\-)?([\d]+)([a-z]+)?/i;
                                    var timeMacroArr = fullPara.exec(timeMacro);
                                    var result = null;
                                    if (timeMacroArr && timeMacroArr[2] != undefined) {
                                        result = TimeUtilService.dateAdd(_timeMacroConvert(timeMacroArr[1]), timeMacroArr[4], "" + timeMacroArr[2] + timeMacroArr[3]);
                                        return result;
                                    } else {
                                        return _timeMacroConvert(timeMacro);
                                    }
                                } else {
                                    return new Date(timeMacro);
                                }
                            } else {
                                return timeMacro;
                            }
                        }

                        function _timeMacroConvert(timeMacro) {
                            var date;
                            switch (timeMacro) {
                                case TimeMacro.NOW:
                                    date = new Date();
                                    break;
                                default:
                                    date = timeMacro;
                                    break;
                            }
                            return date;
                        }
                    }
                }
            };
        }]);

        timeApp.constant('TimeUnit', {
            QUARTER: 'quarter',
            HOUR: 'hour',
            DAY: 'date',
            WEEK: 'week',
            MONTH: 'month'
        });

        timeApp.constant('TimeFormate', {
            QUARTER: 'yyyy-MM-dd hh:mm',
            HOUR: 'yyyy-MM-dd hh:00',
            DAY: 'yyyy-MM-dd',
            WEEK: 'yyyy-MM-dd',
            MONTH: 'yyyy-MM'
        });

        timeApp.constant('TimeMacro', {
            NOW: 'now'
        });

        timeApp.constant('TimeGap', {
            INDAY: 'inday',
            INWEEK: 'inweek',
            INMONTH: 'inmonth',
            INYEAR: 'inyear',
        });

        timeApp.constant('PickerConstant', {
            HOUR: 0,
            DAY: 1,
            MONTH: 2,
            YEAR: 3,
            DECADE: 4
        });

    });
