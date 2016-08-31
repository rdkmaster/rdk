'use strict';
describe("Map Combined demo",function(){
    beforeEach(function(){
        browser.get("test/e2e/testee/map/web/combined.html");
        browser.sleep(2000);
    });
    afterEach(function(){
    });
    it("accordion-map test event",function(){
        //初始图标箭头向下 class name =fa-angle-down
        var icoUp=element.all(by.css(".accordion .theme .fa-angle-up"));
        expect(icoUp.count()).toBe(0);
        //accordion 点击展开
        element(by.css(".accordion .rdk-accordion-module")).click();
        //图标箭头变成向上，class name =fa-angle-up
        expect(icoUp.count()).toBe(1);
        //定位map被点击的位置，判断与预期事件和值的等同
        browser.actions().mouseMove(element(by.css(".accordion canvas")),{x:162,y:75}).click().perform();
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
        var canvas=element.all(by.css(".combo canvas"));
        //没有打开combo的情况下点击应该是无效的
        browser.actions().mouseMove(element(by.css(".combo canvas")),{x:240,y:70}).click().perform();
        var evt=element.all(by.css(".text span"));
        expect(evt.get(0).getText()).toBe('');
        //点击combo 展现map
        element(by.css(".combo .form-control")).click();
        browser.sleep(2000);//增加等待
        browser.actions().mouseMove(element(by.css(".combo canvas")),{x:240,y:70}).click().perform();
        expect(evt.get(0).getText()).toBe('click');
    });
});