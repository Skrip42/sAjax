# sAjax
is a library that facilitates work with Ajax
## Getting Started
to send an Ajax request:
```js
var req = new SAjax();
req.sendRequest(url, metod, param, sync);
```
where 
*url : is a server addres,
*method : is a metod of query ('get'|'post'). this parameter can de omitted (by default 'get')
*param : is a query parameters, in the form of a string, number, or object containing key-vaue. In the case where param is object, object automatically converted into a JSON string or URL parameters
sync : is a aynchronous request flag. default is TRUE

you can also set event handlers for
*start the query
```js
req.requestStart = function(){do something};
```
*end the query
```js
req.requestComplite = function(){do something};
```
*and thie query with an error
```js
req.requestError = function(){do something};
```

you can also use of all methods and properties of XMLHttpRequest() object

##Example
```js
var req = new SAjax();
req.requestStart = function(){
    startLoadBar();
}
req.requestComplite = function(){
    stopLoadBar();
    console.log("reaponse : " + this.responseText);
}
req.requestError = function(){
    stopLoadBar();
    console.error("request was unsuccessful: " + this.status);
}
req.sendRequest('test.php', 'post', {key1:value1, key2:value2});
```
