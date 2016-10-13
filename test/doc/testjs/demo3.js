'use strict';
describe('结合rdk控件',function(){
    it('tab拖拽',function(){
        browser.get("test/doc/testDemo/demo3/web/index.html")
        .then(function(){
            browser.waitForAngular();
        });
        var drag=element.all(by.css(".rdk-tab ul li")).get(0);
        var drop=element.all(by.css(".rdk-tab ul li")).get(1);
        // expect(drop.getLocation()).toBe();=>location信息 不仅仅只有x，y 还有生成的一个class
        // browser.actions().dragAndDrop(drag,{x:140,y:14,hCode:872415232,class:'org.openqa.selenium.Point'}).perform();
        //drag drop 相反
        // browser.actions().dragAndDrop(drag, drop).perform();

        browser.actions().mouseMove(drop).mouseDown().mouseMove(drag).mouseUp().perform();
        browser.sleep(3000);
    });
    it('bullet滑块滑动',function(){
        browser.get("test/doc/testDemo/demo3/web/index.html")
        .then(function(){
            browser.waitForAngular();
        });
        var sliders=element.all(by.css(".rdk-bullet .progress .slider"));
        // expect(sliders.get(0).getLocation()).toBe();
        browser.actions().dragAndDrop(sliders.get(0),{x:20,y:191,hCode:212992,class:'org.openqa.selenium.Point'}).perform();
        browser.sleep(3000);
    });
});