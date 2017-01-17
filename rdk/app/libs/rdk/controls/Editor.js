define(['../codemirror/lib/codemirror', 'css!../codemirror/lib/codemirror',
        '../codemirror/addon/edit/matchbrackets', '../codemirror/mode/css/css',
        '../codemirror/mode/htmlmixed/htmlmixed', '../codemirror/mode/javascript/javascript',
        '../codemirror/mode/xml/xml', 'rd.core'],
function(CodeMirror) {
    var moduleApp = angular.module("rd.controls.Editor", ['rd.core']);
    moduleApp.directive('rdkEditor', ['EventService', 'EventTypes', 'Utils',
        function(EventService, EventTypes, Utils) {
            var scopeDefine={
                id: '@?',
                value: '=?',
                options: '=?',
                mode: '@?',
                change: '&?',
                initialized: '&?',
            };
            return {
                restrict: 'E',
                scope: scopeDefine,
                replace: true,
                template: '<div style="border:1px solid #aaa"><textarea></textarea></div>',
                controller: ['$scope', function(scope) {
                    Utils.publish(scope, this);

                    this.getEditor = function() {
                        return scope.editor;
                    }

                    this.CodeMirror = CodeMirror;
                }],
                compile: function(tEle, tAttrs) {
                    Utils.checkEventHandlers(tAttrs, scopeDefine);
                    Utils.bindDataSource(tAttrs, 'value');
                    return {
                        post: _link
                    }
                },
            }

            function _link(scope, element, attrs) {
                var textarea = element.find('textarea')[0];
                //初始化文本框中的代码
                textarea.value = scope.value;

                var options = scope.options || {};
                options.mode = scope.mode || 'javascript';
                if (options.mode == 'html') {
                    options.mode = 'text/html';
                }
                if (!options.hasOwnProperty('lineNumbers')) {
                    options.lineNumbers = true;
                }
                if (!options.hasOwnProperty('matchBrackets')) {
                    options.matchBrackets = true;
                }
                scope.editor = CodeMirror.fromTextArea(textarea, options);

                var appScope = Utils.findAppScope(scope);
                //注册codemirror发出的事件
                CodeMirror.on(scope.editor, 'change', function() {
                    scope.value = scope.editor.doc.getValue();
                    EventService.raiseControlEvent(scope, EventTypes.CHANGE, scope.value);
                });

                scope.$watch('value', function(newVal, oldVal) {
                    if (!angular.isString(newVal) /*|| newVal == scope.value*/) {
                        return;
                    }
                    scope.editor.doc.setValue(newVal);
                });
                
                //发送就绪事件
                if (scope.id) {
                    EventService.raiseControlEvent(scope, EventTypes.INITIALIZED, scope.id);
                }
            }
        }
    ]);
});
