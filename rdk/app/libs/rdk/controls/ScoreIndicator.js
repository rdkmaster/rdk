define(['rd.core', 'css!rd.styles.ScoreIndicator',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap','css!rd.styles.IconFonts'
], function () {
    var scoreIndicatorApp = angular.module('rd.controls.ScoreIndicator', ['rd.core']);
    scoreIndicatorApp.directive('rdkScoreIndicator', ['Utils',
        function (Utils) {
            var scopeDefine={
                config: '=?'
            };
            return {
                restrict: 'E',
                replace: true,
                template: '<div   class="distributionNew">\
                            <div class="distributionSub">\
                                <div ng-repeat = "item in config track by $index" style="display:flex;"  class={{"score-base-color"+$index}}>\
                                    <div class={{"score-bg-color"+$index}} style="position:relative;background-color:{{item.color}};width:10px;height:{{setHeight(item.value)}}px;">\
                                        <div style="display:flex;position: absolute;align-items: center;top: {{setHeight(item.value)/2-10}}px;right: 10px"  ng-show="setMark(item)">\
                                            <i ng-if="isIcon(item)" ng-class="iconClass($index,item)" style="font-size: 22px;color:{{item.color}}" />\
                                            <img ng-if="!isIcon(item)" ng-src="{{item.emotion}}" alt="img"/>\
                                            <hr style="width:6px;border-top:1px solid {{item.color}};"/>\
                                        </div>\
                                        <div style="display:flex;position: absolute">\
                                            <hr class="hrLinePart" style="border-top-color:{{item.color}}" ng-style="getRealWidth($index)">\
                                            <span id="scoreText" style="white-space: nowrap;color:{{item.color}};">{{item.label + item.value + "%"}}</span>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                       </div>',
                scope: scopeDefine,
                link: _link
            };

            function _link(scope, iEle, iAttrs, ctrl, transclude) {
                Utils.checkEventHandlers(iAttrs,scopeDefine);
                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                scope.initWidth = 20; //初始横线长度
                scope.widthArr = [];
                scope.iconClass=function(index,item){
                    var faSmile="";
                    if(item.emotion===undefined ||item.emotion===null)
                    {
                        switch (index){ //todo:等字体图标实现后再修改
                            case 0:faSmile="iconfont-e8be";break;
                            case 1:faSmile="iconfont-e8bd";break;
                            case 2:faSmile="iconfont-e8bf";break;
                            case 3:faSmile="iconfont-e8bc";break;
                            default:faSmile="";
                        }
                    }else{
                        faSmile=item.emotion;
                    }
                    return "iconfont "+ faSmile +" faceSpan"+index
                };
                scope.isIcon=function(item){
                    if(item.emotion && item.emotion.match(/[^\s]+\.(jpg|gif|png|bmp|jpeg)/i))
                    {
                        return false;
                    }
                    return true;
                };

                var height = iEle[0].offsetHeight > 0 ? iEle[0].offsetHeight : 300;

                scope.setHeight = function (proValue) {
                    var parentHeight = height;
                    var itemHeight = parentHeight * proValue / 100;
                    return itemHeight;
                };

                scope.setMark = function (item) {
                    return item.mark ? true : false;
                };

                scope.getRealWidth = function (elemID) {
                    var tmpWidth = scope.initWidth;
                    var tmpWidthArr = scope.widthArr.slice(elemID + 1);
                    angular.forEach(tmpWidthArr, function (data) {
                        tmpWidth = tmpWidth + data + 5;
                    });
                    return {
                        "width": tmpWidth + "px"
                    };
                };

                if (!!MutationObserver) {
                    var $observer = new MutationObserver(function () {
                            var labelEleObj = iEle[0].querySelectorAll("#scoreText");
                            scope.$apply(function () {
                                angular.forEach(labelEleObj, function (data,index) {
                                    if (scope.widthArr.length < index + 1) {
                                        scope.widthArr.push(data.offsetWidth);
                                    } else {
                                        scope.widthArr[index] = data.offsetWidth;
                                    }
                                });
                            });
                        }
                    );
                    $observer.observe(iEle[0], {
                        'childList': true,
                        'subtree': true
                    });
                    scope.$on('$destroy', function () {
                        $observer.disconnect();
                    });
                }
            }
        }
    ])
});
