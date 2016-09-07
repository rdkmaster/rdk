(function() {

    return function(request, script) {
        //引入假数据，实际开发不可以引入
        require('$svr/mock_api.js');

        //打印前端传过来的查询条件
        log(request);

        var tableUtil = require('app/common/server/util/tableUtil.js');
        var sql = 'select clttime,cityname,webrspsuccrate,webdownloadrate,webrspdelay ' +
            'from aggr_web_day_month_201607 ' +
            'where clttime between "' + request.beginTime + '" and "' + request.endTime +
            '" and city in (' + request.citys.join(',') + ')';

        var tableUtil = require('app/common/server/util/tableUtil.js');
        sql = tableUtil.generatePagingSQL(sql, request.paging.pageSize, request.paging.currentPage || 1);
        //对数据库字段做国际化

        var neMap = buffer('cityname', function() {
            return mapper("select cityid, cityname from dim_comm_city", 'cityid', 'cityname');
        });
        var mapIt = { cityname: kv(neMap)};

        var data =  matrix(sql, mapIt);
        data.header = ['日期', '城市名','网页响应成功率','网页下载速率','网页响应时延'];
        return data;
    }

})();