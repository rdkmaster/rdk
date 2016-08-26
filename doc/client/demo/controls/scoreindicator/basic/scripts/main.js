define('main', ['rd.controls.ScoreIndicator'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.ScoreIndicator']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', '$timeout', function(scope, $timeout) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            scope.isMark = false;

            scope.config = [{
                label: '优秀',
                color: '#64D083',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face1.png',
                value: 20,
                mark: true
            }, {
                label: '良',
                color: '#6AA6C5',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face2.png',
                value: 20,
                mark: false
            }, {
                label: '中间内容',
                color: '#FC9B58',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face3.png',
                value: 20,
                mark: false
            }, {
                label: '差太多',
                color: '#EE6D66',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face4.png',
                value: 20,
                mark: false
            }, {
                label: '新值测试',
                color: '#006D66',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face4.png',
                value: 20,
                mark: false
            }];

            scope.changeImgAttr = function() {
                scope.isMark = !scope.isMark;
                if(scope.isMark){
                    scope.config[0].mark = false;
                    scope.config[0].value = 40;
                    scope.config[1].mark = true;
                    scope.config[1].value = 15;
                    scope.config[2].value = 15;
                    scope.config[3].value = 15;
                    scope.config[4].value = 15;
                }else{
                    scope.config[0].mark = true;
                    scope.config[0].value = 20;
                    scope.config[1].mark = false;
                    scope.config[1].value = 20;
                    scope.config[2].value = 20;
                    scope.config[3].value = 20;
                    scope.config[4].value = 20;
                }
            }

        }

    ]);
});
