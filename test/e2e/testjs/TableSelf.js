'use strict';
describe('Table Self Test',function(){
    
    搜索框输入
    it('只显示一条结果HZ',function(){
        browser.get('test/e2e/testee/table/web/self.html')
        .then(function(){
            browser.waitForAngular();
            browser.sleep(3000);
        });
        //直接输入搜索显示结果
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        expect(lines.count()).toBe(4);
	    element(by.css(".demo1 .searchWapper input")).sendKeys("HZ",protractor.Key.ENTER);
        expect(lines.count()).toBe(1);
        expect(showPage.getText()).toBe("1/1");
        //搜索去掉
        element(by.css(".demo1 .searchWapper input")).clear();
    });
    it('先翻页，再输入hz结果还是显示一条在当前页HZ',function(){
        //先翻页在搜索结果显示
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        var nextPage=element.all(by.css(".demo1 .pagingLine>ul li a"));
        var paging=element.all(by.css(".demo1 .pagingLine>span"));
        nextPage.get(2).click();
        element(by.css(".demo1 .searchWapper input")).sendKeys("hz",protractor.Key.ENTER);
        expect(lines.count()).toBe(1);
        expect(showPage.getText()).toBe("1/1");
        paging.get(0).getText().then(function(text){
            expect(text).toBe("共 1 条记录");
        });
        //搜索去掉
        element(by.css(".demo1 .searchWapper input")).clear();
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
        paging.get(0).getText().then(function(text){
            expect(text).toBe("共 10 条记录");
        });
    });
    it('改变第一列宽度',function(){
        //setting的双向绑定支持测试
        element(by.css(".section_3 .changeWidth")).click();
        //待补充前后宽度对比
    });
    it('改变绑定的data 验证data数量 should be 2',function(){
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        element(by.css(".section_3 .changeData")).click();
        expect(lines.count()).toBe(2);
    });
    //翻页和分页信息检查
    it('翻页点击与分页动态一致2/3 3/3 2/3',function(){
        //data恢复
        element(by.css(".section_3 .changeData")).click();
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        var nextPage=element.all(by.css(".demo1 .pagingLine>ul li a"));
        expect(showPage.getText()).toBe("1/3");

        expect(nextPage.count()).toBe(4);
        nextPage.get(2).click();
        expect(showPage.getText()).toBe("2/3");
        nextPage.get(2).click();
        expect(showPage.getText()).toBe("3/3");
        nextPage.get(1).click();
        expect(showPage.getText()).toBe("2/3");
    });
    it('首页尾页点击验证分页信息和显示条目',function(){
        var firstPage=element.all(by.css(".demo1 .pagingLine>ul li a")).get(0);
        var lastPage=element.all(by.css(".demo1 .pagingLine>ul li a")).get(3);
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var showPage=element(by.css(".demo1 .pagingLine>ul li .regularRecords"));
        lastPage.click();
        browser.sleep(1000);
        expect(showPage.getText()).toBe("3/3");
        expect(lines.count()).toBe(2);
        firstPage.click();
        expect(showPage.getText()).toBe("1/3");
        expect(lines.count()).toBe(4);
    });
    //逐行点击
    it('表格逐行点击获取数据',function(){
    	var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
    	expect(lines.count()).toBe(4);
        var showInfo=element.all(by.css(".section_2 span")).get(0);
    	lines.each(function(item,index){
    		item.click();
    	});
    });
   
    it('设置页面显示条数4条变10条',function(){
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        var inputs=element.all(by.css(".section_3 input"));
        inputs.get(1).sendKeys("10",protractor.Key.ENTER);
        expect(lines.count()).toBe(10);
        //恢复改动
        inputs.get(1).clear();
    });
    it('指定被选中第三行',function(){
        var inputs=element.all(by.css(".section_3 input"));
        inputs.get(0).sendKeys("2",protractor.Key.ENTER);
        //恢复
        inputs.get(0).clear();
    });
    it('设置允许输入数字的正则，输入字母后无效',function(){
        var inputs=element.all(by.css(".section_3 input"));
        var lines=element.all(by.css(".demo1 .sticky-wrap .sticky-enabled tbody tr"));
        inputs.get(2).sendKeys("^[1-9]{1,}$",protractor.Key.ENTER);
        element(by.css(".demo1 .searchWapper input")).sendKeys("N",protractor.Key.ENTER);
        expect(lines.count()).toBe(0);
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
    it('后端分页 共7页 最后一页3条数据',function(){
        var lines=element.all(by.css(".demo4 .sticky-wrap .sticky-enabled tbody tr"));
        var showPage=element(by.css(".demo4 .pagingLine>ul li .regularRecords"));
        element(by.css(".demo4 button")).click();
        browser.sleep(2000);
        var nextPage=element.all(by.css(".demo4 .pagingLine>ul li a"));
        nextPage.get(2).click();
        browser.sleep(2000);
        expect(lines.count()).toBe(7);
        expect(showPage.getText()).toBe("2/7");
        nextPage.get(2).click();
        browser.sleep(2000);
        expect(showPage.getText()).toBe("3/7");
        nextPage.get(2).click();
        browser.sleep(2000);
        expect(showPage.getText()).toBe("4/7");
        nextPage.get(2).click();
        browser.sleep(2000);
        expect(showPage.getText()).toBe("5/7");
        nextPage.get(2).click();
        browser.sleep(2000);
        expect(showPage.getText()).toBe("6/7");
        nextPage.get(2).click();
        browser.sleep(2000);
        expect(showPage.getText()).toBe("7/7");
        expect(lines.count()).toBe(3);
    });
    it("验证选中checkbox后数据返回是否正确",function(){
        var checkBox=element(by.css(".demo5 tbody tr:first-child td:first-child input"));
        checkBox.click();
        var data=element(by.css(".demo5 .check_data"));
        expect(data.getText()).toBe('[{"cityname":"南京","$index":0}]');
    });
    it("验证选中多个checkbox后数据返回是否正确",function(){
        var checkBox=element(by.css(".demo5 tbody tr:first-child td:first-child input"));
        var checkBox2=element(by.css(".demo5 tbody tr:nth-child(2) td:first-child input"));
        checkBox.click();
        checkBox.click();
        checkBox2.click();
        var data=element(by.css(".demo5 .check_data"));
        expect(data.getText()).toBe('[{"cityname":"南京","$index":0},{"cityname":"苏州","$index":1}]');
    });
    it("验证选中多个checkbox后数据返回是否正确",function(){
        var checkBox=element(by.css(".demo5 tbody tr:first-child td:first-child input"));
        var checkBox2=element(by.css(".demo5 tbody tr:nth-child(2) td:first-child input"));
        checkBox.click();
        checkBox2.click();
        var data=element(by.css(".demo5 .check_data"));
        expect(data.getText()).toBe('[]');
    });
    
});