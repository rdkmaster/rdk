define('main', ['rd.services.Alert'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.services.Alert']);
    // 创建一个控制器
    app.controller('rdk_ctrl', ['$scope', 'Alert', 'ButtonTypes', function(scope, Alert, ButtonTypes) {
        scope.clickHandler = function() {
            Alert.scope = scope;
            Alert.warn('发生警告请注意', '警告提示', ButtonTypes.OK, callbackHandler);
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
