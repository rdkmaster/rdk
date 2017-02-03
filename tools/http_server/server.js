'use strict';
var http = require('http'),
httpProxy = require('http-proxy'),
url = require('url'),
fs = require('fs'),
config = require('./config.json');

var proxy = new httpProxy.createProxyServer();

var express = require('express');
var app = express();
var args = process.argv;

app.use(express.static(config.root));
app.use(express.limit(100000000000));
app.use(express.errorHandler({
  dumpExceptions: true,
  showStack: true
}));


function getRemoteIp (req) {
  var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  return ip;
}

app.use('/rdk_server', function(req, res) {
  var url = req.url[0] == '/' ? req.url : '/' + req.url;
  url = '/rdk' + url;
  console.log('redirect to: ' + url);
  res.redirect(url);
})

app.use(function(req, res) {
  var _reqUrl = url.parse(req.url).pathname;
  var _targetUrl = '';
  var _proxy = '';
  var _proxyLen = 0;
  var i = 0;

  for (i = 0, _proxyLen = config.proxy.length; i < _proxyLen; i++) {
    _proxy = config.proxy[i];
    if (_reqUrl.match(_proxy.url) ) {
      _targetUrl = 'http://' + _proxy.host + ':' + _proxy.port + req.url;
      console.log('proxy to: ' + _targetUrl);
      proxy.web(req, res, {
        target: _targetUrl
      }, function(e) {
        console.log('proxy to ' + _targetUrl + ' faild.' + e);
      });
      break;
    }
  }

});

var cfgPath = '../../rdk/proc/conf/rdk.cfg'
console.log('reading http port from property "http.server.port" of [%s]', cfgPath);
var rdkCfg = fs.readFileSync(cfgPath)+'';
var match = rdkCfg.match(/^\s*http\.server\.port\s*\=\s*(\d+)\s*$/m);
var port = 8080;
if (match) {
  port = match[1];
} else {
  console.log('WARN: cannot find property "http.port" in [%s]', cfgPath);
}
http.createServer(app).listen(port, function( /*req, res*/ ) {
  console.log('Express server listening on port ' + port);
});