define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
            $('.selectpicker').selectpicker();
            $('.content>ul>li:nth-child(2)>i').click(function(){
                $(this).css({'background': '#41addc',
                    'color': '#fff'}).siblings('i').css({'background': '#fff',
                    'color': '#999'})
            });
        scope.destroyHandler = function(){
            PopupService.removePopup(scope.$moduleId);
        }
    }]);
});

