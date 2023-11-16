const goCache = require("../lib/goCache.js")

class HomeController {
    async checkHealth(ctx) {
        // let config = goCache.get("config")
        // console.log(config)
        ctx.body = {
            code: 200,
            message: 'HEALTH OK',
            result: '',
        }
    }

    async test(ctx) {
        const id = ctx.request.params.id
        ctx.body = {
            code: 200,
            message: `${id} TEST OK`,
            result: '',
        }
    }
}

module.exports = new HomeController()