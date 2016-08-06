(function() {
    function padLeft(str, length) {
        if (str.length >= length)
            return str;
        else
            return padLeft("0" + str, length);
    }
    return {
        padLeft: padLeft,
        transIP: function(numIp) {
            var ip = '';
            //IPV6
            if (numIp.length > 8) {
                for (var i = 0; i < numIp.length; i += 4) {
                    var subNumIp = numIp.substring(i, i + 4);
                    ip += subNumIp + ':';
                };
            } else {
                for (var i = 0; i < numIp.length; i += 2) {
                    var num = numIp.substring(i, i + 2);
                    num = parseInt('0x' + num);
                    ip += num + '.';
                }
            }

            return ip.substring(0, ip.length - 1);
        },
        generateSQLWithCondition: function(baseSql, param) {
            for (var i = 0; i < param.condition.length; i++) {
                var conditionKey = param.condition[i].field;
                var conditionValue = param.condition[i].value;
                var value = "";
                if (conditionValue.length == 1) {
                    baseSql = baseSql + " and " + conditionKey + " = #" + conditionKey + "#";
                } else if (conditionValue.length == 0){
                    baseSql = baseSql;
                }else {
                    baseSql = baseSql + " and " + conditionKey + " in ( #" + conditionKey + "# )";
                }
            }
            return baseSql;
        },
        transRate: function(value, fixed) {
            if (fixed == undefined) fixed = 2;
            if (typeof(value) == "string") value = parseFloat(value);
            return value.toFixed(fixed) + "%";
        }
    }
})();
