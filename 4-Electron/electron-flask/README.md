# Electron

## 前端打包
npm config set registry https://registry.npmmirror.com
cd client
npm install electron electron-builder -D
# 把依赖放到devDependencies
# 方法1
# 下载https://registry.npmmirror.com/binary.html?path=electron/
# 下载https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/winCodeSign-2.6.0/
# 下载https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/nsis-3.0.5.0/
# 下载https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/nsis-resources-3.4.1/
# 放到C:\Users\DELL\AppData\Local\electron\Cache和C:\Users\DELL\AppData\Local\electron-builder\Cache
# 方法2
# electron_mirror=https://cdn.npmmirror.com/binaries/electron/
# electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
# 管理员打开命令行
npm run build

## 后端打包
cd server
python -m venv env
env\Scripts\activate
pip install Flask