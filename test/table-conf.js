var common=require("./e2ecommon/common.js");
var getBrowserName=common.getBrowserName;
var addReport=common.addReport;
var funs=[getBrowserName,addReport];
var sum=funs.length;
var orderize=common.orderize;
exports.config = {
    //出现过11秒页面载入没完成时候，改为15秒
    allScriptsTimeout: 15000,

    specs:['e2e/testjs/TableSelf.js'],


    multiCapabilities: [
        {
            browserName: 'firefox'
        }, 
        {
            browserName: 'chrome'
        }
    ],

    baseUrl: 'http://localhost:8080/',

    framework: 'jasmine2',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000000
    },

    ignoreSynchronization: true,

    onPrepare: function() {
        browser.driver.manage().window().maximize();
        orderize(funs,0,sum);
    }
};