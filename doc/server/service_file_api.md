<rdk_title>Rest服务中的文件操作API</rdk_title>

### `file.loadProperty()` ###

定义：

    function loadProperty(file);

参数：

- file 字符串。需要读取的文件路径，如果是目录则会报错。

返回：一个java类型的java.util.Property对象

说明：可以查阅java api文档找到详细的关于该类的使用方法；常使用getProperty（）方法获取属性值。

示例： 从配置属性文件中读取uump对应的属性值

       var properties=file.loadProperty("conf/test.properties");
  
       var uump=properties.getProperty("uump");

### `file.save()` ###

定义：

	function save(file, content, append, encoding);

参数：

- file 字符串。需要保存的文件路径，如果是目录则会报错。可使用[路径宏](relative_path_rule.md)简化路径。
- content 字符串。需要保存的内容。
- append 布尔，默认值是false。是否追加到已有文件的末尾。
- encoding 字符串，默认值是utf-8。写文件的编码，常用备选的是utf-8/gb2312/gbk。

返回：true/false对应写入成功/失败。

说明：无

### `file.saveAsCSV()` ###

定义：

	function saveAsCSV(file, content, excludeIndexes, option);

参数：

- file 字符串。需要保存的文件路径，如果是目录则会报错。可使用[路径宏](relative_path_rule.md)简化路径。
- content 二维数组或者 `matrix()` 的返回值。需要保存的内容。
- excludeIndexes 数组，可选，默认值是false。排除的列索引，如果content是 `matrix()` 的返回值，则此数组的元素可以是字段名。
- option 对象，可选。写csv文件的选项，支持下面的配置项：
	- separator: csv分列字符，默认值是英文逗号（`,`），常用的有 `\t`。
	- quoteChar: 包围单元格字符串的字符，默认值是双引号（`"`），如果不需要包围字符，可以给一个空格。
	- escapeChar: 转义字符，一般需要和 `separator` 一样。
	- lineEnd: 换行字符，默认值是 `\n`
	- encoding: 写入文件的字符集编码，默认值是GBK。常用备选的是utf-8/gb2312/gbk。注：Excel只认GBK编码的csv文件，utf-8编码的csv文件在Excel中打开中文会有乱码，所以如果是打算用Excel打开的csv文件，使用默认值编码即可。给其他功能写的csv文件，请根据实际情况选择正确的编码以避免中文乱码。
	- append: 为 `false`（默认）则覆盖原文件（如果存在），为 `true` 则追加到文件的最后；

返回：true/false对应写入成功/失败。

示例1：将一个二维数组写入到csv文件中，并排除第二列（序号为1）

	var b = file.saveAsCSV("data/mydata.csv", [
			[1, 2, 3],
			[2, 4, 5]
		], [1]);
	log("file save success:", b);

示例2：将一个 `matrix()` 的返回值写入到csv文件中，并排除 id和type 这2列

	var mtx = matrix('select id,type,name,xx,yy from my_table_name');
	var b = file.saveAsCSV("data/mydata.csv", mtx, ['id', 'type']);
	log("file save success:", b);

示例3：将一些数字写入csv，并且不要使用双引号包围：

	var b = file.saveAsCSV("data/mydata.csv", [
			[1, 2, 3],
			[2, 4, 5]
		], []， { quoteChar： ' ' });
	log("file save success:", b);




