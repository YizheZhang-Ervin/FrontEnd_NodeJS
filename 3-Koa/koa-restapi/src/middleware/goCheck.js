const goStatus = require("../lib/http/goStatus.js")

const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', goStatus.statusCode.ServerError, ctx)
        }
        await next()
    }
}

module.exports = {
    validator,
}
