define('main', ['rd.controls.Table', 'rd.services.Alert'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table', 'rd.core', 'rd.services.Alert']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Alert', function(scope, EventService, EventTypes, Alert) {

        scope.sortClick = function(){
            scope.setting = {
                "columnDefs" :[
                    {
                        targets :0,
                        visible : false//隐藏原数据的第一列
                    },
                    {
                        targets :1,
                        sortable : true//排序原数据的第二列
                    }
                ]
            }
        }

        EventService.register('table', EventTypes.CHECKED, function(event, data){
            var selectedData = data.data;
        });
    }]);
});
