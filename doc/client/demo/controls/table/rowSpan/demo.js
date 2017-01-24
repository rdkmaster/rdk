(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Table'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope,EventService,EventTypes ) {
        scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    group : true,
                    editable : true
                },{
                    targets : "position",
                    group : function(rowspans,filedName,filterData,target){
                        console.log(rowspans);
                        console.log(filedName);
                        console.log(filterData);
                        return rowspans;
                    }
                },{
                    targets : "salary",
                    group : true,
                    editable : true
                }, {
                    targets : 3,
                    editable : true
                }
            ]
        }


        EventService.register('test', EventTypes.CHANGE, function(event, data){
            scope.changeData = data;
            console.log(data);
        });

        scope.data = {};
        scope.data.header = ["姓名", "职位", "薪资", "入职日期", "部门", "其他"];
        scope.data.field = ["name", "position", "salary", "start_date", "office", "extn"];
        scope.data.data = [
            [
                "Tiger Nixon",
                "System Architect",
                "$320,900",
                "2011/04/25",
                "Edinburgh",
                "5421"
            ],
            [
                "Tiger Nixon",
                "System Architect",
                "$320,800",
                "2011/06/25",
                "Edinburgh1",
                "54211"
            ],
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
            ],[
                "Garrett Winters",
                "Accountant",
                "$170,750",
                "2011/06/25",
                "Tokyo1",
                "84221"
            ]
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