'use strict';
describe("Map Combined demo",function(){
    beforeEach(function(){
        browser.get("test/e2e/testee/map/web/combined.html");
        browser.sleep(3000);
    });
    afterEach(function(){
    });
    it("accordion-map test event",function(){
        //初始图标箭头向下 class name =fa-angle-down
        var icoUp=element.all(by.css(".accordion .theme .fa-angle-up"));
        expect(icoUp.count()).toBe(0);
        //accordion 点击展开
        element.all(by.css(".accordion .rdk-accordion-module .theme")).get(0).click();
        //图标箭头变成向上，class name =fa-angle-up
        expect(icoUp.count()).toBe(1);
        //定位map被点击的位置，判断与预期事件和值的等同
        browser.actions().mouseMove(element.all(by.css(".accordion canvas")).get(0),{x:162,y:75}).click().perform();
        var evt=element.all(by.css(".text span"));
        expect(evt.get(0).getText()).toBe("click");
        expect(evt.get(1).getText()).toBe("白城市");
    });
    it("tab-map test event",function(){
        //切换 显示 map的
        element.all(by.css(".tab .rdk-tab-module .tabs ul li")).get(1).click();
        browser.actions().mouseMove(element(by.css(".tab canvas")),{x:203,y:96}).click().perform();
        var evt=element.all(by.css(".text span"));
        expect(evt.get(0).getText()).toBe("click");
        expect(evt.get(1).getText()).toBe("松原市");
    });
    it('combo-map test event',function(){
        //点击combo 展现map
        element(by.css(".combo .form-control")).click();
        browser.actions().mouseMove(element(by.css(".combo canvas")),{x:310,y:83}).click().perform();
        var evt=element.all(by.css(".text span"));
        expect(evt.get(0).getText()).toBe('click');
    });
    it('scroller-map test event',function(){
        browser.actions().mouseMove(element(by.css(".scroller canvas")),{x:125,y:74}).click().perform();
        var evt=element.all(by.css(".text span"));
        expect(evt.get(0).getText()).toBe('click');
        expect(evt.get(1).getText()).toBe('白城市');

    });
    it('panel-map test event',function(){
        browser.actions().mouseMove(element(by.css(".panel canvas")),{x:227,y:57}).click().perform();
        var evt=element.all(by.css(".text span"));
        expect(evt.get(0).getText()).toBe('click');
        expect(evt.get(1).getText()).toBe('连云港市');
    });
    it('multiple-map test event',function(){
        var evt=element.all(by.css(".text span"));
        //展开combo
        element(by.css('.multiple .rdk-combo-select-module .form-control')).click();
        browser.sleep(1000);
        browser.actions().mouseMove(element(by.css(".multiple canvas")),{x:227,y:57}).click().perform();
        expect(evt.get(0).getText()).toBe('click');
        expect(evt.get(1).getText()).toBe('连云港市');
    });
    it("multiple-map test 翻页",function(){
        //轮播翻页
        element(by.css(".multiple .combo-content-transclude .slider .arrows .right_arrow i")).click();
        browser.sleep(1000);
        browser.actions().mouseMove(element(by.css(".multiple canvas")),{x:220,y:66}).click().perform();
        var evt=element.all(by.css(".text span"));
        expect(evt.get(0).getText()).toBe('click');
        expect(evt.get(1).getText()).toBe('崇明县');
    });
});