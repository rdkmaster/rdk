(function() {

    return function(request, script) {
        var path=file.list("proc/bin/lib","rdk-server*").toString();
        var filename=path.substring(path.lastIndexOf("\\")+1,path.length);
        var match = filename.match(/rdk-server_\d+.\d+-(.*)\.jar/);
        return i18n("version", match[1]);
    }

})();
