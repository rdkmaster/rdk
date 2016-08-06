define(['rd.services.EventService', 'jquery','jquery-ui'], function() {
    var dsModule = angular.module('rd.attributes.modal', ['rd.services.EventService']);

    dsModule.directive('rdkModal', ['EventService', 'Utils', function(EventService, Utils) {
        return {
            restrict: 'A',
            compile: function(tElement, tAttrs) {
                return {
                    post: function(scope, iElement, iAttrs) {
                        var modalId = iAttrs['id'] || Utils.createUniqueId('modal_frame_');
                        EventService.register(modalId, 'modal', _handler);
                        EventService.register(modalId, 'hide', _handler);
                        EventService.register(modalId, 'none_modal', _handler);
                        EventService.register(modalId, 'fixed', _handler);

                        modalProcess(iAttrs.rdkModal || 'modal', modalId);

                        function _handler(event, data) {
                            iAttrs.modal = event.name;
                            modalProcess(event.name, modalId, data);
                        }
                    }
                };
            }
        };

        function modalProcess(modalValue, modalId, data) {
            var jqDom = $('#' + modalId);
            var modalObj = {
                'modal': function() {
                    _hide();
                    widgetProcess(modalId, true, data);
                },
                'none_modal': function() {
                    _hide();
                    widgetProcess(modalId, false, data);
                },
                'fixed': function() {
                    _hide();
                    var isShown = jqDom.css('display');
                    if (isShown === 'none') {
                        isShown = jqDom.css({ 'display': 'block', 'border': '1px solid #ddd', 'border-radius': '5px', 'box-shadow': '1px 1px 10px black', 'padding': '10px', 'margin': '10px' });
                    }
                },
                'hide': _hide
            };

            if (typeof modalObj[modalValue] !== 'function') {
                console.log('Invalid modalValue');
                return;
            }

            return modalObj[modalValue]();

            function _hide() {
                try {
                    jqDom.css('display', 'none');
                    jqDom.dialog('destroy');
                } catch (e) {}
            }
        };

        function widgetProcess(modalId, modalFlag, data) {
            var coordinateX = undefined;
            var coordinateY = undefined;
            var coordinateZ = undefined;
           
            var jqDom = $('#' + modalId);
            /*取基本宽高*/
            var jqDomWidth = parseInt(jqDom.width(), 10);
            var jqDomHeight = parseInt(jqDom.height(), 10);

            jqDom.dialog({
                resizable: false,
                modal: modalFlag,
            });
            $('.ui-dialog-titlebar').remove();//去标题
            jqDom.parent().removeClass('ui-widget');//去样式

            /*开始设置样式*/
            jqDom.css({ 
                        'top': '', 'left': '',
                        'border': '1px solid #ddd', 
                        'border-radius': '5px', 
                        'box-shadow': '1px 1px 10px black', 
                        'padding': '10px', 
                        'margin': '0' });

            var paddingLen = parseInt(jqDom.css('padding'), 10);
            var borderLen = parseInt(jqDom.css('border'), 10);

            var docHeight = "";
            var docWidth = "";
            var relaTopSize = "";
            var relaLeftSize = "";
            /*取绝对位置*/
            if (data && data.hasOwnProperty("dom")) {
                docHeight = $(data["dom"]).height();
                docWidth = $(data["dom"]).width();
                relaTopSize = getPostion(data["dom"])[0];//y
                relaLeftSize = getPostion(data["dom"])[1];//x
            } else { //{x:??,y:??,z:??} 或者 不设置
                docHeight = $(document).height();
                docWidth = $(document).width();
            }
            /*取相对位置*/
            if (data != undefined) {
                if (data.hasOwnProperty("dom")) {
                    if (angular.isArray(data["offSet"])) {
                        coordinateX = data["offSet"][0];
                        coordinateY = data["offSet"][1];
                    } else {
                        if (data["offSet"] == "leftTop") {
                            coordinateX = 0;
                            coordinateY = 0;
                        }
                        if (data["offSet"] == "rightTop") {
                            coordinateX = docWidth - (jqDomWidth + (paddingLen + borderLen) * 2); //docWidth - jqDomWidth;
                            coordinateY = 0;
                        }
                        if (data["offSet"] == "center") {
                            coordinateX = (docWidth - (jqDomWidth + (paddingLen + borderLen) * 2)) / 2; //(docWidth - jqDomWidth)/2;
                            coordinateY = (docHeight - (jqDomHeight + (paddingLen + borderLen) * 2)) / 2; //(docHeight - jqDomHeight)/2 - 20;                          
                        }
                        if (data["offSet"] == "leftBottom") {
                            coordinateX = 0;
                            coordinateY = docHeight - (jqDomHeight + (paddingLen + borderLen) * 2); //docHeight - jqDomHeight -40;                          
                        }
                        if (data["offSet"] == "rightBottom") {
                            coordinateX = docWidth - (jqDomWidth + (paddingLen + borderLen) * 2); //docWidth - jqDomWidth;
                            coordinateY = docHeight - (jqDomHeight + (paddingLen + borderLen) * 2); //docHeight - jqDomHeight -40; 
                        }
                    }
                } else {
                    coordinateX = data["x"];
                    coordinateY = data["y"];
                    coordinateZ = data["z"];
                }
            } else {
                coordinateY = (docHeight - (jqDomHeight + (paddingLen + borderLen) * 2)) / 2;
                coordinateX = (docWidth - (jqDomWidth + (paddingLen + borderLen) * 2)) / 2;
            }

            /*计算真正的绝对位置*/
            var topSize = relaTopSize + coordinateY;
            var leftSize = relaLeftSize + coordinateX;
            var zIndex = coordinateZ || (10000 + $(".ui-dialog").length);//多级弹出

            jqDom.parent().css({ 
                        'position': 'fixed',
                        'width': jqDomWidth + (paddingLen + borderLen) * 2 + 'px', 
                        'height': jqDomHeight + (paddingLen + borderLen) * 2 + 'px',
                        'z-index': zIndex, 
                        'top': topSize + 'px', 
                        'left': leftSize + 'px',
                        'padding': 0, 'margin': 0});            
        }

        function getPostion(obj) {
            var arr = [];
            var w = obj.offsetWidth,
                h = obj.offsetHeight;
            //从目标元素开始向外遍历，累加top和left值
            for (var t = obj.offsetTop, l = obj.offsetLeft; obj = obj.offsetParent;) {
                t += obj.offsetTop;
                l += obj.offsetLeft;
            }
            arr.push(t, l);
            return arr;
        }
    }]);
});
