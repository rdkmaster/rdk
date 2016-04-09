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
                scope.tabselectData = data;
            });

            scope.trackItemByVal = "value";

            scope.selItems = [{
                "label": "浙江省",
                "value": "2"
            }];

            scope.tabSelectChanged = function() {
                // var res = '';
                // scope.selItems = dataInfo;
                // angular.forEach(scope.selItems, function(item, key) {
                //     res += item.label + ' ';
                // });
                // alert('选中了 "' + res + '"');
                alert("捕获到childChange事件！");
            }
        }
    ])
});
