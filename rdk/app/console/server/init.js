(function() {

    Array.prototype.removeByValue = function(val) {
        for(var i=0; i<this.length; i++) {
            if(this[i] == val) {
                this.splice(i, 1);
                break;
            }
        }
    }

    Array.prototype.contains = function (val) {
        var i = this.length;
        while (i--) {
            if (this[i] === val) {
                return true;
            }
        }
        return false;
    }

    function _increasecallback_(msg) {
        var iparr = [];
        log("increase ip: "+msg.body);

        if(Cache.get("docker_ips")==null){
            iparr.push(msg.body);
            Cache.put("docker_ips",iparr);
            log("docker_ips: "+iparr.join(","));
            Shell.execute("./app/console/server/updateNginx.sh",0,iparr.join(","),"/home/tools/nginx/conf/nginx.conf");
        }else {
            iparr=Cache.get("docker_ips");
            if(iparr.contains(msg.body)==false){
                iparr.push(msg.body);
                Cache.put("docker_ips",iparr);
                log("docker_ips: "+iparr.join(","));
            Shell.execute("./app/console/server/updateNginx.sh",0,iparr.join(","),"/home/tools/nginx/conf/nginx.conf");
            }
        }
    }

    function _reducecallback_(msg) {
        var iparr = [];
        log("reduce ip: "+msg.body);

        if(Cache.get("docker_ips")==null){
            log("docker_ips cache is none!!!");
        }else {
            iparr=Cache.get("docker_ips");
            if(iparr.contains(msg.body)==true){
                iparr.removeByValue(msg.body);
                Cache.put("docker_ips",iparr);
                log("docker_ips: "+iparr.join(","));
                Shell.execute("./app/console/server/updateNginx.sh",0,iparr.join(","),"/home/tools/nginx/conf/nginx.conf");
            }
        }
    }

    function _init_() {

        var increasesubject = "rdk.nodes.increase",reducesubject = "rdk.nodes.reduce";

        var role=file.loadProperty("app/console/server/application.properties").getProperty("role");
        log("rdk_console_role: "+role);
        if (!role) {
            return;
        }
        Cache.put("rdk_console_role",role);

        if (role.equals("console")){
            mq.subscribe(increasesubject,"increasecallback","init.js");
            mq.subscribe(reducesubject,"reducecallback","init.js");

        }else{
            log("docker ip:"+Host.getIp()[0]);
            mq.p2p(increasesubject,Host.getIp()[0]+":5812");
        }

    }

    function _appInit_(param) {
        log("appName"+param)
        var appInit=require("app/"+param+"/server/init.js");
        try{
            appInit.init();
        }
        catch(e){
            Log.error("call app init error,app="+param);    
        }
        
    }

    function _appClear_(param) {
        log("clear app cache:"+param);
        Cache.clear();
    }

    return {
        "init": _init_,
        "increasecallback": _increasecallback_,
        "reducecallback": _reducecallback_,
        "get":_appInit_,
        "delete":_appClear_
    }

})();

