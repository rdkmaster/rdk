(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.containers.Tab', 'rd.controls.BasicSelector', 'base/template/tab'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', 'EventTypes', main];
    function main(scope, EventService, EventTypes) {
        var initData = {title: 'my title', showCloseButton: false, awesomeData: [{label: "江苏省"}, {label: "浙江省"}]};
        scope.clickHandler = function(){
            rdk.tabID.addTab('template/tab.html', 'tabController', initData);
        }

        scope.cityItems = [{label: "江苏省"}, {label: "浙江省"}, {label: "河南省"}, {label: "湖北省"}];
        scope.selectedItems = [{label: "江苏省"}];
        scope.rdkSelector = "Selector控件";
        /*各控件公用的变量定义在appScope上*/
        scope.allItems = [{label: "江苏省"}, {label: "浙江省"}, {label: "河南省"}, {label: "湖北省"}];

        EventService.register('tabID', EventTypes.CLOSE, function(event, data){
            rdk.tabID.destroyTab(data.tabIndex);
            // rdk.tabID.closeTab(data.tabIndex);
        });

        scope.closeHandler = function(event, data){
            var closeTabIndex = data.tabIndex;
        }

        scope.changeHandler = function() {
            var res = '';
            angular.forEach(scope.selectedItems, function(item, key) {
                res += item.label + ' ';
            });
            alert('选中了 "' + res + '"');                
        }
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