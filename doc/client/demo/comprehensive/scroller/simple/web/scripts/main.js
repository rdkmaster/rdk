define('main', ['application', 'rd.controls.Scroller'], function(application) {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Scroller']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService', function(scope, DataSourceService) {
            application.initDataSourceService(DataSourceService);
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            //no code here
            scope.clickItem = function(item){
                console.log(item);
                scope.selectedItem = item;
                for (var i = 0; i < scope.dsScroller.length; i++) {
                    if(scope.dsScroller[i].title == scope.selectedItem.title){
                        scope.dsScroller[i].selected = "1"
                    }else{
                        scope.dsScroller[i].selected = "0"
                    }
                };
            }

            // scope.changeStyle=function(item){
            //     if(scope.selectedItem == item ) return {"color":"red"};
            //     else return {"color":"blue"};
            // }
        }

    ]);
});
