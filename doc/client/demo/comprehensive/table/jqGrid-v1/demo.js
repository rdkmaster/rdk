(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'jquery-grid',
        'css!base/css/rdk-jq-grid-style',
        'css!base/css/jquery-ui',
        'css!base/css/ui.jqgrid',
        'jquery-grid-i18-cn',
        'jquery-grid-i18-en'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.dsResultHandler=function(data){
            var colSetting = [];
            //构造列头数组
            //配置表头属性，宽度，是否排序，排序类型....详细参考官方文档
            for (var i=0;i<data.field.length;i++){
                var obj={};
                obj.name=data.field[i];
                obj.index=data.field[i];
                obj.width=200;
                obj.sorttype="float";
                obj.align="center";
                if(data.field=="extn"){
                    obj.sortable=false;
                }
                colSetting.push(obj);
            }
            //初始化配置
            var myGridTable = $("#gridTable").jqGrid({
                datatype: "local",
                colNames:data.header,
                colModel:colSetting,
                //multiselect: true, //复选框
                regional : 'cn', //i18: cn or en
                rowNum:10, //page size
                rowList:[ 10, 20, 30 ], //change page size
                pager : '#gridPage', // div id
                viewrecords: true,
                sortorder: "desc",
                height: '200',
                width:"400"
                //hiddengrid : true, 最初隐藏表格
                //caption: "Manipulating Array Data"
            });
            //写入数据
            var gridData = convertToObject(data);
            for(var i=0;i<=gridData.length;i++){
                $("#gridTable").jqGrid('addRowData',i+1,gridData[i]);
            }
            if(gridData.length==0){
                var head = document.querySelector(".m-jqgrid .ui-jqgrid-hdiv");
                var body = document.querySelector(".m-jqgrid .ui-jqgrid-bdiv");
                head.style.overflow="auto";
                head.style.height="200px";
                body.style.height="0";
            }
            //设置导航功能
            // $("#gridTable").jqGrid('navGrid', '#pager2', {edit : false,add : false,del : false});
            //重新加载当前表格
            myGridTable.trigger("reloadGrid");
        };

        //ds数据矩阵转换成与列头对应的数组对象
        function convertToObject(ds) {
            var result = [];
            angular.forEach(ds.data, function(data) {
                var obj = {};
                angular.forEach(ds.field, function(field, index) {
                    obj[field] = data[index];
                });
                result.push(obj);
            });
            return result;
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