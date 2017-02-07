/**
 * Created by 10045812 on 16-3-16.
 */

//(function () {
//    var _this = this;
//
//    var funcs = _.functions(_);
//    _.each(funcs, function (func) {
//        if (func === 'map') {
//            //map已被占用
//            return;
//        }
//        if (func !== 'each' && func !== 'forEach') {
//            //把underscore的函数注册到this下
//            _this[func] = _[func];
//        }
//    });
//})();

var java = {
    byte: Java.type('byte'),
    bytes: Java.type('byte[]'),

    File: Java.type('java.io.File'),

    String: Java.type('java.lang.String'),
    Thread: Java.type('java.lang.Thread'),

    BigDecimal: Java.type('java.math.BigDecimal'),
    StringArray: Java.type('java.lang.String[]'),

    ResultSet: Java.type('java.sql.ResultSet'),

    ArrayList: Java.type('java.util.ArrayList'),

    StringMap: Java.type('com.google.gson.internal.StringMap'),

    ScalaMap: Java.type('scala.collection.immutable.Map'),

    FileHelper: Java.type('com.zte.vmax.rdk.jsr.FileHelper'),
    RegFileFilter: Java.type('com.zte.vmax.rdk.util.RegFileFilter'),
    Config: Java.type('com.zte.vmax.rdk.config.Config')
};

var mq = {
    p2p: function (subject, message) {
        return rdk_runtime.p2p(subject, message);
    },
    //默认120秒
    rpc: function (subject, replySubject, message, timeout) {
        if (!_.isDefined(timeout)) {
            timeout = 120
        }
        return rdk_runtime.rpc(subject, replySubject, message, timeout);
    },
    broadcast: function (subject, message) {
        return rdk_runtime.broadcast(subject, message);
    },
    subscribe: function (topic, callback_function_name, jsfile) {
        return rdk_runtime.subscribe(topic, callback_function_name, jsfile);
    },
    unsubscribe: function (topic, callback_function_name, jsfile) {
        return rdk_runtime.unSubscribe(topic, callback_function_name, jsfile);
    }
};

var websock = {
    broadcast: function (subject, message) {
        return rdk_runtime.webSocketBroadcast(subject, message);
    }
}
var Log = {
    debug: function () {
        var message = _arg2string(arguments);
        rdk_runtime.jsLogger().debug(message);
    },
    info: function () {
        var message = _arg2string(arguments);
        rdk_runtime.jsLogger().info(message);
    },
    warn: function () {
        var message = _arg2string(arguments);
        rdk_runtime.jsLogger().warn(message);
    },
    error: function () {
        var message = _arg2string(arguments);
        rdk_runtime.jsLogger().error(message);
    },
    fatal: function () {
        var message = _arg2string(arguments);
        rdk_runtime.jsLogger().error(message);
    },
    crit: function () {
        var message = _arg2string(arguments);
        rdk_runtime.jsLogger().error(message);
    },
    operateLog: function (userOpInfo) {
        var reqCtxHeaderInfo = Request.getContextHeader()
        if (!reqCtxHeaderInfo) {
            Log.error("NoneContext call!");
            return false;
        }
        var userOpFunc = null;
        try {
            userOpFunc = load(java.Config.get('extension.operateLog'));
        } catch (e) {
            Log.error("load operateLog script error:" + e);
            return false;
        }
        try {
            userOpFunc(userOpInfo, reqCtxHeaderInfo);
        } catch (e) {
            Log.error(e);
            return false;
        }
        return true;
    }
}

function getHostName() {
    Log.warn("function deprecated,please use Host.getName()");
    return rdk_runtime.getHostName()
}

var Host = {
    getIp: function () {
        return JSON.parse(rdk_runtime.getHostIps())
    },
    getName: function () {
        return rdk_runtime.getHostName()
    }
}

/**
 *
 * @param cmd  shell命令或者脚本
 * @param option 0，返回执行码 1，返回脚本执行字符串,默认为0
 *
 */
var Shell = {
    execute: function (cmd, option) {
        if (!_.isDefined(cmd)) {
            Log.error("param cmd required!");
            return undefined;
        } else if (!_.isDefined(option)) {
            Log.warn("param option miss,set 0!");
            arguments["1"] = 0;
        }
        return rdk_runtime.executeShell(cmd, option.toString(), arguments);
    }
}

