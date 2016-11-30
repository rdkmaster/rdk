
require.config({
    paths: {
        //给sample_module的控制器url定义一个别名
        "sample_module": '/doc/client/demo/common/popupservice/demo4OptionPosition/template/sample_module'
    }
});

define('main', ['rd.controls.Module', 'rd.services.PopupService', 'sample_module'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.PopupService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'PopupService', function(scope, Utils, $compile, PopupService) {
        
        var moduleID;

        scope.load = function(){
            var sampleUrl = '/doc/client/demo/common/popupservice/demo4OptionPosition/template/sample_module.html';
            var initData = {myData: 'load module manually...'};
            var myOption = {
                modal: false,
                effect: 'explode',
                // left: 100,
                // top: 100
                right: 100,
                bottom: 100
            }
            moduleID = PopupService.popup(sampleUrl, initData, myOption);
        }

        // scope.destroyHandler = function(){
        //     PopupService.removePopup(moduleID);
        // }
    }]);
});
