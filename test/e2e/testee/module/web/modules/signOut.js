define([],function(){
    rdk.$ngModule.controller("sign_out",['$scope','Utils',function(scope,Utils){
        scope.message="此场景为用户登出";
        this.controller="sign_out controller";
        this.sayHello=function(){
            return 'hello world';
        }
    }]);
});