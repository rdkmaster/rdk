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
        var Jasmine2HtmlReporter = require('./index.js');
        return browser.getProcessedConfig().then(function(config){
            var browserName=config.capabilities.browserName;
            var htmlSetting=new Jasmine2HtmlReporter({
                savePath:'./report/doc/'+browserName
            });
            jasmine.getEnv().addReporter(htmlSetting);
        })
    }
};

