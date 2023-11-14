const fs = require('fs')
const path = require('path')

module.exports = (app) => {
    let routePath = path.resolve("src/routes")
    fs.readdirSync(routePath).forEach((file) => {
        let filePath = path.resolve(`src/routes/${file}`)
        const route = require(filePath)
        app.use(route.routes()).use(route.allowedMethods())
    })
}
