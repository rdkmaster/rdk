define(['angular', 'rd.core', 'jquery-ui', 'rd.controls.Module'], function(){
    var popupModule = angular.module('rd.services.PopupService', []);
    popupModule.service('PopupService', ['EventService', 'EventTypes', 'Utils', '$compile',function(EventService, EventTypes, Utils, $compile){
        var popupService = this;

        this.popup = function(moduleSource, initData, moduleStatus){
            if(popupService.scope == undefined) return;
            var moduleFractionStr = Utils.getHtmlFraction(moduleSource);
            var moduleHtml = $(moduleFractionStr);
            var mainModuleID = Utils.createUniqueId('mainModule_');
            moduleHtml.attr('id', mainModuleID);
            $(document.body).append(moduleHtml);
            $compile($('#'+mainModuleID))(popupService.scope);  

            rdk[mainModuleID].loadModule(initData); 

            EventService.register(mainModuleID, EventTypes.READY, function(event, data){
                var status = Utils.isTrue(moduleStatus, true);
                $('#'+mainModuleID).dialog({
                    modal: status, 
                    close: function(ev, ui) {
                        _destroyPopupModule(mainModuleID);
                    }
                });
            })

            return mainModuleID;
        }

        this.removePopup = function(moduleID){
            _destroyPopupModule(moduleID);
        }

        function _destroyPopupModule(moduleID){
            $('#'+moduleID).remove();
            rdk[moduleID].destroyModule();
            delete rdk[moduleID];            
        }
    }])
})






