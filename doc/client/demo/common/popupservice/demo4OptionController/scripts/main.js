
require.config({
    paths: {
        //给sample_module的控制器url定义一个别名
        "sample_module": '/doc/client/demo/common/popupservice/demo4OptionController/template/sample_module'
    }
});

define('main', ['rd.controls.Module', 'rd.services.PopupService', 'sample_module'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.PopupService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'PopupService', function(scope, Utils, $compile, PopupService) {
        
        var moduleID;

        scope.load = function(){
            var sampleUrl = '/doc/client/demo/common/popupservice/demo4OptionController/template/sample_module.html';
            var initData = {myData: 'load module manually...'};
            var option = {
                controller: 'templateController'
            };
            moduleID = PopupService.popup(sampleUrl, initData, option);
        }
    }]);

    rdk.$ngModule.controller('templateController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        console.log('templateController is running..........');
        scope.someData = 'some data defined in the templateController...';
        scope.myData = 'templateController inner Data...';

        scope.destroyHandler = function(){
            PopupService.removePopup(scope.$moduleId);
        }
    }]);

});
