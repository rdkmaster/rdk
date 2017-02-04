define(['angular', 'rd.core', 'jquery-ui', 'rd.controls.Module',  'css!rd.styles.FontAwesome',
    'css!rd.styles.NotifyService'], function(){
    var notifyModule = angular.module('rd.services.NotifyService', ['rd.controls.Module']);
    notifyModule.constant("PositionTypes", {
        left:{
            left: 20,
            top: 20
        },
        right: {
            right: 20,
            top: 20
        }
    });

    notifyModule.service('NotifyService', ['PositionTypes', '$rootScope','EventService',
        'EventTypes', 'Utils', '$compile', '$timeout',
        function(PositionTypes, $rootScope, EventService, EventTypes, Utils, $compile, $timeout){

            /**
             *
             * @param message
             * {
             *      message: '',
             *      type: ''
             * }
             * @param option
             * {
             *      position: left/right, right as default
             *      type: url/text, text as default
             *      initData: 加载模块时的提示文本(可选)
             *      controller: 控制器(可选)
             * }
             */
        this.notify = function(message, option){
            //支持仅传入字符串
            if(message == undefined) {
                message = {message: ''}
            }
            if (typeof message === 'string') {
                message = {message: message};
            }
            if(option == undefined) {
                option = {
                    position: 'right',
                    type: 'text',
                    initData: 'Loading Module ...'
                };
            }

            var type = option.type || 'text';
            var notifyModuleID = Utils.createUniqueId('notifyModule_');

            if (type === 'url') {
                var moduleFractionStr = '<rdk_module load_on_ready="false"></rdk_module>';
                var notifyModule = $(moduleFractionStr);
                notifyModule.attr({
                    'id': notifyModuleID,
                    'class': 'notify-body'
                });
                createDialog(notifyModuleID);
                notifyModule.appendTo($('#Notify_' + notifyModuleID ))
                $compile($('#Notify_'+notifyModuleID))($rootScope.$$childHead);

                notifyModule.css({'display': 'none'});//避免load进来时刹那的显现

                EventService.register(notifyModuleID, EventTypes.READY, _readyHandler);
                rdk[notifyModuleID].loadModule(option.initData, message.message, option.controller);

                return notifyModuleID;

                function _readyHandler(){
                    EventService.remove(notifyModuleID, EventTypes.READY, _readyHandler);
                }
            } else {
                createDialog (notifyModuleID);
            }

            function createDialog (id) {
                var titleHtml = '', bodyHtml = '', dialog;
                if (message.title) {
                    titleHtml = '<div class="notify-header"><h4>' + message.title +
                      '</h4><span class="close fa fa-close" id="close_notify_'+id+'"></span></div>';
                }
                if (type === 'text' || type === 'html') {
                    bodyHtml = '<div class="notify-body">' + message.message + '</div>';
                }
                console.info(style);
                dialog = $('<div id="Notify_' + id + '" class="notify">'+
                  titleHtml + bodyHtml +'</div>').appendTo($(document.body));
                var style = $.extend({position:'absolute'}, calPosition(id));
                if(dialog) dialog.css(style);

                $('#close_notify_'+id).click(function () {
                    destroyNotify(id);
                })
            }

            function calPosition (moduleID) {
                var pos = option.position || 'right', location = $.extend({}, PositionTypes[pos]),
                  brothers = $('#Notify_' + moduleID).prevAll('.notify'), temp= 0;

                function getNumFromStr(str) {
                    return parseInt(str.replace(/[^0-9]/g, ''))
                }

                for (var i= 0, bLen= brothers.length; i< bLen; i++){
                    temp = $(brothers[i]).css(pos);
                    if (temp) {
                        temp = getNumFromStr(temp);
                        // location[pos] = temp + 10;
                        temp = getNumFromStr($(brothers[i]).css('top'));
                        location.top = temp + 40;
                        break;
                    }
                }

                return location;
            }
        };

       function destroyNotify(id) {
           var notifyModuleID = id;
           if(!document.getElementById('Notify_'+ notifyModuleID)) {
               console.warn("弹出框[id=%s]不存在！", 'Notify_'+ notifyModuleID);
               return;
           }
           _destroyNotifyModule(notifyModuleID);
       }

        this.removeNotify = function(id) {
            destroyNotify(id);
        };

        function _destroyNotifyModule(notifyModuleID){
            $('#Notify_'+notifyModuleID).remove();
            if (rdk[notifyModuleID]) {
                rdk[notifyModuleID].destroyModule();
                delete rdk[notifyModuleID];
            }
        }
    }])
});






