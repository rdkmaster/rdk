'use strict';
describe('Graph combined',function(){
	beforeEach(function(){
		browser.get("test/e2e/testee/graph/web/combined.html");
		browser.sleep(3000);
	});
	afterEach(function(){
	});
	it('accordion-graph',function(){
		//打开面板操作
		element.all(by.css(".accordion .theme")).get(0).click();
		//周一最高气温11°
		browser.actions().mouseMove(element.all(by.css(".accordion canvas")).get(0),{x:77,y:129}).click().perform();

		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周一');
		expect(info.get(1).getText()).toBe('最高气温');
		expect(info.get(2).getText()).toBe('11');
	});
	it('combo-graph',function(){
		//打开combo 面板
		element(by.css(".combo .form-control")).click();
		browser.actions().mouseMove(element(by.css(".combo canvas")),{x:137,y:200}).click().perform();
		//周二最低温 4°
		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周二');
		expect(info.get(1).getText()).toBe('最低气温');
		expect(info.get(2).getText()).toBe('4');
	});
	it('tab-graph tab1',function(){
		//周三 平均气温 10.5
		browser.actions().mouseMove(element(by.css(".tab canvas")),{x:278,y:135}).click().perform();
		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周三');
		expect(info.get(1).getText()).toBe('平均气温');
		expect(info.get(2).getText()).toBe('10.5');
	});
	it('panel-graph',function(){
		//周四最高气温 18°
		browser.actions().mouseMove(element(by.css(".panel canvas")),{x:300,y:60}).click().perform();
		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周四');
		expect(info.get(1).getText()).toBe('最高气温');
		expect(info.get(2).getText()).toBe('18');
	});
	it('scroller-graph未翻页',function(){
		//周五 最高气温 15°
		browser.actions().mouseMove(element(by.css(".scroller canvas")),{x:490,y:90}).click().perform();
		browser.sleep(1000);
		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周五');
		expect(info.get(1).getText()).toBe('最高气温');
		expect(info.get(2).getText()).toBe('15');
	});
	it('scroller-graph 翻页',function(){
		var arrow=element(by.css(".scroller .arrows .right_arrow i"));
		arrow.click();
		//周五 最高气温 16°
		browser.actions().mouseMove(element(by.css(".scroller canvas")),{x:492,y:103}).click().perform();
		browser.sleep(1000);
		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周五');
		expect(info.get(1).getText()).toBe('最高气温');
		expect(info.get(2).getText()).toBe('16');
	});
})