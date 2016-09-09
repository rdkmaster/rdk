'use strict';
describe("test basic_selector combined",function(){
	beforeEach(function(){
		browser.get("test/e2e/testee/basic_selector/web/combined.html");
		browser.sleep(3000);
	});
	afterEach(function(){
	});
	it('combo basic test change value',function(){
		var title=element(by.css(".combo .form-control"));//获得combo下input框，也是点击和显示选中值的element
		var citys=['南京','苏州','南通','泰州','上海','广州'];
		title.click();
		browser.sleep(1000);
		//basic selector待选项列表
		var lis=element.all(by.css(".combo .rdk-selector-module .selector li"));
		expect(lis.count()).toBe(6);
		lis.each(function(item,index){
			item.click();
			browser.sleep(1000);
			//遍历每个点击后的验证
			expect(title.getAttribute("title")).toBe(citys[index]);
		});
	});
	it('accordion basic test change value',function(){
		//accordion 展开
		element(by.css(".accordion .rdk-accordion-module .theme")).click();
		var lis=element.all(by.css(".accordion .rdk-selector-module .selector li"));
		var names=['A市','B市','C市'];
		expect(lis.count()).toBe(3);
		lis.each(function(item,index){
			item.click();
			expect(element(by.css(".accordion .cityname")).getText()).toBe(names[index]);
		});
	});
	it('tabs basic test change value',function(){
		var lis=element.all(by.css(".tab .rdk-selector-module .selector li"));
		lis.each(function(item,index){
			item.click();
		});
		expect(element.all(by.css(".tab .rdk-selector-module .selector .selected-item")).count()).toBe(6);
	});
	//测试scroller配合basic能否正常显示和切换
	it('scroller basic test toggle',function(){
		var lis=element.all(by.css(".scroller .rdk-selector-module .selector li"));
		//正常显示的话，第一个项为bootstrap
		expect(lis.get(0).getText()).toBe('bootstrap');
		element(by.css(".scroller .right_arrow")).click();
		//切换下一个，第一项为vuejs
		expect(lis.get(0).getText()).toBe('Vuejs');
	});
	it('panel basic test value',function(){
		var lis=element.all(by.css(".panel .rdk-selector-module .selector li"));
		expect(lis.get(0).getText()).toBe('44892');
	});
});