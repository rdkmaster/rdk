(function() {
    return {
        authenticate: function(request, script, headers) {
            // 在需要给url鉴权的场景，请应用覆盖此文件，并在这个文件里实现自己的鉴权逻辑
            // var header = Request.getContextHeader();
            // Request.completeWithError(403, 'forbidden');
        }
    }
})();

