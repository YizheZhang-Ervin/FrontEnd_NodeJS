const express = require('express')
const app = express()
const logger = require('morgan');
const config = require('./lib/config')
const routes = require("./lib/routes")
const path = require("path")
const http = require("http")

// config
console.log(`Read configs: ${config.key}`)

// log
app.use(logger("dev"));

// 响应处理
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
    next()
});

// 静态文件
app.use(express.static(path.join(__dirname, './static')));

// 路由
routes(app)

// web服务
server = http.createServer(app);
const port = process.env.PORT || '3000'
server.listen(port);
server.on('error', (err) => {
    throw err
});
server.on('listening', () => {
    console.log(`Express Started! Listening on Port: ${port}`)
});