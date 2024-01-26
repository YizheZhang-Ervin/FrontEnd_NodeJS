# Koa with webpack

1. Install
```
# webpack
npm i -D webpack webpack-cli
npm i -D clean-webpack-plugin
npm i -D webpack-node-externals
npm i -D @babel/core @babel/node @babel/preset-env babel-loader
npm i -D terser-webpack-plugin@4
npm i -D webpack-merge
npm i -D nodemon
npm i -D cross-env
npm i -D npm-run-all
npm i -D rimraf
npm i @babel/plugin-transform-runtime
npm i raw-loader

# koa
npm i koa koa-router static-resource-plugin koa-html-render

# websocket
npm i utf8 ssh2 ws
```

2. Run
```
# 直接运行
npm run start

# 编译运行
npm run build
windows下dist> node server.bundle.js
linux下dist/src> node server.bundle.js
```