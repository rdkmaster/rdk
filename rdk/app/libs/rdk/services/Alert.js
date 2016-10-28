define(['angular', 'jquery', 'rd.attributes.modal', 'rd.services.EventService','css!rd.styles.Alert', 'rd.services.Utils'], function() {
    var alertModule = angular.module('rd.services.Alert', ['rd.attributes.modal', 'rd.services.EventService', 'rd.services.Utils']);

    alertModule.constant("ButtonTypes", {
        YES: 1,
        NO: 2,
        OK: 4,
        CANCEL: 8,
    });

    alertModule.service('Alert', ['ButtonTypes', 'EventService', '$timeout', '$rootScope', '$compile', 'Utils',
        function(ButtonTypes, EventService, $timeout, $rootScope, $compile, Utils){

        var _callback, _svrMsgBoxId, _i18n; 
        var alertService = this;
        var _lang = "zh-cn";

        function _refreshAlertI18nLang(){
            if((alertService.scope.i18n)&&(alertService.scope.i18n.$locale)){
                _lang = alertService.scope.i18n.$locale.toLowerCase();
            }         
        }

        function _getTemplate(title, imgSrc, message, btnTmpl){
            return '<div id='+ _svrMsgBoxId +' class="svrMsgBox" rdk_modal="hide">'+
                '<div class="wrapBox">'+
                    '<div class="titleLine">'+
                        title +
                    '</div>'+
                    '<div class="tableImg">' +
                        '<img src=' + imgSrc + '>'+
                    '</div>'+
                    '<p class="tableMsg">'+ message +'</p>'+
                    '<div class="btnLine">'+
                        btnTmpl+
                    '</div>'+
                '</div>'+
            '</div>';
        }

        function _getBtnsTemplate(btnVal){
            var myBtns = '';
            if(btnVal & ButtonTypes.YES){
                myBtns += '<input class="svrMsgBtn" type="button" value=' + _i18n.yes + ' ng-click="svrClickHandler('+ ButtonTypes.YES +')">';
            }
            if(btnVal & ButtonTypes.NO){
                myBtns += '<input class="svrMsgBtn" type="button" value=' + _i18n.no + '  ng-click="svrClickHandler('+ ButtonTypes.NO +')">';
            }
            if(btnVal & ButtonTypes.CANCEL){
                myBtns += '<input class="svrMsgBtn" type="button" value=' + _i18n.cancel + ' ng-click="svrClickHandler('+ ButtonTypes.CANCEL +')"">';
            }
            if(btnVal & ButtonTypes.OK){
                myBtns += '<input class="svrMsgBtn" type="button" value=' + _i18n.ok + ' ng-click="svrClickHandler('+ ButtonTypes.OK +')">';
            }
            return myBtns;
        }

        function _initAlertI18nData(){
            if(_lang == 'zh-cn' || _lang == 'zh_cn'){
                _i18n = {
                    'yes': '是',
                    'no': '否',
                    'ok': '确定',
                    'cancel': '取消'
                }
            }
            else{
                _i18n = {
                    'yes': 'YES',
                    'no': 'NO',
                    'ok': 'OK',
                    'cancel': 'CANCEL'
                }
            }
        }

        function _refreshAlertI18nData(){
            if(!alertService.scope.i18n) return;
            _i18n.yes = alertService.scope.i18n.alert_yes ? alertService.scope.i18n.alert_yes : _i18n.yes;
            _i18n.no = alertService.scope.i18n.alert_no ? alertService.scope.i18n.alert_no : _i18n.no;
            _i18n.ok = alertService.scope.i18n.alert_ok ? alertService.scope.i18n.alert_ok : _i18n.ok;
            _i18n.cancel = alertService.scope.i18n.alert_cancel ? alertService.scope.i18n.alert_cancel : _i18n.cancel;
        }

        function _clickHandler(val){           
            EventService.broadcast(_svrMsgBoxId, "hide");
            $('#'+_svrMsgBoxId).remove();
            if(_callback!=null){
                _callback(val);
            }
        }

        function _popupWindow(modal, template){
            if(alertService.scope == undefined){
                console.error('请在调用弹出提示框前，调用Alert.scope=scope完成scope的初始化！');
                return;
            }
            
            if(!document.getElementById(_svrMsgBoxId)){//不存在则添加，alert界面唯一
                $(document.body).append($(template).get(0));

                var appScope = Utils.findAppScope(alertService.scope);
                appScope.svrClickHandler = _clickHandler;
                $compile($('#'+_svrMsgBoxId))(alertService.scope);

                var pos = {
                    x: ($(window).width() -  $('#'+_svrMsgBoxId).width())/2,
                    y: ($(window).height() -  $('#'+_svrMsgBoxId).height())/2
                };
                var myModal = Utils.isTrue(modal, true)?'modal':'none_modal';
                EventService.broadcast(_svrMsgBoxId, myModal, pos); 
            }
        }

        function _initializeTemplate(title, imgSource, message, button, modal){
            var myTitle = title?title:'&nbsp';
            var myMessage = message?message:'&nbsp';
            var myBtnTmpl = _getBtnsTemplate(button);
            var template = _getTemplate(myTitle, imgSource, myMessage, myBtnTmpl);
            _popupWindow(modal,template);
        }

        function _initBasicInfo(callback){
            _refreshAlertI18nLang();//今后会废弃lang属性，默认中文,locale覆盖
            _initAlertI18nData();
            _refreshAlertI18nData();

            _callback = callback?callback:null;
            _svrMsgBoxId = Utils.createUniqueId("__svrMsgBox__"); 
        }

        this.warn = function(message, title, button, callback, modal){
            _initBasicInfo(callback);
            var myButton = button?button:(ButtonTypes.OK);//48*48
            var myImgSrc = "data:image/png;base64,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";
            _initializeTemplate(title, myImgSrc, message, myButton, modal);
        }

        this.error = function(message, title, button, callback, modal) {
            _initBasicInfo(callback);
            var myButton = button?button:(ButtonTypes.OK);
            var myImgSrc = "data:image/png;base64,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";
            _initializeTemplate(title, myImgSrc, message, myButton, modal);
        }

        this.info = function(message, title, button, callback, modal){
            _initBasicInfo(callback);
            var myButton = button?button:(ButtonTypes.OK);//48*48
            var myImgSrc = "data:image/png;base64,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";
            _initializeTemplate(title, myImgSrc, message, myButton, modal);
        }

        this.confirm = function(message, title, button, callback, modal){
            _initBasicInfo(callback);
            var myButton = button?button:(ButtonTypes.YES+ButtonTypes.NO+ButtonTypes.CANCEL);//48*48
            var myImgSrc = "data:image/png;base64,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";
            _initializeTemplate(title, myImgSrc, message, myButton, modal);
        }

        this.setLang = function(lang){
            _lang = lang.toLowerCase();
        }
         var   uiDialog=document.getElementsByClassName('div.ui-Dialog')[0];
    console.log(uiDialog)
    }]);
    var   uiDialog=document.getElementsByClassName('div.ui-Dialog')[0];
    console.log(uiDialog)

});
