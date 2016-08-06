define(['rd.modules.i18n'], function(i18n) {
    //应用的当前语言环境请根据自己的实际情况获取
    var lang = 'zh_CN';

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
    
    return i18n.init(labels, lang);
});