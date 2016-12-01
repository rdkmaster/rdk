'use strict';
describe('文件功能模拟',function(){
    browser.get("test/doc/testDemo/demo4/index.html");
    afterEach(function() {
        browser.manage().logs().get('browser').then(function(browserLog) {
            var msg=browserLog.map(JSON.stringify).join(";\n");
            // console.log(msg);
            var a=msg.indexOf('message');
            var b=msg.indexOf("\\n");
            expect(msg.substring(a-1,b-1)).toBe('');
            // console.log(msg.substring(a-1,b-1))
        });
    });
    it('上传',function(){
        browser.get("test/doc/testDemo/demo4/index.html");
        // var remote="../../test/node_modules/protrator/node_modules/selenium-webdriver/remote";
        // browser.setFileDetector(new remote.FileDetector());
        //指定一个目标文件相对路径
        console.log("我最早？");
        var fileupload="js/index.js";
        var path=require('path');
        //转绝对路径
        var absolutePath = path.resolve(__dirname, fileupload);
        //点击的input 按钮
        var fileElem = element(by.css('input[type="file"]'));
        fileElem.sendKeys(absolutePath);
        browser.driver.sleep(2000);
    });
    it('前端 hover 响应',function(){
        //鼠标移动到span上面，宽度增加到100px
        var locator=element(by.css(".hover-event .box"));
        browser.actions().mouseMove(locator).perform();
        browser.sleep(500);
        expect(locator.getCssValue("width")).toBe("100px");

        browser.actions().mouseMove(locator).perform()
        .then(function(){
           expect(locator.getCssValue("width")).toBe("100px"); 
        });
    });
    it('抓取控制台错误信息',function(){
        browser.ignoreSynchronization=true;
        var select=element(by.css("select"));
        select.click();
        var option=element.all(by.css("option"));
        option.get(1).click();
        browser.sleep(200);
        
    });
    it('尝试抓取滚动条并操作',function(){
        var first_scroll=element(by.css(".first-scroll"));
        //仅仅对于整个浏览器侧的滚动条
        browser.executeScript('window.scrollTo(0,1000)')
        .then(function(){
            console.log("scroller");
            browser.sleep(1000);
        });
    });
});