define(['angular', 'rd.services.Utils', 'rd.services.EventService', 'jquery', 'css!rd.styles.Bullet', 'bootstrap'], function() {
    var scoreApp = angular.module('rd.controls.Bullet', ['rd.services.Utils', 'rd.services.EventService']);

    scoreApp.directive('rdkBullet', ['Utils','EventService', 'EventTypes',function(Utils,EventService,EventTypes) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="rdk-bullet-{{direction}}-module">\
                                <h4 class="title" ng-show="title !=\'\' ">{{title}}</h4>\
                                <div class="legend" ng-show ="showLegend">\
                                    <span ng-repeat="sliderStyle in sliderStyles" class="label" style="background-color:{{sliderStyle.color}};">\
                                        {{sliderStyle.label}}\
                                    </span>\
                                </div>\
                                <div class="progress">\
                                   <div class="progress-bar">\
                                   </div>\
                                    <div class="slider" ng-style="calculateLeft(slider,$index)" ng-class="{true:\'slider-up\',false:\'slider-down\'}[sliderStyles[$index].position==\'up\' || sliderStyles[$index].position==\'left\']"\
                                        ng-repeat="slider in sliders track by $index" title="{{sliderStyles[$index].label}} : {{slider}}" ng-mousedown="sliderPointerMouseDownHandle($event,$index)">\
                                            <div ng-if="sliderStyles[$index].position==\'down\' || sliderStyles[$index].position==\'right\'" class="icon" style="color:{{sliderStyles[$index].color}}">▲</div>\
                                            <span class="num">{{slider}}</span>\
                                            <div ng-if="sliderStyles[$index].position==\'up\' || sliderStyles[$index].position==\'left\'" class="icon" style="color:{{sliderStyles[$index].color}}">▼</div>\
                                    </div>\
                                </div>\
                            </div>',
            scope: {
                sliders: '=',
                sliderStyles: '=',
                id: '@?',
                minValue: "=?",
                maxValue: "=?",
                step: "=?",
                editable: "=?",
                showLegend: "=?"
            },
            compile: function(tElems, tAttrs) {
                return function postLink(scope, tElement, tAttrs, ctrl) {
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

                    var processElement,gapTotal,gapOffest,stepSize;

                    var watchArray = ['minValue', 'maxValue', 'step'];
                    for (var i = 0; i < watchArray.length; i++) {
                        scope.$watch(watchArray[i], function(newVal, oldVal) {
                            if (newVal === oldVal) return;
                            _calculateStepSize();
                        });
                    };


                    scope.calculateLeft = function(slider, index) {
                        if(!processElement){
                            processElement = tElement[0].querySelector(".progress-bar");
                            gapTotal = processElement[constants[scope.direction]["gapTotal"]];
                            gapOffest = processElement[constants[scope.direction]["gapOffest"]];
                            _calculateStepSize();
                        }
                        var gap = parseFloat(gapOffest + ((slider - scope.minValue) / (scope.maxValue - scope.minValue) * gapTotal));
                        var obj = {};
                        obj[constants[scope.direction].gap] = gap;
                        return obj;
                    }

                    var movement = 0,
                        currentIndex, currentLeftLimit, currentRightLimit;

                    scope.sliderPointerMouseDownHandle = function(event, $index) {
                        if (scope.editable) {
                            movement = 0;
                            currentIndex = $index;
                            _calculateLimit();
                            document.body.addEventListener('mouseup', _sliderPointerMouseUpHandle, false);
                            document.body.addEventListener('mousemove', _sliderPointerMouseMoveHandle, false);
                            document.body.addEventListener('mouseleave', _sliderPointerMouseUpHandle, false);
                        }
                    }

                    function _calculateStepSize() {
                        stepSize = parseFloat(gapTotal * scope.step / (scope.maxValue - scope.minValue));
                    }

                    function _calculateLimit() {
                        if (currentIndex == 0) {
                            currentLeftLimit = scope.minValue - scope.sliders[currentIndex];
                        } else {
                            currentLeftLimit = scope.sliders[currentIndex - 1] - scope.sliders[currentIndex];
                        }
                        if (currentIndex == scope.sliders.length - 1) {
                            currentRightLimit = scope.maxValue - scope.sliders[currentIndex];
                        } else {
                            currentRightLimit = scope.sliders[currentIndex + 1] - scope.sliders[currentIndex];
                        }

                    }


                    function _sliderPointerMouseUpHandle(event) {
                        document.body.removeEventListener('mouseup', _sliderPointerMouseUpHandle, false);
                        document.body.removeEventListener('mousemove', _sliderPointerMouseMoveHandle, false);
                        document.body.removeEventListener('mouseleave', _sliderPointerMouseUpHandle, false);
                        if (angular.isDefined(tAttrs.id)) {
                            EventService.broadcast(scope.id, EventTypes.CHANGE, scope.sliders);
                        }
                    }


                    function _sliderPointerMouseMoveHandle(event) {
                        movement = movement + event[constants[scope.direction]["movement"]];
                        var size;
                        if (movement > 0) {
                            size = Math.floor(movement / stepSize) * scope.step;
                        } else {
                            size = Math.ceil(movement / stepSize) * scope.step;
                        }
                        if ((currentIndex > 0 && currentIndex < scope.sliders.length - 1) && !((size > 0 && size < currentRightLimit) || (size < 0 && size > currentLeftLimit))) {
                            return;
                        };

                        if ((currentIndex == 0) && !((size > 0 && size < currentRightLimit) || (size < 0 && size >= currentLeftLimit))) {
                            return;
                        };

                        if ((currentIndex == scope.sliders.length - 1) && !((size > 0 && size <= currentRightLimit) || (size < 0 && size > currentLeftLimit))) {
                            return;
                        }
                        scope.sliders[currentIndex] = scope.sliders[currentIndex] + size;
                        Utils.safeApply(scope);
                        _calculateLimit();
                        movement = 0;

                    }
                }
            }
        }
    }]);

});
