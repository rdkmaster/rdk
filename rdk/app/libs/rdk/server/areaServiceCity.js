(function() {
    return function(request, script) {
        //引入测试数据
        require('app/libs/rdk/server/areaData.js');
        log(request); //打印前端传过来的查询条件
        var sql = 'SELECT CITY_ID, CITY_NAME FROM DIM_COMM_CITY WHERE PROVINCE_ID ='+request.provinceId;
        var data = matrix(sql,request);
        return data;
    }
})();

//请这里的几个函数的作用是为了覆盖rdk后端api中的同名函数
//以达到脱离数据库返回假数据的目的，实际开发时，切勿引入这些函数。
function matrix(sql, request) {
    log('select city where provinceId' + request.provinceId);
    var province_id = request.provinceId;
    var resultCitys = [];
    for (var i = 0,cityDataLen=citys.length; i<cityDataLen; i++) {
        if(citys[i]['ProID'] == province_id)
        {
            resultCitys.push(citys[i]);
        }
    }
    return {
        header: ['CITY_ID', 'CITY_NAME','PROVINCE_ID'],
        field: ['CITY_ID', 'CITY_NAME','PROVINCE_ID'],
        data: resultCitys.sort(
            function(a,b){
                return a.name.length-b.name.length
            }
        )
    }
}

