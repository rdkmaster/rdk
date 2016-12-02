

define( ['rd.core', 'css!rd.styles.Panel', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'],
function() {
        var panelApp = angular.module("rd.containers.Panel", ['rd.core']);
        panelApp.directive('rdkPanel', ['Utils','EventService', 'EventTypes',function(Utils,EventService, EventTypes) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope:
                {
                    title: '=?',
                    icon:'@?',
                    hideOnClose:'@?',
                    beforeClose: '@?',
                    showClose: '@?',
                    showTitle: '@?',
                    height: '@?',
                    width: '@?',
                    id:'@'
                },
                template:'<div>\
                              <div class="rdk-panel-module" ng-show="panelShow">\
                                   <div class="rdk-panel-title" ng-show="{{showTitle}}" >\
                                        <span class="rdk-panel-caption">\
                                          <i class="{{icon}}" >{{title}}</i></span>\
                                        <div class="rdk-panel-close"  ng-show="{{showClose}}">\
                                            <i class="fa fa-close" ng-click="close()"></i>\
                                        </div>\
                                   </div>\
                                   <div class="rdk-panel-content" >\
                                       <div ng-transclude class="rdk-panel-content-transclude">\
                                       </div>\
                                   </div>\
                              </div>\
							  <div style="clear:both"></div>\
                          </div>',

                controller: ['$scope', function(scope) {

                }],
                compile: function(tEle, tAttrs) {
                        return {
                            post: _link
                        }
                    }, 
                 transclude: true                     
            }  
                 
            function _link ($scope, el, attrs) {

                   $scope.title = Utils.getValue($scope.title, attrs.title, '标题');  
                   $scope.hideOnClose = Utils.getValue($scope.hideOnClose, attrs.hideOnClose, 'true');               
                   $scope.panelShow=true;
                   
                   $scope.close=_close;
                    EventService.register($scope.id, EventTypes.CLOSE, function(event, data){
                        $scope.panelShow=false; 
                    });

                    EventService.register($scope.id, EventTypes.SHOW, function(event, data){
                        $scope.panelShow=true; 
                    });

                    function _close(){
                      if ($scope.hideOnClose=="true"){
                         $scope.panelShow=false;
                      }

                      if ($scope.id && $scope.hideOnClose=="false"){
                          var fn = Utils.findFunction($scope, $scope.beforeClose);  
                          if(typeof(fn) == 'function'){
                            fn();
                                              
                          }
                      }
                    }              
                    var elem = el[0].children[0]; 
                    console.log(elem);
                    if ($(el[0]).attr("width")){
                       $(elem).css('width',$(el[0]).attr("width"));

                    }else{
                        if (el[0].style.width){
                            $(elem).css('width',el[0].style.width);
                        }
                    }
					
                    if ($(el[0]).attr("height")){
                        $(elem).css('height',$(el[0]).attr("height"));
                    }else {
                        if (el[0].style.height){
                            $(elem).css('height',el[0].style.height);
                        }
					          }
                    
               }
       
            }])
        });
