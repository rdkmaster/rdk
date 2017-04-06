define(['angular','rd.core', 'css!rd.styles.Steps','css!rd.styles.FontAwesome'], function(){
    var stepsApp = angular.module('rd.controls.Steps', ['rd.core']);

    stepsApp.directive('rdkSteps', ['Utils','EventService', 'EventTypes',function factory(Utils,EventService,EventTypes) {
        var scopeDefine={
            id:"@?",
            activeStep:"=?", //设置活动步骤,索引从0开始
            steps:"=",     // status enum:'wait','process','finish','error'
            direction:"@?" //设置steps的方向 enum:'horizontal','vertical'
        };
        return {
            restrict: 'E',
            template:"<div class='rdk-steps-module'>\
                         <div class='rdk-steps-item {{step.status|statusClass}}' step-line ng-repeat='step in steps' title='{{step.title}}'>\
                             <span class='{{step.status|statusClass}}'>\
                                <span>{{step.title}}</span>\
                                <i class='step-icon {{step.status|statusIcon}}'>{{showIcon(step.status,$index)}}\</i>\
                             </span>\
                         </div>\
                      </div>",
            replace: true,
            transclude: true,
            scope: scopeDefine,
            link:_link
        };
        function _link(scope,element,attrs) {
            scope.direction =  Utils.getValue(scope.direction, attrs.direction, 'horizontal');
            scope.activeStep =  Utils.getValue(scope.activeStep, attrs.activeStep, 0);
            scope.appScope=Utils.findAppScope(scope);
            scope.appScope.activeStep=scope.activeStep;
            //设置方向
            //if(scope.direction==="horizontal"){}

            _initStepStatus(scope.steps,scope.activeStep);

            scope.showIcon=function(status,index){
                if(status=="error" ||status=="finish"){
                    return ""
                }else{
                    return index+1
                }
            };
            scope.$watch("activeStep",function(newVal,oldVal){
                if(newVal !== oldVal){
                    if(newVal<0){
                        scope.activeStep=0
                    }else if(newVal>scope.steps.length){
                        scope.activeStep=scope.steps.length-1
                    }
                    _changeStepsStatus(scope.steps,scope.activeStep,oldVal);
                    scope.appScope.activeStep=scope.activeStep;
                }
            });
            scope.$watch("steps",function(newVal,oldVal){
                _initStepStatus(scope.steps,scope.activeStep);
            });

            function _changeStepsStatus(steps,newIndex,oldIndex){
                angular.forEach(steps,function(step,index){
                    if(index==newIndex){
                        step.status =  "process";
                    }
                    else if(index < newIndex){
                        step.status =  step.status=="error"?step.status:"finish";
                    }
                    else if(index > newIndex){
                        step.status =  "wait";
                    }
                });
            }
            function _initStepStatus(steps,activeIndex){
                angular.forEach(steps,function(step,index){
                    if(activeIndex == index){
                        step.status =  "process";
                    }else{
                        step.status = step.status || "wait";
                    }
                });
            }
        }
    }]);
    stepsApp.directive('rdkStepsContent', ['Utils','EventService', 'EventTypes',function factory(Utils,EventService,EventTypes) {
        var scopeDefine={
            activeStep:"=?" //设置活动步骤,默认0索引
        };
        return {
            restrict: 'AE',
            template:"<div ng-transclude ng-show='isCurStepActive'></div>",
            replace: true,
            transclude: true,
            scope: scopeDefine,
            link:_link
        };
        function _link(scope,element,attrs,rdkStepsContrller) {
            scope.isCurStepActive=false;
            scope.appScope=Utils.findAppScope(scope);
            scope.$watch("appScope.activeStep",function(newVal,oldVal){
                if(scope.activeStep==newVal){
                    scope.isCurStepActive=true
                }else{
                    scope.isCurStepActive=false;
                }
            });
        }
    }]);

    stepsApp.directive('stepLine', ['$timeout',function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (!scope.$last) {
                    element.after("<div class='rdk-step-line'><span></span></div>");
                }
            }
        }
    }]);
    stepsApp.filter('statusIcon', function() {
        return function (status) {
            switch (status){ //todo:"wait process"还没有图标
                // case "wait":return "fa fa-check";break;
                // case "process":return "fa fa-check";break;
                case "finish":return "fa fa-check";break;
                case "error":return "fa fa-times";break;
                //  default: return "fa fa-check";
            }
        }
    });
    stepsApp.filter('statusClass', function() {
        return function (status) {
            switch (status){
                case "wait":return "step-status-wait";break;
                case "process":return "step-status-process";break;
                case "finish":return "step-status-finish";break;
                case "error":return "step-status-error";break;
                default: return "step";
            }
        }
    });
});