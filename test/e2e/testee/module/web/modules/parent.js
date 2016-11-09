define([],function(){
    rdk.$app.controller('parentCtr',['$scope','Utils',function(scope,Utils){
        scope.loadChild=function(){
            rdk.childModule.loadModule();
        }
    }]);
});