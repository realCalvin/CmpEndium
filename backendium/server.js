require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose');
var userRoute = require('./routes/userRoute');
var resumeRoute = require('./routes/resumeRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require("./routes/userRoute"));
app.use(require("./routes/resumeRoute"))

// Connect to the MongoDB cluster
const uri = process.env.MONGO_URI;
try {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );

} catch (e) {
  console.log("Mongoose could not connect ", e);
}

var gracefulExit = function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB :' + db_server + ' is disconnected through app termination');
    process.exit(0);
  });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// Verify AWS credentials were passed in correctly
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "us-west-1"
})
AWS.config.getCredentials(function (err) {
  if (err) console.log("Error: ", err);
  else {
    console.log("AWS credentials passed correctly");
  }
})

const port = 9000;
app.listen(port, function () {
  console.log('Express server is running on port 9000')
})

module.exports = app;