(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'angular', 'rd.containers.Accordion'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
scope.buttonSource = [{
            icon: "/doc/client/demo/containers/accordion/img/edit.png",
            label: "编辑",
            tooltips: "点击可进行编辑",
            callback: function(obj, htmlID) {
                alert("点击了编辑按钮！");
            }
        }, {
            icon: "/doc/client/demo/containers/accordion/img/delete.png",
            label: "删除",
            tooltips: "点击将删除内容",
            callback: function(obj) {
                alert("点击了删除按钮！");
            }
        }, {
            callback: function(obj) {
                alert("这你都可以看到！");
            }
        }];

        scope.foldedIcon = "fa fa-angle-double-down";
        scope.unfoldedIcon = "fa fa-angle-double-up";
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