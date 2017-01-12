'use strict';

var express = require('express');
var http = require('http');
var config = require('./config.json');
var live_demo = require('./route.js');

var app = express();
app.set('port', config.restPort);
app.set('urlPrefix', config.urlPrefix);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.limit(100000000000));
app.use(express.bodyParser({
  uploadDir: './tmp'
}));
app.use(app.router);
app.use(express.errorHandler({
  dumpExceptions: true,
  showStack: true
}));

live_demo(app);

http.createServer(app).listen(app.get('port'), function(/*req, res*/) {
  console.log('Express server listening on port ' + app.get('port'));
});