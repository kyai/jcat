/**************************************************/
/*        jcat.js - A javascript's helper         */
/**************************************************/


var jcat = {

test : function(a){
	alert(a);
},

msg : function(a){
	console.log(a);
},

// 获取字符串中的数字
getNum : function(str){
	return str.replace(/[^0-9]/ig,"");
},

// 获取字符串中的中文数字
getNumZh : function(str){
	return str.replace(/[^一二三四五六七八九十]/ig,"");
},

// 是否存在于数组
inArray : function(item,arr,index){
	for(var i = 0; i < arr.length; i++){
		if(item === arr[i]){
			return index ? i : true;
		}
	}
	return index ? -1 : false;
},

// 取数组中n个数的唯一组合
getRank:function(arr,num){
	var r=[];
	return function f(t,a,n){
		if(0==n)return r.push(t.join(","));
		for(var i=0,l=a.length;i<=l-n;i++)
			f(t.concat(a[i]),a.slice(i+1),n-1)
	}([],arr,num),r
},

// 是否空
isNil : function(){},
isNull : function(){},
isEmpty : function(){},

// 是否空对象
isEmptyObject : function(obj){
	for(var k in obj){
		return false;
	}
	return true;
},

// 秒数转时分秒
stime : function(s,h){
	s = parseInt(s);

	if(isNaN(s) || s < 0){
		if(h) return '00:00:00';
		else return 0;
	}
	
	var r = {'d':0,'h':0,'m':0,'s':0}

	r.s = s;
	if(s > 60){
    	var second = parseInt(s) % 60;
    	var min = parseInt(s / 60);
    	r.m = min;r.s = second;
    	if( min > 60 ){
        	min = parseInt(s / 60) % 60;
        	var hour = parseInt( parseInt(s / 60) /60 );
        	r.h = hour;r.m = min;r.s = second;
        	if( hour > 24 ){
            	hour = parseInt( parseInt(s / 60) /60 ) % 24;
            	var day = parseInt( parseInt( parseInt(s / 60) /60 ) / 24 );
            	r.d = day;r.h = hour;r.m = min;r.s = second;
        	}
    	}
	}

	if(h){
		var html = '';
		if(r.d) html += r.d + ':';
		html += (r.h ? r.h < 10 ? '0' + r.h : r.h : '00') + ':';
		html += (r.m ? r.m < 10 ? '0' + r.m : r.m : '00') + ':';
		html += r.s < 10 ? '0' + r.s : r.s;
		return html;
	}else{
		return r;
	}
},

// 获取地址栏参数
url : function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return unescape(r[2]);
    return null;
}

/*jcat ending*/

}

// Array类 扩展
Array.prototype.add = function(item){
    this.push(item);
}

Array.prototype.isExist = function(item){
	return jcat.inArray(item,this);
}

// Date类 扩展

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// author: meizz
Date.prototype.Format = function(fmt){
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}