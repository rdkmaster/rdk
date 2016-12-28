define('main', ['angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector', 'rd.containers.Accordion'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion',
        'rd.controls.ComboSelect',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'RDKConst', 'BasicSelector', function(scope, RDKConst, BasicSelector) {
        //scope.TOPItems = [{
        //    label: '10'
        //}, {
        //    label: '20'
        //}, {
        //    label: '50'
        //}];
        scope.items=[
            {
                title:"top",
                content:[{
                    label: '10'
                }, {
                    label: '20'
                }, {
                    label: '50'
                }]
            },
            {
              title:"排序",
              content:[{
                  label: '升序'
              }, {
                  label: '降序'
              }, {
                  label: '非法值'
              }]
            }
        ]
        //scope.SortItems = [{
        //    label: '升序'
        //}, {
        //    label: '降序'
        //}, {
        //    label: '非法值'
        //}];
        scope.selected2string = function(selected, context, index) {

            return BasicSelector.selected2string(selected, 'label', '');
        }


    }]);
});
