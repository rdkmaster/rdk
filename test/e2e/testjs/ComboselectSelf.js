'use strict';
describe("Combo Test Self",function(){
    it('测试冻结属性',function(){
        browser.get('test/e2e/testee/comboSelector/web/self.html')
        .then(function(){
            browser.waitForAngular();
            browser.sleep(3000);
        });
        var thanBut=element(by.css(".thanBut"));
        var comboSelector1=element(by.css(".demo1 .combo-content .form-control"));
        var p = element(by.css(".demo1 p"));
        //解冻 
        thanBut.click();
        var li=element(by.css(".demo1 .selector li:first-child"));
        //选中第一个选项(江苏省)
        li.click();
        //通过change事件将选中的内容双向绑定在p标签
        p.getText().then(function(txt){
            //验证comboselect的 input框双绑的title属性值是否等于p标签的内容
            expect(comboSelector1.getAttribute("title")).toBe(txt);
        });    
        thanBut.click();//恢复冻结   
    });
    it('测试标题',function(){
        //添加标题属性并赋值(江苏)
        var addTitle=element(by.css(".addTitle"));
        addTitle.click();
        //获取在dom中的结构
        var content=element(by.css(".demo1 .combo-content span"));
        content.getText().then(function(txt){
            expect(txt).toBe("江苏");
        });
    });

    it('测试open属性',function(){
        browser.get('test/e2e/testee/comboSelector/web/self.html')
        .then(function(){
            browser.waitForAngular();
        });
        //自定义按钮关闭展开的状态
        var switchBut=element(by.css(".switchBut"));
        var open=element(by.css(".demo1 .combo-content-transclude>div"));
        switchBut.click();
        expect(open.getAttribute("class")).toBe("ng-hide");
    });

    it('测试change',function(){
        //change事件
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var li=element(by.css(".demo2 .selector li:first-child"));
        var p = element(by.css(".demo2 p"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(comboSelector1.getAttribute("title")).toBe(txt);
        });       
    });
    it('选择第二个省',function(){
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var li=element(by.css(".demo2 .selector li:nth-child(2)"));
        var p = element(by.css(".demo2 p"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(comboSelector1.getAttribute("title")).toBe(txt);
        });       
    });
    it('选择第三个省',function(){
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var li=element(by.css(".demo2 .selector li:nth-child(3)"));
        var p = element(by.css(".demo2 p"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(comboSelector1.getAttribute("title")).toBe(txt);
        });       
    });
    it('选择第四个省',function(){
        var comboSelector1=element(by.css(".demo2 .combo-content .form-control"));
        var li=element(by.css(".demo2 .selector li:nth-child(4)"));
        var p = element(by.css(".demo2 p"));
        comboSelector1.click();
        comboSelector1.click();
        li.click();
        p.getText().then(function(txt){
            expect(comboSelector1.getAttribute("title")).toBe(txt);
        });       
    });
    
});