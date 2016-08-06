define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
        $scope.setting = {
        	"columnDefs" :[
            	{
            		title : "编辑列",
                    render : '<a ng-click="appScope.click(item)">点击</a>'
            	},{
                    title : "索引添加",
                    targets : 1,
                    override : false,
                    render : "渲染内容"
                },{
                    title : "索引添加2",
                    targets : 2,
                    override : false,
                    render : "渲染内容2"
                },{
                    targets:"position",
                    render:function(item){
                        if(item.position == "Accountant")
                            return "<p style='color:red'>"+item.position+"</p>";
                        else 
                            return item.position;
                    }
                }
        	]
        }

        $scope.click = function(item){
            alert("新添加的具有点击功能的列！");
        }
    }]);
});
