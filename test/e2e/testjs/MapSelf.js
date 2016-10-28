'use strict';
describe('Map demo',function(){
    it('module click test should show module name 白城市',function(){
        browser.get("test/e2e/testee/map/web/self.html");
        browser.sleep(5000);
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:80,y:80}).click().perform();
        browser.sleep(1000);
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("白城市");
        });
    });
    
    it('module click test should show module name 长春市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:160,y:120}).click().perform();
        browser.sleep(1000);
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("长春市");
        });
    });
    it('module click test should show module name 吉林市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:209,y:121}).click().perform();
        browser.sleep(1000);
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("吉林市");
        });
    });
    it('module click test should show module name 通化市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:177,y:207}).click().perform();
        browser.sleep(1000);
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("通化市");
        });
    });
    it('module click test should show module name 松原市',function(){
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:120,y:100}).click().perform();
        browser.sleep(1000);
        var city=element(by.css(".cityname"));
        city.getText().then(function(text){
            expect(text).toBe("松原市");
        });
    });
    //切换江苏省，验证是否支持双向绑定情况
    it('module click test should show module name 盐城市',function(){
        var city=element(by.css(".cityname"));
        var buttons=element.all(by.css(".jilin button"));
        buttons.get(0).click();
        browser.sleep(1000);
        browser.actions().mouseMove(element(by.css(".jilin canvas")),{x:234,y:105}).click().perform();
        city.getText().then(function(text){
            expect(text).toBe("盐城市");
        });
    });
    //markPoint test
    //echart 气泡point 文件有误暂时注释掉本处测试
    // it('选择松原市冒泡 数字应该为80',function(){
    //     element.all(by.css(".markPoint button")).get(0).click();
    //     var point=element.all(by.css(".markPoint span")).get(1);
    //     expect(point.getText()).toBe("80");
    // });
    // it('选择长春市冒泡 数字应该为87',function(){
    //     element.all(by.css(".markPoint button")).get(1).click();
    //     var point=element.all(by.css(".markPoint span")).get(1);
    //     expect(point.getText()).toBe("87");
    // });
    // it('选择吉林市冒泡 数字应该为43',function(){
    //     element.all(by.css(".markPoint button")).get(2).click();
    //     var point=element.all(by.css(".markPoint span")).get(1);
    //     expect(point.getText()).toBe("43");
    // });
    // it('选择白城市冒泡 数字应该为87',function(){
    //     element.all(by.css(".markPoint button")).get(3).click();
    //     var point=element.all(by.css(".markPoint span")).get(1);
    //     expect(point.getText()).toBe("87");
    // });
    
    //地域钻取 province city
    it('module name should be 新疆维吾尔自治区...',function(){
        var area=element(by.css(".area-name"));
        browser.actions().mouseMove(element(by.css(".area-drill canvas")),{x:92,y:109}).click().perform();
        browser.sleep(1000);
        area.getText().then(function(text){
            expect(text).toBe("新疆维吾尔自治区");
        });
    });
    it('module name should be 和田地区',function(){
        var area=element(by.css(".area-name"));
        browser.actions().mouseMove(element(by.css(".area-drill canvas")),{x:92,y:109}).click().perform();
        browser.sleep(1000);
        browser.actions().mouseMove(element(by.css(".area-drill canvas")),{x:145,y:226}).click().perform();
        //此次点击后页面需要等待几秒dom加载完毕
        browser.sleep(5000);
        area.getText().then(function(text){
            expect(text).toBe("和田地区");
        });
    });
});