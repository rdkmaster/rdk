'use strict';
describe('Table Combined Demos',function() {
    beforeEach(function(){
        browser.get('rdk/app/test_attr_table/web/combined_table.html');
    });
    afterEach(function(){
    });
    it('Accordion基础信息点击后图标改变，caption确认=‘表1’',function(){
        var ico_down=element.all(by.css(".demo1 .theme .fa-angle-down"));
        var ico_up=element.all(by.css(".demo1 .theme .fa-angle-up"));
        expect(ico_down.count()).toBe(1);
        expect(ico_up.count()).toBe(0);
        element(by.css(".demo1 .theme")).click();
        expect(ico_down.count()).toBe(0);
        expect(ico_up.count()).toBe(1);
        element(by.css(".demo1 .theme>span")).getText().then(function(text){
            expect(text).toBe("表1");
        });
    });
    it('显示表格后的列标题依次 姓名，职位，薪资，入职日期，部门，其他',function(){
        var ico_down=element.all(by.css(".demo1 .theme .fa-angle-down"));
        expect(ico_down.count()).toBe(1);
        element(by.css(".demo1 .theme")).click();
        var list=element.all(by.css(".demo1 .content .sticky-enabled thead tr th"));
        expect(list.count()).toBe(6);
        var list_title=["姓名","职位","薪资","入职日期","部门","其他"];
        list.each(function(item,index){
            item.getText().then(function(text){
                expect(text).toBe(list_title[index]);
            })
        });
    });
    it('表格翻页后分页信息验证和当前页首条记录name确认',function(){
        var ico_down=element.all(by.css(".demo1 .theme .fa-angle-down"));
        expect(ico_down.count()).toBe(1);
        element(by.css(".demo1 .theme")).click();
        var pageItem=element.all(by.css(".demo1 .content .sticky-enabled tbody tr"));
        expect(pageItem.count()).toBe(2);
        var nextPage=element.all(by.css(".demo1 .pagingLine ul a"));
        expect(nextPage.count()).toBe(2);
        nextPage.get(1).click();
        var showPage=element.all(by.css(".demo1 .pagingLine ul li")).get(1);
        showPage.getText().then(function(text){
            expect(text).toBe("2/6");
        });
        var fistname=element(by.css(".demo1 .content .sticky-enabled tbody>tr>td .ng-binding"));
        fistname.getText(function(text){
            expect(text).toBe("ccc");
        });
        nextPage.get(0).click();
        showPage.getText().then(function(text){
            expect(text).toBe("1/6");
        });
        fistname.getText(function(text){
            expect(text).toBe("aaa");
        });
    });
    it("accordion控件下，表格每行点击后获取的数据变化，列标题确认",function(){
        var accordion=element(by.css(".demo2 .rdk-accordion-module:first-child .theme span"));
        accordion.getText().then(function(text){
            expect(text).toBe("Accordion_0");
        });
        element(by.css(".demo2 .rdk-accordion-module:first-child .theme")).click();
        var item=element.all(by.css(".demo2 .rdk-accordion-module:first-child .content .sticky-enabled tbody tr"));
        var list=element.all(by.css(".demo2 .rdk-accordion-module:first-child .content .sticky-enabled tbody tr th"))
        var list_title=["姓名","职位","薪资","入职日期","部门","其他"];
        expect(item.count()).toBe(6);
        item.each(function(item,index){
            item.click();
        });
        list.each(function(item,index){
            item.getText().then(function(text){
                expect(text).toBe(list_title[index]);
            });
        });
    });
    it("tab控件下，每行记录点击，数据跟随获取",function(){
        var tab_li=element.all(by.css(".demo3 .rdk-tab-module .tabs .title"));
        var tab_title=element.all(by.css(".demo3 .rdk-tab-module .tabs .title li a"));
        tab_title.get(0).click();
        var title=element.all(by.css(".title1 .sticky-enabled thead tr th"));
        expect(title.count()).toBe(6);
        expect(title.get(0).getText()).toBe("姓名");
        var item=element.all(by.css(".title1 .sticky-enabled tbody tr"));
        item.each(function(item,index){
            item.click();
        });
    });
    it('combo控件下，表格逐行点击获取数据',function(){
        var tab_li=element.all(by.css(".demo3 .rdk-tab-module .tabs .title"));
        var tab_title=element.all(by.css(".demo3 .rdk-tab-module .tabs .title li a"));
        tab_title.get(1).click();
        element(by.css(".title2 .combo-content>input")).click();
        var title=element.all(by.css(".title2 .combo-content-transclude .sticky-enabled thead tr th"));
        expect(title.count()).toBe(6);
        expect(title.get(0).getText()).toBe("姓名");
        var item=element.all(by.css(".title2 .combo-content-transclude .sticky-enabled tbody tr"));
        item.each(function(item,index){
            item.click();
        });
    });
    it('tab控件下，嵌套的accordion控件点击，展开table并点击获取每条数据',function(){
        var tab_li=element.all(by.css(".demo3 .rdk-tab-module .tabs .title"));
        var tab_title=element.all(by.css(".demo3 .rdk-tab-module .tabs .title li a"));
        tab_title.get(2).click();
        element(by.css(".title3 .theme")).click();
        var item=element.all(by.css(".title3 .content .sticky-enabled tbody tr"));
        var title=element.all(by.css(".title3 .content .sticky-enabled thead tr th"));
        expect(title.count()).toBe(6);
        expect(title.get(0).getText()).toBe("姓名");
        item.each(function(item,index){
            item.click();
        });
    });
    it('tab控件下嵌套tab控件展开的table验证列标题',function(){
        var tab_li=element.all(by.css(".demo3 .rdk-tab-module .tabs .title"));
        var tab_title=element.all(by.css(".demo3 .rdk-tab-module .tabs .title li a"));
        tab_title.get(3).click();
        var title=element.all(by.css(".title4 .sticky-enabled thead tr th"));
        expect(title.count()).toBe(6);
        expect(title.get(0).getText()).toBe("姓名");
    });
})
