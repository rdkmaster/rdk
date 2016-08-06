define('main', ['rd.controls.Input'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Input']);
// 创建一个控制器
app.controller('myCtrl', ['$scope', '$timeout', function(scope, $timeout) {

    scope.age = 11;

    scope.editorOptions = {
        lineNumbers: true,
        readOnly: '',
        lineWrapping: true,
        mode: 'javascript'
    };

    scope.option = '<rdk-input ng-model="age"></rdk-input>';

    scope.changeAge=function(){
    	scope.age = scope.age + 1;
    }

    scope.readonly = true;

    $timeout(function(){
    	scope.readonly = false;
    },3000);

}

]);
});
