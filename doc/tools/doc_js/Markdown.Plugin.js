mdPlugin = (function() {
    return {
        fenceCodeBlock: function(converter) {
            converter.hooks.chain("postNormalization", function (text) {
                return text.replace(/^ {0,3}~T~T~T *\n((?:.*?\n)+?) {0,3}~T~T~T *$/gm, function (whole, inner) {
                    return inner.replace(/\n|^/g, '\n    ');
                });
            });
        },
        transMDLink: function(converter) {
            converter.hooks.chain("postConversion", function (text) {
                //如果a标签的href是一个md文件，则替换为调用loadMarkdown函数
                return text.replace(/<a([\s]+|[\s]+[^<>]+[\s]+)href=(\"([^<>"\']*)\"|\'([^<>"\']*)\')[^<>]*>/gi, transAnchorTag);
            });
        },
        headerId: function(converter) {
            converter.hooks.chain("postConversion", function (text) {
                //将h1~h6 text部分中的 {#xxx} 中的xxx转为节点id
                return text.replace(/<(h[1-6])\s*>(.*?){#\s*(.*?)\s*}.*?<\/\s*\1\s*>/gi, transHeader);
            });
        }
    }
    
    function transAnchorTag(wholeMatch, m1, m2, m3) {
        return m3.match(/\.md(#.*)?\s*$/i) ? wholeMatch.replace(m3, "javascript:loadMarkdown('" + m3 + "')") : wholeMatch;
    }
    
    function transHeader(wholeMatch, m1, m2, m3) {
        return '<' + m1 + ' id="' + m3 + '">' + m2 + '</' + m1 + '>';
    }
})();