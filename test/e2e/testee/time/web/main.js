define('main', ['rd.controls.Time', 'rd.controls.Scroller'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Time', 'rd.controls.Scroller']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', '$timeout', function(scope, $timeout) {
        scope.data = [{
                src: '/doc/client/demo/controls/scroller/basic/img/img1.png',
                title: 'Pic 1',
                showGranularity: {

                    value: ['2016-11-01', '2016-11-15'],
                    granularity: "quarter",
                    startDate: "2016-11-01",
                    endDate: "now",
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
            }, {
                src: '/doc/client/demo/controls/scroller/basic/img/img2.jpg',
                title: 'Pic 2',
                showGranularity: {

                    value: ['2016-11-01', '2016-11-15'],
                    granularity: "quarter",
                    startDate: "2016-11-01",
                    endDate: "now",
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
            }, {
                src: '/doc/client/demo/controls/scroller/basic/img/img3.jpg',
                title: 'Pic 3',
                showGranularity: {

                    value: ['2016-11-01', '2016-11-15'],
                    granularity: "quarter",
                    startDate: "2016-11-01",
                    endDate: "now",
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
            },

            {
                src: '/doc/client/demo/controls/scroller/basic/img/img5.png',
                title: 'Pic 5',
                showGranularity: {

                    value: ['2010-01-01 00:00', '2016-11-15 00:00'],
                    granularity: "quarter",
                    startDate: "2010-01-01 00:00",
                    endDate: "now",
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
            }
        ];
    }]);
});
