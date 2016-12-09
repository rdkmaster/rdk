define('main', ['rd.attributes.modal','bootstrap','bootstrap-select','rd.controls.Button'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.modal','rd.core','rd.controls.Button']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService',function($scope,EventService) {
        $scope.setmodal = function(id, modal, position) {
            EventService.broadcast(id, modal, position);
            $('.selectpicker').selectpicker();
            $('.content>ul>li:nth-child(2)>i').click(function(){
            	$(this).css({'background': '#5395d8',
							 'color': '#fff'}).siblings('i').css({'background': '#fff',
							 								'color': '#999'})
            })
        }
    }]);
});
