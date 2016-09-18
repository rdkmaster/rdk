'use strict';
describe('Accordion Demo Self',function(){
    beforeEach(function(){
        browser.get("test/e2e/testee/accordion/web/self.html");
        browser.sleep(3000);
    });
    afterEach(function(){});
    it('自定义button属性集合',function(){
        //借助页面定义的button 按钮实现添加该集合数据
        element(by.css(".demo1 .addBtn")).click();
        var button=element.all(by.css(".demo1 .theme .theme-buttons a"));
        expect(button.count()).toBe(4);
        //四个按钮标签分别是 删除 刷新 冻结 编辑
        var labels=['删除','刷新','冻结','编辑'];
        for(var i=0;i<4;i++){
            button.get(i).click();//click 或者hover 都会让dom中a标签生成title属性，值为按钮名称
            expect(button.get(i).getAttribute("title")).toBe(labels[i]);
        }
        //以上通过说明button属性支持双向绑定
    });
    it('accordion展开测试',function(){
        //展开属性为open值变化，引起图标箭头方向变化
        //默认图标方向向下
        var ico=element(by.css(".demo1 .theme i"));
        expect(ico.getAttribute("class")).toBe("fa fa-angle-double-down");
        //click 
        element(by.css(".demo1 .theme")).click();
        expect(ico.getAttribute("class")).toBe("fa fa-angle-double-up");
    });
    it('accordion 折叠图标控制',function(){
        element(by.css(".demo1 .addBtn")).click();
        var ico=element(by.css(".demo1 .theme i"));
        expect(ico.getAttribute("class")).toBe("fa fa-angle-double-down");
        var button=element.all(by.css(".demo1 .theme .theme-buttons a"));
        //切换箭头图标
        button.get(1).click();
        expect(ico.getAttribute("class")).toBe("fa fa-arrow-circle-down");
    });
    it('accordion caption编辑控制',function(){
        element(by.css(".demo1 .addBtn")).click();
        //获取caption绑定的标签span
        var caption=element(by.css(".demo1 .theme span"));
        //初始值
        expect(caption.getText()).toBe('child');
        //变量editable值
        expect(caption.getAttribute('contenteditable')).toBe('false');
        var button=element.all(by.css(".demo1 .theme .theme-buttons a"));
        caption.click();//caption
        caption.sendKeys(10).
        then(function(){
            //编辑成功
            expect(caption.getText()).toBe('ch10ild');
        },function(err){
            //编辑失败，caption不变
            expect(caption.getText()).toBe('child');
        });
        button.get(3).click();
        //可编辑
        expect(caption.getAttribute('contenteditable')).toBe('true');
        caption.click();
        //点击点自动获取中间的位置
        caption.sendKeys(12);
        //若报错或者是ch1120ild，则编辑功能控制有问题
        expect(caption.getText()).toBe('ch12ild');
    });
    it('accordion  冻结展开属性',function(){
        var ico=element(by.css(".demo1 .theme i"));
        //初始值状态
        expect(ico.getAttribute("class")).toBe("fa fa-angle-double-down");
        element(by.css(".demo1 .addBtn")).click();
        var button=element.all(by.css(".demo1 .theme .theme-buttons a"));
        button.get(2).click();
        element(by.css(".demo1 .theme span")).click();
        //图标应该没变
        expect(ico.getAttribute("class")).toBe("fa fa-angle-double-down");
    });
    it('accordion伸展方向向下 文档流',function(){
        //theme content 顺序
        var obj_div=element.all(by.css('.bottom .rdk-accordion-module>div'));
        expect(obj_div.get(1).getAttribute("class")).toBe('content');
        //文档流
        obj_div.get(0).click();
        expect(obj_div.get(1).getCssValue("position")).toBe("static");
    });
    it('accordion 伸展方向向上 文档流',function(){
        var obj_div=element.all(by.css('.top .rdk-accordion-module>div'));
        expect(obj_div.get(0).getAttribute('class')).toBe('content');
        //文档流
        obj_div.get(1).click();
        expect(obj_div.get(0).getCssValue('position')).toBe('static');
    });
    it('accordion 左展开 文档流',function(){
        //展开项还是在首位,且都是inline-block
        var obj_div=element.all(by.css('.left .rdk-accordion-module>div'));
        expect(obj_div.get(0).getAttribute('class')).toBe('content');
        obj_div.get(1).click();
        //展开后同行显示,所以display为inline-block
        expect(obj_div.get(0).getCssValue('display')).toBe('inline-block');
        expect(obj_div.get(1).getCssValue('display')).toBe('inline-block');
    });
    it('accordion 右展开 文档流',function(){
        var obj_div=element.all(by.css('.right .rdk-accordion-module>div'));
        expect(obj_div.get(1).getAttribute('class')).toBe('content');
        obj_div.get(0).click();
        expect(obj_div.get(0).getCssValue('display')).toBe('inline-block');
        expect(obj_div.get(1).getCssValue('display')).toBe('inline-block');
    });
    it('accordion 向下展开脱离文档流',function(){
        //验证position和top/bottom即可
        var obj_div=element.all(by.css('.demo3.bottom .rdk-accordion-module>div'));
        obj_div.get(0).click();
        //向下展开脱离文档流，top值等于外层高度或者bottom值等于自身高度 也是默认缺省值！
        expect(obj_div.get(1).getCssValue('bottom')).toBe('-62px');
        expect(obj_div.get(1).getCssValue('top')).toBe('35px');
    });
    it('accordion 向上展开 脱离文档流',function(){
        var obj_div=element.all(by.css('.demo3.top .rdk-accordion-module>div'));
        obj_div.get(0).click();
        //向上展开bottom值就是父层高度，top值是自身高度
        expect(obj_div.get(1).getCssValue('top')).toBe('-63px');//不知为何父级为何比上述多1px高度？理论上应该是-62px
        expect(obj_div.get(1).getCssValue('bottom')).toBe('36px');
    });
    it('accordion 左展开 脱离文档流',function(){
        //accordion为float状态right 图标块文档流,展出块定位
        var accordion=element.all(by.css('.demo3.left .rdk-accordion-module'));
        var div=element.all(by.css('.demo3.left .rdk-accordion-module>div'))
        expect(accordion.get(0).getCssValue("float")).toBe('right');
        expect(div.get(0).getCssValue('display')).toBe("inline-block");
        //点击展开
        div.get(0).click();
        expect(div.get(1).getCssValue("position")).toBe('absolute');
        expect(div.get(1).getCssValue("right")).toBe('22px');
    });
    it('accordion 右展开 脱离文档流',function(){
        //accordion为正常文档流,relative属性，展开块是绝对定位
        var accordion=element.all(by.css('.demo3.right .rdk-accordion-module'));
        var div=element.all(by.css('.demo3.right .rdk-accordion-module>div'));
        expect(accordion.get(0).getCssValue("position")).toBe("relative");
        expect(div.get(0).getCssValue("display")).toBe("inline-block");
        //点击展开
        div.get(0).click();
        expect(div.get(1).getCssValue("position")).toBe("absolute");
        expect(div.get(1).getCssValue("left")).toBe('22px');
    });
    it('accordion 左覆盖且图标位置随着变化',function(){
        //accordion为float状态值right 图标块文档流,accordion整体展开后左移动,相对于原来状态位置原点不动
        var accordion=element(by.css('.demo4.left .rdk-accordion-module'));
        var div=element.all(by.css('.demo4.left .rdk-accordion-module>div'));
        expect(accordion.getCssValue("float")).toBe("right");
        expect(accordion.getCssValue("right")).toBe('0px');
        accordion.click();
        expect(accordion.getCssValue("left")).toBe("-39px");
        expect(div.get(1).getCssValue("left")).toBe("22px");
    });
    it('accordion 右覆盖且图标位置随着变化',function(){
        //accordion float为 left 图标块文档流，点击后accordion整体右移展开内容向左
        var accordion=element(by.css('.demo4.right .rdk-accordion-module'));
        var div=element.all(by.css('.demo4.right .rdk-accordion-module>div'));
        expect(accordion.getCssValue("float")).toBe("left");
        accordion.click();
        expect(accordion.getCssValue("right")).toBe("-39px");
        expect(div.get(1).getCssValue("right")).toBe("22px");
    });
});