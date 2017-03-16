
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

// 是否存在于数组
inArray : function(item,arr,index){
	for(var i = 0; i < arr.length; i++){
		if(item === arr[i]){
			return index ? i : true;
		}
	}
	return index ? -1 : false;
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

}

// Array类 扩展
Array.prototype.add = function(item){
    this.push(item);
}

Array.prototype.isExist = function(item){
	return jcat.inArray(item,this);
}