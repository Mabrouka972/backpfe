const express = require("express");

const router = express.Router();
const db = require("../models");
var bodyParser = require('body-parser')
var nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const Usertable = db.usertables;

router.get('/', (req,res) => {
        console.log("id : authorized request");
        const id = req.query._id;
        var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
      
        Usertable.find(condition)
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
router.post('/register', async(req,res) => {

  const newUser = await Usertable.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.passwordConfirm,
  });

res.status(200).json({
    status: "success",
    data: {
      newUser,
    },
  });
});
router.post('/forgopassword', async(req,res) => { 

  try {
    
    Usertable.findOne({ email:req.body.email},(err,usertable)=>{
     
      if(err) res.json(err)
      if(!usertable) res.json("incorrect credentials");
      else {
        
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            usertable: 'tlilimabrouka826@gmail.com',
            pass: 'chine123456'
          }
        });

        var mailOptions = {
          to: req.body.email,
          from: 'tlilimabrouka826@gmail.com',
          subject: 'ResetPassword',
          text: 'You just requested a password reset so we just sent you an e-mail to confirm your update.\n\n' +
              'Click on this Link to confirm : http://localhost:4200/resetpassword  .\n\n' +
              'Contact us in case this wasnt you or there was still a problem after the update!'
              
           
        };  
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          });
            
             
             var token = jwt.sign({usertable
            },'secret',{expiresIn:3600})
             
            
             res.status(200).json(

           {

             name: usertable.name,
             email: usertable.email

            }
            
            );    
        }
      })
    }
    catch {
      res.json("error")
    }
   

  } )
  router.post('/resetpassword', async(req,res) => { 

    try {
      
      Usertable.findOne({email:req.body.email},(err,usertable)=>{
       
        if(err) res.json(err)
        if(!usertable) res.json("error");
        else {
          
          
          usertable.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
          usertable.save()
             
             
             
            
             res.status(200).json("done");    
        }
      })
    }
    
    catch {
      res.json("error")
    }
   

  })

module.exports = router;


