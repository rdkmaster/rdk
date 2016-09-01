(function() {

    return function(request, script) {
        //服务的第一行代码写在这里！

        //为了演示blockUI的效果，这里故意延迟返回


        return Data.executeUpdate(["update dim_comm_city set city_name='unknowntest' where province_id=0;","insert into dim_ne value(1,1,'test',1,'test')"]);
    }

})();
