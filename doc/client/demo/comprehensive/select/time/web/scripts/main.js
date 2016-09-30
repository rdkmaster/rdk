define('main', ['rd.controls.Time'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Time']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
        scope.gap = {
            value: ['2016-03-04 14:00', '2016-03-04 16:00'],
            selectGranularity: true,
            granularity: "date",
            label:'',
            granularityItems: [{
                label: "15分钟",
                value: "quarter",
                gap: "inweek"
            }, {
                label: "小时",
                value: "hour",
                gap: "2d"
            }, {
                label: "天",
                value: "date",
                gap: "inmonth"
            }, {
                label: "周",
                value: "week",
                gap: "inmonth"
            },{
                label: "月",
                value: "month",
                gap: "inyear"
            }]
        }
        var b=$('option');
        console.log(b);
        scope.gap1 = {
            value: "now - 2y", //支持y/m/w/d
            granularity: "date"
        }
         scope.gap2 = {
            value: '2016-03-04 14:00',
            selectGranularity: true,
            granularity: "hour",
            label:'',
            granularityItems: [{
                label: "15分钟",
                value: "quarter",
                gap: "inweek"
            }, {
                label: "小时",
                value: "hour",
                gap: "2d"
            }, {
                label: "天",
                value: "date",
                gap: "inmonth"
            }, {
                label: "周",
                value: "week",
                gap: "inmonth"
            },{
                label: "月",
                value: "month",
                gap: "inyear"
            }]
        }
         scope.gap3 = {
            value: "now - 2y", //支持y/m/w/d
            granularity: "quarter"
        }   
    }]);
});