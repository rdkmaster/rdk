define(['rd.modules.i18n'],
function(i18n) {
 
    //默认语言环境，在获取语言服务失败时使用
    var defaultLocale = 'zh_CN';

    return i18n.init(


    //======================= 开始 =======================
    //将前端的国际化词条写在下面的json对象中
    //开始和结束标记以外的区域，请不要改动


    {
        "en_US": {
            welcome: 'Your RDK application is ready!',
            wait: 'Please wait for a moment...',
            lang: 'Current language is {0}',

            alert_yes: 'YES...',
            alert_no: 'NO...',
            alert_ok: 'OK...',
            alert_cancel: 'CANCEL...',
        },
        "zh_CN": {
            welcome: '你的 RDK 应用可以正常工作了！',
            wait: '正在查询，请稍候...',
            lang: '当前的语言环境是 {0}',

            alert_yes: '是...',
            alert_no: '否...',
            alert_ok: '确定...',
        }
    }


    //======================= 结束 =======================






    , "zh_CN")
});