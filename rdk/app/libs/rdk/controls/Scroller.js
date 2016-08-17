

define( ['rd.core', 'css!rd.styles.Scroller', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'],
function() {
        var scrollerApp = angular.module("rd.controls.Scroller", ['rd.core']);
        scrollerApp.directive('rdkScroller', ['Utils','EventService', 'EventTypes','$timeout','$compile',function(Utils,EventService, EventTypes,$timeout,$compile) {
            return {
                restrict: 'E',
                replace: true,
                transclude: 'element',
                scope:
                {
                    data: '=?',
                    pageNum:'@?',
                  
                },
                //要想ng-repeat开始的时候不编译，这样才能使用其中的数组项
                terminal: true,
                
                controller: ['$scope', function(scope) {
                    // scope.images=[{src:'img1.png',title:'Pic 1'},{src:'img2.jpg',title:'Pic 2'},{src:'img3.jpg',title:'Pic 3'},{src:'img4.png',title:'Pic 4'},{src:'img5.png',title:'Pic 5'}]; 
   
                }],
                template: '<div class="slider" > \
                            <div class="slide" ng-repeat="item in data track by $index" ng-show="item.visible" ng-style="item.style"> \
                            </div> \
                            <div class="arrows"> \
                                <div class="left_arrow">  \
                                  <i class="fa fa-angle-left" ng-click="prev()"></i>\
                                </div> \
                                <div class="right_arrow"> \
                                  <i class="fa fa-angle-right" ng-click="next()"></i>\
                                </div> \
                            </div> \
                           </div>' ,
                
                compile: function(tEle, tAttrs) {
                        return {
                            post: _link
                        }
                }
                // templateUrl:'templates/templateurl.html'                                  
            }  
                 
                function _link (scope, elem, attrs,ctrl,transclude) {


                  transclude(scope, function(clone, innerScope) {
                     angular.element(elem.find(".slide")[0]).append(clone[0].innerHTML); 
                  });

                  $compile(elem)(scope);//独立作用域的scope



                  scope.currentIndex=0;
                  count=scope.data.length;//图片总数量
                   //如果pageNum未配置，默认为1
                   scope.pageNum = Utils.getValue(scope.pageNum, attrs.pageNum, 1);  
                   //每张图片的宽度，默认200px
                   var picwidth=200;
                   //要显示的总宽度
                   totalwidth=scope.pageNum*picwidth;
                   //设置样式总宽度
                    $(elem[0]).css('width',totalwidth);
                   
                  var Init=function(){
                    scope.next();
                  }
               
                  var setInvisible=function(){
                      scope.data.forEach(function(item){
                        item.visible=false;
                      });
                    
                  };
                 
                  var setVisible=function(){

                      for(var i=0;i<scope.pageNum;i++){
                        scope.data[i].visible =true;
                        //设置image的left属性
                        ileft=picwidth*i;
                        scope.data[i].style={ left: ileft,width:picwidth+"px" };

                      }
                    
                  };
                   scope.next=function(){
                    
                      setInvisible();
                      var tmp=scope.data[count-1];
                      for (var i=count-1;i>0;i--){
                          scope.data[i]= scope.data[i-1];
                      }
                      scope.data[0]=tmp;
                      setVisible();
                    
                  };

                
                  scope.prev=function(){

                      setInvisible();
                      var tmp=scope.data[0];
                      for (var i=0;i<count-1;i++){
                          scope.data[i]= scope.data[i+1];
                      }
                      scope.data[count-1]=tmp;
                      setVisible();
                    
                   
                  };

                  Init();
                  /* Start: For Automatic slideshow*/
                  
                  var timer;
                  
                  var sliderFunc=function(){
                    timer=$timeout(function(){
                      scope.next();
                      timer=$timeout(sliderFunc,5000);
                    },5000);
                  };
                  
                  sliderFunc();
                  
                  scope.$on('$destroy',function(){
                    $timeout.cancel(timer);
                  });

               
                   
                }
       
        }])
        });
