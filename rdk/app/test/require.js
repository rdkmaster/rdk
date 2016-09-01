/**
 * Created by 10184092 on 2016/8/22.
 */
(function() {
    //这个文件定义了当前应用的功能函数，可以把常用的函数定义在次数方便复用。
    function test(toWho) {
        return "load ok!";
    }

    return {
        hello: test
    }
})();