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
        var rdk_wrap=element(by.css(".demo3 div.rdk-button-shade"));
        var rdk_button=element(by.css(".demo3 button.rdk-button-btn"));
        var buttonTog=element(by.css(".demo3 button.btn"));
        expect(rdk_wrap.getCssValue("backgroundColor")).toBe("rgba(83, 149, 216, 1)");
        browser.actions().mouseMove(rdk_button);
        browser.sleep(500);
        expect(rdk_button.getCssValue("backgroundColor")).toBe("rgba(0, 0, 0, 0.14902)");
        buttonTog.click().then(function(){
            expect(rdk_button.getCssValue("backgroundColor")).toBe("rgba(0, 0, 0, 0)")
        });
        rdk_button.click().then(function(){
            expect(rdk_button.getCssValue("backgroundColor")).toBe("rgba(0, 0, 0, 0.0784314)")
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
    it('type 样式',function(){
        browser.get("test/e2e/testee/button/web/self.html");
        var rdk_wrap=element(by.css(".demo5 div.rdk-button-shade"));
        var buttonTog1=element(by.css(".demo5 button.btn1"));
        var buttonTog2=element(by.css(".demo5 button.btn2"));
        var buttonTog3=element(by.css(".demo5 button.btn3"));
        expect(rdk_wrap.getCssValue("backgroundColor")).toBe("rgba(83, 149, 216, 1)");
        buttonTog1.click().then(function(){
            expect(rdk_wrap.getCssValue("backgroundColor")).toBe("rgba(83, 149, 216, 1)");    
        });
        buttonTog2.click().then(function(){
            expect(rdk_wrap.getCssValue("backgroundColor")).toBe("rgba(231, 143, 78, 1)");    
        });
        buttonTog3.click().then(function(){
            expect(rdk_wrap.getCssValue("backgroundColor")).toBe("rgba(133, 197, 108, 1)");    
        });
     });
});