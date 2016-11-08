var fs = require('fs');
var jschardet = require('jschardet');
require(__dirname + '/mock-require.js');
require(__dirname + '/../../rdk/app/libs/rdk/rdk.js');
// console.log(define(['fffffff']))

var rootPath = process.argv[2];
if (!!rootPath) {
    console.log("listing %s", rootPath);
    var scripts = listScripts(rootPath);
    scripts.forEach(function(script) {
        fixScript(script);
    });
} else {
    console.log("usage:\n    node fix-scripts.js <path>");
}

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
    global.dependencyArray = undefined;
    try {
        require(script);
    } catch(e) {
        //unknown error
        console.log('eval "%s error, detail:', script);
        console.log(e);
        return;
    }

    var content = fs.readFileSync(script);
    var charset = jschardet.detect(content);
    content = content.toString();
    var fixFromIdx = content.indexOf('/*fix-from*/');
    var fixToIdx = content.indexOf('/*fix-to*/');
    if (fixFromIdx == -1 || fixToIdx == -1) {
        // do not need to fix
        return;
    }
    var deps = '["' + global.dependencyArray.join('","') + '"]';
    var newContent = content.substring(0, fixFromIdx) + deps + content.substring(fixToIdx);
    saveScriptWithBackup(script, newContent, charset.encoding);
}

function saveScriptWithBackup(script, content, charset) {
    try {
        console.log("fixing %s", script);
        fs.renameSync(script, script + ".orignial");
        var file = fs.openSync(script, "w", 0666);
        fs.writeSync(file, content, charset);
        console.log("done!");
        return true;
    } catch(e) {
        console.log(e);
        if (file) {
            fs.closeSync(file);
        }
        return false;
    }
}