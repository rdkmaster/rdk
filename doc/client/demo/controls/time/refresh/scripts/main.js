define('main', ['rd.controls.Time'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Time']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
		$scope.showGranularity = {
        value: ['now-2h','now'],
        granularity: "quarter",
        startDate:"2016-11-01",
        endDate:"now",
        selectGranularity: true,
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
            label: "月",
            value: "month"
        }]
		}
    }]);
});
