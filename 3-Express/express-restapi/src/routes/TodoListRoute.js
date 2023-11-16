"use strict";
const todoListController = require("../controller/TodoListController");

module.exports = app => {
    app
        .route("/api/todoList")
        .get(todoListController.list)
        .post(todoListController.save);
    app
        .route("/api/todoList/:id")
        .put(todoListController.update)
        .delete(todoListController.delete);
};