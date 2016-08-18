define([], function() {
	//这个文件定义了当前应用的功能函数，可以把常用的函数定义在次数方便复用。
	
	function hello(toWho) {
		console.log('hello ' + toWho);
	}
	
	return {
		hello: hello
	}
});