'use strict';
describe('Table Demos',function(){
    beforeEach(function(){
        browser.get('test/e2e/testee/comboSelector/web/combined.html');
        browser.sleep(3000);
    });
    afterEach(function(){
    });
  
    it('测试跟accordion结合',function(){
        //直接输入搜索显示结果
        var theme=element(by.css(".demo1 .theme"));
        var comboSelector1=element(by.css(".demo1 .combo-content .form-control"));
        var li=element(by.css(".demo1 .selector li:first-child"));
        var span = element(by.css(".demo1>span"));
        theme.click();
        comboSelector1.click();
        li.click();
        span.getText().then(function(txt){
            expect(comboSelector1.getAttribute("title")).toBe(txt);
        });       
    });

    it('测试跟panel结合',function(){
        //直接输入搜索显示结果
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var open=element(by.css(".demo2 .combo-content-transclude>div"));
        comboSelector1.click();
        comboSelector1.click();
        browser.sleep(500);
        expect(open.getAttribute("class")).toBe("ng-hide");     
    });

    it('测试跟tab结合',function(){
        //直接输入搜索显示结果
        var comboSelector1=element.all(by.css(".demo3 .combo-content .form-control")).get(0);
        var open=element.all(by.css(".demo3 .combo-content-transclude div")).get(0);
        comboSelector1.click();
        expect(open.getAttribute("class")).toBe("ng-hide");     
    });

    it('测试跟tab结合',function(){
        //直接输入搜索显示结果
        var title=element(by.css(".demo3 .title li:last-child a"));
        var comboSelector1=element.all(by.css(".demo3 .combo-content .form-control")).get(1);
        var li=element(by.css(".demo3 .selector li:first-child"));
        var span = element(by.css(".demo3>span"));
        title.click();
        comboSelector1.click();
        li.click();
        span.getText().then(function(txt){
            expect(txt).toBe("江苏省");
        });   
    });

    it('测试跟scroller结合',function(){
        //直接输入搜索显示结果
        var comboSelector1=element(by.css(".demo4 .combo-content .form-control"));
        var li=element(by.css(".demo4 .selector li:nth-child(2)"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        var span = element(by.css(".demo4>span"));
        span.getText().then(function(txt){
            expect(comboSelector1.getAttribute("title")).toBe(txt);  
        }); 
    });

  

    it('测试跟table结合',function(){
        //直接输入搜索显示结果
        var comboSelector1=element(by.css(".demo5 #table_0 .combo-content .form-control"));
        var li=element(by.css(".demo5 #table_0 .selector li:first-child"));
        var span = element(by.css(".demo5>span"));
        comboSelector1.click();
        li.click();
        browser.sleep(500);
        span.getText().then(function(txt){
            expect(comboSelector1.getAttribute("title")).toBe(txt);  
        });   
    });


    
});