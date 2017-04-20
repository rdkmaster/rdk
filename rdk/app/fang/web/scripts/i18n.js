define(['rd.modules.i18n', 'rest!/rdk/service/app/common/locale'],
function(i18n, locale) {
 
    //默认语言环境，在获取语言服务失败时使用
    var defaultLocale = window.navigator.language;

    return i18n.init(


    //======================= 开始 =======================
    //将前端的国际化词条写在下面的json对象中
    //开始和结束标记以外的区域，请不要改动


    {
        "en_US": {
            hello: 'Hello {0}!\nThis words is alerted in the SampleModuleController.',
            wait: 'Please wait for a moment...',
            lang: 'Current language is {0}'
        },
        "zh_CN": {
            hello: '你好，{0}！\n这些文字是在 SampleModuleController 中弹出出来的。',
            wait: '正在查询，请稍候...',
            lang: '当前的语言环境是 {0}'
        }
    }


    //======================= 结束 =======================






    , (function fixLocale(rawLocale) {
            var locale;
            try {
                locale = eval('(' + rawLocale + ')').result;
            } catch (e) {
            }
            if (locale != 'en_US' && locale != 'zh_CN' && locale != 'zh-CN' && locale != 'en-US') {
                console.warn('invalid locale data: [' + rawLocale + '], using ' + defaultLocale);
                locale = defaultLocale;
            }
            return locale.replace('-', '_');
        })(locale)
    );
});