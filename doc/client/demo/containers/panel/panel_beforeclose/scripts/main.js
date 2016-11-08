define('main', ['rd.containers.Panel', 'rd.controls.Table','rd.controls.BasicSelector','rd.containers.Tab','rd.attributes.modal','rd.services.Alert', 'rd.controls.ProgressBar'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.containers.Panel','rd.controls.Table', 'rd.containers.Tab','rd.controls.BasicSelector', 'rd.attributes.modal','rd.services.Alert','rd.controls.ProgressBar']);
    // 创建一个控制器
    app.controller('rdk_ctrl', ['$scope','EventService','EventTypes','Utils','Alert','ButtonTypes','$compile', function($scope, EventService, EventTypes, Utils,Alert,ButtonTypes, $compile) {
			$scope.cityItems = [{
                label: "江苏省"
            }, {
                label: "浙江省"
            }, {
                label: "河南省"
            }, {
                label: "湖北省"
            }];
            $scope.setmodal = function(id, modal, position) {
				EventService.broadcast(id, modal, position);
			}
            $scope.selectedItems = [{
                label: "江苏省"
            }];

            $scope.rdkSelector = "Selector控件";

            EventService.register('tabID', EventTypes.CLOSE, function(event, data){
                var result = confirm('是否关闭Tab页');
                if(result){
                    rdk.tabID.destroyTab(data.tabIndex);
                    // rdk.tabID.closeTab(data.tabIndex);
                }
            });
			
			$scope.handle_beforeclose = function() {
                    Alert.scope = $scope;
                    Alert.confirm('是否确定关闭窗口？', '确认提示', ButtonTypes.YES + ButtonTypes.NO + ButtonTypes.CANCEL, callbackHandler, true);

                    function callbackHandler(val) {
                        if (val == ButtonTypes.YES) {

                            EventService.broadcast('topModal', 'hide');
                            EventService.broadcast('panel', EventTypes.CLOSE); //事件  

                        }
                    }

                }
		$scope.data = {};
        $scope.data.header = ["姓名", "职位", "薪资", "入职日期", "部门", "其他"];
        $scope.data.field = ["name", "position", "salary", "start_date", "office", "extn"];
        $scope.data.data = [
            [
                "Tiger Nixon",
                "System Architect",
                "$320,800",
                "2011/04/25",
                "Edinburgh",
                "5421"
            ],
            [
                "Garrett Winters",
                "Accountant",
                "$170,750",
                "2011/07/25",
                "Tokyo",
                "8422"
            ]
        ];
    }]);
});
