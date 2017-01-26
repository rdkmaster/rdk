(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.attrChanged = function() {
                scope.selectItemCSSValue = "";
                scope.CSSValue += ".rdk-table-module .rdk-table {\n";
                scope.CSSValue += "font-family: '微软雅黑', Helvetica, Arial, sans-serif;\n"
                scope.CSSValue += "font-size:" + scope.tableFontSize + ";\n";
                scope.CSSValue += "border-spacing:0px;\n"
                scope.CSSValue += "width : 100%;\n"
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table tr {\n";
                scope.CSSValue += "line-height:" + scope.lineHeight + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table tbody tr.selected-row td {\n";
                scope.CSSValue += "background-color:" + scope.backgroundColor_bodyAndRowTD + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table > tbody > tr:not(.selected-row):hover > td {\n";
                scope.CSSValue += "background-color:" + scope.backgroundColor_NotSelectData + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table > thead > tr > th {\n"
                scope.CSSValue += "text-align:" + scope.textAlign_th + ";\n";
                scope.CSSValue += "padding:" + scope.padding_th + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table tfoot tr,.rdk-table-module .rdk-table thead>tr {\n"
                scope.CSSValue += "background-color:" + scope.backgroundColor_footOrHead + ";\n";
                scope.CSSValue += "color:" + scope.color_footOrHead + ";\n";
                scope.CSSValue += "}\n";                

                scope.CSSValue += ".rdk-table-module .rdk-table > tbody > tr > td {\n"
                scope.CSSValue += "text-align:" + scope.textAlign_td + ";\n";
                scope.CSSValue += "vertical-align:" + scope.verticalAlign_td + ";\n";
                scope.CSSValue += "padding:" + scope.padding_td + ";\n";
                scope.CSSValue += "}\n";
            }

            scope.initialValue = function() {
                //.rdk-table
                scope.tableFontSize = "14px";
                //.rdk-table-module .rdk-table tfoot tr,.rdk-table-module .rdk-table thead>tr
                scope.backgroundColor_footOrHead = "#325BDB";
                scope.color_footOrHead = "#FFFFFF";                
                //rdk-table tr
                scope.lineHeight = "28px";
                //.rdk-table tbody tr.selected-row td
                scope.backgroundColor_bodyAndRowTD = "#849DE9";
                //.rdk-table > tbody > tr:not(.selected-row):hover > td 
                scope.backgroundColor_NotSelectData = "#F1F1F1";
                //rdk-table > thead > tr > th
                scope.textAlign_th = scope.align_center;
                scope.padding_th = "10px 6px";
                //rdk-table > tbody > tr > td
                scope.textAlign_td = scope.align_center;
                scope.verticalAlign_td = scope.vAlign_middle;
                scope.padding_td = "8px 6px";
                //
                scope.align_center = "center";
                scope.align_left = "left";
                scope.align_right = "right";

                scope.vAlign_middle = "middle";
                scope.vAlign_top = "text-top";
                scope.vAlign_bottom = "text-bottom";

                scope.selectItemCSSValue = "";
                scope.CSSValue += ".rdk-table-module .rdk-table {\n";
                scope.CSSValue += "font-family: '微软雅黑', Helvetica, Arial, sans-serif;\n"
                scope.CSSValue += "font-size:" + scope.tableFontSize + ";\n";
                scope.CSSValue += "border-spacing:0px;\n"
                scope.CSSValue += "width : 100%;\n"
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table tr {\n";
                scope.CSSValue += "line-height:" + scope.lineHeight + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table tbody tr.selected-row td {\n";
                scope.CSSValue += "background-color:" + scope.backgroundColor_bodyAndRowTD + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table > tbody > tr:not(.selected-row):hover > td {\n";
                scope.CSSValue += "background-color:" + scope.backgroundColor_NotSelectData + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table > thead > tr > th {\n"
                scope.CSSValue += "text-align:" + scope.textAlign_th + ";\n";
                scope.CSSValue += "padding:" + scope.padding_th + ";\n";
                scope.CSSValue += "}\n";

                scope.CSSValue += ".rdk-table-module .rdk-table tfoot tr,.rdk-table-module .rdk-table thead>tr {\n"
                scope.CSSValue += "background-color:" + scope.backgroundColor_footOrHead + ";\n";
                scope.CSSValue += "color:" + scope.color_footOrHead + ";\n";
                scope.CSSValue += "}\n";                

                scope.CSSValue += ".rdk-table-module .rdk-table > tbody > tr > td {\n"
                scope.CSSValue += "text-align:" + scope.textAlign_td + ";\n";
                scope.CSSValue += "vertical-align:" + scope.verticalAlign_td + ";\n";
                scope.CSSValue += "padding:" + scope.padding_td + ";\n";
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