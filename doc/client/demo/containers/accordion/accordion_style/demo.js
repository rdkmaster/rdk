(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'angular', 'rd.containers.Accordion'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope',  main];
    function main(scope) {
scope.buttonSource = [{
                icon: "/doc/client/demo/containers/accordion/img/refresh.png",
                label: "刷新",
                tooltips: "点击可进行图标变更",
                callback: function(obj, htmlID) {
                    alert("点击了编辑按钮！");
                }
            }];

            scope.foldedIcon = "fa fa-arrow-circle-down";
            scope.unfoldedIcon = "fa fa-arrow-circle-up";

            scope.moduleWidth = "400px";
            scope.moduleMaxHeight = "800px";

            scope.themePadding = "5px";
            scope.themeWidth = "100%";
            scope.themeBackgroupColor = "#E3E3E3";
            scope.themeBorder = "1px solid #CDCDCD";
            scope.themeBorderRadius = "4px";
            scope.themeFontWeight = "bold";
            scope.themeFontSize = "medium";
            scope.themeCursor = "pointer";

            scope.contentWidth = "100%";
            scope.contentBorder = "1px solid #CDCDCD";
            scope.contentBorderRadius = "4px";
            scope.contentPadding = "5px";

            scope.CSSValue = "";
            scope.CSSValue += ".rdk-accordion-module{\n";
            scope.CSSValue += "width:" + scope.moduleWidth + ";\n";
            scope.CSSValue += "max-height:" + scope.moduleMaxHeight + ";\n";
            scope.CSSValue += "}\n";

            scope.CSSValue += ".rdk-accordion-module .theme{\n";
            scope.CSSValue += "padding:" + scope.themePadding + ";\n";
            scope.CSSValue += "width:" + scope.themeWidth + ";\n";
            scope.CSSValue += "background-color:" + scope.themeBackgroupColor + ";\n";
            scope.CSSValue += "border:" + scope.themeBorder + ";\n";
            scope.CSSValue += "border-radius:" + scope.themeBorderRadius + ";\n";
            scope.CSSValue += "font-weight:" + scope.themeFontWeight + ";\n";
            scope.CSSValue += "font-size:" + scope.themeFontSize + ";\n";
            scope.CSSValue += "cursor:" + scope.themeCursor + ";\n";
            scope.CSSValue += "}\n";

            scope.CSSValue += ".rdk-accordion-module .content{\n";
            scope.CSSValue += "width:" + scope.contentWidth + ";\n";
            scope.CSSValue += "border:" + scope.contentBorder + ";\n";
            scope.CSSValue += "border-radius:" + scope.contentBorderRadius + ";\n";
            scope.CSSValue += "padding:" + scope.contentPadding + ";\n";
            scope.CSSValue += "}\n";

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

            scope.fontWidthRes = [{
                label: "普通（400px）",
                value: "normal"
            }, {
                label: "粗体（400px < x < 900px",
                value: "bold"
            }, {
                label: "细体（100px < x < 400px）",
                value: "lighter"
            }];

            scope.fontSizeRes = [{
                label: "小号",
                value: "small"
            }, {
                label: "中号",
                value: "medium"
            }, {
                label: "大号",
                value: "large"
            }];

            scope.attrChanged = function() {
                scope.CSSValue = "";
                scope.CSSValue += ".rdk-accordion-module{\n";
                scope.CSSValue += "width:" + scope.moduleWidth + ";\n";
                scope.CSSValue += "max-height:" + scope.moduleMaxHeight + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-accordion-module .theme{\n";
                scope.CSSValue += "padding:" + scope.themePadding + ";\n";
                scope.CSSValue += "width:" + scope.themeWidth + ";\n";
                scope.CSSValue += "background-color:" + scope.themeBackgroupColor + ";\n";
                scope.CSSValue += "border:" + scope.themeBorder + ";\n";
                scope.CSSValue += "border-radius:" + scope.themeBorderRadius + ";\n";
                scope.CSSValue += "font-weight:" + scope.themeFontWeight + ";\n";
                scope.CSSValue += "font-size:" + scope.themeFontSize + ";\n";
                scope.CSSValue += "cursor:" + scope.themeCursor + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-accordion-module .content{\n";
                scope.CSSValue += "width:" + scope.contentWidth + ";\n";
                scope.CSSValue += "border:" + scope.contentBorder + ";\n";
                scope.CSSValue += "border-radius:" + scope.contentBorderRadius + ";\n";
                scope.CSSValue += "padding:" + scope.contentPadding + ";\n";
                scope.CSSValue += "}\n";
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