# Install

## 使用
```
bin: 启动入口
dist: vue打包存放目录
node_modules: 依赖目录
src: 代码目录
```

## 本地配置npm
```
# 配置位于C:\user\xxUser\.npmrc
npm config set prefix D:\nodejs13\npm_global
npm config set cache D:\nodejs13\npm_cache
npm config set registry https://registry.npm.taobao.org

# 修改系统变量PATH到D:\nodejs13\npm_global
set-ExecutionPolicy RemoteSigned
```

## koa
```
# 全局(框架)
## 安装
npm install -g koa-generator
koa2 xxProject
## 使用
npm install
SET DEBUG=koa* & npm start

# 局部安装
npm install koa
node --harmony my-koa-app.js
```

## 改造koa
```
# 渲染html
npm install koa2-cors
npm remvoe pug

# 命令行参数读取
npm install yargs
```

## 中间件
```
mongoDB
nodexlsx
```

## 部署
```
# 虚拟机守护进程启动
本地测试node: npm start
生产pm2: npm prd
开发nodemon: npm dev

# 容器
打包: webpack缩减体积(optional)
前台启动: node www.js
前台启动: pm2 start bin/www --no-daemon
```