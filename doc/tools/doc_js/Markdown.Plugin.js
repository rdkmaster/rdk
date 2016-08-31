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
			converter.hooks.chain("postNormalization", function (text) {
				//关于这个牛逼的正则表达式，请参考 Markdown.Converter.js 623行
				return text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, transAnchorTag);
			});
		}
	}
	
	function transAnchorTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
		var href = m4.match(/\.md\s*$/i) ? 'javascript:loadMarkdown("' + m4 + '")' : m4;
		return '[' + m2 + '](' + href + ');';
	}
})();