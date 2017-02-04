define('main', ['rd.controls.Editor'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Editor']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
      scope.myText = 'Hello, rdk!';

      scope.myCode = 'function sayHi () { \n' +
        '  console.log("hi"); \n' +
        '}';

      scope.myXml = '<?xml version="1.0" encoding="UTF-8"?>\n'+
        '<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0" ' +
        'xmlns:georss="http://www.georss.org/georss"'+
        'xmlns:twitter="http://api.twitter.com">\n<channel>\n'+
        '<title>Twitter / codemirror</title>\n'+
        '</channel>\n'+
        '</rss>\n';

      scope.myHtml = '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n</body>\n</html>\n';
    }

  ]);
});
