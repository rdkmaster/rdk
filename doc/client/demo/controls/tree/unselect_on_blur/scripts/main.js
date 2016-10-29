define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree','rd.core']);
    // 创建一个控制器
app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'DataSourceService' ,function($scope,EventService, EventTypes,DataSourceService) {    	
		$(document).ready(function(){
	        $('#testZtree').on("click", function() {
	            var nodes = rdk.testZtree.tree.getSelectedNodes();
	            if(nodes.length>0){
                    $scope.unselectFun(event, nodes)
	                rdk.testZtree.tree.cancelSelectedNode();
	            }
	        });
    	});
    	$scope.clickFun=function(event, data){
    		event.stopPropagation();
    	}
        $scope.unselectFun=function(event, data){
            console.log(data[0].label);
        }
    	
    }]);
});
