const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.admins = require("./admin.model.js")(mongoose);
db.stations = require("./station.model.js")(mongoose);
db.usertables = require("./usertable.model.js")(mongoose);
db.devices = require("./device.model.js")(mongoose);
db.devicedatas = require("./devicedata.model.js")(mongoose);
db.contacts = require("./contact.model.js")(mongoose);
db.sites = require("./site.model.js")(mongoose);
db.sensors = require("./Sensor.js")(mongoose);
db.gpssensors = require("./GpsSensor.js")(mongoose);
db.alerts = require("./alert.model.js")(mongoose);

module.exports = db;