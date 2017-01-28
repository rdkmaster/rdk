(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.BasicSelector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', 'EventTypes', 'BasicSelector', main];
    function main(scope, EventService, EventTypes, BasicSelector) {
        scope.changeHandler = function(event, data) {
            console.log('changeHandler..........');
        }

        scope.selectAll = function() {
            EventService.broadcast('id_selector', EventTypes.SELECT, "all");
        }

        scope.clearSelected = function() {
            EventService.broadcast('id_selector', EventTypes.SELECT);
        }

        scope.getSelected = function() {
            var res = '';
            res = BasicSelector.selected2string(scope.selectedItems, 'label', ';');
            alert('选中了 "' + res + '"');
        }

        scope.allItems = [{
            label: "江苏省"
        }, {
            label: "浙江省"
        }, {
            label: "广东省"
        }, {
            label: "广西省"
        }, {
            label: "河北省"
        }, {
            label: "河南省"
        }, {
            label: "湖北省"
        }, {
            label: "湖南省"
        }, {
            label: "新疆省"
        }, {
            label: "四川省"
        }];

        scope.selectedItems = [{
            label: "广西省"
        }, {
            label: "湖南省"
        }, {
            label: "河北省"
        }];
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