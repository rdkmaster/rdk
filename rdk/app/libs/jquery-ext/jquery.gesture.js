/**
    Write by gushan
**/
(function($, undefined) {
    $.fn.touchEvent = function() {
        var self = this;
        var element = $(this);
        var el = element[0];
        var isTouching, isSwipe, startTime, startPoint, currentPoint,callback;

        if (arguments.length > 2) {
            var eventType = arguments[0];
            var touchType = arguments[1];
        }

        if (touchType == "touch") {
            callback = arguments[arguments.length - 1];
            if (isSupportTouch()) {
                el.addEventListener('touchstart', touchStart);
                el.addEventListener('touchend', touchEnd);
                el.addEventListener('touchmove', touchMove);
            } else {
                el.addEventListener('mousedown', touchStart);
                // el.addEventListener('mouseup', touchEnd);
                // el.addEventListener('mousemove', touchMove);
                el.addEventListener('mouseleave', touchOut);
            }
        } else {
            if (isSupportTouch()) {
                el.removeEventListener('touchstart', touchStart);
                el.removeEventListener('touchend', touchEnd);
                el.removeEventListener('touchmove', touchMove);
            } else {
                el.removeEventListener('mousedown', touchStart);
                el.removeEventListener('mouseup', touchEnd);
                el.removeEventListener('mousemove', touchMove);
            }
        }

        function doAction(type, args) {
            args.type = type;
            if (eventType) {
                if (eventType == type) {
                    callback.call(self, args);
                }
            } else {
                callback.call(self, args);
            }
        }

        function getSwipeDirection(x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >=
                Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
        }

        function isSupportTouch() {
            var supportsTouch = false;
            if ('ontouchstart' in window || 'ontouchstart' in document) {
                //iOS & android
                supportsTouch = true;
            } else if (window.navigator.msPointerEnabled) {
                //Win8
                supportsTouch = true;
            }
            return supportsTouch;
        }

        var beginNode, endNode;

        function touchStart(e) {
            if(e.target.parentNode.style.cursor == "text"){
                el.style.MozUserSelect = '';
                el.style.webkitUserSelect = '';
                return;
            }
            else{
                if(window.getSelection){
                    window.getSelection().removeAllRanges();//清空之前选择文本
                }
                el.style.MozUserSelect = 'none';//拖动不选
                el.style.webkitUserSelect = 'none';
            }
            isTouching = true;
            startTime = new Date();
            var t = e.touches ? e.touches[0] : e;
            startPoint = { x: t.pageX, y: t.pageY };
            beginNode = window.getSelection().focusNode;
            e.currentTarget.addEventListener('mouseup', touchEnd);
            e.currentTarget.addEventListener('mousemove', touchMove);
        }

        function touchOut(e){
            e.currentTarget.removeEventListener('mouseup', touchEnd);
            e.currentTarget.removeEventListener('mousemove', touchMove);             
        }

        function touchMove(e){
            if (isTouching) {
                var t = e.touches ? e.touches[0] : e;
                var p = { x: t.pageX, y: t.pageY };
                currentPoint = p;
                var x1 = startPoint.x;
                var x2 = currentPoint.x;
                var y1 = startPoint.y;
                var y2 = currentPoint.y;
                if (Math.abs(x1 - x2) > 2 || Math.abs(y1 - y2) > 2) {
                    isSwipe = true;
                    var direction = getSwipeDirection(x1, x2, y1, y2);
                    e.direction = direction;
                    e.startPoint = startPoint;
                    e.endPoint = currentPoint;
                    doAction("swipe", e);
                    console.log(e);
                    if(eventType == "swipe"){
                        startPoint = currentPoint;
                    }
                }
            }
        }

        function touchEnd(e) {
            isTouching = false;
            if (!isSwipe) {
                e["long"] = new Date() - startTime > 1000;
                doAction("tap", e);
            } else {
                var x1 = startPoint.x;
                var x2 = currentPoint.x;
                var y1 = startPoint.y;
                var y2 = currentPoint.y;
                var direction = getSwipeDirection(x1, x2, y1, y2);
                e.direction = direction;
                e.startPoint = startPoint;
                e.endPoint = currentPoint;
                doAction("swipeEnd", e);
            }
            isSwipe = false;
        }

    };
})(jQuery);
