'use strict';
describe('Tab Self test',function(){
    
    it('点击切换选项卡',function(){
        browser.get('test/e2e/testee/tab/web/self.html')
        .then(function(){
            browser.waitForAngular();
            browser.sleep(3000);
        });
        var item=element.all(by.css(".demo1 .rdk-tab-module ul li"));
        //点击选项卡3
        item.get(2).click();
        //对应选项卡3标题 被选中为true,其余为false,内容为对应title
        expect(item.get(2).getAttribute("aria-selected")).toBe("true");
        expect(element(by.css(".demo1 .rdk-tab-module .content")).getText()).toBe("DIV3");
        expect(item.get(1).getAttribute("aria-selected")).toBe("false");
        expect(item.get(0).getAttribute("aria-selected")).toBe("false");
    });
    it('外部控制TAB_SELECT事件传播',function(){
        //TAB_SELECT事件控制选项卡的序号index从1开始，CHANGE事件是从0开始
        //选择第三个选项卡
        element.all(by.css(".demo1 button")).get(2).click();
        var item=element.all(by.css(".demo1 .rdk-tab-module ul li"));

        expect(item.get(2).getAttribute("aria-selected")).toBe("true");
        expect(element(by.css(".demo1 .rdk-tab-module .content")).getText()).toBe("DIV3");
        expect(item.get(1).getAttribute("aria-selected")).toBe("false");
        expect(item.get(0).getAttribute("aria-selected")).toBe("false");
        //选择第二个选项卡
        element.all(by.css(".demo1 button")).get(1).click();
        expect(item.get(1).getAttribute("aria-selected")).toBe("true");
        expect(element(by.css(".demo1 .rdk-tab-module .content")).getText()).toBe("DIV2");
        expect(item.get(0).getAttribute("aria-selected")).toBe("false");
        expect(item.get(2).getAttribute("aria-selected")).toBe("false");
    });
    it('鼠标划过选中选项卡',function(){
        var item=element.all(by.css(".demo2 .rdk-tab-module ul li"));
        //移动到第三个选项卡
        browser.actions().mouseMove(item.get(2)).perform();
        expect(item.get(2).getAttribute("aria-selected")).toBe("true");
        expect(element(by.css(".demo2 .rdk-tab-module .content")).getText()).toBe("DIV3");
        expect(item.get(1).getAttribute("aria-selected")).toBe("false");
        expect(item.get(0).getAttribute("aria-selected")).toBe("false");

        //移动到第二个选项卡
        expect(item.get(1).getAttribute("aria-selected")).toBe("true");
        expect(element(by.css(".demo2 .rdk-tab-module .content")).getText()).toBe("DIV2");
        expect(item.get(0).getAttribute("aria-selected")).toBe("false");
        expect(item.get(2).getAttribute("aria-selected")).toBe("false");
    });
    it('选项卡高度属性设置content',function(){
        //每个选项卡根据自身高度适应
        var item=element.all(by.css(".demo3 .rdk-tab-module ul li"));
        //猜想值应该均为auto,是否是bug待定
        expect(element(by.css(".demo3 .rdk-tab-module .content div")).getCssValue("height")).toBe("auto");
        item.get(1).click();
        expect(element(by.css(".demo3 .rdk-tab-module .content div")).getCssValue("height")).toBe("auto");
        item.get(2).click();
        expect(element(by.css(".demo3 .rdk-tab-module .content div")).getCssValue("height")).toBe("auto");
    });
    it('选项卡高度属性设置auto',function(){
        //每个选项卡都是按照最高的选项卡设置高度
        var item=element.all(by.css(".demo4 .rdk-tab-module ul li"));
        item.get(0).click();
        expect(element(by.css(".demo4 .rdk-tab-module .content")).getCssValue("height")).toBe("100px");
        item.get(1).click();
        expect(element(by.css(".demo4 .rdk-tab-module .content")).getCssValue("height")).toBe("100px");
        item.get(2).click();
        expect(element(by.css(".demo4 .rdk-tab-module .content")).getCssValue("height")).toBe("100px");
    });
    it('选项卡高度属性设置fill',function(){
        //整个rdk_tab高度根据标签定义分配，选项卡处为59px
        var item=element.all(by.css(".demo5 .rdk-tab-module ul li"));
        // item.get(0).click();
        expect(element(by.css(".demo5 .rdk-tab-module .content")).getCssValue("height")).toBe("59px");
        item.get(1).click();
        expect(element(by.css(".demo5 .rdk-tab-module .content")).getCssValue("height")).toBe("59px");
        item.get(2).click();
        expect(element(by.css(".demo5 .rdk-tab-module .content")).getCssValue("height")).toBe("59px");
    });
    it('设置可见选项卡 可伸缩',function(){
        var item=element.all(by.css(".demo6 .rdk-tab-module ul li a"));
        item.get(2).click();
        //展开内容DIV3
        expect(element(by.css(".demo6 .rdk-tab-module .content div[title='DIV3']")).getText()).toBe("DIV3");
        item.get(2).click();
        browser.sleep(5000);
        // //原本展开的div display属性为none(不存在dom中)
        expect(element(by.css(".demo6 .rdk-tab-module .content div[title='DIV3']")).getCssValue("display")).toBe("none");
    });
});