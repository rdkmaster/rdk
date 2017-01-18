(function() {

    return function(request, script) {
    	var reg = /rdk-server_\d+.\d+-(.*)\.jar/;
        var path = File.list("proc/bin/lib", false, reg).join(';');
        var match = path.match(reg);
        return i18n("version", match[1]);
    }

})();
