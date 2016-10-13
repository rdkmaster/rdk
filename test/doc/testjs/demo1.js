'use strict';
describe('基础Api',function(){
    it('注册场景涉及的简单操作',function(){
        browser.get('test/doc/testDemo/demo1/index.html')
        .then(function(){
            browser.waitForAngular();
        });
        //选择注册按钮
        var button=element.all(by.css("button"));
        button.get(0).click();
        //输入注册信息
        var input=element.all(by.css(".section1 input"));

        input.get(0).sendKeys("何建洋");
        input.get(1).sendKeys("123456");

        element(by.model("username")).clear().sendKeys("何建洋");
        element(by.model("password")).clear().sendKeys("456789");

        element(by.css(".section1")).element(by.model("username"))
        .clear().sendKeys("何建洋");
        element(by.css(".section1")).element(by.model("password"))
        .clear().sendKeys("111111");
        //确认注册
        var register=element.all(by.css(".section1 button"));
        register.get(0).click();

        // var register=element(by.css(".section1 button[title='注册']"));
        // register.click();

        // register.each(function(item,index){
        //     if(item.getText()==="注册"){
        //         item.click();
        //     }
        // });

        //对确认框进行处理回应
        browser.sleep(3000);
        //针对新版本的浏览器chrome firefox不支持 50.x版本可以
        browser.switchTo().alert().then(function(alert){
            alert.accept();
        });
        browser.sleep(2000);
        browser.switchTo().alert().accept();
        // browser.switchTo().alert().accept();

        //by.xpath()必须以html开头或者目标元素父级以上已经有选择器初步确定
        //element(by.css('some-class')).(by.xpath("div[3]")) 注意序号从1开始
        var result=element(by.xpath("html/body/div[3]"));
        // var result=element(by.xpath("html//div[3]"));
        // var result=element.all(by.css("body div")).last();
        
        // var result=element.all(by.css("div:nth-child(3)"));
        expect(result.getText()).toBe("welcome to my page");
    });
});