define('main', ['rd.controls.Graph'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Graph']);

app.config(['RdkGraphProvider', function(RdkGraphProvider) {
    RdkGraphProvider.setTheme("/demo/controls/graph/theme/scripts/theme/theme.js");
}]);


// 创建一个控制器
app.controller('myCtrl', ['$scope','EventService', function(scope, EventService) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
    scope.graphData = {
        rowDescriptor: ['最高气温', '最低气温'],
        header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data: [
            [11, 13, 15, 18, 15, 12, 10],
            [1, 4, 6, 4, 9, 6, 3]
        ]
    };
    
}

]);
});
