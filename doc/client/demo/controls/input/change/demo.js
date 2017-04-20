(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Input'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService','EventTypes',main];
    function main(scope,EventService,EventTypes) {
        scope.age = 33;
        EventService.register('myInput', EventTypes.CHANGE, function(event, data) {//处理被选中的数据
            alert('changeHandler 填写的内容是 '+ data);
        })
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