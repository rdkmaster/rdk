
require.config({
    paths: {
        //给sample_module的控制器url定义一个别名
        "sample_module": '/doc/client/demo/common/popupservice/demo4loadModule/template/sample_module'
    }
});

define('main', ['rd.controls.Module', 'rd.services.PopupService', 'sample_module'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.PopupService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'PopupService', function(scope, Utils, $compile, PopupService) {
        
        var moduleID;

        scope.load = function(){
            var sampleUrl = '/doc/client/demo/common/popupservice/demo4loadModule/template/sample_module.html';
            var initData = {myData: 'load module manually...'};
            moduleID = PopupService.popup(sampleUrl, initData, false, 'explode');
        }

        // scope.destroyHandler = function(){
        //     PopupService.removePopup(moduleID);
        // }
    }]);
});
