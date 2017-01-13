'use strict';
xdescribe("FoldSelector Test",function(){
    it("open test page",function(){
        browser.get('test/e2e/testee/foldselect/web/self.html');
        browser.sleep(2000);
    });
    it('data支持json数组对象',function(){
        //默认格式{id:,label:}根据id值进行将label获取
        //展开为5项子集
        element(by.css(".demo1 .theme.normal-theme")).click();
        var item=element.all(by.css(".demo1 .selector li"));
        expect(item.count()).toBe(5);
    });
    it('设置初始选中项2个',function(){
        //默认选中项为江苏 浙江
        element(by.css(".demo2 .theme.normal-theme")).click();

    });
    it('change事件 弹窗提示操作的结果',function(){
        element(by.css(".demo3 .theme.normal-theme")).click();
        var item=element.all(by.css(".demo3 .selector li"));
        //选中；弹窗信息获取；验证
    });
    it('当试图改变最少选中项时候，弹窗报错',function(){
        element(by.css(".demo4 .theme.normal-theme")).click();
        var item=element.all(by.css(".demo4 .selector li[class='selected-item']"))
    });
    it('child_change事件',function(){

    });
    it("事件类型操作",function(){
        
    })
});