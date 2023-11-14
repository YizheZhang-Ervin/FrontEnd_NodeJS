const userService = require("../service/UserService.js")
const goStatus = require("../lib/http/goStatus.js")

class UserController {
    async login(ctx) {
        const { userId, password } = ctx.request.body
        if (!userId || !password) {
            return ctx.app.emit('error', goStatus.statusCode.ServerError, ctx)
        }
        let res = await userService.login(userId, password)
        if (res) {
            let res = goStatus.statusCode.OK
            res.message = "登录成功"
            ctx.body = res
        } else {
            let res = goStatus.statusCode.ServerError
            res.message = "登录失败"
            ctx.body = res
        }
    }

    async logout(ctx) {
        const { userId, token } = ctx.request.body
        let res = await userService.logout(userId, token)
        ctx.body = {
            code: 200,
            message: '退出成功',
            result: res,
        }
    }

    // remote call
    async renewToken(ctx) {
        const { token, refreshToken } = ctx.request.body
        let res = await userService.renewToken(token, refreshToken)
        ctx.body = {
            code: 200,
            message: '更新token成功',
            result: res,
        }
    }

    // remote call
    async checkPermission(ctx, next) {
        const { userId, permissionName, token } = ctx.query
        let res = await userService.checkPermission(userId, permissionName, token)
        if (res.status == String(goStatus.statusCode.ServerError.code)) {
            ctx.app.emit('error', goStatus.statusCode.ServerError, ctx)
            return
        }
        await next()
    }

    async addUser(ctx, next) {
        const { userId, password } = ctx.request.body
        const res = await userService.addUser(userId, password)
        if (res) {
            let res = goStatus.statusCode.OK
            res.message = "ADD成功"
            ctx.body = res
        } else {
            let res = goStatus.statusCode.ServerError
            res.message = "ADD失败"
            ctx.body = res
        }
    }

    async searchAllUser(ctx, next) {
        const res = await userService.searchAllUser()
        if (res) {
            let res = goStatus.statusCode.OK
            res.message = "SEARCH ALL成功"
            ctx.body = res
        } else {
            let res = goStatus.statusCode.ServerError
            res.message = "SEARCH ALL失败"
            ctx.body = res
        }
    }

    async updateUser(ctx, next) {
        const { userId, newPwd } = ctx.request.body
        const user = await userService.searchUserByUserId(userId)
        user.password = newPwd
        const res = await userService.updateUser(user)
        if (res) {
            let res = goStatus.statusCode.OK
            res.message = "UPDATE成功"
            ctx.body = res
        } else {
            let res = goStatus.statusCode.ServerError
            res.message = "UPDATE失败"
            ctx.body = res
        }
    }

    async deleteUser(ctx, next) {
        const { userId } = ctx.request.body
        const res = await userService.deleteUser(userId)
        if (res) {
            let res = goStatus.statusCode.OK
            res.message = "DELETE成功"
            ctx.body = res
        } else {
            let res = goStatus.statusCode.ServerError
            res.message = "DELETE失败"
            ctx.body = res
        }
    }
}

module.exports = new UserController()