'use strict';
describe('time Combined Demos',function(){
    it('双时间控件和tab控件结合点击选择时间点(天)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined.html');
        var time=element(by.css(".demo1 p"));
        var timeOne = element(by.css(".demo1 input:first-child"));
        var timeTwo = element(by.css(".demo1 input:nth-child(3)"));

        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();
        
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();
        
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-01");
        });
    });

    it('双时间控件和tab控件结合点击选择时间点(周)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined.html');
        var time=element(by.css(".demo1 p"));
        var timeOne = element(by.css(".demo1 input:first-child"));
        var timeTwo = element(by.css(".demo1 input:nth-child(3)"));
        var select = element(by.css(".demo1 .btn-group"));
        var option = element(by.css(".demo1 .btn-group>div>ul>li:nth-child(2)"));
        select.click();
        option.click();

        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();
        
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();
        
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010第01周 2010第01周");
        });
    });

    it('双时间控件和tab控件结合点击选择时间点(月)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined.html');
        var time=element(by.css(".demo1 p"));
        var timeOne = element(by.css(".demo1 input:first-child"));
        var timeTwo = element(by.css(".demo1 input:nth-child(3)"));
        var select = element(by.css(".demo1 .btn-group"));
        var option = element(by.css(".demo1 .btn-group>div>ul>li:last-child"));
        select.click();
        option.click();

        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        

        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
           

        timeOne.click();
        
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        

        timeTwo.click();
        
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        

        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01 2010-01");
        });
    });

    it('双时间控件和accordion控件结合点击选择(15分钟)时间点是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined1.html');
        browser.sleep(3000);
        var accordion = element(by.css(".demo2>div>.theme:first-child"));
        accordion.click();
        var time=element(by.css(".demo2 p"));
        var timeOne = element(by.css(".demo2 input:first-child"));
        var timeTwo = element(by.css(".demo2 input:nth-child(3)"));

        var timeOneMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes thead tr .switch"));
        var timeOneHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var ontMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneMinutes.click();
        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();
        ontMinutes.click();

        var timeTwoMinutes = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-minutes thead tr .switch"));
        var timeTwoHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var twoMinutes = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();

        timeTwoMinutes.click();
        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();
        twoMinutes.click();
        
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });
    
    it('双时间控件和accordion控件结合点击选择(小时)时间点是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined1.html');
        browser.sleep(2000);
        var time=element(by.css(".demo2 p"));
        var timeOne = element(by.css(".demo2 input:first-child"));
        var timeTwo = element(by.css(".demo2 input:nth-child(3)"));
        var accordion = element(by.css(".demo2 .theme"));
        accordion.click();
        var select = element(by.css(".demo2 .btn-group"));
        var option = element(by.css(".demo2 .btn-group>div>ul>li:nth-child(2)"));
        select.click();
        option.click();

        var timeOneHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();

        var timeTwoHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();

        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();
        
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });

    it('双时间控件和accordion控件结合点击选择(天)时间点是否正确',function(){
        browser.get('test/e2e/testee/time/web/combined1.html');
        browser.sleep(2000);
        var time=element(by.css(".demo2 p"));
        var timeOne = element(by.css(".demo2 input:first-child"));
        var timeTwo = element(by.css(".demo2 input:nth-child(3)"));
        var accordion = element(by.css(".demo2 .theme"));
        accordion.click();
        var select = element(by.css(".demo2 .btn-group"));
        var option = element(by.css(".demo2 .btn-group>div>ul>li:nth-child(3)"));
        select.click();
        option.click();

        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();        
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-01");
        });
    });
    
    it('双时间控件和accordion控件结合点击选择(周)时间点是否正确',function(){
        browser.get('test/e2e/testee/time/web/combined1.html');
        browser.sleep(2000);
        var time=element(by.css(".demo2 p"));
        var timeOne = element(by.css(".demo2 input:first-child"));
        var timeTwo = element(by.css(".demo2 input:nth-child(3)"));
        var accordion = element(by.css(".demo2 .theme"));
        accordion.click();
        var select = element(by.css(".demo2 .btn-group"));
        var option = element(by.css(".demo2 .btn-group>div>ul>li:nth-child(4)"));
        select.click();
        option.click();


        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();        
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010第01周 2010第01周");
        });
    });

    it('双时间控件和accordion控件结合点击选择(月)时间点是否正确',function(){
        browser.get('test/e2e/testee/time/web/combined1.html');
        browser.sleep(2000);
        var time=element(by.css(".demo2 p"));
        var timeOne = element(by.css(".demo2 input:first-child"));
        var timeTwo = element(by.css(".demo2 input:nth-child(3)"));
        var accordion = element(by.css(".demo2 .theme"));
        accordion.click();
        var select = element(by.css(".demo2 .btn-group"));
        var option = element(by.css(".demo2 .btn-group>div>ul>li:nth-child(5)"));
        select.click();
        option.click();


        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        
        timeOne.click();
        
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();

        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        
        timeTwo.click();
       
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01 2010-01");
        });
    });
    
    it('双时间控件和ng-repeat结合点击选择(限制时间间距)时间点是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined2.html');
        browser.sleep(2000);
        var time=element(by.css(".demo3 .p0"));
        var timeOne = element(by.css(".demo3 .demo-child0 input:first-child"));
        var timeTwo = element(by.css(".demo3 .demo-child0 input:nth-child(3)"));
    
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        
        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        var twoDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        timeTwo.click();        
        twoDays.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-01");
        });
    });

    it('双时间控件和ng-repeat结合点击选择时间点(15分钟)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined2.html');
        browser.sleep(2000);
        var time=element(by.css(".demo3 .p2"));
        var timeOne = element(by.css(".demo3 .demo-child2 input:first-child"));
        var timeTwo = element(by.css(".demo3 .demo-child2 input:nth-child(3)"));
        
        var timeOneMinutes = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-minutes thead tr .switch"));
        var timeOneHours = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var ontMinutes = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneMinutes.click();
        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();
        ontMinutes.click();

        var timeTwoMinutes = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-minutes thead tr .switch"));
        var timeTwoHours = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var twoMinutes = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();

        timeTwoMinutes.click();
        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();
        twoMinutes.click();


        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });
    
    it('双时间控件和ng-repeat结合点击选择时间点(小时)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined2.html');
        browser.sleep(2000);
        var time=element(by.css(".demo3 .p2"));
        var timeOne = element(by.css(".demo3 .demo-child2 input:first-child"));
        var timeTwo = element(by.css(".demo3 .demo-child2 input:nth-child(3)"));
        var select = element(by.css(".demo3 .demo-child2 .btn-group"));
        var option = element(by.css(".demo3 .demo-child2 .btn-group>div>ul>li:nth-child(2)"));
        select.click();
        option.click();
        
        var timeOneHours = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();

        var timeTwoHours = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();

        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });
    
    it('双时间控件和ng-repeat结合点击选择时间点(天)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined2.html');
        browser.sleep(2000);
        var time=element(by.css(".demo3 .p2"));
        var timeOne = element(by.css(".demo3 .demo-child2 input:first-child"));
        var timeTwo = element(by.css(".demo3 .demo-child2 input:nth-child(3)"));
        var select = element(by.css(".demo3 .demo-child2 .btn-group"));
        var option = element(by.css(".demo3 .demo-child2 .btn-group>div>ul>li:nth-child(3)"));
        select.click();
        option.click();
        
        var timeOneDays = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        var timeTwoDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-01");
        });
    });

    it('双时间控件和ng-repeat结合点击选择时间点(周)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined2.html');
        browser.sleep(2000);
        var time=element(by.css(".demo3 .p2"));
        var timeOne = element(by.css(".demo3 .demo-child2 input:first-child"));
        var timeTwo = element(by.css(".demo3 .demo-child2 input:nth-child(3)"));
        var select = element(by.css(".demo3 .demo-child2 .btn-group"));
        var option = element(by.css(".demo3 .demo-child2 .btn-group>div>ul>li:nth-child(4)"));
        select.click();
        option.click();
        
        var timeOneDays = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        var timeTwoDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010第01周 2010第01周");
        });
    });

    it('双时间控件和ng-repeat结合点击选择时间点(月)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined2.html');
        browser.sleep(2000);
        var time=element(by.css(".demo3 .p2"));
        var timeOne = element(by.css(".demo3 .demo-child2 input:first-child"));
        var timeTwo = element(by.css(".demo3 .demo-child2 input:nth-child(3)"));
        var select = element(by.css(".demo3 .demo-child2 .btn-group"));
        var option = element(by.css(".demo3 .demo-child2 .btn-group>div>ul>li:nth-child(5)"));
        select.click();
        option.click();
    
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(8)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        
        timeOne.click();

        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();

        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        
        timeTwo.click();
       
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01 2010-01");
        });
    });

    it('双时间控件和panel结合点击选择时间点(15分钟)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined3.html');
        browser.sleep(2000);
        var time=element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));
        
        var timeOneMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes thead tr .switch"));
        var timeOneHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var ontMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneMinutes.click();
        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();
        ontMinutes.click();

        var timeTwoMinutes = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-minutes thead tr .switch"));
        var timeTwoHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var twoMinutes = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();

        timeTwoMinutes.click();
        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();
        twoMinutes.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });
    
    it('双时间控件和panel结合点击选择时间点(小时)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined3.html');
        browser.sleep(2000);
        var time=element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));
        var select = element(by.css(".demo4 .btn-group"));
        var option = element(by.css(".demo4 .btn-group>div>ul>li:nth-child(2)"));
        select.click();
        option.click();
        
        var timeOneHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();

        var timeTwoHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();

        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });
    
    it('双时间控件和panel结合点击选择时间点(天)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined3.html');
        browser.sleep(2000);
        var time=element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));
        var select = element(by.css(".demo4 .btn-group"));
        var option = element(by.css(".demo4 .btn-group>div>ul>li:nth-child(3)"));
        select.click();
        option.click();
        
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-01");
        });
    });

    it('双时间控件和panel结合点击选择时间点(周)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined3.html');
        browser.sleep(2000);
        var time=element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));
        var select = element(by.css(".demo4 .btn-group"));
        var option = element(by.css(".demo4 .btn-group>div>ul>li:nth-child(4)"));
        select.click();
        option.click();
        
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010第01周 2010第01周");
        });
    });

    it('双时间控件和panel结合点击选择时间点(月)是否正确',function(){
        //直接输入点击显示结果
        browser.get('test/e2e/testee/time/web/combined3.html');
        browser.sleep(2000);
        var time=element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));
        var select = element(by.css(".demo4 .btn-group"));
        var option = element(by.css(".demo4 .btn-group>div>ul>li:nth-child(5)"));
        select.click();
        option.click();
    
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        
        timeOne.click();

        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();


        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        
        timeTwo.click();
       
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();


        time.getText().then(function(txt){
            expect(txt).toBe("2010-01 2010-01");
        });
    });

    it('双时间控件和combo_select结合点击选择时间点(15分钟)是否正确',function(){
        browser.get('test/e2e/testee/time/web/combined4.html');
        browser.sleep(2000);
        //直接输入点击显示结果
        var time=element(by.css(".demo5 p"));
        var timeOne = element(by.css(".demo5 .time-content input:first-child"));
        var timeTwo = element(by.css(".demo5 .time-content input:nth-child(3)"));
        var combo = element(by.css(".demo5 .combo-content input"));
        
        combo.click();
        var timeOneMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes thead tr .switch"));
        var timeOneHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var ontMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneMinutes.click();
        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();
        ontMinutes.click();

        combo.click();
        var timeTwoMinutes = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-minutes thead tr .switch"));
        var timeTwoHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var twoMinutes = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();

        timeTwoMinutes.click();
        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();
        twoMinutes.click();

        combo.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });
    
    it('双时间控件和combo_select结合点击选择时间点(小时)是否正确',function(){
        browser.get('test/e2e/testee/time/web/combined4.html');
        browser.sleep(2000);
        //直接输入点击显示结果
        var time=element(by.css(".demo5 p"));
        var timeOne = element(by.css(".demo5 .time-content input:first-child"));
        var timeTwo = element(by.css(".demo5 .time-content input:nth-child(3)"));
        var combo = element(by.css(".demo5 .combo-content input"));
        combo.click();
        var select = element(by.css(".demo5 button"));
        var option = element(by.css(".demo5 ul.dropdown-menu li:nth-child(2)"));
        select.click();
        option.click();
        
        var timeOneHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();

        combo.click();
        var timeTwoHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();

        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();
        combo.click();

        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });
    
    it('双时间控件和combo_select结合点击选择时间点(天)是否正确',function(){
        browser.get('test/e2e/testee/time/web/combined4.html');
        browser.sleep(2000);
        //直接输入点击显示结果
        var time=element(by.css(".demo5 p"));
        var timeOne = element(by.css(".demo5 .time-content input:first-child"));
        var timeTwo = element(by.css(".demo5 .time-content input:nth-child(3)"));
        var combo = element(by.css(".demo5 .combo-content input"));
        combo.click();
        var select = element(by.css(".demo5 button"));
        var option = element(by.css(".demo5 ul.dropdown-menu li:nth-child(3)"));
        select.click();
        option.click();
        
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        combo.click();
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        combo.click();
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-01");
        });
    });

    it('双时间控件和combo_select结合点击选择时间点(周)是否正确',function(){
        browser.get('test/e2e/testee/time/web/combined4.html');
        browser.sleep(2000);
        //直接输入点击显示结果
        var time=element(by.css(".demo5 p"));
        var timeOne = element(by.css(".demo5 .time-content input:first-child"));
        var timeTwo = element(by.css(".demo5 .time-content input:nth-child(3)"));
        var combo = element(by.css(".demo5 .combo-content input"));
        combo.click();
        var select = element(by.css(".demo5 button"));
        var option = element(by.css(".demo5 ul.dropdown-menu li:nth-child(4)"));
        select.click();
        option.click();
        
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();

        combo.click();
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();

        combo.click();
        time.getText().then(function(txt){
            expect(txt).toBe("2010第01周 2010第01周");
        });
    });

    it('双时间控件和combo_select结合点击选择时间点(月)是否正确',function(){
        browser.get('test/e2e/testee/time/web/combined4.html');
        browser.sleep(2000);
        //直接输入点击显示结果
        var time=element(by.css(".demo5 p"));
        var timeOne = element(by.css(".demo5 .time-content input:first-child"));
        var timeTwo = element(by.css(".demo5 .time-content input:nth-child(3)"));
        var combo = element(by.css(".demo5 .combo-content input"));
        combo.click();
        var select = element(by.css(".demo5 button"));
        var option = element(by.css(".demo5 ul.dropdown-menu li:nth-child(5)"));
        select.click();
        option.click();
    
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        
        timeOne.click();

        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();

        combo.click();
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        
        timeTwo.click();
       
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();

        combo.click();
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01 2010-01");
        });
    });
});