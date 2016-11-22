
require.config({
    paths: {
        //给sample_module的控制器url定义一个别名
        "sample_module": '/doc/client/demo/common/popupservice/demo4loadModule/template/sample_module'
    }
});

define('main', ['rd.controls.Module', 'rd.services.PopupService', 'sample_module'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.PopupService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'PopupService', function(scope, Utils, $compile, PopupService) {

        PopupService.scope = scope;

        scope.sampleUrl = '/doc/client/demo/common/popupservice/demo4loadModule/template/sample_module.html'

        scope.load = function(){
            var moduleUrl = '/doc/client/demo/common/popupservice/demo4loadModule/template/main_module.html';
            var initData = {myData: 'load module manually...'};
            scope.moduleID = PopupService.popup(moduleUrl, initData, false);
        }

        scope.destroyHandler = function(){
            PopupService.removePopup(scope.moduleID);
        }
    }]);
});
