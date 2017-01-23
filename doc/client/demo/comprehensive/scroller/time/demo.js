(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Time', 'rd.controls.Scroller'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope',main];
    function main(scope) {
        scope.data = [{
                src: 'img/img1.png',
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
                src: 'img/img2.jpg',
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
                src: 'img/img3.jpg',
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
                src: 'img/img5.png',
                title: 'Pic 5',
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
            }
        ];
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();