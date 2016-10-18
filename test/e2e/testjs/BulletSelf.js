'use strcit';
describe('Bullet Self Test',function(){
    // beforeEach(function(){
    //     browser.get("test/e2e/testee/bullet/web/self.html");
    //     browser.waitForAngular();
    // });
    it('拖拽功能实现与限制',function(){
        browser.get("test/e2e/testee/bullet/web/self.html")
        .then(function(){
            browser.waitForAngular();
        });
        var sliders=element.all(by.css(".sliders .progress .slider"));
        // browser.actions().mouseDown(sliders.get(0)).mouseMove(sliders.get(0))
        // .mouseMove({x:30,y:70}).mouseUp({x:30,y:70}).perform();
        
        // browser.actions().dragAndDrop(element.all(by.css(".sliders .progress .slider")).get(0),{x:30,y:70}).perform();
        // sliders.get(2).getLocation().then(function(loc){
        //    browser.actions().dragAndDrop(sliders.get(0),{x:30,y:70}).perform();
        // });
    });
    it('检测sliders是否支持双向绑定',function(){
        var current=element(by.css(".sliders .currentData"));
        //初始值点击获取
        var sliders=element.all(by.css(".sliders .progress .slider"));
        expect(sliders.count()).toBe(4);
        sliders.get(1).click();
        expect(current.getText()).toBe('[20,40,60,80]');
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
        expect(bar.getCssValue("width")).toBe("98%");
        expect(bar.getCssValue("height")).toBe("10px");
        //每个滑块的对应的left值=480px*98%*数据百分比（默认最小0  最大100%）500px 去掉padding两边10px=>480px
        //案例用所给数据是 [10,20,50,87] 依次left为 47px 94px 235px 408.9px
        var sliders=element.all(by.css(".horizontal .progress .slider"));
        expect(sliders.get(0).getCssValue("left")).toBe("47px");
        expect(sliders.get(1).getCssValue("left")).toBe("94px");
        expect(sliders.get(2).getCssValue("left")).toBe("235px");
        expect(sliders.get(3).getCssValue("left")).toBe("408.9px");
    });
    it('纵向放置滑块属性设置 direction',function(){
        //纵向 bullet的div class=rdk-bullet-vertical-module
        var bullet=element(by.css(".vertical>div"));
        expect(bullet.getAttribute("class")).toBe("rdk-bullet-vertical-module");
        //中心轴 height:98% width:10px
        var bar=element(by.css(".vertical .progress .progress-bar"));
        expect(bar.getCssValue("height")).toBe("490px");
        expect(bar.getCssValue("width")).toBe("10px");
        //top值计算与横向的状态left 类似
        //[10,20,50,87] =>[49px,98px,245px,426.3px]
        var sliders=element.all(by.css(".vertical .progress .slider"));
        expect(sliders.get(0).getCssValue("top")).toBe("49px");
        expect(sliders.get(1).getCssValue("top")).toBe("98px");
        expect(sliders.get(2).getCssValue("top")).toBe("245px");
        expect(sliders.get(3).getCssValue("top")).toBe("426.3px");
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
        expect(sliders.get(0).getCssValue("left")).toBe("58.75px");
        expect(sliders.get(1).getCssValue("left")).toBe("117.5px");
        expect(sliders.get(2).getCssValue("left")).toBe("176.25px");
        expect(sliders.get(3).getCssValue("left")).toBe("293.75px");
    });

});