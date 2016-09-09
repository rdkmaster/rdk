define('main', ['rd.containers.Tab'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.containers.Tab']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            scope.value11=0;
            scope.value12=0.8;
            scope.value13=10;
            scope.value14=10.5;
            scope.value15=66;
            scope.value16=67.8;
            scope.value17=14;
            scope.value18=21.2;
            scope.value19=14;
            scope.value1a=21.2;

            scope.value2=96;
            scope.value20=100;
            scope.value21=0;
            scope.value22=0.8;
            scope.value23=10;
            scope.value24=10.5;
            scope.value25=66;
            scope.value26=67.8;
            scope.value27=14;
            scope.value28=21.2;

            scope.value3=91;
            scope.value30=100;
            scope.value31=0;
            scope.value32=0.8;
            scope.value33=10;
            scope.value34=10.5;
            scope.value35=66;
            scope.value36=67.8;
            scope.value37=14;
            scope.value38=21.2;
        }

    ]);
});
