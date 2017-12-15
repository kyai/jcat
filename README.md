# jcat
jcat.js - A javascript helper.


## jcat ajax
*ajax通用方法，之后会集成到jcat.js*

### 使用说明
- 引用文件

		<script type="text/javascript" src="jcat.ajax.js"></script>

- 方法列表

	`ajax.set({option})` 全局设置

	`ajax.do({option})` 执行ajax

	`option` 为可选属性

- 属性列表

	`type` GET/POST

	`data` 请求参数

	`dataType` 返回类型

	`async`	是否异步

	`contentType` 请求头文件

	`url` 请求路径

	`url_pre` 拼接在`url`属性前

	`url_suf` 拼接在`url`属性后

	`success` 请求成功回调函数

	`success_pre` 在`success`方法前执行

	`success_suf` 在`success`方法后执行

	`error` 请求失败回调函数

	`before` 请求开始时回调函数

	`complete` 请求完成时回调函数

### 代码示例
	<script type="text/javascript" src="jcat.ajax.js"></script>
	<script type="text/javascript">
	//全局设置
	ajax.set({
		success_pre: function(){
			console.log('pre')
		},
		success_suf: function(){
			console.log('suf')
		}
	})
	//执行ajax
	ajax.do({
		url: 'temp.txt',
		dataType: 'text',
		success: function(data){
			console.log(data)
		}
	})
	</script>