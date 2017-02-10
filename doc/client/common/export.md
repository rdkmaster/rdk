<rdk_title>RDK公共导出服务</rdk_title>

rdk 提供了可支持导出excel，csv，txt格式的公共导出服务

## 服务url

	http://ip:port/rdk/service/common/export?p=
		%7B%22source%22:%7B%22url%22:%22http://localhost:5812/rdk/service/app/example/server/my_service%22
		%7D,%22fileType%22:%22txt%22,%22param%22:%7B%22excludeIndexes%22:%7B'sheet1':%5B'a'%5D,
		'sheet2':%5B'0'%5D%7D%7D%7D

参数p被url编码，格式为：

	{
		"source":{
			"url":"",
			"peerParam":""
		},
		"fileType":"",
		"param":{}
	}

参数含义：

- "source":要导出文件的数据源，url必选，peerParam可选；rdk会根据url和peerParam发送get请求以获取数据源，若是本机服务，可省略前缀ip和port,rdk会自动帮您完成拼接。数据源的格式应和所要导出的文件所需格式一致。excel请参考[file.saveAsEXCEL](service_file_api.md#saveAsEXCEL) content格式，csv请参考[file.saveAsCSV](service_file_api.md#saveAsCSV) content格式，txt请参考[file.save](service_file_api.md#save) content格式。
- "fileType":要导出文件类型，必选，值为"csv"，"excel"，"txt"，不区分大小写。
- "param":可选，导出文件时所需的辅助参数，对于excel和csv即为excludeIndexes和option，请参考上述**file.saveAsEXCEL** 和 **file.saveAsCSV** api中各自的参数格式；对于txt即为append和encoding，请参考上述**file.save** api中的参数格式。

示例1：访问本机 `/rdk/service/app/example/server/my_service` 服务获取数据源并导出excel文件，同时隐藏sheet1的第a列和sheet2的第0列。
请求url为（需要编码）：

	http://localhost:5812/rdk/service/common/export?p={
			"source": {
				"url":"/rdk/service/app/example/server/my_service"
			},
			"fileType":"excel",
			"param":{
				"excludeIndexes":{
					'sheet1':['a'],
					'sheet2':['0']
				}
			}
		}

my_service.js 服务：

				
	(function() {
		return function(request, script) {
			var content={                 
							'sheet1':new DataTable(['A','B'],['a','b'],[[1,2],[3,4]]),
						
							'sheet2':
								[['30','test1'],['20','test2']]
						};
			return content;
		}
	})();

示例2：从 `/rdk/service/app/example/server/my_service` 服务获取数据源并导出csv文件。

请求url为（需要编码）：

	
	http://localhost:5812/rdk/service/common/export?p={"source":{"url":"/rdk/service/app/example/server/my_service"},"fileType":"csv"}

my_service.js 服务：

				
	(function() {
		return function(request, script) {
			return  new DataTable(['网元','名字'],['neid','name'],[['30','test1'],['20','test2']]);
		}
	})();


示例3：从 `/rdk/service/app/example/server/my_service` 服务获取数据源并导出txt文件。

请求url为（需要编码）：


	 http://localhost:5812/rdk/service/common/export?p={
		 	"source":{
		 		"url":"/rdk/service/app/example/server/my_service"
			},
			"fileType":"txt"
		}

my_service.js 服务：

	(function() {
		return function(request, script) {
			return  "rdk common download";
		}
	})();