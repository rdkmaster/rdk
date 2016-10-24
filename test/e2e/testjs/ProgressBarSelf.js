'use strict';
describe('ProgressBar Self Test',function(){
    it('value值20 宽度条200',function(){
        browser.get("test/e2e/testee/progressBar/web/self.html")
        .then(function(){
            browser.sleep(1500);
        });
        var current=element(by.css(".value .progress .progress-bar"));
        var html=element(by.css(".value .progress .progress-bar b"));
        expect(current.getCssValue("width")).toBe("40px");
        expect(html.getText()).toBe("20%");
    });
    it('设置最大进度80',function(){
        //此时同样20%的进度换算具体实际宽度条大于40px
        var current=element(by.css(".max .progress .progress-bar"));
        var html=element(by.css(".max .progress .progress-bar b"));
        expect(current.getCssValue("width")).toBe("50px");
        expect(html.getText()).toBe("20%");
    });
    //进度条颜色与bootstrap对应一致
    it('背景为danger',function(){
        var current=element(by.css(".danger .progress .progress-bar"));
        var html=element(by.css(".danger .progress .progress-bar b"));
        expect(current.getCssValue("background-color")).toBe("rgba(217, 83, 79, 1)");
    });
    it('背景为warning',function(){
        var current=element(by.css(".warning .progress .progress-bar"));
        var html=element(by.css(".warning .progress .progress-bar b"));
        expect(current.getCssValue("background-color")).toBe("rgba(240, 173, 78, 1)");
    });
    it('背景颜色info',function(){
        var current=element(by.css(".info .progress .progress-bar"));
        var html=element(by.css(".info .progress .progress-bar b"));
        expect(current.getCssValue("background-color")).toBe("rgba(91, 192, 222, 1)");
    });
    //动态增加进度
    it('进度渲染将会以动画方式完成',function(){
        var current=element(by.css(".animate .progress .progress-bar"));
        var html=element(by.css(".animate .progress .progress-bar b"));
        var btn=element(by.css(".animate button"));
        
        expect(current.getCssValue("width")).toBe("20px");
        expect(html.getText()).toBe("10%");
        btn.click()
        .then(function(){
            browser.sleep(1500);
            expect(current.getCssValue("width")).toBe("40px");
            expect(html.getText()).toBe("20%");
        });
     });
     it('start',function(){
         //会产生一个宽度不断增加的div id=ngProgress
         var btn=element.all(by.css(".start button"));
         btn.get(0).click();
     });
     it('stop',function(){
         var btn=element.all(by.css(".stop button"));
         btn.get(1).click();
     });
});