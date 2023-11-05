# Electron

## 创建
```
npm init
# 在package.json的scripts中添加"start": "electron ."
# 设置npmrc仓库
npm install --save-dev electron

# 如果打包下载依赖失败
# 手动下载 https://github.com/electron/electron/releases/tag/版本号
# 放在$LOCALAPPDATA/electron/Cache或~/AppData/Local/electron/Cache/
```

## 启动
```
npm start
```

## 打包
```
npm install --save-dev @electron-forge/cli
npx electron-forge import
# package.json的scripts增加"start": "electron-forge start","package": "electron-forge package","make": "electron-forge make"
```

## 分发应用程序
```
npm run make
```

## 发布github
```
# 代码签名：修改forge.config.js的makers
npm install --save-dev @electron-forge/publisher-github
# package.json的scripts增加"publish": "electron-forge publish"
npm run publish
```

## 检测更新
```
npm install update-electron-app
# 在main.js中增加require('update-electron-app')()
```