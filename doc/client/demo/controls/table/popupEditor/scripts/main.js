define('main', ['rd.controls.Table', 'rd.attributes.modal', 'rd.controls.BasicSelector'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core', 'rd.attributes.modal', 'rd.controls.BasicSelector']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService','EventTypes', 'BasicSelector', function($scope, EventService, EventTypes, BasicSelector) {

        $scope.allItems_1 = [
            { id: 0, label: "angelababy" },
            { id: 1, label: "selina" },
            { id: 2, label: "hebbe" },
            { id: 3, label: "jolin" },
            { id: 4, label: "sara" },
            { id: 5, label: "joana" },
            { id: 6, label: "brown" },
            { id: 7, label: "bush" },
            { id: 8, label: "nikoson" },
            { id: 9, label: "mike" }
        ];

        $scope.allItems = [
            { id: 0, label: "网球" },
            { id: 1, label: "乒乓" },
            { id: 2, label: "排球" },
            { id: 3, label: "篮球" },
            { id: 4, label: "冰球" },
            { id: 5, label: "垒球" },
            { id: 6, label: "棒球" },
            { id: 7, label: "游泳" },
            { id: 8, label: "体操" },
            { id: 9, label: "射击" }
        ];

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
                    editorRenderer: '<a ng-click="appScope.clickHandler(item, $parent.$index, $index)">{{data.data[item.$index][$index]}}</a>'
                },
                {
                    targets : 2,
                    editable : true,
                    editorRenderer: '<a ng-click="appScope.click(item, $parent.$index, $index)">{{data.data[item.$index][$index]}}</a>'
                }

            ]
        }

        _getMultipleSelectedItems = function(data){
            var retArr = [];
            var arr = data.split(',');
            for(var i=0; i<arr.length; i++){
                var obj = {};
                obj.label = arr[i];
                retArr.push(obj);
            }
            return retArr;
        }

        $scope.clickHandler = function(item, row, column){
            $scope.row = row;
            $scope.column = column;
            $scope.selectedItems_1 = [{'label': $scope.data.data[row][column]}];
            var pos = {
                x: ($(window).width() -  $('#selectModal_1').width())/2,
                y: ($(window).height() -  $('#selectModal_1').height())/2
            };
            EventService.broadcast('selectModal_1', 'modal', pos);

            EventService.register('selectorID_1',EventTypes.CHANGE, function(event, data){
                EventService.broadcast('selectModal_1', 'hide');
                if(data.length == 0) return;
                $scope.data.data[$scope.row][$scope.column] = data[0].label;              
            });
        }

        $scope.closeHandler = function(){
            EventService.broadcast('selectModal', 'hide');
            if($scope.selectedItems.length == 0) return;
            $scope.data.data[$scope.rowIdx][$scope.columnIdx] = BasicSelector.selected2string($scope.selectedItems, 'label', ',');
        }

        $scope.click = function(item, row, column){
            $scope.rowIdx = row;
            $scope.columnIdx = column;
            $scope.selectedItems = _getMultipleSelectedItems($scope.data.data[row][column]);
            var pos = {
                x: ($(window).width() -  $('#selectModal').width())/2,
                y: ($(window).height() -  $('#selectModal').height())/2
            };
            EventService.broadcast('selectModal', 'modal', pos);
        }
    }]);
});
