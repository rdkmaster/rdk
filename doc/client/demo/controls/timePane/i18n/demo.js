(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        { url: 'base/i18n', alias: 'i18n' }, 'rd.controls.TimePane','css!base/css/demo'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        imports.i18n.$init(scope);
        
        scope.i18Set = {
            value: "2015-01-01",
            selectGranularity: [{
                label: imports.i18n.quarter,
                value: "quarter"
            }, {
                label: imports.i18n.hour,
                value: "hour"
            }, {
                label: imports.i18n.date,
                value: "date"
            }, {
                label: imports.i18n.week,
                value: "week"
            },{
                label: imports.i18n.month,
                value: "month"
            }],
            granularity: "week",
            weekStart :1 // 0（星期日）到6（星期六）
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