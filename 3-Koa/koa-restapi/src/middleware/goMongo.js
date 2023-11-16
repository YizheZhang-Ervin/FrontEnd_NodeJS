const mongoose = require('mongoose')

module.exports = {
    connect: (configJson) => {
        mongoose.connect(configJson["mongoConnectionStr"])

        mongoose.connection.on('error', (err) => {
            console.log(err)
        })

        mongoose.connection.on('open', () => {
            console.log('Mongoose连接成功')
        })
    },
}
