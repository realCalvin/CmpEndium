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
    const objectParams = { Bucket: bucketName, Prefix: major };
    try {
        aws3.listObjects(objectParams, (err, data) => {
            if (err) console.log(err, err.stack);
            else{

                for (var d in data.Contents){
                    // delete useless data
                    if(data.Contents[d].Size == 0){
                        data.Contents.splice(d, 1);
                    }

                    delete data.Contents[d].LastModified;
                    delete data.Contents[d].ETag;
                    delete data.Contents[d].Size;
                    delete data.Contents[d].StorageClass;
                    delete data.Contents[d].Owner; 

                    /**
                     * dis shit dont work
                     * the console.log inside the headObject callback prints out the metadata
                     * but the console.log(data.Contents) doesnt have the name in it
                     */
                    const params = { Bucket: bucketName, Key: data.Contents[d].Key }
                    // get metadata for each object and add the name from metadata to object
                    aws3.headObject(params, (err, metadata) => {
                        // console.log(metadata.Metadata.name)
                        // add Name field to object
                        data.Contents[d]["Name"] = metadata.Metadata.name
                    })
                    data.Contents[d].Key = "https://cmpendium.s3-us-west-1.amazonaws.com/" + data.Contents[d].Key;

                }
                console.log(data.Contents);

                res.send(data.Contents);
                // return data.Contents;
            }
        });
    } catch (err) {
        console.log("Error", err);
    }
})

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