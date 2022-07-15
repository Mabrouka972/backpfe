const Sensor = require('../models/Sensor');
const kafka = require('kafka-node');
var Kafka = require('no-kafka');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const db = require("../models");
var bodyParser = require('body-parser');

const Site = db.sites;
var jsonParser = bodyParser.json()

router.get('/', (req, res) => {

  console.log("authorized request");
  const reference = req.query.reference;
  var condition = reference ? { reference: { $regex: new RegExp(reference), $options: "i" } } : {};

  Site.find(condition)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
})

router.post('/', jsonParser, (req, res) => {
  // Create a Tutorial
  const st = new Site({
    reference: req.body.reference,
    name: req.body.name,
    description: req.body.description,
    lng: req.body.lng,
    lat: req.body.lat,
    iduser: req.body.iduser,
  });



  // Save Tutorial inesprit the database
  st.save(st)
    .then(data => {
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Site."
      });
    });
})

router.post('/addsensor', jsonParser, (req, res) => {

  // Validate request
  /*if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }*/


  Site.find()
    .then(data => {

      var nst = {
        reference: data[0].reference,
        name: data[0].name,
        description: data[0].description
      }

      const st = new Site(nst);

      console.log(st);
      st.save(st)
        .then(data => {
          console.log('terminated');
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the devicedata."
          });
        });



    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });


  // Create a Tutorial

  // Save Tutorial inesprit the database


})

router.post('/find', jsonParser, (req, res) => {

  const name = req.body.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  console.log(name);

  Site.find(condition)
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

router.post('/get', jsonParser, (req, res) => {

  const iduser = req.body.iduser;
  var condition = iduser ? { iduser: { $regex: new RegExp(iduser), $options: "i" } } : {};
  console.log(iduser);

  Site.find(condition)
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


  const reference = req.body.reference;
  console.log(reference);
  Site.remove({ reference: reference }, function (err) {
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

router.route('/read-site/:id').get((req, res) => {
  Site.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.post('/updatenew', jsonParser, (req, res) => {


  console.log(req.body);
  Site.findOneAndUpdate({ name: req.body.name }, {
    description: req.body.description
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

router.get('/site/:id', function (req, res) {
  Site.findById(req.params.id)
    .then(sitefound => {
      if (!sitefound) { return res.status(404).end(); }
      return res.status(200).json(sitefound);
    })
    .catch(err => next(err));
})

router.post('/updatesite', jsonParser, (req, res) => {
  let reference = req.body.reference;
  console.log(req.body);
  var condition = reference ? { reference: { $regex: new RegExp(reference), $options: "i" } } : {};
  Site.findOneAndUpdate(condition, {
    name: req.body.name,
    description: req.body.description,
    lat: req.body.lat,
    lng: req.body.lng
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

// router.get('get/:id' , jsonParser,(req , res) => {
//   console.log(req.params.id)
//   Site.find({iduser : req.params.id} , (err , result)=>{
//     if (result){
//       res.status(200).send(result);
//     }else{
//       res.status(500).send({
//         message:
//           err.message || "not found"
//       });
//     }
//   })
// })








module.exports = router;


