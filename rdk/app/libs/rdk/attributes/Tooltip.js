define(['jquery', 'rd.core', 'css!rd.styles.Bootstrap', 'rd.controls.Module'], function() {
    var tooltipModule = angular.module('rd.attributes.Tooltip', ['rd.core', 'rd.controls.Module']);
    tooltipModule.constant('PositionTypes', {
        TOP_LEFT: 'top-left',
        TOP: 'top',
        TOP_RIGHT: 'top-right',
        RIGHT_TOP: 'right-top',
        RIGHT: 'right',
        RIGHT_BOTTOM: 'right-bottom',
        BOTTOM_RIGHT: 'bottom-right',
        BOTTOM: 'bottom',
        BOTTOM_LEFT: 'bottom-left',
        LEFT_BOTTOM: 'left-bottom',
        LEFT: 'left',
        LEFT_TOP: 'left-top'
    });
    tooltipModule.directive('rdkTooltip', ['PositionTypes', 'Utils', '$compile', '$rootScope',
        function (PositionTypes, Utils, $compile, $rootScope) {
            return {
                restrict: 'A',
                compile: function(tEle, tAttrs) {
                    return {
                        post: _link
                    }
                }
            };
            function _link(scope, element, attrs)
            {
                if( !attrs.rdkTooltip) {
                    console.error('creating tooltip by DOM: invalid rdk_tooltip!');
                    return;
                }
                var content = Utils.getValue(scope.rdkTooltip, attrs.rdkTooltip, '');
                var placement = Utils.getValue(scope.rdkTooltipPlacement, attrs.rdkTooltipPlacement, 'top');
                var trigger = Utils.getValue(scope.rdkTooltipTrigger, attrs.rdkTooltipTrigger, '');

                if(!PositionTypes[placement.replace(/-{1}/g, '_').toUpperCase()]) {
                    console.error('creating tooltip by DOM: invalid rdk_tooltip_placement:'+placement+'!');
                    return;
                }

                var tooltipID = Utils.createUniqueId('tooltip_'),
                    contentID ='content-'+tooltipID,

                  tooltipHtml = '<div class="tooltip fade" role="tooltip" id="'+tooltipID+'"> \
                  <div class="tooltip-arrow"></div> \
                  <div class="tooltip-inner">\
                    <rdk_module id="'+contentID+'" url="'+content+'" ready="moduleReady"></rdk_module>\
                  </div> \
                </div>',$tip;

                $(tooltipHtml).insertAfter(element);
                $tip = $('#'+tooltipID);
                element.attr('id', 'element-'+tooltipID);

                $compile($tip)($rootScope.$$childHead);

                scope.moduleReady = function(event, data){
                    $tip = $('#'+data.split('-')[1]);
                    element = $('#element-'+data.split('-')[1]);
                    placement = element.attr('rdk_tooltip_placement');
                    setPosition(element, $tip, placement);
                }

                initEvents(trigger, element, $tip);
            }

            function initEvents(trigger, element, $tip) {
                var $element = $(element)

                var toggle = function () {
                    $tip.toggleClass('in');
                  },enter = function () {
                    $tip.addClass('in');
                  }, leave= function () {
                    $tip.removeClass('in');
                };

                if (trigger == 'click') {
                    $element.on('click', toggle)
                } else if (trigger != 'manual') {
                    var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
                    var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
                    $element.on(eventIn, enter);
                    $element.on(eventOut, leave);
                }
            }

            function getPosition ($element) {
                var el = $element[0]
                return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
                    width: el.offsetWidth,
                    height: el.offsetHeight
                }, $element.offset())
            }


            function setPosition($element, $tip, placement) {
                var $parent  = $element.parent();
                var ePos     = getPosition($element),
                tPos         = getPosition($tip),
                actualWidth  = $tip[0].offsetWidth,
                actualHeight = $tip[0].offsetHeight,
                orgPlacement = placement,
                docScroll    = document.documentElement.scrollTop || document.body.scrollTop,
                parentWidth  = $parent.outerWidth(),
                parentHeight = $parent.outerHeight(),
                parentLeft   = $parent.offset().left;

                //TODO: 判断是否有足够空间,没有则对向替换

                var direct = placement.split('-');
                $tip.addClass(direct[0]);

                var calculatedOffset = getCalculatedOffset (placement, ePos, tPos, actualWidth, actualHeight);
                $tip.css(calculatedOffset);

            }


            function getCalculatedOffset (placement, ePos, tPos, actualWidth, actualHeight) {
                var offset = {
                    top: ePos.top + ePos.height/2 - actualHeight/2,
                    left: ePos.left + ePos.width/2 - actualWidth/2};
                var direct = placement.split('-');

                if (direct[0] === 'top') {
                    offset.top = ePos.top - actualHeight - 10;
                } else if (direct[0] === 'right') {
                    offset.left = ePos.left + ePos.width;
                } else if (direct[0] === 'bottom') {
                    offset.top = ePos.top + ePos.height;
                } else if (direct[0] === 'left') {
                    offset.left = ePos.left - actualWidth - 10;
                }

                if (direct[1] === 'top') {
                    offset.top = ePos.top;
                } else if (direct[1] === 'right') {
                    offset.left = ePos.left + ePos.width - actualWidth;
                } else if (direct[1] === 'bottom') {
                    offset.top = ePos.top + ePos.height - actualHeight;
                } else if (direct[1] === 'left') {
                    offset.left = ePos.left;
                }
                return offset;
            }
        }
      ]);

});
