define('main', ['angular', 'rd.containers.Tab', 'rd.controls.BasicSelector'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes',
        function(scope, EventService, EventTypes) {
            scope.cityItems = [{
                label: "江苏省"
            }, {
                label: "浙江省"
            }, {
                label: "河南省"
            }, {
                label: "湖北省"
            }];

            scope.selectedItems = [{
                label: "江苏省"
            }];

            EventService.register("tab1", EventTypes.CHANGE, function(event, data) {
                alert("你选择了Index为"+data+"的Tab页");
            });

            scope.rdkSelector = "Selector控件";

            setTimeout(function() {
                EventService.broadcast('tab1', EventTypes.TAB_SELECT, 2);
            }, 200);

            scope.selectedTab1 = function() {
                EventService.broadcast('tab1', EventTypes.TAB_SELECT, 1);
            }

            scope.selectedTab2 = function() {
                EventService.broadcast('tab1', EventTypes.TAB_SELECT, 2);
            }

            scope.selectedTab3 = function() {
                EventService.broadcast('tab1', EventTypes.TAB_SELECT, 3);
            }
        }
    ]);
});
