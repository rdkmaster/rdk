/**
 * Created by 00100630 on 2016/12/23.
 */
define(['angular', 'jquery', 'rd.core', 'css!rd.styles.IconFonts', 
  'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
  var nInputApp = angular.module("rd.controls.Icon", ['rd.core']);
  nInputApp.directive('rdkIcon', ['Utils', '$timeout','$compile', '$controller',
    function(Utils) {
      return {
        restrict: 'E',
        scope: {
          icon: '@',
          label: '@?'
        },
        controller: ['$scope', function(scope){
          Utils.publish(scope, this);
          /* 组件对外开放函数 */
        }],
        template: function() {
          return '<span> \
            <i ng-if="!isImage" class="{{icon}}"></i>\
            <img ng-show="isImage" src="{{icon}}" style="width:1em; height: 1em;">{{label}}</span>';
        },
        compile: function(tEle, tAttrs) {
          return {
            post: _link
          }
        }
      }

      function _link(scope, element, attrs) {
        scope.icon = Utils.getValue(scope.icon, attrs.icon, '');
        scope.label = Utils.getValue(scope.label, attrs.label, '');
        var fromComplete = true;
        function loadImage(url, callback) {
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