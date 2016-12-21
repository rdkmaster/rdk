define(['angular', 'rd.services.Utils', 'rd.services.EventService', 'jquery', 'css!rd.styles.Bullet', 'bootstrap'], function() {
    var scoreApp = angular.module('rd.controls.Bullet', ['rd.core']);
    scoreApp.factory('DragService',['$document',function($document){
        var group={};
        function Draggable(element,dragBar,index,groupName,parentNode,mDownCalBk,mMoveCalBk,endMoveCalBk,isInit) {
            this.index=index;
            this.groupName=groupName;
            this.element=element;
            this.startX = 0;
            this.startY = 0;
            this.parentNode=parentNode?parentNode:this.element.parentNode;
            this.maxX=this.parentNode.offsetWidth;
            this.maxY=this.parentNode.offsetHeight;
            this.x = 0;
            this.y = 0;

            this.mouseDownX=0;
            this.mouseDownY=0;
            this.movementX=0;
            this.movementY=0;
            this.dragBar = dragBar;
            this.startmouseDown=mDownCalBk;
            this.startMove=mMoveCalBk;
            this.endMove=endMoveCalBk;
            this.addEvent();
            if(isInit){
                this.x = parseInt(this.element.style.left);
                this.y = parseInt(this.element.style.top);
            }else{
                this.element.style.position = "relative";
                if(!!this.dragBar){
                    this.dragBar.style.cursor  = "move";
                }else{
                    this.element.style.cursor  = "move";
                }
            }
        }
        Draggable.prototype.addEvent=function(){
            var _this = this;
            if(!!this.dragBar)
            {
                this.dragBar.addEventListener('mousedown',mouseDownHandlerr);
            }else{
                this.element.addEventListener('mousedown',mouseDownHandlerr);
            }
            function mouseDownHandlerr(event) {
                event.preventDefault();
                _this.startX = event.screenX - _this.x;
                _this.startY = event.screenY - _this.y;
                _this.mouseDownX=event.screenX;
                _this.mouseDownY=event.screenY;
                _this.startmouseDown && _this.startmouseDown(_this);
                $document.on('mousemove', mousemoveHandler);
                $document.on('mouseup', mouseupHandler);
            }
            function mousemoveHandler(event){
                _this.x = event.screenX - _this.startX;
                _this.y = event.screenY - _this.startY;
                _this.movementX=event.screenX - _this.mouseDownX;
                _this.movementY=event.screenY - _this.mouseDownY;
                _this.updatePosition();
                _this.startMove && _this.startMove(_this);
            }
            function mouseupHandler(event) {
                $document.unbind('mousemove', mousemoveHandler);
                $document.unbind('mouseup', mouseupHandler);
                _this.endMove && _this.endMove(_this);
            }
        };
        Draggable.prototype.updatePosition=function(){
            if(!this.groupName){ //不属于任何组的独立拖拽元素边界检测
                if (this.x <= 0) {
                    this.x = 0;
                }
                else if (this.x >= document.documentElement.clientWidth - this.element.offsetWidth) {
                    this.x = document.documentElement.clientWidth - this.element.offsetWidth;
                }
                if (this.y <= 0) {
                    this.y = 0;
                }
                else if (this.y >= document.documentElement.clientHeight - this.element.offsetHeight) {
                    this.y = document.documentElement.clientHeight - this.element.offsetHeight;
                }
            }
            else{ //同一组的拖拽元素不能互相碰撞
                var groupDrags=group[this.groupName];

                if(this.index<groupDrags.length-1 && groupDrags[this.index].x > groupDrags[this.index+1].x - this.element.offsetWidth)
                {
                    this.x=groupDrags[this.index+1].x - this.element.offsetWidth;
                }else if(this.index>0 && groupDrags[this.index].x<groupDrags[this.index-1].x + this.element.offsetWidth)
                {
                    this.x=groupDrags[this.index-1].x + this.element.offsetWidth;
                }
                if(this.x<=0){
                    this.x=0;
                }else if(this.x >= this.maxX - this.element.offsetWidth){
                    this.x=this.maxX - this.element.offsetWidth;
                }

                if(this.index<groupDrags.length-1 && groupDrags[this.index].y > groupDrags[this.index+1].y - this.element.offsetHeight)
                {
                    this.y=groupDrags[this.index+1].y - this.element.offsetHeight;
                }else if(this.index>0 && groupDrags[this.index].y<groupDrags[this.index-1].y + this.element.offsetHeight)
                {
                    this.y=groupDrags[this.index-1].y + this.element.offsetHeight;
                }
                if(this.y<=0){
                    this.y=0;
                }else if(this.y >= this.maxY - this.element.offsetHeight){
                    this.y=this.maxY - this.element.offsetHeight;
                }
            }
            this.element.style.left = this.x + 'px';
            this.element.style.top  = this.y + 'px';
        };
        return {
            //创建一个可拖动元素节点
            createDragNode: function(element,dragBar,index,groupName,parentNode,mDownFn,mMoveFn,endMoveFn,isInit){
                return new Draggable(element,dragBar,index,groupName,parentNode,mDownFn,mMoveFn,endMoveFn,isInit);
            },
            //把一组拖动元素节点增加到同一类数组里
            addDragGroup:function(key,drag){
                if(!group[key]){
                    group[key]=[];
                }
                group[key].push(drag);
            },
            removeDragGroup:function(key,drag){
                var groups = group[key];
                if(!groups){
                    return false;
                }else{
                    for(var i= 0,len=groups.length;i<len;i++)
                    {
                        if(angular.equals(drag,groups[i]))
                        {
                            groups.splice(i,1);
                        }
                    }
                }
            },
            clear:function(key){
                group[key]=[];
            }
        };
    }]);
    scoreApp.directive('rdkBullet', ['Utils','EventService', 'EventTypes','DragService',function(Utils,EventService,EventTypes,DragService) {
        var scopeDefine={
            sliders: '=',
            sliderStyles: '=',
            id: '@?',
            minValue: "=?",
            maxValue: "=?",
            step: "=?",
            editable: "=?",
            showLegend: "=?"
        };
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="rdk-bullet-{{direction}}-module">\
                                <h4 class="title" ng-show="title !=\'\' ">{{title}}</h4>\
                                <div class="legend" ng-show ="showLegend">\
                                    <span ng-repeat="sliderStyle in sliderStyles" class="label" ng-style="setStyle(sliderStyle.color,\'background-color\')">\
                                        {{sliderStyle.label}}\
                                    </span>\
                                </div>\
                                <div class="progress">\
                                   <div class="progress-bar">\
                                   </div>\
                                    <div class="slider"  ng-class="{true:\'slider-up\',false:\'slider-down\'}[sliderStyles[$index].position==\'up\' || sliderStyles[$index].position==\'left\']"\
                                        ng-repeat="slider in sliders track by $index" on-finish-render="sliderRepeatFinsh" title="{{sliderStyles[$index].label}} : {{slider}}">\
                                            <div ng-if="sliderStyles[$index].position==\'down\' || sliderStyles[$index].position==\'right\'" class="icon" ng-style="setStyle(sliderStyles[$index].color,\'color\')">▲</div><span class="num">{{slider}}</span><div ng-if="sliderStyles[$index].position==\'up\' || sliderStyles[$index].position==\'left\'" class="icon" ng-style="setStyle(sliderStyles[$index].color,\'color\')">▼</div>\
                                    </div>\
                                </div>\
                            </div>',
            scope: scopeDefine,
            compile: function(tElems, tAttrs) {
                return function postLink(scope, tElement, tAttrs, ctrl) {
                    Utils.checkEventHandlers(tAttrs,scopeDefine);
                    scope.showLegend = Utils.isTrue(tAttrs.showLegend);
                    scope.title = angular.isDefined(tAttrs.title) ? tAttrs.title : "";
                    scope.editable = Utils.isTrue(tAttrs.editable);
                    scope.step = Utils.getValue(scope.step, tAttrs.step, 1);
                    scope.minValue = Utils.getValue(scope.minValue, tAttrs.minValue, 0);
                    scope.maxValue = Utils.getValue(scope.maxValue, tAttrs.maxValue, 100);
                    //horizontal vertical
                    scope.direction = angular.isDefined(tAttrs.direction) ? tAttrs.direction : "horizontal";

                    var constants = {
                        "horizontal": {
                            "gapTotal": "offsetWidth",
                            "gapOffest": "offsetLeft",
                            "gap": "left",
                            "movement":"movementX"
                        },
                        "vertical": {
                            "gapTotal": "offsetHeight",
                            "gapOffest": "offsetTop",
                            "gap": "top",
                            "movement":"movementY"
                        }
                    };

                    if (scope.minValue >= scope.maxValue) {
                        console.error("minValue must greater than maxValue");
                        return;
                    }

                    if (!scope.sliders || scope.sliders.length == 0) {
                        console.error("must set the value of sliders");
                        return;
                    }
                    var processElement,gapTotal,gapOffest,stepSize,selfOffset;
                    var watchArray = ['minValue', 'maxValue', 'step','sliders'];
                    for (var i = 0; i < watchArray.length; i++) {
                        scope.$watch(watchArray[i], function(newVal, oldVal) {
                            if (newVal === oldVal) return;
                            _sliderInit();
                        });
                    }
                    scope.$on("sliderRepeatFinsh",_sliderInit);
                    function _sliderInit(){
                        processElement = tElement[0].querySelector(".progress-bar");
                        gapTotal = processElement[constants[scope.direction]["gapTotal"]];
                        gapOffest = processElement[constants[scope.direction]["gapOffest"]];
                        var sliderDoms = tElement[0].querySelectorAll(".slider");
                        selfOffset = sliderDoms[0][constants[scope.direction]["gapTotal"]];
                        var dragElement;
                        var GROUP_NAME="bulletDrags"+scope.$id;
                        DragService.clear(GROUP_NAME);
                        for(var i= 0,len=sliderDoms.length;i<len;i++)
                        {
                            sliderDoms[i].style[constants[scope.direction].gap] = parseInt(gapOffest + ((scope.sliders[i] - scope.minValue) / (scope.maxValue - scope.minValue) * gapTotal)) + 'px';
                            if (scope.editable) {
                                dragElement = DragService.createDragNode(sliderDoms[i],null,i,GROUP_NAME,processElement,_startMouseDownDrag,_startMoveDrag,_endMoveDrag,true);
                                DragService.addDragGroup(GROUP_NAME,dragElement);
                            }
                        }
                        _calculateStepSize();
                    }

                    var initVal;
                    function _calculateStepSize() {
                        var disDragPx = selfOffset*scope.sliders.length; //自身大小的区域不可拖动
                        stepSize = parseFloat((gapTotal -disDragPx)* scope.step / (scope.maxValue - scope.minValue));
                    }
                    function _startMouseDownDrag(dragElement){
                        initVal = scope.sliders[dragElement.index];
                    }
                    function _startMoveDrag(dragElement) {
                        var size;
                        var movement  = dragElement[constants[scope.direction].movement];
                        if (movement > 0) {
                            size = Math.floor(movement / stepSize) * scope.step;
                        } else {
                            size = Math.ceil(movement / stepSize) * scope.step;
                        }
                        scope.sliders[dragElement.index] = initVal + size;

                        if(scope.sliders[dragElement.index] >= scope.sliders[dragElement.index+1])
                        {
                            scope.sliders[dragElement.index]=scope.sliders[dragElement.index+1]-1;
                        }else if(scope.sliders[dragElement.index] <= scope.sliders[dragElement.index-1]){
                            scope.sliders[dragElement.index]=scope.sliders[dragElement.index-1]+1;
                        }
                        if(dragElement.index == scope.sliders.length-1 && scope.sliders[dragElement.index] >= scope.maxValue){
                            scope.sliders[dragElement.index]=scope.maxValue;
                        }else if(dragElement.index == 0 && scope.sliders[dragElement.index] <= scope.minValue){
                            scope.sliders[dragElement.index]=scope.minValue;
                        }
                        Utils.safeApply(scope);
                    }
                    function _endMoveDrag() {
                        if (angular.isDefined(tAttrs.id)) {
                            EventService.broadcast(scope.id, EventTypes.CHANGE, scope.sliders);
                        }
                    }
                    //ie11兼容性处理：
                    scope.setStyle=function(val,attribute,unit){
                        return (
                            _style = {},
                            unit?_style[attribute] = val + unit:_style[attribute] = val,
                            _style
                        );
                    }
                }
            }
        }
    }]);

});
