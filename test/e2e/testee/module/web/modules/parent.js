define([],function(){
    rdk.$ngModule.controller('parentCtr',['$scope','Utils',function(scope,Utils){
        scope.loadChild=function(){
            rdk.childModule.loadModule();
        }
    }]);
});