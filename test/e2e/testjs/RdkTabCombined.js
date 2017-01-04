'use strict';
describe('Tab Combined Test',function(){
    
    it('与scroller的测试',function(){
        browser.get('test/e2e/testee/tab/web/combined.html')
        .then(function(){
            browser.waitForAngular();
            browser.sleep(2000);
        });
        var context=element(by.css(".scroller .slide .context span"));
        //scroller内部显示的文字内容
        expect(context.getText()).toBe('11');
        element(by.css(".scroller .arrows .right_arrow i")).click();
        expect(context.getText()).toBe("22");
    });
    it('与accordion的测试',function(){
        //展开accordion
        element(by.css(".accordion .theme")).click();
        expect(element(by.css(".accordion .rdk-accordion-module .content div")).getText()).toBe("content");
    });
    it('与panel的测试',function(){
        var content=element(by.css(".panel .rdk-panel-module .rdk-panel-content-transclude div"));
        expect(content.getText()).toBe("put what you want");
    });
    it('与combo_select 测试',function(){
        //combo展开
        element(by.css(".combo .combo-content .form-control")).click();
        //选中南京
        element.all(by.css(".combo .selector li")).get(0).click();
        expect(element(by.css(".combo .combo-content .form-control")).getAttribute("title")).toBe('南京');
    });
});