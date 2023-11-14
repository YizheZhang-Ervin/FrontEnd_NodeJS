var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userId: {
        unique: true,
        type: String,
        default: 'anonymous'
    },
    password: String,
    meta: {
        createAt: {
            type: Date,
            dafault: Date.now()
        },
        updateAt: {
            type: Date,
            dafault: Date.now()
        }
    }
})

// Defines a pre hook for the document.
UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }
    next()
})

// 参数User 数据库中的集合名称, 不存在会创建.
var User = mongoose.model('User', UserSchema)

module.exports = User