define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', function($scope, EventService, EventTypes) {
        EventService.register('table', EventTypes.CHECK, function(event, data){
            var selectedData = data.data;
        });      

        $scope.clickHandler = function(){
           rdk.tableID.pageSize = 3;
        } 

        $scope.selectHandler = function(){
            var arr = [
                          {
                            "name": "Tiger Nixon",
                            "position": "System Architect",
                            "salary": "$320,800",
                            "start_date": "2011/04/25",
                            "office": "Edinburgh",
                            "extn": "5421",
                          },
                          {
                            "name": "Garrett Winters",
                            "position": "Accountant",
                            "salary": "$170,750",
                            "start_date": "2011/07/25",
                            "office": "Tokyo",
                            "extn": "8422",
                          }
                        ]
            rdk.tableID.setChecked(arr);
        }
    }]);
});
