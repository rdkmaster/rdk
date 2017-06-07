(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.TimePane'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.settingSingle={
            value: 'now',
            selectGranularity:  [{
                label: "分",
                value: "quarter"
            }, {
                label: "时",
                value: "hour"
            }, {
                label: "天",
                value: "date"
            }, {
                label: "周",
                value: "week"
            },{
                label: "月",
                value: "month"
            }],
            granularity: "date",
            minuteStep:1
        }
        scope.settingSingle2={
            value: 'now',
            selectGranularity:  [{
                label: "分",
                value: "quarter"
            }, {
                label: "时",
                value: "hour"
            }, {
                label: "天",
                value: "date"
            }, {
                label: "周",
                value: "week"
            },{
                label: "月",
                value: "month"
            }],
            granularity: "date",
            minuteStep:1
        }
        scope.showGranularity = {
            value: ['now-5d', 'now'],
            selectGranularity:  [{
                label: "分",
                value: "quarter"
            }, {
                label: "时",
                value: "hour"
            }, {
                label: "天",
                value: "date"
            }, {
                label: "周",
                value: "week"
            },{
                label: "月",
                value: "month"
            }],
            granularity: "date",
            minuteStep:1
        }
        scope.showGranularity2 = {
            value: ['now-5d', 'now'],
            selectGranularity:  [{
                label: "分",
                value: "quarter"
            }, {
                label: "时",
                value: "hour"
            }, {
                label: "天",
                value: "date"
            }, {
                label: "周",
                value: "week"
            },{
                label: "月",
                value: "month"
            }],
            granularity: "date",
            minuteStep:1
        }

        scope.valueChang=function(){
            scope.showGranularity.value = ['2015-05-04 14:00', '2015-05-10 16:00']; //支持y/m/w/d/h
            scope.showGranularity.granularity = "month"; //支持y/m/w/d/h
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