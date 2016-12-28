define('main', ['angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector', 'rd.containers.Accordion'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion',
        'rd.controls.ComboSelect',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'RDKConst', 'BasicSelector', function(scope, RDKConst, BasicSelector) {
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
        scope.openSwitch = true;
        scope.selected2string = function(selected, context, index) {
            console.log(selected);
            console.log(context);
            console.log(index);
            scope.openSwitch = false;
            return BasicSelector.selected2string(selected, 'label', '');
        }

    }]);
});
