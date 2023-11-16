"use strict";
const homeController = require("../controller/HomeController")

module.exports = app => {
  app.route("/api/home").get(homeController.check)
  app.route("/api/testJs").get(homeController.testJs)
  app.route("/api/testShell").get(homeController.testShell)
};