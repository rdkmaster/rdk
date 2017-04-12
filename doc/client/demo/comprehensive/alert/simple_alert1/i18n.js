define(['rd.modules.i18n'],
    function(i18n) {

        //默认语言环境，在获取语言服务失败时使用
        return i18n.init(


            //======================= 开始 =======================
            //将前端的国际化词条写在下面的json对象中
            //开始和结束标记以外的区域，请不要改动


            {
                "en_US": {
                    alert_yes: 'YES',
                    alert_no: 'NO',
                    alert_ok: 'OK',
                    alert_cancel: 'CANCEL',
                },
                "zh_CN": {
                    alert_yes: '否',
                    alert_no: '是',
                    alert_ok: '取消',
                    alert_cancel: '取消'
                }
            }
            //======================= 结束 =======================

            , "zh_CN")
    });
