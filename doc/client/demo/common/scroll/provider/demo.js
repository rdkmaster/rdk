(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.attributes.Scroll', 'css!base/style'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
    }

    rdk.$ngModule.config(['ScrollConfigProvider',function(ScrollConfigProvider){
        ScrollConfigProvider.setOptions(
            {
                wheelSpeed:0.5, //鼠标滚轮移动滚动条的速度
                minScrollbarLength:100, //滚动条最小长度
                maxScrollbarLength:280, //滚动条最大长度
                theme:"test" //主题
            }
        );
    }]);

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