'use strict';
describe('Alert Self Test',function(){
    it('open page',function(){
        browser.get('test/e2e/testee/alert/web/self.html');
        browser.sleep(1000);
    });
    it('confirm 缺省',function(){
        var locator=element(by.css(".demo1 p"));
        locator.click();
        browser.sleep(300);
        //产生窗口、模态框
        var alert=element.all(by.css(".wrapBox .btnLine input"));
        expect(alert.count()).toBe(3);
        var array=['是','否','取消'];
        alert.each(function(item,index){
            expect(item.getAttribute('value')).toBe(array[index]);
        })
        alert.get(0).click();
    });
    it('其余类型缺省',function(){
        //只有一个确定按钮
        var locator=element(by.css(".demo7 p"));
        locator.click();
        browser.sleep(300);
        var alert=element.all(by.css(".wrapBox .btnLine input"));
        expect(alert.count()).toBe(1);
        expect(alert.get(0).getAttribute('value')).toBe('确定');
        alert.get(0).click();
    });
    it('添加message',function(){
        var btn=element(by.css(".demo1 button[ng-click='addMessage()']"));
        btn.click();
        browser.sleep(300);
        var message=element(by.css(".wrapBox .tableMsg"));
        expect(message.getText()).toBe('message');
        var alert=element.all(by.css(".wrapBox .btnLine input"));
        alert.get(0).click();
    });
    it('添加title',function(){
        var btn=element(by.css(".demo1 button[ng-click='addTitle()']"));
        btn.click();
        browser.sleep(300);
        var message=element(by.css(".wrapBox .titleLine"));
        expect(message.getText()).toBe('我是窗口');
        var alert=element.all(by.css(".wrapBox .btnLine input"));
        alert.get(0).click();
    });
    // 1 2 4 8对应 是 否 确定 取消按钮
    it('添加按钮1类型',function(){
        var btn=element(by.css(".demo1 button[ng-click='addBtn1()']"));
        btn.click();
        browser.sleep(300);
        var alert=element(by.css(".wrapBox .btnLine input"));
        expect(alert.getAttribute('value')).toBe("是");
        alert.click();
    });
    it('添加按钮2类型',function(){
        var btn=element(by.css(".demo1 button[ng-click='addBtn2()']"));
        btn.click();
        browser.sleep(300);
        var alert=element(by.css(".wrapBox .btnLine input"));
        expect(alert.getAttribute('value')).toBe("否");
        alert.click();
    });
    it('添加按钮4类型',function(){
        var btn=element(by.css(".demo1 button[ng-click='addBtn4()']"));
        btn.click();
        browser.sleep(300);
        var alert=element(by.css(".wrapBox .btnLine input"));
        expect(alert.getAttribute('value')).toBe("确定");
        alert.click();
    });
    it('添加按钮8类型',function(){
        var btn=element(by.css(".demo1 button[ng-click='addBtn8()']"));
        btn.click();
        browser.sleep(300);
        var alert=element(by.css(".wrapBox .btnLine input"));
        expect(alert.getAttribute('value')).toBe("取消");
        alert.click();
    });
    //组合类型 比如9=8+1 就是说按钮存在 是 和 取消 两种;10=8+2 以此类推
    it('添加按钮9类型',function(){
        var btn=element(by.css(".demo1 button[ng-click='addBtn9()']"));
        btn.click();
        browser.sleep(300);
        var alert=element.all(by.css(".wrapBox .btnLine input"));
        expect(alert.get(0).getAttribute('value')).toBe("是");
        expect(alert.get(1).getAttribute('value')).toBe('取消');
        alert.get(0).click();
    });
    it('添加按钮10类型',function(){
        var btn=element(by.css(".demo1 button[ng-click='addBtn10()']"));
        btn.click();
        browser.sleep(300);
        var alert=element.all(by.css(".wrapBox .btnLine input"));
        expect(alert.get(0).getAttribute('value')).toBe("否");
        expect(alert.get(1).getAttribute('value')).toBe('取消');
        alert.get(0).click();
    });
    it('添加按钮12类型',function(){
        var btn=element(by.css(".demo1 button[ng-click='addBtn12()']"));
        btn.click();
        browser.sleep(300);
        var alert=element.all(by.css(".wrapBox .btnLine input"));
        expect(alert.get(0).getAttribute('value')).toBe("取消");
        expect(alert.get(1).getAttribute('value')).toBe('确定');
        alert.get(0).click();
    });
    
    it('回调类型区分',function(){
        var locator=element(by.css(".demo5 p"));
        locator.click();
        browser.sleep(500);
        //产生窗口、模态框
        var alert=element.all(by.css(".wrapBox .btnLine input"));
        expect(alert.count()).toBe(2);
        var array=['取消','确定'];
        alert.each(function(item,index){
            expect(item.getAttribute('value')).toBe(array[index]);
        })
        var message=element(by.css(".demo5>span"));
        alert.get(0).click();
        browser.sleep(300);
        expect(message.getText()).toBe('取消');
        locator.click();
        browser.sleep(300);
        alert.get(1).click();
        browser.sleep(300);
        expect(message.getText()).toBe('确定');
    });
    it('非模态框',function(){
        var locator=element(by.css(".demo6 p"));
        locator.click();
        browser.sleep(300);
        var model=element.all(by.css(".demo6 .ui-widget-overlay"));
        expect(model.count()).toBe(0);
    });
});