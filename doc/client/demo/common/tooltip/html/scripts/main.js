define('main', ['rd.attributes.Tooltip', 'rd.controls.Button'], function () {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.Tooltip', 'rd.controls.Button']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope',function (scope) {
        /************************ panel demo test data start ************************/
        scope.content = "<div><h5>嵌入按钮</h5> \
            <rdk_button id='yes' click='clickHandler' label='是'></rdk_button>\
            <rdk_button id='no' click='clickHandler' label='否'></rdk_button></div>"

        scope.clickHandler = function(event, data){
        	alert(event.dispatcher);
        }
    }]);

});

