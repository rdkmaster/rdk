
require.config({
    paths: {
        //给sample_module的控制器url定义一个别名
        "sample_module": '/doc/client/demo/common/popupservice/demo4PopupAlert/template/sample_module'
    }
});

define('main', ['rd.controls.Module', 'rd.services.PopupService', 'rd.services.Alert', 'sample_module'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.PopupService', 'rd.services.Alert']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'PopupService', 'Alert', 'ButtonTypes', 
        function(scope, Utils, $compile, PopupService, Alert, ButtonTypes) {
        
        var moduleID;

        scope.load = function(){
            var sampleUrl = '/doc/client/demo/common/popupservice/demo4PopupAlert/template/sample_module.html';
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
    }]);
});
