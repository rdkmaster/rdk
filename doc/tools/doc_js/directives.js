
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
                    href="javascript:loadMarkdown(\'/doc/client/common/two_way_data_binding.md\')"><kbd>B</kbd></a>',
    }
}]);

module.service('MarkdownService', ['$compile', function($compile) {
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
            misc.scrollToTarget();
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
		return '/doc/' + pathParts.join('/');
    }
    
    this.loadText = function(mdText) {
        //清空原来的内容
        markdownContainer.empty();
		var html = markdownConverter.makeHtml(mdText);
        markdownContainer.html(html);
        $compile(markdownContainer.contents())(mdService.scope);
        
        misc.markdownContainer = markdownContainer[0];
        setTimeout(misc.scrollToTarget, 200);
        misc.resetDir();
        misc.fixTitle();
        misc.makeDir();
    }
}]);

return module;
});
