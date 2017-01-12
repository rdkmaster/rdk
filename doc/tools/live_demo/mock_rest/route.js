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
  app.get("/demos/editor", _editorService);
};

function _dataService(req, res) {
  _loadFiles(baseDir + req.query.example, function(htmlData, jsData, cssData) {
    res.json([htmlData, jsData, cssData]);
  });
}

function _editorService(req, res) {
  _loadFiles(baseDir + req.query.example, function(htmlData, jsData, cssData) {
    var content = '<html>\
  <head>\
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\
  </head>\
<body>\
  <fieldset class="editorSet left">\
    <div class="editor html top">\
      <span class="quick_tools">\
        <span>HTML</span>\
        <img src="img/arrow-out.png" width="14">\
      </span>\
      <textarea rows="10" cols="40" id="code_html">';
       content += _escapeString(htmlData);
       content += '&nbsp;\
     </textarea>\
    </div>\
    <div class="handler handler_horizontal"></div>\
    <div class="editor js bottom">\
      <span class="quick_tools">\
        <span onclick="runjs.editor.chooseJsType();">JavaScript</span>\
        <img src="img/arrow-out.png" width="14">\
      </span>\
      <textarea rows="10" cols="40" id="code_js">';
       content += _escapeString(jsData);
       content += '&nbsp;\
      </textarea>\
    </div>\
  </fieldset>\
  <div class="handler handler_vertical"></div>\
  <fieldset class="editorSet right">\
    <div class="editor css top">\
      <span class="quick_tools">\
        <span onclick="runjs.editor.chooseCssType();">CSS</span>\
        <img src="img/arrow-out.png" width="14">\
      </span>\
      <textarea rows="10" cols="40" id="code_css">';
       content += _escapeString(cssData);
       content += '&nbsp;\
      </textarea>\
    </div>\
    <div class="handler handler_horizontal"></div>\
    <div class="editor preview bottom">\
      <span class="quick_tools">\
        <span>预览</span>\
        <img src="img/arrow-out.png" width="14">\
      </span>\
      <iframe id="preview" frameborder="0"></iframe>\
    </div>\
  </fieldset>\
</body>\
</html>'

    res.writeHead(200, { "content-type": "text/html" });
    res.write(content);
    res.end();
  });
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
