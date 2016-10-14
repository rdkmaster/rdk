var fs = require('fs'),
    markdown = require("markdown").markdown,
    request = require('request'),
    async = require('async'),
    fileContent;

//md文件列表
var mdFile = "md_files.txt"
    //报表生成失败链接文件
var reportErrFile = "links_err_report.txt"
    //报表生成成功链接文件
var reportSucFile = "links_ok_report.txt"
    //path模块，可以生产相对和绝对路径
var path = require("path");
//文件后缀
reg = "md"
    //配置远程路径
var remotePath = "http://localhost:8080";
//获取当前目录绝对路径
var filePath = "/home/rdk_git/rdk/doc/";
//读取文件存储数组
var fileArr = [];
//读取链接存储数组
var linkArr = [];
//过滤一些不需要爬的文件
var excludedir = "live_demo"

main();

function main() {
        //清理上次生成文件
        delfile(mdFile);
        delfile(reportErrFile);
        delfile(reportSucFile);
        //遍历md文件
        readDir(filePath);
        //解析处理md文件
        parseFile();
    }
    //判断文件是否存在，如果存在则删除
function delfile(file) {
        if (fs.existsSync(file)) {
            console.log(file + "has exits!")
            fs.unlinkSync(file);

        }
    }
    //读取文件目录
function readDir(filePath) {
        var files = fs.readdirSync(filePath);

        var count = files.length;
        var results = {};
        files.forEach(function(filename) {
            var stats = fs.statSync(path.join(filePath, filename));
            if (stats.isFile()) {
                if (getdir(filename) == reg && path.join(filePath, filename).indexOf(excludedir) < 0) {
                    var newUrl = filePath + filename;
                    fileArr.push(newUrl);
                    // writeFile(mdFile,fileArr);
                }
            } else if (stats.isDirectory()) {
                var name = filename;
                readFile(path.join(filePath, filename), name);
            }
        });
    }
    //获取文件数组
function readFile(readurl, name) {
        var name = name;
        var files = fs.readdirSync(readurl);
        files.forEach(function(filename) {
            var stats = fs.statSync(path.join(readurl, filename));
            //是文件
            if (stats.isFile()) {
                var newUrl = filePath + name + '/' + filename;
                if (getdir(filename) == reg && newUrl.indexOf(excludedir) < 0) {

                    fileArr.push(newUrl);
                    //writeFile(mdFile,fileArr)
                }

                //是子目录
            } else if (stats.isDirectory()) {
                var dirName = filename;
                readFile(path.join(readurl, filename), name + '/' + dirName);
            }
        });

    }
    //获取后缀名
function getdir(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

function parseFile() {
    fileArr.forEach(function(data) {
        fs.appendFileSync(mdFile, data + "\n", 'utf-8');
        gen_links_report(data);
    })
}

function gen_links_report(mdfile) {
    // 读入 Markdown 源文件
    var mdfileContent = fs.readFileSync(mdfile, 'utf8');
    fileContent = markdown.toHTML(mdfileContent);
    //过滤<a href=>
    var reg = /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g;
    //过滤<img src=" " />
    var regimg = /<img[^>]+src=['"]([^'"]+)['"]+/g;
    //过滤<live_demo example="" />
    var regdemo = /<live_demo[^>]*example="([^"]*)"[^>]*>(.*?)<\/live_demo>/g;
    var arr = [];
    while (reg.exec(fileContent) != null) {
        arr.push(RegExp.$1 + "\n");
        test_link(RegExp.$1, mdfile);
        //console.log(RegExp.$1.toString());
    }
    while (regimg.exec(fileContent) != null) {
        arr.push(RegExp.$1 + "\n");
        test_link(RegExp.$1, mdfile);
        //console.log(RegExp.$1.toString());
    }
    while (tem = regdemo.exec(mdfileContent) != null) {
        arr.push(RegExp.$1 + "\n");
        test_link("demo/" + RegExp.$1, mdfile);
    }
}

function test_link(url, mdfile) {
    var testurl = remotePath + url;
    //live_demo处理
    if (url.indexOf("demo") == 0) {
        testurl = remotePath + "/doc/client/" + url;
    } else {
    	//由于所内机器不通外网，http与https不做测试
        if (url.indexOf("http:") >= 0 || url.indexOf("https:") >= 0) {
            testurl = url;
            return true;
        } else {
            if (url.indexOf("/") != 0) {
                if (url.indexOf("#") == 0) {
                    testurl = remotePath + "/" + mdfile.split("/rdk/")[1] + url;
                } else {
                    testurl = remotePath + "/" + path.dirname(mdfile).split("/rdk/")[1] + "/" + url;

                }
            } else {
                testurl = remotePath + url;

            }
        }

    }


    var queue = async.queue(function(testurl, callback) {
        request({
            url: encodeURI(testurl),
            timeout: 60000
        }, function(error, response, body) {
            if (!error && (response.statusCode.toString().substr(0, 1) != 4 || response.statusCode.toString().substr(0, 1) != 5)) {
                var str = mdfile + ' ' + testurl + " test is OK!"
                writereportfile(reportSucFile, str);
                return true;
            } else {

                var str = mdfile + ' ' + testurl + " test is failed!"
                linkArr.push(str);
                writereportfile(reportErrFile, str);
                return false;
            }
            callback(); // 告诉 async 任务完成 
        });
    }, 30); // 并发 30	

    queue.push(testurl);
}

function writereportfile(fileName, str) {
    fs.appendFileSync(fileName, str + "\n", 'utf-8');

}
