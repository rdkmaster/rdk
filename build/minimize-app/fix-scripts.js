var fs = require('fs');
var jschardet = require('jschardet');

var rootPath = process.argv[2];
if (!rootPath) {
    console.log("usage:\n    node fix-scripts.js <path>");
    process.exit();
}

//模拟在浏览器中运行时的必要函数
global.define = function(name, deps, callback) {
    deps = typeof name === 'string' ? deps : name;
    global.dependencyArray = deps;
}
global.location = {
    pathname: '/rdk/app/example/web/index.html'
}

//引入rdk的基础定义
require(__dirname + '/../../rdk/app/libs/rdk/application.js');

console.log("listing %s", rootPath);
var scripts = listScripts(rootPath);
scripts.forEach(function(script) {
    fixScript(script);
});

function listScripts(root) {
    var res = [] , files = fs.readdirSync(root);
    files.forEach(function(file) {
        var pathname = root+'/'+file, stat = fs.lstatSync(pathname);

        if (stat.isDirectory()) {
            res = res.concat(listScripts(pathname));
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

    //nodejs 和 requirejs 都有一个叫 require 的函数/属性，导致在编译时会有冲突
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