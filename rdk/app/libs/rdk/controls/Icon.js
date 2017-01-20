/**
 * Created by 00100630 on 2016/12/23.
 */
define(['angular', 'jquery', 'rd.core', 'css!rd.styles.IconFonts', 
  'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
  var nInputApp = angular.module("rd.controls.Icon", ['rd.core']);
  nInputApp.directive('rdkIcon', ['Utils', 'EventService', 'EventTypes', function(Utils, EventService, EventTypes) {
      var scopeDefine = {
        icon: '@',
        label: '@?',
        click: '&?'
      };
      return {
        restrict: 'E',
        scope: scopeDefine,
        controller: ['$scope', function(scope){
          Utils.publish(scope, this);
        }],
        template: function() {
          return '<div>\
                    <span style="{{cursorHandler()}}" ng-click="clickHandler()"> \
                      <i ng-if="!isImage" class="{{icon}}"></i>\
                      <img ng-show="isImage" src="{{icon}}" style="width:1em; height: 1em;">{{label}}\
                    </span>\
                  </div>';
        },
        compile: function(tEle, tAttrs) {
          return {
            post: _link
          }
        }
      }

      function _link(scope, element, attrs) {
        Utils.checkEventHandlers(attrs,scopeDefine);
        scope.icon = Utils.getValue(scope.icon, attrs.icon, '');
        scope.label = Utils.getValue(scope.label, attrs.label, '');

        scope.cursorHandler = function(){
           var appScope = Utils.findAppScope(scope);
           return scope[EventTypes.CLICK](appScope) ? 'cursor: pointer' : 'cursor: default';
        }

        scope.clickHandler = function(){
          EventService.raiseControlEvent(scope, EventTypes.CLICK);
        }

        var fromComplete = true;
        function loadImage(url, callback) {
          if((scope.icon.indexOf('fa fa')!=-1) || (scope.icon.indexOf('iconfont iconfont')!=-1)){
            return;
          }
          var img = new Image();
          img.src = url;

          if(img.complete) {
            callback.call();
            return;
          }
          img.onload = function () {
            fromComplete = false;
            callback.call();
          };
        }

        loadImage(scope.icon, function(){
          if (fromComplete) {
            scope.isImage = true;
          }else {
            scope.$apply(function () {
              scope.isImage = true;
            });
          }
        })
      }
    }
  ]);
});