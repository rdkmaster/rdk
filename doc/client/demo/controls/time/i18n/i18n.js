define(['rd.modules.i18n'],
function(i18n) {

    //默认语言环境，在获取语言服务失败时使用
    var defaultLocale = 'en_US';

    return i18n.init({
        "en_US": {
            quarter: 'quarter',
            hour: 'hour',
            date: 'date',
            week: 'week',
            month: 'month'
        },
        "zh_CN": {
            quarter: '15分钟',
            hour: '小时',
            date: '天',
            week: '周',
            month: '月'
        }
    }, defaultLocale);
});
