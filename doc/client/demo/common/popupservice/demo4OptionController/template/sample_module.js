define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('templateController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        console.log('templateController is running..........');
        scope.someData = 'some data defined in the templateController...';
        scope.myData = 'templateController inner Data...';

        scope.destroyHandler = function(){
            PopupService.removePopup(scope.$moduleId);
        }
    }]);
});
