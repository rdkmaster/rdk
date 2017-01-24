(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Table', 'rd.services.Alert'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope,EventService,EventTypes ) {
        scope.sortClick = function(){
            scope.setting = {
                "columnDefs" :[
                    {
                        targets :0,
                        visible : false//隐藏原数据的第一列
                    },
                    {
                        targets :1,
                        sortable : true//排序原数据的第二列
                    }
                ]
            }
        }

        EventService.register('table', EventTypes.CHECK, function(event, data){
            var selectedData = data.data;
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