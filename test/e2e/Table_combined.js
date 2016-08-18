'use strict';
describe('Table Combined Demos',function() {
    beforeEach(function(){
        browser.get('rdk/app/test_attr_table/web/combined_table.html');
    });
    afterEach(function(){
        expect(1).toBe(1);
    });
    it('test demo1 base',function(){
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
    it('test demo1 title',function(){
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
    it('test demo1 pageTopage',function(){
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
    it("should be xxx",function(){
        var accordion=element(by.css(".demo2 .rdk-accordion-module:first-child .theme span"));
        accordion.getText().then(function(text){
            expect(text).toBe("Accordion_0");
        });
        element(by.css(".demo2 .rdk-accordion-module:first-child .theme")).click();
        var table_list=element.all(by.css(".demo2 .rdk-accordion-module:first-child .content .sticky-enabled tbody tr"));
        var list=element.all(by.css(".demo2 .rdk-accordion-module:first-child .content .sticky-enabled tbody tr th"))
        var list_title=["姓名","职位","薪资","入职日期","部门","其他"];
        expect(table_list.count()).toBe(6);
        table_list.each(function(item,index){
            item.click();
        });
        list.each(function(item,index){
            item.getText().then(function(text){
                expect(text).toBe(list_title[index]);
            });
        });
    });
    it("test demo3 t1",function(){
        var tab_li=element.all(by.css(".demo3 .rdk-tab-module .tabs .title"));
        // expect(tab_li.count()).toBe(1);
        var tab_title=element.all(by.css(".demo3 .rdk-tab-module .tabs .title li a"));
        tab_title.get(0).click();
        var table1_list=element.all(by.css(".title1 .sticky-enabled thead tr th"));
        expect(table1_list.count()).toBe(6);
        expect(table1_list.get(0).getText()).toBe("姓名");
        var table1_item=element.all(by.css(".title1 .sticky-enabled tbody tr"));
        table1_item.each(function(item,index){
            item.click();
        });
    });
    it('test demo3 t2',function(){
        var tab_li=element.all(by.css(".demo3 .rdk-tab-module .tabs .title"));
        // expect(tab_li.count()).toBe(1);
        var tab_title=element.all(by.css(".demo3 .rdk-tab-module .tabs .title li a"));
        tab_title.get(1).click();
        element(by.css(".title2 .combo-content>input")).click();
        var table2_list=element.all(by.css(".title2 .combo-content-transclude .sticky-enabled thead tr th"));
        expect(table2_list.count()).toBe(6);
        expect(table2_list.get(0).getText()).toBe("姓名");
        var table2_item=element.all(by.css(".title2 .combo-content-transclude .sticky-enabled tbody tr"));
        table2_item.each(function(item,index){
            item.click();
        });
    });
    it('test demo3 t3',function(){
        var tab_li=element.all(by.css(".demo3 .rdk-tab-module .tabs .title"));
        // expect(tab_li.count()).toBe(1);
        var tab_title=element.all(by.css(".demo3 .rdk-tab-module .tabs .title li a"));
        tab_title.get(2).click();
        element(by.css(".title3 .theme")).click();
        var table3_item=element.all(by.css(".title3 .content .sticky-enabled tbody tr"));
        var table3_list=element.all(by.css(".title3 .content .sticky-enabled thead tr th"));
        expect(table3_list.count()).toBe(6);
        expect(table3_list.get(0).getText()).toBe("姓名");
        table3_item.each(function(item,index){
            item.click();
        });
    });
    it('test demo3 t4',function(){
        var tab_li=element.all(by.css(".demo3 .rdk-tab-module .tabs .title"));
        // expect(tab_li.count()).toBe(5);
        var titles=['1','2','3','4','4.01'];
        var tab_title=element.all(by.css(".demo3 .rdk-tab-module .tabs .title li a"));
        tab_title.get(3).click();
        tab_title.each(function(item,index){
            item.getText().then(function(text){
                expect(text).toBe(titles[index]);
            });
        });
    });
})
