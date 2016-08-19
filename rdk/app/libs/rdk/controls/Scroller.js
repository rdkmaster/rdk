

define( ['rd.core','css!rd.styles.Scroller', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'],
function() {
        var scrollerApp = angular.module("rd.controls.Scroller", ['rd.core']);

        scrollerApp.directive('rdkScroller', ['Utils','EventService', 'EventTypes','$timeout','$compile',function(Utils,EventService, EventTypes,$timeout,$compile) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope:
                {
                    data: '=?',
                    pageNum:'@?',
                  
                },
                //要想ng-repeat开始的时候不编译，这样才能使用其中的数组项
                // terminal: true,
                
                controller: ['$scope', function(scope) {
   
                }],
                template: '<div class="slider" > \
                            <div class="slide" rdk-repeat="item in data" ng-style="item.style" > \
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

                  
                   var count=scope.data.length;//图片总数量
                   //如果pageNum未配置，默认为1
                   scope.pageNum = Utils.getValue(scope.pageNum, attrs.pageNum, 1);  

                   //获取控件设置的总宽度
                   var totalwidth=$(elem[0].parentElement.firstElementChild).width();
                   //每个要显示区域的平均宽度
                   var pagewidth=totalwidth/scope.pageNum;

                   $(elem.find(".fa")).css('font-size','30px');

                   var showdata=[];//存储需要显示的数据

                    var setData=function(){
                      showdata=[];
                      for (var i=0;i<scope.pageNum;i++){
                         showdata.push(scope.data[i]);
                      }
                    };
                    setData();
                   
                  //对数据项进行右移，并赋值给showdata数组
                  scope.next=function(){
                    
                      var tmp=scope.data[count-1];
                      for (var i=count-1;i>0;i--){
                          scope.data[i]= scope.data[i-1];
                      }
                      scope.data[0]=tmp;
                      setData();
                      
                    
                  };

                  //对数据项进行左移，并赋值给showdata数组
                  scope.prev=function(){

                      var tmp=scope.data[0];
                      for (var i=0;i<count-1;i++){
                          scope.data[i]= scope.data[i+1];
                      }
                      scope.data[count-1]=tmp;   
                      setData();               
                   
                  };

                     var parentEle = elem.find(".slide");
                     var elements = [];

                    //对data数据进行监控，发生变化时，清空elements，并重新绑定数据
                    scope.$watch('data',function(newVal, oldVal){


                      if(elements.length>0){
                        for(var i= 0;i<elements.length;i++){
                            elements[i].el.remove();
                            elements[i].scope.$destroy();
                        }
                        elements = [];
                      }
                      bindData();

                    },true);

                    
                    //将元素和scope进行绑定
                    var bindData=function(){

                      // var parentEle = elem.parent();
                      // var elements = [];

                      for(var i=0;i<showdata.length;i++){
                        var newScope = scope.$new();

                        newScope.item = showdata[i];
                        

                        transclude(newScope,function(clone){
                             // var subclone=clone[0].innerHTML; 
                            //创建div
                            var div=$('<div></div>');
                            div.attr('class','context'); 
                            var newclone=div.append(clone);
                            parentEle.append(newclone);
                            //设置context的宽度
                            $(elem.find(".context")).css('width',pagewidth);

                            var element = {};
                            element.el = newclone;
                            element.scope = newScope;
                            element.scope.$on('$destroy',function(){

                                console.log('被移除')
                            });
                            elements.push(element);
                            
                        }) ;
                        // $compile(elements)(scope);                      
                      }
                    };

                    
                   // transclude(scope, function(clone, innerScope) {
                   //    angular.element(elem.find(".slide")[0]).append(clone[0].innerHTML); 
                   // });

                    // $compile(elem)(scope);//独立作用域的scope
                  
                  var timer;
                  
                  var sliderFunc=function(){
                    timer=$timeout(function(){
                      scope.next();
                      // bindData();
                      console.log("timeout,perform again")
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
