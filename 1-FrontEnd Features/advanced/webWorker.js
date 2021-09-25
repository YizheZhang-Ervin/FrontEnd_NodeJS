// 创建
const worker = new Worker(aURL, options)

// 指定 error 事件的监听函数
worker.onerror = () => { }

// 指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
worker.onmessage = () => { }

// 指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
worker.onmessageerror = () => { }

// 向 Worker 线程发送消息。
worker.postMessage() = () => { }

// 立即终止 Worker 线程。
worker.terminate() = () => { }

// 限制
// 1.同源限制
// 分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

// 2.DOM 限制
// Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。
// 但是，Worker 线程可以navigator对象和location对象。

// 3.通信联系
// Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

// 4.脚本限制
// Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

// 5.文件限制
// Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

// 实例:
// 主js中
var worker = new Worker('worker.js');
worker.postMessage(40);
worker.onmessage = function (event) {
    var data = event.data;
    console.log(data)
};
worker.onerror = function (event) {
    console.log(event.fileName, event.lineo, event.message);
};

// worker.js中
self.onmessage = function (event) {
    var data = event.data;
    var ans = fibonacci(data);
    this.postMessage(ans);
};

function fibonacci(n) {
    return n < 2 ? n : arguments.callee(n - 1) + arguments.callee(n - 2);
}