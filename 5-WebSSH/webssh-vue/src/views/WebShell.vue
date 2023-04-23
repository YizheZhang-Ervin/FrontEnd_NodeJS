<template>
  <div id="xterm"></div>
</template>
  
  <script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

export default {
  name: 'WebShell',
  data() {
    return {
      socketURI: `ws://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_WS_PORT}/`
    }
  },
  mounted() {
    this.initSocket()
  },
  beforeDestroy() {
    this.socket.close()
    this.term && this.term.dispose()
  },
  methods: {
    initTerm() {
      let element = document.getElementById('xterm')
      // 设置了cols或者fitAddon.fit(); 当一行字符超过80个过会替换现在的内容，否则换行
      const term = new Terminal({
        cursorBlink: true, // 关标闪烁
        cursorStyle: 'underline', // 光标样式 'block' | 'underline' | 'bar'
        scrollback: 100, // 当行的滚动超过初始值时保留的行视窗，越大回滚能看的内容越多，
        theme: {
          foreground: '#F8F8F8',
          background: '#2D2E2C',
          cursor: 'help', //设置光标
          lineHeight: 16
        },
        fontFamily: '"Cascadia Code", Menlo, monospace'
      })
      this.term = term
      const fitAddon = new FitAddon()
      this.term.loadAddon(fitAddon)
      this.fitAddon = fitAddon
      term.open(element)
      // 自适应大小(使终端的尺寸和几何尺寸适合于终端容器的尺寸)，初始化的时候宽高都是对的
      fitAddon.fit()
      term.focus()

      this.term.onData((data) => {
        this.socket.send(data)
      })

      window.addEventListener('resize', this.resizeTerm)
    },
    getColsAndRows(element) {
      // 暂时不用
      element = element || document.getElementById('xterm')
      return {
        rows: parseInt((element.clientHeight - 0) / 18),
        cols: 10 // parseInt(element.clientWidth / 8)
      }
    },
    resizeTerm() {
      this.fitAddon.fit()
      this.term.scrollToBottom()
    },
    initSocket() {
      this.socket = new WebSocket(this.socketURI)
      this.socketOnClose()
      this.socketOnOpen()
      this.socketOnError()
      this.socketOnMessage()
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 连接成功后
        this.initTerm()
      }
    },
    socketOnMessage() {
      this.socket.onmessage = (event) => {
        // 接收推送的消息
        this.term.write(event.data.toString())
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        console.log('close socket')
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        console.log('socket error')
      }
    }
  }
}
</script>
  
<style>
#xterm {
  height: 100vh;
  width: 50vw;
  display: contents;
}

#xterm .xterm-viewport {
  overflow-y: hidden !important;
}
</style>