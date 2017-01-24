(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'angular', 'rd.containers.Accordion', 'rd.controls.BasicSelector'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope',  main];
    function main(scope) {
        scope.cityItems = [{ id: 0, label: "江苏省" }, 
                            { id: 1, label: "浙江省" }, 
                            { id: 2, label: "河南省" }, 
                            { id: 3, label: "湖北省" },
                            { id: 4, label: "新疆省" }, 
                            { id: 5, label: "江西省" }, 
                            { id: 6, label: "河北省" }, 
                            { id: 7, label: "湖南省" }];

        scope.itemArr = [
        {
            caption: 'test_1',
            open: true,
            frozen: false,
            cityItems: scope.cityItems
        },
        {
            caption: 'test_2',
            open: false,
            frozen: true,
            cityItems: []
        }
        ];

        scope.change = function(empty){
            if(empty){
                scope.itemArr = [
                {
                    caption: 'test_1',
                    open: false,
                    frozen: true,
                    cityItems: []
                },
                {
                    caption: 'test_2',
                    open: false,
                    frozen: true,
                    cityItems: []
                }
                ];                
            } 
            else{
                scope.itemArr = [
                {
                    caption: 'test_1',
                    open: true,
                    frozen: false,
                    cityItems: scope.cityItems
                },
                {
                    caption: 'test_2',
                    open: true,
                    frozen: false,
                    cityItems: scope.cityItems
                }
                ];                  
            }

        }
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