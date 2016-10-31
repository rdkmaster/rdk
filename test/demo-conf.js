var common=require("./e2ecommon/common.js");
var getBrowserName=common.getBrowserName;
var addReport=common.addReport;
var funs=[getBrowserName,addReport];
var sum=funs.length;
var orderize=common.orderize;
exports.config = {
    allScriptsTimeout: 15000,

    specs:['doc/testjs/demo4.js'],

    multiCapabilities: [
        {
            browserName: 'firefox'
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