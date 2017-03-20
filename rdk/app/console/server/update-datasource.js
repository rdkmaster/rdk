
(function() {

    return {
        post: function (request, script) {
            if (!request || !request.db) {
                Request.completeWithError(400, 'need db property');
            }
            Data.setDataSource(request);
            return 'ok';
        }
    }
})();
