(function() {
    function existTable(tableName) {
        var querySQL = "select 1 from gbase.table_distribution where tbName='" + tableName + "' ";
        var resultSet = sql(querySQL);
        var flag = false;
        if (resultSet.next()) {
            flag = true;
        }
        clear(resultSet);
        return flag;
    }

    return {
        generateTableNames: function(baseTableName, beginTime, endTime, granularity) {
            var granularityMap = {
                "3": "15min_week",
                "4": "hour_week",
                "5": "day_month",
                "6": "month_year"
            };
            var dateMap = {
                "3": "week",
                "4": "week",
                "5": "month",
                "6": "year"
            };
            var dateLib = require("app/common/server/util/dateUtil.js");
            var commonLib = require("app/common/server/util/util.js");
            var result = new Array();
            var startTimeDate = new Date(beginTime);
            var endTimeDate = new Date(endTime);
            var diff_num = parseInt(dateLib.dateDiff(dateMap[granularity], startTimeDate, endTimeDate)) + 1;
            for (var i = 0; i <= diff_num; i++) {
                var v_startTime = startTimeDate.getFullYear();
                if(dateMap[granularity] != "year"){
                    var num = parseInt(dateLib.getNumOfYear(dateMap[granularity],startTimeDate));
                    v_startTime = v_startTime + "" + commonLib.padLeft(num.toString(), 2);
                }
                var firstDate = dateLib.getFirstDate(dateMap[granularity],startTimeDate);
                if (endTime >= firstDate) {
                    var v_tablename = baseTableName + "_" + granularityMap[granularity] + "_" + v_startTime;
                    if (existTable(v_tablename)) {
                        result.push(v_tablename);
                    }
                    startTimeDate = dateLib.dateAdd(startTimeDate, dateMap[granularity], 1);
                };
            };
            return result;
        },
        generateSQL: function(baseSql, conditions) {
            for (var i = 0; i < conditions.length; i++) {
                var conditionKey = conditions[i].field;
                var conditionValue = conditions[i].value;
                var replaceValue = "";
                if (conditionValue.length == 1) {
                    replaceValue = conditionValue[0];
                } else {
                    replaceValue = conditionValue.join(",");
                }
                baseSql = baseSql.replace(new RegExp("#" + conditionKey + "#", 'gm'), replaceValue);
            }

            return baseSql;
        },
        generateUnionSQL: function(baseSql, tableNames) {
            var sql = new Array();
            for (var i = 0; i < tableNames.length; i++) {
                sql.push(baseSql.replace("#tableName#",tableNames[i]));
            }
            return sql.join(" union all ");
        },
        existTable: existTable,
        generatePagingSQL: function(baseSql, pageSize, pageNum) {
            return " select * from ( " + baseSql + " ) pageSQL limit " + pageSize + " offset " + (pageNum - 1) * pageSize;
        },
        generatePagingSQLCount: function(baseSql) {
            return "select count(*) from ( " + baseSql + " ) pageCountSQL ";
        },
        generatePagingObject:function(totalRecord,currentPage,pageSize){
            var paging = {};
            paging.totalRecord = totalRecord;
            paging.currentPage = currentPage;
            paging.pageSize = pageSize;
            paging.totalPageNum = Math.ceil(totalRecord/pageSize);
            return paging;
        },
        generateFilterSQL: function(searchKey, searchValue, baseSql){
            var fieldStr = "(to_char(" + searchKey[0] + ") like '%" + searchValue + "%')";
            for(var i=1; i<searchKey.length; i++){
                var mySql = "(to_char(" + searchKey[i] + ") like '%" + searchValue + "%')";
                fieldStr = fieldStr + " or " + mySql;
            }
            return "select * from (" + baseSql + ") where " + fieldStr;
        }
    }
})();
