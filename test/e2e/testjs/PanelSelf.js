'use strict';
describe('Panel Self Test',function(){
    it('open test page',function(){
        browser.get('test/e2e/testee/panel/web/self.html')
        .then(function(){
            browser.sleep(2000);
        });
    });
    it('显示默认标题',function(){
        //标题
        var i=element(by.css(".demo1 .panel-caption i"));
        // expect(i.getText()).toBe("  标题");
        expect(i.getText()).toMatch('标题');
    });
    it('显示自定义标题',function(){
        var i=element(by.css(".demo2 .panel-caption i"));
        expect(i.getText()).toMatch('自定义');
    });
    it('图标显示',function(){
        var i=element(by.css(".demo3 .panel-caption i"));
        expect(i.getAttrbute('class')).toMatch('fa');
    });
    it('宽度默认200px',function(){
        var panel=element(by.css(".demo4 .rdk-panel-module"));
        expect(panel.getCssValue("width")).toBe("200px");
    });
    it('设置宽度 高度',function(){
         var panel=element(by.css(".demo5 .rdk-panel-module"));
         expect(panel.getCssValue("width")).toBe("250px");
         expect(panel.getCssValue("height")).toBe("100px");
    });
    it('close关闭和befor_close',function(){
        // var i=element(by.css(".demo6 .panel-caption i"));
        // //点击关闭后弹窗 和 处理
        // i.click();
        // //关闭完成
        // var panel=element(by.css(".demo6 .rdk-panel-module"));
        // expect(panel.getAttrbute("class")).toMatch("ng-hide");
    });
});