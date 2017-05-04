define(['rd.core', 'rd.controls.TimeBasic', 'css!rd.styles.Time'],
    function() {
        var timeApp = angular.module('rd.controls.Time', ['rd.core', 'rd.controls.TimeBasic']);

        //考虑单独拎出来
        timeApp.directive('datetimepicker', ['TimeUtilService', '$timeout', function(TimeUtilService, $timeout) {
            return {
                restrict: 'A',
                require: '?ngModel',
                scope: {
                    option: '=',
                    focus: '&?'
                },
                link: function(scope, element, attrs, ngModel) {
                    if (!ngModel) return;

                    scope.visible = false;

                    $(element).click(function() {
                        scope.visible = !scope.visible;
                        scope.visible ? $(this).datetimepicker('show') : $(this).datetimepicker('hide');
                        scope.$apply(function() {
                            scope.focus(scope.$parent);
                            // $(element).datetimepicker('setEndDate',scope.$parent[attrs.option].endDate);
                            // $(element).datetimepicker('setStartDate',scope.$parent[attrs.option].startDate);
                        });

                    });

                    $(element).blur(function() {
                        scope.visible = false;
                    });

                    $timeout(function() {
                        _init();

                        scope.$watchGroup(["option.granularity", "option.startDate", "option.endDate"], function(newVal, oldVal) {
                            $(element).datetimepicker('remove');
                            _init();
                            console.log("watch---");
                            console.log(scope.option);
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
                            formatValue = _getWeekFormat(date);
                        }
                        ngModel.$setViewValue(date);
                        scope.option.weekValue = formatValue;
                        $(element).val(formatValue);
                    }

                    function _init() {
					    if(scope.option){
							if (scope.option.realFormat) {
                            if (!scope.option.realValue) {
                                scope.option.realValue = TimeUtilService.dateFormate(TimeUtilService.getDateForStringDate($(element).val()), scope.option.realFormat);
                            }
							if(scope.option.realValue == ""){
							   return;
							}
                            scope.option.realValue = TimeUtilService.dateFormate(TimeUtilService.getDateForStringDate(scope.option.realValue), scope.option.realFormat);
                            $(element).val(scope.option.realValue);
                            ngModel.$setViewValue(scope.option.realValue);
                            scope.option.format = scope.option.realFormat.replace(/mm/, "ii");
                            scope.option.format = scope.option.format.replace(/MM/, "mm");
                        }
                        $(element).datetimepicker(scope.option);
                        _weekHandle(scope.option.realValue);
                        if (scope.visible) {
                            $(element).datetimepicker('show');
                        }
                        $(element).datetimepicker().on('changeDate', function(ev) {
                            scope.$apply(function() {
                                scope.option.realValue = TimeUtilService.dateFormate(new Date(ev.date.valueOf()), scope.option.realFormat);
                                _weekHandle(scope.option.realValue);
                                scope.visible = false;
                            });
                        });
						}
                    }
                }
            };
        }]);

        timeApp.directive('rdkTime', ['PickerConstant', 'TimeMacro', 'TimeFormate', 'TimeUnit', 'Utils', 'TimeUtilService', '$timeout', 'EventService', 'EventTypes', function(PickerConstant, TimeMacro, TimeFormate, TimeUnit, Utils, TimeUtilService, $timeout, EventService, EventTypes) {
            var scopeDefine = {
                id: "@?",
                setting: "=?",
                label: "=?",
                refreshTimeout: "@?",
                granularityChange: '&?'
            };
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="rdk-time-module">\
                            <span>{{label}}</span>\
                            <div class="time-content">\
                                <input class="form-control startTime" ng-model="condition.startTime" unselectable="on" type="text" \
                                 readonly datetimepicker option="startTimeOption" focus="handle()">\
                                <span class="timeSpan" ng-if="range">-</span>\
                                <input class="form-control endTime" ng-model="condition.endTime" type="text" \
                                ng-if="range" readonly datetimepicker option="endTimeOption" focus="handle()">\
                                <span ng-show="setting.selectGranularity == true" class="granularity" \
                                    ng-bind="selectedGranularity.label" ng-click="focusSelect()"></span>\
                                <select id="timeSelect{{$id}}" selectpicker class="selectpicker" ng-change="granularityChangeEvt()" ng-model="selectedGranularity" \
                                    ng-options="granularity.label for granularity in granularityList" \
                                    ng-show="setting.selectGranularity == true">\
                                </select>\
                            </div>\
                        </div>',
                scope: scopeDefine,
                compile: function(tElement, tAttrs) {
                    Utils.checkEventHandlers(tAttrs, scopeDefine);
                    return function link(scope, iElement, iAttrs) {
                        var i18n = Utils.getLocale(scope);
                        scope.range = Utils.isTrue(iAttrs.range);

                        scope.handle = function() {
                            _init();
                        }
                        _init();

                        scope.$watch('setting.value', function(newVal, oldVal) {
                            if (!!newVal && newVal !== oldVal) {
                                _init();
                            }
                        })

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
                                scope.setting.startDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(_handleMacroValue("startDate")), scope.timeFormat), undefined, null);
                            }
                            if (angular.isUndefined(scope.setting.endDate) || !scope.setting.endDate) {
                                scope.setting.endDate = Utils.getValue(TimeUtilService.getTimeMacroCalculate(scope.setting.endDate), undefined, null);
                            } else {
                                scope.setting.endDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(_handleMacroValue("endDate")), scope.timeFormat), undefined, null);
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
                                    if (newVal != null) {
                                        console.log("selectGranularity---");
                                        rdk["timeSelect" + scope.$id].refreshSelect();
                                        scope.setting.granularity = scope.selectedGranularity.value;
                                        scope.timeFormat = TimeFormate[Utils.getValueFromKey(TimeUnit, scope.setting.granularity)];
                                        _handleOption();
                                        if (scope.range) {
                                            _handlerGapConditions(scope.condition.startTime);
                                        }
                                        if (scope.setting.granularity !== "week") {
                                            delete scope.setting.weekValue
                                        }
                                        //$digest频繁触发
                                        //EventService.raiseControlEvent(scope, EventTypes.GRANULARITY_CHANGE, newVal);
                                    }
                                }, true);
                                scope.granularityChangeEvt = function() {
                                    EventService.raiseControlEvent(scope, EventTypes.GRANULARITY_CHANGE, scope.selectedGranularity);
                                }
                            };

                            scope.$watch('condition.startTime', function(newVal, oldVal) {
                                if (newVal) {
                                    if (scope.range) {
                                        scope.setting.value[0] = newVal;
                                        _handlerGapConditions(newVal);
                                    } else {
                                        scope.setting.value = newVal;
                                    }
                                    handleWeekValue();
                                }

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



                        function _handleMacroValue(option) {
                            if (!scope[option]) {
                                if (TimeUtilService.checkIfMacro(scope.setting[option])) {
                                    scope[option] = scope.setting[option];
                                } else {
                                    return scope.setting[option];
                                }
                            }
                            return scope[option];
                        }

                        function handleWeekValue() {
                            if (scope.selectedGranularity.value != "week")
                                return;
                            if (angular.isArray(scope.setting.value)) {
                                scope.setting.weekValue = [];
                                for (var i = 0; i < scope.setting.value.length; i++) {
                                    if (angular.isString(scope.setting.value[i])) {
                                        scope.setting.weekValue[i] = _getWeekFormat(scope.setting.value[i])
                                    }
                                }
                            } else {
                                scope.setting.weekValue = _getWeekFormat(scope.setting.value);
                            }
                        }

                        function _getWeekFormat(date) {
                            date = TimeUtilService.getDateForStringDate(date);
                            var week = TimeUtilService.getWeekOfYear(date, scope.setting.weekStart);
                            if (i18n === 'zh_cn') {
                                return date.getFullYear() + '第' + (week < 10 ? '0' : '') + week + '周';
                            } else {
                                return date.getFullYear() + 'Week' + (week < 10 ? '0' : '') + week;
                            }
                        }

                        function _handlerGapConditions(conditionStartTime) {
                            if (scope.selectedGranularity.gap && scope.selectedGranularity.value != "week") {
                                _handlerGap(conditionStartTime, scope.selectedGranularity.gap);
                            }
                            if (scope.selectedGranularity.value == "week") {
							    _handlerGap(scope.startTimeOption.realValue?scope.startTimeOption.realValue:conditionStartTime, scope.selectedGranularity.gap);
                                scope.endTimeOption.startDate = scope.startTimeOption.realValue? scope.startTimeOption.realValue:conditionStartTime;
                            } else {
                                scope.endTimeOption.startDate = conditionStartTime;
                            }
                            if (scope.condition.endTime < scope.endTimeOption.startDate) {
                                scope.condition.endTime = scope.endTimeOption.startDate;
                            }
                        }

                        function _handlerGap(beginTime, gap) {
                            var endTime = TimeUtilService.getDateForStringDate(beginTime.toString());
                            endTime.setHours(23);
                            endTime.setMinutes(59);
                            endTime.setSeconds(59);
                            var limitTime = TimeUtilService.getDateForStringDate(scope.startTimeOption.endDate);
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
                            
                            if (limitTime < endTime) {
                                endTime = limitTime;
                            }
                            scope.endTimeOption.endDate = TimeUtilService.dateFormate(endTime, scope.timeFormat);

                             if ((TimeUtilService.getDateForStringDate(endTimeCache) > TimeUtilService.getDateForStringDate(beginTime)) && (TimeUtilService.getDateForStringDate(endTimeCache) < limitTime) && (TimeUtilService.getDateForStringDate(endTimeCache)<endTime)) {
                                scope.condition.endTime = endTimeCache;
                            } else {
                                scope.condition.endTime = endTime;
                            }
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
                                option.endDate = TimeUtilService.dateFormate(new Date(), scope.timeFormat);
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