var Request = {
    getContextHeader: function() {
        var reqCtxHeaderInfo = rdk_runtime.getReqCtxHeaderInfo()
        if (!reqCtxHeaderInfo) {
            Log.warn("NoneContext call!")
            return "";
        }
        return _transferHeader(JSON.parse(reqCtxHeaderInfo));
    },
    completeWithError: function(status, detail) {
        status = status === undefined || status === null ? '500' : status.toString();
        detail = detail === undefined || detail === null ? "no detail" : detail.toString();
        Log.error("completeWithError, status=" + status + ", detail=" + detail);
        throw {status: status, detail: detail};
    }

}
var getRequestContextHeader = Request.getContextHeader;

//reqCtxHeaderInfo为数组，转换为对象方便使用
//[{"key": "Cookie","value": "JSESSIONID=11ruoxiraug56gcl0ilshlpyk"}]  => {"Cookie":"JSESSIONID=11ruoxiraug56gcl0ilshlpyk"}
function _transferHeader(headerArray) {
    var headerObject = {};
    for (var elem in headerArray) {
        headerObject[headerArray[elem].key] = headerArray[elem].value;
    }
    return headerObject
}
//兼容以前日志代码
var log = Log.debug;
var debug = Log.debug;
var info = Log.info;
var warn = Log.warn;
var error = Log.error;
var fatal = Log.fatal;
var crit = Log.crit;

//缓存
var Cache = {
    put: function (k, v) {
        return rdk_runtime.cachePut(k, v)
    },
    get: function (k) {
        return rdk_runtime.cacheGet(k)
    },
    del: function (k) {
        return rdk_runtime.cacheDel(k)
    },
    clear: function () {
        return rdk_runtime.clearAppCache(rdk_runtime.application())
    },
    global_put: function (k, v) {
        Log.warn("function deprecated,please use Cache.global.put()");
        return rdk_runtime.globalCachePut(k, v)
    },
    global_get: function (k) {
        Log.warn("function deprecated,please use Cache.global.get()");
        return rdk_runtime.globalCacheGet(k)
    },
    global_del: function (k) {
        Log.warn("function deprecated,please use Cache.global.del()");
        return rdk_runtime.globalCacheDel(k)
    },
    global: {
        put: function (k, v) {
            return rdk_runtime.globalCachePut(k, v)
        },
        get: function (k) {
            return rdk_runtime.globalCacheGet(k)
        },
        del: function (k) {
            return rdk_runtime.globalCacheDel(k)
        }
    },
    aging: {
        put: function (k, v, ttl, callback) {
            if (!_.isDefined(ttl)) {
                ttl = 24 * 60 * 60;
            }
            return rdk_runtime.agingCachePut(k, v, ttl, callback)
        },
        get: function (k) {
            return rdk_runtime.agingCacheGet(k)
        },
        del: function (k) {
            return rdk_runtime.agingCacheDel(k)
        }
    }
}

//--json转换
var JSON1 = {
    stringify: function (obj) {
        rdk_runtime.objectToJson(obj);
    },
    parse: function (json_string) {

    }
}


//动态类加载
var JVM = {
    load_class: function loadClass(jar, className) {
        Log.warn("function deprecated,please use JVM.loadClass()");
        return JVM.loadClass(jar, className);
    },
    loadClass: function loadClass(jar, className) {
        var loadclazz = rdk_runtime.jarHelper().loadClass(jar, className);
        if (loadclazz == null) {
            return undefined;
        }
        return loadclazz;
    }
}

//国际化
var I18n = {
    format: function (key) {
        if (arguments.length == 0) {
            return undefined;
        }

        if (_.isArray(key)) {
            return groupI18n(key);
        }

        if (!_.isString(key)) {
            return key;
        }

        try {
            var i18n = require('$svr/i18n.js');
        } catch (e) {
            return key;
        }
        try {
            var val = i18n[rdk_runtime.locale()][key];
        } catch (e) {
            warn('get locale data error, locale =', rdk_runtime.locale());
            return key;
        }

        val = _.isDefined(val) ? val : key;
        for (var i = 1; i < arguments.length; i++) {
            val = val.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i]);
        }
        return val;
    }
}
//兼容以前代码
var i18n = I18n.format;

