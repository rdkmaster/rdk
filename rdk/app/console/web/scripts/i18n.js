define(['rd.modules.i18n', 'rest!/rdk/service/app/common/locale'],
function(i18n, locale) {
 
    //默认语言环境，在获取语言服务失败时使用
    var defaultLocale = 'zh_CN';

    return i18n.init(


    //======================= 开始 =======================
    //将前端的国际化词条写在下面的json对象中
    //开始和结束标记以外的区域，请不要改动


    {
        // "en_US": {
        //     welcome: 'Your RDK application is ready!',
        //     wait: 'Please wait for a moment...',
        //     lang: 'Current language is {0}'
        // },
        // "zh_CN": {
        //     welcome: '你的 RDK 应用可以正常工作了！',
        //     wait: '正在查询，请稍候...',
        //     lang: '当前的语言环境是 {0}'
        // }
        "en_US": {
            'query':'Query',
            'wholeNet':'Whole Net',
			 'time':'Time',
			 'signal':'Signaling Jump',
			 'export':'Export',
			 'cellcontrol':'Cell Control'
        },  
        "zh_CN": {
            'query' :'查询',
            'wholeNet':'全网',
			'time':'时间',
		    'signal':"信令跳转",
			'export':'导出',
			'cellcontrol':'列头控制'
			
        }
    }


    //======================= 结束 =======================


    , (function fixLocale(rawLocale) {
            var locale;
            try {
                locale = eval('(' + rawLocale + ')').result;
            } catch (e) {
                console.warn('invalid locale data: [' + rawLocale + '], using ' + defaultLocale);
                locale = defaultLocale;
            }
            return locale;
        })(locale)
    );
});

