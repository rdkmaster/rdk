define(['rd.core', 'css!rd.styles.Button'
], function() {
    var btnSearchApp = angular.module('rd.controls.Button', ['rd.core']);
    btnSearchApp.directive('rdkButton', ['EventService', 'Utils', 'EventTypes', '$compile',
        function(EventService, Utils, EventTypes,  $compile) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                template:'<div><div ng-click="setSelected()" class="rdk-button-comment">\
                                <button class="rdk-button-btn " ng-click="click()"  ng-disabled="{{!enabled}}" \
                                title="{{tooltip}}" ng-class="{rdk_button_selected:(toggle?selected:false)}">\
                                    <img src="{{icon}}" ng-click="$stopPro($event)">{{label}}\
                                </button>\
                        </div></div>',
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
                    scope.enabled = Utils.getValue(scope.enabled, attr.enabled ,false);
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
                    if(!scope.enabled){
                      $(".rdk-button-btn").css({
                            "background":"#ddd",
                                "color" :"#f3f3f3"
                        })
                    }
                    var btn = ele[0].children[0].children[0];
                    var img = ele[0].children[0].children[0].children[0];
                    console.log(scope.tooltip)
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
