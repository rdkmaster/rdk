define(['angular', 'jquery', 'rd.core', 'css!rd.styles.Accordion',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var accordionModule = angular.module('rd.containers.Accordion', ['rd.core']);

    accordionModule.constant("PositionTypes", {
        TOP: 'top',
        BOTTOM: 'bottom',
        LEFT: 'left',
        RIGHT: 'right',
    });


    accordionModule
        .directive('rdkAccordion', ['Utils', 'EventService', 'EventTypes', '$compile', 'PositionTypes',function(Utils, EventService, EventTypes, $compile, PositionTypes) {
            return{
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    foldedIcon: '=?',
                    unfoldedIcon: '=?',
                    caption: '=?',

                    frozen: '=?',
                    open: '=?',
                    editable: '=?',

                    childChange: '&?',

                    buttons: '=',
                    id: '@',
                    expandDirection: '@'
                }, 
                template: 
                '<div class="rdk-accordion-module" ng-click="stopPropagation()">\
                    <div class="theme" ng-click="toggle()">\
                        <i class="{{open?unfoldedIcon:foldedIcon}}"></i>\
                        <span ng-show="!!caption" class="theme-caption" contentEditable="{{editable}}"\
                         ng-keydown="keyPressHandler($event)"\
                         >\
                            {{caption}}\
                        </span>\
                        <div class="theme-buttons" ng-show="showButtons">\
                            <a href="javascript:void(0)" class="btn btn-link"\
                                ng-repeat="button in buttons"\
                                ng-click="clickHandler(button.callback, button, id)"\
                                ng-mouseover=getTooltips($event,button.tooltips,button.label)>\
                                <img ng-src="{{button.icon}}">{{button.label}}\
                            </a>\
                        </div>\
                    </div>\
                    <div ng-show="open" class="content"></div>\
                </div>',  

                controller: ['$scope', function(scope) {
                    Utils.onChildChange(scope, scope.childChange(scope));
                }],
                compile: function(tEle, tAttrs){
                        return {
                            post: _link
                        }
                },
                terminal: true          
            }

            function _link(scope, iEle, iAttrs, ctrl, transclude){

                var transcludeScope = scope.$parent.$new();
                transclude(transcludeScope, function(clone,innerScope) {
                    for (var key in clone){
                        if (clone.hasOwnProperty(key) && clone[key].tagName == "HEADER_RENDERER") {
                            $(iEle).find(".theme").html("").append(clone[key].innerHTML);
                            $(clone[key]).css('display', 'none');
                        }
                    };
                    if(!iEle.attr('ng-repeat')){//ng-repeat要最后编译
                        $compile(iEle)(scope);
                    }
                    $(iEle).find(".content").html("").append(clone);
                }); 

                if(iEle.attr('ng-repeat')){
                    $compile(iEle.contents())(scope);
                }

                _init();

                if(scope.id){
                    EventService.register(scope.id, EventTypes.OPEN, function(event, data){
                        scope.open = true;
                    });
                    EventService.register(scope.id, EventTypes.CLOSE, function(event, data){
                        scope.open = false;
                    });
                    EventService.broadcast(scope.id, EventTypes.READY, scope);//对ngRepeat的data回显有用
                }

                function _init(){
                    scope.expandDirection = Utils.getValue(scope.expandDirection, iAttrs.expandDirection, PositionTypes.BOTTOM);             
                    scope.caption = Utils.getValue(scope.caption, iAttrs.caption, '');                                       
                    scope.open = Utils.isTrue(scope.open, false);                    
                    scope.frozen = Utils.isTrue(scope.frozen, false);
                    scope.editable = Utils.isTrue(scope.editable, false);
                    scope.showButtons = angular.isDefined(scope.buttons);                   
                    scope.appScope = Utils.findAppScope(scope);

                    _initFoldIconsByDirection();
                    _resetTranscludePosition(scope.expandDirection.toLowerCase());

                    scope.toggle = _toggle;
                    scope.clickHandler = _clickHandler;   
                    scope.getTooltips = _getTooltips;

                    scope.keyPressHandler = _keyPressHandler;
                    scope.stopPropagation = _stopPropagation;
                }

                function _initFoldIconsByDirection(){
                    if(scope.expandDirection == PositionTypes.BOTTOM){
                        scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, "fa fa-angle-down");
                        scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, "fa fa-angle-up");
                        scope.normalPosition = true;
                    }
                    if(scope.expandDirection == PositionTypes.TOP){
                        scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, "fa fa-angle-up");
                        scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, "fa fa-angle-down"); 
                        scope.normalPosition = true;                       
                    }
                    if(scope.expandDirection == PositionTypes.RIGHT){
                        scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, "fa fa-angle-right");
                        scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, "fa fa-angle-left"); 
                        scope.normalPosition = false;                       
                    }
                    if(scope.expandDirection == PositionTypes.LEFT){
                        scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, "fa fa-angle-left");
                        scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, "fa fa-angle-right"); 
                        scope.normalPosition = false;                         
                    }
                }

                function _resetTranscludePosition(direction){
                    var themeDom = iEle[0].querySelector(".theme");
                    var transcludeDom = iEle[0].querySelector(".content");
                    if(!!!scope.caption){
                        $(themeDom).css({'display': 'inline-block'});
                    }                         
                    if(direction == PositionTypes.TOP){
                        $(iEle[0]).empty();
                        $(iEle[0]).append(transcludeDom).append(themeDom);
                        $compile(iEle.contents())(scope);
                    }
                    if(direction == PositionTypes.RIGHT){
                        $(transcludeDom).css({'display': 'inline-block', 'vertical-align': 'top'});
                    }
                    if(direction == PositionTypes.LEFT){   
                        $(transcludeDom).css({'display': 'inline-block', 'vertical-align': 'top'});
                        $(iEle[0]).empty();
                        $(iEle[0]).append(transcludeDom).append(themeDom);
                        $compile(iEle.contents())(scope);
                    }
                }               

                function _stopPropagation(){
                    event.stopPropagation();
                }

                function _keyPressHandler(){
                    if (event.keyCode == 13) {
                        scope.caption = $(iEle[0]).find('span').text();
                        $(iEle[0]).find('span').text(scope.caption);
                    }
                    if (event.keyCode == 27) {
                        $(iEle[0]).find('span').text(scope.caption);
                    }               
                } 

                function _toggle(){
                    if(scope.frozen) return;//冻结
                    if(($(iEle).find(".content").get(0).children.length == 1)&&($(iEle).find(".content").get(0).children[0].tagName == "HEADER_RENDERER")) return;//最外层就只有一个header_renderer，没内容

                    scope.open = !scope.open;

                    if (scope.id){
                        EventService.broadcast(scope.id, EventTypes.CHANGE, scope.open); //事件
                    }
                }               

                function _clickHandler(callback, button, htmlID){
                    callback(button, htmlID);
                    event.stopPropagation();                    
                }  

                function _getTooltips(event, tooltips, label){
                    tooltips = tooltips ? tooltips : label;
                    event.target.setAttribute("title", tooltips);                    
                }
            }
        }])
    })
