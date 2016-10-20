define( ['rd.core', 'css!rd.styles.SingleIndicator', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'],
function() {
        var SingleIndicatorApp = angular.module("rd.controls.SingleIndicator", ['rd.core']);
        SingleIndicatorApp.directive('rdkSingleIndicator', ['Utils',function(Utils) {
            return {
                restrict: 'E',
                replace: true,
                scope:
                {
                  value:'=?',
                  pointTo:'=?',
                  label:'=?',
                  labelPosition:'@?',
                  icon : '@?',
                  formatter:'@?'
                },
                template: '<div  class="rdk-single-indicator">\
                              <div class="single-indicator-title  position_{{labelPosition}} single-indicator-bc">\
                                  <i class="{{icon}} single-indicator-icon"></i>\
                                  <div class=" point_to point_to_{{pointTo}}"></div>\
                              </div>\
                              <div class="single-indicator-content label_position_{{labelPosition}}">\
                                  <span class="single-indicator-label">{{label}}</span>\
                                  <br>\
                                  <span class="single-indicator-value"><span>{{value}}</span> <span>{{formatter}}</span></span>\
                              </div>\
                          </div>',
                controller: ['$scope', function(scope) {
                }],
                compile: function(tEle, tAttrs) {
                    Utils.bindDataSource(tAttrs, 'value');
                    return {
                        post: _link
                    }
                },                   
            }  
            function _link (scope,iEle, el, attrs) {
                scope.value = Utils.getValue(scope.value, attrs.value, '0');
                scope.pointTo = Utils.getValue(scope.pointTo, attrs.pointTo, 'null');
                scope.label = Utils.getValue(scope.label, attrs.label, '终端');
                scope.labelPosition = Utils.getValue(scope.labelPosition, attrs.labelPosition, 'right');
                scope.icon = Utils.getValue(scope.icon, attrs.icon, 'fa fa-mobile fa-4x');
                // if(scope.formatter){
                //     scope.formatter = scope.formatter.slice(1,-1);
                // }
                scope.formatter = Utils.getValue(scope.formatter, attrs.formatter, '%');
                HTMLElement.prototype.__defineGetter__("currentStyle", function () { 
                    return this.ownerDocument.defaultView.getComputedStyle(this, null); 
                });
                _siCss(iEle,scope);
                function _siCss(iEle,scope){
                    iEle[0].style.padding = "10px";
                    iEle[0].style.overflow = "hidden";
                    iEle[0].style.display = "table";
                    var siBc ;  
                    if(scope.labelPosition=='top'||scope.labelPosition=='left'){
                        var titleNode = (iEle.find("div")[0]);
                        iEle[0].appendChild(titleNode);
                        if(scope.pointTo=='null'){
                            var siBc = "transparent";
                        }else{
                            var siBc = (iEle.find("div")[1]).currentStyle.backgroundColor;
                        }
                        (iEle.find("div")[1]).style.borderRadius = "50%";
                        (iEle.find("div")[1]).style.position = "relative";
                        (iEle.find("div")[1]).style.textAlign = "center";
                        (iEle.find("div")[0]).style.display = "table";
                        (iEle.find("div")[0]).style.padding = " 10px ";
                        (iEle.find("div")[0]).style.textAlign = "center";
                        (iEle.find("div")[0]).style.margin = "0 auto";
                        (iEle.find("div")[2]).style.display = "black";
                        (iEle.find("div")[2]).style.width = "0";
                        (iEle.find("div")[2]).style.height = "0";
                        (iEle.find("div")[2]).style.position = "absolute";
                        scope.$watch('pointTo', function(newVal, oldVal) {
                                _changeCssTop(newVal);
                        }, true);
                    }else{
                        if(scope.pointTo=='null'){
                            var siBc = "transparent";
                        }else{
                            var siBc = (iEle.find("div")[0]).currentStyle.backgroundColor;
                        }
                        (iEle.find("div")[0]).style.borderRadius = "50%";
                        (iEle.find("div")[0]).style.position = "relative";
                        (iEle.find("div")[0]).style.textAlign = "center";
                        (iEle.find("div")[1]).style.display = "black";
                        (iEle.find("div")[1]).style.width = "0";
                        (iEle.find("div")[1]).style.height = "0";
                        (iEle.find("div")[1]).style.position = "absolute";
                        (iEle.find("div")[2]).style.display = "table";
                        (iEle.find("div")[2]).style.padding = " 10px ";
                        (iEle.find("div")[2]).style.textAlign = "center";
                        (iEle.find("div")[2]).style.margin = "0 auto";
                        scope.$watch('pointTo', function(newVal, oldVal) {
                                _changeCssBottom(newVal);
                        }, true);
                    };
                    if(scope.labelPosition=='top'||scope.labelPosition=='bottom') {
                        (iEle.find("div")[1]).style.margin ="0 auto";
                    }else if(scope.labelPosition=='left'||scope.labelPosition=='right') {
                        iEle.children("div")[1].style.float ="left";
                        iEle.children("div")[0].style.float ="left";
                    };
                    
                    function _changeCssTop(newVal) {
                        if(newVal=='right'){
                            (iEle.find("div")[2]).style.borderLeft = siBc + '7px solid';
                            (iEle.find("div")[2]).style.borderTop = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.borderRight = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.borderBottom = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.top = '43%';
                            (iEle.find("div")[2]).style.right = '-9px';
                            (iEle.find("div")[2]).style.bottom = 'auto';
                            (iEle.find("div")[2]).style.left = 'auto';
                        }else if(newVal=='left'){
                            (iEle.find("div")[2]).style.borderRight = siBc + '7px solid';
                            (iEle.find("div")[2]).style.borderTop = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.borderBottom = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.borderLeft = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.top = '43%';
                            (iEle.find("div")[2]).style.left = '-9px';
                            (iEle.find("div")[2]).style.bottom = 'auto';
                            (iEle.find("div")[2]).style.right = 'auto';
                        }else if(newVal=='top'){
                            (iEle.find("div")[2]).style.borderBottom = siBc + '7px solid';
                            (iEle.find("div")[2]).style.borderRight = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.borderLeft = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.borderTop = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.top = '-9px';
                            (iEle.find("div")[2]).style.right = '43%';
                            (iEle.find("div")[2]).style.left = 'auto';
                            (iEle.find("div")[2]).style.bottom = 'auto';
                        }else if(newVal=='bottom'){
                            (iEle.find("div")[2]).style.borderTop = siBc + '7px solid';
                            (iEle.find("div")[2]).style.borderRight = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.borderLeft = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.borderBottom = 'transparent 3px solid';
                            (iEle.find("div")[2]).style.bottom = '-9px';
                            (iEle.find("div")[2]).style.left = '43%';
                            (iEle.find("div")[2]).style.right = 'auto';
                            (iEle.find("div")[2]).style.top = 'auto';
                        }else if(newVal=='null'){
                            (iEle.find("div")[2]).style.borderColor = 'transparent'
                        };
                    };
                    function _changeCssBottom(newVal) {
                        if(newVal=='right'){
                            (iEle.find("div")[1]).style.borderLeft = siBc + '7px solid';
                            (iEle.find("div")[1]).style.borderTop = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.borderRight = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.borderBottom = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.top = '43%';
                            (iEle.find("div")[1]).style.right = '-9px';
                            (iEle.find("div")[1]).style.bottom = 'auto';
                            (iEle.find("div")[1]).style.left = 'auto';
                        }else if(newVal=='left'){
                            (iEle.find("div")[1]).style.borderRight = siBc + '7px solid';
                            (iEle.find("div")[1]).style.borderTop = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.borderBottom = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.borderLeft = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.top = '43%';
                            (iEle.find("div")[1]).style.left = '-9px';
                            (iEle.find("div")[1]).style.bottom = 'auto';
                            (iEle.find("div")[1]).style.right = 'auto';
                        }else if(newVal=='top'){
                            (iEle.find("div")[1]).style.borderBottom = siBc + '7px solid';
                            (iEle.find("div")[1]).style.borderRight = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.borderLeft = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.borderTop = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.top = '-9px';
                            (iEle.find("div")[1]).style.right = '43%';
                            (iEle.find("div")[1]).style.left = 'auto';
                            (iEle.find("div")[1]).style.bottom = 'auto';
                        }else if(newVal=='bottom'){
                            (iEle.find("div")[1]).style.borderTop = siBc + '7px solid';
                            (iEle.find("div")[1]).style.borderRight = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.borderLeft = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.borderBottom = 'transparent 3px solid';
                            (iEle.find("div")[1]).style.bottom = '-9px';
                            (iEle.find("div")[1]).style.left = '43%';
                            (iEle.find("div")[1]).style.right = 'auto';
                            (iEle.find("div")[1]).style.top = 'auto';
                        }else if(newVal=='null'){
                            (iEle.find("div")[1]).style.borderColor = 'transparent'
                        };
                    };

                };

            };
       
      }])
});
