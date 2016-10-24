'use strict';
describe('SingleIndicator Self Test',function(){
    it('value双向绑定设置50',function(){
        browser.get("test/e2e/testee/singleIndicator/web/self.html")
        .then(function(){
            browser.waitForAngular();
            browser.sleep(2000);
        });
        var locator=element.all(by.css(".value .single-indicator-value span")).get(0);
        expect(locator.getText()).toBe('50');
    });
    it('自定义符号$',function(){
        var locator=element.all(by.css(".formatter .single-indicator-value span")).get(1);
        expect(locator.getText()).toBe("$");
    });
    it('设置label为Apple',function(){
        var locator=element(by.css("div.single-indicator-label .single-indicator-label"));
        expect(locator.getText()).toBe("Apple");
    });
    //文字在控件方向;上下时候就是html 编写顺序区别;左右是与float结合使用
    it('position-top',function(){
        var locator=element.all(by.css(".position-top .rdk-single-indicator>div"));
        expect(locator.get(0).getAttribute("class")).toBe("single-indicator-content label_position_top");
    });
    it('position-down',function(){
        var locator=element.all(by.css(".position-down .rdk-single-indicator>div"));
        expect(locator.get(1).getAttribute("class")).toBe("single-indicator-content label_position_down");
    });
    it('position-left',function(){
        var locator=element.all(by.css(".position-left .rdk-single-indicator>div"));
        expect(locator.get(0).getAttribute("class")).toBe("single-indicator-content label_position_left");
        expect(locator.get(0).getCssValue("float")).toBe("left");
    });
    it('position-right',function(){
        var locator=element.all(by.css(".position-right .rdk-single-indicator>div"));
        expect(locator.get(1).getAttribute("class")).toBe("single-indicator-content label_position_right");
        expect(locator.get(0).getCssValue("float")).toBe("left");
    });
    //内置 icon大小,当前文本设置字体大小14px = 1em
    it('wifi标志2em',function(){
        var locator=element(by.css(".wifi-2x .rdk-single-indicator .single-indicator-title i"));
        expect(locator.getAttribute("class")).toBe("fa fa-wifi fa-2x single-indicator-icon");
        expect(locator.getCssValue('font-size')).toBe('28px');
    });
    it('wifi 标志3em',function(){
        var locator=element(by.css(".wifi-3x .rdk-single-indicator .single-indicator-title i"));
        expect(locator.getAttribute("class")).toBe("fa fa-wifi fa-3x single-indicator-icon");
        expect(locator.getCssValue('font-size')).toBe('42px');
    });
    it('mobile 标志 2em',function(){
        var locator=element(by.css(".mobile-2x .rdk-single-indicator .single-indicator-title i"));
        expect(locator.getAttribute("class")).toBe("fa fa-mobile fa-2x single-indicator-icon");
        expect(locator.getCssValue('font-size')).toBe('28px');
    });
    //小箭头指向,绝对定位
    it('箭头向左',function(){
        var arrow=element(by.css(".point-to .single-indicator-title .point_to"));
        var btn=element.all(by.css(".point-to button"));
        btn.get(0).click()
        .then(function(){
            expect(arrow.getCssValue("left")).toBe("-9px");
        });
    });
    it('箭头向上',function(){
        var arrow=element(by.css(".point-to .single-indicator-title .point_to"));
        var btn=element.all(by.css(".point-to button"));
        btn.get(1).click()
        .then(function(){
            expect(arrow.getCssValue("top")).toBe("-9px");
        });
    });
    it('箭头向右',function(){
        var arrow=element(by.css(".point-to .single-indicator-title .point_to"));
        var btn=element.all(by.css(".point-to button"));
        btn.get(2).click()
        .then(function(){
            expect(arrow.getCssValue("right")).toBe("-9px");
        });
    });
    it('箭头向下',function(){
        var arrow=element(by.css(".point-to .single-indicator-title .point_to"));
        var btn=element.all(by.css(".point-to button"));
        btn.get(3).click()
        .then(function(){
            expect(arrow.getCssValue("bottom")).toBe("-9px");
        });
    });
});