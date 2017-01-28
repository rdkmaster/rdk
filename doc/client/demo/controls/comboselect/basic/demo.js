(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'BasicSelector', main];
    function main(scope, BasicSelector) {
        scope.allItems = [{
            id: 0,
            label: "江苏省"
        }, {
            id: 1,
            label: "浙江省"
        }, {
            id: 2,
            label: "河南省"
        }, {
            id: 3,
            label: "湖北省"
        }, ];

        scope.selected2string = function(selected, context, index) {
            return BasicSelector.selected2string(selected, 'label', '...');
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