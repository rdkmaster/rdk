define('main', ['rd.controls.Time'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Time']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
        scope.weekStart = {
            value: "2015-01-01",
            selectGranularity: true,
            granularity: "week",
            weekStart :1, // 0（星期日）到6（星期六）
            granularityItems: [{
                label: "15分钟",
                value: "quarter"
            }, {
                label: "小时",
                value: "hour"
            }, {
                label: "天",
                value: "date"
            }, {
                label: "周",
                value: "week"
            },{
                label: "月",
                value: "month"
            }]
        }
    }]);
});
