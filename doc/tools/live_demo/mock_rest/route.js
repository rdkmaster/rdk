'use strict';

var baseDir = (function() {
  var match = (/(.+)[/\\]\w+/).exec(module.paths[4]);
  var path = match[1].replace(/\\/g, '/') + "/doc/client/demo/";
  return path;
})();
console.log('-------------------------------------------------');
console.log(' baseDir='+baseDir);
console.log('-------------------------------------------------');

var fs = require("fs");
module.exports = function(app) {
  app.get("/demos/data", _dataService);
};

function _dataService(req, res) {
  var files = listScripts(baseDir + req.query.example);
  _loadFiles(baseDir + req.query.example, function(htmlData, jsData, cssData) {
    res.json([htmlData, jsData, cssData]);
  });
}

function listScripts(dir) {
  var res = [] , files = fs.readdirSync(dir);
  files.forEach(function(file) {
    var pathname = dir + file, stat = fs.lstatSync(pathname);

    if (stat.isDirectory()) {
      res = res.concat(listScripts(pathname+'/'));
    } else {
      if (pathname.match(/\.js$|\.css$|\.html$/i)) {
        res.push(pathname);
      }
    }
  });
  return res;
}

function _loadFiles(dir, callback) {
  var htmlData = null;
  fs.readFile(dir + '/index.html', function(error, fileData) {
    htmlData = fileData ? _fixScriptUrl(fileData, dir) : '';
    _check();
  });

  var jsData = null;
  fs.readFile(dir + '/scripts/main.js', function(error, fileData) {
    jsData = fileData ? fileData : '';
    _check();
  });

  var cssData = null;
  fs.readFile(dir + '/style.css', function(error, fileData) {
    cssData = fileData ? fileData : '';
    _check();
  });

  function _check() {
    if (htmlData === null || jsData === null || cssData === null) {
      return;
    }
    //强转为字符串
    callback(''+htmlData, ''+jsData, ''+cssData);
  }
}

function _fixScriptUrl(htmlData, dir) {
  var idx = dir.indexOf('/doc/client/demo/');
  if (idx == -1) {
    return htmlData;
  }
  dir = dir.substring(idx);
  if (dir.charAt(dir.length - 1) != '/') {
    dir += '/';
  }

  //转为字符串
  htmlData += '';
  return htmlData.replace(/<script.+src\s*=\s*"\s*scripts\/main\.js\s*">\s*<\/script\s*>/, '');
}

function _escapeString(string) {
  return string.replace('<', '&lt;').replace('>', '&gt;');
}
