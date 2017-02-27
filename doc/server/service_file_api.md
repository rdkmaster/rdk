<rdk_title>Rest服务中的文件操作API</rdk_title>

### `File.loadProperty()` {#loadProperty}###

定义：

    function loadProperty(file);

参数：

- file 字符串。需要读取的文件路径，如果是目录则会报错。

返回：一个java类型的java.util.Property对象

说明：可以查阅java api文档找到详细的关于该类的使用方法；常使用getProperty（）方法获取属性值。

示例： 从配置属性文件中读取uump对应的属性值

       var properties=File.loadProperty("conf/test.properties");
  
       var uump=properties.getProperty("uump");
       
### `File.readString()` {#readString}###

定义：

    function readString(path);

参数：

- path 字符串,必选。需要读取的文件路径。可使用[路径宏](relative_path_rule.md)简化路径。

返回：返回文件内容字符串。

说明：读取失败返回空字符串。

示例： 读取当前应用（以example为例）server目录下文件readme.txt内容。
        //使用宏路径
       File.readString("$svr/readme.txt")
        //普通路径
       File.readString("app/example/server/readme.txt") 
        
### `File.readXml()` {#readXml}###

定义：

    function readXml(file);

参数：

- file 字符串。需要读取的文件路径，如果是目录则会报错。可使用[路径宏](relative_path_rule.md)简化路径。

返回：返回一个json格式的js对象

说明：异常情况返回undefined。

示例： 解析xml文件并返回对应json对象。
        //使用宏路径
       File.readXml("$svr/dialog_settings.xml")
        //普通路径
       File.readXml("app/example/server/dialog_settings.xml")   


### `File.readCSV()` {#readCSV}###

定义：

    function readCSV(path,option);

参数：

- path 字符串。需要读取的文件路径，如果是目录则会报错。可使用[路径宏](relative_path_rule.md)简化路径。

- option 对象，可选。读csv文件的选项，支持下面的配置项：
    - separator: csv分列字符，默认值是英文逗号（`,`），常用的有 `\t`。
    - quoteChar: 包围单元格字符串的字符，默认值是双引号（`"`），如果不需要包围字符，可以给一个空格。
    - escapeChar: 转义字符，默认值为（`'`）。
    - encoding: 按指定的字符集编码来读，默认值GBK。常用备选的是GBK/gb2312/utf-8。

返回：返回一个json格式的js二维数组对象

说明：异常情况返回undefined。

示例： 解析CSV文件并返回对应json对象。
        //使用宏路径
       File.readCSV("$svr/dialog_settings.csv")
        //普通路径
       File.readCSV("app/example/server/dialog_settings.csv")   
        //按GBK编码方式来读
       File.readCSV("app/example/server/dialog_settings.csv",{"encoding":"GBK"})  


### `File.save()` {#save}###

定义：

    function save(file, content, append, encoding);

参数：

- file 字符串。需要保存的文件路径，如果是目录则会报错。可使用[路径宏](relative_path_rule.md)简化路径。
- content 字符串。需要保存的内容。
- append 布尔，默认值是false。是否追加到已有文件的末尾。
- encoding 字符串，默认值是utf-8。写文件的编码，常用备选的是utf-8/gb2312/gbk。

返回：true/false对应写入成功/失败。

说明：无

### `File.delete()` {#delete}###

定义：

    function delete(path);

参数：

- path 字符串，必选。需要删除的文件或者文件夹路径。

返回：true/false对应删除成功/失败。

说明：若参数为文件夹路径，则会删除其所有子目录及子文件。


### `File.saveAsCSV()` {#saveAsCSV}###

定义：

    function saveAsCSV(file, content, excludeIndexes, option);

参数：

- file 字符串。需要保存的文件路径，如果是目录则会报错。可使用[路径宏](relative_path_rule.md)简化路径。
- content 二维数组或者 `matrix()` 的返回值。需要保存的内容。
- excludeIndexes 数组，可选，默认值是false。排除的列索引，如果content是 `matrix()` 的返回值，则此数组的元素可以是字段名。
- option 对象，可选。写csv文件的选项，支持下面的配置项：
    - separator: csv分列字符，默认值是英文逗号（`,`），常用的有 `\t`。
    - quoteChar: 包围单元格字符串的字符，默认值是双引号（`"`），如果不需要包围字符，可以给一个空格。
    - escapeChar: 转义字符，默认值为（`'`）。
    - lineEnd: 换行字符，默认值是 `\n`
    - encoding: 写入文件的字符集编码，默认值是GBK。常用备选的是utf-8/gb2312/gbk。注：Excel只认GBK编码的csv文件，utf-8编码的csv文件在Excel中打开中文会有乱码，所以如果是打算用Excel打开的csv文件，使用默认值编码即可。给其他功能写的csv文件，请根据实际情况选择正确的编码以避免中文乱码。
    - append: 为 `false`（默认）则覆盖原文件（如果存在），为 `true` 则追加到文件的最后；

