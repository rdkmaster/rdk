define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        console.log('SampleModule controller is running..........');
        scope.someData = 'some data defined in the SampleModule controller...';
        scope.myData = 'sample inter load module manually...';

        scope.destroyHandler = function(){
            PopupService.removePopup(scope.$moduleId);
        }
    }]);
});
