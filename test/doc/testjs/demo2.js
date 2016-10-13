'use strict';
describe('Angular环境下',function(){
    beforeEach(function(){
        browser.get("test/doc/testDemo/demo2/index.html")
        .then(function(){
            browser.waitForAngular();
        });
    });
    it('通过repeat定位选择器',function(){
        var members=element.all(by.repeater("member"));
        expect(members.count()).toBe(15);

        var ele=element(by.css(".rdk"));
        expect(ele.all(by.repeater("member")).count()).toBe(9);
        // expect(element(by.css(".rdk")).all(by.repeater("member")).count()).toBe(9);
        // expect(element.all(by.repeater("member in rdkMembers")).count()).toBe(9);
    });
    it('嵌套iframe情况下操作更加深层的元素',function(){
        browser.driver.switchTo().frame('iframe');//定位在某个iframe
        browser.findElement(by.css(".register")).click();//在其下去找需要的元素
        browser.findElement(by.css(".section1 input[ng-model='username']")).sendKeys("黄海宁");
        browser.findElement(by.css(".section1 input[ng-model='password']")).sendKeys("111111");
        browser.sleep(5000);
    });
});