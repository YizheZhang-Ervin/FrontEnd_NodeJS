const router = require('koa-router')()
const { login, logout, renewToken, checkPermission } = require('../controller/UserController')
const { checkHealth, test } = require('../controller/HomeController')

// router.prefix('/user')
router.post('/login', login)
router.post('/logout', logout)
router.post('/renew', renewToken)
router.get('/test/:id', checkPermission, test)
router.get('/health', checkHealth)

module.exports = router
