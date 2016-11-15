'use strict';
describe('Selector Self Test',function(){
    it('open test page',function(){
        browser.get('test/e2e/testee/selector/web/self.html');
        browser.sleep(2000);
    });
    it('分类好的数据展示',function(){
        //title1 title2,各2条目
        var Accordion=element.all(by.css(".demo1 .rdk-accordion-module .theme span"));
        expect(Accordion.get(0).getText()).toBe('title1');
        expect(Accordion.get(1).getText()).toBe('title2');
        //
        var locator=element.all(by.css(".demo1 .rdk-accordion-module"));
        var libs1=locator.get(0).all(by.css(".selector li"));
        var libs2=locator.get(1).all(by.css(".selector li"));
        expect(libs1.count()).toBe(2);
        expect(libs2.count()).toBe(2);
    });
    it('初始选中条目',function(){
        //title1 江苏 title2 广东
        var locator=element.all(by.css(".demo2 .rdk-accordion-module"));
        //
        var lib1=locator.get(0).all(by.css(".selector li.selected-item"));
        var lib2=locator.get(1).element(by.css(".selector li.selected-item"));
        expect(lib1.getText()).toMatch('江苏');
        expect(lib2.getText()).toMatch('广东');
    });
    it('update数据时界面随之刷新',function(){
        var btn=element(by.css(".demo3 button"));
        btn.click();
        browser.sleep(500);
        //备选中内容中没有江苏
        var locator=element.all(by.css(".demo2 .rdk-accordion-module"));
        var lib1=locator.get(0).all(by.css(".selector li"));
        expect(lib1.count()).toBe(1);
        expect(lib1.getText()).toMatch('山西');
    });
    it('未分类的数据配合groupby属性展示正常',function(){
        //江苏-》南京 苏州
        //浙江-》杭州 金华 嘉兴
        var Accordion=element.all(by.css(".demo4 .rdk-accordion-module .theme span"));
        expect(Accordion.get(0).getText()).toBe('江苏');
        expect(Accordion.get(1).getText()).toBe('浙江');
        //
        var locator=element.all(by.css(".demo4 .rdk-accordion-module"));
        var libs1=locator.get(0).all(by.css(".selector li"));
        var libs2=locator.get(1).all(by.css(".selector li"));
        expect(libs1.count()).toBe(2);
        expect(libs2.count()).toBe(3);
    });
    it('对于展示后的页面进行点选操作',function(){
        //苏州 金华
        var locator=element.all(by.css(".demo4 .rdk-accordion-module"));
        var libs1=locator.get(0).all(by.css(".selector li"));
        var libs2=locator.get(1).all(by.css(".selector li"));
        libs1.get(1).click();
        browser.sleep(500);
        var select=element(by.css(".demo4 .select-city"));
        expect(select.getText()).toBe('苏州');
        libs2.get(1).click();
        browser.sleep(500);
        expect(select.getText()).toBe('金华');
    });
    it('外部触发 OPEN CLOSE事件',function(){
        //触发前content
        var open=element(by.css(".demo5 button[ng-click='open()']"));
        var close=element(by.css(".demo5 button[ng-click='close()']"));
        var content=element.all(by.css(".demo5 .content"));
        expect(content.count()).toBe(3);
        content.each(function(item,index){
            expect(item.getCssValue("display")).toBe('none');
        });
        //触发OPEN后
        open.click();
        browser.sleep(500);
        content.each(function(item,index){
            expect(item.getCssValue("display")).toBe('block');
        });
        //CLOSE事件后
        close.click();
        browser.sleep(500);
        content.each(function(item,index){
            expect(item.getCssValue("display")).toBe('none');
        });
    });
    it('外部触发SELECT事件',function(){
        var open=element(by.css(".demo5 button[ng-click='open()']"));
        var select=element(by.css(".demo5 button[ng-click='select()']"))
        open.click();
        browser.sleep(500);
        var locator=element.all(by.css(".demo5 .rdk-accordion-module"));
        //select事件规定选择了广西
        select.click();
        browser.sleep(500);
        var lib=locator.get(1).element(by.css(".selector li.selected-item"));
        expect(lib.getText()).toBe('广西省');
    });
    it('内部触发CHANGE事件',function(){
        var locator=element.all(by.css(".demo5 .rdk-accordion-module"));
        var lib=locator.get(2).all(by.css(".selector li"));
        //选择新疆 index=3
        var res=element(by.css(".demo5 .change"));
        lib.get(3).click();
        browser.sleep(500);
        expect(res.getText()).toBe('新疆省');
    });
});