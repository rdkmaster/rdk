define(['rd.core','rd.controls.TimeBasic','css!rd.styles.TimeSelect','rd.attributes.Scroll'],
    function() {
        var timeSelectApp = angular.module('rd.controls.TimeSelect', ['rd.core','rd.controls.TimeBasic','rd.attributes.Scroll']);

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
                                    ng-click="changeGranularity(granularityItem)" \
                                    ng-class="{\'rdk-time-active\':activeGranularityCls(granularityItem)}">\
                                    {{granularityItem.label}}\
                                    </span>\
                                </div>\
                               <div ng-if="!setting.selectGranularity && !setting.selectGranularity.length && setting.customTime" class="rdk-time-granularity">\
                                    <span ng-repeat="customTimeItem in setting.customTime" \
                                    ng-click="changeCustomTime(customTimeItem)">\
                                    {{customTimeItem.label}}\
                                    </span>\
                                </div>\
                                <div ng-if="setting.padding" class="rdk-time-select-padding"></div>\
                                <div class="rdk-time-select-module" rdk-scroll>\
                                    <input ng-show="false" ng-model="setting.value"  type="text">\
                                </div>\
                                <div ng-if="hasExpect" class="color-tips">\
                                    <span>Selected</span>\
                                    <span>Recommended</span>\
                                </div>\
                            </div>',
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
                    var charToNum = {一:1, 二:2, 三:3, 四:4, 五:5, 六:6, 七:7, 八:8, 九:9, 十:10, 十一:11, 十二:12};
                    var enUsSimpleToNum = {Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12};
                    var enUsToNum = {January:1, February:2, March:3, April:4, May:5, June:6, July:7, August:8, September:9, October:10, November:11, December:12};

                    scope.language = Utils.getLocale(scope);

                    scope.hasExpect=false;

                    _render();
                    scope.selectedCustomTime = {};
                    scope.activeGranularityCls = function(granularity){
                        return scope.selectedGranularity.value == granularity.value;
                    };

                    scope.changeGranularity = function(granularity){
                        scope.setting.granularity=granularity.value;
                        scope.selectedGranularity=granularity;
                        EventService.raiseControlEvent(scope, EventTypes.GRANULARITY_CHANGE,granularity);
                    };
                    scope.changeCustomTime = function(customTimeItem){
                        EventService.raiseControlEvent(scope, EventTypes.CUSTOM_CHANGE, customTimeItem);
                    };

                    scope.$watch('setting.value', function(newVal, oldVal) {
                        if (!!newVal && newVal !== oldVal) {
                            _render();
                        }
                    });
                    scope.$watch('setting.startDate', function(newVal, oldVal) {
                        if (!!newVal && newVal !== oldVal) {
                            _render();
                        }
                    });
                    scope.$watch('setting.granularity', function(newVal, oldVal) {
                        if (!!newVal && newVal !== oldVal) {
                            _render();
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
                            _render();
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

                    function _initDefaultSetting(){
                        if (angular.isUndefined(scope.setting)) {
                            scope.setting = {};
                        }
                        if (!angular.isUndefined(scope.setting.value)) {
                            initValue = scope.setting.value;
                        }
                        initStartDate = scope.setting.startDate;
                        initEndDate = scope.setting.endDate;

                        scope.setting.granularity = Utils.getValue(scope.setting.granularity, undefined, TimeUnit.DAY);

                        scope.setting.minuteStep = +Utils.getValue(scope.setting.minuteStep, undefined, 15);
                        //默认周日为一周开始
                        scope.setting.weekStart = Utils.getValue(scope.setting.weekStart, undefined, 0);
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
                        }
                        //scope.selectedGranularity = setDefaultGranularity(scope.setting.granularity);
                    }

                    function _render() {
                        _initDefaultSetting();
                        scope.setting.weekValue =  null;
                        scope.setting.selectGranularity = Utils.getValue(scope.setting.selectGranularity, undefined, false);
                        scope.setting.customTime = Utils.getValue(scope.setting.customTime, undefined, false);
                        scope.setting.selectGranularity = scope.setting.selectGranularity && (angular.isArray(scope.setting.selectGranularity) ? scope.setting.selectGranularity : defaultGranularity);
                        scope.timeFormat = TimeFormate[Utils.getValueFromKey(TimeUnit, scope.setting.granularity || TimeUnit.DAY)];

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
                            scope.setting.endDate = Utils.getValue(TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(_handleMacroValue("endDate")), scope.timeFormat), undefined, null);
                        }

                        scope.selectedGranularity = setDefaultGranularity(scope.setting.granularity);

                        scope.startTimeOption = _generateOption();
                        scope.condition = {};
                        scope.condition.startTime = scope.setting.value;
                        _datetimepicker(iElement[0].querySelector(".rdk-time-select-module"),scope.startTimeOption);

                        _setExpectDate();
                        _setWeekStyle();
                        _bindEventHandler(_setWeekStyle);
                    }
                    function setDefaultGranularity(val){
                        var currentGranularity={};
                        if(scope.setting.selectGranularity){
                            for(var i= 0, gLen = scope.setting.selectGranularity.length ; i<gLen ; i++){
                                if(scope.setting.selectGranularity[i].value==val){
                                    currentGranularity = scope.setting.selectGranularity[i];
                                }
                            }
                        }else{
                            currentGranularity.value=scope.setting.granularity;
                        }
                        return currentGranularity;
                    }
                    datetimepicker.on('changeDate', function(ev) {
                        scope.$apply(function() {
                            scope.setting.value = TimeUtilService.dateFormate(new Date(ev.date.valueOf()), scope.startTimeOption.format);
                            _setExpectDate();
                            _setWeekStyle();
                            EventService.raiseControlEvent(scope, EventTypes.CHANGE, scope.setting.weekValue || scope.setting.value);
                        });
                    })
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
                    function _handleMacroValue(option) {
                        if (!scope[option]) {
                            if (TimeUtilService.checkIfMacro(scope.setting[option])) {
                                scope[option] = scope.setting[option];
                            } else {
                                return scope.setting[option];
                            }
                        }
                        //备注：startDate,endDate是能动态改变的
                        if(option==="startDate" || option==="endDate"){
                            return scope.setting[option];
                        }
                        return scope[option];
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
                            option.endDate = TimeUtilService.dateFormate(new Date(), scope.timeFormat);
                        }
                        if (scope.setting.startDate) {
                            option.startDate = scope.setting.startDate;
                        }
                       
                        switch (option.granularity) {
                            case TimeUnit.QUARTER:
                                option.startView = PickerConstant.HOUR;
                                option.minView = PickerConstant.HOUR;
                                option.minuteStep = scope.setting.minuteStep;
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
                        _validSettingVal(option.startDate,option.endDate);
                        return option;
                    }
                    //校验设置的时间value是否在[startDate,endDate]区间
                    function _validSettingVal(minDate,maxDate){
                        var settingVal = TimeUtilService.getTimeMacroCalculate(scope.setting.value);
                        if(angular.isString(minDate)){
                            minDate = TimeUtilService.getTimeMacroCalculate(minDate);
                        }
                        if(angular.isString(maxDate)){
                            maxDate = TimeUtilService.getTimeMacroCalculate(maxDate);
                        }
                        if(settingVal>maxDate){
                            scope.setting.value=maxDate;
                        }
                        if(settingVal<minDate){
                            scope.setting.value=minDate;
                        }
                    }

                    function _datetimepicker(domNode,option){
                        !!datetimepicker && datetimepicker.datetimepicker('remove');
                        datetimepicker = $(domNode).datetimepicker(option);
                        datetimepicker.datetimepicker('update');//增加个隐藏的input节点目的:解决没法更新时间的BUG
                    }

                    function _setWeekStyle(){
                        if (scope.selectedGranularity.value == "week") {
                            handleWeekValue();
                            setTimeout(function () {
                                var trDom = iElement[0].querySelector(".datetimepicker .datetimepicker-days>table>tbody>tr>td.active").parentNode;
                                trDom.classList.add("active");
                            }, 0)
                        }
                    }

                    function _setExpectDate(){
                        if(!(scope.setting && scope.setting.expectSelectedDate)){
                            return
                        }
                        var  vaildExpectDate =  typeof vaildExpectDate=='undefined'?_vaildExpectDate():vaildExpectDate;
                        if(!vaildExpectDate){
                            console.error("setting property of expectSelectedDate format error!");
                            return
                        }
                        scope.hasExpect=true;
                        _expectDateHandler();
                        _bindEventHandler(_expectDateHandler);
                    }

                    function _expectDateHandler(){

                        var expectSelectedDate = _parseExpectDate(scope.setting.expectSelectedDate);

                        var yearsNode=_getDatePickerNode("years");

                        _searchDateForYear(expectSelectedDate,yearsNode);

                        var monthsNode=_getDatePickerNode("months");
                        var monthsHeadNode=_getDatePickerNode("months",true);

                        _searchDateForMonth(expectSelectedDate,monthsNode,monthsHeadNode);

                        var daysNode=_getDatePickerNode("days");
                        var daysHeadNode=_getDatePickerNode("days",true);

                        var daysObj=_parseDay(daysHeadNode.innerText);

                        _searchDateForDay(expectSelectedDate,daysNode,daysObj);
                    }

                    function _bindEventHandler(eventHandlerFn){
                        var datetimepickerDom=iElement[0].querySelector(".rdk-time-select-module .datetimepicker");
                        $(datetimepickerDom).on("click",function(){
                            setTimeout(eventHandlerFn,0);
                        });
                    }

                    function _getDatePickerNode(granularity,headVal){
                        var selectorBefore=".rdk-time-select-module .datetimepicker .datetimepicker-";
                        var selectorAfter=">table>tbody>tr>";
                        var nodeName="";
                        if (granularity=="years" || granularity=="months"){
                            nodeName="td>span";
                        }else{
                            nodeName="td";
                        }
                        var selector=selectorBefore+granularity+selectorAfter+nodeName;
                        if(!!headVal){
                            var theadNode=">table>thead>tr>th.switch[colspan]";
                            selector=selectorBefore+granularity+theadNode;
                            return iElement[0].querySelector(selector);
                        }
                        return iElement[0].querySelectorAll(selector);
                    }
                    function _searchDateForYear(targetObj,DateArr){
                        for (var j= 0, jLen=DateArr.length; j<jLen; j++)
                        {
                            if(targetObj.startDate.year==DateArr[j].innerText){
                                if(!DateArr[j].classList.contains("disabled")){
                                    DateArr[j].classList.add("expect-day");
                                }
                            }
                        }
                    }
                    function _searchDateForMonth(targetObj,DateArr,headVal){
                        if(targetObj.startDate.year==headVal.innerText){
                            for (var j= 0, jLen=DateArr.length; j<jLen; j++)
                            {
                                if(targetObj.startDate.month==_parseMonth(DateArr[j].innerText)
                                    || targetObj.endDate.month==_parseMonth(DateArr[j].innerText))
                                {
                                    if(!DateArr[j].classList.contains("disabled"))
                                    {
                                        DateArr[j].classList.add("expect-day");
                                    }
                                }
                            }
                        }
                    }
                    function _searchDateForDay(targetObj,DateArr,headVal){
                        if(targetObj.startDate.year==headVal.year &&
                            (targetObj.startDate.month==headVal.month || targetObj.endDate.month==headVal.month))
                        {
                            for (var j= 0, jLen=DateArr.length; j<jLen; j++)
                            {
                                if(+targetObj.startDate.month!=+targetObj.endDate.month){
                                    if(!DateArr[j].classList.contains("old") && !DateArr[j].classList.contains("new")){
                                        if((targetObj.startDate.month==headVal.month && +DateArr[j].innerText>=+targetObj.startDate.day)
                                            || targetObj.endDate.month==headVal.month && +DateArr[j].innerText<=+targetObj.endDate.day)
                                        {
                                            DateArr[j].classList.add("expect-day");
                                        }
                                        if(+DateArr[j].innerText == targetObj.startDate.day){
                                            DateArr[j].classList.add("border-left");
                                        }
                                        if(+DateArr[j].innerText == targetObj.endDate.day){
                                            DateArr[j].classList.add("border-right");
                                        }
                                    }
                                    else  if(DateArr[j].classList.contains("new")){
                                        if(targetObj.startDate.month==headVal.month && +DateArr[j].innerText<=+targetObj.endDate.day)
                                        {
                                            DateArr[j].classList.add("expect-day");
                                        }
                                        if(+DateArr[j].innerText == targetObj.endDate.day){
                                            DateArr[j].classList.add("border-right");
                                        }
                                    }else if(DateArr[j].classList.contains("old")){
                                        if(targetObj.endDate.month==headVal.month && +DateArr[j].innerText>=+targetObj.startDate.day){
                                            DateArr[j].classList.add("expect-day");
                                        }
                                    }
                                }else{
                                    if(!DateArr[j].classList.contains("old") && !DateArr[j].classList.contains("new")){
                                        if(+DateArr[j].innerText >= +targetObj.startDate.day && +DateArr[j].innerText <= +targetObj.endDate.day){
                                            DateArr[j].classList.add("expect-day");
                                        }
                                        if(+DateArr[j].innerText == targetObj.startDate.day){
                                            DateArr[j].classList.add("border-left");
                                        }
                                        if(+DateArr[j].innerText == targetObj.endDate.day){
                                            DateArr[j].classList.add("border-right");
                                        }
                                    }
                                }
                            }
                        }
                    }

                    function _vaildExpectDate(){
                        var expectSelectedDate = scope.setting.expectSelectedDate;
                        if(expectSelectedDate.length==0){
                            return false
                        }else if(expectSelectedDate.length>2){
                            console.error("setting property of expectSelectedDate only start time to end time");
                            return false
                        }
                        return true
                    }

                    function _parseMonth(val){
                        if(scope.language.toLowerCase()=="zh_cn"){
                            return charToNum[val.replace("月",'')];
                        }
                        return enUsSimpleToNum[val];
                    }
                    function _parseDay(val){
                        var result={};
                        if(scope.language.toLowerCase()=="zh_cn"){
                            val = val.split("月");
                            result.month=charToNum[val[0].trim()];
                            result.year=val[1].trim();
                        }else{
                            val = val.split(/\s+/);
                            result.month=enUsToNum[val[0]];
                            result.year=val[1];
                        }
                        return result;
                    }

                    function _parseExpectDate(dateArr){
                        var expectDateObj={};
                        var labels = ['startDate','endDate'];
                        var len = dateArr.length;
                        for(var i= 0;i<len;i++){
                            if (angular.isString(dateArr[i])){
                                var obj={};
                                if(dateArr[i].indexOf("now")!=-1){
                                    var str = TimeUtilService.dateFormate(TimeUtilService.getTimeMacroCalculate(dateArr[i]), scope.timeFormat);
                                    obj = _dateStrToObj(str);
                                }else{
                                    obj = _dateStrToObj(dateArr[i]);
                                }
                            }
                            expectDateObj[labels[i]]=obj;
                        }
                        if(expectDateObj.startDate.year != expectDateObj.endDate.year){ //不支持跨年设置
                            throw "setting property of expectSelectedDate format error!";
                        }
                        return expectDateObj;
                    }

                    function _dateStrToObj(dateStr){
                        var arr = dateStr.split("-");
                        var obj = {};
                        obj.year = +arr[0];
                        obj.month = +arr[1];
                        obj.day = +arr[2];
                        return obj;
                    }
                }
            };
        }]);

    });
