(function () {
/**
 * 根据第一个key值获取其下的子内容，逗号分隔子项。
 * @param sKey：datasource.cfg中第一个key，有pool,db等
 *     
 * @returns sChild：子内容字符串。
 */
    var fnGetConfig = function(sKey) {
         var sChild = "";
        var list = java.Config.getConfig(sKey).root().keySet().iterator();
        while (list.hasNext()) {
            var sKeyChild = list.next();
            var sUrl = java.Config.get(sKey + "." + sKeyChild + ".url");
            var sSecond = java.Config.get(sKey + "." + sKeyChild);
            //url特殊，需要单独加上引号
            if(sUrl) {
                var sUrlFull = "url="+sUrl;
                sChild += "," + sKeyChild + sSecond.replace(sUrlFull,'url="'+sUrl+'"');
            }
            else {
                sChild += "," + sKeyChild + sSecond;
            }
        }
        return sChild;
    }
  
/**
 * 参照datasource.cfg内容格式化。
 * @param sKey：datasource.cfg中第一个key，有pool,db等
 *     
 * @returns sContentFormat：格式化后的子内容字符串。
 */  
    var fnGetConfigFormat = function(sKey) {
        var sChild = fnGetConfig(sKey);
        var sChildFormat = sChild.replace(/,/g,"\n").replace(/{/g,"{\n ").replace(/}/g,"\n}");       
        var sContentFormat = sKey + "{" + sChildFormat + "\n}\n";
        
        return sContentFormat;
    }

/**
 * 获取datasource参数列表。
 * @param 无
 *     
 * @returns asConfig：格式为
 [
  "db.mysql_test.driver=com.mysql.jdbc.Driver",
  "db.mysql_test.poolRef=pool.my_custom",
"db.mysql_test.url=jdbc:mysql://10.43.149.231:3306/dap_model?user=root&password=U_tywg_2013&useUnicode=true&characterEncoding=UTF8"
]
 */     
    var fnGetDatasourceList = function() {
        var asConfig = [];
        var asFirstKey = ["db"];
        log(asFirstKey.length);
        for(var iDb=0;iDb<asFirstKey.length;iDb++) {
            var sFirstKey = asFirstKey[iDb];
            var oDataKey1 = java.Config.getConfig(sFirstKey);
            var oIt1 = oDataKey1.root().keySet().iterator();
            while (oIt1.hasNext()) {
                var sSecondKey = oIt1.next();
                var oDataKey = java.Config.getConfig(sFirstKey+"."+sSecondKey);
                var oIt2 = oDataKey.root().keySet().iterator();
                var sThirdKey = "";
                while(oIt2.hasNext()) {
                    sThirdKey = oIt2.next();
                    var sFullKey = sFirstKey+"."+sSecondKey+"."+sThirdKey;
                    asConfig.push(sFullKey+"=" + java.Config.get(sFullKey));
                }
            }
        }
        
        return asConfig;
    }
   
/**
 * 删除内存中内容。
 * @param oParam: json对象，格式为{"dbName":"db.xxxxx"}
 *     
 * @returns 无
 */    
    var fnDelDatasourceMem = function(oParam) {
        var asKeyChild = oParam.dbName.split(".");
        var iLength = asKeyChild.length;
        var dbNameParam = "";
        if (iLength < 1) {
            return "request error:" + request;
        }else if(iLength == 2) {
            dbNameParam = asKeyChild[0]+"." +asKeyChild[1];
        }else if(iLength == 3) {
            dbNameParam = asKeyChild[0]+"." +asKeyChild[1]+"." +asKeyChild[2];
        }
        Data.removeDataSource(dbNameParam);
        
        fnClearnInvalidDatasourceMem();
    }
    
/**
 * 删除内存中只有二级key的内容。
 * 场景：当页面删有且仅有一条数据库实例的数据时，会遗留垃圾数据。如:db.aa.bb，删除后会遗留db.aa的记录
 * @param 无 
 *     
 * @returns 无
 */    
    var fnClearnInvalidDatasourceMem = function() {
        var asDelKey = [];
        var asFirstKey = ["db"];
        for(var iDb=0;iDb<asFirstKey.length;iDb++) {
            var sFirstKey = asFirstKey[iDb];
            var oDataKey1 = java.Config.getConfig(sFirstKey);
            var oIt1 = oDataKey1.root().keySet().iterator();
            while (oIt1.hasNext()) {
                var sSecondKey = oIt1.next();
                var oDataKey = java.Config.getConfig(sFirstKey+"."+sSecondKey);
                var oIt2 = oDataKey.root().keySet().iterator();
                if(!oIt2.hasNext()) {
                    asDelKey.push(sFirstKey + "." + sSecondKey);
                }
            }
        }
        log(asDelKey);
        
        for(var iNum=0;iNum<asDelKey.length;iNum++) {
            Data.removeDataSource(asDelKey[iNum]);
        }
    }

/**
 * 修改文件中内容。增、改、删操作公用。
 * @param 无
 *     
 * @returns ret: true/false
 */    
    var fnModifyDatasourceFile = function() {
        var sFilePath = "./proc/conf/datasource.cfg";
        var sPoolContent = fnGetConfigFormat("pool");
        log(sPoolContent);
        var sDbContent = fnGetConfigFormat("db");
        log(sDbContent);
        
        var ret = true;
        if (File.save(sFilePath, sPoolContent)) {
            ret = File.save(sFilePath, sDbContent, true);
            log("ret: "+ret);
        }
        
        return ret;
    }

    return {
        post: function (request, script) {
        log(request);
         
        if(request.opt == "create" ||request.opt == "update") {
            if (!request || !request.body) {
                request.completeWithError(400, 'need db property');
            }
            //var by = {"db":{"my":{"url":"myurl","driver":"mydirver","poolRef":"myref","aa":"myaa"}}};
            Data.setDataSource(request.body);
           
            var bRet = fnModifyDatasourceFile();
            if(bRet != true) {
                return false;
            }
            return 'ok';
        }
        else if(request.opt == "delete" &&request.body) {
            fnDelDatasourceMem(request.body);  
            var bRet = fnModifyDatasourceFile();
            if(bRet != true) {
                return false;
            }
            return 'ok';
        }
        },
        get: function (request, script) {
            log(request);
           
            var asConfig = fnGetDatasourceList();
            log(asConfig);
            return asConfig;
        },
        //此方法废弃，delete方法带json参数没有现成接口
        delete: function (request, script) {
            var reqLst = request.dbName.split(".")
            if (reqLst.length < 1) {
                return "request error!" + request;
            }
            var dbName = "db." +reqLst[1];
            Data.removeDataSource(dbName);
            return 'ok';
        }
    }
})();
