(function() {

    return function(request, script) {
        //服务的第一行代码写在这里！
        var path=file.list("proc/bin/lib","rdk-server*").toString();
		var filename=path.substring(path.lastIndexOf("\\")+1,path.length);
		Log.info(i18n("version"));
		return i18n("version")+" "+filename.substr(16,8);
        
    }

})();
