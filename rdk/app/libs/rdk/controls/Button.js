define(['rd.core', 'css!rd.styles.Button','css!rd.styles.FontAwesome'
], function() {
    var btnSearchApp = angular.module('rd.controls.Button', ['rd.core']);
    btnSearchApp.directive('rdkButton', ['EventService', 'Utils', 'EventTypes', '$compile',
        function(EventService, Utils, EventTypes,  $compile) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                template:'<div class="rdk-button-wrap">\
                                <div  class="rdk-button-comment" ng-click="setSelected()">\
                                    <button class="rdk-button-btn {{Fang}}" ng-mouseover="$mouseOver()" ng-mouseout="$mouseOut()"\
                                    title="{{tooltip}}" ng-class="{rdk_button_selected:toggle?selected:false,\
                                        rdk_button_enabled:!enabled,rdk_button_over: mouse}" ng-disabled="!enabled">\
                                        <img src="{{icon}}" ng-click="$stopPro($event)" ng-if="iconShow" ng-class="{rdk_padding_right:paddingHide}"><i ng-click="$stopPro($event)" ng-class="{rdk_padding_right:paddingHide}" class="{{icon}}" ng-if="!iconShow"></i>{{label}}\
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
                        if(scope.toggle==true){
                            scope.selected=!scope.selected
                       }
                       scope.click();
                    }
                    scope.$stopPro=function($event){
                        if(!scope.enabled){
                         $event.stopPropagation();
                        }
                    }
                    scope.iconShow=false;
                    var classFlag=/\/+/;
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
                    console.log(scope.label)
                    var btn = ele[0].children[0].children[0];
                    var img = ele[0].children[0].children[0].children[0];
                    scope.paddingHide=true;
                    // console.log(!!scope.label)
                    if(!!scope.icon&&scope.icon!="false"&&!!scope.label){
                        scope.paddingHide=true
                    }else{
                        scope.paddingHide=false
                    }

                    console.log(!!scope.icon,!!scope.label)
                }
            };
        }
    ])
});
