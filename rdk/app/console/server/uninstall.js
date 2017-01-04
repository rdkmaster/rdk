/**
 * Created by 10184092 on 2016/12/29.
 */
(function() {

    return function (request, script) {
        var cmd = "app/console/server/uninstall.sh";
        var appName = request.appName;
        var docker_ips = Cache.get("docker_ips").join(",");
        return getShellOutput(cmd,0,appName,docker_ips);
    }
})()