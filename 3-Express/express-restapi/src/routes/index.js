"use strict";

const mainRoute = require("./MainRoute")
const userRoute = require("./UserRoute")
const todoListRoute = require("./TodoListRoute")
module.exports = app => {
    mainRoute(app);
    userRoute(app)
    todoListRoute(app)
};
