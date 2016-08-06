define('main', ['rd.controls.Bullet'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Bullet']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
        $scope.inputScales = [ 20, 40, 68, 89 ];
        $scope.step = 1;
        $scope.sliderStyles = [
                    {color:'red',label:'警告',position:'down'},
                    {color:'green',label:'轻微',position:'up'},
                    {color:'blue',label:'严重',position:'up'},
                    {color:'gray',label:'致命',position:'up'},
        ];


        $scope.changeStepSize = function(){
        	 $scope.step = 0.5;
        }
    }]);
});
