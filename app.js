const aa = require("./models/Sensor");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const bcrypt = require('bcrypt')


const app = express();

/*
  SOcketttt
*/
//let io = require('socket.io')(4000);
//module.exports = io;
//const socket = require('socket.io'); // nasn3o byh server ( new Server)
//const server = app.listen(3000); // is object
//global.io = socket.listen(server);
//console.log(global+"sddddddddddd")
//module.exports = io;
//console.log(socket+"zeeeeeeeeeeeeeeeeeeeerffcdf")
//console.log(server+"555555555555")

var corsOptions = {
  credentials: true,
  origin: "http://localhost:4200"
};


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors(corsOptions));
require("./routes/smartbox.routes")(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


const PORT = 10081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
  res.send(req.body);
});
module.exports = app;