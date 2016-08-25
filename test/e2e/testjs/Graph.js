'use strict';
describe('Graph Demo',function(){
    beforeEach(function(){
        browser.get('test/e2e/testee/graph/web/self.html');
    });
    afterEach(function(){
    });
    it('周一最高气温should be 11',function(){
        var canvas=element(by.css(".graph_1 .rdk-graph-module"));
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css("canvas")),{x:78,y:130}).click().perform();
        expect(info.getText()).toBe("周一 最高气温:11");
        //横坐标间隔103.4px
    });
    it('周二最高温 should be 13',function(){
        var canvas=element(by.css(".graph_1 .rdk-graph-module"));
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css("canvas")),{x:181.4,y:110}).click().perform();
        expect(info.getText()).toBe("周二 最高气温:13");
    });
    it('周三最高温should be 15',function(){
        var canvas=element(by.css(".graph_1 .rdk-graph-module"));
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css("canvas")),{x:285.8,y:90}).click().perform();
        expect(info.getText()).toBe("周三 最高气温:15");
    });
    it('周四最高温should be 18',function(){
        var canvas=element(by.css(".graph_1 .rdk-graph-module"));
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css("canvas")),{x:389.2,y:60}).click().perform();
        expect(info.getText()).toBe("周四 最高气温:18");
    });
    it('周五最高温should be 15',function(){
        var canvas=element(by.css(".graph_1 .rdk-graph-module"));
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css("canvas")),{x:492.6,y:90}).click().perform();
        expect(info.getText()).toBe("周五 最高气温:15");
    });
    it('周六最高温should be 12',function(){
        var canvas=element(by.css(".graph_1 .rdk-graph-module"));
        var info=element(by.css(".fromClick"));
        browser.actions().mouseMove(element(by.css("canvas")),{x:596,y:120}).click().perform();
        expect(info.getText()).toBe("周六 最高气温:12");
    });
    it('周日最高温should be 12',function(){
        var canvas=element(by.css(".graph_1 .rdk-graph-module"));
        var info=element(by.css(".fromClick"));
        var doubleinfo=element(by.css(".fromDbclick"));
        browser.actions().mouseMove(element(by.css("canvas")),{x:699.4,y:140}).click().perform();
        browser.actions().mouseMove(element(by.css("canvas")),{x:699.4,y:140}).doubleClick().perform();
        expect(info.getText()).toBe("周日 最高气温:10");
    });
});