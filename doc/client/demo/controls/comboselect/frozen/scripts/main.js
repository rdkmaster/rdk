define('main', ['angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.controls.ComboSelect',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'BasicSelector', '$timeout', function(scope, BasicSelector, $timeout) {
        scope.allItems = [{
            id: 0,
            label: "江苏省"
        }, {
            id: 1,
            label: "浙江省"
        }, {
            id: 2,
            label: "河南省"
        }, {
            id: 3,
            label: "湖北省"
        }, ];

        scope.selected2string = function(selected, context, index) {
            return BasicSelector.selected2string(selected, 'label', '...');
        }

        scope.toggleFrozen = function() {
            scope.frBln = !scope.frBln;
            scope.btnLabel = scope.frBln ? '已冻结，单击解冻' : '已解冻，单击冻结';
        }

        scope.frBln = false;
        scope.toggleFrozen();

    }]);
});
