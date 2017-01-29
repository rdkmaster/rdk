(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Time','rd.attributes.theme','css!base/css/time'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.gap = {
            value: ['2016-03-04 14:00', '2016-03-04 16:00'],
            selectGranularity: true,
            granularity: "date",
            label:'',
            granularityItems: [{
                label: "15分钟",
                value: "quarter",
                gap: "inweek"
            }, {
                label: "小时",
                value: "hour",
                gap: "2d"
            }, {
                label: "天",
                value: "date",
                gap: "inmonth"
            }, {
                label: "周",
                value: "week",
                gap: "inmonth"
            },{
                label: "月",
                value: "month",
                gap: "inyear"
            }]
        }

        scope.gap1 = {
            value: "now - 2y", //支持y/m/w/d
            granularity: "date"
        }
         scope.gap2 = {
            value: '2016-03-04 14:00',
            selectGranularity: true,
            granularity: "hour",
            label:'',
            granularityItems: [{
                label: "15分钟",
                value: "quarter",
                gap: "inweek"
            }, {
                label: "小时",
                value: "hour",
                gap: "2d"
            }, {
                label: "天",
                value: "date",
                gap: "inmonth"
            }, {
                label: "周",
                value: "week",
                gap: "inmonth"
            },{
                label: "月",
                value: "month",
                gap: "inyear"
            }]
        }
         scope.gap3 = {
            value: "now - 2y", //支持y/m/w/d
            granularity: "quarter"
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