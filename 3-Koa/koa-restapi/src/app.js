const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const views = require('koa-views')
const static = require('koa-static')
const path = require('path')
const morgan = require('koa-morgan')
const fs = require('fs')
const routing = require("./lib/routing/goRouteV2")
const goMongo = require("./middleware/goMongo")
const parameter = require('koa-parameter')

// read config file into cache
const goFile = require("./lib/goFile")
const configPath = path.resolve("config/application.json")
const configJson = goFile.readConfig(configPath, true)

// db
goMongo.connect(configJson)

// error handler
onerror(app)

// cors
let options = {
  // origin: "http://localhost:8080",
  // credentials: true
}
app.use(cors(options))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// static
let parentDir = path.resolve(__dirname, "..")
app.use(static(parentDir + '/static'))
app.use(views(parentDir + '/static', { extension: "html" }))


// parameter check
app.use(parameter(app))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// logger file
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(morgan('dev'))
} else {
  // 线上环境使用 combined（写入文件）
  const logFileName = configJson["logDir"]
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

// routes
routing(app)

// error-handling
app.on('error', (err, ctx) => {
  ctx.status = 500
  ctx.body = err
  console.error('server error', err, ctx)
});

module.exports = app
