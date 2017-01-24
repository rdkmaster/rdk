(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'i18n','rd.controls.Time'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
        i18n.$init(scope);
        scope.i18Set = {
            value: "2015-01-01",
            selectGranularity: true,
            granularity: "week",
            weekStart :1, // 0（星期日）到6（星期六）
            granularityItems: [{
                label: i18n.quarter,
                value: "quarter"
            }, {
                label: i18n.hour,
                value: "hour"
            }, {
                label: i18n.date,
                value: "date"
            }, {
                label: i18n.week,
                value: "week"
            },{
                label: i18n.month,
                value: "month"
            }]
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();