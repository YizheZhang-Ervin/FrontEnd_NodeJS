const User = require('../model/user.js')

exports.findByUserId = async ({ userId }) => {
    var query = User.find({ userId })
    var res = null
    await query.exec((err, user) => {
        if (err) {
            res = {}
        } else {
            res = user
        }
    })
    return res;
}

exports.findAllUsers = async () => {
    var query = User.find({});
    var res = []
    await query.exec((err, users) => {
        if (err) {
            res = []
        } else {
            res = users;
        }
    })
    return res
}

exports.addUser = async (user) => {
    user = await user.save()
    return user
}

exports.deleteUser = async ({ userId }) => {
    var flag = false
    await User.remove({ userId }, (err) => {
        if (err) {
            flag = false
        } else {
            flag = true
        }

    })
    return flag
}
