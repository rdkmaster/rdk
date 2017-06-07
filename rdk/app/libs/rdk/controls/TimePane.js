define(['rd.core', 'rd.controls.ComboSelect', 'rd.controls.TimeSelect', 'css!rd.styles.TimePane'],
    function() {
        var timeApp = angular.module('rd.controls.TimePane', ['rd.core', 'rd.controls.ComboSelect','rd.controls.TimeSelect']);

        timeApp.directive('rdkTimePane', ['PickerConstant', 'TimeMacro', 'TimeFormate', 'TimeUnit', 'TimeUtilService', 'Utils', '$timeout', 'EventService', 'EventTypes', function(PickerConstant, TimeMacro, TimeFormate, TimeUnit, TimeUtilService, Utils, $timeout, EventService, EventTypes) {
            var scopeDefine = {
                id: "@?",
                setting: "=?",
                label: "=?",
                refreshTimeout: "@?",
                disabled:"=?"
            };
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="rdk-time-range-module">\
                                <rdk_combo_select  class="range-first" caption="label" show-icon="false || !range" id="rdkComboSelectStart{{$$id}}" frozen="disabled">\
                                    <rdk_time_select class="rdk-time-select" id="rdkTimeSelectStart{{$$id}}" setting="startSetting"></rdk_time_select>\
                                </rdk_combo_select>\
                                <span ng-if="range" class="time-range-split"> -- </span>\
                                <rdk_combo_select  ng-if="range" class="range-second" id="rdkComboSelectEnd{{$$id}}" show-icon="false" frozen="disabled">\
                                    <rdk_time_select  class="rdk-time-select" id="rdkTimeSelectEnd{{$$id}}" setting="endSetting"></rdk_time_select>\
                                </rdk_combo_select>\
                           </div>',
                scope: scopeDefine,
                controller: ['$scope','$element','$attrs', function(scope,element,attrs){

                    link(scope,element,attrs);

                    var timeSelectStartId;
                    var timeSelectEndId;
                    var comboSelectStartId;
                    var comboSelectEndId;
                    var selectedGranularity;
                    var throttle = Utils.throttle;
                    var settingValWatch;
                    var settingGraWatch;

                    function link(scope,element,attrs){
                        _init(scope,attrs);

                        _addWatch(scope);

                        _bindEventHandler(scope);

                        _updateSetting(scope);
                    }

                    function _init(scope,iAttrs){
                        scope.range = Utils.isTrue(iAttrs.range);
                        scope.label = Utils.getValue(scope.label, iAttrs.label, "时间");
                        scope.setting = Utils.getValue(scope.setting, undefined, {});
                        scope.disabled = Utils.isTrue(scope.disabled, false);
                        scope.$$id = scope.$id;
                        scope.startSetting={};
                        scope.endSetting={};
                        //scope.startSetting = angular.extend(scope.startSetting, angular.copy(scope.setting, {}));
                        Utils.shallowCopy(scope.setting,scope.startSetting);
                        if(scope.range){
                            //scope.endSetting = angular.extend(scope.endSetting, angular.copy(scope.setting, {}));
                            Utils.shallowCopy(scope.setting,scope.endSetting);
                            scope.setting.weekValue=[];
                        }

                        timeSelectStartId ='rdkTimeSelectStart'+ scope.$$id;
                        timeSelectEndId ='rdkTimeSelectEnd'+ scope.$$id;
                        comboSelectStartId ='rdkComboSelectStart'+ scope.$$id;
                        comboSelectEndId ='rdkComboSelectEnd'+ scope.$$id;
                    }

                    function _addWatch(scope){
                        settingValWatch = scope.$watch('setting.value', function(newVal, oldVal) {
                            if (!!newVal && newVal !== oldVal) {
                                throttle(_updateSetting,500)(scope);
                            }
                        },true);
                        settingGraWatch = scope.$watch('setting.granularity', function(newVal, oldVal) {
                            if (!!newVal && newVal !== oldVal) {
                                throttle(_updateSetting,500)(scope);
                            }
                        },true);
                        //gap
                        scope.$watch('startSetting.value', function(newVal, oldVal) {
                            if (newVal) {
                                if (scope.range) {
                                    _handlerGapConditions(newVal,scope);
                                }else{
                                    _displayOnComboSelect({id: comboSelectStartId, value: scope.startSetting.weekValue || scope.startSetting.value});
                                }
                            }
                        });
                    }

                    function _bindEventHandler(scope){
                        if(scope.range){
                            _rangeEventHandler(scope);
                        }else{
                            _eventHandler(scope);
                        }
                    }

                    function _updateSetting(scope){
                        if(scope.range){
                            scope.startSetting.value = scope.setting.value[0];
                            scope.endSetting.value = scope.setting.value[1];
                            scope.startSetting.granularity = scope.setting.granularity;
                            scope.endSetting.granularity = scope.setting.granularity;
                        }else{
                            scope.startSetting.value = scope.setting.value;
                            scope.startSetting.granularity = scope.setting.granularity;
                        }
                        _render(scope);
                    }
                    //显示value到comboselect控件上
                    function _displayOnComboSelect(){
                        var args = [].slice.call(arguments);
                        for (var i=0;i<args.length;i++){
                            rdk[args[i].id].setValue(args[i].value);
                        }
                    }
                    function _destroyWatch(watchFn){
                        watchFn();
                    }
                    //刷新setting
                    function _render(scope) {
                        if(scope.range){
                            $timeout(function(){
                                _displayOnComboSelect({id:comboSelectStartId,value:scope.startSetting.weekValue || scope.startSetting.value}, {id:comboSelectEndId,value:scope.endSetting.weekValue || scope.endSetting.value});
                                scope.setting.value[0]=scope.startSetting.value;
                                scope.setting.value[1]=scope.endSetting.value;
                                // scope.setting.weekValue=scope.startSetting.weekValue;
                                scope.setting.weekValue[0]=scope.startSetting.weekValue;
                                scope.setting.weekValue[1]=scope.endSetting.weekValue;
                            },0);
                        }else{
                            $timeout(function () {
                                _displayOnComboSelect({id: comboSelectStartId, value: scope.startSetting.weekValue || scope.startSetting.value});
                                scope.setting.value=scope.startSetting.value;
                                scope.setting.weekValue=scope.startSetting.weekValue;
                            }, 0);
                        }
                    }
                    //没有range事件处理
                    function _eventHandler(scope){
                        EventService.register(timeSelectStartId, EventTypes.CHANGE, function(event, data){
                            rdk[comboSelectStartId].closeOpen();
                            _destroyWatch(settingValWatch);
                            _destroyWatch(settingGraWatch);
                            scope.setting.value=scope.startSetting.value;
                            _addWatch(scope);
                        });
                        EventService.register(timeSelectStartId, EventTypes.GRANULARITY_CHANGE, function(event, data){
                            //setting-->startSetting-->setting 数据来回流动,影响性能
                            //每次内部变化前注销watch
                            _displayOnComboSelect({id: comboSelectStartId, value: scope.startSetting.weekValue || scope.startSetting.value});
                            _destroyWatch(settingValWatch);
                            _destroyWatch(settingGraWatch);
                            scope.setting.value=scope.startSetting.value;
                            scope.setting.granularity=data.value;
                            if(data.value=="week"){
                                scope.setting.weekValue=scope.startSetting.weekValue;
                            }else {
                                scope.setting.weekValue=null;
                            }
                            _addWatch(scope);
                        });
                    }
                    //使用range事件处理
                    function _rangeEventHandler(scope){
                        EventService.register(timeSelectStartId, EventTypes.CHANGE, function(event, data){
                            rdk[comboSelectStartId].closeOpen();
                            scope.setting.value[0]=scope.startSetting.value;
                        });
                        EventService.register(timeSelectEndId, EventTypes.CHANGE, function(event, data){
                            rdk[comboSelectEndId].closeOpen();
                            scope.setting.value[1]=scope.endSetting.value;
                        });
                        //粒度变化
                        EventService.register(timeSelectStartId, EventTypes.GRANULARITY_CHANGE, function(event, data){
                            _displayOnComboSelect({id: comboSelectStartId, value: scope.startSetting.weekValue || scope.startSetting.value});
                            _handlerGapConditions(scope.startSetting.value,scope);
                            scope.setting.value[0]=scope.startSetting.value;
                            scope.setting.granularity=data.value;
                            selectedGranularity = data;
                        });
                        EventService.register(timeSelectEndId, EventTypes.GRANULARITY_CHANGE, function(event, data){
                            _displayOnComboSelect({id: comboSelectEndId, value: scope.endSetting.weekValue || scope.endSetting.value});
                            _handlerGapConditions(scope.startSetting.value,scope);
                            scope.setting.value[1]=scope.endSetting.value;
                            scope.setting.granularity=data.value;
                            selectedGranularity = data;
                        });
                    }
                    //gap
                    function _handlerGapConditions(startDate,scope) {
                        selectedGranularity = setDefaultGranularity(scope.startSetting.granularity,scope);
                        if (selectedGranularity && selectedGranularity.gap) {
                            _handlerGap(startDate,selectedGranularity.gap,scope);
                        }
                        //没有设置gap range也要限制endSetting startDate
                        scope.endSetting.startDate = startDate;
                    }

                    function setDefaultGranularity(val,scope){
                        var currentGranularity={};
                        if(scope.setting.selectGranularity){
                            for(var i= 0, gLen = scope.setting.selectGranularity.length ; i<gLen ; i++){
                                if(scope.setting.selectGranularity[i].value==val){
                                    currentGranularity = scope.setting.selectGranularity[i];
                                }
                            }
                            return currentGranularity;
                        }
                    }

                    function _handlerGap(beginTime, gap ,scope) {
                        var timeFormat = TimeFormate[Utils.getValueFromKey(TimeUnit, scope.startSetting.granularity)];
                        var endDate;
                        if (scope.startSetting.endDate) {
                            endDate = scope.startSetting.endDate;
                        } else {
                            endDate = TimeUtilService.dateFormate(new Date(), timeFormat);
                        }
                        var endTime = TimeUtilService.getDateForStringDate(beginTime.toString());
                        endTime.setHours(23);
                        endTime.setMinutes(59);
                        endTime.setSeconds(59);
                        var limitTime = TimeUtilService.getDateForStringDate(endDate);
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

                        var endTimeCache = scope.endSetting.value;

                        if (limitTime < endTime) {
                            endTime = limitTime;
                        }
                        scope.endSetting.endDate = TimeUtilService.dateFormate(endTime, timeFormat);
                        if ((TimeUtilService.getDateForStringDate(endTimeCache) >= TimeUtilService.getDateForStringDate(beginTime)) && (TimeUtilService.getDateForStringDate(endTimeCache) <= limitTime) && (TimeUtilService.getDateForStringDate(endTimeCache)<=endTime)) {
                            scope.endSetting.value = endTimeCache;
                        } else {
                            scope.endSetting.value = scope.endSetting.endDate;
                        }
                        scope.setting.value[0]=beginTime;
                        scope.setting.value[1]=scope.endSetting.value;
                    }
                }],
                compile: function(tElement, tAttrs) {
                    Utils.checkEventHandlers(tAttrs, scopeDefine);
                }
            };
        }]);
    });
