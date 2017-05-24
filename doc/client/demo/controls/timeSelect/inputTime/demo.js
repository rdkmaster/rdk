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
            //如下代码目的，手动触发一个属性的改变来让滚动条监听到变更
            // 1.初始粒度设置为分钟 granularity: "quarter",，
            // 2.打开时间框, BUG:滚动条不见了
            // 原因：时间框的toggle是通过ng-show切换的,隐藏元素滚动条无法获取到它的scrollHeight
            // 解决方法1：可以通过ng-if阻止时间框渲染，打开时再执行，但是没法获取设置初始时间
            // 解决方法2：当时间框打开时，改变内部input节点属性，滚动条会观察到此节点的变更，会更新滚动条状态。
            if(scope.timeOpen){
                var timeNode = document.querySelector(".m-time .u-time-select .rdk-time-select-module input");
                var tmp = timeNode.style.display;
                timeNode.style.display="none";
                timeNode.style.display=tmp;
            }
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
        scope.rdkInputBlur=updateInputVal;

        function updateInputVal(){
            if(scope.setting.granularity=="week"){
                scope.inputVal = scope.setting.weekValue;
            }else{
                scope.inputVal = scope.setting.value;
            }
        }

        //粒度改变更新inputVal
        EventService.register('timeID', EventTypes.GRANULARITY_CHANGE, updateInputVal);
        EventService.register('timeID', EventTypes.CHANGE, function(event, data){
            scope.inputVal=data;
        });

        //m-time节点以外区域点击关闭时间框
        var iEle = document.querySelector(".m-time");
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