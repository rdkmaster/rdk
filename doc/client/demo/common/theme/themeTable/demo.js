(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Module','rd.controls.Table',"rd.attributes.theme",'rd.containers.Panel','css!base/css/simple_tab1'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope',main];
    function main($scope,Table,theme,Panel) {
        $scope.setting = {
            "columnDefs" :[
                {
                    title : "操作",
                    render : '<img src="images/tab.png">&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/line.png">'
                }
            ]
        }
        var width = parseFloat($('.main').css('width'));
        var height = parseFloat($('.main').css('height'));//恨据外围 div的长宽给图标自动定位
        $('span.images_right').css({
            'left':(width-1)+"px",
            'top':(height/2-32-100)+"px"
        });
        //左右拉的点击动漫效果
         $scope.images = function(){
            if($('.main').hasClass('images_down')){
                $('.main').removeClass('images_down').addClass('images_up');
                $('span.images_right').addClass('images_left')
            }else{
                $('.main').removeClass('images_up','images_left').addClass('images_down')
                $('span.images_right').removeClass('images_left')
            }
        }
       $('button').click(function(){
            $('.main').toggleClass('selecter');
       })
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