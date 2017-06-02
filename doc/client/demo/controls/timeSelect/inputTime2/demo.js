(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.TimeSelect',
        'rd.controls.Input', 'rd.controls.Icon',
        'css!base/css/time-select','css!rd.styles.IconFonts'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService','EventTypes','$timeout', main];
    function main(scope,EventService,EventTypes,$timeout ) {
        //时间设置
        scope.test=function(e){
            event.target.parentNode.focus();
        }
        scope.setting={
            value:"now",
            granularity: "quarter",
            selectGranularity:[
                {label: "天", value: "date"},
                {label: "周", value: "week"},
                {label: "月", value: "month"},
                {label: "时", value: "hour"},
                {label: "分", value: "quarter"}
            ],
            minuteStep:1
        };

        //初始化inputVal
        $timeout(function(){
            scope.inputVal =scope.setting.value;
        },0);

        scope.timeOpen = false;
        scope.toggleOpen = function(){
            scope.timeOpen = !scope.timeOpen;
        };

        //inputVal改变更新setting.value
        scope.inputChange =function(val){
            if(scope.setting.granularity=="week"){
                console.log("周粒度不支持输入");
                return
            }
            if(val==""){
                val="now"
            }
            scope.setting.value = val;
        };

        //失去焦点后更新inputVal
        scope.inputBlur=updateInputVal;

        function updateInputVal(){
            if(scope.setting.granularity=="week"){
                scope.inputVal = scope.setting.weekValue;
            }else{
                scope.inputVal = scope.setting.value;
            }
            //错误的格式输入导致value=="",返回当前时间
            if(scope.setting.value==""){
                scope.setting.value="now";
                $timeout(function(){
                    scope.inputVal =scope.setting.value;
                },0);
            }
        }

        //粒度改变更新inputVal
        EventService.register('timeID', EventTypes.GRANULARITY_CHANGE, updateInputVal);
        EventService.register('timeID', EventTypes.CHANGE, function(event, data){
            scope.inputVal=data;
            //时间选择后自动关闭
            scope.timeOpen = false;
        });

        //m-time节点以外区域点击关闭时间框
        var iEle = document.querySelector(".rdk-time-range-module");
        scope.$watch('timeOpen', function() {
            $(document).unbind('mouseup', _hideDropdown);
            if (scope.timeOpen) {
                $(document).mouseup(_hideDropdown);
            }
        }, false);
        function _hideDropdown(e) {
            if(!$(iEle).is(e.target) && $(iEle).has(e.target).length === 0) {
                $timeout(function() {
                    scope.timeOpen = false;
                }, 0)
            }
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();