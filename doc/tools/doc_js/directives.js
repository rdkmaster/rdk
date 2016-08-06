
define([
        'angular', 'jquery', 'rd.core', 'css!rd.styles.FontAwesome'
    ], function() {
var module = angular.module('rd.demo.Directives', ['rd.core']);

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
                queryIf: 'ready',
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
            });
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
                    href="/doc/client/common/two_way_data_binding.html"><kbd>B</kbd></a>',
    }
}]);

return module;
});
