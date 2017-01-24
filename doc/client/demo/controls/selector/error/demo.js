(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Selector'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.groupData = {
                "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
                "title2": [{ id: 2, label: "广东省" }, { id: 3, label: "广西省" },
                           { id: 4, label: "河北省" }, { id: 5, label: "河南省" }]
            };

            scope.groupSelectedItems = {
                "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
                "title2": [{ id: 2, label: "广东省" }]
            };


            scope.raiseErrorAct = function(event, info) {
                var errorCode = info.code;
                var errorMsg = '';
                if (errorCode == 101) {
                    errorMsg = '【自定义error】选择条目不可为空！';
                } else if (errorCode == 102) {
                    errorMsg = '【自定义error】至少选择2条信息！';
                } else {
                    errorMsg = '【自定义error】其它异常！';
                }
                console.log('异常码:' + info.code + ';\n自定义异常信息：' + errorMsg + ';\n控件返回异常信息：' + info.message);
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