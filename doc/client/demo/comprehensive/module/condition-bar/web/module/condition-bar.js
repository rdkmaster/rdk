(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'ConditionBarController';

    //参考 main.js 中同名变量的说明
    var imports = [
        'rd.controls.Time', 'rd.controls.BasicSelector', 'rd.controls.ComboSelect',
        'css!base/module/css/style'
    ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', 'BasicSelector', main];
    function main(scope, BasicSelector) {
        this.getTime = function() {
            return scope.timeSetting.value;
        }

        this.getSelectedProvince = function() {
            return scope.selectedProvince[0];
        }

        scope.timeSetting = {
            value: 'now-1d'
        }
        
        //这些可以外部给或者直接在模块内部去查
        scope.provinces = [
            { id: 0, label: "江苏省" },
            { id: 1, label: "浙江省" },
            { id: 2, label: "广东省" },
            { id: 3, label: "广西省" },
            { id: 4, label: "河北省" },
            { id: 5, label: "河南省" },
            { id: 6, label: "湖北省" },
            { id: 7, label: "湖南省" },
            { id: 8, label: "新疆省" },
            { id: 9, label: "四川省" }
        ];

        scope.selected2string = function(selected, context, index) {
            return BasicSelector.selected2string(selected, 'label', '...');
        }
    }

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
