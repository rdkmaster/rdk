define(['rd.modules.i18n'],
function(i18n) {
 
    //默认语言环境，在获取语言服务失败时使用
    var defaultLocale = 'en_US';

    return i18n.init(
        {
            "en_US": {
                searchPrompt: 'Type to search...',
            },
            "zh_CN": {
                searchPrompt: '搜索...',
            }
        }, defaultLocale);
});