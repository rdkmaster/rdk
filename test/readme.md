## 客户端测试启动
1. 使用前确保已经安装npm
1. windows下双击*e2ebuild.bat*运行
2. linux下 双击*e2ebuild.sh*运行
## 测试结果查看路径 test/report/e2e(默认，一般不作更改)

##测试用例编写演示
###被测对象目录:e2e/testee/Input
//HTML代码  
<rdk_input ng-model="mm" placeholder="aaa" style="width:150px"></rdk_input>  
<span>{{mm}}</span>  
//js代码  
scope.mm=10;  
###测试用例目录:e2e/testjs(自己定义，配合protractor-config.js中的相关配置路径)
###文件名：InputSelf.js  
'use strict';  
describe('描述你的测试对象名字等',function(){  
 beforeEach(function(){  
   browser.get("e2e/testee/Input/web/self.html");  
  //页面的地址 tips:localhost:8080+url,这里的url就是应该被填入的地址  
  browser.sleep(2000);  
 //目的是让页面获取到后延缓一段时间 充分让html渲染完毕  
 });  
 afterEach(function(){  
//防止每个小单元之间影响，加入这个  
});  
it('描述你要测试的属性或者结果 value=10',function(){  
//为了方便获取这个值，我们有时候需要借助自己创建一个存储值的标签，然后在dom中获取(html中 span的存在必要)  
element(by.css("span")).getText().then(function(text){  
expect(text).toBe("10");});  
});  
it('动态操作 输入123456',function(){  
//在dom中找到真正输入框，class="form-control"  
element(by.css(".form-control")).sendKeys(123456);  
//element(by.css(".form-control")).sendKeys(123456,protractor.Key.ENTER);  
element(by.css("span")).getText().then(function(){  
expect(text).toBe(123456);
});  
});  
});
###Tips:如果没有可以选择到的dom结构，比如canvas，则点击的点需要具体定位，语法如下：  
browser.actions().mouseMove(element(by.css("选择器")),{x:181.4,y:110}).click().perform();  
其中x,y 所取值是相对于你确定的控件或者图片，左上角为原点。
更多操作方法访问protractor官网，博客频道 搜索protractor api。



