(function() {
    return function(request) {
        var key = request.key;
        var conditions = request.conditions;
        var map = require('app/common/conf/dim_conf.js');
        var sqlStr = map[key];
        if (conditions != null && conditions.length != 0) {
            for (var i = 0; i < conditions.length; i++) {
                var conditionKey = conditions[i].key;
                var conditionValue = conditions[i].value;
                var replaceValue = "";
                if (conditionValue.length == 1) {
                    replaceValue = conditionValue[0];
                } else {
                    replaceValue = conditionValue.join(",");
                }
                sqlStr = sqlStr.replace(new RegExp("#" + conditionKey + "#", 'gm'), replaceValue);
            };
        }

        var resultSet = sql(sqlStr);
        var metaData = resultSet.getMetaData();
        var metaDataCount = metaData.getColumnCount();
        var resultArray = new Array();
        var rowResult;
        while (resultSet.next()) {
            rowResult = {};
            for (var i = 1; i <= metaDataCount; i++) {
                  rowResult[metaData.getColumnLabel(i)] = resultSet.getObject(i);
            }
            resultArray.push(rowResult);
        }
        clear(resultSet);
        var result = {};
        result.key = key;
        result.result = resultArray;

        return result;

    }
})();
