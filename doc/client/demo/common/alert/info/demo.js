(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.services.Alert'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'Alert', 'ButtonTypes', main];
    function main(scope, Alert, ButtonTypes) {
        
        scope.clickHandler = function() {
            Alert.info('提示信息请注意', '信息提示', ButtonTypes.OK, callbackHandler);
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
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();