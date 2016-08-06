define('main', ['rd.attributes.modal'], function(){
	var app = angular.module("rdk_app", ['rd.attributes.modal','rd.core']);

	app.controller('myCtrl', ['$scope', 'EventService', function(scope, EventService) {
		scope.setmodal = function(id, madal, pos) {

        /*用以下测试代码时，请先设置基准dom，这里设置p段落为基准*/
        pos = {dom:document.getElementById("id_p"),offSet:"leftTop"};
        EventService.broadcast(id, madal, pos);
    }

	}]);


})

