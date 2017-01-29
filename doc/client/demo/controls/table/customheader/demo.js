(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.Alert'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'Alert', main];
    function main($scope, Alert) {
        $scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    sortable: true
                },
                {
                    title : function(data, target) {
                        return '<span>自定义带select的列</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="optionItem.label as optionItem.label for optionItem in titleOptions">\
                                    <option value="">-- choose an item --</option>\
                                </select>'
                    },
                    targets : 1,
                    sortable: true
                },
                {
                    title : function(data, target) {
                        $scope.data=data.data;
                        return '<span>'+data.header[target]+'</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="item[2] as item[2]  for item in data">\
                                    <option value="">-- choose an item --</option>\
                                </select>'
                    },
                    targets : 2,
                    sortable: true
                },
                {
                    title : function(data, target) {
                        $scope.data=data.data;
                        return '<span>自定义列and自定义表头</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="item[2] as item[2]  for item in data">\
                                    <option value="">-- choose an item --</option>\
                                </select>'
                    },
                    render : '<a ng-click="appScope.click(item)" href="javascript:void(0)">点击</a>'
                }
            ]
        };
        $scope.click = function(item) {
            //弹出选择栏，重填value
            Alert.scope = $scope;
            Alert.confirm("自定义editorRenderer，弹出演示", "提示框");
        };
        //titleOptions的数据结构根据自身业务逻辑来定
        $scope.titleOptions = [
            {label: 'item1', id: 1}, {label: 'item2', id: 2},
            {label: 'item3', id: 3}, {label: 'item4', id: 4}
        ];
        //变化后的处理逻辑
        $scope.titleExtraSelecteHandler = function(selected) {
            alert("你选择了"+selected);
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