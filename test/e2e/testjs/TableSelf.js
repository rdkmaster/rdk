'use strict';
describe('Table Demos',function(){
    beforeEach(function(){
        browser.get('test/e2e/testee/table/web/self.html');
    });
    afterEach(function(){
    });
    //搜索框输入
    it('只显示一条结果HZ',function(){
        //直接输入搜索显示结果
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        expect(lines.count()).toBe(4);
	    element(by.css(".demo1 .searchWapper input")).sendKeys("HZ",protractor.Key.ENTER);
        expect(lines.count()).toBe(1);
        expect(showPage.getText()).toBe("1/1");
    });
    it('结果还是显示一条在当前页HZ',function(){
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
    it('表格标题顺序与data一致',function(){
    	var titles=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled thead tr th"));
	    expect(titles.count()).toBe(6);
	    var items=["日期","城市名","网页响应成功率","网页下载速率","网页响应时延","详情"];
	    titles.each(function(item,index){
	    	item.getText().then(function(text){
	    		expect(text).toBe(items[index]);
	    	});
	    });
    });
    it('第三列内容按照字符排序2 4 4 4',function(){
        var titles=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled thead tr th"));
        titles.get(2).click();
    });
    //分页信息
    it('分页信息包含记录数 10条',function(){
        var paging=element.all(by.css(".demo1 .pagingLine>span"));
        expect(paging.count()).toBe(1);
        paging.get(0).getText().then(function(text){
            expect(text).toBe("共 10 条记录");
        });
    });
    it('改变第一列宽度',function(){
        //setting的双向绑定支持测试
        element(by.css(".section_3 .changeWidth")).click();
    });
    //翻页和分页信息检查
    it('翻页点击与分页动态一致2/3 3/3 2/3',function(){
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
    it('表格逐行点击获取数据',function(){
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
    it('设置页面显示条数4条变10条',function(){
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var inputs=element.all(by.css(".section_3 input"));
        inputs.get(1).sendKeys("10",protractor.Key.ENTER);
        expect(lines.count()).toBe(10);
    });
    it('指定被选中第三行',function(){
        var inputs=element.all(by.css(".section_3 input"));
        inputs.get(0).sendKeys("2",protractor.Key.ENTER);
    });
    it('设置允许输入数字的正则，输入字母后无效，恢复初始状态',function(){
        var inputs=element.all(by.css(".section_3 input"));
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        inputs.get(2).sendKeys("^[1-9]{1,}$",protractor.Key.ENTER);
        element(by.css(".demo1 .searchWapper input")).sendKeys("N",protractor.Key.ENTER);
        expect(lines.count()).toBe(4);
    });
    it("验证点击每行的姓名信息依次为aaa,bbb,ccc,ddd ...",function(){
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
    it("验证存在一个表格",function(){
        var lines=element.all(by.css(".demo3 .sticky-wrap"));
        expect(lines.count()).toBe(1);
    });
    it('后端分页，,共7页,最后一页3条数据',function(){
        var lines=element.all(by.css(".demo4 .sticky-wrap .sticky-enabled tbody tr"));
        element(by.css(".demo4 button")).click();
        var nextPage=element.all(by.css(".demo4 .pagingLine>ul li a"));
        nextPage.get(1).click();
        expect(lines.count()).toBe(7);
        nextPage.get(1).click();
        nextPage.get(1).click();
        nextPage.get(1).click();
        nextPage.get(1).click();
        nextPage.get(1).click();
        expect(lines.count()).toBe(3);
    });
    
});