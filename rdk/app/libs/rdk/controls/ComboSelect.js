define(['angular', 'jquery', 'rd.core', 'css!rd.styles.ComboSelect',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var comboModule = angular.module('rd.controls.ComboSelect', ['rd.core']);
    comboModule.directive('rdkComboSelect', ['Utils', 'EventService', 'EventTypes', 'RDKConst',
        function(Utils, EventService, EventTypes, RDKConst) {
            var zIndex = 0;
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                update: '&?',
                scope: {
                    id: '@',
                    caption: '=?',
                    open: '=?',
                    frozen: '=?',
                    
                    childChange: '&?'
                },
                template:'<div class="rdk-combo-select-module" ng-click="stopPropagation()">\
                        <span class="combo-caption">{{caption}}</span>\
                        <div class="combo-content" tabindex="1" ng-blur="blur()"\
                             ng-mouseenter="mouseEnterHandler()"\
                             ng-mouseleave="mouseLeaveHandler()">\
                            <input class="form-control combo-content-theme" title="{{inputStr}}" \
                                readonly="true" ng-model="inputStr" ng-click="toggle()" type="text"/>\
                            <div ng-transclude ng-show="open" class="combo-content-transclude">\
                            </div>\
                        </div>\
                    </div>',

                controller: ['$scope', function(scope) {
                    Utils.onChildChange(scope, function(data, context) {
                        var userChangeHandler = scope.childChange(scope);
                        if (userChangeHandler) {
                            try {
                                data = userChangeHandler(data, context);
                            } catch (e) {
                                console.warn('call user change handler error: ' + e);
                            }
                        } else {
                            data = angular.isArray(data) ? data.join(', ') : data.toString();
                        }
                        if (data === RDKConst.STOP_PROPAGATIOIN) {
                            return data;
                        }
                        scope.inputStr = data;
                    });
                }],
                compile: function(tEle, tAttrs) {
                        return {
                            post: _link
                        }
                    },
                transclude: true                    
            }

            function _link(scope, iEle, iAttrs, ctrl, transclude) {
                scope.caption = Utils.getValue(scope.caption, iAttrs.caption, '标题');
                scope.open = Utils.isTrue(scope.open, false);
                scope.frozen = Utils.isTrue(scope.frozen, false);

                scope.toggle = _toggle;
                scope.mouseEnterHandler = _mouseEnterHandler;
                scope.mouseLeaveHandler = _mouseLeaveHandler;
                scope.blur = _blur;
                scope.stopPropagation = _stopPropagation;

                if(scope.id) {
                    EventService.register(scope.id, EventTypes.CHANGE, function(event, data) {
                        scope.inputStr = data;
                    });
                }

                if(scope.open){//初始化时如果open为true，div需获取焦点
                    _mouseLeaveHandler();
                }

                function _stopPropagation(){
                    event.stopPropagation();
                }
                
                function _toggle(){
                    if(scope.frozen) return;//冻结
                    scope.open = !scope.open;
                }

                function _mouseEnterHandler(){
                    scope.leaveFlag = false;
                }

                function _mouseLeaveHandler(){
                    scope.leaveFlag = true;
                    if (scope.open) { //多个combo时，避免另外combo获取焦点时响应原combo的blur
                        $(iEle[0].childNodes[3]).focus();
                    }                    
                }

                function _blur(){
                    if (scope.leaveFlag) {
                        scope.toggle();
                    }                   
                }
            }
        }])
    });