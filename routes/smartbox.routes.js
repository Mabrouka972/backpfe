module.exports = app => {
    var router = require("express").Router();
    const authentication = require("../controllers/login.controller.js");

  
    app.use("/api", router);
    app.use("/api/login",authentication);

  };
  