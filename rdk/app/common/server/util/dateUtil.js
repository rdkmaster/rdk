(function() {
    function getWeekOfYear(date, weekStart) {
        // weekStart：每周开始于周几：周日：0，周一：1，周二：2 ...，默认为周日  
        weekStart = (weekStart || 0) - 0;
        if (isNaN(weekStart) || weekStart > 6)
            weekStart = 0;
        var year = date.getFullYear();
        var firstDay = new Date(year, 0, 1);
        var firstWeekDays = 7 - firstDay.getDay() + weekStart;
        var dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / 86400000) + 1;
        return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
    }

    function dateFormate(date, formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
        str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
        str = str.replace(/M/g, date.getMonth() + 1);
        str = str.replace(/w|W/g, Week[date.getDay()]);
        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());
        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());
        str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());
        return str;
    }

    function getFirstDateOfWeek(theDate) {
        var firstDateOfWeek;
        theDate.setDate(theDate.getDate() - theDate.getDay());
        theDate.setHours(0,0,0);

        firstDateOfWeek = theDate;
        return dateFormate(firstDateOfWeek,'yyyy-MM-dd hh:mm:ss');
    }
    return {
        getFirstDateOfWeek: getFirstDateOfWeek,
        getFirstDate: function(interval, date) {
            switch (interval) {
                case "week":
                    return getFirstDateOfWeek(date);
                case "month":
                    var date = new Date(date.getFullYear(),date.getMonth(),1);
                    return dateFormate(date,'yyyy-MM-dd hh:mm:ss');
                case "year":
                    var date = new Date(date.getFullYear(),0,1);
                    return dateFormate(date,'yyyy-MM-dd hh:mm:ss');
            }
        },
        getNumOfYear: function(interval, date) {
            switch (interval) {
                case "week":
                    return getWeekOfYear(date);
                case "month":
                    return date.getMonth()+1;
            }
        },
        getWeekOfYear: getWeekOfYear,
        dateDiff: function(interval, date1, date2) {
            var long = date2.getTime() - date1.getTime(); //相差毫秒
            switch (interval.toLowerCase()) {
                case "year":
                    return parseInt(date2.getFullYear() - date1.getFullYear());
                case "month":
                    return parseInt((date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth()));
                case "d":
                    return parseInt(long / 1000 / 60 / 60 / 24);
                case "week":
                    return parseInt(long / 1000 / 60 / 60 / 24 / 7);
                case "h":
                    return parseInt(long / 1000 / 60 / 60);
                case "n":
                    return parseInt(long / 1000 / 60);
                case "s":
                    return parseInt(long / 1000);
                case "l":
                    return parseInt(long);
            }
        },
        dateAdd: function(date, strInterval, Number) {
            switch (strInterval) {
                case 's':
                case 'second':
                    return new Date(Date.parse(date) + (1000 * Number));
                case 'n':
                    return new Date(Date.parse(date) + (60000 * Number));
                case 'h':
                    return new Date(Date.parse(date) + (3600000 * Number));
                case 'd':
                    return new Date(Date.parse(date) + (86400000 * Number));
                case 'w':
                case 'week':
                    return new Date(Date.parse(date) + ((86400000 * 7) * Number));
                case 'q':
                    return new Date(date.getFullYear(), (date.getMonth()) + Number * 3, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                case 'm':
                case 'month':
                    var day = new Date(date.getFullYear(), (date.getMonth()) + Number,1).getDate();
                    if(day < date.getDate()){
                        return new Date(date.getFullYear(), (date.getMonth()) + Number, day, date.getHours(), date.getMinutes(), date.getSeconds());
                    }else {
                        return new Date(date.getFullYear(), (date.getMonth()) + Number, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                    }
                case 'y':
                case 'year':
                    return new Date((date.getFullYear() + Number), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            }
        },
        _dataFormat_:dateFormate
    }
})();
