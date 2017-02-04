(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Module', 'rd.services.PopupService', 'base/module-controller'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'PopupService', main];
    function main(scope, PopupService) {
        var moduleID;

        scope.load = function(){
            var sampleDiv = 
            '<div controller="SampleModuleController" caption="弹出框标题" icon="<i class=\'fa fa-windows\'></i>" style="border:1px solid red; margin:6px; padding:6px">\
                <p>这是模块的初始化数据：{{myData}}</p>\
                <p>这是模块控制预定义的数据：{{someData}}</p>\
                <button ng-click="destroyHandler()">确认</button>\
            </div>';

            var initData = {myData: 'load module manually...'};
            moduleID = PopupService.popup(sampleDiv, initData);
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