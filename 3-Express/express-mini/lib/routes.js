const handler = require("./handler")
module.exports = app => {
    app.route("/check").get(handler.check)
};