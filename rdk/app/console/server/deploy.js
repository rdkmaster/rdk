/**
 * Created by 10184092 on 2016/12/29.
 */
(function() {

    return function (request, script) {
        var cmd = "./app/console/server/deploy.sh";
        var sourceFile = request.sourceFile;
        log("sourceFile=>"+sourceFile)
        var appName = request.appName;
        log("appName=>"+appName)
        if(Cache.get("docker_ips")!=null){
            var docker_ips = Cache.get("docker_ips").join(",");
            log("docker_ips=>"+docker_ips)
            return Shell.execute(cmd,0,sourceFile,appName,docker_ips);
        }else{

            log("docker_server_ips is null when deploy !!!")
            return 2;
        }
        
    }
})()
