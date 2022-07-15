const express = require("express");
const router = express.Router();
const db = require("../models");
var bodyParser = require('body-parser');
const { stations } = require("../models");
const Video = require('../models/station.model');

const Station = db.stations;
var jsonParser = bodyParser.json()

router.get('/', (req,res) => {

        console.log("authorized request");
        const reference = req.query.reference;
        var condition = reference ? { reference: { $regex: new RegExp(reference), $options: "i" } } : {};
      
        Station.find(condition)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
          });    
})

/*
router.post('/addsensor', jsonParser ,  (req,res) => {*/
   
        // Validate request
        /*if (!req.body.title) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }*/
        /*
        const reference = req.body.reference;
        var condition = reference ? { reference: { $regex: new RegExp(reference), $options: "i" } } : {};

        Station.find(condition)
          .then(data => {

            var nst = {
              reference : data[0].reference,
              name : data[0].name,
              referencesite : req.body.referencesite,
              adress : data[0].adress,
              type : data[0].type,
              capacity : data[0].capacity - 1
            } 
          
            const st = new Station(nst);
            if (nst.capacity > 0){
              console.log(st);
                      st.save(st)
                    .then(data => {
                    console.log('terminated')  ;              
                    })
                    .catch(err => {
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the vehicule."
                      });
                    });
                  }else { console.log("capacityfull")}


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
*/
router.post('/addsensor', jsonParser ,  (req,res) => {

  console.log(req.body);
  Station.findOneAndUpdate({name : req.body.name}, {
    site : req.body.site
  })
  .then(data => {
  console.log('terminated')  ; 
  res.send(data);
 
  })
  .catch(err => {
  res.status(500).send({
  message:
   err.message || "Some error occurred while creating the device."
    });
  });

})

router.post('/', jsonParser ,  (req,res) => {
   
  // Validate request
  /*if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }*/

  // Create a Tutorial
  const st = new Station(req.body.station);
  st.reference = req.body.reference
  st.iduser = req.body.iduser
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
router.post('/find',jsonParser , (req,res) => {
  
  const name = req.body.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  console.log(name);

  Station.find(condition)
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

router.post('/findsensorcode',jsonParser , (req,res) => {
  
  const sensorcode = req.body.sensorcode;
  var condition = sensorcode ? { sensorcode: { $regex: new RegExp(sensorcode), $options: "i" } } : {};
  console.log(sensorcode);

  Station.find(condition)
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


router.post('/find-station-by-user',jsonParser , (req,res) => {
  
  const iduser = req.body.iduser;
  var condition = iduser ? { iduser: { $regex: new RegExp(iduser), $options: "i" } } : {};
  console.log(iduser);

  Station.find(condition)
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
// Update a Tutorial by the id in the request
router.put("/:id",jsonParser , (req, res) => {
  const id = req.params.id;

  Station.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
})


router.post('/delete', jsonParser ,  (req,res) => {


  const reference = req.body.reference;
  console.log(reference);
  Station.remove({ reference: reference}, function (err) {
    if(err) console.log(err);
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

router.route('/read-station/:id').get((req, res) => {
  Station.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


router.route('/update-station/:id').put((req, res, next) => {
  Station.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Station successfully updated!')
    }
  })
})

router.post('/updatestation', jsonParser, (req,res) =>{
  let reference = req.body.reference;
  console.log(req.body);
  var condition = reference ? { reference: { $regex: new RegExp(reference), $options: "i" } } : {};
  Station.findOneAndUpdate(condition, {
    name : req.body.name,
    type : req.body.type,
    site : req.body.site,
    sensorcode : req.body.sensorcode
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

router.post('/stationBySite', jsonParser, (req,res) => {

  try {
     
      const s = Station.find({_id: req.body.id}
      );

      res.json(s);

  } catch (err) {
      res.json({message: err.message});

  }

});


module.exports = router;


