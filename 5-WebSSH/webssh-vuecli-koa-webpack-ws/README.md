# WebSSH

1. 前端webssh-vue

2. 后端webssh-koa

3. 启动scripts
```
oneKeyBuild.sh一键打包
windows则dist目录下dist> node server.bundle.js
linux则把server.bundle.js和server.bundle.js.LICENSE.txt移到dist/src下，src> node server.bundle.js

Dockerfile打镜像
docker build -t mywebssh .
docker run -it --name mywebssh mywebssh /bin/bash  # 试运行
docker run --name=mywebssh -d --restart=always -p 3000:3000 -p 2000:2000 mywebssh
```