///////////////////////////////////////////////////////////////////////
function _fixContent(content, excludeIndexes) {
    var csv = {};
    if (isMatrix(content)) {
        //给的是一个matrix
        csv.data = content.data;
        //考虑到复制content.data可能会有性能消耗，这里直接修改content.data
        //写文件完事以后再删除第一行
        csv.data.unshift(content.header);
        csv.excludeIndexes = [];
        each(excludeIndexes, function (value) {
            csv.excludeIndexes.push(_.isString(value) ? content.field.indexOf(value) : value);
        });
    } else {
        //给的可能是一个二维数组
        csv.data = content;
        csv.excludeIndexes = excludeIndexes;
    }
    return csv;
}

function _fixEXCELContent(ctent, exIndexes) {
    var excel = {};
    excel.data = {};
    excel.excludeIndexes = {};
    for (var sheet in ctent) {
        if (_.isDataTable(ctent[sheet])) {
            ctent[sheet].data.unshift(ctent[sheet].header);
            excel.data[sheet] = ctent[sheet].data;
            excel.excludeIndexes[sheet] = [];
            if (_.isDefined(exIndexes)) {
                each(exIndexes[sheet], function (value) {
                    excel.excludeIndexes[sheet].push(_.isString(value) ? ctent[sheet].field.indexOf(value) : value);
                });
            }

        } else {
            excel.data[sheet] = ctent[sheet];
            if (_.isDefined(exIndexes)) {
                excel.excludeIndexes[sheet] = exIndexes[sheet];
            }
        }
    }
    return excel;
}

var File = {
    loadProperty: function (file) {
        if (!file) {
            log("invalid file path:", file);
            return false;
        }
        file = file.toString();
        log("reading property file:", file);
        return rdk_runtime.fileHelper().loadProperty(file);
    },
    readString: function (path) {
        if (!path) {
            log("invalid file path:", path);
            return undefined;
        }
        path = path.toString();
        log("reading file as string:", path);
        return rdk_runtime.fileHelper().readString(path);
    },
    readXml: function (path) {
        if (!path) {
            log("invalid file path:", path);
            return undefined;
        }
        path = path.toString();
        log("reading xml file:", path);
        var result = rdk_runtime.fileHelper().readXml(path);
        if (!result) {
            return undefined;
        }
        return JSON.parse(result);
    },
    save: function (file, content, append, encoding) {
        if (!file) {
            log("invalid file path:", file);
            return false;
        }
        if ((!_.isDefined(content)) || (null == content)) {
            log("invalid file content:", content);
            return false;
        }
        if (null == append) {
            append = undefined;
        }
        if (null == encoding) {
            encoding = undefined;
        }
        file = file.toString();
        log("saving file to:", file);
        return rdk_runtime.fileHelper().save(file, content.toString(), !!append, encoding);
    },
    saveAsCSV: function (file, content, excludeIndexes, option) {
        file = file.toString();
        log("saving to csv:", file);

        if (null == excludeIndexes) {
            excludeIndexes = undefined;
        }
        if (null == option) {
            option = undefined;
        }
        var csv = _fixContent(content, excludeIndexes);
        var b = rdk_runtime.fileHelper().saveAsCSV(file, csv.data, csv.excludeIndexes, option);
        //_fixContent中修改了content.data，这里还原
        csv.data.shift();
        return b;
    },
    saveAsEXCEL: function (file, content, excludeIndexes, option) {
        if (!_.isDefined(file)) {
            Log.error("please input extract file!");
            return;
        }
        file = file.toString();
        log("saving to Excel:", file);
        if (!_.isDefined(content)) {
            Log.error("please input extract content!");
            return;
        }
        if (null == excludeIndexes) {
            excludeIndexes = undefined;
        }
        if (null == option) {
            option = undefined;
        }
        var excel = _fixEXCELContent(content, excludeIndexes);

        var b = rdk_runtime.fileHelper().saveAsEXCEL(file, excel.data, excel.excludeIndexes, option);
        //_fixExcelContent中修改了content，这里还原
        for (var sheet in content) {
            if (_.isDataTable(content[sheet])) {
                content[sheet].data.shift(content[sheet].header);
            }
        }
        return b;
    },
    delete: function (path) {
        var jFile = new java.File(path);
        if (jFile.isDirectory()) {
            var files = file.list(path, true);
            _.each(files.reverse(), function (item) {
                log('deleting sub file/dir:', item);
                new java.File(item).delete();
            });
        }
        var result = jFile.delete();
        log('remove file or dir:', path, 'result:', result);
        return result;
    },
    list: function (path, recursive, pattern) {
        path = java.FileHelper.fixPath(path, rdk_runtime.application());
        log('listing dir: ' + path + ', recursive: ' + (!!recursive));

        var files = [];
        var ptn = '';
        if (!!pattern) {
            try {
                ptn = eval(pattern);
            } catch (e) {
                Log.warn('invalid filter pattern:', pattern, ', try this "/\\\\w+\\\\.html/i"');
                ptn = '';
            }
        }
        _listFiles(files, new java.File(path), ptn, !!recursive);

        return files;
    },
    copy: function (cpFrom, cpTo, recursive, force) {
        if (!_.isString(cpFrom) || !_.isString(cpTo)) {
            Log.error("copy file, code 1, detail: bad arguments");
            return 1;
        }
        return rdk_runtime.fileHelper().copy(cpFrom, cpTo, !!recursive, !!force);
    },
    get web() {
        return function () {
            return java.FileHelper.fixPath('$web', rdk_runtime.application());
        }
    },
    get base() {
        return function () {
            return java.FileHelper.fixPath('$base', rdk_runtime.application());
        }
    },
    get svr() {
        return function () {
            return java.FileHelper.fixPath('$svr', rdk_runtime.application());
        }
    }
};
//向下兼容
var file = File;

