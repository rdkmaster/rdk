'use strict';
describe('Graph Self demo',function(){
   
    it('周一最高气温should be 11 by click',function(){
        browser.get('test/e2e/testee/graph/web/self.html')
        .then(function(){
            browser.waitForAngular();
            browser.sleep(3000);
        });
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:78,y:130}).click().perform();
        expect(info.getText()).toBe("周一最高气温:11");
        //横坐标间隔103.4px
    });
    
    it('周二最高温 should be 13 by click',function(){
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:181.4,y:110}).click().perform();
        expect(info.getText()).toBe("周二最高气温:13");
    });
    
    it('周三最高温should be 15 by click',function(){
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:285.8,y:90}).click().perform();
        expect(info.getText()).toBe("周三最高气温:15");
    });
    it('周六最高温should be 12',function(){
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:595.5,y:120}).click().perform();
        var info=element(by.css(".fromClick"));
        browser.sleep(2000);
        expect(info.getText()).toBe("周六最高气温:12");
    });
    it('周四最高温should be 18 by click',function(){
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:389.2,y:60}).click().perform();
        expect(info.getText()).toBe("周四最高气温:18");
    });
    it('周日最高温should be 10',function(){
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:699.4,y:140}).click().perform();
        var info=element(by.css(".fromClick"));
        browser.sleep(2000);
        expect(info.getText()).toBe("周日最高气温:10");
    });
    it('周五最高温should be 15 by click',function(){
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:492.1,y:90}).click().perform();
        var info=element(by.css(".fromClick"));
        expect(info.getText()).toBe("周五最高气温:15");
    });
    //graph_2
    it('graph_2 data 改变前 周一最高温 should be 11',function(){
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_2 canvas")),{x:78,y:130}).click().perform();
        expect(info.getText()).toBe("周一最高气温:11");
    });
    it('graph_2 data改变后 周一最高温should be 1',function(){
        element(by.tagName("button")).click();
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_2 canvas")),{x:78,y:221}).click().perform();
        expect(info.getText()).toBe("周一最高气温:1");
    });
    
});