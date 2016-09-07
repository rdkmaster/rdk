(function() {
    return function(request, script) {
        //引入假数据，实际开发不可以引入
        require('$svr/mock_api.js');

        log('querying citys!');
        var m = matrix('select cityid, cityname from dim_comm_city');
        log('city result', m);
        return m;
    }
})();