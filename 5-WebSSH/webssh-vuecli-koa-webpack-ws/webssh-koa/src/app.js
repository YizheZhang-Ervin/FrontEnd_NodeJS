require("./websocket.js")
const koa = require("koa")
const Router = require("koa-router")
const staticfile = require("static-resource-plugin")
const htmlRender = require("koa-html-render") // 引入koa-html-render

const server = new koa()
const router = new Router()

server.use(staticfile("static")) // 这里默认 static文件夹是存放静态资源的文件夹
server.use(htmlRender()) // 这里默认 static文件夹是存放静态html资源的文件夹
server.use(router.routes()).use(router.allowedMethods())

router.post("/", async ctx => {
    ctx.body = "Hello WebSocket"
})

router.get("/", async ctx => {
    await ctx.html("index.html")
})

const port = 3000
server.listen(port, function () {
    console.log(`server is running at http://localhost:${port}`)
})