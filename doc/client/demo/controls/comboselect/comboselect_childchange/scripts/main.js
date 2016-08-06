define('main', ['angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector', 'rd.containers.Accordion'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion',
        'rd.controls.ComboSelect',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'RDKConst', 'BasicSelector', function(scope, RDKConst, BasicSelector) {
        scope.cityItems = [{
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
        }];

        scope.TOPItems = [{
            label: '10'
        }, {
            label: '20'
        }, {
            label: '50'
        }];

        scope.SortItems = [{
            label: '升序'
        }, {
            label: '降序'
        }, {
            label: '非法值'
        }];

        scope.sort_param = '';
        scope.top_param = '';

        scope.getSelectedParam = function(data, context, index) {
            if(index == 1){
                scope.sort_param = 'sort:' + context[2].data[0].label + ';';
            }else if(index == 2){
                scope.top_param = 'TOP:' + context[1].data[0].label + ';';
            }
            scope.selectedParamStr = scope.sort_param + scope.top_param;
            return scope.selectedParamStr;
        }

        scope.getSelectedCity = function(selected,context,index){
            if(index >= 2 ){
                return RDKConst.STOP_PROPAGATIOIN;
            }else{
                scope.city_param = 'city：' + BasicSelector.selected2string(selected, 'label', '-');
            }
            scope.selectedParamStr = scope.sort_param + scope.top_param + scope.city_param;
            return scope.selectedParamStr;
        }
    }]);
});
