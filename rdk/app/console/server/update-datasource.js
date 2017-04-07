(function () {

    return {
        post: function (request, script) {
            if (!request || !request.db) {
                Request.completeWithError(400, 'need db property');
            }
            Data.setDataSource(request);
            return 'ok';
        },
        get: function (request, script) {
            var dbNames = [];
            var dbConfigList = [];
            var it = java.Config.getConfig("db").root().keySet().iterator();
            while (it.hasNext()) {
                var dbName = it.next();
                var dbUrl = "db." + dbName + ".url";
                var dbDriver = "db." + dbName + ".driver";
                dbConfigList.push(dbUrl + "=" + java.Config.get(dbUrl));
                dbConfigList.push(dbDriver + "=" + java.Config.get(dbDriver));
            }
            return dbConfigList;
        },
        delete: function (request, script) {
            log(request.dbName);
            var reqLst = request.dbName.split(".")
            if (reqLst.length < 1) {
                return "request error!" + request;
            }
            var dbName = "db." +reqLst[1];
            java.Config.withoutPath(dbName);
            Data.removeDataSource(dbName);
        }
    }
})();
