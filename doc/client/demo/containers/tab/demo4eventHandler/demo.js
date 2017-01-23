(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'angular', 'jquery', 'rd.containers.Tab', 'rd.controls.BasicSelector', 'rd.controls.ProgressBar'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope',  main];
    function main(scope ) {
scope.allItems = [{label: "江苏省"}, {label: "浙江省"}, {label: "河南省"}, {label: "湖北省"}];

        var initData = {title: 'my title', showCloseButton: true, awesomeData: [{label: "江苏省"}, {label: "浙江省"}]};
        scope.clickHandler = function(){
            rdk.tabID.addTab('./scripts/template/tab.html', 'tabController', initData);
        }

        scope.closeHandler = function(event, data){
            var closeTabIndex = data.tabIndex;
            rdk.tabID.destroyTab(closeTabIndex);
            // rdk.tabID.closeTab(closeTabIndex);
        }

        scope.changeHandler = function(event, data){
            var currentSelectedIndex = data;
            alert('切换到第' + (currentSelectedIndex+1) + '个tab页');
        } 

        scope.addHandler = function(event, data){
            alert('成功新增tab页');
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