const express = require("express");
const router = express.Router();
const Sensor = require('../models/Sensor');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

/*
const kafka = require('kafka-node');
var Kafka = require('no-kafka');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
const db = require("../models");
const Alert = db.alerts;
const sen = db.Sensor;
*/

router.get('/', (req, res) => {

  console.log("----get All Sensor work--------------");
  const id = req.query._id;
  console.log(id)
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
  Sensor.find(condition)
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
  console.log(req.body.sensorcode)
  const SensorIdentifier = req.body.sensorcode;
  var condition = SensorIdentifier ? { SensorIdentifier: { $regex: new RegExp(SensorIdentifier), $options: "i" } } : {};

  Sensor.find(condition)
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


router.post('/addsensor', jsonParser, (req, res) => {
  Sensor.find()
    .then(data => {

      var nst = {
        SensorIdentifier: data[0].SensorIdentifier,
        SensorType: data[0].SensorType,
        Created_date: data[0].Created_date
      }

      const st = new Sensor(nst);

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
})


/*

var consumer = new Kafka.SimpleConsumer({
  connectionString: 'kafka.treetronix.com:9095',
  clientId: 'test'
});


var dataHandler = function (messageSet, topic, partition) {
  messageSet.forEach(m => {
     console.log(m.message.value.toString('utf8'));
      const obj = JSON.parse(m.message.value.toString('utf8'));
      verify_kafka_data_message (m.message.value.toString('utf8'));
      console.log(obj) ;
      return io.emit('message', {y: m.message.value.toString('utf8')});
  });
};


consumer.init().then(function () {
  var v1= consumer.subscribe('AS.Treetronix.v1', dataHandler);
  var arr=[];
  arr.push([v1]);
  console.log("val:"+arr);
  return arr;


});

async function verify_kafka_data_message(x) {
  var y = JSON.parse(x);
  console.log('Sensor Id :',y.DevEUI_uplink.DevEUI);
  console.log('Sensor data :',y.DevEUI_uplink.payload_hex);
 console.log('y :', Object.keys(y).length);
  if (Object.keys(y).length === 1) {
      console.log('ok', 'data accepted');
      Sens = await Sensor.findOne({SensorIdentifier: y.DevEUI_uplink.DevEUI});
      console.log('Sensor Id :',y.DevEUI_uplink.DevEUI);
      console.log('Sensor data :',y.DevEUI_uplink.payload_hex);

      if (Sens) {
      console.log('Sensor name:',Sens.name);
      console.log('data', y.DevEUI_uplink.payload_hex);
      Sens.data.push(decrypt(y.DevEUI_uplink.payload_hex,y.DevEUI_uplink.Time));
      await Sens.save();
      checkRules(Sens.Rules,Sens._id,decrypt(y.DevEUI_uplink.payload_hex,y.DevEUI_uplink.Time));
      return;
      }
      else {
          console.log(Sens , ' not my Sensor');
          return ;
      }
  }
  console.log('error', 'not valid data');
}

router.post('/Xtree', async (req, res) => {
  try {
      console.log('req', req);
      console.log("req.body : ",req.body);
      Sens = await Sensor.findOne({SensorIdentifier: req.body.SensorIdentifier});
      if (Sens) {
          return res.status(400).json({status: "err", message: 'duplicate identifier'});
      }
      let sensor = new Sensor();
      sensor.SensorIdentifier = req.body.SensorIdentifier;
      sensor.SensorType = req.body.SensorType;
      console.log("111111",sensor);
      if (sensor) {
          console.log("222222",sensor);
          NewSensor = await sensor.save();
          return res.json({status: "ok", message: 'New Sensor have been added !'});
      }


      console.log("error");
      return res.status(400).json({status: "err", message: 'Some kind of error'});
  } catch (e) {
      console.log(e);
  }
});


async function comparison ()
{
try {
    var alerts = []
    var sensors = []
    var data = []
    await Alert.find({ },function (err, Alertlist) {
        if(err){
          console.log('alert error')
        } else{
          alerts= Alertlist
        }
      })
    await Sensor.find({ },function (err, sens) {
        if(err){
          console.log('alert error')
        } else{
          sensors= sens
        }
      })

      for ( var i = 0 ; i < alerts.length ; i++)
      {
        for (var j =0 ; j < sensors.length ; j++)
        {
          if (alerts[i].sensorcode == sensors[j].SensorIdentifier)
          {
            data.push(sensors[j].data) 
            for (var k =0 ; k < data.length ; k++)
            {
                if (alerts[i].data == "Temperature" )
                {
                  if (alerts[i].min > data[k][data[k].length -1]["temperature"] || data[k][data[k].length -1]["temperature"] > alerts[i].max)
                  { 
                    mail(alerts[i]["email"],"Be careful, please check your temperature in device's DevEUI: "+sensors[j].SensorIdentifier+" val: "+data[k][data[k].length -1]["temperature"],"Alert temperature!")
                    break;
                  }
                }
                if (alerts[i].data == "Humidity" )
                {
                  if (alerts[i].min > data[k][data[k].length -1]["humidite"] || data[k][data[k].length -1]["humidite"] > alerts[i].max)
                  { 
                    mail(alerts[i]["email"],"Be careful, please check your humidity in device's DevEUI: "+sensors[j].SensorIdentifier +" val: "+data[k][data[k].length -1]["humidite"],"Alert humidity!")
                    break;
                  }
                }
            }
          }
        }
      }
  } catch (e) {
      console.log(e);
  }
}
router.post('/decrypt', async (req, res) => {
    try {
     

        data = decrypt(req.body.kafkaData,req.body.time);
        return res.json({status: "ok", message: data});
    } catch (e) {
        console.log(e);
    }
});

function decrypt(data, time) {

  if (data.length === 10) {
      temp=(parseInt(data.substring(0,4),16)/100);
      hum =(parseInt(data.substring(4,8) , 16)/100);
      v=(parseInt(data.substring(8,10) , 16));
      volt = (v - 30)/(42 - 30) *100;
      var nowDate = new Date();
      var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()+' | '+nowDate.getHours()+':'+nowDate.getMinutes()+':'+nowDate.getSeconds();
      comparison();
      return({temperature : temp , humidite : hum , batterie : volt , humiditéSol : 0 , time : date});
  

  }
  if (data.length === 18) {
      hum1=(parseInt(data.substring(0,4),16)/10);
      hum2 =(parseInt(data.substring(4,8) , 16)/10);
      hum3=(parseInt(data.substring(8,12) , 16)/10);
      tempSol=(parseInt(data.substring(12,16) , 16)/10);
      v=(parseInt(data.substring(16,18) , 16));
      volt = (v - 30)/(42 - 30) *100;
      var nowDate = new Date(); 
      var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()+' | '+nowDate.getHours()+':'+nowDate.getMinutes()+':'+nowDate.getSeconds(); 
      comparison();
      return({humdity1 : hum1 , humdity2 : hum2 , humdity3 : hum3 , temperatureSol : tempSol , batterie : volt , time : date});
  }
}

function mail(email,message,subject)
{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',  
      pass: '' 
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  var mailOptions = {
    from: '',
    to: email,
    subject: subject,
    text: message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
router.post('/RelayAction', async (req, res) => {
    try {
        console.log(req.body.id);
        console.log(req.body.state);
        RelayAction(req.body.state, req.body.id);
        return res.json({status: "ok", message: 'action sent'});
    } catch (e) {
        console.log(e);
    }
});

async function checkRules(rules, id, data) {
  if (!rules) {
      return;
  }
  const rule = rules[rules.length - 1];
  if (rule) {

      if (rule.Status === false) {
          console.log('rule is false no action needed ');
      } else {
          console.log('data.humidite ',data.humidite);
          console.log('rule.Tmin ',rule.Tmin);
          const now = Date.now();
          if (rule.Tmin < data.humidite && rule.Tmax > data.humidite && rule.StartTime < now )
          {
          const Loc = await Location.findOne({Sensor_ids: mongoose.Types.ObjectId(id)});
          if (!Loc) {
              console.log('no location');
              return ;
          }
          const U = await User.findOne({Location_ids: mongoose.Types.ObjectId(Loc._id)});
          if (!U) {
              console.log('no User');
              return ;
          }
          if (U.Notifications.Email === true)
          {
              Shared.EmailUser(U.email, 'Relay Update ', 'Relay is open '+Loc.SiteName);
          }
          if (U.Notifications.Push === true)
          {
              console.log('Push Notification ', U._id);
              Shared.NotifyyUser('5e539d385957281f6470841d',{"icon":"success", "title" : "success" , "text" : "Relay is open "+Loc.SiteName} );
          }
          }else if (rule.Tmax < data.humidite && rule.StartTime < now )
          {
              const Loc = await Location.findOne({Sensor_ids: mongoose.Types.ObjectId(id)});
              if (!Loc) {
                  console.log('no location');
                  return ;
              }
              const U = await User.findOne({Location_ids: mongoose.Types.ObjectId(Loc._id)});
              if (!U) {
                  console.log('no User');
                  return ;
              }
              if (U.Notifications.Email === true)
              {
                  Shared.EmailUser(U.email, 'Relay Update ', 'Relay is closing '+Loc.SiteName);
              }
              if (U.Notifications.Push === true)
              {
                  console.log('Push Notification ', U._id);
                  Shared.NotifyyUser('5e539d385957281f6470841d',{"icon":"success", "title" : "success" , "text" : "Relay is open "+Loc.SiteName} );
              }
          }else if((rule.Tmin > data.humidite || data.humidite < rule.Tmax) && rule.StartTime < now)
          {
              console.log('2nd condition');
          }
      }
  } else {
      console.log('no rules');
      return;
  }




}











  
  
  
  
  router.post('/', jsonParser ,  (req,res) => {
  

  const st = new Sensor(req.body.Sensor);
  console.log(req.body);
  console.log(st);
  
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



*/



module.exports = router;


