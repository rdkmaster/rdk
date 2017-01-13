
define(['rd.core', 'rd.controls.Editor'/*, 'rd.containers.Tab'*/], function() {
var module = angular.module('rd.demo.Directives', ['rd.core', 'rd.controls.Editor']);

module.directive('liveDemo', ['DataSourceService', 'Utils', '$timeout', function(DSService, Utils, $timeout) {
    var defaultHeight = 300;
    var liStyle = 'display: inline-block;\
                   padding: 0 4px 0 4px;\
                   background-color: #fff;\
                   border-radius: 4px 4px 0 0;';
    var aStyle =  'color:#428bca;\
                   text-decoration:none;\
                   font-size:12px;\
                   font-family:微软雅黑;';
    return {
        restrict: 'E',
        replace: true,
        template: ('\
<div>\
    <ul style="margin-top:2px">\
        <li ng-repeat="code in files track by code.file" on-finish-render style="$liStyle">\
            <a href="javascript:void(0)" style="$aStyle" ng-click="selectFile($index)">{{code.file}}</a>\
        </li>\
        <li style="$liStyle">\
            <a href="javascript:void(0)" ng-click="selectFile(files.length)" style="$aStyle">运行</a>\
        </li>\
        <li style="$liStyle">\
            <a href="javascript:void(0)" ng-click="openExample()" style="$aStyle;">打开</a>\
        </li>\
        <!--li style="$liStyle">\
            <a href="javascript:alert(\'暂未支持\')" style="$aStyle">下载</a>\
        </li-->\
    </ul>\
    <rdk_editor id="{{editorId}}_{{$index}}" ng-repeat="code in files track by code.file" \
        style="margin-top:-15px;height:' + defaultHeight + 'px"\
        value="code.content" mode="{{code.mode}}" ng-show="selectedIndex==$index"\
        change="editorChanged" initialized="editorReadyHandler">\
    </rdk_editor>\
    <iframe style="border:0;width:100%;height:' + defaultHeight + 'px;border:1px solid #ddd;margin-top:-16px;"\
         ng-show="selectedIndex==files.length || selectedIndex==-1"></iframe>\
</div>').replace(/\$liStyle/g, liStyle).replace(/\$aStyle/g, aStyle),

        scope: {
            example: '@?',
        },
        link: function(scope, iEle) {
            if (!scope.example) {
                return;
            }

            scope.editorId = Utils.createUniqueId('editor_');
            scope.selectedIndex = -1;
            scope.initDone = false;
            var evaluator = $(iEle.find('iframe')[0]);
            var exampleUrl = makeOriginExampleUrl(scope.example);
            var newUrl = undefined;
            var hasCopied = false;

            var dsListFiles = DSService.create(Utils.createUniqueId('live_demo_ds_'), {
                url: '/rdk/service/app/ide/server/files'
            });
            var dsUploadFiles = DSService.create(Utils.createUniqueId('live_demo_ds_'), {
                url: '/rdk/service/app/ide/server/files',
                resultHandler: handleUploadResult, updateMethod: 'put'
            });
            var dsDeleteFiles = DSService.create(Utils.createUniqueId('live_demo_ds_'), {
                url: '/rdk/service/app/ide/server/files'
            });
            var dsCopyFiles = DSService.create(Utils.createUniqueId(''), {
                url: '/rdk/service/app/ide/server/app-copy',
                resultHandler: uploadFiles, addMethod: 'post'
            });

            $(window).bind('beforeunload', function (e) {
                if (!hasCopied) {
                    return;
                }
                dsDeleteFiles.delete({
                    param: {
                        files: ['..' + newUrl]
                    }
                });
            });

            scrollHandler();
            $(window).bind('scroll', scrollHandler);

            scope.$on('ngRepeatFinished', function() {
                scope.initDone = true;
            });

            var timer;
            function scrollHandler() {
                if (!!timer || !visible()) {
                    return;
                }
                timer = $timeout(function() {
                    //如果在视线内抄过100ms，就去加载
                    if (!visible()) {
                        timer = undefined;
                        return;
                    }
                    timer = true;
                    $(window).unbind('scroll', scrollHandler);

                    listFiles(exampleUrl);
                }, 100);
            }

            function visible() {
                var top = $(iEle).offset().top;
                var bottom = top + defaultHeight;

                var viewportHeight = $(window).height();
                var scrollTop = $(document).scrollTop();
                var offset = 10;
                var upLimit = scrollTop - offset;
                var downLimit = scrollTop + viewportHeight + offset;
                return (top >= upLimit && top <= downLimit) || (bottom >= upLimit && bottom <= downLimit);
            }

            var changedFiles = {empty: true};
            scope.editorChanged = function(event) {
                var idx = event.dispatcher.substring(scope.editorId.length+1);
                var fi = scope.files[idx];
                if (!fi.status) {
                    return;
                }
                if (fi.status == 'not_real_edit') {
                    fi.status = 'real_edit';
                    return;
                }

                $(iEle.find('li')[idx]).css('font-weight', 'bold');
                changedFiles.empty = false;
                changedFiles[fi.file] = fi.content;
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
                } else {
                    var fi = scope.files[selectedIndex];
                    if (!fi.status) {
                        loadFileContent(fi.file);
                    }
                }
            }

            scope.openExample = function() {
                window.open(newUrl ? newUrl : exampleUrl, '_blank');
            }

            scope.editorReadyHandler = function(event) {
                var editor = rdk[event.dispatcher].getEditor();
                editor.setOption("extraKeys", {
                    'Ctrl-S': function(cm) {
                        scope.selectFile(scope.files.length);
                        scope.$apply();
                    }
                });
            }

            function evaluate() {
                if (!changedFiles.empty) {
                    // need to make new app...
                    if (!newUrl) {
                        newUrl = '/doc/client/demo/tmp/' + Utils.uuid() + '/';
                        console.log('new url=%s', newUrl);
                    }

                    if (hasCopied) {
                        //等待双绑生效
                        $timeout(uploadFiles, 0);
                    } else {
                        dsCopyFiles.add({
                            param: {
                                from: '..' + exampleUrl, to: '..' + newUrl, recursive: true
                            }
                        });
                        hasCopied = true;
                    }
                } else if (!evaluator.attr('src')) {
                    evaluator.attr('src', exampleUrl);
                }
            }

            function uploadFiles() {
                dsUploadFiles.update({
                    param: {
                        files: makeChangedFiles(changedFiles)
                    }
                });
                changedFiles = {empty: true};
            }

            function makeChangedFiles(files) {
                var changedFiles = [];
                angular.forEach(files, function(content, file) {
                    if (file == 'empty') {
                        return;
                    }
                    changedFiles.push({
                        file: '..' + newUrl + file.replace(/\\/g, '/'), content: content
                    });
                });
                return changedFiles;
            }

            function listFiles(path) {
                dsListFiles.resultHandler = handleListFilesResult;
                dsListFiles.query({
                    p: {
                        param: {
                            //RDK进程运行的目录是工程所在目录的一级子目录，
                            //因此在web绝对路径前加上“..”就可以转为RDK进程能识别的相对路径
                            path: '..' + path,
                            pattern: (/\.js$|\.html$|\.css$|\.json$/i).toString(),
                            recursive: true, needContent: false
                        }
                    }
                });
            }

            function handleListFilesResult(data) {
                var files = JSON.parse(data.result);
                if (files.length == 0) {
                    exampleUrl = 'tools/demo-not-found.html?' + exampleUrl;
                    scope.selectFile(0);
                    return;
                }

                scope.files = [];
                //这里加3是因为exampleUrl前需要加上“..”  -- 具体原因请查阅listFiles()的注释
                //再去掉最后的斜杠，一共去掉3个字符
                var len = exampleUrl.length + 2;
                angular.forEach(files, function(file) {
                    var match = file.match(/\w+\.(\w*)$/);
                    var fi = {content: 'loading...'};
                    if (match[1] == 'js') {
                        fi.mode = 'javascript';
                    } else if (match[1] == 'html') {
                        fi.mode = 'html';
                    } else if (match[1] == 'css') {
                        fi.mode = 'css';
                    } else if (match[1] == 'json') {
                        fi.mode = 'json';
                    } else {
                        console.warn('unknown mode: ' + match[1]);
                    }
                    fi.file = file.substring(len);
                    scope.files.push(fi);
                });

                $timeout(function() {
                    scope.selectFile(scope.files.length);
                }, 1);
            }

            function loadFileContent(file) {
                dsListFiles.resultHandler = handleContentResult;
                dsListFiles.query({
                    p: {
                        param: {
                            //RDK进程运行的目录是工程所在目录的一级子目录，
                            //因此在web绝对路径前加上“..”就可以转为RDK进程能识别的相对路径
                            path: '..' + exampleUrl + file,
                            pattern: '', recursive: false, needContent: true
                        }
                    }
                });
            }

            function handleContentResult(data) {
                var fi = scope.files[scope.selectedIndex];
                try {
                    var data = JSON.parse(data.result);
                    fi.content = data[0].content;
                    fi.status = 'not_real_edit';
                } catch(e) {
                    fi.content = e.stack;
                }
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
