
define([ 'rd.core' ], function() {
var module = angular.module('rd.demo.Directives', [ 'rd.core' ]);

module.directive('liveDemo', ['DataSourceService', 'Utils', '$timeout', function(DSService, Utils, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div style="padding-left:10px"> \
                    <p style="padding-left:20px">\
                        <a href="/doc/tools/live_demo?{{example}}" target="_blank"> >>查看&amp;编辑源码</a>\
                    </p>\
                    <iframe width="{{width}}px" height="{{height}}px" frameborder="{{frameBorder}}"></iframe>\
                </div>',
        scope: {
            example: '@?',
            width: '@?',
            height: '@?',
            frameBorder: '@?',
        },
        link: function(scope, iEle) {
            if (!scope.example) {
                return;
            }

            scope.frameBorder = scope.frameBorder || 0;

            if(!scope.height){
                var iframeDom = iEle[0].childNodes[3];
                iframeDom.onload = function(){
                    setIframeHeight(iframeDom);
                }
            }

            DSService.create(Utils.createUniqueId('live_demo_ds_'), {
                url: '/demos/data',
                conditionProcessor: function() {
                    return {example: scope.example}
                },
                resultHandler: function(data) {
                    var ifrmDoc = iEle[0].childNodes[3].contentDocument;
                    ifrmDoc.open();
                    var src = getCombinedHtml(data[0], data[1], data[2]);
                    ifrmDoc.write(src);
                    ifrmDoc.close();
                }
            }).query();
        }
    };

    function setIframeHeight(iframe) {
        iframe.style.visibility = 'hidden';
        $timeout(function(){
            var bHeight = iframe.contentWindow.document.body.scrollHeight;  
            var dHeight = iframe.contentWindow.document.documentElement.scrollHeight; //iframe.ownerDocument.scrollingElement.offsetHeight
            var height = Math.max(bHeight, dHeight);  
            iframe.height = height;
            iframe.style.visibility = 'visible';
        }, 1500);//等待内部指令加载完成
    };

    function getCombinedHtml(html, js, css) {
        var temp = "";
        if (html.indexOf("</body>") > -1) {
            var body = [];
            body.push(html.substring(0, html.lastIndexOf("</body>")));
            body.push(html.substring(html.lastIndexOf("</body>")));
            html = body[0];
            temp = body.length == 2 && body[1] ? body[1] : ""
        }
        return html + "<script>try{\n" + js + "\n}catch(e){\n}<\/script>" +
            "<style>" + css + "</style>" + temp;
    };
}]);

module.directive('binding', [function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<a style="font-size:10px" title="该属性应用了双向绑定，单击了解更多" \
                    href="javascript:requestMarkdown(\'/doc/client/common/two_way_data_binding.md\')"><kbd>B</kbd></a>',
    }
}]);

module.directive('rdkTitle', [function() {
    return {
        restrict: 'E',
        replace: true,
        template: '',
        link: function(scope, iEle) {
            var title = iEle.text().trim();
            iEle.empty();
            if (!title) {
                title = 'RDK文档';
            }
            document.title = title;
        }
    }
}]);

