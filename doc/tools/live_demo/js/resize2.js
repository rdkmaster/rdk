(function($) {
    var editors, staticOffset;
    var options_ = {
        vertical: false
    };
    var iLastMousePos = 0;
    var iMin = 0;
    $.fn.TextAreaResizer = function(opt) {
        var g = $(this);
        return this.each(function() {
            this.options = opt ? opt: options_;
            $(this).mousedown({
                el: this
            },
            startDrag)
        })
    };
    function startDrag(e) {
        var cur = e.data.el;
        editors = cur.options.vertical ? $(cur).parent().find("fieldset") : $(cur).parent().find(".editor");
        iLastMousePos = this.options.vertical ? mousePosition(e).x: mousePosition(e).y;
        staticOffset = (this.options.vertical ? editors.eq(0).width() : editors.eq(0).height()) - iLastMousePos;
        $(cur).parent().mouseup({
            el: cur
        },
        endDrag).mousemove({
            el: cur
        },
        performDrag);
        return false
    }
    function performDrag(e) {
        var cur = e.data.el;
        cur.options.html.refresh();
        cur.options.css.refresh();
        cur.options.js.refresh();
        $(cur).parent().find("iframe").hide();
        var iThisMousePos = cur.options.vertical ? mousePosition(e).x: mousePosition(e).y;
        var iMousePos = staticOffset + iThisMousePos;
        var up = iLastMousePos >= iThisMousePos;
        if (up) {
            iMousePos -= 5
        }
        if (iMousePos < 0) {
            endDrag(e);
            return
        }
        if (cur.options.vertical) {
            if (iMousePos > $(cur).parent().width()) {
                endDrag(e);
                return
            }
        } else {
            if (iMousePos > $(cur).parent().height()) {
                endDrag(e);
                return
            }
        }
        var max_top = $(cur).offsetParent().height() - iMousePos;
        var max_left = $(cur).offsetParent().width() - iMousePos;
        if ((!cur.options.vertical && max_top < iMin) || (cur.options.vertical && max_left < iMin)) {
            return false
        } else {
            iLastMousePos = iThisMousePos;
            iMousePos = Math.max(iMin, iMousePos);
            if (editors != null) {
                var fsSize = cur.options.vertical ? editors.parent().width() : editors.parent().height();
                if (cur.options.vertical) {
                    editors.eq(0).css({
                        width: (iMousePos / fsSize * 100) + "%"
                    });
                    editors.eq(1).css({
                        width: ((fsSize - iMousePos) / fsSize * 100) + "%"
                    });
                    $(cur).css({
                        left: $(".editorSet").width() - 3
                    })
                } else {
                    editors.eq(0).css({
                        height: (iMousePos / fsSize * 100) + "%"
                    });
                    editors.eq(1).css({
                        height: ((fsSize - iMousePos) / fsSize * 100) + "%"
                    });
                    $(cur).css({
                        top: editors.eq(0).height() - 5
                    })
                }
            }
        }
        if (iMousePos < iMin) {
            endDrag(e)
        }
        return false
    }
    function endDrag(e) {
        var cur = e.data.el;
        $(cur).parent().find("iframe").show();
        $(cur).parent().unbind("mouseup").unbind("mousemove");
        editors = null;
        staticOffset = null;
        iLastMousePos = 0
    }
    function mousePosition(e) {
        return {
            x: e.clientX + document.documentElement.scrollLeft,
            y: e.clientY + document.documentElement.scrollTop
        }
    }
    return this
})(jQuery);