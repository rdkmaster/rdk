(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main($scope) {
        $scope.allData= {data: [], field: [], header: []}
        for (var i = 0; i < 5; i++) {
            $scope.allData.data.push([]);
            for (var j = 0; j < 200; j++) {
                $scope.allData.data[i].push('data: ' + i + ', ' + j);
                $scope.allData.field[j] = 'filed' + j;
                $scope.allData.header[j] = 'header' + j;
            }
        }
        $scope.setting = {
            "columnDefs" :[
            ]
        }

        var COLUMNS = 10;
        $scope.curIndex = 0;
        $scope.data = getData($scope.curIndex, COLUMNS);

        $scope.moveLeft = function() {
            if ($scope.curIndex == 0) {
                return;
            }
            $scope.data = getData(--$scope.curIndex, COLUMNS);
        }

        $scope.moveRight = function() {
            if ($scope.curIndex == $scope.allData.field.length - COLUMNS) {
                return;
            }
            $scope.data = getData(++$scope.curIndex, COLUMNS);
        }

        function getData(from, columns) {
            var data = {data: [], field: [], header: []};
            for (var i = 0; i < $scope.allData.data.length; i++) {
                data.data.push($scope.allData.data[i].slice(from, from+columns));
            }
            data.field = $scope.allData.field.slice(from, from+columns);
            data.header = $scope.allData.header.slice(from, from+columns);
            return data;
        }

        $scope.click = function(item){
            alert("新添加的具有点击功能的列！");
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