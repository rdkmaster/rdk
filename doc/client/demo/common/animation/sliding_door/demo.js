(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [ 
        'css!base/demo',
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', '$timeout', 'EventService', main];
    function main(scope, $timeout ,EventService) {
        EventService.register('m', 'ready', readyM);
        function readyM(){
            initDelGraphPosition();
            EventService.remove('m', 'ready', readyM);
        };
        //滑动效果开始
        function initDelGraphPosition(){
            var box = document.getElementById('box');
            var boxWidth = box.offsetWidth; //容器宽

            var divs = $(box).children('div');// 子集合
            var len = divs.length;//div个数
            var divWidth = parseInt(boxWidth/2,10);//每一个子的宽

            var exposeWidth = parseInt(boxWidth/(2*(len-1)),10);  //  遮住的宽
            var slidingDistance = divWidth - exposeWidth;//滑动距离；

            //初始化位置
            function init(){
                divs[0].style.left = '0px';
                for(var j = 1;j < len;j = j+1){
                    divs[j].style.left = divWidth + exposeWidth * (j - 1) + 'px';
                }
            };
            init();
            for(var i = 0;i < len;i = i + 1){
                (function(i){
                    divs[i].addEventListener("mouseover",divMouseover,false);
                    function divMouseover(){
                        init();
                        for(var j = 1;j <= i;j=j+1){
                            divs[j].style.left = parseInt(divs[j].style.left,10) - slidingDistance + 'px';
                        };
                    }
                }(i));
            };
        }
        //滑动效果结束

        // 点击删除效果
        scope.closeGroup = function($event){
            $($event.target.parentNode).remove();
            initDelGraphPosition();
        }

        // 点击放大
        scope.largen = function($event){
            var box = document.getElementById('box');
            var boxWidth = $(box).width(); //容器宽
            var divWidth = parseInt(boxWidth/2,10);//每一个子的宽
            var realWidth = parseInt($($event.target.parentNode).width(),10);
            if(divWidth == realWidth){
                $($event.target.parentNode).addClass("selectDiv");
            }else{
                $($event.target.parentNode).removeClass("selectDiv");
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