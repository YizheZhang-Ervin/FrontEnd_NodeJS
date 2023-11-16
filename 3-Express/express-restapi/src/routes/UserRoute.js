"use strict";
const userController = require("../controller/UserController");

module.exports = app => {
    app
        .route("/api/users")
        .get(userController.list)
        .post(userController.save);
    app
        .route("/api/users/:id")
        .get(userController.get)
        .put(userController.update)
        .delete(userController.delete);
};
