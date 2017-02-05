(function() {

    return function(request, script) {
        var data = Cache.aging.get('big-data-test');
        if (!data) {
            data = createRandomData();
            Cache.aging.put('big-data-test', data, 60*1000);
        }
        return data;
    }

    function createRandomData() {
        var dt = new DataTable([], [], []);

        var dataLen = 100000;
        var colLen = 50;
        log('createRandomData, dataLen=' + dataLen + ' , colLen=' + colLen);
        var colTypes = [];
        for (var i = 0; i < colLen; i++) {
            dt.header.push('header' + i);
            dt.field.push('f' + i);
            colTypes.push(random(1, 3));
        }

        for (var i = 0; i < dataLen; i++) {
            if (i % 2000 == 0) {
                log(i + ' rows has been created! ' + (dataLen-i) + ' rows to go...');
            }
            var row = [];
            for (var j = 0; j < 100; j++) {
                if (colTypes[j] == 1) {
                    row.push(random(0, 1000));
                } else if (colTypes[j] == 2) {
                    row.push(random(0, 1000, true));
                } else {
                    row.push(randomString());
                }
            }
            dt.data.push(row);
        }
        log('createRandomData, done!');
        return dt;
    }

    function random(min, max, isFloat) {
        var r = Math.random() * 1000000;
        if (isFloat) {
            r = r % (max - min);
        } else {
            r = Math.round(r);
            r = r % (max - min + 1);
        }
        r += min;
        return r;
    }

    function randomString() {
        var len = random(1, 50);
        var s = '';
        for (var i = 0; i < len; i++) {
            s += String.fromCharCode(random(65, 90));
        }
        return s;
    }

})();