返回：true/false对应写入成功/失败。

示例1：将一个二维数组写入到csv文件中，并排除第二列（序号为1）

    var b = File.saveAsCSV("data/mydata.csv", [
            [1, 2, 3],
            [2, 4, 5]
        ], [1]);
    log("file save success:", b);

示例2：将一个 `matrix()` 的返回值写入到csv文件中，并排除 id和type 这2列

    var mtx = matrix('select id,type,name,xx,yy from my_table_name');
    var b = File.saveAsCSV("data/mydata.csv", mtx, ['id', 'type']);
    log("file save success:", b);

示例3：将一些数字写入csv，并且不要使用双引号包围：

    var b = File.saveAsCSV("data/mydata.csv", [
            [1, 2, 3],
            [2, 4, 5]
        ], []， { quoteChar： ' ' });
    log("file save success:", b);


### `File.saveAsEXCEL()` {#saveAsEXCEL}###

该方法提供了一个可以同时写多张excel sheet页的简便方法。

定义：

    function saveAsEXCEL(file, content, excludeIndexes, option);

参数：

- file 字符串。必选，需要保存的文件路径，如果是目录则会报错。可使用[路径宏](relative_path_rule.md)简化路径。
- content 对象。必选，对象属性名为要写入的sheet名，属性值为[`DataTable()`](service_api.md#dataTable)对象或者二维数组。
- excludeIndexes 数组，可选，默认值是空数组。排除的列索引，如果content是 `DataTable()` 对象，则此数组的元素可以是字段名。
- option 对象，可选。写excel文件的选项，目前只支持append属性
    - append: 为 `false`（默认）则覆盖原文件（如果存在），为 `true` 则追加到文件的最后；

返回：true/false对应写入成功/失败。

示例：写excel文件，其中第一张sheet名为‘sheet1’,内容为一个DataTable矩阵对象，并隐藏‘a’列，第二张sheet名为‘sheet2’，内容为一个二维数组，并隐藏第0列。

        
        var filestr="data/mydata.xls";//必选

        var content={                 //必选
                'sheet1':new DataTable(['A','B'],['a','b'],[[1,2],[3,4]])
                        
                'sheet2':
                        [['30','test1'],['20','test2']]
                    };
         
        var excludeindexes={'sheet1':['a'],'sheet2':[0]};//可选
        
        var option={'append':false};  //可选，不写为false；true为追加  false为复写

        var b = File.saveAsEXCEL(filestr,content,excludeindexes,option);    






        
        

### `File.list()` {#list}###

定义：

    function list(path, recursive, pattern);

参数：

- path      字符串，需要读取的文件路径。
- recursive boolean变量，是否递归查找子目录。
- pattern   字符串，正则表达式。

返回：path目录符合pattern的文件列表

说明：pattern可以参考js正则表达式写法，若不需默认填空。

示例： 从给定目录中过滤出文件名是数字的文件

    var m = file.list("app/common/conf", true, /-?[1-9]\d*/);
 
 
### `File.copy()` {#copy}###

定义：

    function copy(cpFrom, cpTo, recursive, force);

参数：

- cpFrom      字符串，文件源路径。
- cpTo        字符串，文件目的路径。
- recursive   boolean变量，是否递归拷贝。
- force       boolean变量。暂未实现，默认填false。

返回：

- 0 成功
- 1 参数无效
- 2 源路径/文件不存在
- 3 打开源文件流失败
- 4 源打开目标文件流失败
- 5 写入目标文件失败


示例： 将源目录路径拷贝到目的路径

    var m=file.copy("/source","/dest",false);
  
### `File.web()` {#web}###

定义：

    function web();

返回：当前应用的web目录

说明：无。

示例： 返回当前应用web所在目录

       var m=file.web();
       
       

### `File.svr()` {#svr}###

定义：

    function svr();

返回：当前应用的server目录

说明：无。

示例： 返回当前应用server所在目录

       var m=file.svr();
     
     
### `File.base()` {#base}###

定义：

    function base();

返回：当前应用所在目录

说明：无。

示例： 返回当前应用目录

       var m=file.svr();