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
                    return;
                }
                var content = Utils.getValue(scope.rdkTooltip, attrs.rdkTooltip, '');
                var placement = Utils.getValue(scope.rdkTooltipPlacement, attrs.rdkTooltipPlacement, 'top');
                var trigger = Utils.getValue(scope.rdkTooltipTrigger, attrs.rdkTooltipTrigger, '');

                if(!PositionTypes[placement.replace(/-{1}/g, '_').toUpperCase()]) {
                    console.error('creating tooltip by DOM: invalid rdk_tooltip_placement:'+placement+'!');
                    return;
                }

                var closeTagReg = /<([a-z]+)(\s*\w*?\s*=\s*".+?")*(\s*?>[\s\S]*?(<\/\1>)+|\s*\/>)/i;
                var fileReg = /\.\w+$/;
                if((!closeTagReg.test(content)) && (!fileReg.test(content))){
                    var contentStr = "<div></div>";
                    content = $(contentStr).text(content)[0].outerHTML;
                }

                var $tip;
                var tooltipID = Utils.createUniqueId('tooltip_');
                var contentID ='content-'+tooltipID;
                var tooltipHtml = '<div class="tooltip fade" role="tooltip" id="' + tooltipID + '"> \
                  <div class="tooltip-arrow"></div> \
                  <div class="tooltip-inner">\
                    <rdk_module id="' + contentID + '" url="' + escapeString(content) + '" ready="moduleReady">\
                    </rdk_module>\
                  </div> \
                </div>';

                $(tooltipHtml).insertAfter(element);
                $tip = $('#'+tooltipID);
                element.attr('id', 'element-'+tooltipID);

                var appScope = Utils.findAppScope(scope);
                $compile($tip)(appScope);

                scope.moduleReady = function(event, data){
                    $tip = $('#'+data.split('-')[1]);
                    element = $('#element-'+data.split('-')[1]);
                    placement = element.attr('rdk_tooltip_placement') || 'top';
                    setPosition(element, $tip, placement);
                    $tip.css('display', 'none');
                }

                initEvents(trigger, element, $tip);
            }

            function initEvents(trigger, element, $tip) {
                var $element = $(element);
                if (trigger == 'click') {
                    $element.on('click', function () {
                        if ($tip.hasClass('in')) {
                            hideTip();
                        } else {
                            showTip();
                        }
                    });
                } else if (trigger != 'manual') {
                    var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin';
                    var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
                    $element.on(eventIn, showTip);
                    $element.on(eventOut, hideTip);
                }

                var inTimer = -1, outTimer = -1;
                function showTip() {
                    $tip.css('display', 'block');
                    clearTimeout(inTimer);
                    clearTimeout(outTimer);
                    inTimer = setTimeout(function() {
                        $tip.addClass('in');
                    }, 0);
                }

                function hideTip() {
                    $tip.removeClass('in');
                    clearTimeout(inTimer);
                    clearTimeout(outTimer);
                    outTimer = setTimeout(function() {
                        $tip.css('display', 'none');
                    }, 300);
                }
            }

            function getPosition($element) {
                var el = $element[0]
                return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
                    width: el.offsetWidth,
                    height: el.offsetHeight
                }, $element.offset())
            }

            function setPosition($element, $tip, placement) {
                var $parent      = $element.parent();
                var ePos         = getPosition($element);
                var tPos         = getPosition($tip);
                var actualWidth  = $tip[0].offsetWidth;
                var actualHeight = $tip[0].offsetHeight;
                var orgPlacement = placement;
                var docScroll    = document.documentElement.scrollTop || document.body.scrollTop;
                var parentWidth  = $parent.outerWidth();
                var parentHeight = $parent.outerHeight();
                var parentLeft   = $parent.offset().left;

                //TODO: 判断是否有足够空间,没有则对向替换

                var direct = placement.split('-');
                $tip.addClass(direct[0]);

                $tip.css(calculatedOffset(placement, ePos, tPos, actualWidth, actualHeight));
            }

            function calculatedOffset (placement, ePos, tPos, actualWidth, actualHeight) {
                var offset = {
                    top: ePos.top + ePos.height/2 - actualHeight/2,
                    left: ePos.left + ePos.width/2 - actualWidth/2
                };
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
                    offset.top = ePos.top - actualHeight/2 + 5;
                } else if (direct[1] === 'right') {
                    offset.left = ePos.left + ePos.width - actualWidth/2 - 5;
                } else if (direct[1] === 'bottom') {
                    offset.top = ePos.top + ePos.height - actualHeight/2 - 5;
                } else if (direct[1] === 'left') {
                    offset.left = ePos.left - actualWidth/2 + 5;
                }
                return offset;
            }

            function escapeString(html) {
                return html.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace('/&/g', '&amp;');
            }
        }
      ]);

});
