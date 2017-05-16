(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes',main];
    function main($scope,EventService,EventTypes ) {
        $scope.tableSetCurrentPage = function(){//
            rdk.tableID.setCurrentPage(1);//设置当前页
        }
        $scope.tableResetCurrentPage = function(){
            rdk.tableID.resetCurrentPage();//重置当前页
        }
        $scope.tableGetTablePageNumber = function(){
           alert( "当前分页类型的数字代号："+rdk.tableID.getTablePageNumber());
        }
        $scope.tableSetPageSize = function(){
            rdk.tableID.setPageSize(2);//重新定义列表每页要展现的行数
        }
        $scope.tableSetChecked = function(){
            var item =[{//对象里写的属性全可以匹配到才会勾选
                "name":"Tiger Nixon1",
                "office":"Edinburgh"
            }];
            rdk.tableID.setChecked(item);
        }
        $scope.tableSetGlobalSearch = function(){//过滤
            rdk.tableID.setGlobalSearch('Tokyo');
        }
        $scope.tableGetSearchInfo = function(){//得其过滤的值
            alert(rdk.tableID.getSearchInfo().searchKey);
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