function _listFiles(files, path, pattern, recursive) {
    if (path.isFile()) {
        files.push(path.toString());
        return;
    }
    var javaFileArr = path.listFiles();
    if (!javaFileArr) {
        return;
    }
    for (var i = 0; i < javaFileArr.length; i++) {
        var file = javaFileArr[i];
        var fileStr = file.toString();
        if (fileStr.match(pattern)) {
            files.push(fileStr);
        }
        if (recursive && file.isDirectory()) {
            _listFiles(files, file, pattern, recursive);
        }
    }
}

///////////////////////////////////////////////////////////////////////

var Rest = {
    get: function (url, option) {
        if (null == option) {
            option = undefined;
        }
        return rdk_runtime.restHelper().get(encodeURI(url), option);
    },
    post: function (url, param, option) {
        if (_.isUndefined(param)) {
            param = "";
        } else if (_.isObject(param)) {
            param = JSON.stringify(param);
        }
        return rdk_runtime.restHelper().post(url, param, option);
    },
    delete: function (url, param, option) {
        if (_.isUndefined(param)) {
            param = "";
        } else if (_.isObject(param)) {
            param = JSON.stringify(param);
        }
        return rdk_runtime.restHelper().delete(url, param, option);
    },
    put: function (url, param, option) {
        if (_.isUndefined(param)) {
            param = "";
        } else if (_.isObject(param)) {
            param = JSON.stringify(param);
        }
        return rdk_runtime.restHelper().put(url, param, option);
    }
}
//向下兼容
var rest = Rest;
///////////////////////////////////////////////////////////////////////

_.isResultSet = function (value) {
    return value instanceof java.ResultSet;
}

_.isDefined = function (value) {
    return !_.isUndefined(value);
}

_.isDataTable = function (data) {
    if (!data) {
        return false;
    }

    var hasHeader = data.hasOwnProperty('header');
    var hasField = data.hasOwnProperty('field');
    var hasData = data.hasOwnProperty('data');
    return hasHeader && _.isArray(data.header) &&
        hasField && _.isArray(data.field) &&
        hasData && _.isArray(data.data);
}
///////////////////////////////////////////////////////////////////////

//扩展了underscore的each函数
function each(obj, iteratee, context, extra) {
    if (_.isResultSet(obj)) {
        var idx = 0;
        while (obj.next()) {
            try {
                iteratee.call(context === undefined ? this : context, obj, idx++);
            } catch (e) {
                error("call iterator error: " + e)
            }
        }
        if (!extra) {
            clear(obj);
        }
    } else {
        _.each(obj, iteratee, context);
    }
}

