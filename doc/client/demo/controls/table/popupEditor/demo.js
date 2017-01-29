(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.PopupService', 'base/mod/name-editor', 'base/mod/habit-editor'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', 'PopupService', main];
    function main($scope,EventService,EventTypes,PopupService) {
        $scope.data = {};
        $scope.data.header = ["姓名", "职位", "爱好", "入职日期", "部门", "其他"];
        $scope.data.field = ["name", "position", "salary", "start_date", "office", "extn"];
        $scope.data.data = [
            [
                "angelababy",
                "System Architect",
                "网球",
                "2011/04/25",
                "Edinburgh",
                "5421"
            ],
            [
                "sara",
                "Accountant",
                "游泳",
                "2011/07/25",
                "Tokyo",
                "8422"
            ],
            [
                "nikoson",
                "Accountant",
                "篮球",
                "2011/07/25",
                "Tokyo",
                "8422"
            ]
        ];

        $scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    editable : true,
                    editorRenderer: '<a ng-click="appScope.editName(item, $parent.$index, $index)">{{data.data[item.$index][$index]}}</a>'
                },
                {
                    targets : 2,
                    editable : true,
                    editorRenderer: '<a ng-click="appScope.editHabit(item, $parent.$index, $index)">{{data.data[item.$index][$index]}}</a>'
                }
            ]
        }

        $scope.editName = function(item, row, column) {
            var id = PopupService.popup('mod/name-editor.html',
                { selected: {'label': $scope.data.data[row][column]} },
                { controller: 'NameEditorController', showTitle: false });

            EventService.register(id, 'edit', function(event, data) {
                PopupService.removePopup(id);
                //清空回调函数
                EventService.remove(id, 'edit');
                //让数据生效
                $scope.data.data[row][column] = data.label;
            });
        }

        $scope.editHabit = function(item, row, column) {
            var id = PopupService.popup('mod/habit-editor.html',
                { selected: _getMultipleSelectedItems($scope.data.data[row][column]) },
                { controller: 'HabitEditorController', showTitle: false });

            EventService.register(id, 'edit', function(event, data) {
                PopupService.removePopup(id);
                //清空回调函数
                EventService.remove(id, 'edit');
                //让数据生效
                $scope.data.data[row][column] = data;
            });
        }

        var _getMultipleSelectedItems = function(data){
            var retArr = [];
            var arr = data.split(',');
            for(var i=0; i<arr.length; i++){
                var obj = {};
                obj.label = arr[i].trim();
                retArr.push(obj);
            }
            return retArr;
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