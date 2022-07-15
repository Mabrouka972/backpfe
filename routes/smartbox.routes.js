module.exports = app => {
    var router = require("express").Router();
    const authentication = require("../controllers/auth.controller.js");
    const site = require("../controllers/site.controller.js");
    const station = require("../controllers/station.controller.js");
    const device = require("../controllers/device.controller.js");
    const devicedata = require("../controllers/devicedata.controller.js");
    const contact = require("../controllers/contact.controller.js");
    const sensor = require("../controllers/sensor.js");
    const usertable = require("../controllers/usertable.controller.js");
    const gpssensor = require("../controllers/gpssensor.js");
    const alert = require("../controllers/alert.controller.js");
    

    app.use("/api", router);
    app.use("/api/auth",authentication);
    app.use("/api/site",site);
    app.use("/api/station",station);
    app.use("/api/device",device);
    app.use("/api/devicedata",devicedata);
    app.use("/api/contact",contact);
    app.use("/api/sensor",sensor);
    app.use("/api/usertable",usertable);
    app.use("/api/gpssensor",gpssensor);
    app.use("/api/alert",alert);
   
  };

  