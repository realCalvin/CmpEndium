require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose');
var userRoute = require('./routes/userRoute');

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

// Verify credentials were passed in correctly
var AWS = require("aws-sdk");
AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  else {
    console.log("Access key", AWS.config.credentials.accessKeyId);
  }
})

// Import required AWS SDK clients and commands for Node.js
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  ListBucketsCommand
} = require("@aws-sdk/client-s3");

// Set the AWS region
const REGION = "us-west-1"; // e.g., "us-east-1"

// Set the bucket parameters
const bucketName = "cmpendium";
const bucketParams = { Bucket: bucketName };

// Create an S3 client service object
const s3 = new S3Client({
  accessKeyId: "AKIAYYABHORWBZ5UPQ5F",
  secretAccessKey: "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",
  region: REGION
});

const listBuckets = async () => {
  try {
    const data = await s3.send(new ListBucketsCommand({}));
    console.log("Success", data.Buckets);
  } catch (err) {
    console.log("Error", err);
  }
}
listBuckets();

// Create name for uploaded object key
const keyName = "hello_world.txt";
const objectParams = { Bucket: bucketName, Key: keyName, Body: "Hello World!" };

const upload = async () => {
  try {
    const results = await s3.send(new PutObjectCommand(objectParams));
    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  } catch (err) {
    console.log("Error", err);
  }
}

const port = 9000;
app.listen(port, function () {
  console.log('Express server is running on port 9000')
})

module.exports = app;
