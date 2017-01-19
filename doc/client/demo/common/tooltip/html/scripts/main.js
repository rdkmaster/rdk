define('main', ['rd.attributes.Tooltip', 'rd.controls.Button'], function () {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.Tooltip', 'rd.controls.Button']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope',function (scope) {
        /************************ panel demo test data start ************************/
        scope.content = "<div><h5>嵌入按钮</h5> \
            <rdk_button click='clickHandler($event, yes)' label='{{yes}}'></rdk_button>\
            <rdk_button click='clickHandler($event, no)' label='{{no}}'></rdk_button></div>"

        scope.clickHandler = function(event, data){
        	alert(data);
        }

        scope.yes = 'yes';
        scope.no = 'no';
    }]);

});

