/**
 * Created by 00100630 on 2016/12/17.
 */
describe('editor test',function(){
  it('editor 双向绑定的实现',function(){
    browser.get("test/e2e/testee/editor/web/self.html")
    .then(function(){
      browser.sleep(1500);
    });

    element(by.css(".demo1 input.form-control")).sendKeys(123)
      .then(function(){
        //输入操作后的回调函数,获取绑定的span innerHTML
        var binding_value=element(by.css(".demo1 span.ng-binding"));
        expect(binding_value.getText()).toBe("123");
      });
  });
  it('placeholder提示信息',function(){
    // browser.get("test/e2e/testee/input/web/self.html");
    var rdk_input=element(by.css(".demo2 input.form-control"));
    expect(rdk_input.getAttribute("placeholder")).toBe("please enter an number!");
    rdk_input.sendKeys(110);
    expect(rdk_input.getAttribute("value")).toBe("110");
  });
  it('readOnly 切换',function(){
    // browser.get("test/e2e/testee/input/web/self.html");
    var rdk_input=element(by.css(".demo3 input.form-control"));
    expect(rdk_input.getAttribute("readonly")).toBe("true");//初始值
    element(by.css(".demo3 button")).click();//切换
    expect(rdk_input.getAttribute("readonly")).toBe(null);
    rdk_input.clear().sendKeys(250);//清除并且输入250
    expect(rdk_input.getAttribute("value")).toBe("250");
    element(by.css(".demo3 button")).click();
    rdk_input.sendKeys(500).then(function(err){
      //只有出错才会有err参数
    });
    expect(rdk_input.getAttribute("value")).toBe("250");//值不变
  });
});