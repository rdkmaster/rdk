(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.ScoreIndicator', 'css!base/css/custom'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService',main];
    function main(scope,EventService) {
        EventService.register('my_ds', 'result', function(event, data) {
            scope.isMark = false;
            scope.config = [{
                label: '优',
                value: data.data[0],
                mark: true
            }, {
                label: '良',
                value: data.data[1],
                mark: false
            }, {
                label: '中',
                value: data.data[2],
                mark: false
            }, {
                label: '差',
                value: data.data[3],
                mark: false
            }];
        });
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