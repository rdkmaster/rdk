'use strict';
describe('button test',function(){
    it('点击demo1第一个',function(){
        browser.get("test/e2e/testee/buttongroup/web/self.html");
        // browser.sleep(500);
        var rdk_button=element.all(by.css(".demo1 button"));
        rdk_button.get(0).click();
        //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
            alert.accept();
        });
    });

    it('点击demo1第二个',function(){
        var rdk_button=element(by.css(".demo1 button[ng-click='p2()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
    it('点击demo1第三个',function(){
        var rdk_button=element(by.css(".demo1 button[ng-click='p3()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
     it('点击demo1第四个',function(){
        var rdk_button=element(by.css(".demo1 button[ng-click='p4()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    });    
    it('点击demo1第五个',function(){
        var rdk_button=element(by.css(".demo1 button[ng-click='p5()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
    it('点击demo1第六个',function(){
        var rdk_button=element(by.css(".demo1 button[ng-click='p6()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
    it('点击demo1第七个',function(){
        var rdk_button=element(by.css(".demo1 button[ng-click='p7()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
     it('点击demo2第一个',function(){
        var rdk_button=element(by.css(".demo2 button[ng-click='f1()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
        it('点击demo2第二个',function(){
        var rdk_button=element(by.css(".demo2 button[ng-click='f2()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
        it('点击demo2第三个',function(){
        var rdk_button=element(by.css(".demo2 button[ng-click='f3()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
        it('点击demo2第四个',function(){
        var rdk_button=element(by.css(".demo2 button[ng-click='f4()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
        it('点击demo2第五个',function(){
        var rdk_button=element(by.css(".demo2 button[ng-click='f5()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
        it('点击demo2第六个',function(){
        var rdk_button=element(by.css(".demo2 button[ng-click='f6()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    }); 
        it('点击demo2第七个',function(){
        var rdk_button=element(by.css(".demo2 button[ng-click='f7()']"));
        rdk_button.click();
       //对确认框进行处理回应
        browser.sleep(500);
        browser.switchTo().alert().then(function(alert){
           alert.accept();
        });
    });  
});