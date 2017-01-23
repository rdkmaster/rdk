(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Graph','rd.services.EventService'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService', main];
    function main($scope,EventService) {
        $scope.showNumber=0;
        EventService.register('pie', 'click', function(event,data){
            $scope.showNumber=data.dataIndex;
            var pie_class= "div.pie" +(data.dataIndex+1);
            $scope.clickNumber=null;
            if(data.name=="其它问题"){
                $scope.clickNumber=0;
                $scope.showNumber=null;
                $('#line').css("display","inline-block")
            }else{$('#line').css("display","none")}
        });
        $scope.clickNumber=null;
        $scope.numClick=function($event){
            $scope.clickNumber=$event.target.getAttribute('data');
            console.log( $event.target)
        }
        EventService.register('pie', 'graph_update', function(event,data){
           var option=data.option;
            EventService.register('pie', 'click', function(event,data){
                if(data.data.selected=false){
                    option.series.selectedMode="";
                }
             });
        });
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