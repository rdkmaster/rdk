(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.containers.Tab', 'base/template/tab'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', 'EventTypes', main];
    function main(scope, EventService, EventTypes) {
        /*单独模板相关变量另外给*/
        var initData = {title: 'my title', showCloseButton: true};
        scope.clickHandler = function(){
            rdk.tabID.addTab('template/tab.html', 'tabController', initData);
        }

        scope.closeHandler = function(event, data){
            var closeTabIndex = data.tabIndex;
        }

        EventService.register('tabID', EventTypes.CLOSE, function(event, data){
            rdk.tabID.destroyTab(data.tabIndex);
            // rdk.tabID.closeTab(data.tabIndex);
        }); 
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