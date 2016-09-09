describe('BasicSelector Demos', function() {

    beforeEach(function() {
        browser.get('test/e2e/testee/basic_selector/web/self.html');
        browser.sleep(2000);
    });
    afterEach(function(){
    });
    it('basic attribute', function() {
        var list = element.all(by.css('.demo1 .selector>li'));
        expect(list.count()).toBe(6);
        expect(list.get(0).getText()).toBe("南京");
        var values = ["南京","苏州","南通","泰州","上海","广州"];
        list.each(function(item,index){
            item.getText().then(function(text){
                expect(text).toBe(values[index]);
            });
        });
        expect(list.get(0).getCssValue("float")).toBe("left");
    });
    it('test least',function(){
        var list=element.all(by.css('.demo1 .selector .selected-item'));
        expect(list.count()).toBe(2);//当前选中2项
        element(by.css(".least")).sendKeys("3",protractor.Key.ENTER);
        expect(list.count()).toBe(3);//设置选中最小值3，此时选中项为3个
    });
    it('test add',function(){
        var list=element.all(by.css('.demo1 .selector>li'));
        // var obj=element(by.css('.demo1 .selector div i'));
        expect(list.count()).toBe(6);//添加前6个备选项
        element(by.css('.demo1 .selector div i')).click();
        browser.sleep(1000);
        element(by.css('.demo1 .selector div input')).sendKeys("天津",protractor.Key.ENTER);
        expect(list.count()).toBe(7);//添加后 7个备选项
    });
    it('test 正则属性 错误输入',function(){
        var list=element.all(by.css('.demo1 .selector>li'));
        expect(list.count()).toBe(6);
        element(by.css(".getReg")).sendKeys("^[1-9]{1,3}$",protractor.Key.ENTER);//设置正则规则
        element(by.css(".option .restrict")).click();//开启正则
        element(by.css('.demo1 .selector div i')).click();//点击添加按钮
        element(by.css('.demo1 .selector div input')).sendKeys("a",protractor.Key.ENTER);//输入内容
        expect(list.count()).toBe(6);
    });
    it('test 正则属性 正确输入',function(){
        var list=element.all(by.css('.demo1 .selector>li'));
        expect(list.count()).toBe(6);
        element(by.css(".getReg")).sendKeys("^[1-9]{1,3}$",protractor.Key.ENTER);//设置正则规则
        element(by.css(".option .restrict")).click();//开启正则
        element(by.css('.demo1 .selector div i')).click();//点击添加按钮
        element(by.css('.demo1 .selector div input')).sendKeys("233",protractor.Key.ENTER);//输入内容
        expect(list.count()).toBe(7);
    });
    it('test search',function(){
		var searchInput=element.all(by.css('.demo1 .search input'));
		var list = element.all(by.css('.demo1 .selector>li'));
        expect(searchInput.count()).toBe(1);
        element(by.css(".option .search")).click();//使用搜索功能
		element(by.css('.demo1 .search input')).sendKeys("南");
		expect(list.count()).toBe(2);//根据关键字 搜索2项结果 
    });
    it('test select event',function(){
        var list=element.all(by.css(".demo1 .selector>li"));
        expect(list.count()).toBe(6);
        list.each(function(item,index){
            item.click();
        });
    });
    it('test multiple',function(){
        var sellist=element.all(by.css('.demo1 .selector .selected-item'));
        var list= element.all(by.css('.demo1 .selector>li'));
        expect(sellist.count()).toBe(2);
        element(by.css(".option .multiple")).click();//单选
        expect(sellist.count()).toBe(1);
        list.each(function(item,index){
			item.click();
			//每次点击都会验证选中项数量(label 在base中已经验证)
			expect(sellist.count()).toBe(1);
        });
    });
	it('test label-field',function(){
		var list=element.all(by.css('.demo1 .selector>li'));
		expect(list.get(0).getText()).toBe("南京");
		element(by.css(".option .labelToId")).click();
		var ids=['0','1','2','3','4','5'];
		list.each(function(item,index){
			item.getText().then(function(text){
				expect(text).toBe(ids[index]);
			});
		});
	});
	it('设置editable 为 false，则dom无 添加按钮',function(){
		element(by.css(".option .editable")).click();
		var sect=element(by.css(".demo1 .selector .ng-hide"));
		expect(sect.getCssValue("display")).toBe("none");
	});
	// it('show text',function(){
	// 	var list=element.all(by.css(".demo1 .selector .selected-item"));
 //        expect(list.count()).toBe(2);
	// 	var span=element.all(by.css(".demo1 .showArea p")).get(0);
	// 	element(by.css(".option .showSelect")).click();
 //        expect(span.getText()).toBe("苏州,南通");
	// });
    it("test demo2",function(){
        var list=element.all(by.css(".demo2 .selector>li"));
        expect(list.count()).toBe(6);
        list.each(function(item,index){
            item.click();
        });
        expect(element(by.css(".test-ds span")).getText()).toBe("广州");
    });
});