function forEach(obj, iteratee, context, extra) {
    return each(obj, iteratee, context, extra);
}

function require(script) {
    script = java.FileHelper.fixPath(script, rdk_runtime.application());
    //  log("loading script in js: " + script);
    return load(script);
}

function mapper(resultSet, key, value, keepResultSet) {
    if (_.isString(resultSet)) {
        return mapper(sql(resultSet), key, value);
    }

    var map = {};
    if (!key || !value) {
        error("need key and value!!");
        return map;
    }

    if (!resultSet) {
        return map;
    }
    if (resultSet.isClosed()) {
        error("the resultset is closed!");
        return map;
    }

    resultSet.beforeFirst();
    while (resultSet.next()) {
        var strKey = _bytes2string(resultSet.getBytes(key));
        var strValue = _bytes2string(resultSet.getBytes(value));
        map[strKey] = strValue;
    }

    if (keepResultSet) {
        resultSet.beforeFirst();
    } else {
        clear(resultSet);
    }

    return map;
}

var Mapper = {
    from_object: function (jsObject, defaultValue) {
        Log.warn("function deprecated,please use Mapper.fromObject()");
        return Mapper.fromObject(jsObject, defaultValue);
    },
    fromObject: function (jsObject, defaultValue) {
        return function (key) {
            return jsObject && jsObject.hasOwnProperty(key) ? jsObject[key] :
                defaultValue === undefined ? key : defaultValue;
        }
    },

    //from sql or dataTable 可合并
    from_sql: function (sql, keyName, valueName, defaultValue) {
        Log.warn("function deprecated,please use Mapper.fromSql()");
        return Mapper.fromSql(sql, keyName, valueName, defaultValue);
    },
    fromSql: function (sql, keyName, valueName, defaultValue) {
        return Mapper.fromObject(Mapper.mkMap(sql, keyName, valueName), defaultValue);
    },
    from_datatable: function (dataTable, keyName, valueName, defaultValue) {
        Log.warn("function deprecated,please use Mapper.fromDataTable()");
        return Mapper.fromDataTable(dataTable, keyName, valueName, defaultValue);
    },
    fromDataTable: function (dataTable, keyName, valueName, defaultValue) {
        return Mapper.fromObject(Mapper.mkMap(dataTable, keyName, valueName), defaultValue);
    },
    mkMap: function (param, keyName, valueName) {
        var map = {};
        if (_.isString(param)) {
            param = Data.fetch(param, 20000);
        }

        var data = param.data;
        var field = param.field;
        var keyIndex = field.indexOf(keyName);
        var valueIndex = field.indexOf(valueName);
        for (var row = 0; row < data.length; row++) {
            map[data[row][keyIndex]] = data[row][valueIndex];
        }

        return map;
    }
}

