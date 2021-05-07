require('dotenv').config();
require('events').EventEmitter.prototype._maxListeners = 100;
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let mongoose = require('mongoose');
let userRoute = require('./routes/userRoute');
let jobRoute = require('./routes/jobRoute');
let resumeRoute = require('./routes/resumeRoute');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require('./routes/userRoute'));
app.use(require('./routes/jobRoute'));
app.use(require('./routes/resumeRoute'));

// Connect to the MongoDB cluster
const uri = process.env.MONGO_URI;
try {
    mongoose.connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log('Mongoose is connected')
    );
} catch (e) {
    console.log('Mongoose could not connect ', e);
}

let gracefulExit = function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection with DB :' + db_server + ' is disconnected through app termination');
        process.exit(0);
    });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// Verify AWS credentials were passed in correctly
let AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: 'us-west-1'
});
AWS.config.getCredentials(function(err) {
    if (err) console.log('Error: ', err);
    else {
        console.log('AWS credentials passed correctly');
    }
});

const port = process.env.port || 9000;
app.listen(port, function() {
    console.log('Express server is running on port 9000');
});

module.exports = app;
