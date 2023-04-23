let wsTime = null
const { createApp } = Vue
let webshell = {
    data() {
        return {
            // 终端
            term: {},
            // websocket
            ws: {}
        }
    },
    created() {
        // 初始化终端
        this.initTerminal()
    },
    mounted() {
        // 建立websocket连接
        this.websocket()
    },
    beforeDestroy() {
        this.ws.close()
        this.term.dispose()
    },
    methods: {
        // 初始化终端配置
        initTerminal() {
            this.term = new Terminal({
                rendererType: "canvas", //渲染类型
                // rows: 40, //行数，影响最小高度
                // cols: 100, // 列数，影响最小宽度
                convertEol: true, //启用时，光标将设置为下一行的开头
                // scrollback: 50, //终端中的滚动条回滚量
                disableStdin: false, //是否应禁用输入。
                cursorStyle: "underline", //光标样式
                cursorBlink: true, //光标闪烁
                theme: {
                    foreground: '#F8F8F8',
                    background: '#2D2E2C',
                    cursor: "help", //设置光标
                    lineHeight: 16,
                },
                fontFamily: '"Cascadia Code", Menlo, monospace'
            });
        },
        // 自定义终端默认展示内容
        writeDefaultInfo() {
            let defaultInfo = [
                '┌\x1b[1m terminals \x1b[0m─────────────────────────────────────────────────────────────────┐ ',
                '│                                                                            │ ',
                '│  \x1b[1;34m 欢迎使用Web Docker SSH \x1b[0m                                                  │ ',
                '│                                                                            │ ',
                '└────────────────────────────────────────────────────────────────────────────┘ ',]
            this.term.write(defaultInfo.join('\n\r'))
        },
        // 建立websocket连接
        websocket() {
            // WebSocket start
            if ('WebSocket' in window) {
                //需要修改ip和id
                //例如：const url = `ws://192.168.111.222:2375/v1.41/containers/0eb8aafb4e6e/attach/ws?logs=0&stream=1&stdin=1&stdout=1&stderr=1`
                const url = `ws://localhost:2000`
                const ws = new WebSocket(url)
                this.ws = ws
                ws.onopen = (event) => {
                    console.log('已建立连接：', event)
                    // 输入换行符可让终端显示当前用户的工作路径
                    ws.send('\n')
                    // 窗口自适应插件
                    const fitAddon = new FitAddon.FitAddon();
                    // websocket自动收发消息插件
                    const attachAddon = new AttachAddon.AttachAddon(ws)
                    this.term.loadAddon(attachAddon)
                    this.term.loadAddon(fitAddon)
                    this.term.open(document.getElementById('terminal'));
                    // 聚焦闪烁光标
                    this.term.focus()
                    // 窗口尺寸变化时，终端尺寸自适应
                    window.onresize = () => {
                        fitAddon.fit()
                    }
                    // 自定义终端默认展示内容
                    this.writeDefaultInfo()
                };
                ws.onmessage = (event) => {
                    console.log('接收信息：', event)
                };
                ws.onerror = (event) => {
                    console.log('错误信息：', event)
                    if (wsTime) {
                        window.clearTimeout(wsTime)
                        wsTime = null
                    }
                    wsTime = window.setTimeout(() => {
                        this.websocket()
                    }, 3000)
                };
                ws.onclose = (event) => {
                    console.log('已关闭连接：', event)
                    // if (wsTime) {
                    //    window.clearTimeout(wsTime)
                    //    wsTime = null
                    // }
                    // wsTime = window.setTimeout(() => {
                    //    this.websocket()
                    // }, 3000)
                };
            } else {
                console.log('浏览器不支持 WebSocket..')
            }
            // WebSocket end
        }
    }
}
let webssh = {
    data() {
        return {
            socketURI: `ws://localhost:2000/`,
        };
    },
    mounted() {
        this.initSocket();
    },
    beforeDestroy() {
        this.socket.close();
        this.term && this.term.dispose();
    },
    methods: {
        initTerm() {
            let element = document.getElementById("xterm");
            // 设置了cols或者fitAddon.fit(); 当一行字符超过80个过会替换现在的内容，否则换行
            const term = new Terminal({
                cursorBlink: true, // 关标闪烁
                cursorStyle: "underline", // 光标样式 'block' | 'underline' | 'bar'
                scrollback: 100, // 当行的滚动超过初始值时保留的行视窗，越大回滚能看的内容越多，
            });
            this.term = term;
            const fitAddon = new FitAddon.FitAddon();
            this.term.loadAddon(fitAddon);
            this.fitAddon = fitAddon;
            term.open(element);
            // 自适应大小(使终端的尺寸和几何尺寸适合于终端容器的尺寸)，初始化的时候宽高都是对的
            fitAddon.fit();
            term.focus();

            this.term.onData((data) => {
                this.socket.send(data);
            });

            window.addEventListener("resize", this.resizeTerm);
        },
        getColsAndRows(element) {
            // 暂时不用
            element = element || document.getElementById("xterm");
            return {
                rows: parseInt((element.clientHeight - 0) / 18),
                cols: 10, // parseInt(element.clientWidth / 8)
            };
        },
        resizeTerm() {
            this.fitAddon.fit();
            this.term.scrollToBottom();
        },
        initSocket() {
            this.socket = new WebSocket(this.socketURI);
            this.socketOnClose();
            this.socketOnOpen();
            this.socketOnError();
            this.socketOnMessage();
        },
        socketOnOpen() {
            this.socket.onopen = () => {
                // 连接成功后
                this.initTerm();
            };
        },
        socketOnMessage() {
            this.socket.onmessage = (event) => {
                // 接收推送的消息
                this.term.write(event.data.toString());
            };
        },
        socketOnClose() {
            this.socket.onclose = () => {
                console.log("close socket");
            };
        },
        socketOnError() {
            this.socket.onerror = () => {
                console.log("socket error");
            };
        },
    },
}
createApp(webssh).mount('#app')