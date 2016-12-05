
var date = new Date('2016/06/04 00:00:00');
var simulateData = [];
for (var i = 0; i < 110; i++) {
	date = date.add('d', 1);
	var dateStr = date.format("YYYY/MM/DD");
	simulateData.push([dateStr, '南京', randomNum(90, 100), randomNum(1500, 2500), randomNum(15, 25)]);
	simulateData.push([dateStr, '扬州', randomNum(90, 100), randomNum(1500, 2500), randomNum(15, 25)]);
	simulateData.push([dateStr, '苏州', randomNum(90, 100), randomNum(1500, 2500), randomNum(15, 25)]);
	simulateData.push([dateStr, '镇江', randomNum(90, 100), randomNum(1500, 2500), randomNum(15, 25)]);
}

function randomNum(min, max) {   
	var range = max - min;   
	var rand = Math.random();   
	return (min + rand * range).toFixed(2);   
}  

//请这里的几个函数的作用是为了覆盖rdk后端api中的同名函数
//以达到脱离数据库返回假数据的目的，实际开发时，切勿引入这些函数。
var Data = {
    fetch: function (sql, maxLine) {
        if (!maxLine || !_.isDefined(maxLine)){
            Log.warn("param maxLine empty,set maxLine=4000");
            maxLine=4000;
        }

        if (!_.isNumber(maxLine)) {
            Log.error("maxLine must be a number!");
            return;
        }
        //var dataObj = JSON.parse(rdk_runtime.fetch(sql, maxLine));
        if (sql == 'select cityid, cityname from dim_comm_city') {
			var nj = rdk_runtime.locale() == 'zh_CN' ? '南京' : 'Nan Jing';
			var yz = rdk_runtime.locale() == 'zh_CN' ? '扬州' : 'Yang Zhou';
			var sz = rdk_runtime.locale() == 'zh_CN' ? '苏州' : 'Su Zhou';
			var zj = rdk_runtime.locale() == 'zh_CN' ? '镇江' : 'Zhen Jiang';
			return {
				header: ['cityid', 'cityname'],
				field: ['cityid', 'cityname'],
				data: [
					[1, nj], [2, yz], [3, sz], [4, zj],
				]
			}
		} else if (sql.indexOf('select clttime,cityname,webrspsuccrate,webdownloadrate,webrspdelay from aggr_web_day_month_201607') != -1) {
			var match = (/city\s+in\s+\((.+?)\)/g).exec(sql);
			var citys = !!match ? match[1] : '1,2,3,4';
			
			var data = [];
			each(simulateData, function(row) {
				if (citys.indexOf(row[1]) != -1) {
					data.push(row);
				}
			});

			var match = (/pageSQL\s+limit\s+(\d+)\s+offset\s+(\d+)/g).exec(sql);
			if (match) {
				var size = parseInt(match[1]);
				var idx = parseInt(match[2]);
			} else {
				var size = data.length;
				var idx = 0;
			}
			
			var result = {
				header: ['clttime', 'cityname','webrspsuccrate','webdownloadrate','webrspdelay'],
				field: ['clttime', 'cityname','webrspsuccrate','webdownloadrate','webrspdelay'],
				data: [],
				paging: {
					totalRecord: data.length,
					pageSize: size,
					totalPageNum: Math.ceil(data.length/size),
					currentPage: idx/size+1
				}
			}
			for (var i = idx; (i < idx + size) && (i < data.length); i++) {
				result.data.push(data[i]);
			}
			
			return result;
		}
    }
}
