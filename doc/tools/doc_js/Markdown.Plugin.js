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
				//关于这个牛逼的正则表达式，请参考 Markdown.Converter.js 623行
				return text.replace(/<a([\s]+|[\s]+[^<>]+[\s]+)href=(\"([^<>"\']*)\"|\'([^<>"\']*)\')[^<>]*>/gi, transAnchorTag);
			});
		}
	}
	
	function transAnchorTag(wholeMatch, m1, m2, m3) {
		return m3.match(/\.md\s*$/i) ? wholeMatch.replace(m3, "javascript:loadMarkdown('" + m3 + "')") : m3;
	}
})();