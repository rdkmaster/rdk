'use strict';
describe('button test',function(){
    it('label 内容文字',function(){
        browser.get("test/e2e/testee/button/web/self.html");
        var rdk_button=element(by.css(".demo1 button.rdk-button-btn"));
        var rdk_wrap=element(by.css(".demo1 div.rdk-button-wrap"))
        expect(rdk_wrap.getAttribute("label")).toBe("我来也");
        expect(rdk_button.getText()).toBe("我来也");
    });
    it('click 回调函数',function(){
        browser.get("test/e2e/testee/button/web/self.html");
        var callBakFlag=element(by.binding("callBakFlag"));
        var rdk_button=element(by.css(".demo2 button.rdk-button-btn"));
        rdk_button.click().then(function(){
            expect(callBakFlag.getText()).toBe('1');    
        });
    });
    it('selected和toggle配合用',function(){
        browser.get("test/e2e/testee/button/web/self.html");
        var rdk_wrap=element(by.css(".demo3 div.rdk-button-wrap"));
        var rdk_button=element(by.css(".demo3 button.rdk-button-btn"));
        var buttonTog=element(by.css(".demo3 button.btn"));
        expect(rdk_button.getCssValue("backgroundColor")).toBe("rgba(0, 143, 212, 1)");
        buttonTog.click().then(function(){
            expect(rdk_button.getCssValue("backgroundColor")).toBe("rgba(58, 177, 234, 1)");    
        });
        rdk_button.click().then(function(){
            expect(rdk_button.getCssValue("backgroundColor")).toBe("rgba(0, 143, 212, 1)")
        });
    });
    it('enabled 可用事件 ',function(){
        browser.get("test/e2e/testee/button/web/self.html");
        var callBakFlag=element(by.binding("callBakFlag"));
        var rdk_button=element(by.css(".demo4 button.rdk-button-btn"));
        var buttonTog=element(by.css(".demo4 button.btn"));
        rdk_button.click().then(function(){
            expect(callBakFlag.getText()).toBe('1');    
        });
        buttonTog.click().then(function(){
            expect(callBakFlag.getText()).toBe('0');    
        });
        rdk_button.click().then(function(){
            expect(callBakFlag.getText()).toBe('0');    
        });
     });
});