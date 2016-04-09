define(['angular','rd.services.Utils', 'rd.services.EventService'], function() {
    var scoreApp = angular.module('rd.controls.Bullet', ['rd.services.Utils', 'rd.services.EventService']);
    scoreApp.controller('rdkScoreCtrl', ['$scope', 'Utils', '$compile', 'EventService', 'EventTypes', '$attrs',
            function(scope, Utils, compile, EventService, EventTypes, attrs) {
                // 修正小图标位置不够准确
                var sliderPointerWidth = 20;
                var offsetLeftAdjust = sliderPointerWidth / 2;
                var sliders = scope.sliders;
                var sliderStyles = scope.sliderStyles;
                var container = null;
                var title = null;
                var bkgLegend = null;
                var sliderLegend = null;
                var process = null;
                var processWidth = 0;
                var processOffsetLeft = 0;
                var stepSize = 0;
                var _mouseDownSliderPointer;
                var mouseDownPositionLeft = 0;
                var sliderPointerPositionLeftAry = [];
                scope.sliderPointerValueObj = {};
                var sliderPointerIdAry = [];

                this.setDataMember = function(element) {
                    container = element[0];
                    title = element[0].childNodes[0];
                    bkgLegend = element[0].childNodes[1];
                    sliderLegend = element[0].childNodes[2];
                    process = element[0].childNodes[3];
                }

                this.setProcessPara = function(scope) {
                    process.style.height = scope.height + "px";
                    processWidth = process.offsetWidth;
                    processOffsetLeft = process.offsetLeft;
                    stepSize = parseFloat(processWidth * scope.step / (scope.maxValue - scope.minValue));
                }

                this.createSliderPointer = function(scope) {
                    sliderPointerPositionLeftAry = [];
                    var firstSliderPointerPosition = parseFloat(processOffsetLeft - offsetLeftAdjust);
                    sliderPointerPositionLeftAry.push(firstSliderPointerPosition);

                    sliders = scope.sliders;
                    for (index in sliders) {
                        if (parseFloat(sliders[index]) < scope.minValue) {
                            sliders[index] = scope.minValue;
                        } else if (parseFloat(sliders[index]) > scope.maxValue) {
                            sliders[index] = scope.maxValue;
                        }

                        var sliderPointerValue = parseInt(sliders[index]);

                        var scoreID = sliderPointerIdAry[index];
                        var sliderPointer = null;
                        if (scoreID) {
                            sliderPointer = document.getElementById(scoreID);
                            process.removeChild(sliderPointer);
                        } else {
                            scoreID = Utils.createUniqueId("score_");
                            sliderPointerIdAry.push(scoreID);
                            sliderPointer = document.createElement("div");
                            sliderPointer.id = scoreID;
                        }

                        scope.sliderPointerValueObj["ng" + scoreID] = scope.labelFormat.replace(/\{value\}/, sliderPointerValue);
                        var sliderPointerPositionLeft = parseFloat(processOffsetLeft + ((sliderPointerValue - scope.minValue) / (scope.maxValue - scope.minValue) * processWidth) - offsetLeftAdjust)
                        sliderPointerPositionLeftAry.push(sliderPointerPositionLeft);
                        var hint = sliderStyles[index].label;

                        sliderPointer.index = index;
                        sliderPointer.title = !hint ? "" : hint + " : " + "{{sliderPointerValueObj.ng" + scoreID + "}}";
                        sliderPointer.style.width = sliderPointerWidth + "px";
                        sliderPointer.style.height = "28px";
                        sliderPointer.style.position = "absolute";
                        sliderPointer.style.cursor = scope.editable ? "move" : "default";
                        sliderPointer.style.left = sliderPointerPositionLeft + "px";
                        sliderPointer.style.fontSize = "14px";
                        sliderPointer.style.lineHeight = "14px";
                        sliderPointer.style.textAlign = "center";

                        var position = sliderStyles[index].position;
                        if (position.toUpperCase() == "DOWN") {
                            sliderPointer.innerHTML = "<div style='font-size:18px;color:" + sliderStyles[index].color + "'>▲</div>" + "{{sliderPointerValueObj.ng" + scoreID + "}}";
                            sliderPointer.style.top = parseInt(process.offsetTop + process.clientHeight) + "px";
                        } else {
                            sliderPointer.innerHTML = "{{sliderPointerValueObj.ng" + scoreID + "}}" + "<div style='font-size:18px;color:" + sliderStyles[index].color + "'>▼</div>";
                            sliderPointer.style.top = parseInt(process.offsetTop - parseInt(sliderPointer.style.height)) + "px";
                        }

                        if (scope.title == "") {
                            sliderPointer.style.top = parseInt(sliderPointer.style.top) - title.offsetHeight - 5 + "px";
                        }

                        if (!scope.showBkgLegend) {
                            sliderPointer.style.top = parseInt(sliderPointer.style.top) - bkgLegend.offsetHeight - 2 + "px";
                        }

                        if (!scope.showSliderLegend) {
                            sliderPointer.style.top = parseInt(sliderPointer.style.top) - sliderLegend.offsetHeight - 2 + "px";
                        }

                        angular.element($(process)).append(compile(angular.element(sliderPointer))(scope));
                    }
                    Utils.safeApply(scope);
                    sliderPointerPositionLeftAry.push(parseFloat(processOffsetLeft + processWidth - offsetLeftAdjust));
                    sliderPointerPositionLeftAry.sort(function(a, b) {
                        return a > b ? 1 : -1 });
                };

                this.addSliderPointerDragEvent = function(scope) {
                    for (index in sliders) {
                        var sliderPointer = document.getElementById(sliderPointerIdAry[index]);
                        addEvent(sliderPointer, 'mousedown', sliderPointerMouseDownHandle);
                    }
                };

                this.setSliderPointerPositionLeftLimit = function() {
                    setSliderPointerPositionLeftLimit();
                }

                function sliderPointerMouseDownHandle(event) {
                    scope.mouseDown = true;
                    event.preventDefault();
                    _mouseDownSliderPointer = this;
                    mouseDownPositionLeft = this.offsetLeft;
                    addEvent(document, 'mousemove', sliderPointerMouseMoveHandle);
                    addEvent(document, 'mouseup', sliderPointerMouseUpHandle);
                }

                function sliderPointerMouseMoveHandle(event) {
                    scope.mouseDown = true;
                    event.preventDefault();
                    var mouseMovePositionLeft = event.pageX - process.offsetParent.offsetLeft;
                    var processAdjustOffsetLeft = processOffsetLeft - offsetLeftAdjust;
                    var moveDistance = mouseMovePositionLeft - mouseDownPositionLeft;
                    var absMoveDistance = Math.abs(moveDistance);

                    if (mouseMovePositionLeft >= _mouseDownSliderPointer.leftLimit && mouseMovePositionLeft <= _mouseDownSliderPointer.rightLimit) {
                        if (absMoveDistance >= Math.floor(stepSize)) {
                            var newSliderPointerPositionLeft = 0;
                            var n = Math.round(Math.round((mouseMovePositionLeft - processAdjustOffsetLeft) / stepSize * stepSize) / stepSize);
                            newSliderPointerPositionLeft = processAdjustOffsetLeft + n * stepSize;
                            newSliderPointerPositionLeft = newSliderPointerPositionLeft >= _mouseDownSliderPointer.rightLimit ? _mouseDownSliderPointer.rightLimit : newSliderPointerPositionLeft
                            newSliderPointerPositionLeft = newSliderPointerPositionLeft <= _mouseDownSliderPointer.leftLimit ? _mouseDownSliderPointer.leftLimit : newSliderPointerPositionLeft
                            _mouseDownSliderPointer.style.left = newSliderPointerPositionLeft + "px";
                            //mouseDownPositionLeft = newSliderPointerPositionLeft;
                            var sliderPointerValue = ((n / ((scope.maxValue - scope.minValue) / scope.step)) * (scope.maxValue - scope.minValue) + scope.minValue).toFixed(0);
                            scope.sliderPointerValueObj["ng" + _mouseDownSliderPointer.id] = scope.labelFormat.replace(/\{value\}/, sliderPointerValue);
                            sliders[_mouseDownSliderPointer.index] = sliderPointerValue;
                            Utils.safeApply(scope);
                        }
                    }
                }

                function sliderPointerMouseUpHandle() {
                    scope.mouseDown = false;
                    sliderPointerPositionLeftAry[_mouseDownSliderPointer.positionIndex] = _mouseDownSliderPointer.offsetLeft;
                    setSliderPointerPositionLeftLimit();

                    removeEvent(document, 'mousemove', sliderPointerMouseMoveHandle);
                    removeEvent(document, 'mouseup', sliderPointerMouseUpHandle);

                    if (angular.isDefined(attrs.id)) {
                        EventService.broadcast(scope.id, EventTypes.CHANGE, sliders);
                    }
                }

                function setSliderPointerPositionLeftLimit() {
                    var positionIndex = 1;
                    for (index in sliderStyles) {
                        var sliderPointer = document.getElementById(sliderPointerIdAry[index]);
                        sliderPointer.leftLimit = sliderPointerPositionLeftAry[positionIndex - 1];
                        sliderPointer.rightLimit = sliderPointerPositionLeftAry[positionIndex + 1];
                        sliderPointer.positionIndex = positionIndex;
                        ++positionIndex;
                    }
                }

                function addEvent(elem, type, fn) {
                    if (elem.addEventListener) {
                        elem.addEventListener(type, fn, false);
                    }
                };

                function removeEvent(elem, type, fn) {
                    if (elem.removeEventListener) {
                        elem.removeEventListener(type, fn, false);
                    }
                };
            }
        ])
        .directive('rdkBullet', ['Utils', function(Utils) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div style="width:100%; height:100%;padding:0px 10px 0px 10px;">' + '<h4 style="margin:5px 10px 5px;" ng-show="title !=\'\' ">{{title}}</h4>' + '<div style="height:25px" ng-show = "showBkgLegend">' + '<span ng-repeat="i in bkgStyles" class="label" style="margin:5px 10px 5px;background-color:{{i.color}};">&nbsp{{i.label}}</span>' + '</div>' + '<div style="height:25px" ng-show = "showSliderLegend">' + '<span ng-repeat="i in sliderStyles" class="label" style="margin:5px 10px 5px;background-color:{{i.color}};">&nbsp{{i.label}}</span>' + '</div>' + '<div class="progress" style="margin:35px 10px 5px;">' + '<div class="progress-bar" ng-repeat="i in bkgStyles" style="background-color:{{i.color}};width:{{i.width}};"></div>' + '</div>' + '</div>',
                controller: 'rdkScoreCtrl',
                scope: {
                    bkgStyles: '=?',
                    sliders: '=?',
                    sliderStyles: '=?',
                    id: '@'
                },
                compile: function(tElems, tAttrs) {
                    return function postLink(scope, tElems, tAttrs, ctrl) {
                        scope.height = angular.isDefined(tAttrs.height) ? parseInt(tAttrs.height) : 5;
                        scope.showBkgLegend = Utils.isTrue(tAttrs.showBkgLegend);
                        scope.showSliderLegend = Utils.isTrue(tAttrs.showSliderLegend);
                        scope.title = angular.isDefined(tAttrs.title) ? tAttrs.title : "";
                        scope.editable = Utils.isTrue(tAttrs.editable);
                        scope.step = angular.isDefined(tAttrs.step) ? parseInt(tAttrs.step) : 1;
                        scope.minValue = angular.isDefined(tAttrs.minValue) ? parseInt(tAttrs.minValue) : 0;
                        scope.maxValue = angular.isDefined(tAttrs.maxValue) ? parseInt(tAttrs.maxValue) : 100;
                        scope.labelFormat = angular.isDefined(tAttrs.labelFormat) ? tAttrs.labelFormat : "{value}";

                        ctrl.setDataMember(tElems);
                        ctrl.setProcessPara(scope);
                        ctrl.createSliderPointer(scope);
                        if (scope.editable) {
                            ctrl.setSliderPointerPositionLeftLimit();
                            ctrl.addSliderPointerDragEvent(scope);
                        }

                        scope.$watch('sliders', function(newVal, oldVal) {
                            if (!scope.mouseDown && newVal != undefined && newVal != oldVal) {
                                scope.minValue = angular.isDefined(tAttrs.minValue) ? parseInt(tAttrs.minValue) : 0;
                                scope.maxValue = angular.isDefined(tAttrs.maxValue) ? parseInt(tAttrs.maxValue) : 100;
                                ctrl.createSliderPointer(scope);
                                if (scope.editable) {
                                    ctrl.setSliderPointerPositionLeftLimit();
                                }
                            }
                        }, true);
                    }
                }
            }
        }]);

});
