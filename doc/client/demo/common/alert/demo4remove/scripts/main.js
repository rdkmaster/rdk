define('main', ['rd.services.Alert'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.services.Alert']);
    // 创建一个控制器
    app.controller('rdk_ctrl', ['$scope', 'Alert', 'ButtonTypes', 'EventService', 'EventTypes', function(scope, Alert, ButtonTypes, EventService, EventTypes) {

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
    }]);
});
