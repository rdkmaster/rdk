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
                value: 28,
                mark: true
            }, {
                label: '良',
                color: '#6AA6C5',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face2.png',
                value: 20,
            }, {
                label: '中间内容',
                color: '#FC9B58',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face3.png',
                value: 16,
            }, {
                label: '差太多',
                color: '#EE6D66',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face4.png',
                value: 24,
                mark: false
            }];

            scope.changeImgAttr = function() {
                scope.isMark = !scope.isMark;
                scope.config = [{
                    label: '优秀',
                    color: '#64D083',
                    emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face1.png',
                    value: 28,
                    mark: true
                }, {
                    label: '良',
                    color: '#6AA6C5',
                    emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face2.png',
                    value: 22,
                    mark: false
                }, {
                    label: '中间内容',
                    color: '#FC9B58',
                    emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face3.png',
                    value: 26,
                    mark: false
                }, {
                    label: '差太多',
                    color: '#EE6D66',
                    emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face4.png',
                    value: 4,
                    mark: scope.isMark
                }];
            }
        }

    ]);
});
