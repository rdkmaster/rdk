'use strict';
describe('Table Demos',function(){
    beforeEach(function(){
        browser.get('test/e2e/testee/comboSelector/web/self.html');
        browser.sleep(3000);
    });
    afterEach(function(){
    });
    // 搜索框输入
    it('只显示一条结果HZ',function(){
        //直接输入搜索显示结果
        var thanBut=element(by.css(".thanBut"));
        // var addTitle=element(by.css(".addTitle"));
        // var switchBut=element(by.css(".switchBut"));
        var comboSelector1=element(by.css(".demo1 .form-control"));
        var li=element(by.css(".demo1 .selector li:first-child"));
        var p = element(by.css(".demo1 p"));
        thanBut.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(txt).toBe("江苏省");
        });       
    });
    
});