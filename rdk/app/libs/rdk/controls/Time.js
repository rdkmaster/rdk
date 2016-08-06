define(['rd.services.Utils', 'css!rd.styles.Time', 'rd.core', 'jquery', 'bootstrap',
        'bootstrap-select', 'bootstrap-datepicker', 'angular'],
function() {
    var timeApp = angular.module('rd.controls.Time', ['rd.services.Utils']);

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
                        return new Date(date.getFullYear(), (date.getMonth()) + Number * 1 , date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                    case 'y':
                        return new Date((date.getFullYear() + Number * 1 ), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                }
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
                        $(elem).selectpicker();
                    });
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

                    $timeout(function() {
                        init();
                        scope.$watch('option.realFormat', function(newVal, oldVal) {
                            if (newVal != oldVal && newVal.toLowerCase() != oldVal.toLowerCase()) {
                                $(element).datetimepicker('remove');
                                init();
                            }
                        }, false);

                        scope.$watch('option.startDate', function(newVal, oldVal) {
                            $(element).datetimepicker('setStartDate', newVal);
                        });

                        scope.$watch('option.endDate', function(newVal, oldVal) {
                            if (newVal) {
                                $(element).datetimepicker('setEndDate', newVal);
                            }
                        });

                        ngModel.$render = function() {
                            $(element).val(TimeUtilService.dateFormate(new Date(ngModel.$viewValue), scope.option.realFormat))
                            ngModel.$setViewValue($(element).val());
                            $(element).datetimepicker('update');
                        };

                    }, 0);

                    function init() {
                        if (scope.option.realFormat) {
                            $(element).val(TimeUtilService.dateFormate(new Date($(element).val()), scope.option.realFormat))
                            ngModel.$setViewValue($(element).val());
                            scope.option.format = scope.option.realFormat.replace(/mm/, "ii");
                            scope.option.format = scope.option.format.replace(/MM/, "mm");
                        }

                        $(element).datetimepicker(scope.option);

                        $(element).datetimepicker().on('changeDate', function(ev) {
                            scope.$apply(function() {
                                ngModel.$setViewValue($(element).val());
                            });
                        });
                    }
                }
            };
        }]);

    timeApp.directive('rdkTime', ['PickerConstant', 'TimeMacro', 'TimeFormate', 'TimeUnit', 'Utils', 'TimeUtilService', function(PickerConstant, TimeMacro, TimeFormate, TimeUnit, Utils, TimeUtilService) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="rdk-time-module">\
                            <span>{{label}}</span>\
                            <select class="selectpicker granularitySelect" ng-model="selectedGranularity" \
                             ng-options="granularity.label for granularity in granularityList" \
                             ng-show="setting.selectGranularity == true">\
                            </select>\
                            <div class="time-content">\
                                <input class="form-control startTime" ng-model="condition.startTime" type="text" \
                                 readonly datetimepicker option="startTimeOption">\
                                <span class="timeSpan" ng-if="range">-</span>\
                                <input class="form-control endTime" ng-model="condition.endTime" type="text" \
                                ng-if="range" readonly datetimepicker option="endTimeOption">\
                            </div>\
                        </div>',
            scope: {
                setting: "=?",
                label: "=?",
            },
            compile: function(tElement, tAttrs) {

                return function link(scope, iElement, iAttrs) {
                    _init();

                    function _init() {
                        scope.range = Utils.isTrue(iAttrs.range);
                        scope.label = Utils.getValue(scope.label, iAttrs.label, "时间");
                        if (angular.isUndefined(scope.setting)) {
                            scope.setting = {};
                        }
                        scope.setting.selectGranularity = Utils.getValue(scope.setting.selectGranularity, undefined, false);
                        scope.setting.granularity = Utils.getValue(scope.setting.granularity, undefined, TimeUnit.DAY);
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
                        scope.setting.startDate = Utils.getValue(_timeMacroCalculate(scope.setting.startDate), undefined, null);
                        scope.setting.endDate = Utils.getValue(_timeMacroCalculate(scope.setting.endDate), undefined, null);
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
                            scope.selectedGranularity = { "value": scope.setting.granularity };
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
                                  scope.endTimeOption.startDate = newVal;
                                  if(scope.condition.endTime < scope.endTimeOption.startDate){
                                    scope.condition.endTime = scope.endTimeOption.startDate;
                                  }                          
                            } else {
                                scope.setting.value = newVal;
                            }
                        });

                        if (scope.range) {
                            scope.$watch('condition.endTime', function(newVal, oldVal) {
                                scope.setting.value[1] = newVal;
                            });
                        }
                    }

                    function _handlerGap(beginTime, gap) {
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
                            default : var gapReg = /([\d]+)([a-z]+)?/i;
                                      gap = gap.replace(/\s+/g, "");
                                      var gapArr = gapReg.exec(gap);
                                      endTime = TimeUtilService.dateAdd(endTime, gapArr[2].toLowerCase(),gapArr[1]);
                                      switch (gapArr[2]){
                                        case "d":
                                        case "D":
                                                break;
                                        case "w":
                                        case "W":
                                                endTime.setDate(endTime.getDate() -1 - endTime.getDay());
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
                        option.forceParse = 1;
                        option.weekStart = 1;
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
        //WEEK: 'week',
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
