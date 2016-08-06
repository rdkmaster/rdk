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

    ResultSet: Java.type('java.sql.ResultSet'),

    ArrayList: Java.type('java.util.ArrayList'),

    StringMap: Java.type('com.google.gson.internal.StringMap'),

    FileHelper: Java.type('com.zte.vmax.rdk.jsr.FileHelper'),
    RegFileFilter: Java.type('com.zte.vmax.rdk.util.RegFileFilter')

};

var mq = {
    p2p: function(subject, message) {
        return new Sequence(helper.messageQueue.p2p(subject, message), subject);
    },
    broadcast: function(subject, message, persit) {
        var seq = helper.messageQueue.broadcast(subject, message, !!persit);
        return new Sequence(seq, subject);
    },
    subscribe: function(subject, callback, context, sequence) {
        helper.messageQueue.subscribe(subject, callback, context, sequence);
    },
    unsubscribe: function(subject, callback) {
        helper.messageQueue.unsubscribe(subject, callback);
    }
};

function Sequence(sequence, subject) {
    this.sequence = sequence;
    this.subject = subject;
    this.data = undefined;

    this.wait = function(subject) {
        log("waiting for ack... subject =", subject || this.subject);
        if (!subject && !this.subject) {
            error("need a valid subject!");
            return;
        }
        var internalCallback = eval('function anonymous_' + sequence + '(msg) {this.data = msg.body;}');
        mq.subscribe(subject || this.subject,internalCallback , this, this.sequence);
        while (!this.data) {
            sleep(20);
        }
        return this.data;
    };

    this.toString = function() {
        return String(this.sequence);
    };
    this.valueOf = function() {
        return this.sequence;
    };
}

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

var file = {
    loadProperty:function(file){
        if (!file) {
            log("invalid file path:", file);
            return false;
        }
        file = file.toString();
        log("reading property file:",file);
        return helper.fileHelper.loadProperty(file);
    },
    save: function(file, content, append, encoding) {
        if (!file) {
            log("invalid file path:", file);
            return false;
        }
        if (content == undefined || null) {
            log("invalid file content:", content);
            return false;
        }

        file = file.toString();
        log("saving file to:", file);
        return helper.fileHelper.save(file, content.toString(), !!append, encoding);
    },
    saveAsCSV: function(file, content, excludeIndexes, option) {
        file = file.toString();
        log("saving to csv:", file);

        var csv = _fixContent(content, excludeIndexes);
        var b = helper.fileHelper.saveAsCSV(file, csv.data, csv.excludeIndexes, option);
        //_fixContent中修改了content.data，这里还原
        csv.data.shift();
        return b;
    },
    list: function(path, pattern) {
        path = java.FileHelper.fixPath(path, helper.application);
        log('listing dir: ' + path);

        var file = new java.File(path);
        var javaFileArr = !!pattern ? file.listFiles(new java.RegFileFilter(pattern)) : file.listFiles();

        var files = [];
        for (var i = 0; i < javaFileArr.length; i++) {
            files.push(javaFileArr[i].toString());
        }
        return files;
    },
    get web() {
        return java.FileHelper.fixPath('$web', helper.application);
    },
    get base() {
        return java.FileHelper.fixPath('$base', helper.application);
    },
    get svr() {
        return java.FileHelper.fixPath('$svr', helper.application);
    }
};

///////////////////////////////////////////////////////////////////////

var rest = {
    get: function(url, option) {
        return helper.restHelper.get(encodeURI(url), option);
    }
}

///////////////////////////////////////////////////////////////////////

_.isResultSet = function(value) {
    return value instanceof java.ResultSet;
}

_.isDefined = function(value) {
    return !_.isUndefined(value);
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
    script = java.FileHelper.fixPath(script, helper.application);
    info("loading script in js: " + script);
    return load(script);
}

function json(data, indent) {
    var i = indent === undefined ? '  ' : indent;
    return _.isString(data) ? data : JSON.stringify(data, '', i);
}

function sql(sql) {
    log("exec sql: " + sql);
    return helper.dbHelper.sql(sql);
}

function clear(resultSet) {
    info("clearing the resultSet and every resource else.");
    helper.dbHelper.clear(resultSet);
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
                val = it ? it(val, resultSet, row.length) : val;
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
    return function (value, row, index) {
        return map && !!value && map.hasOwnProperty(value) ? map[value] :
            defaultValue === undefined ? value : defaultValue;
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
    return sync(function () {
        var data = helper.buffer(name);
        if (data === null) {
            data = _.isFunction(dataDescriptor) ? dataDescriptor() : dataDescriptor;
            helper.buffer(name, data);
        }
        return data;
    }, name);
}

function getBuffer(name) {
    return sync(function () {
        return helper.buffer(name);
    }, name);
}

function addBuffer(name, data) {
    sync(function () {
        helper.buffer(name, data);
    }, name);

}

function removeBuffer(name) {
    sync(function () {
        helper.removeBuffer(name);
    }, name);
}

function sleep(milliSec) {
    java.Thread.sleep(milliSec);
}

function sync(job, lockName) {
    var lock = lockName === undefined ? "__global_lock_145812__" : lockName + "";
    return helper.doSyncJob(job, lock);
}

function log() {
    var message = _arg2string(arguments);
    helper.jsLogger.debug(message);
}

function debug() {
    var message = _arg2string(arguments);
    helper.jsLogger.debug(message);
}

function info() {
    var message = _arg2string(arguments);
    helper.jsLogger.info(message);
}

function warn() {
    var message = _arg2string(arguments);
    helper.jsLogger.warn(message);
}

function error() {
    var message = _arg2string(arguments);
    helper.jsLogger.error(message);
}

function fatal() {
    var message = _arg2string(arguments);
    helper.jsLogger.fatal(message);
}

function crit() {
    var message = _arg2string(arguments);
    helper.jsLogger.crit(message);
}

function _arg2string(args) {
    var str = '';
    each(args, function(item) {
        str += ( _.isObject(item) ? _obj2str(item) : item ) + ' ';
    });
    return '[' + _caller() + '] - ' + str;

    function _obj2str(obj) {
        switch(typeof obj) {
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
    } catch(e) {
        return key;
    }
    try {
        var val = i18n[helper.locale][key];
    } catch(e) {
        warn('get locale data error, locale =', helper.locale);
        return key;
    }

    val = _.isDefined(val) ? val : key;
    for (var i = 1; i < arguments.length; i++) {
        val = val.replace(new RegExp("\\{" + (i-1) + "\\}", "g"), arguments[i]);
    }
    return val;
}

function groupI18n(keys) {
    var result = [];
    each(keys, function(key) {
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

function loadClass(className, jar) {
    try {
        return helper.jarHelper.loadClass(className, jar);
    } catch (e) {
        return undefined;
    }
}
