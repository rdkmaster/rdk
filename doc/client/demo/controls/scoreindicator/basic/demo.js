(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.ScoreIndicator'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.config = [{
            label: '优秀',
            color: '#64D083',
            value: 20,
            mark: true
        }, {
            label: '良',
            color: '#6AA6C5',
            value: 20,
            mark: false
        }, {
            label: '中间内容',
            color: '#FC9B58',
            value: 20,
            mark: false
        }, {
            label: '差太多',
            color: '#EE6D66',
            value: 20,
            mark: false
        }, {
            label: '新值测试',
            color: '#006D66',
            value: 20,
            mark: false
        }];
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