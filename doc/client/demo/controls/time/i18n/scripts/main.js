define('main', ['i18n','rd.controls.Time'], function(i18n) {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Time']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
    	i18n.$init(scope);
        scope.i18Set = {
            value: "2015-01-01",
            selectGranularity: true,
            granularity: "week",
            weekStart :1, // 0（星期日）到6（星期六）
            granularityItems: [{
                label: i18n.quarter,
                value: "quarter"
            }, {
                label: i18n.hour,
                value: "hour"
            }, {
                label: i18n.date,
                value: "date"
            }, {
                label: i18n.week,
                value: "week"
            },{
                label: i18n.month,
                value: "month"
            }]
        }
    }]);
});
