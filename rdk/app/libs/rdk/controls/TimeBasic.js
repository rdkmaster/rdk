define(['jquery', 'bootstrap',
        'bootstrap-select', 'bootstrap-datepicker-i18','css!rd.styles.TimeBasic'
    ],
    function() {
        var timeApp = angular.module('rd.controls.TimeBasic', []);

        timeApp.service('TimeUtilService', [function() {
            return {
                dateFormate: function(date, formatStr) {
				    if(angular.isDate(date)){
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
					}else{
					   return "";
					}
                    
                },
                dateAdd: function(date, strInterval, Number) {
				    if(angular.isString(date)){
					    date = date.replace(/-/g,"/");
					}
                    switch (strInterval) {
                        case 's':
                            return new Date(Date.parse(date) + (1000 * Number));
                        case 'n':
                            return new Date(Date.parse(date) + (60000 * Number));
                        case 'h':
                            return new Date(Date.parse(date) + (3600000 * Number));
                        case 'd':
                            return new Date(Date.parse(date) + (86400000 * Number));
                        case 'w':
                            return new Date(Date.parse(date) + ((86400000 * 7) * Number));
                        case 'q':
                            return new Date(date.getFullYear(), (date.getMonth()) + Number * 3, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                        case 'm':
                            return new Date(date.getFullYear(), (date.getMonth()) + Number * 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                        case 'y':
                            return new Date((date.getFullYear() + Number * 1), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                    }
                },
                getWeekOfYear: function(date, weekStart) {
                    // weekStart：每周开始于周几：周日：0，周一：1，周二：2 ...，默认为周日
                    weekStart = (weekStart || 0) - 0;
                    if (isNaN(weekStart) || weekStart > 6)
                        weekStart = 0;
                    var year = date.getFullYear();
                    var firstDay = new Date(year, 0, 1);
                    var firstWeekDays = 7 - firstDay.getDay() + weekStart;
                    var dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / 86400000) + 1;
                    return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
                },
                getDateForStringDate: function(dateStr){
                    if(angular.isString(dateStr) && dateStr!=""){
                        dateStr = dateStr.replace(/-/g,"/");
                         var arr = dateStr.split('/');//new Date带-参数时
                        if(arr.length == 2) dateStr = dateStr + '/01';//month时处理
                        return new Date(dateStr);
                    }
                    return dateStr;   
                },

                checkIfMacro : function(timeMacro){
                    if (angular.isString(timeMacro)) {
                        var isLetter = /^[a-z]/i;
                        timeMacro = timeMacro.toLowerCase();
                         if (isLetter.test(timeMacro)) {
                            return true;
                         }
                    }
                    return false;
                },

                getTimeMacroCalculate:function(timeMacro){
                    if (angular.isString(timeMacro)) {
                        var isLetter = /^[a-z]/i;
                        timeMacro = timeMacro.toLowerCase();
                        if (isLetter.test(timeMacro)) {
                            timeMacro = timeMacro.replace(/\s+/g, "");
                            var fullPara = /([a-z]+)(\+|\-)?([\d]+)([a-z]+)?/i;
                            var timeMacroArr = fullPara.exec(timeMacro);
                            var result = null;
                            if (timeMacroArr && timeMacroArr[2] != undefined) {
                                result = this.dateAdd(_timeMacroConvert(timeMacroArr[1]), timeMacroArr[4], "" + timeMacroArr[2] + timeMacroArr[3]);
                                return result;
                            } else {
                                return _timeMacroConvert(timeMacro);
                            }
                        } else {
                            return this.getDateForStringDate(timeMacro);
                        }
                    } else {
                        return timeMacro;
                    }
                }
            };
            function _timeMacroConvert(timeMacro) {
                var date;
                switch (timeMacro) {
                    case 'now':
                        date = new Date();
                        break;
                    default:
                        date = timeMacro;
                        break;
                }
                return date;
            }
        }]);

        timeApp.constant('TimeUnit', {
            QUARTER: 'quarter',
            HOUR: 'hour',
            DAY: 'date',
            WEEK: 'week',
            MONTH: 'month'
        });

        timeApp.constant('TimeFormate', {
            QUARTER: 'yyyy-MM-dd hh:mm',
            HOUR: 'yyyy-MM-dd hh:00',
            DAY: 'yyyy-MM-dd',
            WEEK: 'yyyy-MM-dd',
            MONTH: 'yyyy-MM'
        });

        timeApp.constant('TimeMacro', {
            NOW: 'now'
        });

        timeApp.constant('TimeGap', {
            INDAY: 'inday',
            INWEEK: 'inweek',
            INMONTH: 'inmonth',
            INYEAR: 'inyear',
        });

        timeApp.constant('PickerConstant', {
            HOUR: 0,
            DAY: 1,
            MONTH: 2,
            YEAR: 3,
            DECADE: 4
        });

    });
