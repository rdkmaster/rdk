define(['angular', 'rd.services.EventService'], function() {
    var dsModule = angular.module('rd.services.DataSourceService', ['rd.services.EventService']);
    dsModule.service('DataSourceService', ['$http', '$q','EventService', 'Utils', 'EventTypes', 'DSConst',
        function($http,$q, EventService, Utils, EventTypes, DSConst) {

            var dataSourcePool = {};
            var _dsService = this;

            this.commonConditionProcessor = undefined;
            this.commonDataProcessor = undefined;
            this.commonAjaxConfigProcessor = undefined;
            this.defaultResultHandler = undefined;

            this.create = function() {
                var dsInfo;
                //兼容老接口
                switch (arguments.length) {
                    case 1:
                        dsInfo = arguments[0];
                        break;
                    case 2:
                        //create(id, data) 或者 create(id, url) 的形式
                        dsInfo = { ds: arguments[0] };
                        angular.isObject(arguments[1]) ? Utils.shallowCopy(arguments[1], dsInfo) : dsInfo.url = arguments[1];
                        break;
                    case 3:
                        //create(id, url, resultHandler) 的形式
                        dsInfo = { ds: arguments[0], url: arguments[1], resultHandler: arguments[2] };
                        break;
                    default:
                        console.error("未知的创建数据源接口");
                        return;
                }
                return _create(dsInfo);
            }

            // dsInfo = {
            //     ds: 'dsId', //首选
            //     id: 'dsId', //备选
            //     url: '/demo/my_url',   //首选
            //     dsUrl: '/demo/my_url', //备选
            //     conditionProcessor: function() {},   //首选
            //     dsConditionProcessor: function() {}, //备选
            //     dataProcessor: function() {},   //首选
            //     dsDataProcessor: function() {}, //备选
            //     resultHandler: function() {},   //首选
            //     dsResultHandler: function() {}, //备选
            //     dsInitData: {},             //首选
            //     initData: {},               //备选
            //     queryMethod: 'get',         //首选
            //     dsQueryMethod: 'get',       //备选
            //     addMethod: 'put',           //首选
            //     dsAddMethod: 'put',         //备选
            //     updateMethod: 'post',       //首选
            //     dsUpdateMethod: 'post',     //备选
            //     deleteMethod: 'delete',     //首选
            //     dsDeleteMethod: 'delete',   //备选
            //     queryIf: '',    //首选
            //     dsQueryIf: '',  //备选
            //     addIf: '',      //首选
            //     dsAddIf: '',    //备选
            //     updateIf: '',   //首选
            //     dsUpdateIf: '', //备选
            //     deleteIf: '',   //首选
            //     dsDeleteIf: ''  //备选
            //     loopIf: '',     //首选
            //     dsLoopIf: ''    //备选
            // }
            function _create(dsInfo) {
                try {
                    var ds = new DataSource(dsInfo);
					console.log('DataSource created, id=' + ds.id + ', url=' + ds.url);
                    dataSourcePool[ds.id] = ds;
                } catch (e) {
                    console.error('创建数据源失败：' + e);
                    return;
                }

                _registerEvent(dsInfo.queryIf || dsInfo.dsQueryIf, ds.query);
                _registerEvent(dsInfo.addIf || dsInfo.dsAddIf, ds.add);
                _registerEvent(dsInfo.updateIf || dsInfo.dsUpdateIf, ds.update);
                _registerEvent(dsInfo.deleteIf || dsInfo.dsDeleteIf, ds.delete);

                return ds;

                function _registerEvent(eventDefine, action) {
                    if (!eventDefine) {
                        return;
                    }
                    var events = eventDefine.split(/&&|and/i);
                    var evtInfos = [];
                    angular.forEach(events, function(event, key) {
                        var arr = event.split('.');
                        if (arr.length < 2) {
                            if (arr[0] == 'ready') {
                                arr[0] = 'EventService';
                                arr[1] = 'ready';
                            } else {
                                console.error('无效的数据源监听事件定义，请使用这个方式定义 dispatcher.event_type');
                                return;
                            }
                        }
                        evtInfos.push({ dispatcher: arr[0].trim(), type: arr[1].trim() });
                    });

                    EventService.onEvents(evtInfos, action);
                }
            }

            this.contains = function(ds) {
                var id = ds instanceof DataSource ? ds.id : ds;
                return !!(dataSourcePool[id]) ? true : false;
            }

            this.get = function(ds) {
                return ds instanceof DataSource ? ds : dataSourcePool[ds];
            }

            function DataSource(dsInfo) {
                if (!dsInfo) {
                    throw '无效的数据源数据';
                }
                var _this = this;
                _this.id = dsInfo.ds || dsInfo.id;
                if (!_this.id) {
                    throw '无效的数据源id';
                }
                if (_dsService.contains(_this.id)) {
                    throw '数据源[id=' + _this.id + ']已经存在！';
                }
                _this.url = dsInfo.url || dsInfo.dsUrl;
                if (!_this.url) {
                    throw '无效的数据源url';
                }
                if (!angular.isString(_this.url)) {
                    throw '暂不支持复合数据源，后续版本将支持';
                }

                _this.busy = false;
                _this.data = undefined;
                _this.scope = dsInfo.scope;

                var loopHandler = -1;
                var sequence = 0;

                _findFunction('ajaxConfigProcessor', dsInfo.ajaxConfigProcessor || dsInfo.dsAjaxConfigProcessor);
                _findFunction('conditionProcessor', dsInfo.conditionProcessor || dsInfo.dsConditionProcessor);
                _findFunction('dataProcessor', dsInfo.dataProcessor || dsInfo.dsDataProcessor);
                _findFunction('resultHandler', dsInfo.resultHandler || dsInfo.dsResultHandler);

                _this.queryMethod = dsInfo.queryMethod || dsInfo.dsQueryMethod || DSConst.HTTP_GET;
                _this.addMethod = dsInfo.addMethod || dsInfo.dsAddMethod || DSConst.HTTP_PUT;
                _this.updateMethod = dsInfo.updateMethod || dsInfo.dsUpdateMethod || DSConst.HTTP_POST;
                _this.deleteMethod = dsInfo.deleteMethod || dsInfo.dsDeleteMethod || DSConst.HTTP_DELETE;

                EventService.register(_this.id, EventTypes.START_QUERY, function(event, condition) {
                    _this.query(condition);
                });
                EventService.register(_this.id, EventTypes.START_ADD, function(event, condition) {
                    _this.add(condition);
                });
                EventService.register(_this.id, EventTypes.START_UPDATE, function(event, condition) {
                    _this.update(condition);
                });
                EventService.register(_this.id, EventTypes.START_DELETE, function(event, condition) {
                    _this.delete(condition);
                });
                EventService.register(_this.id, EventTypes.START_LOOP, function(event, job) {
                    _this.loop(job);
                });
                EventService.register(_this.id, EventTypes.STOP_LOOP, function() {
                    _this.stopLoop();
                });

                _this.query = function(condition,option) {
                    _ajax(condition, _this.queryMethod, EventTypes.QUERY_RESULT,option);
                }

                _this.update = function(condition) {
                    _ajax(condition, _this.updateMethod, EventTypes.UPDATE_RESULT);
                }

                _this.delete = function(condition) {
                    _ajax(condition, _this.deleteMethod, EventTypes.DELETE_RESULT);
                }

                _this.add = function(condition) {
                    _ajax(condition, _this.addMethod, EventTypes.ADD_RESULT);
                }

                _this.loop = function(job) {
                    if (loopHandler != -1) {
                        console.error("已经有循环任务在执行了，在开始新的任务之前请调用stopLoop()关闭当前任务！");
                        return;
                    }
                    if (!job.hasOwnProperty('action') || !job.hasOwnProperty('interval')) {
                        console.error("至少需要提供action和interval属性，分别用于标示循环任务的 query/update/delete/add，以及循环的间隔毫秒数");
                        return;
                    }
                    loopHandler = setInterval(function() {
                        _this[job.action](job.condition);
                    }, job.interval);
                    _this[job.action](job.condition);
                }

                _this.stopLoop = function() {
                    if (loopHandler > -1) {
                        clearInterval(loopHandler);
                        loopHandler = -1;
                    }
                }

                _this.abort = function() {
                    
                }

                function _findFunction(type, fn) {
                    if (!fn) {
                        return;
                    }
                    if (angular.isString(fn)) {
                        Utils.onReady(function() {
                            if (_this.scope) {
                                _this[type] = Utils.findFunction(_this.scope, fn);
                            }
                        });
                    } else {
                        _this[type] = fn;
                    }
                }

                function _ajax(condition, method, detailEvent,option) {
                    //由于数据源的各种处理器兼容了给scope上的函数名方式
                    //这导致必须这ready之后，才能找到这些函数，
                    //因此这里必须把访问网络延迟到ready之后从去执行
                    Utils.onReady(_doAjax);

                    function _doAjax() {
                        if (_this.busy) {
                            console.error('DataSource [id=' + _this.id + '] is busy!!!');
                            return;
                        }
                        sequence++;
                        _this.busy = true;
                        console.log('DataSource [id=' + _this.id + '] is visiting network!');

                        if( !(option && option.directQuery)){
                            condition = _callConditionProcessor(condition);
                        }

                        if( !option || (option && option.supressEvent!==false)){
                            EventService.broadcast(_this.id, EventTypes.BEFORE_QUERY, {"condition":condition,"ds":_this});
                        }


                         var destCondition = Utils.shallowCopy(condition);

                        // method  {String} 请求方式e.g. "GET"."POST"
                        // url {String} 请求的URL地址
                        // params {key,value} 请求参数，将在URL上被拼接成？key=value
                        // data {key,value} 数据，将被放入请求内发送至服务器
                        // cache {boolean} 若为true，在http GET请求时采用默认的$http cache，
                        //      否则使用$cacheFactory的实例
                        // timeout {number} 设置超时时间

                        var config = {
                            method: method,
                            url: _parseUrl(destCondition),
                            headers: { 'Content-Type': 'application/json' }
                        }
                        config[method == DSConst.HTTP_GET ? 'params' : 'data'] = destCondition;

                        config = _callAjaxConfigProcessor(config);

                        $http(config).success(function(data) {
                            _this.busy = false;
                            console.log("DataSource success, id=" + _this.id);
                            _processResult(data, detailEvent);
                        }).error(function(data, status, headers, config) {
                            _this.busy = false;
                            console.error("DataSource error, id=" + _this.id + ", url=" + _this.url + ", data=" + data + ', status=' + status);
                            _processResult({ result: false, data: data, status: status, headers: headers, config: config }, detailEvent);
                        });
                    }
                }

                function _processResult(data, detailEvent) {
                    _this.rawData = data;
                    var data = _callDataProcessor(data);
                    
                    if (Utils.likePromise(data)) {
                        data.then(_validateData);
                    } else {
                        _validateData(data);
                    }

                    function _validateData(data) {
                        _this.data = data;
                        if (_this.scope) {
                            _this.scope[_this.id] = data;
                        }
                        if (_this.resultHandler) {
                            _this.resultHandler(data, _this);
                        }
                        EventService.broadcast(_this.id, EventTypes.RESULT, data);
                        EventService.broadcast(_this.id, detailEvent, data);
                    }
                }

                function _callAjaxConfigProcessor(config) {
                    try {
						if (angular.isDefined(_dsService.commonAjaxConfigProcessor)) {
                            config = _dsService.commonAjaxConfigProcessor(config, _this);
                        }
                        if (angular.isDefined(_this.ajaxConfigProcessor)) {
                            config = _this.ajaxConfigProcessor(config, _this);
                        }
                    } catch (e) {
                        console.error('process ajax config error: ' + e.message + '\n' + e.stack);
                    }
                    return config;
                }

                function _callConditionProcessor(condition) {
                    try {
						if (angular.isDefined(_dsService.commonConditionProcessor)) {
                            condition = _dsService.commonConditionProcessor(condition, _this);
                        }
                        if (angular.isDefined(_this.conditionProcessor)) {
                            condition = _this.conditionProcessor(condition, _this);
                        }
                    } catch (e) {
                        console.error('process condition error: ' + e.message + '\n' + e.stack);
                    }
                    //浅拷贝一个条件
                    return Utils.shallowCopy(condition);
                }

                function _callDataProcessor(data) {
                    try {
						if (angular.isDefined(_dsService.commonDataProcessor)) {
                            data = _dsService.commonDataProcessor(data, _this);
                        }
                        if (angular.isDefined(_this.dataProcessor)) {
                            data = _this.dataProcessor(data, _this);
                        }
                    } catch (e) {
                        console.error('process data error: ' + e.message + '\n' + e.stack);
                    }
                    return data;
                }

                function _parseUrl(condition) {
                    return _this.url.replace(/([$%])(\w+?)([$%])/g, _replacor);

                    function _replacor(captured, left, property, right) {
                        if (!condition || !condition.hasOwnProperty(property) || left != right) {
                            return captured;
                        }
                        var value = condition[property];
                        if (left == '$') {
                            delete condition[property];
                        }
                        return value;
                    }
                }
            }

        }
    ]);

    dsModule.constant("DSConst", {
        HTTP_GET: 'get',
        HTTP_POST: 'post',
        HTTP_PUT: 'put',
        HTTP_DELETE: 'delete',
    });
})
