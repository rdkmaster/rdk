define(['angular', 'rd.core', 'jquery-ui', 'rd.controls.Module', 'css!rd.styles.FontAwesome', 'css!rd.styles.PopupService'], function(){
    var popupModule = angular.module('rd.services.PopupService', ['rd.controls.Module']);
    popupModule.service('PopupService', ['$rootScope', 'EventService', 'EventTypes', 'Utils', '$compile', '$timeout', function($rootScope, EventService, EventTypes, Utils, $compile, $timeout){

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

            return popupModuleID;

            function _readyHandler(){
                EventService.remove(popupModuleID, EventTypes.READY, _readyHandler);
                var sampleHtml = $('#'+popupModuleID).children();
                var myTitle = sampleHtml.attr('caption') || '';
                var myIcon = sampleHtml.attr('icon') || '';
                var myModal = Utils.isTrue(option.modal, true);
                var myEffect = option.effect || 'scale';
                var myShowTitle = Utils.isTrue(option.showTitle, true);
                var myWidth = option.width || 500;

                var myLeft = (option.x || (option.x ==0)) ? ('left+'+option.x) : (option.left ? ('left+'+option.left) : undefined);
                var myRight = (option.right || (option.right ==0)) ? ('right-'+option.right) : undefined;
                var myTop = (option.y || (option.y ==0)) ? ('top+'+option.y) : (option.top ? ('top+'+option.top) : undefined);
                var myBottom = (option.bottom || (option.bottom ==0)) ? ('bottom-'+option.bottom) : undefined;
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
                    width: myWidth,
                    position: {
                        my: positionX+' '+positionY,
                        at: atX+' '+atY,
                        of: window
                    },
                    close: function(ev, ui){
                        _destroyPopupModule(popupModuleID);
                        EventService.broadcast(popupModuleID, EventTypes.CLOSE);
                    },
                    open: function(){
                        var $myIcon = $("<i></i>");
                        $myIcon.addClass(myIcon);
                        if(myShowTitle){
                            ($(this).parent().children(".ui-dialog-titlebar").prepend($myIcon));
                        }
                        else{
                            $(this).parent().children(".ui-dialog-titlebar-close").remove();
                            $(this).parent().children(".ui-dialog-titlebar").addClass('rdk-popupservice-hidetitlebar');
                        }                       
                    }
                });

                _basicAppearanceHandler(popupModuleID, option.id);
                $timeout(function(){
                    _positionHandler(popupModuleID, option);
                }, 0);

                $('#'+popupModuleID).css({'display': ''});
            }
        }

        this.removePopup = function(id) {
            var popupModuleID = id;
            if(!document.getElementById(popupModuleID)) {
                console.warn("弹出框[id=%s]不存在！", popupModuleID);
                return;
            }
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
            $('#'+popupModuleID).parent('.ui-dialog').attr('id', dialogID);//id仅用于样式覆盖
        }

        function _positionHandler(popupModuleID, option){
            var dialogWidth = $('#'+popupModuleID).parent('.ui-dialog').width();
            var dialogHeight = $('#'+popupModuleID).parent('.ui-dialog').height();
            var myLeft = option.x ? (option.x) : (option.left ? (option.left) : undefined);
            var myRight = option.right ? (option.right) : undefined;
            var myTop = option.y ? (option.y) : (option.top ? (option.top) : undefined);
            var myBottom = option.bottom ? (option.bottom) : undefined;
            var positionX = myLeft ? myLeft : (myRight ? ($(window).width()-myRight-dialogWidth) : ($(window).width()-dialogWidth)/2);
            var positionY = myTop ? myTop : (myBottom ? ($(window).height()-myBottom-dialogHeight) : ($(window).height()-dialogHeight)/2);
            $('#'+popupModuleID).parent('.ui-dialog').css({left: positionX, top: positionY});
        }
    }])
})






