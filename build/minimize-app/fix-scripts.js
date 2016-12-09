var fs = require('fs');
var jschardet = require('jschardet');

var appPath = process.argv[2];
if (!appPath) {
    console.log("usage:\n    node fix-scripts.js <path of index.html>");
    process.exit();
}
// 最后加上斜杠
appPath = appPath.replace(/\\/g, '/');
appPath = appPath.match(/\/$/) ? appPath : appPath + '/';

///////////////////////////////////////////////////////////////////
//  模拟在浏览器中运行时的必要函数
global.define = function(name, deps, callback) {
    deps = typeof name === 'string' ? deps : name;
    global.dependencyArray = deps;
}
// app-basic.js中用到
global.location = {
    // 这个appPath必须是index.html文件所在路径
    pathname: appPath
}
//引入application的基础定义
require(__dirname + '/../../rdk/app/libs/rdk/app-basic.js');
///////////////////////////////////////////////////////////////////


console.log("listing %s", appPath);
var scripts = listScripts(appPath);
scripts.forEach(function(script) {
    fixScript(script);
});

function listScripts(dir) {
    var res = [] , files = fs.readdirSync(dir);
    files.forEach(function(file) {
        var pathname = dir + file, stat = fs.lstatSync(pathname);

        if (stat.isDirectory()) {
            res = res.concat(listScripts(pathname+'/'));
        } else {
            if (pathname.match(/\.js$/i)) {
                res.push(pathname);
            }
        }
    });
    return res;
}

function fixScript(script) {
    var content = fs.readFileSync(script);
    var charset = jschardet.detect(content);
    content = content.toString();
    var fixFromIdx = content.indexOf('/*fix-from*/');
    var fixToIdx = content.indexOf('/*fix-to*/');
    if (fixFromIdx == -1 || fixToIdx == -1) {
        // do not need to fix
        return;
    }

    console.log("fixing %s", script);

    //backup file
    fs.renameSync(script, script + ".orignial");

    //nodejs 和 requirejs 都有一个叫 require 的函数/属性，导致在eval时会有冲突
    //编译时，给nodejs的require添加上必要的空函数以避免代码eval不过。
    var result = writeFile(script, 'require.config=function(){};' + content, charset);
    if (!result) {
        return;
    }

    global.dependencyArray = undefined;
    try {
        require(script);
    } catch(e) {
        console.log('eval "%s error, detail:', script);
        console.log(e);
        return;
    }
    if (!global.dependencyArray) {
        console.log('eval "%s error, detail: global.dependencyArray not set, unknown error', script);
        return;
    }
    var deps = '["' + global.dependencyArray.join('","') + '"]';
    var newContent = content.substring(0, fixFromIdx) + deps + content.substring(fixToIdx);

    result = writeFile(script, newContent, charset);
    if (!result) {
        return;
    }
    console.log("done!");
}

function writeFile(script, content, charset) {
    try {
        var file = fs.openSync(script, "w", 0666);
    } catch(e) {
        console.log('open script "%s" error, detail:');
        console.log(e);
        return false;
    }
    var result;
    try {
        fs.writeSync(file, content, charset);
        result = true;
    } catch(e) {
        console.log('write script "%s" error, detail:');
        console.log(e);
        result = false;
    }
    fs.closeSync(file);
    return result;
}