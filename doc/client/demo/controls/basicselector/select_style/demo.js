(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.BasicSelector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
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

            scope.cursorChanged = function() {
                alert('选择的光标：' + scope.cursor_Selected);
            }

            scope.attrChanged = function() {
                scope.selectItemCSSValue = "";
                scope.selectItemCSSValue += ".rdk-selector-module{\n";
                scope.selectItemCSSValue += "width:" + scope.widthValue + ";\n";
                scope.selectItemCSSValue += "max-height:" + scope.maxHeightValue + ";\n";
                scope.selectItemCSSValue += "border:" + scope.borderValue + ";\n";
                scope.selectItemCSSValue += "border-radius:" + scope.borderRadiusValue + ";\n";
                scope.selectItemCSSValue += "background-color:" + scope.backgroundColorValue + ";\n";
                scope.selectItemCSSValue += "overflow:" + scope.overflowValue + ";\n";
                scope.selectItemCSSValue += "}\n";
                scope.selectItemCSSValue += ".rdk-selector-module .selected-item {\n";
                scope.selectItemCSSValue += "float:" + scope.float_Selcted + ";\n";
                scope.selectItemCSSValue += "border:" + scope.borderValue_SelectedItem + ";\n";
                scope.selectItemCSSValue += "cursor:" + scope.cursor_Selected + ";\n";
                scope.selectItemCSSValue += "border-radius:" + scope.borderRadiusValue_SelectedItem + ";\n";
                scope.selectItemCSSValue += "background-color:" + scope.backgroundColorValue_SelectedItem + ";\n";
                scope.selectItemCSSValue += "color:" + scope.color_Selected + ";\n";
                scope.selectItemCSSValue += "}\n";
            }

            scope.initialValue = function() {
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

                scope.borderValue = "1px solid #a5a6aa";
                scope.borderValue_SelectedItem = "2px solid #00AAFF";

                scope.borderRadiusValue = "4px";
                scope.borderRadiusValue_SelectedItem = "4px";

                scope.backgroundColorValue = "#FFFFFF";
                scope.backgroundColorValue_SelectedItem = "#00FF00";

                scope.color_Selected = "#000000";

                scope.maxHeightValue = "800px";
                scope.widthValue = "400px";
                scope.overflowValue = "auto";

                scope.float_Selcted = "left";
                scope.float_left = "left";
                scope.float_right = "right";

                scope.selectItemCSSValue = "";
                scope.selectItemCSSValue += ".rdk-selector-module{\n";
                scope.selectItemCSSValue += "width:" + scope.widthValue + ";\n";
                scope.selectItemCSSValue += "max-height:" + scope.maxHeightValue + ";\n";
                scope.selectItemCSSValue += "border:" + scope.borderValue + ";\n";
                scope.selectItemCSSValue += "border-radius:" + scope.borderRadiusValue + ";\n";
                scope.selectItemCSSValue += "background-color:" + scope.backgroundColorValue + ";\n";
                scope.selectItemCSSValue += "overflow:" + scope.overflowValue + ";\n";
                scope.selectItemCSSValue += "}\n";
                scope.selectItemCSSValue += ".rdk-selector-module .selected-item {\n";
                scope.selectItemCSSValue += "float:" + scope.float_Selcted + ";\n";
                scope.selectItemCSSValue += "border:" + scope.borderValue_SelectedItem + ";\n";
                scope.selectItemCSSValue += "cursor:" + scope.cursor_Selected + ";\n";
                scope.selectItemCSSValue += "border-radius:" + scope.borderRadiusValue_SelectedItem + ";\n";
                scope.selectItemCSSValue += "background-color:" + scope.backgroundColorValue_SelectedItem + ";\n";
                scope.selectItemCSSValue += "color:" + scope.color_Selected + ";\n";
                scope.selectItemCSSValue += "}\n";
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