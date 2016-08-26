'use strict';
describe('Graph DoubleClick demo',function(){
    beforeEach(function(){
        browser.get('test/e2e/testee/graph/web/self.html');
        browser.sleep(2000);
    });
    afterEach(function(){
    });
    //测试规则单击 双击 每个点都这样测试
    it('周一最高气温should be 11 by click',function(){
        // var canvas=element.all(by.css(".graph_1 .rdk-graph-module div div")).get(1);
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:78,y:130}).click().perform();
        expect(info.getText()).toBe("周一最高气温:11");
        //横坐标间隔103.4px
    });
    
    it('周二最高温 should be 13 by click',function(){
        var canvas=element.all(by.css(".graph_1 .rdk-graph-module div div")).get(1);
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:181.4,y:110}).click().perform();
        expect(info.getText()).toBe("周二最高气温:13");
    });
    
    it('周三最高温should be 15 by click',function(){
        var canvas=element.all(by.css(".graph_1 .rdk-graph-module div div")).get(1);
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:285.8,y:90}).click().perform();
        expect(info.getText()).toBe("周三最高气温:15");
    });
    
    it('周四最高温should be 18 by click',function(){
        var canvas=element.all(by.css(".graph_1 .rdk-graph-module div div")).get(1);
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:389.2,y:60}).click().perform();
        expect(info.getText()).toBe("周四最高气温:18");
    });
   
    it('周五最高温should be 15 by click',function(){
        var canvas=element.all(by.css(".graph_1 .rdk-graph-module div div")).get(1);
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:492,y:90}).click().perform();
        expect(info.getText()).toBe("周五最高气温:15");
    });
   
    it('周六最高温should be 12',function(){
        var canvas=element.all(by.css(".graph_1 .rdk-graph-module div div")).get(1);
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:595.5,y:120}).click().perform();
        expect(info.getText()).toBe("周六最高气温:12");
    });
    
    it('周日最高温should be 10',function(){
        var canvas=element.all(by.css(".graph_1 .rdk-graph-module div div")).get(1);
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_1 canvas")),{x:699.4,y:140}).click().perform();
        expect(info.getText()).toBe("周日最高气温:10");
    });
    //graph_2
    it('graph_2 data 改变前 周一最高温 should be 11',function(){
        var canvas=element.all(by.css(".graph_2 .rdk-graph-module div div")).get(1);
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_2 canvas")),{x:78,y:130}).click().perform();
        expect(info.getText()).toBe("周一最高气温:11");
    });
    it('graph_2 data改变后 周一最高温should be 1',function(){
        var canvas=element.all(by.css(".graph_2 .rdk-graph-module"));
        var hideDiv=element.all(by.css(".graph_2 .rdk-graph-module div div")).get(1);
        element(by.tagName("button")).click();
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css(".graph_2 canvas")),{x:78,y:221}).click().perform();
        expect(info.getText()).toBe("周一最高气温:1");
    });
    
});