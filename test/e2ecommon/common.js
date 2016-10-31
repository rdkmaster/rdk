//一些公共方法函数可以封装在这个文件，例如兼容属性的区分等
var browserName;

var getBrowserName=function(count){
    browser.getCapabilities().then(function(caps){
        browserName= caps.get('browserName');
        count++;
        orderize(funs,count,sum);
    });
};
var addReport=function(){
    // browserName!===undefined
    console.log(browserName);
    var Jasmine2HtmlReporter = require('../index.js');
    var htmlSetting=new Jasmine2HtmlReporter({
        savePath:'./report/doc/'+browserName
    });
    jasmine.getEnv().addReporter(htmlSetting);
}
var funs=[getBrowserName,addReport];
var sum=funs.length;
function orderize(funs,count,sum){
    if(count===sum){
        return ;
    }else{
        //顺序执行
        funs[count](count);
    }
}
exports.getBrowserName=getBrowserName;
exports.addReport=addReport;
exports.orderize=orderize;