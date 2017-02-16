define(['angular', 'jquery', 'gsap', 'rd.core', 'css!rd.styles.Accordion',
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
                 '<div class="rdk-accordion-module">\
                        <div class="theme" ng-click="toggle()"\
                             ng-class="{true:\'frozen-theme\', false:\'normal-theme\'}[frozen]">\
                            <i class="{{open?unfoldedIcon:foldedIcon}}"></i>\
                            <span ng-show="!!caption" class="theme-caption" contentEditable="{{editable}}"\
                             ng-keydown="keyPressHandler($event)">\
                                {{caption}}\
                            </span>\
                            <div class="theme-buttons" ng-show="showButtons">\
                                <a href="javascript:void(0)" class="btn btn-link"\
                                    ng-repeat="button in buttons"\
                                    ng-click="clickHandler(button.callback, button, id, $event)"\
                                    ng-mouseover=getTooltips($event,button.tooltips,button.label)>\
                                    <img class="imgShape" ng-src="{{button.icon}}">{{button.label}}\
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

                var  direction, themeDom, transcludeDom;

                var transcludeScope = scope.$parent.$new();
                transclude(transcludeScope, function(clone,innerScope) {
                    for (var key in clone){
                        if(clone[key].innerHTML != undefined && clone[key].tagName == "HEADER_RENDERER"){
                            $(iEle.find(".theme").html("")).append(clone[key].innerHTML);
                        }
                        if(clone[key].innerHTML !=undefined && clone[key].tagName != "HEADER_RENDERER"){
                            $(iEle.find(".content")).append(clone[key]);
                        }
                    };
                }); 
                $compile(iEle.contents())(scope);

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
                    scope.firstTimeBln = true;

                    /*支持上下左右，支持最小尺寸*/
                    scope.expandDirection = Utils.getValue(scope.expandDirection, iAttrs.expandDirection, PositionTypes.BOTTOM);             
                    scope.minWidth = parseInt(Utils.getValue(scope.minWidth, iAttrs.minWidth, 0), 10); 
                    scope.minHeight = parseInt(Utils.getValue(scope.minHeight, iAttrs.minHeight, 0), 10); 

                    // 全局变量
                    direction = scope.expandDirection.toLowerCase();
                    themeDom = iEle[0].querySelector(".theme");
                    transcludeDom = iEle[0].querySelector(".content");

                    _initDefaultAttrByDirection();
                    _unCoverStateHandler();

                    scope.$watch("open", function(newVal, oldVal){
                        scope.firstTimeBln ? _setDefaultState() : _animateState();
                    }, true);

                    scope.toggle = _toggle;
                    scope.clickHandler = _clickHandler;   
                    scope.getTooltips = _getTooltips;
                    scope.keyPressHandler = _keyPressHandler;
                }

                function _moveArrowToCenter(){
                    if((direction == PositionTypes.TOP)||(direction == PositionTypes.BOTTOM)) return;
                    _uncoverMove2Center();
                    _coverMove2Center();                     
                }

                function _uncoverMove2Center(){
                    if(scope.coverable) return;
                    var offset = scope.contentHeight/2;
                    $(themeDom).css({'top': -offset+'px'}) ;               
                }

                function _coverMove2Center(){
                    if(!scope.coverable) return;
                    var offset = (scope.contentHeight - themeDom.offsetHeight)/2;
                    $(transcludeDom).css({'top': -offset+'px'});                                                      
                }

                function _setDefaultState(){
                    TweenLite.set($(transcludeDom), 0, {height: 'auto', width: 'auto'});
                    scope.contentHeight = parseInt($(transcludeDom).css('height'), 10);
                    scope.contentWidth = parseInt($(transcludeDom).css('width'), 10);
                    _moveArrowToCenter();
                    _coverStateHandler();
                    _resetDefaultState();
                    scope.firstTimeBln = false;
                }

                function _resetDefaultState(){
                    switch(direction){
                        case 'top':
                        case 'bottom':
                            scope.open ?
                            TweenLite.set($(transcludeDom), {height: scope.contentHeight}) : TweenLite.set($(transcludeDom), {height: scope.minHeight});
                            break;
                        case 'left':
                        case 'right':
                            scope.open ? 
                            TweenLite.set($(transcludeDom), {width: scope.contentWidth}) : TweenLite.set($(transcludeDom), {width: scope.minWidth});
                            break;
                    }
                }

                function _animateState(){
                    scope.open ? _animateIn() : _animateOut();
                }

                function _animateIn(){
                    switch(direction){
                        case 'top':
                        case 'bottom':
                            TweenLite.to($(transcludeDom), 0.7, {height: scope.contentHeight});
                            break;
                        case 'left':
                        case 'right':
                            TweenLite.to($(transcludeDom), 0.7, {width: scope.contentWidth});
                            _exchangeHandler();
                            break;
                    }
                }

                function _exchangeHandler(){
                    if(!scope.exchangable) return;
                    if(scope.open){
                        if(direction == 'right'){
                            TweenLite.to($(transcludeDom).parent(), 0.7, {'left': scope.contentWidth-scope.minWidth}); 
                        }
                        else{
                            TweenLite.to($(transcludeDom).parent(), 0.7, {'right': scope.contentWidth-scope.minWidth}); 
                        }                       
                    }
                    else{
                        if(direction == 'right'){
                            TweenLite.to($(transcludeDom).parent(), 0.7, {'left': 0}); 
                        }
                        else{
                            TweenLite.to($(transcludeDom).parent(), 0.7, {'right': 0}); 
                        }                         
                    }
                }

                function _animateOut(){
                    switch(direction){
                        case 'top':
                        case 'bottom':
                            TweenLite.to($(transcludeDom), 0.7, {height: scope.minHeight});
                            break;
                        case 'left':
                        case 'right':
                            TweenLite.to($(transcludeDom), 0.7, {width: scope.minWidth});
                            _exchangeHandler();
                            break;
                    }                    
                }

                function _unCoverStateHandler(){
                    if(direction == PositionTypes.RIGHT){
                        $(transcludeDom).parent().css({'display': 'inline-block'});
                        $(themeDom).css({'display': 'inline-block'});
                        $(transcludeDom).css({'display': 'inline-block'});
                    }
                    if(direction == PositionTypes.LEFT){  
                        $(iEle[0]).empty();
                        $(iEle[0]).append(transcludeDom).append(themeDom);
                        $compile(iEle)(scope);
                        $(transcludeDom).parent().css({'display': 'inline-block'});
                        $(themeDom).css({'display': 'inline-block'});
                        $(transcludeDom).css({'display': 'inline-block'});
                    } 
                    if(direction == PositionTypes.TOP){
                        $(iEle[0]).empty();
                        $(iEle[0]).append(transcludeDom).append(themeDom);
                        $compile(iEle)(scope);
                    }              
                }

                function _coverStateHandler(){
                    if(!scope.coverable) return;
                    $(transcludeDom).css({'position': 'absolute', 'z-index': '9999'});
                    if(scope.exchangable){
                        if(direction == PositionTypes.LEFT){
                            $(transcludeDom).css({'left': themeDom.offsetWidth+'px'});
                        }
                        if(direction == PositionTypes.RIGHT){
                            $(transcludeDom).css({'right': themeDom.offsetWidth+'px'});
                        }
                    }
                    else{
                        if(direction == PositionTypes.TOP){
                            $(transcludeDom).css({'bottom': themeDom.offsetHeight+'px'});
                        }
                        if(direction == PositionTypes.RIGHT){
                            $(transcludeDom).css({'left': themeDom.offsetWidth+'px'});
                        }
                        if(direction == PositionTypes.LEFT){
                            $(transcludeDom).css({'right': themeDom.offsetWidth+'px'});
                        }
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

                function _clickHandler(callback, button, htmlID, event){
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