var Data = {
    //标准sql处理器标识
    VSqlProcessorKey: "#_#VSqlProcessor#_#",
    /**
     * 注册vsql处理器
     * @param dsName 数据源名
     * @param jar   jar文件路径(可以是目录，也可以是文件名)
     * @param className 处理类
     * @param methodName 处理方法（java static方法，或Scala 单例对象方法）
     */
    registerVSqlProcessor: function (dsName, jar, className, methodName) {
        var classDef = JVM.load_class(jar, className);
        if (classDef != undefined) {
            var methodCall = classDef.getMethod(methodName, java.String.class);
            var fixDsName = dsName;
            if (dsName.indexOf("db.") != 0) {
                fixDsName = "db." + dsName;
            }
            Cache.put(Data.VSqlProcessorKey + fixDsName, methodCall);
            Log.info("registerVSqlProcessor for " + fixDsName);
        } else {
            Log.error('Failed to load ' + jar + ":" + className);
        }

    },

    //数据源选择器标识
    DataSourceSelector: "#_#DataSourceSelector#_#",

    //设置数据源选择器
    setDataSourceSelector: function (selector) {
        Cache.put(Data.DataSourceSelector, selector)
    },
    //启用数据源
    useDataSource: function () {
        var selector = Cache.get(Data.DataSourceSelector);
        if (selector != null) {
            rdk_runtime.useDataSource(selector(arguments))
        } else {
            rdk_runtime.useDataSource( function selectDataSource(params){
                return params[0];
            })
        }
    },
    fetchWithDataSource: function (dataSource, sql, maxLine) {
        if (!maxLine || !_.isDefined(maxLine)) {
            Log.warn("param maxLine empty,set maxLine=4000");
            maxLine = 4000;
        }

        if (!_.isNumber(maxLine)) {
            Log.error("maxLine must be a number!");
            return;
        }

        var dataObj = JSON.parse(rdk_runtime.fetchWithDataSource(dataSource, sql, maxLine));
        return new DataTable(i18n(dataObj.fieldNames), dataObj.fieldNames, dataObj.data);
    },
    fetch: function (sql, maxLine) {
        if (!maxLine || !_.isDefined(maxLine)) {
            Log.warn("param maxLine empty,set maxLine=4000");
            maxLine = 4000;
        }

        if (!_.isNumber(maxLine)) {
            Log.error("maxLine must be a number!");
            return;
        }

        var dataObj = JSON.parse(rdk_runtime.fetch(sql, maxLine));
        return new DataTable(i18n(dataObj.fieldNames), dataObj.fieldNames, dataObj.data);
    },
    fetch_first_cell: function (sql) {
        Log.warn("function deprecated,please use Data.fetchFirstCell()");
        return Data.fetchFirstCell(sql);
    },
    fetchFirstCell: function (sql) {
        return rdk_runtime.fetch_first_cell(sql);
    },
    batchFetch: function (sqlArray, maxLine, timeout) {  //并发实现

        if (!sqlArray || !_.isArray(sqlArray)) {
            Log.error("Array param required! " + sqlArray);
            return;
        }
        if (maxLine === undefined) {
            Log.warn("param maxLine empty,set maxLine=4000");
            maxLine = 4000;
        }
        if (timeout === undefined) {
            Log.warn("param timeout empty,set timeout=30");
            timeout = 30;
        }
        var dataTableArray = [];
        var dataObj = JSON.parse(rdk_runtime.batchFetch(sqlArray, maxLine, timeout));
        for (idx in dataObj) {
            dataTableArray.push(new DataTable(i18n(dataObj[idx].fieldNames), dataObj[idx].fieldNames, dataObj[idx].data))
        }
        return dataTableArray;
    },
    batchFetchWithDataSource: function (dataSource, sqlArray, maxLine, timeout) {

        if (!sqlArray || !_.isArray(sqlArray)) {
            Log.error("Array param required! " + sqlArray);
            return;
        }
        if (maxLine === undefined) {
            Log.warn("param maxLine empty,set maxLine=4000");
            maxLine = 4000;
        }
        if (timeout === undefined) {
            Log.warn("param timeout empty,set timeout=30");
            timeout = 30;
        }
        var dataTableArray = [];
        var dataObj = JSON.parse(rdk_runtime.batchFetchWithDataSource(dataSource, sqlArray, maxLine, timeout));
        for (idx in dataObj) {
            dataTableArray.push(new DataTable(i18n(dataObj[idx].fieldNames), dataObj[idx].fieldNames, dataObj[idx].data))
        }
        return dataTableArray;
    },
    batch_fetch: function (sqlArray, maxLine, timeout) {  //并发实现
        Log.warn("function deprecated,please use Data.batchFetch()");
        return Data.batchFetch(sqlArray, maxLine, timeout);
    },
    executeUpdate: function (sql) {
        if (_.isString(sql)) {
            return rdk_runtime.executeUpdate(rdk_runtime.application(), sql);
        }

        if (_.isArray(sql)) {
            return JSON.parse(rdk_runtime.batchExecuteUpdate(rdk_runtime.application(), sql));
        }

        Log.error("String or Array[String] param required!");
        return;
    },
    sql: function(sql) {
        log("exec sql: " + sql);
        return rdk_runtime.dbHelper().sql(rdk_runtime.useDbSession(), sql);
    },
    clear: function(resultSet) {
        info("clearing the resultSet and every resource else.");
        rdk_runtime.dbHelper().clear(rdk_runtime.useDbSession(), resultSet);
    }
}
var sql = Data.sql;
var clear = Data.clear;

