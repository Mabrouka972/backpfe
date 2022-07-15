const GpsSensor = require('../models/GpsSensor');
const kafka = require('kafka-node');
var NoKafka = require('no-kafka');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var NodeGeocoder = require('node-geocoder');


router.get('/', (req,res) => {

  console.log("id : authorized request");
  const id = req.query._id;
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};

  GpsSensor.find(condition)
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

router.post('/addsensor', jsonParser, (req, res) => {
  GpsSensor.find()
    .then(data => {
      var nst = {
        SensorIdentifier: data[0].SensorIdentifier,
        SensorType: data[0].SensorType,
        Created_date: data[0].Created_date
      }
      const st = new GpsSensor(nst);

      st.save(st)
      .then(data => {
        console.log('terminated');
      })
      .catch(err => {
        res.status(500).send({
          message:err.message || "Some error occurred while creating the devicedata."
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

router.post('/find',jsonParser , (req,res) => {

  const SensorIdentifier = req.body.sensorcode;
  var condition = SensorIdentifier ? { SensorIdentifier: { $regex: new RegExp(SensorIdentifier), $options: "i" } } : {};
  console.log(SensorIdentifier);

  GpsSensor.find(condition)
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

/*
var kafka_ip = "kafka.treetronix.com:9095";
var kafka_Topic ="AS.Treetronix.v1" ;

var consumer = new NoKafka.SimpleConsumer({
  connectionString: kafka_ip,
  clientId: 'test'
});

var geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: 'c3cc880c22714af4ab5aeaa1bcb8150d',
  language: 'fr'
});

var location_device_test = "";

function hexToDec(hexString){
  return parseInt(hexString, 16);
}

var dataHandler = function (messageSet, topic, partition) {
  messageSet.forEach(function (m) {

      const obj = JSON.parse(m.message.value.toString('utf8'));

      console.log("Msg Kafka > > > " +obj);
      GetGeoCodingLocation(obj);
      setTimeout(()=>{
          DecryptAndSendDAATA(obj);
      },2000); 


      return io.emit('message', {y: m.message.value.toString('utf8')});
  });
};
consumer.init().then(function () {
    var v1= consumer.subscribe(kafka_Topic, dataHandler);
    var arr=[];
    arr.push([v1]);
    console.log("val ======> :"+arr);
    return arr;


});

async function DecryptAndSendDAATA(obj) {
  console.log("==> awessssssss obj : "+obj);
  payload = obj.DevEUI_uplink.payload_hex ;
  DevEUI = obj.DevEUI_uplink.DevEUI ;
  time = obj.DevEUI_uplink.Time ;
  adress_device = location_device_test ;
  console.log("hey yyyyy ===== >")
  console.log(obj.DevEUI_uplink);
  console.log("==>"+payload);
  try {
      device = await GpsSensor.findOne({SensorIdentifier: DevEUI});
      console.log("ya9ra devui c'est bon "+ DevEUI);
      if (device === null) {
          console.log(DevEUI);
          console.log(DevEUI+'not exist');
      } else {
          console.log(DevEUI +",  At : ,"+time);
          var dismantled = hexToDec (payload.substring(0, 2)) ;
          var moving  = hexToDec (payload.substring(2, 4)) ;
          var charging = hexToDec (payload.substring(4, 6));
          var voltage = hexToDec (payload.substring(6, 8))/10;
          var LAT = hexToDec (payload.substring(8, 14))* 90 / 8388607 ;
          var LNG = hexToDec (payload.substring(14, 20))* 180 / 8388607;
          var batterie = ((hexToDec (payload.substring(6, 8))-30)/12) * 100 ;
          let bettery = parseInt(batterie);

          DeviceValues = {
              "dismantled": +dismantled,
              "moving": +moving,
              "charging": +charging,
              "time": +Date.parse(time),
              "voltage": +voltage,
              "LAT": +LAT,
              "LNG": +LNG,
              "batterie": +bettery,
              "adress_device": location_device_test,
          };
          console.log('DeviceValues ->',DeviceValues);
          
          
          
          
          
              deviceGps = await GpsSensor.findOne({SensorIdentifier: DevEUI});
              console.log("mawjouddd papi ***************************")
              deviceGps.data.push(DeviceValues);
              console.log("c bn zedhaaa f tab khooooooooooooooooooo       ******************")
              await deviceGps.save();
              console.log("savineh o oumournaaaaa mrigulaaaaaaaaaaaa >>>>>>>>>>>>>>>>>>>>")
      
      }   
  } catch (e) {
      console.log(e);
  }

}

async function GetGeoCodingLocation (obj){
  payload = obj.DevEUI_uplink.payload_hex ;

  var LAT = hexToDec (payload.substring(8, 14))* 90 / 8388607 ;
  var LNG = hexToDec (payload.substring(14, 20))* 180 / 8388607;


  if(LAT !==0 && LNG !== 0)
  {
      const res = await geocoder.reverse({
          lat: LAT,lon: LNG, language: 'fr'
      });

      try {
          console.log(res[0].streetName);
          location_device_test = res[0].streetName +' '+res[0].state+' ' + res[0].zipcode ;

      }catch (e) {
          console.log(res[0]);
      }
  }
}

router.post('/add', async (req,res) => {
  let sensorGPs = new GpsSensor ({
    name: req.body.name,
    SensorIdentifier: req.body.SensorIdentifier,
    SensorType: req.body.SensorType,
    Created_date: Date.now()
  })

  try {
    await sensorGPs.save();
    res.json({status: "oK", message: "Device added"})

  } catch(err) {
    res.json({message: err.message})
  }
})












router.post('/', jsonParser ,  (req,res) => {

const st = new GpsSensor(req.body.Sensor);
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