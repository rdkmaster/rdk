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
                                        <img alt="img" src="{{item.emotion}}" ng-show="{{item.mark ? true : false}}"/>\
                                        <hr class={{"hrLinePart"+$index}} style="width:6px;" ng-show="{{item.mark ? true : false}}"/>\
                                        <div style="margin-left: {{item.mark ? 0 : 26}}px;background-color:{{item.color}};width:15px;height:{{item.value >= 20 ? item.value : 20}}px;"></div>\
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
                scope.Width0 = 0;
                scope.Width1 = 0;
                scope.Width2 = 0;
                scope.Width3 = 0;
                scope.Width4 = 0;

                scope.initWidth = 10;//初始横线长度
                scope.MaxItem = 5;//config数组的最大长度

                scope.initFaceSpanWidth = function(){
                    var labelEleObj = angular.element(iEle).find('.faceSpan');                    
                    if(!labelEleObj || labelEleObj.length > scope.MaxItem){
                        console.log("未找到对应的元素");
                        return ;
                    }
                    angular.forEach(labelEleObj, function(data,index){
                        //console.log(index + "的值为" + data.innerHTML);
                        if (index == "0") {
                            scope.Width0 = labelEleObj[index].offsetWidth;;
                        } else if (index == "1") {
                            scope.Width1 = labelEleObj[index].offsetWidth;;
                        } else if (index == "2") {
                            scope.Width2 = labelEleObj[index].offsetWidth;;
                        } else if (index == "3") {
                            scope.Width3 = labelEleObj[index].offsetWidth;;
                        } else if (index == "4") {
                            scope.Width4 = labelEleObj[index].offsetWidth;;
                        } else {
                            console.log("未找到对应的元素");
                        }
                     
                    });
                }

                scope.getRealWidth = function(elemID){
                    var tmpWidth = 0;
                    if(elemID == "0"){
                        tmpWidth = scope.initWidth + scope.Width1+scope.Width2+scope.Width3 + scope.Width4;
                    }else if(elemID == "1"){
                        tmpWidth = scope.initWidth + scope.Width2+scope.Width3 + scope.Width4;
                    }else if(elemID == "2"){
                        tmpWidth = scope.initWidth + scope.Width3 + scope.Width4;
                    }else if(elemID == "3"){
                        tmpWidth = scope.initWidth + scope.Width4;
                    }else if(elemID == "4"){
                        tmpWidth = scope.initWidth;
                    }else{
                        tmpWidth = scope.initWidth;
                    }
                    return {"width" : tmpWidth + "px"};
                }
            }

        }
    ])
});
