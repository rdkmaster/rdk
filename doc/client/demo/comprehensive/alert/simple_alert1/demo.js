(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.services.Alert', 'css!base/css/simple_alert1'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'Alert', 'ButtonTypes', main];
    function main(scope, Alert, ButtonTypes) {
        scope.clickHandler = function() {
            Alert.confirm('信息确认请注意认请注意认请注意认请注意认请注意认请注意认请注意认请注意', '确认提示',  ButtonTypes.NO + ButtonTypes.YES , callbackHandler);
        }

        function callbackHandler(val) {
            if (val == ButtonTypes.YES) {
                alert('call back YES');
            }
            if (val == ButtonTypes.NO) {
                alert('call back NO');
            }
            if (val == ButtonTypes.OK) {
                alert('call back OK');
            }
            if (val == ButtonTypes.CANCEL) {
                alert('call back CANCEL');
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