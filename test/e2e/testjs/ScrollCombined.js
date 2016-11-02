'use strict';
describe("test rdk-table ang rdk-scroll combined",function(){
	it('测试Y轴滚动条是否存在',function(){
		browser.get("test/e2e/testee/scroll/web/combined.html")
		.then(function(){
			browser.waitForAngular();
			browser.sleep(2000);
		});
		var scroll = element(by.css(".ps-container .ps-scrollbar-y"));
		browser.actions().mouseMove(scroll).perform();
		expect(scroll.isPresent()).toBe(true);
	});
	it('测试滚动条可移动的区域高度是否等于容器的高度',function(){
		browser.get("test/e2e/testee/scroll/web/combined.html")
			.then(function(){
				browser.waitForAngular();
				browser.sleep(2000);
			});
		var scrollRail = element(by.css(".ps-container .ps-scrollbar-y-rail"));
		var content = element(by.css(".rdk-panel .content"));
		expect(content.getCssValue("height")).toBe(scrollRail.getCssValue("height"));
	});
});