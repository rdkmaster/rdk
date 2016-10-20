define('main', ['angular', 'jquery', 'rd.containers.Tab', 'rd.controls.BasicSelector', 'rd.controls.ProgressBar'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector',
        'rd.controls.ProgressBar'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils', '$compile', function(scope, EventService, EventTypes, Utils, $compile) {
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

            scope.clickHandler = function(){
                rdk.tabID.addTab("./scripts/template/tab.html", '新增覆盖标题');
                // rdk.tabID.addTab("<div title='new tab'><span>新增模板内容</span></div>", '新增覆盖标题');
            }

            scope.changeHandler = function(){
                var res = '';
                angular.forEach(scope.selectedItems, function(item, key) {
                    res += item.label + ' ';
                });
                alert('选中了 "' + res + '"');                
            }

            EventService.register('tabID', EventTypes.CLOSE, function(event, data){
                // rdk.tabID.destroyTab(data.tabIndex);
                rdk.tabID.closeTab(data.tabIndex);
            });

            scope.closeHandler = function(event, data){
                var closeTabIndex = data.tabIndex;
            }
        }
    ]);
});
