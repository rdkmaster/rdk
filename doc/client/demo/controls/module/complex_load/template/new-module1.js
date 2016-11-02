
define([], function() {
    //创建一个子控制器
    rdk.$app.controller('NewModuleController1', ['$scope', function(scope) {
        console.log('new-module1 controller is running..........');
        scope.someData = 'some data defined in the new-module1 controller...';
    }]);
});
