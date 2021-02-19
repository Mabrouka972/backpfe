const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.admins;
const secretKey = "KwEmDJNvp5feSjWo2uCr";

router.get('/', (req,res) => {

    res.send("from login route rami");
})

router.post('/', (req,res) => {

  let userData = req.body
  console.log(req.body.password);

  User.findOne({ cin: userData.cin }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
            if(!result)
            {
                res.status(401).send("invalid cin");
            }
            else
            {
                if(result.password !== userData.password){
                    res.status(401).send("invalid password");
                }
                else
                    {
                        let payload = {subject : result.id};
                        let token = jwt.sign(payload,secretKey)
                        res.status(200).send({token});
                    }

            }
    }
  });
})

function verifyToken(req,res,next)
{
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
  }

  let token = req.headers.authorization.split(' ')[1];
  if(token == 'null')
  {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token , secretKey);
  if(!payload){
    return res.status(401).send("Unauthorized request");
    
  }
  next();

}

module.exports = router;


