'use strict';

describe('Selector Demos', function() {

    beforeEach(function() {
        browser.get('doc/client/demo/controls/selector/basic/index.html');
    });

    it('basic', function() {

        // var list = element.all(by.css('.selector>li'));
        // expect(list.count()).toBe(10);

        // expect(list.get(0).getText()).toBe("江苏省");

        // var items = ["江苏省","浙江省","广东省","广西省","河北省"
        //             ,"河南省","湖北省","湖南省","新疆省","四川省"];

        // list.each(function(item,index){
        //     item.getText().then(function(text){
        //         expect(text).toBe(items[index]);
        //     });
        // });

        // expect(list.get(0).getCssValue("float")).toBe("left");

        // var selectedList = element.all(by.css('.selector>li.selected-item'));
        // expect(selectedList.count()).toBe(3);


        // element(by.css('.selector div li')).click();

       
        // element(by.css('.selector div input')).sendKeys("山东省",protractor.Key.ENTER);
        // var newList = element.all(by.css('.selector>li'));
        // expect(newList.count()).toBe(11);


        // element(by.css('.search input')).sendKeys("广");
        // var filteredList = element.all(by.css('.selector>li'));
        // expect(filteredList.count()).toBe(2);
        
    });


});
