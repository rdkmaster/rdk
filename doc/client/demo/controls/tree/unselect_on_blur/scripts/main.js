define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree','rd.core']);
    // 创建一个控制器
app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'DataSourceService' ,function($scope,EventService, EventTypes,DataSourceService) {    	
		$(document).ready(function(){
            //你想让那个区域点击失去焦点，就在这个区域上注册click事件
	        $('#testZtree').on("click", function() {
	            var nodes = rdk.testZtree.tree.getSelectedNodes();
	            if(nodes.length>0){
                    $scope.unselectFun(event, nodes)
	                rdk.testZtree.tree.cancelSelectedNode();
	            }
	        });
    	});
        //这个是节点的click事件，节点的事件要阻止冒泡！
    	$scope.clickFun=function(event, data){
    		event.stopPropagation();
    	}
        //这是用来在失去焦点后的，清空之前的选中信息。
        $scope.unselectFun=function(event, data){
            console.log(data[0].label);
        }
    	
    }]);
});
