define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        console.log('SampleModule controller is running..........');
        //只有定义在this上的属性才能发布给外部。
        scope.someData = 'some data defined in the SampleModule controller...';

        scope.destroyHandler = function(){
        	PopupService.removePopup(scope.$moduleId);
        }
    }]);
});
