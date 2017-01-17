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
        RENAME:"rename",
        INITIALIZED: 'initialized',

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
                var hasReady = _hasReady();
                if (dispatcher == 'EventService' && eventType == EventTypes.READY && hasReady) {
                    _invokeLater(callback, {name: EventTypes.READY, dispatcher: 'EventService'});
                    return;
                }

                if (!_eventMap.hasOwnProperty(eventType)) {
                    _eventMap[eventType] = {};
                    if (hasReady) {
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
                        _invokeLater(fn, event, data);
                    } else {
                        console.error("callback function [ " + callback + " ] not found!");
                    }
                });
            }

            function _invokeLater(callback, event, data) {
                //需要强制将callback调用延迟到下一个调用堆栈中
                //否则如果callback的内部逻辑包含删除事件操作，会对此函数的执行造成影响
                $timeout(function() {
                    try {
                        callback(event, data);
                    } catch (e) {
                        console.error('invoke event handler error: %s', e.stack);
                    }
                }, 0);
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
                    if(typeof(defaultReturnValue) == 'function'){
                        defaultReturnValue();
                        return;
                    }
                    return defaultReturnValue;
                }
                try {
                    return fn({name: eventType, dispatcher: scope.id}, data);
                } catch (e) {
                    console.error('invoke handler of event "%s" error: %s', eventType, e.stack);
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
        }
    ]);
});
