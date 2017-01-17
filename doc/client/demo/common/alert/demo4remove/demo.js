(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.services.Alert'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'Alert', 'ButtonTypes', 'EventService', 'EventTypes', main];
    function main(scope, Alert, ButtonTypes, EventService, EventTypes) {
        var moduleID;
        
        scope.clickHandler = function() {
            moduleID = Alert.confirm('信息确认请注意', '确认提示', ButtonTypes.YES + ButtonTypes.NO + ButtonTypes.CANCEL, callbackHandler, false);
        }

        EventService.register(moduleID, EventTypes.CLOSE, function(event, data){
            alert('call close');
        });

        scope.removeHandler = function(){
            Alert.remove(moduleID);
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