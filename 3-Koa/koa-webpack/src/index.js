// 先npm安装koa 
// 这里引用和初始化
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    ctx.body = 'hello koa'
})

// 监听端口
app.listen(3000)