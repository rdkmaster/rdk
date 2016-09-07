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

                    expandDirection: '=?',
                    coverable: '=?',
                    exchangable: '=?',
                    minWidth: '=?'
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
                        <div class="content"></div>\
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

                var themeDom, transcludeDom, direction, initialWidth, initialHeight, heightCache, widthCache;

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
                    scope.caption = Utils.getValue(scope.caption, iAttrs.caption, '');                                                                               
                    scope.frozen = Utils.isTrue(scope.frozen, false);
                    scope.editable = Utils.isTrue(scope.editable, false);
                    scope.showButtons = angular.isDefined(scope.buttons);                   
                    scope.appScope = Utils.findAppScope(scope);
                    scope.open =  Utils.isTrue(scope.open, false);

                    /*支持上下左右，支持最小尺寸*/
                    scope.expandDirection = Utils.getValue(scope.expandDirection, iAttrs.expandDirection, PositionTypes.BOTTOM);             
                    scope.minWidth = parseInt(Utils.getValue(scope.minWidth, iAttrs.minWidth, 0), 10); 
                    scope.minHeight = parseInt(Utils.getValue(scope.minHeight, iAttrs.minHeight, 0), 10); 
                    scope.firstTimeBln = true;//是否是第一次
                    scope.supportable = true;//是否异常
                    scope.outerLeft = $(iEle[0]).css('left');
                    scope.outerRight = $(iEle[0]).css('right');

                    _initDefaultAttrByDirection();
                    _initGlobalDom();
                    _exceptionHandler();

                    _unCoverStateHandler();
                    _coverStateHandler();

                    scope.$watch("open", function(newVal, oldVal){
                        _minShapeHandler();          
                    }, true);

                    scope.toggle = _toggle;
                    scope.clickHandler = _clickHandler;   
                    scope.getTooltips = _getTooltips;

                    scope.keyPressHandler = _keyPressHandler;
                    scope.stopPropagation = _stopPropagation;
                }

                function _move2Center(){
                    _uncoverMove2Center();
                    _coverMove2Center();                       
                }

                function _initGlobalShape(){
                    initialWidth = scope.open ? 'inherit' : ((scope.minWidth==0) ? 0 : scope.minWidth+'px');
                    initialHeight = scope.open ? 'inherit' : ((scope.minHeight==0) ? 0 : scope.minHeight+'px');
                    widthCache = transcludeDom.offsetWidth;
                    heightCache = transcludeDom.offsetHeight;
                }

                function _uncoverMove2Center(){
                    if((scope.coverable)||(!scope.supportable)) return;

                    var topHeight = (heightCache - themeDom.offsetHeight)/2;
                    var leftWidth = (widthCache - themeDom.offsetWidth)/2;

                    if((direction == PositionTypes.RIGHT)||(direction == PositionTypes.LEFT)){
                        $(themeDom).css({'top': topHeight+'px'}) ; 
                    }
                    if((direction == PositionTypes.TOP)||(direction == PositionTypes.BOTTOM)){
                        $(themeDom).css({'left': leftWidth+'px'}) ;                       
                    }                    
                }

                function _coverMove2Center(){
                    if((!scope.coverable)||(!scope.supportable)) return;

                    var topHeight = (heightCache - themeDom.offsetHeight)/2;
                    var leftWidth = (widthCache - themeDom.offsetWidth)/2;

                    if((direction == PositionTypes.TOP)||(direction == PositionTypes.BOTTOM)){
                        $(transcludeDom).css({'left': -leftWidth+'px'});
                    }
                    if((direction == PositionTypes.RIGHT)||(direction == PositionTypes.LEFT)){
                        $(transcludeDom).css({'top': -topHeight+'px'});
                    }                                    
                }

                function _initGlobalDom(){
                   themeDom = iEle[0].querySelector(".theme");
                   transcludeDom = iEle[0].querySelector(".content");
                   direction = scope.expandDirection.toLowerCase();            
                }

                function _minShapeHandler(){
                    if(!scope.supportable) return;
                    scope.firstTimeBln ? _initialStateHandler() : _unExchangeInterAnimate();
                    _moveExchangeCoverHandler();
                }

                function _unExchangeInterAnimate(){
                    if(scope.exchangable) return;
                    if((direction == PositionTypes.TOP)||(direction == PositionTypes.BOTTOM)){
                        _tbAnimate();
                    }
                    if((direction == PositionTypes.LEFT)||(direction == PositionTypes.RIGHT)){
                        _lrAnimate();
                    } 
                }

                function _tbInitialState(){
                    $(transcludeDom).css({'height': initialHeight});
                    if(initialHeight==0){
                        $(transcludeDom).css({'display': 'none'});
                    }
                }

                function _lrInitialState(){
                    $(transcludeDom).css({'width': initialWidth});
                    if(initialWidth==0){
                        $(transcludeDom).css({'display': 'none'});
                    }    
                }

                function _initialStateHandler(){
                    /*展开占位置不可见*/
                    $(transcludeDom).css({'width': 'inherit', 'height': 'inherit', 'overflow': 'hidden'});                    
                    $timeout(function(){
                        _initGlobalShape();                    
                        _move2Center();
                        _initialState();
                    }, 0)
                    scope.firstTimeBln = !scope.firstTimeBln;
                }

                function _initialState(){
                    if((direction == PositionTypes.TOP)||(direction == PositionTypes.BOTTOM)){
                        _tbInitialState();
                    }
                    if((direction == PositionTypes.LEFT)||(direction == PositionTypes.RIGHT)){
                        _lrInitialState();
                    }
                }

                function _tbAnimate(){
                    $(transcludeDom).css({'display': ''});
                    if(scope.open){                           
                        $(transcludeDom).css({'height': scope.minHeight});                         
                        $(transcludeDom).animate({'height': heightCache}, 100);//变大
                    }
                    else{
                        $(transcludeDom).animate({'height': scope.minHeight}, 100, function(){//变小
                            if(scope.minHeight==0){
                                $(transcludeDom).css({'display': 'none'});
                            }
                        });
                    }                        
                }

                function _lrAnimate(){
                    $(transcludeDom).css({'display': 'inline-block'});                 
                    if(scope.open){                           
                        $(transcludeDom).css({'width': scope.minWidth});                            
                        $(transcludeDom).animate({'width': widthCache}, 100);//变大
                    }
                    else{
                        $(transcludeDom).animate({'width': scope.minWidth}, 100, function(){//变小
                            if(scope.minWidth==0){
                                $(transcludeDom).css({'display': 'none'});
                            } 
                        });
                    }            
                }

                function _moveExchangeCoverHandler(){
                    if(!scope.exchangable) return;
                    $(document.body).css({'overflow-x': 'hidden'});
                    $(transcludeDom).css({'display': 'inline-block'});//消除display的影响
                    $(transcludeDom).css({'width': widthCache});//恢复原大小后拖动
                    scope.open ? _expandMove() : _shrinkMove();
                }

                function _afterShrink(){
                    $(document.body).css({'overflow-x': ''}); 
                    $(transcludeDom).css({'width': scope.minWidth});
                    if(scope.minWidth==0){
                        $(transcludeDom).css({'display': 'none'});
                    }
                }

                function _afterExpand(){
                    $(document.body).css({'overflow-x': ''});
                }

                function _shrinkMove(){
                    if(direction == PositionTypes.LEFT){
                        if(scope.outerRight == 'auto'){
                            $(iEle[0]).animate({'left': scope.outerLeft+'px'}, 100, function(){
                                _afterShrink();
                            }); 
                        }
                        else{
                            $(iEle[0]).animate({'right': scope.outerRight+'px'}, 100, function(){
                                _afterShrink();
                            }); 
                        }
                    }
                    if(direction == PositionTypes.RIGHT){
                        if((scope.outerLeft == 'auto') && (scope.outerRight != 'auto')){
                            $(iEle[0]).animate({'right': scope.outerRight+'px'}, 100, function(){
                                _afterShrink(); 
                            });                          
                        }
                        else{
                            $(iEle[0]).animate({'left': scope.outerLeft+'px'}, 100, function(){
                                _afterShrink(); 
                            }); 
                        }
                    }                  
                }

                function _expandMove(){
                    var moveStep = Math.abs(transcludeDom.offsetWidth-scope.minWidth);
                    if(direction == PositionTypes.LEFT){
                        if(scope.outerRight == 'auto'){
                            scope.outerLeft = parseInt(scope.outerLeft, 10) || 0;
                            $(iEle[0]).animate({'left': scope.outerLeft-moveStep+'px'}, 100, function(){
                                _afterExpand();
                            });
                        }
                        else{
                            scope.outerRight = parseInt(scope.outerRight, 10) || 0;
                            $(iEle[0]).animate({'right': moveStep+scope.outerRight+'px'}, 100, function(){
                                _afterExpand();
                            });
                        } 
                    }
                    if(direction == PositionTypes.RIGHT){
                        if((scope.outerLeft == 'auto') && (scope.outerRight != 'auto')){
                            scope.outerRight = parseInt(scope.outerRight, 10) || 0;
                            $(iEle[0]).animate({'right': scope.outerRight-moveStep+'px'}, 100, function(){
                                _afterExpand();
                            });
                        }
                        else{
                            scope.outerLeft = parseInt(scope.outerLeft, 10) || 0;
                            $(iEle[0]).animate({'left': moveStep+scope.outerLeft+'px'}, 100, function(){
                                _afterExpand();
                            });
                        } 
                    }
                }
        
                function _unCoverStateHandler(){
                    if((scope.coverable)||(!scope.supportable)) return;

                    if(direction == PositionTypes.RIGHT){
                        $(transcludeDom).css({'display': 'inline-block'});
                    }
                    if(direction == PositionTypes.LEFT){  
                        $(transcludeDom).css({'display': 'inline-block'});
                        $(iEle[0]).empty();
                        $(iEle[0]).append(transcludeDom).append(themeDom);
                        $compile(iEle)(scope);
                    } 
                    if(direction == PositionTypes.TOP){
                        $(iEle[0]).empty();
                        $(iEle[0]).append(transcludeDom).append(themeDom);
                        $compile(iEle)(scope);
                    }              
                }

                function _coverStateHandler(){
                    if((!scope.coverable)||(!scope.supportable)) return;

                    $(transcludeDom).css({'position': 'absolute', 'z-index': '9999'}); 
                    if(scope.exchangable){
                        if(direction == PositionTypes.LEFT){
                            $(transcludeDom).css({'left': themeDom.offsetWidth+'px', 'top': 0});
                        }
                        if(direction == PositionTypes.RIGHT){
                            $(transcludeDom).css({'right': themeDom.offsetWidth+'px', 'top': 0});
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

                function _exceptionHandler(){
                    if(!scope.caption){
                        $(themeDom).css({'display': 'inline-block', 'vertical-align': 'top', 'width': '22px'});
                    }
                    else{
                        if((direction == PositionTypes.LEFT)||(direction == PositionTypes.RIGHT)){
                            console.warn('caption非空，不支持left/right，left/right时请删除caption属性');
                            scope.supportable = false;
                        }
                    }
                    if((scope.coverable && scope.exchangable)||(scope.minWidth!=0)){
                        if((direction == PositionTypes.TOP)||(direction == PositionTypes.BOTTOM)){
                            console.warn('上下覆盖时不支持互换，上下挤开和覆盖都不支持minWidth');
                            scope.supportable = false;
                        }
                    }
                    if((!scope.coverable) && (scope.exchangable)){
                        console.warn('挤开时不支持交换位置');
                        scope.supportable = false;
                    }
                    if((scope.outerLeft != 'auto') && (scope.outerRight != 'auto')){
                        console.warn('左右展开时不能同时设置left和right');
                        scope.supportable = false;
                    }
                }

                function _defaultCoverable(defaultBln){
                    /*支持上下左右，支持最小尺寸 部分属性*/
                    scope.coverable = Utils.isTrue(scope.coverable, defaultBln);
                    scope.exchangable = Utils.isTrue(scope.exchangable, defaultBln);
                }

                function _initDefaultAttrByDirection(){
                    if(scope.expandDirection == PositionTypes.BOTTOM){
                        _foldIconsHandler("fa fa-angle-down", "fa fa-angle-up");
                        _defaultCoverable(false);
                    }
                    if(scope.expandDirection == PositionTypes.TOP){
                        _foldIconsHandler("fa fa-angle-up", "fa fa-angle-down"); 
                        _defaultCoverable(false);                   
                    }
                    if(scope.expandDirection == PositionTypes.RIGHT){
                        _foldIconsHandler("fa fa-angle-right", "fa fa-angle-left");
                        _defaultCoverable(true);
                    }
                    if(scope.expandDirection == PositionTypes.LEFT){
                        _foldIconsHandler("fa fa-angle-left", "fa fa-angle-right"); 
                        _defaultCoverable(true);                    
                    }
                }

                function _foldIconsHandler(foldedIconStr, unfoldedIconStr){
                    scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, foldedIconStr);
                    scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, unfoldedIconStr);
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
