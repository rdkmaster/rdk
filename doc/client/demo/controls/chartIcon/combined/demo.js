(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.controls.ChartIcon', 'css!base/style'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.setting = {
            "columnDefs": [
                {
                    title: "",
                    render: '<a style="cursor:pointer" ng-click="appScope.click(item)">点击</a>'
                }, {
                    title: "Ratio",
                    targets: 0,
                    override: false,
                    render: function (item) {
                        return '<rdk-chart-icon chart-type="pie"  data="item.FailureRatio"></rdk-chart-icon>'
                    }
                }
                , {
                    title: "line",
                    targets: 1,
                    override: false,
                    render: function (item) {
                        item.chartData=item.FailureNumber.toString().split('');
                        return '<rdk-chart-icon chart-type="line"  data="item.chartData"></rdk-chart-icon>'
                    }
                }
                , {
                    title: "bar",
                    targets: 2,
                    override: false,
                    render: function (item) {
                        item.chartData=item.FailureNumber.toString().split('');
                        return '<rdk-chart-icon chart-type="bar"  data="item.chartData"></rdk-chart-icon>'
                    }
                }
                , {
                    title: "All Frequency",
                    targets: 3,
                    override: true,
                    render: function (item) {
                        return '<a class="frequency" ng-click="appScope.click(item)">{{item.TargetFrequency}}</a>'
                    }
                }
            ]
        }

        scope.click = function (item) {
            scope.data.data = [
                ["All Frequency", "3454", "100%"],
                ["Frequency 1", "565", "35%"],
                ["Frequency 2", "614", "75%"],
                ["Frequency 3", "289", "25%"],
                ["Frequency 4", "651", "65%"],
                ["Frequency 5", "344", "95%"]
            ]
        }
        scope.option = {
            delimiter: null,
            fill: ["#99B293", "#D6D6D6"],
            height: null,
            radius: 18,
            width: null
        }
        scope.data = {
            "field": [
                "TargetFrequency",
                "FailureNumber",
                "FailureRatio"
            ],
            "header": [
                "Target Frequency",
                "Failure Number",
                "Failure Ratio(%)"
            ],
            "data": [
                [
                    "All Frequency",
                    "2654",
                    "100%"
                ],
                [
                    "Frequency 1",
                    "265",
                    "15%"
                ],
                [
                    "Frequency 2",
                    "64",
                    "5%"
                ],
                [
                    "Frequency 3",
                    "891",
                    "35%"
                ],
                [
                    "Frequency 4",
                    "981",
                    "45%"
                ],
                [
                    "Frequency 5",
                    "333",
                    "25%"
                ]
            ]
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();