const express = require("express");
const router = express.Router();
const db = require("../models");
var bodyParser = require('body-parser')

const Device = db.devices;
var jsonParser = bodyParser.json()

router.get('/', (req, res) => {

  console.log("sensor code : authorized request");
  const sensorcode = req.query.sensorcode;
  var condition = sensorcode ? { sensorcode: { $regex: new RegExp(sensorcode), $options: "i" } } : {};

  Device.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});


router.post('/find', jsonParser, (req, res) => {

  const sensorcode = req.body.sensorcode;
  var condition = sensorcode ? { sensorcode: { $regex: new RegExp(sensorcode), $options: "i" } } : {};
  console.log(sensorcode);

  Device.find(condition)
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
})

router.post('/delete', jsonParser, (req, res) => {


  const sensorcode = req.body.sensorcode;
  console.log(sensorcode);
  Device.remove({ sensorcode: sensorcode }, function (err) {
    if (err) console.log(err);
    console.log("Successful deletion");
  }).then(data => {
    res.send(data);
    console.log(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

})

router.post('/addsensor', jsonParser, (req, res) => {

  console.log(req.body);
  Device.findOneAndUpdate({ sensorcode: req.body.sensorcode }, {
    station: req.body.station
  })
    .then(data => {
      console.log('terminated');
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the device."
      });
    });

})


router.post('/', jsonParser, (req, res) => {
  // Create a Tutorial
  const st = new Device(req.body.device);
  st.iduser = req.body.user
  
  console.log('aaaaaaaaaaaa',st);

  // Save Tutorial inesprit the database
  st.save(st)
    .then(data => {
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Device."
      });
    });

})


router.post('/updatedevice', jsonParser, (req, res) => {
  let sensorcode = req.body.sensorcode;
  console.log(req.body);
  var condition = sensorcode ? { sensorcode: { $regex: new RegExp(sensorcode), $options: "i" } } : {};
  Device.findOneAndUpdate(condition, {
    name: req.body.name,
    site: req.body.site,
    station: req.body.station
  }).then(data => {
    res.status(200).send(data);

  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

})




module.exports = router;


