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

const loadPath = path.resolve('src/middleware/loadRoutes.js')
const load = require(loadPath);

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

let parentDir = path.resolve(__dirname, "..")
app.use(static(parentDir + '/static'))
app.use(views(parentDir + '/static', { extension: "html" }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
load(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
