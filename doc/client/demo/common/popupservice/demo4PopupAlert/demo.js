(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Module', 'rd.services.PopupService', 'rd.services.Alert', 'base/template/sample_module'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'PopupService','Alert', main];
    function main(scope,PopupService,Alert) {
        var moduleID;

        scope.load = function(){
            var sampleUrl = 'template/sample_module.html';
            var initData = {myData: 'load module manually...'};
            var myOption = {
                effect: 'explode',
                x: 100,
                y: 100
            }
            moduleID = PopupService.popup(sampleUrl, initData, myOption);
        }

        scope.destroyHandler = function(){
            Alert.scope = scope;
            Alert.confirm('信息确认请注意', '确认提示', ButtonTypes.YES, callbackHandler);
        }

        function callbackHandler(val) {
            if (val == ButtonTypes.YES) {
                PopupService.removePopup(moduleID);
            }
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