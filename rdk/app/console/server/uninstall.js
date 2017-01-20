/**
 * Created by 10184092 on 2016/12/29.
 */
(function() {

    return function (request, script) {
        var cmd = "./app/console/server/uninstall.sh";
        var sourceFile = request.sourceFile;
        log("sourceFile=>"+sourceFile)
        var appName = request.appName;
        log("appName=>"+appName)
        var docker_ips = Cache.get("docker_ips").join(",");
        log("docker_ips=>"+docker_ips)
        if(Shell.execute(cmd,0,appName,docker_ips)!="0"){
            return "2"
        }
        //clear cache
        for(ip in Cache.get("docker_ips")){
            rest.delete("http://"+ip+"rdk/service/app/console/server/init",{"appName":appName});
        }
        return 0;
    }
})()