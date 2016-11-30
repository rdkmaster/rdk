
require.config({
    paths: {

    }
});

define('main', ['rd.controls.Module', 'rd.services.PopupService'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.PopupService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'PopupService', function(scope, Utils, $compile, PopupService) {
        
        var moduleID;

        scope.load = function(){
            var sampleDiv = 
            '<div controller="SampleModuleController" caption="弹出框标题" icon="<i class=\'fa fa-windows\'></i>" style="border:1px solid red; margin:6px; padding:6px">\
                <p>这是模块的初始化数据：{{myData}}</p>\
                <p>这是模块控制预定义的数据：{{someData}}</p>\
                <button ng-click="destroyHandler()">确认</button>\
            </div>';

            var initData = {myData: 'load module manually...'};
            moduleID = PopupService.popup(sampleDiv, initData);
        }
    }]);

    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        console.log('SampleModule controller is running..........');
        scope.someData = 'some data defined in the SampleModule controller...';
        scope.myData = 'sample inter load module manually...';

        scope.destroyHandler = function(){
            PopupService.removePopup(scope.$moduleId);
        }
    }]);

});
