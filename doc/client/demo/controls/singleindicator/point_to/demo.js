(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.SingleIndicator'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
    //point_to是当前指向,支持双向绑定，备选left/right/top/bottom
           scope.pointTo = "right";
           scope.leftTob = function(){
          scope.pointTo = "left"
        }
        scope.rightTob = function(){
          scope.pointTo = "right"
        }
        scope.topTob = function(){
          scope.pointTo = "top"
        }
        scope.bottomTob = function(){
          scope.pointTo = "bottom"
        }
        scope.nullTob = function(){
               scope.pointTo = "null"
           }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();