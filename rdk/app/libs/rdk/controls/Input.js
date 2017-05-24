define(['angular', 'jquery', 'rd.core', 'css!rd.styles.Input','css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var inputApp = angular.module("rd.controls.Input", ['rd.core']);
    inputApp.directive('rdkInput', ['Utils', 'EventService', 'EventTypes','$timeout', function(Utils, EventService, EventTypes,$timeout) {
        var scopeDefine={
            id:"@?",
            placeholder : "@?", 
            readonly: "@?",
            icon: "=?",
            click: "&?",
            change: "&?",
            blur: "&?"
        };
        return {
            restrict: 'EA',
            require: '?ngModel',
            replace: true,
            scope:scopeDefine,
            template: '<div class="rdk-input-module">\
                     <input type="text" class="form-control" placeholder="{{placeholder}}" ng-change="inpChangeHandler()" ng-model="inputContent"  ng-blur="inpBlurHandler()">\
                 <i class="{{icon}}" \
                   style="position:absolute;right:10px;color:gray;font-size:14px;cursor:pointer"\
                   ng-show="showDelete"></i>\
                 <div style="clear:both"></div>\
                </div>',
            controller: ['$scope', function(scope) {
                Utils.publish(scope, this);

                this.getValue = function() {
                    return scope.inputContent;
                }
            }],
            compile: function(tElement, tAttrs, transclude) {
                Utils.checkEventHandlers(tAttrs,scopeDefine);
                return function(scope, iElement, iAttrs, ngModel) {
                    if (!ngModel) return;
                    var inputElement = iElement[0].children[0];
                    var iconElement = iElement[0].children[1];
                    scope.icon = Utils.getValue(scope.icon, iAttrs.icon, "glyphicon glyphicon-remove");

                    //处理STYLE
                    $(inputElement).addClass($(iElement[0]).attr("class"));
                    $(iElement[0]).removeAttr("class");

                    $(inputElement).attr("style", $(iElement[0]).attr("style"));
                    $(iElement[0]).attr("style", "position:relative;" + $(iElement[0]).attr("style"));

                    $(iconElement).css("top", (parseInt($(inputElement).css("height")) - 14) / 2);
                    $(iconElement).css("right", 10 - parseInt($(inputElement).css("margin-left")));

                    scope.$watch("readonly", function(newVal, oldVal){
                        if(newVal == 'true') {
                            $(iElement[0]).find("input").attr("readOnly", true);
                            scope.showDelete = false;
                            $(inputElement).attr("unselectable", "on");
                        } else {
                            $(iElement[0]).find("input").removeAttr("readOnly");
                            $(inputElement).attr("unselectable", "off");
                        }
                    }, false);

                    var updateModel = function(inputValue) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(inputValue);
                            changeShowDelete(inputValue);
                        });
                    };
                    inputElement.oninput = function(event) {
                        updateModel(event.target.value);
                    }
                   $timeout(function(){
                           inputElement.value = ngModel.$viewValue || '';
                   },0)
                    ngModel.$render = function() {
                        inputElement.value = ngModel.$viewValue || '';
                        changeShowDelete(ngModel.$viewValue);
                    };
                    function changeShowDelete(value) {
                        if (value) scope.showDelete = true;
                        else scope.showDelete = false;
                    }

                    iconElement.onclick = function(event) {
                        EventService.raiseControlEvent(scope, EventTypes.CLICK, inputElement.value, defaultHandler);
                    }
                    scope.inpBlurHandler=function(){
                        EventService.raiseControlEvent(scope, EventTypes.BLUR, inputElement.value);
                    };
                    scope.inpChangeHandler=function(){
                        EventService.raiseControlEvent(scope, EventTypes.CHANGE, inputElement.value);
                    };

                    function defaultHandler(){
                        inputElement.value = '';
                        updateModel('');
                    }
                }
            }
        };
    }]);
});
