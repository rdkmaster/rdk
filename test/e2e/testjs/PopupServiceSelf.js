'use strict';
describe("PopupService Self Test",function(){
    it('open test page',function(){
        browser.get('test/e2e/testee/popupservice/web/self.html');
        browser.sleep(2000);
    });

    it('弹出并单击关闭', function(){
        var btn = element.all(by.css(".demo button"));
        btn.get(0).click();
        browser.sleep(2000);
        expect(element.all(by.css(".ui-dialog .sample-module")).count()).toBe(1);

        var closeBtn = element.all(by.css(".ui-dialog-titlebar button"));
        closeBtn.get(0).click();
        browser.sleep(2000);
        expect(element.all(by.css(".ui-dialog")).count()).toBe(0);
    });

    it('弹出并单击确定', function(){
        var btn = element.all(by.css(".demo button"));
        btn.get(0).click();
        browser.sleep(2000);
        
        var confirmBtn = element.all(by.css(".ui-dialog-content .sample-module button"));
        confirmBtn.get(0).click();
        browser.sleep(300);
        expect(element.all(by.css(".ui-dialog")).count()).toBe(0);
    });
});