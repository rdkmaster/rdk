(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Input','css!base/css/input','css!rd.styles.IconFonts'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService','EventTypes', main];
    function main(scope,EventService,EventTypes) {
        var allprovinces = ["北京市", "天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区","香港","澳门","台湾"]
        scope.error=false
        scope.province = '';
        scope.iconFont=''
        EventService.register('myInput', EventTypes.BLUR, function(event, data) {
          if(allprovinces.indexOf(data)!=-1|| data.length==0){
              scope.error=false;
              $(".inputContent input").removeClass('errorState')
              if(allprovinces.indexOf(data)!=-1) {
                  scope.iconFont='iconfont  iconfont-e8e4'
              }
          }else{
              $(".inputContent input").addClass('errorState')
              scope.error=true;
              scope.iconFont='iconfont  iconfont-e8e3'
          }
        })
        EventService.register('myInput', EventTypes.CHANGE, function(event, data) {
            scope.iconFont=''
            scope.error=false;
          })
        scope.clickHandler = function(event, data){
            scope.province = data;
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