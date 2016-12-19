define(['rd.core', 'css!rd.styles.Button','css!rd.styles.FontAwesome'
], function() {
    var btnSearchApp = angular.module('rd.controls.Button', ['rd.core']);
    btnSearchApp.directive('rdkButton', ['EventService', 'Utils', 'EventTypes', '$compile', '$timeout', 
        function(EventService, Utils, EventTypes, $compile, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                template:'<div class="rdk-button-wrap">\
                                <div class="rdk-button-comment" ng-click="setSelected()">\
                                    <div class="rdk-button-shade rdk-button-{{type}}"></div>\
                                    <button class="rdk-button-btn" ng-mouseover="$mouseOver()" ng-mouseout="$mouseOut()"\
                                    title="{{tooltip}}" ng-class="setBtnClass()" ng-disabled="!enabled">\
                                        <img src="{{icon}}" ng-click="$stopPro($event)" ng-if="iconShow" ng-class="{\'rdk-padding-right\':paddingHide}">\
                                        <i ng-click="$stopPro($event)" ng-class="{\'rdk-padding-right\':paddingHide}" class="{{icon}}" ng-if="!iconShow"></i>{{label}}\
                                    </button>\
                                </div>\
                           </div>',
                scope:{
                    click: '&?',
                    icon:'@?',
                    label:'@?',
                    selected:'=?',
                    enabled:'=?',
                    toggle:'=?',
                    tooltip:'@?',
                    type:'@?'
                },
                link: function(scope,ele, attr) {
                    scope.label = Utils.getValue(scope.label, attr.label, '');
                    scope.icon = Utils.getValue(scope.icon, attr.icon, false);
                    scope.enabled = Utils.getValue(scope.enabled, attr.enabled ,true);
                    scope.setSelected=function(){
                        if(!scope.enabled){
                            return;
                        }
                        // $timeout为了兼容IE11
                        $timeout(function() {
                            if(scope.toggle==true){
                                scope.selected=!scope.selected
                            }
                            var fn=scope.click(scope);
                            if (!!fn) {
                                fn();
                            }
                        }, 0);
                    }
                    scope.$stopPro=function($event){
                        if(!scope.enabled){
                         $event.stopPropagation();
                        }
                    }
                     scope.setBtnClass=function(){
                        return  {
                            'rdk-button-selected':scope.toggle?scope.selected:false,
                            'rdk-button-enabled' :!scope.enabled,
                            'rdk-shade-opacity': scope.mouse
                        }
                    }
                    scope.iconShow=false;
                    var classFlag=/\w+\.\w+/;
                    if(classFlag.test(scope.icon)){
                    scope.iconShow=true
                    }
                    /* hover函数*/
                    scope.mouse=false;
                    scope.$mouseOver=function(){
                        scope.mouse=true
                    }
                    scope.$mouseOut=function(){
                        scope.mouse=false
                    }
                    /* 禁用时样式 */
                    scope.paddingHide = !!scope.icon&&scope.icon!="false"&&!!scope.label
                }
            };
        }
    ])
});