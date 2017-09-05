"use strict";

var sAjaxProto = {
    requestStart : function () {
    },
    requestComplite : function () {
        console.log(this.responseText);
    },
    requestError : function () {
        console.error("Request was unsuccessful: " + this.status);
    },
    urlAddGetParam : function (url, a, b) {
        url += (url.indexOf('?') === -1 ? '?' : '&');
        url += encodeURIComponent(a) + '=' + encodeURIComponent(b);
        return url;
    },
    sendRequest : function (url, metod, param, sync) {
        if (typeof url  !== 'string') {
            console.error('uncorect url');
            return 'uncorect url';
        }
        if (typeof metod  === 'undefined') {
            metod = 'get';
        } else if (typeof metod  !== 'string' || (metod !== 'get' && metod !== 'post')) {
            sync = param;
            param = metod;
            metod = 'get';
        }
        if (typeof param  === 'undefined') {
            param = null;
        } else if (typeof param  === 'string') {
            if (metod === 'get') {
                if (param.indexOf('=') !== -1 || param.indexOf('&') !== -1) {
                    var paramArray = param.split('&');
                    var i = 0;
                    for (i = 0; i < paramArray.length; i++) {
                        if (paramArray[i].indexOf('=') !== -1) {
                            var keyAndValue = paramArray[i].split('=');
                            url = this.urlAddGetParam(url, keyAndValue[0], keyAndValue[1]);
                        } else {
                            url = this.urlAddGetParam(url, 'parametr_' + i, paramArray[i]);
                        }
                    }
                } else {
                    url = this.urlAddGetParam(url, 'parametr', param);
                }
            } else {
                this.queryString = param;
            }

        } else if (typeof param  === 'object') {
            var name;
            if (metod === 'get' && Object.keys(param).length > 0) {
                for (name in param) {
                    url += (url.indexOf('?') === -1 ? "?" : "&");
                    url += encodeURIComponent(name) + '=' + encodeURIComponent(param[name]);
                }
            } else {
                this.queryString = JSON.stringify(param);
            }
        } else if (typeof param  === "number") {
            if (metod === 'get') {
                url = this.urlAddGetParam(url, 'parametr', String(param));
            }
        } else if (typeof param === "boolean") {
            sync = param;
        }
        if (typeof sync  !== "boolean") {
            sync = true;
        }
        this.onreadystatechange = function () {
            if (this.readyState === 4) {
                if ((this.status >= 200 && this.status < 300) || this.status === 304) {
                    this.requestComplite();
                } else {
                    this.requestError();
                }
            }
        }
        this.requestStart();
        if(metod === 'get'){
            this.open("get", url, sync);
            this.send(null);
        }else{
            this.open("post",url, sync);
            this.send(this.queryString);
        }
    }

};

var SAjax = function(){
    var o = new XMLHttpRequest();
    Object.setPrototypeOf(o, sAjaxProto); 
    o.queryString = null;
    return o;
};

Object.setPrototypeOf(sAjaxProto,XMLHttpRequest.prototype);
