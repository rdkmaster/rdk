(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Table'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope',main];
    function main($scope) {
        // $scope.setting = {
        //     scrollX: true
        // } 

        $scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    sortas: "string",
                    sortable: true
                },{
                    targets : "extn",
                    sortable: true,
                    sortas: "int",
                    sort: function(a, b){
                        if(parseInt(a, 10) < parseInt(b, 10)){
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                },{
                    targets : 3,
                    sortas: "date",
                    sortable: true
                }

            ]
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