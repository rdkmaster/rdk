(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'SampleModuleController';

    //参考 main.js 中同名变量的说明
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.loaded = false;
        scope.load = function() {
            //mymodule是rdk_module节点的id属性值。
            //传递给loadModule函数的第一个参数是该模块的initData，
            //这个对象中的所有属性都会被拷贝到新模块的控制器作用域中
            //如果新模块未定义任何控制器，则initData将被无视。
            rdk['mymodule@' + scope.$moduleId].loadModule();
            scope.loaded = true;
        }

        scope.destroy = function() {
            rdk['mymodule@' + scope.$moduleId].destroyModule();
            scope.loaded = false;
        }
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