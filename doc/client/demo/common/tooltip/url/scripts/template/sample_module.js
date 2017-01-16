define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'EventService', function(scope, Utils, EventService) {
        console.log('SampleModule controller is running..........');
        //只有定义在this上的属性才能发布给外部。
        scope.someData = 'yes or no';
        scope.myData = 'tooltips';

        scope.yesHandler = function(){
        	EventService.broadcast('test4confirm', 'yes');
        }

        scope.noHandler = function(){
            EventService.broadcast('test4confirm', 'no');
        }
    }]);
});
