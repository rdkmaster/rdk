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

        function _getTemplate(title, imgSrc, message, btnTmpl,close){
            return '<div id='+ _svrMsgBoxId +' class="rdk-alert-svrMsgBox" rdk_modal="hide">'+
                '<div class="rdk-alert-wrapBox">'+
                    '<div class="rdk-alert-titleLine">'+
                    title + '<span ng-click="svrClickHandler()" ng-show='+ close +'></span>' +
                    '</div>'+
                    '<div class="rdk-alert-tableImg">' +
                        '<img src=' + imgSrc + '>'+
                    '</div>'+
                    '<p class="rdk-alert-tableMsg"><span>'+ message +'</span></p>'+
                    '<div class="rdk-alert-btnLine">'+
                        btnTmpl+
                    '</div>'+
                '</div>'+
            '</div>';
        }

        function _getBtnsTemplate(btnVal){
            var myBtns = '';
            if(btnVal & ButtonTypes.YES){
                myBtns += '<input class="rdk-alert-svrMsgBtn rdk-alert-yes" type="button" value=' + _i18n.yes + ' ng-click="svrClickHandler('+ ButtonTypes.YES +')">';
            }
            if(btnVal & ButtonTypes.NO){
                myBtns += '<input class="rdk-alert-svrMsgBtn rdk-alert-no" type="button" value=' + _i18n.no + '  ng-click="svrClickHandler('+ ButtonTypes.NO +')">';
            }
            if(btnVal & ButtonTypes.CANCEL){
                myBtns += '<input class="rdk-alert-svrMsgBtn rdk-alert-cancel" type="button" value=' + _i18n.cancel + ' ng-click="svrClickHandler('+ ButtonTypes.CANCEL +')"">';
            }
            if(btnVal & ButtonTypes.OK){
                myBtns += '<input class="rdk-alert-svrMsgBtn rdk-alert-ok" type="button" value=' + _i18n.ok + ' ng-click="svrClickHandler('+ ButtonTypes.OK +')">';
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

        function _initializeTemplate(title, imgSource, message, button, modal,close){
            var myTitle = title?title:'&nbsp';
            var myMessage = message?message:'&nbsp';
            var myClose = Utils.isTrue(close, true);
            var myBtnTmpl = _getBtnsTemplate(button);
            var template = _getTemplate(myTitle, imgSource, myMessage, myBtnTmpl,myClose);
            _popupWindow(modal,template);
        }

        function _initBasicInfo(callback){
            _refreshAlertI18nLang();//今后会废弃lang属性，默认中文,locale覆盖
            _initAlertI18nData();
            _refreshAlertI18nData();
            _callback = callback?callback:null;
            _svrMsgBoxId = Utils.createUniqueId("__svrMsgBox__"); 
        }

        this.warn = function(message, title, button, callback, modal,close){
            _initBasicInfo(callback);
            var myButton = button?button:(ButtonTypes.OK);//48*48
            var myImgSrc = "data:image/png;base64,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";
            _initializeTemplate(title, myImgSrc, message, myButton, modal,close)
        }

        this.error = function(message, title, button, callback, modal,close) {
            _initBasicInfo(callback);
            var myButton = button?button:(ButtonTypes.OK);
            var myImgSrc = "data:image/png;base64,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";
            _initializeTemplate(title, myImgSrc, message, myButton, modal,close);
        }

        this.info = function(message, title, button, callback, modal,close){
            _initBasicInfo(callback);
            var myButton = button?button:(ButtonTypes.OK);//48*48
            var myImgSrc = "data:image/png;base64,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";
            _initializeTemplate(title, myImgSrc, message, myButton, modal,close);
        }

        this.confirm = function(message, title, button, callback, modal,close){
            _initBasicInfo(callback);
            var myButton = button?button:(ButtonTypes.YES+ButtonTypes.NO+ButtonTypes.CANCEL);//48*48
            var myImgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAOmSURBVHja7JldSFRBFMd/ZeVXKiyYS2ZRBoKgYIWwTwlh+mQJBRGRQpEQQg9CL4VQ0EuQBEWksE9ZBEWaEBULoRBdgtLYYGFhNUwLZGFRV1dNFnuZtevu3NvcjxWC/i8X7seZ354558yZ2S1ra2v8C9rKP6JtAKcehO1+7wMagRpgP+ARV4AwsCCuX4BXQMjqAM8vV/0BtSgP0AlcAspN3qsS18PAWeC2APUDfeJHZGXq84EbwKS4ltv4kdXAHWGjMxug1cAY0A3sdCHkPMA94APgdQu0Gfiom0o35RMOqHcKegV47ZIXjeQFhoFWu6DtwN1Nqj75wGOReJZA64HeTS6V+cBLo5iVlaedwFNgh+oIJ+s8VO7Kw1dZtOH+4kqSgdEYwekEE9FlFVPlYuwGFdBruqJtqto9BXQ0eCkr3i59XpibwzlfKQCDYzH6taiK2aOiRveZTb1XJJASZHdLhSGkzOspaAV1p89oOminiBVTFebm0NW0W/os5bnFlaQUtnZPgWoItBuB5qQ/NFJjdQmFuTkZ8Xj12ST9WpTBsRht/og0Ln0Hi1S9esEI1Ke6LFbuysu4NzAaywB7ODyT8V5ZsXKO1gN7ZaDNqhbSvQkQCM0pfasa06nJk4EeVv1ai8TTIGelMdl6yJNxT7FM6b2aUZ5qVL8OhGZZWEmue2dwLJbxTkdDWUZdBQhOJayAVslAvVYsaONx49rSUiHNbm08TiA0a2WY8vSpzxdZ71hGkMHphDS5/qISs5XJts75Sg0hbw5NOd8zAUtA0olXy4q3c7LOI43nXuueTGlOlvXfHXXAksTRxuNOIAF+yEDDuKyB0ZhTE2EZqOYm5OJK0mrNlOm9DPSdE4vaeHxD0Vddqf6iEVnWayJO99qxODO/Sps/4uakjOjzRg+aFIcDN+xmfVfTbg6U5q2XpDtvf0qXVkX5zfrR+1ZPMPQ1NAWZaqwbq0vsQn4DnpiBxoBbdizLOioHui5m2HQX2mPnMCs4tei0U1rPw3RvGi2hv4DTwCeVbYl+CzIzv7reUU1ElwlOJ6xCRoAzqttlhEfPAC+sLKtmHZXicnlChJ+lk5IhoCM9VrKkJTGLIbtnT35hYCGLkFHgmIhN24dkAAPAEeBrFiADQJ3K8q16PhoWBruMYshGV3QeOK7vkNwATa1cPcA+AWy1iUkCb4CLwAHgkZ3G2YoWBHCP2Ge1iDOBGqBU1ytERCZ/FlMc0DfCVrXl//9MLuv3APDoDGcEahGHAAAAAElFTkSuQmCC";
            _initializeTemplate(title, myImgSrc, message, myButton, modal,close);
        }

        this.setLang = function(lang){
            _lang = lang.toLowerCase();
        }
    }]);

});
