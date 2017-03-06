(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'tabController';

    //参考 main.js 中同名变量的说明
    var imports = [
        'rd.controls.BasicSelector'
    ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', main];
    function main(scope) {
    }

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