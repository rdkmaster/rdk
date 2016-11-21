/**
 * Created by 10184092 on 2016/11/4.
 */
(function () {

    var vmaxOpLogInfo = {
        sequenceno: "",
        clientip: "",
        issuccess: "",
        logtype: "",
        logstartdate: "",
        loginitdate: "",
        commandcode: "",
        logrank: "2",
        descinfo: "查询数据",
        logenddate: "",
        connectmode: "GUI",
        oprateset: "",
        paraDetail: "",
        username: "",
        servicename: "vmax",
        rolename: "vmaxcn",
        hostname: ""
    }

    function getUserName(sessionId) {
        //从缓存中取
        var userName = Cache.aging_get("VmaxOperateLog_" + sessionId)
        if (!userName) {  //缓存中没有则发rest请求取并加入缓存
            userName = rest.get("/web/rest/web-common/common?action=getUserName", {
                requestProperty: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Cookie": "JSESSIONID=" + sessionId
                }
            });
            if (userName) {
                Cache.aging_put("VmaxOperateLog_" + sessionId, userName);
                return userName
            } else {
                return ""
            }
        }
        return userName
    }

    return function (userOpInfo, reqCtxHeader) {

        //根据reqCtxHeaderInfo填vmaxOpLogInfo
        if (reqCtxHeader.hasOwnProperty("Cookie") && reqCtxHeader.Cookie) {
            var sessionIds = reqCtxHeader.Cookie.split(";").filter(
                function getSessionId(value) {
                    return value.contains("JSESSIONID");
                });
            if (sessionIds && sessionIds.length > 0) {
                var sessionIdValue = sessionIds[0].replace("JSESSIONID=", "")
                if (sessionIdValue) {
                    vmaxOpLogInfo.username = getUserName(sessionIdValue);
                }
            }
        }

        if (reqCtxHeader.hasOwnProperty("X - Real - IP") && reqCtxHeader.X - Real - IP) {
            vmaxOpLogInfo.clientip = reqCtxHeader.X - Real - IP
        }

        if (getHostName()) {
            vmaxOpLogInfo.hostname = getHostName()
        }


        //根据userOpInfo 填vmaxOpLogInfo
        for (var key in userOpInfo) {
            vmaxOpLogInfo[key] = userOpInfo[key]
        }
        Log.info(vmaxOpLogInfo)
        mq.p2p("activemq_logproxy_message", JSON.stringify(vmaxOpLogInfo))
    }
})();