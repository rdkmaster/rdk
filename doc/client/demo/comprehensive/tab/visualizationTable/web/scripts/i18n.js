/**
 * Created by 6176000041 on 2017/4/6.
 */
define(['rd.modules.i18n'],
    function(i18n) {
        var defaultLocale = 'en_US';
        return i18n.init(


            //======================= 开始 =======================
            //将前端的国际化词条写在下面的json对象中
            //开始和结束标记以外的区域，请不要改动


            {
                "en_US": {
                    'total': '- ',
                    'records': '-',
                    'next': 'Next000',
                    'prev': 'Prev',
                    'first': '-',
                    'last': '-'
                },
                "zh_CN": {
                    'total': '共',
                    'records': '条记录',
                    'next': '下一页',
                    'prev': '上一页',
                    'first': '首页',
                    'last': '尾页'
                }
            }


            //======================= 结束 =======================

            , defaultLocale)
    });