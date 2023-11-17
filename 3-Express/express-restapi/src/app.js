const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const logger = require('morgan');
const mongoose = require("mongoose")
// models要放在routes前面
const models = require("./models/index");
const routes = require("./routes/index")
const config = require(path.join(__dirname, '../config/index'))
// var cookieParser = require('cookie-parser');
// const cors = require("cors");

// log
app.use(logger("dev"));

// MongoDB
mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;

// 响应处理
app.use(bodyParser.json());
// xx=yy convert to xx:yy
// extended为false表示使用querystring来解析数据，这是URL-encoded解析
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
    next()
});

// 静态文件
app.use(express.static(path.join(__dirname, '../static')));

// 路由
routes(app)

module.exports = app;
