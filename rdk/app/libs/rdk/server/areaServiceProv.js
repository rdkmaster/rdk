(function() {
    return function(request, script) {
        //引入测试数据
        require('app/libs/rdk/server/areaData.js');
        log(request); //打印前端传过来的查询条件
        var sql= 'SELECT PROVINCE_ID, PROVINCE_NAME FROM DIM_COMM_CITY';
        var data = matrix(sql);
        return data;
    }
})();

//请这里的几个函数的作用是为了覆盖rdk后端api中的同名函数
//以达到脱离数据库返回假数据的目的，实际开发时，切勿引入这些函数。
function matrix(sql) {
    return {
        header: ['PROVINCE_ID', 'PROVINCE_NAME'],
        field: ['PROVINCE_ID', 'PROVINCE_NAME'],
        data: provinces
    }
}

