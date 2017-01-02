
define([ 'rd.core', 'rd.controls.Editor', 'rd.containers.Tab' ], function() {
var module = angular.module('rd.demo.Directives', [ 'rd.core', 'rd.controls.Editor', 'rd.containers.Tab' ]);

module.directive('liveDemo', ['DataSourceService', 'Utils', '$timeout', function(DSService, Utils, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        template: '\
            <div>\
            <ul ng-show="initDone()">\
                <li ng-repeat="code in files track by code.file" on-finish-render\
                    style="display: inline-block;\
                            padding: 0 6px 0 6px;\
                            background-color: #fff;\
                            border-radius: 4px 4px 0 0;">\
                    <a href="javascript:void(0)" ng-click="selectFile($index)">{{code.file}}</a>\
                </li>\
                <li style="display: inline-block;\
                            padding: 0 6px 0 6px;\
                            background-color: #fff;\
                            border-radius: 4px 4px 0 0;">\
                    <a href="javascript:void(0)" ng-click="selectFile(files.length)">运行</a>\
                </li>\
            </ul>\
            <rdk_editor id="{{editorId}}_{{$index}}" ng-repeat="code in files track by code.file" style="margin-top:-10px"\
                value="code.content" mode="{{code.mode}}" ng-show="selectedIndex==$index"\
                change="editorChanged">\
            </rdk_editor>\
            <iframe style="border:1px solid #ddd;margin-top:-10px;width:100%;height:300px;"\
                ng-show="selectedIndex==files.length"></iframe>\
            </div>',
        scope: {
            example: '@?',
        },
        link: function(scope, iEle) {
            if (!scope.example) {
                return;
            }

            scope.editorId = Utils.createUniqueId('editor_');
            scope.selectedIndex = -1;
            var evaluator = $(iEle.find('iframe')[0]);
            var exampleUrl = makeOriginExampleUrl(scope.example);
            var newUrl = undefined;
            
            var dsListFiles = DSService.create(Utils.createUniqueId('live_demo_ds_'), {
                url: '/rdk/service/app/ide/server/files',
                resultHandler: handleCodeResult
            });
            var dsUploadFiles = DSService.create(Utils.createUniqueId('live_demo_ds_'), {
                url: '/rdk/service/app/ide/server/files',
                resultHandler: handleUploadResult,
                updateMethod: 'put'
            });

            listFiles(exampleUrl);

            scope.editorChanged = function(event) {
                if (!scope.initDone()) {
                    return;
                }
                var idx = event.dispatcher.substring(scope.editorId.length+1);
                $(iEle.find('li')[idx]).css('font-weight', 'bold');
            }

            scope.selectFile = function(selectedIndex) {
                if (scope.selectedIndex == selectedIndex) {
                    return;
                }
                scope.selectedIndex = selectedIndex;
                angular.forEach(iEle.find('li'), function(li, idx) {
                    $(li).css('background-color', (idx == selectedIndex ? '#ddd' : '#fff'));
                });
                if (selectedIndex == scope.files.length) {
                    $timeout(resetFontWeight, 0);
                    //run evaluate...
                    evaluate();
                }
            }

            scope.initDone = function() {
                return scope.selectedIndex != -1;
            }

            function evaluate() {
                if (hasChangedCodes()) {
                    // need to upload...
                    $timeout(function() {
                        //等待双绑生效
                        dsUploadFiles.update({
                            param: {
                                files: makeNewFiles(scope.files)
                            }
                        });
                    }, 0);
                } else if (!evaluator.attr('src')) {
                    evaluator.attr('src', exampleUrl);
                }
            }

            function makeNewFiles(files) {
                if (!newUrl) {
                    newUrl = '/doc/client/demo/tmp/' + Utils.uuid() + '/';
                }
                var newFiles = [];
                angular.forEach(files, function(fileInfo) {
                    newFiles.push({
                        file: '..' + newUrl + fileInfo.file.replace(/\\/g, '/'),
                        content: fileInfo.content
                    });
                });
                return newFiles;
            }

            function hasChangedCodes() {
                var has = false;
                angular.forEach(iEle.find('li'), function(li, idx) {
                    var weight = $(li).css('font-weight');
                    if (weight == 'bold') {
                        has = true;
                    }
                });
                return has;
            }

            function listFiles(path) {
                dsListFiles.query({
                    p: {
                        param: {
                            //RDK进程运行的目录是工程所在目录的一级子目录，
                            //因此在web绝对路径前加上“..”就可以转为RDK进程能识别的相对路径
                            path: '..' + path,
                            pattern: '',
                            recursive: true, needContent: true
                        }
                    }
                });
            }

            function handleCodeResult(data) {
                scope.files = JSON.parse(data.result);
                if (scope.files.length == 0) {
                    evaluator.src = 'tools/demo-not-found.html?' + exampleUrl;
                    return;
                }
                //这里加3是因为exampleUrl前需要加上“..”  -- 具体原因请查阅listFiles()的注释
                //再去掉最后的斜杠，一共去掉3个字符
                var len = exampleUrl.length + 2;
                angular.forEach(scope.files, function(item, index) {
                    var match = item.file.match(/\w+\.(\w*)$/);
                    if (match[1] == 'js') {
                        item.mode = 'javascript';
                    } else if (match[1] == 'html') {
                        item.mode = 'html';
                    } else if (match[1] == 'css') {
                        item.mode = 'css';
                    } else {
                        console.warn('unknown mode: ' + match[1]);
                    }
                    item.file = item.file.substring(len);
                });
            }

            function handleUploadResult(data) {
                var result = JSON.parse(data.result);
                if (result.length > 0) {
                    // refresh
                    evaluator.attr('src', newUrl);
                } else {
                    alert('实时运行示例失败！原因未知。');
                }
            }

            function resetFontWeight() {
                angular.forEach(iEle.find('li'), function(li, idx) {
                    $(li).css('font-weight', 'normal');
                });
            }

            function makeOriginExampleUrl(example) {
                var url = example.trim();
                if (url[0] != '/') {
                    url = '/doc/client/demo/' + url;
                }
                if (url[url.length-1] != '/') {
                    url += '/';
                }
                return url;
            }

            scope.$on('ngRepeatFinished', function() {
                scope.selectFile(0);
            });

        }
    };
}]);

module.directive('binding', [function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<a style="font-size:10px" title="该属性应用了双向绑定，单击了解更多" \
                            href="javascript:requestMarkdown(\'/doc/client/common/two_way_data_binding.md\')">\
                       <kbd>B</kbd>\
                   </a>',
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
    var LOADING_TITLE = 'Loading help file, please wait for a moment...';

    var curFile = '';
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
    $(window).bind('hashchange', hashchangeHandler );


    //给链接跳转，链接跳转后，只修改location.hash，由hashchange事件触发下载md
    function reqMarkdown(path) {
        var parsed = parsePath(path);
        var hash = parsed.file;
        if (!!parsed.target) {
            hash += '#' + parsed.target;
        }
        location.hash = hash;
        if (parsed.file != curFile) {
            window.scrollTo(0, 0);
        }
    }

    function hashchangeHandler() {
        var parsed = parsePath(getPathFromHash());
        
        if (parsed.file == curFile) {
            //当前文件内部跳转，直接跳到目标即可
            scrollToTarget(parsed.target);
        } else {
            //文件不一样，意味着要下载
            loadFile(parsed.file, parsed.target);
        }
    }

    //手工输入url或者跳转之后触发下载md
    this.loadFromHash = function() {
        hashchangeHandler();
    }

    function parsePath(path) {
        var idx = path.indexOf('#');
        idx = (idx == -1) ? path.length : idx;
        var file = path.substring(0, idx);
        file = !!file ? file : '/doc/' + curFile;
        var target = path.substring(idx+1);
        
        //将file转为绝对路径
        file = file[0] == '/' ? file : $('#base').attr('href') + file;
        //转换后的 file 永远是 /doc/ 开头，去掉！
        file = file.substring(5);
        
        parts = file.split('/');
        //去掉相对路径部分
        while(true) {
            idx = parts.indexOf('..');
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

    function getPathFromHash() {
        var path = !!location.hash ? location.hash.substring(1) : 'index.md';
        return '/doc/' + path;
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
        
        document.title = LOADING_TITLE;
        if (!!ajaxInstance) {
            ajaxInstance.abort();
        }
        ajaxInstance = $.ajax({
            url: file,
            type: 'GET',
            timeout: 5000,
            dataType: 'text',
            success: function(data) {
                if (timer != -1) {
                    clearTimeout(timer);
                    timer = -1;
                }
                ajaxInstance = null;
                
                loadText(data);
                scrollToTarget(target);
                
                if (document.title == LOADING_TITLE) {
                    document.title = curFile;
                }
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
        
    function scrollToTarget(target) {
        //按下浏览器后退按钮的情况需要考虑！
        var dom = document.getElementById(target);
        if (!dom) {
            dom = document.getElementsByName(target);
            if (dom.length == 0) {
                return;
            }
        }
        $("html,body").animate({scrollTop: $(dom).offset().top}, 300);
    }

    function getLoadingText(file) {
        return '\
---\n\
\n\
正在加载 `' + file + '` ...\n\
\n\
---\n\
';
    }

    function getLoadFailedText(file, errInfo) {
        return '\
---\n\
\n\
找不到文档 `' + file + '`，以下是详细信息：\n\
\n\
~~~\n\
' + JSON.stringify(errInfo, '', '  ') + '\n\
~~~\n\
\n\
---\n\
';
    }
}]);

return module;
});
