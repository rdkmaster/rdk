(function() {

  
Date.prototype.isLeapYear = function()   
{   
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));   
}   

var Week = ['日','一','二','三','四','五','六'];
Date.prototype.format = function(formatStr)
{   
    var str = formatStr;
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth() + 1);
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
  
    return str;   
}

Date.prototype.getFirstDateOfWeek = function() {
    var firstDateOfWeek;
    var theDate = new Date(this.valueOf());
    theDate.setDate(theDate.getDate() - theDate.getDay());
    theDate.setHours(0,0,0);

    firstDateOfWeek = theDate;
    return dateFormate(firstDateOfWeek,'yyyy-MM-dd hh:mm:ss');
}

Date.prototype.getWeekOfYear = function(weekStart) {
    // weekStart：每周开始于周几：周日：0，周一：1，周二：2 ...，默认为周日  
    weekStart = (weekStart || 0) - 0;
    if (isNaN(weekStart) || weekStart > 6) {
        weekStart = 0;
    }
    var year = this.getFullYear();
    var firstDay = new Date(year, 0, 1);
    var firstWeekDays = 7 - firstDay.getDay() + weekStart;
    var dayOfYear = (((new Date(year, this.getMonth(), this.getDate())) - firstDay) / 86400000) + 1;
    return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
}

Date.prototype.getFirstDate = function(interval) {
    switch (interval) {
        case "week":
            return this.getFirstDateOfWeek();
        case "month":
            var date = new Date(this.getFullYear(),this.getMonth(),1);
            return dateFormate(date,'yyyy-MM-dd hh:mm:ss');
        case "year":
            var date = new Date(this.getFullYear(),0,1);
            return dateFormate(date,'yyyy-MM-dd hh:mm:ss');
    }
}

Date.prototype.getNumOfYear = function(interval, date) {
    switch (interval) {
        case "week":
            return this.getWeekOfYear();
        case "month":
            return this.getMonth()+1;
    }
}

Date.prototype.add = function(strInterval, Number) {
    var date = this;
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
}  

Date.prototype.diff = function(strInterval, date) {
    var dtEnd = _.isString(date) ? new Date(date) : date;
    var long = dtEnd.valueOf() - this.valueOf(); //相差毫秒
    switch (strInterval.toLowerCase()) {
        case "year":
            return parseFloat(date.getFullYear() - this.getFullYear());
        case "month":
            return parseFloat((date.getFullYear() - this.getFullYear()) * 12 + (date.getMonth() - this.getMonth()));
        case "d":
            return parseFloat(long / 1000 / 60 / 60 / 24);
        case "week":
            return parseFloat(long / 1000 / 60 / 60 / 24 / 7);
        case "h":
            return parseFloat(long / 1000 / 60 / 60);
        case "n":
            return parseFloat(long / 1000 / 60);
        case "s":
            return parseFloat(long / 1000);
        case "l":
        case "ms":
            return parseFloat(long);
    }
}


})();
