'use strict';
describe('Panel Combined Test',function(){
    it('open test page',function(){
        browser.get('test/e2e/testee/panel/web/combined.html')
        .then(function(){
            browser.sleep(2000);
        });
    });
    it('accordion',function(){
        var btn=element(by.css(".accordion .rdk-accordion-module .theme"));
        btn.click();
        var content=element(by.css(".accordion .rdk-accordion-module .content"));
        expect(content.getText()).toBe("RDK");
    });
    it('combo',function(){
        var btn=element(by.css(".combo .rdk-combo-select-module .form-control"));
        btn.click();
        var content=element(by.css(".combo .rdk-combo-select-module .combo-content-transclude div div"));
        expect(content.getText()).toBe("Combo Select");
    });
    it('scroller',function(){
        var right=element(by.css(".scroller .right_arrow i"));
        var content=element(by.css(".scroller .context div"));
        expect(content.getText()).toBe("R");
        right.click();
        browser.sleep(300);
        expect(content.getText()).toBe("D");
    });
    it('tab',function(){
        //切换标签
        var label=element(by.css(".tab .rdk-tab-module li[aria-selected='false']"));
        label.click();
        var content=element.all(by.css(".tab .content div>div"));
        expect(content.get(1).getText()).toBe("rdk_client");
    });
});