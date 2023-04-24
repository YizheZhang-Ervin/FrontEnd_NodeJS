# Koa with webpack

1. Install
```
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
npm i koa
```

2. Build
```
webpack.config.base.js里externals: [nodeExternals()]决定是否依赖也打包
```

3. Run
```
# 直接运行
npm run start

# 编译运行
npm run build
node dist/server.bundle.js
```