'use strcit';
describe('Bullet Self Test',function(){
    it('拖拽功能实现与限制',function(){
        browser.get("test/e2e/testee/bullet/web/self.html")
        .then(function(){
            browser.waitForAngular();
        });
        var sliders=element.all(by.css(".sliders .progress .slider"));
        var current=element(by.css(".sliders .currentData"));
        //x 4个单位对应页面数值变化1 具体是不是px 不用考虑,不足的部分四舍五入
        browser.actions().dragAndDrop(element.all(by.css(".sliders .progress .slider")).get(0),{x:40,y:70}).perform();
        // sliders.get(0).getLocation().then(function(loc){
        //     console.log(loc);
        //    browser.actions().dragAndDrop(sliders.get(0),{x:40,y:70}).perform();
        // });
        expect(current.getText()).toBe("[30,40,60,80]");
        browser.sleep(500);
    });
    it('检测sliders是否支持双向绑定',function(){
        var current=element(by.css(".sliders .currentData"));
        //初始值点击获取
        var sliders=element.all(by.css(".sliders .progress .slider"));
        expect(sliders.count()).toBe(4);
        sliders.get(1).click();
        expect(current.getText()).toBe('[30,40,60,80]');
        //改变值
        element(by.css(".sliders button")).click();
        sliders.get(1).click();
        expect(current.getText()).toBe('[10,30,50,70]');
    });
    it('横向放置时候的滑块属性设置 direction',function(){
        //横向时候class为rdk-bullet-horizontal-module
        var bullet=element(by.css(".horizontal>div"));
        expect(bullet.getAttribute("class")).toBe("rdk-bullet-horizontal-module");
        //中心轴width:98% height:10px
        var bar=element(by.css(".horizontal .progress .progress-bar"));
        // expect(bar.getCssValue("width")).toBe("98%");浏览器解析是具体px值
        expect(bar.getCssValue("height")).toBe("10px");
        //每个滑块的对应的left值=480px*98%*数据百分比（默认最小0  最大100%）500px 去掉padding两边10px=>480px
        //案例用所给数据是 [10,20,50,87] 依次left为 45px 90px 225px 391px
        var sliders=element.all(by.css(".horizontal .progress .slider"));
        expect(sliders.get(0).getCssValue("left")).toBe("45px");
        expect(sliders.get(1).getCssValue("left")).toBe("90px");
        expect(sliders.get(2).getCssValue("left")).toBe("225px");
        expect(sliders.get(3).getCssValue("left")).toBe("391px");
    });
    it('纵向放置滑块属性设置 direction',function(){
        //纵向 bullet的div class=rdk-bullet-vertical-module
        var bullet=element(by.css(".vertical>div"));
        expect(bullet.getAttribute("class")).toBe("rdk-bullet-vertical-module");
        //中心轴 height:98% width:10px
        var bar=element(by.css(".vertical .progress .progress-bar"));
        expect(bar.getCssValue("height")).toBe("500px");
        expect(bar.getCssValue("width")).toBe("10px");
        //top值计算与横向的状态left 类似
        //[10,20,50,87] =>[50px,100px,250px,435px]
        var sliders=element.all(by.css(".vertical .progress .slider"));
        expect(sliders.get(0).getCssValue("top")).toBe("50px");
        expect(sliders.get(1).getCssValue("top")).toBe("100px");
        expect(sliders.get(2).getCssValue("top")).toBe("250px");
        expect(sliders.get(3).getCssValue("top")).toBe("435px");
    });
    it('是否显示图例 show_legend',function(){
        //默认显示图例
        var legend=element(by.css(".bullet.legend .rdk-bullet-horizontal-module .legend"));
        expect(legend.getAttribute("class")).toBe("legend");
        expect(element(by.model("isShow")).getText()).toBe("true");
        //不显示图例
        var btn=element(by.css(".bullet.legend button"));
        btn.click();
        expect(legend.getAttribute("class")).toBe('legend ng-hide');
        expect(element(by.model("isShow")).getText()).toBe("false");
    });
    it('进度minValue maxValue设置的效果',function(){
        //设置maxValue=80 本demo设置的sliders=[10,20,30,50]
        //则按照推算 left值依次是[58.75,117.5,176.25,293.75]
        var sliders=element.all(by.css(".value .progress .slider"));
        expect(sliders.get(0).getCssValue("left")).toBe("56px");
        expect(sliders.get(1).getCssValue("left")).toBe("112px");
        expect(sliders.get(2).getCssValue("left")).toBe("168px");
        expect(sliders.get(3).getCssValue("left")).toBe("281px");
    });
});