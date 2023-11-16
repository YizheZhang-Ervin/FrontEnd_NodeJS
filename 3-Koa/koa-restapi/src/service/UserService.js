const goCall = require("../lib/http/goExternalCall.js")
const userHelper = require('../dbhelper/userHelper.js')
const User = require('../model/user.js')
const goCache = require("../lib/goCache.js")

class UserService {
    async login(userId, password) {
        return await User.findOne({
            userId: userId,
            password: password
        }).exec()
    }

    async logout(userId, token) {

    }
    // remote call
    async renewToken(token, refreshToken) {

    }
    // remote call
    async checkPermission(userId, permissionName, token) {
        let ipPort = goCache.get("config")["secIpPort"]
        let url = goCache.get("config")["secUrl"]
        let reqUrl = `http://${ipPort}${url}?userId=${userId}&permissionName=${permissionName}`
        return await goCall.doGet(reqUrl)
    }

    async addUser(userId, password) {
        let user = new User({
            userId: userId,
            password: password
        })
        return await userHelper.addUser(user)
    }

    async searchAllUser() {
        return await userHelper.findAllUsers()
    }

    async searchUserByUserId(userId) {
        return await userHelper.findByUserId(userId)
    }

    async updateUser(user) {
        return await user.save()
    }

    async deleteUser(userId) {
        return await userHelper.deleteUser({ userId })
    }
}

module.exports = new UserService()