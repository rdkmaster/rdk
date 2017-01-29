(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.SingleIndicator'
    ];
    var extraModules = [ ];
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
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();