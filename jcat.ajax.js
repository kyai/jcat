
/*
Ajax common function
*/

var ajax = {
    options: {
        success: function(d){
            console.log('=== ajax success ===')
            console.log(d)
        },
        error: function(x, m){
            console.log('=== ajax error ===')
            console.log(m)
        },
        before: function(x){
            console.log('=== ajax before ===');
            console.log(x)
        },
        complete: function(){
            console.log('=== ajax complete ===');
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
        type        = _.type        || this.options.type        || 'GET',
        data        = _.data        || this.options.data        || {},
        dataType    = _.dataType    || this.options.dataType    || 'JSON',

        async       = _.async       || this.options.async       || 'true',
        contentType = _.contentType || this.options.contentType || 'application/x-www-form-urlencoded',

        url         = _.url         || this.options.url         || '',
        url_pre     = _.url_pre     || this.options.url_pre     || '',
        url_suf     = _.url_suf     || this.options.url_suf     || '',

        success     = _.success     || this.options.success     || function(d){},
        success_pre = _.success_pre || this.options.success_pre || function(d){},
        success_suf = _.success_suf || this.options.success_suf || function(d){},
        error       = _.error       || this.options.error,
        before      = _.before      || this.options.before,
        complete    = _.complete    || this.options.complete


        var xhr = this.ajaxCreateXmlHttpRequest();
        before(xhr);
        xhr.responseType = dataType;
        xhr.open(type, url_pre + url + url_suf, async);
        xhr.setRequestHeader("Content-Type", contentType);
        xhr.send(this.ajaxConvertData(data));
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    success_pre(xhr.response)
                    success(xhr.response)
                    success_suf(xhr.response)
                }else{
                    error(xhr,xhr.statusText)
                }
                complete()
            }
        }
    },

    ajaxCreateXmlHttpRequest: function(){
        if(window.ActiveXObject){
            return new ActiveXObject("Microsoft.XMLHTTP");
        }else if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    },
    ajaxConvertData: function(data){
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
}