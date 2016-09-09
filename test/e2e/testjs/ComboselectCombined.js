'use strict';
describe('Table Demos',function(){
    beforeEach(function(){
        browser.get('test/e2e/testee/comboSelector/web/self.html');
        browser.sleep(3000);
    });
    afterEach(function(){
    });
  
    it('测试冻结属性',function(){
        //直接输入搜索显示结果
        var thanBut=element(by.css(".thanBut"));
        var comboSelector1=element(by.css(".demo1 .combo-content .form-control"));
        var li=element(by.css(".demo1 .selector li:first-child"));
        var p = element(by.css(".demo1 p"));
        thanBut.click();
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(txt).toBe("江苏省");
        });       
    });

    it('测试标题',function(){
        //直接输入搜索显示结果
        var addTitle=element(by.css(".addTitle"));
        addTitle.click();
        var content=element(by.css(".demo1 .combo-content span"));
        content.getText().then(function(txt){
            expect(txt).toBe("江苏");
        });
    });

    it('测试open属性',function(){
        //直接输入搜索显示结果
        var switchBut=element(by.css(".switchBut"));
        var open=element(by.css(".demo1 .combo-content-transclude div"));
        switchBut.click();
        expect(open.getAttribute("class")).toBe("ng-hide");
    });

    it('测试change',function(){
        //直接输入搜索显示结果
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var li=element(by.css(".demo2 .selector li:first-child"));
        var p = element(by.css(".demo2 p"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(txt).toBe("江苏省");
        });       
    });
    it('测试change',function(){
        //直接输入搜索显示结果
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var li=element(by.css(".demo2 .selector li:nth-child(2)"));
        var p = element(by.css(".demo2 p"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(txt).toBe("浙江省");
        });       
    });
    it('测试change',function(){
        //直接输入搜索显示结果
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var li=element(by.css(".demo2 .selector li:nth-child(3)"));
        var p = element(by.css(".demo2 p"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(txt).toBe("河南省");
        });       
    });
    it('测试change',function(){
        //直接输入搜索显示结果
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var li=element(by.css(".demo2 .selector li:nth-child(4)"));
        var p = element(by.css(".demo2 p"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(txt).toBe("湖北省");
        });       
    });
    
});