module.service('MarkdownService', ['$compile', function($compile) {

var curFile = 'index.md';
var timer = -1;
var ajaxInstance;

var scope = undefined;
this.setScope = function(value) { scope = value; }

var markdownConverter = new Markdown.Converter();
mdPlugin.fenceCodeBlock(markdownConverter);
mdPlugin.transMDLink(markdownConverter);
mdPlugin.headerId(markdownConverter);
var markdownContainer = $('#main')[0];
markdownContainer = $(markdownContainer ? markdownContainer : document.body);

window.requestMarkdown = reqMarkdown;
var _this = this;
$(window).bind('hashchange', function() { _this.handleHashchange(); } );



//给链接跳转，链接跳转后，只修改location.hash，由hashchange事件触发下载md
function reqMarkdown(path) {
	var parsed = parsePath(path);
	location.hash = parsed.file + '#' + parsed.target;
}

//手工输入url或者跳转之后触发下载md
this.handleHashchange = function() {
	var parsed = parsePath(!!location.hash ? location.hash.substring(1) : undefined);
	
	if (parsed.file == curFile) {
		//当前文件内部跳转，直接跳到目标即可
		scrollToTarget(parsed.target, true);
	} else {
		//文件不一样，意味着要下载
		loadFile(parsed.file);
	}
}

function parsePath(path) {
	var parts = path.split('#', 1);
	var file = !!parts[0] ? parts[0] : curFile;
	var target = !!parts[1] ? parts[1] : '';
	
	//将file转为绝对路径
	file = file[0] == '/' ? file : $('#base').attr('href') + file;
	//转换后的 file 永远是 /doc/ 开头，去掉！
	file = file.substring(5);
	
	parts = file.split('/');
	//去掉相对路径部分
	while(true) {
		var idx = parts.indexOf('..');
		if (idx == -1) {
			break;
		}
		parts.splice(idx, 1);
		idx -= 1;
		if (idx != -1) {
			parts.splice(idx, 1);
		}
	}
	file = parts.join('/');
	
	return { file: file, target: target }
}

function loadFile(file, target) {
	if (!file) {
		file = 'tools/404.md';
	}
	curFile = file;
	file = '/doc/' + file;
	
	timer = setTimeout(function() {
		loadText(getLoadingText(file));
	}, 500);
	
	if (!!ajaxInstance) {
		ajaxInstance.abort();
	}
	ajaxInstance = $.ajax({
		url: file,
		type: 'GET',
		timeout: 20000,
		dataType: 'text',
		success: function(data) {
			if (timer != -1) {
				clearTimeout(timer);
				timer = -1;
			}
			ajaxInstance = null;
			loadText(data);
			scrollToTarget(target, false);
		},
		error: function(data) {
			loadText(getLoadFailedText(file, data));
			ajaxInstance = null;
		}
	});
	
	//更正base的href值
	var match = file.match(/(.*\/).*?\.md/i);
	$('#base').attr('href', match[1]);
}

function loadText(mdText) {
	//清空原来的内容
	markdownContainer.empty();
	var html = markdownConverter.makeHtml(mdText);
	markdownContainer.html(html);
	$compile(markdownContainer.contents())(scope);
	//构建目录
	DocCategory.make(markdownContainer[0]);
}
	
function scrollToTarget(target, internal) {
	//按下浏览器后退按钮的情况需要考虑！
	
	if (internal) {
		//文档内部跳转需要先跳到顶部
		window.scrollTo(0, 0);
	}
	var dom = document.getElementById(target);
	if (!dom) {
		return;
	}
	var pos = dom.getBoundingClientRect();
	window.scrollTo(0, pos.top);
}

function getLoadingText(file) {
	return '\
---\
\
正在加载 `' + file + '` ...\
\
---\
';
}

function getLoadFailedText(file, errInfo) {
	return '\
---\
\
找不到文档 `' + file + '`，以下是详细信息：\
\
~~~\
' + JSON.stringify(errInfo, '', '  ') + '\
~~~\
---\
'
}
	
	/////////////////////////////////////////
/*
    var currentFile;
    var mdService = this;
    var timer = -1;
    var ajaxInstance = undefined;
    
    this.scope = undefined;
    
    var markdownConverter = new Markdown.Converter();
    mdPlugin.fenceCodeBlock(markdownConverter);
    mdPlugin.transMDLink(markdownConverter);
    mdPlugin.headerId(markdownConverter);
    var markdownContainer = $('#main')[0];
    markdownContainer = $(markdownContainer ? markdownContainer : document.body);
    
    $(window).bind('hashchange', function() {
        loadMarkdown('/doc/' + location.hash.substring(1));
    });
    
    this.loadPath = function(path) {
        if (!path) {
            mdService.loadText('无效的Markdown路径！');
            currentFile = undefined;
            return;
        }
        
        path = toAbsPath(path);
        var pathParts = path.split('#');
        if (currentFile === pathParts[0]) {
            scrollToTarget(pathParts[1]);
            return;
        }
        currentFile = pathParts[0];
        location.hash = path.substring(5);
        
        timer = setTimeout(function() {
            mdService.loadText('---\n\n正在加载 `' + path + '` ...\n\n---');
        }, 500);
        
        if (!!ajaxInstance) {
            ajaxInstance.abort();
        }
        ajaxInstance = $.ajax({
            url: path,
            type: 'GET',
            timeout: 20000,
            dataType: 'text',
            success: function(data) {
                if (timer != -1) {
                    clearTimeout(timer);
                    timer = -1;
                }
                mdService.loadText(data);
                ajaxInstance = null;
            },
            error: function(data) {
                mdService.loadText('---\n\n找不到文档 `' + path + '`，以下是详细信息：\n\n' +
                            '    ' + JSON.stringify(data) + '\n\n---');
                ajaxInstance = null;
            }
        });
        
        var match = path.match(/(.*\/).*?\.md/i);
        $('#base').attr('href', match[1]);
    }
    
    function toAbsPath(path) {
		path = path[0] == '#' ? currentFile + path : path;
        path = path[0] == '/' ? path : $('#base').attr('href') + path;
        //path永远是 /doc/ 开头
        var pathParts = path.substring(5).split('/');
        while(true) {
            var idx = pathParts.indexOf('..');
            if (idx == -1) {
                break;
            }
            pathParts.splice(idx, 1);
            idx -= 1;
            if (idx != -1) {
                pathParts.splice(idx, 1);
            }
        }
        return pathParts.join('/');
    }
    
    this.loadText = function(mdText) {
        //清空原来的内容
        markdownContainer.empty();
        var html = markdownConverter.makeHtml(mdText);
        markdownContainer.html(html);
        $compile(markdownContainer.contents())(mdService.scope);
        
        misc.markdownContainer = markdownContainer[0];
        scrollToTarget();
        misc.resetDir();
        misc.makeDir();
    }
	
	function scrollToTarget(target) {
		if (!!target) {
			//target非空刚好表示是当前文件内部跳转
			//文件内部跳转需要先跳到文档顶部，否则不需要先跳转到顶部
			window.scrollTo(0, 0);
			location.hash = currentFile.substring(5) + '#' + target;
		} else {
			var match = location.hash.substring(1).match(/#(.*?)$/);
			target = !!match ? match[1] : undefined;
		}
		
		var dom = document.getElementById(target);
		if (!dom) {
			return;
		}
		var pos = dom.getBoundingClientRect();
		window.scrollTo(0, pos.top);
	}
*/
}]);

return module;
});
