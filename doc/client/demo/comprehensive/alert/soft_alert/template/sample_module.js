define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        scope.funCancel = function(){
            alert('What you choose is Cancel')
        	PopupService.removePopup(scope.$moduleId);
        }
        scope.funDelete = function(){
            alert('What you choose is Delete')
            PopupService.removePopup(scope.$moduleId);
        }
    }]);
});
