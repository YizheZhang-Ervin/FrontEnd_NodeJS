// 页面关闭后无法使用
// 存储量大、安全、快捷
// 适合存与页面相关的数据(恢复表格已填写数据)

// 设值
sessionStorage.setItem("key", "value");

// 取值
var value = sessionStorage.getItem("key"); 

// 删值
sessionStorage.removeItem("key"); 

// 清空
sessionStorage.clear(); 

// 遍历值
var storage = window.sessionStorage;
for(var i=0, len=storage.length; i<len;i++){
    var key = storage.key(i);    
    var value = storage.getItem(key);    
    console.log(key + "=" + value);
}