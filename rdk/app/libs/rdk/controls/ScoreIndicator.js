define(['rd.core', 'css!rd.styles.ScoreIndicator',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'
], function() {
    var scoreIndicatorApp = angular.module('rd.controls.ScoreIndicator', ['rd.core']);
    scoreIndicatorApp.directive('rdkScoreIndicator', ['EventService', 'Utils', 'EventTypes', '$timeout', '$compile',
        function(EventService, Utils, EventTypes, $timeout, $compile) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="distributionNew">\
                        <div style="display:flex;justify-content: space-between;">\
                        <div class="distributionSub">\
                            <div ng-repeat = "item in config" style="display:flex;">\
                                <div style="display:flex;">\
                                    <span style="color:#D5CCBE;" ng-show="{{$index == 0 ? true : false}}">100%</span>\
                                    <hr class="hrLinePart5" ng-show="{{$index == 0 ? true : false}}"/>\
                                </div>\
                                <div style="display:flex;align-items: center;margin-left: {{$index == 0 ? -26 : 60}}px;">\
                                    <img alt="img" src="{{item.emotion}}" ng-show="setMark(item)"/>\
                                    <hr class={{"hrLinePart"+$index}} style="width:6px;" ng-show="setMark(item)"/>\
                                    <div style="margin-left: {{item.mark ? 0 : 26}}px;background-color:{{item.color}};width:15px;height:{{setHeight(item.value)}}px;"></div>\
                                </div>\
                                <div style="display:flex;">\
                                    <p ng-show=false>{{initFaceSpanWidth()}}</p>\
                                    <hr class={{"hrLinePart"+$index}} ng-style="getRealWidth($index)">\
                                    <span class="faceSpan" style="color:{{item.color}};">{{item.label + item.value + "%"}}</span>\
                                </div>\
                            </div>\
                        </div>\
                        </div>\
                       </div>',
                scope: {
                    config: '=?'
                },
                compile: function(tEle, tAttrs) {
                    return {
                        post: _link
                    }
                }
            };

            function _link(scope, iEle, iAttrs, ctrl, transclude) {
                scope.initWidth = 10; //初始横线长度
                scope.widthArr = new Array();
                var height = iEle[0].offsetHeight > 0 ? iEle[0].offsetHeight : 300;

                scope.setHeight = function(proValue) {
                    var parentHeight = height;
                    var itemHeight = parentHeight * proValue / 100;
                    return itemHeight;
                }

                scope.setMark = function(item){
                    return item.mark ? true : false;
                }

                scope.initFaceSpanWidth = function() {
                    var labelEleObj = iEle.find('.faceSpan');
                    if (!labelEleObj) {
                        console.error("未找到对应的元素");
                        return;
                    }
                    angular.forEach(labelEleObj, function(data, index) {
                        if (scope.widthArr.length < index + 1) {
                            scope.widthArr.push(labelEleObj[index].offsetWidth);
                        } else {
                            scope.widthArr[index] = labelEleObj[index].offsetWidth;
                        }
                    });
                }

                scope.getRealWidth = function(elemID) {
                    var tmpWidth = scope.initWidth;
                    var tmpWidthArr = scope.widthArr;
                    tmpWidthArr.splice(0, elemID + 1);
                    angular.forEach(tmpWidthArr, function(data) {
                        tmpWidth = tmpWidth + data;
                    });
                    return {
                        "width": tmpWidth + "px"
                    };
                }

                // scope.$watch('scope.config', function(newValue, oldValue) {
                //     angular.forEach(newValue, function(item, key) {
                //         if (newValue != oldValue) {
                //             item.label = newValue[key].label;
                //             item.color = newValue[key].color;
                //             item.emotion = newValue[key].emotion;
                //             item.value = newValue[key].value;
                //             item.mark = newValue[key].mark;
                //         }
                //     });
                // }, true);

            }

        }
    ])
});
