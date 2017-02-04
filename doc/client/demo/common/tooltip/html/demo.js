(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.attributes.Tooltip', 'rd.controls.Button'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.content = "<div><h5>嵌入按钮</h5> \
            <rdk_button id='yes' click=\"clickHandler\" label='是'></rdk_button>\
            <rdk_button id='no' click='clickHandler' label='否'></rdk_button></div>"

        scope.clickHandler = function(event, data){
            alert(event.dispatcher);
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