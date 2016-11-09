
define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('NewModuleController2', ['$scope', function(scope) {
        console.log('new-module2 controller is running..........');
        scope.someData = 'some data defined in the new-module2 controller...';
    }]);
});
