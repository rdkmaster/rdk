(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'application','rd.attributes.Scroll', 'rd.controls.BasicSelector'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'application', main];
    function main(scope,application ) {
        application.initDataSourceService(DataSourceService);
            scope.allItems = [
                { id: 0, label: "江苏省" },
                { id: 1, label: "浙江省" },
                { id: 2, label: "广东省" },
                { id: 3, label: "广西省" },
                { id: 4, label: "河北省" },
                { id: 5, label: "河南省" },
                { id: 6, label: "湖北省" },
                { id: 7, label: "湖南省" },
                { id: 8, label: "新疆省" },
                { id: 9, label: "四川省" },
                { id: 10, label: "江苏省" },
                { id: 11, label: "浙江省" },
                { id: 12, label: "广东省" },
                { id: 13, label: "广西省" },
                { id: 14, label: "河北省" },
                { id: 15, label: "河南省" },
                { id: 16, label: "湖北省" },
                { id: 17, label: "湖南省" },
                { id: 18, label: "新疆省" },
                { id: 19, label: "四川省" },
                { id: 20, label: "江苏省" },
                { id: 21, label: "浙江省" },
                { id: 22, label: "广东省" },
                { id: 23, label: "广西省" },
                { id: 24, label: "河北省" },
                { id: 25, label: "河南省" },
                { id: 26, label: "湖北省" },
                { id: 27, label: "湖南省" },
                { id: 28, label: "新疆省" },
                { id: 29, label: "四川省" },
                { id: 30, label: "江苏省" },
                { id: 31, label: "浙江省" },
                { id: 32, label: "广东省" },
                { id: 33, label: "广西省" },
                { id: 34, label: "河北省" },
                { id: 35, label: "河南省" },
                { id: 36, label: "湖北省" },
                { id: 37, label: "湖南省" },
                { id: 38, label: "新疆省" },
                { id: 39, label: "四川省" },
                { id: 40, label: "江苏省" },
                { id: 41, label: "浙江省" },
                { id: 42, label: "广东省" },
                { id: 43, label: "广西省" },
                { id: 44, label: "河北省" },
                { id: 45, label: "河南省" },
                { id: 46, label: "湖北省" },
                { id: 47, label: "湖南省" },
                { id: 48, label: "新疆省" },
                { id: 49, label: "四川省" },
                { id: 50, label: "江苏省" },
                { id: 51, label: "浙江省" },
                { id: 52, label: "广东省" },
                { id: 53, label: "广西省" },
                { id: 54, label: "河北省" },
                { id: 55, label: "河南省" },
                { id: 56, label: "湖北省" },
                { id: 57, label: "湖南省" },
                { id: 58, label: "新疆省" },
                { id: 59, label: "四川省" },
                { id: 60, label: "江苏省" },
                { id: 61, label: "浙江省" },
                { id: 62, label: "广东省" },
                { id: 63, label: "广西省" },
                { id: 64, label: "河北省" },
                { id: 65, label: "河南省" },
                { id: 66, label: "湖北省" },
                { id: 67, label: "湖南省" },
                { id: 68, label: "新疆省" },
                { id: 69, label: "四川省" },
                { id: 70, label: "江苏省" },
                { id: 71, label: "浙江省" },
                { id: 72, label: "广东省" },
                { id: 73, label: "广西省" },
                { id: 74, label: "河北省" },
                { id: 75, label: "河南省" },
                { id: 76, label: "湖北省" },
                { id: 77, label: "湖南省" },
                { id: 78, label: "新疆省" },
                { id: 79, label: "四川省" },
            ];

            scope.selectedItems = [
                { id: 3, label: "广西省" },
                { id: 7, label: "湖南省" },
                { id: 4, label: "河北省" }
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