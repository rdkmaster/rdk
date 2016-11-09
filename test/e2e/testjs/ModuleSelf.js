'use strict';
describe("Module Self Test",function(){
    it('open test page',function(){
        browser.get('test/e2e/testee/module/web/self.html');
        browser.sleep(2000);
    });
    it('event test',function(){
        //点击后依次出现的是 load ready 
        var btn=element.all(by.css(".searchModule button"));
        //load module
        btn.get(0).click();
        browser.sleep(300);
        expect(element(by.css(".searchModule .loading")).getText()).toBe('loading');
        expect(element(by.css(".searchModule .ready")).getText()).toBe('ready');
        btn.get(1).click();
        browser.sleep(300);
        expect(element(by.css(".searchModule .destroy")).getText()).toBe('destroy');
    });
    it('Login场景',function(){
        browser.get('test/e2e/testee/module/web/self.html');
        var btn=element.all(by.css(".login button"));
        //controller为Login时候
        btn.get(0).click();
        browser.sleep(200);
        var content=element(by.css(".login div[id='secondModule'] span"));
        expect(content.getText()).toMatch("登陆");
        btn.get(1).click();
    });
    it('Sign out场景',function(){
        var btn=element.all(by.css(".sign-out button"));
        //controller为sign out
        btn.get(0).click();
        browser.sleep(200);
        var content=element(by.css(".sign-out div[id='thirdModule'] span"));
        expect(content.getText()).toMatch("登出");
        btn.get(1).click();
    });
    it('child属性的获取',function(){
        //当子模板加载结束才能去调用
        var btn=element.all(by.css(".sign-out button"));
        btn.get(0).click();
        browser.sleep(2000);
        var childText=element(by.css(".sign-out .child"));
        expect(childText.getText()).toBe('hello world');
    btn.get(1).click();
    });
    it('模板内嵌套模板',function(){
        //层层load
        var btn=element.all(by.css(".moduleInModule>button"));
        btn.get(0).click();
        browser.sleep(200);
        element(by.css(".moduleInModule button[ng-click='loadChild()']")).click();
        var content=element(by.css("div[id='childModule'] span"));
        expect(content.getText()).toBe('这是子模块的子模块');
        btn.get(1).click();
    });
});