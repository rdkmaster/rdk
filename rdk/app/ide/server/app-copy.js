(function() {
    return {
        post: function(request) {
            if (!request) {
                Log.error("copy file, code 1, detail: bad arguments");
                return 1;
            }
            return File.copy(request.from, request.to, request.recursive, request.force);
        }
    }
})();
