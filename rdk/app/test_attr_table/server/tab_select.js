(function() {
    return function(request, script) {
        //服务的第一行代码写在这里！
        return {
          "header":["姓名","职位","薪资","入职日期","部门","其他"],
          "field" :["name","position","salary","start_date","office","extn"],
           "data" :[
                ["aaa","employeer","$5000","2016/05/10","data","1001"],
                ["bbb","employeer","$5000","2016/05/11","data","1002"],
                ["ccc","employeer","$5000","2016/05/10","data","1001"],
                ["ddd","employeer","$5000","2016/05/11","data","1002"],
                ["eee","employeer","$5000","2016/05/10","data","1001"],
                ["fff","employeer","$5000","2016/05/11","data","1002"],
                ["ggg","employeer","$5000","2016/05/10","data","1001"],
                ["hhh","employeer","$5000","2016/05/11","data","1002"],
                ["jjj","employeer","$5000","2016/05/10","data","1001"],
                ["kkk","employeer","$5000","2016/05/11","data","1002"],
                ["lll","employeer","$5000","2016/05/10","data","1001"],
                ["mmm","employeer","$5000","2016/05/11","data","1002"]
           ]
        };
    }

})();