function DataTable(header, field, data, paging) {
    this.header = header;
    this.field = field;
    this.data = data;
    this.paging = paging;

    this.transform = function (trans_object_conf) {
        for (field in trans_object_conf) {
            var fieldIndex = this.field.indexOf(field);
            if (fieldIndex == -1) {
                Log.warn("field not exist! field:" + field);
                continue;
            }
            var func = trans_object_conf[field];
            if (!_.isFunction(func)) {
                Log.warn("function required!param value:" + func);
                continue;
            }
            for (var row = 0; row < this.data.length; row++) {
                try {
                    this.data[row][fieldIndex] = func(this.data[row][fieldIndex], this.data[row], this.field);
                } catch (error) {
                    Log.warn("function call error");
                }
            }
        }
        return this;
    },

        this.filter = function (func) {
            if (!_.isFunction(func)) {
                Log.error("function required!param value:" + func);
                return this;
            }
            var data = [];
            try {                            //try catch
                if (func(this.data[row])) {
                    data.push(this.data[row]);
                }
            } catch (error) {
                Log.warn("function call error");
            }
            return this;
        },

        this.select = function (colNameArray) {
            if (!colNameArray || !_.isArray(colNameArray)) {
                Log.error("field Array required! field param:" + colNameArray);
                return this;
            }
            var field = [];
            var header = [];  //delete
            var data = [];    //转置？
            var paging = {};
            var index = 0;
            for (var i = 0; i < colNameArray.length; i++) {
                var colName = colNameArray[i];
                index = this.field.indexOf(colName)
                if (index == -1) {
                    Log.warn("field not exist! " + colName);
                    continue;
                }
                field.push(colName);
                header.push(this.header[index]);
                for (row = 0; row < this.data.length; row++) {
                    var rowArray = [];
                    rowArray.push(this.data[row][index]);
                    data.push(rowArray);
                }
            }
            this.header = header;
            this.field = field;
            this.data = data;
            this.paging = paging;
            return this;
        },

        this.map = function (func) {  //log error
            Log.error("map funciton is not supported yet!");
            //if(!_.isFunction(func)){
            //    Log.error("function required! parm:"+func);
            //}
            //each(this.data,func);
            return this;
        },

        this.clone = function () {
            return new DataTable(this.header, this.field, this.data, this.paging);
        }
}

function json(data, indent) {
    var i = indent === undefined ? '  ' : indent;
    return _.isString(data) ? data : JSON.stringify(data, '', i);
}

function matrix(resultSet, mapIterator, keepResultSet) {
    if (_.isString(resultSet)) {
        return matrix(sql(resultSet), mapIterator);
    }
    var its = mapIterator === undefined ? {} : mapIterator;
    var mtx = {header: [], field: [], data: []};

    if (!resultSet) {
        return mtx;
    }
    if (resultSet.isClosed()) {
        error("the resultset is closed!");
        return map;
    }

    var metaData = resultSet.getMetaData();
    var cc = metaData.getColumnCount();

    for (var i = 1; i <= cc; i++) {
        var cn = metaData.getColumnLabel(i);
        mtx.header.push(i18n(cn));
        mtx.field.push(cn);
    }

    resultSet.beforeFirst();
    while (resultSet.next()) {
        var row = [];
        mtx.data.push(row);
        for (var i = 1; i <= cc; i++) {
            var it = its[mtx.field[i - 1]];
            var val = _bytes2string(resultSet.getBytes(i));
            try {
                val = _.isDefined(it) ? it(val, resultSet, row.length) : val;
            } catch (e) {
                error("call matrix iterator error: " + e);
            }
            row.push(val);
        }
    }

    if (keepResultSet) {
        resultSet.beforeFirst();
    } else {
        clear(resultSet);
    }
    return mtx;
}

function _bytes2string(bytes) {
    return new java.String(bytes == null ? 'null' : bytes);
}

function isMatrix(data) {
    Log.warn("function deprecated,please use _.isDataTable!");
    if (!data) {
        return false;
    }

    var hasHeader = data.hasOwnProperty('header');
    var hasField = data.hasOwnProperty('field');
    var hasData = data.hasOwnProperty('data');
    return hasHeader && _.isArray(data.header) &&
        hasField && _.isArray(data.field) &&
        hasData && _.isArray(data.data);
}

