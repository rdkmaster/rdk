(function() {

    function aa(request, script) {
        //服务的第一行代码写在这里！
        var a = 123;
        // a.indexOf('aaa')

        // throw {status:'500', detail: 123};
        // Request.completeWithError('501', 134)

        return {"a.b": 'a.b.c', c: 123, d: "ffffff服务的第一行代码写在这里！fffff", e: request};
    }

    return {
    	put: aa, 
    	// get: aa
    }

})();
