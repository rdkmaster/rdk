'use strict';
describe('文件功能模拟',function(){
    it('上传',function(){
        browser.get("test/doc/testDemo/demo4/index.html");
        // var remote="../../test/node_modules/protrator/node_modules/selenium-webdriver/remote";
        // browser.setFileDetector(new remote.FileDetector());
        //指定一个目标文件相对路径
        var fileupload="js/index.js";
        var path=require('path');
        //转绝对路径
        var absolutePath = path.resolve(__dirname, fileupload);
        //点击的input 按钮
        var fileElem = element(by.css('input[type="file"]'));
        fileElem.sendKeys(absolutePath);
        browser.driver.sleep(2000);
    });
});