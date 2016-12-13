define(['angular', 'jquery', 'rd.core', 'css!rd.styles.ComboSelect',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var comboModule = angular.module('rd.controls.ComboSelect', ['rd.core']);
    comboModule.directive('rdkComboSelect', ['Utils', 'EventService', 'EventTypes', 'RDKConst', '$timeout',
        function(Utils, EventService, EventTypes, RDKConst, $timeout) {
            var zIndex = 0;
            return {
                restrict: 'E',
                replace: true,
                transclude: true,

                scope: {
                    id: '@',
                    caption: '=?',
                    open: '=?',
                    openPolicy:'@?',
                    frozen: '=?',
                    childChange: '&?',
                },
                template:'<div class="rdk-combo-select-module" ng-mouseleave="closeShow()">\
                              <div class="combo-content" ng-mouseenter="openShow()">\
                                  <span class="combo-caption" ng-show="!!caption">{{caption}}</span>\
                                  <input class="form-control combo-content-theme" title="{{inputStr}}" \
                                  readonly="true" unselectable="on" ng-model="inputStr" ng-click="toggle()" type="text"/>\
                                  <i class="{{open?unfoldedIcon:foldedIcon}} combo-content-icon"></i>\
                              </div>\
                              <div class="combo-content-transclude">\
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
                    };
                    this.getValue = function() {
                        return scope.inputStr;
                    }

                    this.setCaption = function(caption){
                        scope.caption = caption;
                    }
                    this.getCaption = function() {
                        return scope.caption;
                    }
                }],
                controllerAs:'comboSelectCtrl',
                compile: function(tEle, tAttrs) {
                    return {
                        post: _link
                    }
                }
            };

            function _link(scope, iEle, iAttrs, ctrl, transclude) {
                var hasOpen = scope.open = Utils.isTrue(scope.open, false);
                scope.frozen = Utils.isTrue(scope.frozen, false);
                scope.unfoldedIcon = "fa fa-angle-up";
                scope.foldedIcon = "fa fa-angle-down";
                scope.openPolicy = scope.openPolicy || "click";
                scope.toggle = _toggle;
                scope.closeShow = _closeShow;
                scope.openShow = _openShow;
                scope.isSelect = false;

                if(scope.id) {
                    EventService.register(scope.id, EventTypes.CHANGE, function(event, data) {
                        scope.inputStr = data;
                    });
                }

                $(document).mouseup(function(e){
                    if(!$(iEle).is(e.target) && $(iEle).has(e.target).length === 0){
                        $timeout(function(){
                            scope.open = false;
                            if(scope.openPolicy==="hover"){
                                scope.isSelect = false;
                            }
                        }, 0)
                    }
                });

                function _toggle(){
                    if(scope.frozen) return;//冻结
                    if(hasOpen){   //初始open=true时直接关闭
                        scope.open=!scope.open;
                        hasOpen=false;
                    }
                    else if(scope.isSelect || !scope.open)
                    {
                        scope.open=!scope.open;
                        hasOpen=false;
                        if(!scope.open){
                            scope.isSelect = false;
                            return;
                        }
                    }
                    scope.isSelect=true;
                }

                function _closeShow()
                {
                    if(scope.isSelect || scope.openPolicy!="hover"){ //在进行选择地区过程中锁住close事件
                        return;
                    }
                    scope.open=false;
                }
                function _openShow()
                {
                    if(scope.openPolicy!="hover"){
                        return;
                    }
                    scope.open=true;
                }
            }
        }])
});