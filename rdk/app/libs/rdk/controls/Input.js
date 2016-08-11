define(['angular', 'jquery', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var inputApp = angular.module("rd.controls.Input", []);
    inputApp.directive('rdkInput', function() {
        return {
            restrict: 'EA',
            require: '?ngModel',
            replace: true,
            scope:{
               placeholder : "@?", 
               readonly: "@?"
            },
            template: '<div>\
                     <input type="text" class="form-control" placeholder="{{placeholder}}">\
                 <span class="glyphicon glyphicon-remove" \
                   style="position:absolute;right:10px;color:gray;font-size:14px"\
                   ng-show="showDelete"></span>\
                 <div style="clear:both"></div>\
                </div>',
            compile: function(tElement, tAttrs, transclude) {
                return function(scope, iElement, iAttrs, ngModel) {
                    if (!ngModel) return;
                    var inputElement = iElement[0].children[0];
                    var iconElement = iElement[0].children[1];

                    //处理STYLE
                    $(inputElement).addClass($(iElement[0]).attr("class"));
                    $(iElement[0]).removeAttr("class");

                    $(inputElement).attr("style", $(iElement[0]).attr("style"));
                    $(iElement[0]).attr("style", "position:relative;" + $(iElement[0]).attr("style"));

                    $(iconElement).css("top", (parseInt($(inputElement).css("height")) - 14) / 2);
                    $(iconElement).css("right", 10 - parseInt($(inputElement).css("margin-left")));

                    scope.$watch("readonly", function(newVal, oldVal){   
                        if(newVal == 'true'){
                            $(iElement[0]).find("input").attr("readOnly", true);
                            scope.showDelete = false;
                        }
                        else{
                            $(iElement[0]).find("input").removeAttr("readOnly");

                        }      
                    }, true);                    

                    var updateModel = function(inputValue) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(inputValue);
                            changeShowDelete(inputValue);
                        });
                    };

                    inputElement.oninput = function(event) {
                        updateModel(event.target.value);
                    }

                    ngModel.$render = function() {
                        inputElement.value = ngModel.$viewValue || '';
                        changeShowDelete(ngModel.$viewValue);
                    };

                    function changeShowDelete(value) {
                        if (value) scope.showDelete = true;
                        else scope.showDelete = false;
                    }

                    iconElement.onclick = function() {
                        inputElement.value = '';
                        updateModel('');
                    }
                }
            }
        };
    });
});
