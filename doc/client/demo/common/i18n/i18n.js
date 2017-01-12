define(['rd.modules.i18n'], function(i18n) {
    var labels = {
        "en_US": {
            hello: 'Hello RDK',
            ready: 'Your RDK application is ready!',
            time: 'Time now: {0}'
        },
        "zh_CN": {
            hello: 'RDK 你好',
            ready: '你的 RDK 应用可以正常工作了！',
            time: '当前时间 {0}'
        }
    }

    //应用的当前语言环境从浏览器中取
    //需要自定义语言，请查看文档 /doc/common/i18n/index.html
    var lang = getLocalLanguage();
    return i18n.init(labels, lang);

    function getLocalLanguage() {
        var language = window.navigator.language; 
        if (!language) {
            language = window.navigator.browserLanguage; 
        }
        return language.replace('-', '_');
    }
});