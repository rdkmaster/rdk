define('main', ['application','rd.controls.Scroll'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Scroll']);
// 创建一个控制器
    app.config(function($scrollProvider){
        //配置统一的滚动条风格
        $scrollProvider.setOptions(
            {
                cursorcolor: "#008fd4",//改变滚动条颜色，使用16进制颜色值
                cursoropacitymax: 1, //当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
                cursorwidth: "6px", //滚动条的宽度，单位：便素
                cursorborder: "1px solid #fff", //   CSS方式定义滚动条边框
                cursorborderradius: "5px",//滚动条圆角
                autohidemode: false //隐藏滚动条的方式
            }
        )
    })
    app.controller('myCtrl', ['$scope', 'DataSourceService', function (scope,DataSourceService) {
        /************************ panel demo test data start ************************/
        application.initDataSourceService(DataSourceService);

    }]);

});

