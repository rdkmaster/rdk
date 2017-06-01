define(['angular', 'jquery', 'rd.core', 'css!rd.styles.ComboSelect','css!rd.styles.animate',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var comboModule = angular.module('rd.controls.ComboSelect', ['rd.core']);
    comboModule.directive('rdkComboSelect', ['Utils','EventService', 'EventTypes', 'RDKConst', '$timeout',
        function(Utils, EventService, EventTypes, RDKConst, $timeout) {
            var zIndex = 0;
            var scopeDefine={
                id: '@',
                caption: '=?',
                open: '=?',
                showClear: '=?',
                showIcon: '=?',
                openPolicy:'@?',
                frozen: '=?',
                clear: '&?',
                childChange: '&?',
                adaptContentWidth:'=?'
            };
            return {
                restrict: 'E',
                replace: true,
                transclude: true,

                scope: scopeDefine,
                template:'<div class="rdk-combo-select-module" ng-mouseleave="closeShow()">\
                              <div class="rdk-combo-animate">\
                                  <div class="combo-content" ng-class="{\'combo-content-open\':open}" ng-mouseenter="openShow()" ng-click="toggle($event)">\
                                      <span class="combo-caption" ng-show="!!caption">{{caption}}</span>\
                                      <p class="combo-content-theme" ng-class="{\'margin-hide\':!!showClear}" title="{{inputStr}}" \
                                      unselectable="on" ng-model="inputStr">{{inputStr}}</p>\
                                      <i ng-if="showIcon" class="{{open?unfoldedIcon:foldedIcon}} combo-content-icon"></i>\
                                      <i ng-if="!!inputStr && showClear" class="fa fa-times-circle fa-1 combo-content-close" ng-click="clearData($event)"></i>\
                                  </div>\
                              </div>\
                              <div class="combo-content-transclude" on-finish-render="domRenderFinished">\
                                  <div ng-transclude ng-show="open" class="rdk-scroll"></div>\
                              </div>\
                          </div>',

                controller: ['$scope', function(scope) {
                    Utils.onChildChange(scope, function(data, context) {
                        var str = '';
                        var userChangeHandler = scope.childChange(scope);
                        if (userChangeHandler) {
                            try {
                                str = userChangeHandler(data, context);
                            } catch (e) {
                                console.warn('call user change handler error: ');
                                console.warn(e.stack);
                            }
                        } else {
                            if (angular.isArray(data)) {
                                angular.forEach(data, function(item) {
                                    str += angular.isString(item) ? (item + ', ') : '';
                                });
                            } else {
                                str = angular.isString(data) ? data : '';
                            }
                        }
                        if (data === RDKConst.STOP_PROPAGATIOIN) {
                            return data;
                        }
                        scope.inputStr = str;
                        if(scope.adaptContentWidth){scope.animate();}
                    });
                    Utils.publish(scope, this);
                    this.changeOpenStatus = function(){
                        scope.open =! scope.open;
                        scope.isSelect=false;
                    };
                    this.lockCloseShow = function(){
                        scope.isSelect=true;
                    };

                    this.setValue = function(data){
                        scope.inputStr = data;
                        if(scope.adaptContentWidth){scope.animate();}
                    };
                    this.getValue = function() {
                        return scope.inputStr;
                    }
                    this.closeOpen = function(){
                        scope.open = false;
                        scope.isSelect=false;
                    };
                    this.setCaption = function(caption){
                        scope.caption = caption;
                    }
                    this.getCaption = function() {
                        return scope.caption;
                    }
                }],
                controllerAs:'comboSelectCtrl',
                compile: function(tEle, tAttrs) {
                    Utils.checkEventHandlers(tAttrs,scopeDefine);
                    return {
                        post: _link
                    }
                }
            };

            function _link(scope, iEle, iAttrs, ctrl, transclude) {
                var hasOpen = scope.open = Utils.isTrue(scope.open, false);
                scope.frozen = Utils.isTrue(scope.frozen, false);
                scope.showClear = Utils.isTrue(scope.showClear, false);
                scope.showIcon = Utils.isTrue(scope.showIcon, true);
                scope.adaptContentWidth = Utils.isTrue(scope.adaptContentWidth, false);
                scope.inputStr = Utils.getValue(scope.inputStr, iAttrs.inputStr, '');
                scope.unfoldedIcon = "fa fa-angle-up";
                scope.foldedIcon = "fa fa-angle-down";
                scope.openPolicy = scope.openPolicy || "click";
                scope.toggle = _toggle;
                scope.closeShow = _closeShow;
                scope.openShow = _openShow;
                scope.isSelect = false;
                var _textDom = iEle[0].querySelector(".combo-content-theme");
                if(scope.adaptContentWidth){
                    var _comboAnimateDom = iEle[0].querySelector(".rdk-combo-animate");
                    var _comboContentDom = _comboAnimateDom.querySelector(".combo-content");
                    _textDom.classList.add("width-changed");
                    var isIE = Utils.isIE();
                    if(!isIE){
                        _comboContentDom.style.display="inline-flex";
                    }
                    var _animate = Utils.widthChangeAnimate;
                    scope.animate = function(){
                        _animate(_comboAnimateDom,_comboContentDom);
                    };
                    scope.$on('domRenderFinished',_initWidth);
                    function _initWidth(){
                        _comboAnimateDom.style.width = Utils.getStyle(_comboContentDom,"width");
                    }
                }else{
                    _textDom.classList.add("width-fixed");
                }

                if(scope.id) {
                    EventService.register(scope.id, EventTypes.CHANGE, function(event, data) {
                        scope.inputStr = data;
                        if(scope.adaptContentWidth){scope.animate();}
                    });
                }

                $(document).mouseup(_hideDropdown);

                scope.$watch('open', function() {
                    $(document).unbind('mouseup', _hideDropdown);
                    if (scope.open) {
                        $(document).mouseup(_hideDropdown);
                    }
                }, false);

                scope.$watch('frozen', function() {
                    scope.frozen ? $(iEle).find('p').css('cursor', 'not-allowed') : $(iEle).find('p').css('cursor', 'pointer');
                }, false);

                scope.clearData = function(event) {
                    event.stopPropagation();
                    EventService.raiseControlEvent(scope, EventTypes.CLEAR, scope.id);
                    scope.inputStr = '';
                };

                function _hideDropdown(e) {
                    //冻结
                    if(scope.frozen) return;
                    if(!$(iEle).is(e.target) && $(iEle).has(e.target).length === 0) {
                        $timeout(function() {
                            scope.open = false;
                            if(scope.openPolicy === "hover") {
                                scope.isSelect = false;
                            }
                        }, 0)
                    }
                }

                function _toggle(e) {
                    if(scope.frozen || e.target.nodeName=="SPAN") return;//冻结
                    if(hasOpen) {   //初始open=true时直接关闭
                        scope.open =! scope.open;
                        hasOpen = false;
                    } else if(scope.isSelect || !scope.open) {
                        scope.open =! scope.open;
                        hasOpen = false;
                        if(!scope.open) {
                            scope.isSelect = false;
                            return;
                        }
                    }
                    scope.isSelect = true;

                    if(scope.id) _broadcastEvents();
                }

                function _broadcastEvents(){
                    scope.open ? EventService.broadcast(scope.id, EventTypes.OPEN) : EventService.broadcast(scope.id, EventTypes.CLOSE);
                }

                function _closeShow() {
                    if(scope.isSelect || scope.openPolicy != "hover"){ //在进行选择地区过程中锁住close事件
                        return;
                    }
                    scope.open = false;
                }

                function _openShow() {
                    if(scope.openPolicy != "hover"){
                        return;
                    }
                    scope.open = true;
                }
            }
        }])
});