define(['angular', 'rd.core', 'jquery-ui', 'rd.controls.Module', 'css!rd.styles.FontAwesome', 'css!rd.styles.PopupService'], function(){
    var popupModule = angular.module('rd.services.PopupService', []);
    popupModule.service('PopupService', ['$rootScope', 'EventService', 'EventTypes', 'Utils', '$compile',function($rootScope, EventService, EventTypes, Utils, $compile){

        this.popup = function(source, initData, moduleStatus, effect, dialogID){
            var moduleFractionStr = '<rdk_module load_on_ready="false" url=' + source + '></rdk_module>';
            var moduleHtml = $(moduleFractionStr);
            var popupModuleID = Utils.createUniqueId('popupModule_');
            moduleHtml.attr('id', popupModuleID);
            $(document.body).append(moduleHtml);
            $compile($('#'+popupModuleID))($rootScope.$$childHead);  

            $('#'+popupModuleID).css({'display': 'none'});//避免load进来时刹那的显现
            EventService.register(popupModuleID, EventTypes.READY, _readyHandler);
            rdk[popupModuleID].loadModule(initData); 

            var retModuleID = dialogID ? dialogID : popupModuleID;
            return retModuleID;

            function _readyHandler(){
                EventService.remove(popupModuleID, EventService, _readyHandler);
                var sampleHtml = $('#'+popupModuleID).children();
                var myTitle = sampleHtml.attr('caption') || '';
                var myIcon = sampleHtml.attr('icon') || '';
                var status = Utils.isTrue(moduleStatus, true);
                var myEffect = effect || 'scale';
                $('#'+popupModuleID).dialog({
                    modal: status,
                    show: {effect: myEffect},  //blind,clip,drop,explode,fold,puff,slide,scale,size,pulsate
                    hide: {effect: myEffect},  
                    title: myTitle,
                    close: function(ev, ui) {
                        _destroyPopupModule(popupModuleID);
                    },
                    open: function () {
                        $(this).parent().children(".ui-dialog-titlebar").prepend(myIcon);
                    }
                });
                _basicAppearanceHandler(popupModuleID, dialogID);
                $('#'+popupModuleID).css({'display': ''});
            }
        }

        this.removePopup = function(id){
            var popupModuleID = id;
            if(!$('#'+id).hasClass('ui-dialog-content')){
                popupModuleID = $('#'+id).children('.ui-dialog-content').attr('id');
            }
            _destroyPopupModule(popupModuleID);
        }

        function _destroyPopupModule(popupModuleID){
            $('#'+popupModuleID).remove();
            rdk[popupModuleID].destroyModule();
            delete rdk[popupModuleID];            
        }   

        function _basicAppearanceHandler(popupModuleID, dialogID){
            $('#'+popupModuleID).parent('.ui-dialog').addClass('rdk-popupservice-dialog');//外层
            $('#'+popupModuleID).siblings('.ui-dialog-titlebar').addClass('rdk-popupservice-titlebar');//标题
            $('#'+popupModuleID).addClass('rdk-popupservice-content');//内容
            if(!dialogID) return;
            $('#'+popupModuleID).parent('.ui-dialog').attr('id', dialogID);
        }
    }])
})






