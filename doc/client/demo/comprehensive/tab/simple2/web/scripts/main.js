define('main', ['rd.controls.Table','rd.containers.Panel'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core','rd.containers.Panel']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
        
        // $scope.conditionProcessor = function(condition){
        //   var condition = {};
        //   condition.aaa = "bbb";
      
        //   return condition;
        // }

        // $scope.tableProcessor = function(baseCondition,additionalCondition){
        //     baseCondition.paging = additionalCondition.paging;
        //     return baseCondition;
        // }
         $scope.setting = {
            "columnDefs" :[
                {
                    title : "操作",
                    render : '<img src="images/tab.png">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/line.png">'
                }
            ]
        }
        var divWidth = parseFloat($('.hao').css('width'));
        var divHeight = parseFloat($('.hao').css('height'));//恨据外围 div的长宽给图标定位在其右边中间
        var spanHeight = parseFloat($('.images_right').css('width'))
        var borderWidth = parseFloat($('.hao').css('borderWidth'))
        $('span.images_right').css({
            'left':divWidth-borderWidth*2 + "px",
            'top':(divHeight/2-spanHeight)+"px"
        });
        //左右拉的点击动漫效果
         $scope.images = function(){
            if($('.hao').hasClass('images_down')){
                $('.hao').removeClass('images_down').addClass('images_up');
                $('span.images_right').addClass('images_left')
            }else{
                $('.hao').removeClass('images_up','images_left').addClass('images_down')
                $('span.images_right').removeClass('images_left')
            }
        }
       
    }]);
});
