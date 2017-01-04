/**
 * Created by 10184092 on 2016/12/29.
 */
(function() {

    return function (request, script) {
        var cmd = "app/console/server/deploy.sh";
        var sourceFile = request.sourceFile;
        var appName = request.appName;
        var docker_ips = Cache.get("docker_ips").join(",");
        return getShellOutput(cmd,0,sourceFile,appName,docker_ips);

    }
})()