define('main', ['angular', 'rd.controls.TabSelect'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.controls.TabSelect'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes',
        function(scope, EventService, EventTypes) {

            EventService.register('tabselectData', EventTypes.RESULT, function(event, data) {
                scope.tabselectData = data;
            });

            scope.trackItemByVal = "value";

            scope.selItems = [{
                "label": "浙江省",
                "value": "2"
            }];

            scope.tabSelectChanged = function() {
                alert("捕获到childChange事件！");
            }
        }
    ])
});
