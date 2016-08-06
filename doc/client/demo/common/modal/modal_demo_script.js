var app = angular.module('myApp', ['rd.basic', 'rd.attributes.modal']);
app.controller('ctrl', ['$scope', 'EventService', function($scope, EventService) {
    $scope.setmodal = function(id, madal, pos) {

    	/*用以下测试代码时，请先设置基准dom，这里设置p段落为基准*/
    	// pos = {x:30, y:50, z:111};
    	// pos = {dom:document.getElementById("id_p"),offSet:[100,50]};
    	// pos = {dom:document.getElementById("id_p"),offSet:"leftTop"};
    	// pos = {dom:document.getElementById("id_p"),offSet:"rightTop"};
    	// pos = {dom:document.getElementById("id_p"),offSet:"center"};
    	// pos = {dom:document.getElementById("id_p"),offSet:"leftBottom"};
    	// pos = {dom:document.getElementById("id_p"),offSet:"rightBottom"};
        EventService.broadcast(id, madal, pos);
    }
}]);