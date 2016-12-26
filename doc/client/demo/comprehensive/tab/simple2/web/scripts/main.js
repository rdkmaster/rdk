define('main', ['rd.controls.Table','rd.containers.Panel'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core','rd.containers.Panel']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {

         $scope.setting = {
            "columnDefs" :[
                {
                    title : "操作",
                    render : '<i class="iconfont iconfont-tab"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont iconfont-line"></i>'
                }
            ]
        }
        function  imagePosition(){
            var width = parseFloat($('.hao').css('width'));
            var height = parseFloat($('.hao').css('height'));//恨据外围 div的长宽给图标自动定位
            $('button.images_right').css({
                'left':(width-1)+"px",
                'top':(height/2-32-100)+"px"
            });
        }
        imagePosition();
        //左右拉的点击动漫效果
        $scope.iconCondition = true;
        $scope.images = function(){
            $scope.iconCondition =!$scope.iconCondition;
            if($('.hao').hasClass('images_down')){
                $('.hao').removeClass('images_down').addClass('images_up');
            }else{
                $('.hao').removeClass('images_up').addClass('images_down')
            }
        }
    }]);
});
