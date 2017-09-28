
/*
Ajax common function
by k
*/

var ajax = {
    options: {
        success: function(d){
            // console.log('=== ajax success ===')
            // console.log(d)
        },
        error: function(x, m){
            // console.log('=== ajax error ===')
            // console.log(m)
        },
        beforeSend: function(x){
            // console.log('=== ajax before ===');
            // console.log(x)
        },
        complete: function(){
            // console.log('=== ajax complete ===');
        }
    },
    set: function(_){
        if(!_) return;
        for(var k in _){
            this.options[k] = _[k];
        }
    },
    do: function(_){
        if(!_) return;
        var 
        type = _.type || this.options.type || 'GET',
        data = _.data || this.options.data || {},
        dataType = _.dataType || this.options.dataType || 'JSON',

        async = _.async || this.options.async || "true",
        contentType = _.contentType || this.options.contentType || "application/x-www-form-urlencoded",

        url = _.url || this.options.url || '',
        url_pre = _.url_pre || this.options.url_pre || '',
        url_suf = _.url_suf || this.options.url_suf || '',

        success = _.success || this.options.success,
        success_pre = _.success_pre || this.options.success_pre || function(d){},
        success_suf = _.success_suf || this.options.success_suf || function(d){},
        error = _.error || this.options.error,
        beforeSend = _.beforeSend || this.options.beforeSend,
        complete = _.complete || this.options.complete

        // jQuery
        // $.ajax({
        //     type: type,
        //     url: url_pre + url + url_suf,
        //     data: data,
        //     beforeSend: function(xhr){
        //         beforeSend(xhr)
        //     },
        //     success: function (data) {
        //         success_pre(data)
        //         success(data)
        //         success_suf(data)
        //     },
        //     error: function(xhr,msg){
        //         error(xhr,msg)
        //     },
        //     complete: function(){
        //         complete()
        //     }
        // });

        beforeSend();
        var xhr = ajaxCreateXmlHttpRequest();
        xhr.responseType = dataType;
        xhr.open(type, url, async);
        xhr.setRequestHeader("Content-Type", contentType);
        xhr.send(ajaxConvertData(data));
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    success(xhr.response)
                }else{
                    error()
                }
                complete()
            }
        }
    }
}



function ajaxCreateXmlHttpRequest(){
    if(window.ActiveXObject){
        return new ActiveXObject("Microsoft.XMLHTTP");
    }else if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}

function ajaxConvertData(data){
    if(typeof data === 'object'){
        var convertResult = "" ;
        for(var k in data){
            convertResult += k + "=" + data[k] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length-1)
        return convertResult;
    }else{
        return data;
    }
}