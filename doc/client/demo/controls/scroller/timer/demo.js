(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Scroller'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.images=[{src:'img/img1.png',title:'Pic 1'},
                      {src:'img/img2.jpg',title:'Pic 2'},
                      {src:'img/img3.jpg',title:'Pic 3'},
                      {src:'img/img4.png',title:'Pic 4'},
                      {src:'img/img5.png',title:'Pic 5'}];
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