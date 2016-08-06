define(['angular'], function() {
    var utilsModule = angular.module("rd.services.Utils", []);
    utilsModule.service('Utils', ['RDKConst', function(RDKConst) {
        // (function() {
        //     setTimeout(function() {
        //         try {
        //             $('.selectpicker').selectpicker();
        //         } catch (e) {}
        //     }, 3000);
        // })();

        var _this = this;

        var _ready = false;
        var _onReadyCallbackList = [];

        this.swipeOnReadyCallbacks = function() {
            _ready = true;
            angular.forEach(_onReadyCallbackList, function(callback, key) {
                callback.call(this);
            });
            _onReadyCallbackList.splice(0, _onReadyCallbackList.length);
            _onReadyCallbackList = undefined;
        };

        this.onReady = function(callback) {
            if (_ready) {
                callback();
            } else {
                _onReadyCallbackList.push(callback);
            }
        }
        this.camel2snake = function(string) {
            //将首字母大写的形式转为下划线分隔的形式
            var newStr = '';
            for (i = 0; i < string.length; i++) {
                var asc = string.charCodeAt(i);
                if (asc >= 0x41 && asc <= 0x5a) {
                    //A-Z转为对应的a-z
                    newStr += '_' + String.fromCharCode(asc + 32);
                } else {
                    newStr += string.charAt(i);
                }
            }
            return newStr;
        }

        this.snake2camel = function(string) {
            //将下划线分隔的形式转为首字母大写的形式
            var newStr = '';
            var changeFlag = false;
            for (i = 0; i < string.length; i++) {
                var ch = string.charAt(i);


                if (ch == '_' || ch == '-') {
                    changeFlag = true;
                    continue;
                }
                if (changeFlag) {
                    changeFlag = false;
                    var asc = string.charCodeAt(i);
                    if (asc >= 0x61 && asc <= 0x7a) {
                        //a-z转为对应的A-Z
                        newStr += String.fromCharCode(asc - 32);
                    } else {
                        newStr += ch;
                    }
                } else {
                    newStr += ch;
                }
            }
            return newStr;
        }

        function _findProp(scope, prop, defaultValue) {
            var fun;
            try{
                fun = scope.$eval(prop, scope);
            }
            catch(err){
                return null;
            }            
            if (angular.isUndefined(fun)) {
                return scope.$parent ? _findProp(scope.$parent, prop, defaultValue) : defaultValue;
            } else {
                return fun;
            }
        }

        this.findProperty = function(scope, prop, defaultValue) {
            if (!prop) {
                return defaultValue;
            }
            return _findProp(scope, prop.trim(), defaultValue);
        }

        this.findFunction = function(scope, funcName, defaultValue) {
            if (!funcName) {
                return defaultValue;
            }
            funcName = funcName.replace(/\(.*\)/g, '').trim();
            return _findProp(scope, funcName, defaultValue);
        }

        this.findAppScope = function(scope) {
            function _findScope(scope) {
                if (!scope.hasOwnProperty("_rdk_controllerName")) {
                  return _findScope(scope.$parent)
                } else {
                    return scope;
                }
            }
            return _findScope(scope);
        }

        this.likePromise = function(object) {
            return object && typeof(object.then) === 'function';
        }

        var _uniqueIdIndex = 0;
        var _defaultPrefix = '__unique_id__';

        this.createUniqueId = function(prefix) {
            _uniqueIdIndex++;
            if (angular.isUndefined(prefix)) {
                prefix = _defaultPrefix;
            }
            return prefix + _uniqueIdIndex;
        };

        this.rebornUniqueId = function(element, prefix) {
            var rebornID = this.createUniqueId(prefix);
            element[0].querySelector("#" + _defaultPrefix).setAttribute("id", rebornID);
            return rebornID;
        };

        this.compile = function(scope, source) {
            if (angular.isUndefined(source)) {
                return source;
            }
            return source.replace(/{{(.+?)}}/g, function(matched, captured) {
                return scope.$eval(captured);
            });
        }

        this.isTrue = function(value, defaultValue) {
            if (defaultValue == undefined) {
                defaultValue = false;
            }
            return angular.isDefined(value) ? (((value == 'false')||(value === false)) ? false : true) : defaultValue;
        }

        this.getValue = function(scopeValue, attrValue, defaultValue){
            return angular.isDefined(scopeValue) ? scopeValue: angular.isDefined(attrValue) ? attrValue:defaultValue;
        }

        this.safeApply = function(scope, fn) {
            var phase = scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                scope.$apply(fn);
            }
        };

        this.stringStartWith = function(str, prefix) {
            if (prefix == null || prefix == "" || str.length == 0 || prefix.length > str.length) {
                return false;
            }
            return str.substr(0, prefix.length) == prefix;
        }

        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        this.uuid = function() {
            var chars = CHARS,
                uuid = new Array(36),
                rnd = 0,
                r;
            for (var i = 0; i < 36; i++) {
                if (i == 8 || i == 13 || i == 18 || i == 23) {
                    uuid[i] = '-';
                } else if (i == 14) {
                    uuid[i] = '4';
                } else {
                    if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('');
        }

        this.bindDataSource = function(tAttrs, toProp, fromProp) {
            if (tAttrs[toProp]) {
                return;
            }
			if (!fromProp) {
				fromProp = 'ds';
			}
            if (tAttrs[fromProp]) {
				var expression = tAttrs[fromProp].replace(/(^|[}]{2})(.*?)([{]{2}|$)/g, '$1"$2"$3');
				var dataProp = '';
				angular.forEach(expression.split(/{{|}}/g), function(item) {
					item = item.trim();
					if (item == '""') {
						return;
					}
					dataProp += '(' + item + ')+';
				});
				tAttrs[toProp] = 'this[' + dataProp.substring(0, dataProp.length-1) + ']';
            } else {
                console.error('至少需要提供 ds 或者 ' + toProp + ' 属性');
            }
        }

        this.shallowCopy = function(src, dest) {
            if (!dest) {
                dest = {};
            }
            angular.forEach(src, function(value, key) {
                dest[key] = value;
            });
            return dest;
        }

        // 下面这几个函数提供了子级控件和父级控件之间的交互通道
        // 子级控件在自身数据有了变化之后，调用 callUpdater 通知父级
        // 通过控件的require属性无法做到任意父子级，因此通过这个方式实现

        this.childChange = function(scope, data) {
            var wrappedData = {
                ref: data
            };
            scope.$emit('child_change', wrappedData);
        }

        this.onChildChange = function(scope, handler) {
            var context = [handler];

            scope.$emit('init_child_change', scope);

            // 这里提及的 控件 和 子控件，都特指关注 child_change 的控件。
            // init_child_change事件一直往上冒，碰到最近一个控件就停下来
            // 每个控件都会把最近的子控件的scope保存在context中
            scope.$on('init_child_change', function(event, childScope) {
                if (event.targetScope == event.currentScope) {
                    //自己发的 init_child_change 事件，无视。
                    return;
                }

                context.push({
                    scope: childScope
                });
                event.stopPropagation();
            });

            scope.$on('child_change', function(event, wrappedData) {
                // child_change 事件发出时，需要把子控件中的数据
                // 更新到context中给 _callHandler 使用
                if (event.targetScope != event.currentScope) {
                    // 当 child_change 是自己发出的时，表示这是变化链的开始，
                    // context中没有任何子控件的数据
                    for (var i = 1; i < context.length; i++) {
                        if (context[i].scope == wrappedData.scope) {
                            break;
                        }
                    };
                    if (i >= context.length) {
                        console.warn('internal error, child scope not found!');
                        return;
                    }
                    context[i].data = wrappedData.ref;
                }

                //调用注册在当前控件上的child_change函数
                _callHandler(context, wrappedData);
                if (wrappedData.ref == RDKConst.STOP_PROPAGATIOIN) {
                    event.stopPropagation();
                }
                wrappedData.scope = scope;
            });

            function _callHandler(context, wrappedData) {
                var handler = context[0];
                if (!handler) {
                    return;
                }

                for (var idx = 0, len = context.length; idx < len; idx++) {
                    if (context[idx].data == wrappedData.ref) {
                        break;
                    }
                };
                try {
                    //处理后的数据更新到context上下文中
                    wrappedData.ref = handler(wrappedData.ref, context, idx >= len ? -1 : idx);
                } catch (e) {
                    console.warn('call handler error: ' + e);
                }
            }
        }



    }]);

    utilsModule.service('RDKConst', [function() {
        //组件上下级交互时，停止传播的标志
        this.STOP_PROPAGATIOIN = '__stop_propagation_145812__'
    }]);
});
