const express = require("express");
const router = express.Router();
const db = require("../models");
var bodyParser = require('body-parser')

const Devicedata = db.devicedatas;
var jsonParser = bodyParser.json()

router.get('/', (req,res) => {

        console.log("id : authorized request");
        const id = req.query._id;
        var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
      
        Devicedata.find(condition)
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
});


router.post('/find',jsonParser , (req,res) => {

  const sensorcode = req.body.sensorcode;
  var condition = sensorcode ? { sensorcode: { $regex: new RegExp(sensorcode), $options: "i" } } : {};
  console.log(sensorcode);

  Devicedata.find(condition)
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
});


router.post('/addsensor', jsonParser ,  (req,res) => {
   
  // Validate request
  /*if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }*/
  

  Devicedata.find()
    .then(data => {

      var nst = {
        sensorcode : data[0].sensorcode,
        temperature : data[0].temperature,
        humidity : data[0].humidity,
        type : data[0].type,
        latitude : data[0].latitude,
        longitude : data[0].longitude,
        createdAt : data[0].createdAt
        
        
      } 
    
      const st = new Devicedata(nst);
      
              console.log(st);
              st.save(st)
              .then(data => {
              console.log('terminated')  ;              
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




router.post('/', jsonParser ,  (req,res) => {

// Validate request
/*if (!req.body.title) {
res.status(400).send({ message: "Content can not be empty!" });
return;
}*/

// Create a Tutorial
const st = new Devicedata(req.body.devicedata);
console.log(req.body);
console.log(st);

// Save Tutorial inesprit the database
st.save(st)
.then(data => {
res.send(data);

})
.catch(err => {
res.status(500).send({
  message:
    err.message || "Some error occurred while creating the vehicule."
});
});

})


    


module.exports = router;


