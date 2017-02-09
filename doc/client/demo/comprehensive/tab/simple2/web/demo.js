(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table','css!base/css/simple_tab1','css!rd.styles.IconFonts'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
         scope.setting = {
            "columnDefs" :[
                {
                    title : "操作",
                    render : '<i class="iconfont iconfont-e8b7"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont iconfont-e8c8"></i>'
                }
            ]
        }
        function  imagePosition(){
            var width = parseFloat($('.main').css('width'));
            var height = parseFloat($('.main').css('height'));//恨据外围 div的长宽给图标自动定位
            $('button.images_right').css({
                'left':(width-1)+"px",
                'top':(height/2-32)+"px"
            });
        }
        imagePosition();
        //左右拉的点击动漫效果
        scope.iconCondition = true;
        scope.images = function(){
            scope.iconCondition = !scope.iconCondition;
            if($('.main').hasClass('images_down')){
                $('.main').removeClass('images_down').addClass('images_up');
            }else{
                $('.main').removeClass('images_up').addClass('images_down')
            }
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