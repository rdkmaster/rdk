exports.config = {
    //出现过11秒页面载入没完成时候，改为15秒
    allScriptsTimeout: 15000,

    specs:['e2e/testjs/AreaSelect*.js'],

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
        var Jasmine2HtmlReporter = require('./index.js');
         jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './report/e2e'
        }));
    }
};