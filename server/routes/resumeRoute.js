const express = require('express');
const cors = require('cors');
const User = require('../models/userModel');
const Resume = require('../models/resumeModel.js');
const path = require('path');

const app = express();
app.use(cors());

// Import required AWS SDK clients and commands for Node.js
const {
    S3Client,
    PutObjectCommand,
    ListBucketsCommand,
    GetObjectCommand
} = require('@aws-sdk/client-s3');

// Set the AWS region
const REGION = 'us-west-1';

// Set the bucket parameters
const bucketName = 'cmpendium';
const bucketParams = { Bucket: bucketName };

// Create an S3 client service object
// const s3 = new S3Client({
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//     region: REGION
// });

const AWS = require('aws-sdk');
const { withSuccess } = require('antd/lib/modal/confirm');
AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: 'us-west-1'
});
let aws3 = new AWS.S3({ params: { Bucket: bucketName } });

// Check connection by listing bucket(s)
const listBuckets = async () => {
    try {
        const data = await s3.send(new ListBucketsCommand({}));
        console.log('Success', data.Buckets);
    } catch (err) {
        console.log('Error', err);
    }
};
// listBuckets();

app.post('/api/upload', async (req, res) => {
    const content = Buffer.from(req.body.data, 'base64');
    const email = req.body.email;
    const major = req.body.major;
    const date_ob = new Date();
    const date = date_ob.toISOString();
    const fileName = major + '/' + email + '/' + date + '.pdf';
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: content,
        ContentType: 'application/pdf'
    };
    try {
        const results = new AWS.S3.ManagedUpload({ params: params });
        results.send(function(err, data) {
            return res.json({ s3Url: data.Location, uploadDate: date });
        });
        console.log('Successfully uploaded data');
    } catch (err) {
        console.log('Error', err);
    }
});

app.post('/api/deleteresume', async (req, res) => {
    const { id } = req.body;
    await Resume.deleteOne({ _id: id });
    return res.json({ success: true });
});

app.post('/api/retrieve', async (req, res) => {
    const { major } = req.body;
    const objectParams = { Bucket: bucketName, Prefix: major };
    try {
        aws3.listObjects(objectParams, (err, data) => {
            if (err) console.log(err, err.stack);
            else {
                for (var d in data.Contents) {
                    // delete useless data
                    if (data.Contents[d].Size == 0) {
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
                    const params = { Bucket: bucketName, Key: data.Contents[d].Key };
                    // get metadata for each object and add the name from metadata to object
                    aws3.headObject(params, (err, metadata) => {
                        // console.log(metadata.Metadata.name)
                        // add Name field to object
                        data.Contents[d].Name = metadata.Metadata.name;
                    });
                    data.Contents[d].Key = 'https://cmpendium.s3-us-west-1.amazonaws.com/' + data.Contents[d].Key;
                }
                console.log(data.Contents);

                res.send(data.Contents);
                // return data.Contents;
            }
        });
    } catch (err) {
        console.log('Error', err);
    }
});

app.post('/api/database/saveresume', async (req, res) => {
    const {
        link,
        uploadDate,
        email,
        major
    } = req.body;

    User.findOne({ email: email })
        .then(res => {
            const newResume = new Resume({
                link,
                uploadDate,
                email,
                major,
                visible: res.visible
            });

            newResume.save();
        });
});

app.post('/api/database/getuserresume', async (req, res) => {
    const { email } = req.body;
    return Resume.find({ email: email })
        .then(result => { return res.json(result); });
});

app.post('/api/database/setshareresume', async (req, res) => {
    const { email, visible } = req.body;
    await Resume.updateMany({ email: email }, { visible: visible });
    let currentUser = await User.findOne({ email: email });
    currentUser.visible = visible;
    await currentUser.save();
});

app.post('/api/database/saveresumecomment', async (req, res) => {
    const { _id, username, comment } = req.body;
    let currentResume = await Resume.findOne({ _id: _id });
    let comments = currentResume.comments;
    comments.push({ username: username, comment: comment });
    currentResume.comments = comments;
    await currentResume.save();
});

app.post('/api/database/getresumes', (req, res) => {
    let query = (req.body.major === 'All') ? { visible: true } : { major: req.body.major, visible: true };
    Resume.find(query).then((resume) => {
        return res.json(resume);
    });
});

module.exports = app;
