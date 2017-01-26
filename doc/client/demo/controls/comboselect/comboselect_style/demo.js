(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope ) {
        scope.floatChanged = function() {
            alert('选择的浮动样式：' + scope.float_Selcted);
        }

        scope.cursor_Selected = "pointer"
        scope.selcted = ''
        scope.cursorRes = [{
            label: "指示链接的指针",
            value: "pointer"
        }, {
            label: "十字线",
            value: "crosshair"
        }, {
            label: "程序正忙",
            value: "wait"
        }];

        scope.selected2string = function(selected, context, index) {
            return BasicSelector.selected2string(selected, 'label', '...');
        }

        scope.cursorChanged = function() {
            alert('选择的光标：' + scope.cursor_Selected);
        }

        scope.attrChanged = function() {
            scope.CSSValue = "";
            scope.CSSValue += ".rdk-combo-select-module{\n";
            scope.CSSValue += "width:" + scope.widthValue + ";\n";
            scope.CSSValue += "height:" + scope.heightValue + ";\n";
            scope.CSSValue += "position:relative;\n"
            scope.CSSValue += "}\n";
            scope.CSSValue += ".rdk-combo-select-module .combo-caption{\n";
            scope.CSSValue += "display: inline-block;\n"
            scope.CSSValue += "width:" + scope.captionWidthValue + ";\n";
            scope.CSSValue += "}\n";
            scope.CSSValue += ".combo-content-transclude {\n";
            scope.CSSValue += "position:absolute;\n";
            scope.CSSValue += "margin-left:" + scope.marginLeft + ";\n";
            scope.CSSValue += "z-index:9999;\n";
            scope.CSSValue += "background-color:" + scope.backgroundColorValue + ";\n";
            scope.CSSValue += "}\n";
        }

        scope.initialValue = function() {
            scope.allItems = [{
                id: 0,
                label: "江苏省"
            }, {
                id: 1,
                label: "浙江省"
            }, {
                id: 2,
                label: "河南省"
            }, {
                id: 3,
                label: "湖北省"
            }, ];

            scope.backgroundColorValue = "#FFFFFF";
            scope.marginLeft = "21%";

            scope.heightValue = "150px";
            scope.widthValue = "400px";

            scope.captionWidthValue = "20%";
            scope.transcludeWidth = "75%";

            scope.themeWidth = "75%";

            scope.CSSValue = "";
            scope.CSSValue += ".rdk-combo-select-module{\n";
            scope.CSSValue += "width:" + scope.widthValue + ";\n";
            scope.CSSValue += "height:" + scope.heightValue + ";\n";
            scope.CSSValue += "position:relative;\n"
            scope.CSSValue += "}\n";
            scope.CSSValue += ".rdk-combo-select-module .combo-caption{\n";
            scope.CSSValue += "display: inline-block;\n"
            scope.CSSValue += "width:" + scope.captionWidthValue + ";\n";
            scope.CSSValue += "}\n";
            scope.CSSValue += ".combo-content-transclude {\n";
            scope.CSSValue += "position:absolute;\n";
            scope.CSSValue += "margin-left:" + scope.marginLeft + ";\n";
            scope.CSSValue += "z-index:9999;\n";
            scope.CSSValue += "background-color:" + scope.backgroundColorValue + ";\n";
            scope.CSSValue += "}\n";
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