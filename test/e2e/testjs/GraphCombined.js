'use strict';
describe('Graph combined',function(){
	
	it('accordion-graph',function(){
		browser.get("test/e2e/testee/graph/web/combined.html")
		.then(function(){
			browser.waitForAngular();
			browser.sleep(3000);
		});
		//打开面板操作
		element.all(by.css(".accordion .theme")).get(0).click();
		//周一最高气温11°
		browser.actions().mouseMove(element.all(by.css(".accordion canvas")).get(0),{x:77,y:129}).click().perform();

		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周一');
		expect(info.get(1).getText()).toBe('最高气温');
		expect(info.get(2).getText()).toBe('11');
	});
	
	it('tab-graph tab1',function(){
		//周三 平均气温 10.5
		browser.actions().mouseMove(element(by.css(".tab canvas")),{x:275,y:135}).click().perform();
		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周三');
		expect(info.get(1).getText()).toBe('平均气温');
		expect(info.get(2).getText()).toBe('10.5');
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
		element(by.css(".combo .form-control")).click();//关闭
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
		browser.get("test/e2e/testee/graph/web/combined.html")
		.then(function(){
			browser.waitForAngular();
			browser.sleep(3000);
		});
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
	it('multiple-graph',function(){
		browser.get("test/e2e/testee/graph/web/combined.html");
		browser.sleep(3000);
		//combo展开
		var ele=element(by.css(".multiple .form-control"));
		ele.click();
		browser.actions().mouseMove(element(by.css(".multiple canvas")),{x:370,y:150}).click().perform();
		browser.sleep(2000);
		var info=element.all(by.css(".infos span"));
		//存在兼容性问题页面有时候graph很小，此时点击的坐标就不对了
		expect(info.get(0).getText()).toBe('周五');
		expect(info.get(1).getText()).toBe('最低气温');
		expect(info.get(2).getText()).toBe('9');
	});
	it('multiple-graph 轮播翻页',function(){
		// browser.get("test/e2e/testee/graph/web/combined.html");
		// browser.sleep(3000);
		//combo 展开
		// element(by.css(".multiple .form-control")).click();
		//轮播右翻
		element(by.css(".multiple .arrows .right_arrow i")).click();
		browser.sleep(2000);
		browser.actions().mouseMove(element(by.css(".multiple canvas")),{x:447,y:128}).click().perform();
		var info=element.all(by.css(".infos span"));
		expect(info.get(0).getText()).toBe('周六');
		expect(info.get(1).getText()).toBe('最高气温');
		expect(info.get(2).getText()).toBe('13');
	});
})