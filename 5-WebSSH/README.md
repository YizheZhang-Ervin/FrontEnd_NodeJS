# WebSSH

- Vue CLI & Websocket
  - webssh-vue
  - webssh-ws
- Vue CDN & Koa & Websocket
  - webssh-vue-koa-ws

---

1. Vue CLI & Websocket
- 【webssh-vue】
  - 依赖
    - npm init vue
    - npm install xterm
    - npm install xterm-addon-fit
  - 运行
    - cd webssh-vue
    - npm install
    - npm run dev 或 npm run build (打包后后端渲染)
- 【webssh-ws】
  - 依赖
    - npm install utf8
    - npm install ssh2
    - npm install ws
  - 运行
    - cd webssh-ws
    - npm install
    - node app.js

2. Vue CDN & Koa & Websocket
- 【webssh-vue-koa-ws】
  - 前端
    - vue/xterm/xterm-addon-fit
  - 后端
    - npm install utf8 ssh2 ws
    - npm install koa koa-router static-resource-plugin koa-html-render
  - 运行
    - websocket端口：2000
    - koa端口：3000
    - node app.js