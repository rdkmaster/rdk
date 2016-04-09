var app = angular.module("InputApp", ['rdk','ui.codemirror']);
app.controller('InputController', ['$scope', function($scope) {
    $scope.age = 11;

    $scope.editorOptions = {
        lineNumbers: true,
        readOnly: '',
        lineWrapping: true,
        mode: 'javascript'
    };

    $scope.option = '<rdk-input ng-model="age"></rdk-input>';

    $scope.changeAge=function(){
    	$scope.age = $scope.age + 1;
    }
}]);
