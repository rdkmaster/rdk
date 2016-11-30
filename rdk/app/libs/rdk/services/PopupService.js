define(['angular', 'rd.core', 'jquery-ui', 'rd.controls.Module', 'css!rd.styles.FontAwesome', 'css!rd.styles.PopupService'], function(){
    var popupModule = angular.module('rd.services.PopupService', []);
    popupModule.service('PopupService', ['$rootScope', 'EventService', 'EventTypes', 'Utils', '$compile',function($rootScope, EventService, EventTypes, Utils, $compile){

        this.popup = function(module, initData, option){
            if(option == undefined) option = {};
            var moduleFractionStr = '<rdk_module load_on_ready="false"></rdk_module>';
            var moduleHtml = $(moduleFractionStr);
            var popupModuleID = Utils.createUniqueId('popupModule_');
            moduleHtml.attr('id', popupModuleID);
            $(document.body).append(moduleHtml);
            $compile($('#'+popupModuleID))($rootScope.$$childHead);  

            $('#'+popupModuleID).css({'display': 'none'});//避免load进来时刹那的显现

            EventService.register(popupModuleID, EventTypes.READY, _readyHandler);
            rdk[popupModuleID].loadModule(initData, module, option.controller); 

            var retModuleID = option.id ? option.id : popupModuleID;
            return retModuleID;

            function _readyHandler(){
                EventService.remove(popupModuleID, EventTypes.READY, _readyHandler);
                var sampleHtml = $('#'+popupModuleID).children();
                var myTitle = sampleHtml.attr('caption') || '';
                var myIcon = sampleHtml.attr('icon') || '';
                var myModal = Utils.isTrue(option.modal, true);
                var myEffect = option.effect || 'scale';
                var myShowTitle = Utils.isTrue(option.showTitle, true);

                var myLeft = option.x ? ('left+'+option.x) : (option.left ? ('left+'+option.left) : undefined);
                var myRight = option.right ? ('right-'+option.right) : undefined;
                var myTop = option.y ? ('top+'+option.y) : (option.top ? ('top+'+option.top) : undefined);
                var myBottom = option.bottom ? ('bottom-'+option.bottom) : undefined;
                var positionX = (myLeft ? myLeft : myRight) || 'center';
                var positionY = (myTop ? myTop : myBottom) || 'center';
                var myX = myLeft ? 'left' : (myRight ? 'right' : undefined);
                var myY = myTop ? 'top' : (myBottom ? 'bottom' : undefined);
                var atX = myX || 'center';
                var atY = myY || 'center';

                $('#'+popupModuleID).dialog({
                    modal: myModal,
                    show: {effect: myEffect},  //blind,clip,drop,explode,fold,puff,slide,scale,size,pulsate
                    hide: {effect: myEffect},  
                    title: myTitle,
                    position: {
                        my: positionX+' '+positionY,
                        at: atX+' '+atY,
                        of: window,
                        collision: 'fit',
                        using: function(pos) {
                            var offsetTop = $(this)[0].offsetTop;
                            var offsetLeft = $(this)[0].offsetLeft;
                            $(this).css({'top': pos.top+offsetTop, 'left': pos.left+offsetLeft});
                        }
                    },
                    close: function(ev, ui){
                        _destroyPopupModule(popupModuleID);
                    },
                    open: function(){
                        myShowTitle ? ($(this).parent().children(".ui-dialog-titlebar").prepend(myIcon)) : ($(this).parent().children(".ui-dialog-titlebar").addClass('rdk-popupservice-hidetitlebar'));
                    }
                });

                _basicAppearanceHandler(popupModuleID, option.id);

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






