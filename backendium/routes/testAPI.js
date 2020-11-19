var express = require('express');
var router = express.Router();
const indeed = require('indeed-scraper');

const queryOptions = {
    host: 'www.indeed.com',
    query: 'software engineer',
    city: 'Seattle, WA',
    radius: '25',
    level: 'entry_level',
    jobType: 'fulltime',
    maxAge: '7',
    sort: 'date',
    limit: 5
};

indeed.query(queryOptions).then(res => {
    console.log(res); // An array of Job objects
});

router.get('/', function (req, res, next) {
    res.send('API is working properly');
});

module.exports = router;