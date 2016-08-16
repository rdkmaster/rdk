define('main', ['angular', 'rd.controls.TabSelect'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.controls.TabSelect'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes',
        function(scope, EventService, EventTypes) {

            EventService.register('tabselectData', EventTypes.RESULT, function(event, data) {
                console.log("获取了TabSelect控件的内容!");
                scope.tabselectData = data;
            });

            scope.trackItemByVal = "value";

            scope.selItems = [{
                "label": "江苏省",
                "value": "1"
            }];
        }
    ])
});
