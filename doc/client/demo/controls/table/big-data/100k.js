(function() {

    return function(request, script) {
        var data = Cache.aging.get('big-data-test');
        if (!data) {
            data = createRandomData();
            Cache.aging.put('big-data-test', data, 6*3600);
        }
        return data;
    }


    var CHARS;
    var CHARS_LEN;
    function createRandomData() {
        CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        CHARS_LEN = CHARS.length - 1;
        var StringBuffer = Java.type('java.lang.StringBuffer')
        var stringBuffer = new StringBuffer(100);

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

        //确保前三列是三种不同数据类型
        colTypes[0] = 1;
        colTypes[1] = 2;
        colTypes[2] = 3;

        for (var i = 0; i < dataLen; i++) {
            if (i % 2000 == 0) {
                log(i + ' rows has been created! ' + (dataLen-i) + ' rows to go...');
            }
            var row = [];
            for (var j = 0; j < colLen; j++) {
                if (colTypes[j] == 1) {
                    row.push(random(0, 1000));
                } else if (colTypes[j] == 2) {
                    row.push(random(0, 1000, true));
                } else {
                    randomString(stringBuffer);
                    row.push(stringBuffer.toString());
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

    function randomString(buffer) {
        buffer.setLength(0);
        var len = random(2, 50);
        for (var i = 0; i < len; i++) {
            buffer.append(CHARS[random(0, CHARS_LEN)]);
        }
    }

})();