function kv(map, defaultValue) {
    return function (key, row, index) {
        return map && _.isDefined(key) && map.hasOwnProperty(key) ? map[key] :
            defaultValue === undefined ? key : defaultValue;
    }
}

/**
 * 尝试从缓冲区中提取名为name的缓冲数据。
 * 如果有，则返回之前的版本。
 * 如果没有，则使用 dataDescriptor 作为数据
 * 本函数的执行是线程安全的，包括 dataDescriptor 的执行过程也是线程安全的。
 * 如果需要更高的性能，请自行创建好数据之后再调用本函数。注意缓冲数据是全局的，需要考虑线程同步问题。
 * @param name 缓冲数据名
 * @param dataDescriptor 数据描述，可以是一个数据对象，也可以是一个函数
 * @param entity 变化实体，暂时未用到
 */
function buffer(name, dataDescriptor, entity) {
    var data = rdk_runtime.buffer(name);
    if (data === null) {
        data = _.isFunction(dataDescriptor) ? dataDescriptor() : dataDescriptor;
        rdk_runtime.buffer(name, data);
    }
    return data;
}

function getBuffer(name) {
    return rdk_runtime.buffer(name);

}

function addBuffer(name, data) {
    rdk_runtime.buffer(name, data);
}

function removeBuffer(name) {
    rdk_runtime.removeBuffer(name);
}

function sleep(milliSec) {
    java.Thread.sleep(milliSec);
}

function sync(job, lockName) {
    return job();
}


function _arg2string(args) {
    var str = '';
    each(args, function (item) {
        str += ( _.isObject(item) ? _obj2str(item) : item ) + ' ';
    });
    return '[' + _caller() + '] - ' + str;

    function _obj2str(obj) {
        switch (typeof obj) {
            case 'Date':
                return obj.toString();
            default:
                return json(obj) || obj.toString();
        }
    }

    function _caller() {
        var e = new Error();
        try {
            var lines = e.stack.split('\n');
            var line = lines[4];
            var idx = line.lastIndexOf('/');
            //找不到时idx==-1，刚好+1变成0
            idx += 1;
            var callee = line.substr(idx, line.length - idx - 1);

            if (callee.match(/^runtime_helper\.js:/)) {
                line = lines[lines.length - 2];
                var idx1 = line.lastIndexOf('/');
                var idx2 = line.indexOf(':');
                var scriptName = line.substring(idx1 + 1, idx2);
                callee += '@' + scriptName;
            }

            return callee;
        } catch (e) {
            return "unknown_source: -1";
        }
    }
}

function i18n(key) {

}

function groupI18n(keys) {
    var result = [];
    each(keys, function (key) {
        if (_.isString(key)) {
            result.push(i18n(key));
        } else {
            //复杂key的情况，待支持
            warn('complex key is not supported yet!')
            result.push(key);
        }
    });
    return result;
}

function _tryParseJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        Log.warn("json parse fail,use string!");
        return str;
    }
}

function _java2json(javaObj) {
    var json = null;
    if (javaObj instanceof java.ArrayList) {
        json = [];
        for (var i = 0, len = javaObj.size(); i < len; i++) {
            json.push(_java2json(javaObj.get(i)));
        }
    } else if (javaObj instanceof java.StringMap) {
        json = {};
        var keySet = javaObj.keySet();
        var it = keySet.iterator();
        while (it.hasNext()) {
            var key = it.next();
            json[key.toString()] = _java2json(javaObj.get(key));
        }
    } else if (javaObj instanceof java.ScalaMap) {
        json = {};
        var keySet = javaObj.keySet();
        var it = keySet.iterator();
        while (it.hasNext()) {
            var key = it.next();
            json[key.toString()] = _java2json(_tryParseJson(javaObj.get(key).get()));
        }
    } else if (javaObj instanceof java.String) {
        json = String(javaObj);
    } else {
        //数字，布尔等
        json = javaObj;
    }
    return json;
}

//服务调用辅助函数，用来将前端入参转为 json 对象。
//入参经过java后，就变成了java对象，在js中操作起来不方便
function _callService(serviceImplement, request, script) {
    return serviceImplement.call(serviceImplement, _java2json(request), script);
}


