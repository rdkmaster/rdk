define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        scope.someData = 'sample controller some data';
        scope.myData = 'sample controller my data';

        scope.destroyHandler = function(){
        	PopupService.removePopup(scope.$moduleId);
        }
    }]);
});
