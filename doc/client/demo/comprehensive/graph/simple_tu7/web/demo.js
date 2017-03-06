(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Graph', 'css!base/css/custom','css!rd.styles.IconFonts'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', main];
    function main(scope, EventService) {
        function setSize(){
            var containerHeight=16+22*7;//公式16+26*n  其中n为data数据对象中的header的个数(data.header.length)
            //var containerWidth=jQuery('#graph').parent().width()-108;//其中108 为左侧元素的宽度+margin值
            jQuery('#graph').css('height',containerHeight+"px");//根据数据的长度设置柱状图的自适应高度
        };
        setSize();
        EventService.register('dsGraph', 'result', function(event, data) {
            scope.titles=data.header;
            $('.selector > .selector_symbol').first().addClass('iconfont iconfont-e8b3 selector_symbol_color');
        });
        scope.check_items=function($event){//勾选事件
            var target=jQuery($event.target);
            var portData;
            if(target.hasClass('iconfont iconfont-e8b3 selector_symbol_color')){
                target.removeClass('iconfont iconfont-e8b3 selector_symbol_color');
                target.parent().siblings().children('i').removeClass('iconfont iconfont-e8b3 selector_symbol_color')
                var portData=target.next().html();
                alert(false)

            }else{
                target.addClass('iconfont iconfont-e8b3 selector_symbol_color')
                target.parent().siblings().children('i').removeClass('iconfont iconfont-e8b3 selector_symbol_color')
                portData=target.next().html();
                alert(portData);
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