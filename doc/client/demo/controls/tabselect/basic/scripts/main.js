define('main', ['angular', 'rd.controls.TabSelect', 'rd.controls.ComboSelect', 'rd.controls.TabSelector', 'rd.controls.BasicSelector'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.controls.TabSelect',
        'rd.controls.ComboSelect',
        'rd.controls.TabSelector',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'RDKConst', 'EventService', 'EventTypes',
        function(scope, RDKConst, EventService, EventTypes) {

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
