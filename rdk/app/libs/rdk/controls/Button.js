define(['rd.core', 'css!rd.styles.Button'
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
                                    <button class="rdk-button-btn " ng-click="click()" ng-mouseover="$mouseOver()" ng-mouseout="$mouseOut()"\
                                    title="{{tooltip}}" ng-class="{rdk_button_selected:toggle?selected:false,\
                                        rdk_button_enabled:!enabled,rdk_button_over: mouse}" ng-disabled="!enabled">\
                                        <img src="{{icon}}" ng-click="$stopPro($event)">{{label}}\
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
                    tooltip:'@?'
                },
                 controller: ['$scope', function(scope) {

                }],
                link: function(scope,ele, attr) {
                    scope.label = Utils.getValue(scope.label, attr.label, '');
                    scope.icon = Utils.getValue(scope.icon, attr.icon, false);
                    scope.enabled = Utils.getValue(scope.enabled, attr.enabled ,true);
                    scope.setSelected=function(){
                        if(scope.toggle==true){
                            scope.selected=!scope.selected
                       }
                    }
                    scope.$stopPro=function($event){
                        if(!scope.enabled){
                         $event.stopPropagation();
                        }
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
                    var btn = ele[0].children[0].children[0];
                    var img = ele[0].children[0].children[0].children[0];
                    var btnHeight = parseFloat($(btn).attr('height'));
                    var imgWidth=parseFloat($(img).css('width'));
                    var imgHeight=parseFloat($(img).css('height'));
                    if(scope.icon=="false"){
                        $(img).css('display','none');
                    }else if(!scope.icon){
                        $(img).css('display','none');
                    }else{
                        $(btn).css('paddingLeft',(imgWidth+20)+'px');
                        $(img).css({
                        'left': '16px',
                        'top' : (btnHeight-imgHeight)/2 +"px",
                        })
                    }
                    

                }
            };
        }
    ])
});
