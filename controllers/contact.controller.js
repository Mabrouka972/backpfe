const express = require("express");
const router = express.Router();
const db = require("../models");
var bodyParser = require('body-parser')

const Contact = db.contacts;
var jsonParser = bodyParser.json()


router.post('/', jsonParser ,  (req,res) => {

// Create a Tutorial
const st = new Contact(req.body.contact);
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
    err.message || "Some error occurred while creating the reclamation."
});
});

})


    


module.exports = router;


