define(['rd.core','rd.controls.TimeBasic', 'css!rd.styles.Time'],
    function() {
        var timeApp = angular.module('rd.controls.Time', ['rd.core','rd.controls.TimeBasic']);

        //考虑单独拎出来
        timeApp.directive('datetimepicker', ['TimeUtilService', '$timeout', function(TimeUtilService, $timeout) {
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
                            date = TimeUtilService.getDateForStringDate(date);
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
                                    scope.option.realValue = TimeUtilService.dateFormate(TimeUtilService.getDateForStringDate($(element).val()), scope.option.realFormat);
                                }
                                scope.option.realValue = TimeUtilService.dateFormate(TimeUtilService.getDateForStringDate(scope.option.realValue), scope.option.realFormat);
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

        timeApp.directive('rdkTime', ['PickerConstant', 'TimeMacro', 'TimeFormate', 'TimeUnit', 'Utils', 'TimeUtilService', '$timeout','EventService','EventTypes', function(PickerConstant, TimeMacro, TimeFormate, TimeUnit, Utils, TimeUtilService, $timeout,EventService,EventTypes) {
            var scopeDefine={
                setting: "=?",
                label: "=?",
                refreshTimeout: "@?"
            };
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="rdk-time-module">\
                            <span>{{label}}</span>\
                            <div class="time-content">\
                                <input class="form-control startTime" ng-model="condition.startTime" unselectable="on" type="text" \
                                 readonly datetimepicker option="startTimeOption">\
                                <span class="timeSpan" ng-if="range">-</span>\
                                <input class="form-control endTime" ng-model="condition.endTime" type="text" \
                                ng-if="range" readonly datetimepicker option="endTimeOption">\
                                <span ng-show="setting.selectGranularity == true" class="granularity" \
                                    ng-bind="selectedGranularity.label" ng-click="focusSelect()"></span>\
                                <select id="timeSelect{{$id}}" selectpicker class="selectpicker" ng-model="selectedGranularity" \
                                    ng-options="granularity.label for granularity in granularityList" \
                                    ng-show="setting.selectGranularity == true">\
                                </select>\
                            </div>\
                        </div>',
                scope:scopeDefine,
                compile: function(tElement, tAttrs) {
                    Utils.checkEventHandlers(tAttrs,scopeDefine);
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
                            initEndDate = scope.setting.endDate;
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
                                            scope.setting.value[0] = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(initValue[0]), scope.timeFormat);
                                            scope.setting.value[1] = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(initValue[1]), scope.timeFormat);
                                        } else {
                                            scope.setting.value = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(initValue), scope.timeFormat);
                                        }
                                    }
                                    if (initStartDate.indexOf("now") >= 0) {
                                        scope.setting.startDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(initStartDate), scope.timeFormat), undefined, null);

                                    }
                                    if (initEndDate.indexOf("now") >= 0) {
                                        scope.setting.endDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(initEndDate), scope.timeFormat), undefined, null);
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
                            scope.timeFormat = TimeFormate[Utils.getValueFromKey(TimeUnit, scope.setting.granularity)];
                            if (angular.isUndefined(scope.setting.value)) {
                                if (scope.range) {
                                    scope.setting.value = [];
                                    scope.setting.value[0] = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate('now - 1d'), scope.timeFormat);
                                    scope.setting.value[1] = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate('now'), scope.timeFormat);
                                } else {
                                    scope.setting.value = TimeUtilService.dateFormate(new Date(), scope.timeFormat);
                                }
                            } else {
                                if (scope.range) {
                                    scope.setting.value[0] = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(scope.setting.value[0]), scope.timeFormat);
                                    scope.setting.value[1] = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(scope.setting.value[1]), scope.timeFormat);
                                } else {
                                    scope.setting.value = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(scope.setting.value), scope.timeFormat);
                                }
                            }
                            if (angular.isUndefined(scope.setting.startDate) || !scope.setting.startDate) {
                                scope.setting.startDate = Utils.getValue(TimeUtilService.getTimeMacroCalculate(scope.setting.startDate), undefined, null);
                            } else {
                                scope.setting.startDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(scope.setting.startDate), scope.timeFormat), undefined, null);
                            }
                            if (angular.isUndefined(scope.setting.endDate) || !scope.setting.endDate) {
                                scope.setting.endDate = Utils.getValue(TimeUtilService.getTimeMacroCalculate(scope.setting.endDate), undefined, null);
                            } else {
                                scope.setting.endDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(scope.setting.endDate), scope.timeFormat), undefined, null);
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
                                       //EventService.raiseControlEvent(scope, EventTypes.CHANGE, scope.$id);
                                        EventService.broadcast("timeSelect"+scope.$id, EventTypes.CHANGE);
                                        scope.setting.granularity = scope.selectedGranularity.value;
                                        scope.timeFormat = TimeFormate[Utils.getValueFromKey(TimeUnit, scope.setting.granularity)];
                                        _handleOption();
                                        if (scope.range) {
                                            _handlerGapConditions(scope.condition.startTime);
                                        }
                                    }
                                }, true);
                            };

                            scope.$watch('condition.startTime', function(newVal, oldVal) {
                                if (scope.range) {
                                    scope.setting.value[0] = newVal;
                                    _handlerGapConditions(newVal);
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

                            var minWidth;
                            if (scope.range) {
                                minWidth = scope.setting.selectGranularity ? "407px" : "287px";
                            } else {
                                minWidth = scope.setting.selectGranularity ? "262px" : "142px";
                            }
                            iElement[0].getElementsByTagName("div")[0].style.minWidth = minWidth;
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

                        function _handlerGapConditions(conditionStartTime){
                            if (scope.selectedGranularity.gap) {
                                _handlerGap(conditionStartTime, scope.selectedGranularity.gap);
                            }
                            if (scope.selectedGranularity.value == "week") {
                                scope.endTimeOption.startDate = scope.startTimeOption.realValue;
                            } else {
                                scope.endTimeOption.startDate = conditionStartTime;
                            }
                            if (scope.condition.endTime < scope.endTimeOption.startDate) {
                                scope.condition.endTime = scope.endTimeOption.startDate;
                            }
                        }

                        function _handlerGap(beginTime, gap) {
                            if(scope.selectedGranularity.value == "week"){
                                var realTime = beginTime.match(/(\d+).+?(\d+)/);
                                beginTime = TimeUtilService.dateAdd(TimeUtilService.getDateForStringDate(realTime[1] + "-01-01"), 'w', realTime[2] - 1);
                                beginTime = TimeUtilService.dateFormate(beginTime,scope.timeFormat);
                            }

                            var endTime = TimeUtilService.getDateForStringDate(beginTime.toString());
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


                            var endTimeCache = scope.condition.endTime;
                            if(scope.selectedGranularity.value == "week"){
                                var realTime = endTimeCache.match(/(\d+).+?(\d+)/);
                                endTimeCache = TimeUtilService.dateAdd(TimeUtilService.getDateForStringDate(realTime[1] + "-01-01"), 'w', realTime[2] - 1);
                                endTimeCache = TimeUtilService.dateFormate(endTimeCache,scope.timeFormat);
                            }
                            if((TimeUtilService.getDateForStringDate(endTimeCache) > TimeUtilService.getDateForStringDate(beginTime))&&(TimeUtilService.getDateForStringDate(endTimeCache) < limitTime)){
                                limitTime = TimeUtilService.getDateForStringDate(endTimeCache);
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
                    }
                }
            };
        }]);

    });
