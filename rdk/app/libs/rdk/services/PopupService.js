define(['angular', 'rd.core', 'jquery-ui', 'rd.controls.Module'], function(){
    var popupModule = angular.module('rd.services.PopupService', []);
    popupModule.service('PopupService', ['$rootScope', 'EventService', 'EventTypes', 'Utils', '$compile',function($rootScope, EventService, EventTypes, Utils, $compile){
        var popupService = this;

        this.popup = function(source, initData, moduleStatus){
            var moduleFractionStr = '<rdk_module load_on_ready="false" url=' + source + '></rdk_module>';
            var moduleHtml = $(moduleFractionStr);
            var mainModuleID = Utils.createUniqueId('mainModule_');
            moduleHtml.attr('id', mainModuleID);
            $(document.body).append(moduleHtml);
            $compile($('#'+mainModuleID))($rootScope.$$childHead);  

            EventService.register(mainModuleID, EventTypes.READY, _readyHandler);
            rdk[mainModuleID].loadModule(initData); 
            return mainModuleID;

            function _readyHandler(){
                EventService.remove(mainModuleID, EventService, _readyHandler);
                var status = Utils.isTrue(moduleStatus, true);
                $('#'+mainModuleID).dialog({
                    modal: status, 
                    close: function(ev, ui) {
                        _destroyPopupModule(mainModuleID);
                    }
                });
            }
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






