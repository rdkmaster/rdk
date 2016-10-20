(function() {
    return function(request, script) {
        //引入测试数据
        require('app/libs/rdk/server/areaData.js');
        log(request); //打印前端传过来的查询条件
        var  sql = 'SELECT ID, AREA_NAME ,CITY_ID FROM DIM_COMM_AREA WHERE CityID ='+request.cityId;
        var data = matrix(sql,request);
        return data;
    }
})();

//请这里的几个函数的作用是为了覆盖rdk后端api中的同名函数
//以达到脱离数据库返回假数据的目的，实际开发时，切勿引入这些函数。
function matrix(sql, request) {
    log('select area where cityId' + request.cityId);
    var cityId = request.cityId;
    var resultAreas = [];
    for (var i = 0,areaDataLen=areas.length; i<areaDataLen; i++) {
        if(areas[i]['CityID'] == cityId)
        {
            resultAreas.push(areas[i]);
        }
    }
    return {
        header: ['AREA_ID', 'AREA_NAME','CITY_ID'],
        field: ['AREA_ID', 'AREA_NAME','CITY_ID'],
        data: resultAreas.sort(
            function(a,b){
                return a.name.length-b.name.length
            }
        )
    }
}

