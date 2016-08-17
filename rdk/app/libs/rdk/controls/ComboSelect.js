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
                        <div class="combo-content">\
                            <span class="combo-caption" ng-show="{{!!caption}}">{{caption}}</span>\
                            <input class="form-control combo-content-theme" title="{{inputStr}}" \
                                readonly="true" ng-model="inputStr" ng-click="toggle()" type="text"\
                                ng-mouseenter="mouseEnterHandler()" ng-mouseleave="mouseLeaveHandler()"/>\
                            <i class="{{open?unfoldedIcon:foldedIcon}} combo-content-icon"></i>\
                        </div>\
                        <div class="combo-content-transclude" tabindex="1" ng-blur="blur()"\
                             ng-mouseenter="mouseEnterHandler()" ng-mouseleave="mouseLeaveHandler()">\
                            <div ng-transclude ng-show="open"></div>\
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
                scope.open = Utils.isTrue(scope.open, false);
                scope.frozen = Utils.isTrue(scope.frozen, false);
                scope.unfoldedIcon = "fa fa-angle-up";
                scope.foldedIcon = "fa fa-angle-down";

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

                _resetTranscludeFocus();

                function _resetTranscludeFocus(){
                    if(scope.open){
                        $(iEle[0].childNodes[3]).focus();
                    }
                }

                function _stopPropagation(){
                    event.stopPropagation();
                }
                
                function _toggle(){
                    if(scope.frozen) return;//冻结
                    scope.open = !scope.open;
                    _resetTranscludeFocus();
                }

                function _blur(){
                    if (scope.leaveFlag){//非外面input和transclude内容时响应
                        scope.open = false;
                    }                 
                }

                function _mouseEnterHandler(){
                    scope.leaveFlag = false;
                }

                function _mouseLeaveHandler(){
                    scope.leaveFlag = true;  
                    _resetTranscludeFocus();          
                }
            }
        }])
    });