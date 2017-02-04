define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'NotifyService',function(scope, Utils, NotifyService) {
        console.log('SampleModule controller is running..........');
        //只有定义在this上的属性才能发布给外部。
        scope.someData = 'some data defined in the SampleModule controller...';
        scope.myData = 'sample inter load module manually...';

        scope.destroyHandler = function(){
            NotifyService.removeNotify(scope.$moduleId);
        }
    }]);
});
