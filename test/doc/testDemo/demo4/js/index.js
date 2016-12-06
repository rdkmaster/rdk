angular.module('App',[]).controller("myCtr",function($scope){
    $scope.arry=[
    	'China','Japan','American'
    ];
    $scope.change=function(val){
    	$scope.country=value;
    }
})