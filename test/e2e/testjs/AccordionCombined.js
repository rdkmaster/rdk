'use strict';
describe('Accordion Combined Test',function(){
    
    it('展开accordion并且能够点击combo下面的basic_select控件',function(){
        browser.get("test/e2e/testee/accordion/web/combined.html");
        browser.sleep(2000);
        element(by.css(".combo .rdk-accordion-module .theme")).click();
        var combo_input=element(by.css(".combo .rdk-accordion-module .rdk-combo-select-module .form-control"));
        combo_input.click();
        var options=element.all(by.css(".combo .rdk-accordion-module .rdk-combo-select-module .rdk-selector-module .selector li"));
        options.get(0).click();
        expect(combo_input.getAttribute("title")).toBe("南京");
    });
    it('展开accordion能够展现panel 并且获取内容',function(){
        element(by.css(".panel .rdk-accordion-module .theme")).click();
        var panel_content=element(by.css(".panel .rdk-accordion-module .panel-content p"));
        expect(panel_content.getText()).toBe("这是一段文字");
    });
    it("展开accordion可以展现scroller内部图片点击播放",function(){
        element(by.css(".scroller .rdk-accordion-module .theme")).click();
        var img=element(by.css(".scroller .rdk-accordion-module .slide .context img"));
        expect(img.getAttribute("ng-src")).toBe('./images/Chrysanthemum.jpg');
        //每次点击切换都输出切换后的src
        element(by.css(".scroller .rdk-accordion-module .slider .arrows .right_arrow i")).click().
        then(function(){
            expect(img.getAttribute("ng-src")).toBe('./images/Hydrangeas.jpg');
        });
    });
    it('展开accordion展现Tab控件 选择tab3的呈现basic_select控件',function(){
        var ele=element(by.css(".tab .rdk-accordion-module .theme"));
        ele.click();
        var tab_title=element.all(by.css(".tab .rdk-accordion-module .rdk-tab-module .tabs ul>li"));
        tab_title.get(2).element(by.css("a")).click();//展现basic_select
        //点击选择项
        element.all(by.css(".tab .rdk-accordion-module .rdk-tab-module .tabs .rdk-selector-module .selector li")).get(0).click();
        expect(element(by.model('currentVal')).getAttribute("value")).toBe("南京");
        element.all(by.css(".tab .rdk-accordion-module .rdk-tab-module .tabs .rdk-selector-module .selector li")).get(1).click();
        expect(element(by.model('currentVal')).getAttribute("value")).toBe("上海");
    });
});