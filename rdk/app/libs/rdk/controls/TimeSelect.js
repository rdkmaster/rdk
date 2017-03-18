define(['rd.core','rd.controls.TimeBasic','css!rd.styles.TimeSelect'],
    function() {
        var timeSelectApp = angular.module('rd.controls.TimeSelect', ['rd.core','rd.controls.TimeBasic']);

        timeSelectApp.directive('rdkTimeSelect', ['PickerConstant', 'TimeMacro', 'TimeFormate', 'TimeUnit', 'Utils', 'TimeUtilService', '$timeout','EventService','EventTypes', function(PickerConstant, TimeMacro, TimeFormate, TimeUnit, Utils, TimeUtilService, $timeout,EventService,EventTypes) {
            var scopeDefine={
                setting: "=?",
                refreshTimeout: "@?",
                id:"@?",
                change:'&?'
            };
            return {
                restrict: 'E',
                replace: true,
                template: ' <div>\
                                <div ng-show="setting.selectGranularity && setting.selectGranularity.length" class="rdk-time-granularity">\
                                    <span ng-repeat="granularityItem in setting.selectGranularity" \
                                    ng-click="changeGranularity(granularityItem.value)" \
                                    ng-class="{\'rdk-time-active\':activeGranularityCls(granularityItem.value)}">\
                                    {{granularityItem.label}}\
                                    </span>\
                                </div>\
                            <div class="rdk-time-select-module">\
                               <input ng-show="false" ng-model="setting.value"  type="text">\
                           </div></div>',
                scope:scopeDefine,
                link:function(scope, iElement, iAttrs) {
                    var initValue = [];
                    var initStartDate = "";
                    var initEndDate = "";
                    var datetimepicker=null;
                    var defaultGranularity=[
                        {label: "Day", value: "date"},
                        {label: "Week", value: "week"},
                        {label: "Month", value: "month"}
                    ];
                    scope.language = Utils.getLocale(scope);

                    scope.activeGranularityCls = function(granularity){
                        return scope.setting.granularity == granularity;
                    };
                    scope.selectedGranularity={};

                    scope.changeGranularity = function(granularity){
                        scope.setting.granularity=granularity;
                        scope.selectedGranularity.value=granularity;
                    };

                    function getInitValue() {
                        if (angular.isUndefined(scope.setting)) {
                            scope.setting = {};
                        }
                        if (!angular.isUndefined(scope.setting.value)) {
                            initValue = scope.setting.value;
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
                    });
                    scope.$watch('setting.granularity', function(newVal, oldVal) {
                        if (!!newVal && newVal !== oldVal) {
                            _init();
                        }
                    });
                    scope.$watch('condition.startTime', function(newVal, oldVal) {
                        scope.setting.value = newVal;
                        handleWeekValue();
                    });

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
                                scope.setting.value = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(initValue), scope.timeFormat);
                            }
                            if (initStartDate.indexOf("now") >= 0) {
                                scope.setting.startDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(initStartDate), scope.timeFormat), undefined, null);
                            }
                            if (initEndDate.indexOf("now") >= 0) {
                                scope.setting.endDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(initEndDate), scope.timeFormat), undefined, null);
                            }
                            _init();
                        }
                        timer = $timeout(updateValue, scope.refreshTimeout);
                    };

                    if (!!eval(scope.refreshTimeout)) {
                        $timeout(updateValue, scope.refreshTimeout);
                    }
                    scope.$on('$destroy', function() {
                        $timeout.cancel(timer);
                        !!datetimepicker && datetimepicker.datetimepicker('remove');
                    });

                    function _init() {
                        if (angular.isUndefined(scope.setting)) {
                            scope.setting = {};
                        }
                        scope.setting.weekValue = null;
                        scope.setting.selectGranularity = Utils.getValue(scope.setting.selectGranularity, undefined, false);
                        scope.setting.selectGranularity = scope.setting.selectGranularity && (angular.isArray(scope.setting.selectGranularity) ? scope.setting.selectGranularity : defaultGranularity);
                        scope.setting.granularity = Utils.getValue(scope.setting.granularity, undefined, TimeUnit.DAY);
                        //默认周日为一周开始
                        scope.setting.weekStart = Utils.getValue(scope.setting.weekStart, undefined, 0);
                        scope.timeFormat = TimeFormate[Utils.getValueFromKey(TimeUnit, scope.setting.granularity)];
                        if (angular.isUndefined(scope.setting.value)) {
                            scope.setting.value = TimeUtilService.dateFormate(new Date(), scope.timeFormat);
                        } else {
                            scope.setting.value = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(scope.setting.value), scope.timeFormat);
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
                        scope.startTimeOption = _generateOption();
                        scope.condition = {};
                        scope.condition.startTime = scope.setting.value;
                        _datetimepicker(iElement[0].querySelector(".rdk-time-select-module"),scope.startTimeOption);

                    }
                    function handleWeekValue() {
                        if (scope.selectedGranularity.value != "week"){
                            return;
                        }
                        scope.setting.weekValue = _getWeekFormat(scope.setting.value);
                    }
                    function _getWeekFormat(date) {
                        date = TimeUtilService.getDateForStringDate(date);
                        var week = TimeUtilService.getWeekOfYear(date, scope.setting.weekStart);
                        if (scope.language === 'zh_cn') {
                            return date.getFullYear() + '第' + (week < 10 ? '0' : '') + week + '周';
                        } else {
                            return date.getFullYear() + 'Week' + (week < 10 ? '0' : '') + week;
                        }
                    }
                    function _generateOption() {
                        var option = {};
                        option.minuteStep = null;
                        option.format = scope.timeFormat;
                        option.initialDate = scope.setting.value;
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
                    function _datetimepicker(domNode,option){
                        !!datetimepicker && datetimepicker.datetimepicker('remove');
                        datetimepicker = $(domNode).datetimepicker(option);
                        datetimepicker.datetimepicker('update');//增加个隐藏的input节点目的:解决没法更新时间的BUG
                        datetimepicker.on('changeDate', function(ev) {
                            scope.$apply(function() {
                                scope.setting.value = TimeUtilService.dateFormate(new Date(ev.date.valueOf()), scope.startTimeOption.format);
                                EventService.raiseControlEvent(scope, EventTypes.CHANGE, scope.setting.weekValue || scope.setting.value);
                            });
                        })
                    }
                }
            };
        }]);

    });
