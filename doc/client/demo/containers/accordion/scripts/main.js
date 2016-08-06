//angular ui load new 
define('main', [
    'rd.containers.Accordion'
], function() {
    //TODO　RDK 创建APP,依赖传递参数
    var app = angular.module("rdk_app", [
        'rd.containers.Accordion'
    ]);

	app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', '$timeout', function (scope, EventService, EventTypes, $timeout) {
		EventService.init(scope);

		scope.buttonSource = [
			{
				icon: "img/refresh.png", 
				label: "按钮1",
				tooltips: "我是按钮1",
				callback:function(obj,htmlID){
					console.log("click button1");
				}
			},

			{
				icon: "img/refresh.png", 
				label: "按钮2",
				// tooltips: "我是按钮2",
				callback:function(obj){
					console.log("click button2");
				}
			}
		];

    	scope.foldedIcon = "fa fa-angle-double-down"
    	scope.unfoldedIcon = "fa fa-angle-double-up";		

	    $timeout(function(){
	    	scope.caption = '标题栏';
	    	scope.foldedIcon = "fa fa-arrow-circle-down";
	    	scope.unfoldedIcon = "fa fa-arrow-circle-up";
	    	scope.buttonSource = [
	    	{
	    		icon: "img/refresh.png", 
	    		label: "按钮1",
	    		tooltips: "我是按钮1",
	    		callback:function(obj,htmlID){
	    			console.log("click button1");
	    		}
	    	}
			];	    	
	    },3000);

	}])
})







