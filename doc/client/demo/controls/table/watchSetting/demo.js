(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Table'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService','EventTypes','$timeout', main];
    function main($scope,EventService,EventTypes,$timeout ) {
        $scope.data = {};
        $scope.data.header = ["姓名", "职位", "薪资", "入职日期", "部门", "其他"];
        $scope.data.field = ["name", "position", "salary", "start_date", "office", "extn"];
        $scope.data.data = [
            [
                "Tiger Nixon",
                "System Architect",
                "$320,800",
                "2011/04/25",
                "Edinburgh",
                "5421"
            ],
            [
                "Garrett Winters",
                "Accountant",
                "$170,750",
                "2011/07/25",
                "Tokyo",
                "8422"
            ]
        ];

        $scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    editable : false
                },
                {
                    targets : 2,
                    editable : true
                }
            ]
        }

        $timeout(function(){
            $scope.setting.columnDefs[0].editable = true;
        }, 3000);

        EventService.register('testID', EventTypes.CHANGE, function(event, data){
            if($scope.data.data[data.rowIndex][data.columnIndex] == data.oldValue){
                $scope.data.data[data.rowIndex][data.columnIndex] = data.newValue;
            }
            
        });
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