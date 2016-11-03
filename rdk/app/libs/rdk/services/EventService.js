define(['angular', 'rd.services.Utils', 'rd.attributes.ds'], function() {
    var event = angular.module('rd.services.EventService', ['rd.services.Utils']);

    event.constant("EventTypes", {
        START_QUERY: "start_query",
        START_ADD: "start_add",
        START_UPDATE: "start_update",
        START_DELETE: "start_delete",
        START_LOOP: "start_loop",
        STOP_LOOP: "stop_loop",
        BEFORE_QUERY:"before_query",

        RESULT: "result",
        QUERY_RESULT: "query_result",
        ADD_RESULT: "add_result",
        UPDATE_RESULT: "update_result",
        DELETE_RESULT: "delete_result",

        RESIZE: "resize",

        READY: "ready",
        TABLE_READY: "table_ready",
        GRAPH_READY: "graph_ready",
        GRAPH_UPDATE: "graph_update",
        UPDATE_GRAPH: "update_graph",

        CLICK: "click",
        OPEN: "open",
        CLOSE: "close",
        SELECT: "select",
        UNSELECT:"unselect",
        CHANGE: "change",
        ENTER: "enter",
        RESTORE: "restore",
        ERROR: "error",
        LOADING: "loading",
        HIGHLIGHT: "highlight",
        BEFORE_CLOSE :"before_close",
        SHOW:"show",
        CREATE: "create",
        CHECK: "check",
        ADD: "add",
        DESTROY: 'destroy',

        TAB_SELECT: "tab_select",
        ITEM_SELECTED: "item_selected", //tab_select 从里向外抛，捕捉对象
        ITEM_MULTI: "item_multi", //selector 编码方式控制 multi属性

        DATA_CHANGE:"data_change",
        DOUBLE_CLICK: "double_click",
        PAGING_DATA_CHANGE:"paging_data_change",

        BEFORE_EXPAND:"before_expand",
        BEFORE_COLLAPSE:"before_collapse",
        BEFORE_RENAME:"before_rename",
        BEFORE_REMOVE:"before_remove",
        BEFORE_EDIT_NAME:"before_edit_name",
    });

    event.service('EventService', ['$rootScope', '$timeout', '$rootScope', 'Utils', 'EventTypes',
        function($rootScope, $timeout, $rootScope, Utils, EventTypes) {
            var _this = this;
            var _appScope = undefined;
            var _onReadyBroadcastList = [];
            var _eventMap = {};
            var NO_DISPATCHER = "__NO_DISPATCHER__";

            // Utils.eventService(_this);

            function _registerAgain() {
                angular.forEach(_eventMap, function(dispMap, eventType) {
                    var b = dispMap.ready145812;
                    delete dispMap.ready145812;
                    if (b) {
                        return;
                    }
                    _appScope.$on(eventType, _handler);
                });
            }

            function _swipeBroadcast() {
                angular.forEach(_onReadyBroadcastList, function(info, key) {
                    _this.broadcast(info.dispatcher, info.eventType, info.data);
                });
                _onReadyBroadcastList.splice(0, _onReadyBroadcastList.length);
                _onReadyBroadcastList = undefined;
            }

            this.init = function() {
                console.warn("EventService 初始化再无需调用 init 函数了！");
            }

            this.broadcast = function(dispatcher, eventType, data) {
                if (_hasReady()) {
                    dispatcher = !!dispatcher ? dispatcher : NO_DISPATCHER;
                    console.log('broadcast event, dispatcher=' + dispatcher + ', eventType=' + eventType)
                    $rootScope.$broadcast(eventType, { userData: data, dispatcher: dispatcher });
                } else {
                    _onReadyBroadcastList.push({ dispatcher: dispatcher, eventType: eventType, data: data });
                }
            }

            this.register = function(dispatcher, eventType, callback, supressWarn) {
                if (!_eventMap.hasOwnProperty(eventType)) {
                    _eventMap[eventType] = {};
                    if (_hasReady()) {
                        //这部分在初始化之前就注册的事件会在_registerAgain中再次注册
                        _appScope.$on(eventType, _handler);
                    } else {
                        //使用奇怪的ready145812属性是为了避免冲突
                        _eventMap[eventType].ready145812 = false;
                    }
                }

                if (this.hasEvent(dispatcher, eventType, callback)) {
                    supressWarn = angular.isDefined(supressWarn) ? true : false;
                    if (!supressWarn) {
                        console.warn("event listener has already exist! eventType=" + eventType + ", dispatcher=" + dispatcher);
                    }
                    return;
                }

                var dispMap = _eventMap[eventType];
                dispatcher = !!dispatcher ? dispatcher : NO_DISPATCHER;
                if (!dispMap.hasOwnProperty(dispatcher)) {
                    dispMap[dispatcher] = [];
                }
                var cbs = dispMap[dispatcher];
                cbs.push(callback);
            }

            function _handler(event, data) {
                var dispMap = _eventMap[event.name];

                _handleDispatcher(data.dispatcher);
                if (data.dispatcher != NO_DISPATCHER) {
                    _handleDispatcher(NO_DISPATCHER);
                }

                function _handleDispatcher(dispatcher) {
                    if (dispatcher != NO_DISPATCHER) {
                        event.dispatcher = dispatcher;
                    }
                    _invokeCallback(dispMap, dispatcher, event, data.userData);
                }
            }

            function _invokeCallback(dispMap, dispatcher, event, data) {
                var cbs = dispMap[dispatcher];
                if (!cbs) {
                    return;
                }
                angular.forEach(cbs, function(callback, key) {
                    var fn = angular.isString(callback) ?
                        Utils.findFunction(_appScope, callback) : callback;
                    if (fn) {
                        if (angular.isString(callback)) {
                            cbs.splice(key, 1, fn);
                        }
                        //需要强制将fn调用延迟到下一个调用堆栈中
                        //否则如果fn的内部逻辑包含删除事件操作，会对此函数的执行造成影响
                        $timeout(function() { fn(event, data); }, 0);
                    } else {
                        console.error("callback function [ " + callback + " ] not found!");
                    }
                });
            }

            this.onEvents = function(eventInfos, callback, supressWarn) {
                var buffer = [];
                angular.forEach(eventInfos, function(evtInfo, key) {
                    buffer.push(evtInfo);
                    _this.register(evtInfo.dispatcher, evtInfo.type, _handler, supressWarn);

                    function _handler(event, data) {
                        var idx = buffer.indexOf(evtInfo);
                        if (idx == -1) {
                            console.warn('奇怪，居然找不到！');
                            return;
                        }
                        buffer.splice(idx, 1);
                        _this.remove(evtInfo.dispatcher, evtInfo.type, _handler);

                        if (buffer.length == 0) {
                            callback();
                        }
                    }
                });
            }

            this.remove = function(dispatcher, eventType, callback) {
                if (!this.hasEvent(dispatcher, eventType, callback)) {
                    return;
                }
                dispatcher = !!dispatcher ? dispatcher : NO_DISPATCHER;
                var dispMap = _eventMap[eventType];
                if (callback) {
                    var cbs = dispMap[dispatcher]
                    var idx = cbs.indexOf(callback);
                    cbs.splice(idx, 1);
                } else {
                    delete dispMap[dispatcher];
                }
            }

            this.hasEvent = function(dispatcher, eventType, callback) {
                if (!_eventMap.hasOwnProperty(eventType)) {
                    return false;
                }

                dispatcher = !!dispatcher ? dispatcher : NO_DISPATCHER;
                var dispMap = _eventMap[eventType];
                if (!dispMap.hasOwnProperty(dispatcher)) {
                    return false;
                }

                if (!callback) {
                    return true;
                }

                if (dispMap[dispatcher].indexOf(callback) == -1) {
                    return false;
                }

                return true;
            }

            this.getRegisteredEvents = function(dispatcher) {
                var list = [];
                angular.forEach(_eventMap, function(dispatchers, eventType) {
                    if (dispatchers.hasOwnProperty(dispatcher)) {
                        list.push({ eventType: eventType, cbs: dispatchers[dispatcher] });
                    }
                });
                return list;
            }

            this.raiseControlEvent = function(scope, eventType, data, defaultReturnValue) {
                if (scope.id) {
                    this.broadcast(scope.id, eventType, data);
                }
                var fn = scope[Utils.snake2camel(eventType)](scope);
                if (!fn) {
                    return defaultReturnValue;
                }
                try {
                    return fn({name: eventType, dispatcher: scope.id}, data);
                } catch (e) {
                    console.error('call "' + eventType + '" handler failed! msg=' + e.message);
                }
                return defaultReturnValue;
            }

            function _hasReady() {
                return !!_appScope;
            }

            //等待appScope被实例化完成之后再发出ready事件
            //@todu 难道AngularJS就没有更好的方式判定初始化完成了吗？！
            function _checkAppScope() {
                _appScope = $rootScope.$$childHead;
                if (_appScope) {
                    _registerAgain();
                    _swipeBroadcast();
                    Utils.swipeOnReadyCallbacks();

                    _this.broadcast('EventService', EventTypes.READY);
                } else {
                    $timeout(_checkAppScope, 10);
                }
            }
            _checkAppScope();

            // function _walkDomNode(dom) {
            //     //自动找出所有的dom节点上的“on.”开头的属性，并注册为事件
            //     try {
            //         var nodes = dom.childNodes;
            //     } catch (e) {
            //         return;
            //     }
            //     angular.forEach(nodes, function(subDom, key) {
            //         var attrs
            //         try {
            //             attrs = subDom.attributes;
            //         } catch (e) {
            //             return;
            //         }
            //         angular.forEach(attrs, function(attr, idx) {
            //             var key = attr.name;
            //             var value = attr.value;
            //             if (!value || !Utils.stringStartWith(key, 'on.')) {
            //                 return;
            //             }
            //             var keys = key.split(".");
            //             var type;
            //             var name;
            //             if (keys.length == 2) {
            //                 //不区分发出事件发出者的情况
            //                 type = Utils.camel2snake(keys[1]);
            //                 _this.register('', type, value);
            //             } else if (keys.length == 3) {
            //                 //区分发出事件发出者的情况
            //                 type = Utils.camel2snake(keys[2]);
            //                 name = Utils.camel2snake(keys[1]);
            //                 _this.register(name, type, value);
            //             } else {
            //                 console.log("invalid event config: " + key);
            //             }
            //             name = name || '<IGNORED>'
            //             console.log('REGISTER EVENT: eventType=' + type + ', handler=' + value + ', tarngetName=' + name);
            //         });
            //         _walkDomNode(subDom);
            //     });
            // }
        }
    ]);

    event.service('GroupEventService', ['EventService', function(EventService) {
        var eventGroups = {};
        this.config = function(groupConf) {
            if (!groupConf || !groupConf.hasOwnProperty('groupDispatcher') || !groupConf.hasOwnProperty('max') || groupConf.max <= 0) {
                console.error('无效的事件组配置。请使用类似这样的结构 ' +
                    '\n{\n\tgroupDispatcher: "my_grp_disp",  //必选' +
                    '\n\tpattern:         "_{{$index}}", //可选，默认值为 "_{{$index}}"' +
                    '\n\tmin: 0, //可选，默认值为 0' +
                    '\n\tmax: 10 //必选，且大于0\n}');
                return;
            }

            var conf = {};
            conf.groupDispatcher = groupConf.groupDispatcher;
            conf.pattern = groupConf.hasOwnProperty('pattern') ? groupConf.pattern : '_{{$index}}';
            conf.min = groupConf.hasOwnProperty('min') ? groupConf.max : 0;
            conf.max = groupConf.max;
            eventGroups[groupConf.groupDispatcher] = conf;
        }

        this.register = function(groupDispatcher, eventType, callback, index) {
            _do('register', groupDispatcher, eventType, callback, index);
        }

        this.broadcast = function(groupDispatcher, eventType, data, index) {
            _do('broadcast', groupDispatcher, eventType, data, index);
        }

        function _do(action, dispatcher, eventType, value, index) {
            if (!eventGroups[dispatcher]) {
                return _error();
            }
            index = index || [];
            if (angular.isObject(index)) {
                if (index.hasOwnProperty('except')) {
                    _doExcept(action, dispatcher, eventType, value, index.except);
                } else if (index.hasOwnProperty('with')) {
                    _doWith(action, dispatcher, eventType, value, index.with);
                }
            } else {
                _doExcept(action, dispatcher, eventType, value, index);
            }
        }

        function _doExcept(action, dispatcher, eventType, value, exceptIndex) {
            var conf = eventGroups[dispatcher];
            exceptIndex = exceptIndex || [];
            exceptIndex = angular.isArray(exceptIndex) ? exceptIndex : [exceptIndex];
            for (var i = conf.min; i < conf.max; i++) {
                if (exceptIndex.indexOf(i) != -1) {
                    continue;
                }
                var disp = dispatcher + conf.pattern.replace('{{$index}}', i);
                console.log(action + ' groupDispatcher=' + disp + ', eventType=' + eventType);
                EventService[action](disp, eventType, value);
            }
        }

        function _doWith(action, dispatcher, eventType, value, withIndex) {
            var conf = eventGroups[dispatcher];
            withIndex = withIndex || [];
            withIndex = angular.isArray(withIndex) ? withIndex : [withIndex];
            angular.forEach(withIndex, function(i, key) {
                var disp = dispatcher + conf.pattern.replace('{{$index}}', i);
                console.log(action + ' groupDispatcher=' + disp + ', eventType=' + eventType);
                EventService[action](disp, eventType, value);
            });
        }

        function _error() {
            return console.error("未配置的 groupDispatcher，请先执行 GroupEventService.config 进行配置");
        }
    }]);
});
