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
        .directive('rdkAccordion', ['Utils', 'EventService', 'EventTypes', '$compile', 'PositionTypes', '$timeout', function(Utils, EventService, EventTypes, $compile, PositionTypes, $timeout) {
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
                    expandDirection: '@',
                    coverable: '@',
                    exchangable: '@'
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
                    scope.coverable = Utils.isTrue(scope.coverable, false);
                    scope.exchangable = Utils.isTrue(scope.exchangable, false);
                    scope.showButtons = angular.isDefined(scope.buttons);                   
                    scope.appScope = Utils.findAppScope(scope);
                    /*var 4 cover*/
                    scope.outerLeft = (parseInt($(iEle[0]).css('left'), 10)|| 0 )- (parseInt($(iEle[0]).css('right'), 10)||0);
                    scope.transcludeDomWidth = iEle[0].querySelector(".content").offsetWidth;
                    scope.supportable = true;
                    /*var 4 cover*/

                    _initFoldIconsByDirection();
                    _refreshThemeByCaption();

                    scope.toggle = _toggle;
                    scope.clickHandler = _clickHandler;   
                    scope.getTooltips = _getTooltips;

                    scope.keyPressHandler = _keyPressHandler;
                    scope.stopPropagation = _stopPropagation;

                    _uncoverHandler();//挤开时的处理
                }

                function _refreshThemeByCaption(){
                    var direction = scope.expandDirection.toLowerCase();
                    if(!scope.caption){
                        var themeDom = iEle[0].querySelector(".theme");
                        $(themeDom).css({'display': 'inline-block'});
                        $(iEle[0]).css({'width': ''});//防止箭头时占位大，需要包裹
                    }
                    else{
                        if((direction == PositionTypes.LEFT)||(direction == PositionTypes.RIGHT)){
                            console.warn('主题非空时，暂不支持左右折叠，请删除caption属性！');
                            scope.supportable = false;
                        }
                    }
                }

                function _initFoldIconsByDirection(){
                    if(scope.expandDirection == PositionTypes.BOTTOM){
                        _foldIconsHandler("fa fa-angle-down", "fa fa-angle-up");
                    }
                    if(scope.expandDirection == PositionTypes.TOP){
                        _foldIconsHandler("fa fa-angle-up", "fa fa-angle-down");                    
                    }
                    if(scope.expandDirection == PositionTypes.RIGHT){
                        _foldIconsHandler("fa fa-angle-right", "fa fa-angle-left");
                    }
                    if(scope.expandDirection == PositionTypes.LEFT){
                        _foldIconsHandler("fa fa-angle-left", "fa fa-angle-right");                     
                    }
                }

                function _foldIconsHandler(foldedIconStr, unfoldedIconStr){
                    scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, foldedIconStr);
                    scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, unfoldedIconStr);
                }

                function _uncoverHandler(){//挤开，单击前就编译
                    if((scope.coverable)||(!scope.supportable)) return;
                    if(scope.exchangable){
                        console.warn('挤开时不支持图标位置交换，请删除exchangable属性！');
                        return;
                    }

                    var themeDom = iEle[0].querySelector(".theme");
                    var transcludeDom = iEle[0].querySelector(".content");
                    var direction = scope.expandDirection.toLowerCase();

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

                function _moveCover(moveWidth){
                    if(scope.open){
                        $(iEle[0]).animate({'left': moveWidth+scope.outerLeft+'px'}); 
                    }
                    else{
                        scope.open = true;
                        $(iEle[0]).animate({'left': scope.outerLeft+'px'}, function(){
                            $timeout(function(){
                                scope.open = false;
                            }, 0);
                        });
                    }
                }

                function _coverHandler(){//覆盖时，根据exchangable分类
                    if((!scope.coverable)||(!scope.supportable)) return;

                    var themeDom = iEle[0].querySelector(".theme");
                    var transcludeDom = iEle[0].querySelector(".content");
                    var direction = scope.expandDirection.toLowerCase();

                    $(transcludeDom).css({'position': 'absolute', 'z-index': '9999', 'width': scope.transcludeDomWidth+'px'});
                    if(scope.exchangable){
                        if(direction == PositionTypes.LEFT){//iele相对自己
                            $(transcludeDom).css({'left': themeDom.offsetWidth+'px', 'top': 0});
                            _moveCover(-scope.transcludeDomWidth);
                        }
                        else if(direction == PositionTypes.RIGHT){
                            $(transcludeDom).css({'right': themeDom.offsetWidth+'px', 'top': 0});
                            _moveCover(scope.transcludeDomWidth);
                        }
                        else{
                            console.warn('exchange属性只支持左右覆盖折叠！');
                            scope.open = false;
                            return;
                        }
                    }
                    else{
                        if(direction == PositionTypes.TOP){
                            $(transcludeDom).css({'bottom': themeDom.offsetHeight+'px'});
                        }
                        if(direction == PositionTypes.RIGHT){
                            $(transcludeDom).css({'left': themeDom.offsetWidth+'px', 'top': 0});
                        }
                        if(direction == PositionTypes.LEFT){
                            $(transcludeDom).css({'right': themeDom.offsetWidth+'px', 'top': 0});
                        }
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
                    _coverHandler();//覆盖时的处理

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
