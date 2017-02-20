(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.containers.Panel', 'rd.controls.Table', 'rd.controls.BasicSelector',
        'rd.containers.Tab','rd.services.Alert'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService','EventTypes', 'Alert', main];
    function main(scope,EventService,EventTypes,Alert) {
        scope.cityItems = [{
                label: "江苏省"
            }, {
                label: "浙江省"
            }, {
                label: "河南省"
            }, {
                label: "湖北省"
            }];

        scope.selectedItems = [{
            label: "江苏省"
        }];

        scope.rdkSelector = "Selector控件";

        EventService.register('tabID', EventTypes.CLOSE, function(event, data){
            var result = confirm('是否关闭Tab页');
            if(result){
                rdk.tabID.destroyTab(data.tabIndex);
                // rdk.tabID.closeTab(data.tabIndex);
            }
        });
            
        scope.handle_beforeclose = function() {
            Alert.confirm('是否确定关闭窗口？', '确认提示', ButtonTypes.YES + ButtonTypes.NO + ButtonTypes.CANCEL, callbackHandler, true);

            function callbackHandler(val) {
                if (val == ButtonTypes.YES) {
                    EventService.broadcast('topModal', 'hide');
                    EventService.broadcast('panel', EventTypes.CLOSE); //事件  
                }
            }

        }

        scope.data = {};
        scope.data.header = ["姓名", "职位", "薪资", "入职日期", "部门", "其他"];
        scope.data.field = ["name", "position", "salary", "start_date", "office", "extn"];
        scope.data.data = [
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