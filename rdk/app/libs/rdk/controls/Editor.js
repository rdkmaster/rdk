/**
 * Created by 00100630 on 2016/12/17.
 */
define(['angular', 'rd.core',  'codemirror-core',
  'codemirror-mode',
  'codemirror-fold',
  'codemirror-selection-line',
  'css!codemirror-css',
  'ui.codemirror',
  'css!rd.styles.Bootstrap'
], function() {
  var editorApp = angular.module("rd.controls.Editor", ['rd.core', 'ui.codemirror']);
  editorApp.directive('rdkEditor', ['Utils', '$timeout','$compile', '$controller',
    function(Utils, $timeout, $compile, $controller) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          text: '='
        },
        controller: ['$scope', function(scope){
          Utils.publish(scope, this);
          /* 组件对外开放函数 */
        }],
        template: function(tElement, tAttrs) {
          return '<textarea ui-codemirror ui-codemirror-opts="editorOptions" ng-model="text"></textarea>';
        },
        compile: function(tEle, tAttrs) {
          return {
            pre: _link
          }
        }
      }
      function translateType(type) {
        type = type.toLowerCase();
        if(type === 'html') {
          type =  'text/html';
        }
        return type;
      }
      function _link(scope, element, attrs) {
        console.log('editor post link');
        var readOnly = !Utils.isTrue(attrs.editable, true)
          ,foldable =  Utils.isTrue(attrs.foldable, false)
          ,selectable = Utils.isTrue(attrs.selectable, false)
          ,type = !attrs.type ?  'text' : attrs.type;

        readOnly = readOnly? 'nocursor': readOnly
        type = translateType(type);
        scope.editorOptions = {
          lineWrapping : true,
          lineNumbers: true,
          readOnly: readOnly, //是否打开代码展开功能，默认为false
          foldGutter: foldable, //是否打开代码展开功能，默认为false
          mode: type,
          styleActiveLine: selectable, //是否显示选中行样式，默认为false
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        }
        console.info(scope.editorOptions)
      }
    }
  ]);
});