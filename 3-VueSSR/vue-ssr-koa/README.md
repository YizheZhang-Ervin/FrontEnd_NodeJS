# Vue-SSR-KOA

1. 依赖 & 建项目
```
# 依赖
npm install -g @vue/cli
npm install -g vue@2.7.14
npm install vue-router@3.6.5
npm install cross-env
npm install koa
npm install koa-router@7.4.0
npm install koa-send
npm install koa-compress
npm install vue-server-renderer
npm install webpack-node-externals
npm install compression-webpack-plugin

# 建项目
set-ExecutionPolicy RemoteSigned
vue create xxProject
```

3. 修改内容 & 启动
```
# 修改内容
src/main.js
src/client.js
src/server.js
node-server.js
index.ssr.html
vue.config.js
package.json

# 启动
npm install
npm start
```