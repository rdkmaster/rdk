define(['rd.core', 'rd.controls.ComboSelect', 'rd.controls.TimeSelect', 'css!rd.styles.TimePane','css!rd.styles.IconFonts'],
    function() {
        var timeApp = angular.module('rd.controls.TimePane', ['rd.core', 'rd.controls.ComboSelect','rd.controls.TimeSelect']);
        timeApp.run(["$templateCache", function($templateCache) {
            $templateCache.put("common.html",
                '<div class="rdk-time-range-module">\
                    <div class="rdk-combo-container">\
                        <rdk_combo_select  class="range-first" caption="label" show-icon="false || !range" id="rdkComboSelectStart{{$$id}}" frozen="disabled">\
                            <rdk_time_select class="rdk-time-select" id="rdkTimeSelectStart{{$$id}}" setting="startSetting"></rdk_time_select>\
                        </rdk_combo_select>\
                        <span ng-if="range" class="time-range-split"> -- </span>\
                        <rdk_combo_select  ng-if="range" class="range-second" id="rdkComboSelectEnd{{$$id}}" show-icon="false" frozen="disabled">\
                            <rdk_time_select  class="rdk-time-select" id="rdkTimeSelectEnd{{$$id}}" setting="endSetting"></rdk_time_select>\
                        </rdk_combo_select>\
                    </div>\
                </div>'
            );
            $templateCache.put("inpTime.html",
                '<div class="rdk-time-range-module" ng-class="{\'disabled-cursor\':disabled}">\
                    <div class="rdk-time-container" ng-class="{\'time-focus\':timeContainer.focus}">\
                        <input type="text" class="u-time-input"  ng-change="startInpChange(startTimeBindView.value)" ng-focus="timeContainer.focus=true" ng-blur="startInpBlur()" ng-model="startTimeBindView.value">\
                        <span ng-if="range" class="time-range-split"> -- </span>\
                        <input ng-if="range" type="text" class="u-time-input"  ng-change="endInpChange(endTimeBindView.value)" ng-focus="timeContainer.focus=true" ng-blur="endInpBlur()" ng-model="endTimeBindView.value">\
                        <div ng-show="timeOpen && startOpen" class="u-time-select-wrap time-start rdk-scroll">\
                            <rdk_time_select id="rdkTimeSelectStart{{$$id}}" class="rdk-time-select" setting="startSetting"></rdk_time_select>\
                        </div>\
                        <div ng-if="range" ng-show="timeOpen && endOpen" class="u-time-select-wrap time-end rdk-scroll">\
                            <rdk_time_select id="rdkTimeSelectEnd{{$$id}}" class="rdk-time-select" setting="endSetting"></rdk_time_select>\
                        </div>\
                    </div>\
                    <i class="u-time-icon iconfont iconfont-e8c2"  ng-click="toggleOpenTime()"></i>\
                </div>'
            );
        }]);
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
                templateUrl: function(elem, attr){
                    if(attr.input=="" || attr.input=="true"){
                        return "inpTime.html";
                    }else{
                        return "common.html"
                    }
                },
                scope: scopeDefine,
                controller: ['$scope','$element','$attrs', function(scope,element,attrs){

                    var isInpTime = attrs.input=="" || attrs.input=="true"; //是否启用输入功能
                    var timeSelectStartId;
                    var timeSelectEndId;
                    var comboSelectStartId;
                    var comboSelectEndId;
                    var selectedGranularity;
                    var throttle = Utils.throttle;

                    link(scope,element,attrs);

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

                        //scope.startSetting = angular.extend(scope.startSetting, angular.copy(scope.setting, {}));
                        Utils.shallowCopy(scope.setting,scope.startSetting);
                        if(scope.range){
                            scope.endSetting={};
                            //scope.endSetting = angular.extend(scope.endSetting, angular.copy(scope.setting, {}));
                            Utils.shallowCopy(scope.setting,scope.endSetting);
                            scope.endSetting.selectGranularity=false;
                            if(scope.setting.selectGranularity){
                                scope.endSetting.customTime=scope.setting.customTime;
                                scope.endSetting.padding=true;
                            }
                            scope.setting.weekValue=[];
                        }

                        timeSelectStartId ='rdkTimeSelectStart'+ scope.$$id;
                        timeSelectEndId ='rdkTimeSelectEnd'+ scope.$$id;
                        comboSelectStartId ='rdkComboSelectStart'+ scope.$$id;
                        comboSelectEndId ='rdkComboSelectEnd'+ scope.$$id;

                        scope.startTimeBindView = {
                            comboId:comboSelectStartId,
                            value:""
                        };
                        scope.endTimeBindView = {
                            comboId:comboSelectEndId,
                            value:""
                        };

                        if(isInpTime){
                            scope.timeContainer={
                                focus:false
                            };
                            scope.timeOpen = false;
                            scope.startOpen = true;
                            scope.endOpen = true;
                        }
                    }

                    function _addWatch(scope){
                        scope.$watch('setting.value', function(newVal, oldVal) {
                            if (!!newVal && newVal !== oldVal) {
                                throttle(_updateSetting,500)(scope);
                            }
                        },true);
                        scope.$watch('setting.granularity', function(newVal, oldVal) {
                            if (!!newVal && newVal !== oldVal) {
                                throttle(_updateSetting,500)(scope);
                            }
                        },true);
                        //gap
                        scope.$watch('startSetting.value', function(newVal, oldVal) {
                            //不要&& newVal != oldVal 判断，否则range失效
                            if (newVal) {
                                if (scope.range) {
                                    _handlerGapConditions(newVal,scope);
                                }
                                if(!isInpTime){
                                    scope.startTimeBindView.value=scope.startSetting.weekValue || scope.startSetting.value;
                                    _displayOnComboSelect(scope.startTimeBindView);
                                }
                            }
                        });
                        scope.$watch('endSetting.value', function(newVal, oldVal) {
                            if (newVal && newVal !== oldVal && !isInpTime) {
                                scope.endTimeBindView.value=scope.endSetting.weekValue || scope.endSetting.value;
                                _displayOnComboSelect(scope.endTimeBindView);
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
                    //显示时间控件的value到视图上
                    function _displayOnComboSelect(){
                        var args = [].slice.call(arguments);
                        for (var i=0;i<args.length;i++){
                            if(isInpTime){
                                if(angular.isArray(scope.setting.value)){
                                    scope.setting.value[i]=args[i].value;
                                }else{
                                    scope.setting.value=args[i].value;
                                }
                                //return
                            }else{
                                rdk[args[i].comboId].setValue(args[i].value);
                            }
                        }
                    }
                    //刷新setting
                    function _render(scope) {
                        if(scope.range){
                            $timeout(function(){
                                scope.startTimeBindView.value=scope.startSetting.weekValue || scope.startSetting.value;
                                scope.endTimeBindView.value=scope.endSetting.weekValue || scope.endSetting.value;
                                _displayOnComboSelect(scope.startTimeBindView,scope.endTimeBindView);
                                scope.setting.value[0]=scope.startSetting.value;
                                scope.setting.value[1]=scope.endSetting.value;
                                scope.setting.weekValue[0]=scope.startSetting.weekValue;
                                scope.setting.weekValue[1]=scope.endSetting.weekValue;
                            },0);
                        }else{
                            $timeout(function () {
                                scope.startTimeBindView.value=scope.startSetting.weekValue || scope.startSetting.value;
                                _displayOnComboSelect(scope.startTimeBindView);
                                scope.setting.value=scope.startSetting.value;
                                scope.setting.weekValue=scope.startSetting.weekValue;
                            }, 0);
                        }
                    }
                    //没有range事件处理
                    function _eventHandler(scope){
                        EventService.register(timeSelectStartId, EventTypes.CHANGE, function(event, data){
                            scope.setting.value=scope.startSetting.value;
                            if(isInpTime){
                                scope.toggleOpenTime();
                            }else{
                                rdk[comboSelectStartId].closeOpen();
                            }
                        });
                        EventService.register(timeSelectStartId, EventTypes.GRANULARITY_CHANGE, function(event, data){
                            //setting-->startSetting-->setting 数据来回流动,影响性能
                            //每次内部变化前注销watch
                            scope.setting.value=scope.startSetting.value;
                            scope.setting.granularity=data.value;
                            if(data.value=="week"){
                                scope.setting.weekValue=scope.startSetting.weekValue;
                            }else {
                                scope.setting.weekValue=null;
                            }
                        });
                    }
                    //使用range事件处理
                    function _rangeEventHandler(scope){
                        EventService.register(timeSelectStartId, EventTypes.CHANGE, function(event, data){
                            scope.setting.value[0]=scope.startSetting.value;
                            if(isInpTime){
                                //scope.toggleOpenTime();
                                scope.startOpen=false;
                                scope.timeOpen = scope.startOpen || scope.endOpen;
                            }else{
                                rdk[comboSelectStartId].closeOpen();
                            }
                        });
                        EventService.register(timeSelectEndId, EventTypes.CHANGE, function(event, data){
                            scope.setting.value[1]=scope.endSetting.value;
                            if(isInpTime){
                                //scope.toggleOpenTime();
                                scope.endOpen=false;
                                scope.timeOpen = scope.startOpen || scope.endOpen;
                            }else{
                                rdk[comboSelectEndId].closeOpen();
                            }
                        });
                        EventService.register(timeSelectEndId, EventTypes.CUSTOM_CHANGE, function(event, data){
                            if(data.value.indexOf("-")!=-1){ //过去时间
                                scope.endSetting.value="now";
                                scope.startSetting.value=data.value;
                            }else if(data.value.indexOf("+")!=-1){//未来时间
                                scope.endSetting.value=data.value;
                                scope.startSetting.value="now";
                            }else{
                                scope.startSetting.value=data.value;
                                scope.endSetting.value=data.value;
                            }
                            if(isInpTime){
                                $timeout(function(){
                                    scope.startTimeBindView.value=scope.startSetting.weekValue || scope.startSetting.value;
                                    scope.endTimeBindView.value=scope.endSetting.weekValue || scope.endSetting.value;
                                },0)
                            }
                            scope.setting.value[0]=scope.startSetting.value;
                            scope.setting.value[1]=scope.endSetting.value;
                            scope.timeOpen=false;
                        });

                        //粒度变化
                        EventService.register(timeSelectStartId, EventTypes.GRANULARITY_CHANGE, function(event, data){
                            _displayOnComboSelect(scope.startTimeBindView);
                            _handlerGapConditions(scope.startSetting.value,scope);
                            scope.setting.value[0]=scope.startSetting.value;
                            scope.setting.granularity=data.value;
                            selectedGranularity = data;
                        });
                        EventService.register(timeSelectEndId, EventTypes.GRANULARITY_CHANGE, function(event, data){
                            _displayOnComboSelect(scope.endTimeBindView);
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

                    //时间输入
                    if(isInpTime){
                        scope.toggleOpenTime = function(){
                            if(scope.disabled){
                                return
                            }
                            scope.timeOpen = !scope.timeOpen;
                            scope.startOpen=scope.endOpen=true;
                            if(scope.timeOpen){
                                scope.timeContainer.focus = true;
                            }
                        };
                        var regNow = /^now(([+-]{1})\d+([ymdhn]{1}))?$/;
                        //inputVal改变更新setting.value
                        scope.startInpChange =function(val){
                            if(scope.startSetting.granularity=="week"){
                                console.warn("Weekly granularity does not support input");
                                return
                            }
                            if(!regNow.test(val)){
                                scope.startTimeBindView.value = checkFormat(val);
                                scope.startTimeBindView.value= checkVal(scope.startTimeBindView.value);
                                scope.startSetting.value = scope.startTimeBindView.value;
                            }else{
                                scope.startSetting.value=val;
                            }
                        };
                        scope.endInpChange =function(val){
                            if(scope.endSetting.granularity=="week"){
                                console.warn("Weekly granularity does not support input");
                                return
                            }
                            if(!regNow.test(val)) {
                                scope.endTimeBindView.value = checkFormat(val);
                                scope.endTimeBindView.value = checkVal(scope.endTimeBindView.value);
                                scope.endSetting.value = scope.endTimeBindView.value;
                            }else{
                                scope.endSetting.value=val;
                            }
                        };
                        //todo:矫正时分粒度
                        //错误格式矫正，必须有-  :
                        function checkFormat(inpVal){
                            if(inpVal.indexOf(":")==-1){
                                var regMM=/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d)/g;
                                inpVal = inpVal.replace(regMM,function(regVal){
                                    return regVal+":";
                                });
                                // inpVal=inpVal+":";
                            }
                            var regYMDS=/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+/g;
                            if(!regYMDS.test(inpVal)){
                                var regYMD=/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/g;
                                inpVal = inpVal.replace(regYMD,function(regVal){
                                    return regVal+" "
                                })
                            }
                            return inpVal
                        }
                        //错误输入时间矫正为00
                        function checkVal(inpVal){
                            var inputValmm = inpVal.slice(inpVal.indexOf(":")+1);
                            var inputValhh = inpVal.slice(11,inpVal.indexOf(":"));
                            if(scope.startSetting.granularity=="hour" || scope.startSetting.granularity=="quarter"){
                                //var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d$/g;
                                //var regExp = new RegExp(reg);
                                //if(!regExp.test(inpVal)){
                                //    console.error("时间格式不正确,正确格式为: 2017-06-06 12:00");
                                //    return false;
                                //}
                                var regExpMM = /^([0-5]?\d?)$/g;
                                if(!regExpMM.test(inputValmm) && inpVal.indexOf(":")!=-1){
                                    inpVal = inpVal.replace(inpVal.slice(inpVal.indexOf(":")+1),"00")
                                }
                                var regExpHH = /^((20|21|22|23){1}|([0-1])?\d?)$/g;
                                if(!regExpHH.test(inputValhh)){
                                    inpVal = inpVal.replace(inpVal.slice(11,inpVal.indexOf(":")),"00")
                                }
                            }
                            return inpVal;
                        }

                        //失去焦点更新
                        scope.startInpBlur = function(){
                            scope.startTimeBindView.value=scope.startSetting.weekValue || scope.startSetting.value;
                            _displayOnComboSelect(scope.startTimeBindView);
                            if(scope.range){
                                scope.endTimeBindView.value=scope.endSetting.weekValue || scope.endSetting.value;
                                _displayOnComboSelect(scope.startTimeBindView,scope.endTimeBindView);
                            }
                            //错误的格式输入导致value=="",返回当前时间
                            if(scope.startSetting.value==""){
                                scope.startSetting.value="now";
                                $timeout(function(){
                                    scope.startTimeBindView.value = scope.startSetting.weekValue || scope.startSetting.value;
                                    _displayOnComboSelect(scope.startTimeBindView);
                                },0);
                            }
                            scope.timeContainer.focus=false;

                        };
                        scope.endInpBlur = function(){
                            scope.endTimeBindView.value=scope.endSetting.weekValue || scope.endSetting.value;
                            _displayOnComboSelect(scope.endTimeBindView);
                            if(scope.range){
                                scope.startTimeBindView.value=scope.startSetting.weekValue || scope.startSetting.value;
                                _displayOnComboSelect(scope.startTimeBindView,scope.endTimeBindView);
                            }
                            //错误的格式输入导致value=="",返回当前时间
                            if(scope.endSetting.value==""){
                                scope.endSetting.value="now";
                                $timeout(function(){
                                    scope.endTimeBindView.value=scope.endSetting.weekValue || scope.endSetting.value;
                                    _displayOnComboSelect(scope.endTimeBindView);
                                },0);
                            }
                            scope.timeContainer.focus=false;
                        };

                        scope.$watch('timeOpen', function() {
                            $(document).unbind('mouseup', _hideDropdown);
                            if (scope.timeOpen) {
                                $(document).mouseup(_hideDropdown);
                            }
                            scope.timeContainer.focus = scope.timeOpen;
                        }, false);
                        function _hideDropdown(e) {
                            if(!$(element).is(e.target) && $(element).has(e.target).length === 0) {
                                $timeout(function() {
                                    scope.timeContainer.focus = scope.timeOpen = false;
                                    scope.startOpen=scope.endOpen=true;
                                }, 0)
                            }
                        }
                    }
                }],
                compile: function(tElement, tAttrs) {
                    Utils.checkEventHandlers(tAttrs, scopeDefine);
                }
            };
        }]);
    });
