# Electron-Vue

## 方法1
```
# 安装依赖
npm install electron --save-dev
npm install electron-builder --save-dev
npm install electron-packager --save-dev
npm install electron-updater --save-dev

# 启动
electron .

# 打包
electron-bulider

# 发布
# package.json的build里加"publish": [{"provider": "generic","url": "http://xxxxx/download/"}]
```

## 方法2
```
vue init simulatedgreg/electron-vue my-project
```

## 方法3
```
# vue项目增加vue-cli-plugin-electron-builder插件
npm install electron -g
vue add electron-builder
npm run electron:serve
npm run electron:build
```