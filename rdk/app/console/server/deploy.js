/**
 * Created by 10184092 on 2016/12/29.
 */
(function() {

    return function (request, script) {
        var cmd = "app/console/server/deploy.sh";
        var sourceFile = request.sourceFile;
        log("sourceFile=>"+sourceFile)
        var appName = request.appName;
        log("appName=>"+appName)
        var docker_ips = Cache.get("docker_ips").join(",");
        log("docker_ips=>"+docker_ips)
        return getShellOutput(cmd,0,sourceFile,appName,docker_ips);
    }
})()