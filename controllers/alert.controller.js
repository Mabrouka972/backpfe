const express = require("express");
const router = express.Router();
const db = require("../models");
var bodyParser = require('body-parser')

const Alert = db.alerts;
var jsonParser = bodyParser.json()


router.get('/', (req, res) => {

  const id = req.query._id;
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};

  Alert.find(condition)
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
  
  
  Alert.find(condition)
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

router.post('/finddata', jsonParser, (req, res) => {

  const data = req.body.data;
  var condition = data ? { data: { $regex: new RegExp(data), $options: "i" } } : {};

  Alert.find(condition)
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













router.post('/', jsonParser, (req, res) => {

  // Create a Tutorial
  const st = new Alert({
    email: req.body.email,
    sensorcode: req.body.sensorcode,
    data: req.body.data,
    max: req.body.max,
    min: req.body.min,
    reference: req.body.reference,
    iduser : req.body.iduser
  });

  // Save Tutorial inesprit the database
  st.save(st)
    .then(data => {
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the alert."
      });
    });

})



router.post('/delete', jsonParser, (req, res) => {


  const reference = req.body.reference;
  console.log(reference);
  Alert.remove({ reference: reference }, function (err) {
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

router.post('/updatealert', jsonParser, (req, res) => {
  let reference = req.body.reference;
  console.log(req.body);
  var condition = reference ? { reference: { $regex: new RegExp(reference), $options: "i" } } : {};
  Alert.findOneAndUpdate(condition, {
    min: req.body.min,
    max: req.body.max
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