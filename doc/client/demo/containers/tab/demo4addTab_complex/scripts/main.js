define('main', ['angular', 'jquery', 'rd.containers.Tab', 'rd.controls.BasicSelector', 'rd.controls.ProgressBar'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector',
        'rd.controls.ProgressBar'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils', '$compile', function(scope, EventService, EventTypes, Utils, $compile) {
        /*单独模板相关变量优先initData, tabController次之，appscope最后*/
        var initData = {title: 'my title', showCloseButton: false, awesomeData: [{label: "江苏省"}, {label: "浙江省"}]};
        scope.clickHandler = function(){
            rdk.tabID.addTab('./scripts/template/tab.html', 'tabController', initData);
        }

        /*各控件公用的变量定义在appScope上*/
        scope.allItems = [{label: "江苏省"}, {label: "浙江省"}, {label: "河南省"}, {label: "湖北省"}];

        EventService.register('tabID', EventTypes.CLOSE, function(event, data){
            rdk.tabID.destroyTab(data.tabIndex);
                // rdk.tabID.closeTab(data.tabIndex);
        });

        scope.closeHandler = function(event, data){
            var closeTabIndex = data.tabIndex;
        }

    }]);


    myApp.controller('tabController', ['$scope', 'EventService', 'EventTypes', function(scope, EventService, EventTypes) {
        /*tab控制器私有的变量，需要在index上用ng-controller实例化*/
        scope.cityItems = [{label: "江苏省"}, {label: "浙江省"}, {label: "河南省"}, {label: "湖北省"}];
        scope.selectedItems = [{label: "江苏省"}];
        scope.rdkSelector = "Selector控件";

        scope.changeHandler = function(){
            var res = '';
            angular.forEach(scope.selectedItems, function(item, key) {
                res += item.label + ' ';
            });
            alert('选中了 "' + res + '"');                
        }
    }])
});
