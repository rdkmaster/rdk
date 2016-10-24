define('main', ['angular', 'rd.containers.Tab', 'rd.controls.BasicSelector'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope',
        function(scope) {
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

            scope.rdkSelector = "Selector控件";

            scope.selectedIndex = 2;

            scope.clickHandler = function(){
                scope.selectedIndex = 1;
            }
        }
    ]);
});
