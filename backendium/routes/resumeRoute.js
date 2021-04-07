const express = require("express"); 
const cors = require("cors");
const Resume = require("../models/resumeModel.js");
const path = require("path");

const app = express();
app.use(cors());

// Import required AWS SDK clients and commands for Node.js
const {
    S3Client,
    PutObjectCommand,
    ListBucketsCommand,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

// Set the AWS region
const REGION = "us-west-1";

// Set the bucket parameters
const bucketName = "cmpendium";
const bucketParams = { Bucket: bucketName };

// Create an S3 client service object
const s3 = new S3Client({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: REGION
});

const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: "us-west-1"
  })
let aws3 = new AWS.S3();

//Check connection by listing bucket(s)
const listBuckets = async () => {
    try {
    const data = await s3.send(new ListBucketsCommand({}));
    console.log("Success", data.Buckets);
    } catch (err) {
    console.log("Error", err);
    }
}
// listBuckets();

app.post("/api/upload", async (req, res) => {
    const keyName = req.key;
    const objectParams = { Bucket: bucketName, Key: keyName };
    try {
        const results = await s3.send(new PutObjectCommand(objectParams));
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);

    } catch (err) {
        console.log("Error", err);
    }
})

app.post("/api/delete", async (req, res) => {
    const keyName = req.key;
    const objectParams = { Bucket: bucketName, Key: keyName };
    try {
        const results = await s3.send(new DeleteObjectCommand(objectParams));
        // console.log("Successfully uploaded data to " + bucketName + "/" + keyName);

    } catch (err) {
        console.log("Error", err);
    }
})

app.post("/api/retrieve", async (req, res) => {
    const { major } = req.body;
    // console.log(major);
    // const keyName = major;
    // const objectParams = { Bucket: bucketName, Key: keyName };

    const keyName = `Computer_Science/${path.basename("C:\\Projects\\DummyTHICCC\\frontendium\\src\\images\\samples\\cocoa_touch.jpg")}`;
    const objectParams = { Bucket: bucketName, Key: keyName };

    try {
        const results = await s3.send(new GetObjectCommand(objectParams));
        console.log(results.body)
        // getResume().then(results => {
        //     const results_base64 = encode(results);
        //     console.log(results_base64)
        //     res.send(results_base64)
        // })
        // console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    } catch (err) {
        console.log("Error", err);
    }
})

async function getResume(){
    const keyName = `Computer_Science/${path.basename("C:\\Projects\\DummyTHICCC\\frontendium\\src\\images\\samples\\cocoa_touch.jpg")}`;
    const objectParams = { Bucket: bucketName, Key: keyName };
    const data = aws3.getObject(objectParams);
    console.log(data)
    return data;
}

function encode(data){
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64;
    // var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    // return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}

// Create name for uploaded object key
// const keyName = `Computer_Science/${path.basename("C:\\Projects\\DummyTHICCC\\frontendium\\src\\images\\samples\\cocoa_touch.jpg")}`;
// const objectParams = { Bucket: bucketName, Key: keyName, Body:  };

// const upload = async () => {
//     try {
//         const results = await s3.send(new PutObjectCommand(objectParams));
//         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//     } catch (err) {
//         console.log("Error", err);
//     }
// }
// upload();

module.exports = app;