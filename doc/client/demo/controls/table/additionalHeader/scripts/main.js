define('main', ['rd.controls.Table', 'rd.services.Alert'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table', 'rd.core', 'rd.services.Alert']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Alert', function($scope, EventService, EventTypes, Alert) {

        $scope.setting = {
            "columnDefs" :[
                {
                    title : function(data, target) { //自定义表头设置
                        return '<span>自定义带select的列</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="optionItem.label as optionItem.label for optionItem in titleOptions">\
                                    <option value="">-- choose an item --</option>\
                                </select>'
                    },
                    targets : 1
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
                    targets : 2
                }
            ],
            //多级表头设置
            additionalHeader: '<tr class="test1"><th colspan=4>合并列1</th><th colspan=3>合并列2</th></tr>' +
                                  '<tr class="test2"><th colspan=1>复选框</th><th colspan=2>身份信息</th><th colspan=4>基本信息</th></tr>'
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
    }]);
});
