'use strict';
describe('Table Demos',function(){
    beforeEach(function(){
        browser.get('rdk/app/test_attr_table/web/index.html');
    });
    afterEach(function(){
        expect(1).toBe(1);
    });
    //搜索框输入
    it('search',function(){
        //直接输入搜索显示结果
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        expect(lines.count()).toBe(4);
	    element(by.css(".demo1 .searchWapper input")).sendKeys("HZ",protractor.Key.ENTER);
        expect(lines.count()).toBe(1);
        expect(showPage.getText()).toBe("1/1");
    });
    it('unsual search',function(){
        //先翻页在搜索结果显示
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        var nextPage=element.all(by.css(".demo1 .pagingLine>ul li a"));
        var paging=element.all(by.css(".demo1 .pagingLine>span"));
        nextPage.get(1).click();
        element(by.css(".demo1 .searchWapper input")).sendKeys("hz",protractor.Key.ENTER);
        expect(lines.count()).toBe(1);
        expect(showPage.getText()).toBe("1/1");
        paging.get(0).getText().then(function(text){
            expect(text).toBe("共 1 条记录");
        });
    });
    //验证列标题和顺序
    it('title',function(){
    	var titles=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled thead tr th"));
	    expect(titles.count()).toBe(6);
	    var items=["日期","城市名","网页响应成功率","网页下载速率","网页响应时延","详情"];
	    titles.each(function(item,index){
	    	item.getText().then(function(text){
	    		expect(text).toBe(items[index]);
	    	});
	    });
    });
    it('sort',function(){
        var titles=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled thead tr th"));
        titles.get(2).click();
    });
    //分页信息
    it('pageServer',function(){
        var paging=element.all(by.css(".demo1 .pagingLine>span"));
        expect(paging.count()).toBe(1);
        paging.get(0).getText().then(function(text){
            expect(text).toBe("共 10 条记录");
        });
    });
    it('changeWidth',function(){
        //setting的双向绑定支持测试
        element(by.css(".section_3 .changeWidth")).click();
    });
    //翻页和分页信息检查
    it('nextPage',function(){
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        var nextPage=element.all(by.css(".demo1 .pagingLine>ul li a"));
        expect(showPage.getText()).toBe("1/3");

        expect(nextPage.count()).toBe(2);
        nextPage.get(1).click();
        expect(showPage.getText()).toBe("2/3");
        nextPage.get(1).click();
        expect(showPage.getText()).toBe("3/3");
        nextPage.get(0).click();
        expect(showPage.getText()).toBe("2/3");
    });
    //逐行点击
    it('line',function(){
    	var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
    	expect(lines.count()).toBe(4);
    	lines.each(function(item,index){
    		item.click();
            // item.dblclick();
    	});
    });
    //模拟双击效果
    // it('dbclick',function(){

    // });
    it('pageSize',function(){
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var inputs=element.all(by.css(".section_3 input"));
        inputs.get(1).sendKeys("10",protractor.Key.ENTER);
        expect(lines.count()).toBe(10);
    });
    it('selectedIndex',function(){
        var inputs=element.all(by.css(".section_3 input"));
        inputs.get(0).sendKeys("2",protractor.Key.ENTER);
    });
    it('pattern',function(){
        var inputs=element.all(by.css(".section_3 input"));
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        inputs.get(2).sendKeys("^[1-9]{1,}$",protractor.Key.ENTER);
        element(by.css(".demo1 .searchWapper input")).sendKeys("N",protractor.Key.ENTER);
        expect(lines.count()).toBe(4);
    });
    it("ds demo 2",function(){
        var lines=element.all(by.css(".demo2 .sticky-wrap .sticky-enabled tbody tr"));
        var td=element.all(by.css(".demo2 .sticky-wrap .sticky-enabled tbody tr td:first-child div div"));
        var names=['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','jjj','kkk','lll','mmm'];
        expect(td.count()).toBe(12);
        expect(lines.count()).toBe(12);
        lines.each(function(item,index){
            item.click();
            td.get(index).getText().then(function(text){
                expect(text).toBe(names[index]);
            });
        });
    });
    it("ds demo 3",function(){
        var lines=element.all(by.css(".demo3 .sticky-wrap"));
        expect(lines.count()).toBe(1);
    })
    
});